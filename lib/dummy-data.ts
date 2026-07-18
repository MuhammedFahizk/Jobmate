// lib/dummy-data.ts
//
// Two sections, kept in one file since that's how this project already has
// it, but deliberately non-overlapping:
//
//   1. CLIENT / PUBLIC-SITE data — `Job`, `Application`, `UserProfile`,
//      `dummyUser`, `dummyJobs`, `dummyApplications`. Unchanged from what's
//      already in the project. The public site and `jobs.service.ts` /
//      `applications.service.ts` depend on these exact shapes — don't rename
//      or restructure them.
//
//   2. ADMIN data — `AdminJob`, `AdminApplication`, `Candidate`,
//      `ServiceListing`, `ContactSubmission`, `Review` + mock arrays +
//      mutators. Prefixed/named to avoid any collision with section 1
//      (earlier drafts of this file redeclared `Job`/`Application` here,
//      which is a duplicate-identifier compile error — fixed by renaming
//      the admin versions instead of touching the client ones).
// ─────────────────────────────────────────────────────────────────────────────

// ── ADMIN: types ─────────────────────────────────────────────────────────────

export type AdminJobStatus = 'active' | 'closed';

export interface AdminJob {
  id: string;
  title: string;
  company: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Gig';
  location: string;
  salary: string;
  status: AdminJobStatus;
  postedAt: string; // ISO date
  applicantCount: number;
  description: string;
}

export type AdminApplicationStatus =
  | 'pending'
  | 'reviewed'
  | 'shortlisted'
  | 'rejected'
  | 'accepted';

export interface AdminApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  status: AdminApplicationStatus;
  appliedAt: string;
  note?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  paymentStatus: 'pending' | 'paid';
  location?: string;
  skills?: string[];
  experience?: string;
  category?: string;
  resumeLink?: string;
  bio?: string;
  joinedAt: string;
}

export type ServiceStatus = 'active' | 'inactive';

