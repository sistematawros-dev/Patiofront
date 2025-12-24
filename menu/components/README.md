# Componentes Reutilizáveis

Esta pasta contém componentes HTML reutilizáveis do sistema Tawros.

## Sidebar Menu (`sidebar-menu.html`)

Componente do menu de navegação lateral da aplicação.

### Estrutura do Menu

- **Painel** - Página inicial/dashboard
  - Ícone: `house`
  - Link: `./index.html`

- **Cadastros** - Menu expansível
  - Ícone: `list`
  - Subitens:
    - Pessoas e Empresas → `./pessoas-empresas.html`
    - Produtos e Serviços → `./produtos-servicos.html`

- **BI e Relatórios** - Análises e relatórios
  - Ícone: `chart-no-axes-combined`
  - Link: `#`

- **Estufas** - Menu expansível
  - Ícone: `sprout`
  - Subitens:
    - Pedidos → `#`
    - Ordens de Produção → `#`
    - Produção → `#`

### Como Usar

1. Este componente deve ser incluído dentro de um elemento `<aside class="sidebar">`
2. Ajuste a classe `active` nos itens conforme a página atual
3. Os ícones são renderizados usando Lucide Icons
4. A funcionalidade de expansão/colapso é gerenciada por `scripts/main.js`

### Exemplo de Uso

```html
<aside class="sidebar">
    <!-- Logo e busca -->

    <!-- Incluir o menu -->
    <nav class="sidebar-nav">
        <!-- Conteúdo do sidebar-menu.html -->
    </nav>

    <!-- Footer com perfil do usuário -->
</aside>
```

### Personalização por Página

Para marcar um item como ativo na página atual:

```html
<!-- Página de Pessoas e Empresas -->
<a href="./pessoas-empresas.html" class="nav-subitem active">Pessoas e Empresas</a>

<!-- Página de Produtos e Serviços -->
<a href="./produtos-servicos.html" class="nav-subitem active">Produtos e Serviços</a>
```

### Ícones Disponíveis (Lucide)

- `house` - Casa/Início
- `list` - Lista
- `chart-no-axes-combined` - Gráficos
- `sprout` - Broto/Planta (ideal para estufas)
- `chevron-down` - Seta para baixo (dropdown)

### Dependências

- CSS: `styles/sidebar.css`
- JavaScript: `scripts/main.js`
- Ícones: Lucide Icons (CDN)
