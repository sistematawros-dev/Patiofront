# Tawros - Sistema de Gestão

Sistema de gestão profissional desenvolvido com HTML, CSS e JavaScript puro, baseado no design do Figma.

## 📁 Estrutura do Projeto

```
Tawros/
├── index.html                    # Dashboard principal
├── cadastro-empresa.html         # Cadastro de empresas
├── cadastro-produto.html         # Cadastro de produtos
├── pessoas-empresas.html         # Listagem de pessoas e empresas
├── produtos-servicos.html        # Listagem de produtos e serviços
├── styles/
│   ├── global.css               # Estilos globais e variáveis
│   ├── components.css           # Componentes reutilizáveis
│   ├── sidebar.css              # Sidebar e navegação
│   ├── dashboard.css            # Dashboard principal
│   ├── table.css                # Tabelas e listagens
│   ├── modals.css               # Modais e drawers
│   ├── cadastro-empresa.css     # Estilos do cadastro de empresa
│   └── cadastro-produto.css     # Estilos do cadastro de produto
├── scripts/
│   ├── main.js                  # Funções principais
│   ├── charts.js                # Renderização de gráficos
│   ├── sidebar-search.js        # Busca na sidebar
│   ├── validations.js           # Validações de formulários
│   ├── modals.js                # Sistema de modais e drawers
│   ├── pessoas-empresas.js      # Funcionalidades da listagem
│   ├── produtos-servicos.js     # Funcionalidades de produtos
│   ├── cadastro-empresa.js      # Funcionalidades do cadastro de empresa
│   ├── cadastro-produto.js      # Funcionalidades do cadastro de produto
│   └── accessibility.js         # Melhorias de acessibilidade
├── assets/
│   ├── logo.svg                 # Logo da aplicação
│   └── avatar.jpg               # Avatar padrão
├── .gitignore
├── ESTRUTURA.md                 # Documentação da estrutura
└── README.md
```

## 🔐 Autenticação

O sistema possui autenticação implementada com:
- Tela de login moderna com design split-screen
- Credenciais de teste: `teste@teste.com` / `teste123`
- Gerenciamento de sessão via sessionStorage
- Opção "Lembrar minha senha" com localStorage
- Redirecionamento automático para login quando não autenticado
- Botão de logout em todas as páginas

## 🎨 Integração com Figma

O projeto está integrado com o Figma para extração de designs. Para usar:

### Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Adicione seu token pessoal do Figma no arquivo `.env`:
```
FIGMA_TOKEN=seu_token_aqui
FIGMA_FILE_KEY=12Owll4S0STjk8b5aSwp3k
```

3. Obtenha seu token em: https://www.figma.com/developers/api#access-tokens

### Scripts Disponíveis

- `test-figma-quick.js` - Testa conexão com Figma
- `list-screens.js` - Lista todas as telas do arquivo
- `extract-screen.js` - Extrai dados de uma tela específica

### Uso

```bash
# Testar conexão
node test-figma-quick.js

# Listar telas
node list-screens.js

# Extrair tela específica
node extract-screen.js "NODE_ID"
```

**⚠️ SEGURANÇA**: Nunca faça commit do arquivo `.env` com tokens reais. Use sempre variáveis de ambiente.

## 🚀 Páginas do Sistema

### Login (login.html)
- Design split-screen com gradiente azul
- Validação de formulário em tempo real
- Toggle de senha (mostrar/ocultar)
- Lembrança de login
- Redirecionamento para dashboard após login bem-sucedido

### Dashboard (index.html)
- Visão geral com métricas principais
- Gráficos de engajamento e performance
- Tabelas de campanhas e engajamento
- Cards de métricas com variação percentual

### Pessoas e Empresas (pessoas-empresas.html)
- Listagem de empresas cadastradas
- Filtros por tipo, grupo e status
- Ações rápidas (visualizar, editar, excluir)
- Navegação entre abas (Pessoas e Empresas / Produtos e Serviços)

### Produtos e Serviços (produtos-servicos.html)
- Listagem de produtos e serviços
- Filtros por categoria, classe e status
- Drawer de filtros lateral
- Tabela responsiva com ações

### Cadastro de Empresa (cadastro-empresa.html)
- Formulário completo de cadastro
- Abas para diferentes seções (Dados cadastrais, Estabelecimentos, etc.)
- Validação de campos (CNPJ, CEP, etc.)
- Drawers para criar grupos e ramos
- Sistema de tags para atividades e especialidades

### Cadastro de Produto (cadastro-produto.html)
- Formulário de cadastro de produtos/serviços
- Toggle entre Produto e Serviço
- Seleção de classe via drawer com árvore hierárquica
- Campos específicos por tipo
- Validações customizadas

## 🎨 Sistema de Design

### Componentes Principais

#### Botões
```html
<button class="btn-primary">Botão Primário</button>
<button class="btn-secondary">Botão Secundário</button>
<button class="icon-button"><i data-lucide="plus"></i></button>
```

#### Inputs de Formulário
```html
<input type="text" class="form-input" placeholder="Digite...">
<select class="form-select">
    <option>Selecione...</option>
</select>
<textarea class="form-textarea" placeholder="Descrição..."></textarea>
```

