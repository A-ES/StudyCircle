// src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// GET /rooms
export const getRooms = () => API.get('/rooms');

// POST /rooms
export const createRoom = (name, description) =>
  API.post('/rooms', { name, description });
