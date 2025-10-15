// ===== Navegação e estado UI =====
const tabBtns = document.querySelectorAll('.tab');
const tabs = {
  agendamento: document.getElementById('tab-agendamento'),
  agenda: document.getElementById('tab-agenda'),
  patio: document.getElementById('tab-patio'),
  instrucoes: document.getElementById('tab-instrucoes'),
  cadastros: document.getElementById('tab-cadastros'),
  usuarios: document.getElementById('tab-usuarios'),
  veiculos: document.getElementById('tab-veiculos'),
  cpfcnpj: document.getElementById('tab-cpfcnpj'),
};
tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
function selectTab(id) {
  // Defesa de RBAC: valida antes de trocar
  const roles = getUserRoles(window.CURRENT_USER || {});
  const allowed = computeAllowedTabs(roles);
  if (!allowed.has(id)) {
    alert('Acesso negado para sua função.');
    return;
  }
  tabBtns.forEach(b => b.setAttribute('aria-selected', b.dataset.tab === id));
  Object.entries(tabs).forEach(([k, el]) => { el.hidden = k !== id; });
  if (id === 'agenda') renderAgenda();
  if (id === 'patio') renderPatio();
  if (id === 'instrucoes') renderInstrucoes();
  // if(id==='agenda' && typeof window.mountAgenda === 'function'){window.mountAgenda();}
  if (id === 'usuarios' && typeof window.mountUsuarios === 'function') { window.mountUsuarios(); }
  if (id === 'veiculos' && typeof window.mountVeiculos === 'function') { window.mountVeiculos(); }
  if (id === 'cpfcnpj' && typeof window.mountCPFCNPJ === 'function') { window.mountCPFCNPJ(); }
}

// ===== Auth (mínimo) =====
const authBox = document.getElementById('authBox');
let _authPromise = null;
async function ensureAuth() {
  if (_authPromise) return _authPromise;
  _authPromise = (async () => {
    if (TOKEN) {
      try { const me = await api('/auth/me'); authBox.textContent = 'Logado: ' + (me.user?.email || ''); return; } catch { }
    }
    const email = prompt('Email para login ') || '';
  /*if (!email) {
    const u = await register('Admin', 'admin@tawros.local', 'secret');
    authBox.textContent = 'Logado: ' + u.email;
  } else */{
      const pass = prompt('Senha') || 'secret';
      try {
        const u = await login(email, pass);
        window.CURRENT_USER = u; // << guarda o usuário logado (tem .roles)
        authBox.textContent = 'Logado: ' + u.email;
        applyAccessControl(u);   // << aplica as permissões nas abas/seções
        // opcional: selecionar uma aba permitida se a atual não for
        const roles = Array.isArray(u?.roles) ? u.roles : [];
        const allowed = computeAllowedTabs(roles);
        const activeBtn = document.querySelector('nav .tab[aria-selected="true"]');
        if (!activeBtn || !allowed.has(activeBtn.getAttribute('data-tab'))) {
          const firstAllowed = [...allowed][0];
          const btn = document.querySelector(`nav .tab[data-tab="${firstAllowed}"]`);
          btn?.click?.();
        }

      } catch (e) { alert('Usuario ou senha invalido '); }
      return;
    }
  })();
  return _authPromise;
}
//ensureAuth();

// ===== Helpers =====
const $ = sel => document.querySelector(sel);
function uid() { return Math.random().toString(36).slice(2, 9); }
function fmtDate(d) { const dt = new Date(d); return dt.toLocaleDateString(); }



function logout() {
  TOKEN = '';
  localStorage.removeItem('TOKEN');
  // redireciona para login.html (ou outra rota que você usa)
  window.location.href = 'index.html';
}



