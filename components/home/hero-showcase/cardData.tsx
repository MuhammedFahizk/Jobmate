export type CardType = "candidate" | "job" | "company" | "skill" | "stat";

export interface CandidateCardData {
    type: "candidate";
    name: string;
    role: string;
    skills: string;
    years: string;
    avatar: string;
    status: "Available" | "Open to Work";
    tint: "mint" | "purple" | "peach";
}

export interface JobCardData {
    type: "job";
    title: string;
    companyIcon: string; // lucide icon name, see ICONS map
    companyColor: string;
    location: string;
    salary: string;
    tint: "peach" | "purple" | "coral";
}

export interface CompanyCardData {
    type: "company";
    name: string;
    icon: string;
    iconColor: string;
    openings: number;
    tint: "coral" | "purple";
}

export interface SkillCardData {
    type: "skill";
    skills: string[];
    tint: "purple" | "mint";
}

export interface StatCardData {
    type: "stat";
    variant: "simple" | "sparkline" | "ring";
    value: string;
    label: string;
    sub?: string;
    tint: "sky" | "coral" | "mint";
}

export type ShowcaseCard =
    | CandidateCardData
    | JobCardData
    | CompanyCardData
    | SkillCardData
    | StatCardData;

// ── Column 1 ──────────────────────────────────────────────────────────
export const column1: ShowcaseCard[] = [
    { type: "candidate", name: "Muhammed Fahiz", role: "Senior Full Stack Engineer", skills: "React • Node.js • MongoDB", years: "5+ Years Experience", avatar: "/images/profile.png", status: "Available", tint: "mint" },
    { type: "stat", variant: "simple", value: "18K+", label: "Active Candidates", sub: "+26% this month", tint: "sky" },
    { type: "job", title: "Backend Developer", companyIcon: "chrome", companyColor: "#4285F4", location: "Remote", salary: "$130K – $180K", tint: "peach" },
    { type: "skill", skills: ["React", "Node.js", "TypeScript", "MongoDB", "Docker", "AWS"], tint: "purple" },
    { type: "candidate", name: "Emily Watson", role: "Product Designer", skills: "Figma • UI/UX • Prototyping", years: "4+ Years Experience", avatar: "/images/profile1.png", status: "Available", tint: "mint" },
    { type: "company", name: "Spotify", icon: "music", iconColor: "#1DB954", openings: 12, tint: "coral" },
];

// ── Column 2 ──────────────────────────────────────────────────────────
export const column2: ShowcaseCard[] = [
    { type: "job", title: "Senior React Developer", companyIcon: "code-2", companyColor: "#6B2FA0", location: "Remote", salary: "$120K – $180K", tint: "peach" },
    { type: "candidate", name: "Sarah Johnson", role: "UI/UX Designer", skills: "Figma • Adobe XD • Sketch", years: "3+ Years Experience", avatar: "/images/profile4.png", status: "Open to Work", tint: "purple" },
    { type: "stat", variant: "sparkline", value: "582", label: "Applications", sub: "+18% this week", tint: "sky" },
    { type: "company", name: "Microsoft", icon: "grid-2x2", iconColor: "#F25022", openings: 28, tint: "coral" },
    { type: "candidate", name: "James Lee", role: "Backend Engineer", skills: "Node.js • Express • MySQL", years: "6+ Years Experience", avatar: "/images/profile2.png", status: "Available", tint: "mint" },
    { type: "job", title: "Product Manager", companyIcon: "shopping-bag", companyColor: "#FF9900", location: "Hybrid", salary: "$130K – $150K", tint: "peach" },
];

// ── Column 3 ──────────────────────────────────────────────────────────
export const column3: ShowcaseCard[] = [
    { type: "company", name: "Airbnb", icon: "home", iconColor: "#FF385C", openings: 8, tint: "coral" },
    { type: "skill", skills: ["JavaScript", "Python", "Next.js", "Tailwind", "GraphQL", "PostgreSQL"], tint: "purple" },
    { type: "candidate", name: "Alex Johnson", role: "Frontend Engineer", skills: "React • Next.js • Tailwind", years: "4+ Years Experience", avatar: "/images/image.png", status: "Available", tint: "mint" },
    { type: "job", title: "Frontend Developer", companyIcon: "home", companyColor: "#FF385C", location: "Remote", salary: "$90K – $120K", tint: "peach" },
    { type: "stat", variant: "ring", value: "98%", label: "Hiring Success", sub: "+12% this month", tint: "sky" },
    //   { type: "stat", variant: "simple", value: "+2K", label: "Top Skills in Demand", tint: "purple" },
];