import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Layout, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.tsx';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[linear-gradient(135deg,#058541_0%,#03612f_100%)] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase text-white mb-8"
              >
                Official Membership Portal
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8"
              >
                Building a New<br />Nigeria for All.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              >
                Join the third largest political party in Nigeria. Be part of the change that prioritizes transparency, youth inclusion, and ethical leadership.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link to="/register">
                  <Button size="lg" className="bg-[#e31e24] hover:bg-red-700 text-white font-bold px-10 h-16 rounded-lg shadow-lg shadow-red-950/20 uppercase tracking-widest text-sm">
                    Start Your Registration
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-16 rounded-lg text-sm font-bold">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 w-full max-w-md"
            >
              <div className="flex space-x-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 flex-1">
                  <p className="text-4xl font-black text-white">2.4M+</p>
                  <p className="text-xs uppercase tracking-wider text-green-200 font-bold">Registered Members</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 flex-1">
                  <p className="text-4xl font-black text-white">36</p>
                  <p className="text-xs uppercase tracking-wider text-green-200 font-bold">States Coverage</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">The ADC Advantage</h2>
            <p className="text-4xl font-bold text-gray-900 tracking-tight">Why Register with ADC?</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Digital ID Card',
                description: 'Get your official digital membership card instantly after verification.',
                icon: Shield
              },
              {
                title: 'Transparency',
                description: 'Real-time updates on party activities and financial reporting.',
                icon: Layout
              },
              {
                title: 'Direct Participation',
                description: 'Vote in primaries and contribute to party policy-making digitally.',
                icon: Zap
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={item}>
                <Card className="border-gray-100 hover:border-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-500/5 h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed pt-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Three Simple Steps to <span className="text-emerald-600 underline">Join the Movement</span>
              </h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Fill Bio-Data', text: 'Provide your basic information and upload your passport photograph.' },
                  { step: '02', title: 'Select Location', text: 'Enter your State, LGA, Ward, and Polling Unit details for local representation.' },
                  { step: '03', title: 'Generate ID', text: 'Verify your identity and download your official ADC Digital ID Card.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-emerald-600 font-bold text-xl opacity-30 group-hover:opacity-100 transition-opacity">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/register">
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-14 rounded-xl">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative space-y-4">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 scale-95 origin-right">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                    <div className="h-3 w-20 bg-gray-50 rounded" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 w-full bg-gray-50 rounded" />
                  <div className="h-10 w-full bg-gray-50 rounded" />
                  <div className="h-10 w-full bg-emerald-600 rounded" />
                </div>
              </div>
              <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-2xl shadow-emerald-500/20 translate-x-10">
                <p className="text-sm font-medium opacity-80 mb-2">Registration Status</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">Verified Member</h3>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-center">
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60">ID: ADC-2026-NGR-001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to make a difference?</h2>
              <p className="text-emerald-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of Nigerians who have decided to take the lead. Your registration is the first step towards a better nation.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-12 h-16 rounded-2xl text-lg shadow-xl shadow-emerald-950/20">
                  Register as a Member Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
