"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';

interface NoteFormProps {
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
}

export default function NoteForm({ noteId, initialTitle = '', initialContent = '', onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const router = useRouter();

  useEffect(() => {
    if (noteId) {
      const fetchNote = async () => {
        const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
        try {
          const response = await axios.get(`http://localhost:${port}/notes/${noteId}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }
  }, [noteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }
    onSubmit(title, content);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Note
      </Button>
    </Form>
  );
}
