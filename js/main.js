/* main.js
   App orchestration: event wiring & view switching.
*/
(function(){
  const { questionnaire, modal, calendar, analysis } = window.CARS.ui;
  const { calculateResultPipeline } = window.CARS.scoring;
  const { loadAssessments, saveAssessments, exportJSON, exportCSV, importJSONFile, deleteAllData } = window.CARS.storage;
  const dev = window.CARS.dev; // may be undefined if script order changes

  let appData = loadAssessments();
  let calendarDate = new Date();

  // Elements
  const questionnaireForm = document.getElementById('questionnaire-form');
  const submitBtn = document.getElementById('submit-test');
  const navLinks = document.querySelectorAll('.navbar-item[data-view]');

  function switchView(name){
    document.querySelectorAll('.view').forEach(v=> v.classList.remove('is-active'));
    document.getElementById(`view-${name}`).classList.add('is-active');
    if(name==='analysis') analysis.renderAnalysis(appData);
    if(name==='calendar') calendar.renderCalendar(appData, calendarDate);
  }

  function initQuestionnaire(){ questionnaire.renderQuestionnaire(questionnaireForm); }

  function handleSubmit(){
    const result = calculateResultPipeline(questionnaireForm);
    appData.push(result);
    saveAssessments(appData);
    modal.displayResultsInModal(result);
    if(dev && typeof dev.refresh === 'function') dev.refresh(result); // update dev panel
  refreshDataStats();
    initQuestionnaire();
  }

  function wireNav(){
    navLinks.forEach(l => l.addEventListener('click', e => switchView(e.target.dataset.view)));
  }

  function wireCalendarNav(){
    document.getElementById('prev-month').addEventListener('click', ()=> { calendarDate.setMonth(calendarDate.getMonth()-1); calendar.renderCalendar(appData, calendarDate); });
    document.getElementById('next-month').addEventListener('click', ()=> { calendarDate.setMonth(calendarDate.getMonth()+1); calendar.renderCalendar(appData, calendarDate); });
  }

  function wireDataButtons(){
    document.getElementById('export-json').addEventListener('click', ()=> exportJSON(appData));
    document.getElementById('export-csv').addEventListener('click', ()=> exportCSV(appData));
    const importInput = document.getElementById('import-json-input');
    const fileNameSpan = document.getElementById('import-file-name');
    importInput.addEventListener('change', e => {
      const file = e.target.files[0]; if(!file){ if(fileNameSpan) fileNameSpan.textContent = 'No file selected'; return; }
      if(fileNameSpan) fileNameSpan.textContent = file.name;
      importJSONFile(file, imported => {
        if(confirm('Are you sure you want to import this file? It will overwrite all current data.')){
          appData = imported; saveAssessments(appData); alert('Data imported successfully!'); switchView('calendar'); }
      }, ()=> alert('Error importing file. Please make sure it is a valid JSON backup from this tool.'));
    });
    document.getElementById('delete-all').addEventListener('click', deleteAllData);
  }

  function refreshDataStats(){
    const box = document.getElementById('data-stats');
    if(!box) return;
    if(!appData.length){
      box.innerHTML = '<h2 class="subtitle">Stored Data Summary</h2><p class="is-size-7">No assessments saved yet.</p>';
      return;
    }
    const last = appData[appData.length-1];
    const bytes = new Blob([JSON.stringify(appData)]).size;
    box.innerHTML = `<h2 class="subtitle">Stored Data Summary</h2>
      <ul class="is-size-7">
        <li><strong>Assessments:</strong> ${appData.length}</li>
        <li><strong>Latest Risk:</strong> ${last.riskLevel}</li>
        <li><strong>Last Date:</strong> ${new Date(last.date || last.timestamp).toLocaleDateString()}</li>
        <li><strong>Approx Size:</strong> ${bytes} bytes</li>
      </ul>`;
  }

  function initModal(){ modal.wireModalClose(); }

  function init(){
    initQuestionnaire();
    wireNav();
    wireCalendarNav();
    wireDataButtons();
    initModal();
    if(submitBtn) submitBtn.addEventListener('click', handleSubmit);
    if(dev && typeof dev.init === 'function') dev.init();
  if(dev && window.location.hash === '#dev') dev.refresh();
  refreshDataStats();
    switchView('test');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
