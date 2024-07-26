"use client";

import NoteForm from '@/components/NoteForm';
import { useRouter } from 'next/navigation';
import { createNote } from '@/api/notes';

export default function CreateNote() {
  const router = useRouter();

  const handleSubmit = async (title: string, content: string) => {
    await createNote({
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    router.push('/');
  };

  return (
    <NoteForm onSubmit={handleSubmit} />
  );
}
