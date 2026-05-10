export const KEYWORD_LIBRARY = {
  Developer: ['react', 'git', 'typescript', 'api', 'javascript', 'node', 'python', 'sql', 'css', 'html'],
  Designer: ['figma', 'ui', 'ux', 'wireframe', 'prototyping', 'adobe', 'sketch', 'illustrator', 'design system'],
  Sales: ['crm', 'lead generation', 'negotiation', 'b2b', 'b2c', 'salesforce', 'closing', 'cold calling'],
  Marketing: ['seo', 'sem', 'content', 'social media', 'analytics', 'campaign', 'email marketing', 'google ads'],
  Teacher: ['curriculum', 'instruction', 'mentoring', 'classroom management', 'lesson planning', 'student development'],
  Fresher: ['motivated', 'fast learner', 'academic', 'project', 'teamwork', 'communication', 'problem solving'],
  Student: ['research', 'coursework', 'club', 'leadership', 'gpa', 'extracurricular', 'analytical'],
};

export const ACTION_VERBS = [
  'developed', 'managed', 'created', 'led', 'built', 'improved', 'designed',
  'increased', 'reduced', 'optimized', 'delivered', 'implemented', 'achieved',
  'collaborated', 'analyzed', 'coordinated', 'launched', 'resolved', 'engineered',
  'spearheaded', 'directed', 'executed',
];

export const calculateATSScore = (resumeData) => {
  let score = 0;
  const breakdown = {
    contact: 0,
    summary: 0,
    skills: 0,
    experience: 0,
    education: 0,
    formatting: 10, // Start with full 10pts; apply penalties below
  };
  const feedback = [];
  const warnings = [];
  const missingKeywords = [];

  const { personalInfo, summary, skills, experience, education, certifications, settings } = resumeData;

  // ── 1. Contact + headline: 20pts ──────────────────────────────────
  let contactScore = 0;
  if (personalInfo.fullName && personalInfo.fullName.trim()) contactScore += 5;
  if (personalInfo.email && personalInfo.email.trim()) contactScore += 5;
  if (personalInfo.phone && personalInfo.phone.trim()) contactScore += 5;
  if (personalInfo.links && personalInfo.links.trim()) contactScore += 5;

  if (contactScore < 20) {
    warnings.push({ type: 'error', message: 'Missing contact information — add email, phone, and links for full points.' });
  }
  breakdown.contact = contactScore;
  score += contactScore;

  // Penalty: Missing job title (-10)
  if (!personalInfo.jobTitle || !personalInfo.jobTitle.trim()) {
    feedback.push({ type: 'penalty', message: 'Missing Job Title  (-10 pts)' });
    score -= 10;
  }

  // ── 2. Summary quality: 20pts ─────────────────────────────────────
  let summaryScore = 0;
  const wordCount = summary.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 20) {
    summaryScore = 20;
  } else if (wordCount > 0) {
    summaryScore = 10;
    warnings.push({ type: 'warning', message: `Summary is too short (${wordCount} words). Aim for at least 20 words.` });
  }
  breakdown.summary = summaryScore;
  score += summaryScore;

  // ── 3. Skills relevance: 20pts ────────────────────────────────────
  let skillsScore = 0;
  const roleKeywords = KEYWORD_LIBRARY[settings.role] || KEYWORD_LIBRARY['Developer'];
  const userSkillsText = skills.toLowerCase();

  if (!userSkillsText.trim()) {
    warnings.push({ type: 'error', message: 'Skills section is empty! Add relevant skills.' });
  } else {
    skillsScore = 10; // Base for having any skills

    let foundKeywords = 0;
    roleKeywords.forEach(kw => {
      const inSkills = userSkillsText.includes(kw.toLowerCase());
      const inSummary = summary.toLowerCase().includes(kw.toLowerCase());
      const inExp = experience.some(e => e.bullets.toLowerCase().includes(kw.toLowerCase()));
      if (inSkills || inSummary || inExp) {
        foundKeywords++;
      } else {
        missingKeywords.push(kw);
      }
    });

    if (foundKeywords >= 3) {
      skillsScore += 10;
    } else if (foundKeywords > 0) {
      skillsScore += 5;
    }

    if (foundKeywords === 0) {
      feedback.push({ type: 'penalty', message: `No role-specific keywords found for "${settings.role}"  (-15 pts)` });
      score -= 15;
    }
  }
  breakdown.skills = skillsScore;
  score += skillsScore;

  // ── 4. Experience strength: 20pts ────────────────────────────────
  let expScore = 0;
  const hasExp = experience.length > 0 && experience[0].company && experience[0].company.trim();

  if (hasExp) {
    expScore = 10; // Base for having experience

    const allBullets = experience.map(e => e.bullets.toLowerCase()).join(' ');
    const hasActionVerbs = ACTION_VERBS.some(verb => allBullets.includes(verb));

    if (hasActionVerbs) {
      expScore += 10;
    } else {
      warnings.push({ type: 'warning', message: 'No strong action verbs found in experience bullets. Use words like "Built", "Developed", "Led".' });
      feedback.push({ type: 'penalty', message: 'Missing action verbs in experience  (-10 pts)' });
      score -= 10;
    }
  }
  breakdown.experience = expScore;
  score += expScore;

  // ── 5. Education / certifications: 10pts ─────────────────────────
  let eduScore = 0;
  if (education.length > 0 && education[0].institution && education[0].institution.trim()) {
    eduScore += 5;
  }
  if (certifications && certifications.length > 0 && certifications[0].name && certifications[0].name.trim()) {
    eduScore += 5;
  }
  breakdown.education = eduScore;
  score += eduScore;

  // ── 6. Formatting: 10pts (with penalties) ────────────────────────
  // Penalty: Too many paragraphs (-5)
  const allText = summary + '\n' + experience.map(e => e.bullets).join('\n');
  const doubleParagraphs = (allText.match(/\n\n+/g) || []).length;
  if (doubleParagraphs > 5) {
    feedback.push({ type: 'penalty', message: 'Too many text blocks/paragraphs. Use concise bullet points  (-5 pts)' });
    breakdown.formatting = Math.max(0, breakdown.formatting - 5);
    score -= 5;
  }
  score += breakdown.formatting;

  // ── Clamp final score ─────────────────────────────────────────────
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    breakdown,
    feedback,
    warnings,
    missingKeywords: [...new Set(missingKeywords)],
  };
};
