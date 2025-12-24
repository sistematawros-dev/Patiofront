// ========================================
// DRAWER: SELECIONAR CLASSE
// Usado em: cadastro-produto.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const btnSelecionarClasse = document.querySelectorAll('[data-drawer="selecionarClasse"]');
    const drawerId = 'drawerSelecionarClasse';

    // Adicionar evento de click em todos os botões que abrem o drawer
    btnSelecionarClasse.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Abrindo drawer de selecionar classe');
            if (typeof openDrawer === 'function') {
                openDrawer(drawerId);
            } else {
                console.error('Função openDrawer não encontrada');
            }
        });
    });

    // Gerenciar árvore hierárquica de classes
    const classItems = document.querySelectorAll('.class-item');
    classItems.forEach(item => {
        const toggleBtn = item.querySelector('.toggle-children');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const parent = this.closest('.class-item');
                const children = parent.querySelector('.class-children');

                if (children) {
                    const isExpanded = children.style.display === 'block';
                    children.style.display = isExpanded ? 'none' : 'block';
                    this.classList.toggle('expanded');
                }
            });
        }

        // Selecionar classe
        item.addEventListener('click', function() {
            // Remover seleção anterior
            document.querySelectorAll('.class-item').forEach(i => i.classList.remove('selected'));
            // Adicionar seleção atual
            this.classList.add('selected');
        });
    });
});

// Função para confirmar seleção de classe
function confirmarSelecaoClasse() {
    const selectedClass = document.querySelector('.class-item.selected');

    if (!selectedClass) {
        alert('Por favor, selecione uma classe');
        return;
    }

    const className = selectedClass.querySelector('.class-name')?.textContent || '';
    const classCode = selectedClass.getAttribute('data-class-code') || '';

    console.log('Classe selecionada:', { className, classCode });

    // Atualizar campo de classe no formulário
    const classeInput = document.getElementById('classe');
    if (classeInput) {
        classeInput.value = className;
        classeInput.setAttribute('data-class-code', classCode);
    }

    // Fechar drawer
    if (typeof closeDrawer === 'function') {
        closeDrawer('drawerSelecionarClasse');
    }
}
