"use client";

import NoteForm from '@/components/NoteForm';
import { useRouter, useParams } from 'next/navigation';
import { updateNote } from '@/api/notes';

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (title: string, content: string) => {
    await updateNote(id, {
      title,
      content,
      updatedAt: new Date().toISOString(),
    });
    router.push('/');
  };

  return (
    <NoteForm noteId={id} onSubmit={handleSubmit} />
  );
}
