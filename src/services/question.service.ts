import axios from 'axios';
import { Question } from '../models/question';

// Configure base URL if not proxied, or rely on Vite proxy
const API_URL = '/api/question';

export interface QuestionCreateRequest {
  content: string;
  month: number;
  day: number;
}

export const QuestionService = {
  getDailyQuestion: async (): Promise<Question> => {
    const response = await axios.get<Question>(`${API_URL}/daily`);
    return response.data;
  },

  getAllQuestions: async (
    page = 0,
    size = 10,
  ): Promise<{ content: Question[]; totalElements: number }> => {
    const response = await axios.get(
      `${API_URL}?page=${page}&pagesize=${size}`,
    );
    return response.data;
  },

  createQuestion: async (data: QuestionCreateRequest): Promise<Question> => {
    const response = await axios.post<Question>(API_URL, data);
    return response.data;
  },
};
