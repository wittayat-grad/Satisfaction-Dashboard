import React, { useState } from 'react';
import { FirebaseCustomConfig } from '../types';
import { saveFirebaseConfig } from '../services/storage';
import { X, Database, Save, CheckCircle, Trash2 } from 'lucide-react';

interface FirebaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: FirebaseCustomConfig | null;
  onConfigSaved: (config: FirebaseCustomConfig | null) => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onConfigSaved,
}) => {
  const [databaseURL, setDatabaseURL] = useState(currentConfig?.databaseURL || '');
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = databaseURL.trim();
    if (!cleanUrl) {
      saveFirebaseConfig(null);
      onConfigSaved(null);
    } else {
      const newConfig: FirebaseCustomConfig = {
        databaseURL: cleanUrl,
        apiKey: apiKey.trim() || undefined,
      };
      saveFirebaseConfig(newConfig);
      onConfigSaved(newConfig);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setDatabaseURL('');
    setApiKey('');
    saveFirebaseConfig(null);
    onConfigSaved(null);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ตั้งค่า Firebase Realtime Database</h3>
              <p className="text-xs text-slate-400">เชื่อมต่อกับฐานข้อมูล Cloud ของคุณ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="py-4 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
            ระบบมี Realtime Broadcast Sync ในตัวอยู่แล้ว (ไม่ต้องตั้งค่าก็อัปเดตสดข้ามแท็บได้ทันที) หากต้องการซิงค์ข้อมูลกับ Firebase จริง ให้ใส่ Realtime Database URL ด้านล่าง
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Firebase Realtime Database URL
            </label>
            <input
              type="url"
              placeholder="https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app"
              value={databaseURL}
              onChange={(e) => setDatabaseURL(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              หาได้จาก Firebase Console &gt; Realtime Database &gt; URL ด้านบนของหน้าจอ
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              API Key (ไม่บังคับ)
            </label>
            <input
              type="text"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างการเชื่อมต่อ</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                    <span>บันทึกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>บันทึกการตั้งค่า</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
