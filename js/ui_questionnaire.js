/* ui_questionnaire.js
   Render the questionnaire form.
*/
(function(){
  const { QUESTIONS, RATING_OPTIONS } = window.CARS.data;

  function renderQuestionnaire(container){
    let html = '';
    QUESTIONS.forEach((q, idx) => {
      html += `<fieldset class="box"><legend><span class="has-text-weight-semibold">${q.en}</span><br><span class="is-italic has-text-grey">${q.tl}</span></legend><div class="control mt-3">`;
      if(q.special){
        html += `<label class="radio"><input type="radio" name="q${idx}" value="1"> Yes</label>`;
        html += `<label class="radio"><input type="radio" name="q${idx}" value="0" checked> No</label>`;
      } else {
        RATING_OPTIONS.forEach(opt => {
          html += `<label class="radio"><input type="radio" name="q${idx}" value="${opt.value}" ${opt.value===0?'checked':''}> ${opt.label}</label> `;
        });
      }
      html += `</div></fieldset>`;
    });
    container.innerHTML = html;
  }

  window.CARS.ui = window.CARS.ui || {};
  window.CARS.ui.questionnaire = { renderQuestionnaire };
})();
