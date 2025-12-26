/**
 * Sidebar Menu - Tawros
 * Sistema completo de gerenciamento do menu lateral
 */

(function() {
    'use strict';

    // Prevenir inicialização múltipla
    if (window.sidebarMenuInitialized) {
        return;
    }
    window.sidebarMenuInitialized = true;

    function initSidebarMenu() {
        // ========================================
        // DROPDOWN PRINCIPAL (Nível 1) - Cadastros, Estufas
        // ========================================
        const mainDropdowns = document.querySelectorAll('.nav-dropdown');

        mainDropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isCurrentlyOpen = this.classList.contains('open');

                // Fechar TODOS os outros dropdowns principais
                mainDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== this) {
                        otherDropdown.classList.remove('open');
                    }
                });

                // Fechar todos os subdropdowns quando fechar o dropdown principal
                if (isCurrentlyOpen) {
                    const allSubdropdowns = document.querySelectorAll('.nav-subdropdown');
                    allSubdropdowns.forEach(sub => {
                        sub.classList.remove('open');
                    });
                }

                // Toggle do dropdown atual
                this.classList.toggle('open');
            });
        });

        // ========================================
        // SUBDROPDOWN (Nível 2) - Pessoas e Empresas, Produtos e Serviços
        // ========================================
        const subDropdowns = document.querySelectorAll('.nav-subdropdown');

        subDropdowns.forEach((subdropdown) => {
            subdropdown.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Fechar TODOS os outros subdropdowns
                subDropdowns.forEach(otherSubdropdown => {
                    if (otherSubdropdown !== this) {
                        otherSubdropdown.classList.remove('open');
                    }
                });

                // Toggle do subdropdown atual
                this.classList.toggle('open');
            });
        });

        // ========================================
        // USER PROFILE DROPDOWN
        // ========================================
        const userProfileButton = document.getElementById('userProfileButton');
        const userDropdown = document.getElementById('userDropdown');

        if (userProfileButton && userDropdown) {
            userProfileButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                userProfileButton.classList.toggle('open');
                userDropdown.classList.toggle('open');
            });

            // Fechar dropdown ao clicar fora
            document.addEventListener('click', function(e) {
                if (!userProfileButton.contains(e.target) && !userDropdown.contains(e.target)) {
                    if (userProfileButton.classList.contains('open')) {
                        userProfileButton.classList.remove('open');
                        userDropdown.classList.remove('open');
                    }
                }
            });
        }

        // ========================================
        // AUTO-EXPAND MENU ATIVO
        // ========================================
        // Expande automaticamente o dropdown que contém a página ativa
        const activeSubmenu = document.querySelector('.nav-subsubitem.active');

        if (activeSubmenu) {
            // Encontrar e abrir o subdropdown pai
            const parentSubdropdown = activeSubmenu.closest('.nav-subgroup')?.querySelector('.nav-subdropdown');
            if (parentSubdropdown) {
                parentSubdropdown.classList.add('open');
            }

            // Encontrar e abrir o dropdown principal pai
            const parentDropdown = activeSubmenu.closest('.nav-group')?.querySelector('.nav-dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('open');
            }
        }

        // ========================================
        // MENU TOGGLE (Collapse/Expand Sidebar)
        // ========================================
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.getElementById('sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                sidebar.classList.toggle('collapsed');
            });
        }

        // ========================================
        // INICIALIZAR ÍCONES LUCIDE
        // ========================================
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarMenu);
    } else {
        initSidebarMenu();
    }
})();
