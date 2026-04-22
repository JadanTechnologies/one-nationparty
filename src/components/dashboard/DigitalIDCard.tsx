import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, MapPin, Calendar, CheckCircle2, Download, RotateCcw, Info, Phone, Globe, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DigitalIDCardProps {
  data: {
    fullName: string;
    membershipId: string;
    state: string;
    lga: string;
    photoUrl?: string;
    membershipType?: string;
  };
}

export function DigitalIDCard({ data }: DigitalIDCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  const qrValue = `https://adcregistration.ng/verify/${data.membershipId}`;
  const membershipType = data.membershipType || 'Member';

  const downloadCard = async () => {
    if (!cardRef.current || !backCardRef.current) return;
    
    try {
      // Download Front
      const frontDataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
      const frontLink = document.createElement('a');
      frontLink.download = `ADC-ID-FRONT-${data.membershipId}.png`;
      frontLink.href = frontDataUrl;
      frontLink.click();

      // Download Back
      const backDataUrl = await toPng(backCardRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
      const backLink = document.createElement('a');
      backLink.download = `ADC-ID-BACK-${data.membershipId}.png`;
      backLink.href = backDataUrl;
      backLink.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Interactive Flip Card */}
      <div 
        className="relative perspective-1000 w-full max-w-[420px] h-[260px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full h-full preserve-3d"
        >
          {/* Front Side */}
          <div 
            ref={cardRef}
            className="absolute inset-0 backface-hidden w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-emerald-950 border border-emerald-500/30 flex flex-col justify-between"
          >
            {/* Subtle Background Pattern */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            {/* Glow Effects */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-xl">
                    <div className="w-full h-full bg-[#058541] rounded-full flex items-center justify-center text-white font-black text-[10px]">ADC</div>
                  </div>
                  <div className="leading-tight">
                    <h2 className="text-sm font-black tracking-tight text-white uppercase italic">African Democratic Congress</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">e-Membership Card</span>
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">{membershipType}</p>
                </div>
              </div>

              {/* User Info Section */}
              <div className="flex gap-6 items-center mt-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-900/50 rounded-full border-2 border-emerald-500/40 overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-sm">
                    {data.photoUrl ? (
                      <img src={data.photoUrl} alt="Passport" className="w-full h-full object-cover grayscale-[0.2]" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-emerald-800/30">
                        <User className="w-10 h-10 text-emerald-500/40" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center border-2 border-emerald-950 shadow-lg">
                    <CheckCircle2 size={14} className="text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <p className="text-[10px] text-emerald-500/80 font-black uppercase tracking-widest mb-1">Authenticated Holder</p>
                    <p className="text-xl font-black truncate text-white leading-none tracking-tight uppercase">{data.fullName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex items-center text-[10px] text-emerald-100/60 font-bold uppercase tracking-wider">
                      <MapPin size={10} className="mr-1.5 text-emerald-500" />
                      <span className="truncate">{data.state} / {data.lga}</span>
                    </div>
                    <div className="flex items-center text-[10px] text-emerald-100/60 font-bold uppercase tracking-wider">
                      <Calendar size={10} className="mr-1.5 text-emerald-500" />
                      <span>EXP 2029</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-auto pt-4 border-t border-emerald-500/10 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Membership Core ID</p>
                  <p className="font-mono text-sm tracking-[0.2em] text-emerald-50 font-bold bg-emerald-500/20 px-2 py-0.5 rounded italic">
                    {data.membershipId}
                  </p>
                </div>
                
                <div className="bg-white p-2 rounded-xl shadow-2xl">
                  <QRCodeSVG value={qrValue} size={52} level="M" fgColor="#022c22" />
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent" />
          </div>

          {/* Back Side */}
          <div 
            ref={backCardRef}
            className="absolute inset-0 backface-hidden w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-emerald-950 border border-emerald-500/30 flex flex-col justify-between rotate-y-180"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 p-8 h-full flex flex-col text-white">
              <div className="border-b border-emerald-500/20 pb-4 mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-emerald-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Terms of Membership</p>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-[#058541] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#e31e24] rounded-full" />
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex items-start space-x-3 text-[9px] leading-relaxed text-emerald-100/70">
                  <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                  <p>This card remains the property of the African Democratic Congress (ADC). It must be presented for all party screenings and conventions.</p>
                </div>
                <div className="flex items-start space-x-3 text-[9px] leading-relaxed text-emerald-100/70">
                  <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                  <p>The holder is bound by the constitution of the ADC and our core values of Ethics, Integrity, and Patriotism.</p>
                </div>
                <div className="flex items-start space-x-3 text-[9px] leading-relaxed text-emerald-100/70">
                  <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                  <p>In case of loss, please contact the national secretariat or visit any state office for replacement.</p>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-2 px-4 py-3 bg-emerald-900/40 rounded-2xl border border-emerald-500/10">
                <div className="flex flex-col items-center">
                  <Mail size={12} className="text-emerald-500 mb-1" />
                  <p className="text-[8px] uppercase tracking-wider font-bold">hq@adc.ng</p>
                </div>
                <div className="flex flex-col items-center">
                  <Phone size={12} className="text-emerald-500 mb-1" />
                  <p className="text-[8px] uppercase tracking-wider font-bold">+234 ADC 001</p>
                </div>
                <div className="flex flex-col items-center">
                  <Globe size={12} className="text-emerald-500 mb-1" />
                  <p className="text-[8px] uppercase tracking-wider font-bold">www.adc.ng</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <Button 
          onClick={downloadCard}
          className="bg-emerald-600 hover:bg-emerald-700 h-14 rounded-xl px-10 shadow-xl shadow-emerald-500/20 space-x-2"
        >
          <Download size={18} />
          <span>Download Digital Slip</span>
        </Button>
        <Button 
          variant="outline"
          onClick={() => setIsFlipped(!isFlipped)}
          className="h-14 rounded-xl px-4 aspect-square flex items-center justify-center border-gray-200"
        >
          <RotateCcw size={18} className={cn("transition-transform duration-500", isFlipped ? "rotate-180" : "rotate-0")} />
        </Button>
      </div>
    </div>
  );
}
