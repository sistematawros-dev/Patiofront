// CADASTRO DE SERVIÇO - JavaScript
// Autocomplete Mock Data
const categoriasData = [
    { id: 1, nome: 'Insumos Agrícolas', codigo: '01' },
    { id: 2, nome: 'Inseticida', codigo: '01.01' },
    { id: 3, nome: 'Fungicida', codigo: '01.02' },
    { id: 4, nome: 'Herbicida', codigo: '01.03' },
    { id: 5, nome: 'Fertilizantes', codigo: '02' },
    { id: 6, nome: 'Sementes', codigo: '03' },
    { id: 7, nome: 'Ferramentas', codigo: '04' },
];

const descricoesData = [
    'Inseticida POWER KILL',
    'Inseticida ULTRA PROTECT',
    'Fungicida BIO GUARD',
    'Herbicida WEED CONTROL',
    'Fertilizante NPK 10-10-10',
    'Semente de Tomate',
    'Enxada de Jardim',
];

// Autocomplete Function
function setupAutocomplete(inputId, dropdownId, dataArray, isObject = false) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    if (!input || !dropdown) return;

    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();

        if (value.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        let filtered;
        if (isObject) {
            filtered = dataArray.filter(item =>
                item.nome.toLowerCase().includes(value) ||
                item.codigo.toLowerCase().includes(value)
            );
        } else {
            filtered = dataArray.filter(item =>
                item.toLowerCase().includes(value)
            );
        }

        if (filtered.length === 0) {
            dropdown.style.display = 'none';
            return;
        }

        dropdown.innerHTML = '';
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';

            if (isObject) {
                div.innerHTML = `
                    <div class="autocomplete-item-main">${item.nome}</div>
                    <div class="autocomplete-item-sub">Código: ${item.codigo}</div>
                `;
                div.addEventListener('click', () => {
                    input.value = item.nome;
                    dropdown.style.display = 'none';
                });
            } else {
                div.innerHTML = `<div class="autocomplete-item-main">${item}</div>`;
                div.addEventListener('click', () => {
                    input.value = item;
                    dropdown.style.display = 'none';
                });
            }

            dropdown.appendChild(div);
        });

        dropdown.style.display = 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Keyboard navigation
    let currentFocus = -1;
    input.addEventListener('keydown', function(e) {
        const items = dropdown.getElementsByClassName('autocomplete-item');

        if (e.key === 'ArrowDown') {
            currentFocus++;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        }
    });

    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('active');
    }

    function removeActive(items) {
        for (let item of items) {
            item.classList.remove('active');
        }
    }
}

// Drawer: Selecionar Classe
const selecionarClasseBtn = document.getElementById('selecionarClasseBtn');
const cancelDrawerClasse = document.getElementById('cancelDrawerClasse');
const confirmDrawerClasse = document.getElementById('confirmDrawerClasse');
const classeInput = document.getElementById('classeInput');
const selectedClasseValue = document.getElementById('selectedClasseValue');
let selectedClasse = null;

// Open drawer
if (selecionarClasseBtn) {
    selecionarClasseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Botão clicado');
        if (typeof openDrawer === 'function') {
            console.log('Abrindo drawer...');
            openDrawer('drawerSelecionarClasse');
        } else {
            console.error('Função openDrawer não encontrada');
        }
    });
} else {
    console.error('Botão selecionarClasseBtn não encontrado');
}

// Close drawer button (X) now handled by initDrawerCloseButtons() in modals.js

if (cancelDrawerClasse) {
    cancelDrawerClasse.addEventListener('click', () => {
        closeDrawer('drawerSelecionarClasse');
    });
}

// Close drawer on overlay click
const drawerSelecionarClasse = document.getElementById('drawerSelecionarClasse');
if (drawerSelecionarClasse) {
    drawerSelecionarClasse.addEventListener('click', (e) => {
        if (e.target === drawerSelecionarClasse) {
            closeDrawer('drawerSelecionarClasse');
        }
    });
}

// TreeView functionality - Drawer
const treeTogglesDrawer = document.querySelectorAll('.tree-toggle-drawer');
treeTogglesDrawer.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = toggle.getAttribute('data-expanded') === 'true';
        const treeItem = toggle.closest('.tree-item-drawer');
        const children = treeItem.nextElementSibling;

        if (children && children.classList.contains('tree-children-drawer')) {
            toggle.setAttribute('data-expanded', !isExpanded);
            children.style.display = isExpanded ? 'none' : 'block';
        }
    });
});

