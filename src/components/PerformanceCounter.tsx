import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Counters {
  clients: number;
  devices: number;
  consulting: number;
  years: number;
}

const CountUp = ({ to, label, suffix = '+' }: { to: number; label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = to / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-brand-50 font-medium text-lg">{label}</div>
    </div>
  );
};

export default function PerformanceCounter() {
  const [counters, setCounters] = useState<Counters>({
    clients: 45,
    devices: 117,
    consulting: 100,
    years: 15
  });

  useEffect(() => {
    async function fetchCounters() {
      try {
        const docRef = doc(db, 'site_settings', 'counters');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCounters({
            clients: data.clients || 45,
            devices: data.devices || 117,
            consulting: data.consulting || 100,
            years: data.years || 15
          });
        }
      } catch (e) {
        console.error("Failed to load counters", e);
        try {
          handleFirestoreError(e, OperationType.GET, 'site_settings/counters');
        } catch (specErr) {
          console.error("Caught spec error safely in PerformanceCounter:", specErr);
        }
      }
    }
    fetchCounters();
  }, []);

  return (
    <section className="py-[100px] bg-brand-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12 lg:gap-6 divide-y lg:divide-y-0 divide-white/20 lg:divide-x">
          <CountUp to={counters.clients} label="고객사" suffix="개+" />
          <CountUp to={counters.devices} label="운영 장비" suffix="대+" />
          <CountUp to={counters.consulting} label="컨설팅 수행" suffix="건+" />
          <CountUp to={counters.years} label="보안 전문 경력" suffix="년+" />
          <CountUp to={300} label="스마트공장 점검/평가/자문" suffix="건+" />
          <CountUp to={250} label="ISO 심사" suffix="건+" />
        </div>
      </div>
    </section>
  );
}
