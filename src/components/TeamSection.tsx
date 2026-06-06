import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  photoUrl: string;
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const q = query(collection(db, 'team_members'));
        const snapshot = await getDocs(q);
        const results: TeamMember[] = [];
        snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() } as TeamMember));
        
        if (results.length === 0) {
          // Fallback if empty
          results.push(
            { id: '1', name: '박배영', role: '대표이사', specialty: 'ISMS-P, ISO 인증', photoUrl: '/images/ceo_profile.svg' },
            { id: '2', name: '김보안', role: '수석 컨설턴트', specialty: '의료/금융 보안 컨설팅', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' },
            { id: '3', name: '이해커', role: '책임 연구원', specialty: '모의해킹, 취약점 진단', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' }
          );
        }
        setMembers(results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">최고의 보안 전문가 그룹</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
          다양한 산업 분야에서 검증된 경험을 가진 최고 수준의 보안 컨설턴트들이 귀사의 디지털 자산을 안전하게 보호합니다.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <UserCircle size={64} />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
              <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
