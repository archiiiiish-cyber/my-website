import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import ResumeAnalyzer from "./ResumeAnalyzer";
import SkillBasedJobSearch from "./SkillBasedJobSearch";
import CareerDashboard from "./CareerDashboard";

/* =====================================================
   CONSTANTS
===================================================== */

const USER_KEY = "skillsync_user";
const USERS_KEY = "skillsync_users";

const particles = Array.from({ length: 32 });

const jobPlatforms = [
  {
    icon: "in",
    name: "LinkedIn",
    description: "Professional jobs & networking",
    url: "https://www.linkedin.com/jobs/",
  },
  {
    icon: "N",
    name: "Naukri",
    description: "India's leading job platform",
    url: "https://www.naukri.com/",
  },
  {
    icon: "I",
    name: "Indeed",
    description: "Jobs from companies worldwide",
    url: "https://www.indeed.com/",
  },
  {
    icon: "i",
    name: "Internshala",
    description: "Internships & fresher jobs",
    url: "https://internshala.com/",
  },
];

const developerPlatforms = [
  {
    icon: "💻",
    title: "GitHub",
    description: "Build projects and showcase your code",
    url: "https://github.com/",
  },
  {
    icon: "🧠",
    title: "HackerRank",
    description: "Practice coding and technical skills",
    url: "https://www.hackerrank.com/",
  },
  {
    icon: "⚡",
    title: "LeetCode",
    description: "Master DSA and interview preparation",
    url: "https://leetcode.com/",
  },
];

const aiFeatures = [
  {
    icon: "🎯",
    title: "AI Career Matching",
    description:
      "AI analyzes your skills, projects and goals to match you with relevant career opportunities.",
    tag: "AI POWERED",
  },
  {
    icon: "📄",
    title: "AI Resume Analyzer",
    description:
      "Analyze your resume, identify missing keywords and improve your ATS compatibility.",
    tag: "SMART ANALYSIS",
    type: "resume",
  },
  {
    icon: "🧭",
    title: "AI Career Roadmap",
    description:
      "Get a personalized step-by-step roadmap from your current skills to your target career.",
    tag: "PERSONALIZED",
  },
  {
    icon: "🎤",
    title: "Virtual AI Interview",
    description:
      "Practice HR, technical and behavioral interviews with instant AI-powered feedback.",
    tag: "LIVE PRACTICE",
  },
];

const opportunityFeatures = [
  {
    icon: "🚀",
    title: "Project Discovery",
    description:
      "Discover projects that strengthen your portfolio and make your profile more job-ready.",
  },
  {
    icon: "🏆",
    title: "Hackathons",
    description:
      "Find upcoming hackathons and competitions to build experience and demonstrate your skills.",
  },
  {
    icon: "🎓",
    title: "Courses & Certifications",
    description:
      "Discover courses and certifications that can close the gap between your current and target skills.",
  },
  {
    icon: "🤝",
    title: "Alumni & Mentorship",
    description:
      "Connect with alumni, mentors and professionals who can guide your career journey.",
  },
  {
    icon: "📣",
    title: "Referral Network",
    description:
      "Discover referral opportunities through alumni, professionals and your career network.",
  },
  {
    icon: "💼",
    title: "Jobs & Internships",
    description:
      "Find relevant jobs and internships based on your profile, skills and career preferences.",
  },
];

/* =====================================================
   STORAGE HELPERS
===================================================== */

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function getStoredUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* =====================================================
   APP
===================================================== */

