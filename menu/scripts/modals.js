// ===================================
// MODAL UTILITIES
// ===================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Re-initialize lucide icons in modal
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            if (modal.style.display === 'flex') {
                closeModal(modal.id);
            }
        });
        document.querySelectorAll('.drawer-container').forEach(drawer => {
            if (drawer.style.display !== 'none') {
                const drawerId = drawer.id;
                closeDrawer(drawerId.replace('drawer', '').replace('Drawer', ''));
            }
        });
    }
});

// ===================================
// DRAWER UTILITIES
// ===================================

function openDrawer(drawerId) {
    // Aceita o ID com ou sem o prefixo "drawer"
    const fullDrawerId = drawerId.startsWith('drawer') ? drawerId : `drawer${drawerId.charAt(0).toUpperCase() + drawerId.slice(1)}`;

    const drawer = document.getElementById(fullDrawerId);

    if (drawer) {
        drawer.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Adiciona animação de slide-in para TODOS os drawers
        const drawerContainer = drawer.querySelector('.drawer-container');
        if (drawerContainer) {
            drawerContainer.classList.remove('slide-out');
            drawerContainer.classList.add('slide-in');
        }

        // Re-initialize lucide icons in drawer
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 10);
    } else {
        console.error(`Drawer not found: ${fullDrawerId}`);
    }
}

function closeDrawer(drawerId) {
    // Aceita o ID com ou sem o prefixo "drawer"
    const fullDrawerId = drawerId.startsWith('drawer') ? drawerId : `drawer${drawerId.charAt(0).toUpperCase() + drawerId.slice(1)}`;

    const drawer = document.getElementById(fullDrawerId);

    if (drawer) {
        const drawerContainer = drawer.querySelector('.drawer-container');

        // Adiciona animação de slide-out para TODOS os drawers
        if (drawerContainer) {
            drawerContainer.classList.remove('slide-in');
            drawerContainer.classList.add('slide-out');

            // Aguarda animação terminar antes de esconder
            setTimeout(() => {
                drawer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300); // Tempo da animação
        } else {
            drawer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    } else {
        console.error(`Drawer not found: ${fullDrawerId}`);
    }
}

// Close drawer on overlay click
document.querySelectorAll('.drawer-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDrawer(overlay.id);
        }
    });
});

// ===================================
// DRAWER: CRIAR NOVO GRUPO
// ===================================

// Event listeners for "Criar Grupo" drawer are handled by the generic code at the bottom

// ===================================
// DRAWER: FILTROS DE PRODUTOS
// ===================================

// COMENTADO: Agora cada página gerencia seu próprio botão de filtro
// const btnFiltrar = document.querySelectorAll('.btn-filter');
// btnFiltrar.forEach(btn => {
//     btn.addEventListener('click', () => {
//         openDrawer('Filtros');
//     });
// });

// COMENTADO: Event listeners para botões de fechar (X) agora são gerenciados pela função initDrawerCloseButtons()
// const closeDrawerFiltros = document.getElementById('closeDrawerFiltros');
// if (closeDrawerFiltros) {
//     closeDrawerFiltros.addEventListener('click', () => closeDrawer('Filtros'));
// }

const limparFiltros = document.getElementById('limparFiltros');
if (limparFiltros) {
    limparFiltros.addEventListener('click', () => {
        // Uncheck all checkboxes
        document.querySelectorAll('#drawerFiltros .checkbox-input').forEach(checkbox => {
            checkbox.checked = false;
        });
        // Reset select
        const select = document.querySelector('#drawerFiltros select');
        if (select) select.value = '';
        console.log('Filtros limpos');
    });
}

const btnAplicarFiltros = document.getElementById('aplicarFiltros');
if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener('click', () => {
        // TODO: Implement filter logic
        const filtros = {
            categoria: document.querySelector('#drawerFiltros select')?.value || '',
            classes: [],
            unidades: [],
            status: []
        };

        // Get checked filters
        document.querySelectorAll('#drawerFiltros .checkbox-input:checked').forEach(checkbox => {
            const label = checkbox.closest('label')?.textContent.trim();
            if (label) {
                const section = checkbox.closest('.filter-section')?.querySelector('.filter-section-title')?.textContent;
                if (section === 'Classe') filtros.classes.push(label);
                if (section === 'Unidade') filtros.unidades.push(label);
                if (section === 'Status') filtros.status.push(label);
            }
        });

        console.log('Aplicar filtros:', filtros);
        closeDrawer('Filtros');

        // Show feedback
        alert('Filtros aplicados! (Funcionalidade de filtragem ainda não implementada)');
    });
}

// ===================================
// UTILITY: Trigger button for "Criar Grupo" link
// ===================================

