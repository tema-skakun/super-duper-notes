"use client";

import Link from "next/link";

export default function NoteListItem ({ note }) {
  return (
  <li>
    <Link href={`/note/${note.id}`} passHref>
      <h2>{note.title}</h2>
    </Link>
  </li>
  );
}

