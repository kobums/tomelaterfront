// Auto-generated TypeScript types for Auth
// Authentication and authorization related types

import type { User } from './user';

// Login request type
export interface LoginRequest {
  loginid: string;
  passwd: string;
}

// Login response type
export interface LoginResponse {
  token: string;
  user: User;
}

// JWT response from backend
export interface JwtResponse {
  token: string;
  type: string;
  user: User;
}

// Auth error type
export interface AuthError {
  message: string;
  code?: string;
}

// Auth state type
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
