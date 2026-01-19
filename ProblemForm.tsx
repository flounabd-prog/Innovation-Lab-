
import React, { useState, useEffect } from 'react';

interface ProblemFormProps {
  onSubmit: (problem: string) => void;
  isLoading: boolean;
}

interface Technique {
  name: string;
  desc: string;
  iconType: string;
}

const CATEGORIZED_TECHNIQUES: Record<string, { title: string, techniques: Technique[], text: string, bg: string, border: string }> = {
  'analysis': {
    title: 'تحليل وتفكيك المشكلة',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50/20',
    border: 'border-indigo-100',
    techniques: [
      { name: 'Five Whys', desc: 'تتبع الجذور عبر التسلسل السببي للوصول لأصل المشكلة الحقيقي', iconType: 'search' },
      { name: 'Force Field', desc: 'تحليل القوى الدافعة والمعيقة للتغيير لضمان نجاح التنفيذ', iconType: 'scale' },
      { name: 'Mind Mapping', desc: 'رسم روابط بصرية بين الأفكار لاكتشاف حلول غير تقليدية ومترابطة', iconType: 'network' },
      { name: 'Empathy Mapping', desc: 'فهم عميق لاحتياجات ومشاعر المستخدم الحقيقية لتصميم حلول إنسانية', iconType: 'heart' },
      { name: 'First Principles', desc: 'تفكيك المشكلة إلى حقائقها الأساسية وبنائها من جديد دون افتراضات مسبقة', iconType: 'layers' },
      { name: 'Morphological', desc: 'استكشاف كافة البدائل الممكنة لكل بُعد من أبعاد المشكلة عبر مصفوفة شاملة', iconType: 'grid' },
      { name: 'Creative SWOT', desc: 'تحليل نقاط القوة والضعف والفرص والتهديدات بمنظور ابتكاري استباقي', iconType: 'swot' },
      { name: 'Parallel Thinking', desc: 'تنسيق تفكير المجموعة في اتجاه واحد لتقليل التضارب وزيادة الإنتاجية', iconType: 'parallel' }
    ]
  },
  'generation': {
    title: 'توليد وتحفيز الأفكار',
    text: 'text-cyan-600',
    bg: 'bg-cyan-50/20',
    border: 'border-cyan-100',
    techniques: [
      { name: 'SCAMPER', desc: 'منهجية للتطوير عبر التبديل والدمج والتعديل والحذف وإعادة الترتيب', iconType: 'zap' },
      { name: 'Lateral Thinking', desc: 'استخدام التفكير الجانبي لكسر الأنماط التقليدية المعتادة والوصول لقفزات فكرية', iconType: 'branch' },
      { name: 'Analogical Thinking', desc: 'إيجاد أوجه تشابه بين مشكلتك وأنظمة أو سيناريوهات معروفة في مجالات غير مرتبطة لاستخلاص حلول ذكية', iconType: 'analogy' },
      { name: 'Random Word', desc: 'تحفيز العقل عبر ربط كلمات عشوائية بموضوع التحدي لفتح آفاق بكر', iconType: 'dice' },
      { name: 'Medici Effect', desc: 'الابتكار الناتج عن دمج مفاهيم من تخصصات مختلفة تماماً عند نقطة التقاطع', iconType: 'combine' },
      { name: 'Biomimicry', desc: 'استلهام التصاميم والحلول الهندسية من الأنظمة والظواهر العبقرية في الطبيعة', iconType: 'leaf' },
      { name: 'Lotus Blossom', desc: 'التوسع في فكرة مركزية وتفريغها لـ 8 أفكار فرعية لضمان العمق والشمول', iconType: 'lotus' },
      { name: 'Synectics', desc: 'تحويل ما هو غريب إلى مألوف وما هو مألوف إلى غريب عبر التشبيهات', iconType: 'synectics' }
    ]
  },
  'development': {
    title: 'تطوير وتصميم الحلول',
    text: 'text-purple-600',
    bg: 'bg-purple-50/20',
    border: 'border-purple-100',
    techniques: [
      { name: 'Six Thinking Hats', desc: 'دراسة الحل من ست زوايا: العاطفة، المنطق، النقد، الإيجابية، والإبداع', iconType: 'hat' },
      { name: 'TRIZ', desc: 'قوانين عالمية مبنية على براءات الاختراع لحل التناقضات التقنية المستعصية', iconType: 'settings' },
      { name: 'Design Thinking', desc: 'عملية تكرارية تركز على احتياجات الإنسان لابتكار حلول مجربة وفعالة', iconType: 'palette' },
      { name: 'Blue Ocean', desc: 'خلق أسواق وقيم جديدة تماماً والابتعاد عن حلبة المنافسة التقليدية المنهكة', iconType: 'waves' },
      { name: 'Disney Method', desc: 'الانتقال بين ثلاث عقليات: الحالم (الأمل)، الواقعي (الفعل)، والناقد (المنطق)', iconType: 'sparkles' },
      { name: 'Reverse Brainstorm', desc: 'التفكير في كيفية إفشال الحل لاكتشاف الثغرات الخفية وتلافيها قبل الوقوع', iconType: 'reverse' },
      { name: 'Storyboarding', desc: 'رسم تسلسل الحل كقصة مرئية لفهم رحلة المستخدم وتحديد نقاط الضعف', iconType: 'storyboard' }
    ]
  }
};

