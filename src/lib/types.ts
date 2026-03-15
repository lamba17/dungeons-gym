export type PlanType = 'monthly' | 'quarterly' | 'annual' | 'personal';
export type MemberStatus = 'active' | 'expired' | 'pending';
export type PaymentStatus = 'completed' | 'pending' | 'failed';
export type PaymentMethod = 'upi' | 'card';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: PlanType;
  joinDate: string;        // ISO date string  e.g. "2025-07-15"
  status: MemberStatus;
  nextPaymentDue: string;  // ISO date string
  lastPaymentDate?: string;
  isLeft: boolean;
  leftDate?: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;   // ISO date string
  method: PaymentMethod;
  status: PaymentStatus;
  plan: PlanType;
}

export const PLAN_PRICES: Record<PlanType, number> = {
  monthly:   1999,
  quarterly: 4999,
  annual:    14999,
  personal:  7999,
};

export const PLAN_LABELS: Record<PlanType, string> = {
  monthly:   'Monthly — ₹1,999/month',
  quarterly: 'Quarterly — ₹4,999/3 months',
  annual:    'Annual — ₹14,999/year',
  personal:  'Personal Training — ₹7,999/month',
};

export const PLAN_DISPLAY: Record<PlanType, string> = {
  monthly:   'Monthly Plan',
  quarterly: 'Quarterly Plan',
  annual:    'Annual Plan',
  personal:  'Personal Training',
};

export const PLAN_PERIOD: Record<PlanType, string> = {
  monthly:   '/month',
  quarterly: '/3 months',
  annual:    '/year',
  personal:  '/month',
};
