// ========================================
// DRAWER: FILTROS DE PRODUTOS
// Usado em: produtos-servicos.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script drawer-filtros-produtos.js carregado');

    // Usar setTimeout para garantir que todos os scripts foram carregados
    setTimeout(function() {
        const btnFilter = document.querySelector('.btn-filter');
        const drawerId = 'drawerFiltrosProdutos';

        console.log('Botão filtros produtos encontrado:', btnFilter);
        console.log('Função openDrawer disponível:', typeof openDrawer);

        // Abrir drawer ao clicar no botão de filtro
        if (btnFilter) {
            btnFilter.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Botão de filtros de produtos clicado!');
                console.log('Tentando abrir drawer:', drawerId);

                if (typeof openDrawer === 'function') {
                    openDrawer(drawerId);
                    console.log('Drawer de produtos aberto com sucesso');
                } else {
                    console.error('Função openDrawer não encontrada');
                }
            });
            console.log('Event listener adicionado ao botão de filtros de produtos');
        } else {
            console.error('Botão .btn-filter não encontrado na página de produtos!');
        }
    }, 100);
});

// Função para aplicar filtros de produtos
function aplicarFiltrosProdutos() {
    const filtros = {
        descricao: null,
        codigo: null,
        grupo: null,
        categoria: null,
        classe: null
    };

    // Capturar valores dos filtros
    const descricaoInput = document.getElementById('filtroDescricao');
    const codigoInput = document.getElementById('filtroCodigo');
    const grupoSelect = document.getElementById('filtroGrupo');
    const categoriaSelect = document.getElementById('filtroCategoriaProduto');
    const classeSelect = document.getElementById('filtroClasseProduto');

    if (descricaoInput) filtros.descricao = descricaoInput.value.trim();
    if (codigoInput) filtros.codigo = codigoInput.value.trim();
    if (grupoSelect) filtros.grupo = grupoSelect.value;
    if (categoriaSelect) filtros.categoria = categoriaSelect.value;
    if (classeSelect) filtros.classe = classeSelect.value;

    console.log('Aplicando filtros de produtos:', filtros);

    // Filtrar tabela
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        let mostrar = true;
        const text = row.textContent.toLowerCase();

        // Filtro por descrição
        if (filtros.descricao) {
            if (!text.includes(filtros.descricao.toLowerCase())) {
                mostrar = false;
            }
        }

        // Filtro por código
        if (filtros.codigo) {
            const codigoCell = row.cells[0]; // Primeira coluna (código)
            if (codigoCell && !codigoCell.textContent.toLowerCase().includes(filtros.codigo.toLowerCase())) {
                mostrar = false;
            }
        }

        // Filtro por grupo
        if (filtros.grupo && filtros.grupo !== '') {
            const grupoCell = row.querySelector('[data-grupo]');
            if (grupoCell && grupoCell.getAttribute('data-grupo') !== filtros.grupo) {
                mostrar = false;
            }
        }

        // Filtro por categoria
        if (filtros.categoria && filtros.categoria !== '') {
            const categoriaCell = row.querySelector('[data-categoria]');
            if (categoriaCell && categoriaCell.getAttribute('data-categoria') !== filtros.categoria) {
                mostrar = false;
            }
        }

        // Filtro por classe
        if (filtros.classe && filtros.classe !== '') {
            const classeCell = row.querySelector('[data-classe]');
            if (classeCell && classeCell.getAttribute('data-classe') !== filtros.classe) {
                mostrar = false;
            }
        }

        row.style.display = mostrar ? '' : 'none';
    });

    // Fechar drawer
    if (typeof closeDrawer === 'function') {
        closeDrawer('drawerFiltrosProdutos');
    }
}

// Função para limpar filtros
function limparFiltrosProdutos() {
    const descricaoInput = document.getElementById('filtroDescricao');
    const codigoInput = document.getElementById('filtroCodigo');
    const grupoSelect = document.getElementById('filtroGrupo');
    const categoriaSelect = document.getElementById('filtroCategoriaProduto');
    const classeSelect = document.getElementById('filtroClasseProduto');

    if (descricaoInput) descricaoInput.value = '';
    if (codigoInput) codigoInput.value = '';
    if (grupoSelect) grupoSelect.value = '';
    if (categoriaSelect) categoriaSelect.value = '';
    if (classeSelect) classeSelect.value = '';

    // Mostrar todas as linhas
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    console.log('Filtros de produtos limpos');
}
