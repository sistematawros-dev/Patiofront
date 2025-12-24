// ========================================
// DRAWER: SELEÇÃO DE CLASSE DO PRODUTO
// ========================================

let selectedClassItem = null;

// Dados da árvore de classes (exemplo)
const classTreeData = [
    {
        id: '01',
        name: 'Insumos Agrícolas',
        type: 'folder',
        children: [
            {
                id: '01.01',
                name: 'Defensivos',
                type: 'folder',
                children: [
                    { id: '01.01.01', name: 'Inseticida', type: 'file' },
                    { id: '01.01.02', name: 'Fungicida', type: 'file' },
                    { id: '01.01.03', name: 'Herbicida', type: 'file' }
                ]
            },
            {
                id: '01.02',
                name: 'Fertilizantes',
                type: 'folder',
                children: []
            },
            {
                id: '01.03',
                name: 'Sementes',
                type: 'folder',
                children: []
            }
        ]
    },
    {
        id: '02',
        name: 'Ferramentas',
        type: 'folder',
        children: []
    },
    {
        id: '03',
        name: 'Equipamentos',
        type: 'folder',
        children: []
    }
];

// Abrir drawer
function openClassSelectorDrawer() {
    const overlay = document.getElementById('classSelectorOverlay');
    const drawer = document.getElementById('classSelectorDrawer');

    if (overlay && drawer) {
        overlay.classList.add('active');
        drawer.classList.add('active');

        // Renderizar árvore se ainda não foi renderizada
        const treeContainer = document.getElementById('classTreeContainer');
        if (treeContainer && treeContainer.children.length === 0) {
            renderClassTree(classTreeData, treeContainer);
        }

        // Recriar ícones do Lucide
        lucide.createIcons();
    }
}

// Fechar drawer
function closeClassSelectorDrawer() {
    const overlay = document.getElementById('classSelectorOverlay');
    const drawer = document.getElementById('classSelectorDrawer');

    if (overlay && drawer) {
        overlay.classList.remove('active');
        drawer.classList.remove('active');
    }
}

// Renderizar árvore de classes
function renderClassTree(items, container, level = 0) {
    const ul = document.createElement('ul');
    ul.className = 'class-tree';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'class-tree-item';

        if (item.type === 'folder') {
            // Criar botão de pasta
            const button = document.createElement('button');
            button.className = 'class-tree-toggle';
            button.innerHTML = `
                <i data-lucide="chevron-right" class="chevron"></i>
                <i data-lucide="folder" class="folder-icon"></i>
                <span>${item.name}</span>
            `;

            // Adicionar evento de toggle
            button.addEventListener('click', function() {
                this.classList.toggle('expanded');
                const children = this.nextElementSibling;
                if (children) {
                    children.classList.toggle('active');
                }
            });

            li.appendChild(button);

            // Criar lista de filhos
            if (item.children && item.children.length > 0) {
                const childrenUl = document.createElement('ul');
                childrenUl.className = 'class-tree-children';
                renderClassTree(item.children, childrenUl, level + 1);
                li.appendChild(childrenUl);
            }
        } else {
            // Criar botão de arquivo (item selecionável)
            const button = document.createElement('button');
            button.className = 'class-item-button';
            button.setAttribute('data-class-id', item.id);
            button.setAttribute('data-class-name', item.name);
            button.innerHTML = `
                <i data-lucide="file-text" class="file-icon"></i>
                <span class="class-item-code">${item.id}</span>
                <span>${item.name}</span>
            `;

            // Adicionar evento de seleção
            button.addEventListener('click', function() {
                selectClassItem(this);
            });

            li.appendChild(button);
        }

        ul.appendChild(li);
    });

    container.appendChild(ul);
}

// Selecionar item de classe
function selectClassItem(button) {
    // Verificar se o item clicado já está selecionado
    const isAlreadySelected = button.classList.contains('selected');

    // Remover seleção anterior
    const previousSelected = document.querySelector('.class-item-button.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }

    // Se o item já estava selecionado, apenas remove e limpa
    if (isAlreadySelected) {
        selectedClassItem = null;

        // Limpar seção de selecionado
        const selectedValue = document.getElementById('classSelectedValue');
        if (selectedValue) {
            selectedValue.textContent = 'Nenhuma classe selecionada';
        }

        // Desabilitar botão de selecionar
        const selectButton = document.getElementById('btnClassSelect');
        if (selectButton) {
            selectButton.disabled = true;
        }
    } else {
        // Adicionar seleção ao novo item
        button.classList.add('selected');

        // Atualizar informação selecionada
        const classId = button.getAttribute('data-class-id');
        const className = button.getAttribute('data-class-name');
        selectedClassItem = { id: classId, name: className };

        // Atualizar seção de selecionado
        const selectedValue = document.getElementById('classSelectedValue');
        if (selectedValue) {
            selectedValue.textContent = `${classId} ${className}`;
        }

        // Habilitar botão de selecionar
        const selectButton = document.getElementById('btnClassSelect');
        if (selectButton) {
            selectButton.disabled = false;
        }
    }
}

// Confirmar seleção
function confirmClassSelection() {
    if (selectedClassItem) {
        // Aqui você pode adicionar lógica para usar o item selecionado
        console.log('Classe selecionada:', selectedClassItem);

        // Atualizar campo de input se existir
        const classInput = document.getElementById('classeInput');
        if (classInput) {
            classInput.value = `${selectedClassItem.id} - ${selectedClassItem.name}`;
        }

        // Fechar drawer
        closeClassSelectorDrawer();

        // Resetar seleção
        selectedClassItem = null;
    }
}

// Busca na árvore
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('classSearchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const allItems = document.querySelectorAll('.class-item-button, .class-tree-toggle');

            if (searchTerm === '') {
                // Mostrar todos e fechar expandidos
                allItems.forEach(item => {
                    item.style.display = '';
                    if (item.classList.contains('class-tree-toggle')) {
                        item.classList.remove('expanded');
                        const children = item.nextElementSibling;
                        if (children) {
                            children.classList.remove('active');
                        }
                    }
                });
            } else {
                // Filtrar itens
                allItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.display = '';
                        // Expandir pais
                        let parent = item.closest('.class-tree-children');
                        while (parent) {
                            parent.classList.add('active');
                            const toggle = parent.previousElementSibling;
                            if (toggle && toggle.classList.contains('class-tree-toggle')) {
                                toggle.classList.add('expanded');
                            }
                            parent = parent.parentElement.closest('.class-tree-children');
                        }
                    } else {
                        if (item.classList.contains('class-item-button')) {
                            item.style.display = 'none';
                        }
                    }
                });
            }
        });
    }

    // Fechar drawer ao clicar no overlay
    const overlay = document.getElementById('classSelectorOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeClassSelectorDrawer();
            }
        });
    }

    // Fechar drawer com ESC
    document.addEventListener('keydown', function(e) {
        const drawer = document.getElementById('classSelectorDrawer');
        if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
            closeClassSelectorDrawer();
        }
    });
});
