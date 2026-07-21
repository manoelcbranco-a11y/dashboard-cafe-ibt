# Dashboard de vendas · Café do IBT

Dashboard estático que consome a API de Dados da Saipos através de uma Netlify Function
(o token nunca aparece no navegador). Atualiza automaticamente a cada 5 minutos.

## Estrutura
- `index.html` — o dashboard (HTML/CSS/JS puro, sem build)
- `netlify/functions/saipos.mjs` — proxy server-side para `data.saipos.io`
- `netlify.toml` — configuração do deploy

## Como publicar

1. **GitHub** — crie um repositório e envie estes arquivos:
   ```bash
   git init
   git add .
   git commit -m "Dashboard Café IBT"
   git remote add origin https://github.com/SEU_USUARIO/dashboard-cafe-ibt.git
   git push -u origin main
   ```
2. **Netlify** — em [app.netlify.com](https://app.netlify.com): *Add new site → Import an existing project*,
   escolha o repositório. Não precisa de comando de build; publish directory = `.` (já vem do `netlify.toml`).
3. **Token** — em *Site settings → Environment variables*, crie:
   - `SAIPOS_TOKEN` = o token da API de Dados da Saipos (com ou sem o prefixo `Bearer`).
4. Faça o deploy (ou re-deploy após criar a variável). Pronto.

Cada `git push` no repositório re-publica o site automaticamente.

## Ajustes
- Intervalo de atualização: constante `REFRESH_MINUTES` no topo do script em `index.html`.
- Períodos disponíveis: constante `PERIODS` (dias) no mesmo lugar.
- A function aceita apenas os endpoints e parâmetros da API de Dados (lista `ALLOWED`/`PARAMS` em `saipos.mjs`).

## Observação
A API da Saipos limita cada consulta a 15 dias — o dashboard divide períodos maiores
em blocos automaticamente. Em horários de pico os dados podem chegar com atraso de até 1 dia (D+1).
