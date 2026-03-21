'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const result = (await response.json()) as {
      error?: string;
      message?: string;
      user?: { fullName?: string; username?: string };
    };

    if (!response.ok) {
      setErrorMessage(result.error || 'Login failed.');
      setLoading(false);
      return;
    }

    setSuccessMessage(
      `Welcome ${result.user?.fullName || result.user?.username || 'back'}! ${
        result.message || 'Login successful.'
      }`
    );
    setLoading(false);

    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-2">Login</h1>
          <p className="text-sm text-white/60">Enter your details to continue.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="you@example.com or username"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          {errorMessage ? (
            <p className="text-sm text-rose-300 bg-rose-500/10 border border-rose-300/20 rounded-lg px-3 py-2">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-300/20 rounded-lg px-3 py-2">
              {successMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white font-black hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 inline-block text-sm text-indigo-300 hover:text-indigo-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
