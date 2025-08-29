export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface UserEvent {
  id: string;
  userId: string;
  type: 'wedding' | 'funeral';
  title: string;
  date: string;
  url: string;
  views: number;
  status: 'draft' | 'published';
  data: any;
  createdAt: string;
  updatedAt: string;
}