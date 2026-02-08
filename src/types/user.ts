// Auto-generated TypeScript types for User
// Generated from table: user

export interface User {
  id: number;
  email: string;
  passwd: string;
  nickname: string;
  socialtype: string;
  socialid: string;
  createdat: string;
  updatedat: string;
}

// Create request type (omit auto-generated fields)
export type CreateUserRequest = Omit<User, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUserRequest = Partial<Omit<User, 'id'>>;

// Search params type
export interface UserSearchParams {
  id?: number;
  email?: string;
  passwd?: string;
  nickname?: string;
  socialtype?: string;
  socialid?: string;
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