// ===== Drag & Drop =====
function enableDnD() {
  document.querySelectorAll('.dropzone').forEach(dz => {
    dz.addEventListener('dragover', ev => { ev.preventDefault(); dz.classList.add('over'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('over'));
    dz.addEventListener('drop', async ev => {
      ev.preventDefault(); dz.classList.remove('over');
      const id = ev.dataTransfer.getData('text/plain');
      const card = document.querySelector(`.card[data-id="${id}"]`);
      if (!card) return; dz.appendChild(card);
      const slot = dz.closest('.slot');
      if (slot) {
        await updateAgendamento(id, { data: slot.dataset.day, hora: slot.dataset.hora });
      }
      const col = dz.dataset.col;
      if (col) {
        if (col === 'Fila') await updateAgendamento(id, { status: 'Fila' });
        else await updateAgendamento(id, { status: col });
      }
      await renderPatio();
    });
  });
}

// ===== Modal =====
const dlg = document.getElementById('dlg');
const dlgContent = document.getElementById('dlgContent');
let currentDlgId = null;
async function openDlg(id) {
  const a = await getAgendamento(id);
  currentDlgId = id;
  dlgContent.innerHTML = `<div class="grid" style="grid-template-columns: repeat(4, 1fr); gap:12px;">
    <div class="chip">Data: ${a.data ? fmtDate(a.data) : '—'}</div><div class="chip">Hora: ${a.hora || '—'}</div>
    <div class="chip">Status: ${a.status || 'Fila'}</div><div class="chip">Tipo: ${a.tipo || '—'}</div>
  </div><div class="separator"></div>
  <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap:8px;">
    <div class="chip">Placa: ${a.placa || '—'}</div><div class="chip">Motorista: ${a.motoristaId || '—'}</div><div class="chip">Transportadora: ${a.transportadoraId || '—'}</div>
    <div class="chip">Qtd: ${a.quantidade || '—'} t</div><div class="chip">Contrato: ${a.contrato || '—'}</div><div class="chip">Blocos: ${a.blocos || '—'}</div>
  </div>`;
  dlg.showModal();
}
document.getElementById('btnMoverProximo')?.addEventListener('click', async () => { if (!currentDlgId) return; await api('/agendamentos/' + currentDlgId + '/next', { method: 'POST' }); await renderPatio(); dlg.close(); });
document.getElementById('btnDeletar')?.addEventListener('click', async () => { if (!currentDlgId) return; await deleteAgendamento(currentDlgId); await renderAgenda(); await renderPatio(); dlg.close(); });
document.getElementById('btnImprimir')?.addEventListener('click', async () => { if (!currentDlgId) return; const html = await api('/agendamentos/' + currentDlgId + '/comprovante'); const win = window.open('', '_blank', 'width=900,height=700'); win.document.write(html); win.document.close(); win.onload = () => win.print(); });
document.getElementById('btnPDF')?.addEventListener('click', async () => {
  if (!currentDlgId) return;
  const res = await fetch(API_BASE + '/agendamentos/' + currentDlgId + '/comprovante.pdf', { headers: { ...(TOKEN ? { 'Authorization': 'Bearer ' + TOKEN } : {}) } });
  if (!res.ok) { const t = await res.text(); return alert('Erro ao gerar PDF: ' + t); }
  const blob = await res.blob(); const url = URL.createObjectURL(blob); window.open(url, '_blank');
});

// Esconde tudo até autenticar
document.querySelectorAll('nav .tab[data-tab]').forEach(btn => btn.style.display = 'none');
Object.values(tabs).forEach(sec => { if (sec) sec.hidden = true; });


// ===== Init =====
(async function init() {
  await ensureAuth(); // garante TOKEN e CURRENT_USER

  const roles = getUserRoles(window.CURRENT_USER || {});
  const allowed = computeAllowedTabs(roles);

  if (allowed.has('instrucoes')) await renderInstrucoes();
  if (allowed.has('agenda')) await renderAgenda();
  if (allowed.has('patio')) await renderPatio();

  // Se nenhuma aba está selecionada ou a selecionada não é permitida, ativa a 1ª permitida
  const activeBtn = document.querySelector('nav .tab[aria-selected="true"]');
  if (!activeBtn || !allowed.has(activeBtn.getAttribute('data-tab'))) {
    const firstAllowed = [...allowed][0];
    const btn = document.querySelector(`nav .tab[data-tab="${firstAllowed}"]`);
    btn?.click?.();
  }
})();


document.getElementById('btnLogout').addEventListener('click', () => {
  logout();
});

//CONTROLES DE ACESSO//

// === RBAC: mapeamento de abas liberadas por função ===
const ROLE_TABS = {
  'Administrador': ['agendamento', 'agenda', 'patio', 'instrucoes', 'cpfcnpj', 'veiculos', 'usuarios'],
  'Comprador': ['agendamento', 'agenda'],
  'Transportadora': ['patio'],
  'Produtor': ['cpfcnpj', 'veiculos'],
  'Operador da Fila': ['cpfcnpj', 'veiculos'],
};

// util: pega primeira role "principal" (ou todas, se quiser combinar)
function getUserRoles(user) {
  const roles = Array.isArray(user?.roles) ? user.roles : [];
  return roles;
}

// converte roles → conjunto de abas permitidas
function computeAllowedTabs(roles) {
  // união das permissões de todas as roles do usuário
  const set = new Set();
  roles.forEach(r => (ROLE_TABS[r] || []).forEach(t => set.add(t)));
  return set;
}

function applyAccessControl(user) {
  const roles = getUserRoles(user);
  const allowed = computeAllowedTabs(roles);

  // botões do topo
  document.querySelectorAll('nav .tab[data-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-tab');
    const can = allowed.has(tab);
    // mostra/esconde o botão
    btn.style.display = can ? '' : 'none';
    // esconde a seção correspondente
    const sec = document.getElementById('tab-' + tab);
    if (sec) sec.hidden = !can;
    // remove seleção de abas não permitidas
    if (!can) btn.setAttribute('aria-selected', 'false');
  });

  // garante que alguma aba permitida fique ativa
  const firstAllowed = [...allowed][0];
  if (firstAllowed) {
    // ativa a primeira permitida se a atual não for
    const activeBtn = document.querySelector('nav .tab[aria-selected="true"]');
    if (!activeBtn || !allowed.has(activeBtn.getAttribute('data-tab'))) {
      const btn = document.querySelector(`nav .tab[data-tab="${firstAllowed}"]`);
      if (btn) btn.click?.(); // ou dispare sua lógica de trocar de aba
    }
  }
}

// bloqueia clique em abas não permitidas (defesa extra)
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('nav .tab[data-tab]');
  if (!btn) return;
  const tab = btn.getAttribute('data-tab');
  const roles = getUserRoles(window.CURRENT_USER || {});
  const allowed = computeAllowedTabs(roles);
  if (!allowed.has(tab)) {
    ev.preventDefault();
    ev.stopPropagation();
    alert('Acesso negado para sua função.');
  }
});
function logout() {
  TOKEN = '';
  localStorage.removeItem('TOKEN');
  window.CURRENT_USER = null;

  document.querySelectorAll('nav .tab[data-tab]').forEach(btn => btn.style.display = 'none');
  Object.values(tabs).forEach(sec => { if (sec) sec.hidden = true; });

  window.location.href = 'index.html';
}

