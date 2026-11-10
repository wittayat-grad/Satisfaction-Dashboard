import { DashboardSummary, FirebaseCustomConfig, QuestionStat, SurveyResponse } from '../types';
import { INITIAL_SEED_RESPONSES, QUESTIONS, getTierFromScore } from '../constants';

const STORAGE_KEY = 'training_survey_responses_v1';
const DEVICE_SUBMITTED_KEY = 'training_survey_device_submitted_v1';
const FIREBASE_CONFIG_KEY = 'training_survey_firebase_cfg_v1';
const BROADCAST_CHANNEL_NAME = 'training_survey_realtime_sync';

// Get or initialize device ID
export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem('training_survey_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem('training_survey_device_id', id);
  }
  return id;
}

// Check if current device has submitted
export function hasSubmittedOnThisDevice(): boolean {
  return localStorage.getItem(DEVICE_SUBMITTED_KEY) === 'true';
}

export function markDeviceAsSubmitted(): void {
  localStorage.setItem(DEVICE_SUBMITTED_KEY, 'true');
}

export function resetDeviceSubmission(): void {
  localStorage.removeItem(DEVICE_SUBMITTED_KEY);
}

// Load responses
export function getStoredResponses(): SurveyResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with seed responses if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_RESPONSES));
      return INITIAL_SEED_RESPONSES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_RESPONSES;
  } catch (e) {
    console.error('Failed to parse responses from localStorage', e);
    return INITIAL_SEED_RESPONSES;
  }
}

// Save responses
export function saveResponses(responses: SurveyResponse[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    broadcastUpdate();
  } catch (e) {
    console.error('Failed to save responses to localStorage', e);
  }
}

// Broadcast real-time channel
function broadcastUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('training_survey_updated'));
    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        bc.postMessage({ type: 'SURVEY_UPDATED', timestamp: Date.now() });
        bc.close();
      }
    } catch {
      // Fallback ignore
    }
  }
}

// Add a single survey response
export async function submitSurveyResponse(
  scores: Record<number, number>,
  feedback?: string,
  firebaseConfig?: FirebaseCustomConfig | null
): Promise<SurveyResponse> {
  const deviceId = getOrCreateDeviceId();
  const newResponse: SurveyResponse = {
    id: 'resp_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: Date.now(),
    scores,
    feedback: feedback?.trim() || undefined,
    deviceId,
  };

  const current = getStoredResponses();
  const updated = [newResponse, ...current];
  saveResponses(updated);
  markDeviceAsSubmitted();

  // If Firebase Realtime Database URL is provided, push via REST API seamlessly
  if (firebaseConfig?.databaseURL) {
    try {
      const cleanDbUrl = firebaseConfig.databaseURL.replace(/\/+$/, '');
      const endpoint = `${cleanDbUrl}/responses/${newResponse.id}.json`;
      await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResponse),
      });
    } catch (err) {
      console.warn('Firebase RTDB write error (local sync still succeeded):', err);
    }
  }

  return newResponse;
}

// Clear all data
export function clearAllResponses(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  resetDeviceSubmission();
  broadcastUpdate();
}

// Reset to initial sample data
export function resetToSeedResponses(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_RESPONSES));
  resetDeviceSubmission();
  broadcastUpdate();
}

