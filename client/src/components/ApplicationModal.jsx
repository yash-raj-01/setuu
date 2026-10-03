import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOMAINS } from '../data/setuData';

export default function ApplicationModal({ isOpen, onClose, initialDomain = 'tech', initialEvent = null }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNo: '',
    year: '2nd Year',
    primaryDomain: initialDomain || 'tech',
    domain: initialDomain || 'tech',
    secondaryDomain: '',
    portfolio: '',
    motivation: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialDomain) {
      setFormData((prev) => ({
        ...prev,
        primaryDomain: initialDomain,
        domain: initialDomain,
        secondaryDomain: prev.secondaryDomain === initialDomain ? '' : prev.secondaryDomain,
      }));
    }
    setErrorMessage('');
  }, [initialDomain, initialEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const chosenDomain = formData.primaryDomain || formData.domain || 'tech';
    const path = initialEvent ? '/api/event-registrations' : '/api/applications';
    const payload = initialEvent
      ? {
          fullName: formData.fullName,
          email: formData.email,
          rollNo: formData.rollNo,
          year: formData.year,
          eventName: initialEvent,
          primaryDomain: chosenDomain,
          domain: chosenDomain,
          secondaryDomain: formData.secondaryDomain || null,
          portfolio: formData.portfolio,
          message: formData.motivation,
        }
      : {
          fullName: formData.fullName,
          email: formData.email,
          rollNo: formData.rollNo,
          year: formData.year,
          primaryDomain: chosenDomain,
          domain: chosenDomain,
          secondaryDomain: formData.secondaryDomain || null,
          portfolio: formData.portfolio,
          motivation: formData.motivation,
        };

    try {
      const baseApi = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const primaryUrl = `${baseApi}${path}`;

      let response;
      try {
        response = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr) {
        // Fallback for local development if direct proxy is unreachable
        const isLocal = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (isLocal && !baseApi) {
          response = await fetch(`http://localhost:4000${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } else {
          throw fetchErr;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Submission failed (${response.status}). Please try again.`);
      }

      setLoading(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#20A2B1', '#173F5F', '#E6972B', '#10B981'],
        });
      } catch {}
    } catch (error) {
      console.error('Submission error:', error);
      setLoading(false);
      setErrorMessage(error.message || 'Failed to submit. Please ensure the backend server is running.');
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#20A2B1]/8 blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-[#173F5F] hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="space-y-1 pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#20A2B1]/10 text-[#20A2B1] border border-[#20A2B1]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#E6972B]" />
                <span>{initialEvent ? 'Event Registration' : 'SETU Recruitment 2026'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#173F5F]">
                {initialEvent ? initialEvent : 'Join the SETU Community'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill in your details below to apply for your desired domain track.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('')}
                    className="ml-2 text-rose-400 hover:text-rose-700 cursor-pointer font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yash Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    College Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student ID / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23BCE1042"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Academic Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors font-medium"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                  </select>
                </div>
              </div>

              {/* Primary Domain */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary Domain *
                  </label>
                  <span className="text-[10px] text-[#20A2B1] font-semibold uppercase tracking-wider">
                    Core Interest
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DOMAINS.map((d) => (
                    <button
                      type="button"
                      key={`primary-${d.id}`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          primaryDomain: d.id,
                          domain: d.id,
                          secondaryDomain: prev.secondaryDomain === d.id ? '' : prev.secondaryDomain,
                        }))
                      }
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                        (formData.primaryDomain || formData.domain) === d.id
                          ? 'bg-[#20A2B1]/15 text-[#173F5F] border-[#20A2B1] shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {d.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Domain */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Secondary Domain (Optional)
                  </label>
                  {formData.secondaryDomain && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, secondaryDomain: '' }))}
                      className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DOMAINS.map((d) => {
                    const isPrimary = (formData.primaryDomain || formData.domain) === d.id;
                    const isSelected = formData.secondaryDomain === d.id;
                    return (
                      <button
                        type="button"
                        key={`secondary-${d.id}`}
                        disabled={isPrimary}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            secondaryDomain: isSelected ? '' : d.id,
                          }))
                        }
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                          isPrimary
                            ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                            : isSelected
                            ? 'bg-[#E6972B]/15 text-[#173F5F] border-[#E6972B] shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{d.title}</span>
                          {isPrimary && (
                            <span className="text-[9px] font-normal text-slate-400">Primary</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Portfolio / GitHub / Social URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Why do you want to join SETU? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the problems you'd like to solve using tech..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#20A2B1] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#173F5F] via-[#1A5480] to-[#20A2B1] hover:shadow-xl hover:shadow-[#20A2B1]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#173F5F]">
                Application Received!
              </h3>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-[#173F5F] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
