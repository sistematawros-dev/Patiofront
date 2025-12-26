// ========================================
// DRAWER: CRIAR NOVO GRUPO
// Usado em: pessoas-empresas.html, cadastro-empresa.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const btnCriarGrupo = document.querySelectorAll('[data-drawer="criarGrupo"]');
    const drawerId = 'drawerCriarGrupo';

    // Adicionar evento de click em todos os botões que abrem o drawer
    btnCriarGrupo.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Abrindo drawer de criar grupo');
            if (typeof openDrawer === 'function') {
                openDrawer(drawerId);
            } else {
                console.error('Função openDrawer não encontrada');
            }
        });
    });
});

// Função para salvar novo grupo
function salvarNovoGrupo() {
    const nomeGrupo = document.getElementById('nomeGrupo');
    const descricaoGrupo = document.getElementById('descricaoGrupo');

    if (!nomeGrupo) {
        console.error('Campo nome do grupo não encontrado');
        return;
    }

    const nome = nomeGrupo.value.trim();
    const descricao = descricaoGrupo ? descricaoGrupo.value.trim() : '';

    if (!nome) {
        alert('Por favor, informe o nome do grupo');
        nomeGrupo.focus();
        return;
    }

    console.log('Salvando novo grupo:', { nome, descricao });

    // Aqui você implementaria a lógica para salvar no backend
    // Exemplo:
    // fetch('/api/grupos', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nome, descricao })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Grupo criado:', data);
    //     // Atualizar lista de grupos
    // });

    // Limpar campos
    nomeGrupo.value = '';
    if (descricaoGrupo) descricaoGrupo.value = '';

    // Fechar drawer
    if (typeof closeDrawer === 'function') {
        closeDrawer('drawerCriarGrupo');
    }

    // Mostrar mensagem de sucesso
    alert('Grupo criado com sucesso!');
}
