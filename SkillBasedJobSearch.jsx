import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  ArrowRight,
  Bookmark,
  ExternalLink,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Java Backend Developer Intern",
    company: "TechNova Solutions",
    location: "Noida",
    type: "Internship",
    mode: "On-site",
    skills: ["java", "sql", "spring boot", "rest api", "git"],
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "WebCraft Technologies",
    location: "Delhi",
    type: "Internship",
    mode: "Hybrid",
    skills: ["html", "css", "javascript", "react", "git"],
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataMind Analytics",
    location: "Noida",
    type: "Internship",
    mode: "Hybrid",
    skills: ["python", "sql", "excel", "power bi", "data analysis"],
  },
  {
    id: 4,
    title: "AI/ML Engineer Intern",
    company: "FutureAI Labs",
    location: "Bangalore",
    type: "Internship",
    mode: "Remote",
    skills: [
      "python",
      "machine learning",
      "artificial intelligence",
      "pandas",
      "numpy",
    ],
  },
  {
    id: 5,
    title: "Full Stack Developer Intern",
    company: "CodeSphere",
    location: "Gurgaon",
    type: "Internship",
    mode: "On-site",
    skills: ["javascript", "react", "node.js", "mongodb", "git"],
  },
  {
    id: 6,
    title: "Cloud Engineer Intern",
    company: "CloudEdge Technologies",
    location: "Pune",
    type: "Internship",
    mode: "Hybrid",
    skills: ["aws", "docker", "git", "linux"],
  },
  {
    id: 7,
    title: "Java Developer Intern",
    company: "InnovateTech",
    location: "Gurgaon",
    type: "Internship",
    mode: "Remote",
    skills: ["java", "sql", "git", "oops"],
  },
  {
    id: 8,
    title: "React Developer Intern",
    company: "PixelWorks",
    location: "Noida",
    type: "Internship",
    mode: "Hybrid",
    skills: ["react", "javascript", "html", "css", "git"],
  },
  {
    id: 9,
    title: "Python Developer Intern",
    company: "CodeAI Technologies",
    location: "Delhi",
    type: "Internship",
    mode: "Remote",
    skills: ["python", "django", "sql", "git"],
  },
  {
    id: 10,
    title: "Software Engineer Intern",
    company: "Microsoft",
    location: "Bangalore",
    type: "Internship",
    mode: "Hybrid",
    skills: ["java", "python", "sql", "git", "data structures"],
  },
];

function calculateMatch(studentSkills, jobSkills) {
  if (!studentSkills.length) return 0;

  const matched = jobSkills.filter((jobSkill) =>
    studentSkills.some(
      (studentSkill) =>
        studentSkill.toLowerCase().trim() ===
        jobSkill.toLowerCase().trim()
    )
  );

  return Math.round((matched.length / jobSkills.length) * 100);
}

