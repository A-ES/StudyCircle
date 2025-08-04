import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getRooms = () => API.get('/rooms');
export const createRoom = (name, description) => API.post('/rooms', { name: name.trim(), description: description.trim() });
export const sendMessageToAI = (message) => API.post('/ai/message', { message });
