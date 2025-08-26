/* ui_calendar.js
   Calendar rendering for assessment history.
*/
(function(){
  function renderCalendar(data, dateObj){
    const grid = document.getElementById('calendar-grid');
    while(grid.children.length > 7) grid.removeChild(grid.lastChild);
    dateObj.setDate(1);
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    document.getElementById('calendar-month-year').textContent = `${dateObj.toLocaleString('default',{month:'long'})} ${year}`;
    const firstDayIndex = dateObj.getDay();
    const lastDay = new Date(year, month+1, 0).getDate();
    for(let i=0;i<firstDayIndex;i++) grid.insertAdjacentHTML('beforeend','<div class="calendar-day"></div>');
    for(let day=1; day<=lastDay; day++){
      const cell = document.createElement('div');
      cell.className='calendar-day';
      cell.innerHTML = `<span class="day-number">${day}</span>`;
      const dateStr = new Date(year, month, day).toISOString().split('T')[0];
      const match = data.find(r => r.date.startsWith(dateStr));
      if(match){
        cell.classList.add('has-test');
        cell.addEventListener('click', ()=> window.CARS.ui.modal.displayResultsInModal(match));
      }
      grid.appendChild(cell);
    }
  }
  window.CARS.ui = window.CARS.ui || {};
  window.CARS.ui.calendar = { renderCalendar };
})();
