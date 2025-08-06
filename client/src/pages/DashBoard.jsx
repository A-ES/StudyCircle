// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getRooms, createRoom } from '../api/index';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [creatingRoom, setCreatingRoom] = useState(false);

  // Fetch rooms when component loads
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await getRooms();

        // ✅ Fix: extract rooms from response.data.rooms
        setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms');
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim() || !newRoomDescription.trim()) return;

    try {
      setCreatingRoom(true);

      const response = await createRoom(newRoomName, newRoomDescription);

      // Add new room to local state
      setRooms((prevRooms) => [...prevRooms, response.data.room]);

      // Reset form fields
      setNewRoomName('');
      setNewRoomDescription('');
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room');
    } finally {
      setCreatingRoom(false);
    }
  };

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Study Rooms</h1>

      <div className="create-room mb-6">
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          type="text"
          placeholder="Enter room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          disabled={creatingRoom}
        />

        <textarea
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="Enter room description"
          value={newRoomDescription}
          onChange={(e) => setNewRoomDescription(e.target.value)}
          disabled={creatingRoom}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleCreateRoom}
          disabled={creatingRoom}
        >
          {creatingRoom ? 'Creating...' : 'Create Room'}
        </button>
      </div>

      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        <div className="room-list space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="room-card border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
