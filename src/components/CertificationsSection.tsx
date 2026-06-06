import React from 'react';
import { Award, Shield, FileCheck, Lock } from 'lucide-react';

const certs = [
  {
    icon: <Award className="w-12 h-12 text-blue-500 mb-4" />,
    title: "ISO/IEC 27001",
    desc: "정보보호 경영시스템 국제 표준 인증"
  },
  {
    icon: <Lock className="w-12 h-12 text-indigo-500 mb-4" />,
    title: "ISO/IEC 27701",
    desc: "개인정보보호 경영시스템 국제 표준 인증"
  },
  {
    icon: <Shield className="w-12 h-12 text-teal-500 mb-4" />,
    title: "ISMS-P",
    desc: "정보보호 및 개인정보보호 관리체계 인증"
  },
  {
    icon: <FileCheck className="w-12 h-12 text-cyan-500 mb-4" />,
    title: "정보보호 전문서비스 기업",
    desc: "과학기술정보통신부 지정 보안 컨설팅 전문 기업"
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-16">공인된 전문성</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certs.map((cert, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center hover:shadow-md transition-shadow cursor-default group">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {cert.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
