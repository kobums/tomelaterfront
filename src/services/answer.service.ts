import { get, post } from './api';
import type { Answer } from '../types/answer';

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


  getMyAnswers: async (uid: number): Promise<Answer[]> => {
    // Backend: @GetMapping on /api/answer supports 'uid' parameter
    const response = await get<{ content: Answer[] }>(`${API_URL}?uid=${uid}`);
    return response.data.content;
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
      return response.data.content.length > 0 ? response.data.content[0] : null;
    } catch (e) {
      console.error('Failed to fetch answer for question', e);
      return null;
    }
  },

};
