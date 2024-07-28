import Link from "next/link";
import styles from './NoteListItem.module.css';
import {Note} from '@/types/noteTypes';

interface NoteListItemProps {
  note: Note;
}

export default function NoteListItem({note}: NoteListItemProps) {
  return (
    <Link href={`/note/${note.id}`}>
      <div className={styles.note}>
        <h2 title={note.title}>{note.title}</h2>
        <p className={styles.content}>{note.content}</p>
      </div>
    </Link>
  );
}
