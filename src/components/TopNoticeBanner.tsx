import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AnimatePresence, motion } from 'motion/react';

export default function TopNoticeBanner() {
  const [notice, setNotice] = useState({ active: false, text: '', link: '' });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function fetchNotice() {
      try {
        const docRef = doc(db, 'site_settings', 'notice_banner');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setNotice(snap.data() as any);
        }
      } catch (err) {
        console.error("Failed to load notice banner");
      }
    }
    fetchNotice();
  }, []);

  if (!notice.active || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }} 
        animate={{ height: 'auto', opacity: 1 }} 
        exit={{ height: 0, opacity: 0 }}
        className="bg-red-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative flex items-center justify-center text-sm sm:text-base font-medium">
          <div className="flex items-center gap-2 pr-8">
            <AlertTriangle size={18} className="animate-pulse" />
            <span>{notice.text}</span>
            {notice.link && (
              <a href={notice.link} className="underline hover:text-red-200 ml-2">자세히 보기</a>
            )}
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="absolute right-4 p-1 hover:bg-red-700 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
