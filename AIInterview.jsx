import React, { useState } from "react";

const interviewQuestions = {
  "Software Developer": [
    "Tell me about yourself and your technical background.",
    "What is the difference between let, const and var in JavaScript?",
    "What is React and why is it used?",
    "Explain the difference between props and state in React.",
    "What is an API and how does a frontend application use it?",
  ],

  "Data Scientist": [
    "Tell me about yourself and your data science background.",
    "What is the difference between supervised and unsupervised learning?",
    "What is overfitting in machine learning?",
    "Explain the difference between classification and regression.",
    "How would you evaluate a machine learning model?",
  ],

  "AI/ML Engineer": [
    "Tell me about yourself and your AI/ML background.",
    "What is machine learning?",
    "What is the difference between AI, ML and deep learning?",
    "What is overfitting and how can you prevent it?",
    "Explain the purpose of a training and testing dataset.",
  ],

  "Web Developer": [
    "Tell me about yourself and your web development experience.",
    "What is the difference between frontend and backend development?",
    "What is HTML and why is it important?",
    "What is CSS used for?",
    "Explain how a REST API works.",
  ],

  "Cybersecurity": [
    "Tell me about yourself and your cybersecurity background.",
    "What is phishing?",
    "What is the difference between authentication and authorization?",
    "What is SQL injection?",
    "How can a web application be secured?",
  ],

  "HR / General": [
    "Tell me about yourself.",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Why should we hire you?",
    "Where do you see yourself in five years?",
  ],
};

function AIInterview({ onClose }) {
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("Software Developer");
  const [difficulty, setDifficulty] = useState("Intermediate");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [finished, setFinished] = useState(false);

  const questions = interviewQuestions[role];

  const startInterview = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setFinished(false);
  };

  const submitAnswer = () => {
    if (!answer.trim()) {
      alert("Please enter your answer first.");
      return;
    }

    const newAnswers = [
      ...answers,
      {
        question: questions[currentQuestion],
        answer: answer.trim(),
      },
    ];

    setAnswers(newAnswers);
    setAnswer("");

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartInterview = () => {
    setStarted(false);
    setFinished(false);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
  };

  if (finished) {
    const score = Math.min(
      95,
      60 + answers.length * 5
    );

    return (
      <section className="ai-interview-page">
        <div className="ai-interview-container">

          <button
            className="secondary-btn"
            onClick={onClose}
          >
            ← Back
          </button>

          <div className="interview-result">

            <div className="feature-highlight-badge">
              🎉 INTERVIEW COMPLETED
            </div>

            <h1>
              Your Interview
              <br />
              <span className="gradient-text">
                Results
              </span>
            </h1>

            <div className="interview-score">
              <strong>{score}%</strong>
              <span>Overall Score</span>
            </div>

            <div className="interview-result-grid">

              <div className="result-card">
                <span>🧠</span>
                <strong>Technical Knowledge</strong>
                <b>{score + 2 > 100 ? 100 : score + 2}%</b>
              </div>

              <div className="result-card">
                <span>💬</span>
                <strong>Communication</strong>
                <b>{score - 3}%</b>
              </div>

              <div className="result-card">
                <span>🎯</span>
                <strong>Relevance</strong>
                <b>{score}%</b>
              </div>

              <div className="result-card">
                <span>💪</span>
                <strong>Confidence</strong>
                <b>{score - 1}%</b>
              </div>

            </div>

            <div className="interview-feedback">

              <h3>AI Feedback</h3>

              <p>
                Your interview has been completed.
                You demonstrated good understanding
                of the selected role.
              </p>

              <h4>Strengths</h4>

              <ul>
                <li>Good technical fundamentals</li>
                <li>Relevant answers</li>
                <li>Good understanding of the role</li>
              </ul>

              <h4>Recommended Improvements</h4>

              <ul>
                <li>Give more practical examples</li>
                <li>Explain answers more clearly</li>
                <li>Improve communication structure</li>
              </ul>

            </div>

            <button
              className="primary-btn"
              onClick={restartInterview}
            >
              🔄 Practice Again
            </button>

          </div>
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <section className="ai-interview-page">
        <div className="ai-interview-container">

          <button
            className="secondary-btn"
            onClick={onClose}
          >
            ← Back
          </button>

          <div className="interview-start">

            <div className="feature-highlight-badge">
              🎤 AI VIRTUAL INTERVIEW
            </div>

            <h1>
              Practice.
              <br />
              Improve.
              <br />
              <span className="gradient-text">
                Get Hired.
              </span>
            </h1>

            <p>
              Practice role-specific interview
              questions and evaluate your
              interview readiness.
            </p>

            <div className="interview-settings">

              <div className="interview-setting">
                <label>
                  Select Job Role
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >
                  {Object.keys(
                    interviewQuestions
                  ).map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="interview-setting">
                <label>
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(
                      e.target.value
                    )
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

            </div>

            <div className="interview-info">

              <div>
                <strong>5</strong>
                <span>Questions</span>
              </div>

              <div>
                <strong>⏱</strong>
                <span>Practice</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>Feedback</span>
              </div>

            </div>

            <button
              className="primary-btn"
              onClick={startInterview}
            >
              🎙️ Start Mock Interview
            </button>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-interview-page">
      <div className="ai-interview-container">

        <div className="interview-topbar">

          <div>
            <span className="feature-tag">
              {role}
            </span>

            <h2>
              AI Mock Interview
            </h2>
          </div>

          <div className="question-counter">
            Question{" "}
            {currentQuestion + 1} /{" "}
            {questions.length}
          </div>

        </div>

        <div className="question-progress">
          <div
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="question-card">

          <div className="ai-avatar">
            🤖
          </div>

          <div>

            <span className="ai-label">
              AI INTERVIEWER
            </span>

            <h2>
              {questions[currentQuestion]}
            </h2>

          </div>

        </div>

        <div className="answer-card">

          <label>
            Your Answer
          </label>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer here..."
            rows={8}
          />

          <div className="answer-actions">

            <button
              className="voice-btn"
              type="button"
              onClick={() =>
                alert(
                  "Voice input will be connected in the next step."
                )
              }
            >
              🎤 Voice Answer
            </button>

            <button
              className="primary-btn"
              onClick={submitAnswer}
            >
              {currentQuestion ===
              questions.length - 1
                ? "Finish Interview"
                : "Submit & Next →"}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AIInterview;