import { fetchNotes } from '@/api/notes';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NoteListItem from "@/components/NoteListItem";
import './globals.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let notes = [];
  try {
    const response = await fetchNotes();
    notes = response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
  }

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
        {notes.map((note) => (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3}>
            <NoteListItem note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
