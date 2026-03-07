import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}