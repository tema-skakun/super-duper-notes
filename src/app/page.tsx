"use client";

import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setNotes } from '@/store/notesSlice';
import axios from 'axios';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<'title' | 'createdAt' | 'updatedAt'>('title'); // Возможности сортировки

  const filteredNotes = notes
    .filter(note => note.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sort === 'createdAt' || sort === 'updatedAt') {
        return new Date(a[sort]).getTime() - new Date(b[sort]).getTime();
      }
      return 0;
    });

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
      <input
        type="text"
        placeholder="Filter notes"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select onChange={(e) => setSort(e.target.value as 'title' | 'createdAt' | 'updatedAt')} value={sort}>
        <option value="title">Title</option>
        <option value="createdAt">Date Created</option>
        <option value="updatedAt">Date Updated</option>
      </select>
      <Link href="/create">
        <Button variant="primary">Create Note</Button>
      </Link>
      <ul>
        {filteredNotes.map(note => (
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
