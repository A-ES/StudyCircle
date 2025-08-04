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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await getRooms();
        setRooms(Array.isArray(response.data) ? response.data : []);
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
      setRooms((prevRooms) => [...prevRooms, response.data.room]);

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
    <div className="dashboard">
      <h1>Study Rooms</h1>
      <div className="create-room">
        <input
          type="text"
          placeholder="Enter room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          disabled={creatingRoom}
        />
        <textarea
          placeholder="Enter room description"
          value={newRoomDescription}
          onChange={(e) => setNewRoomDescription(e.target.value)}
          disabled={creatingRoom}
        />
        <button onClick={handleCreateRoom} disabled={creatingRoom}>
          {creatingRoom ? 'Creating...' : 'Create Room'}
        </button>
      </div>
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
