const GEMINI_API_KEY = 'AIzaSyD9gAbjR9GZx4ObJJa8JtmISPzr01xaIRM';

/* ── On page load: restore any previously entered data ───────── */
window.addEventListener('DOMContentLoaded', function () {
  const saved = sessionStorage.getItem('aura_data');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    if (data.name    && data.name !== 'YOUR NAME') document.getElementById('name').value    = data.name;
    if (data.tagline) document.getElementById('tagline').value = data.tagline;
    if (data.about)   document.getElementById('about').value   = data.about;
    if (data.skills)  document.getElementById('skills').value  = data.skills.join(', ');

    (data.exp || []).forEach(entry => {
      addExperience();
      const card = getLastCard('#experienceInputs');
      if (entry.title   !== 'Position') card.querySelector('.exp-title').value   = entry.title;
      if (entry.company !== 'Company')  card.querySelector('.exp-company').value = entry.company;
      if (entry.start   !== 'Start')    card.querySelector('.exp-start').value   = entry.start;
      if (entry.end     !== 'End')      card.querySelector('.exp-end').value     = entry.end;
      card.querySelector('.exp-desc').value = entry.desc;
    });

    (data.edu || []).forEach(entry => {
      addEducation();
      const card = getLastCard('#educationInputs');
      if (entry.degree !== 'Degree') card.querySelector('.edu-degree').value = entry.degree;
      if (entry.school !== 'School') card.querySelector('.edu-school').value = entry.school;
      card.querySelector('.edu-year').value = entry.year;
    });

    (data.proj || []).forEach(entry => {
      addProject();
      const card = getLastCard('#projectInputs');
      if (entry.title !== 'Project') card.querySelector('.proj-title').value = entry.title;
      card.querySelector('.proj-desc').value = entry.desc;
    });

  } catch (err) {
    // Silently ignore corrupt saved data
  }

  document.getElementById('portfolioForm').addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormSubmit();
  });
});

/* Helper: get the most recently added card inside a container */
function getLastCard(containerSelector) {
  const cards = document.querySelectorAll(containerSelector + ' .entry-card');
  return cards[cards.length - 1];
}

/* ── AI bio generator ────────────────────────────────────────── */
async function generateAboutAI() {
  const bioField = document.getElementById('about');
  const aiBtn    = document.getElementById('aiBtn');
  const name     = document.getElementById('name').value.trim();
  const tagline  = document.getElementById('tagline').value.trim();
  const skills   = document.getElementById('skills').value.trim();

  aiBtn.disabled   = true;
  aiBtn.innerHTML  = '<span class="ai-loading-dot"></span> Writing...';

  const prompt = `Generate a single, clean 2–3 line professional portfolio bio for:
Name: ${name}
Role: ${tagline}
Skills: ${skills}

Rules: first person, no headings, no formatting, confident and distinctive tone.`;

  let bioText = '';
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await response.json();
    bioText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  } catch (err) {
    // Network or API error — fall through to the default text below
  }

  bioField.value = bioText || 'I craft digital experiences at the intersection of design and technology, turning complex problems into elegant solutions.';

  aiBtn.innerHTML = '✅ Done';
  setTimeout(() => {
    aiBtn.innerHTML = '✨ AI Write';
    aiBtn.disabled  = false;
  }, 2000);
}

/* ── Add entry card functions ────────────────────────────────── */
function addExperience() {
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-row">
      <input type="text" placeholder="Job Title"  class="exp-title"/>
      <input type="text" placeholder="Company"    class="exp-company"/>
    </div>
    <div class="form-row">
      <input type="text" placeholder="Start (e.g. Jan 2020)" class="exp-start"/>
      <input type="text" placeholder="End (e.g. Present)"    class="exp-end"/>
    </div>
    <textarea rows="2" placeholder="What you achieved here..." class="exp-desc"></textarea>`;
  document.getElementById('experienceInputs').appendChild(card);
}

function addEducation() {
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-row">
      <input type="text" placeholder="Degree / Qualification" class="edu-degree"/>
      <input type="text" placeholder="School / University"    class="edu-school"/>
    </div>
    <input type="text" placeholder="Year of Graduation" class="edu-year"/>`;
  document.getElementById('educationInputs').appendChild(card);
}

function addProject() {
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <input type="text" placeholder="Project Title" class="proj-title"/>
    <textarea rows="2" placeholder="What this project does / achieved" class="proj-desc"></textarea>`;
  document.getElementById('projectInputs').appendChild(card);
}

/* ── Collect form data, save to sessionStorage, redirect ─────── */
function handleFormSubmit() {
  const name     = document.getElementById('name').value.trim()   || 'YOUR NAME';
  const tagline  = document.getElementById('tagline').value.trim() || '';
  const about    = document.getElementById('about').value.trim()   || '';
  const skills   = document.getElementById('skills').value
                     .split(',').map(s => s.trim()).filter(Boolean);

  const experiences = [...document.querySelectorAll('#experienceInputs .entry-card')].map(card => ({
    title  : card.querySelector('.exp-title').value   || 'Position',
    company: card.querySelector('.exp-company').value || 'Company',
    start  : card.querySelector('.exp-start').value   || 'Start',
    end    : card.querySelector('.exp-end').value     || 'End',
    desc   : card.querySelector('.exp-desc').value    || ''
  }));

  const education = [...document.querySelectorAll('#educationInputs .entry-card')].map(card => ({
    degree: card.querySelector('.edu-degree').value || 'Degree',
    school: card.querySelector('.edu-school').value || 'School',
    year  : card.querySelector('.edu-year').value   || ''
  }));

  const projects = [...document.querySelectorAll('#projectInputs .entry-card')].map(card => ({
    title: card.querySelector('.proj-title').value || 'Project',
    desc : card.querySelector('.proj-desc').value  || ''
  }));
  const payload  = { name, tagline, about, skills, exp: experiences, edu: education, proj: projects };
  const template = sessionStorage.getItem('aura_template') || '1';
  const destination = template === '2' ? 'template2.html' : 'template1.html';

  const fileInput = document.getElementById('profileImage');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = event => {
      payload.imgSrc = event.target.result;
      sessionStorage.setItem('aura_data', JSON.stringify(payload));
      window.location.href = destination;
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    payload.imgSrc = '';
    sessionStorage.setItem('aura_data', JSON.stringify(payload));
    window.location.href = destination;
  }
}
