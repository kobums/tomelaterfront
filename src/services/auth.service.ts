import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth';
import type { User } from '../types/user';
import { useAuthStore } from '../store/useAuthStore';

// We'll use the store or local storage for token management typically,
// but here we just provide the API calls.
// Ideally, the token should be stored in the updated AuthStore.

const API_URL = '/api/auth';

export const authService = {
  // Login using POST /api/auth/login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/login`,
        credentials,
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(
        '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
      );
    }
  },

  // Alias for compatibility
  async loginPost(credentials: LoginRequest): Promise<LoginResponse> {
    return this.login(credentials);
  },

  // Logout
  logout(): void {
    // Determine how to clear state. usually store.clear()
    // For now we just redirect
    window.location.href = '/login';
  },

  // Get current user (mock/placeholder implementation if state isn't managed here)
  getCurrentUser(): User | null {
    const store = useAuthStore.getState();
    return store.user;
  },

  // Get token
  getToken(): string | null {
    const store = useAuthStore.getState();
    return store.token;
  },

  isAuthenticated(): boolean {
    const store = useAuthStore.getState();
    return store.isAuthenticated;
  },

  // Register a new user
  async register(data: any): Promise<void> {
    try {
      await axios.post('/api/user', data);
    } catch (error: any) {
      console.error('Registration error details:', error.response?.data);
      
      const responseData = error.response?.data;
      if (responseData) {
        if (typeof responseData === 'string') {
             throw new Error(responseData); // If server returns plain string
        }
        if (responseData.error) {
             throw new Error(responseData.error); // Expected format needed
        }
        if (responseData.message) {
             throw new Error(responseData.message); // Common Spring format
        }
      }
      
      // Fallback
      throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
    }

  },


  // Send email verification code
  async sendVerificationCode(email: string): Promise<void> {
    try {
      await axios.post('/api/auth/verify/send', { email });
    } catch (error) {
      console.error('Send verification error:', error);
      throw new Error('인증 코드 발송에 실패했습니다.');
    }
  },

  // Check email verification code
  async checkVerificationCode(email: string, code: string): Promise<boolean> {
    try {
      const response = await axios.post<{ valid: boolean }>(
        '/api/auth/verify/check',
        { email, code },
      );
      return response.data.valid;
    } catch (error) {
      console.error('Check verification error:', error);
      throw new Error('인증 코드 확인 중 오류가 발생했습니다.');
    }
  },

  // Find Email by Nickname
  async findEmail(nickname: string): Promise<string> {
    try {
      const response = await axios.post<{ email: string }>(
        '/api/auth/find/email',
        { nickname },
      );
      return response.data.email;
    } catch (error: any) {
      console.error('Find email error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('이메일 찾기에 실패했습니다.');
    }
  },

  // Send Password Reset Code
  async sendPasswordResetCode(email: string): Promise<void> {
    try {
      await axios.post('/api/auth/password/code', { email });
    } catch (error: any) {
      console.error('Send reset code error:', error);
       if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('인증 코드 발송에 실패했습니다.');
    }
  },

  // Reset Password
  async resetPassword(email: string, code: string, newPasswd: string): Promise<void> {
    try {
      await axios.post('/api/auth/password/reset', { email, code, newPasswd });
    } catch (error: any) {
      console.error('Reset password error:', error);
       if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('비밀번호 변경에 실패했습니다.');
    }
  },
};



