import { get, post, put, patch, del } from '../services/api';
import type {
  Answer,
  ApiResponse,
  ApiSingleResponse,
  AnswerSearchParams,
} from '../types/answer';

export default class AnswerModel {
  // Ispublic constants (from backend: enums/ispublic/Enums.kt)
  static readonly ispublic = {
    PRIVATE: 1,
    PUBLIC: 2,
  };
  static readonly ispublics = ['', '비공개', '공개'];

  static getIspublic(value: number): string {
    return this.ispublics[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Answer>) {
    const res = await post<Answer>('/answer', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Answer>[]) {
    const res = await post<Answer[]>('/answer/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Answer>) {
    const res = await put<Answer>(`/answer/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Answer>) {
    const res = await patch<Answer>(`/answer/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/answer/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/answer/batch', { data: ids });
    return res.data;
  }

  static async find(params?: AnswerSearchParams) {
    const res = await get<ApiResponse<Answer>>('/answer', { params });
    return res.data.content || [];
  }

  static async findall(params?: AnswerSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Answer>>('/answer', { params });
    return res.data.content || [];
  }

  static async findpage(params?: AnswerSearchParams) {
    const res = await get<ApiResponse<Answer>>('/answer', { params });
    return res.data;
  }

  static async count(params?: AnswerSearchParams) {
    const res = await get<{ count: number }>('/answer/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Answer>>(`/answer/${id}`);
    return res.data;
  }

  static async searchByUid(uid: number, params?: AnswerSearchParams) {
    const res = await get<ApiResponse<Answer>>(
      `/answer/search/uid?uid=${uid}`,
      { params },
    );
    return res.data.content || [];
  }

  static async searchByQid(qid: number, params?: AnswerSearchParams) {
    const res = await get<ApiResponse<Answer>>(
      `/answer/search/qid?qid=${qid}`,
      { params },
    );
    return res.data.content || [];
  }
}
