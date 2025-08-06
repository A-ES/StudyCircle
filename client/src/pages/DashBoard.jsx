import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRooms, createRoom } from "../api/index";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await getRooms();
        setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms");
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
      setNewRoomName("");
      setNewRoomDescription("");
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Failed to create room");
    } finally {
      setCreatingRoom(false);
    }
  };

  if (loading) return <div className="p-6">Loading rooms...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="dashboard p-6 max-w-2xl mx-auto">
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
          {creatingRoom ? "Creating..." : "Create Room"}
        </button>
      </div>

      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        <div className="room-list space-y-4">
          {rooms.map((room) => {
            const isMember = room.members?.includes(user?.uid);

            return (
              <Link to={`/room/${room.id}`} key={room.id}>
                <div
                  className={`room-card border p-4 rounded shadow transition hover:shadow-md hover:bg-blue-50 ${
                    isMember ? "border-green-500 bg-green-50" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-gray-600">{room.description}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    👥 {room.members?.length || 0} members{" "}
                    · 💬 {room.messages?.length || 0} messages
                  </p>

                  {isMember && (
                    <p className="text-green-600 text-sm mt-1">
                      ✅ You’ve joined this room
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
