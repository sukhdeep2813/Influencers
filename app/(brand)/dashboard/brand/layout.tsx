export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-4xl space-y-8 p-10 border border-gray-100 rounded-3xl bg-white shadow-[var(--card-shadow)]">
        {children}
      </div>
    </div>
  );
}
