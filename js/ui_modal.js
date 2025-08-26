/* ui_modal.js
   Modal display of results.
*/
(function(){
  function displayResultsInModal(result){
    const modal = document.getElementById('results-modal');
    const { rawScores, tScores, riskLevel, interpretation, selfHarmOverride, date } = result;
    const formattedDate = new Date(date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
    let riskColor='has-text-success';
    if(riskLevel==='At-risk') riskColor='has-text-warning';
    if(riskLevel==='High risk') riskColor='has-text-danger';
    const content = `
      <p class="is-size-4"><strong>Date:</strong> ${formattedDate}</p>
      <p class="is-size-3 has-text-weight-bold ${riskColor}">Overall Risk Level: ${riskLevel}</p>
      ${ selfHarmOverride ? '<p class="has-text-danger-dark has-text-weight-bold">This result was automatically set to High Risk due to the answer on item #25.</p>' : '' }
      <p class="is-size-5 mt-2"><em>${interpretation}</em></p>
      <hr>
      <h4 class="title is-4">Score Summary</h4>
      <table class="table is-fullwidth is-striped"><caption class="is-sr-only">Summary of raw and T-scores</caption>
        <thead><tr><th>Subscale</th><th>Raw Score</th><th>T-Score</th></tr></thead>
        <tbody>
          <tr><td>Externalizing</td><td>${rawScores.externalizing}</td><td>${tScores.externalizing}</td></tr>
          <tr><td>Internalizing</td><td>${rawScores.internalizing}</td><td>${tScores.internalizing}</td></tr>
          <tr><td>Social</td><td>${rawScores.social}</td><td>${tScores.social}</td></tr>
          <tr><td>Academic/Learning</td><td>${rawScores.academic}</td><td>${tScores.academic}</td></tr>
          <tr class="has-text-weight-bold"><td>Total</td><td>${rawScores.total}</td><td>${tScores.total}</td></tr>
        </tbody></table>
      <p class="is-size-7 has-text-grey mt-4"><strong>Disclaimer:</strong> This tool is for personal tracking and awareness, based on the CARS 9th-12th Grade Learner Report norms. It is not a substitute for a professional diagnosis. If you are in distress, please contact a mental health professional.</p>`;
    document.getElementById('modal-content').innerHTML = content;
    modal.classList.add('is-active');
  }

  function wireModalClose(){
    const modal = document.getElementById('results-modal');
    modal.querySelector('.modal-background').addEventListener('click', ()=> modal.classList.remove('is-active'));
    modal.querySelector('.delete').addEventListener('click', ()=> modal.classList.remove('is-active'));
    modal.querySelector('.modal-card-foot button').addEventListener('click', ()=> modal.classList.remove('is-active'));
  }

  window.CARS.ui = window.CARS.ui || {};
  window.CARS.ui.modal = { displayResultsInModal, wireModalClose };
})();
