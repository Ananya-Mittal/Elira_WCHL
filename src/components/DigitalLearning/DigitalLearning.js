import React from "react";

const DigitalLearning = () => {
  const womenEntrepreneurVideos = [
    {
      title: "Getting Started on Elira: A Complete Guide for Women Entrepreneurs",
      description: "Step-by-step tutorial on setting up your store, creating your first listing, and understanding Elira's seller dashboard.",
      duration: "12:45",
      views: "25K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Beginner"
    },
    {
      title: "Zero-Cost Marketing Strategies for Women-Owned Businesses on Elira",
      description: "Learn powerful, free marketing techniques to grow your Elira store without spending a rupee on advertising.",
      duration: "18:30",
      views: "42K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Marketing"
    },
    {
      title: "From Home-Based to Online Empire: Success Stories of Indian Women on Elira",
      description: "Inspiring journeys of women who transformed their small businesses into thriving online stores using Elira's free tools.",
      duration: "22:15",
      views: "67K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Inspiration"
    },
    {
      title: "Financial Independence Through E-commerce: Women's Guide to Elira",
      description: "Master the art of online selling, pricing strategies, and building sustainable income streams on Elira platform.",
      duration: "16:20",
      views: "38K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Business"
    },
    {
      title: "Photography & Product Listing Tips for Women Sellers",
      description: "Create stunning product photos with just your smartphone and write compelling descriptions that convert visitors to buyers.",
      duration: "14:10",
      views: "31K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Skills"
    },
    {
      title: "Building Your Brand Identity as a Woman Entrepreneur on Elira",
      description: "Develop a strong brand presence, create memorable customer experiences, and build loyalty without any investment.",
      duration: "20:05",
      views: "29K",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Branding"
    }
  ];

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="main-container">
      <style jsx>{`
        /* Enhanced styles for the new components */
        .women-entrepreneurs-section {
          background: white;
          padding: 3rem 2rem;
          margin-bottom: 3rem;
          color: white;
          text-align: center;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .video-card {
          background: white;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          color: #1f2937;
        }

        .video-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .video-thumbnail {
          position: relative;
          height: 200px;
          background: linear-gradient(45deg, #ec4899, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #ec4899;
          transition: all 0.3s ease;
        }

        .video-card:hover .play-button {
          transform: scale(1.1);
          background: white;
        }

        .video-info {
          padding: 1.5rem;
        }

        .video-category {
          display: inline-block;
          background: #f3e8ff;
          color: #7c2d92;
          padding: 0.25rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .video-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .video-description {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #9ca3af;
        }

        .video-duration {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          font-weight: 600;
        }

        .empowerment-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .empowerment-stat {
          text-align: center;
        }

        .stat-number-large {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fbbf24;
        }

        .stat-label-large {
          font-size: 1rem;
          font-weight: 600;
        }

        .cta-women {
          background: linear-gradient(135deg, #be185d, #9333ea);
          padding: 3rem 2rem;
          text-align: center;
          color: white;
          margin: 3rem 0;
        }

        .cta-women-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .cta-women-description {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-women-button {
          background: white;
          color: #be185d;
          padding: 1rem 2rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .cta-women-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Original styles */
        .main-container {
          font-family: 'Inter', sans-serif;
          background: #f9fafb;
          color: #1f2937;
          padding: 2rem 1rem;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          position: relative;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          padding: 4rem 2rem;
          color: white;
          text-align: center;
          overflow: hidden;
          margin-bottom: 3rem;
        }

        .header-bg-blur {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
          filter: blur(60px);
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          backdrop-filter: blur(6px);
        }

        .header-badge-icon {
          margin-right: 0.5rem;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .main-description {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .description-highlight {
          font-weight: 600;
          color: #facc15;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 2rem 1.5rem;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }

        .stat-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          width: 60px;
          height: 60px;
          margin-bottom: 1rem;
          color: white;
        }

        .stat-icon-rose { background: #ec4899; }
        .stat-icon-green { background: #a855f7; }
        .stat-icon-blue { background: #d946ef; }
        .stat-icon-purple { background: #8b5cf6; }

        .stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #6b7280;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .module-card {
          position: relative;
          overflow: hidden;
          color: white;
          padding: 2rem;
          height: 260px;
          display: flex;
          align-items: flex-end;
          transition: transform 0.3s ease;
        }

        .module-card:hover {
          transform: translateY(-6px);
        }

        .module-card-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.85;
        }

        .module-content {
          position: relative;
          z-index: 2;
        }

        .module-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .module-description {
          font-size: 0.95rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .module-button {
          background: white;
          border: none;
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .module-card-purple { background: #a855f7; }
        .module-card-green { background: #ec4899; }
        .module-card-blue { background: #d946ef; }

        .module-card-overlay-purple { background: linear-gradient(135deg, #a855f7, #8b5cf6); }
        .module-card-overlay-green { background: linear-gradient(135deg, #ec4899, #f97316); }
        .module-card-overlay-blue { background: linear-gradient(135deg, #d946ef, #a855f7); }

        .module-button-purple { color: #a855f7; }
        .module-button-green { color: #ec4899; }
        .module-button-blue { color: #d946ef; }

        .module-button:hover {
          background: #f3f4f6;
        }

        .success-section {
          margin-bottom: 3rem;
          text-align: center;
        }

        .success-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .success-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .success-card {
          background: white;
          padding: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .success-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }

        .success-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0 auto 1rem;
          color: white;
        }

        .success-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .success-location {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .success-growth {
          font-weight: 600;
          color: #10b981;
          margin-bottom: 0.25rem;
        }

        .success-product {
          font-size: 0.9rem;
          color: #4b5563;
        }

        .cta-section {
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          padding: 3rem 2rem;
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .cta-button-primary {
          background: white;
          color: #ec4899;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .cta-button-primary:hover {
          background: #f3f4f6;
        }

        .cta-button-secondary {
          background: rgba(255,255,255,0.2);
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          color: white;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .cta-button-secondary:hover {
          background: rgba(255,255,255,0.35);
        }

        .cta-note {
          font-size: 0.9rem;
          opacity: 0.85;
        }
      `}</style>
      
      <div className="content-wrapper">
        {/* Header */}
        <header className="header-section">
          <div className="header-bg-blur"></div>
          <div className="header-content">
            <div className="header-badge">
              <span className="header-badge-icon">🎓</span>
              <span className="header-badge-text">Digital Learning</span>
            </div>
            <h1 className="main-title">Digital Learning Hub</h1>
            <p className="main-description">
              Unlock your potential with curated{" "}
              <span className="description-highlight">courses</span>,{" "}
              <span className="description-highlight">workshops</span>, and{" "}
              <span className="description-highlight">certifications</span>{" "}
              designed for every learner.
            </p>
          </div>
        </header>

        {/* Women Entrepreneurs Section */}
        <section className="women-entrepreneurs-section">
          <h2 className="section-title">🚀 Women Entrepreneurs on Elira</h2>
          <p className="section-subtitle">
            Discover how successful women are building thriving businesses on Elira - completely free!
          </p>
          
          <div className="empowerment-stats">
            <div className="empowerment-stat">
              <div className="stat-number-large">15K+</div>
              <div className="stat-label-large">Women Sellers</div>
            </div>
            <div className="empowerment-stat">
              <div className="stat-number-large">₹2Cr+</div>
              <div className="stat-label-large">Revenue Generated</div>
            </div>
            <div className="empowerment-stat">
              <div className="stat-number-large">98%</div>
              <div className="stat-label-large">Success Rate</div>
            </div>
            <div className="empowerment-stat">
              <div className="stat-number-large">0₹</div>
              <div className="stat-label-large">Setup Cost</div>
            </div>
          </div>

          <div className="video-grid">
            {womenEntrepreneurVideos.map((video, index) => (
              <div 
                key={index} 
                className="video-card"
                onClick={() => handleVideoClick(video.videoId)}
              >
                <div className="video-thumbnail">
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <span className="video-category">{video.category}</span>
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span>{video.views} views</span>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA for Women */}
        <section className="cta-women">
          <h2 className="cta-women-title">Ready to Join Thousands of Successful Women?</h2>
          <p className="cta-women-description">
            Start your journey today with zero investment. Elira provides everything you need to build your dream business.
          </p>
          <a href="#join-elira" className="cta-women-button">
            Start Selling on Elira - Free Forever! 🌟
          </a>
        </section>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-rose">
              <span className="stat-icon">📘</span>
            </div>
            <div className="stat-number">120+</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">
              <span className="stat-icon">👩‍🎓</span>
            </div>
            <div className="stat-number">10k+</div>
            <div className="stat-label">Learners</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">
              <span className="stat-icon">🌍</span>
            </div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-purple">
              <span className="stat-icon">🏆</span>
            </div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="modules-grid">
          <div className="module-card module-card-purple">
            <div className="module-card-overlay module-card-overlay-purple"></div>
            <div className="module-content">
              <h2 className="module-title">How to become seller on Elira</h2>
              <p className="module-description">
                Learn the fundamentals of business and how to start working on Elira.
              </p>
              <button className="module-button module-button-purple">
                Explore →
              </button>
            </div>
          </div>

          <div className="module-card module-card-green">
            <div className="module-card-overlay module-card-overlay-green"></div>
            <div className="module-content">
              <h2 className="module-title">Business Leadership</h2>
              <p className="module-description">
                Develop essential leadership skills to succeed in business and
                entrepreneurship.
              </p>
              <button className="module-button module-button-green">
                Explore →
              </button>
            </div>
          </div>

          <div className="module-card module-card-blue">
            <div className="module-card-overlay module-card-overlay-blue"></div>
            <div className="module-content">
              <h2 className="module-title">Artificial Intelligence Basics</h2>
              <p className="module-description">
                Learn how AI will help you grow your business on Elira.
              </p>
              <button className="module-button module-button-blue">
                Explore →
              </button>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <section className="success-section">
          <h2 className="success-title">Success Stories</h2>
          <div className="success-grid">
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">A</span>
              </div>
              <div className="success-name">Aarav Patel</div>
              <div className="success-location">India</div>
              <div className="success-growth">+80% Skill Growth</div>
              <div className="success-product">Completed Web Dev Program</div>
            </div>
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">S</span>
              </div>
              <div className="success-name">Sarah Johnson</div>
              <div className="success-location">USA</div>
              <div className="success-growth">Launched Startup</div>
              <div className="success-product">
                Applied Business Leadership Training
              </div>
            </div>
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">K</span>
              </div>
              <div className="success-name">Kenji Tanaka</div>
              <div className="success-location">Japan</div>
              <div className="success-growth">AI Specialist Role</div>
              <div className="success-product">
                Completed AI Basics Certification
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Learning?</h2>
            <p className="cta-description">
              Join thousands of learners and gain skills that matter.
            </p>
            <div className="cta-buttons">
              <a href="#courses" className="cta-button-primary">
                Browse Courses
              </a>
              <a href="#join" className="cta-button-secondary">
                Join Now
              </a>
            </div>
            <p className="cta-note">No credit card required. Start free!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalLearning;