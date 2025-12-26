/**
 * TAWROS - Dashboard/Painel Scripts
 * Gerencia interações específicas da tela de Painel
 */

(function() {
    'use strict';

    // === DROPDOWN FILIAL ===
    const filialDropdownContainer = document.querySelector('.filial-dropdown-container');
    const filialDropdownButton = document.querySelector('.filial-dropdown-button');
    const filialDropdownMenu = document.querySelector('.filial-dropdown-menu');
    const filialDropdownItems = document.querySelectorAll('.filial-dropdown-item');

    if (filialDropdownButton && filialDropdownMenu) {
        // Gerenciar abertura/fechamento do dropdown
        filialDropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = filialDropdownMenu.style.display === 'block';
            filialDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!filialDropdownContainer.contains(e.target)) {
                filialDropdownMenu.style.display = 'none';
            }
        });

        // Selecionar item do dropdown
        filialDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedText = item.textContent;
                filialDropdownButton.querySelector('span').textContent = selectedText;
                filialDropdownMenu.style.display = 'none';

                // Emitir evento customizado para outras partes da aplicação
                const event = new CustomEvent('filialChanged', {
                    detail: { filial: selectedText }
                });
                document.dispatchEvent(event);
            });
        });
    }

    // === PANEL DROPDOWN ===
    const panelDropdownContainer = document.querySelector('.panel-dropdown-container');
    const panelDropdownButton = document.querySelector('.panel-dropdown-button');
    const panelDropdownMenu = document.querySelector('.panel-dropdown-menu');
    const panelDropdownItems = document.querySelectorAll('.panel-dropdown-item');

    if (panelDropdownButton && panelDropdownMenu) {
        // Gerenciar abertura/fechamento do dropdown
        panelDropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = panelDropdownMenu.style.display === 'block';
            panelDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (panelDropdownContainer && !panelDropdownContainer.contains(e.target)) {
                panelDropdownMenu.style.display = 'none';
            }
        });

        // Selecionar item do dropdown
        panelDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedText = item.textContent;
                panelDropdownButton.querySelector('span').textContent = selectedText;
                panelDropdownMenu.style.display = 'none';

                // Emitir evento customizado
                const event = new CustomEvent('panelChanged', {
                    detail: { panel: selectedText }
                });
                document.dispatchEvent(event);
            });
        });
    }

    // === DASHBOARD TABS (Legacy - manter para compatibilidade) ===
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const resumoSection = document.querySelector('.section');

    if (dashboardTabs.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover classe active de todas as tabs
                dashboardTabs.forEach(t => t.classList.remove('active'));

                // Adicionar classe active na tab clicada
                tab.classList.add('active');

                const selectedTab = tab.dataset.tab;

                // Mostrar/ocultar conteúdo conforme tab selecionada
                if (selectedTab === 'resumo') {
                    // Mostrar conteúdo de resumo
                    if (resumoSection) {
                        resumoSection.style.display = 'block';
                    }
                    console.log('Mostrando Resumo de desempenho');
                } else if (selectedTab === 'pedidos') {
                    // Ocultar resumo e mostrar painel de pedidos
                    if (resumoSection) {
                        resumoSection.style.display = 'none';
                    }
                    console.log('Mostrando Painel de Pedidos (não implementado)');
                    // TODO: Implementar painel de pedidos
                }

                // Emitir evento customizado
                const event = new CustomEvent('dashboardTabChanged', {
                    detail: { tab: selectedTab }
                });
                document.dispatchEvent(event);
            });
        });
    }

    // === TIME FILTER BUTTONS ===
    const timeFilterBtns = document.querySelectorAll('.tabs-right .time-filter-btn');

    if (timeFilterBtns.length > 0) {
        timeFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos os botões
                timeFilterBtns.forEach(b => b.classList.remove('active'));

                // Adicionar classe active no botão clicado
                btn.classList.add('active');

                const period = btn.dataset.period;
                console.log('Filtro de tempo selecionado:', period);

                // Emitir evento customizado para atualizar gráficos
                const event = new CustomEvent('timePeriodChanged', {
                    detail: { period }
                });
                document.dispatchEvent(event);
            });
        });
    }

    // === ADVANCED FILTERS BUTTON ===
    const advancedFiltersBtn = document.querySelector('.advanced-filters-btn');

    if (advancedFiltersBtn) {
        advancedFiltersBtn.addEventListener('click', () => {
            console.log('Filtros avançados clicados');
            // TODO: Abrir modal/drawer de filtros avançados
            alert('Funcionalidade de Filtros Avançados será implementada em breve!');
        });
    }

    // === MORE/LESS BUTTON ===
    const moreLessBtn = document.querySelector('.more-less-btn');

    if (moreLessBtn) {
        let isExpanded = false;

        moreLessBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            // Alternar texto e ícone
            const span = moreLessBtn.querySelector('span');
            if (isExpanded) {
                span.textContent = 'Menos';
                moreLessBtn.classList.add('expanded');
            } else {
                span.textContent = 'Mais';
                moreLessBtn.classList.remove('expanded');
            }

            console.log('Modo expandido:', isExpanded);

            // TODO: Mostrar/ocultar conteúdo adicional
            // Emitir evento customizado
            const event = new CustomEvent('dashboardExpanded', {
                detail: { expanded: isExpanded }
            });
            document.dispatchEvent(event);
        });
    }

    // === LISTENERS PARA EVENTOS CUSTOMIZADOS ===
    // Outros módulos podem escutar esses eventos para reagir às mudanças

    document.addEventListener('filialChanged', (e) => {
        console.log('Filial alterada para:', e.detail.filial);
        // Aqui você pode recarregar dados, atualizar gráficos, etc.
    });

    document.addEventListener('timePeriodChanged', (e) => {
        console.log('Período de tempo alterado para:', e.detail.period);
        // Aqui você pode atualizar os gráficos com dados do novo período
    });

    console.log('[Dashboard] Scripts carregados com sucesso');
})();
