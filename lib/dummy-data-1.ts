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
