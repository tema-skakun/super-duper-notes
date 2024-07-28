import Link from "next/link";
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

export default function NoteListItem({note}: NoteListItemProps) {

  return (
    <Link href={`/note/${note.id}`} passHref>
      <div className={styles.note}>
        <h2 title={note.title}>{note.title}</h2>
        <p className={styles.content}>{note.content}</p>
      </div>
    </Link>

  );
}
