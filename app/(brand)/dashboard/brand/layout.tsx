import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (session) {
  //   redirect(
  //     session.user.role === "BRAND"
  //       ? "/dashboard/brand"
  //       : "/dashboard/creator",
  //   );
  // }

  return (
     <main className="min-h-screen w-full bg-slate-50">
      {children}
    </main>
  );
}