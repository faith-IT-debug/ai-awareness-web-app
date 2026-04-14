const STORAGE_KEY = "ai_awareness_webapp_data";

const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  pretest: null,
  posttest: null,
  exploredTools: [],
  selfTest: null,
  promptPractice: null
};

const aiTools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Writing / Explanation / Study Support",
    description:
      "A conversational AI tool that can explain concepts, generate study guides, summarize texts, and support brainstorming.",
    canDo: [
      "Explain difficult concepts in simpler terms",
      "Generate outlines, summaries, and reviewers",
      "Help draft reflections, emails, or study notes",
      "Suggest sample questions or possible research topics"
    ],
    reminders: [
      "Always verify facts and citations",
      "Do not copy answers blindly",
      "Use it to support learning, not replace your own thinking"
    ]
  },
  {
    id: "grammarly",
    name: "Grammarly",
    category: "Writing Support",
    description:
      "A writing assistant that checks grammar, clarity, readability, and tone.",
    canDo: [
      "Correct grammar and spelling",
      "Suggest clearer sentence construction",
      "Improve readability",
      "Support academic and professional writing"
    ],
    reminders: [
      "Review each suggestion carefully",
      "Make sure the revised sentence still matches your intended meaning"
    ]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "Coding Support",
    description:
      "An AI tool for programmers that suggests code, explains code blocks, and helps with debugging.",
    canDo: [
      "Suggest code snippets",
      "Explain how code works",
      "Support debugging",
      "Help students learn coding structure and syntax"
    ],
    reminders: [
      "Test generated code before using it",
      "Check logic, correctness, and security"
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "Research Support",
    description:
      "An AI-assisted search tool that provides summarized answers and points to sources for further reading.",
    canDo: [
      "Summarize information quickly",
      "Surface possible sources for research",
      "Support topic exploration and initial background reading"
    ],
    reminders: [
      "Do not rely only on summaries",
      "Check the source links yourself"
    ]
  },
  {
    id: "canva",
    name: "Canva AI Tools",
    category: "Presentation / Creative Support",
    description:
      "A set of AI features in Canva that can assist with writing, design ideas, and presentation building.",
    canDo: [
      "Draft presentation text",
      "Suggest layouts and creative directions",
      "Speed up slide and visual creation"
    ],
    reminders: [
      "Review for accuracy and relevance",
      "Make sure visuals still fit your academic purpose"
    ]
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "Reading / Notes Support",
    description:
      "A tool that helps users work with notes and uploaded sources to generate summaries and guide questions.",
    canDo: [
      "Summarize readings and notes",
      "Generate study questions",
      "Support synthesis of source material"
    ],
    reminders: [
      "Compare summaries with the original source",
      "Use it to deepen understanding, not shortcut reading"
    ]
  }
];

