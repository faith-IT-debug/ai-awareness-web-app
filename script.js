/* ========================= */
/* script.js */
/* ========================= */

const STORAGE_KEY = "ai_learning_tool_system";

const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  exploredTools: [],
  recommendation: null,
  quiz: null,
  promptPractice: null
};

const aiTools = [

  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Writing / Research",
    description: "AI assistant for writing, brainstorming, summarization, and explanations."
  },

  {
    id: "grammarly",
    name: "Grammarly",
    category: "Writing Support",
    description: "AI tool for grammar checking and writing improvement."
  },

  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "Programming",
    description: "AI coding assistant for programming support."
  },

  {
    id: "canva",
    name: "Canva AI",
    category: "Presentation / Design",
    description: "AI-supported visual presentation and design tool."
  },

  {
    id: "gemini",
    name: "Google Gemini",
    category: "Research / Brainstorming",
    description: "AI assistant for idea generation and research support."
  }

];

const recommendationMap = {

  writing: {
    tools: ["ChatGPT", "Grammarly"],
    reason: "Useful for writing, outlining, and grammar correction."
  },

  research: {
    tools: ["ChatGPT", "Gemini"],
    reason: "Useful for summarization and research support."
  },

  presentation: {
    tools: ["Canva AI", "ChatGPT"],
    reason: "Useful for presentations and visual design."
  },

  coding: {
    tools: ["GitHub Copilot", "ChatGPT"],
    reason: "Useful for programming and debugging."
  },

  study: {
    tools: ["ChatGPT"],
    reason: "Useful for study guides and reviewers."
  },

  brainstorm: {
    tools: ["ChatGPT", "Gemini"],
    reason: "Useful for brainstorming and idea generation."
  }

};

const quizQuestions = [

  {
    question: "Why is verifying AI-generated information important?",
    options: [
      "AI is always accurate",
      "AI may generate inaccurate information",
      "Verification is unnecessary",
      "AI tools cannot be used in education"
    ],
    answer: 1
  },

  {
    question: "Which is responsible AI usage?",
    options: [
      "Submitting raw AI outputs",
      "Using AI ethically and verifying outputs",
      "Copy-pasting without editing",
      "Avoiding citations"
    ],
    answer: 1
  }

];

function saveState() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );

  updateDashboard();
  updatePreview();

}

function showPage(id) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

