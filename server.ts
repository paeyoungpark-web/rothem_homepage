import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

async function generateDailyInsight() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set. Skipping daily insight auto-generation.");
    return;
  }
  
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.error("Firebase config not found.");
      return;
    }
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // We can initialize multiple times if we're not careful, but this is a top-level function that runs
    // occasionally. Still, it's safer to store the app instance.
    let app;
    try {
      app = initializeApp(firebaseConfig, "ServerInsightsGen");
    } catch(err: any) {
      if (err.code === 'app/duplicate-app') {
        const { getApp } = require('firebase/app');
        app = getApp("ServerInsightsGen");
      } else {
        throw err;
      }
    }
    
    const db = getFirestore(app);

    // Check if we already created one today
    const insightsRef = collection(db, 'insights');
    const q = query(insightsRef, orderBy('createdAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);
    
    const today = new Date().toISOString().split('T')[0];
    if (!snapshot.empty) {
      const latest = snapshot.docs[0].data();
      if (latest.date === today && latest.createdBy === 'system-auto') {
        console.log("Daily insight already generated for today:", today);
        return; // Already generated
      }
    }

    console.log("Generating today's AI insight...");

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `당신은 IT, 정보보안, 인공지능(AI) 분야의 최신 트렌드를 신속하게 전달하는 '로뎀시스템'의 AI 에디터입니다.
오늘 날짜 기준 가장 핫한 보안/AI 이슈 하나를 선택하여 흥미롭고 유익하게 작성해 주세요. 
(최근 며칠간의 랜섬웨어, 데이터 유출, AI 모델 동향, ISO 인증 변화 등 실제 트렌드 반영 권장)

반드시 아래 JSON 형식으로 반환해 주세요:
{
  "title": "[단문: 시선을 끄는 제목 + 이모지]",
  "content": "## 📌 핵심 요약\\n* [포인트 1]\\n* [포인트 2]\\n* [포인트 3]\\n\\n## 🔍 무슨 일인가요?\\n[사건 배경 - 쉽게 2문단]\\n\\n## 💡 로뎀's 한줄평 / 시사점\\n[전문가 코멘트]",
  "category": "예: AI 위협 동향 등"
}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    if (response.text) {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         const parsed = JSON.parse(jsonMatch[0]);
         await addDoc(insightsRef, {
           title: parsed.title || '오늘의 보안 트렌드 자동 리포트',
           content: parsed.content || '',
           category: parsed.category || 'AI 보안 위협',
           status: 'published',
           date: today,
           createdBy: 'system-auto',
           createdAt: serverTimestamp()
         });
         console.log("Successfully generated and saved insight for", today);
      }
    }
  } catch (error) {
    console.error("Error in generateDailyInsight:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic API route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Optional endpoint to force trigger generation
  app.post('/api/insights/force-generate', async (req, res) => {
    res.json({ message: 'Generation started in background.' });
    generateDailyInsight();
  });

  // Attempt generation on server startup
  console.log("Checking daily AI security insights...");
  generateDailyInsight().catch(console.error);

  // Then try every 1 hour (checking if today's is done)
  setInterval(() => {
    generateDailyInsight().catch(console.error);
  }, 1 * 60 * 60 * 1000);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
