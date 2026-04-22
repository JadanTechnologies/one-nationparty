import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Manifesto() {
  const pillars = [
    { title: "Economic Reform", items: ["Youth employment strategy", "Agricultural modernization", "SME support programs", "Stable power generation"] },
    { title: "Governance", items: ["Anti-corruption enforcement", "Judiciary independence", "Local government autonomy", "Digital public services"] },
    { title: "Security", items: ["Community policing models", "Border technology", "Intelligence unit expansion", "Social justice initiatives"] },
    { title: "Healthcare & Education", items: ["Universal health coverage", "Vocational training centers", "Teacher welfare packages", "Digital literacy for all"] },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-emerald-950 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-8 uppercase">The <span className="text-emerald-400">People's</span> Manifesto</h1>
          <p className="text-xl text-emerald-100/70 max-w-2xl mx-auto">
            Our roadmap for a stable, secure, and prosperous Nigeria. A social contract between the party and the people.
          </p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[3rem] border border-gray-100 bg-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#058541] group-hover:bg-[#058541] group-hover:text-white transition-colors">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{pillar.title}</h3>
              </div>
              <ul className="space-y-4">
                {pillar.items.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-gray-600 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[#e31e24] rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
            <BookOpen size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Read the Full document</h2>
          <p className="text-lg text-gray-500 mb-10 font-medium">
            Download the comprehensive 120-page OneNation Manifesto and understand our detailed policy frameworks for every sector of Nigerian life.
          </p>
          <button className="bg-gray-900 hover:bg-black text-white px-12 py-5 rounded-2xl font-bold flex items-center mx-auto space-x-3 transition-colors shadow-xl">
            <span>Download PDF (4.2 MB)</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
