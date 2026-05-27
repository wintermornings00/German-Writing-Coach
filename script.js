const input = document.querySelector("#german-input");
const checkButton = document.querySelector("#check-btn");
const sampleButton = document.querySelector("#sample-btn");
const clearButton = document.querySelector("#clear-btn");
const promptSelect = document.querySelector("#prompt-select");
const currentPrompt = document.querySelector("#current-prompt");
const scoreValue = document.querySelector("#score-value");
const scoreFill = document.querySelector("#score-fill");
const correctionsList = document.querySelector("#corrections-list");
const strengthsList = document.querySelector("#strengths-list");
const rewriteOutput = document.querySelector("#rewrite-output");
const historyList = document.querySelector("#history-list");
const themeRating = document.querySelector("#theme-rating");
const themeFeedback = document.querySelector("#theme-feedback");
const themeBox = document.querySelector(".theme-box");
const levelRating = document.querySelector("#level-rating");
const levelFeedback = document.querySelector("#level-feedback");
const levelBox = document.querySelector(".level-box");

const sampleText =
  "Ich heisse Yusra. ich bin 20 Jahre alt. Ich komme aus Indien. Ich lerne Deutsch weil ich in Deutschland studieren moechte.";

const themeProfiles = {
  "Introduce yourself in 3-5 German sentences.": {
    name: "Introduce yourself",
    keywords: [
      "ich",
      "heiße",
      "heisse",
      "bin",
      "jahre",
      "komme",
      "wohne",
      "lerne",
      "mag",
      "hobby",
      "name",
      "student",
      "studentin",
    ],
    missingTip: "Try including your name, age, where you are from, what you do, or why you learn German.",
  },
  "Describe your daily routine in German.": {
    name: "Daily routine",
    keywords: [
      "morgen",
      "aufstehen",
      "stehe",
      "frühstück",
      "schule",
      "arbeit",
      "mittag",
      "abend",
      "gehe",
      "mache",
      "lerne",
      "schlafe",
      "tag",
      "routine",
    ],
    missingTip: "Try describing actions in your day, such as waking up, eating, studying, working, or sleeping.",
  },
  "Write about what you did yesterday in German.": {
    name: "Past tense practice",
    keywords: [
      "gestern",
      "war",
      "hatte",
      "habe",
      "bin",
      "gelernt",
      "bestellt",
      "ging",
      "machte",
      "lernte",
      "gegessen",
      "getrunken",
      "gemacht",
      "gesehen",
      "besucht",
    ],
    missingTip: "Try using 'gestern' and past-time verbs like 'ich habe gemacht', 'ich bin gegangen', or 'ich war'.",
  },
  "Explain what food you like and dislike in German.": {
    name: "Food preferences",
    keywords: [
      "essen",
      "trinken",
      "mag",
      "liebe",
      "gern",
      "nicht",
      "pizza",
      "brot",
      "reis",
      "nudeln",
      "gemüse",
      "obst",
      "kaffee",
      "tee",
      "wasser",
      "fleisch",
    ],
    missingTip: "Try naming foods or drinks and saying what you like, dislike, or prefer.",
  },
  "Describe your family or friends in German.": {
    name: "Family and friends",
    keywords: [
      "familie",
      "mutter",
      "vater",
      "eltern",
      "bruder",
      "schwester",
      "freund",
      "freundin",
      "nett",
      "lustig",
      "heißt",
      "heisse",
      "heiße",
      "alt",
      "zusammen",
    ],
    missingTip: "Try naming a family member or friend and describing their age, personality, or what you do together.",
  },
  "Write about your hobbies and free time in German.": {
    name: "Hobbies",
    keywords: [
      "hobby",
      "hobbys",
      "freizeit",
      "gern",
      "spiele",
      "lesen",
      "musik",
      "sport",
      "fußball",
      "tanzen",
      "kochen",
      "filme",
      "wochenende",
      "oft",
    ],
    missingTip: "Try saying what you like to do in your free time, how often you do it, and why you like it.",
  },
  "Describe your school, college, or work in German.": {
    name: "School or work",
    keywords: [
      "schule",
      "universität",
      "college",
      "arbeit",
      "job",
      "studiere",
      "lerne",
      "arbeite",
      "lehrer",
      "kurs",
      "fach",
      "büro",
      "kollegen",
      "schwer",
      "interessant",
    ],
    missingTip: "Try describing where you study or work, what you do there, and whether you like it.",
  },
  "Write about the weather and your plans for today in German.": {
    name: "Weather and plans",
    keywords: [
      "wetter",
      "sonnig",
      "regnet",
      "kalt",
      "warm",
      "heiß",
      "windig",
      "heute",
      "plan",
      "pläne",
      "werde",
      "gehe",
      "mache",
      "bleibe",
      "später",
    ],
    missingTip: "Try mentioning today's weather and what you plan to do because of it.",
  },
  "Describe your home, room, or city in German.": {
    name: "Home or city",
    keywords: [
      "haus",
      "wohnung",
      "zimmer",
      "stadt",
      "dorf",
      "wohne",
      "küche",
      "bett",
      "fenster",
      "straße",
      "park",
      "groß",
      "klein",
      "ruhig",
      "schön",
    ],
    missingTip: "Try describing where you live, what your room or city is like, and what is nearby.",
  },
  "Write a short dialogue for shopping in German.": {
    name: "Shopping dialogue",
    keywords: [
      "kaufen",
      "kostet",
      "preis",
      "euro",
      "bitte",
      "danke",
      "haben",
      "möchte",
      "nehme",
      "geschäft",
      "laden",
      "größe",
      "farbe",
      "zahlen",
      "karte",
    ],
    missingTip: "Try writing a buyer/seller exchange with price, item, request, and thanks.",
  },
  "Write about a trip or holiday in German.": {
    name: "Travel",
    keywords: [
      "reise",
      "urlaub",
      "ferien",
      "zug",
      "flug",
      "hotel",
      "stadt",
      "meer",
      "berge",
      "besucht",
      "gefahren",
      "geflogen",
      "gesehen",
      "schön",
      "reise",
    ],
    missingTip: "Try saying where you went or want to go, how you traveled, and what you saw.",
  },
  "Explain your opinion about learning German in German.": {
    name: "Opinion",
    keywords: [
      "meinung",
      "finde",
      "denke",
      "glaube",
      "deutsch",
      "lernen",
      "sprache",
      "wichtig",
      "schwer",
      "einfach",
      "interessant",
      "weil",
      "aber",
      "nützlich",
      "spaß",
    ],
    missingTip: "Try giving your opinion and at least one reason using words like 'ich finde' and 'weil'.",
  },
  "Write about your weekend plans in German.": {
    name: "Weekend plans",
    keywords: [
      "wochenende",
      "samstag",
      "sonntag",
      "plan",
      "pläne",
      "werde",
      "möchte",
      "gehe",
      "treffe",
      "freunde",
      "familie",
      "kino",
      "essen",
      "lernen",
      "ausruhen",
    ],
    missingTip: "Try mentioning Saturday or Sunday and what you want or plan to do.",
  },
  "Describe a problem and ask for help in German.": {
    name: "Ask for help",
    keywords: [
      "problem",
      "hilfe",
      "helfen",
      "bitte",
      "verstehe",
      "frage",
      "kaputt",
      "krank",
      "verloren",
      "brauche",
      "können",
      "kannst",
      "entschuldigung",
      "wo",
      "wie",
    ],
    missingTip: "Try explaining the problem and asking a polite question for help.",
  },
  "Write an email invitation to a friend in German.": {
    name: "Invitation email",
    keywords: [
      "liebe",
      "lieber",
      "hallo",
      "einladen",
      "einladung",
      "kommst",
      "party",
      "geburtstag",
      "treffen",
      "samstag",
      "uhr",
      "bei mir",
      "grüße",
      "viele",
      "freund",
    ],
    missingTip: "Try using a greeting, event, day/time, invitation question, and closing.",
  },
};

