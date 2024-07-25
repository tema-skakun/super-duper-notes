// src/app/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';

export default function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
        try {
          const response = await axios.get(`http://localhost:${port}/notes/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    await axios.put(`http://localhost:${port}/notes/${id}`, {
      title,
      content,
      updatedAt: new Date().toISOString()
    });
    router.push('/');
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
