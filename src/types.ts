export interface QuizOption {
  text: string;
  value: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizResponse {
  questionId: number;
  questionText: string;
  selectedOptionText: string;
}

export interface ExpertData {
  name: string;
  profession: string;
  address: string;
  whatsapp: string;
  instagram: string;
}
