# Kanban Logística — Cliente API

Integra o frontend ao **API v2** (JWT, CRUD, PDF e regras).

## Como usar
1. Rodar a API v2 em `http://localhost:3333`
2. Abrir `public/index.html` no navegador
3. O cliente pedirá login:
   - Deixe o email em branco para **criar um admin** padrão (`admin@tawros.local` / `secret`)
   - Ou informe seu email/senha cadastrados
4. Use normalmente. O comprovante pode ser:
   - **HTML** (imprime/salva PDF do navegador)
   - **PDF real** via endpoint `/comprovante.pdf`

Para trocar o endereço da API:
- No console, rode `localStorage.setItem('API_BASE', 'http://SEU_HOST:PORTA')` e recarregue a página.
