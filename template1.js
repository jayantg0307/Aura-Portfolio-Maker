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
    : `<div class="t1-no-image">👤</div>`;

  const skillChips = skills.length
    ? skills.map(s => `<div class="t1-chip">${s}</div>`).join('')
    : '<div class="t1-chip" style="opacity:.4">No skills listed</div>';

  const expHtml = exp.length
    ? exp.map(e => `
        <div class="t1-exp-item">
          <div>
            <div class="t1-exp-title">${e.title}</div>
            <div class="t1-exp-company">${e.company}</div>
            <div class="t1-exp-desc">${e.desc}</div>
          </div>
          <div class="t1-exp-date">${e.start}<br>— ${e.end}</div>
        </div>`).join('')
    : '<p style="color:rgba(255,255,255,.3);font-size:.9rem;">No experience listed.</p>';

  const eduHtml = edu.length
    ? edu.map(e => `
        <div class="t1-edu-card">
          <div class="t1-edu-degree">${e.degree}</div>
          <div class="t1-edu-school">${e.school}</div>
          <div class="t1-edu-year">${e.year}</div>
        </div>`).join('')
    : '<p style="color:rgba(255,255,255,.3);font-size:.9rem;">No education listed.</p>';

  const projHtml = proj.length
    ? proj.map((p, i) => `
        <div class="t1-project-card">
          <div class="t1-proj-num">0${i + 1}</div>
          <div class="t1-proj-title">${p.title}</div>
          <div class="t1-proj-desc">${p.desc}</div>
          <div class="t1-proj-tags">
            <span class="t1-proj-tag">Featured</span>
            <span class="t1-proj-tag">2024</span>
          </div>
        </div>`).join('')
    : '<p style="color:rgba(255,255,255,.3);font-size:.9rem;">No projects listed.</p>';

  const nameParts = name.split(' ');
  const lastName  = nameParts.pop();
  const firstName = nameParts.join(' ');

  document.getElementById('t1-root').innerHTML = `
    <div class="t1-content">

      <div class="t1-topbar">
        <div class="t1-logo">AURA / PORTFOLIO</div>
        <div class="t1-nav">
          <span>Skills</span><span>Experience</span><span>Work</span>
        </div>
      </div>

      <div class="t1-hero">
        <div class="t1-hero-left">
          <div class="t1-hero-eyebrow">Portfolio — ${new Date().getFullYear()}</div>
          <h1 class="t1-name">
            ${firstName ? `<span style="display:block;opacity:.7;font-size:.65em">${firstName}</span>` : ''}
            <span class="name-gradient">${lastName || name}</span>
          </h1>
          <div class="t1-role">
            ${tagline ? `<span>${tagline}</span>` : '<span style="opacity:.4">Creative Professional</span>'}
          </div>
          <p class="t1-about">${about || 'Your story will appear here.'}</p>
        </div>
        <div class="t1-hero-right">
          <div class="t1-profile-img">${imgHtml}</div>
          <div class="t1-stats">
            <div class="t1-stat">
              <div class="t1-stat-num">${proj.length}</div>
              <div class="t1-stat-lbl">Projects</div>
            </div>
            <div class="t1-stat">
              <div class="t1-stat-num">${skills.length}</div>
              <div class="t1-stat-lbl">Skills</div>
            </div>
            <div class="t1-stat">
              <div class="t1-stat-num">${exp.length}</div>
              <div class="t1-stat-lbl">Roles</div>
            </div>
          </div>
        </div>
      </div>

      <div class="t1-section">
        <div class="t1-section-header">
          <span class="t1-section-num">01</span>
          <h2 class="t1-section-title">Tech Stack</h2>
          <div class="t1-section-line"></div>
        </div>
        <div class="t1-skills-grid">${skillChips}</div>
      </div>

      <div class="t1-section">
        <div class="t1-section-header">
          <span class="t1-section-num">02</span>
          <h2 class="t1-section-title">Experience</h2>
          <div class="t1-section-line"></div>
        </div>
        <div class="t1-exp-list">${expHtml}</div>
      </div>

      <div class="t1-section">
        <div class="t1-section-header">
          <span class="t1-section-num">03</span>
          <h2 class="t1-section-title">Education</h2>
          <div class="t1-section-line"></div>
        </div>
        <div class="t1-edu-grid">${eduHtml}</div>
      </div>

      <div class="t1-section">
        <div class="t1-section-header">
          <span class="t1-section-num">04</span>
          <h2 class="t1-section-title">Selected Works</h2>
          <div class="t1-section-line"></div>
        </div>
        <div class="t1-projects-grid">${projHtml}</div>
      </div>

    </div>`;
    function downloadPortfolio() {
  window.print();
}
})();
async function downloadPortfolio() {
  const { jsPDF } = window.jspdf;

  const canvas = await html2canvas(document.body, {
    scale: 2
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');

  const width = 210;
  const height = canvas.height * width / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  pdf.save('portfolio.pdf');
}
function downloadPortfolio() {
  window.print();
}
