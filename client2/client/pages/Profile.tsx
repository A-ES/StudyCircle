import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    username: "alex.johnson",
    email: "alex.johnson@email.com",
    about: "A brief description about yourself",
    avatar: ""
  });

  const [settings, setSettings] = useState({
    emailNotifications: {
      newComments: true,
      deckReminders: true,
      roomInvites: true
    },
    pushNotifications: {
      everything: false,
      sameAsEmail: true,
      noPush: false
    }
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic here
    alert("Profile saved successfully!");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    alert("Settings saved successfully!");
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
            <Link to="/notes" className="text-muted-foreground hover:text-foreground">Notes</Link>
            <Link to="/study-rooms" className="text-muted-foreground hover:text-foreground">Decks</Link>
            <Link to="/study-rooms" className="text-muted-foreground hover:text-foreground">Rooms</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-muted border border-border rounded-lg px-4 py-2 w-64 text-sm"
            />
          </div>
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-6">
          <h2 className="text-xl font-bold mb-6">Profile & Settings</h2>
          <p className="text-sm text-muted-foreground mb-6">Manage your profile information and application settings.</p>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("Profile")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === "Profile" 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab("Account")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === "Account" 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Account</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab("Notifications")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === "Notifications" 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM7 7h3V4a1 1 0 011-1h2a1 1 0 011 1v3h3a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V8a1 1 0 011-1z" />
                </svg>
                <span>Notifications</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Profile Tab */}
          {activeTab === "Profile" && (
            <div className="max-w-2xl">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Public Profile</h3>
                <p className="text-sm text-muted-foreground mb-6">This information will be displayed publicly.</p>
                
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">studycircle.ai/</span>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium mb-2">About</label>
                    <textarea
                      value={profile.about}
                      onChange={(e) => setProfile({...profile, about: e.target.value})}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                      rows={4}
                      placeholder="A brief description about yourself"
                    />
                    <p className="text-xs text-muted-foreground mt-1">275 characters left</p>
                  </div>

                  <div className="flex space-x-3">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Save Profile</Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "Account" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                <p className="text-sm text-muted-foreground mb-6">Update your account details here.</p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>

                  <div className="flex space-x-3">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Save Account Settings</Button>
                  </div>
                </form>
              </div>

              {/* Delete Account */}
              <div className="bg-card border border-destructive rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, you will lose all data associated with it. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "Notifications" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll always let you know about important changes, but you pick what else you want to hear about.
                </p>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="font-medium mb-3">By Email</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications.newComments}
                          onChange={(e) => setSettings({
                            ...settings,
                            emailNotifications: {
                              ...settings.emailNotifications,
                              newComments: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <div>
                          <div className="text-sm font-medium">New Comments</div>
                          <div className="text-xs text-muted-foreground">Get notified when someone posts a comment on your shared notes.</div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications.deckReminders}
                          onChange={(e) => setSettings({
                            ...settings,
                            emailNotifications: {
                              ...settings.emailNotifications,
                              deckReminders: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <div>
                          <div className="text-sm font-medium">Deck Reminders</div>
                          <div className="text-xs text-muted-foreground">Get notified for your scheduled deck reviews.</div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications.roomInvites}
                          onChange={(e) => setSettings({
                            ...settings,
                            emailNotifications: {
                              ...settings.emailNotifications,
                              roomInvites: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <div>
                          <div className="text-sm font-medium">Room Invites</div>
                          <div className="text-xs text-muted-foreground">Get notified when you are invited to a study room.</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h4 className="font-medium mb-3">Push Notifications</h4>
                    <p className="text-xs text-muted-foreground mb-3">These are delivered via SMS to your mobile phone.</p>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="pushNotifications"
                          checked={settings.pushNotifications.everything}
                          onChange={() => setSettings({
                            ...settings,
                            pushNotifications: { everything: true, sameAsEmail: false, noPush: false }
                          })}
                          className="rounded"
                        />
                        <div className="text-sm">Everything</div>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="pushNotifications"
                          checked={settings.pushNotifications.sameAsEmail}
                          onChange={() => setSettings({
                            ...settings,
                            pushNotifications: { everything: false, sameAsEmail: true, noPush: false }
                          })}
                          className="rounded"
                        />
                        <div className="text-sm">Same as email</div>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="pushNotifications"
                          checked={settings.pushNotifications.noPush}
                          onChange={() => setSettings({
                            ...settings,
                            pushNotifications: { everything: false, sameAsEmail: false, noPush: true }
                          })}
                          className="rounded"
                        />
                        <div className="text-sm">No push notifications</div>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Save Notifications</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
