// src/components/RoomList.jsx
import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms }) => {
  if (rooms.length === 0) {
    return <p>No rooms available</p>;
  }

  return (
    <div className="room-list grid gap-4 mt-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
