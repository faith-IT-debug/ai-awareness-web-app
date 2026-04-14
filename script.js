const STORAGE_KEY = "ai_awareness_app_v1";

const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  pretest: null,
  posttest: null,
  exploredTools: [],
  quiz: null,
  promptPractice: null
};

const aiTools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Writing / Explanation / Study Support",
    description: "A conversational AI tool that can explain concepts, summarize content, generate outlines, and help students brainstorm ideas.",
    canDo: [
      "Explain difficult topics in simpler language",
      "Generate reviewers and study guides",
      "Help organize essays or reports",
      "Suggest research angles and keywords"
    ]
  },
  {
    id: "grammarly",
    name: "Grammarly",
    category: "Writing Support",
    description: "An AI-powered writing assistant that helps improve grammar, sentence clarity, tone, and readability.",
    canDo: [
      "Check grammar and spelling",
      "Improve clarity and sentence flow",
      "Refine tone in formal writing",
      "Support proofreading of school work"
    ]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "Coding Support",
    description: "An AI coding assistant that suggests code, explains functions, and helps users learn programming structure.",
    canDo: [
      "Suggest code snippets",
      "Explain programming logic",
      "Assist with debugging",
      "Help students learn syntax faster"
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "Research Support",
    description: "An AI-assisted search tool that summarizes topics and points users to supporting sources for follow-up reading.",
    canDo: [
      "Summarize topics quickly",
      "Help with early-stage research",
      "Show source-based answers",
      "Support background reading"
    ]
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "Reading / Notes Support",
    description: "A tool that helps users interact with uploaded notes and documents to produce summaries, explanations, and guide questions.",
    canDo: [
      "Summarize notes and readings",
      "Generate guide questions",
      "Support review sessions",
      "Help connect ideas across readings"
    ]
  },
  {
    id: "canva",
    name: "Canva AI Tools",
    category: "Presentation / Creative Support",
    description: "AI tools within Canva that support design, writing, layout planning, and presentation drafting.",
    canDo: [
      "Draft presentation text",
      "Generate design ideas",
      "Speed up poster and slide creation",
      "Support visual communication tasks"
    ]
  }
];

const quizQuestions = [
  {
    question: "Why is it important to verify AI-generated content?",
    options: [
      "Because AI is always wrong",
      "Because AI outputs may include inaccurate or misleading information",
      "Because only teachers can use AI",
      "Because verification is not needed in school work"
    ],
    answer: 1
  },
  {
    question: "Which of the following best addresses trust concerns in AI use?",
    options: [
      "Using AI without checking",
      "Adding ethics, privacy, and verification guidance",
      "Avoiding all writing tasks",
      "Removing examples from the web app"
    ],
    answer: 1
  },
  {
    question: "Which is the best academic use of AI?",
    options: [
      "Submitting raw AI answers as final work",
      "Using AI to understand a topic, then revising and verifying the output",
      "Using AI to cheat in exams",
      "Copying AI content without reading it"
    ],
    answer: 1
  },
  {
    question: "Which prompt is better?",
    options: [
      "Explain science",
      "Write something about school",
      "Explain photosynthesis in simple terms for a first-year college student and give two examples",
      "Tell me anything"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the pre-test and post-test in this app?",
    options: [
      "To replace all learning activities",
      "To measure changes in awareness and adoption after exposure to the app",
      "To remove the need for practice",
      "To avoid using AI tools"
    ],
    answer: 1
  }
];

const surveyConfig = [
  {
    title: "Demographic Profile",
    fields: [
      { type: "number", name: "age", label: "Age" },
      { type: "radio", name: "gender", label: "Gender", options: ["Male", "Female", "Prefer not to say"] },
      { type: "radio", name: "yearLevel", label: "Year Level", options: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
      { type: "radio", name: "program", label: "Program", options: ["BSIT", "BSCS", "Others"] }
    ]
  },
  {
    title: "Awareness of AI Tools",
    scale: true,
    items: [
      "I am aware of AI tools used for learning.",
      "I know how AI tools can assist in my academic tasks.",
      "I am familiar with different AI tools available for students.",
      "I understand the ethical use of AI tools in education.",
      "I know where to access AI tools for learning."
    ]
  },
  {
    title: "Perceived Usefulness",
    scale: true,
    items: [
      "Using AI tools improves my learning performance.",
      "AI tools help me accomplish tasks more quickly.",
      "AI tools enhance my productivity in studying.",
      "AI tools make learning more effective.",
      "AI tools are useful for my academic work."
    ]
  },
  {
    title: "Perceived Ease of Use",
    scale: true,
    items: [
      "Learning to use AI tools is easy for me.",
      "It is easy for me to become skillful at using AI tools.",
      "AI tools are clear and understandable.",
      "I find AI tools easy to use.",
      "Interacting with AI tools does not require much effort."
    ]
  },
  {
    title: "Trust and Ethics",
    scale: true,
    items: [
      "I trust the accuracy of AI-generated outputs.",
      "I believe AI tools provide reliable information.",
      "I am concerned about privacy when using AI tools.",
      "I believe AI tools use my data responsibly.",
      "I am confident in verifying AI-generated information."
    ]
  },
  {
    title: "Self-Efficacy",
    scale: true,
    items: [
      "I am confident in my ability to use AI tools.",
      "I can learn new AI tools easily.",
      "I can use AI tools without help from others.",
      "I feel capable of applying AI tools in my studies."
    ]
  },
  {
    title: "Subjective Norms",
    scale: true,
    items: [
      "My classmates encourage the use of AI tools.",
      "My instructors support the use of AI tools.",
      "People important to me think I should use AI tools.",
      "AI tool usage is common among my peers."
    ]
  },
  {
    title: "Behavioral Intention",
    scale: true,
    items: [
      "I intend to use AI tools for my studies regularly.",
      "I plan to use AI tools in future academic tasks.",
      "I will recommend AI tools to others.",
      "I am likely to continue using AI tools."
    ]
  },
  {
    title: "Actual Usage",
    fields: [
      { type: "radio", name: "usageFrequency", label: "How often do you use AI tools?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { type: "checkbox", name: "usagePurpose", label: "For what purpose do you use AI tools?", options: ["Assignments", "Research", "Writing", "Studying", "Others"] }
    ]
  }
];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateDashboard();
  updatePreview();
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      showPage(target);
    });
  });
}

