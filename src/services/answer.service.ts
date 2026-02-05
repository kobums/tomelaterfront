import axios from 'axios';
import { Answer } from '../models/answer';

const API_URL = '/api/answer';

export interface AnswerCreateRequest {
  uid: number;
  qid: number;
  content: string;
  ispublic: boolean;
}

export const AnswerService = {
  createAnswer: async (data: AnswerCreateRequest): Promise<Answer> => {
    const response = await axios.post<Answer>(API_URL, data);
    return response.data;
  },

  getMyAnswers: async (uid: number): Promise<Answer[]> => {
    const response = await axios.get<Answer[]>(`${API_URL}/search?uid=${uid}`);
    return response.data;
  },

  getAnswerForQuestion: async (
    uid: number,
    qid: number,
  ): Promise<Answer | null> => {
    try {
      const response = await axios.get<Answer[]>(
        `${API_URL}/search?uid=${uid}&qid=${qid}`,
      );
      return response.data.length > 0 ? response.data[0] : null;
    } catch (e) {
      return null;
    }
  },
};
