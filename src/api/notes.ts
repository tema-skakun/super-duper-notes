import apiClient from './apiClient';

export const fetchNotes = async () => {
  return apiClient.get('notes');
};

export const fetchNoteById = async (id: string) => {
  return apiClient.get(`notes/${id}`);
};

export const createNote = async (note: { title: string; content: string }) => {
  return apiClient.post('notes', note);
};

export const updateNote = async (id: string, note: { title: string; content: string; createdAt: string; updatedAt: string }) => {
  return apiClient.put(`notes/${id}`, note);
};

export const deleteNote = async (id: string) => {
  return apiClient.delete(`notes/${id}`);
};
