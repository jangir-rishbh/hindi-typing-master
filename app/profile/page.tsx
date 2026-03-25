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

    setSuccessMessage('Profile updated successfully.');
    setSaving(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace('/login');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">
        <p className="text-white/60 text-sm font-semibold">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">Dashboard</h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/60">
              Welcome back! Manage your profile and track your typing progress.
            </p>
          </div>
          
          {/* Signout Button - Top Right */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 hover:bg-rose-500/30 hover:border-rose-400/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold">Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm font-semibold">WPM</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">45</p>
            <p className="text-xs sm:text-sm text-white/40">Words per minute</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm font-semibold">Accuracy</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">92%</p>
            <p className="text-xs sm:text-sm text-white/40">Typing accuracy</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.753V6.253z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm font-semibold">Lessons</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">12</p>
            <p className="text-xs sm:text-sm text-white/40">Completed lessons</p>
          </div>

          <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-rose-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm font-semibold">Time</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">2.5h</p>
            <p className="text-xs sm:text-sm text-white/40">Practice time</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">Profile Information</h2>
              
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                      className="w-full rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300 transition text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      className="w-full rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 outline-none focus:border-indigo-300 transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60 mb-2">
                    Email ID (Read-only)
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={email}
                    className="w-full rounded-lg sm:rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white/90 text-xs sm:text-sm outline-none cursor-default select-text"
                  />
                  <p className="mt-1.5 text-xs text-white/45 leading-snug">
                    Email cannot be changed here for security reasons.
                  </p>
                </div>

                {errorMessage ? (
                  <div className="bg-rose-500/10 border border-rose-300/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-rose-300">{errorMessage}</p>
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="bg-emerald-500/10 border border-emerald-300/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-emerald-300">{successMessage}</p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 sm:py-3 text-white font-black hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {saving ? 'Saving changes…' : 'Update Profile'}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-black text-white mb-3 sm:mb-4">Quick Actions</h3>
              
              <div className="space-y-2 sm:space-y-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 sm:gap-3 w-full text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m5-5v6m0 0v-6m0 6h6" />
                  </svg>
                  Continue Learning
                </Link>

                <Link
                  href="/lesson/home-row"
                  className="flex items-center gap-2 sm:gap-3 w-full text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z" />
                  </svg>
                  Practice Typing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
