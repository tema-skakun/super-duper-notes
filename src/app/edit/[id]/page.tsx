"use client";

import NoteForm from '@/components/NoteForm';
import { useRouter, useParams } from 'next/navigation';
import { fetchNoteById, updateNote } from '@/api/notes';
import { useEffect, useState } from 'react';

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const response = await fetchNoteById(id);
          setCreatedAt(response.data.createdAt);
        } catch (err) {
          console.error('Failed to fetch note', err);
        }
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (title: string, content: string) => {
    if (!createdAt) return;
    await updateNote(id, {
      title,
      content,
      createdAt,
      updatedAt: new Date().toISOString(),
    });
    router.push('/');
  };

  return (
    <NoteForm noteId={id} onSubmit={handleSubmit} />
  );
}
