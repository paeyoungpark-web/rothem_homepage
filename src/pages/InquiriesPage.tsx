import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useTranslation } from 'react-i18next';
import { Trash2, MessageSquare, Mail, User, Clock, AlertCircle, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  privacyAgreed?: boolean;
  createdAt: any;
}

export default function InquiriesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      setIsAdmin(user?.email ? adminEmails.includes(user.email) : false);
    });

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const results: Inquiry[] = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(results);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm(currentLang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
            <p className="text-slate-600">You do not have permission to view this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 flex items-center gap-3">
              <span className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <MessageSquare size={28} />
              </span>
              {currentLang === 'ko' ? '고객 문의 내역' : 'Customer Inquiries'}
            </h1>
            <p className="text-slate-600 text-lg">
              {currentLang === 'ko' 
                ? `총 \${inquiries.length}건의 문의가 접수되었습니다.` 
                : `Total \${inquiries.length} inquiries received.`}
            </p>
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">
                {currentLang === 'ko' ? '접수된 문의가 없습니다.' : 'No inquiries yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {inquiries.map((inquiry, idx) => (
                <motion.div 
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 relative group"
                >
                  <button 
                    onClick={() => handleDelete(inquiry.id)}
                    className="absolute top-6 right-6 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6 border-b border-slate-100 pb-6 text-sm sm:text-base flex-wrap">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-slate-400" />
                      <span className="font-bold text-slate-900">{inquiry.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-slate-400" />
                      <a href={`mailto:\${inquiry.email}`} className="text-blue-600 hover:underline break-all">{inquiry.email}</a>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-slate-400" />
                        <a href={`tel:\${inquiry.phone}`} className="text-blue-600 hover:underline">{inquiry.phone}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={16} />
                      {formatDate(inquiry.createdAt)}
                    </div>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {inquiry.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
