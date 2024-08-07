"use client";

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setNotes } from '@/store/notesSlice';
import Link from 'next/link';
import { Button, InputGroup, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap';
import NoteListItem from "@/components/NoteListItem";
import { fetchNotes } from "@/api/notes";
import Loader from '@/components/Loader';
import './globals.css';

const SORT_OPTIONS = ['title', 'createdAt'] as const;
type SortOption = typeof SORT_OPTIONS[number];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<SortOption>('title');
  const [loading, setLoading] = useState(true);

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => note.title.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sort === 'createdAt') {
          return new Date(a[sort]).getTime() - new Date(b[sort]).getTime();
        }
        return 0;
      });
  }, [notes, filter, sort]);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const response = await fetchNotes();
        dispatch(setNotes(response.data));
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotesData();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InputGroup>
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
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Link href="/create" passHref>
            <Button variant="primary">Create Note</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {filteredNotes.map(note => (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3}>
            <NoteListItem note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
