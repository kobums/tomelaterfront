import { get, post, put, patch, del } from '../services/api';
import type {
  User,
  ApiResponse,
  ApiSingleResponse,
  UserSearchParams,
} from '../types/user';

export default class UserModel {
  // CRUD operations
  static async insert(item: Partial<User>) {
    const res = await post<User>('/user', item);
    return res.data;
  }

  static async insertBatch(items: Partial<User>[]) {
    const res = await post<User[]>('/user/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<User>) {
    const res = await put<User>(`/user/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<User>) {
    const res = await patch<User>(`/user/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/user/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/user/batch', { data: ids });
    return res.data;
  }

  static async find(params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data.content || [];
  }

  static async findall(params?: UserSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data.content || [];
  }

  static async findpage(params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data;
  }

  static async count(params?: UserSearchParams) {
    const res = await get<{ count: number }>('/user/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<User>>(`/user/${id}`);
    return res.data;
  }

  static async searchByEmail(email: string, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/email?email=${email}`,
      { params },
    );
    return res.data.content || [];
  }

  static async searchBySocialid(socialid: string, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/socialid?socialid=${socialid}`,
      { params },
    );
    return res.data.content || [];
  }

  static async searchByNickname(nickname: string, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/nickname?nickname=${nickname}`,
      { params },
    );
    return res.data.content || [];
  }
}
