import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intern Login",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "https://www.kyzor.online/login",
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
