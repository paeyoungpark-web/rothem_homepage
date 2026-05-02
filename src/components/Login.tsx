import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../firebase';
import { useState } from 'react';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        {t('login.back')}
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold text-2xl mb-6">
            R
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {t('login.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white py-12 px-4 shadow-sm sm:rounded-3xl sm:px-10 border border-slate-100"
        >
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center py-4 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-3" />
            {isLoading ? "Signing in..." : t('login.btn_google')}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
