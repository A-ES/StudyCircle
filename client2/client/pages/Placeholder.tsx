import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
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
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/study-rooms" className="text-muted-foreground hover:text-foreground">Study Rooms</Link>
            <Link to="/ai-chat" className="text-muted-foreground hover:text-foreground">AI Chat</Link>
            <Link to="/notes" className="text-muted-foreground hover:text-foreground">Notes</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-6">{description}</p>
          <p className="text-sm text-muted-foreground mb-4">
            This page is coming soon! Continue prompting to help us build out this feature.
          </p>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
