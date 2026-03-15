"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <form
        onSubmit={handleLogin}
        className="bg-bg-100 p-8 rounded-xl shadow-soft w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded border border-white focus:outline-none my-2"
          required
        />

        <Input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded border border-white focus:outline-none my-2"
          required
        />

        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full hover:bg-primary-300 hover:text-white text-white py-3 rounded font-bold bg-primary-200 transition-all hover:cursor-pointer "
          disabled={loading}
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </Button>

        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-primary-100 hover:underline"
          >
            ليس لديك حساب؟ سجل الآن
          </a>
        </div>
      </form>
    </div>
  );
}
