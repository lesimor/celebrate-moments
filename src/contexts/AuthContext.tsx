import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LoginCredentials, RegisterData, AuthState } from '../types/user';
import { AuthService } from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session on mount
    const user = AuthService.getCurrentUser();
    const isAuthenticated = AuthService.isAuthenticated();
    
    setAuthState({
      user,
      isAuthenticated,
      isLoading: false
    });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const user = await AuthService.login(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      navigate('/my-events');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [navigate]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const user = await AuthService.register(data);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      navigate('/my-events');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    AuthService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    navigate('/');
  }, [navigate]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!authState.user) {
      throw new Error('사용자가 로그인되어 있지 않습니다.');
    }

    try {
      const updatedUser = await AuthService.updateUser(authState.user.id, updates);
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }, [authState.user]);

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}