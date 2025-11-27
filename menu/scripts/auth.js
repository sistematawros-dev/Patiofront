/**
 * Sistema de Autenticação
 * Gerencia login, logout e verificação de sessão
 */

// Verificar se usuário está logado
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    // Se não estiver logado e não estiver na página de login
    if (isLoggedIn !== 'true' && currentPage !== 'login.html') {
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Fazer logout
function logout() {
    // Limpar sessão
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');

    // Redirecionar para login
    window.location.href = 'login.html';
}

// Obter dados do usuário logado
function getCurrentUser() {
    return {
        email: sessionStorage.getItem('userEmail'),
        isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true'
    };
}

// Executar verificação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Adicionar evento de logout aos botões de sair
    const logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    });

    // Exibir email do usuário onde houver elemento com data-user-email
    const user = getCurrentUser();
    if (user.isLoggedIn) {
        const userEmailElements = document.querySelectorAll('[data-user-email]');
        userEmailElements.forEach(element => {
            element.textContent = user.email;
        });
    }
});

// Exportar funções para uso global
window.auth = {
    checkAuth,
    logout,
    getCurrentUser
};
