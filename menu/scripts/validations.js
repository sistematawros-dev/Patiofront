// ===================================
// VALIDAÇÕES E MÁSCARAS
// ===================================

// Máscara de CPF
function maskCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara de CNPJ
function maskCNPJ(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara de CEP
function maskCEP(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

// Máscara de Telefone
function maskPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        return value
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        return value
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
}

// Validar CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Validar CNPJ
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) return false;

    return true;
}

// Buscar CEP via ViaCEP
async function searchCEP(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        return { error: 'CEP inválido' };
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            return { error: 'CEP não encontrado' };
        }

        return data;
    } catch (error) {
        return { error: 'Erro ao buscar CEP' };
    }
}

// Aplicar máscara em campo
function applyMask(input, maskFunction) {
    input.addEventListener('input', function(e) {
        e.target.value = maskFunction(e.target.value);
    });
}

// Aplicar validação visual
function setFieldValid(input, isValid, message = '') {
    const parent = input.closest('.form-group');
    if (!parent) return;

    // Remove estados anteriores
    parent.classList.remove('field-valid', 'field-invalid');

    // Remove mensagem anterior
    const existingMessage = parent.querySelector('.field-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (isValid === null) return; // Neutro

    // Adiciona novo estado
    parent.classList.add(isValid ? 'field-valid' : 'field-invalid');

    // Adiciona mensagem se houver
    if (message && !isValid) {
        const messageEl = document.createElement('div');
        messageEl.className = 'field-message field-error';
        messageEl.textContent = message;
        parent.appendChild(messageEl);
    }
}

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Aplicar máscaras
    const cpfInputs = document.querySelectorAll('input[placeholder*="CPF"]');
    cpfInputs.forEach(input => {
        applyMask(input, maskCPF);

        // Validação on blur
        input.addEventListener('blur', function() {
            if (this.value) {
                const isValid = validateCPF(this.value);
                setFieldValid(this, isValid, isValid ? '' : 'CPF inválido');
            } else {
                setFieldValid(this, null);
            }
        });
    });

    const cnpjInputs = document.querySelectorAll('input[placeholder*="CNPJ"]');
    cnpjInputs.forEach(input => {
        applyMask(input, maskCNPJ);

        // Validação on blur
        input.addEventListener('blur', function() {
            if (this.value) {
                const isValid = validateCNPJ(this.value);
                setFieldValid(this, isValid, isValid ? '' : 'CNPJ inválido');
            } else {
                setFieldValid(this, null);
            }
        });
    });

    const cepInputs = document.querySelectorAll('input[placeholder*="CEP"], input[placeholder*="cep"]');
    cepInputs.forEach(input => {
        applyMask(input, maskCEP);

        // Busca automática de endereço
        input.addEventListener('blur', async function() {
            if (this.value && this.value.replace(/\D/g, '').length === 8) {
                const cep = this.value;
                const result = await searchCEP(cep);

                if (!result.error) {
                    // Preencher campos de endereço
                    const form = this.closest('form') || document;

                    const logradouroInput = form.querySelector('input[placeholder*="Logradouro"], input[id*="logradouro"]');
                    const bairroInput = form.querySelector('input[placeholder*="Bairro"], input[id*="bairro"]');
                    const cidadeInput = form.querySelector('input[placeholder*="Cidade"], input[id*="cidade"]');
                    const ufInput = form.querySelector('input[placeholder*="UF"], input[id*="uf"]');

                    if (logradouroInput && result.logradouro) logradouroInput.value = result.logradouro;
                    if (bairroInput && result.bairro) bairroInput.value = result.bairro;
                    if (cidadeInput && result.localidade) cidadeInput.value = result.localidade;
                    if (ufInput && result.uf) ufInput.value = result.uf;

                    setFieldValid(this, true);
                } else {
                    setFieldValid(this, false, result.error);
                }
            }
        });
    });

    const phoneInputs = document.querySelectorAll('input[placeholder*="Telefone"], input[placeholder*="Celular"], input[placeholder*="WhatsApp"]');
    phoneInputs.forEach(input => {
        applyMask(input, maskPhone);
    });

    // ===================================
    // CAMPOS CONDICIONAIS
    // ===================================

    // Mostrar/Ocultar "Grupo de Empresas" baseado no tipo
    const tipoRadios = document.querySelectorAll('input[name="tipo"]');
    const grupoEmpresasGroup = document.querySelector('.grupo-empresas-group');

    function toggleGrupoEmpresas() {
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked')?.value;

        if (grupoEmpresasGroup) {
            if (tipoSelecionado === 'juridica') {
                grupoEmpresasGroup.style.display = 'block';
                grupoEmpresasGroup.style.opacity = '0';
                setTimeout(() => {
                    grupoEmpresasGroup.style.transition = 'opacity 0.3s ease';
                    grupoEmpresasGroup.style.opacity = '1';
                }, 10);
            } else {
                grupoEmpresasGroup.style.transition = 'opacity 0.3s ease';
                grupoEmpresasGroup.style.opacity = '0';
                setTimeout(() => {
                    grupoEmpresasGroup.style.display = 'none';
                }, 300);
            }
        }
    }

    tipoRadios.forEach(radio => {
        radio.addEventListener('change', toggleGrupoEmpresas);
    });

    // Inicializar estado
    toggleGrupoEmpresas();

    // ===================================
    // VALIDAÇÃO DE FORMULÁRIO
    // ===================================

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Validar CPF
            const cpfInput = this.querySelector('input[placeholder*="CPF"]');
            if (cpfInput && cpfInput.value) {
                if (!validateCPF(cpfInput.value)) {
                    setFieldValid(cpfInput, false, 'CPF inválido');
                    isValid = false;
                }
            }

            // Validar CNPJ
            const cnpjInput = this.querySelector('input[placeholder*="CNPJ"]');
            if (cnpjInput && cnpjInput.value) {
                if (!validateCNPJ(cnpjInput.value)) {
                    setFieldValid(cnpjInput, false, 'CNPJ inválido');
                    isValid = false;
                }
            }

            if (!isValid) {
                e.preventDefault();
                alert('Por favor, corrija os erros no formulário antes de continuar.');
            }
        });
    });
});

console.log('Validations script loaded');
