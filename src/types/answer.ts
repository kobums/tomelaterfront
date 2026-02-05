// Auto-generated TypeScript types for Answer
// Generated from table: answer

import type { User } from './user';
import type { Question } from './question';


export interface Answer {
  id: number;
  uid: number;
  qid: number;
  content: string;
  ispublic: number;
  createdat: string;
  updatedat: string;
  extra?: {
    user?: User;
    question?: Question;
  };
}

// Create request type (omit auto-generated fields)
export type CreateAnswerRequest = Omit<Answer, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAnswerRequest = Partial<Omit<Answer, 'id'>>;

// Search params type
export interface AnswerSearchParams {
  id?: number;
  uid?: number;
  qid?: number;
  content?: string;
  ispublic?: number;
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
