(function () {
  const raw = sessionStorage.getItem('aura_data');
  if (!raw) { window.location.href = 'index.html'; return; }

  let d;
  try { d = JSON.parse(raw); }
  catch(e) { window.location.href = 'index.html'; return; }

  const { name = 'YOUR NAME', tagline = '', about = '', skills = [],
          exp = [], edu = [], proj = [], imgSrc = '' } = d;

  document.title = name + ' | Portfolio';

  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${name}"/>`
    : `<div class="t2-no-image">👤</div>`;

  const skillChips = skills.length
    ? skills.map(s => `<div class="t2-chip">${s}</div>`).join('')
    : '<div class="t2-chip" style="opacity:.4">No skills listed</div>';

  const expHtml = exp.length
    ? exp.map(e => `
        <div class="t2-exp-item">
          <div class="t2-exp-date">${e.start} —<br>${e.end}</div>
          <div class="t2-exp-right">
            <div class="t2-exp-title">${e.title}</div>
            <div class="t2-exp-company">${e.company}</div>
            <div class="t2-exp-desc">${e.desc}</div>
          </div>
        </div>`).join('')
    : '<p style="color:rgba(42,26,14,.35);font-size:.95rem;padding:20px 0;">No experience listed.</p>';

  const eduHtml = edu.length
    ? edu.map(e => `
        <div class="t2-edu-card">
          <div class="t2-edu-degree">${e.degree}</div>
          <div class="t2-edu-school">${e.school}</div>
          <div class="t2-edu-year">${e.year}</div>
        </div>`).join('')
    : '<p style="color:rgba(42,26,14,.35);font-size:.95rem;">No education listed.</p>';

  const projHtml = proj.length
    ? proj.map((p, i) => `
        <div class="t2-project-item">
          <div class="t2-proj-num">0${i + 1}.</div>
          <div class="t2-proj-main">
            <div class="t2-proj-title">${p.title}</div>
            <div class="t2-proj-desc">${p.desc}</div>
            <div class="t2-proj-tags">
              <span class="t2-proj-tag">Featured</span>
              <span class="t2-proj-tag">2024</span>
            </div>
          </div>
          <div class="t2-proj-arrow">→</div>
        </div>`).join('')
    : '<p style="color:rgba(42,26,14,.35);font-size:.95rem;padding:20px 0;">No projects listed.</p>';

  const nameParts = name.split(' ');
  const lastName  = nameParts.pop() || name;
  const firstName = nameParts.join(' ');

  document.getElementById('t2-root').innerHTML = `
    <div class="t2-content">

      <div class="t2-topbar">
        <div class="t2-logo">Aura · Portfolio · ${new Date().getFullYear()}</div>
        <div class="t2-nav">
          <span>Experience</span><span>Work</span><span>Education</span>
        </div>
      </div>

      <div class="t2-hero">
        <div class="t2-hero-main">
          <div class="t2-hero-eyebrow">Portfolio of Work</div>
          <h1 class="t2-name">
            ${firstName ? `${firstName}<br>` : ''}<em>${lastName}</em>
          </h1>
          <div class="t2-divider"></div>
          <div class="t2-role">${tagline || 'Creative Professional'}</div>
          <p class="t2-about">${about || 'Your story will appear here.'}</p>
        </div>
        <div class="t2-hero-side">
          <div class="t2-profile-img">${imgHtml}</div>
          <div class="t2-stats">
            <div class="t2-stat">
              <div class="t2-stat-num">${proj.length}</div>
              <div class="t2-stat-lbl">Projects</div>
            </div>
            <div class="t2-stat">
              <div class="t2-stat-num">${skills.length}</div>
              <div class="t2-stat-lbl">Skills</div>
            </div>
            <div class="t2-stat">
              <div class="t2-stat-num">${exp.length}</div>
              <div class="t2-stat-lbl">Years exp.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="t2-section">
        <div class="t2-section-header">
          <span class="t2-section-num">01</span>
          <h2 class="t2-section-title">Skills &amp; <em>Expertise</em></h2>
        </div>
        <div class="t2-skills-grid">${skillChips}</div>
      </div>

      <div class="t2-section">
        <div class="t2-section-header">
          <span class="t2-section-num">02</span>
          <h2 class="t2-section-title">Work <em>Experience</em></h2>
        </div>
        <div class="t2-exp-list">${expHtml}</div>
      </div>

      <div class="t2-section">
        <div class="t2-section-header">
          <span class="t2-section-num">03</span>
          <h2 class="t2-section-title"><em>Education</em></h2>
        </div>
        <div class="t2-edu-grid">${eduHtml}</div>
      </div>

      <div class="t2-section">
        <div class="t2-section-header">
          <span class="t2-section-num">04</span>
          <h2 class="t2-section-title">Selected <em>Works</em></h2>
        </div>
        <div class="t2-projects-list">${projHtml}</div>
      </div>

      <div class="t2-footer">
        <div class="t2-footer-copy">Portfolio generated with Aura</div>
        <div class="t2-footer-mark">Crafted with intention</div>
      </div>

    </div>`;
    function downloadPortfolio() {
  window.print();
}
})();
