
import React from 'react';
import Link from 'next/link';
import { lessons } from './data/lessons';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Sidebar / Info Panel */}
        <div className="w-full md:w-1/3 bg-tm-header text-white p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Hindi Typing<br />Master</h1>
            <p className="opacity-80 text-sm mb-12">Master InScript Keyboard</p>

            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold mb-1">Current Course</h3>
                <p className="text-sm opacity-90">Touch Typing Course</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold mb-1">Duration</h3>
                <p className="text-sm opacity-90">6 Lessons</p>
              </div>
            </div>
          </div>

          <Link href="/lesson/1" className="block w-full">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105">
              Start Lesson 1
            </button>
          </Link>
        </div>

        {/* Lesson List */}
        <div className="w-full md:w-2/3 p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>

          <div className="space-y-3">
            {lessons.map((lesson) => (
              <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block group">
                <div className="flex items-center p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group-hover:shadow-md">
                  <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {lesson.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-700">{lesson.title}</h3>
                    <p className="text-xs text-gray-500">{lesson.description}</p>
                  </div>
                  <div className="text-gray-400 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t text-center text-gray-400 text-sm">
            <p>Typing Master Pro Clone for Hindi InScript</p>
            <p className="text-xs mt-1">Make sure your system keyboard is set to Hindi InScript</p>
          </div>
        </div>

      </div>
    </main>
  );
}
