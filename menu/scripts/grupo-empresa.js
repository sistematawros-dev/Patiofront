// ========================================
// GRUPO DE EMPRESA - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script grupo-empresa.js carregado');

    // === COLLAPSIBLE SECTION ===
    const infoComplementaresToggle = document.getElementById('infoComplementaresToggle');
    const infoComplementaresContent = document.getElementById('infoComplementaresContent');

    if (infoComplementaresToggle && infoComplementaresContent) {
        infoComplementaresToggle.addEventListener('click', function() {
            const isExpanded = infoComplementaresContent.style.display === 'block';

            if (isExpanded) {
                infoComplementaresContent.style.display = 'none';
                this.classList.remove('expanded');
            } else {
                infoComplementaresContent.style.display = 'block';
                this.classList.add('expanded');
            }

            // Reinicializar ícones do Lucide após mudança de DOM
            lucide.createIcons();
        });
    }

    // === CNPJ MASK ===
    const cnpjInput = document.getElementById('cnpjInput');

    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 14) {
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }

            e.target.value = value;
        });
    }

    // === FORM SUBMISSION ===
    const grupoEmpresaForm = document.getElementById('grupoEmpresaForm');

    if (grupoEmpresaForm) {
        grupoEmpresaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Aqui você pode adicionar a lógica de validação e envio
            console.log('Formulário submetido');

            // Exemplo de coleta de dados
            const formData = new FormData(grupoEmpresaForm);
            const data = Object.fromEntries(formData);

            console.log('Dados do formulário:', data);

            // Aqui você enviaria os dados para o backend
            // fetch('/api/grupo-empresa', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }

    // === LINK BUTTONS (Criar Grupo, Criar Categoria, etc.) ===
    const linkButtons = document.querySelectorAll('.link-button');

    linkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            console.log('Link button clicado:', text);

            // Aqui você pode abrir um modal ou navegar para outra página
            // Por exemplo: abrirModalCriarGrupo();
        });
    });
});
