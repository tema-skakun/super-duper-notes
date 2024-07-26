"use client";

import NoteForm from '@/components/NoteForm';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateNote() {
  const router = useRouter();

  const handleSubmit = async (title: string, content: string) => {
    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    await axios.post(`http://localhost:${port}/notes`, {
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    router.push('/');
  };

  return (
    <NoteForm onSubmit={handleSubmit} />
  );
}
