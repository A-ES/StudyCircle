import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  createdAt: Date;
  subject?: string;
  attachments?: File[];
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium" as Task['priority'],
    subject: ""
  });

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('globalTasks');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      setTasks(parsed.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt)
      })));
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('globalTasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: new Date(taskForm.dueDate),
      priority: taskForm.priority,
      completed: false,
      createdAt: new Date(),
      subject: taskForm.subject.trim() || "General"
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setTaskForm({ title: "", description: "", dueDate: "", priority: "medium", subject: "" });
    setShowTaskForm(false);
  };

  const toggleTaskComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Save uploaded files to localStorage for this session
    const uploadedFiles = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));

    const existingFiles = JSON.parse(localStorage.getItem('taskFiles') || '[]');
    const allFiles = [...existingFiles, ...uploadedFiles];
    localStorage.setItem('taskFiles', JSON.stringify(allFiles));

    // Clear the input
    event.target.value = '';

    // Show success message
    alert(`Successfully uploaded ${files.length} file(s)`);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Completed tasks go to bottom
    }
    return a.dueDate.getTime() - b.dueDate.getTime(); // Sort by due date
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar searchPlaceholder="Search tasks..." />

      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Tasks</h1>
            <p className="text-muted-foreground">
              Manage all your tasks and deadlines in one place.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="task-file-upload"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="task-file-upload" className="cursor-pointer">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Upload Files
              </div>
            </label>
            <Button 
              onClick={() => setShowTaskForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              + New Task
            </Button>
          </div>
        </div>

        {/* Task Form */}
        {showTaskForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Task Title *</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={taskForm.subject}
                    onChange={(e) => setTaskForm({...taskForm, subject: e.target.value})}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Mathematics, Physics"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Describe the task details..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({...taskForm, priority: e.target.value as Task['priority']})}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Create Task
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <div 
              key={task.id} 
              className={`bg-card border border-border rounded-lg p-4 transition-opacity ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskComplete(task.id)}
                  className="mt-1"
                />
                <div className={`w-1 h-16 ${getPriorityColor(task.priority)} rounded-full`}></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h3>
                      {task.subject && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {task.subject}
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      Delete
                    </Button>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className={`font-medium ${
                      task.dueDate < new Date() && !task.completed ? 'text-red-500' : ''
                    }`}>
                      {getDaysUntilDue(task.dueDate)}
                    </span>
                    <span className="capitalize">{task.priority} priority</span>
                    <span>Created {task.createdAt.toLocaleDateString()}</span>
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
              <p className="text-muted-foreground mb-4">Create your first task to get started with task management.</p>
              <Button 
                onClick={() => setShowTaskForm(true)}
                variant="outline"
              >
                Create First Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