// Find "Criar Grupo" links and make them open drawer
document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim() === 'Criar Grupo') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openDrawer('drawerCriarGrupo');
        });
    }
});

// ===================================
// DRAWER TABS: Toggle active state
// ===================================

function initDrawerTabs() {
    // Find all drawer tab containers
    document.querySelectorAll('.drawer-tabs').forEach(tabContainer => {
        const tabs = tabContainer.querySelectorAll('.drawer-tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs in this container
                tabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Optional: You can add filtering logic here based on tab text
                const tabText = this.textContent.trim();
                console.log(`Tab "${tabText}" selected`);

                // Example: Filter items based on tab selection
                if (tabText === 'Ativos') {
                    // Show only active items
                    console.log('Showing active items');
                } else if (tabText === 'Inativos') {
                    // Show only inactive items
                    console.log('Showing inactive items');
                } else {
                    // Show all items
                    console.log('Showing all items');
                }
            });
        });
    });
}

// Initialize tabs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawerTabs);
} else {
    initDrawerTabs();
}

// ===================================
// DRAWER RAMO: Edit mode toggle
// ===================================

function initEditMode() {
    document.addEventListener('click', function(e) {
        // Handle edit button click
        if (e.target.closest('.btn-action-edit')) {
            const editBtn = e.target.closest('.btn-action-edit');
            const item = editBtn.closest('.cadastrado-item-ramo');
            const badge = item.querySelector('.cadastrado-badge');
            const input = item.querySelector('.cadastrado-input');
            const editButtons = item.querySelector('.cadastrado-edit-buttons');
            const toggleSwitch = item.querySelector('.toggle-switch');

            // Enter edit mode
            badge.style.display = 'none';
            input.style.display = 'block';
            input.value = badge.textContent;
            editBtn.style.display = 'none';
            editButtons.style.display = 'flex';
            toggleSwitch.style.display = 'none';

            // Focus input
            input.focus();
            input.select();
        }

        // Handle confirm button click
        if (e.target.closest('.btn-action-confirm')) {
            const confirmBtn = e.target.closest('.btn-action-confirm');
            const item = confirmBtn.closest('.cadastrado-item-ramo');
            const badge = item.querySelector('.cadastrado-badge');
            const input = item.querySelector('.cadastrado-input');
            const editBtn = item.querySelector('.btn-action-edit');
            const editButtons = item.querySelector('.cadastrado-edit-buttons');
            const toggleSwitch = item.querySelector('.toggle-switch');

            // Update badge text and exit edit mode
            badge.textContent = input.value;
            badge.style.display = 'inline-flex';
            input.style.display = 'none';
            editBtn.style.display = 'flex';
            editButtons.style.display = 'none';
            toggleSwitch.style.display = 'inline-block';

            // Re-initialize lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        // Handle delete button click
        if (e.target.closest('.btn-action-delete')) {
            const deleteBtn = e.target.closest('.btn-action-delete');
            const item = deleteBtn.closest('.cadastrado-item-ramo');

            // Confirm deletion
            if (confirm('Tem certeza que deseja excluir este item?')) {
                item.remove();
            }
        }
    });

    // Handle Enter key to confirm edit
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('cadastrado-input')) {
            const input = e.target;
            const confirmBtn = input.closest('.cadastrado-item-ramo').querySelector('.btn-action-confirm');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }

        // Handle Escape key to cancel edit
        if (e.key === 'Escape' && e.target.classList.contains('cadastrado-input')) {
            const input = e.target;
            const item = input.closest('.cadastrado-item-ramo');
            const badge = item.querySelector('.cadastrado-badge');
            const editBtn = item.querySelector('.btn-action-edit');
            const editButtons = item.querySelector('.cadastrado-edit-buttons');
            const toggleSwitch = item.querySelector('.toggle-switch');

            // Cancel edit and restore original state
            badge.style.display = 'inline-flex';
            input.style.display = 'none';
            editBtn.style.display = 'flex';
            editButtons.style.display = 'none';
            toggleSwitch.style.display = 'inline-block';
        }
    });
}

// Initialize edit mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditMode);
} else {
    initEditMode();
}

// ===================================
// DRAWER CLOSE BUTTONS: Add event listeners to all drawer close buttons
// ===================================

function initDrawerCloseButtons() {
    // Selecionar todos os botões de fechar drawer (.drawer-close)
    document.querySelectorAll('.drawer-close').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            // Encontrar o drawer pai
            const drawerOverlay = this.closest('.drawer-overlay');
            if (drawerOverlay && drawerOverlay.id) {
                closeDrawer(drawerOverlay.id);
            }
        });
    });
}

// Initialize drawer close buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawerCloseButtons);
} else {
    initDrawerCloseButtons();
}

console.log('Modals and Drawers scripts loaded');
