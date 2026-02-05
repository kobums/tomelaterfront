import { Auth as AuthModel } from '../models';
import type { LoginRequest, LoginResponse } from '../types/auth';
import type { User } from '../types/user';

export const authService = {
  // Login with JWT
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      return await AuthModel.login(credentials);
    } catch (error) {
      throw new Error(
        '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
      );
    }
  },

  // Alternative login using POST /api/auth/login
  async loginPost(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      return await AuthModel.loginPost(credentials);
    } catch (error) {
      throw new Error(
        '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
      );
    }
  },

  // Logout
  logout(): void {
    AuthModel.logout();
    window.location.href = '/login';
  },

  // Get current user
  getCurrentUser(): User | null {
    return AuthModel.getCurrentUser();
  },

  // Get token
  getToken(): string | null {
    return AuthModel.getToken();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return AuthModel.isAuthenticated();
  },

  // Check user role
  hasRole(role: number): boolean {
    return AuthModel.hasRole(role);
  },

  // Refresh token
  async refreshToken(): Promise<string> {
    return await AuthModel.refreshToken();
  },

  // Verify token
  async verifyToken(): Promise<boolean> {
    return await AuthModel.verifyToken();
  },
};
