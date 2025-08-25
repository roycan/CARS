/* storage.js
   Local storage persistence & data import/export.
*/
(function(){
  const DB_KEY = 'carsTrackerData';

  function loadAssessments(){
    try { return JSON.parse(localStorage.getItem(DB_KEY)) || []; } catch(e){ return []; }
  }

  function saveAssessments(data){
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  function exportJSON(data){
    if(!data.length) return alert('No data to export.');
    const blob = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cars_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
  }

  function exportCSV(data){
    if(!data.length) return alert('No data to export.');
    const headers = ['Date','Risk Level','Self Harm Override','Externalizing Raw','Externalizing T','Internalizing Raw','Internalizing T','Social Raw','Social T','Academic Raw','Academic T','Total Raw','Total T'];
    let csv = headers.join(',') + '\r\n';
    data.forEach(r => {
      csv += [
        new Date(r.date).toISOString(),
        '"'+r.riskLevel+'"',
        r.selfHarmOverride,
        r.rawScores.externalizing, r.tScores.externalizing,
        r.rawScores.internalizing, r.tScores.internalizing,
        r.rawScores.social, r.tScores.social,
        r.rawScores.academic, r.tScores.academic,
        r.rawScores.total, r.tScores.total
      ].join(',') + '\r\n';
    });
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `cars_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  function importJSONFile(file, onSuccess, onError){
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        if(Array.isArray(parsed)) onSuccess(parsed); else throw new Error('Invalid format');
      } catch(err){ onError(err); }
    };
    reader.readAsText(file);
  }

  function deleteAllData(){
    if(confirm('Are you absolutely sure? This will delete all your data permanently and cannot be undone.')){
      localStorage.removeItem(DB_KEY);
      alert('All data has been deleted.');
      location.reload();
    }
  }

  window.CARS.storage = { loadAssessments, saveAssessments, exportJSON, exportCSV, importJSONFile, deleteAllData };
})();
