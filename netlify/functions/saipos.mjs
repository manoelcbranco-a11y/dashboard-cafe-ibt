// Proxy server-side para a API de Dados da Saipos.
// O token fica na variável de ambiente SAIPOS_TOKEN (Site settings → Environment variables no Netlify).
const ALLOWED = ['search_sales', 'sales_items', 'sales_status_history', 'financial_transactions'];
const PARAMS = ['p_date_column_filter', 'p_filter_date_start', 'p_filter_date_end', 'p_limit', 'p_offset'];

export default async (req) => {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get('endpoint');
  if (!ALLOWED.includes(endpoint)) {
    return Response.json({ message: 'endpoint inválido' }, { status: 400 });
  }
  let token = process.env.SAIPOS_TOKEN;
  if (!token) {
    return Response.json({ message: 'Configure a variável de ambiente SAIPOS_TOKEN no Netlify' }, { status: 500 });
  }
  if (!token.startsWith('Bearer ')) token = 'Bearer ' + token;

  const qs = new URLSearchParams();
  for (const k of PARAMS) {
    const v = url.searchParams.get(k);
    if (v !== null) qs.set(k, v);
  }
  const r = await fetch(`https://data.saipos.io/v1/${endpoint}?${qs}`, {
    headers: { Authorization: token },
  });
  const body = await r.text();
  return new Response(body, {
    status: r.status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=120', // cache de 2 min para aliviar a API
    },
  });
};