const levelProfiles = {
  A1: {
    targetWords: 10,
    targetSentences: 2,
    connectorTarget: 0,
    complexityTarget: 0,
    label: "A1",
    expectation: "Clear short sentences with basic verbs are enough at A1.",
  },
  A2: {
    targetWords: 25,
    targetSentences: 3,
    connectorTarget: 1,
    complexityTarget: 1,
    label: "A2",
    expectation: "A2 writing should add more detail, connectors, and everyday descriptions.",
  },
  B1: {
    targetWords: 45,
    targetSentences: 4,
    connectorTarget: 3,
    complexityTarget: 4,
    label: "B1",
    expectation: "B1 writing should be more developed, connected, and precise.",
  },
};

const correctionRules = [
  {
    label: "Spelling",
    pattern: /\bheisse\b/gi,
    replacement: "heiße",
    message: "Use 'heiße' instead of 'heisse' when writing with German characters.",
  },
  {
    label: "Spelling",
    pattern: /\bmoechte\b/gi,
    replacement: "möchte",
    message: "Use 'möchte' instead of 'moechte' when German characters are available.",
  },
  {
    label: "Capitalization",
    pattern: /(^|[.!?]\s+)(ich)\b/g,
    replacement: (match, start) => `${start}Ich`,
    message: "Capitalize the first word of each sentence.",
  },
  {
    label: "Comma",
    pattern: /\bDeutsch\s+weil\b/gi,
    replacement: "Deutsch, weil",
    message: "Put a comma before 'weil' when it introduces a reason.",
  },
  {
    label: "Word order",
    pattern: /\bweil\s+ich\s+(moechte|möchte)\s+([^.!?]+)\b/gi,
    replacement: (match, verb, rest) => `weil ich ${rest.trim()} ${verb === "moechte" ? "möchte" : verb}`,
    message: "After 'weil', the conjugated verb usually goes to the end of the clause.",
  },
  {
    label: "Word order",
    pattern: /\bGestern,\s*ich\b/g,
    replacement: "Gestern habe ich",
    message: "After 'gestern' at the start, use verb-second order: 'Gestern habe ich ...'.",
  },
  {
    label: "Past tense",
    pattern: /(^|[.!?]\s+)ich\s+deutsch\s+gelernt\b/gi,
    replacement: (match, start) => `${start}ich habe Deutsch gelernt`,
    message: "For past tense, use a helper verb: 'ich habe Deutsch gelernt'.",
  },
  {
    label: "Noun capitalization",
    pattern: /\bdeutsch gelernt\b/gi,
    replacement: "Deutsch gelernt",
    message: "When you mean the German language, capitalize it: 'Deutsch'.",
  },
  {
    label: "Past tense",
    pattern: /\bich\s+das\s+essen\s+befehlt\b/gi,
    replacement: "ich habe das Essen bestellt",
    message: "For ordering food, say 'ich habe das Essen bestellt'.",
  },
  {
    label: "Vocabulary",
    pattern: /\bbefehlt\b/gi,
    replacement: "bestellt",
    message: "'Befehlt' means commanded. For ordering food, use 'bestellt'.",
  },
  {
    label: "Noun capitalization",
    pattern: /\bdas essen\b/gi,
    replacement: "das Essen",
    message: "German nouns are capitalized, so write 'das Essen'.",
  },
  {
    label: "Expression",
    pattern: /\bnur ein bisschen zeit(?!\s+gehabt)\b/gi,
    replacement: "nur ein bisschen Zeit gehabt",
    message: "To say you had only a little time, use 'nur ein bisschen Zeit gehabt'.",
  },
  {
    label: "Noun capitalization",
    pattern: /\bzeit\b/gi,
    replacement: "Zeit",
    message: "German nouns are capitalized, so write 'Zeit'.",
  },
  {
    label: "Comma",
    pattern: /\bgelernt\s+aber\b/gi,
    replacement: "gelernt, aber",
    message: "Put a comma before 'aber' when it connects two clauses.",
  },
  {
    label: "Word choice",
    pattern: /\bAlso,\s*ich habe\b/gi,
    replacement: "Außerdem habe ich",
    message: "For 'also/additionally', use 'außerdem'. German 'also' usually means 'so/therefore'.",
  },
  {
    label: "Word order",
    pattern: /\bAußerdem,\s*ich habe\b/gi,
    replacement: "Außerdem habe ich",
    message: "After 'außerdem', use verb-second order: 'Außerdem habe ich ...'.",
  },
  {
    label: "Verb form",
    pattern: /\bich\s+sein\b/gi,
    replacement: "ich bin",
    message: "With 'ich', use 'bin' instead of 'sein'.",
  },
  {
    label: "Verb form",
    pattern: /\bich\s+haben\b/gi,
    replacement: "ich habe",
    message: "With 'ich', use 'habe' instead of 'haben'.",
  },
  {
    label: "Article",
    pattern: /\bdas\s+Sprache\b/gi,
    replacement: "die Sprache",
    message: "'Sprache' is feminine, so use 'die Sprache'.",
  },
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char];
  });
}

