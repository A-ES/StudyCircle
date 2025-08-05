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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getRooms();
        setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);

        console.log("API response:", response);

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
    if (rooms.some((room) => room.name === newRoomName.trim())) {
      setError('Room with this name already exists');
      return;
    }
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

  if (loading) return <div className="p-6">Loading rooms...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
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
    </div>
  );
};

export default Dashboard;
