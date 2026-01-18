
import React from 'react';
import { notFound } from 'next/navigation';
import TypingTutor from '../../components/TypingTutor';
import { lessons } from '../../data/lessons';

export async function generateStaticParams() {
    return lessons.map((lesson) => ({
        id: lesson.id.toString(),
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { id } = await params;
    const lessonId = parseInt(id);
    const lesson = lessons.find(l => l.id === lessonId);

    if (!lesson) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-tm-bg py-8">
            <TypingTutor lesson={lesson} />
        </main>
    );
}
