export interface Question {
  id: number;
  title: string;
  category: string;
  description?: string;
}

export interface SurveyResponse {
  id: string;
  timestamp: number;
  scores: Record<number, number>; // questionId -> 1..5
  feedback?: string;
  deviceId: string;
}

export interface RatingTier {
  min: number;
  max: number;
  label: string;
  color: string;
  bgLight: string;
  badgeClass: string;
  description: string;
}

export interface QuestionStat {
  id: number;
  title: string;
  category: string;
  average: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
  tier: RatingTier;
}

export interface DashboardSummary {
  totalResponses: number;
  overallAverage: number;
  overallTier: RatingTier;
  questionStats: QuestionStat[];
  recentFeedbacks: { id: string; text: string; timestamp: number; averageScore: number }[];
}

export interface FirebaseCustomConfig {
  apiKey?: string;
  databaseURL?: string;
  projectId?: string;
}
