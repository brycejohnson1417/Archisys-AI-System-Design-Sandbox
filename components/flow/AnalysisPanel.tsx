import React from 'react';
import { ArchitectureReview } from '../../services/geminiService';
import { ShieldAlert, Zap, TrendingUp, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisPanelProps {
  review: ArchitectureReview | null;
  onClose: () => void;
}

export const AnalysisPanel = ({ review, onClose }: AnalysisPanelProps) => {
  return (
    <AnimatePresence>
      {review && (
        <motion.div 
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 right-0 h-full w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col z-[1000]"
        >
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={20} />
              AI Review
            </h2>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Score section */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-700">
                <span className="text-xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                  {review.score}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400 font-mono uppercase tracking-wider">Health Score</p>
                <p className="text-sm font-medium text-slate-200 mt-1">
                  {review.score >= 80 ? "Solid Architecture" : review.score >= 50 ? "Needs Improvement" : "Critical Flaws Detected"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-mono uppercase text-slate-500 tracking-wider">Summary</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{review.summary}</p>
            </div>

            {review.bottlenecks && review.bottlenecks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-amber-500 flex items-center gap-2 tracking-wider">
                  <Zap size={16} /> Bottlenecks
                </h3>
                <ul className="space-y-2">
                  {review.bottlenecks.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 bg-amber-500/10 border border-amber-500/20 p-3 rounded-md leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {review.securityConcerns && review.securityConcerns.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-rose-500 flex items-center gap-2 tracking-wider">
                  <ShieldAlert size={16} /> Security Risks
                </h3>
                <ul className="space-y-2">
                  {review.securityConcerns.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 bg-rose-500/10 border border-rose-500/20 p-3 rounded-md leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {review.scalingAdvice && review.scalingAdvice.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-emerald-500 flex items-center gap-2 tracking-wider">
                  <TrendingUp size={16} /> Recommendations
                </h3>
                <ul className="space-y-2">
                  {review.scalingAdvice.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-md leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
