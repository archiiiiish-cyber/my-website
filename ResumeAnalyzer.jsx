import React, { useState } from "react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (text = "") =>
  text
    .replace(/\u00a0/g, " ")
    .replace(/[•●▪◦]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const containsAny = (text, words) =>
  words.some((word) => text.includes(word.toLowerCase()));

const countMatches = (text, words) =>
  words.filter((word) => text.includes(word.toLowerCase())).length;

/* =========================================================
   RESUME / PROJECT DETECTION
========================================================= */

function detectDocumentType(rawText) {
  const text = normalizeText(rawText).toLowerCase();

  const resumeSignals = {
    contact: containsAny(text, [
      "email",
      "phone",
      "mobile",
      "linkedin",
      "github",
      "contact",
    ]),

    education: containsAny(text, [
      "education",
      "bachelor",
      "master",
      "b.tech",
      "m.tech",
      "b.e",
      "m.e",
      "degree",
      "university",
      "college",
    ]),

    experience: containsAny(text, [
      "work experience",
      "professional experience",
      "employment",
      "internship",
      "intern",
      "work history",
    ]),

    skills: containsAny(text, [
      "skills",
      "technical skills",
      "technologies",
      "core competencies",
    ]),

    projects: containsAny(text, [
      "projects",
      "personal projects",
      "academic projects",
      "key projects",
    ]),

    summary: containsAny(text, [
      "professional summary",
      "career objective",
      "objective",
      "profile summary",
      "about me",
    ]),

    certifications: containsAny(text, [
      "certifications",
      "certificates",
      "certification",
    ]),
  };

  const projectSignals = {
    introduction: containsAny(text, [
      "introduction",
      "project introduction",
    ]),

    problemStatement: containsAny(text, [
      "problem statement",
      "problem definition",
    ]),

    methodology: containsAny(text, [
      "methodology",
      "proposed methodology",
      "method",
    ]),

    requirements: containsAny(text, [
      "requirements",
      "functional requirements",
      "software requirements",
      "hardware requirements",
    ]),

    architecture: containsAny(text, [
      "system architecture",
      "architecture",
      "system design",
    ]),

    implementation: containsAny(text, [
      "implementation",
      "implementation details",
    ]),

    testing: containsAny(text, [
      "testing",
      "test cases",
      "testing methodology",
    ]),

    conclusion: containsAny(text, [
      "conclusion",
      "future scope",
      "future work",
    ]),

    references: containsAny(text, [
      "references",
      "bibliography",
    ]),
  };

  const resumeScore =
    Object.values(resumeSignals).filter(Boolean).length;

  const projectScore =
    Object.values(projectSignals).filter(Boolean).length;

  const strongResumeCombination =
    resumeSignals.contact &&
    (resumeSignals.skills ||
      resumeSignals.education ||
      resumeSignals.experience);

  const strongProjectCombination =
    projectSignals.problemStatement &&
    (projectSignals.methodology ||
      projectSignals.architecture ||
      projectSignals.implementation);

  let type = "unknown";

  if (strongProjectCombination && projectScore >= 3) {
    type = "project";
  } else if (strongResumeCombination && resumeScore >= 3) {
    type = "resume";
  } else if (projectScore > resumeScore && projectScore >= 3) {
    type = "project";
  } else if (resumeScore >= 3) {
    type = "resume";
  }

  return {
    type,
    resumeScore,
    projectScore,
    resumeSignals,
    projectSignals,
  };
}

/* =========================================================
   SKILLS
========================================================= */

const SKILL_LIST = [
  "javascript",
  "typescript",
  "react",
  "react.js",
  "next.js",
  "node.js",
  "nodejs",
  "express",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "python",
  "java",
  "c++",
  "c#",
  "php",
  "sql",
  "mysql",
  "mongodb",
  "postgresql",
  "firebase",
  "aws",
  "azure",
  "docker",
  "git",
  "github",
  "figma",
  "machine learning",
  "artificial intelligence",
  "data analysis",
  "excel",
  "power bi",
  "tableau",
  "communication",
  "leadership",
  "problem solving",
  "teamwork",
  "rest api",
  "api",
  "redux",
  "vite",
  "spring boot",
  "django",
  "flask",
  "kotlin",
  "swift",
  "flutter",
  "android",
];

function detectSkills(text) {
  const lower = text.toLowerCase();

  return [
    ...new Set(
      SKILL_LIST.filter((skill) =>
        lower.includes(skill.toLowerCase())
      )
    ),
  ];
}

/* =========================================================
   SECTIONS
========================================================= */

function detectSections(text) {
  const lower = text.toLowerCase();

  return {
    contact: containsAny(lower, [
      "email",
      "phone",
      "mobile",
      "linkedin",
      "github",
      "contact",
    ]),

    summary: containsAny(lower, [
      "summary",
      "professional summary",
      "objective",
      "career objective",
      "profile",
    ]),

    skills: containsAny(lower, [
      "skills",
      "technical skills",
      "technologies",
      "core competencies",
    ]),

    experience: containsAny(lower, [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "internship",
    ]),

    education: containsAny(lower, [
      "education",
      "bachelor",
      "master",
      "degree",
      "university",
      "college",
      "b.tech",
      "m.tech",
    ]),

    projects: containsAny(lower, [
      "projects",
      "personal projects",
      "academic projects",
    ]),

    certifications: containsAny(lower, [
      "certifications",
      "certificates",
      "certification",
    ]),
  };
}

/* =========================================================
   ACHIEVEMENT / METRICS
========================================================= */

function detectAchievements(text) {
  const lower = text.toLowerCase();

  const achievementTerms = [
    "increased",
    "decreased",
    "improved",
    "reduced",
    "optimized",
    "achieved",
    "generated",
    "saved",
    "led",
    "managed",
    "developed",
    "implemented",
    "delivered",
    "launched",
    "users",
    "revenue",
  ];

  const percentageCount = (
    lower.match(/\b\d+(\.\d+)?\s*%/g) || []
  ).length;

  const numberCount = (
    lower.match(/\b\d+(\.\d+)?\b/g) || []
  ).length;

  const termsFound = countMatches(
    lower,
    achievementTerms
  );

  return {
    termsFound,
    percentageCount,
    numberCount,
  };
}

/* =========================================================
   EXPERIENCE
========================================================= */

function detectExperience(text) {
  const lower = text.toLowerCase();

  return containsAny(lower, [
    "intern",
    "internship",
    "developer",
    "engineer",
    "analyst",
    "designer",
    "manager",
    "consultant",
    "freelance",
    "work experience",
    "professional experience",
  ]);
}

/* =========================================================
   SCORE
========================================================= */

function calculateResumeScore({
  sections,
  skills,
  achievements,
  text,
  hasExperience,
}) {
  let score = 0;

  if (sections.contact) score += 12;
  if (sections.summary) score += 8;
  if (sections.skills) score += 15;
  if (sections.education) score += 12;
  if (sections.experience || hasExperience) score += 15;
  if (sections.projects) score += 12;
  if (sections.certifications) score += 5;

  if (skills.length >= 8) score += 8;
  else if (skills.length >= 5) score += 6;
  else if (skills.length >= 3) score += 4;
  else if (skills.length >= 1) score += 2;

  if (achievements.percentageCount >= 2) score += 5;
  else if (achievements.termsFound >= 2) score += 3;

  if (text.length >= 1200) score += 5;

  return Math.min(Math.max(score, 0), 100);
}

/* =========================================================
   ATS SCORE
========================================================= */

function calculateATS({
  sections,
  skills,
  achievements,
}) {
  let score = 0;

  if (sections.contact) score += 15;
  if (sections.summary) score += 8;
  if (sections.skills) score += 17;
  if (sections.experience) score += 17;
  if (sections.education) score += 13;
  if (sections.projects) score += 10;
  if (sections.certifications) score += 5;

  if (skills.length >= 6) score += 8;
  else if (skills.length >= 3) score += 5;
  else if (skills.length >= 1) score += 2;

  if (achievements.termsFound >= 2) score += 4;

  return Math.min(score, 100);
}

/* =========================================================
   SKILL SCORE
========================================================= */

function calculateSkillScore(skills, sections) {
  let score = 0;

  if (skills.length >= 10) score += 75;
  else if (skills.length >= 8) score += 65;
  else if (skills.length >= 6) score += 55;
  else if (skills.length >= 4) score += 45;
  else if (skills.length >= 2) score += 30;
  else if (skills.length >= 1) score += 20;

  if (sections.skills) score += 20;

  return Math.min(score, 100);
}

/* =========================================================
   EXPERIENCE SCORE
========================================================= */

function calculateExperienceScore({
  sections,
  hasExperience,
  achievements,
}) {
  let score = 0;

  if (sections.experience) score += 55;
  if (hasExperience) score += 15;

  if (achievements.percentageCount >= 2) {
    score += 20;
  } else if (achievements.termsFound >= 2) {
    score += 12;
  }

  if (sections.projects) score += 10;

  return Math.min(score, 100);
}

/* =========================================================
   STRUCTURE SCORE
========================================================= */

function calculateStructureScore({
  sections,
  text,
}) {
  let score = 0;

  const importantSections = [
    "contact",
    "summary",
    "skills",
    "experience",
    "education",
    "projects",
  ];

  importantSections.forEach((section) => {
    if (sections[section]) score += 12;
  });

  if (sections.certifications) score += 6;

  if (text.length >= 800) score += 10;

  return Math.min(score, 100);
}

/* =========================================================
   STRENGTHS
========================================================= */

function generateStrengths({
  sections,
  skills,
  achievements,
}) {
  const strengths = [];

  if (sections.contact) {
    strengths.push(
      "Contact information is present."
    );
  }

  if (skills.length >= 5) {
    strengths.push(
      `${skills.length} relevant skills were detected from the resume.`
    );
  } else if (skills.length > 0) {
    strengths.push(
      "Relevant technical skills were detected."
    );
  }

  if (sections.education) {
    strengths.push(
      "Education information is included."
    );
  }

  if (sections.experience) {
    strengths.push(
      "Professional experience section is present."
    );
  }

  if (sections.projects) {
    strengths.push(
      "Projects section is included."
    );
  }

  if (achievements.percentageCount > 0) {
    strengths.push(
      "Resume contains measurable percentage-based achievements."
    );
  } else if (achievements.termsFound >= 2) {
    strengths.push(
      "Resume contains action-oriented achievement language."
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      "Resume text was successfully extracted for analysis."
    );
  }

  return strengths.slice(0, 5);
}

/* =========================================================
   IMPROVEMENTS
========================================================= */

function generateImprovements({
  sections,
  skills,
  achievements,
  text,
}) {
  const improvements = [];

  if (!sections.contact) {
    improvements.push(
      "Add clear contact details such as email, phone and professional links."
    );
  }

  if (!sections.summary) {
    improvements.push(
      "Add a concise professional summary targeted to the role you want."
    );
  }

  if (!sections.skills) {
    improvements.push(
      "Add a dedicated Skills section using job-relevant keywords."
    );
  }

  if (!sections.experience && !sections.projects) {
    improvements.push(
      "Add relevant internships, work experience or projects."
    );
  }

  if (!sections.education) {
    improvements.push(
      "Add your education and relevant qualifications."
    );
  }

  if (skills.length < 5) {
    improvements.push(
      "Include more relevant technical and professional skills."
    );
  }

  if (
    achievements.percentageCount === 0 &&
    achievements.termsFound < 2
  ) {
    improvements.push(
      "Add measurable achievements using numbers, percentages or clear impact."
    );
  }

  if (text.length < 800) {
    improvements.push(
      "Your resume contains limited text; add useful role-relevant details."
    );
  }

  if (improvements.length === 0) {
    improvements.push(
      "Strong overall structure. Tailor keywords for each job description."
    );
  }

  return improvements.slice(0, 6);
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function ResumeAnalyzer({ onClose }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [documentWarning, setDocumentWarning] =
    useState("");

  /* =====================================================
     PDF
  ===================================================== */

  const extractPDFText = async (selectedFile) => {
    const buffer =
      await selectedFile.arrayBuffer();

    const pdf = await pdfjsLib
      .getDocument({
        data: buffer,
      })
      .promise;

    let text = "";

    for (
      let page = 1;
      page <= pdf.numPages;
      page++
    ) {
      const currentPage =
        await pdf.getPage(page);

      const content =
        await currentPage.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  };

  /* =====================================================
     DOCX
  ===================================================== */

  const extractDOCXText = async (selectedFile) => {
    const buffer =
      await selectedFile.arrayBuffer();

    const extracted =
      await mammoth.extractRawText({
        arrayBuffer: buffer,
      });

    return extracted.value;
  };

  /* =====================================================
     FILE
  ===================================================== */

  const handleFileChange = (event) => {
    const selected =
      event.target.files?.[0];

    if (!selected) return;

    setResult(null);
    setError("");
    setDocumentWarning("");

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selected.type)) {
      setFile(null);

      setError(
        "Please upload a PDF or DOCX resume."
      );

      return;
    }

    if (
      selected.size >
      10 * 1024 * 1024
    ) {
      setFile(null);

      setError(
        "File size must be less than 10MB."
      );

      return;
    }

    setFile(selected);
  };

  /* =====================================================
     ANALYZE
  ===================================================== */

  const analyzeResume = async () => {
    if (!file) return;

    setAnalyzing(true);
    setResult(null);
    setError("");
    setDocumentWarning("");

    try {
      let extractedText = "";

      if (file.type === "application/pdf") {
        extractedText =
          await extractPDFText(file);
      } else {
        extractedText =
          await extractDOCXText(file);
      }

      const text =
        normalizeText(extractedText);

      if (text.length < 100) {
        throw new Error(
          "Very little readable text was found. This may be a scanned/image-only document."
        );
      }

      /* FIRST: DOCUMENT TYPE CHECK */

      const documentType =
        detectDocumentType(text);

      if (documentType.type === "project") {
        setAnalyzing(false);

        setDocumentWarning(
          "This document appears to be a project report/documentation rather than a resume. Please upload your CV or Resume."
        );

        return;
      }

      if (documentType.type === "unknown") {
        setAnalyzing(false);

        setDocumentWarning(
          "We could not confidently identify this as a resume. Please upload a standard CV/Resume containing sections such as Skills, Education, Experience, Projects or Contact Information."
        );

        return;
      }

      /* REAL RESUME ANALYSIS */

      const skills =
        detectSkills(text);

      const sections =
        detectSections(text);

      const achievements =
        detectAchievements(text);

      const hasExperience =
        detectExperience(text);

      const score =
        calculateResumeScore({
          sections,
          skills,
          achievements,
          text,
          hasExperience,
        });

      const ats =
        calculateATS({
          sections,
          skills,
          achievements,
        });

      const skillScore =
        calculateSkillScore(
          skills,
          sections
        );

      const experienceScore =
        calculateExperienceScore({
          sections,
          hasExperience,
          achievements,
        });

      const structureScore =
        calculateStructureScore({
          sections,
          text,
        });

      const strengths =
        generateStrengths({
          sections,
          skills,
          achievements,
        });

      const improvements =
        generateImprovements({
          sections,
          skills,
          achievements,
          text,
        });

      setTimeout(() => {
        setAnalyzing(false);

        setResult({
          score,
          ats,
          skills: skillScore,
          experience: experienceScore,
          formatting: structureScore,
          detectedSkills: skills,
          strengths,
          improvements,
          sections,
          textLength: text.length,
        });
      }, 900);
    } catch (err) {
      console.error(err);

      setAnalyzing(false);

      setError(
        err.message ||
          "Unable to analyze this document."
      );
    }
  };

  /* =====================================================
     RESET
  ===================================================== */

  const resetAnalyzer = () => {
    setFile(null);
    setResult(null);
    setError("");
    setDocumentWarning("");
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <motion.div
      className="resume-analyzer-overlay"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <motion.div
        className="resume-analyzer-modal"
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <button
          className="resume-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        {/* HEADER */}

        <div className="resume-analyzer-header">
          <div className="resume-analyzer-icon">
            📄
          </div>

          <div>
            <span className="resume-ai-badge">
              AI RESUME ANALYZER
            </span>

            <h2>
              Analyze Your Resume
            </h2>

            <p>
              Upload your actual CV and get
              content-based resume insights.
            </p>
          </div>
        </div>

        {/* UPLOAD */}

        {!result && !analyzing && (
          <>
            <label className="resume-upload-box">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />

              <div className="upload-icon">
                📤
              </div>

              <h3>
                {file
                  ? file.name
                  : "Upload your resume"}
              </h3>

              <p>
                {file
                  ? "File selected — ready to analyze"
                  : "PDF or DOCX • Maximum 10MB"}
              </p>
            </label>

            {error && (
              <div
                style={{
                  marginTop: 14,
                  padding: 14,
                  borderRadius: 12,
                  background:
                    "rgba(239,68,68,0.10)",
                  border:
                    "1px solid rgba(239,68,68,0.30)",
                  color: "#fca5a5",
                  lineHeight: 1.5,
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {documentWarning && (
              <div
                style={{
                  marginTop: 14,
                  padding: 16,
                  borderRadius: 14,
                  background:
                    "rgba(245,158,11,0.10)",
                  border:
                    "1px solid rgba(245,158,11,0.30)",
                  color: "#fcd34d",
                  lineHeight: 1.6,
                }}
              >
                <strong>
                  ⚠️ Resume not detected
                </strong>

                <br />

                {documentWarning}
              </div>
            )}

            <button
              className="resume-analyze-btn"
              onClick={analyzeResume}
              disabled={!file}
            >
              ✨ Analyze My Resume
            </button>
          </>
        )}

        {/* LOADING */}

        {analyzing && (
          <div className="resume-analysis-loading">
            <div className="analysis-spinner">
              ✦
            </div>

            <h3>
              Checking your document...
            </h3>

            <p>
              Detecting whether this is a resume,
              extracting skills and analyzing
              resume structure.
            </p>
          </div>
        )}

        {/* RESULT */}

        {result && !analyzing && (
          <div className="resume-results">

            <div className="resume-score">
              <div className="score-circle">
                <strong>
                  {result.score}%
                </strong>

                <span>
                  Resume Score
                </span>
              </div>

              <div>
                <span className="resume-ai-badge">
                  RESUME DETECTED
                </span>

                <h3>
                  Resume analysis complete 🚀
                </h3>

                <p>
                  The analysis is based on the
                  actual text extracted from your
                  uploaded resume.
                </p>
              </div>
            </div>

            {/* METRICS */}

            <div className="resume-metrics">
              <div>
                <strong>
                  {result.ats}%
                </strong>

                <span>
                  ATS Score
                </span>
              </div>

              <div>
                <strong>
                  {result.skills}%
                </strong>

                <span>
                  Skills
                </span>
              </div>

              <div>
                <strong>
                  {result.experience}%
                </strong>

                <span>
                  Experience
                </span>
              </div>

              <div>
                <strong>
                  {result.formatting}%
                </strong>

                <span>
                  Structure
                </span>
              </div>
            </div>

            {/* SKILLS */}

            <div
              className="feedback-box"
              style={{
                marginTop: 16,
              }}
            >
              <h3>
                🧠 Detected Skills
              </h3>

              {result.detectedSkills.length >
              0 ? (
                <p>
                  {result.detectedSkills.join(
                    " • "
                  )}
                </p>
              ) : (
                <p>
                  No predefined skills were detected.
                  Consider adding a dedicated Skills
                  section.
                </p>
              )}
            </div>

            {/* FEEDBACK */}

            <div className="resume-feedback-grid">
              <div className="feedback-box">
                <h3>
                  ✅ Strengths
                </h3>

                {result.strengths.map(
                  (item, index) => (
                    <p key={index}>
                      ✓ {item}
                    </p>
                  )
                )}
              </div>

              <div className="feedback-box">
                <h3>
                  🎯 Improvements
                </h3>

                {result.improvements.map(
                  (item, index) => (
                    <p key={index}>
                      → {item}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* SECTIONS */}

            <div
              className="feedback-box"
              style={{
                marginTop: 16,
              }}
            >
              <h3>
                📋 Resume Sections
              </h3>

              <p>
                {Object.entries(
                  result.sections
                )
                  .map(
                    ([name, present]) =>
                      `${present ? "✓" : "✕"} ${
                        name
                          .charAt(0)
                          .toUpperCase() +
                        name.slice(1)
                      }`
                  )
                  .join("   •   ")}
              </p>

              <p>
                📄 Extracted text:{" "}
                {result.textLength} characters
              </p>
            </div>

            {/* ACTIONS */}

            <div className="resume-result-actions">
              <button
                className="secondary-btn"
                onClick={resetAnalyzer}
              >
                🔄 Analyze Another Resume
              </button>

              <button
                className="primary-btn"
                onClick={onClose}
              >
                🚀 Continue Career Journey
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ResumeAnalyzer;