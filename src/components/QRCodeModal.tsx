import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ExternalLink, X, QrCode as QrIcon, Maximize2, Minimize2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyUrl: string;
  courseTitle: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, surveyUrl, courseTitle }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    if (surveyUrl) {
      QRCode.toDataURL(surveyUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code', err));
    }
  }, [surveyUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(surveyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div
        className={`bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
          isBigScreen
            ? 'w-full max-w-4xl h-[90vh] p-8 justify-between'
            : 'w-full max-w-md p-6'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <QrIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">QR Code สำหรับผู้เข้าอบรม</h3>
              <p className="text-xs text-slate-400">สแกนเพื่อร่วมตอบแบบสอบถาม</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsBigScreen(!isBigScreen)}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={isBigScreen ? 'ย่อหน้าต่าง' : 'ขยายเต็มจอสำหรับโปรเจกเตอร์'}
            >
              {isBigScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="ปิด"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center my-auto py-5">
          <div className="mb-4 max-w-sm">
            <p className="text-xs text-slate-400 font-medium mb-1">หัวข้อการอบรม</p>
            <p className="text-sm font-semibold text-slate-800 line-clamp-2">{courseTitle}</p>
          </div>

          {/* QR Code Container */}
          <div className={`p-4 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all ${
            isBigScreen ? 'w-80 h-80 sm:w-96 sm:h-96' : 'w-56 h-56'
          }`}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Survey QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                กำลังสร้าง QR Code...
              </div>
            )}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-700 font-medium">
            เปิดกล้องมือถือสแกนเพื่อทำแบบสอบถามได้ทันที
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            ไม่ต้องลงแอป ไม่ต้องล็อกอิน รองรับทั้ง iOS และ Android
          </p>
        </div>

        {/* Footer Link & Action */}
        <div className="pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full sm:flex-1 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600 font-mono truncate select-all">
            {surveyUrl}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอกลิงก์'}</span>
            </button>
            <a
              href={surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <span>เปิดดู</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
