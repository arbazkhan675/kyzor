import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Free Consultation",
    description: "Schedule a free 30-minute consultation with KYZOR to map your operations, identify inefficiencies, and find high-impact AI automation opportunities.",
    alternates: {
        canonical: "https://www.kyzor.online/book",
    },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
