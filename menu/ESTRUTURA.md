# Estrutura do Projeto Tawros

## 📁 Estrutura de Arquivos (Otimizada)

```
Novapasta/
├── 📄 index.html                    # Página principal do dashboard
│
├── 📁 styles/                       # Estilos CSS
│   ├── figma-tokens.css            # Design tokens do Figma
│   ├── variables.css               # Variáveis CSS globais
│   ├── components.css              # Componentes reutilizáveis
│   └── main.css                    # Layout e estilos principais
│
├── 📁 scripts/                      # Scripts JavaScript
│   ├── main.js                     # Lógica principal (sidebar, dropdowns, tabs)
│   └── charts.js                   # Configuração de gráficos
│
├── 📁 assets/                       # Recursos estáticos
│   └── logo.svg                    # Logo Tawros
│
├── 📁 .vscode/                      # Configurações do VSCode
│   └── mcp.json                    # Configuração MCP Figma
│
├── 📄 Design Tokens (Figma)
│   ├── design-tokens.ts            # Tokens TypeScript (149 cores, 64 tipografias)
│   ├── design-tokens.json          # Tokens JSON
│   └── figma-extracted-data.json   # Dados processados (2.057 componentes)
│
└── 📄 Documentação
    ├── README.md                   # Documentação principal
    ├── FIGMA-README.md             # Guia de uso dos tokens do Figma
    ├── MUDANCAS-FIGMA.md           # Log de mudanças da integração
    └── GUIA_FIGMA_VSCODE.md        # Guia de configuração MCP
```

---

## 📊 Estatísticas

**Antes da Otimização:**
- Total de arquivos: ~30
- Tamanho total: ~118 MB
- Scripts de análise: 8 arquivos
- Dados brutos: 113 MB

**Depois da Otimização:**
- Total de arquivos: **18**
- Tamanho total: **~5 MB**
- Redução: **~113 MB** (96% menor!)
- Arquivos removidos: **14**

---

## 🗑️ Arquivos Removidos

### Scripts de Análise (8 arquivos)
- ✅ `analyze-nav-buttons.js`
- ✅ `analyze-submenu.js`
- ✅ `extract-sidebar-specs.js`
- ✅ `find-icons.js`
- ✅ `find-nav-items.js`
- ✅ `find-nav-spacing.js`
- ✅ `find-search.js`
- ✅ `show-components.js`

### Dados Brutos (113 MB)
- ✅ `figma-file-data.json` (118 MB)
- ✅ `sidebar-specs.json` (168 KB)
- ✅ `figma-styles-data.json`

### Documentação Duplicada
- ✅ `SIDEBAR_SPECS.md`
- ✅ `ICONES_REFERENCIAS.md`
- ✅ `GUIA_DE_COMPONENTES.md`

### Scripts de Extração
- ✅ `extract-figma-data.js`

---

## 📦 Arquivos Essenciais Mantidos

### HTML & CSS
- `index.html` - Página principal
- `styles/figma-tokens.css` - **149 cores** do Figma
- `styles/variables.css` - Variáveis mapeadas
- `styles/components.css` - Componentes reutilizáveis
- `styles/main.css` - Layout do sidebar e dashboard

### JavaScript
- `scripts/main.js` - Interatividade (dropdowns, tabs, animações)
- `scripts/charts.js` - Gráficos do dashboard

### Design Tokens
- `design-tokens.ts` - Tokens em TypeScript
- `design-tokens.json` - Tokens em JSON
- `figma-extracted-data.json` - **2.057 componentes** extraídos

### Documentação
- `README.md` - Documentação principal
- `FIGMA-README.md` - Guia dos tokens
- `MUDANCAS-FIGMA.md` - Changelog da integração

---

## 🔄 Como Re-extrair Dados do Figma (se necessário)

Se precisar atualizar os tokens do Figma no futuro:

```bash
# 1. Baixar dados do Figma
curl -H "X-Figma-Token: SEU_TOKEN" \
  "https://api.figma.com/v1/files/12Owll4S0STjk8b5aSwp3k" \
  -o figma-file-data.json

# 2. Criar script de extração
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma-file-data.json'));
// Processar e extrair tokens...
"

# 3. Limpar arquivo bruto
rm figma-file-data.json
```

---

## 🎨 Componentes do Projeto

### Sidebar
- ✅ Logo Tawros
- ✅ Campo de busca com ícone Lucide
- ✅ Menu de navegação:
  - Painel (`house` icon)
  - Cadastros (`list` icon) com submenu
    - Pessoas e Empresas
    - Produtos e Serviços
  - BI e Relatórios (`chart-no-axes-combined` icon)
- ✅ Perfil do usuário

### Dashboard
- Cards de métricas
- Gráficos interativos
- Tabelas de dados
- Sugestões inteligentes

---

## 🚀 Como Usar

1. **Abrir o projeto:**
   - Abra `index.html` no navegador

2. **Editar estilos:**
   - Cores: `styles/figma-tokens.css`
   - Layout: `styles/main.css`
   - Componentes: `styles/components.css`

3. **Adicionar funcionalidades:**
   - JavaScript: `scripts/main.js`

4. **Consultar tokens:**
   - TypeScript: `design-tokens.ts`
   - JSON: `design-tokens.json`

---

## 📝 Notas

- Todos os **design tokens** estão preservados
- **Ícones Lucide** integrados via CDN
- **MCP Figma** configurado em `.vscode/mcp.json`
- Projeto otimizado para **96% menor** em tamanho

---

**Última atualização:** 2025-10-21
