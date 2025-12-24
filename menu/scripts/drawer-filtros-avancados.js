// ========================================
// DRAWER: FILTROS AVANÇADOS
// Usado em: pessoas-empresas.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script drawer-filtros-avancados.js carregado');

    // Usar setTimeout para garantir que todos os scripts foram carregados
    setTimeout(function() {
        const btnFilter = document.querySelector('.btn-filter');
        const drawerId = 'drawerFiltrosAvancados';

        console.log('Botão filtros encontrado:', btnFilter);
        console.log('Função openDrawer disponível:', typeof openDrawer);

        // Abrir drawer ao clicar no botão de filtro
        if (btnFilter) {
            btnFilter.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Botão de filtros avançados clicado!');
                console.log('Tentando abrir drawer:', drawerId);

                if (typeof openDrawer === 'function') {
                    openDrawer(drawerId);
                    console.log('Drawer aberto com sucesso');
                } else {
                    console.error('Função openDrawer não encontrada');
                }
            });
            console.log('Event listener adicionado ao botão de filtros');
        } else {
            console.error('Botão .btn-filter não encontrado!');
        }
    }, 100);
});

// Função para aplicar filtros
function aplicarFiltros() {
    const filterInput = document.getElementById('filterSearchInput');

    if (!filterInput) {
        console.warn('Campo de busca não encontrado');
        closeDrawer('drawerFiltrosAvancados');
        return;
    }

    const searchTerm = filterInput.value.trim();

    if (searchTerm) {
        console.log('Aplicando filtro:', searchTerm);

        // Implementar lógica de filtro aqui
        // Exemplo: filtrar tabela com base no termo de busca
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Fechar drawer
    if (typeof closeDrawer === 'function') {
        closeDrawer('drawerFiltrosAvancados');
    }
}
