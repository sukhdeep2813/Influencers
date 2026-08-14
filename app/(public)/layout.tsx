// app/(public)/layout.tsx
import Navbar from "@/components/ui/Navbar"; // Adjust path to your Navbar

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 
        Your page.tsx already has <main className="pt-24">, 
        so we just pass the children directly here. 
      */}
      {children}
    </div>
  );
}
