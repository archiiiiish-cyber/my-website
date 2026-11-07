import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  FileText,
  Brain,
  Briefcase,
  Mic,
  Target,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

function CareerDashboard({ onClose }) {
  const stats = [
    {
      icon: <TrendingUp size={24} />,
      title: "Career Progress",
      value: "78%",
      change: "+12%",
    },
    {
      icon: <FileText size={24} />,
      title: "Resume Score",
      value: "86%",
      change: "+8%",
    },
    {
      icon: <Brain size={24} />,
      title: "Skills",
      value: "14",
      change: "+3",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Applications",
      value: "32",
      change: "+6",
    },
    {
      icon: <Mic size={24} />,
      title: "Interview Readiness",
      value: "72%",
      change: "+15%",
    },
    {
      icon: <Target size={24} />,
      title: "AI Job Match",
      value: "94%",
      change: "+9%",
    },
  ];

  const skills = [
    { name: "Java", progress: 85 },
    { name: "SQL", progress: 72 },
    { name: "React", progress: 65 },
    { name: "Git", progress: 78 },
    { name: "Data Structures", progress: 60 },
  ];

  const applications = [
    {
      company: "TechNova Solutions",
      role: "Java Backend Developer Intern",
      status: "Interview",
    },
    {
      company: "WebCraft Technologies",
      role: "Frontend Developer Intern",
      status: "Applied",
    },
    {
      company: "DataMind Analytics",
      role: "Data Analyst Intern",
      status: "Shortlisted",
    },
  ];

  const recommendations = [
    "Improve your React skills",
    "Complete 2 more projects",
    "Practice technical interviews",
    "Update resume with project achievements",
  ];

  return (
    <div className="career-dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <div className="dashboard-badge">
            <Sparkles size={16} />
            AI CAREER INTELLIGENCE
          </div>

          <h1>
            Your Career
            <span className="gradient-text"> Dashboard</span>
          </h1>

          <p>
            Track your career growth, skills,
            applications and AI-powered recommendations.
          </p>
        </div>

        {onClose && (
          <button
            className="secondary-btn"
            onClick={onClose}
          >
            ← Back
          </button>
        )}

      </div>

      {/* STATS */}

      <div className="dashboard-stats">

        {stats.map((stat, index) => (

          <motion.div
            className="career-stat-card"
            key={index}
            whileHover={{
              y: -7,
              scale: 1.02,
            }}
          >

            <div className="career-stat-icon">
              {stat.icon}
            </div>

            <div className="career-stat-content">

              <span>{stat.title}</span>

              <strong>{stat.value}</strong>

              <small>
                ↑ {stat.change} this month
              </small>

            </div>

          </motion.div>

        ))}

      </div>

      {/* MAIN GRID */}

      <div className="dashboard-main-grid">

        {/* CAREER PROGRESS */}

        <motion.div
          className="dashboard-panel progress-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="panel-header">
            <div>
              <h2>Career Progress</h2>
              <p>Your overall career readiness</p>
            </div>

            <TrendingUp size={24} />
          </div>

          <div className="career-progress-circle">

            <div className="progress-circle-inner">

              <strong>78%</strong>

              <span>
                Career Progress
              </span>

            </div>

          </div>

          <div className="progress-message">
            <CheckCircle size={18} />

            <span>
              You're making excellent progress!
            </span>
          </div>

        </motion.div>

        {/* AI RECOMMENDATIONS */}

        <motion.div
          className="dashboard-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >

          <div className="panel-header">

            <div>
              <h2>AI Recommendations</h2>
              <p>What you should focus on next</p>
            </div>

            <Sparkles size={24} />

          </div>

          <div className="recommendation-list">

            {recommendations.map(
              (recommendation, index) => (

                <div
                  className="recommendation-item"
                  key={index}
                >

                  <div className="recommendation-number">
                    {index + 1}
                  </div>

                  <span>
                    {recommendation}
                  </span>

                  <ArrowUpRight size={17} />

                </div>

              )
            )}

          </div>

        </motion.div>

      </div>

      {/* SKILLS */}

      <motion.div
        className="dashboard-panel skills-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >

        <div className="panel-header">

          <div>
            <h2>Skill Progress</h2>
            <p>
              Your current technical skill levels
            </p>
          </div>

          <Brain size={24} />

        </div>

        <div className="skills-progress-list">

          {skills.map((skill, index) => (

            <div
              className="skill-progress-item"
              key={index}
            >

              <div className="skill-progress-top">

                <span>
                  {skill.name}
                </span>

                <strong>
                  {skill.progress}%
                </strong>

              </div>

              <div className="progress-bar">

                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${skill.progress}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </motion.div>

      {/* APPLICATIONS */}

      <motion.div
        className="dashboard-panel applications-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >

        <div className="panel-header">

          <div>
            <h2>Recent Applications</h2>
            <p>
              Track your latest job applications
            </p>
          </div>

          <Briefcase size={24} />

        </div>

        <div className="applications-list">

          {applications.map(
            (application, index) => (

              <div
                className="application-row"
                key={index}
              >

                <div className="company-avatar">
                  {application.company.charAt(0)}
                </div>

                <div className="application-info">

                  <strong>
                    {application.role}
                  </strong>

                  <span>
                    {application.company}
                  </span>

                </div>

                <span
                  className={`application-status ${
                    application.status
                      .toLowerCase()
                      .replace(" ", "-")
                  }`}
                >
                  {application.status}
                </span>

              </div>

            )
          )}

        </div>

      </motion.div>

      {/* BOTTOM ACTIONS */}

      <div className="dashboard-actions">

        <button
          className="primary-btn"
          onClick={() =>
            alert(
              "AI Career Roadmap will be connected next."
            )
          }
        >
          🧭 View AI Career Roadmap
          <ArrowUpRight size={18} />
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            alert(
              "Skill improvement recommendations will be connected next."
            )
          }
        >
          🧠 Improve My Skills
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            alert(
              "Interview preparation will be connected next."
            )
          }
        >
          🎤 Practice Interview
        </button>

      </div>

    </div>
  );
}

export default CareerDashboard;