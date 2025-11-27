// ========================================
// PESSOAS E EMPRESAS - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // === SEARCH FUNCTIONALITY ===
    const searchInput = document.querySelector('.search-input');
    const clearIcon = document.querySelector('.clear-icon');
    const tableRows = document.querySelectorAll('.data-table tbody tr');

    // Show/hide clear icon
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearIcon.style.display = 'block';
        } else {
            clearIcon.style.display = 'none';
        }
        filterTable();
    });

    // Clear search
    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        clearIcon.style.display = 'none';
        filterTable();
    });

    // Filter table based on search input
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // === TAB SWITCHING ===
    const contentTabs = document.querySelectorAll('.content-tab');

    contentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            contentTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Here you would load different content based on the tab
            // For now, we'll just switch the active state
        });
    });

    // === TABLE SORTING ===
    const thButtons = document.querySelectorAll('.th-button');
    let currentSort = {
        column: null,
        ascending: true
    };

    thButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const columnIndex = index;
            sortTable(columnIndex);

            // Update sort arrow classes
            thButtons.forEach(btn => {
                btn.classList.remove('sort-asc', 'sort-desc');
            });

            // Add appropriate class based on sort direction
            if (currentSort.column === columnIndex) {
                if (currentSort.ascending) {
                    this.classList.add('sort-asc');
                } else {
                    this.classList.add('sort-desc');
                }
            }
        });
    });

    function sortTable(columnIndex) {
        const tbody = document.querySelector('.data-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        const ascending = currentSort.column === columnIndex ? !currentSort.ascending : true;
        currentSort = { column: columnIndex, ascending: ascending };

        rows.sort((a, b) => {
            const aValue = a.cells[columnIndex].textContent.trim();
            const bValue = b.cells[columnIndex].textContent.trim();

            if (ascending) {
                return aValue.localeCompare(bValue, 'pt-BR');
            } else {
                return bValue.localeCompare(aValue, 'pt-BR');
            }
        });

        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
    }

    // === PAGINATION ===
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const entriesDropdownBtn = document.getElementById('entriesDropdownBtn');
    const entriesDropdownMenu = document.getElementById('entriesDropdownMenu');
    const entriesOptions = document.querySelectorAll('.entries-option');
    let entriesPerPage = 10;

    // Toggle dropdown de entradas
    entriesDropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = entriesDropdownMenu.style.display === 'block';

        if (isActive) {
            entriesDropdownMenu.style.display = 'none';
            entriesDropdownBtn.classList.remove('active');
        } else {
            entriesDropdownMenu.style.display = 'block';
            entriesDropdownBtn.classList.add('active');
        }
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!entriesDropdownBtn.contains(e.target) && !entriesDropdownMenu.contains(e.target)) {
            entriesDropdownMenu.style.display = 'none';
            entriesDropdownBtn.classList.remove('active');
        }
    });

    // Selecionar opção de entradas
    entriesOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));

            // Atualizar valor de entradas por página
            entriesPerPage = value;

            // Atualizar texto do botão
            entriesDropdownBtn.innerHTML = `${value} Entradas <i data-lucide="chevron-down"></i>`;

            // Atualizar classe active
            entriesOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Fechar dropdown
            entriesDropdownMenu.style.display = 'none';
            entriesDropdownBtn.classList.remove('active');

            // Recriar ícones do Lucide
            lucide.createIcons();

            // Atualizar texto de paginação
            updatePaginationText(1);

            console.log(`Exibindo ${value} entradas por página`);
        });
    });

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled || this.classList.contains('active')) {
                return;
            }

            // Handle pagination logic
            const pageNumber = this.textContent.trim();

            if (pageNumber && !isNaN(pageNumber)) {
                // Update active state
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Here you would load data for the selected page
                // For now, we'll just update the pagination text
                updatePaginationText(parseInt(pageNumber));
            }
        });
    });

    function updatePaginationText(page) {
        const totalEntries = 1230;
        const start = (page - 1) * entriesPerPage + 1;
        const end = Math.min(page * entriesPerPage, totalEntries);

        const paginationText = document.querySelector('.pagination-text');
        paginationText.textContent = `Mostrando ${start} a ${end} de ${totalEntries} entradas.`;
    }

    // === ACTION BUTTONS ===
    const actionLinks = document.querySelectorAll('.action-link');

    actionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const codigo = row.cells[0].textContent;
            const cpfCnpj = row.cells[1].textContent;
            const nomeRazao = row.cells[2].textContent;

            console.log('Editar:', { codigo, cpfCnpj, nomeRazao });
            // Here you would open an edit modal or navigate to edit page
        });
    });

    // === FILTER BUTTON ===
    const btnFilter = document.querySelector('.btn-filter');

    btnFilter.addEventListener('click', function() {
        console.log('Filter button clicked');
        // Here you would show a filter modal or panel
    });

    // === NEW CADASTRO BUTTON ===
    const btnPrimary = document.querySelector('.btn-primary');

    btnPrimary.addEventListener('click', function() {
        console.log('Novo cadastro clicked');
        // Here you would open a modal or navigate to create page
    });
});
