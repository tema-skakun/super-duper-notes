"use client";

import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store';
import { setNotes } from '@/store/notesSlice';
import axios from 'axios';
import Link from 'next/link';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './globals.css';
import NoteListItem from "@/components/NoteListItem";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

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
    <Container>
      <Row className="mb-3">
        <Col>
          <Link href="/create" passHref>
            <Button variant="primary">Create Note</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {notes.map(note => (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3}>
            <NoteListItem note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
