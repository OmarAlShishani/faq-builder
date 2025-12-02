// Global state
let processedQuestions = [];
let baseURL = "https://builder.datakite.app";
let isProcessing = false;
let currentStep = 1;
let faqGroups = [];
let faqGroupCounter = 0;

// Model configurations
const providerModels = {
  openai: [
    { value: "gpt-4o-mini", label: "GPT-4o Mini (Recommended)" },
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  ],
  gemini: [
    { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Latest)" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  ],
  openrouter: [
    { value: "openai/gpt-4o-mini", label: "OpenAI GPT-4o Mini" },
    { value: "google/gemini-pro-1.5", label: "Gemini Pro 1.5" },
    { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
  ],
};

const providerInfo = {
  openai: {
    url: "https://platform.openai.com/api-keys",
    text: "OpenAI Platform",
  },
  gemini: {
    url: "https://makersuite.google.com/app/apikey",
    text: "Google AI Studio",
  },
  openrouter: { url: "https://openrouter.ai/keys", text: "OpenRouter" },
};

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  addFaqGroup(); // Add first FAQ group
  updateSteps();
  setupInputListeners();
});

function loadSettings() {
  const fields = {
    ai_provider: "aiProvider",
    ai_model: "aiModel",
    api_key: "apiKey",
    jwt_token: "jwt",
    assistant_code: "assistantCode",
    version_code: "versionCode",
    base_url: "baseURL",
  };

  const savedProvider = localStorage.getItem("ai_provider") || "gemini";
  document.getElementById("aiProvider").value = savedProvider;
  updateProviderSettings();

  Object.entries(fields).forEach(([key, id]) => {
    if (key !== "ai_provider") {
      const saved = localStorage.getItem(key);
      if (saved && document.getElementById(id)) {
        document.getElementById(id).value = saved;
      }
    }
  });
}

function saveSettings() {
  const fields = {
    jwt_token: "jwt",
    assistant_code: "assistantCode",
    version_code: "versionCode",
    base_url: "baseURL",
    api_key: "apiKey",
    ai_provider: "aiProvider",
    ai_model: "aiModel",
  };

  Object.entries(fields).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) localStorage.setItem(key, el.value);
  });
}

function setupInputListeners() {
  // Track input changes to update steps
  const step1Inputs = ["assistantCode", "versionCode", "jwt", "baseURL"];
  const step2Inputs = ["aiProvider", "aiModel", "apiKey"];

  [...step1Inputs, ...step2Inputs].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateSteps);
      el.addEventListener("change", updateSteps);
    }
  });
}

function updateSteps() {
  const step1Complete = document.getElementById("jwt").value.trim();
  const step2Complete = document.getElementById("apiKey").value.trim();

  // Check if at least one FAQ group has faqId and questions
  let step3Complete = false;
  for (const group of faqGroups) {
    const faqIdEl = document.getElementById(`faqId-${group.id}`);
    const questionsEl = document.getElementById(`questions-${group.id}`);
    if (
      faqIdEl &&
      questionsEl &&
      faqIdEl.value.trim() &&
      questionsEl.value.trim()
    ) {
      step3Complete = true;
      break;
    }
  }

  // Update step states
  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("active", "completed", "pending");

    if (index === 0) {
      step.classList.add(step1Complete ? "completed" : "active");
    } else if (index === 1) {
      if (!step1Complete) step.classList.add("pending");
      else step.classList.add(step2Complete ? "completed" : "active");
    } else if (index === 2) {
      if (!step1Complete || !step2Complete) step.classList.add("pending");
      else step.classList.add(step3Complete ? "completed" : "active");
    } else {
      step.classList.add(
        step1Complete && step2Complete && step3Complete ? "active" : "pending"
      );
    }
  });
}

