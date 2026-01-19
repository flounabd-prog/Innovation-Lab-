
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col text-right selection:bg-indigo-100 selection:text-indigo-900">
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-11 md:h-11 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A4.5 4.5 0 0 0 13.5 3.5c-1.3 0-2.6.5-3.5 1.5-.8.8-1.5 1.5-2.5 1.5H5v14h14v-2.5a1 1 0 0 0-1-1h-3z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            <div>
              <h1 className="text-base md:text-2xl font-black text-slate-900 leading-none">مختبر الابداع</h1>
              <p className="hidden sm:block text-[9px] text-indigo-500 font-bold uppercase tracking-wider mt-0.5">Creative Hub</p>
            </div>
          </div>
          
          {/* Removed redundant 'Innovate Now' button from here */}
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-50 border-t border-slate-100 py-8 md:py-12 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-slate-900 text-sm md:text-lg mb-2">© 2025 مختبر الابداع</p>
          <div className="flex items-center justify-center gap-2 md:gap-4 text-slate-400 font-bold text-[8px] md:text-xs uppercase tracking-widest">
            <span>ابتكار</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>ذكاء اصطناعي</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>حلول واقعية</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
