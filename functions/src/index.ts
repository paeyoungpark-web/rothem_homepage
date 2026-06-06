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
      const prompt = `당신은 IT, 정보보안, 인공지능(AI) 분야의 최신 트렌드를 신속하고 정확하게 전달하는 '로뎀시스템(Rothem System)'의 전문 테크 에디터입니다.
      
최신 사이버 보안 위협 동향, AI 보안, 또는 인증(ISO 27001, ISO 42001 등) 트렌드 중 흥미롭고 가치 있는 주제 하나를 선정하여, 바쁜 직장인과 IT 관리자들이 출근길이나 자투리 시간에 1분 만에 핵심을 파악할 수 있는 '빠른 소식' 형태의 글을 한국어로 작성해 주세요.

[글쓰기 원칙 (Style Guide)]
1. 톤앤매너: 전문적이면서도 딱딱하지 않은, 친절하고 명쾌한 구어체(~체, ~습니다)를 사용해라.
2. 가독성: 복잡한 기술 용어는 쉽게 풀어서 설명하고, 줄바꿈과 이모지(Emoji)를 적절히 활용하여 시각적 피로감을 줄여라.
3. 신뢰성: 자극적인 과장이나 왜곡 없이, 팩트 기반으로 요약해라.

반드시 아래 JSON 형식으로 응답해 주세요 (백틱 없이 순수한 JSON 객체만 반환):
{
  "title": "[시선과 이목을 끄는 명확한 한 줄 제목 (이모지 포함)]",
  "content": "## 📌 핵심 요약\\n* [핵심 요약 포인트 1]\\n* [핵심 요약 포인트 2]\\n* [핵심 요약 포인트 3]\\n\\n## 🔍 무슨 일인가요?\\n[사건의 배경이나 기술의 핵심 내용을 2~3문단으로 쉽게 설명, 문단 간 긴 줄바꿈 포함]\\n\\n## 💡 로뎀's 한줄평 / 시사점\\n[이 이슈가 기업이나 보안 관리자, 또는 대중에게 어떤 영향을 미치는지, 어떤 대응이 필요한지 전문가 관점의 코멘트를 1~2줄로 구성]",
  "category": "예: 위협 동향, AI 보안, 클라우드 보안, 인증 가이드 등 적절한 카테고리 하나"
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
        status: 'draft',
        createdBy: 'auto',
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

// 2. 외부 오토메이션(OpenClaw, n8n 등) 연동을 위한 HTTPS API 엔드포인트
export const createInsightExternal = functions
  .region('asia-northeast3') // 서울 리전
  .https.onRequest(async (req, res) => {
    // CORS Header 설정
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Only POST method is allowed.' });
      return;
    }

    // API Key 검사 (Header의 x-api-key 또는 BODY의 key)
    const apiKeyHeader = req.headers['x-api-key'] || req.headers['X-API-Key'];
    const bodyKey = req.body?.key;
    const clientKey = apiKeyHeader || bodyKey;

    // 환경 변수 설정 필요: firebase functions:config:set openclaw.key="YOUR_CUSTOM_KEY"
    const serverSecretKey = functions.config().openclaw?.key || "rothemsystem-openclaw-secret-key-2026";

    if (!clientKey || clientKey !== serverSecretKey) {
      res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
      return;
    }

    const { title, content, category, prompt } = req.body;

    let finalTitle = title || '';
    let finalContent = content || '';
    let finalCategory = category || '보안 일반';

    // 만약 content가 비어있고 prompt 나 title이 있어서 AI 자동 생성을 원하는 경우
    if (!finalContent && (prompt || finalTitle)) {
      const geminiKey = functions.config().gemini?.apikey || process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const aiPrompt = `당신은 IT, 정보보안, 인공지능(AI) 분야의 최신 트렌드를 신속하고 정확하게 전달하는 '로뎀시스템(Rothem System)'의 전문 테크 에디터입니다.
        
제시된 주제/내용 또는 최신 트렌드를 분석하여, 바쁜 직장인과 IT 관리자들이 출근길이나 자투리 시간에 1분 만에 핵심을 파악할 수 있는 '빠른 소식' 형태의 글을 한국어로 작성해 주세요.
주제/내용 요구사항: ${prompt || finalTitle}

[글쓰기 원칙 (Style Guide)]
1. 톤앤매너: 전문적이면서도 딱딱하지 않은, 친절하고 명쾌한 구어체(~체, ~습니다)를 사용해라.
2. 가독성: 복잡한 기술 용어는 쉽게 풀어서 설명하고, 줄바꿈과 이모지(Emoji)를 적절히 활용하여 시각적 피로감을 줄여라.
3. 신뢰성: 자극적인 과장이나 왜곡 없이, 팩트 기반으로 요약해라. 원문이 영어인 경우 자연스러운 한국어로 번역 및 요약해야 한다.

반드시 아래 JSON 형식으로 응답해 주세요 (백틱 없이 순수한 JSON 객체만 반환):
{
  "title": "[시선과 이목을 끄는 명확한 한 줄 제목 (이모지 포함)]",
  "content": "## 📌 핵심 요약\\n* [핵심 요약 포인트 1]\\n* [핵심 요약 포인트 2]\\n* [핵심 요약 포인트 3]\\n\\n## 🔍 무슨 일인가요?\\n[사건의 배경이나 기술의 핵심 내용을 2~3문단으로 쉽게 설명, 문단 간 긴 줄바꿈 포함]\\n\\n## 💡 로뎀's 한줄평 / 시사점\\n[이 이슈가 기업이나 보안 관리자, 또는 대중에게 어떤 영향을 미치는지, 어떤 대응이 필요한지 전문가 관점의 코멘트를 1~2줄로 구성]",
  "category": "예: 위협 동향, AI 보안, 클라우드 보안, 인증 가이드 등 적절한 카테고리 하나"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: aiPrompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const textMatch = response.text.match(/\{[\s\S]*\}/);
          if (textMatch) {
            const parsed = JSON.parse(textMatch[0]);
            finalTitle = parsed.title || finalTitle;
            finalContent = parsed.content || '';
            finalCategory = parsed.category || finalCategory;
          } else {
            throw new Error('Failed to parse Gemini JSON output');
          }
        } else {
          throw new Error('Gemini returned empty text');
        }
      } catch (geminiError: any) {
        console.error("Gemini expansion failed:", geminiError);
        res.status(500).json({ error: 'AI generation failed', details: geminiError.message });
        return;
      }
    }

    if (!finalTitle || !finalContent) {
      res.status(400).json({ error: 'Both title and content are required (or a prompt for AI expansion).' });
      return;
    }

    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const insightData = {
        title: finalTitle,
        content: finalContent,
        category: finalCategory,
        status: 'draft',
        createdBy: 'api',
        date: todayStr,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('insights').add(insightData);
      
      res.status(201).json({
        success: true,
        id: docRef.id,
        data: insightData
      });
    } catch (saveError: any) {
      console.error("Save to Firestore failed:", saveError);
      res.status(500).json({ error: 'Failed to write to database', details: saveError.message });
    }
  });

