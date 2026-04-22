import { motion } from 'framer-motion';
import { Shield, Target, Users, Landmark, Heart, Eye } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Shield, title: "Integrity", desc: "Upholding the highest moral standards in service to the nation." },
    { icon: Eye, title: "Transparency", desc: "Open and accountable governance at all levels." },
    { icon: Heart, title: "Inclusivity", desc: "Empowering every Nigerian, regardless of ethnicity or faith." },
    { icon: Landmark, title: "Justice", desc: "Ensuring equity and fairness in our socio-political landscape." },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 bg-emerald-100 text-[#058541] rounded-full text-xs font-black tracking-widest uppercase mb-8"
          >
            The Movement
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-none mb-8">
            About <span className="text-[#058541]">OneNation</span> Party
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded on the pillars of unity and progress, the OneNation Party is a modern political movement in Nigeria, dedicated to providing a credible alternative for patriots and building a nation that works for all.
          </p>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-emerald-50 p-12 rounded-[3rem] border border-emerald-100"
            >
              <div className="w-16 h-16 bg-[#058541] rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h3>
              <p className="text-lg text-emerald-900/70 leading-relaxed">
                To transform Nigeria into a land of abundance through ethical leadership, sustainable development, and a people-centric approach to governance that leaves no one behind.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-900 p-12 rounded-[3rem] text-white"
            >
              <div className="w-16 h-16 bg-[#e31e24] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                <Users size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Our Vision</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                A Nigeria that is globally competitive, secure, and unified, where every citizen can achieve their full potential under a leadership that prioritizes service over self.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Core Values</h2>
          <div className="w-24 h-1 bg-[#058541] mx-auto" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#058541] mx-auto mb-6">
                <v.icon size={24} />
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">{v.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
