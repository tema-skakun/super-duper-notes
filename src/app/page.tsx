"use client";

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setNotes } from '@/store/notesSlice';
import axios from 'axios';
import Link from 'next/link';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import NoteListItem from "@/components/NoteListItem";
import './globals.css';

const SORT_OPTIONS = ['title', 'createdAt', 'updatedAt'] as const;
type SortOption = typeof SORT_OPTIONS[number];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<SortOption>('title');

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => note.title.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sort === 'createdAt' || sort === 'updatedAt') {
          return new Date(a[sort]).getTime() - new Date(b[sort]).getTime();
        }
        return 0;
      });
  }, [notes, filter, sort]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
        const response = await axios.get(`http://localhost:${port}/notes`);
        dispatch(setNotes(response.data));
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);

  return (
    <main className="p-4">
      <h1>Notes</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Filter notes"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            Sort by {sort.charAt(0).toUpperCase() + sort.slice(1)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {SORT_OPTIONS.map(option => (
              <Dropdown.Item
                key={option}
                onClick={() => setSort(option)}
                active={sort === option}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
      <Link href="/create" passHref>
        <Button variant="primary" className="mb-3">Create Note</Button>
      </Link>
      <ul>
        {filteredNotes.map(note => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
    </main>
  );
}
