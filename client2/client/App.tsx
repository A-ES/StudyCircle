import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import StudyRooms from "./pages/StudyRooms";
import CreateRoom from "./pages/CreateRoom";
import StudyRoom from "./pages/StudyRoom";
import AIChat from "./pages/AIChat";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study-rooms" element={<StudyRooms />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room/:id" element={<StudyRoom />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

        {/* Placeholder routes */}
        <Route path="/resources" element={<Placeholder title="Resources" description="Access study materials and resources." />} />
        <Route path="/community" element={<Placeholder title="Community" description="Connect with fellow students." />} />
        <Route path="/my-rooms" element={<Placeholder title="My Rooms" description="View rooms you've created or joined." />} />
        <Route path="/profile" element={<Placeholder title="Profile" description="Manage your account settings." />} />
        <Route path="/forgot-password" element={<Placeholder title="Forgot Password" description="Reset your password." />} />
        
        {/* Footer links */}
        <Route path="/features" element={<Placeholder title="Features" description="Discover all the powerful features of StudyCircle AI." />} />
        <Route path="/how-it-works" element={<Placeholder title="How It Works" description="Learn how StudyCircle AI can help you succeed." />} />
        <Route path="/testimonials" element={<Placeholder title="Testimonials" description="See what our users are saying." />} />
        <Route path="/about" element={<Placeholder title="About Us" description="Learn more about StudyCircle AI." />} />
        <Route path="/contact" element={<Placeholder title="Contact" description="Get in touch with our team." />} />
        <Route path="/privacy" element={<Placeholder title="Privacy Policy" description="Our commitment to your privacy." />} />
        <Route path="/terms" element={<Placeholder title="Terms of Service" description="Terms and conditions for using our service." />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
