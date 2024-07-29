import { fetchNoteById } from '@/api/notes';
import styles from './NoteDetail.module.css';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { Button, Alert } from 'react-bootstrap';
import { Note } from '@/types/noteTypes';

interface NoteDetailProps {
  params: { id: string };
}

export default async function NoteDetail({ params }: NoteDetailProps) {
  const { id } = params;
  let note: Note | null = null;
  let error: string | null = null;

  try {
    const response = await fetchNoteById(id);
    note = response.data;
  } catch (err) {
    error = 'Failed to fetch note';
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!note) {
    return <p>Loading...</p>;
  }

  const isUpdated = new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime();

  return (
    <div className={styles.noteDetail}>
      <h1 title={note.title}>{note.title}</h1>
      <p>{note.content}</p>
      <div className={styles.date}>
        Created on: {formatDate(note.createdAt)}
      </div>
      {isUpdated && (
        <div className={styles.updatedDate}>
          Updated on: {formatDate(note.updatedAt)}
        </div>
      )}
      <div className={styles.buttons}>
        <Link href={`/edit/${note.id}`}>
          <Button variant="secondary">Edit Note</Button>
        </Link>
      </div>
    </div>
  );
}
