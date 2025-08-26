(function(){
  const ns = window.CARS = window.CARS || {};
  ns.dev = ns.dev || {};

  const panel = () => document.getElementById('dev-mode-panel');
  const contentEl = () => document.getElementById('dev-mode-content');
  let enabled = false;

  function isHashEnabled(){
    return window.location.hash === '#dev';
  }

  function enable(){
    enabled = true;
    panel().classList.add('active');
    refresh();
  }
  function disable(){
    enabled = false;
    panel().classList.remove('active');
    if(contentEl()) contentEl().innerHTML = 'Inactive.';
  }

  function toggle(){
    if(enabled){ disable(); history.replaceState(null,'',window.location.pathname+window.location.search); }
    else { enable(); if(window.location.hash !== '#dev') history.replaceState(null,'', '#dev'); }
  }

  function summarizeLatest(latest){
    if(!latest) return '<em>No submissions yet.</em>';
    const { date, rawScores, tScores, riskLevel, interpretation } = latest;
    const when = new Date(date || latest.timestamp || Date.now()).toLocaleString();
    const lines = [];
    lines.push(`<strong>Date:</strong> ${when}`);
    if(riskLevel) lines.push(`<strong>Risk Level:</strong> ${riskLevel}`);
    if(interpretation) lines.push(`<em>${interpretation}</em>`);
    if(rawScores){
      lines.push('<strong>Raw Scores</strong>');
      lines.push('<ul>'+Object.entries(rawScores).map(([k,v])=>`<li>${k}: ${v}</li>`).join('')+'</ul>');
    }
    if(tScores){
      lines.push('<strong>T Scores</strong>');
      lines.push('<ul>'+Object.entries(tScores).map(([k,v])=>`<li>${k}: ${v}</li>`).join('')+'</ul>');
    }
    return lines.join('\n');
  }

  function refresh(latest){
    if(!enabled) return; // do nothing if not active
    const el = contentEl();
    if(!el) return;
    try {
      const assessments = ns.storage ? ns.storage.loadAssessments() : [];
      const last = latest || assessments[assessments.length-1];
      let html = `<p><strong>Assessments stored:</strong> ${assessments.length}</p>`;
      html += summarizeLatest(last);
      // Show schema version and memory usage estimate
      if(ns.data){
        html += `<p class="mt-2"><strong>Schema Version:</strong> ${ns.data.DATA_SCHEMA_VERSION}</p>`;
      }
      const bytes = new Blob([JSON.stringify(assessments)]).size;
      html += `<p><strong>Approx Storage Size:</strong> ${bytes} bytes</p>`;
      el.innerHTML = html;
    } catch(err){
      el.innerHTML = `<pre class="has-text-danger">${err.message}</pre>`;
    }
  }

  function wireHotkeys(){
    document.addEventListener('keydown', e => {
      if(e.ctrlKey && (e.key === 'd' || e.key === 'D')){ e.preventDefault(); toggle(); }
    });
  }

  function init(){
    const toggleLink = document.getElementById('dev-mode-toggle');
    if(toggleLink){ toggleLink.addEventListener('click', e => { e.preventDefault(); toggle(); }); }
    wireHotkeys();
    if(isHashEnabled()) enable();
  }

  ns.dev.refresh = refresh;
  ns.dev.init = init;
})();
