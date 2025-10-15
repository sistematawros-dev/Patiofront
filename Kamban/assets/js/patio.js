// ===== Pátio =====
const patioBoard = $('#patioBoard');
const PATICOLUNAS = ['Fila', 'Carregamento', 'Carregado', 'Finalizado'];
async function renderPatio() {
  if (!patioBoard) return;
  patioBoard.innerHTML = '';
  PATICOLUNAS.forEach(col => {
    const panel = document.createElement('div'); panel.className = 'panel';
    panel.innerHTML = `<div class="panel-header"><h3>${col}</h3><span class="chip" id="count-${col}">0</span></div><div class="panel-body"><div class="dropzone" data-col="${col}" data-accept="card"></div></div>`;
    patioBoard.appendChild(panel);
  });
  const res = await listAgendamentos('limit=500');
  const counts = {}; PATICOLUNAS.forEach(c => counts[c] = 0);
  res.items.forEach(a => {
    const dz = patioBoard.querySelector(`.dropzone[data-col="${a.status || 'Fila'}"]`);
    if (dz) { dz.appendChild(createCard(a)); counts[a.status || 'Fila']++; }
  });
  PATICOLUNAS.forEach(c => { const el = document.getElementById('count-' + c); if (el) el.textContent = counts[c]; });
  enableDnD();
}