#### Cards
```html
<div class="metric-card">
    <div class="metric-header">
        <span class="metric-label">Taxa de crescimento</span>
    </div>
    <div class="metric-content">
        <div class="metric-value">21,42%</div>
    </div>
</div>
```

#### Badges
```html
<span class="badge badge-success">Ativo</span>
<span class="badge badge-warning">Pendente</span>
<span class="badge badge-inactive">Inativo</span>
```

#### Tabs
```html
<div class="content-tabs">
    <a href="#" class="content-tab active">Tab 1</a>
    <a href="#" class="content-tab">Tab 2</a>
</div>
```

#### Drawers
```html
<div class="drawer-overlay" id="meuDrawer" style="display: none;">
    <div class="drawer-container">
        <div class="drawer-header">
            <h2 class="drawer-title">Título</h2>
            <button class="drawer-close"><i data-lucide="x"></i></button>
        </div>
        <div class="drawer-body">
            <!-- Conteúdo -->
        </div>
        <div class="drawer-footer">
            <button class="btn-secondary">Cancelar</button>
            <button class="btn-primary">Confirmar</button>
        </div>
    </div>
</div>
```

### Variáveis CSS

O sistema utiliza variáveis CSS para manter consistência:

```css
:root {
    /* Cores principais */
    --primary-blue: #0068AB;
    --success-green: #10B981;
    --warning-yellow: #F59E0B;
    --danger-red: #EF4444;

    /* Espaçamentos */
    --spacing-4: 4px;
    --spacing-8: 8px;
    --spacing-12: 12px;
    --spacing-16: 16px;
    --spacing-20: 20px;
    --spacing-24: 24px;

    /* Border Radius */
    --radius-xs: 4px;
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;

    /* Fontes */
    --font-size-xs: 12px;
    --font-size-sm: 13px;
    --font-size-base: 14px;
    --font-size-lg: 16px;
    --font-size-xl: 20px;
}
```

## 📦 Dependências

O projeto utiliza apenas uma dependência externa para ícones:

- **Lucide Icons**: https://unpkg.com/lucide@latest

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>
    lucide.createIcons();
</script>
```

## 🛠️ Funcionalidades JavaScript

### Sistema de Modais e Drawers
```javascript
// Abrir drawer
openDrawer('meuDrawer');

// Fechar drawer
closeDrawer('meuDrawer');
```

### Validações
```javascript
// Validar CNPJ
validarCNPJ('12.345.678/0001-90');

// Validar CPF
validarCPF('123.456.789-00');

// Validar CEP
validarCEP('12345-678');
```

### Formatação
```javascript
// Máscara de CNPJ
aplicarMascaraCNPJ(input);

// Máscara de telefone
aplicarMascaraTelefone(input);

// Máscara de CEP
aplicarMascaraCEP(input);
```

### Sistema de Tags
```javascript
// Adicionar tag ao pressionar Enter
const tagsContainer = document.getElementById('tags');
const tagInput = document.getElementById('tagInput');

tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && tagInput.value.trim()) {
        addTag(tagsContainer, tagInput.value.trim());
        tagInput.value = '';
    }
});
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Mobile**: até 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Comportamento Mobile
- Sidebar recolhível
- Tabelas com scroll horizontal
- Drawers em tela cheia
- Menu hambúrguer
- Grid adaptativo

## 🎯 Como Usar

### 1. Estrutura Básica de Nova Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página - Tawros</title>

    <!-- Estilos -->
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/sidebar.css">
    <link rel="stylesheet" href="styles/minha-pagina.css">

    <!-- Ícones -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <!-- Conteúdo da sidebar -->
    </aside>

    <!-- Conteúdo Principal -->
    <main class="main-content">
        <!-- Seu conteúdo aqui -->
    </main>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
    <script src="scripts/sidebar-search.js"></script>
    <script src="scripts/validations.js"></script>
    <script src="scripts/modals.js"></script>
    <script src="scripts/minha-pagina.js"></script>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
```

### 2. Adicionar Drawer

```javascript
// No HTML
<div class="drawer-overlay" id="meuDrawer" style="display: none;">
    <div class="drawer-container">
        <!-- Conteúdo do drawer -->
    </div>
</div>

// No JavaScript
const abrirBtn = document.getElementById('abrirDrawer');
abrirBtn.addEventListener('click', () => {
    openDrawer('meuDrawer');
});
```

### 3. Criar Formulário com Validação

```javascript
const form = document.getElementById('meuForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validações
    const cnpj = document.getElementById('cnpj').value;
    if (!validarCNPJ(cnpj)) {
        alert('CNPJ inválido');
        return;
    }

    // Processar formulário
    console.log('Formulário válido!');
});
```

## 🔧 Manutenção

### Adicionar Novo Componente CSS
1. Adicione o componente em `styles/components.css`
2. Use variáveis CSS do `global.css`
3. Documente o uso no README

### Adicionar Nova Funcionalidade JS
1. Crie um arquivo específico em `scripts/`
2. Inclua o script nas páginas que usam
3. Use funções do `main.js` quando possível

## 🌐 Navegadores Suportados

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- iOS Safari 12+
- Chrome Android (última versão)

## 📄 Licença

Este projeto foi desenvolvido para uso interno da Tawros.

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação adicional em `ESTRUTURA.md`.