const IconRenderer = ({ type }: { type: string }) => {
  const baseClass = "w-5 h-5 transition-transform group-hover:scale-110";
  switch (type) {
    case 'search': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'scale': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m16 16 3-8 3 8M2 16l3-8 3 8M7 21h10M12 3v18"/></svg>;
    case 'network': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/></svg>;
    case 'heart': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.5-1.5 3-3.2 3-5.5a5.5 5.5 0 0 0-11-0c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>;
    case 'layers': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 2-10 5 10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
    case 'grid': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>;
    case 'swot': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18M3 12h18"/><path d="m7 7 2 2-2 2m8-4 2 2-2 2"/></svg>;
    case 'parallel': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7h18M3 12h18M3 17h18"/><path d="m17 4 3 3-3 3M7 14l-3 3 3 3"/></svg>;
    case 'zap': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m13 2-10 12h9l-1 8 10-12h-9l1-8Z"/></svg>;
    case 'branch': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>;
    case 'repeat': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m17 2 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
    case 'analogy': return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M9 12h6" strokeDasharray="3 2" />
        <path d="M12 8v8" strokeDasharray="1 4" className="opacity-30" />
      </svg>
    );
    case 'dice': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="16" r="1"/><circle cx="12" cy="12" r="1"/></svg>;
    case 'combine': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M10 10c2 2 4 2 6 0"/></svg>;
    case 'leaf': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.8-5.4 5-6"/></svg>;
    case 'lotus': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3c-4 0-5 5-5 5s-5-1-5 5 5 5 5 5 5-5 5-5 5 5 5 5 5-5 5-5-5-1-5-5-1-5-5-5Z"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'synectics': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8Z"/><path d="m12 8-2 4h4l-2 4"/></svg>;
    case 'hat': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m2 10 10-5 10 5-10 5-10-5ZM6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>;
    case 'settings': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>;
    case 'palette': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 19 9 2-2-9M5 19 2 21l2-9"/><circle cx="12" cy="13" r="8"/></svg>;
    case 'waves': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>;
    case 'sparkles': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>;
    case 'reverse': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.7 9.7 0 0 0-6.7 2.7L3 8M3 3v5h5"/></svg>;
    case 'storyboard': return <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 9v12"/></svg>;
    default: return null;
  }
};

const LOADING_STEPS = [
  "تشغيل المحرك التحليلي",
  "مسح مصفوفة التقنيات",
  "تحديد المسار الأنسب",
  "صياغة الحلول المبتكرة",
  "تجهيز المخرجات"
];

const TechniqueCard: React.FC<{ tech: Technique, categoryData: any }> = ({ tech, categoryData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`p-4 rounded-xl border ${categoryData.bg} ${categoryData.border} group transition-all cursor-pointer overflow-hidden
        ${isOpen ? 'bg-white shadow-lg ring-2 ring-indigo-100/50 ring-offset-1 scale-[1.01]' : 'hover:bg-white hover:shadow-md active:scale-95'}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`${categoryData.text} shrink-0`}><IconRenderer type={tech.iconType} /></div>
          <h6 className="font-bold text-slate-900 text-sm leading-tight">{tech.name}</h6>
        </div>
        <div className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-300'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
      
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-2.5">
            {tech.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProblemForm: React.FC<ProblemFormProps> = ({ onSubmit, isLoading }) => {
  const [problem, setProblem] = useState('');
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    let intv: any;
    if (isLoading) {
      setProgress(0);
      setStepIdx(0);
      intv = setInterval(() => {
        setProgress(p => (p < 95 ? p + 0.5 : p));
        setStepIdx(i => (i + 1) % LOADING_STEPS.length);
      }, 300);
    }
    return () => clearInterval(intv);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim() && !isLoading) onSubmit(problem);
  };

  return (
    <div className="w-full space-y-12 md:space-y-20">
      <div className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-50/50 z-30 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-l from-indigo-600 to-cyan-500 transition-all duration-1000 ease-out shimmer-wave" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8">
          <div className="relative group">
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              disabled={isLoading}
              placeholder="اكتب التحدي الذي يواجهك هنا.. (مثلاً: كيف نزيد مبيعات متجرنا بنسبة 20%؟)"
              className="w-full h-40 sm:h-48 md:h-56 p-5 sm:p-6 md:p-8 text-base sm:text-lg md:text-2xl border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all resize-none bg-slate-50/20 font-bold placeholder:text-slate-300 placeholder:font-medium leading-relaxed"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-300 pointer-events-none">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-soft-float hidden sm:block"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>
               <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">مساحة التفكير</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <button
              type="submit"
              disabled={isLoading || !problem.trim()}
              className={`flex-grow py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-black rounded-2xl md:rounded-3xl transition-all shadow-lg group flex items-center justify-center gap-3 sm:gap-4
                ${isLoading 
                  ? 'bg-indigo-500/90 text-white animate-soft-pulse cursor-wait' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
                }
              `}
            >
              <span className="inline-block transition-all duration-500">
                {isLoading ? LOADING_STEPS[stepIdx] : "ابتكر الآن"}
              </span>
              {!isLoading && (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:translate-x-[-4px] transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              )}
              {isLoading && (
                <div className="flex gap-1 items-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-10 md:space-y-16">
        <div className="text-center md:text-right space-y-2 md:space-y-3 px-2">
          <h4 className="text-2xl md:text-4xl font-black text-slate-900">مصفوفة تقنيات الإبداع الشاملة</h4>
          <p className="text-slate-400 text-xs sm:text-sm md:text-lg font-bold">مجموعة أدواتنا المكونة من تقنيات عالمية لتحويل التحديات إلى واقع ملموس</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {Object.entries(CATEGORIZED_TECHNIQUES).map(([key, data]) => (
            <div key={key} className="space-y-5 md:space-y-8">
              <div className="flex items-center gap-3 border-r-4 border-indigo-600 pr-4">
                <h5 className={`text-base sm:text-lg md:text-2xl font-black ${data.text}`}>{data.title}</h5>
              </div>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                {data.techniques.map((tech, idx) => (
                  <TechniqueCard key={idx} tech={tech} categoryData={data} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
