import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Note {
  id: string;
  name: string;
  subject: string;
  room: string;
  lastModified: Date;
  fileType: string;
  size?: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeFilter, setActiveFilter] = useState("Subject");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Load notes from localStorage or set defaults
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed.map((note: any) => ({
        ...note,
        lastModified: new Date(note.lastModified)
      })));
    } else {
      // Default notes
      const defaultNotes: Note[] = [
        {
          id: "1",
          name: "Calculus Notes",
          subject: "Mathematics",
          room: "Room 101",
          lastModified: new Date("2024-01-15"),
          fileType: "PDF",
          size: "2.3 MB"
        },
        {
          id: "2", 
          name: "History Notes",
          subject: "History",
          room: "Room 202",
          lastModified: new Date("2024-02-20"),
          fileType: "DOCX",
          size: "1.8 MB"
        },
        {
          id: "3",
          name: "Physics Notes", 
          subject: "Physics",
          room: "Room 303",
          lastModified: new Date("2024-03-25"),
          fileType: "PDF",
          size: "3.1 MB"
        },
        {
          id: "4",
          name: "Chemistry Notes",
          subject: "Chemistry", 
          room: "Room 404",
          lastModified: new Date("2024-04-30"),
          fileType: "PDF",
          size: "2.7 MB"
        },
        {
          id: "5",
          name: "Biology Notes",
          subject: "Biology",
          room: "Room 505", 
          lastModified: new Date("2024-05-05"),
          fileType: "DOCX",
          size: "1.9 MB"
        }
      ];
      setNotes(defaultNotes);
      localStorage.setItem('userNotes', JSON.stringify(defaultNotes));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newNotes: Note[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      subject: "General", // Default subject
      room: "Personal", // Default room
      lastModified: new Date(),
      fileType: file.name.split('.').pop()?.toUpperCase() || "FILE",
      size: formatFileSize(file.size)
    }));

    const updatedNotes = [...notes, ...newNotes];
    setNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));

    // Clear the input so the same file can be uploaded again
    event.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredNotes = notes.filter(note => {
    if (!filterValue) return true;
    if (activeFilter === "Subject") return note.subject.toLowerCase().includes(filterValue.toLowerCase());
    if (activeFilter === "Room") return note.room.toLowerCase().includes(filterValue.toLowerCase()); 
    if (activeFilter === "File Type") return note.fileType.toLowerCase().includes(filterValue.toLowerCase());
    return note.name.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar searchPlaceholder="Search notes..." />

      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                + Upload Note
              </div>
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex space-x-2">
            {["Subject", "Room", "File Type"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "bg-primary" : ""}
              >
                {filter}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            ))}
          </div>
          <input
            type="text"
            placeholder={`Filter by ${activeFilter.toLowerCase()}...`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm w-64"
          />
        </div>

        {/* Notes Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Room</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Last Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map((note, index) => (
                  <tr key={note.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                          note.fileType === 'PDF' ? 'bg-red-100 text-red-700' :
                          note.fileType === 'DOCX' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {note.fileType}
                        </div>
                        <div>
                          <div className="font-medium">{note.name}</div>
                          {note.size && <div className="text-xs text-muted-foreground">{note.size}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {note.subject}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{note.room}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {note.lastModified.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              {filterValue ? `No notes match your filter "${filterValue}"` : "Upload your first note to get started."}
            </p>
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Upload Note
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
