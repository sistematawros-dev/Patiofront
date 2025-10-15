// assets/js/pessoas.js
(function () {
  function authHeader() { return TOKEN ? { Authorization: 'Bearer ' + TOKEN } : {}; }
  const asText = (resp) => resp.text();

  async function listarPessoas(container, filtro = {}) {
    container.innerHTML = '<p class="chip">Carregando…</p>';
    try {
      const qs = new URLSearchParams();
      qs.set('limit', '200');
      if (filtro.search) qs.set('search', filtro.search);
      if (filtro.tipo) qs.set('tipo', filtro.tipo); // Motorista/Produtor/etc.
      const res = await fetch(`${API_BASE}/pessoas?` + qs.toString(), { headers: { ...authHeader() } });
      if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.items ?? []);
      renderTabela(container, items);
    } catch (e) {
      console.error('Falha ao listar pessoas', e);
      container.innerHTML = '<p class="chip">Erro ao listar pessoas. Verifique se a API possui /pessoas (GET).</p>';
    }
  }

  function renderTabela(container, items) {
    if (!items.length) { container.innerHTML = '<p>Nenhuma pessoa cadastrada.</p>'; return; }
    const head = `
      <div class="table-head">
        <div class="col">Nome</div>
        <div class="col">CPF/CNPJ</div>
        <div class="col">Telefone</div>
        <div class="col">Email</div>
        <div class="col">Tipo</div>
        <div class="col">Validade Doc.</div>
      </div>`;
    const rows = items.map(v => `
      <div class="table-row" data-id="${v.id ?? ''}">
        <div class="col"><strong>${v.nome ?? '-'}</strong></div>
        <div class="col">${v.cpf ?? '-'}</div>
        <div class="col">${v.telefone ?? '-'}</div>
        <div class="col">${v.email ?? '-'}</div>
        <div class="col">${v.tipoPessoa ?? '-'}</div>
        <div class="col">${v.validadeDocumento ? new Date(v.validadeDocumento).toLocaleDateString() : '-'}</div>
      </div>
    `).join('');
    container.innerHTML = head + rows;
  }

  async function salvarPessoa(payload, file) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => v != null && fd.append(k, String(v)));
    if (file) fd.append('documento', file);

    const res = await fetch(`${API_BASE}/pessoas`, {
      method: 'POST',
      headers: { ...authHeader() },
      body: fd,
    });
    if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
    return res.json().catch(() => ({}));
  }

  // monta a tela (aba CPF/CNPJ)
  window.mountPessoas = async function () {
    const sec = document.getElementById('tab-cpfcnpj');
    if (!sec || sec.dataset.mounted === '1') return;
    sec.dataset.mounted = '1';

    const form = sec.querySelector('#form-pessoa');         // renomeado
    const inputTipo = sec.querySelector('#veh-tipoPessoa');
    const inputNome = sec.querySelector('#veh-nome');
    const inputCPF = sec.querySelector('#veh-cpf');
    const inputTelefone = sec.querySelector('#veh-telefone');
    const inputEmail = sec.querySelector('#veh-email');
    const inputValidade = sec.querySelector('#veh-validade');
    const inputDoc = sec.querySelector('#veh-doc');

    const btnLimpar = sec.querySelector('#veh-limpar');
    const tabela = document.getElementById('pessoas-tabela') || sec; // crie um container se quiser

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        tipoPessoa: (inputTipo.value || '').trim(),   // NOVO
        nome: inputNome.value.trim(),
        cpf: inputCPF.value.trim(),
        telefone: inputTelefone.value.trim(),
        email: inputEmail.value.trim() || null,
        validadeDocumento: inputValidade.value || null,
      };
      try {
        await salvarPessoa(payload, inputDoc.files?.[0]);
        alert('Pessoa salva com sucesso!');
        form.reset();
        await listarPessoas(tabela);
      } catch (err) {
        console.error(err);
        alert('Falha ao salvar pessoa. Verifique se a API possui /pessoas (POST) e aceita FormData.');
      }
    });

    btnLimpar?.addEventListener('click', () => form.reset());

    await listarPessoas(tabela);
  };
})();
