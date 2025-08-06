// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getRooms, createRoom } from '../api/index';
import CreateRoomForm from '../components/CreateRoomForm';
import RoomList from '../components/RoomList';

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
        setError(null);
        const response = await getRooms();
<<<<<<< HEAD
        setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);

        console.log("API response:", response);

=======

        // ✅ Fix: extract rooms from response.data.rooms
        setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);
>>>>>>> fbef61b66ac6ed2612390bad5bc2c8a382094e8b
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim() || !newRoomDescription.trim()) return;
<<<<<<< HEAD
    if (rooms.some((room) => room.name === newRoomName.trim())) {
      setError('Room with this name already exists');
      return;
    }
=======

>>>>>>> fbef61b66ac6ed2612390bad5bc2c8a382094e8b
    try {
      setCreatingRoom(true);

      const response = await createRoom(newRoomName, newRoomDescription);

      // Add new room to local state
      setRooms((prevRooms) => [...prevRooms, response.data.room]);
<<<<<<< HEAD
=======

      // Reset form fields
>>>>>>> fbef61b66ac6ed2612390bad5bc2c8a382094e8b
      setNewRoomName('');
      setNewRoomDescription('');
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room');
    } finally {
      setCreatingRoom(false);
    }
  };

  if (loading) return <div className="p-6">Loading rooms...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
<<<<<<< HEAD
    <div className="dashboard p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Study Rooms</h1>
      <CreateRoomForm
        newRoomName={newRoomName}
        newRoomDescription={newRoomDescription}
        onNameChange={(e) => setNewRoomName(e.target.value)}
        onDescriptionChange={(e) => setNewRoomDescription(e.target.value)}
        onCreate={handleCreateRoom}
        creatingRoom={creatingRoom}
      />
      <RoomList rooms={rooms} />
=======
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
>>>>>>> fbef61b66ac6ed2612390bad5bc2c8a382094e8b
    </div>
  );
};

export default Dashboard;
