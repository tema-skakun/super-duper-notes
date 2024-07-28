"use client";

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchNotesData } from '@/utils/fetchNotes';
import { InputGroup, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap';
import NoteListItem from "@/components/NoteListItem";
import '../globals.css';

const SORT_OPTIONS = ['Title', 'Created At'] as const;
type SortOption = typeof SORT_OPTIONS[number];

export default function Search() {
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
        } else if (sort === 'createdAt') {
          return new Date(a[sort]).getTime() - new Date(b[sort]).getTime();
        }
        return 0;
      });
  }, [notes, filter, sort]);

  useEffect(() => {
    fetchNotesData(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search by title"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Sort by: {sort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {SORT_OPTIONS.map(option => (
                  <Dropdown.Item key={option} onClick={() => setSort(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
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
