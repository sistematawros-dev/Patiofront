// assets/js/veiculos.js
(function () {
  function authHeader() { return TOKEN ? { Authorization: 'Bearer ' + TOKEN } : {}; }
  const asText = (resp) => resp.text();
  let currentId = null; // estado de edição

  async function listarVeiculos(container) {
    container.innerHTML = '<p class="chip">Carregando…</p>';
    try {
      const res = await fetch(`${API_BASE}/veiculos?limit=200`, { headers: { ...authHeader() } });
      if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.items ?? []);
      renderTabela(container, items);
    } catch (e) {
      console.error('Falha ao listar veículos', e);
      container.innerHTML = '<p class="chip">Erro ao listar veículos. Verifique se a API possui /veiculos (GET).</p>';
    }
  }

  function renderTabela(container, items) {
    if (!items.length) { container.innerHTML = '<p>Nenhum veículo cadastrado.</p>'; return; }
    const head = `
      <div class="table-head">
        <div class="col">Placa</div>
        <div class="col grow">Marca / Modelo</div>
        <div class="col">Tipo</div>
        <div class="col">Cap. (t)</div>
        <div class="col">Eixos</div>
        <div class="col">Transportadora</div>
        <div class="col">Validade Doc.</div>
        <div class="col" style="width:72px">Ações</div>
      </div>`;
    const rows = items.map(v => `
      <div class="table-row" data-id="${v.id ?? ''}">
        <div class="col"><strong>${v.placa ?? '-'}</strong></div>
        <div class="col grow">${v.marca ?? '-'} / ${v.modelo ?? '-'}</div>
        <div class="col">${v.tipo ?? '-'}</div>
        <div class="col">${v.capacidade ?? '-'}</div>
        <div class="col">${v.eixos ?? '-'}</div>
        <div class="col">${v.transportadoraNome ?? v.transportadoraId ?? '-'}</div>
        <div class="col">${v.validadeDocumento ? new Date(v.validadeDocumento).toLocaleDateString() : '-'}</div>
        <div class="col">
          <button class="btn sm" data-act="edit">Editar</button>
          <button class="btn sm danger" data-act="del">🗑️</button>
        </div>
      </div>
    `).join('');
    container.innerHTML = head + rows;

    // delegação de eventos para editar / excluir
    container.querySelectorAll('.table-row').forEach(row => {
      const id = row.getAttribute('data-id');
      row.querySelector('[data-act="edit"]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        carregarParaEdicao(id);
      });
      row.querySelector('[data-act="del"]')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!id) return;
        if (!confirm('Tem certeza que deseja excluir este veículo?')) return;
        try {
          await excluirVeiculo(id);
          await listarVeiculos(container);
          if (currentId === id) limparFormulario();
          alert('Veículo excluído.');
        } catch (err) {
          console.error(err);
          alert('Falha ao excluir veículo. Verifique se a API possui /veiculos/:id (DELETE).');
        }
      });
      // clique em qualquer lugar da linha também carrega para edição
      row.addEventListener('click', () => carregarParaEdicao(id));
    });
  }

  function formDataFromPayload(payload, file) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => v != null && fd.append(k, String(v)));
    if (file) fd.append('documento', file);
    return fd;
  }

  async function salvarVeiculo(payload, file) {
    const res = await fetch(`${API_BASE}/veiculos`, { method: 'POST', headers: { ...authHeader() }, body: formDataFromPayload(payload, file) });
    if (!res.ok) {
      let j; try { j = await res.json(); } catch { }
      const e = new Error(`HTTP ${res.status}`);
      e.responseJson = j;
      throw e;
    }
    return res.json().catch(() => ({}));
  }


  async function atualizarVeiculo(id, payload, file) {
    const res = await fetch(`${API_BASE}/veiculos/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { ...authHeader() },
      body: formDataFromPayload(payload, file),
    });
    if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
    return res.json().catch(() => ({}));
  }

  async function excluirVeiculo(id) {
    const res = await fetch(`${API_BASE}/veiculos/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
    return true;
  }

  async function obterVeiculo(id) {
    const res = await fetch(`${API_BASE}/veiculos/${encodeURIComponent(id)}`, {
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error(`${res.status} ${await asText(res)}`);
    return res.json();
  }



  async function carregarParaEdicao(id) {
    if (!id) return;
    try {
      const v = await obterVeiculo(id);
      currentId = id;
      inputMarca.value = v.marca ?? '';
      inputModelo.value = v.modelo ?? '';
      inputPlaca.value = (v.placa ?? '').toUpperCase();
      inputTipo.value = v.tipo ?? '';
      inputCap.value = v.capacidade ?? '';
      inputEixos.value = v.eixos ?? '';
      inputValidade.value = v.validadeDocumento ? v.validadeDocumento.substring(0, 10) : '';
      inputTransp.value = v.transportadoraNome ?? v.transportadoraId ?? '';
      inputTranspId.value = v.transportadoraId ?? '';
      btnExcluir.style.display = 'inline-flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Falha ao carregar veículo para edição. Verifique se a API possui /veiculos/:id (GET).');
    }
  }

  // monta a tela (idempotente)
  window.mountVeiculos = async function () {
    const sec = document.getElementById('tab-veiculos');
    if (!sec || sec.dataset.mounted === '1') return;
    sec.dataset.mounted = '1';

    const form = document.getElementById('form-veiculo');
    const inputMarca = document.getElementById('veh-marca');
    const inputModelo = document.getElementById('veh-modelo');
    const inputPlaca = document.getElementById('veh-placa');
    const inputTipo = document.getElementById('vi-tipo');
    const inputCap = document.getElementById('veh-capacidade');
    const inputEixos = document.getElementById('veh-eixos');
    const inputDoc = document.getElementById('veh-doc');
    const inputValidade = document.getElementById('veh-validade');
    const inputTransp = document.getElementById('vl-transportadora');
    const inputTranspId = document.getElementById('vl-transportadora-id');



    const btnLimpar = document.getElementById('veh-limpar');
    const btnRecarregar = document.getElementById('veh-recarregar'); // opcional, se existir
    const tabela = document.getElementById('veiculos-tabela');       // precisa existir no HTML
    const btnExcluir = document.getElementById('veh-excluir');

    const ddTransp = document.getElementById('trp-dd');
    const ddModelo = document.getElementById('vl-dd'); // dropdown MODELO (já existe no HTML)
    const ddPlaca = document.getElementById('pl-dd'); // dropdown PLACA  (adicionamos no HTML)





    // util
    // util
    const debounce = (fn, t = 250) => { let h; return (...a) => { clearTimeout(h); h = setTimeout(() => fn(...a), t); }; };
    function fmtDoc(doc) { const d = (doc || '').replace(/\D/g, ''); if (d.length === 14) return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); return doc || ''; }
    function
      renderDropdownObjs(c, items, getLabel, onPick) {
      if (!c) return; if (!items.length) { c.innerHTML = ''; c.style.display = 'none'; return; }
      c.innerHTML = items.map((v, i) => `<div class="item" data-index="${i}">${getLabel(v)}</div>`).join('');
      c.style.display = 'block';
      c.querySelectorAll('.item').forEach(el => {
        el.addEventListener('mousedown', ev => { ev.preventDefault(); onPick(items[+el.dataset.index]); });
      });
    }

    function limparFormulario() {
      currentId = null;
      btnExcluir.style.display = 'none';
      form.reset();
      inputTranspId.value = '';

    }

    function closeDropdown(c) { if (c) c.style.display = 'none'; }
    function highlight(c, idx) { if (!c) return; const items = c.querySelectorAll('.item'); items.forEach((el, i) => el.classList.toggle('active', i === idx)); if (idx >= 0 && idx < items.length) items[idx].scrollIntoView({ block: 'nearest' }); }

    function renderDropdownObjs(container, items, getLabel, onPick) {
      if (!container) return;
      if (!items.length) { container.innerHTML = ''; container.style.display = 'none'; return; }
      container.innerHTML = items.map((v, i) => `<div class="item" data-index="${i}">${getLabel(v)}</div>`).join('');
      container.style.display = 'block';
      container.querySelectorAll('.item').forEach(el => {
        el.addEventListener('mousedown', (ev) => { ev.preventDefault(); onPick(items[Number(el.dataset.index)]); });
      });
    }
    function closeDropdown(c) { if (c) c.style.display = 'none'; }
    function highlight(container, idx) {
      if (!container) return;
      const nodes = container.querySelectorAll('.item');
      nodes.forEach((el, i) => el.classList.toggle('active', i === idx));
      if (idx >= 0 && idx < nodes.length) nodes[idx].scrollIntoView({ block: 'nearest' });
    }


    // --- BUSCA (API) ---
    async function buscarVeiculosSugestoes(q) {
      q = (q || '').trim();
      if (!q) return [];
      const res = await fetch(`${API_BASE}/veiculos?limit=12&search=${encodeURIComponent(q)}`, { headers: { ...authHeader() } });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data.items ?? []);
    }

    // --- DROPDOWN (renderer genérico) ---
    function renderDropdownObjs(container, items, getLabel, onPick) {
      if (!container) return;
      if (!items.length) { container.innerHTML = ''; container.style.display = 'none'; return; }
      container.innerHTML = items.map((v, i) => `<div class="item" data-index="${i}">${getLabel(v)}</div>`).join('');
      container.style.display = 'block';
      container.querySelectorAll('.item').forEach(el => {
        el.addEventListener('mousedown', (ev) => { ev.preventDefault(); onPick(items[Number(el.dataset.index)]); });
      });
    }
    function closeDropdown(c) { if (c) c.style.display = 'none'; }
    function highlight(container, idx) {
      if (!container) return;
      const nodes = container.querySelectorAll('.item');
      nodes.forEach((el, i) => el.classList.toggle('active', i === idx));
      if (idx >= 0 && idx < nodes.length) nodes[idx].scrollIntoView({ block: 'nearest' });
    }

    // ====== MODELO: sugestões ======
    let _modeloItems = [];
    let _mIndex = -1;
    const buscarModelos = debounce(async (q) => {
      const items = await buscarVeiculosSugestoes(q);
      // Dica: se houver marca preenchida, priorize modelos daquela marca
      // Para modelo, mostramos "Modelo — Placa" para não confundir
      _modeloItems = items.filter(v => v.modelo).slice(0, 12);
      _mIndex = -1;
      renderDropdownObjs(ddModelo, _modeloItems, (v) => `${v.modelo} — ${v.placa}`, (v) => {
        selecionarVeiculo(v, { inputMarca, inputModelo, inputPlaca, inputTipo, inputCap, inputEixos, inputValidade, inputTransp, btnExcluir });
        closeDropdown(ddModelo);
      });
    }, 250);

    inputModelo.addEventListener('input', (e) => buscarModelos(e.target.value));
    inputModelo.addEventListener('focus', () => { if (_modeloItems.length) ddModelo.style.display = 'block'; });
    inputModelo.addEventListener('blur', () => setTimeout(() => closeDropdown(ddModelo), 120));
    inputModelo.addEventListener('keydown', (e) => {
      if (ddModelo.style.display !== 'block') return;
      const max = _modeloItems.length - 1;
      if (e.key === 'ArrowDown') { e.preventDefault(); _mIndex = Math.min(max, _mIndex + 1); highlight(ddModelo, _mIndex); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); _mIndex = Math.max(0, _mIndex - 1); highlight(ddModelo, _mIndex); }
      else if (e.key === 'Enter' && _mIndex >= 0) { e.preventDefault(); selecionarVeiculo(_modeloItems[_mIndex], { inputMarca, inputModelo, inputPlaca, inputTipo, inputCap, inputEixos, inputValidade, inputTransp, btnExcluir }); closeDropdown(ddModelo); }
      else if (e.key === 'Escape') closeDropdown(ddModelo);
    });

    // ====== PLACA: sugestões ======
    let _placaItems = [];
    let _pIndex = -1;
    const buscarPlacas = debounce(async (q) => {

      const items = await buscarVeiculosSugestoes(q);
      _placaItems = items.filter(v => v.placa).slice(0, 12);

      _pIndex = -1;
      renderDropdownObjs(ddPlaca, _placaItems, (v) => v.placa, (v) => {

        selecionarVeiculo(v, { inputMarca, inputModelo, inputPlaca, inputTipo, inputCap, inputEixos, inputValidade, inputTransp, btnExcluir });
        closeDropdown(ddPlaca);

      });
    }, 250);

    inputPlaca.addEventListener('input', (e) => {
      inputPlaca.value = inputPlaca.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
      buscarPlacas(e.target.value);
    });
    inputPlaca.addEventListener('focus', () => { if (_placaItems.length) ddPlaca.style.display = 'block'; });
    inputPlaca.addEventListener('blur', () => setTimeout(() => closeDropdown(ddPlaca), 120));
    inputPlaca.addEventListener('keydown', (e) => {
      if (ddPlaca.style.display !== 'block') return;
      const max = _placaItems.length - 1;
      if (e.key === 'ArrowDown') { e.preventDefault(); _pIndex = Math.min(max, _pIndex + 1); highlight(ddPlaca, _pIndex); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); _pIndex = Math.max(0, _pIndex - 1); highlight(ddPlaca, _pIndex); }
      else if (e.key === 'Enter' && _pIndex >= 0) { e.preventDefault(); selecionarVeiculo(_placaItems[_pIndex], { inputMarca, inputModelo, inputPlaca, inputTipo, inputCap, inputEixos, inputValidade, inputTransp, btnExcluir }); closeDropdown(ddPlaca); }
      else if (e.key === 'Escape') closeDropdown(ddPlaca);
    });


    // ===== Transportadora (autocomplete) =====
    let _trpItems = [];
    let _tIndex = -1;

    async function buscarTransportadorasAPI(q) {
      console.log("passo 3");
      q = (q || '').trim();
      if (!q) return [];
      const res = await fetch(`${API_BASE}/pessoas/transportadoras?limit=12&search=${encodeURIComponent(q)}`, {
        headers: { ...authHeader() }
      });
      if (!res.ok) return [];
      const data = await res.json();
      // backend retorna [{id, nome, cpf}]
      return Array.isArray(data) ? data : (data.items ?? []);
    }

    const buscarTransportadoras = debounce(async (q) => {

      _trpItems = (await buscarTransportadorasAPI(q)).filter(p => p?.nome).slice(0, 12);

      _tIndex = -1;
      renderDropdownObjs(ddTransp, _trpItems, (p) => `${p.nome} — ${fmtDoc(p.cpf)}`, (p) => {
        inputTransp.value = p.nome;
        inputTranspId.value = p.id || '';
        closeDropdown(ddTransp);

      }
      );
    }, 250);

    // listeners do campo
    inputTransp.addEventListener('input', (e) => {

      console.log("passo 1");
      inputTranspId.value = '';
      buscarTransportadoras(e.target.value);
    });

    inputTransp.addEventListener('focus', () => { if (_trpItems.length) ddTransp.style.display = 'block'; });
    inputTransp.addEventListener('blur', () => setTimeout(() => closeDropdown(ddTransp), 120));
    inputTransp.addEventListener('keydown', (e) => {
      if (ddTransp.style.display !== 'block') return;
      const max = _trpItems.length - 1;
      if (e.key === 'ArrowDown') { e.preventDefault(); _tIndex = Math.min(max, _tIndex + 1); highlight(ddTransp, _tIndex); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); _tIndex = Math.max(0, _tIndex - 1); highlight(ddTransp, _tIndex); }
      else if (e.key === 'Enter' && _tIndex >= 0) {
        e.preventDefault();
        console.log("teste");
        const p = _trpItems[_tIndex];
        inputTransp.value = p.nome;
        inputTranspId.value = p.id || '';
        closeDropdown(ddTransp);
      }
      else if (e.key === 'Escape') closeDropdown(ddTransp);
    });



    // destaque visual no dropdown (igual ao de Usuários)
    function highlight(container, idx) {
      if (!container) return;
      const items = container.querySelectorAll('.item');
      items.forEach((el, i) => el.classList.toggle('active', i === idx));
      if (idx >= 0 && idx < items.length) items[idx].scrollIntoView({ block: 'nearest' });
    }

    // máscara simples placa (AAAXXXX / AAA0A00)
    inputPlaca.addEventListener('input', () => {
      inputPlaca.value = inputPlaca.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    });

    // AQUI: marque o form como já “bindado” para não adicionar o listener 2x
    if (form.dataset.bound === '1') return;
    form.dataset.bound = '1';


    // submit (criar/atualizar)
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        marca: inputMarca.value.trim(),
        modelo: inputModelo.value.trim(),
        placa: inputPlaca.value.trim().toUpperCase(),
        tipo: inputTipo.value,
        capacidade: Number(inputCap.value || 0),
        eixos: inputEixos.value === '' ? null : Number(inputEixos.value),
        validadeDocumento: inputValidade.value || null,
        transportadoraId: inputTranspId.value || null,
        transportadoraNome: inputTransp.value || null,
      };
      try {
        if (currentId) {
          await atualizarVeiculo(currentId, payload, inputDoc.files?.[0]);
          alert('Veículo atualizado com sucesso!');
          currentId = null;
          form.reset();
        } else {
          await salvarVeiculo(payload, inputDoc.files?.[0]);
          alert('Veículo salvo com sucesso!');
          currentId = null;
          form.reset();
        }
        limparFormulario();
        await listarVeiculos(tabela);
        btnExcluir.style.display = 'inline-flex';
      } catch (err) {
        console.error(err);
        /*if (err.responseJson) {
          const j = err.responseJson;
          const detalhes = j?.issues?.fieldErrors
            ? Object.entries(j.issues.fieldErrors).map(([k, v]) => `• ${k}: ${v.join(', ')}`).join('\n')
            : j?.error || '';
          alert(`Falha ao salvar/atualizar veículo.\n${detalhes}`);
        } else {
          alert('Falha ao salvar/atualizar veículo. Verifique se a API possui /veiculos (POST) e /veiculos/:id (PUT).');
        }*/
      }

    });

    // excluir (se em edição)
    btnExcluir?.addEventListener('click', async () => {
      if (!currentId) return;
      if (!confirm('Tem certeza que deseja excluir este veículo?')) return;
      try {
        await excluirVeiculo(currentId);
        alert('Veículo excluído.');
        limparFormulario();
        await listarVeiculos(tabela);
      } catch (err) {
        console.error(err);
        //alert('Falha ao excluir veículo. Verifique se a API possui /veiculos/:id (DELETE).');
      }
    });

    btnLimpar.addEventListener('click', () => limparFormulario());
    btnRecarregar?.addEventListener('click', () => listarVeiculos(tabela));

    // primeira carga
    await listarVeiculos(tabela);
  };

  function selecionarVeiculo(v, formEls) {
    const { inputMarca, inputModelo, inputPlaca, inputTipo, inputCap, inputEixos, inputValidade, inputTransp, btnExcluir } = formEls;

    currentId = v.id || null;
    inputMarca.value = v.marca ?? '';
    inputModelo.value = v.modelo ?? '';
    inputPlaca.value = (v.placa ?? '').toUpperCase();
    inputTipo.value = v.tipo ?? '';
    inputCap.value = v.capacidade ?? '';
    inputEixos.value = v.eixos ?? '';
    inputValidade.value = v.validadeDocumento ? String(v.validadeDocumento).substring(0, 10) : '';
    inputTransp.value = v.transportadoraNome ?? v.transportadoraId ?? '';

    if (btnExcluir) btnExcluir.style.display = 'inline-flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

})();




