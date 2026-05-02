import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenAI } from '@google/genai';

admin.initializeApp();

const db = admin.firestore();

// 1. Firebase Functions로 매일 오전 9시 자동 실행 (Asia/Seoul)
export const generateDailySecurityInsight = functions
  .region('asia-northeast3') // 서울 리전
  .pubsub.schedule('0 9 * * *')
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    console.log('Generating daily security insight...');
    
    // 환경 변수 설정 필요: firebase functions:config:set gemini.apikey="YOUR_API_KEY"
    // 또는 Secret Manager 사용
    const apiKey = functions.config().gemini?.apikey || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `정보보안 컨설팅 전문 기업 '로뎀시스템'의 홈페이지에 올라갈 '오늘의 보안 인사이츠' 1건을 한국어로 작성해주세요.
      
조건:
1. 최신 사이버 보안 위협 동향이나 AI 보안, 인증(ISO 27001 등) 트렌드 중에서 한 가지 주제 선택.
2. 내용은 전문가적이면서도 가독성이 높고, 약 500자 정도로 작성(3~4 문단).
3. 반드시 아래 JSON 형식으로 응답할 것 (마크다운 백틱 없이 순수 JSON만 반환):
{
  "title": "게시물 제목",
  "content": "본문 전체 내용",
  "category": "예: 위협 동향, 클라우드 보안, AI 보안 등"
}`;

      // 2. Gemini API로 최신 보안 트렌드 글 자동 작성
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error('No response from Gemini API');
      }

      // JSON 파싱
      const textMatch = response.text.match(/\{[\s\S]*\}/);
      if (!textMatch) throw new Error('Failed to parse JSON response');
      
      const parsed = JSON.parse(textMatch[0]);
      
      const todayStr = new Date().toISOString().split('T')[0];

      const insightData = {
        title: parsed.title || '오늘의 보안 동향',
        content: parsed.content || '',
        category: parsed.category || '보안 일반',
        date: todayStr,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // 3. Firestore insights 컬렉션에 자동 저장
      await db.collection('insights').add(insightData);
      
      console.log('Successfully generated and saved insight:', insightData.title);
      return insightData;
    } catch (error) {
      console.error('Error in daily insight generation:', error);
      return null;
    }
  });
