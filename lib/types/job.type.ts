export const JOB_CATEGORIES = [
    'Accounting & Finance',
    'Sales & Marketing',
    'Admin & Office',
    'IT & Software',
    'Healthcare',
    'Construction & Civil',
    'Hospitality',
    'Teaching & Education',
    'Driving & Logistics',
    'Other',
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const JOB_TYPES = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
] as const;

export type JobType = (typeof JOB_TYPES)[number]['value'];

export const EXPERIENCE_LEVELS = [
    { value: 'fresher', label: 'Fresher' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' },
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]['value'];

export type JobStatus = 'active' | 'closed';

export const JOB_STATUSES: { value: JobStatus; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
];

export const CURRENCIES = ['INR', 'USD', 'AED', 'GBP', 'EUR'] as const;
export type Currency = (typeof CURRENCIES)[number];

export interface Salary {
    min: number | null;
    max: number | null;
    currency: Currency;
    isNegotiable: boolean;
}

export const DEFAULT_SALARY: Salary = {
    min: null,
    max: null,
    currency: 'INR',
    isNegotiable: false,
};

export interface AdminJob {
    isActive: any;
    _id: string;
    slug: string;
    title: string;
    company: string;
    category: JobCategory;
    type: JobType;
    location: string;
    salary: Salary;
    description: string;
    status: JobStatus;
    postedAt: string;
    applicantCount: number;
    whatsappNumber: string;
    experienceRequired: ExperienceLevel;
    tags: string[];
    requiredSkills: string[];
    keyResponsibilities: string[];
    isFeatured: boolean;
}


export interface AdminJobListResponse {
    status: string;
    results: number;
    total: number;
    data: {
        jobs: AdminJob[];
    };
}

export interface AdminJobResponse {
    status: string;
    data: {
        job: AdminJob;
    };
}


export interface CreateJobRequest {
    title: string;
    company: string;
    category: JobCategory;
    type: JobType;
    location: string;
    salary: Salary;
    description: string;
    whatsappNumber: string;
    experienceRequired: ExperienceLevel;
    tags: string[];
    requiredSkills: string[];
    keyResponsibilities: string[];
    isFeatured: boolean;
}

/** PATCH /jobs/:id — every field optional, plus a status toggle. */
export type UpdateJobRequest = Partial<Omit<CreateJobRequest, 'salary'>> & {
    salary?: Partial<Salary>;
    status?: JobStatus;
};

export interface CreateJobResponse {
    status: string;
    data: { job: AdminJob };
}

export interface UpdateJobResponse {
    status: string;
    data: { job: AdminJob };
}
/** PATCH /jobs/:id — every field optional, plus a status toggle. */

export interface CreateJobResponse {
    status: string;
    data: {
        job: AdminJob;
    };
}

export interface UpdateJobResponse {
    status: string;
    data: {
        job: AdminJob;
    };
}

