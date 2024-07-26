import Link from "next/link";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
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
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: string) => {
    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    await axios.delete(`http://localhost:${port}/notes/${id}`);
    dispatch(deleteNote(id));
    setShowModal(false);
  };

  const isUpdated = new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime();

  return (
    <div className={styles.note}>
      <Link href={`/note/${note.id}`} passHref>
        <h2 title={note.title}>{note.title}</h2>
      </Link>
      <p className={styles.content}>{note.content}</p>
      <div className={styles.footer}>
        <div className={styles.dates}>
          <span>Created on: {new Date(note.createdAt).toLocaleString()}</span>
          {isUpdated && (
            <span> (Updated on: {new Date(note.updatedAt).toLocaleString()})</span>
            )}
        </div>
        <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
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
          <Button variant="danger" onClick={() => handleDelete(note.id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
