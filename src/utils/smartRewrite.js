// Pattern-based rules engine for Smart Rewrite (No API)

const WEAK_PHRASES = [
  { match: /worked on website/gi, replace: "Built and optimized a responsive website" },
  { match: /handled customers?/gi, replace: "Managed customer queries and resolved issues efficiently" },
  { match: /helped team/gi, replace: "Collaborated with cross-functional teams to deliver results" },
  { match: /made a/gi, replace: "Engineered a" },
  { match: /did /gi, replace: "Executed " },
  { match: /responsible for/gi, replace: "Spearheaded" },
  { match: /in charge of/gi, replace: "Directed" },
  { match: /good at/gi, replace: "Proficient in" }
];

export const makeItStronger = (text) => {
  if (!text) return text;
  let newText = text;
  WEAK_PHRASES.forEach(rule => {
    newText = newText.replace(rule.match, rule.replace);
  });
  return newText;
};

export const shortenSummary = (text) => {
  if (!text) return text;
  // Simple heuristic: keep only the first 2-3 sentences.
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length > 2) {
    return sentences.slice(0, 2).join(' ').trim();
  }
  return text;
};

export const professionalTone = (text) => {
  if (!text) return text;
  // Capitalize first letter of sentences, ensure it ends with a period
  let polished = text.replace(/(^\w|\.\s+\w)/gi, m => m.toUpperCase());
  if (!/[.!?]$/.test(polished.trim())) {
    polished = polished.trim() + '.';
  }
  return polished;
};

export const addKeywords = (text, roleKeywords = []) => {
  if (!text || roleKeywords.length === 0) return text;
  
  // Naive approach: find keywords not in the text, and append a professional sentence containing them.
  const missing = roleKeywords.filter(kw => !text.toLowerCase().includes(kw.toLowerCase()));
  
  if (missing.length > 0) {
    const toAdd = missing.slice(0, 3).join(', ');
    return `${text} Leveraged expertise in ${toAdd} to drive project success.`;
  }
  
  return text;
};
