"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchNoteById, deleteNote } from '@/api/notes';
import styles from './NoteDetail.module.css';

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
      <p>
        Created on: {new Date(note.createdAt).toLocaleString()}
        {isUpdated && (
          <span> (Updated on: {new Date(note.updatedAt).toLocaleString()})</span>
        )}
      </p>
      <div className={styles.buttons}>
        <Link href={`/edit/${note.id}`}>
          <Button variant="secondary">Edit Note</Button>
        </Link>
        <Button variant="danger" onClick={() => setShowModal(true)}>Delete Note</Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} autoFocus>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
