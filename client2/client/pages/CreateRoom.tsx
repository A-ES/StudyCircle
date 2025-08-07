import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    isPublic: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.subject.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    // Get existing rooms from localStorage
    const existingRooms = JSON.parse(localStorage.getItem('studyRooms') || '[]');
    
    // Create new room
    const newRoom = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      memberCount: 1,
      isPublic: formData.isPublic
    };

    // Add to existing rooms
    const updatedRooms = [...existingRooms, newRoom];
    localStorage.setItem('studyRooms', JSON.stringify(updatedRooms));

    // Navigate to study rooms page
    navigate('/study-rooms');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">✱</span>
            </div>
            <span className="text-xl font-semibold">StudyCircle AI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/study-rooms" className="text-muted-foreground hover:text-foreground">Explore</Link>
            <Link to="/my-rooms" className="text-muted-foreground hover:text-foreground">My Rooms</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <div className="w-5 h-5 bg-muted-foreground rounded"></div>
          </Button>
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a New Study Room</h1>
          <p className="text-muted-foreground">
            Organize your learning by creating a dedicated space for your studies.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Room Name</label>
            <input
              type="text"
              placeholder="e.g., Quantum Physics Crew"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="e.g., Physics"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="A brief description of what this room is about..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium mb-3">Visibility</label>
            <p className="text-sm text-muted-foreground mb-4">Choose who can find and join your study room.</p>
            
            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-4 border border-primary rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={formData.isPublic}
                  onChange={() => setFormData({...formData, isPublic: true})}
                  className="mt-1 text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-medium">Public</div>
                  <div className="text-sm text-muted-foreground">Anyone can find and join this room.</div>
                </div>
              </label>
              
              <label className="flex items-start space-x-3 p-4 border border-border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={!formData.isPublic}
                  onChange={() => setFormData({...formData, isPublic: false})}
                  className="mt-1 text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-medium">Private</div>
                  <div className="text-sm text-muted-foreground">Only people you invite will be able to join.</div>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-6">
            <Link to="/study-rooms" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
