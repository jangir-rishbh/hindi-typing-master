'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password must match.');
      return;
    }

    setLoading(true);

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      }),
    });

    const result = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      setErrorMessage(result.error || 'Signup failed.');
      setLoading(false);
      return;
    }

    setSuccessMessage(result.message || 'Account created successfully.');
    setLoading(false);

    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-2">Sign Up</h1>
          <p className="text-sm text-white/60">Create your account to start learning.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={6}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-5 flex items-center gap-4">
          <Link
            href="/"
            className="inline-block text-sm text-indigo-300 hover:text-indigo-200 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/login"
            className="inline-block text-sm font-semibold text-white/80 hover:text-white transition"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </main>
  );
}
