import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-bold">✱</span>
          </div>
          <span className="text-xl font-semibold">StudyCircle AI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link>
          <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</Link>
          <Link to="/testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/signup">
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock Your Academic<br />
            Potential with <span className="text-primary">StudyCircle AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your AI-powered study companion for personalized learning and academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground text-lg">
              StudyCircle AI offers a suite of tools designed to enhance your learning experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Study Assistant</h3>
              <p className="text-muted-foreground">
                Ask anything. Get instant answers, summaries, or quizzes.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Rooms</h3>
              <p className="text-muted-foreground">
                Collaborate with peers, share resources, and track group progress.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Dashboard</h3>
              <p className="text-muted-foreground">
                Visualize your learning. Stay consistent with goals and streaks.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flashcards & Notes</h3>
              <p className="text-muted-foreground">
                Create, review, and share flashcards and notes with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Get started in three simple steps.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sign Up & Set Your Goals</h3>
                <p className="text-muted-foreground">
                  Create your account and define your academic objectives.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Engage with AI-Powered Tools</h3>
                <p className="text-muted-foreground">
                  Utilize our AI features for personalized study assistance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track Your Progress & Improve</h3>
                <p className="text-muted-foreground">
                  Monitor your performance and refine your learning strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                "StudyCircle AI has transformed my study habits and helped me achieve better grades."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="font-semibold">Sarah, University Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                "The AI-powered tools are incredibly helpful for tracking challenging assignments."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="font-semibold">Mark, High School Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                "I love the personalized learning paths that adapt to my pace and needs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="font-semibold">Emily, College Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-bold">✱</span>
              </div>
              <span className="text-xl font-semibold">StudyCircle AI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About Us</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-6">
            © 2024 StudyCircle AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
