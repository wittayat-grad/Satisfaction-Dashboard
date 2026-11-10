import { Question, RatingTier, SurveyResponse } from './types';

export const TRAINING_TOPIC_DEFAULT = 'การอบรมเชิงปฏิบัติการ: การประยุกต์ใช้ AI ในการทำงานยุคใหม่';
export const TRAINING_ORGANIZER_DEFAULT = 'สถาบันพัฒนาบุคลากรดิจิทัล';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'ความรู้ความเชี่ยวชาญ และความสามารถในการถ่ายทอดของวิทยากร',
    category: 'ด้านวิทยากร',
    description: 'วิทยากรอธิบายเข้าใจง่าย ตอบข้อซักถามได้ชัดเจน และตรงประเด็น',
  },
  {
    id: 2,
    title: 'ความชัดเจน ความทันสมัย และประโยชน์ของเนื้อหาหลักสูตร',
    category: 'ด้านเนื้อหา',
    description: 'เนื้อหามีความกระชับ เป็นลำดับขั้นตอน และตอบโจทย์การใช้งานจริง',
  },
  {
    id: 3,
    title: 'บรรยากาศ การจัดกิจกรรม และการมีส่วนร่วมในห้องอบรม',
    category: 'ด้านบรรยากาศ',
    description: 'เปิดโอกาสให้ซักถาม แลกเปลี่ยนความคิดเห็น และทำแบบฝึกหัดอย่างทั่วถึง',
  },
  {
    id: 4,
    title: 'ความพร้อมของสื่อ เอกสาร และอุปกรณ์ในการจัดอบรม',
    category: 'ด้านสื่ออุปกรณ์',
    description: 'สไลด์ประกอบ สื่อการสอน ระบบภาพ/เสียง และสัญญาณอินเทอร์เน็ต',
  },
  {
    id: 5,
    title: 'ความคุ้มค่าและความพร้อมในการนำความรู้ไปประยุกต์ใช้จริง',
    category: 'ด้านการนำไปใช้',
    description: 'สามารถนำเทคนิคหรือแนวคิดที่ได้รับไปต่อยอดในการทำงานได้ทันที',
  },
];

export const RATING_LEVELS: { score: number; label: string; shortLabel: string; emoji: string; color: string }[] = [
  { score: 5, label: 'มากที่สุด', shortLabel: 'ดีเยี่ยม', emoji: '🌟', color: '#059669' }, // emerald-600
  { score: 4, label: 'มาก', shortLabel: 'ดี', emoji: '👍', color: '#0284c7' }, // sky-600
  { score: 3, label: 'ปานกลาง', shortLabel: 'พอใช้', emoji: '👌', color: '#d97706' }, // amber-600
  { score: 2, label: 'น้อย', shortLabel: 'น้อย', emoji: '⚠️', color: '#ea580c' }, // orange-600
  { score: 1, label: 'น้อยที่สุด', shortLabel: 'ปรับปรุง', emoji: '❌', color: '#dc2626' }, // red-600
];

export const RATING_TIERS: RatingTier[] = [
  {
    min: 4.51,
    max: 5.0,
    label: 'มากที่สุด',
    color: '#059669',
    bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeClass: 'text-emerald-700 font-bold',
    description: 'ความพึงพอใจอยู่ในระดับดีเลิศ เกินความคาดหมาย',
  },
  {
    min: 3.51,
    max: 4.5,
    label: 'มาก',
    color: '#0284c7',
    bgLight: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeClass: 'text-sky-700 font-bold',
    description: 'ความพึงพอใจอยู่ในเกณฑ์ดี มีมาตรฐานเป็นที่น่าประทับใจ',
  },
  {
    min: 2.51,
    max: 3.5,
    label: 'ปานกลาง',
    color: '#d97706',
    bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeClass: 'text-amber-700 font-bold',
    description: 'ความพึงพอใจอยู่ในเกณฑ์ปานกลาง พอใช้ได้ตามมาตรฐาน',
  },
  {
    min: 1.51,
    max: 2.5,
    label: 'น้อย',
    color: '#ea580c',
    bgLight: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeClass: 'text-orange-700 font-bold',
    description: 'ควรนำข้อคิดเห็นไปปรับปรุงพัฒนาในครั้งถัดไป',
  },
  {
    min: 1.0,
    max: 1.5,
    label: 'น้อยที่สุด',
    color: '#dc2626',
    bgLight: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeClass: 'text-rose-700 font-bold',
    description: 'จำเป็นต้องทบทวนรูปแบบและเนื้อหาอย่างเร่งด่วน',
  },
];