function scrollToCard(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateProviderSettings() {
  const provider = document.getElementById("aiProvider").value;
  const modelSelect = document.getElementById("aiModel");
  const helpText = document.getElementById("apiKeyHelp");

  modelSelect.innerHTML = "";
  providerModels[provider].forEach((model) => {
    const option = document.createElement("option");
    option.value = model.value;
    option.textContent = model.label;
    modelSelect.appendChild(option);
  });

  const info = providerInfo[provider];
  helpText.innerHTML = `Get your key from <a href="${info.url}" target="_blank">${info.text}</a>`;
  localStorage.setItem("ai_provider", provider);
}

// FAQ Group Management
function addFaqGroup() {
  const groupId = ++faqGroupCounter;
  const group = {
    id: groupId,
    faqId: "",
    instructions: "",
    questions: "",
  };
  faqGroups.push(group);

  const container = document.getElementById("faqGroupsContainer");
  const groupHtml = `
    <div class="faq-group" id="faq-group-${groupId}">
      <div class="faq-group-header">
        <span class="faq-group-title">FAQ Group #${groupId}</span>
        ${
          faqGroups.length > 1
            ? `<button class="faq-group-remove" onclick="removeFaqGroup(${groupId})">✕</button>`
            : ""
        }
      </div>
      <div class="form-row">
        <div class="form-group full">
          <label class="form-label">
            FAQ ID <span class="required">*</span>
          </label>
          <input
            type="text"
            class="form-input"
            id="faqId-${groupId}"
            placeholder="Enter your FAQ ID"
            oninput="updateSteps()"
          />
          <span class="form-hint">The unique identifier for this FAQ knowledge base</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom: 15px;">
        <label class="form-label">Context / Instructions</label>
        <textarea
          class="form-input"
          id="instructions-${groupId}"
          placeholder="Example: These FAQs are for an e-commerce platform selling electronics.

مثال: هذه الأسئلة لمتجر إلكتروني."
          style="min-height: 60px;"
        ></textarea>
        <span class="form-hint">Optional: Provide context for AI generation</span>
      </div>
      <div class="form-group">
        <label class="form-label">
          FAQ Questions <span class="required">*</span>
        </label>
        <textarea
          class="form-input"
          id="questions-${groupId}"
          placeholder="Enter one question per line:

How do I track my order?
كيف يمكنني تتبع طلبي؟"
          oninput="updateSteps()"
        ></textarea>
        <span class="form-hint">Enter one question per line. Mix of Arabic and English is supported.</span>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", groupHtml);
  updateRemoveButtons();
  updateSteps();
}

function removeFaqGroup(groupId) {
  if (faqGroups.length <= 1) return;

  faqGroups = faqGroups.filter((g) => g.id !== groupId);
  const groupEl = document.getElementById(`faq-group-${groupId}`);
  if (groupEl) groupEl.remove();

  updateRemoveButtons();
  updateSteps();
}

function updateRemoveButtons() {
  const groups = document.querySelectorAll(".faq-group");
  groups.forEach((group, index) => {
    const removeBtn = group.querySelector(".faq-group-remove");
    if (faqGroups.length <= 1) {
      if (removeBtn) removeBtn.style.display = "none";
    } else {
      if (removeBtn) removeBtn.style.display = "";
      else {
        const groupId = parseInt(group.id.replace("faq-group-", ""));
        const header = group.querySelector(".faq-group-header");
        header.insertAdjacentHTML(
          "beforeend",
          `<button class="faq-group-remove" onclick="removeFaqGroup(${groupId})">✕</button>`
        );
      }
    }
  });
}

// Toast notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = { success: "✓", error: "✕", info: "ℹ" };
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span>${message}`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Validation
function validateForm() {
  let isValid = true;
  document
    .querySelectorAll(".form-input.error")
    .forEach((el) => el.classList.remove("error"));

  // Validate JWT and API Key
  const jwtEl = document.getElementById("jwt");
  const apiKeyEl = document.getElementById("apiKey");

  if (!jwtEl.value.trim()) {
    jwtEl.classList.add("error");
    showToast("JWT Token is required", "error");
    jwtEl.focus();
    return false;
  }

  if (!apiKeyEl.value.trim()) {
    apiKeyEl.classList.add("error");
    showToast("API Key is required", "error");
    apiKeyEl.focus();
    return false;
  }

  // Validate at least one FAQ group has faqId and questions
  let hasValidGroup = false;
  for (const group of faqGroups) {
    const faqIdEl = document.getElementById(`faqId-${group.id}`);
    const questionsEl = document.getElementById(`questions-${group.id}`);

    if (
      faqIdEl &&
      questionsEl &&
      faqIdEl.value.trim() &&
      questionsEl.value.trim()
    ) {
      hasValidGroup = true;
    }
  }

  if (!hasValidGroup) {
    showToast("At least one FAQ group must have FAQ ID and Questions", "error");
    return false;
  }

  return isValid;
}

// Progress updates
function updateProgress(current, total, text, apiCalls) {
  const percent = Math.round((current / total) * 100);
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("progressCurrent").textContent = current;
  document.getElementById("progressTotal").textContent = total;
  document.getElementById("progressSubtitle").textContent = text;
  document.getElementById("progressAPICalls").textContent = apiCalls;
}

async function processAllFaqGroups() {
  if (isProcessing) return;
  if (!validateForm()) return;

  saveSettings();

  // Collect all valid FAQ groups
  const validGroups = [];
  for (const group of faqGroups) {
    const faqIdEl = document.getElementById(`faqId-${group.id}`);
    const instructionsEl = document.getElementById(`instructions-${group.id}`);
    const questionsEl = document.getElementById(`questions-${group.id}`);

    if (
      faqIdEl &&
      questionsEl &&
      faqIdEl.value.trim() &&
      questionsEl.value.trim()
    ) {
      const questionsText = questionsEl.value.trim();
      const questions = questionsText
        .split("\n")
        .filter((q) => q.trim() !== "");

      if (questions.length > 0) {
        validGroups.push({
          groupId: group.id,
          faqId: faqIdEl.value.trim(),
          instructions: instructionsEl ? instructionsEl.value.trim() : "",
          questions: questions,
        });
      }
    }
  }

  if (validGroups.length === 0) {
    showToast("No valid FAQ groups to process", "error");
    return;
  }

  // Calculate total questions
  const totalQuestions = validGroups.reduce(
    (sum, g) => sum + g.questions.length,
    0
  );

  isProcessing = true;
  document.getElementById("processBtn").disabled = true;
  document.getElementById("progressCard").classList.add("active");
  document.getElementById("resultsCard").classList.remove("active");

  baseURL = document.getElementById("baseURL").value.trim();

  processedQuestions = [];
  let totalAPICalls = 0;
  let currentQuestionIndex = 0;

  try {
    for (const group of validGroups) {
      for (let i = 0; i < group.questions.length; i++) {
        const question = group.questions[i].trim();
        currentQuestionIndex++;

        updateProgress(
          currentQuestionIndex,
          totalQuestions,
          `[FAQ ${group.faqId}] Processing: ${question.substring(0, 30)}...`,
          totalAPICalls
        );

        try {
          const questionData = await processQuestion(
            question,
            currentQuestionIndex,
            group.instructions,
            group.faqId
          );
          questionData.faqId = group.faqId;
          questionData.groupId = group.groupId;
          processedQuestions.push(questionData);

          totalAPICalls++;
        } catch (error) {
          console.error(
            `Error processing question ${currentQuestionIndex}:`,
            error
          );
          showToast(
            `Error on Q${currentQuestionIndex}: ${error.message}`,
            "error"
          );

          processedQuestions.push({
            index: currentQuestionIndex,
            originalQuestion: question,
            faqId: group.faqId,
            groupId: group.groupId,
            error: error.message,
            arabic: {
              question: "",
              tags: [],
              synonyms: [],
              responses: [],
              questionId: null,
            },
            english: {
              question: "",
              tags: [],
              synonyms: [],
              responses: [],
              questionId: null,
            },
            apiCall: {
              status: "error",
              error: error.message,
            },
          });
          totalAPICalls++;
        }
      }
    }

    updateProgress(totalQuestions, totalQuestions, "Complete!", totalAPICalls);
    showToast("Processing complete!", "success");
    displayResults();
  } catch (error) {
    showToast("Processing failed: " + error.message, "error");
  } finally {
    isProcessing = false;
    document.getElementById("processBtn").disabled = false;
    document.getElementById("progressCard").classList.remove("active");
    document.getElementById("resultsCard").classList.add("active");
  }
}

async function processQuestion(question, index, instructions = "", faqId = "") {
  const provider = document.getElementById("aiProvider").value;
  const model = document.getElementById("aiModel").value;
  const apiKey = document.getElementById("apiKey").value;

  const questionData = {
    index: index,
    originalQuestion: question,
    faqId: faqId,
    arabic: {
      question: "",
      questionId: null,
      tags: [],
      synonyms: [],
      responses: [],
    },
    english: {
      question: "",
      questionId: null,
      tags: [],
      synonyms: [],
      responses: [],
    },
    apiCall: {
      status: "pending",
      error: null,
    },
  };

  // Generate AI content
  const aiContent = await generateAIContent(
    question,
    provider,
    model,
    apiKey,
    instructions
  );

  questionData.arabic.question = aiContent.arabic.question;
  questionData.arabic.tags = aiContent.arabic.tags || [];
  questionData.arabic.synonyms = aiContent.arabic.synonyms || [];
  questionData.arabic.responses = aiContent.arabic.responses || [];

  questionData.english.question = aiContent.english.question;
  questionData.english.tags = aiContent.english.tags || [];
  questionData.english.synonyms = aiContent.english.synonyms || [];
  questionData.english.responses = aiContent.english.responses || [];

  // Submit to API using the unified endpoint
  await submitFAQQuestion(questionData, faqId);

  return questionData;
}

async function generateAIContent(
  question,
  provider,
  model,
  apiKey,
  instructions = ""
) {
  const contextSection = instructions
    ? `\n\nContext/Category Information:\n${instructions}\n`
    : "";

  const prompt = `You are an expert FAQ content generator optimized for Rule-Based FAQ Search Systems.

Given this FAQ question: "${question}"${contextSection}

## HOW THE FAQ SEARCH SYSTEM WORKS

The search system looks for FAQs in this priority order:
1. **EXACT + PHRASE Search** (Highest Priority) - Searches in: Main Question + All Synonyms
2. **Stemmed Search** (Medium Priority) - Searches using word roots
3. **Tags Search** (Lowest Priority) - Searches in general keywords

## GENERATION GUIDELINES

### QUESTIONS - Best Practices:
✅ Write as the customer would ACTUALLY ask (natural language)
✅ Keep it SHORT and DIRECT (under 10 words)
✅ Use colloquial/common phrasing
❌ Avoid overly long questions with unnecessary details

### SYNONYMS - Strategy for Maximum Match Rate (10 synonyms):
The synonyms are the MOST IMPORTANT element! They must cover ALL ways a customer might ask the same question.

Distribution Strategy (10 synonyms):
| #   | Type                    | Description                                      |
|-----|-------------------------|--------------------------------------------------|
| 1-2 | Direct question forms   | Alternative ways to ask the same question        |
| 3-4 | Keywords/phrases        | Key terms without question format                |
| 5-6 | Dialect variations      | Gulf Arabic, Egyptian, Levantine, etc.           |
| 7-8 | Alternative phrasings   | Different word choices, formal/informal          |
| 9-10| Common misspellings/abbr| Typos users commonly make, shortcuts             |

Arabic Dialect Examples:
- Gulf: "متى تشتغلون؟" 
- Levantine: "ايمتى بتفتحو؟"
- Egyptian: "بتفتحوا امتى؟"

### TAGS - Rules:
Tags are single ROOT WORDS for fallback search.
✅ Single words only (NOT phrases)
✅ Root form without articles ("عمل" not "العمل")
✅ Core concept words
✅ MINIMUM 3 characters per tag
❌ No compound phrases
❌ No articles (ال, the, a, an)
❌ No conjugated verbs (use infinitive/root)
❌ No tags shorter than 3 characters

Example Tags for "What are your working hours?":
- Arabic: ["ساعات", "عمل", "دوام", "فتح", "وقت"]
- English: ["hours", "work", "schedule", "open", "time"]

### RESPONSES:
Generate 2 varied responses for diversity:
- Response 1: Direct and concise
- Response 2: Slightly more detailed/friendly

## OUTPUT FORMAT

Respond with ONLY this JSON (no additional text):

{
  "arabic": {
    "question": "Short, direct question as customer would ask in Arabic",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "synonyms": ["syn1", "syn2", "syn3", "syn4", "syn5", "syn6", "syn7", "syn8", "syn9", "syn10"],
    "responses": ["Response 1", "Response 2"]
  },
  "english": {
    "question": "Short, direct question as customer would ask in English",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "synonyms": ["syn1", "syn2", "syn3", "syn4", "syn5", "syn6", "syn7", "syn8", "syn9", "syn10"],
    "responses": ["Response 1", "Response 2"]
  }
}

CRITICAL REQUIREMENTS:
1. ⚠️ MINIMUM LENGTH: ALL text (questions, tags, synonyms, responses) MUST be at least 3 characters long. No exceptions!
2. Question: Short (<10 words), natural customer language, minimum 3 characters
3. Tags: Exactly 5 single ROOT words, each tag MUST be at least 3 characters
4. Synonyms: Exactly 10, each synonym MUST be at least 3 characters
5. Responses: Exactly 2 comprehensive helpful answers, minimum 3 characters each
6. Cover Arabic dialects in synonyms (Gulf, Egyptian, Levantine)
7. Include common misspellings/typos users make (but keep them 3+ characters)
${
  instructions
    ? "8. IMPORTANT: Apply the provided context/category information for accuracy."
    : ""
}`;

  let response, data, content;

  try {
    if (provider === "openai") {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful FAQ assistant. Always respond with valid JSON only.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `OpenAI API error: ${response.status}`
        );
      }

      data = await response.json();
      content = data.choices[0].message.content.trim();
    } else if (provider === "gemini") {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful FAQ assistant. Always respond with valid JSON only.\n\n${prompt}`,
                  },
                ],
              },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 3000 },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Gemini API error: ${response.status}`
        );
      }

      data = await response.json();
      if (!data.candidates?.[0]?.content)
        throw new Error("Invalid Gemini response");
      content = data.candidates[0].content.parts[0].text.trim();
    } else if (provider === "openrouter") {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "FAQ Builder",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful FAQ assistant. Always respond with valid JSON only.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `OpenRouter API error: ${response.status}`
        );
      }

      data = await response.json();
      content = data.choices[0].message.content.trim();
    }

    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in AI response");

    let parsedContent;
    try {
      parsedContent = JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw new Error("Failed to parse AI response as JSON");
    }

    if (!parsedContent.arabic || !parsedContent.english)
      throw new Error("AI response missing sections");
    if (!parsedContent.arabic.question || !parsedContent.english.question)
      throw new Error("AI response missing questions");

    // Filter out any text shorter than 3 characters (API validation requirement)
    const filterMinLength = (arr) =>
      (arr || []).filter((item) => item && item.length >= 3);

    parsedContent.arabic.tags = filterMinLength(parsedContent.arabic.tags);
    parsedContent.arabic.synonyms = filterMinLength(
      parsedContent.arabic.synonyms
    );
    parsedContent.arabic.responses = filterMinLength(
      parsedContent.arabic.responses
    );
    parsedContent.english.tags = filterMinLength(parsedContent.english.tags);
    parsedContent.english.synonyms = filterMinLength(
      parsedContent.english.synonyms
    );
    parsedContent.english.responses = filterMinLength(
      parsedContent.english.responses
    );

    // Validate questions have minimum length
    if (
      parsedContent.arabic.question &&
      parsedContent.arabic.question.length < 3
    ) {
      console.warn("Arabic question too short, keeping original");
    }
    if (
      parsedContent.english.question &&
      parsedContent.english.question.length < 3
    ) {
      console.warn("English question too short, keeping original");
    }

    return parsedContent;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

