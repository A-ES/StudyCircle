import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add useNavigate import
import './LandinPage.css';
import mathRoomImage from './xPhjfteMv1decXEMz2sjLfpkUA4.png'; // Import the image

export default function LandingPage() {
  const navigate = useNavigate(); // Add useNavigate hook

  return (
    <div className="studysphere-app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="brand-section">
            <div className="brand-icon">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 0.333333H12V4.77777V9.22223H6V13.6667H0V9.22223V4.77777H6V0.333333V0.333333Z" fill="#121417"/>
              </svg>
            </div>
            <div className="brand-name">StudySphere</div>
          </div>
          
          <nav className="navigation">
            <div className="nav-links">
              <a href="#about" className="nav-link">About Us</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            <div className="header-buttons">
              <button className="primary-button">Start for Free</button>
              <button
                className="secondary-button"
                onClick={() => navigate('/dashboard')} // Ensure this is correctly set
              >
                Explore Rooms
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-banner">
              <div className="hero-text-content">
                <h1 className="hero-title">Unlock Collaborative Learning with AI</h1>
                <p className="hero-description">Enhance your study sessions with intelligent tools and real-time interaction.</p>
              </div>
              <div className="hero-action-buttons">
                <button className="hero-primary-button">Start for Free</button>
                <button className="hero-secondary-button"
                onClick={() => navigate('/dashboard')}
                >Explore Rooms</button>
              </div>
            </div>
          </div>
        </section>

        {/* Study Rooms Section */}
        <section className="study-rooms-section">
          <div className="study-rooms-container">
            <h2 className="section-title">Featured Study Rooms</h2>
            <div className="study-rooms-grid">
              <div className="study-room-card">
                <img src={mathRoomImage} alt="Math 101 Study Group" className="room-image" />
                <div className="room-content">
                  <h3 className="room-title">Math 101 Study Group</h3>
                  <p className="room-description">A collaborative space for Math 101 students.</p>
                </div>
              </div>
              <div className="study-room-card">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/3fbae14ae1674094513644a296db368717e87c84?width=602" alt="History Discussion Forum" className="room-image" />
                <div className="room-content">
                  <h3 className="room-title">History Discussion Forum</h3>
                  <p className="room-description">Discuss historical events and share insights.</p>
                </div>
              </div>
              <div className="study-room-card">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/d92a60d5042946b5173914ecf536647ac042ef14?width=602" alt="Science Project Collaboration" className="room-image" />
                <div className="room-content">
                  <h3 className="room-title">Science Project Collaboration</h3>
                  <p className="room-description">Work together on science projects and experiments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="features-section">
          <div className="features-container">
            <h2 className="section-title">Key Features</h2>
            <div className="features-content">
              <div className="features-header">
                <h3 className="features-main-title">Enhance Your Learning Experience</h3>
                <p className="features-description">Our platform offers a suite of tools designed to make studying more effective and enjoyable.</p>
              </div>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 20.75C13.5 21.1642 13.1642 21.5 12.75 21.5H5.25C4.83579 21.5 4.5 21.1642 4.5 20.75C4.5 20.3358 4.83579 20 5.25 20H12.75C13.1642 20 13.5 20.3358 13.5 20.75V20.75ZM17.25 8.75C17.2566 11.2836 16.0926 13.6783 14.0963 15.2384C13.723 15.5246 13.5029 15.9672 13.5 16.4375V17C13.5 17.8284 12.8284 18.5 12 18.5H6C5.17157 18.5 4.5 17.8284 4.5 17V16.4375C4.49969 15.9728 4.28398 15.5344 3.91594 15.2506C1.9248 13.6999 0.757338 11.3197 0.75 8.79594C0.725625 4.32781 4.33688 0.606875 8.80125 0.5C11.0235 0.446448 13.1734 1.29194 14.7638 2.84496C16.3542 4.39798 17.2506 6.52709 17.25 8.75V8.75ZM15.75 8.75C15.7505 6.93116 15.017 5.18908 13.7157 3.91842C12.4143 2.64775 10.6552 1.95604 8.83687 2C5.18062 2.08625 2.23031 5.13031 2.25 8.78656C2.25694 10.8506 3.21244 12.7969 4.84125 14.0647C5.57354 14.634 6.00133 15.51 6 16.4375V17H12V16.4375C12.0021 15.5074 12.4335 14.6303 13.1691 14.0609C14.8031 12.784 15.7556 10.8238 15.75 8.75V8.75ZM14.2397 7.87438C13.8414 5.64954 12.0996 3.90815 9.87469 3.51031C9.46617 3.44145 9.07918 3.71679 9.01031 4.12531C8.94145 4.53383 9.21679 4.92082 9.62531 4.98969C11.1788 5.25125 12.4969 6.56937 12.7603 8.12562C12.8216 8.4863 13.1342 8.75014 13.5 8.75C13.5424 8.74975 13.5847 8.7463 13.6266 8.73969C14.0348 8.67 14.3093 8.28262 14.2397 7.87438V7.87438Z" fill="#121417"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4 className="feature-title">AI Tutor</h4>
                    <p className="feature-description">Get personalized help from our AI tutor.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22.5 15H21.75V2.25C21.75 1.42157 21.0784 0.75 20.25 0.75H3.75C2.92157 0.75 2.25 1.42157 2.25 2.25V15H1.5C1.08579 15 0.75 15.3358 0.75 15.75C0.75 16.1642 1.08579 16.5 1.5 16.5H22.5C22.9142 16.5 23.25 16.1642 23.25 15.75C23.25 15.3358 22.9142 15 22.5 15V15ZM3.75 2.25H20.25V15H18.75V12.75C18.75 12.3358 18.4142 12 18 12H11.25C10.8358 12 10.5 12.3358 10.5 12.75V15H6.75V5.25H17.25V9.75C17.25 10.1642 17.5858 10.5 18 10.5C18.4142 10.5 18.75 10.1642 18.75 9.75V4.5C18.75 4.08579 18.4142 3.75 18 3.75H6C5.58579 3.75 5.25 4.08579 5.25 4.5V15H3.75V2.25ZM17.25 15H12V13.5H17.25V15Z" fill="#121417"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4 className="feature-title">Collaborative Whiteboard</h4>
                    <p className="feature-description">Brainstorm and visualize ideas together.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.125 10C11.125 10.6213 10.6213 11.125 10 11.125C9.37868 11.125 8.875 10.6213 8.875 10C8.875 9.37868 9.37868 8.875 10 8.875C10.6213 8.875 11.125 9.37868 11.125 10V10ZM5.875 8.875C5.25368 8.875 4.75 9.37868 4.75 10C4.75 10.6213 5.25368 11.125 5.875 11.125C6.49632 11.125 7 10.6213 7 10C7 9.37868 6.49632 8.875 5.875 8.875V8.875ZM14.125 8.875C13.5037 8.875 13 9.37868 13 10C13 10.6213 13.5037 11.125 14.125 11.125C14.7463 11.125 15.25 10.6213 15.25 10C15.25 9.37868 14.7463 8.875 14.125 8.875V8.875ZM19.75 10C19.7507 13.424 17.9553 16.5975 15.02 18.3605C12.0847 20.1234 8.43978 20.2174 5.4175 18.6081L2.22531 19.6722C1.68626 19.852 1.09191 19.7117 0.69011 19.3099C0.288308 18.9081 0.148045 18.3137 0.327812 17.7747L1.39188 14.5825C-0.51326 11.0006 -0.0012579 6.61332 2.67747 3.56638C5.35619 0.519438 9.64177 -0.550316 13.4382 0.880322C17.2346 2.31096 19.7483 5.94298 19.75 10V10ZM18.25 10C18.249 6.53154 16.0787 3.43408 12.819 2.24891C9.55932 1.06374 5.90643 2.04399 3.67801 4.70188C1.44959 7.35977 1.12157 11.1276 2.85719 14.1306C2.9647 14.3167 2.98723 14.5399 2.91906 14.7437L1.75 18.25L5.25625 17.0809C5.33262 17.0549 5.41275 17.0416 5.49344 17.0416C5.62516 17.0418 5.7545 17.0767 5.86844 17.1428C8.42111 18.6197 11.568 18.6217 14.1225 17.148C16.6771 15.6743 18.2507 12.9491 18.25 10V10Z" fill="#121417"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4 className="feature-title">Integrated Chat</h4>
                    <p className="feature-description">Communicate seamlessly with your study group.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="testimonials-container">
            <h2 className="section-title">What Our Users Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <h4 className="testimonial-name">Sarah M.</h4>
                  <p className="testimonial-quote">"StudySphere has transformed my study sessions. The AI tutor is incredibly helpful!"</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <h4 className="testimonial-name">David L.</h4>
                  <p className="testimonial-quote">"The collaborative whiteboard is a game-changer for group projects. Highly recommend!"</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <h4 className="testimonial-name">Emily R.</h4>
                  <p className="testimonial-quote">"I love the integrated chat feature. It makes communication so much easier."</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-navigation">
            <a href="#about" className="footer-link">About Us</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
          <div className="social-media">
            <a href="#twitter" className="social-link" aria-label="Twitter">
              <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.1928 3.46313C20.0768 3.18285 19.8033 3.00006 19.5 3H16.6472C15.8359 1.61972 14.3604 0.765791 12.7594 0.75C11.5747 0.734462 10.4339 1.19754 9.59531 2.03438C8.73219 2.88138 8.24717 4.04071 8.25 5.25V5.82094C4.47563 4.82531 1.38844 1.755 1.35563 1.72219C1.15019 1.51493 0.843182 1.44566 0.568648 1.54461C0.294115 1.64356 0.101905 1.89277 0.0759375 2.18344C-0.328125 6.66375 0.973125 9.66188 2.13844 11.3878C2.70664 12.241 3.39786 13.0055 4.18969 13.6566C2.76188 15.3 0.51375 16.1634 0.489375 16.1728C0.274975 16.2531 0.108996 16.4269 0.0386822 16.6448C-0.0316311 16.8627 0.00142372 17.1008 0.128438 17.2913C0.19875 17.3963 0.48 17.7647 1.16719 18.1087C2.01656 18.5344 3.13875 18.75 4.5 18.75C11.1253 18.75 16.6612 13.6481 17.2266 7.08375L20.0306 4.28062C20.2451 4.06601 20.3091 3.74335 20.1928 3.46313V3.46313ZM15.9741 6.22031C15.8455 6.34921 15.7682 6.52049 15.7566 6.70219C15.375 12.6169 10.4325 17.25 4.5 17.25C3.51 17.25 2.8125 17.1188 2.32312 16.9613C3.40219 16.3753 4.90688 15.3675 5.87438 13.9163C5.98915 13.7438 6.02746 13.5315 5.98023 13.3298C5.93299 13.128 5.80442 12.9548 5.625 12.8512C5.58094 12.8259 1.50844 10.3819 1.5 3.85125C3 5.07 5.74219 6.96094 8.87531 7.48781C9.09265 7.52445 9.3151 7.46364 9.48358 7.32154C9.65205 7.17943 9.74949 6.9704 9.75 6.75V5.25C9.7483 4.44176 10.0728 3.66702 10.65 3.10125C11.2034 2.54686 11.9574 2.23983 12.7406 2.25C13.9275 2.265 15.0366 2.98875 15.5006 4.05094C15.6202 4.32382 15.8899 4.50008 16.1878 4.5H17.6878L15.9741 6.22031Z" fill="#637387"/>
              </svg>
            </a>
            <a href="#facebook" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.7443 4.61758 15.3824 0.255684 10 0.25V0.25ZM10.75 18.2153V12.25H13C13.4142 12.25 13.75 11.9142 13.75 11.5C13.75 11.0858 13.4142 10.75 13 10.75H10.75V8.5C10.75 7.67157 11.4216 7 12.25 7H13.75C14.1642 7 14.5 6.66421 14.5 6.25C14.5 5.83579 14.1642 5.5 13.75 5.5H12.25C10.5931 5.5 9.25 6.84315 9.25 8.5V10.75H7C6.58579 10.75 6.25 11.0858 6.25 11.5C6.25 11.9142 6.58579 12.25 7 12.25H9.25V18.2153C4.85788 17.8144 1.55787 14.0299 1.75854 9.62409C1.95922 5.21827 5.58962 1.74947 10 1.74947C14.4104 1.74947 18.0408 5.21827 18.2415 9.62409C18.4421 14.0299 15.1421 17.8144 10.75 18.2153V18.2153Z" fill="#637387"/>
              </svg>
            </a>
            <a href="#instagram" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10C14.4974 7.51579 12.4842 5.50258 10 5.5V5.5ZM10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10C13 11.6569 11.6569 13 10 13V13ZM14.5 0.25H5.5C2.60179 0.2531 0.2531 2.60179 0.25 5.5V14.5C0.2531 17.3982 2.60179 19.7469 5.5 19.75H14.5C17.3982 19.7469 19.7469 17.3982 19.75 14.5V5.5C19.7469 2.60179 17.3982 0.2531 14.5 0.25V0.25ZM18.25 14.5C18.25 16.5711 16.5711 18.25 14.5 18.25H5.5C3.42893 18.25 1.75 16.5711 1.75 14.5V5.5C1.75 3.42893 3.42893 1.75 5.5 1.75H14.5C16.5711 1.75 18.25 3.42893 18.25 5.5V14.5ZM16 5.125C16 5.74632 15.4963 6.25 14.875 6.25C14.2537 6.25 13.75 5.74632 13.75 5.125C13.75 4.50368 14.2537 4 14.875 4C15.4963 4 16 4.50368 16 5.125V5.125Z" fill="#637387"/>
              </svg>
            </a>
          </div>
          <div className="footer-copyright">
            <p>© 2024 StudySphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


