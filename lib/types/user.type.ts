export interface AdminCandidate {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  category?: string;
  bio?: string;
  avatarUrl?: string;
  resumeLink?: string;
  isVerified: boolean;
  isActive: boolean;
  paymentStatus: 'unpaid' | 'paid';
  createdAt: string;
}
