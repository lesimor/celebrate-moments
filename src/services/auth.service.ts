import type { User, LoginCredentials, RegisterData } from '../types';

const USERS_KEY = 'wedding_users';
const CURRENT_USER_KEY = 'wedding_current_user';
const TOKEN_KEY = 'wedding_auth_token';

interface StoredUser extends User {
  password: string;
}

export class AuthService {
  private static getStoredUsers(): StoredUser[] {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private static saveUsers(users: StoredUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private static hashPassword(password: string): string {
    // Simple hash for demo purposes (in production, use bcrypt on server)
    return btoa(password);
  }

  private static verifyPassword(password: string, hashedPassword: string): boolean {
    return btoa(password) === hashedPassword;
  }

  static async register(data: RegisterData): Promise<User> {
    const users = this.getStoredUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === data.email)) {
      throw new Error('이미 등록된 이메일입니다.');
    }

    const newUser: StoredUser = {
      id: this.generateId(),
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: this.hashPassword(data.password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Remove password before returning
    const { password, ...userWithoutPassword } = newUser;
    
    // Auto-login after registration
    this.setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  static async login(credentials: LoginCredentials): Promise<User> {
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    if (!this.verifyPassword(credentials.password, user.password)) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;
    
    // Set current user
    this.setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  static logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  static getCurrentUser(): User | null {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private static setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    // Generate a simple token (in production, use JWT from server)
    localStorage.setItem(TOKEN_KEY, this.generateId());
  }

  static isAuthenticated(): boolean {
    return !!this.getCurrentUser() && !!localStorage.getItem(TOKEN_KEY);
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;
    this.saveUsers(users);

    // Update current user if it's the same user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const { password, ...userWithoutPassword } = updatedUser;
      this.setCurrentUser(userWithoutPassword);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}