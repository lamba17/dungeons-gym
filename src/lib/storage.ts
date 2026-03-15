import { Member, Payment } from './types';

const MEMBERS_KEY  = 'dg_members';
const PAYMENTS_KEY = 'dg_payments';
const AUTH_KEY     = 'dg_current_user';
const ADMIN_KEY    = 'dg_admin_session';

// ─── Members ────────────────────────────────────────────────────────────────

export function loadMembers(): Member[] {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveMembers(members: Member[]): void {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

// ─── Payments ────────────────────────────────────────────────────────────────

export function loadPayments(): Payment[] {
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function savePayments(payments: Payment[]): void {
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export function saveCurrentUser(memberId: string): void {
  localStorage.setItem(AUTH_KEY, memberId);
}

export function loadCurrentUserId(): string | null {
  return localStorage.getItem(AUTH_KEY);
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function saveAdminSession(val: boolean): void {
  localStorage.setItem(ADMIN_KEY, val ? '1' : '');
}

export function loadAdminSession(): boolean {
  return localStorage.getItem(ADMIN_KEY) === '1';
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_KEY);
}

// ─── Seed guard ──────────────────────────────────────────────────────────────

const SEEDED_KEY = 'dg_seeded';
export function isSeeded(): boolean { return !!localStorage.getItem(SEEDED_KEY); }
export function markSeeded(): void   { localStorage.setItem(SEEDED_KEY, '1'); }