// Calculate dashboard summary
export function calculateDashboardSummary(responses: SurveyResponse[]): DashboardSummary {
  const totalResponses = responses.length;

  if (totalResponses === 0) {
    const emptyStats: QuestionStat[] = QUESTIONS.map((q) => ({
      id: q.id,
      title: q.title,
      category: q.category,
      average: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      tier: getTierFromScore(0),
    }));

    return {
      totalResponses: 0,
      overallAverage: 0,
      overallTier: getTierFromScore(0),
      questionStats: emptyStats,
      recentFeedbacks: [],
    };
  }

  // Calculate per-question statistics
  let sumOfAllQuestionAverages = 0;

  const questionStats: QuestionStat[] = QUESTIONS.map((q) => {
    let questionSum = 0;
    const distribution: { 1: number; 2: number; 3: number; 4: number; 5: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    responses.forEach((r) => {
      const score = r.scores[q.id];
      if (score >= 1 && score <= 5) {
        questionSum += score;
        distribution[score as 1 | 2 | 3 | 4 | 5]++;
      }
    });

    const average = totalResponses > 0 ? Number((questionSum / totalResponses).toFixed(2)) : 0;
    sumOfAllQuestionAverages += average;

    return {
      id: q.id,
      title: q.title,
      category: q.category,
      average,
      distribution,
      tier: getTierFromScore(average),
    };
  });

  const overallAverage = Number((sumOfAllQuestionAverages / QUESTIONS.length).toFixed(2));
  const overallTier = getTierFromScore(overallAverage);

  // Extract recent feedbacks
  const recentFeedbacks = responses
    .filter((r) => r.feedback && r.feedback.trim().length > 0)
    .map((r) => {
      const scoreValues = Object.values(r.scores);
      const avg = scoreValues.length > 0 ? Number((scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1)) : 5.0;
      return {
        id: r.id,
        text: r.feedback as string,
        timestamp: r.timestamp,
        averageScore: avg,
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    totalResponses,
    overallAverage,
    overallTier,
    questionStats,
    recentFeedbacks,
  };
}

// Export data to CSV with UTF-8 BOM
export function exportResponsesToCSV(
  responses: SurveyResponse[],
  courseTitle: string = 'การอบรมเชิงปฏิบัติการ'
): void {
  const summary = calculateDashboardSummary(responses);
  const now = new Date().toLocaleString('th-TH');

  // UTF-8 BOM
  let csvContent = '\uFEFF';

  // Metadata block
  csvContent += `รายงานผลการประเมินความพึงพอใจการอบรม,"${courseTitle}"\n`;
  csvContent += `วันที่ส่งออกข้อมูล,"${now}"\n`;
  csvContent += `จำนวนผู้ตอบแบบสอบถามทั้งหมด,${responses.length},คน\n`;
  csvContent += `คะแนนเฉลี่ยรวมทั้งสิ้น,${summary.overallAverage},/ 5.00,ระดับ: "${summary.overallTier.label}"\n\n`;

  // Section 1: Summary by Question
  csvContent += `สรุปคะแนนเฉลี่ยรายข้อ (เกณฑ์ 5 ระดับ)\n`;
  csvContent += `ข้อที่,หัวข้อการประเมิน,ด้าน,คะแนนเฉลี่ย,ระดับความพึงพอใจ,1 ดาว,2 ดาว,3 ดาว,4 ดาว,5 ดาว\n`;

  summary.questionStats.forEach((qs) => {
    csvContent += `ข้อ ${qs.id},"${qs.title.replace(/"/g, '""')}","${qs.category}",${qs.average},"${qs.tier.label}",${qs.distribution[1]},${qs.distribution[2]},${qs.distribution[3]},${qs.distribution[4]},${qs.distribution[5]}\n`;
  });

  csvContent += `\n`;

  // Section 2: Raw Individual Responses
  csvContent += `ข้อมูลรายละเอียดคำตอบรายบุคคล (Raw Data)\n`;
  const questionHeaders = QUESTIONS.map((q) => `"ข้อ ${q.id}: ${q.title.replace(/"/g, '""')}"`).join(',');
  csvContent += `ลำดับ,รหัสการตอบ,วันเวลาที่ตอบ,${questionHeaders},คะแนนเฉลี่ยผู้ตอบ,ข้อเสนอแนะเพิ่มเติม\n`;

  responses.forEach((resp, index) => {
    const dateStr = new Date(resp.timestamp).toLocaleString('th-TH');
    const scoresCol = QUESTIONS.map((q) => resp.scores[q.id] || '').join(',');
    const scoreVals = Object.values(resp.scores);
    const personalAvg = scoreVals.length > 0 ? (scoreVals.reduce((a, b) => a + b, 0) / scoreVals.length).toFixed(2) : '0';
    const cleanFeedback = (resp.feedback || '').replace(/"/g, '""').replace(/\n/g, ' ');

    csvContent += `${index + 1},"${resp.id}","${dateStr}",${scoresCol},${personalAvg},"${cleanFeedback}"\n`;
  });

  // Trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const filename = `ผลประเมินความพึงพอใจ_${new Date().toISOString().slice(0, 10)}.csv`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Firebase Config Helpers
export function getSavedFirebaseConfig(): FirebaseCustomConfig | null {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveFirebaseConfig(cfg: FirebaseCustomConfig | null): void {
  if (cfg) {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
  } else {
    localStorage.removeItem(FIREBASE_CONFIG_KEY);
  }
}
