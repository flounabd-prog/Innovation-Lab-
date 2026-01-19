
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ProblemForm } from './components/ProblemForm';
import { SolutionDisplay } from './components/SolutionDisplay';
import { LoadingOverlay } from './components/LoadingOverlay';
import { generateCreativeSolution } from './services/geminiService';
import { CreativeSolution, ProblemHistory } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<CreativeSolution | null>(null);
  const [currentProblem, setCurrentProblem] = useState<string>('');
  const [history, setHistory] = useState<ProblemHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('creative_lab_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleProcessProblem = async (problem: string) => {
    setLoading(true);
    setError(null);
    setCurrentSolution(null);
    setCurrentProblem(problem);
    
    try {
      const solution = await generateCreativeSolution(problem);
      setCurrentSolution(solution);
      
      const newEntry: ProblemHistory = {
        id: Date.now().toString(),
        problem,
        solution,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('creative_lab_history', JSON.stringify(updatedHistory));
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error(err);
      setError('حدث خطأ فني اثناء تحليل المصفوفة. نرجو التحقق من الاتصال والمحاولة مرة اخرى.');
    } finally {
      setLoading(false);
    }
  };

  const backToHome = () => {
    setCurrentSolution(null);
    setCurrentProblem('');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {loading && <LoadingOverlay />}
      
      {!currentSolution ? (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <div className="relative pt-12 pb-16 md:pt-32 md:pb-40 text-center px-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-indigo-50/40 blur-[80px] rounded-full -z-10 animate-pulse"></div>
            
            <div className="relative max-w-7xl mx-auto space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                مختبر الابداع • Creative Lab
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-slate-900 leading-[1.2] md:leading-[1.05] tracking-tight px-2">
                تحويل التحديات الى <br className="hidden md:block"/> <span className="gradient-text">حلول مبتكرة</span>
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed px-4 opacity-90">
                تحويل التحديات الى حلول مبتكرة بإلإعتماد على تقنيات التفكير الابداعي وادواته المطورة 
              </p>
            </div>
          </div>

          {/* Main Action Area */}
          <div className="-mt-8 md:-mt-24 px-4 relative z-10 max-w-5xl mx-auto">
            <ProblemForm onSubmit={handleProcessProblem} isLoading={loading} />
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-32 pb-16 md:pb-32">
            {error && (
              <div className="mb-12 p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center font-bold shadow-sm animate-in zoom-in-95">
                {error}
              </div>
            )}

            {!loading && history.length > 0 && (
              <div className="space-y-8 md:space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-6 gap-4">
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">سجل الابتكار</h3>
                    <p className="text-slate-400 text-xs md:text-sm font-bold mt-1">الوصول السريع الى مصفوفات الحلول السابقة</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">آخر 10 عمليات</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setCurrentProblem(item.problem);
                        setCurrentSolution(item.solution);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="creative-card p-6 md:p-8 cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100/50">
                          {item.solution.techniqueName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">{new Date(item.timestamp).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <h4 className="font-black text-slate-800 line-clamp-2 mb-6 group-hover:text-indigo-600 text-lg md:text-xl leading-snug h-[3rem] transition-colors">
                        {item.problem}
                      </h4>
                      <div className="text-indigo-600 font-black text-xs flex items-center gap-2 group-hover:translate-x-[-6px] transition-transform pt-4 border-t border-slate-50">
                        استعراض مصفوفة الحل
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen pb-12 animate-in fade-in">
          <div className="glass-effect border-b border-slate-100 py-3 sticky top-16 md:top-20 z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <button 
                onClick={backToHome}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-black group text-sm md:text-base transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 group-hover:-translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                الرئيسية
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-slate-900 font-black text-xs md:text-sm">مصفوفة الحل</span>
              </div>
              <button 
                onClick={() => window.print()}
                className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 active:scale-90 hover:bg-white transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              </button>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-12">
            <SolutionDisplay solution={currentSolution} problem={currentProblem} />
            <div className="mt-16 text-center">
              <button 
                onClick={backToHome}
                className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 text-lg md:text-xl inline-flex items-center justify-center gap-4 group"
              >
                ابدأ رحلة ابتكار جديدة
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-[-4px] transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
