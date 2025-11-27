// ========================================
// CADASTRO DE PESSOA - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cadastro-pessoa.js carregado');

    // === COLLAPSIBLE SECTIONS ===
    const collapsibleHeaders = document.querySelectorAll('.section-header-collapsible');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content && content.classList.contains('section-content')) {
                if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            }
        });
    });

    // === FORM SUBMISSION ===
    const formPessoa = document.querySelector('.form-container form');
    const btnSalvar = document.querySelector('.btn-footer-primary');

    if (btnSalvar) {
        btnSalvar.addEventListener('click', function(e) {
            e.preventDefault();

            // Coletar e validar dados do formulário
            const formData = collectFormData();

            // Validação básica
            if (!validarFormulario(formData)) {
                return;
            }

            console.log('Dados do formulário:', formData);

            // Simular salvamento
            alert('Cadastro de pessoa salvo com sucesso!');
            // window.location.href = './pessoas-empresas.html';
        });
    }

    // Botão Cancelar
    const btnCancelar = document.querySelector('.btn-footer-secondary');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function(e) {
            e.preventDefault();

            if (confirm('Deseja realmente cancelar o cadastro?')) {
                window.location.href = './pessoas-empresas.html';
            }
        });
    }

    // === COLLECT FORM DATA ===
    function collectFormData() {
        return {
            cpfCnpj: document.getElementById('cpfCnpj')?.value || '',
            nome: document.getElementById('nome')?.value || '',
            telefone: document.getElementById('telefone')?.value || '',
            celular: document.getElementById('celular')?.value || '',
            email: document.getElementById('email')?.value || ''
        };
    }

    // === VALIDAÇÃO DO FORMULÁRIO ===
    function validarFormulario(data) {
        // Validar CPF/CNPJ
        if (!data.cpfCnpj) {
            alert('Por favor, informe o CPF/CNPJ.');
            document.getElementById('cpfCnpj')?.focus();
            return false;
        }

        // Validar Nome
        if (!data.nome) {
            alert('Por favor, informe o nome.');
            document.getElementById('nome')?.focus();
            return false;
        }

        // Validar E-mail (formato básico)
        if (data.email && !validarEmail(data.email)) {
            alert('Por favor, informe um e-mail válido.');
            document.getElementById('email')?.focus();
            return false;
        }

        return true;
    }

    // === VALIDAR E-MAIL ===
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // === INPUT MASKS ===

    // CPF/CNPJ Mask (detecta automaticamente)
    const cpfCnpjInput = document.getElementById('cpfCnpj');
    if (cpfCnpjInput) {
        cpfCnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 11) {
                // Máscara CPF: 000.000.000-00
                value = value.replace(/^(\d{3})(\d)/, '$1.$2');
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
            } else {
                // Máscara CNPJ: 00.000.000/0000-00
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }

            e.target.value = value;
        });
    }

    // Telefone Mask: (XX) XXXX-XXXX
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                // Se tiver 11 dígitos, usar formato de celular
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }

            e.target.value = value;
        });
    }

    // Celular Mask: (XX) XXXXX-XXXX
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }

            e.target.value = value;
        });
    }

    // === RADIO BUTTON CHANGE ===
    const radioButtons = document.querySelectorAll('input[name="tipo"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Tipo selecionado:', this.value);

            // Atualizar estilos dos labels no tipo-group
            const radioGroupContainer = this.closest('.radio-group-container');
            if (radioGroupContainer) {
                const allLabels = radioGroupContainer.querySelectorAll('.radio-label');
                allLabels.forEach(label => {
                    label.style.background = 'transparent';
                    label.style.color = 'var(--figma-text-secondary, #6b7280)';
                });

                const currentLabel = this.closest('.radio-label');
                if (currentLabel) {
                    currentLabel.style.background = 'rgba(0, 104, 171, 0.1)';
                    currentLabel.style.color = 'var(--figma-color-brand, #0068ab)';
                }
            }

            // Redirecionar para a página correspondente
            if (this.value === 'juridica') {
                window.location.href = './cadastro-empresa.html';
            }
            // Se for 'fisica', permanece na página cadastro-pessoa.html
        });

        // Aplicar estilo inicial ao radio selecionado
        if (radio.checked) {
            const radioGroupContainer = radio.closest('.radio-group-container');
            if (radioGroupContainer) {
                const currentLabel = radio.closest('.radio-label');
                if (currentLabel) {
                    currentLabel.style.background = 'rgba(0, 104, 171, 0.1)';
                    currentLabel.style.color = 'var(--figma-color-brand, #0068ab)';
                }
            }
        }
    });

    console.log('Event listeners de cadastro-pessoa inicializados');
});
