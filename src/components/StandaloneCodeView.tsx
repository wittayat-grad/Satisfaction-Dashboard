import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, BookOpen } from 'lucide-react';

interface StandaloneCodeViewProps {
  surveyHtmlCode: string;
  dashboardHtmlCode: string;
}

export const StandaloneCodeView: React.FC<StandaloneCodeViewProps> = ({
  surveyHtmlCode,
  dashboardHtmlCode,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'survey' | 'dashboard'>('guide');
  const [copiedSurvey, setCopiedSurvey] = useState(false);
  const [copiedDashboard, setCopiedDashboard] = useState(false);

  const handleCopy = async (code: string, type: 'survey' | 'dashboard') => {
    try {
      await navigator.clipboard.writeText(code);
      if (type === 'survey') {
        setCopiedSurvey(true);
        setTimeout(() => setCopiedSurvey(false), 2000);
      } else {
        setCopiedDashboard(true);
        setTimeout(() => setCopiedDashboard(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleDownloadFile = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-medium text-slate-500">
              <span>STANDALONE SOURCE</span>
              <span aria-hidden="true">·</span>
              <span>HTML + JavaScript + Firebase Realtime Database</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              โค้ด 2 ไฟล์แยก และคู่มือติดตั้ง Firebase ทีละขั้นตอน
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              โค้ด HTML + JS แบบสมบูรณ์ในไฟล์เดียว สามารถเปิดใช้งานได้ทันทีโดยไม่ต้องติดตั้ง Node.js หรือคอมไพล์โค้ด
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadFile(surveyHtmlCode, 'survey.html')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>โหลด survey.html</span>
            </button>
            <button
              onClick={() => handleDownloadFile(dashboardHtmlCode, 'dashboard.html')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>โหลด dashboard.html</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-slate-100 flex-wrap">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>คู่มือติดตั้ง Firebase &amp; Deploy (ทีละขั้น)</span>
          </button>
          <button
            onClick={() => setActiveTab('survey')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'survey'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>ไฟล์ 1: survey.html (หน้าตอบผู้เข้าอบรม)</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>ไฟล์ 2: dashboard.html (หน้าจอโปรเจกเตอร์)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Step-by-Step Guide */}
      {activeTab === 'guide' && (
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ขั้นตอนที่ 1: สร้างโปรเจกต์ Firebase (ฟรี Spark Plan)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Firebase มีแพ็กเกจฟรี (Spark Plan) ไม่ต้องกรอกบัตรเครดิต รองรับการใช้งานพร้อมกัน 100 การเชื่อมต่อพร้อมกัน
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-0 sm:pl-10 text-xs sm:text-sm text-slate-600">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <p>1.1 เข้าไปที่เว็บไซต์ <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-slate-900 underline font-medium">console.firebase.google.com</a> แล้วล็อกอินด้วยบัญชี Google</p>
                <p>1.2 คลิกปุ่ม <strong className="text-slate-900">"Create a project"</strong> หรือ "Add project"</p>
                <p>1.3 ตั้งชื่อโปรเจกต์ เช่น <code className="px-1.5 py-0.5 bg-slate-200/70 rounded text-slate-800 font-mono text-xs">training-survey-live</code> แล้วคลิก Continue</p>
                <p>1.4 Google Analytics สามารถเลือกเปิดหรือปิดก็ได้ จากนั้นกด <strong className="text-slate-900">"Create project"</strong></p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ขั้นตอนที่ 2: เปิดใช้งาน Realtime Database
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  เลือกประเภท Realtime Database (ไม่ใช่ Cloud Firestore) เพื่อให้รองรับการเชื่อมต่อตรงแบบ Realtime จากหน้าเว็บ
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-0 sm:pl-10 text-xs sm:text-sm text-slate-600">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <p>2.1 ในเมนูด้านซ้าย ให้คลิกที่ <strong className="text-slate-900">Build &gt; Realtime Database</strong></p>
                <p>2.2 คลิกปุ่ม <strong className="text-slate-900">"Create Database"</strong></p>
                <p>2.3 ในช่อง <strong className="text-slate-900">Realtime Database Location</strong> แนะนำให้เลือก <code className="px-1.5 py-0.5 bg-slate-200/70 rounded text-slate-800 font-mono text-xs">Singapore (asia-southeast1)</code> เพื่อความเร็วสูงสุดในประเทศไทย</p>
                <p>2.4 ในหน้า Security Rules เลือก <strong className="text-slate-900">"Start in test mode"</strong> แล้วกด Enable</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ขั้นตอนที่ 3: ตั้งค่า Security Rules (ให้อ่าน-เขียนได้โดยไม่ต้องล็อกอิน)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  เพื่อให้ผู้เข้าอบรมสามารถส่งคะแนนได้ทันทีโดยไม่ต้องสร้างบัญชีผู้ใช้
                </p>
              </div>
            </div>

            <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-slate-600 space-y-2.5">
              <p>ในหน้า Realtime Database ให้คลิกแท็บ <strong className="text-slate-900">"Rules"</strong> ด้านบน และวางโค้ดต่อไปนี้:</p>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-200 overflow-x-auto">
{`{
  "rules": {
    "evaluations": {
      ".read": true,
      ".write": true
    }
  }
}`}
              </div>
              <p className="text-slate-500 text-xs">จากนั้นกดปุ่ม <strong className="text-slate-900">"Publish"</strong> เพื่อบันทึกกฎ</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ขั้นตอนที่ 4: คัดลอก firebaseConfig มาใส่ในโค้ด
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  นำค่า Config มาวางแทนที่ <code className="text-slate-800 font-mono">firebaseConfig</code> ในทั้ง 2 ไฟล์ (<code className="text-slate-800">survey.html</code> และ <code className="text-slate-800">dashboard.html</code>)
                </p>
              </div>
            </div>

            <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-slate-600 space-y-2">
              <p>4.1 คลิกรูปฟันเฟือง <strong className="text-slate-900">Project Settings</strong> (มุมซ้ายบนข้าง Project Overview)</p>
              <p>4.2 เลื่อนลงมาที่หัวข้อ <strong>"Your apps"</strong> แล้วคลิกไอคอนเว็บ <strong className="text-slate-900">&lt;/&gt; (Web)</strong></p>
              <p>4.3 ตั้งชื่อเล่นแอป เช่น <code className="px-1.5 py-0.5 bg-slate-200/70 rounded text-slate-800 font-mono text-xs">survey-web</code> แล้วกด Register app</p>
              <p>4.4 คัดลอกก้อนโค้ด <code className="text-slate-800 font-mono">const firebaseConfig = &#123; ... &#125;;</code> นำค่านั้นมาวางทับในโค้ดทั้งสองไฟล์</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                5
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  ขั้นตอนที่ 5: วิธี Deploy ออนไลน์ฟรี (3 ทางเลือกที่ง่ายที่สุด)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  เลือกวิธีที่คุณสะดวกที่สุดเพื่อสร้าง URL ให้ผู้เข้าอบรมสแกน
                </p>
              </div>
            </div>

            <div className="pl-0 sm:pl-10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 text-xs block">ทางเลือก A: GitHub Pages (ง่ายสุด)</span>
                <p>1. สร้าง Repository ใหม่บน GitHub</p>
                <p>2. อัปโหลดไฟล์ <code className="text-slate-800">survey.html</code> (หรือเปลี่ยนชื่อเป็น index.html) และ <code className="text-slate-800">dashboard.html</code></p>
                <p>3. ไปที่ <strong>Settings &gt; Pages</strong> เลือก Branch เป็น <strong>main</strong> แล้วกด Save</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 text-xs block">ทางเลือก B: Firebase Hosting</span>
                <p>1. ติดตั้ง Firebase CLI: <code className="text-slate-800 font-mono text-[11px]">npm i -g firebase-tools</code></p>
                <p>2. พิมพ์คำสั่ง <code className="text-slate-800 font-mono text-[11px]">firebase login</code></p>
                <p>3. รัน <code className="text-slate-800 font-mono text-[11px]">firebase deploy</code> จะได้ URL เว็บทันที</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 text-xs block">ทางเลือก C: Netlify Drop</span>
                <p>1. เข้า <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-slate-900 underline">app.netlify.com/drop</a></p>
                <p>2. ลากโฟลเดอร์ที่มีไฟล์ทั้ง 2 ไปวางในเบราว์เซอร์</p>
                <p>3. รอ 10 วินาที ระบบจะออก URL ให้ทันทีฟรี</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: survey.html Code */}
      {activeTab === 'survey' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-slate-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">survey.html</span>
              <span className="text-xs text-slate-500 hidden sm:inline">(หน้าแบบประเมินสำหรับมือถือ)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(surveyHtmlCode, 'survey')}
                className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-md transition-colors cursor-pointer border border-slate-200"
              >
                {copiedSurvey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedSurvey ? 'คัดลอกแล้ว' : 'คัดลอกโค้ด'}</span>
              </button>
              <button
                onClick={() => handleDownloadFile(surveyHtmlCode, 'survey.html')}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลดไฟล์</span>
              </button>
            </div>
          </div>
          <div className="p-4 max-h-[600px] overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
            <pre><code>{surveyHtmlCode}</code></pre>
          </div>
        </div>
      )}

      {/* Tab 3: dashboard.html Code */}
      {activeTab === 'dashboard' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-slate-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">dashboard.html</span>
              <span className="text-xs text-slate-500 hidden sm:inline">(หน้าจอแสดงผล Dashboard สำหรับโปรเจกเตอร์)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(dashboardHtmlCode, 'dashboard')}
                className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-md transition-colors cursor-pointer border border-slate-200"
              >
                {copiedDashboard ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedDashboard ? 'คัดลอกแล้ว' : 'คัดลอกโค้ด'}</span>
              </button>
              <button
                onClick={() => handleDownloadFile(dashboardHtmlCode, 'dashboard.html')}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลดไฟล์</span>
              </button>
            </div>
          </div>
          <div className="p-4 max-h-[600px] overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
            <pre><code>{dashboardHtmlCode}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};
