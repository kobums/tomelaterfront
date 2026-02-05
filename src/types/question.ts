// Auto-generated TypeScript types for Question
// Generated from table: question

export interface Question {
  id: number;
  content: string;
  month: number;
  day: number;
  createdat: string;
  updatedat: string;
}

// Create request type (omit auto-generated fields)
export type CreateQuestionRequest = Omit<Question, 'id'>;

// Update request type (all fields optional except id)
export type UpdateQuestionRequest = Partial<Omit<Question, 'id'>>;

// Search params type
export interface QuestionSearchParams {
  id?: number;
  content?: string;
  month?: number;
  day?: number;
  startcreatedat?: string;
  endcreatedat?: string;
  startupdatedat?: string;
  endupdatedat?: string;
  page?: number;
  pagesize?: number;
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  page: number;
  pagesize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiSingleResponse<T> {
  item: T;
}
