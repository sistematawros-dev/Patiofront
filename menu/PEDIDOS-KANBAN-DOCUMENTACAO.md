# Documentação: Tela de Pedidos - Layout Kanban

## 📋 Visão Geral

A tela de Pedidos foi ajustada para seguir exatamente o design do Figma (node: 40000547:4537), implementando um layout Kanban com 4 colunas de status.

## 🎨 Estrutura da Tela

### 1. **Topbar com Breadcrumb**
```html
<div class="pedidos-topbar">
    <div class="breadcrumb">
        <a href="#" class="breadcrumb-item">
            <i data-lucide="layout-grid"></i>
            Painel
        </a>
        <i data-lucide="chevron-right" class="breadcrumb-separator"></i>
        <span class="breadcrumb-item active">Estufas</span>
    </div>
    <div class="topbar-actions">
        <!-- Botões: Notificações, Configurações, Ajuda -->
    </div>
</div>
```

**Especificações:**
- Fundo: `#FFFFFF`
- Borda inferior: `1px solid #E7E9E9`
- Padding: `12px 24px`
- Fonte breadcrumb: `13px`, cor `#717182` (inativo) / `#0A0A0A` (ativo)

---

### 2. **Tabs de Navegação**
```html
<div class="pedidos-header">
    <div class="pedidos-tabs">
        <button class="pedidos-tab">Agenda de Eventos</button>
        <button class="pedidos-tab active">Pedidos</button>
        <button class="pedidos-tab">Ordens de Produção</button>
        <button class="pedidos-tab">Produção</button>
    </div>
</div>
```

**Especificações:**
- Fundo: `#FFFFFF`
- Borda inferior: `1px solid #E7E9E9`
- Gap entre tabs: `32px`
- Padding vertical: `16px 0`
- Tab ativa: cor `#0068AB`, borda inferior `2px solid #0068AB`

---

### 3. **Barra de Título e Controles**
```html
<div class="pedidos-title-bar">
    <div class="title-left">
        <button class="btn-back">
            <i data-lucide="arrow-left"></i>
        </button>
        <h1 class="pedidos-title">Gestão de Pedidos</h1>
    </div>
    <div class="title-right">
        <div class="view-toggle">
            <button class="view-btn active">
                <i data-lucide="grid-2x2"></i>
            </button>
            <button class="view-btn">
                <i data-lucide="list"></i>
            </button>
        </div>
        <button class="btn-filtros">
            <i data-lucide="sliders-horizontal"></i>
            <span>Filtros avançados</span>
        </button>
        <button class="btn-novo-pedido">
            <i data-lucide="plus"></i>
            <span>Novo Pedido</span>
        </button>
    </div>
</div>
```

**Especificações:**
- Padding: `20px 24px`
- Título: `20px`, peso `600`, cor `#0A0A0A`
- Botão "Novo Pedido": fundo `#0068AB`, cor `#FFFFFF`
- Hover "Novo Pedido": fundo `#064974`

---

### 4. **Badges de Filtros Ativos**
```html
<div class="pedidos-active-filters">
    <div class="filter-badge">
        Status: Em Produção
        <button class="filter-badge-remove">
            <i data-lucide="x"></i>
        </button>
    </div>
</div>
```

**Especificações:**
- Fundo badge: `#EFF6FF`
- Borda: `1px solid #BFDBFE`
- Cor texto: `#1E40AF`
- Border-radius: `6px`
- Padding: `6px 10px`

---

### 5. **Layout Kanban**
```html
<div class="pedidos-kanban">
    <!-- 4 Colunas -->
</div>
```

**Especificações:**
- Display: `flex`
- Gap entre colunas: `16px`
- Padding: `24px`
- Overflow-x: `auto`

---

### 6. **Coluna Kanban**
```html
<div class="kanban-column">
    <div class="kanban-column-header">
        <h3 class="kanban-column-title">Recebido</h3>
        <span class="kanban-column-count">2</span>
    </div>
    <div class="kanban-column-cards">
        <!-- Cards aqui -->
    </div>
</div>
```

**Colunas:**
1. **Recebido** (2 cards)
2. **Em Preparação** (1 card)
3. **Em Produção** (1 card)
4. **Em Expedição** (1 card)

**Especificações:**
- Largura: `min-width: 320px`, `max-width: 320px`
- Header fundo: `#FFFFFF`
- Borda: `1px solid #E7E9E9`
- Border-radius: `8px`
- Count fundo: `#F7F7F8`, cor `#717182`

---

## 🎴 Componentes do Card de Pedido

