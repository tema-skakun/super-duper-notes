"use client";

import Link from "next/link";
import { Button } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteNote } from '@/store/notesSlice';
import styles from './NoteListItem.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteListItemProps {
  note: Note;
}

export default function NoteListItem({ note }: NoteListItemProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    await axios.delete(`http://localhost:${port}/notes/${id}`);
    dispatch(deleteNote(id));
  };

  return (
    <li className={styles.note}>
      <Link href={`/note/${note.id}`} passHref>
        <h2>{note.title}</h2>
      </Link>
      <Button variant="danger" onClick={() => handleDelete(note.id)}>Delete</Button>
    </li>
  );
}
