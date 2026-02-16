import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-xl transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-200' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 select-none";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow disabled:bg-slate-300 disabled:shadow-none disabled:active:scale-100",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm disabled:bg-slate-50 disabled:opacity-50",
    outline: "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-transparent hover:border-red-200"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'slate' | 'orange' | 'purple' }> = ({ children, color = 'slate' }) => {
  const colors = {
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Logo: React.FC<{ className?: string; showTagline?: boolean; collapsed?: boolean }> = ({ className = "", showTagline = false, collapsed = false }) => {
  if (collapsed) {
    return (
       <div className={`w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-sm ${className}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-amber-400">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
       </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative w-8 h-8 flex items-center justify-center">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" className="stroke-slate-900" />
            <path d="M9 22V12h6v10" className="stroke-slate-900" />
         </svg>
      </div>
      <div className="flex flex-col justify-center -space-y-1">
        <div className="font-bold text-2xl tracking-tight leading-none font-sans">
          <span className="text-slate-900">Plan</span><span className="text-amber-500">Sense</span>
        </div>
        {showTagline && (
          <span className="text-[0.6rem] font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5">
            Quote it. Build it.
          </span>
        )}
      </div>
    </div>
  );
};