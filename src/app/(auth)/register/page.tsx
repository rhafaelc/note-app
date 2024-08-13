import { AuthCard } from "~/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Create a new account!"
        description="Please register"
        type="register"
        backMessage="Already have an account?"
        backURL="/login"
      />
    </main>
  );
}