// Submit FAQ question using the unified API endpoint
async function submitFAQQuestion(questionData, faqId = "") {
  const assistantCode = document.getElementById("assistantCode").value.trim();
  const versionCode = document.getElementById("versionCode").value.trim();
  const jwt = document.getElementById("jwt").value.trim();

  // Use faqId from parameter if provided, otherwise from questionData
  const targetFaqId = faqId || questionData.faqId;

  // Validate that we have content for at least one language
  if (!questionData.arabic.question && !questionData.english.question) {
    questionData.apiCall.status = "error";
    questionData.apiCall.error = "No questions generated";
    return;
  }

  // Format responses with proper formatting (\n, \t)
  const formatResponse = (responses) => {
    return responses.map((resp) => {
      // Ensure responses are properly formatted
      return resp;
    });
  };

  // Build the request body
  const requestBody = {
    questions: {
      1: questionData.arabic.question || "",
      2: questionData.english.question || "",
    },
    tags: {
      1: questionData.arabic.tags || [],
      2: questionData.english.tags || [],
    },
    synonyms: {
      1: questionData.arabic.synonyms || [],
      2: questionData.english.synonyms || [],
    },
    responses: {
      1: formatResponse(questionData.arabic.responses || []),
      2: formatResponse(questionData.english.responses || []),
    },
  };

  const url = `${baseURL}/api/knowledge_ai/${assistantCode}/${versionCode}/faq/${targetFaqId}/question`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Failed: ${response.status}`);
    }

    const result = await response.json();

    // Store the question IDs from the response
    if (result.questionIds) {
      questionData.arabic.questionId = result.questionIds["1"] || null;
      questionData.english.questionId = result.questionIds["2"] || null;
    }

    questionData.apiCall.status = "success";
    questionData.apiCall.error = null;
  } catch (error) {
    questionData.apiCall.status = "error";
    questionData.apiCall.error = error.message;
    throw error;
  }
}

// Retry a failed question submission
async function retryQuestion(qIndex) {
  const question = processedQuestions[qIndex];

  showToast("Retrying...", "info");

  try {
    await submitFAQQuestion(question, question.faqId);
    showToast("Retry successful!", "success");
    displayResults();
  } catch (error) {
    showToast("Retry failed: " + error.message, "error");
  }
}

function displayResults() {
  const resultsDiv = document.getElementById("questionResults");
  let html = "";

  let totalSuccess = 0,
    totalError = 0,
    totalAPICalls = 0;

  processedQuestions.forEach((q, index) => {
    const isSuccess = q.apiCall.status === "success";
    const isError = q.apiCall.status === "error";

    if (isSuccess) totalSuccess++;
    if (isError) totalError++;
    totalAPICalls++;

    const overallStatus = isSuccess ? "success" : isError ? "error" : "pending";

    const retryBtn = isError
      ? `<button class="api-retry" onclick="event.stopPropagation(); retryQuestion(${index})" style="margin-left: 10px;">↻ Retry</button>`
      : "";

    html += `
      <div class="question-item" id="q-${index}">
        <div class="question-header" onclick="toggleQuestion(${index})">
          <div class="question-num">${q.index}</div>
          <div class="question-info">
            <div class="question-text">${escapeHtml(q.originalQuestion)}</div>
            <div class="question-meta">
              <span class="faq-badge">FAQ: ${escapeHtml(
                q.faqId || "N/A"
              )}</span>
              AR ID: ${q.arabic.questionId || "N/A"} | EN ID: ${
      q.english.questionId || "N/A"
    }
              ${
                q.apiCall.error
                  ? ` | Error: ${escapeHtml(q.apiCall.error)}`
                  : ""
              }
            </div>
          </div>
          <span class="question-status ${overallStatus}">
            ${isSuccess ? "✓ Complete" : isError ? "✕ Failed" : "⏳ Pending"}
          </span>
          ${retryBtn}
          <span class="question-expand">▼</span>
        </div>
        <div class="question-details">
          <div class="lang-tabs">
            <button class="lang-tab active" onclick="event.stopPropagation(); switchLang(${index}, 'arabic')">العربية</button>
            <button class="lang-tab" onclick="event.stopPropagation(); switchLang(${index}, 'english')">English</button>
          </div>
          ${renderLanguageContent(q, "arabic", index, true)}
          ${renderLanguageContent(q, "english", index, false)}
        </div>
      </div>
    `;
  });

  if (!html)
    html =
      '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No results to display</div></div>';

  resultsDiv.innerHTML = html;
  document.getElementById("totalQuestions").textContent =
    processedQuestions.length;
  document.getElementById("successCount").textContent = totalSuccess;
  document.getElementById("errorCount").textContent = totalError;
  document.getElementById("totalAPICalls").textContent = totalAPICalls;
  document.getElementById("retryBtn").style.display =
    totalError > 0 ? "" : "none";
}

function renderLanguageContent(q, lang, qIndex, isActive) {
  const langData = q[lang];

  // Format responses with proper line breaks for display
  const formatResponseForDisplay = (resp) => {
    if (!resp) return "";
    return escapeHtml(resp)
      .replace(/\\n/g, "<br>")
      .replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  };

  return `
    <div class="lang-content ${
      isActive ? "active" : ""
    }" id="lang-${qIndex}-${lang}">
      <div class="detail-grid">
        <div class="detail-section full">
          <div class="detail-title">Question (ID: ${
            langData.questionId || "N/A"
          })</div>
          <div class="detail-content">${
            escapeHtml(langData.question) ||
            '<em style="color: var(--gray-500);">Not generated</em>'
          }</div>
        </div>
        
        <div class="detail-section">
          <div class="detail-title">Tags (${langData.tags.length})</div>
          <div class="detail-content">
            <div class="tag-list">
              ${
                langData.tags
                  .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
                  .join("") || '<em style="color: var(--gray-500);">None</em>'
              }
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <div class="detail-title">Responses (${
            langData.responses.length
          })</div>
          <div class="detail-content">
            ${
              langData.responses
                .map(
                  (r, i) =>
                    `<div style="margin-bottom: 10px;"><strong>${
                      i + 1
                    }.</strong> ${formatResponseForDisplay(r)}</div>`
                )
                .join("") || '<em style="color: var(--gray-500);">None</em>'
            }
          </div>
        </div>
        
        <div class="detail-section full">
          <div class="detail-title">Synonyms (${langData.synonyms.length})</div>
          <div class="detail-content">
            <div class="synonym-list">
              ${
                langData.synonyms
                  .map(
                    (s, i) =>
                      `<div class="synonym-item"><span class="synonym-num">${
                        i + 1
                      }.</span>${escapeHtml(s)}</div>`
                  )
                  .join("") || '<em style="color: var(--gray-500);">None</em>'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleQuestion(index) {
  document.getElementById(`q-${index}`).classList.toggle("open");
}

function switchLang(qIndex, lang) {
  const tabs = document.querySelectorAll(`#q-${qIndex} .lang-tab`);
  tabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
  document
    .getElementById(`lang-${qIndex}-arabic`)
    .classList.toggle("active", lang === "arabic");
  document
    .getElementById(`lang-${qIndex}-english`)
    .classList.toggle("active", lang === "english");
}

// Retry all failed questions
async function retryAllFailed() {
  if (!confirm("Retry all failed questions?")) return;

  showToast("Retrying all failed...", "info");

  for (let qIndex = 0; qIndex < processedQuestions.length; qIndex++) {
    if (processedQuestions[qIndex].apiCall.status === "error") {
      await retryQuestion(qIndex);
    }
  }

  showToast("Retry complete!", "success");
  displayResults();
}

function exportResults() {
  // Collect unique faqIds from processed questions
  const faqIds = [
    ...new Set(processedQuestions.map((q) => q.faqId).filter(Boolean)),
  ];

  const exportData = {
    timestamp: new Date().toISOString(),
    configuration: {
      assistantCode: document.getElementById("assistantCode").value,
      versionCode: document.getElementById("versionCode").value,
      faqIds: faqIds,
    },
    questions: processedQuestions,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `faq-report-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Report exported!", "success");
}

function clearAll() {
  if (!confirm("Clear all data and results?")) return;

  // Clear all FAQ group inputs
  faqGroups.forEach((group) => {
    const faqIdEl = document.getElementById(`faqId-${group.id}`);
    const instructionsEl = document.getElementById(`instructions-${group.id}`);
    const questionsEl = document.getElementById(`questions-${group.id}`);
    if (faqIdEl) faqIdEl.value = "";
    if (instructionsEl) instructionsEl.value = "";
    if (questionsEl) questionsEl.value = "";
  });

  document.getElementById("resultsCard").classList.remove("active");
  processedQuestions = [];
  updateSteps();
  showToast("Cleared", "info");
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[
        m
      ])
  );
}
