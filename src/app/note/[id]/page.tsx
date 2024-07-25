"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
        const response = await axios.get(`http://localhost:${port}/notes/${id}`);
        setNote(response.data);
      };

      fetchNote();
    }
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Link href={`/edit/${note.id}`}>
        <Button variant="secondary">Edit Note</Button>
      </Link>
    </div>
  );
}
