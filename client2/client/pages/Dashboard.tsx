import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  subject?: string;
}

interface VisitedRoom {
  id: string;
  name: string;
  lastVisited: Date;
  unreadCount?: number;
}

export default function Dashboard() {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [recentRooms, setRecentRooms] = useState<VisitedRoom[]>([]);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('globalTasks');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      const tasks = parsed.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate)
      })).filter((task: Task) => !task.completed)
        .sort((a: Task, b: Task) => a.dueDate.getTime() - b.dueDate.getTime())
        .slice(0, 3); // Show only 3 upcoming tasks
      setUpcomingTasks(tasks);
    }

    // Load recently visited rooms
    const visitedRooms = localStorage.getItem('visitedRooms');
    if (visitedRooms) {
      const parsed = JSON.parse(visitedRooms);
      const rooms = parsed.map((room: any) => ({
        ...room,
        lastVisited: new Date(room.lastVisited)
      })).sort((a: VisitedRoom, b: VisitedRoom) => b.lastVisited.getTime() - a.lastVisited.getTime())
        .slice(0, 3); // Show only 3 recent rooms
      setRecentRooms(rooms);
    }
  }, []);

  const getPriorityColor = (priority: Task['priority']) => {
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

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar searchPlaceholder="Search anything..." />

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
              <p className="text-muted-foreground">Ready to conquer your studies today?</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/ai-chat" className="bg-card border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI Chat</h3>
                    <p className="text-sm text-muted-foreground">Get instant help</p>
                  </div>
                </div>
              </Link>

              <Link to="/study-rooms" className="bg-card border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Study Rooms</h3>
                    <p className="text-sm text-muted-foreground">Collaborate with peers</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
                <Link to="/tasks">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              
              {upcomingTasks.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <Link key={task.id} to={`/tasks#${task.id}`}>
                      <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer">
                        <div className={`w-1 h-12 ${getPriorityColor(task.priority)} rounded-full`}></div>
                        <div className="flex-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">{getDaysUntilDue(task.dueDate)}</span>
                            {task.subject && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {task.subject}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">⋯</Button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">No upcoming tasks</p>
                  <Link to="/tasks">
                    <Button variant="outline" size="sm">Create Task</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Progress Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Study Hours</span>
                    <span>0h / 60h</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tasks Completed</span>
                    <span>0 / 0</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Days</span>
                    <span>0 / 30</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Visited Rooms */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recently Visited Rooms</h2>
              
              {recentRooms.length > 0 ? (
                <div className="space-y-3">
                  {recentRooms.map((room) => (
                    <Link key={room.id} to={`/room/${room.id}`}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-medium">
                          {room.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{room.name}</p>
                          <p className="text-xs text-muted-foreground">{getTimeAgo(room.lastVisited)}</p>
                        </div>
                        {room.unreadCount && room.unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">No recent rooms</p>
                  <Link to="/study-rooms">
                    <Button variant="outline" size="sm">Explore Rooms</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
