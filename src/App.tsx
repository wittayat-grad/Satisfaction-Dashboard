import React, { useState, useEffect, useMemo } from 'react';
import {
  getStoredResponses,
  calculateDashboardSummary,
  getSavedFirebaseConfig,
} from './services/storage';
import { TRAINING_TOPIC_DEFAULT, TRAINING_ORGANIZER_DEFAULT } from './constants';
import { SurveyResponse, FirebaseCustomConfig } from './types';
import { ProjectorDashboardView } from './components/ProjectorDashboardView';
import { MobileSurveyView } from './components/MobileSurveyView';
import { StandaloneCodeView } from './components/StandaloneCodeView';
import { QRCodeModal } from './components/QRCodeModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { SURVEY_HTML_SOURCE, DASHBOARD_HTML_SOURCE } from './standaloneCode';
import { QrCode, Smartphone, Tv, SplitSquareVertical, FileCode } from 'lucide-react';

type ActiveView = 'dashboard' | 'survey' | 'split' | 'code';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [courseTitle] = useState<string>(TRAINING_TOPIC_DEFAULT);
  const [organizer] = useState<string>(TRAINING_ORGANIZER_DEFAULT);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState<boolean>(false);
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseCustomConfig | null>(null);

  // Load initial data and subscribe to realtime events
  useEffect(() => {
    setResponses(getStoredResponses());
    setFirebaseConfig(getSavedFirebaseConfig());

    const handleUpdate = () => {
      setResponses(getStoredResponses());
    };

    window.addEventListener('training_survey_updated', handleUpdate);

    let bc: BroadcastChannel | null = null;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('training_survey_realtime_sync');
        bc.onmessage = () => {
          setResponses(getStoredResponses());
        };
      }
    } catch {
      // Ignore fallback
    }

    return () => {
      window.removeEventListener('training_survey_updated', handleUpdate);
      if (bc) {
        bc.close();
      }
    };
  }, []);

  const summary = useMemo(() => calculateDashboardSummary(responses), [responses]);

  // Construct survey URL for current host
  const surveyUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/survey.html`;
    }
    return 'https://example.com/survey.html';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col antialiased">
      {/* Top Bar Contract: 3 zones separated by gap-8 (Brand - Links - Primary Action) */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand wordmark (single element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('dashboard');
          }}
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          Live Training Pulse
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-500">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
              activeView === 'dashboard'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-800'
            }`}
          >
            แดชบอร์ดโปรเจกเตอร์
          </button>
          <button
            onClick={() => setActiveView('survey')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
              activeView === 'survey'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-800'
            }`}
          >
            แบบประเมินมือถือ
          </button>
          <button
            onClick={() => setActiveView('split')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
              activeView === 'split'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-800'
            }`}
          >
            ทดสอบจอคู่สด
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
              activeView === 'code'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-800'
            }`}
          >
            คู่มือ &amp; โค้ด 2 ไฟล์
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>สแกน QR Code</span>
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar (for narrow screens) */}
      <div className="md:hidden flex items-center justify-around bg-white border-b border-slate-200 p-1 text-xs">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
            activeView === 'dashboard' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>แดชบอร์ด</span>
        </button>
        <button
          onClick={() => setActiveView('survey')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
            activeView === 'survey' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>แบบประเมิน</span>
        </button>
        <button
          onClick={() => setActiveView('split')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
            activeView === 'split' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'
          }`}
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span>จอคู่</span>
        </button>
        <button
          onClick={() => setActiveView('code')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
            activeView === 'code' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>โค้ด &amp; คู่มือ</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: Projector Dashboard */}
        {activeView === 'dashboard' && (
          <ProjectorDashboardView
            summary={summary}
            responses={responses}
            courseTitle={courseTitle}
            organizer={organizer}
            onOpenQR={() => setIsQRModalOpen(true)}
            surveyUrl={surveyUrl}
            firebaseConfig={firebaseConfig}
            onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
          />
        )}

        {/* VIEW 2: Mobile Survey */}
        {activeView === 'survey' && (
          <div className="py-6">
            <MobileSurveyView
              courseTitle={courseTitle}
              organizer={organizer}
              onGoToDashboard={() => setActiveView('dashboard')}
            />
          </div>
        )}

        {/* VIEW 3: Live Split Screen (Dual Live Test) */}
        {activeView === 'split' && (
          <div className="w-full max-w-7xl mx-auto px-4 py-6 animate-fade-in">
            <div className="mb-6 p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-0.5">
                  Interactive Live Simulator
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  โหมดทดสอบจอคู่แบบเรียลไทม์ (Live Dual View)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  ทดลองกดตอบแบบประเมินในมือถือจำลองด้านขวา เพื่อสังเกตผลคะแนนบนจอแดชบอร์ดด้านซ้ายที่อัปเดตสดทันที
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Dashboard Stream (7 cols) */}
              <div className="lg:col-span-7">
                <ProjectorDashboardView
                  summary={summary}
                  responses={responses}
                  courseTitle={courseTitle}
                  organizer={organizer}
                  onOpenQR={() => setIsQRModalOpen(true)}
                  surveyUrl={surveyUrl}
                  firebaseConfig={firebaseConfig}
                  onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
                />
              </div>

              {/* Right Column: Simulated Mobile Device Frame (5 cols) */}
              <div className="lg:col-span-5 flex justify-center sticky top-20">
                <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[32px] shadow-lg p-2.5 overflow-hidden">
                  {/* Phone Notch / Speaker bar */}
                  <div className="w-20 h-3 bg-slate-200 rounded-full mx-auto mb-2" />
                  <div className="max-h-[720px] overflow-y-auto custom-scrollbar p-1">
                    <MobileSurveyView
                      courseTitle={courseTitle}
                      organizer={organizer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: Standalone Code & Firebase Setup Guide */}
        {activeView === 'code' && (
          <StandaloneCodeView
            surveyHtmlCode={SURVEY_HTML_SOURCE}
            dashboardHtmlCode={DASHBOARD_HTML_SOURCE}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-400">
        <p>
          ระบบประเมินความพึงพอใจการอบรม &amp; Realtime Dashboard · สเกล 1-5 · Realtime Sync · QR Code &amp; CSV Export
        </p>
      </footer>

      {/* Modals */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        surveyUrl={surveyUrl}
        courseTitle={courseTitle}
      />

      <FirebaseConfigModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        currentConfig={firebaseConfig}
        onConfigSaved={(cfg) => setFirebaseConfig(cfg)}
      />
    </div>
  );
}
