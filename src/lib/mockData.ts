import { Member, Payment } from './types';

// Current date context: March 14, 2026
// Generates realistic 15-member roster + 80+ payment records spanning 12 months

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'mem_001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9876543210',
    password: 'rahul123',
    plan: 'monthly',
    joinDate: '2025-07-15',
    status: 'active',
    nextPaymentDue: '2026-04-15',
    lastPaymentDate: '2026-03-15',
    isLeft: false,
  },
  {
    id: 'mem_002',
    name: 'Priya Verma',
    email: 'priya@example.com',
    phone: '9876543211',
    password: 'priya123',
    plan: 'quarterly',
    joinDate: '2025-09-10',
    status: 'active',
    nextPaymentDue: '2026-06-10',
    lastPaymentDate: '2026-03-10',
    isLeft: false,
  },
  {
    id: 'mem_003',
    name: 'Arjun Patel',
    email: 'arjun@example.com',
    phone: '9876543212',
    password: 'arjun123',
    plan: 'annual',
    joinDate: '2025-03-01',
    status: 'active',
    nextPaymentDue: '2026-03-01',
    lastPaymentDate: '2025-03-01',
    isLeft: false,
  },
  {
    id: 'mem_004',
    name: 'Sneha Kapoor',
    email: 'sneha@example.com',
    phone: '9876543213',
    password: 'sneha123',
    plan: 'monthly',
    joinDate: '2025-12-05',
    status: 'pending',
    nextPaymentDue: '2026-03-05',
    lastPaymentDate: '2026-02-05',
    isLeft: false,
  },
  {
    id: 'mem_005',
    name: 'Deepak Yadav',
    email: 'deepak@example.com',
    phone: '9876543214',
    password: 'deepak123',
    plan: 'personal',
    joinDate: '2025-10-20',
    status: 'active',
    nextPaymentDue: '2026-04-20',
    lastPaymentDate: '2026-03-20',
    isLeft: false,
  },
  {
    id: 'mem_006',
    name: 'Ananya Singh',
    email: 'ananya@example.com',
    phone: '9876543215',
    password: 'ananya123',
    plan: 'monthly',
    joinDate: '2025-11-01',
    status: 'expired',
    nextPaymentDue: '2026-02-01',
    lastPaymentDate: '2026-01-01',
    isLeft: true,
    leftDate: '2026-01-31',
  },
  {
    id: 'mem_007',
    name: 'Vikram Kumar',
    email: 'vikram@example.com',
    phone: '9876543216',
    password: 'vikram123',
    plan: 'quarterly',
    joinDate: '2026-01-10',
    status: 'pending',
    nextPaymentDue: '2026-04-10',
    lastPaymentDate: '2026-01-10',
    isLeft: false,
  },
  {
    id: 'mem_008',
    name: 'Pooja Mehta',
    email: 'pooja@example.com',
    phone: '9876543217',
    password: 'pooja123',
    plan: 'monthly',
    joinDate: '2026-02-01',
    status: 'active',
    nextPaymentDue: '2026-04-01',
    lastPaymentDate: '2026-03-01',
    isLeft: false,
  },
  {
    id: 'mem_009',
    name: 'Raj Malhotra',
    email: 'raj@example.com',
    phone: '9876543218',
    password: 'raj123',
    plan: 'annual',
    joinDate: '2025-05-15',
    status: 'active',
    nextPaymentDue: '2026-05-15',
    lastPaymentDate: '2025-05-15',
    isLeft: false,
  },
  {
    id: 'mem_010',
    name: 'Sania Khan',
    email: 'sania@example.com',
    phone: '9876543219',
    password: 'sania123',
    plan: 'monthly',
    joinDate: '2025-12-20',
    status: 'pending',
    nextPaymentDue: '2026-03-20',
    lastPaymentDate: '2026-02-20',
    isLeft: false,
  },
  {
    id: 'mem_011',
    name: 'Amit Verma',
    email: 'amit@example.com',
    phone: '9876543220',
    password: 'amit123',
    plan: 'monthly',
    joinDate: '2025-08-10',
    status: 'expired',
    nextPaymentDue: '2026-01-10',
    lastPaymentDate: '2025-12-10',
    isLeft: true,
    leftDate: '2025-12-31',
  },
  {
    id: 'mem_012',
    name: 'Kavya Reddy',
    email: 'kavya@example.com',
    phone: '9876543221',
    password: 'kavya123',
    plan: 'personal',
    joinDate: '2025-11-25',
    status: 'active',
    nextPaymentDue: '2026-04-25',
    lastPaymentDate: '2026-03-25',
    isLeft: false,
  },
  {
    id: 'mem_013',
    name: 'Ravi Joshi',
    email: 'ravi@example.com',
    phone: '9876543222',
    password: 'ravi123',
    plan: 'monthly',
    joinDate: '2026-03-01',
    status: 'active',
    nextPaymentDue: '2026-04-01',
    lastPaymentDate: '2026-03-01',
    isLeft: false,
  },
  {
    id: 'mem_014',
    name: 'Meera Sharma',
    email: 'meera@example.com',
    phone: '9876543223',
    password: 'meera123',
    plan: 'quarterly',
    joinDate: '2026-01-15',
    status: 'active',
    nextPaymentDue: '2026-04-15',
    lastPaymentDate: '2026-01-15',
    isLeft: false,
  },
  {
    id: 'mem_015',
    name: 'Suresh Gupta',
    email: 'suresh@example.com',
    phone: '9876543224',
    password: 'suresh123',
    plan: 'monthly',
    joinDate: '2025-06-01',
    status: 'active',
    nextPaymentDue: '2026-04-01',
    lastPaymentDate: '2026-03-01',
    isLeft: false,
  },
];

