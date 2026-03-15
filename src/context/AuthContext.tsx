import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member } from '../lib/types';
import {
  loadMembers, saveMembers,
  saveCurrentUser, loadCurrentUserId, clearCurrentUser,
  saveAdminSession, loadAdminSession, clearAdminSession,
} from '../lib/storage';
import { ADMIN_CREDENTIALS } from '../lib/mockData';

interface AuthContextType {
  currentMember: Member | null;
  isAdmin: boolean;
  loginMember: (emailOrPhone: string, password: string) => { ok: boolean; error?: string };
  loginAdmin:  (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Rehydrate on mount
  useEffect(() => {
    const adminSession = loadAdminSession();
    if (adminSession) {
      setIsAdmin(true);
      return;
    }
    const uid = loadCurrentUserId();
    if (uid) {
      const members = loadMembers();
      const found = members.find(m => m.id === uid);
      if (found) setCurrentMember(found);
    }
  }, []);

  const loginMember = (emailOrPhone: string, password: string): { ok: boolean; error?: string } => {
    const members = loadMembers();
    const member = members.find(
      m => (m.email === emailOrPhone || m.phone === emailOrPhone) && m.password === password
    );
    if (!member) return { ok: false, error: 'Invalid credentials. Please try again.' };
    if (member.isLeft) return { ok: false, error: 'Your membership has been cancelled. Contact the gym.' };
    setCurrentMember(member);
    saveCurrentUser(member.id);
    return { ok: true };
  };

  const loginAdmin = (email: string, password: string): { ok: boolean; error?: string } => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      saveAdminSession(true);
      return { ok: true };
    }
    return { ok: false, error: 'Invalid admin credentials.' };
  };

  const logout = () => {
    setCurrentMember(null);
    setIsAdmin(false);
    clearCurrentUser();
    clearAdminSession();
  };

  // Keep currentMember in sync with members store (e.g. after payment)
  const refreshMember = (id: string) => {
    const members = loadMembers();
    const updated = members.find(m => m.id === id);
    if (updated) setCurrentMember(updated);
  };

  // Expose refreshMember via window for DataContext to call (simple approach)
  (window as unknown as Record<string, unknown>).__dgRefreshMember = (id: string) => refreshMember(id);

  return (
    <AuthContext.Provider value={{ currentMember, isAdmin, loginMember, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function useCurrentMember(): Member | null {
  return useAuth().currentMember;
}
