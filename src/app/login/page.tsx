"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard/portfolio");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-200">
      <form onSubmit={handleLogin} className="bg-bg-100 p-8 rounded-xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-primary-100 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-primary-100 focus:outline-none"
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-primary-100 text-white py-3 rounded font-bold hover:bg-primary-200 transition-all"
          disabled={loading}
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
        <div className="mt-4 text-center">
          <a href="/register" className="text-primary-100 hover:underline">ليس لديك حساب؟ سجل الآن</a>
        </div>
      </form>
    </div>
  );
}
