// ========================================
// TAGS INPUT - JavaScript
// Componente de seleção múltipla com badges
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script tags-input.js carregado');

    // Inicializar o componente de tags para Ramo
    initTagsInput('ramo');

    /**
     * Inicializar componente de tags input
     * @param {string} fieldId - ID do campo (ex: 'ramo')
     */
    function initTagsInput(fieldId) {
        const inputContainer = document.getElementById(`${fieldId}TagsContainer`);
        const input = document.getElementById(`${fieldId}Input`);
        const dropdown = document.getElementById(`${fieldId}Dropdown`);
        const searchInput = document.getElementById(`${fieldId}SearchInput`);
        const dropdownList = document.getElementById(`${fieldId}DropdownList`);
        const badgesContainer = document.getElementById(`${fieldId}BadgesContainer`);

        if (!inputContainer || !input || !dropdown || !searchInput || !dropdownList || !badgesContainer) {
            console.warn(`Elementos do campo ${fieldId} não encontrados`);
            return;
        }

        // Array para armazenar valores selecionados
        let selectedValues = [];

        // Toggle dropdown ao clicar no input container
        inputContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            // Não abrir/fechar dropdown se clicar no botão de remover badge
            if (e.target.closest('.tag-remove')) {
                return;
            }
            toggleDropdown();
        });

        // Prevenir que o dropdown feche ao clicar dentro dele
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (!inputContainer.contains(e.target) && !dropdown.contains(e.target)) {
                closeDropdown();
            }
        });

        // Gerenciar checkboxes
        const checkboxes = dropdownList.querySelectorAll('.tags-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const value = this.value;

                if (this.checked) {
                    // Adicionar valor ao array se não estiver presente
                    if (!selectedValues.includes(value)) {
                        selectedValues.push(value);
                        addBadge(value);
                    }
                } else {
                    // Remover valor do array
                    selectedValues = selectedValues.filter(v => v !== value);
                    removeBadge(value);
                }

                updateInputPlaceholder();
            });
        });

        // Busca no dropdown
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = dropdownList.querySelectorAll('.tags-dropdown-item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        /**
         * Abrir/Fechar dropdown
         */
        function toggleDropdown() {
            const isOpen = dropdown.style.display === 'flex';

            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }

        /**
         * Abrir dropdown
         */
        function openDropdown() {
            dropdown.style.display = 'flex';
            inputContainer.classList.add('active');

            // Focus sem causar scroll
            searchInput.focus({ preventScroll: true });

            // Re-inicializar ícones do Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        /**
         * Fechar dropdown
         */
        function closeDropdown() {
            dropdown.style.display = 'none';
            inputContainer.classList.remove('active');
            searchInput.value = '';

            // Resetar a busca
            const items = dropdownList.querySelectorAll('.tags-dropdown-item');
            items.forEach(item => {
                item.style.display = 'flex';
            });
        }

        /**
         * Adicionar badge
         */
        function addBadge(value) {
            const badge = document.createElement('span');
            badge.className = 'tag';
            badge.setAttribute('data-value', value);
            badge.innerHTML = `
                ${value}
                <button type="button" class="tag-remove">
                    <i data-lucide="x"></i>
                </button>
            `;

            // Event listener para remover badge
            const removeBtn = badge.querySelector('.tag-remove');
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeBadgeByElement(badge, value);
            });

            badgesContainer.appendChild(badge);

            // Re-inicializar ícones do Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        /**
         * Remover badge pelo elemento
         */
        function removeBadgeByElement(badgeElement, value) {
            badgeElement.remove();
            selectedValues = selectedValues.filter(v => v !== value);

            // Desmarcar checkbox correspondente
            const checkbox = dropdownList.querySelector(`.tags-checkbox[value="${value}"]`);
            if (checkbox) {
                checkbox.checked = false;
            }

            updateInputPlaceholder();
        }

        /**
         * Remover badge pelo valor
         */
        function removeBadge(value) {
            const badge = badgesContainer.querySelector(`.tag[data-value="${value}"]`);
            if (badge) {
                badge.remove();
            }
        }

        /**
         * Atualizar placeholder do input
         */
        function updateInputPlaceholder() {
            // Não mostra placeholder quando tem badges
            input.placeholder = '';
        }
    }

    console.log('Tags input inicializado');
});
