import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const email = searchParams.get('email');

  useEffect(() => {
    // Simulate email confirmation process
    const timer = setTimeout(() => {
      if (email) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [email]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Verifying Your Email</h2>
            <p className="text-gray-500 font-medium tracking-tight">Please wait while we activate your OneNation membership...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Email Confirmed!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-bold">
              Welcome aboard! Your account <span className="text-emerald-600 italic">({email})</span> has been successfully activated.
            </p>
            <Link to="/login" className="w-full">
              <Button size="lg" className="w-full bg-[#058541] hover:bg-emerald-700 h-14 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2">
                <span>Login to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-8">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Invalid Link</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We couldn't verify your email address. The link may have expired or is invalid.
            </p>
            <Link to="/register" className="w-full">
              <Button variant="outline" className="w-full h-14 rounded-xl font-bold">
                Back to Registration
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
