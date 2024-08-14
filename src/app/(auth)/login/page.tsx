import { AuthCard } from "~/components/auth/auth-card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Welcome back!"
        description="Please log in"
        type="login"
        backMessage="Don't have an account?"
        backURL="/register"
      />
    </main>
  );
}
