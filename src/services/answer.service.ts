import { get, post } from './api';
import type { Answer, ApiResponse } from '../types/answer';

const API_URL = '/answer';

export interface AnswerCreateRequest {
  uid: number;
  qid: number;
  content: string;
  ispublic: boolean;
}


export const AnswerService = {
  createAnswer: async (data: AnswerCreateRequest): Promise<Answer> => {
    const response = await post<Answer>(API_URL, {
      ...data,
      ispublic: data.ispublic ? 'PUBLIC' : 'PRIVATE',
    });
    return response.data;
  },


  getMyAnswers: async (uid: number, page = 0, size = 10): Promise<ApiResponse<Answer>> => {
    // Backend: @GetMapping on /api/answer supports 'uid', 'page', 'size' parameters
    const response = await get<ApiResponse<Answer>>(`${API_URL}?uid=${uid}&page=${page}&size=${size}`);
    return response.data;
  },

  getAnswerForQuestion: async (
    uid: number,
    qid: number,
  ): Promise<Answer | null> => {
    try {
      // Backend: @GetMapping on /api/answer supports both 'uid' and 'qid' parameters
      const response = await get<{ content: Answer[] }>(
        `${API_URL}?uid=${uid}&qid=${qid}`,
      );
      if (response.data.content.length === 0) return null;

      // Sort by createdat desc to get the latest answer
      const sortedAnswers = response.data.content.sort(
        (a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime(),
      );

      return sortedAnswers[0];
    } catch (e) {
      console.error('Failed to fetch answer for question', e);
      return null;
    }
  },

};