function splitSentences(text) {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function normalizeSpacing(text) {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeGerman(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

function assessTheme(text, prompt) {
  const profile = themeProfiles[prompt];
  const normalizedText = normalizeGerman(text);
  const matchedKeywords = profile.keywords.filter((keyword) => normalizedText.includes(normalizeGerman(keyword)));
  const matchCount = new Set(matchedKeywords).size;
  const themeScore = Math.min(100, Math.round((matchCount / 4) * 100));

  if (!text.trim()) {
    return {
      score: 0,
      rating: "Not checked yet",
      status: "",
      feedback: "The app will check whether your answer matches the selected prompt.",
    };
  }

  if (themeScore >= 75) {
    return {
      score: themeScore,
      rating: "On theme",
      status: "good",
      feedback: `This matches "${profile.name}". Topic words found: ${matchedKeywords.slice(0, 5).join(", ")}.`,
    };
  }

  if (themeScore >= 35) {
    return {
      score: themeScore,
      rating: "Partly on theme",
      status: "partial",
      feedback: `Some parts match "${profile.name}", but it needs more prompt-specific detail. ${profile.missingTip}`,
    };
  }

  return {
    score: themeScore,
    rating: "Off theme",
    status: "off",
    feedback: `This does not seem to answer "${profile.name}" yet. ${profile.missingTip}`,
  };
}

function assessLevel(text, level, stats) {
  const profile = levelProfiles[level];

  if (!text.trim()) {
    return {
      score: 0,
      rating: "Not checked yet",
      status: "",
      feedback: "Choose a level to judge the writing against A1, A2, or B1 expectations.",
    };
  }

  let levelScore = 0;
  levelScore += scorePart(stats.wordCount, profile.targetWords, 30);
  levelScore += scorePart(stats.sentenceCount, profile.targetSentences, 20);
  levelScore += scorePart(stats.connectorCount, profile.connectorTarget, 18);
  levelScore += scorePart(stats.complexityCount, profile.complexityTarget, 22);
  if (stats.hasPunctuation) levelScore += 5;
  if (stats.hasGermanChars) levelScore += 5;
  levelScore = Math.round(Math.min(100, levelScore));

  const tips = [];
  if (stats.wordCount < profile.targetWords) tips.push(`write closer to ${profile.targetWords} words`);
  if (stats.sentenceCount < profile.targetSentences) tips.push(`use about ${profile.targetSentences} sentences`);
  if (stats.connectorCount < profile.connectorTarget) tips.push("add connectors like weil, aber, dann, deshalb, or außerdem");
  if (stats.complexityCount < profile.complexityTarget) tips.push("add more detail or stronger tense control");

  if (levelScore >= 75) {
    return {
      score: levelScore,
      rating: `Good ${profile.label} fit`,
      status: "good",
      feedback: `${profile.expectation} This answer fits the selected level well.`,
    };
  }

  if (levelScore >= 45) {
    return {
      score: levelScore,
      rating: `Developing ${profile.label}`,
      status: "partial",
      feedback: `${profile.expectation} To improve, ${tips.slice(0, 2).join(" and ")}.`,
    };
  }

  return {
    score: levelScore,
    rating: `Below ${profile.label}`,
    status: "off",
    feedback: `${profile.expectation} To reach this level, ${tips.slice(0, 3).join(", ")}.`,
  };
}

function scorePart(value, target, weight) {
  if (target === 0) return weight;
  return Math.min(value / target, 1) * weight;
}

function analyzeText(text, prompt, selectedLevel) {
  const trimmed = text.trim();
  const words = trimmed.match(/[A-Za-zÄÖÜäöüß]+/g) || [];
  const sentences = splitSentences(trimmed);
  const corrections = [];
  let rewrite = trimmed;
  const theme = assessTheme(trimmed, prompt);

  correctionRules.forEach((rule) => {
    if (rule.pattern.test(rewrite)) {
      const updatedRewrite = rewrite.replace(rule.pattern, rule.replacement);
      if (updatedRewrite !== rewrite) {
        corrections.push(rule);
        rewrite = updatedRewrite;
      }
    }
    rule.pattern.lastIndex = 0;
  });

  const startsWithCapital = sentences.filter((sentence) => /^[A-ZÄÖÜ]/.test(sentence)).length;
  const hasGermanChars = /[ÄÖÜäöüß]/.test(trimmed);
  const hasVerb = /\b(bin|bist|ist|sind|seid|habe|hast|hat|haben|lerne|lernst|lernt|komme|kommst|kommt|mag|möchte|gehe|ging|war|hatte)\b/i.test(
    trimmed
  );
  const connectorMatches = trimmed.match(/\b(weil|und|aber|denn|dass|wenn|dann|deshalb|außerdem|danach|trotzdem)\b/gi) || [];
  const complexityMatches = trimmed.match(/\b(weil|dass|wenn|deshalb|außerdem|gestern|habe|hatte|war|wurde|gegangen|gemacht|gelernt|bestellt)\b/gi) || [];
  const hasConnectors = connectorMatches.length > 0;
  const hasPunctuation = /[.!?]$/.test(trimmed);
  const levelAssessment = assessLevel(trimmed, selectedLevel, {
    wordCount: words.length,
    sentenceCount: sentences.length,
    connectorCount: new Set(connectorMatches.map((word) => word.toLowerCase())).size,
    complexityCount: new Set(complexityMatches.map((word) => word.toLowerCase())).size,
    hasPunctuation,
    hasGermanChars,
  });

  if (words.length < 8) {
    corrections.push({
      label: "Length",
      message: "Write at least 8 words so there is enough German to score.",
    });
  }

  if (sentences.length > 0 && startsWithCapital < sentences.length) {
    corrections.push({
      label: "Capitalization",
      message: "Start every German sentence with a capital letter.",
    });
  }

  if (!hasPunctuation && trimmed.length > 0) {
    corrections.push({
      label: "Punctuation",
      message: "End your final sentence with '.', '!' or '?'.",
    });
    rewrite += ".";
  }

  const strengths = [];
  if (words.length >= 20) strengths.push("Good length: you wrote enough for meaningful practice.");
  if (sentences.length >= 2) strengths.push("Nice structure: your answer uses more than one sentence.");
  if (hasGermanChars) strengths.push("Good German spelling: you used characters like ä, ö, ü, or ß.");
  if (hasVerb) strengths.push("Good sentence base: you used a recognizable German verb.");
  if (hasConnectors) strengths.push("Good complexity: you used a connector such as weil, und, aber, dass, or wenn.");
  if (theme.score >= 75) strengths.push("Good relevance: your answer matches the selected prompt.");
  if (levelAssessment.score >= 75) strengths.push(`Good level fit: your answer works well for ${selectedLevel}.`);

  if (theme.score < 35 && trimmed.length > 0) {
    corrections.push({
      label: "Theme",
      message: theme.feedback,
    });
  }

  let score = 35;
  score += Math.min(words.length, 35);
  score += Math.min(sentences.length * 7, 21);
  if (hasVerb) score += 12;
  if (hasConnectors) score += 8;
  if (hasGermanChars) score += 6;
  if (hasPunctuation) score += 5;
  score -= corrections.length * 8;
  score = Math.round(score * 0.55 + theme.score * 0.2 + levelAssessment.score * 0.25);
  if (levelAssessment.score < 45) score = Math.min(score, 68);
  if (levelAssessment.score >= 45 && levelAssessment.score < 75) score = Math.min(score, 84);
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    corrections,
    strengths: strengths.length ? strengths : ["You started writing, and that is the main habit to build."],
    rewrite: buildRewriteMessage(trimmed, rewrite),
    theme,
    level: levelAssessment,
    wordCount: words.length,
  };
}

function buildRewriteMessage(original, rewrite) {
  const cleanOriginal = normalizeSpacing(original);
  const cleanRewrite = normalizeSpacing(rewrite);

  if (!cleanOriginal) {
    return "Write a few German sentences to see a suggested rewrite.";
  }

  if (cleanOriginal === cleanRewrite) {
    return "No major rewrite needed. Your sentence is already clear for this practice level.";
  }

  return cleanRewrite;
}

function renderList(element, items, type) {
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    if (typeof item === "string") {
      li.textContent = item;
    } else {
      const tagClass = type === "correction" ? "error" : "good";
      li.innerHTML = `<span class="tag ${tagClass}">${escapeHtml(item.label)}</span>${escapeHtml(item.message)}`;
    }
    element.appendChild(li);
  });
}

