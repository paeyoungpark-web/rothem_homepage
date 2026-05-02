import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizQuestion {
  question: string;
  answer: boolean;
  explanation: string;
}

const DEFAULT_QUIZ: QuizQuestion[] = [
  { question: "비밀번호는 최소 8자리 이상, 문자/숫자/특수문자를 혼합해야 한다.", answer: true, explanation: "강력한 비밀번호는 기초적인 보안 수칙입니다." },
  { question: "내부망에 접속된 PC는 백신 프로그램 설치가 필수적이지 않다.", answer: false, explanation: "내부망이라도 USB 등을 통한 감염 위험이 있으므로 필수입니다." },
  { question: "중요한 문서는 파쇄기를 이용해 폐기해야 한다.", answer: true, explanation: "문서 보안을 위해 반드시 안전하게 파기해야 합니다." },
  { question: "출처가 불분명한 이메일의 첨부파일은 백신 검사 없이 열어봐도 된다.", answer: false, explanation: "랜섬웨어 감염의 주된 경로이므로 절대 열어선 안 됩니다." },
  { question: "개인정보는 목적 달성 후 즉시 파기하는 것이 원칙이다.", answer: true, explanation: "개인정보보호법에 따른 기본 원칙입니다." }
];

export default function SelfAssessmentSection() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUIZ);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // In a full app, this would fetch from Firestore where a Cloud Function / Admin triggers daily Gemini generation.
  // For the prototype, we use the default quiz array.

  const handleAnswer = (userAnswer: boolean) => {
    if (userAnswer === questions[currentIdx].answer) {
      setScore(score + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const getGrade = () => {
    const ratio = score / questions.length;
    if (ratio >= 0.9) return { grade: 'A', text: '매우 우수합니다. 강력한 보안 체계를 유지하고 계시네요!', color: 'text-green-500' };
    if (ratio >= 0.7) return { grade: 'B', text: '양호하지만 일상적인 주의가 더 필요합니다.', color: 'text-blue-500' };
    if (ratio >= 0.5) return { grade: 'C', text: '보안 체계 재점검이 필요합니다.', color: 'text-yellow-500' };
    return { grade: 'F', text: '위험 수준입니다! 즉시 전문가의 상담이 필요합니다.', color: 'text-red-500' };
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <Target className="text-indigo-500" size={32} />
            보안 자가진단 퀴즈
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">우리 회사의 보안 수준은 어느 정도일까요? 매일 업데이트 되는 퀴즈로 진단해보세요.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700 mx-auto max-w-2xl transform transition-all hover:shadow-md">
          {!showResult ? (
            <div>
              <div className="flex justify-between items-center mb-8 text-sm font-bold text-slate-400">
                <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
                <span className="text-indigo-500">{Math.round(((currentIdx)/questions.length)*100)}% 진행됨</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mb-10 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-300 ease-out" 
                  style={{ width: `\${((currentIdx)/questions.length)*100}%` }}
                ></div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 leading-relaxed text-center">
                Q. {questions[currentIdx].question}
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => handleAnswer(true)}
                  className="py-12 md:py-16 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-4xl md:text-6xl font-black text-indigo-500 transition-all flex items-center justify-center group"
                >
                  O
                </button>
                <button 
                  onClick={() => handleAnswer(false)}
                  className="py-12 md:py-16 rounded-2xl border-2 border-rose-100 dark:border-rose-900/30 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-4xl md:text-6xl font-black text-rose-500 transition-all flex items-center justify-center group"
                >
                  X
                </button>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <h3 className="text-xl text-slate-500 dark:text-slate-400 font-bold mb-2">진단 결과</h3>
              <div className={`text-8xl font-black mb-6 \${getGrade().color}`}>
                {getGrade().grade}
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{score} / {questions.length} 정답</p>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-10">{getGrade().text}</p>
              
              <div className="flex flex-col gap-4">
                {getGrade().grade === 'F' || getGrade().grade === 'C' ? (
                  <a href="#contact" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                    전문가 상담 신청하기 <ArrowRight size={20} />
                  </a>
                ) : null}
                <button 
                  onClick={resetQuiz}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-xl font-bold transition-colors"
                >
                  다시 테스트하기
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
