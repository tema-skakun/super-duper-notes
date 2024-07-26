"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchNoteById, deleteNote } from '@/api/notes';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const response = await fetchNoteById(id);
          setNote(response.data);
        } catch (err) {
          setError('Failed to fetch note');
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      router.push('/');
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!note) return <p>Loading...</p>;

  const isUpdated = new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime();

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>
        Created on: {new Date(note.createdAt).toLocaleString()}
        {isUpdated && (
          <span> (Updated on: {new Date(note.updatedAt).toLocaleString()})</span>
        )}
      </p>
      <Link href={`/edit/${note.id}`}>
        <Button variant="secondary">Edit Note</Button>
      </Link>
      <Button variant="danger" onClick={handleDelete}>Delete Note</Button>
    </div>
  );
}
