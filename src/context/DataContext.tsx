import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, Payment, PlanType, PLAN_PRICES, MemberStatus } from '../lib/types';
import {
  loadMembers, saveMembers,
  loadPayments, savePayments,
  isSeeded, markSeeded,
} from '../lib/storage';
import { MOCK_MEMBERS, MOCK_PAYMENTS } from '../lib/mockData';
import { genId, calcNextDue } from '../lib/utils';

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: PlanType;
}

interface DataContextType {
  members:  Member[];
  payments: Payment[];
  addMember:    (data: SignupData) => { ok: boolean; error?: string; member?: Member };
  addPayment:   (memberId: string, method: 'upi' | 'card') => Payment;
  updateMember: (id: string, updates: Partial<Member>) => void;
  refreshAll:   () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [members,  setMembers]  = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Seed once on first load
  useEffect(() => {
    if (!isSeeded()) {
      saveMembers(MOCK_MEMBERS);
      savePayments(MOCK_PAYMENTS);
      markSeeded();
    }
    setMembers(loadMembers());
    setPayments(loadPayments());
  }, []);

  const refreshAll = () => {
    setMembers(loadMembers());
    setPayments(loadPayments());
  };

  const addMember = (data: SignupData): { ok: boolean; error?: string; member?: Member } => {
    const existing = members.find(m => m.email === data.email || m.phone === data.phone);
    if (existing) return { ok: false, error: 'Email or phone already registered.' };

    const today = new Date().toISOString().split('T')[0];
    const newMember: Member = {
      id: 'mem_' + genId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      plan: data.plan,
      joinDate: today,
      status: 'active' as MemberStatus,
      nextPaymentDue: calcNextDue(today, data.plan),
      lastPaymentDate: today,
      isLeft: false,
    };

    // Initial payment record
    const initPayment: Payment = {
      id: 'pay_' + genId(),
      memberId: newMember.id,
      memberName: newMember.name,
      amount: PLAN_PRICES[data.plan],
      date: today,
      method: 'upi',
      status: 'completed',
      plan: data.plan,
    };

    const updatedMembers  = [...members, newMember];
    const updatedPayments = [...payments, initPayment];
    saveMembers(updatedMembers);
    savePayments(updatedPayments);
    setMembers(updatedMembers);
    setPayments(updatedPayments);

    return { ok: true, member: newMember };
  };

  const addPayment = (memberId: string, method: 'upi' | 'card'): Payment => {
    const member = members.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');

    const today = new Date().toISOString().split('T')[0];
    const newPayment: Payment = {
      id: 'pay_' + genId(),
      memberId,
      memberName: member.name,
      amount: PLAN_PRICES[member.plan],
      date: today,
      method,
      status: 'completed',
      plan: member.plan,
    };

    const updatedMember: Member = {
      ...member,
      status: 'active',
      lastPaymentDate: today,
      nextPaymentDue: calcNextDue(today, member.plan),
    };

    const updatedMembers  = members.map(m => m.id === memberId ? updatedMember : m);
    const updatedPayments = [...payments, newPayment];
    saveMembers(updatedMembers);
    savePayments(updatedPayments);
    setMembers(updatedMembers);
    setPayments(updatedPayments);

    // Refresh auth member if logged in
    const refreshFn = (window as unknown as Record<string, unknown>).__dgRefreshMember as ((id: string) => void) | undefined;
    if (refreshFn) refreshFn(memberId);

    return newPayment;
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    const updatedMembers = members.map(m => m.id === id ? { ...m, ...updates } : m);
    saveMembers(updatedMembers);
    setMembers(updatedMembers);
  };

  return (
    <DataContext.Provider value={{ members, payments, addMember, addPayment, updateMember, refreshAll }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
