
import React from 'react';
import { notFound } from 'next/navigation';
import TypingTutor from '../../../components/TypingTutor';
import { lessonsConfig, getAllLessons } from '../../../data/lessonsConfig';


export async function generateStaticParams() {
    const lessons = getAllLessons();
    return lessons.map((lesson) => ({
        id: lesson.id,
    }));
}

export const dynamicParams = true;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { id } = await params;
    const lessonId = id;
    
    // Validate lesson exists
    const { getLessonById } = await import('../../../data/lessonsConfig');
    const lesson = getLessonById(lessonId);
    
    if (!lesson) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-tm-bg pb-8 w-full overflow-x-hidden">
            <TypingTutor lessonId={lessonId} />
        </main>
    );
}