// Tree item selection - Drawer
const selectableItemsDrawer = document.querySelectorAll('.tree-item-drawer.selectable');
selectableItemsDrawer.forEach(item => {
    item.addEventListener('click', () => {
        // Remove previous selection
        document.querySelectorAll('.tree-item-drawer.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection
        item.classList.add('selected');
        selectedClasse = item.getAttribute('data-value');

        // Update selection display
        if (selectedClasseValue) {
            selectedClasseValue.textContent = selectedClasse;
        }
    });
});

// Confirm selection - Drawer
if (confirmDrawerClasse) {
    confirmDrawerClasse.addEventListener('click', () => {
        if (selectedClasse) {
            classeInput.value = selectedClasse;
            closeDrawer('drawerSelecionarClasse');
        } else {
            alert('Por favor, selecione uma classe.');
        }
    });
}

// Search in tree - Drawer
const searchClasseDrawer = document.getElementById('searchClasseDrawer');
if (searchClasseDrawer) {
    searchClasseDrawer.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        const allItems = document.querySelectorAll('.tree-item-drawer');

        allItems.forEach(item => {
            const label = item.querySelector('.tree-label-drawer');
            if (label) {
                const text = label.textContent.toLowerCase();
                const parent = item.parentElement;

                if (text.includes(value) || value === '') {
                    item.style.display = 'flex';
                    // Expand parent if searching
                    if (value !== '' && parent && parent.classList.contains('tree-children-drawer')) {
                        parent.style.display = 'block';
                        const parentToggle = parent.previousElementSibling?.querySelector('.tree-toggle-drawer');
                        if (parentToggle) {
                            parentToggle.setAttribute('data-expanded', 'true');
                        }
                    }
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
}

// Collapsible Sections
const collapsibleHeaders = document.querySelectorAll('.section-header-collapsible');
collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const section = header.closest('.collapsible-section');
        const content = section.querySelector('.section-content');
        const chevron = header.querySelector('.section-chevron');

        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block';
            chevron.style.transform = 'rotate(180deg)';
        } else {
            content.style.display = 'none';
            chevron.style.transform = 'rotate(0deg)';
        }
    });
});

// Money input formatting
const moneyInputs = document.querySelectorAll('.money-input');
moneyInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = (parseInt(value) / 100).toFixed(2);
        e.target.value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    });
});

// Initialize autocomplete
setupAutocomplete('categoria', 'categoriaDropdown', categoriasData, true);
setupAutocomplete('descricao', 'descricaoDropdown', descricoesData, false);

// Calculate margin
function calculateMargin() {
    const custoInput = document.querySelector('.money-input:nth-of-type(1)');
    const vendaInput = document.querySelector('.money-input:nth-of-type(2)');
    const margemInput = document.querySelector('input[placeholder="0%"]');

    if (custoInput && vendaInput && margemInput) {
        const updateMargin = () => {
            const custo = parseFloat(custoInput.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
            const venda = parseFloat(vendaInput.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;

            if (custo > 0) {
                const margem = ((venda - custo) / custo * 100).toFixed(2);
                margemInput.value = margem + '%';
            } else {
                margemInput.value = '0%';
            }
        };

        custoInput.addEventListener('input', updateMargin);
        vendaInput.addEventListener('input', updateMargin);
    }
}

calculateMargin();

// Button Group Toggle
const buttonToggles = document.querySelectorAll('.btn-toggle');
buttonToggles.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        // Se clicar em serviço, redirecionar para página de serviço
        if (value === 'servico' && window.location.pathname.includes('cadastro-produto.html')) {
            window.location.href = './cadastro-servico.html';
            return;
        }

        // Se clicar em produto, redirecionar para página de produto
        if (value === 'produto' && window.location.pathname.includes('cadastro-servico.html')) {
            window.location.href = './cadastro-produto.html';
            return;
        }

        // Remove active from all buttons in the same group
        const group = this.closest('.button-group-toggle');
        group.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active to clicked button
        this.classList.add('active');

        // Log the selected value
        console.log('Selected type:', value);
    });
});

console.log('Cadastro de Serviço scripts loaded');