function setupNavigation() {

  document.querySelectorAll(".nav-btn").forEach(btn => {

    btn.addEventListener("click", () => {
      showPage(btn.dataset.target);
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
        <span class="tag">AI Tool</span>
        <span class="tag">Learning Support</span>
      </div>

      <button
        class="${explored ? "secondary" : "primary"}"
        ${explored ? "disabled" : ""}
        data-id="${tool.id}"
      >
        ${explored ? "Explored" : "Mark as Explored"}
      </button>
    `;

    container.appendChild(card);

  });

  container.querySelectorAll("button[data-id]").forEach(btn => {

    btn.addEventListener("click", () => {

      const id = btn.dataset.id;

      if (!state.exploredTools.includes(id)) {
        state.exploredTools.push(id);
      }

      saveState();
      renderTools();

    });

  });

}

function generateRecommendation() {

  const task = document.getElementById("taskType").value;

  const style = document.getElementById("learningStyle").value;

  const resultBox = document.getElementById("recommendationResult");

  if (!task || !style) {

    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
      <p class="bad">
        Please complete all fields first.
      </p>
    `;

    return;

  }

  const recommendation = recommendationMap[task];

  let learningAdvice = "";

  if (style === "simple") {
    learningAdvice = "Use prompts requesting simplified explanations.";
  }

  if (style === "visual") {
    learningAdvice = "Use visual and presentation-oriented AI tools.";
  }

  if (style === "interactive") {
    learningAdvice = "Use conversational AI tools with follow-up questioning.";
  }

  if (style === "technical") {
    learningAdvice = "Use detailed prompts requesting technical depth.";
  }

  resultBox.classList.remove("hidden");

  resultBox.innerHTML = `
    <div class="recommend-card">

      <h3>Recommended AI Tools</h3>

      <p>
        <strong>Suggested Tools:</strong>
        ${recommendation.tools.join(", ")}
      </p>

      <p>
        <strong>Reason:</strong>
        ${recommendation.reason}
      </p>

      <p>
        <strong>Recommendation Strategy:</strong>
        ${learningAdvice}
      </p>

      <p>
        <strong>Responsible AI Reminder:</strong>
        Always verify AI-generated outputs before academic use.
      </p>

    </div>
  `;

  state.recommendation = {
    task,
    style,
    recommendation: recommendation.tools
  };

  saveState();

}

function renderQuiz() {

  const container = document.getElementById("quizContainer");

  container.innerHTML = "";

  quizQuestions.forEach((item, index) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>Question ${index + 1}</h3>

      <p>${item.question}</p>

      <div class="radio-row">

        ${item.options.map((opt, optIndex) => `
          <label>
            <input
              type="radio"
              name="quiz_${index}"
              value="${optIndex}"
            >
            ${opt}
          </label>
        `).join("")}

      </div>
    `;

    container.appendChild(card);

  });

}

function gradeQuiz() {

  let score = 0;

  quizQuestions.forEach((q, index) => {

    const checked = document.querySelector(
      `input[name="quiz_${index}"]:checked`
    );

    if (
      checked &&
      Number(checked.value) === q.answer
    ) {
      score++;
    }

  });

  const result = document.getElementById("quizResult");

  result.classList.remove("hidden");

  result.innerHTML = `
    <p class="score good">
      ${score}/${quizQuestions.length}
    </p>

    <p>
      You completed the AI literacy self-test.
    </p>
  `;

  state.quiz = {
    score
  };

  saveState();

}

function checkPrompt() {

  const input = document.getElementById("promptInput").value;

  const result = document.getElementById("promptResult");

  result.classList.remove("hidden");

  if (input.length < 30) {

    result.innerHTML = `
      <p class="bad">
        Your prompt needs more detail and specificity.
      </p>
    `;

  } else {

    result.innerHTML = `
      <p class="good">
        Your prompt is reasonably detailed and specific.
      </p>
    `;

  }

  state.promptPractice = {
    prompt: input
  };

  saveState();

}

function updateDashboard() {

  const checks = {

    tools: state.exploredTools.length >= 3,

    quiz: !!state.quiz,

    practice: !!state.promptPractice,

    recommendation: !!state.recommendation

  };

  document.getElementById("doneTools").checked = checks.tools;
  document.getElementById("doneQuiz").checked = checks.quiz;
  document.getElementById("donePractice").checked = checks.practice;
  document.getElementById("doneRecommend").checked = checks.recommendation;

  const complete =
    Object.values(checks).filter(Boolean).length;

  const percent =
    Math.round((complete / 4) * 100);

  document.getElementById("progressFill").style.width =
    `${percent}%`;

  document.getElementById("progressText").textContent =
    `${percent}% complete`;

}

function updatePreview() {

  document.getElementById("dataPreview").textContent =
    JSON.stringify(state, null, 2);

}

function bindButtons() {

  document
    .getElementById("generateRecommendation")
    .addEventListener("click", generateRecommendation);

  document
    .getElementById("submitQuiz")
    .addEventListener("click", gradeQuiz);

  document
    .getElementById("checkPrompt")
    .addEventListener("click", checkPrompt);

  document
    .getElementById("downloadJson")
    .addEventListener("click", () => {

      const blob = new Blob(
        [JSON.stringify(state, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "ai-learning-tool-data.json";

      a.click();

    });

  document
    .getElementById("resetData")
    .addEventListener("click", () => {

      const confirmReset = confirm(
        "Reset all saved data?"
      );

      if (!confirmReset) return;

      localStorage.removeItem(STORAGE_KEY);

      location.reload();

    });

}

document.addEventListener("DOMContentLoaded", () => {

  setupNavigation();

  renderTools();

  renderQuiz();

  bindButtons();

  updateDashboard();

  updatePreview();

});
