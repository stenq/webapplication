import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  currentUser: User | null;
  users: User[];
  register: (email: string, password: string, name: string) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      register: (email, password, name) => {
        const users = get().users;
        if (users.find((u) => u.email === email)) {
          return { success: false, message: 'Użytkownik z tym emailem już istnieje' };
        }
        const newUser: User = {
          id: Date.now().toString(),
          email,
          password,
          name,
        };
        set({ users: [...users, newUser], currentUser: newUser });
        return { success: true, message: 'Rejestracja zakończona pomyślnie' };
      },

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email && u.password === password);
        if (!user) {
          return { success: false, message: 'Nieprawidłowy email lub hasło' };
        }
        set({ currentUser: user });
        return { success: true, message: 'Zalogowano pomyślnie' };
      },

      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);