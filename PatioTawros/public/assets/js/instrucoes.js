// ===== Instruções =====
/*async function renderInstrucoes(){
  const box = $('#listaInstrucoes'); if(!box) return;
  box.innerHTML = '<span class="chip">Carregando…</span>';
  const r = await listInstrucoes('page=1&limit=50&sort=updatedAt&order=desc');
  box.innerHTML = '';
  const sel = $('#instrucao'); sel.innerHTML = '<option value="">Selecione…</option>';
  r.items.forEach(inst=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<header><h4>#${inst.id.slice(-5)} • ${inst.unidade||'-'}</h4><span class="chip">${inst.tipo}</span></header>
    <div class="meta"><span class="chip">Qtd: ${inst.quantidade||'-'}</span><span class="chip">Transp.: ${inst.transportadora||'-'}</span></div>`;
    box.appendChild(el);
    const o=document.createElement('option'); o.value=inst.id; o.textContent = `#${inst.id.slice(-5)} • ${inst.unidade||'-'} • ${inst.tipo}`; sel.appendChild(o);
  });
}*/