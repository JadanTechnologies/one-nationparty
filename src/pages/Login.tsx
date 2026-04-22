import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex bg-gray-50/50">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-2xl relative z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-[#058541] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
                O
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Portal Access</h2>
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Log in to manage your OneNation membership and access digital resources.
            </p>
          </motion.div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-gray-500">Password</Label>
                  <a href="#" className="text-xs font-bold text-[#058541] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#058541] hover:bg-emerald-700 h-14 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Member Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 font-medium">
                New to the party?{' '}
                <Link to="/register" className="text-[#058541] font-bold hover:underline">Register your membership</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative flex-1 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540317580384-e5d4361669aa?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
        
        <div className="absolute bottom-20 left-20 right-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-1 bg-[#e31e24] mb-8" />
            <h3 className="text-4xl font-black text-white leading-tight mb-6">
              "We are the future. The voice of the people, the hope for a new Nigeria."
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <Shield className="text-emerald-400 w-5 h-5" />
              </div>
              <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs">OneNation Leadership Council</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