### Estrutura Completa
```html
<div class="pedido-card">
    <!-- Header -->
    <div class="pedido-card-header">
        <span class="pedido-id">AZW-2025-001</span>
        <span class="pedido-badge badge-faturado">Faturado</span>
    </div>

    <!-- Info Secundária -->
    <div class="pedido-info-secondary">
        <span>TG-45878</span>
    </div>

    <!-- Cliente -->
    <div class="pedido-cliente">
        <div class="pedido-cliente-avatar">
            <i data-lucide="user"></i>
        </div>
        <div class="pedido-cliente-info">
            <div class="pedido-cliente-nome">João Silva</div>
            <div class="pedido-vendedor">Vendedor: Maria Santos</div>
        </div>
    </div>

    <!-- Divisor -->
    <hr class="pedido-divider">

    <!-- Pedido -->
    <div class="pedido-info-row">
        <i data-lucide="calendar"></i>
        <span class="pedido-info-label">Pedido:</span>
        <span class="pedido-info-value">14/01/2025</span>
    </div>

    <!-- Muda -->
    <div class="pedido-muda">
        <i data-lucide="sprout"></i>
        <div class="pedido-muda-info">
            <span class="pedido-muda-label">Muda:</span>
            <div class="pedido-muda-value">Muda de Eucalipto Clone AEC 144</div>
        </div>
    </div>

    <!-- Quantidade -->
    <div class="pedido-info-row">
        <i data-lucide="package"></i>
        <span class="pedido-info-label">Qtd:</span>
        <span class="pedido-info-value">5.000</span>
    </div>

    <!-- Entrega -->
    <div class="pedido-info-row">
        <i data-lucide="calendar-clock"></i>
        <span class="pedido-info-label">Entrega em:</span>
        <span class="pedido-info-value">19/02/2025</span>
    </div>

    <!-- Valor -->
    <div class="pedido-valor">R$ 15.500,00</div>
</div>
```

---

## 📐 Especificações de Design

### Card
- **Fundo:** `#FFFFFF`
- **Borda:** `1px solid #E7E9E9`
- **Border-radius:** `8px`
- **Padding:** `16px`
- **Gap interno:** `12px`
- **Hover:** borda `#0068AB`, shadow `0 4px 12px rgba(0, 104, 171, 0.1)`

### Pedido ID
- **Fundo:** `#F5FBFF`
- **Cor:** `#0068AB`
- **Padding:** `4px 8px`
- **Border-radius:** `4px`
- **Font-size:** `12px`
- **Font-weight:** `600`

### Badge Faturado
- **Fundo:** `#10B981`
- **Cor:** `#FFFFFF`
- **Padding:** `4px 8px`
- **Border-radius:** `12px`
- **Font-size:** `11px`
- **Font-weight:** `500`

### Info Secundária
- **Cor:** `#717182`
- **Font-size:** `11px`
- **Margin-top:** `-8px`

### Avatar
- **Tamanho:** `32px × 32px`
- **Fundo:** `#E7E9E9`
- **Border-radius:** `50%`
- **Ícone:** `16px × 16px`, cor `#717182`

### Cliente Nome
- **Font-size:** `14px`
- **Font-weight:** `600`
- **Cor:** `#0A0A0A`

### Vendedor
- **Font-size:** `11px`
- **Cor:** `#717182`

### Divisor
- **Altura:** `1px`
- **Cor:** `#E7E9E9`
- **Margin:** `4px 0`

### Info Row
- **Display:** `flex`
- **Gap:** `8px`
- **Font-size:** `12px`
- **Ícone:** `14px × 14px`, cor `#717182`
- **Label:** cor `#717182`, peso `400`
- **Value:** cor `#0A0A0A`, peso `500`

### Container Muda
- **Display:** `flex`
- **Gap:** `8px`
- **Fundo:** `#F9FAFA`
- **Padding:** `8px 10px`
- **Border-radius:** `6px`
- **Ícone:** `14px × 14px`, cor `#10B981`
- **Label:** `11px`, cor `#717182`
- **Value:** `12px`, peso `500`, cor `#0A0A0A`

### Valor
- **Font-size:** `14px`
- **Font-weight:** `600`
- **Cor:** `#10B981`
- **Text-align:** `right`

---

## 🎯 Classes CSS Disponíveis

### Container
- `.pedidos-container` - Container principal
- `.pedidos-topbar` - Barra superior com breadcrumb
- `.breadcrumb` - Container do breadcrumb
- `.breadcrumb-item` - Item do breadcrumb
- `.breadcrumb-separator` - Separador >
- `.topbar-actions` - Ações da topbar
- `.icon-button` - Botão de ícone
- `.help-button` - Botão de ajuda

### Header
- `.pedidos-header` - Container do header
- `.pedidos-tabs` - Container das tabs
- `.pedidos-tab` - Tab individual
- `.pedidos-tab.active` - Tab ativa

