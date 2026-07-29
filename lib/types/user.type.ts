import { AdminJob } from "./job.type";

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


export type AdminApplicationStatus =
  | 'pending'
  | 'reviewed'
  | 'shortlisted'
  | 'rejected'
  | 'accepted';


export interface AdminApplication {
  job: AdminJob;
  createdAt: string;
  _id: string;
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  status: AdminApplicationStatus;
  appliedAt: string;
  note?: string;
}

export interface Application {
  _id: string;
  createdAt: string;
  job: AdminJob;
  applications: never[];
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interviewing' | 'Accepted' | 'Rejected';
}