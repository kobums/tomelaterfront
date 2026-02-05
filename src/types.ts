export interface User {
  id: number;
  email: string;
  nickname: string;
  socialType?: string;
  socialId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  content: string;
  month: number;
  day: number;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: number;
  userId: number;
  questionId: number;
  content: string;
  isPublic: boolean;
  user?: User;
  question?: Question;
  createdAt: string;
  updatedAt: string;
}
