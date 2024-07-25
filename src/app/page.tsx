"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setNotes } from '@/store/notesSlice';
import axios from 'axios';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  useEffect(() => {
    const fetchNotes = async () => {
      const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
      const response = await axios.get(`http://localhost:${port}/notes`);
      dispatch(setNotes(response.data));
    };

    fetchNotes();
  }, [dispatch]);

  return (
    <main>
      <h1>Notes</h1>
      <Link href="/create">
        <Button variant="primary">Create Note</Button>
      </Link>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link href={`/note/${note.id}`}>
              <h2>{note.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
