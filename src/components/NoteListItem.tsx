import Link from "next/link";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteNote as deleteNoteAction } from '@/store/notesSlice';
import { deleteNote } from '@/api/notes';
import { Note } from "@/types/noteTypes";
import styles from './NoteListItem.module.css';

interface NoteListItemProps {
  note: Note;
}

export default function NoteListItem({ note }: NoteListItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      dispatch(deleteNoteAction(id));
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete the note:", error);
    }
  };

  return (
    <div className={styles.note}>
      <Link className={styles.link} title={note.title} href={`/note/${note.id}`} passHref>
          <h3>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
      </Link>
      <span className={styles.footer}>
        <Button
          variant="danger"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className={styles.deleteButton}
        >
          Delete
        </Button>
      </span>

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
