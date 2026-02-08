import { get, post } from './api';
import type { Question } from '../types/question';

// Configure base URL (api.ts has baseURL: '/api')
const API_URL = '/question';

export interface QuestionCreateRequest {
  content: string;
  month: number;
  day: number;
}

export const QuestionService = {
  getDailyQuestion: async (): Promise<Question | null> => {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() is 0-indexed
    const day = today.getDate();

    try {
      // api.get uses baseURL /api, so request becomes /api/question
      const response = await get<{ content: Question[] }>(API_URL, {
        params: {
          month: month,
          day: day,
          page: 0,
          pagesize: 1,
        },
      });

      if (response.data.content && response.data.content.length > 0) {
        return response.data.content[0];
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch daily question', error);
      return null;
    }
  },

  getAllQuestions: async (
    page = 0,
    size = 10,
  ): Promise<{ content: Question[]; totalElements: number }> => {
    const response = await get<{ content: Question[]; totalElements: number }>(
      `${API_URL}?page=${page}&pagesize=${size}`,
    );
    return response.data;
  },

  createQuestion: async (data: QuestionCreateRequest): Promise<Question> => {
    const response = await post<Question>(API_URL, data);
    return response.data;
  },
};
