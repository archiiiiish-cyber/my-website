import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  Target,
  CheckCircle,
} from "lucide-react";

const learningData = {
  "spring boot": {
    level: "Beginner → Intermediate",
    duration: "3–4 weeks",
    description:
      "Learn how to build production-ready Java backend applications using Spring Boot.",
    resources: [
      "Spring Boot fundamentals",
      "REST APIs",
      "Spring MVC",
      "Spring Data JPA",
      "Database integration",
    ],
  },

  "rest api": {
    level: "Beginner",
    duration: "1–2 weeks",
    description:
      "Understand how applications communicate using REST APIs.",
    resources: [
      "HTTP methods",
      "REST architecture",
      "JSON",
      "API requests and responses",
      "Postman",
    ],
  },

  react: {
    level: "Beginner → Intermediate",
    duration: "3–4 weeks",
    description:
      "Build modern interactive web applications using React.",
    resources: [
      "Components",
      "Props and State",
      "Hooks",
      "API integration",
      "React Router",
    ],
  },

  sql: {
    level: "Beginner → Intermediate",
    duration: "2–3 weeks",
    description:
      "Learn how to store, query and analyze relational data.",
    resources: [
      "SELECT queries",
      "WHERE and ORDER BY",
      "JOINs",
      "GROUP BY",
      "Subqueries",
    ],
  },

  python: {
    level: "Beginner → Intermediate",
    duration: "3–4 weeks",
    description:
      "Build a strong Python foundation for development and data-related roles.",
    resources: [
      "Python fundamentals",
      "Functions",
      "Object-oriented programming",
      "File handling",
      "Libraries",
    ],
  },

  "machine learning": {
    level: "Intermediate",
    duration: "5–6 weeks",
    description:
      "Learn the fundamentals of machine learning and predictive models.",
    resources: [
      "Python for ML",
      "NumPy",
      "Pandas",
      "Data preprocessing",
      "Model training",
    ],
  },

  aws: {
    level: "Beginner",
    duration: "3–4 weeks",
    description:
      "Understand cloud computing concepts and AWS services.",
    resources: [
      "Cloud fundamentals",
      "EC2",
      "S3",
      "IAM",
      "Deployment basics",
    ],
  },

  git: {
    level: "Beginner",
    duration: "1 week",
    description:
      "Learn version control and collaborative development using Git.",
    resources: [
      "Git basics",
      "Repositories",
      "Branches",
      "Commits",
      "GitHub",
    ],
  },
};

function LearningRecommendations({
  missingSkills = [],
}) {
  const recommendations = missingSkills
    .map((skill) => {
      const key = skill.toLowerCase();

      return {
        skill,
        data:
          learningData[key] || {
            level: "Beginner",
            duration: "1–3 weeks",
            description:
              `Build practical knowledge of ${skill} to improve your job readiness.`,
            resources: [
              `${skill} fundamentals`,
              "Practical examples",
              "Hands-on projects",
              "Interview preparation",
            ],
          },
      };
    });

  if (!recommendations.length) {
    return (
      <div className="learning-recommendation-box">
        <CheckCircle size={30} />

        <h3>
          🎉 You're Job Ready!
        </h3>

        <p>
          You already have the major skills required
          for this role. Focus on projects and
          interview preparation.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="learning-recommendations"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="learning-header">
        <div className="learning-icon">
          <BookOpen size={24} />
        </div>

        <div>
          <h3>
            🚀 Recommended Learning Roadmap
          </h3>

          <p>
            Learn these skills to improve your
            chances of getting selected.
          </p>
        </div>
      </div>

      <div className="learning-list">

        {recommendations.map(
          ({ skill, data }, index) => (
            <motion.div
              className="learning-card"
              key={skill}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >

              <div className="learning-card-top">

                <div>
                  <span className="learning-number">
                    {index + 1}
                  </span>

                  <h4>
                    Learn {skill}
                  </h4>
                </div>

                <Target size={20} />

              </div>

              <p>
                {data.description}
              </p>

              <div className="learning-meta">
                <span>
                  📊 {data.level}
                </span>

                <span>
                  ⏱️ {data.duration}
                </span>
              </div>

              <div className="learning-topics">

                {data.resources.map(
                  (resource) => (
                    <span key={resource}>
                      <CheckCircle size={14} />
                      {resource}
                    </span>
                  )
                )}

              </div>

              <button
                className="secondary-btn"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      skill + " tutorial for beginners"
                    )}`,
                    "_blank"
                  )
                }
              >
                <PlayCircle size={17} />
                Start Learning
              </button>

            </motion.div>
          )
        )}

      </div>
    </motion.div>
  );
}

export default LearningRecommendations;