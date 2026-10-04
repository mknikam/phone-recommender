"use client";

import { useState } from "react";
import { Phone, Answers } from "@/types";
import { recommendPhones } from "@/lib/algorithm";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RefreshCcw, Smartphone } from "lucide-react";

const BUDGET_OPTIONS = [
  { label: "Under ₹25,000", value: 1 },
  { label: "₹25K to ₹35K", value: 2 },
  { label: "₹35K to ₹50K", value: 3 },
  { label: "₹50K to ₹70K", value: 4 },
  { label: "₹70K to ₹100K", value: 5 },
  { label: "Above ₹100K", value: 6 },
];

const USE_CASE_OPTIONS = [
  "light gaming", "heavy gaming", "basic use", "multimedia consumption", "content creation"
] as const;

export default function Questionnaire({ phones }: { phones: Phone[] }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    priceBucket: 0,
    useCases: [],
    brandPreference: "Any"
  });
  const [results, setResults] = useState<{ best: Phone | null, secondBest: Phone | null } | null>(null);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const res = recommendPhones(phones, answers);
    setResults(res);
    setStep(4);
  };

  const reset = () => {
    setAnswers({ priceBucket: 0, useCases: [], brandPreference: "Any" });
    setResults(null);
    setStep(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[400px]">
      <div className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
      
      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-6">What is your budget?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers({ ...answers, priceBucket: opt.value })}
                    className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${answers.priceBucket === opt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  disabled={!answers.priceBucket} 
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-6">How do you primarily use your phone?</h2>
              <div className="grid grid-cols-1 gap-3">
                {USE_CASE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      const newUseCases = answers.useCases.includes(opt) 
                        ? answers.useCases.filter(u => u !== opt)
                        : [...answers.useCases, opt];
                      setAnswers({ ...answers, useCases: newUseCases });
                    }}
                    className={`p-4 rounded-xl border-2 text-left font-medium capitalize transition-all ${answers.useCases.includes(opt) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={handleBack} className="text-slate-500 font-medium px-4 py-2 hover:bg-slate-100 rounded-lg">Back</button>
                <button 
                  disabled={answers.useCases.length === 0} 
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-6">Do you have a preferred brand?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Any", ...Array.from(new Set(phones.map(p => p.brand)))].map(brand => (
                  <button
                    key={brand}
                    onClick={() => setAnswers({ ...answers, brandPreference: brand })}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${answers.brandPreference === brand ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={handleBack} className="text-slate-500 font-medium px-4 py-2 hover:bg-slate-100 rounded-lg">Back</button>
                <button 
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                >
                  Find My Phone! <Smartphone size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && results && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Here are your matches!</h2>
                <p className="text-slate-600">Based on your unique requirements.</p>
              </div>

              {!results.best ? (
                <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-lg text-slate-700 mb-4">We couldn't find a phone that matches perfectly (e.g. an Apple phone under ₹25K).</p>
                  <button onClick={reset} className="text-blue-600 font-medium flex items-center gap-2 mx-auto hover:underline">
                    <RefreshCcw size={16} /> Try different options
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Best Pick */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-1 rounded-2xl">
                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm relative">
                      <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Top Pick
                      </div>
                      <div className="flex gap-6 flex-col sm:flex-row">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{results.best.brand} {results.best.name}</h3>
                          <p className="text-xl font-semibold text-blue-700 mt-1">₹{results.best.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Best Pick */}
                  {results.secondBest && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                      <div className="absolute -top-3 -right-3 bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Runner Up
                      </div>
                      <div className="flex gap-4 flex-col sm:flex-row">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{results.secondBest.brand} {results.secondBest.name}</h3>
                          <p className="text-lg font-semibold text-slate-700 mt-1">₹{results.secondBest.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-center mt-8">
                    <button onClick={reset} className="text-slate-500 font-medium flex items-center gap-2 mx-auto hover:text-slate-900 transition-colors">
                      <RefreshCcw size={16} /> Start Over
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
