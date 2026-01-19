
import React, { useState, useEffect } from 'react';

const LOADING_PHASES = [
  { title: "تهيئة مختبر الابتكار", sub: "يتم تشغيل المحرك التحليلي" },
  { title: "تفكيك ابعاد التحدي", sub: "تحليل العناصر الاساسية" },
  { title: "مسح قاعدة التقنيات", sub: "البحث عن افضل منهجية" },
  { title: "توليد الروابط الذهنية", sub: "ربط المعطيات بالحلول" },
  { title: "صياغة المخرجات", sub: "تجهيز خطة العمل النهائية" }
];

export const LoadingOverlay: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % LOADING_PHASES.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 98 ? prev + 1 : prev));
    }, 150);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl animate-in fade-in duration-500"></div>
      
      {/* Content Container */}
      <div className="relative max-w-sm w-full text-center space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500">
        
        {/* Animated Icon */}
        <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-indigo-600 rounded-3xl md:rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-12 md:h-12">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A4.5 4.5 0 0 0 13.5 3.5c-1.3 0-2.6.5-3.5 1.5-.8.8-1.5 1.5-2.5 1.5H5v14h14v-2.5a1 1 0 0 0-1-1h-3z"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </div>
        </div>

        {/* Phase Text */}
        <div className="space-y-2 px-4">
          <div className="h-20 flex flex-col justify-center"> 
            <h3 key={phaseIdx} className="text-xl md:text-3xl font-black text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {LOADING_PHASES[phaseIdx].title}
            </h3>
            <p className="text-indigo-500 font-bold text-sm md:text-base mt-1">
              {LOADING_PHASES[phaseIdx].sub}
            </p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-4 px-6">
          <div className="w-full h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="text-indigo-600">{progress}%</span>
            <span>جاري المعالجة</span>
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="pt-6">
          <p className="text-slate-400 text-[10px] md:text-xs font-bold leading-relaxed max-w-xs mx-auto italic px-8">
            "الابتكار هو رؤية المشكلات من زاوية مختلفة تماما"
          </p>
        </div>

      </div>
    </div>
  );
};
