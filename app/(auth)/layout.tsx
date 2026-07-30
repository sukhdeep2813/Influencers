export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-md space-y-8 p-8 border border-zinc-800 rounded-2xl bg-zinc-950/50 backdrop-blur-sm shadow-xl">
        {children}
      </div>
    </div>
  );
}
