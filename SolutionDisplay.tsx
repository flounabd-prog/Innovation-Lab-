
import React, { useState, useEffect } from 'react';
import { CreativeSolution } from '../types';

interface SolutionDisplayProps {
  solution: CreativeSolution;
  problem: string;
}

type TabType = 'steps' | 'logic' | 'recommendations';

const StepSkeleton = () => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-lg bg-slate-100 shimmer-wave shrink-0"></div>
      <div className="h-5 bg-slate-100 rounded w-1/3 shimmer-wave"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-50 rounded w-full shimmer-wave"></div>
      <div className="h-3 bg-slate-50 rounded w-5/6 shimmer-wave"></div>
    </div>
  </div>
);

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution, problem }) => {
  const [activeTab, setActiveTab] = useState<TabType>('steps');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    setIsRendering(true);
    const timer = setTimeout(() => setIsRendering(false), 600);
    return () => clearTimeout(timer);
  }, [solution]);

  useEffect(() => {
    const newProgress = (completedSteps.size / solution.steps.length) * 100;
    setProgress(newProgress);
  }, [completedSteps, solution.steps.length]);

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const copyToClipboard = async () => {
    const textToCopy = `
التحدي: ${problem}
المنهجية: ${solution.techniqueName}
التصنيف: ${solution.problemClassification}
الخلاصة: ${solution.finalRecommendation}

خطة العمل:
${solution.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.content}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full space-y-6 md:space-y-10 animate-in fade-in duration-500">
      
      {/* 1. Header Card - Simplified for Clarity */}
      <section className="bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-200 p-6 sm:p-10 md:p-14 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-black uppercase tracking-widest border border-indigo-100">
                {solution.problemClassification}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] md:text-xs font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                تحليل دقيق ومبسط
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
              {solution.techniqueName}
            </h2>
            <p className="text-sm md:text-lg text-slate-600 font-bold leading-relaxed max-w-2xl">
              {solution.techniqueDescription}
            </p>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-2xl text-sm font-black transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white active:scale-95 hover:shadow-xl'}`}
          >
            {copied ? 'تم الحفظ' : 'نسخ مصفوفة الحل'}
          </button>
        </div>

        <div className="relative z-10 border-t border-slate-100 pt-10">
           <h4 className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4">التحدي المرصود</h4>
           <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed italic border-r-4 border-indigo-200 pr-6">
              "{problem}"
           </p>
        </div>
      </section>

      {/* 2. Navigation Tabs */}
      <nav className="flex bg-white/90 p-1.5 rounded-2xl max-w-full sm:max-w-md mx-auto sticky top-[4.5rem] md:top-24 z-40 border border-slate-200 shadow-2xl backdrop-blur-xl">
        {(['steps', 'logic', 'recommendations'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 px-2 rounded-xl font-black text-[10px] sm:text-xs md:text-sm transition-all flex items-center justify-center ${
              activeTab === tab 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'steps' && 'خطة التنفيذ'}
            {tab === 'logic' && 'لماذا هذا الحل؟'}
            {tab === 'recommendations' && 'خلاصة المختبر'}
          </button>
        ))}
      </nav>

      {/* 3. Dynamic Content */}
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
        
        {activeTab === 'steps' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl md:text-3xl font-black text-slate-900">خطوات واضحة للتطبيق</h3>
              <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                <span className="text-xs font-black text-indigo-700">معدل الإنجاز: {Math.round(progress)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {isRendering ? (
                Array(solution.steps.length || 4).fill(0).map((_, i) => <StepSkeleton key={i} />)
              ) : (
                solution.steps.map((step, idx) => {
                  const isCompleted = completedSteps.has(idx);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleStep(idx)}
                      className={`group bg-white p-6 md:p-10 rounded-[2rem] border-2 transition-all cursor-pointer flex gap-6 md:gap-8 items-start
                        ${isCompleted 
                          ? 'border-emerald-100 bg-emerald-50/10' 
                          : 'border-slate-100 hover:border-indigo-200 hover:shadow-lg active:scale-[0.99]'
                        }
                      `}
                    >
                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-sm md:text-xl shrink-0 transition-all
                        ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'}
                      `}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="space-y-2">
                        <h4 className={`text-lg md:text-2xl font-black ${isCompleted ? 'text-emerald-800 line-through opacity-60' : 'text-slate-900'}`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm md:text-lg leading-relaxed font-bold ${isCompleted ? 'text-slate-400 opacity-60' : 'text-slate-700'}`}>
                          {step.content}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'logic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 space-y-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
               <h4 className="text-indigo-600 text-xs font-black uppercase tracking-widest">منطق الاختيار الذكي</h4>
               <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                {solution.whyChosen}
              </p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-slate-300"></div>
              <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest">تحليل البدائل</h4>
              <p className="text-sm md:text-lg font-bold text-slate-600 leading-relaxed italic">
                {solution.comparisonReasoning}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">إجراءات البدء الآن</h3>
              <div className="space-y-4">
                {solution.suggestedActionItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                    <span className="text-sm md:text-lg font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 bg-indigo-600 rounded-[2.5rem] p-10 md:p-12 text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-800"></div>
              <div className="relative z-10 text-center md:text-right">
                <h4 className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-4">الخلاصة الاستراتيجية</h4>
                <p className="text-2xl md:text-4xl font-black leading-tight italic mb-8">
                  "{solution.finalRecommendation}"
                </p>
                <button 
                  onClick={() => window.print()}
                  className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-sm md:text-lg active:scale-95 transition-all shadow-xl"
                >
                  حفظ بصيغة PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
