import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface StudyRoom {
  id: string;
  name: string;
  subject: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
  imageUrl?: string;
}

export default function StudyRooms() {
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    // Load rooms from localStorage
    const savedRooms = localStorage.getItem('studyRooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      // Default rooms if none exist
      const defaultRooms: StudyRoom[] = [
        {
          id: "1",
          name: "Calculus Study Group",
          subject: "Math",
          description: "A collaborative space for calculus students to discuss problems, share resources, and prepare for exams.",
          memberCount: 12,
          isPublic: true
        },
        {
          id: "2", 
          name: "Physics Study Room",
          subject: "Science",
          description: "A community for physics enthusiasts to explore concepts, solve problems, and share insights.",
          memberCount: 28,
          isPublic: true
        },
        {
          id: "3",
          name: "World History Discussion", 
          subject: "History",
          description: "A forum for history students to discuss events, share perspectives, and analyze primary sources.",
          memberCount: 18,
          isPublic: true
        }
      ];
      setRooms(defaultRooms);
      localStorage.setItem('studyRooms', JSON.stringify(defaultRooms));
    }
  }, []);

  const tabs = ["All", "Joined", "Public", "Math", "Science", "History"];

  const filteredRooms = rooms.filter(room => {
    if (activeTab === "All") return true;
    if (activeTab === "Public") return room.isPublic;
    if (activeTab === "Joined") return false; // For demo purposes
    return room.subject.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar searchPlaceholder="Search rooms..." />

      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Study Rooms</h1>
            <p className="text-muted-foreground">
              Explore study rooms to collaborate with peers and enhance your learning experience.
            </p>
          </div>
          <Link to="/create-room">
            <Button className="bg-primary hover:bg-primary/90">
              + Create Room
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-primary text-4xl font-bold">
                  {room.name.charAt(0)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                    {room.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    👥 {room.memberCount} Members
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {room.description}
                </p>
                <Link to={`/room/${room.id}`}>
                  <Button className="w-full" variant="outline">
                    Join
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No rooms found for "{activeTab}"</div>
            <Link to="/create-room">
              <Button variant="outline">Create the first room</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
