import LoginForm from "@/app/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
