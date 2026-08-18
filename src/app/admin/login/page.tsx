import { LoginForm } from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <p className="eyebrow">Private access</p>
        <h1>CMS login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
