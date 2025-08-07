import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

interface StudyRoom {
  id: string;
  name: string;
  subject: string;
  description: string;
  createdBy: string;
  memberCount: number;
}

interface RoomTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  assignedTo: string;
}

interface RoomNote {
  id: string;
  title: string;
  content: string;
  uploadedBy: string;
  uploadedAt: Date;
  fileType: string;
}

interface RoomFile {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: Date;
  fileType: string;
  size: string;
}

export default function StudyRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [activeTab, setActiveTab] = useState("Chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<RoomTask[]>([]);
  const [notes, setNotes] = useState<RoomNote[]>([]);
  const [files, setFiles] = useState<RoomFile[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  
  // Task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium" as RoomTask['priority']
  });

  // Note form states  
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    if (!id) return;

    // Load room data
    const savedRooms = JSON.parse(localStorage.getItem('studyRooms') || '[]');
    const foundRoom = savedRooms.find((r: StudyRoom) => r.id === id);

    if (foundRoom) {
      setRoom(foundRoom);

      // Track room visit
      const visitedRooms = JSON.parse(localStorage.getItem('visitedRooms') || '[]');
      const existingVisit = visitedRooms.findIndex((visit: any) => visit.id === id);

      if (existingVisit >= 0) {
        visitedRooms[existingVisit].lastVisited = new Date().toISOString();
      } else {
        visitedRooms.push({
          id: foundRoom.id,
          name: foundRoom.name,
          lastVisited: new Date().toISOString(),
          unreadCount: 0
        });
      }

      localStorage.setItem('visitedRooms', JSON.stringify(visitedRooms));

      // Load room-specific data from localStorage
      const roomData = JSON.parse(localStorage.getItem(`room_${id}`) || '{}');

      setMessages(roomData.messages?.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) || []);

      setTasks(roomData.tasks?.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate)
      })) || []);

      setNotes(roomData.notes?.map((note: any) => ({
        ...note,
        uploadedAt: new Date(note.uploadedAt)
      })) || []);

      setFiles(roomData.files?.map((file: any) => ({
        ...file,
        uploadedAt: new Date(file.uploadedAt)
      })) || []);
    }
  }, [id]);

  const saveRoomData = () => {
    if (!id) return;
    const roomData = {
      messages,
      tasks,
      notes,
      files
    };
    localStorage.setItem(`room_${id}`, JSON.stringify(roomData));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: inputMessage.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    
    // Save to localStorage
    setTimeout(saveRoomData, 100);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    const newTask: RoomTask = {
      id: Date.now().toString(),
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: new Date(taskForm.dueDate),
      priority: taskForm.priority,
      completed: false,
      assignedTo: "You"
    };

    setTasks(prev => [...prev, newTask]);
    setTaskForm({ title: "", description: "", dueDate: "", priority: "medium" });
    setShowTaskForm(false);
    saveRoomData();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim()) return;

    const newNote: RoomNote = {
      id: Date.now().toString(),
      title: noteForm.title.trim(),
      content: noteForm.content.trim(),
      uploadedBy: "You",
      uploadedAt: new Date(),
      fileType: "TEXT"
    };

    setNotes(prev => [...prev, newNote]);
    setNoteForm({ title: "", content: "" });
    setShowNoteForm(false);
    saveRoomData();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const newFiles: RoomFile[] = Array.from(uploadedFiles).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      uploadedBy: "You",
      uploadedAt: new Date(),
      fileType: file.name.split('.').pop()?.toUpperCase() || "FILE",
      size: formatFileSize(file.size)
    }));

    setFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      // Save after state update
      setTimeout(() => {
        const roomData = {
          messages,
          tasks,
          notes,
          files: updatedFiles
        };
        if (id) {
          localStorage.setItem(`room_${id}`, JSON.stringify(roomData));
        }
      }, 100);
      return updatedFiles;
    });

    // Clear the input
    event.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    saveRoomData();
  };

  const getPriorityColor = (priority: RoomTask['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Room not found</h1>
          <Link to="/study-rooms">
            <Button variant="outline">Back to Study Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar searchPlaceholder="Search in room..." />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Room Header */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{room?.name || 'Loading...'}</h1>
                <p className="text-sm text-muted-foreground">Created by {room?.createdBy || 'Unknown'}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-border">
            <div className="flex space-x-8">
              {["Chat", "Threads", "Notes", "Tasks", "Files"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Chat Tab */}
            {activeTab === "Chat" && (
              <div className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Start the conversation</h3>
                        <p className="text-muted-foreground">Be the first to send a message in this study room!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t border-border p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button variant="ghost" size="icon" type="button">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 px-6"
                      disabled={!inputMessage.trim()}
                    >
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === "Tasks" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Room Tasks</h2>
                  <Button 
                    onClick={() => setShowTaskForm(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    + Add Task
                  </Button>
                </div>

                {showTaskForm && (
                  <div className="bg-card border border-border rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-4">Add New Task</h3>
                    <form onSubmit={handleAddTask} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Task Title</label>
                        <input
                          type="text"
                          value={taskForm.title}
                          onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          value={taskForm.description}
                          onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Due Date</label>
                          <input
                            type="date"
                            value={taskForm.dueDate}
                            onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Priority</label>
                          <select
                            value={taskForm.priority}
                            onChange={(e) => setTaskForm({...taskForm, priority: e.target.value as RoomTask['priority']})}
                            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-primary hover:bg-primary/90">Add Task</Button>
                        <Button type="button" variant="outline" onClick={() => setShowTaskForm(false)}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskComplete(task.id)}
                          className="mt-1"
                        />
                        <div className={`w-1 h-16 ${getPriorityColor(task.priority)} rounded-full`}></div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>{getDaysUntilDue(task.dueDate)}</span>
                            <span className="capitalize">{task.priority} priority</span>
                            <span>Assigned to {task.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                      <p className="text-muted-foreground">Create the first task for this study room.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "Notes" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Room Notes</h2>
                  <Button 
                    onClick={() => setShowNoteForm(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    + Add Note
                  </Button>
                </div>

                {showNoteForm && (
                  <div className="bg-card border border-border rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-4">Add New Note</h3>
                    <form onSubmit={handleAddNote} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Note Title</label>
                        <input
                          type="text"
                          value={noteForm.title}
                          onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <textarea
                          value={noteForm.content}
                          onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                          rows={6}
                          placeholder="Write your note content here..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-primary hover:bg-primary/90">Add Note</Button>
                        <Button type="button" variant="outline" onClick={() => setShowNoteForm(false)}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{note.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{note.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>By {note.uploadedBy}</span>
                        <span>{note.uploadedAt.toLocaleDateString()}</span>
                        <span>{note.fileType}</span>
                      </div>
                    </div>
                  ))}
                  
                  {notes.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
                      <p className="text-muted-foreground">Create the first note for this study room.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === "Files" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Room Files</h2>
                  <div>
                    <input
                      type="file"
                      id="room-file-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="room-file-upload" className="cursor-pointer">
                      <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        + Upload File
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  {files.map((file) => (
                    <div key={file.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded flex items-center justify-center text-xs font-medium ${
                          file.fileType === 'PDF' ? 'bg-red-100 text-red-700' :
                          file.fileType === 'DOCX' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {file.fileType}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{file.name}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>Uploaded by {file.uploadedBy}</span>
                            <span>{file.uploadedAt.toLocaleDateString()}</span>
                            <span>{file.size}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                  
                  {files.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No files yet</h3>
                      <p className="text-muted-foreground">Upload the first file to this study room.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Threads Tab */}
            {activeTab === "Threads" && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Threads Coming Soon</h3>
                  <p className="text-muted-foreground">Organize conversations into threaded discussions.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border p-6 space-y-6">
          {/* Room Members */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Members ({room?.memberCount || 0})</h3>
            <div className="space-y-3">
              {/* Room Creator */}
              {room?.createdBy && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                    {room.createdBy.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{room.createdBy}</p>
                    <p className="text-xs text-muted-foreground">Room Creator</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Online"></div>
                </div>
              )}

              {/* Current User */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs font-medium">
                  Y
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">You</p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Online"></div>
              </div>

              {/* Other Members */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                  DC
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">David Chen</p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Online"></div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                  EC
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Emily Carter</p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Away"></div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                  MD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Michael Davis</p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
                <div className="w-2 h-2 bg-gray-500 rounded-full" title="Offline"></div>
              </div>
            </div>

            {/* Invite Button */}
            <Button variant="outline" className="w-full mt-4 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Invite Members
            </Button>
          </div>

          {/* Room Actions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Room Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("Notes");
                  setShowNoteForm(true);
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Upload Notes
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("Tasks");
                  setShowTaskForm(true);
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Task
              </Button>
              <Link to="/study-rooms">
                <Button variant="destructive" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Leave Room
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
