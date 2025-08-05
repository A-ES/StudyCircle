// src/components/CreateRoomForm.jsx
import React from 'react';

const CreateRoomForm = ({
  newRoomName,
  newRoomDescription,
  onNameChange,
  onDescriptionChange,
  onCreate,
  creatingRoom
}) => {
  return (
    <div className="create-room mb-6">
      <input
        type="text"
        placeholder="Enter room name"
        value={newRoomName}
        onChange={onNameChange}
        disabled={creatingRoom}
        className="border rounded px-3 py-2 mb-2 w-full"
      />
      <textarea
        placeholder="Enter room description"
        value={newRoomDescription}
        onChange={onDescriptionChange}
        disabled={creatingRoom}
        className="border rounded px-3 py-2 mb-2 w-full"
      />
      <button
        onClick={onCreate}
        disabled={creatingRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {creatingRoom ? 'Creating...' : 'Create Room'}
      </button>
    </div>
  );
};

export default CreateRoomForm;