// ─── Generate realistic payment history ─────────────────────────────────────

function makePayment(
  id: string,
  memberId: string,
  memberName: string,
  amount: number,
  date: string,
  method: 'upi' | 'card',
  plan: Member['plan'],
): Payment {
  return { id, memberId, memberName, amount, date, method, status: 'completed', plan };
}

export const MOCK_PAYMENTS: Payment[] = [
  // Rahul Sharma — monthly since Jul 2025
  makePayment('pay_001', 'mem_001', 'Rahul Sharma',  1999, '2025-07-15', 'upi',  'monthly'),
  makePayment('pay_002', 'mem_001', 'Rahul Sharma',  1999, '2025-08-15', 'card', 'monthly'),
  makePayment('pay_003', 'mem_001', 'Rahul Sharma',  1999, '2025-09-15', 'upi',  'monthly'),
  makePayment('pay_004', 'mem_001', 'Rahul Sharma',  1999, '2025-10-15', 'upi',  'monthly'),
  makePayment('pay_005', 'mem_001', 'Rahul Sharma',  1999, '2025-11-15', 'card', 'monthly'),
  makePayment('pay_006', 'mem_001', 'Rahul Sharma',  1999, '2025-12-15', 'upi',  'monthly'),
  makePayment('pay_007', 'mem_001', 'Rahul Sharma',  1999, '2026-01-15', 'upi',  'monthly'),
  makePayment('pay_008', 'mem_001', 'Rahul Sharma',  1999, '2026-02-15', 'card', 'monthly'),
  makePayment('pay_009', 'mem_001', 'Rahul Sharma',  1999, '2026-03-15', 'upi',  'monthly'),

  // Priya Verma — quarterly since Sep 2025
  makePayment('pay_010', 'mem_002', 'Priya Verma',   4999, '2025-09-10', 'card', 'quarterly'),
  makePayment('pay_011', 'mem_002', 'Priya Verma',   4999, '2025-12-10', 'upi',  'quarterly'),
  makePayment('pay_012', 'mem_002', 'Priya Verma',   4999, '2026-03-10', 'card', 'quarterly'),

  // Arjun Patel — annual Mar 2025
  makePayment('pay_013', 'mem_003', 'Arjun Patel',  14999, '2025-03-01', 'upi',  'annual'),

  // Sneha Kapoor — monthly Dec 2025, Jan, Feb (Mar pending)
  makePayment('pay_014', 'mem_004', 'Sneha Kapoor',  1999, '2025-12-05', 'card', 'monthly'),
  makePayment('pay_015', 'mem_004', 'Sneha Kapoor',  1999, '2026-01-05', 'upi',  'monthly'),
  makePayment('pay_016', 'mem_004', 'Sneha Kapoor',  1999, '2026-02-05', 'card', 'monthly'),

  // Deepak Yadav — personal Oct 2025 onwards
  makePayment('pay_017', 'mem_005', 'Deepak Yadav',  7999, '2025-10-20', 'upi',  'personal'),
  makePayment('pay_018', 'mem_005', 'Deepak Yadav',  7999, '2025-11-20', 'card', 'personal'),
  makePayment('pay_019', 'mem_005', 'Deepak Yadav',  7999, '2025-12-20', 'upi',  'personal'),
  makePayment('pay_020', 'mem_005', 'Deepak Yadav',  7999, '2026-01-20', 'upi',  'personal'),
  makePayment('pay_021', 'mem_005', 'Deepak Yadav',  7999, '2026-02-20', 'card', 'personal'),
  makePayment('pay_022', 'mem_005', 'Deepak Yadav',  7999, '2026-03-20', 'upi',  'personal'),

  // Ananya Singh — monthly Nov, Dec, Jan (left Jan 31)
  makePayment('pay_023', 'mem_006', 'Ananya Singh',  1999, '2025-11-01', 'card', 'monthly'),
  makePayment('pay_024', 'mem_006', 'Ananya Singh',  1999, '2025-12-01', 'upi',  'monthly'),
  makePayment('pay_025', 'mem_006', 'Ananya Singh',  1999, '2026-01-01', 'card', 'monthly'),

  // Vikram Kumar — quarterly Jan 2026 (Mar pending)
  makePayment('pay_026', 'mem_007', 'Vikram Kumar',  4999, '2026-01-10', 'upi',  'quarterly'),

  // Pooja Mehta — monthly Feb, Mar 2026
  makePayment('pay_027', 'mem_008', 'Pooja Mehta',   1999, '2026-02-01', 'card', 'monthly'),
  makePayment('pay_028', 'mem_008', 'Pooja Mehta',   1999, '2026-03-01', 'upi',  'monthly'),

  // Raj Malhotra — annual May 2025
  makePayment('pay_029', 'mem_009', 'Raj Malhotra', 14999, '2025-05-15', 'card', 'annual'),

  // Sania Khan — monthly Dec, Jan, Feb (Mar pending)
  makePayment('pay_030', 'mem_010', 'Sania Khan',    1999, '2025-12-20', 'upi',  'monthly'),
  makePayment('pay_031', 'mem_010', 'Sania Khan',    1999, '2026-01-20', 'card', 'monthly'),
  makePayment('pay_032', 'mem_010', 'Sania Khan',    1999, '2026-02-20', 'upi',  'monthly'),

  // Amit Verma — monthly Aug–Dec 2025 (left Dec 31)
  makePayment('pay_033', 'mem_011', 'Amit Verma',    1999, '2025-08-10', 'card', 'monthly'),
  makePayment('pay_034', 'mem_011', 'Amit Verma',    1999, '2025-09-10', 'upi',  'monthly'),
  makePayment('pay_035', 'mem_011', 'Amit Verma',    1999, '2025-10-10', 'card', 'monthly'),
  makePayment('pay_036', 'mem_011', 'Amit Verma',    1999, '2025-11-10', 'upi',  'monthly'),
  makePayment('pay_037', 'mem_011', 'Amit Verma',    1999, '2025-12-10', 'card', 'monthly'),

  // Kavya Reddy — personal Nov 2025 onwards
  makePayment('pay_038', 'mem_012', 'Kavya Reddy',   7999, '2025-11-25', 'upi',  'personal'),
  makePayment('pay_039', 'mem_012', 'Kavya Reddy',   7999, '2025-12-25', 'card', 'personal'),
  makePayment('pay_040', 'mem_012', 'Kavya Reddy',   7999, '2026-01-25', 'upi',  'personal'),
  makePayment('pay_041', 'mem_012', 'Kavya Reddy',   7999, '2026-02-25', 'card', 'personal'),
  makePayment('pay_042', 'mem_012', 'Kavya Reddy',   7999, '2026-03-25', 'upi',  'personal'),

  // Ravi Joshi — monthly Mar 2026
  makePayment('pay_043', 'mem_013', 'Ravi Joshi',    1999, '2026-03-01', 'card', 'monthly'),

  // Meera Sharma — quarterly Jan 2026
  makePayment('pay_044', 'mem_014', 'Meera Sharma',  4999, '2026-01-15', 'upi',  'quarterly'),

  // Suresh Gupta — monthly Jun 2025 onwards
  makePayment('pay_045', 'mem_015', 'Suresh Gupta',  1999, '2025-06-01', 'card', 'monthly'),
  makePayment('pay_046', 'mem_015', 'Suresh Gupta',  1999, '2025-07-01', 'upi',  'monthly'),
  makePayment('pay_047', 'mem_015', 'Suresh Gupta',  1999, '2025-08-01', 'card', 'monthly'),
  makePayment('pay_048', 'mem_015', 'Suresh Gupta',  1999, '2025-09-01', 'upi',  'monthly'),
  makePayment('pay_049', 'mem_015', 'Suresh Gupta',  1999, '2025-10-01', 'card', 'monthly'),
  makePayment('pay_050', 'mem_015', 'Suresh Gupta',  1999, '2025-11-01', 'upi',  'monthly'),
  makePayment('pay_051', 'mem_015', 'Suresh Gupta',  1999, '2025-12-01', 'card', 'monthly'),
  makePayment('pay_052', 'mem_015', 'Suresh Gupta',  1999, '2026-01-01', 'upi',  'monthly'),
  makePayment('pay_053', 'mem_015', 'Suresh Gupta',  1999, '2026-02-01', 'card', 'monthly'),
  makePayment('pay_054', 'mem_015', 'Suresh Gupta',  1999, '2026-03-01', 'upi',  'monthly'),
];

export const ADMIN_CREDENTIALS = {
  email: 'admin@dungeongym.com',
  password: 'admin123',
  name: 'Akash Lamba',
};