### Título
- `.pedidos-title-bar` - Barra de título
- `.title-left` - Lado esquerdo (voltar + título)
- `.title-right` - Lado direito (controles)
- `.btn-back` - Botão voltar
- `.pedidos-title` - Título da página
- `.view-toggle` - Toggle de visualização
- `.view-btn` - Botão de view
- `.view-btn.active` - View ativa
- `.btn-filtros` - Botão de filtros avançados
- `.btn-novo-pedido` - Botão novo pedido

### Filtros
- `.pedidos-active-filters` - Container dos filtros ativos
- `.filter-badge` - Badge de filtro
- `.filter-badge-remove` - Botão remover filtro

### Kanban
- `.pedidos-kanban` - Container Kanban
- `.kanban-column` - Coluna Kanban
- `.kanban-column-header` - Header da coluna
- `.kanban-column-title` - Título da coluna
- `.kanban-column-count` - Contador de cards
- `.kanban-column-cards` - Container dos cards

### Card
- `.pedido-card` - Card do pedido
- `.pedido-card-header` - Header do card
- `.pedido-id` - ID do pedido
- `.pedido-badge` - Badge genérico
- `.badge-faturado` - Badge faturado (verde)
- `.pedido-info-secondary` - Info secundária
- `.pedido-cliente` - Container cliente
- `.pedido-cliente-avatar` - Avatar do cliente
- `.pedido-cliente-info` - Info do cliente
- `.pedido-cliente-nome` - Nome do cliente
- `.pedido-vendedor` - Nome do vendedor
- `.pedido-divider` - Linha divisória
- `.pedido-info-row` - Linha de informação
- `.pedido-info-label` - Label da info
- `.pedido-info-value` - Valor da info
- `.pedido-muda` - Container da muda
- `.pedido-muda-info` - Info da muda
- `.pedido-muda-label` - Label da muda
- `.pedido-muda-value` - Nome da muda
- `.pedido-valor` - Valor do pedido

---

## 🔄 Alterações Realizadas

### HTML ([pedidos.html](c:\Projetos\Novapasta\pedidos.html))
1. ✅ Adicionado botão "Novo Pedido" na barra de título
2. ✅ Substituído layout grid por layout Kanban
3. ✅ Criadas 4 colunas: Recebido, Em Preparação, Em Produção, Em Expedição
4. ✅ Ajustados cards com novos componentes:
   - Badge "Faturado" (verde)
   - Info secundária (TG-45878)
   - Avatar com ícone de usuário
   - Ícone na muda (sprout)

### CSS ([pedidos-grid.css](c:\Projetos\Novapasta\styles\pedidos-grid.css))
1. ✅ Adicionado estilo para botão "Novo Pedido" na barra de título
2. ✅ Criados estilos para layout Kanban:
   - `.pedidos-kanban`
   - `.kanban-column`
   - `.kanban-column-header`
   - `.kanban-column-title`
   - `.kanban-column-count`
   - `.kanban-column-cards`
3. ✅ Adicionados estilos para novos componentes:
   - `.pedido-badge` e `.badge-faturado`
   - `.pedido-info-secondary`
   - `.pedido-cliente-avatar i` (ícone)
   - `.pedido-muda` com ícone
   - `.pedido-muda-info`

---

## 📱 Responsividade

O layout Kanban é responsivo com scroll horizontal:
- **Desktop:** 4 colunas visíveis
- **Scroll:** Permite navegar entre colunas
- **Largura fixa:** 320px por coluna para manter consistência

---

## 🚀 Como Usar

### Adicionar nova coluna:
```html
<div class="kanban-column">
    <div class="kanban-column-header">
        <h3 class="kanban-column-title">Nome da Coluna</h3>
        <span class="kanban-column-count">0</span>
    </div>
    <div class="kanban-column-cards">
        <!-- Cards aqui -->
    </div>
</div>
```

### Adicionar novo card:
Use a estrutura completa do card documentada acima.

### Ícones Lucide disponíveis:
- `user` - Avatar
- `calendar` - Data do pedido
- `sprout` - Muda
- `package` - Quantidade
- `calendar-clock` - Data de entrega
- `clipboard-list` - Pedido
- `arrow-left` - Voltar
- `plus` - Adicionar
- `x` - Remover
- `grid-2x2` - Grid
- `list` - Lista
- `sliders-horizontal` - Filtros
- `bell` - Notificações
- `settings` - Configurações
- `circle-help` - Ajuda

---

## ✨ Referência do Figma

**Node ID:** 40000547:4537
**Link:** https://www.figma.com/design/12Owll4S0STjk8b5aSwp3k/Tawros---Main?node-id=40000547-4537&m=dev

---

**Última atualização:** 2025-01-21
**Desenvolvido para:** Sistema Tawros - Gestão de Estufas
