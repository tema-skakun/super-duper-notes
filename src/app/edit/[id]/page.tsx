"use client";

import NoteForm from '@/components/NoteForm';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (title: string, content: string) => {
    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    await axios.put(`http://localhost:${port}/notes/${id}`, {
      title,
      content,
      updatedAt: new Date().toISOString()
    });
    router.push('/');
  };

  return (
    <NoteForm noteId={id} onSubmit={handleSubmit} />
  );
}
