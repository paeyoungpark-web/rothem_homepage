import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
}

export default function GalleryPreviewSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchLatestImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const imgs: GalleryImage[] = [];
        snapshot.forEach((doc) => {
          imgs.push({ id: doc.id, ...doc.data() } as GalleryImage);
        });
        setImages(imgs);
      } catch (error) {
        console.error("Error fetching gallery images", error);
      }
    };
    fetchLatestImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="gallery-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 flex items-center">
              <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl mr-4">
                <ImageIcon size={32} />
              </span>
              {currentLang === 'ko' ? '로뎀 갤러리' : 'Rothem Gallery'}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {currentLang === 'ko' 
                ? '로뎀시스템의 전문가들이 만들어가는 생생한 현장의 모습을 전해드립니다.'
                : 'Experience the dynamic activities and field moments captured by rothemsystem experts.'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/gallery')}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold transition-colors"
          >
            {currentLang === 'ko' ? '더 보기' : 'View All'}
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => navigate('/gallery')}
              className="group cursor-pointer relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-sm bg-slate-100"
            >
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-xl drop-shadow-md truncate">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden flex justify-center">
            <button 
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold transition-colors w-full justify-center"
            >
              {currentLang === 'ko' ? '더 보기' : 'View All'}
              <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </section>
  );
}
