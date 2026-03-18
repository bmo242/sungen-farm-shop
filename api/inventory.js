const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRgfalqMJsT4JhM3tqLHwb7z_BjEfVKevnUVtXCoVcfOpTvyUtPIVcgTdM2n1IMMA/pub?gid=1818651648&single=true&output=csv';

export default async function handler(req, res) {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300'); // cache 5 min on Vercel edge
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
