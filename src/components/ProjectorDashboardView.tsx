import React, { useState } from 'react';
import { DashboardSummary, SurveyResponse, FirebaseCustomConfig } from '../types';
import { exportResponsesToCSV, submitSurveyResponse, clearAllResponses, resetToSeedResponses } from '../services/storage';
import {
  Users,
  Award,
  TrendingUp,
  Download,
  QrCode,
  Maximize2,
  Minimize2,
  Database,
  Trash2,
  Plus,
  MessageSquare,
  Sparkles,
  Info,
} from 'lucide-react';

interface ProjectorDashboardViewProps {
  summary: DashboardSummary;
  responses: SurveyResponse[];
  courseTitle: string;
  organizer: string;
  onOpenQR: () => void;
  surveyUrl: string;
  firebaseConfig: FirebaseCustomConfig | null;
  onOpenFirebaseConfig: () => void;
}

export const ProjectorDashboardView: React.FC<ProjectorDashboardViewProps> = ({
  summary,
  responses,
  courseTitle,
  organizer,
  onOpenQR,
  surveyUrl,
  firebaseConfig,
  onOpenFirebaseConfig,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'high' | 'improvement'>('all');
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Add random simulated participant response for live demo
  const handleSimulateResponse = async (count: number = 1) => {
    setIsSimulating(true);
    const sampleFeedbacks = [
      'เข้าใจหัวข้อนี้ชัดเจนขึ้นมาก ได้เครื่องมือใหม่ไปใช้กับทีมทันที',
      'วิทยากรตอบคำถามได้ตรงจุด บรรยากาศเป็นกันเองมากครับ',
      'สไลด์สรุปเนื้อหาได้กระชับ ทบทวนง่าย',
      'อยากให้จัดสัมมนาแบบนี้บ่อยๆ ครับ ประทับใจมาก',
      'ถ้ามีตัวอย่างกรณีศึกษาขององค์กรขนาดใหญ่เพิ่มจะสมบูรณ์แบบมากยิ่งขึ้นค่ะ',
      'อุปกรณ์และการประสานงานของทีมงานดีเยี่ยม ขอบคุณมากครับ',
      'ความรู้ที่ได้คุ้มค่ากับเวลาที่มาอบรมมากๆ ครับ',
    ];

    for (let i = 0; i < count; i++) {
      const scores: Record<number, number> = {
        1: Math.random() > 0.15 ? 5 : 4,
        2: Math.random() > 0.25 ? 5 : Math.random() > 0.1 ? 4 : 3,
        3: Math.random() > 0.2 ? 5 : 4,
        4: Math.random() > 0.3 ? 5 : Math.random() > 0.1 ? 4 : 3,
        5: Math.random() > 0.1 ? 5 : 4,
      };
      const text = Math.random() > 0.3 ? sampleFeedbacks[Math.floor(Math.random() * sampleFeedbacks.length)] : undefined;
      await submitSurveyResponse(scores, text, firebaseConfig);
    }
    setIsSimulating(false);
  };

  const filteredFeedbacks = summary.recentFeedbacks.filter((fb) => {
    if (feedbackFilter === 'high') return fb.averageScore >= 4.5;
    if (feedbackFilter === 'improvement') return fb.averageScore < 4.5;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          {/* Metadata clean unboxed */}
          <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 font-medium flex-wrap">
            <span className="text-emerald-700 font-semibold">LIVE DASHBOARD</span>
            <span aria-hidden="true">·</span>
            <span>{organizer}</span>
            {firebaseConfig?.databaseURL && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600 font-mono text-[11px] flex items-center gap-1">
                  <Database className="w-3 h-3 text-slate-400" />
                  Firebase Realtime DB
                </span>
              </>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {courseTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ผลการประเมินความพึงพอใจและข้อเสนอแนะของผู้เข้าอบรม (อัปเดตอัตโนมัติแบบเรียลไทม์)
          </p>
        </div>

        {/* Presenter Action Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          <button
            onClick={onOpenQR}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <QrCode className="w-4 h-4" />
            <span>ฉาย QR Code บนจอ</span>
          </button>

          <button
            onClick={() => exportResponsesToCSV(responses, courseTitle)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            title="ดาวน์โหลดข้อมูลเป็นไฟล์ Excel / CSV พร้อมสูตรและค่าเฉลี่ย"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>ดาวน์โหลด CSV</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90 rounded-xl transition-colors cursor-pointer shadow-xs"
            title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'เปิดโหมดเต็มจอ (สำหรับฉายโปรเจกเตอร์)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Presenter Simulation tools */}
          <div className="flex items-center gap-1 pl-1.5 border-l border-slate-200">
            <button
              onClick={() => handleSimulateResponse(1)}
              disabled={isSimulating}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="จำลองคนตอบเพิ่ม +1 คน เพื่อทดสอบการอัปเดตแบบเรียลไทม์"
            >
              <Plus className="w-3 h-3 inline mr-0.5 text-slate-500" />
              +1 สุ่ม
            </button>
            <button
              onClick={() => handleSimulateResponse(5)}
              disabled={isSimulating}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="จำลองคนตอบเพิ่ม +5 คน เพื่อดูการคำนวณสถิติ"
            >
              +5 สุ่ม
            </button>
            <button
              onClick={onOpenFirebaseConfig}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
              title="ตั้งค่าเชื่อมต่อ Firebase Realtime Database"
            >
              <Database className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 High-Impact KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Metric 1: Total Respondents */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              จำนวนผู้ตอบแบบสอบถาม
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">
              {summary.totalResponses}
            </span>
            <span className="text-sm font-medium text-slate-500">คน</span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>สถานะระบบ</span>
            <span className="font-medium text-slate-700">อัปเดตแบบเรียลไทม์</span>
          </div>
        </div>

        {/* Metric 2: Overall Score */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              คะแนนเฉลี่ยรวมทั้งสิ้น
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">
              {summary.overallAverage > 0 ? summary.overallAverage.toFixed(2) : '0.00'}
            </span>
            <span className="text-sm font-medium text-slate-500">/ 5.00 คะแนน</span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>คิดเป็นร้อยละ</span>
            <span className="font-mono font-semibold text-slate-900">
              {summary.overallAverage > 0 ? ((summary.overallAverage / 5) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>

        {/* Metric 3: Satisfaction Tier Level */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              ระดับความพึงพอใจ
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-1">
            <span className={`text-2xl sm:text-3xl font-extrabold ${summary.overallTier.badgeClass}`}>
              {summary.totalResponses > 0 ? summary.overallTier.label : 'ยังไม่มีข้อมูล'}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              {summary.totalResponses > 0 ? summary.overallTier.description : 'รอผู้เข้าอบรมสแกน QR Code เพื่อประเมิน'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>เกณฑ์การประเมิน</span>
            <span className="text-slate-700 font-medium">Likert Scale 5 ระดับ</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Charts (65%) | Right Feedback & QR (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Bar Graphs (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  ค่าเฉลี่ยความพึงพอใจรายข้อ (สเกล 1 - 5)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  คำนวณจากผู้ส่งคำตอบทั้งหมด {summary.totalResponses} คน
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400 hidden sm:inline-block">
                คะแนนเต็ม 5.00
              </span>
            </div>

            {/* Questions List with Sleek Horizontal Progress */}
            <div className="space-y-4">
              {summary.questionStats.map((stat, idx) => {
                const percentage = Math.min(100, Math.max(0, (stat.average / 5) * 100));

                return (
                  <div key={stat.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-100 hover:border-slate-200/80 transition-colors">
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          ข้อ {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {stat.category}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {stat.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                          {stat.average > 0 ? stat.average.toFixed(2) : '0.00'}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${stat.tier.bgLight}`}>
                          {stat.average > 0 ? stat.tier.label : '-'}
                        </span>
                      </div>
                    </div>

                    {/* Clean Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-slate-900"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Score Distribution: Clean unboxed typography (zero-pill discipline) */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 font-mono">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-slate-400 font-sans">การกระจาย:</span>
                        <span>5★ {stat.distribution[5]}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>4★ {stat.distribution[4]}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>3★ {stat.distribution[3]}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>2★ {stat.distribution[2]}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>1★ {stat.distribution[1]}</span>
                      </div>
                      <span className="text-slate-400 hidden sm:inline font-sans">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Likert Scale Legend Table */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>เกณฑ์การแปลผลคะแนนเฉลี่ย (Likert 5 ระดับ)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-800 font-bold block">4.51 - 5.00</span>
                  <span className="text-emerald-700 font-medium">มากที่สุด</span>
                </div>
                <div className="p-2.5 rounded-lg bg-sky-50/60 border border-sky-100">
                  <span className="text-sky-800 font-bold block">3.51 - 4.50</span>
                  <span className="text-sky-700 font-medium">มาก</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                  <span className="text-amber-800 font-bold block">2.51 - 3.50</span>
                  <span className="text-amber-700 font-medium">ปานกลาง</span>
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100">
                  <span className="text-orange-800 font-bold block">1.51 - 2.50</span>
                  <span className="text-orange-700 font-medium">น้อย</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100">
                  <span className="text-rose-800 font-bold block">1.00 - 1.50</span>
                  <span className="text-rose-700 font-medium">น้อยที่สุด</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback List & QR Code Side-Widget (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* QR Code Quick Scan Widget for Auditorium Attendees */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div
              onClick={onOpenQR}
              className="w-22 h-22 bg-white p-1.5 rounded-xl shrink-0 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center border border-slate-200"
              title="คลิกเพื่อขยาย QR Code เต็มจอ"
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(surveyUrl)}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-medium text-slate-500 block mb-0.5">
                สแกนร่วมตอบ
              </span>
              <h3 className="text-sm font-bold text-slate-900 truncate">
                สแกนทำแบบสอบถาม
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                เปิดกล้องมือถือสแกน QR Code เพื่อให้คะแนนทันที
              </p>
              <button
                onClick={onOpenQR}
                className="mt-2 text-xs font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <span>ขยายเต็มจอ</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Feedback List Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ข้อเสนอแนะล่าสุด
                </h3>
                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {summary.recentFeedbacks.length}
                </span>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-3">
              <button
                onClick={() => setFeedbackFilter('all')}
                className={`flex-1 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  feedbackFilter === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ทั้งหมด ({summary.recentFeedbacks.length})
              </button>
              <button
                onClick={() => setFeedbackFilter('high')}
                className={`flex-1 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  feedbackFilter === 'high'
                    ? 'bg-white text-emerald-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ประทับใจ
              </button>
              <button
                onClick={() => setFeedbackFilter('improvement')}
                className={`flex-1 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  feedbackFilter === 'improvement'
                    ? 'bg-white text-amber-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                เพื่อพัฒนา
              </button>
            </div>

            {/* Scrollable Feedback Cards */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {filteredFeedbacks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <MessageSquare className="w-7 h-7 mb-2 opacity-30" />
                  <p className="text-sm font-medium">ยังไม่มีข้อเสนอแนะในหมวดนี้</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ข้อเสนอแนะที่พิมพ์โดยผู้เข้าอบรมจะแสดงขึ้นที่นี่ทันที
                  </p>
                </div>
              ) : (
                filteredFeedbacks.map((fb) => {
                  const minutesAgo = Math.max(1, Math.round((Date.now() - fb.timestamp) / (1000 * 60)));
                  const timeLabel = minutesAgo < 60 ? `${minutesAgo} นาทีที่แล้ว` : `${Math.round(minutesAgo / 60)} ชม. ที่แล้ว`;

                  return (
                    <div
                      key={fb.id}
                      className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1 text-[11px] text-slate-500 font-mono">
                        <span>{timeLabel}</span>
                        <span className="font-semibold text-amber-700">★ {fb.averageScore}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words font-sans">
                        "{fb.text}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Actions for Presenter */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => {
                  if (confirm('คุณต้องการรีเซ็ตข้อมูลเป็นชุดตัวอย่างเริ่มต้นหรือไม่?')) {
                    resetToSeedResponses();
                  }
                }}
                className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <span>โหลดข้อมูลตัวอย่าง</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('คำเตือน: คุณต้องการล้างข้อมูลคำตอบทั้งหมดเพื่อเริ่มรอบใหม่ใช่หรือไม่?')) {
                    clearAllResponses();
                  }
                }}
                className="hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>ล้างข้อมูลเริ่มใหม่</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