function SkillBasedJobSearch({ detectedSkills = [] }) {
  const [skills, setSkills] = useState(detectedSkills);
  const [skillInput, setSkillInput] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [searched, setSearched] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const addSkill = () => {
    const skill = skillInput.trim().toLowerCase();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(
        savedJobs.filter((id) => id !== jobId)
      );
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const getLinkedInSearchUrl = (job) => {
    const searchSkills =
      skills.length > 0 ? skills.join(" ") : job.title;

    const searchLocation =
      location === "All Locations"
        ? job.location
        : location;

    return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
      searchSkills
    )}&location=${encodeURIComponent(searchLocation)}`;
  };

  const getIndeedSearchUrl = (job) => {
    const searchSkills =
      skills.length > 0 ? skills.join(" ") : job.title;

    const searchLocation =
      location === "All Locations"
        ? job.location
        : location;

    return `https://www.indeed.com/jobs?q=${encodeURIComponent(
      searchSkills
    )}&l=${encodeURIComponent(searchLocation)}`;
  };

  const matchingJobs = jobs
    .map((job) => {
      const match = calculateMatch(skills, job.skills);

      const matchedSkills = job.skills.filter((jobSkill) =>
        skills.some(
          (studentSkill) =>
            studentSkill.toLowerCase().trim() ===
            jobSkill.toLowerCase().trim()
        )
      );

      const missingSkills = job.skills.filter(
        (jobSkill) =>
          !skills.some(
            (studentSkill) =>
              studentSkill.toLowerCase().trim() ===
              jobSkill.toLowerCase().trim()
          )
      );

      return {
        ...job,
        match,
        matchedSkills,
        missingSkills,
      };
    })
    .filter((job) => {
      const locationMatch =
        location === "All Locations" ||
        job.location.toLowerCase() ===
          location.toLowerCase();

      return locationMatch && job.match > 0;
    })
    .sort((a, b) => b.match - a.match);

  return (
    <div className="skill-job-page">

      <div className="skill-job-header">
        <span className="resume-ai-badge">
          ✨ AI POWERED JOB MATCHING
        </span>

        <h1>Find Jobs Based on Your Skills</h1>

        <p>
          Enter your skills and discover jobs
          that match your current abilities.
        </p>
      </div>

      <div className="skill-search-card">

        <div className="skill-search-title">
          <Search size={22} />
          <h2>Search by Skills</h2>
        </div>

        <div className="skill-input-row">

          <input
            type="text"
            placeholder="Enter a skill e.g. Java, SQL, React"
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSkill();
              }
            }}
          />

          <button
            className="primary-btn"
            onClick={addSkill}
          >
            + Add Skill
          </button>

        </div>

        <div className="selected-skills">

          {skills.length > 0 ? (
            skills.map((skill) => (
              <span
                className="skill-chip"
                key={skill}
              >
                {skill}

                <button
                  type="button"
                  onClick={() =>
                    removeSkill(skill)
                  }
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <p>
              Add your skills to find matching jobs.
            </p>
          )}

        </div>

        <div className="job-filter-row">

          <div className="filter-input">

            <MapPin size={18} />

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >
              <option>All Locations</option>
              <option>Noida</option>
              <option>Delhi</option>
              <option>Gurgaon</option>
              <option>Bangalore</option>
              <option>Pune</option>
            </select>

          </div>

          <button
            className="primary-btn"
            onClick={() => setSearched(true)}
          >
            <Search size={18} />
            Find Matching Jobs
          </button>

        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            opacity: 0.7,
            marginBottom: "10px",
          }}
        >
          Popular skills:
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {[
            "Java",
            "Python",
            "SQL",
            "React",
            "JavaScript",
            "Git",
          ].map((skill) => (
            <button
              key={skill}
              className="secondary-btn"
              onClick={() => {
                const value = skill.toLowerCase();

                if (!skills.includes(value)) {
                  setSkills([
                    ...skills,
                    value,
                  ]);
                }
              }}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {searched && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="job-results"
        >

          <div className="job-results-header">

            <div>
              <h2>Recommended Jobs</h2>

              <p>
                {matchingJobs.length} matching
                opportunities found
              </p>
            </div>

            <Briefcase size={28} />

          </div>

          {matchingJobs.length === 0 ? (

            <div className="no-jobs">

              <h3>No matching jobs found</h3>

              <p>
                Try adding Java, Python, SQL,
                React or another skill.
              </p>

            </div>

          ) : (

            matchingJobs.map((job) => (

              <motion.div
                className="job-match-card"
                key={job.id}
                whileHover={{
                  y: -4,
                }}
              >

                <div className="job-card-top">

                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>

                  <div className="match-score">
                    {job.match}%

                    <span>Match</span>
                  </div>

                </div>

                <div className="job-info">

                  <span>
                    <MapPin size={16} />
                    {job.location}
                  </span>

                  <span>
                    <Briefcase size={16} />
                    {job.type}
                  </span>

                  <span>{job.mode}</span>

                </div>

                <div className="job-skills-section">

                  <h4>✅ Skills You Match</h4>

                  <div className="job-skill-list">

                    {job.matchedSkills.length > 0 ? (
                      job.matchedSkills.map(
                        (skill) => (
                          <span
                            className="matched-skill"
                            key={skill}
                          >
                            <CheckCircle size={15} />
                            {skill}
                          </span>
                        )
                      )
                    ) : (
                      <span>
                        No exact skill match
                      </span>
                    )}

                  </div>

                </div>

                {job.missingSkills.length > 0 && (

                  <div className="job-skills-section">

                    <h4>📚 Skills You Need</h4>

                    <div className="job-skill-list">

                      {job.missingSkills.map(
                        (skill) => (
                          <span
                            className="missing-skill"
                            key={skill}
                          >
                            <XCircle size={15} />
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                )}

                <div className="job-card-actions">

                  <button
                    className="secondary-btn"
                    onClick={() =>
                      toggleSaveJob(job.id)
                    }
                  >
                    <Bookmark
                      size={17}
                      fill={
                        savedJobs.includes(job.id)
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {savedJobs.includes(job.id)
                      ? "Saved"
                      : "Save Job"}
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => {
                      if (
                        job.missingSkills.length === 0
                      ) {
                        alert(
                          "🎉 You already have all the required skills!"
                        );
                      } else {
                        alert(
                          `📚 Skills to learn:\n\n${job.missingSkills.join(
                            ", "
                          )}`
                        );
                      }
                    }}
                  >
                    View Skill Gap
                    <ArrowRight size={17} />
                  </button>

                  <a
                    href={getLinkedInSearchUrl(job)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-btn"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    LinkedIn Jobs
                    <ExternalLink size={17} />
                  </a>

                  <a
                    href={getIndeedSearchUrl(job)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-btn"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Indeed
                    <ExternalLink size={16} />
                  </a>

                </div>

              </motion.div>

            ))
          )}

        </motion.div>
      )}

    </div>
  );
}

export default SkillBasedJobSearch;