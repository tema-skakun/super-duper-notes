"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchNoteById, deleteNote } from '@/api/notes';
import styles from './NoteDetail.module.css';
import { Note } from '@/types/noteTypes';
import { formatDate } from '@/utils/formatDate';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
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
        <Button variant="danger" onClick={() => setShowModal(true)}>Delete Note</Button>
      </div>

      <ConfirmDeleteModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
