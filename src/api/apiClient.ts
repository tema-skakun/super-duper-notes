import axios from 'axios';

const port = process.env.NEXT_PUBLIC_JSON_SERVER_PORT;
const apiClient = axios.create({
  baseURL: `http://localhost:${port}/`,
});

export default apiClient;
