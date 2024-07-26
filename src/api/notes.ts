import axios from 'axios';

const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
const baseURL = `http://localhost:${port}/notes`;

export const fetchNotes = async () => {
  return axios.get(baseURL);
};

export const fetchNoteById = async (id: string) => {
  return axios.get(`${baseURL}/${id}`);
};

export const createNote = async (note: { title: string; content: string }) => {
  return axios.post(baseURL, note);
};

export const updateNote = async (id: string, note: { title: string; content: string; updatedAt: string }) => {
  return axios.put(`${baseURL}/${id}`, note);
};

export const deleteNote = async (id: string) => {
  return axios.delete(`${baseURL}/${id}`);
};
