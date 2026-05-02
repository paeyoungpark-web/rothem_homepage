import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, Trash2, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: any;
  uploadedBy: string;
}

export default function GalleryPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      setIsAdmin(user?.email ? adminEmails.includes(user.email) : false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imgs: GalleryImage[] = [];
      snapshot.forEach((doc) => {
        imgs.push({ id: doc.id, ...doc.data() } as GalleryImage);
      });
      setImages(imgs);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `gallery/\${Date.now()}_\${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
        alert('Upload failed: ' + error.message);
      }, 
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'gallery'), {
            imageUrl: downloadURL,
            title: file.name.split('.')[0] || 'Image',
            createdAt: serverTimestamp(),
            uploadedBy: auth.currentUser?.uid
          });
        } catch (error) {
          console.error("Firestore save failed", error);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!isAdmin) return;
    if (!confirm(currentLang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this?')) return;
    
    try {
      // First delete from storage
      const imageRef = ref(storage, image.imageUrl);
      try {
        await deleteObject(imageRef);
      } catch (err) {
        console.warn("Storage deletion failed, continuing with firestore deletion", err);
      }
      
      // Then delete from firestore
      await deleteDoc(doc(db, 'gallery', image.id));
    } catch (error) {
      console.error("Delete failed", error);
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 flex-grow max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4"
          >
            {currentLang === 'ko' ? '갤러리' : 'Gallery'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {currentLang === 'ko' 
              ? '로뎀시스템의 다양한 활동 모습을 확인하세요.' 
              : 'Discover various activities of rothemsystem.'}
          </motion.p>
        </div>

        {isAdmin && (
          <div className="mb-8 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-dashed border-blue-300">
            <input 
              type="file"
              accept="image/*"
              className="hidden"
              id="gallery-upload"
              onChange={handleUpload}
              disabled={uploading}
            />
            <label 
              htmlFor="gallery-upload" 
              className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition-colors \${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <UploadCloud size={20} />
              {uploading 
                ? (currentLang === 'ko' ? `업로드 중... \${Math.round(progress)}%` : `Uploading... \${Math.round(progress)}%`)
                : (currentLang === 'ko' ? '사진 업로드' : 'Upload Photo')}
            </label>
            <p className="mt-3 text-sm text-slate-500">
               ({currentLang === 'ko' ? '관리자 전용 기능입니다' : 'Admin only'})
            </p>
          </div>
        )}

        {images.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <ShieldAlert size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium text-lg">
               {currentLang === 'ko' ? '등록된 사진이 없습니다.' : 'No photos available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-100"
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium truncate">{img.title}</h3>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(img)}
                    className="absolute top-3 right-3 p-2 bg-red-600/90 text-white rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
