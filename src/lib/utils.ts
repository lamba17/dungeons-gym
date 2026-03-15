import { Member, Payment, PlanType } from './types';

/** Format ISO date to "DD MMM YYYY" */
export function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Format ISO date to "MMM YYYY" */
export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

/** Format rupees */
export function formatRupees(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

/** Generate simple unique ID */
export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/** Add months to a date and return ISO string */
export function addMonths(isoDate: string, months: number): string {
  const d = new Date(isoDate);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split('T')[0];
}

/** Next payment due date based on plan */
export function calcNextDue(fromDate: string, plan: PlanType): string {
  const months = plan === 'quarterly' ? 3 : plan === 'annual' ? 12 : 1;
  return addMonths(fromDate, months);
}

/** Is payment overdue? */
export function isOverdue(nextDue: string): boolean {
  return new Date(nextDue) < new Date();
}

/** Get current month label e.g. "Mar 2026" */
export function currentMonthLabel(): string {
  return new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

/** Members who joined this calendar month */
export function joinedThisMonth(members: Member[]): Member[] {
  const now = new Date();
  return members.filter(m => {
    const d = new Date(m.joinDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
}

/** Monthly revenue data for the last N months */
export function buildRevenueData(payments: Payment[], months = 12): { month: string; revenue: number }[] {
  const result: { month: string; revenue: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    const revenue = payments
      .filter(p => {
        const pd = new Date(p.date);
        return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear() && p.status === 'completed';
      })
      .reduce((sum, p) => sum + p.amount, 0);
    result.push({ month: label, revenue });
  }
  return result;
}

/** Monthly active-member count data */
export function buildMemberGrowthData(members: Member[], months = 12): { month: string; members: number; new: number }[] {
  const result: { month: string; members: number; new: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    const active = members.filter(m => {
      const joined = new Date(m.joinDate);
      const left = m.leftDate ? new Date(m.leftDate) : null;
      return joined <= endOfMonth && (!left || left > endOfMonth);
    }).length;
    const newM = members.filter(m => {
      const joined = new Date(m.joinDate);
      return joined.getMonth() === d.getMonth() && joined.getFullYear() === d.getFullYear();
    }).length;
    result.push({ month: label, members: active, new: newM });
  }
  return result;
}

/** Monthly attrition data */
export function buildAttritionData(members: Member[], months = 12): { month: string; left: number }[] {
  const result: { month: string; left: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    const left = members.filter(m => {
      if (!m.leftDate) return false;
      const ld = new Date(m.leftDate);
      return ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear();
    }).length;
    result.push({ month: label, left });
  }
  return result;
}

/** Members expiring in next 30 days */
export function expiringMembers(members: Member[]): Member[] {
  const now = new Date();
  const soon = new Date(now);
  soon.setDate(soon.getDate() + 30);
  return members.filter(m => {
    if (m.isLeft || m.status === 'expired') return false;
    const due = new Date(m.nextPaymentDue);
    return due >= now && due <= soon;
  });
}

/** Pending (unpaid this cycle) members */
export function pendingMembers(members: Member[]): Member[] {
  return members.filter(m => !m.isLeft && (m.status === 'pending' || isOverdue(m.nextPaymentDue)));
}
