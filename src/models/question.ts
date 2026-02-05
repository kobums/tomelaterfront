import { get, post, put, patch, del } from '../services/api';
import type {
  Question,
  ApiResponse,
  ApiSingleResponse,
  QuestionSearchParams,
} from '../types/question';

export default class QuestionModel {
  // CRUD operations
  static async insert(item: Partial<Question>) {
    const res = await post<Question>('/question', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Question>[]) {
    const res = await post<Question[]>('/question/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Question>) {
    const res = await put<Question>(`/question/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Question>) {
    const res = await patch<Question>(`/question/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/question/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/question/batch', { data: ids });
    return res.data;
  }

  static async find(params?: QuestionSearchParams) {
    const res = await get<ApiResponse<Question>>('/question', { params });
    return res.data.content || [];
  }

  static async findall(params?: QuestionSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Question>>('/question', { params });
    return res.data.content || [];
  }

  static async findpage(params?: QuestionSearchParams) {
    const res = await get<ApiResponse<Question>>('/question', { params });
    return res.data;
  }

  static async count(params?: QuestionSearchParams) {
    const res = await get<{ count: number }>('/question/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Question>>(`/question/${id}`);
    return res.data;
  }

  static async searchByMonthAndDay(
    monthAndDay: string,
    params?: QuestionSearchParams,
  ) {
    const res = await get<ApiResponse<Question>>(
      `/question/search/monthandday?monthandday=${monthAndDay}`,
      { params },
    );
    return res.data.content || [];
  }
}