export interface ServiceListing {
  id: string;
  title: string;
  provider: string;
  category: string;
  price: string;
  status: ServiceStatus;
  createdAt: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  handled: boolean;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type ReviewTarget = 'job' | 'service';

export interface Review {
  id: string;
  author: string;
  targetType: ReviewTarget;
  targetName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  status: ReviewStatus;
  submittedAt: string;
}

// ── ADMIN: mock data ─────────────────────────────────────────────────────────

export const ADMIN_JOBS: AdminJob[] = [
  { id: 'job_1', title: 'Delivery Rider', company: 'QuickCart Logistics', category: 'Logistics', type: 'Gig', location: 'Bengaluru, KA', salary: '₹18,000–24,000/mo', status: 'active', postedAt: '2026-06-28', applicantCount: 42, description: 'Two-wheeler delivery rider for last-mile logistics, day and evening shifts available.' },
  { id: 'job_2', title: 'Warehouse Associate', company: 'Nimbus Retail', category: 'Warehouse', type: 'Full-time', location: 'Pune, MH', salary: '₹15,500/mo', status: 'active', postedAt: '2026-07-02', applicantCount: 28, description: 'Inventory handling, packing, and dispatch support at our Hinjewadi facility.' },
  { id: 'job_3', title: 'Telecaller', company: 'BrightBPO Services', category: 'Customer Support', type: 'Full-time', location: 'Remote', salary: '₹12,000–16,000/mo', status: 'active', postedAt: '2026-07-05', applicantCount: 61, description: 'Outbound calling for lead qualification, Hindi and English fluency required.' },
  { id: 'job_4', title: 'Security Guard', company: 'Sentry Facilities Group', category: 'Security', type: 'Full-time', location: 'Gurugram, HR', salary: '₹14,000/mo', status: 'closed', postedAt: '2026-05-14', applicantCount: 19, description: 'Night shift security for a corporate campus, PSARA license preferred.' },
  { id: 'job_5', title: 'Beautician', company: 'GlowBar Salon Chain', category: 'Personal Care', type: 'Part-time', location: 'Kochi, KL', salary: '₹300/service', status: 'active', postedAt: '2026-07-10', applicantCount: 9, description: 'Freelance beautician slots across three salon locations, flexible hours.' },
  { id: 'job_6', title: 'Data Entry Operator', company: 'Ledger Point Pvt Ltd', category: 'Admin', type: 'Contract', location: 'Hyderabad, TS', salary: '₹13,500/mo', status: 'closed', postedAt: '2026-04-30', applicantCount: 33, description: '3-month contract digitising physical ledgers into the internal ERP.' },
  { id: 'job_7', title: 'Cook (Tiffin Service)', company: 'HomeMeals Co-op', category: 'Food Service', type: 'Part-time', location: 'Thiruvananthapuram, KL', salary: '₹9,000/mo', status: 'active', postedAt: '2026-07-13', applicantCount: 6, description: 'Morning tiffin prep for a home-style meal subscription service.' },
];

export const ADMIN_APPLICATIONS: AdminApplication[] = [
  { id: 'app_1', jobId: 'job_1', jobTitle: 'Delivery Rider', candidateId: 'cand_1', candidateName: 'Arun Kumar', status: 'pending', appliedAt: '2026-07-14', note: 'Has own two-wheeler and valid license.' },
  { id: 'app_2', jobId: 'job_1', jobTitle: 'Delivery Rider', candidateId: 'cand_2', candidateName: 'Fathima Rasheed', status: 'shortlisted', appliedAt: '2026-07-13' },
  { id: 'app_3', jobId: 'job_3', jobTitle: 'Telecaller', candidateId: 'cand_3', candidateName: 'Vishal Menon', status: 'reviewed', appliedAt: '2026-07-12', note: 'Prior BPO experience, 1.5 years.' },
  { id: 'app_4', jobId: 'job_2', jobTitle: 'Warehouse Associate', candidateId: 'cand_4', candidateName: 'Priya Suresh', status: 'accepted', appliedAt: '2026-07-08' },
  { id: 'app_5', jobId: 'job_5', jobTitle: 'Beautician', candidateId: 'cand_5', candidateName: 'Divya Nair', status: 'pending', appliedAt: '2026-07-15' },
  { id: 'app_6', jobId: 'job_3', jobTitle: 'Telecaller', candidateId: 'cand_6', candidateName: 'Rahul Varma', status: 'rejected', appliedAt: '2026-07-09', note: 'Did not meet language requirement.' },
  { id: 'app_7', jobId: 'job_7', jobTitle: 'Cook (Tiffin Service)', candidateId: 'cand_7', candidateName: 'Lakshmi Pillai', status: 'pending', appliedAt: '2026-07-15' },
  { id: 'app_8', jobId: 'job_2', jobTitle: 'Warehouse Associate', candidateId: 'cand_1', candidateName: 'Arun Kumar', status: 'shortlisted', appliedAt: '2026-07-11' },
];

export const DUMMY_CANDIDATES: Candidate[] = [
  { id: 'cand_1', name: 'Arun Kumar', email: 'arun.kumar@example.com', phone: '+919845010101', isVerified: true, paymentStatus: 'paid', location: 'Bengaluru, KA', skills: ['Two-wheeler license', 'Navigation apps'], experience: '2 years', category: 'Logistics', joinedAt: '2026-03-11', bio: 'Full-time rider looking for stable delivery work near Whitefield.' },
  { id: 'cand_2', name: 'Fathima Rasheed', email: 'fathima.r@example.com', phone: '+919845010102', isVerified: true, paymentStatus: 'paid', location: 'Bengaluru, KA', skills: ['Route planning'], experience: '1 year', category: 'Logistics', joinedAt: '2026-04-02' },
  { id: 'cand_3', name: 'Vishal Menon', email: 'vishal.menon@example.com', phone: '+919845010103', isVerified: false, paymentStatus: 'pending', location: 'Remote', skills: ['Sales', 'CRM tools'], experience: '1.5 years', category: 'Customer Support', joinedAt: '2026-06-20' },
  { id: 'cand_4', name: 'Priya Suresh', email: 'priya.suresh@example.com', phone: '+919845010104', isVerified: true, paymentStatus: 'paid', location: 'Pune, MH', skills: ['Inventory management'], experience: '3 years', category: 'Warehouse', joinedAt: '2026-01-18' },
  { id: 'cand_5', name: 'Divya Nair', email: 'divya.nair@example.com', phone: '+919845010105', isVerified: false, paymentStatus: 'pending', location: 'Kochi, KL', skills: ['Hair styling', 'Makeup'], experience: '4 years', category: 'Personal Care', joinedAt: '2026-07-01' },
  { id: 'cand_6', name: 'Rahul Varma', email: 'rahul.varma@example.com', phone: '+919845010106', isVerified: true, paymentStatus: 'paid', location: 'Remote', skills: ['Telecalling'], experience: '6 months', category: 'Customer Support', joinedAt: '2026-05-27' },
  { id: 'cand_7', name: 'Lakshmi Pillai', email: 'lakshmi.pillai@example.com', phone: '+919845010107', isVerified: false, paymentStatus: 'pending', location: 'Thiruvananthapuram, KL', skills: ['South Indian cuisine'], experience: '5 years', category: 'Food Service', joinedAt: '2026-07-10' },
];

export const DUMMY_SERVICES: ServiceListing[] = [
  { id: 'svc_1', title: 'Home Deep Cleaning', provider: 'SparkleHome Services', category: 'Cleaning', price: '₹1,499', status: 'active', createdAt: '2026-06-01', description: '2-person crew, 3-hour deep clean for a 2BHK apartment.' },
  { id: 'svc_2', title: 'AC Repair & Service', provider: 'CoolFix Technicians', category: 'Appliance Repair', price: '₹499', status: 'active', createdAt: '2026-06-15', description: 'Gas top-up, filter cleaning, and general diagnostics.' },
  { id: 'svc_3', title: 'Salon at Home', provider: 'GlowBar Salon Chain', category: 'Personal Care', price: '₹899', status: 'inactive', createdAt: '2026-05-20', description: 'Haircut, facial, and threading at your doorstep.' },
  { id: 'svc_4', title: 'Pest Control', provider: 'SafeNest Pest Solutions', category: 'Home Maintenance', price: '₹1,200', status: 'active', createdAt: '2026-07-04', description: 'General pest control treatment for a 2–3BHK home, 6-month warranty.' },
];

export const DUMMY_CONTACTS: ContactSubmission[] = [
  { id: 'ct_1', name: 'Nikhil Rao', email: 'nikhil.rao@example.com', subject: 'Payment not reflecting', message: 'I paid the verification fee two days ago but my account still shows unpaid.', submittedAt: '2026-07-15', handled: false },
  { id: 'ct_2', name: 'Anjali Krishnan', email: 'anjali.k@example.com', subject: 'Job listing seems fake', message: 'The "Warehouse Associate" listing at Nimbus Retail asked me to pay a deposit before the interview.', submittedAt: '2026-07-14', handled: false },
  { id: 'ct_3', name: 'Suresh Babu', email: 'suresh.babu@example.com', subject: 'Cannot upload resume', message: 'The upload button on my profile page does not respond on mobile Chrome.', submittedAt: '2026-07-12', handled: true },
  { id: 'ct_4', name: 'Meera Joseph', email: 'meera.joseph@example.com', subject: 'Partner enquiry', message: 'We run a cleaning services business in Kochi and would like to list on JobMate.', submittedAt: '2026-07-10', handled: true },
];

export const DUMMY_REVIEWS: Review[] = [
  { id: 'rev_1', author: 'Arun Kumar', targetType: 'job', targetName: 'Delivery Rider — QuickCart Logistics', rating: 4, comment: 'Good pay, on-time payouts, but the app needs offline route caching.', status: 'pending', submittedAt: '2026-07-15' },
  { id: 'rev_2', author: 'Priya Suresh', targetType: 'job', targetName: 'Warehouse Associate — Nimbus Retail', rating: 5, comment: 'Supportive supervisors and clear shift schedules.', status: 'approved', submittedAt: '2026-07-09' },
  { id: 'rev_3', author: 'Rahul Varma', targetType: 'service', targetName: 'AC Repair & Service — CoolFix Technicians', rating: 2, comment: 'Technician arrived two hours late.', status: 'pending', submittedAt: '2026-07-13' },
  { id: 'rev_4', author: 'Divya Nair', targetType: 'service', targetName: 'Home Deep Cleaning — SparkleHome Services', rating: 1, comment: 'Spam-like language and clearly not a real customer.', status: 'rejected', submittedAt: '2026-07-08' },
];

// ── ADMIN: query helpers ─────────────────────────────────────────────────────

export function getDashboardStats() {
  return {
    totalJobs: ADMIN_JOBS.length,
    activeJobs: ADMIN_JOBS.filter((j) => j.status === 'active').length,
    totalApplications: ADMIN_APPLICATIONS.length,
    totalCandidates: DUMMY_CANDIDATES.length,
    pendingReviews: DUMMY_REVIEWS.filter((r) => r.status === 'pending').length,
  };
}

export function getJobById(id: string): AdminJob | undefined {
  return ADMIN_JOBS.find((j) => j.id === id);
}

export function getCandidateById(id: string): Candidate | undefined {
  return DUMMY_CANDIDATES.find((c) => c.id === id);
}

export function getApplicationsForJob(jobId: string): AdminApplication[] {
  return ADMIN_APPLICATIONS.filter((a) => a.jobId === jobId);
}

export function getApplicationsForCandidate(candidateId: string): AdminApplication[] {
  return ADMIN_APPLICATIONS.filter((a) => a.candidateId === candidateId);
}

// ── ADMIN: mutators ──────────────────────────────────────────────────────────
// Mutate the in-memory arrays above directly (no backend). Every admin page
// action goes through here, so there's one place to swap for real
// `jobsService` / `applicationsService` / `userService` calls later.

const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createJob(payload: Omit<AdminJob, 'id' | 'postedAt' | 'applicantCount'>): Promise<AdminJob> {
  await delay();
  const job: AdminJob = { ...payload, id: uid('job'), postedAt: new Date().toISOString().slice(0, 10), applicantCount: 0 };
  ADMIN_JOBS.unshift(job);
  return job;
}

export async function updateJob(id: string, payload: Partial<AdminJob>): Promise<AdminJob | undefined> {
  await delay();
  const idx = ADMIN_JOBS.findIndex((j) => j.id === id);
  if (idx === -1) return undefined;
  ADMIN_JOBS[idx] = { ...ADMIN_JOBS[idx], ...payload };
  return ADMIN_JOBS[idx];
}

export async function closeJob(id: string): Promise<AdminJob | undefined> {
  return updateJob(id, { status: 'closed' });
}

export async function updateApplicationStatus(id: string, status: AdminApplicationStatus): Promise<AdminApplication | undefined> {
  await delay();
  const idx = ADMIN_APPLICATIONS.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  ADMIN_APPLICATIONS[idx] = { ...ADMIN_APPLICATIONS[idx], status };
  return ADMIN_APPLICATIONS[idx];
}

export async function verifyCandidate(id: string): Promise<Candidate | undefined> {
  await delay();
  const idx = DUMMY_CANDIDATES.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  DUMMY_CANDIDATES[idx] = { ...DUMMY_CANDIDATES[idx], isVerified: true };
  return DUMMY_CANDIDATES[idx];
}

export async function createService(payload: Omit<ServiceListing, 'id' | 'createdAt'>): Promise<ServiceListing> {
  await delay();
  const svc: ServiceListing = { ...payload, id: uid('svc'), createdAt: new Date().toISOString().slice(0, 10) };
  DUMMY_SERVICES.unshift(svc);
  return svc;
}

export async function updateService(id: string, payload: Partial<ServiceListing>): Promise<ServiceListing | undefined> {
  await delay();
  const idx = DUMMY_SERVICES.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  DUMMY_SERVICES[idx] = { ...DUMMY_SERVICES[idx], ...payload };
  return DUMMY_SERVICES[idx];
}

export async function markContactHandled(id: string): Promise<ContactSubmission | undefined> {
  await delay();
  const idx = DUMMY_CONTACTS.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  DUMMY_CONTACTS[idx] = { ...DUMMY_CONTACTS[idx], handled: true };
  return DUMMY_CONTACTS[idx];
}

export async function setReviewStatus(id: string, status: ReviewStatus): Promise<Review | undefined> {
  await delay();
  const idx = DUMMY_REVIEWS.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  DUMMY_REVIEWS[idx] = { ...DUMMY_REVIEWS[idx], status };
  return DUMMY_REVIEWS[idx];
}

export async function deleteReview(id: string): Promise<void> {
  await delay();
  const idx = DUMMY_REVIEWS.findIndex((r) => r.id === id);
  if (idx !== -1) DUMMY_REVIEWS.splice(idx, 1);
}

// Async wrappers so every admin page can await "loading" the same way it
// would await a real service call.
export async function listJobs(): Promise<AdminJob[]> { await delay(250); return [...ADMIN_JOBS]; }
export async function listApplications(): Promise<AdminApplication[]> { await delay(250); return [...ADMIN_APPLICATIONS]; }
export async function listCandidates(): Promise<Candidate[]> { await delay(250); return [...DUMMY_CANDIDATES]; }
export async function listServices(): Promise<ServiceListing[]> { await delay(250); return [...DUMMY_SERVICES]; }
export async function listContacts(): Promise<ContactSubmission[]> { await delay(250); return [...DUMMY_CONTACTS]; }
export async function listReviews(): Promise<Review[]> { await delay(250); return [...DUMMY_REVIEWS]; }
export async function fetchDashboardStats() { await delay(250); return getDashboardStats(); }

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT / PUBLIC-SITE data — unchanged from the project as-is.
// Used by the public pages and by jobs.service.ts / applications.service.ts.
// Do not rename these — `Job` and `Application` here are the real,
// already-depended-on shapes.
// ─────────────────────────────────────────────────────────────────────────────

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, Internship, Remote
  category: string;
  status: 'active' | 'closed';
  skills: string[];
  salary: string;
  logoBg: string; // Background color for dummy logo
  description: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interviewing' | 'Accepted' | 'Rejected';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  paymentStatus: 'pending' | 'paid';
  skills: string[];
  experience: string;
  isVerified: boolean;
  resumeName: string;
}

