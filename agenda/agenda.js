/* Agenda sin historial: ocultar anuncios finalizados según la fecha de Chile. */
(() => {
  'use strict';
  const upcoming = document.getElementById('agenda-proximas');
  const category = document.getElementById('proximas-actividades');
  if (!upcoming || !category) return;
  const events = [...upcoming.querySelectorAll('[data-visible-until]')];
  let formatter;
  try {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit'
    });
  } catch { return; }
  function refresh() {
    try {
      const parts = formatter.formatToParts(new Date());
      const value = type => parts.find(part => part.type === type).value;
      const today = `${value('year')}-${value('month')}-${value('day')}`;
      const previous = document.getElementById('celebracion-anterior');
      const prefix = document.getElementById('celebracion-nuevo-prefijo');
      const newSchedule = today >= '2026-11-08';
      if (previous) previous.hidden = newSchedule;
      if (prefix) prefix.textContent = newSchedule ? 'Domingos: ' : 'Desde el 8 de noviembre de 2026: ';
      events.forEach(event => { event.hidden = today >= event.dataset.visibleUntil; });
      // Evitar un título vacío cuando ya no quedan actividades próximas.
      category.hidden = [...upcoming.children].every(event => event.hidden);
    } catch { /* Conservar el HTML disponible si falla la lectura de fecha. */ }
  }
  refresh();
  setInterval(refresh, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();