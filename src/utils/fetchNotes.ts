import { setNotes } from '@/store/notesSlice';
import axios from 'axios';

export const fetchNotesData = async (dispatch: any) => {
  try {
    const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
    const response = await axios.get(`http://localhost:${port}/notes`);
    dispatch(setNotes(response.data));
  } catch (error) {
    console.error('Failed to fetch notes:', error);
  }
};
