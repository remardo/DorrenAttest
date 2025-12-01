export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizState {
  currentScreen: 'welcome' | 'topics' | 'quiz' | 'results';
  activeTopicIndex: number | null;
  currentQuestionIndex: number;
  answers: Record<number, string>; // questionId -> optionId
  score: number;
  isFinished: boolean;
}