function renderTools() {
  const container = document.getElementById("toolsContainer");
  container.innerHTML = "";

  aiTools.forEach(tool => {
    const explored = state.exploredTools.includes(tool.id);

    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p><strong>${tool.category}</strong></p>
      <p>${tool.description}</p>
      <div class="tool-tags">
        <span class="tag">Basic AI Tool</span>
        <span class="tag">Learning Support</span>
      </div>
      <p><strong>What it can do:</strong></p>
      <ul>
        ${tool.canDo.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <button class="${explored ? "secondary" : "primary"} tool-btn" data-tool="${tool.id}" ${explored ? "disabled" : ""}>
        ${explored ? "Explored" : "Mark as Explored"}
      </button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.tool;
      if (!state.exploredTools.includes(id)) {
        state.exploredTools.push(id);
        saveState();
        renderTools();
      }
    });
  });
}

function renderQuiz() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  quizQuestions.forEach((item, index) => {
    const block = document.createElement("div");
    block.className = "form-card";
    block.innerHTML = `<h3>Question ${index + 1}</h3><p>${item.question}</p>`;

    const row = document.createElement("div");
    row.className = "radio-row";

    item.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="quiz_${index}" value="${optIndex}"> ${opt}`;
      row.appendChild(label);
    });

    block.appendChild(row);
    container.appendChild(block);
  });
}

function gradeQuiz() {
  let score = 0;

  quizQuestions.forEach((q, index) => {
    const checked = document.querySelector(`input[name="quiz_${index}"]:checked`);
    if (checked && Number(checked.value) === q.answer) {
      score++;
    }
  });

  const percent = Math.round((score / quizQuestions.length) * 100);
  const result = document.getElementById("quizResult");
  result.classList.remove("hidden");

  let label = "Good";
  let css = "warn";
  let message = "You have fair awareness, but reviewing the AI tools and ethics section will help you improve.";

  if (percent >= 80) {
    label = "Very Good";
    css = "good";
    message = "You show strong awareness of AI tools and responsible use.";
  } else if (percent < 50) {
    label = "Needs Improvement";
    css = "bad";
    message = "You still need more awareness. Review the AI tools, ethics, and examples before moving on.";
  }

  result.innerHTML = `
    <p class="score ${css}">${score}/${quizQuestions.length} (${percent}%)</p>
    <p><strong>${label}</strong></p>
    <p>${message}</p>
  `;

  state.quiz = {
    score,
    percent,
    completedAt: new Date().toISOString()
  };
  saveState();
}

function analyzePrompt(text) {
  const trimmed = text.trim();
  let score = 0;
  const good = [];
  const improve = [];

  if (trimmed.length >= 30) {
    score++;
    good.push("Your prompt has enough length to provide context.");
  } else {
    improve.push("Add more detail. Very short prompts often produce weak answers.");
  }

  if (/(explain|summarize|compare|analyze|create|draft|identify|list|rewrite)/i.test(trimmed)) {
    score++;
    good.push("Your prompt includes a clear task word.");
  } else {
    improve.push("Use a clearer task word such as explain, summarize, compare, or analyze.");
  }

  if (/(for a|for an|student|beginner|college|grade|teacher)/i.test(trimmed)) {
    score++;
    good.push("You identified the audience or level of the answer.");
  } else {
    improve.push("Specify who the answer is for, such as a college student or beginner.");
  }

  if (/(example|bullet|step-by-step|simple terms|brief|2 examples|3 points)/i.test(trimmed)) {
    score++;
    good.push("You included output guidance or constraints.");
  } else {
    improve.push("Add constraints such as 'in simple terms', 'with examples', or 'in bullet form'.");
  }

  if (trimmed.split(" ").length >= 8) {
    score++;
    good.push("The topic is specific enough to guide the AI.");
  } else {
    improve.push("Make the topic more specific so the AI knows exactly what to focus on.");
  }

  let label = "Good";
  let css = "warn";

  if (score === 5) {
    label = "Very Good";
    css = "good";
  } else if (score <= 2) {
    label = "Needs Improvement";
    css = "bad";
  }

  return { score, label, css, good, improve };
}

function checkPrompt() {
  const input = document.getElementById("promptInput").value;
  const box = document.getElementById("promptResult");

  if (!input.trim()) {
    box.classList.remove("hidden");
    box.innerHTML = `<p class="bad"><strong>Please enter a prompt first.</strong></p>`;
    return;
  }

  const result = analyzePrompt(input);
  box.classList.remove("hidden");
  box.innerHTML = `
    <p class="score ${result.css}">${result.label} (${result.score}/5)</p>
    <p><strong>What works well:</strong></p>
    <ul>${result.good.length ? result.good.map(item => `<li>${item}</li>`).join("") : "<li>No major strengths detected yet.</li>"}</ul>
    <p><strong>How to improve it:</strong></p>
    <ul>${result.improve.length ? result.improve.map(item => `<li>${item}</li>`).join("") : "<li>Your prompt is already well-structured.</li>"}</ul>
  `;

  state.promptPractice = {
    prompt: input,
    score: result.score,
    label: result.label,
    completedAt: new Date().toISOString()
  };
  saveState();
}

function buildSurvey(formId, mode) {
  const form = document.getElementById(formId);
  form.innerHTML = "";

  surveyConfig.forEach((section, sIndex) => {
    const card = document.createElement("div");
    card.className = "form-card";
    card.innerHTML = `<h3>${section.title}</h3>`;

    if (section.scale) {
      const note = document.createElement("p");
      note.innerHTML = `<em>Scale: 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree</em>`;
      card.appendChild(note);

      section.items.forEach((item, iIndex) => {
        const row = document.createElement("div");
        row.className = "scale-item";
        row.innerHTML = `<label>${item}</label>`;

        const options = document.createElement("div");
        options.className = "radio-row";

        [1, 2, 3, 4, 5].forEach(val => {
          const label = document.createElement("label");
          label.innerHTML = `<input type="radio" name="${mode}_scale_${sIndex}_${iIndex}" value="${val}" required> ${val}`;
          options.appendChild(label);
        });

        row.appendChild(options);
        card.appendChild(row);
      });
    }

    if (section.fields) {
      section.fields.forEach((field, fIndex) => {
        const row = document.createElement("div");
        row.className = "scale-item";
        row.innerHTML = `<label>${field.label}</label>`;

        if (field.type === "number") {
          row.innerHTML += `<input type="number" name="${mode}_${field.name}" required>`;
        }

        if (field.type === "radio") {
          const group = document.createElement("div");
          group.className = "inline-row";
          field.options.forEach(opt => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="${mode}_${field.name}" value="${opt}" required> ${opt}`;
            group.appendChild(label);
          });
          row.appendChild(group);
        }

        if (field.type === "checkbox") {
          const group = document.createElement("div");
          group.className = "inline-row";
          field.options.forEach(opt => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" name="${mode}_${field.name}" value="${opt}"> ${opt}`;
            group.appendChild(label);
          });
          row.appendChild(group);
        }

        card.appendChild(row);
      });
    }

    form.appendChild(card);
  });

  const btnWrap = document.createElement("div");
  btnWrap.className = "actions";
  btnWrap.innerHTML = `<button type="submit" class="primary">Submit ${mode === "pretest" ? "Pre-Test" : "Post-Test"}</button>`;
  form.appendChild(btnWrap);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = collectFormData(form, mode);
    state[mode] = {
      ...data,
      submittedAt: new Date().toISOString()
    };
    saveState();
    alert(`${mode === "pretest" ? "Pre-test" : "Post-test"} saved successfully.`);
    showPage("dashboard");
  });
}