function App() {
  const [user, setUser] = React.useState(getStoredUser);

  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState("login");

  const [showResumeAnalyzer, setShowResumeAnalyzer] =
    React.useState(false);

  const [showSkillJobSearch, setShowSkillJobSearch] =
    React.useState(false);

  const [showCareerDashboard, setShowCareerDashboard] =
    React.useState(false);

  /* =================================================
     AUTH
  ================================================= */

  const openLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  const openForgotPassword = () => {
    setAuthMode("forgot");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(loggedInUser)
    );

    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);

    setUser(null);
    setShowCareerDashboard(false);
    setShowSkillJobSearch(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =================================================
     NAVIGATION
  ================================================= */

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const openSkillJobSearch = () => {
    if (!user) {
      openLogin();
      return;
    }

    setShowSkillJobSearch(true);

    setTimeout(() => {
      document
        .getElementById("skill-job-search")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const openCareerDashboard = () => {
    if (!user) {
      openLogin();
      return;
    }

    setShowCareerDashboard(true);

    setTimeout(() => {
      document
        .getElementById("career-dashboard")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  /* =================================================
     RETURN
  ================================================= */

  return (
    <div className="app">

      {/* AUTH */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleAuthSuccess}
            onForgotPassword={openForgotPassword}
          />
        )}
      </AnimatePresence>

      {/* RESUME ANALYZER */}
      {showResumeAnalyzer && (
        <ResumeAnalyzer
          onClose={() => setShowResumeAnalyzer(false)}
        />
      )}

      {/* CAREER DASHBOARD */}
      {showCareerDashboard && (
        <section
          id="career-dashboard"
          style={{
            paddingTop: "100px",
            minHeight: "100vh",
            position: "relative",
            zIndex: 5,
          }}
        >
          <CareerDashboard
            onClose={() => {
              setShowCareerDashboard(false);

              setTimeout(() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 100);
            }}
          />
        </section>
      )}

      {/* SKILL JOB SEARCH */}
      {showSkillJobSearch && (
        <section
          id="skill-job-search"
          style={{
            paddingTop: "100px",
            minHeight: "100vh",
            position: "relative",
            zIndex: 5,
          }}
        >
          <SkillBasedJobSearch />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "50px",
            }}
          >
            <button
              className="secondary-btn"
              onClick={() => {
                setShowSkillJobSearch(false);

                setTimeout(() => {
                  document
                    .getElementById("jobs")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
            >
              ← Back to Opportunities
            </button>
          </div>
        </section>
      )}

      {/* PARTICLES */}
      <div className="particle-layer">
        {particles.map((_, index) => (
          <motion.div
            key={index}
            className="particle"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
              width: `${2 + (index % 3)}px`,
              height: `${2 + (index % 3)}px`,
            }}
            animate={{
              x: [
                0,
                index % 2 === 0 ? 35 : -35,
                0,
              ],
              y: [0, -35, 0],
              opacity: [0.15, 0.65, 0.15],
            }}
            transition={{
              duration: 4 + (index % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.12,
            }}
          />
        ))}
      </div>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="logo">
          <motion.div
            className="logo-icon"
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            ⚡
          </motion.div>

          <span>SkillSync AI</span>
        </div>

        <div className="nav-links">
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToFeatures();
            }}
          >
            ✨ Features
          </a>

          <a href="#jobs">Opportunities</a>

          <a href="#interview">AI Interview</a>

          <a href="#network">Networking</a>

          <a
            href="#career-dashboard"
            onClick={(e) => {
              e.preventDefault();
              openCareerDashboard();
            }}
          >
            📊 Dashboard
          </a>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <div className="logged-user">
                <span className="user-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>

                <span className="user-name">
                  {user.name}
                </span>
              </div>

              <motion.button
                className="login-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="login-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openLogin}
              >
                Sign In
              </motion.button>

              <motion.button
                className="signup-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openSignup}
              >
                Get Started
              </motion.button>
            </>
          )}
        </div>
      </motion.nav>

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="hero-badge">
              ✨ AI-Powered Career Intelligence
            </div>

            <h1 className="hero-title">
              Your Next
              <br />

              <span className="gradient-text">
                Opportunity
              </span>

              <br />

              Starts With
              <br />

              <span className="gradient-text">
                What You Can Do.
              </span>
            </h1>

            <p className="hero-description">
              SkillSync AI turns your skills,
              projects and potential into real
              career opportunities — jobs,
              internships, referrals, mentors,
              projects and personalized career
              growth.
            </p>

            <div className="hero-buttons">
              <motion.button
                className="primary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!user) {
                    openSignup();
                  } else {
                    scrollToFeatures();
                  }
                }}
              >
                🚀{" "}
                {user
                  ? "Continue Your Career Journey"
                  : "Start Your Career Journey"}
              </motion.button>

              <motion.button
                className="secondary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setShowResumeAnalyzer(true)
                }
              >
                📄 Upload Resume
              </motion.button>
            </div>

            <div className="career-flow">
              <span>Skills</span>
              <span>→</span>
              <span>Projects</span>
              <span>→</span>
              <span>Internship</span>
              <span>→</span>
              <span>Interview</span>
              <span>→</span>
              <strong>Placement</strong>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.25,
            }}
          >
            <motion.div
              className="floating-card card-one"
              animate={{
                y: [0, -16, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <strong>92%</strong>
              <small>Placement Readiness</small>
            </motion.div>

            <motion.div
              className="ai-orb"
              animate={{
                y: [0, -18, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="orb-core">✦</div>
            </motion.div>

            <motion.div
              className="floating-card card-two"
              animate={{
                y: [0, 15, 0],
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
              }}
            >
              <strong>+127</strong>
              <small>New Opportunities</small>
            </motion.div>

            <div className="ai-match-card">
              🎯 AI Match <strong>94%</strong>
            </div>

            <div className="new-match-card">
              🚀 12 New Matches
            </div>
          </motion.div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="stats">
          <AnimatedStat
            icon="👨‍🎓"
            number="10K+"
            label="Students Connected"
          />

          <AnimatedStat
            icon="💼"
            number="2.5K+"
            label="Internship Opportunities"
          />

          <AnimatedStat
            icon="🏢"
            number="850+"
            label="Placement Openings"
          />

          <AnimatedStat
            icon="🎯"
            number="94%"
            label="AI Career Match"
          />
        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section id="features" className="features-section">
          <Reveal>
            <div className="section-heading">
              <div className="feature-highlight-badge">
                ✨ ALL FEATURES
              </div>

              <h2>
                Everything Your Career
                <br />
                <span className="gradient-text">
                  Needs In One Place
                </span>
              </h2>

              <p>
                SkillSync AI brings career
                discovery, AI intelligence,
                opportunities, learning and
                professional networking into
                one intelligent ecosystem.
              </p>
            </div>
          </Reveal>

          {/* AI */}
          <FeatureCategory
            icon="🧠"
            title="AI Career Intelligence"
            subtitle="Personalized AI tools for your career journey"
          >
            <div className="feature-grid">
              {aiFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  highlighted
                  onClick={
                    feature.type === "resume"
                      ? () => setShowResumeAnalyzer(true)
                      : undefined
                  }
                />
              ))}
            </div>
          </FeatureCategory>

          {/* SKILL JOB */}
          <FeatureCategory
            icon="🎯"
            title="Skill-Based Job Search"
            subtitle="Find jobs based on your actual skills"
          >
            <motion.div
              className="feature-card feature-card-highlighted feature-card-clickable"
              whileHover={{
                y: -10,
                scale: 1.025,
              }}
              onClick={openSkillJobSearch}
            >
              <div className="feature-icon">🔍</div>

              <span className="feature-tag">
                SMART JOB MATCHING
              </span>

              <h3>Find Jobs From Your Skills</h3>

              <p>
                Enter Java, SQL, React, Python
                or any other skills and get jobs
                ranked by your skill match.
              </p>

              <div className="feature-arrow">↗</div>
            </motion.div>
          </FeatureCategory>

          {/* JOB PLATFORMS */}
          <FeatureCategory
            icon="🔎"
            title="Direct Job Search"
            subtitle="Search opportunities from leading platforms"
          >
            <div id="jobs" className="job-platform-grid">
              {jobPlatforms.map((platform, index) => (
                <PlatformCard
                  key={index}
                  {...platform}
                />
              ))}
            </div>
          </FeatureCategory>

          {/* DEVELOPER */}
          <FeatureCategory
            icon="💻"
            title="Developer Growth"
            subtitle="Build skills, projects and coding confidence"
          >
            <div className="developer-grid">
              {developerPlatforms.map(
                (platform, index) => (
                  <PlatformCard
                    key={index}
                    {...platform}
                    developer
                  />
                )
              )}
            </div>
          </FeatureCategory>

          {/* OPPORTUNITIES */}
          <FeatureCategory
            icon="🚀"
            title="Career Opportunities"
            subtitle="Discover experiences that move your career forward"
          >
            <div className="feature-grid">
              {opportunityFeatures.map(
                (feature, index) => (
                  <FeatureCard
                    key={index}
                    {...feature}
                  />
                )
              )}
            </div>
          </FeatureCategory>

          {/* DASHBOARD */}
          <Reveal>
            <motion.div
              className="dashboard-card"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <div className="dashboard-badge">
                  📊 CAREER PROGRESS DASHBOARD
                </div>

                <h2>
                  Track Your
                  <br />
                  <span className="gradient-text">
                    Career Growth
                  </span>
                </h2>

                <p>
                  Monitor your skills, resume score,
                  applications, interview readiness,
                  projects and overall career progress
                  from one dashboard.
                </p>

                <button
                  className="primary-btn"
                  onClick={openCareerDashboard}
                >
                  📊 Open Career Dashboard
                </button>
              </div>

              <div className="dashboard-preview">
                <div className="progress-ring">
                  <div>
                    <strong>78%</strong>
                    <span>Career Progress</span>
                  </div>
                </div>

                <div className="dashboard-mini-grid">
                  <MiniMetric
                    label="Resume Score"
                    value="86%"
                  />
                  <MiniMetric
                    label="Skills"
                    value="14"
                  />
                  <MiniMetric
                    label="Applications"
                    value="32"
                  />
                  <MiniMetric
                    label="Interviews"
                    value="08"
                  />
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        {/* =================================================
            OPPORTUNITIES
        ================================================= */}

        <section className="opportunities-section">
          <Reveal>
            <div className="section-heading">
              <div className="feature-highlight-badge">
                🔥 OPPORTUNITY INTELLIGENCE
              </div>

              <h2>
                Find The Right
                <br />
                <span className="gradient-text">
                  Opportunity Faster
                </span>
              </h2>

              <p>
                Discover internships, jobs,
                hackathons, projects and
                certifications aligned with
                your career goals.
              </p>
            </div>
          </Reveal>

          <div className="opportunity-grid">
            <OpportunityCard
              icon="💼"
              title="Jobs"
              value="850+"
              text="Relevant openings"
            />

            <OpportunityCard
              icon="🎓"
              title="Internships"
              value="2.5K+"
              text="Internship opportunities"
            />

            <OpportunityCard
              icon="🏆"
              title="Hackathons"
              value="128"
              text="Upcoming events"
            />

            <OpportunityCard
              icon="🚀"
              title="Projects"
              value="500+"
              text="Portfolio projects"
            />
          </div>
        </section>

        {/* =================================================
            INTERVIEW
        ================================================= */}

        <section
          id="interview"
          className="interview-section"
        >
          <Reveal>
            <motion.div
              className="interview-card"
              whileHover={{ scale: 1.01 }}
            >
              <div className="feature-highlight-badge">
                🎤 AI VIRTUAL INTERVIEW
              </div>

              <h2>
                Practice.
                <br />
                Improve.
                <br />
                <span className="gradient-text">
                  Get Hired.
                </span>
              </h2>

              <p>
                Practice technical, HR and
                behavioral interviews with an
                AI interviewer.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  alert(
                    "AI Interview module will be connected next."
                  )
                }
              >
                🎙️ Start Mock Interview
              </button>
            </motion.div>
          </Reveal>
        </section>

        {/* =================================================
            NETWORK
        ================================================= */}

        <section
          id="network"
          className="network-section"
        >
          <Reveal>
            <div className="feature-highlight-badge">
              🌐 PROFESSIONAL NETWORK
            </div>

            <h2>
              Build Your
              <br />
              <span className="gradient-text">
                Career Network
              </span>
            </h2>

            <p>
              Connect with alumni, mentors,
              recruiters and professionals.
            </p>

            <div className="network-cards">
              <NetworkCard
                icon="🎓"
                title="Alumni"
                text="Connect with alumni from your college and industry."
              />

              <NetworkCard
                icon="🧑‍🏫"
                title="Mentors"
                text="Get guidance from experienced professionals."
              />

              <NetworkCard
                icon="📣"
                title="Referrals"
                text="Discover professional referral opportunities."
              />
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <strong>⚡ SkillSync AI</strong>

          <p>
            Your skills. Your potential. Your next
            opportunity.
          </p>

          <small>
            Built for students. Powered by AI.
          </small>
        </footer>
      </main>
    </div>
  );
}

/* =====================================================
   AUTH MODAL
   LOGIN + SIGNUP + FORGOT PASSWORD
===================================================== */

function AuthModal({
  mode,
  setMode,
  onClose,
  onSuccess,
  onForgotPassword,
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] =
    React.useState("");

  const [showPassword, setShowPassword] =
    React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState(false);

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [resetStep, setResetStep] =
    React.useState("email");

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  /* =================================================
     RESET STATES
  ================================================= */

  React.useEffect(() => {
    setError("");
    setSuccess("");
    setLoading(false);
  }, [mode]);

  /* =================================================
     LOGIN
  ================================================= */

  const handleLogin = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    const users = getStoredUsers();

    const foundUser = users.find(
      (existingUser) =>
        existingUser.email === cleanEmail &&
        existingUser.password === password
    );

    if (!foundUser) {
      setError(
        "Invalid email or password. Please check your details."
      );
      return;
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(loggedInUser)
    );

    onSuccess(loggedInUser);
  };

  /* =================================================
     SIGNUP
  ================================================= */

  const handleSignup = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = getStoredUsers();

    const alreadyExists = users.some(
      (existingUser) =>
        existingUser.email === cleanEmail
    );

    if (alreadyExists) {
      setError(
        "An account with this email already exists. Please sign in."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveStoredUsers(users);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(sessionUser)
    );

    onSuccess(sessionUser);
  };

  /* =================================================
     FORGOT PASSWORD - STEP 1
  ================================================= */

  const verifyResetEmail = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    const users = getStoredUsers();

    const userExists = users.some(
      (existingUser) =>
        existingUser.email === cleanEmail
    );

    if (!userExists) {
      setError(
        "No account found with this email address."
      );
      return;
    }

    setError("");
    setSuccess(
      "Email verified. You can now create a new password."
    );

    setResetStep("password");
  };

  /* =================================================
     FORGOT PASSWORD - STEP 2
  ================================================= */

  const resetPassword = () => {
    if (!password || !confirmPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    const users = getStoredUsers();

    const userIndex = users.findIndex(
      (existingUser) =>
        existingUser.email === cleanEmail
    );

    if (userIndex === -1) {
      setError("Account not found.");
      return;
    }

    users[userIndex] = {
      ...users[userIndex],
      password: password,
      passwordUpdatedAt: new Date().toISOString(),
    };

    saveStoredUsers(users);

    setPassword("");
    setConfirmPassword("");

    setSuccess(
      "Password reset successfully! You can now sign in with your new password."
    );

    setTimeout(() => {
      setMode("login");
      setSuccess("");
    }, 1200);
  };

  /* =================================================
     SUBMIT
  ================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        handleLogin();
      } else if (isSignup) {
        handleSignup();
      } else if (isForgot) {
        if (resetStep === "email") {
          verifyResetEmail();
        } else {
          resetPassword();
        }
      }

      setLoading(false);
    }, 300);
  };

  /* =================================================
     MODAL
  ================================================= */

  return (
    <motion.div
      className="auth-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        className="auth-modal"
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
      >
        {/* CLOSE */}
        <button
          className="auth-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        {/* LOGO */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            ⚡
          </div>

          <span>SkillSync AI</span>
        </div>

        {/* HEADING */}
        <div className="auth-heading">
          <h2>
            {isLogin &&
              "Welcome Back!"}

            {isSignup &&
              "Create Your Account"}

            {isForgot &&
              resetStep === "email" &&
              "Forgot Password?"}

            {isForgot &&
              resetStep === "password" &&
              "Create New Password"}
          </h2>

          <p>
            {isLogin &&
              "Sign in to continue your career journey."}

            {isSignup &&
              "Start building your career with AI-powered guidance."}

            {isForgot &&
              resetStep === "email" &&
              "Enter your registered email to reset your password."}

            {isForgot &&
              resetStep === "password" &&
              "Enter a strong new password for your account."}
          </p>
        </div>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="auth-error"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="auth-success"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
            >
              ✅ {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              SIGNUP NAME
          ================================================= */}

          {isSignup && (
            <div className="auth-field">
              <label>Full Name</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="auth-field">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span>📧</span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="email"
                disabled={
                  isForgot &&
                  resetStep === "password"
                }
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          {/* =================================================
              LOGIN / SIGNUP PASSWORD
          ================================================= */}

          {!isForgot && (
            <div className="auth-field">
              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              FORGOT PASSWORD NEW PASSWORD
          ================================================= */}

          {isForgot &&
            resetStep === "password" && (
              <>
                <div className="auth-field">
                  <label>
                    New Password
                  </label>

                  <div className="input-wrapper">
                    <span>🔐</span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      value={password}
                      autoComplete="new-password"
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                    >
                      {showPassword
                        ? "🙈"
                        : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label>
                    Confirm New Password
                  </label>

                  <div className="input-wrapper">
                    <span>🔒</span>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      autoComplete="new-password"
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) =>
                            !previous
                        )
                      }
                    >
                      {showConfirmPassword
                        ? "🙈"
                        : "👁️"}
                    </button>
                  </div>
                </div>
              </>
            )}

          {/* =================================================
              SIGNUP CONFIRM
          ================================================= */}

          {isSignup && (
            <div className="auth-field">
              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">
                <span>🔐</span>

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              LOGIN OPTIONS
          ================================================= */}

          {isLogin && (
            <div className="auth-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  defaultChecked
                />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");

                  if (onForgotPassword) {
                    onForgotPassword();
                  } else {
                    setMode("forgot");
                  }
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* =================================================
              BACK TO LOGIN
          ================================================= */}

          {isForgot && (
            <button
              type="button"
              className="forgot-back-btn"
              onClick={() => {
                setError("");
                setSuccess("");
                setResetStep("email");
                setPassword("");
                setConfirmPassword("");
                setMode("login");
              }}
            >
              ← Back to Sign In
            </button>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <motion.button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
            whileHover={{
              scale: loading ? 1 : 1.02,
            }}
            whileTap={{
              scale: loading ? 1 : 0.98,
            }}
          >
            {loading
              ? "Please wait..."

              : isLogin
              ? "🚀 Sign In"

              : isSignup
              ? "✨ Create Account"

              : resetStep === "email"
              ? "🔎 Verify Email"

              : "🔐 Reset Password"}
          </motion.button>
        </form>

        {/* =================================================
            SWITCH LOGIN/SIGNUP
        ================================================= */}

        {!isForgot && (
          <div className="auth-switch">
            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setError("");
                setSuccess("");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                setMode(
                  isLogin
                    ? "signup"
                    : "login"
                );
              }}
            >
              {isLogin
                ? "Create Account"
                : "Sign In"}
            </button>
          </div>
        )}

        <div className="auth-security">
          🔐 Your career journey starts here
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =====================================================
   FEATURE CATEGORY
===================================================== */

function FeatureCategory({
  icon,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="feature-category">
      <div className="category-title">
        <span>{icon}</span>

        <div>
          <h3>{title}</h3>

          <p>{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

/* =====================================================
   REVEAL
===================================================== */

function Reveal({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =====================================================
   STAT
===================================================== */

function AnimatedStat({
  icon,
  number,
  label,
}) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
    >
      <div className="stat-icon">
        {icon}
      </div>

      <h3>{number}</h3>

      <p>{label}</p>
    </motion.div>
  );
}

/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({
  icon,
  title,
  description,
  tag,
  highlighted = false,
  onClick,
}) {
  return (
    <motion.div
      className={`feature-card ${
        highlighted
          ? "feature-card-highlighted"
          : ""
      } ${
        onClick
          ? "feature-card-clickable"
          : ""
      }`}
      whileHover={{
        y: -10,
        scale: 1.025,
      }}
      onClick={onClick}
      role={
        onClick
          ? "button"
          : undefined
      }
      tabIndex={
        onClick
          ? 0
          : undefined
      }
      onKeyDown={(event) => {
        if (
          onClick &&
          (event.key === "Enter" ||
            event.key === " ")
        ) {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="feature-icon">
        {icon}
      </div>

      {tag && (
        <span className="feature-tag">
          {tag}
        </span>
      )}

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="feature-arrow">
        {onClick ? "↗" : "→"}
      </div>
    </motion.div>
  );
}

/* =====================================================
   PLATFORM CARD
===================================================== */

function PlatformCard({
  icon,
  name,
  title,
  description,
  url,
  developer = false,
}) {
  const displayName = name || title;

  return (
    <motion.a
      className={`platform-card ${
        developer
          ? "developer-card"
          : ""
      }`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        y: -8,
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <div className="platform-icon">
        {icon}
      </div>

      <div>
        <h3>{displayName}</h3>
        <p>{description}</p>
      </div>

      <span className="external-arrow">
        ↗
      </span>
    </motion.a>
  );
}

/* =====================================================
   OPPORTUNITY CARD
===================================================== */

function OpportunityCard({
  icon,
  title,
  value,
  text,
}) {
  return (
    <motion.div
      className="opportunity-card"
      whileHover={{
        y: -8,
        scale: 1.025,
      }}
    >
      <div className="opportunity-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <strong>{value}</strong>

      <p>{text}</p>
    </motion.div>
  );
}

/* =====================================================
   MINI METRIC
===================================================== */

function MiniMetric({
  label,
  value,
}) {
  return (
    <div className="mini-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

/* =====================================================
   NETWORK CARD
===================================================== */

function NetworkCard({
  icon,
  title,
  text,
}) {
  return (
    <motion.div
      className="network-card"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >
      <div>{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </motion.div>
  );
}

/* =====================================================
   EXPORT
===================================================== */

export default App;