const selfTestQuestions = [
  {
    question: "Why is it important to verify AI-generated content?",
    options: [
      "Because AI is always correct",
      "Because AI outputs may contain inaccuracies or misleading information",
      "Because verification is only needed in coding",
      "Because verification is optional in academic work"
    ],
    answer: 1
  },
  {
    question: "Which app feature best addresses trust concerns?",
    options: [
      "Only listing tool names",
      "Adding ethics, privacy, and verification guidance",
      "Removing examples",
      "Using colorful design only"
    ],
    answer: 1
  },
  {
    question: "Which is a responsible way to use AI in learning?",
    options: [
      "Submitting raw AI output as a final paper",
      "Using AI to understand a topic, then rewriting after checking the content",
      "Using AI to cheat in an exam",
      "Avoiding any review of AI responses"
    ],
    answer: 1
  },
  {
    question: "Which prompt is better?",
    options: [
      "Explain history",
      "Write something about economics",
      "Explain inflation in simple terms for a first-year college student and give two examples",
      "Tell me school ideas"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the pre-test and post-test in this study?",
    options: [
      "To replace the app content",
      "To measure changes in awareness and adoption after exposure",
      "To check internet speed",
      "To block AI use"
    ],
    answer: 1
  }
];

const surveyConfig = [
  {
    title: "Demographic Profile",
    fields: [
      { type: "number", name: "age", label: "Age" },
      {
        type: "radio",
        name: "gender",
        label: "Gender",
        options: ["Male", "Female", "Prefer not to say"]
      },
      {
        type: "radio",
        name: "yearLevel",
        label: "Year Level",
        options: ["1st Year", "2nd Year", "3rd Year", "4th Year"]
      },
      {
        type: "radio",
        name: "program",
        label: "Program",
        options: ["BSIT", "BSCS", "Others"]
      }
    ]
  },
  {
    title: "Awareness of AI Tools",
    type: "scale",
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
    type: "scale",
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
    type: "scale",
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
    type: "scale",
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
    type: "scale",
    items: [
      "I am confident in my ability to use AI tools.",
      "I can learn new AI tools easily.",
      "I can use AI tools without help from others.",
      "I feel capable of applying AI tools in my studies."
    ]
  },
  {
    title: "Subjective Norms",
    type: "scale",
    items: [
      "My classmates encourage the use of AI tools.",
      "My instructors support the use of AI tools.",
      "People important to me think I should use AI tools.",
      "AI tool usage is common among my peers."
    ]
  },
  {
    title: "Behavioral Intention",
    type: "scale",
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
      {
        type: "radio",
        name: "usageFrequency",
        label: "How often do you use AI tools?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        type: "checkbox",
        name: "usagePurpose",
        label: "For what purpose do you use AI tools?",
        options: ["Assignments", "Research", "Writing", "Studying", "Others"]
      }
    ]
  }
];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateDashboard();
  updateExportPreview();
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function showPage(id) {
  qsa(".page").forEach((page) => page.classList.remove("active"));
  qs(`#${id}`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

qsa("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.nav));
});

function renderTools() {
  const grid = qs("#toolsGrid");
  grid.innerHTML = "";

  aiTools.forEach((tool) => {
    const explored = state.exploredTools.includes(tool.id);

    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p><strong>${tool.category}</strong></p>
      <p>${tool.description}</p>
      <div class="tool-tags">
        <span class="tag">Description</span>
        <span class="tag">What it can do</span>
        <span class="tag">Responsible use</span>
      </div>
      <p><strong>What it can do:</strong></p>
      <ul>${tool.canDo.map((item) => `<li>${item}</li>`).join("")}</ul>
      <p><strong>Reminders:</strong></p>
      <ul>${tool.reminders.map((item) => `<li>${item}</li>`).join("")}</ul>
      <div class="actions">
        <button class="btn btn-primary tool-btn" data-tool-id="${tool.id}" ${explored ? "disabled" : ""}>
          ${explored ? "Explored" : "Mark as Explored"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  qsa(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.toolId;
      if (!state.exploredTools.includes(id)) {
        state.exploredTools.push(id);
        saveState();
        renderTools();
      }
    });
  });
}

function renderSelfTest() {
  const container = qs("#selfTestContainer");
  container.innerHTML = "";

  selfTestQuestions.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "survey-card";
    wrapper.innerHTML = `<h3>Question ${index + 1}</h3><p>${item.question}</p>`;

    const choiceRow = document.createElement("div");
    choiceRow.className = "choice-row";

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="selftest_${index}" value="${optionIndex}">
        ${option}
      `;
      choiceRow.appendChild(label);
    });

    wrapper.appendChild(choiceRow);
    container.appendChild(wrapper);
  });
}

function submitSelfTest() {
  let score = 0;

  selfTestQuestions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="selftest_${index}"]:checked`);
    if (selected && Number(selected.value) === item.answer) {
      score++;
    }
  });

  const percent = Math.round((score / selfTestQuestions.length) * 100);

  let levelClass = "good";
  let message = "Excellent. You show strong awareness of AI tools and responsible use.";

  if (percent < 80 && percent >= 50) {
    levelClass = "warn";
    message = "Good start. Review the AI tools and ethics-related content to improve further.";
  }

  if (percent < 50) {
    levelClass = "bad";
    message = "Your awareness still needs improvement. Review the modules again.";
  }

  const result = qs("#selfTestResult");
  result.classList.remove("hidden");
  result.innerHTML = `
    <p class="score ${levelClass}">${score}/${selfTestQuestions.length} (${percent}%)</p>
    <p>${message}</p>
  `;

  state.selfTest = {
    score,
    percent,
    completedAt: new Date().toISOString()
  };

  saveState();
}

qs("#submitSelfTest").addEventListener("click", submitSelfTest);

function evaluatePrompt(promptText) {
  const text = promptText.trim();
  let score = 0;
  const strengths = [];
  const improvements = [];

  if (text.length >= 30) {
    score++;
    strengths.push("The prompt has enough length to provide useful context.");
  } else {
    improvements.push("Add more detail. Very short prompts often produce vague answers.");
  }
