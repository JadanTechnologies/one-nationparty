import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, Gavel, Scale, Globe } from 'lucide-react';

export default function Constitution() {
  const regions = [
    { title: "Article I", subtitle: "Name & Supremacy", desc: "Establishing the OneNation Party as a legal entity and the supremacy of its constitution." },
    { title: "Article II", subtitle: "Motto & Flag", desc: "Detailed breakdown of the party's symbols: the star, the colors, and our guiding promise." },
    { title: "Article III", subtitle: "Membership Rights", desc: "The rights, privileges, and duties of every registered member from grassroots to national levels." },
    { title: "Article IV", subtitle: "National Organs", desc: "The structure of the party leadership including the NEC, Board of Trustees, and State Excos." },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-24 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#058541] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#058541] mb-6 block">Legal framework</span>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-none mb-8">
                The Party <span className="text-[#058541]">Constitution</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed mb-10">
                The fundamental laws governing the operations, ethics, and democratic processes within the OneNation Party.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#058541] hover:bg-emerald-700 text-white px-8 h-14 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20">
                  <Download size={18} />
                  <span>Download Constitution</span>
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                <Gavel className="text-[#058541] mb-4" size={32} />
                <p className="text-xs font-black uppercase text-gray-400 mb-1">Established</p>
                <p className="text-sm font-bold text-gray-900 leading-tight">2005 / Amended 2022</p>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                <Scale className="text-[#058541] mb-4" size={32} />
                <p className="text-xs font-black uppercase text-gray-400 mb-1">Articles</p>
                <p className="text-sm font-bold text-gray-900 leading-tight">48 Clauses</p>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                <ShieldCheck className="text-[#e31e24] mb-4" size={32} />
                <p className="text-xs font-black uppercase text-gray-400 mb-1">Security</p>
                <p className="text-sm font-bold text-gray-900 leading-tight">Anti-Graft Vetting</p>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                <Globe className="text-[#058541] mb-4" size={32} />
                <p className="text-xs font-black uppercase text-gray-400 mb-1">Chapters</p>
                <p className="text-sm font-bold text-gray-900 leading-tight">36 States + FCT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Key Summary Articles</h2>
            <p className="text-gray-500 font-medium">Quick reference to our guiding laws</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-gray-200" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group flex gap-8 p-10 rounded-[3rem] bg-white border border-gray-100 hover:border-[#058541]/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
            >
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-gray-300 group-hover:bg-[#058541]/5 group-hover:text-[#058541] group-hover:border-[#058541]/10 transition-colors">
                  <FileText size={24} className="mb-1" />
                  <span className="text-[10px] font-black">{region.title}</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{region.subtitle}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{region.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
