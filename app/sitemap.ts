import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "", priority: 1, changeFrequency: "daily" as const },
    { url: "/jobs", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/services/home-staffing", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/services/job-consulting", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