function collectFormData(form, mode) {
  const data = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }

  const checkboxNames = [...form.querySelectorAll('input[type="checkbox"]')]
    .map(cb => cb.name)
    .filter((name, index, arr) => arr.indexOf(name) === index);

  checkboxNames.forEach(name => {
    const checked = [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
    data[name] = checked;
  });

  return data;
}

function updateDashboard() {
  const checks = {
    pre: !!state.pretest,
    tools: state.exploredTools.length >= 3,
    quiz: !!state.quiz,
    practice: !!state.promptPractice,
    post: !!state.posttest
  };

  document.getElementById("donePre").checked = checks.pre;
  document.getElementById("doneTools").checked = checks.tools;
  document.getElementById("doneQuiz").checked = checks.quiz;
  document.getElementById("donePractice").checked = checks.practice;
  document.getElementById("donePost").checked = checks.post;

  const complete = Object.values(checks).filter(Boolean).length;
  const percent = Math.round((complete / 5) * 100);

  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressText").textContent = `${percent}% complete`;

  document.getElementById("preStatus").textContent = checks.pre ? "Completed" : "Not completed";
  document.getElementById("postStatus").textContent = checks.post ? "Completed" : "Not completed";
  document.getElementById("toolStatus").textContent = `${state.exploredTools.length} tools viewed`;
}