export function getTierFromScore(score: number): RatingTier {
  if (score <= 0) return RATING_TIERS[2]; // fallback neutral
  for (const tier of RATING_TIERS) {
    if (score >= tier.min && score <= tier.max) {
      return tier;
    }
  }
  if (score > 5.0) return RATING_TIERS[0];
  return RATING_TIERS[RATING_TIERS.length - 1];
}

// Initial realistic responses for instant preview and presentation demonstration
export const INITIAL_SEED_RESPONSES: SurveyResponse[] = [
  {
    id: 'seed-01',
    timestamp: Date.now() - 1000 * 60 * 25,
    scores: { 1: 5, 2: 5, 3: 4, 4: 5, 5: 5 },
    feedback: 'วิทยากรถ่ายทอดได้สนุกและเข้าใจง่ายมาก มีตัวอย่างที่นำไปใช้ได้จริงทันทีครับ',
    deviceId: 'device-seed-1',
  },
  {
    id: 'seed-02',
    timestamp: Date.now() - 1000 * 60 * 21,
    scores: { 1: 5, 2: 4, 3: 5, 4: 4, 5: 5 },
    feedback: 'อยากให้มีคอร์สระดับ Advanced ต่อไปอีกครับ เนื้อหาวันนี้มีประโยชน์มาก',
    deviceId: 'device-seed-2',
  },
  {
    id: 'seed-03',
    timestamp: Date.now() - 1000 * 60 * 18,
    scores: { 1: 4, 2: 5, 3: 4, 4: 4, 5: 4 },
    feedback: 'เอกสารประกอบการบรรยายทำมาดีมาก ชัดเจน โหลดสไลด์เก็บไว้ทบทวนได้สะดวก',
    deviceId: 'device-seed-3',
  },
  {
    id: 'seed-04',
    timestamp: Date.now() - 1000 * 60 * 15,
    scores: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
    feedback: 'ประทับใจเวิร์กช็อปช่วงบ่าย ได้ลงมือทำจริงแล้วเห็นภาพชัดเจนเลยค่ะ',
    deviceId: 'device-seed-4',
  },
  {
    id: 'seed-05',
    timestamp: Date.now() - 1000 * 60 * 12,
    scores: { 1: 4, 2: 4, 3: 3, 4: 4, 5: 4 },
    feedback: 'อยากให้เพิ่มเวลาทำ Workshop อีกนิดหน่อยครับ รู้สึกเวลาน้อยไปนิด',
    deviceId: 'device-seed-5',
  },
  {
    id: 'seed-06',
    timestamp: Date.now() - 1000 * 60 * 8,
    scores: { 1: 5, 2: 4, 3: 4, 4: 5, 5: 4 },
    feedback: 'สถานที่และอุปกรณ์สะดวกสบายมาก อาหารว่างอร่อย ทีมงานดูแลดีมากค่ะ',
    deviceId: 'device-seed-6',
  },
  {
    id: 'seed-07',
    timestamp: Date.now() - 1000 * 60 * 5,
    scores: { 1: 5, 2: 5, 3: 5, 4: 4, 5: 5 },
    feedback: 'ช่วยตอบโจทย์งานประจำที่ต้องทำซ้ำๆ ได้เยอะมาก คุ้มค่าที่ได้มาเรียนครับ',
    deviceId: 'device-seed-7',
  },
  {
    id: 'seed-08',
    timestamp: Date.now() - 1000 * 60 * 2,
    scores: { 1: 5, 2: 5, 3: 4, 4: 5, 5: 5 },
    feedback: 'ขอบคุณวิทยากรและทีมงานที่จัดอบรมดีๆ แบบนี้ ขอติดตามรุ่นต่อๆ ไปครับ',
    deviceId: 'device-seed-8',
  },
];