// Feel free to toggle paymentStatus between 'pending' and 'paid' to preview dashboard states!
export const dummyUser: UserProfile = {
  name: "Michael Darwin",
  email: "michael.darwin@JobMate.com",
  phone: "919999999999",
  avatarInitials: "MD",
  paymentStatus: "pending", // Change to 'paid' to test the paid view
  skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "UI Design"],
  experience: "2+ Years",
  isVerified: false,        // Change to true to test the verified state
  resumeName: "Michael_Darwin_Resume.pdf",
};

export const dummyJobs: Job[] = [
  {
    id: "JOB-101",
    title: "Senior UI/UX Designer",
    company: "Minerva Company",
    location: "Bangalore, India",
    type: "Full-time",
    category: "Design",
    status: "active",
    skills: ["Figma", "Design Systems", "UI Design", "Prototyping"],
    salary: "₹18,0,000 - ₹24,00,000 / year",
    logoBg: "bg-secondary-100 text-secondary-700",
    description: "Lead the design system effort for our enterprise platform. Create delightful user flows and visual assets."
  },
  {
    id: "JOB-102",
    title: "Frontend Developer (Next.js)",
    company: "Halden Inc.",
    location: "Remote",
    type: "Full-time",
    category: "Software Development",
    status: "active",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    salary: "₹12,0,000 - ₹18,0,000 / year",
    logoBg: "bg-primary-100 text-primary-700",
    description: "Build rapid, SEO-optimized web applications with Next.js 14 and Tailwind CSS. Ensure smooth animations and high performance."
  },
  {
    id: "JOB-103",
    title: "Product Marketing Manager",
    company: "Vertex Scale",
    location: "Mumbai, India",
    type: "Full-time",
    category: "Marketing",
    status: "active",
    skills: ["SEO", "Content Strategy", "Growth Hacking", "Product Launch"],
    salary: "₹10,00,000 - ₹14,00,000 / year",
    logoBg: "bg-emerald-100 text-emerald-600",
    description: "Drive adoption and positioning for our B2B SaaS product line. Work closely with product and sales teams."
  },
  {
    id: "JOB-104",
    title: "Data Analyst",
    company: "Fintech Growth",
    location: "Singapore",
    type: "Contract",
    category: "Data Science",
    status: "active",
    skills: ["Python", "SQL", "Tableau", "Excel"],
    salary: "$4,000 - $6,000 / month",
    logoBg: "bg-amber-100 text-amber-600",
    description: "Analyze market data trends and synthesize insights for investment decisions. Build clean visualization dashboards."
  },
  {
    id: "JOB-105",
    title: "React Native Developer",
    company: "AppSphere Studio",
    location: "Delhi, India",
    type: "Full-time",
    category: "Software Development",
    status: "closed",
    skills: ["React Native", "iOS", "Android", "Redux"],
    salary: "₹8,0,000 - ₹12,0,000 / year",
    logoBg: "bg-rose-100 text-rose-600",
    description: "Maintain and upgrade cross-platform mobile apps. Collaborate with backend developers for robust API integration."
  },
  {
    id: "JOB-106",
    title: "SEO Specialist",
    company: "Scribe Agency",
    location: "Remote",
    type: "Part-time",
    category: "Marketing",
    status: "active",
    skills: ["Google Analytics", "Ahrefs", "Keyword Research", "Copywriting"],
    salary: "₹30,000 - ₹50,000 / month",
    logoBg: "bg-teal-400 text-teal-100",
    description: "Audit client websites, propose optimizations, and draft copy aimed at elevating ranking positions on search engines."
  },
  {
    id: "JOB-107",
    title: "UI Designer",
    company: "Pixel Perfect",
    location: "Mumbai, India",
    type: "Internship",
    category: "Design",
    status: "active",
    skills: ["Figma", "UI Design", "Visual Arts"],
    salary: "₹25,000 / month",
    logoBg: "bg-primary-100 text-primary-700",
    description: "Assist senior designers in building web page templates, mobile screens, and social media post designs."
  },
  {
    id: "JOB-108",
    title: "Associate Product Manager",
    company: "FlowState SaaS",
    location: "Bangalore, India",
    type: "Full-time",
    category: "Product Management",
    status: "active",
    skills: ["Agile", "Jira", "User Stories", "Analytics"],
    salary: "₹14,0,000 - ₹18,0,000 / year",
    logoBg: "bg-accent-400/20 text-accent-500",
    description: "Manage product backlog, draft user stories, and sync with engineering to execute sprint goals for flow-optimization features."
  }
];

export const dummyApplications: Application[] = [
  {
    id: "APP-001",
    jobId: "JOB-101",
    jobTitle: "Senior UI/UX Designer",
    company: "Minerva Company",
    appliedDate: "2026-06-15",
    status: "Interviewing"
  },
  {
    id: "APP-002",
    jobId: "JOB-103",
    jobTitle: "Product Marketing Manager",
    company: "Vertex Scale",
    appliedDate: "2026-06-18",
    status: "Applied"
  }
];
