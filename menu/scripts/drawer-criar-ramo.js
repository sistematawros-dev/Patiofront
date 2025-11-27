// ========================================
// DRAWER: CRIAR NOVO RAMO
// Usado em: cadastro-empresa.html e cadastro-pessoa.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const btnCriarRamo = document.querySelectorAll('[data-drawer="criarRamo"]');
    const drawerId = 'drawerCriarRamo';

    // Adicionar evento de click em todos os botões que abrem o drawer
    btnCriarRamo.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Abrindo drawer de criar ramo');
            if (typeof openDrawer === 'function') {
                openDrawer(drawerId);
            } else {
                console.error('Função openDrawer não encontrada');
            }
        });
    });

    // ========================================
    // FUNCIONALIDADE DE BUSCA NO DRAWER
    // ========================================

    // Selecionar o campo de busca dentro do drawer
    const drawerSearchInput = document.querySelector('#drawerCriarRamo .drawer-search-input');
    const cadastradosList = document.querySelector('#drawerCriarRamo .cadastrados-list');

    if (drawerSearchInput && cadastradosList) {
        // Evento de input para busca em tempo real
        drawerSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const cadastradosItems = cadastradosList.querySelectorAll('.cadastrado-item-ramo');

            // Filtrar os itens da lista
            cadastradosItems.forEach(item => {
                const badge = item.querySelector('.cadastrado-badge');
                const inputField = item.querySelector('.cadastrado-input');

                if (badge || inputField) {
                    // Pegar o texto do badge ou do input
                    const itemText = badge ? badge.textContent.toLowerCase() : inputField.value.toLowerCase();

                    // Mostrar ou esconder baseado na busca
                    if (itemText.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            // Verificar se há resultados
            const visibleItems = Array.from(cadastradosItems).filter(item => item.style.display !== 'none');

            // Mostrar mensagem se não houver resultados (opcional)
            let noResultsMsg = cadastradosList.querySelector('.no-results-message');

            if (visibleItems.length === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.textContent = 'Nenhum ramo encontrado';
                    noResultsMsg.style.cssText = 'padding: 16px; text-align: center; color: var(--figma-text-secondary, #6b7280); font-size: 13px;';
                    cadastradosList.appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else {
                if (noResultsMsg) {
                    noResultsMsg.style.display = 'none';
                }
            }
        });

        // Limpar busca quando o drawer for aberto
        const drawer = document.getElementById('drawerCriarRamo');
        if (drawer) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'style') {
                        const isVisible = drawer.style.display === 'flex';
                        if (isVisible) {
                            // Limpar campo de busca e resetar filtros
                            drawerSearchInput.value = '';
                            const cadastradosItems = cadastradosList.querySelectorAll('.cadastrado-item-ramo');
                            cadastradosItems.forEach(item => {
                                item.style.display = 'flex';
                            });

                            // Esconder mensagem de "nenhum resultado"
                            const noResultsMsg = cadastradosList.querySelector('.no-results-message');
                            if (noResultsMsg) {
                                noResultsMsg.style.display = 'none';
                            }
                        }
                    }
                });
            });

            observer.observe(drawer, { attributes: true });
        }
    } else {
        console.warn('Campo de busca ou lista de cadastrados não encontrados no drawer');
    }
});

// Função para salvar novo ramo
function salvarNovoRamo() {
    const nomeRamo = document.getElementById('nomeRamo');
    const descricaoRamo = document.getElementById('descricaoRamo');

    if (!nomeRamo) {
        console.error('Campo nome do ramo não encontrado');
        return;
    }

    const nome = nomeRamo.value.trim();
    const descricao = descricaoRamo ? descricaoRamo.value.trim() : '';

    if (!nome) {
        alert('Por favor, informe o nome do ramo');
        nomeRamo.focus();
        return;
    }

    console.log('Salvando novo ramo:', { nome, descricao });

    // Aqui você implementaria a lógica para salvar no backend
    // Exemplo:
    // fetch('/api/ramos', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nome, descricao })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Ramo criado:', data);
    //     // Atualizar lista de ramos
    // });

    // Limpar campos
    nomeRamo.value = '';
    if (descricaoRamo) descricaoRamo.value = '';

    // Fechar drawer
    if (typeof closeDrawer === 'function') {
        closeDrawer('drawerCriarRamo');
    }

    // Mostrar mensagem de sucesso
    alert('Ramo criado com sucesso!');
}
