// ========================================
// CLASSIFICAÇÃO - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // === CLASSIFICATION TAB SWITCHING ===
    const classificacaoTabs = document.querySelectorAll('.classificacao-tab');

    classificacaoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            classificacaoTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.getAttribute('data-tab');
            console.log('Classificação tab ativa:', tabName);

            // Here you would load different tree data based on the tab
            // For now, we'll just switch the active state
        });
    });

    // === TREE VIEW FUNCTIONALITY ===
    const treeToggles = document.querySelectorAll('.tree-toggle');
    const treeItems = document.querySelectorAll('.tree-item');

    // Handle tree toggle clicks
    treeToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();

            const treeItem = this.closest('.tree-item');
            const nextElement = treeItem.nextElementSibling;

            // Toggle expanded class on button
            this.classList.toggle('expanded');

            // Toggle children visibility
            if (nextElement && nextElement.classList.contains('tree-children')) {
                nextElement.classList.toggle('expanded');
            }

            // Recreate icons to update chevron rotation
            lucide.createIcons({
                attrs: {
                    width: '18',
                    height: '18'
                }
            });
        });
    });

    // Handle tree item clicks
    treeItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            treeItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            const label = this.querySelector('.tree-label').textContent;
            console.log('Item selecionado:', label);

            // Here you would load details for the selected item
        });
    });

    // === INITIALIZE EXPANDED TREE NODES ===
    // Automatically expand tree nodes that have the 'expanded' class on their toggle
    document.querySelectorAll('.tree-toggle.expanded').forEach(toggle => {
        const treeItem = toggle.closest('.tree-item');
        const nextElement = treeItem.nextElementSibling;

        if (nextElement && nextElement.classList.contains('tree-children')) {
            nextElement.classList.add('expanded');
        }
    });

    // === BUTTON ACTIONS ===
    const btnCancelar = document.querySelector('.btn-secondary');
    const btnSalvar = document.querySelector('.classificacao-actions .btn-primary');

    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            console.log('Cancelar clicked');
            // Here you would handle cancel action
            // For example: return to previous page or reset form
            window.history.back();
        });
    }

    if (btnSalvar) {
        btnSalvar.addEventListener('click', function() {
            console.log('Salvar cadastro clicked');
            // Here you would handle save action
            // For example: send data to server
            alert('Classificação salva com sucesso!');
        });
    }

    // === KEYBOARD NAVIGATION ===
    document.addEventListener('keydown', function(e) {
        const activeItem = document.querySelector('.tree-item.active');

        if (!activeItem) return;

        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                navigateTree(activeItem, 'up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateTree(activeItem, 'down');
                break;
            case 'ArrowRight':
                e.preventDefault();
                expandTreeNode(activeItem);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                collapseTreeNode(activeItem);
                break;
            case 'Enter':
                e.preventDefault();
                activeItem.click();
                break;
        }
    });

    // Navigation helper functions
    function navigateTree(currentItem, direction) {
        const allVisibleItems = Array.from(document.querySelectorAll('.tree-item'))
            .filter(item => {
                const rect = item.getBoundingClientRect();
                return rect.height > 0;
            });

        const currentIndex = allVisibleItems.indexOf(currentItem);
        let nextIndex;

        if (direction === 'up') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        } else {
            nextIndex = currentIndex < allVisibleItems.length - 1 ? currentIndex + 1 : currentIndex;
        }

        allVisibleItems[nextIndex].click();
        allVisibleItems[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function expandTreeNode(item) {
        const toggle = item.querySelector('.tree-toggle');
        if (toggle && !toggle.classList.contains('expanded')) {
            toggle.click();
        }
    }

    function collapseTreeNode(item) {
        const toggle = item.querySelector('.tree-toggle');
        if (toggle && toggle.classList.contains('expanded')) {
            toggle.click();
        }
    }

    // === SEARCH FUNCTIONALITY (Optional Enhancement) ===
    // You can add search functionality to filter tree items
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);

            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase();
                filterTree(searchTerm);
            }, 300);
        });
    }

    function filterTree(searchTerm) {
        const allItems = document.querySelectorAll('.tree-item');

        if (!searchTerm) {
            // Show all items
            allItems.forEach(item => {
                item.style.display = 'flex';
            });
            return;
        }

        // Filter items
        allItems.forEach(item => {
            const label = item.querySelector('.tree-label').textContent.toLowerCase();

            if (label.includes(searchTerm)) {
                item.style.display = 'flex';
                // Expand parent nodes to show matched item
                expandParentNodes(item);
            } else {
                item.style.display = 'none';
            }
        });
    }

    function expandParentNodes(item) {
        let parent = item.previousElementSibling;

        while (parent) {
            if (parent.classList.contains('tree-item')) {
                const toggle = parent.querySelector('.tree-toggle');
                if (toggle && !toggle.classList.contains('expanded')) {
                    toggle.click();
                }
                break;
            }
            parent = parent.previousElementSibling;
        }
    }
});
