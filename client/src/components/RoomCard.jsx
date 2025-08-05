// src/components/RoomCard.jsx
import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="room-card border rounded p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{room.name}</h3>
      <p className="text-gray-600">{room.description}</p>
    </div>
  );
};

export default RoomCard;