function saveHistory(score, text) {
  const currentHistory = JSON.parse(localStorage.getItem("deutschCoachHistory") || "[]");
  const entry = {
    score,
    preview: text.trim().slice(0, 70),
    date: new Date().toLocaleDateString(),
  };
  localStorage.setItem("deutschCoachHistory", JSON.stringify([entry, ...currentHistory].slice(0, 5)));
}

function renderHistory() {
  const currentHistory = JSON.parse(localStorage.getItem("deutschCoachHistory") || "[]");
  historyList.innerHTML = "";

  if (!currentHistory.length) {
    const li = document.createElement("li");
    li.textContent = "No practice attempts yet.";
    historyList.appendChild(li);
    return;
  }

  currentHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.score}/100 on ${entry.date}: ${entry.preview}`;
    historyList.appendChild(li);
  });
}

function checkWriting() {
  const text = input.value;
  const selectedLevel = document.querySelector('input[name="level"]:checked').value;
  const result = analyzeText(text, promptSelect.value, selectedLevel);

  scoreValue.textContent = `${result.score}`;
  scoreFill.style.width = `${result.score}%`;
  themeRating.textContent = result.theme.rating;
  themeFeedback.textContent = result.theme.feedback;
  themeBox.classList.remove("off", "partial");
  if (result.theme.status) themeBox.classList.add(result.theme.status);
  levelRating.textContent = result.level.rating;
  levelFeedback.textContent = result.level.feedback;
  levelBox.classList.remove("off", "partial");
  if (result.level.status) levelBox.classList.add(result.level.status);
  renderList(correctionsList, result.corrections.length ? result.corrections : ["No major beginner issues found."], "correction");
  renderList(strengthsList, result.strengths, "strength");
  rewriteOutput.textContent = result.rewrite;

  if (text.trim()) {
    saveHistory(result.score, text);
    renderHistory();
  }
}

promptSelect.addEventListener("change", () => {
  currentPrompt.textContent = promptSelect.value;
});

checkButton.addEventListener("click", checkWriting);

sampleButton.addEventListener("click", () => {
  input.value = sampleText;
  input.focus();
});

clearButton.addEventListener("click", () => {
  input.value = "";
  scoreValue.textContent = "--";
  scoreFill.style.width = "0%";
  themeRating.textContent = "Not checked yet";
  themeFeedback.textContent = "The app will check whether your answer matches the selected prompt.";
  themeBox.classList.remove("off", "partial");
  levelRating.textContent = "Not checked yet";
  levelFeedback.textContent = "Choose a level to judge the writing against A1, A2, or B1 expectations.";
  levelBox.classList.remove("off", "partial");
  renderList(correctionsList, ["Write something in German, then press Check writing."], "correction");
  renderList(strengthsList, ["Your feedback will appear here."], "strength");
  rewriteOutput.textContent = "A cleaner version of your text will appear here.";
});

renderHistory();
