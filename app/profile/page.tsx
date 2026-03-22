'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  fullName?: string;
  username?: string;
  email?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/auth/me', { method: 'GET' });
        const result = (await response.json()) as { user: User | null };
        if (!result.user) {
          router.replace('/login');
          return;
        }
        setFullName(result.user.fullName || '');
        setUsername(result.user.username || '');
        setEmail(result.user.email || '');
      } catch {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSaving(true);

    const response = await fetch('/api/auth/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, username }),
    });

    const result = (await response.json()) as {
      error?: string;
      user?: User;
    };

    if (!response.ok) {
      setErrorMessage(result.error || 'Could not save profile.');
      setSaving(false);
      return;
    }

    if (result.user) {
      setFullName(result.user.fullName || '');
      setUsername(result.user.username || '');
      setEmail(result.user.email || '');
    }

    setSuccessMessage('Profile updated.');
    setSaving(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">
        <p className="text-white/60 text-sm font-semibold">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-2">Edit Profile</h1>
          <p className="text-sm text-white/60">
            नाम और यूज़रनेम अपडेट करें। ईमेल खाते से जुड़ा है — यहाँ से नहीं बदल सकते।
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
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
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300"
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email ID (बदल नहीं सकते)
            </label>
            <input
              id="profile-email"
              type="email"
              readOnly
              tabIndex={-1}
              value={email}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 text-sm outline-none cursor-default select-text"
            />
            <p className="mt-1.5 text-[11px] text-white/45 leading-snug">
              यह ईमेल हटाया या बदला नहीं जा सकता; कॉपी करने के लिए चुन सकते हैं।
            </p>
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
            disabled={saving}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white font-black hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
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
