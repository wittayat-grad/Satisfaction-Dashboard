import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUESTIONS, RATING_LEVELS } from '../constants';
import {
  hasSubmittedOnThisDevice,
  submitSurveyResponse,
  resetDeviceSubmission,
  getSavedFirebaseConfig,
} from '../services/storage';
import { CheckCircle2, Send, Sparkles, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';

interface MobileSurveyViewProps {
  courseTitle: string;
  organizer: string;
  onGoToDashboard?: () => void;
}

export const MobileSurveyView: React.FC<MobileSurveyViewProps> = ({
  courseTitle,
  organizer,
  onGoToDashboard,
}) => {
  const [scores, setScores] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsSubmitted(hasSubmittedOnThisDevice());
  }, []);

  const handleScoreSelect = (questionId: number, score: number) => {
    setScores((prev) => ({
      ...prev,
      [questionId]: score,
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all 5 questions are answered
    const unanswered = QUESTIONS.filter((q) => !scores[q.id]);
    if (unanswered.length > 0) {
      setErrorMessage(`กรุณาตอบแบบประเมินให้ครบทั้ง ${QUESTIONS.length} ข้อ (ขาดข้อ ${unanswered.map((q) => q.id).join(', ')})`);
      const firstEl = document.getElementById(`question-card-${unanswered[0].id}`);
      if (firstEl) {
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const fbConfig = getSavedFirebaseConfig();
      await submitSurveyResponse(scores, feedback, fbConfig);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0f172a', '#059669', '#0284c7', '#d97706'],
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed', err);
      setErrorMessage('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForTesting = () => {
    resetDeviceSubmission();
    setIsSubmitted(false);
    setScores({});
    setFeedback('');
    setErrorMessage('');
  };

  // If already submitted on this device
  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto py-8 px-4 animate-fade-in">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-0.5 rounded-full inline-block mb-2.5">
            บันทึกคำตอบเรียบร้อยแล้ว
          </span>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            ขอขอบพระคุณสำหรับความคิดเห็น
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            ข้อมูลการประเมินของคุณถูกส่งไปยังหน้า Dashboard แบบเรียลไทม์แล้ว เพื่อนำไปพัฒนาและปรับปรุงหลักสูตรให้ดียิ่งขึ้นต่อไป
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 text-left">
            <p className="text-xs text-slate-400 mb-0.5">หัวข้อการอบรม</p>
            <p className="text-sm font-semibold text-slate-800">{courseTitle}</p>
            <p className="text-xs text-slate-500 mt-1">จัดโดย {organizer}</p>
          </div>

          <div className="space-y-2.5">
            {onGoToDashboard && (
              <button
                onClick={onGoToDashboard}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>ดูผลลัพธ์บนจอ Dashboard</span>
              </button>
            )}

            <button
              onClick={handleResetForTesting}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-600 font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>ทำแบบสอบถามใหม่อีกครั้ง (โหมดทดสอบ)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(scores).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto pb-16 px-3 sm:px-4">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-4 shadow-xs">
        <div>
          <div className="flex items-center justify-between mb-2 text-xs text-slate-500 font-medium">
            <span>แบบประเมินความพึงพอใจ</span>
            {onGoToDashboard && (
              <button
                onClick={onGoToDashboard}
                className="text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>ดู Dashboard</span>
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </button>
            )}
          </div>

          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {courseTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            จัดโดย {organizer} · ใช้เวลาประมาณ 1 นาที
          </p>

          {/* Progress bar */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
              <span>ความคืบหน้าการตอบ</span>
              <span className="font-mono text-slate-900">{answeredCount} จาก {QUESTIONS.length} ข้อ ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error alert if validation failed */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Survey Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {QUESTIONS.map((question, idx) => {
          const currentScore = scores[question.id];
          const isAnswered = Boolean(currentScore);

          return (
            <div
              key={question.id}
              id={`question-card-${question.id}`}
              className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors ${
                isAnswered
                  ? 'border-slate-300 shadow-xs'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-2.5">
                <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                    {question.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                    {question.title}
                  </h3>
                  {question.description && (
                    <p className="text-xs text-slate-500 mt-1">
                      {question.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 5-Level Rating Buttons - Touch friendly (>=48px height) */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3.5">
                {RATING_LEVELS.map((item) => {
                  const isSelected = currentScore === item.score;
                  return (
                    <button
                      key={item.score}
                      type="button"
                      onClick={() => handleScoreSelect(question.id, item.score)}
                      className={`min-h-[52px] sm:min-h-[56px] p-1.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold ring-2 ring-slate-900 shadow-xs scale-[1.02]'
                          : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border border-slate-200/80 active:scale-95'
                      }`}
                    >
                      <span className="text-sm sm:text-base mb-0.5">{item.emoji}</span>
                      <span className="text-xs sm:text-sm font-bold font-mono">
                        {item.score}
                      </span>
                      <span
                        className={`text-[10px] leading-none mt-0.5 truncate max-w-full font-medium ${
                          isSelected ? 'text-slate-200 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {currentScore && (
                <div className="mt-2 text-right">
                  <span className="text-xs text-slate-600 font-medium">
                    เลือกระดับ: {RATING_LEVELS.find((l) => l.score === currentScore)?.label} ({currentScore} คะแนน)
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Suggestion Textarea */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <label htmlFor="feedback" className="block text-sm font-semibold text-slate-900 mb-0.5">
            ข้อเสนอแนะเพิ่มเติม / ความคิดเห็นสำหรับการจัดครั้งต่อไป
          </label>
          <p className="text-xs text-slate-500 mb-2.5">
            (ไม่บังคับ - สามารถระบุสิ่งที่ประทับใจ หรือสิ่งที่ต้องการให้ปรับปรุงได้ตามต้องการ)
          </p>
          <textarea
            id="feedback"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="เช่น วิทยากรอธิบายเข้าใจง่ายมาก, มีตัวอย่างที่นำไปใช้ได้ทันที..."
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 sticky bottom-4 z-20">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors ${
              answeredCount === QUESTIONS.length
                ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.99]'
                : 'bg-slate-200 text-slate-500 border border-slate-200'
            }`}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>กำลังบันทึกข้อมูล...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>
                  ส่งแบบประเมิน ({answeredCount}/{QUESTIONS.length} ข้อ)
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
