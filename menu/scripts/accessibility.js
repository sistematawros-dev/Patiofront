// ===================================
// MELHORIAS DE ACESSIBILIDADE
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Adicionar ARIA labels aos botões sem texto
    const iconButtons = document.querySelectorAll('button:not([aria-label])');
    iconButtons.forEach(button => {
        const icon = button.querySelector('i[data-lucide]');
        if (icon && !button.textContent.trim()) {
            const iconName = icon.getAttribute('data-lucide');
            const ariaLabel = getAriaLabelForIcon(iconName);
            if (ariaLabel) {
                button.setAttribute('aria-label', ariaLabel);
            }
        }
    });

    // Adicionar roles aos componentes
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        const title = modal.querySelector('.modal-title');
        if (title && !title.id) {
            const id = 'modal-title-' + Math.random().toString(36).substr(2, 9);
            title.id = id;
            modal.setAttribute('aria-labelledby', id);
        }
    });

    // Drawer accessibility
    const drawers = document.querySelectorAll('.drawer-container');
    drawers.forEach(drawer => {
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');

        const title = drawer.querySelector('.drawer-title');
        if (title && !title.id) {
            const id = 'drawer-title-' + Math.random().toString(36).substr(2, 9);
            title.id = id;
            drawer.setAttribute('aria-labelledby', id);
        }
    });

    // Adicionar aria-expanded aos dropdowns
    const dropdownButtons = document.querySelectorAll('.nav-dropdown, .section-header-collapsible');
    dropdownButtons.forEach(button => {
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Melhorar navegação por teclado em tabelas
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        table.setAttribute('role', 'table');

        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
            header.setAttribute('role', 'columnheader');
        });

        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
            cell.setAttribute('role', 'cell');
        });

        // Adicionar navegação por teclado
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.setAttribute('tabindex', '0');
            row.setAttribute('role', 'row');

            row.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const editButton = this.querySelector('.action-link');
                    if (editButton) {
                        editButton.click();
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextRow = this.nextElementSibling;
                    if (nextRow) nextRow.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevRow = this.previousElementSibling;
                    if (prevRow) prevRow.focus();
                }
            });
        });
    });

    // Adicionar live regions para feedback
    if (!document.querySelector('#aria-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }

    // Focus trap para modais
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Aplicar focus trap aos modais quando abertos
    const modalObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style') {
                const modal = mutation.target;
                if (modal.classList.contains('modal-overlay') && modal.style.display === 'flex') {
                    trapFocus(modal);
                    const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
                    if (firstFocusable) {
                        setTimeout(() => firstFocusable.focus(), 100);
                    }
                }
            }
        });
    });

    modals.forEach(modal => {
        modalObserver.observe(modal, { attributes: true });
    });

    // Adicionar skip link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #064974;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
});

// Helper function para obter ARIA labels baseado no nome do ícone
function getAriaLabelForIcon(iconName) {
    const labels = {
        'search': 'Buscar',
        'bell': 'Notificações',
        'settings': 'Configurações',
        'circle-help': 'Ajuda',
        'panel-left': 'Alternar menu lateral',
        'chevron-down': 'Expandir',
        'chevron-right': 'Avançar',
        'chevron-left': 'Voltar',
        'x': 'Fechar',
        'pen': 'Editar',
        'plus': 'Adicionar',
        'trash': 'Excluir',
        'eye': 'Visualizar',
        'filter': 'Filtrar',
        'download': 'Baixar',
        'upload': 'Enviar',
        'user': 'Usuário',
        'log-out': 'Sair',
        'home': 'Início'
    };
    return labels[iconName] || '';
}

// Anunciar mensagens para screen readers
function announceMessage(message) {
    const liveRegion = document.querySelector('#aria-live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Exportar função para usar em outros scripts
window.announceMessage = announceMessage;

console.log('Accessibility enhancements loaded');