function updatePreview() {
  document.getElementById("dataPreview").textContent = JSON.stringify(state, null, 2);
}

function downloadFile(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportCSV() {
  const rows = [];
  ["pretest", "posttest"].forEach(kind => {
    if (!state[kind]) return;
    const row = { survey_type: kind, submittedAt: state[kind].submittedAt };
    Object.entries(state[kind]).forEach(([k, v]) => {
      if (k === "submittedAt") return;
      row[k] = Array.isArray(v) ? v.join("; ") : v;
    });
    rows.push(row);
  });

  if (state.quiz) {
    rows.push({
      survey_type: "quiz",
      score: state.quiz.score,
      percent: state.quiz.percent,
      completedAt: state.quiz.completedAt
    });
  }

  if (state.promptPractice) {
    rows.push({
      survey_type: "prompt_practice",
      prompt: state.promptPractice.prompt,
      score: state.promptPractice.score,
      label: state.promptPractice.label,
      completedAt: state.promptPractice.completedAt
    });
  }

  if (!rows.length) return "No data saved yet";

  const headers = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const csv = [
    headers.join(","),
    ...rows.map(row => headers.map(h => JSON.stringify(row[h] ?? "")).join(","))
  ].join("\n");

  return csv;
}

function bindButtons() {
  document.getElementById("submitQuiz").addEventListener("click", gradeQuiz);
  document.getElementById("checkPrompt").addEventListener("click", checkPrompt);

  document.getElementById("downloadJson").addEventListener("click", () => {
    downloadFile("ai-awareness-data.json", JSON.stringify(state, null, 2), "application/json");
  });

  document.getElementById("downloadCsv").addEventListener("click", () => {
    downloadFile("ai-awareness-data.csv", exportCSV(), "text/csv");
  });

  document.getElementById("resetData").addEventListener("click", () => {
    const confirmReset = confirm("This will erase all saved data in this browser. Continue?");
    if (!confirmReset) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderTools();
  renderQuiz();
  buildSurvey("pretestForm", "pretest");
  buildSurvey("posttestForm", "posttest");
  bindButtons();
  updateDashboard();
  updatePreview();
});
