/* ui_analysis.js
   Charts: trends + snapshot
*/
(function(){
  let trendsChartInstance, snapshotChartInstance;
window.CARS = window.CARS || {};
  function renderAnalysis(data){
    const view = document.getElementById('view-analysis');
    if(!data.length){
      view.innerHTML = '<div class="notification is-warning">No data available to analyze. Please complete at least one test.</div>';
      return;
    }
    if(!document.getElementById('trends-chart')){
      view.innerHTML = `<h1 class="title">Analysis</h1><div class="columns"><div class="column is-two-thirds"><div class="box"><h2 class="subtitle">Trends Over Time (T-Scores)</h2><canvas id="trends-chart"></canvas></div></div><div class="column is-one-third"><div class="box"><h2 class="subtitle">Most Recent Test Snapshot</h2><canvas id="snapshot-chart"></canvas></div></div></div>`;
    }
    const sorted = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date));
    const labels = sorted.map(r=> new Date(r.date).toLocaleDateString());
    const ext = sorted.map(r=> r.tScores.externalizing);
    const int = sorted.map(r=> r.tScores.internalizing);
    const soc = sorted.map(r=> r.tScores.social);
    const aca = sorted.map(r=> r.tScores.academic);
    const tot = sorted.map(r=> r.tScores.total);
    const trendsCtx = document.getElementById('trends-chart').getContext('2d');
    if(trendsChartInstance) trendsChartInstance.destroy();
    trendsChartInstance = new Chart(trendsCtx, { type:'line', data:{ labels, datasets:[
      { label:'Externalizing', data:ext, borderColor:'rgba(255,99,132,1)', fill:false },
      { label:'Internalizing', data:int, borderColor:'rgba(54,162,235,1)', fill:false },
      { label:'Social', data:soc, borderColor:'rgba(255,206,86,1)', fill:false },
      { label:'Academic', data:aca, borderColor:'rgba(75,192,192,1)', fill:false },
      { label:'Total', data:tot, borderColor:'rgba(153,102,255,1)', fill:false, borderWidth:3 }
    ]}});
    const last = sorted[sorted.length-1];
    const snapCtx = document.getElementById('snapshot-chart').getContext('2d');
    if(snapshotChartInstance) snapshotChartInstance.destroy();
    snapshotChartInstance = new Chart(snapCtx, { type:'radar', data:{ labels:['Externalizing','Internalizing','Social','Academic'], datasets:[{ label:'Most Recent T-Scores', data:[ last.tScores.externalizing,last.tScores.internalizing,last.tScores.social,last.tScores.academic ], backgroundColor:'rgba(54,162,235,0.2)', borderColor:'rgba(54,162,235,1)', borderWidth:1 }] }, options:{ scale:{ min:30, max:100 }}});
  }

  window.CARS.ui = window.CARS.ui || {};
  window.CARS.ui.analysis = { renderAnalysis };
})();
