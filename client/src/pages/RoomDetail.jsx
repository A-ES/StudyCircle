// RoomDetail.jsx - full dark mode layout with sidebar and Gemini AI chat

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AITutorSidebar from "../components/AITutorSidebar";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/rooms/${id}`)
      .then((res) => setRoom(res.data.room))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [id]);

  const joinRoom = async () => {
    if (!user?.uid) {
      console.error("User UID not found in localStorage");
      return;
    }
  
    try {
      console.log("Joining with UID:", user.uid);
  
      await axios.post(`http://localhost:8000/api/rooms/${id}/join`, {
        uid: user.uid,
      });
  
      setJoined(true);
    } catch (err) {
      console.error("Join error:", err.response?.data || err.message);
    }
  };
  

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (!room) return <div className="text-red-400 p-4">Room not found</div>;

  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <p className="text-gray-300 mb-4">{room.description}</p>

          {!joined ? (
            <button
              onClick={joinRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Join Room
            </button>
          ) : (
            <p className="text-green-400">✅ You've joined this room!</p>
          )}
        </div>

        {joined && <AITutorSidebar userId={user?.uid} roomId={id} />}
      </main>
    </div>
  );
}
