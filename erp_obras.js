/* CRM_NT · erp_obras.js · construído 2026-10-28 por erp/build_erp.py — NÃO editar à mão: alterar erp/xlsx_lite.js ou erp/erp_obras_src.js */
/* xlsx_lite.js — leitor mínimo de .xlsx/.xlsm (só valores em cache, uma folha de cada vez).
   Sem dependências: usa DecompressionStream('deflate-raw') (Chrome/Edge ≥103) e DOMParser.
   Uso: const wb = await XlsxLite.abrir(arrayBuffer); wb.folhas → ['Meta',…];
        const linhas = await wb.linhas('ANÁLISE TOTAL'); // array de arrays (índice 0 = coluna A), células vazias = null
   Tipos: números → Number; texto/sharedStrings/inlineStr → String; booleanos → true/false; datas ficam como serial Excel
   (converter com XlsxLite.dataExcel(n) → Date). Fórmulas: devolve o valor em cache (<v>), como o Excel gravou.
   Também corre em Node ≥18 (module.exports) para testes. */
(function (raiz) {
  'use strict';

  // ---------- ZIP (só o necessário: directório central + entradas deflate/store) ----------
  function lerZip(buf) {
    const u8 = new Uint8Array(buf), dv = new DataView(buf);
    // procurar End Of Central Directory (assinatura 0x06054b50) de trás para a frente
    let eocd = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 70000); i--) {
      if (u8[i] === 0x50 && u8[i + 1] === 0x4b && u8[i + 2] === 0x05 && u8[i + 3] === 0x06) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Ficheiro não é um ZIP/xlsx válido');
    const nEnt = dv.getUint16(eocd + 10, true);
    let off = dv.getUint32(eocd + 16, true);
    const ent = {};
    const td = new TextDecoder('utf-8');
    for (let k = 0; k < nEnt; k++) {
      if (dv.getUint32(off, true) !== 0x02014b50) throw new Error('Directório ZIP corrompido');
      const metodo = dv.getUint16(off + 10, true);
      const compSize = dv.getUint32(off + 20, true);
      const size = dv.getUint32(off + 24, true);
      const nLen = dv.getUint16(off + 28, true), eLen = dv.getUint16(off + 30, true), cLen = dv.getUint16(off + 32, true);
      const lho = dv.getUint32(off + 42, true);
      const nome = td.decode(u8.subarray(off + 46, off + 46 + nLen));
      ent[nome] = { metodo, compSize, size, lho };
      off += 46 + nLen + eLen + cLen;
    }
    async function ler(nome) {
      const e = ent[nome];
      if (!e) return null;
      const nl = dv.getUint16(e.lho + 26, true), el = dv.getUint16(e.lho + 28, true);
      const ini = e.lho + 30 + nl + el;
      const dados = u8.subarray(ini, ini + e.compSize);
      if (e.metodo === 0) return dados;
      if (e.metodo !== 8) throw new Error('Método de compressão não suportado: ' + e.metodo);
      const ds = new DecompressionStream('deflate-raw');
      const w = ds.writable.getWriter();
      w.write(dados); w.close();
      const ab = await new Response(ds.readable).arrayBuffer();
      return new Uint8Array(ab);
    }
    return { nomes: Object.keys(ent), ler };
  }

  // ---------- XML ----------
  function parseXml(u8) {
    const txt = new TextDecoder('utf-8').decode(u8);
    if (typeof DOMParser !== 'undefined') return new DOMParser().parseFromString(txt, 'application/xml');
    // Node: tenta @xmldom/xmldom se existir, senão jsdom não é necessário — o teste usa a implementação em cima
    const { DOMParser: DP } = require('@xmldom/xmldom');
    return new DP().parseFromString(txt, 'application/xml');
  }
  function filhos(no, tag) {
    const out = [];
    for (let c = no.firstChild; c; c = c.nextSibling) if (c.nodeType === 1 && (c.localName || c.nodeName.replace(/^.*:/, '')) === tag) out.push(c);
    return out;
  }
  function todos(doc, tag) { // getElementsByTagName insensível a prefixo
    const r = doc.getElementsByTagName(tag);
    if (r.length) return Array.from(r);
    const all = doc.getElementsByTagName('*'), out = [];
    for (let i = 0; i < all.length; i++) if ((all[i].localName || all[i].nodeName.replace(/^.*:/, '')) === tag) out.push(all[i]);
    return out;
  }
  function textoDe(no) { // concatena todos os <t> (rich text) de um <si>/<is>
    const ts = todos(no, 't'); let s = '';
    for (const t of ts) s += t.textContent || '';
    return s;
  }

  // ---------- Coordenadas ----------
  function colIdx(ref) { // "AB12" → 27 (0-based)
    let n = 0;
    for (let i = 0; i < ref.length; i++) {
      const c = ref.charCodeAt(i);
      if (c < 65 || c > 90) break;
      n = n * 26 + (c - 64);
    }
    return n - 1;
  }

  // ---------- Workbook ----------
  async function abrir(buf) {
    const zip = lerZip(buf);
    const wbX = await zip.ler('xl/workbook.xml');
    if (!wbX) throw new Error('Não é um livro Excel (falta xl/workbook.xml)');
    const relX = await zip.ler('xl/_rels/workbook.xml.rels');
    const wb = parseXml(wbX), rels = parseXml(relX);
    const relMap = {};
    for (const r of todos(rels, 'Relationship')) relMap[r.getAttribute('Id')] = r.getAttribute('Target');
    const folhas = [], alvo = {};
    for (const s of todos(wb, 'sheet')) {
      const nome = s.getAttribute('name');
      const rid = s.getAttribute('r:id') || s.getAttributeNS && s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id') || Array.from(s.attributes).filter(a => /:id$/.test(a.name)).map(a => a.value)[0];
      let t = relMap[rid] || '';
      t = t.replace(/^\/?(xl\/)?/, 'xl/');
      folhas.push(nome); alvo[nome] = t;
    }
    let ss = null;
    async function sharedStrings() {
      if (ss) return ss;
      const x = await zip.ler('xl/sharedStrings.xml');
      ss = [];
      if (x) for (const si of todos(parseXml(x), 'si')) ss.push(textoDe(si));
      return ss;
    }
    async function linhas(nomeFolha, opts) {
      opts = opts || {};
      const caminho = alvo[nomeFolha];
      if (!caminho) throw new Error('Folha não existe: ' + nomeFolha);
      const x = await zip.ler(caminho);
      if (!x) throw new Error('Folha sem conteúdo: ' + caminho);
      const strs = await sharedStrings();
      const doc = parseXml(x);
      const out = [];
      const sd = todos(doc, 'sheetData')[0];
      if (!sd) return out;
      for (const row of filhos(sd, 'row')) {
        const rIdx = parseInt(row.getAttribute('r'), 10) - 1;
        if (opts.max && rIdx >= opts.max) break;
        const arr = [];
        for (const c of filhos(row, 'c')) {
          const ref = c.getAttribute('r'); const ci = ref ? colIdx(ref) : arr.length;
          const t = c.getAttribute('t') || 'n';
          let v = null;
          if (t === 'inlineStr') {
            const is = filhos(c, 'is')[0]; v = is ? textoDe(is) : '';
          } else {
            const vn = filhos(c, 'v')[0];
            if (vn) {
              const raw = vn.textContent;
              if (t === 's') v = strs[parseInt(raw, 10)] ?? '';
              else if (t === 'b') v = raw === '1';
              else if (t === 'str' || t === 'e') v = raw;
              else { const n = Number(raw); v = isNaN(n) ? raw : n; }
            }
          }
          while (arr.length < ci) arr.push(null);
          arr[ci] = v;
        }
        while (out.length < rIdx) out.push([]);
        out[rIdx] = arr;
      }
      return out;
    }
    return { folhas, linhas };
  }

  function dataExcel(serial) { // serial 1900 → Date (UTC, meia-noite)
    if (typeof serial !== 'number') return null;
    return new Date(Math.round((serial - 25569) * 86400 * 1000));
  }

  const api = { abrir, dataExcel, VERSAO: '1.0' };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else raiz.XlsxLite = api;
})(typeof window !== 'undefined' ? window : globalThis);

/* erp_obras_src.js — «Atualizar obras do ERP» (Admin) · v1.0 (28/10/2026)
   Lê «Control de Produção.xlsm» (folha ANÁLISE TOTAL) + obras_meta.json da pasta BFC com XlsxLite,
   reduz a linhas, pede ao servidor a pré-visualização (obrasImportarERP · prever), o Admin marca o que
   quer e aplica (obrasImportarERP · aplicar). A pasta fica memorizada em IndexedDB (handle por utilizador),
   como a pasta de autos. Sem pasta (ou browser sem File System Access): escolher o ficheiro à mão.
   API: window.ErpObras.abrir(ctx) · ctx={callSec, esc, ME, aoTerminar(res), abrirFicha(cod)} */
(function (W) {
  'use strict';
  const VERSAO = '2.0';
  const ctxDef = () => ({ callSec: W.callSec, esc: W.esc, ME: W.ME, aoTerminar: null, abrirFicha: W.abrirFichaObra });
  let C = null, S = { dir: null, fich: null, fich2: null, meta: null, linhas: null, extras: null, plano: null, fonte: '' };

  // ---------- IndexedDB (handle da pasta) ----------
  const KV = {
    open(){ return new Promise((res, rej) => { const r = indexedDB.open('crm_erp', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
    async set(k, v){ const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = res; t.onerror = () => rej(t.error); }); },
    async get(k){ const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('kv', 'readonly'); const q = t.objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); },
  };
  const kPasta = () => 'pasta:' + String(C.ME || '').toLowerCase();

  // ---------- util ----------
  const esc = (s) => C.esc(s == null ? '' : String(s));
  const eur = (n) => { if (n == null || isNaN(n)) return '—'; const v = Math.abs(Number(n)).toFixed(2).split('.'); return (Number(n) < 0 ? '−' : '') + v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ',' + v[1] + ' €'; };
  const dt = (d) => { try { return new Date(d).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
  const $ = (sel) => document.querySelector(sel);
  const temFSA = () => typeof W.showDirectoryPicker === 'function';
  const norm = (s) => String(s == null ? '' : s).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

  const CSS = `
#erpFull{position:fixed;inset:0;z-index:9500;background:#f3f5f8;color:#212529;overflow:auto;font:13px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#erpFull .eTop{position:sticky;top:0;z-index:2;background:#fff;border-bottom:2px solid #163963;padding:10px 18px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#erpFull .eTop h2{margin:0;font-size:17px;color:#163963}#erpFull .eTop small{color:#6c757d}#erpFull .eTop .sp{flex:1}
#erpFull .eBody{max-width:1240px;margin:0 auto;padding:12px 18px 60px}
#erpFull .btn{border:1px solid #dee2e6;background:#fff;color:#1e4c84;border-radius:9px;padding:8px 13px;font:inherit;font-weight:700;cursor:pointer}
#erpFull .btn.p{background:#163963;color:#fff;border-color:#163963}#erpFull .btn.r{color:#b02a37}#erpFull .btn:disabled{opacity:.5;cursor:default}
#erpFull .card{background:#fff;border:1px solid #dee2e6;border-radius:11px;padding:12px 14px;margin-top:10px}
#erpFull .tag{display:inline-block;border-radius:999px;padding:1px 8px;font-size:11px;font-weight:700;background:#e8eef6;color:#1e4c84;white-space:nowrap;text-transform:none;letter-spacing:0}
#erpFull .tag.ok{background:#d1e7dd;color:#198754}#erpFull .tag.err{background:#f8d7da;color:#b02a37}#erpFull .tag.warn{background:#fff3cd;color:#856404}#erpFull .tag.pur{background:#e9dcf7;color:#5b2a86}
#erpFull .hint{color:#6c757d;font-size:12px}
#erpFull table{width:100%;border-collapse:collapse;font-size:12.5px}#erpFull th,#erpFull td{padding:6px 8px;border-bottom:1px solid #eef1f5;text-align:left;vertical-align:top}
#erpFull th{background:#e8eef6;color:#1e4c84;font-size:11px;text-transform:uppercase;letter-spacing:.3px}
#erpFull td.num,#erpFull th.num{text-align:right;white-space:nowrap;font-family:ui-monospace,Consolas,monospace}
#erpFull .grp{display:flex;align-items:center;gap:8px;margin:16px 0 6px;flex-wrap:wrap}#erpFull .grp h3{margin:0;font-size:13.5px;color:#163963;text-transform:uppercase;letter-spacing:.4px}
#erpFull .kp{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-top:10px}#erpFull .kp div{background:#fff;border:1px solid #dee2e6;border-radius:9px;padding:8px 12px}
#erpFull .kp small{display:block;color:#6c757d;font-size:10.5px;text-transform:uppercase}#erpFull .kp b{font-size:20px;color:#163963}
#erpFull .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
#erpFull .chg{color:#6c757d;text-decoration:line-through;margin-right:4px}
#erpFull .nota{background:#eef4fb;border:1px solid #c9d7e8;border-radius:9px;padding:10px 12px;font-size:12.5px;margin-top:12px}
#erpFull .msg{border-radius:9px;padding:10px 12px;margin-top:10px}#erpFull .msg.err{background:#f8d7da;color:#b02a37}#erpFull .msg.ok{background:#d1e7dd;color:#0f5132}#erpFull .msg.warn{background:#fff3cd;color:#856404}
#erpFull input[type=checkbox]{width:16px;height:16px}
#erpFull .foot{position:sticky;bottom:0;background:#fff;border-top:1px solid #dee2e6;padding:10px 18px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:16px -18px -60px}
#erpFull details summary{cursor:pointer;color:#1e4c84;font-weight:700}
#erpFull .ob{border:1px solid #dee2e6;border-radius:10px;padding:9px 12px;margin-top:8px;background:#fff;display:flex;gap:10px;align-items:center}#erpFull .ob b{color:#163963}#erpFull .ob .sp{flex:1}
@media print{#erpFull .eTop,#erpFull .foot{display:none}}`;

  function montar(){
    let el = $('#erpFull'); if (el) el.remove();
    if (!$('#erpCss')){ const st = document.createElement('style'); st.id = 'erpCss'; st.textContent = CSS; document.head.appendChild(st); }
    el = document.createElement('div'); el.id = 'erpFull'; document.body.appendChild(el);
    const esc_ = (e) => { if (e.key === 'Escape') fechar(); };
    document.addEventListener('keydown', esc_); el._esc = esc_;
    return el;
  }
  function fechar(){ const el = $('#erpFull'); if (!el) return; document.removeEventListener('keydown', el._esc); el.remove(); }
  function topo(titulo, sub, botoes){
    return `<div class="eTop"><h2>⟳ ${esc(titulo)}</h2><small>${sub || ''}</small><span class="sp"></span>${botoes || ''}<button class="btn" id="eX">✕ Fechar</button></div>`;
  }

  // ---------- ecrã 1: pasta / ficheiro ----------
  async function abrir(ctx){
    C = Object.assign(ctxDef(), ctx || {});
    S = { dir: null, fich: null, fich2: null, meta: null, linhas: null, extras: null, plano: null, fonte: '' };
    const el = montar();
    el.innerHTML = topo('Atualizar obras do ERP', 'Control de Produção.xlsm · ANÁLISE TOTAL') + `<div class="eBody"><div class="card"><div class="loading">A carregar…</div></div></div>`;
    $('#eX').onclick = fechar;
    let hist = null; try { hist = await C.callSec('erpImportacoes'); } catch (e) {}
    let pend = null, estadoPasta = 'nenhuma';
    if (temFSA()){
      try { pend = await KV.get(kPasta()); } catch (e) {}
      if (pend){ try { const p = await pend.queryPermission({ mode: 'read' }); estadoPasta = p === 'granted' ? 'ok' : 'pedir'; if (p === 'granted') S.dir = pend; } catch (e) { estadoPasta = 'pedir'; } }
    }
    const ult = hist && hist.ok && hist.lista && hist.lista[0];
    el.querySelector('.eBody').innerHTML = `
      <div class="card" style="border-color:#c9d7e8;background:#f8fbff">
        <div class="row"><b style="font-size:14px;color:#163963">Pasta da Gestão de Produção</b>
          ${estadoPasta === 'ok' ? `<span class="tag ok">memorizada · ${esc(pend.name)}</span>` : estadoPasta === 'pedir' ? `<span class="tag warn">memorizada · ${esc(pend.name)} · falta permissão</span>` : `<span class="tag">1.ª vez neste computador</span>`}</div>
        <p style="margin:6px 0">${temFSA()
          ? `Escolhe a pasta onde estão os ficheiros — <code>C:\\Users\\BCarneiro\\Desktop\\BFC</code> — com <code>Control de Produção.xlsm</code> e, se existir, <code>obras_meta.json</code> (tipo e DO corrigidos à mão têm prioridade). Fica memorizada neste computador; na pergunta do browser escolhe «Permitir sempre».`
          : `Este browser não permite memorizar a pasta (precisa de Edge ou Chrome em PC). Escolhe o ficheiro <code>Control de Produção.xlsm</code> de cada vez; o <code>obras_meta.json</code> é opcional.`}</p>
        <div class="row">
          ${temFSA() ? `<button class="btn ${estadoPasta === 'ok' ? '' : 'p'}" id="ePasta">📁 ${estadoPasta === 'nenhuma' ? 'Escolher pasta…' : 'Mudar pasta…'}</button>` : ''}
          ${estadoPasta === 'pedir' ? `<button class="btn p" id="ePerm">Permitir acesso à pasta</button>` : ''}
          ${estadoPasta === 'ok' ? `<button class="btn p" id="eLer">Ler e pré-visualizar</button>` : ''}
          <label class="btn" style="display:inline-block">📄 Escolher ficheiro…<input type="file" id="eFich" accept=".xlsm,.xlsx" style="display:none"></label>
          <label class="btn" style="display:inline-block" title="opcional">＋ obras_meta.json<input type="file" id="eMeta" accept=".json" style="display:none"></label>
          <label class="btn" style="display:inline-block" title="custos por categoria e por mês (opcional)">＋ Outros Custos…<input type="file" id="eFich2" accept=".xlsm,.xlsx" style="display:none"></label>
          <span class="hint" id="eFichNome"></span>
        </div>
        <div id="eMsg"></div>
      </div>
      <div class="card"><b>Regras</b>
        <div class="hint" style="margin-top:4px">Entram as obras <b>em curso, adjudicadas e a aguardar fecho de contas</b> (ADJU, ACTV, EMEXE, AGRP, AGRD, AGFC) dos <b>3 últimos exercícios</b>, sem as internas do obras_meta.json. O ERP manda na <b>descrição</b>; o <b>valor de contrato</b> (contratado + trab. a mais − a menos) e a <b>especialidade</b> só preenchem vazios — diferenças são sinalizadas. O <b>DO</b> é atribuído só na criação (pelo nome do ERP/meta); sem correspondência a obra nasce «por atribuir». Concluídas/fechadas no ERP e abertas no CRM aparecem como <b>a encerrar</b> — só fecham com a tua confirmação. Fechadas no CRM nunca reabrem. Nada é gravado antes de confirmares.</div></div>
      ${ult ? `<div class="card"><b>Última importação</b> <span class="hint">${esc(dt(ult.em))} · ${esc(ult.por)} · ${esc(ult.ficheiro || '')}${ult.ficheiroEm ? ' (dados de ' + esc(dt(ult.ficheiroEm)) + ')' : ''}</span>
          <div style="margin-top:4px"><span class="tag ok">${ult.criadas} criadas</span> <span class="tag">${ult.atualizadas} atualizadas</span> <span class="tag err">${ult.encerradas} encerradas</span> <span class="hint">· ${ult.nAmbito} no âmbito de ${ult.nLidas} lidas</span></div>
          ${hist.lista.length > 1 ? `<details style="margin-top:6px"><summary>anteriores (${hist.lista.length - 1})</summary>${hist.lista.slice(1).map(h => `<div class="hint">${esc(dt(h.em))} · ${esc(h.por)} · ${h.criadas}/${h.atualizadas}/${h.encerradas}</div>`).join('')}</details>` : ''}</div>` : `<div class="hint" style="margin-top:10px">Ainda não houve nenhuma importação.</div>`}`;
    const bP = $('#ePasta'); if (bP) bP.onclick = escolherPasta;
    const bQ = $('#ePerm'); if (bQ) bQ.onclick = async () => { try { const p = await pend.requestPermission({ mode: 'read' }); if (p === 'granted'){ S.dir = pend; await lerDaPasta(); } else msg('Permissão recusada.', 'err'); } catch (e) { msg(e.message, 'err'); } };
    const bL = $('#eLer'); if (bL) bL.onclick = lerDaPasta;
    $('#eFich').onchange = (e) => { const f = e.target.files[0]; if (!f) return; S.fich = f; S.dir = null; $('#eFichNome').textContent = f.name + (S.meta ? ' + obras_meta.json' : ''); lerFicheiros(); };
    $('#eFich2').onchange = (e) => { const f = e.target.files[0]; if (!f) return; S.fich2 = f; msg('«' + f.name + '» pronto — entra na próxima leitura (escolhe o Control de Produção a seguir, ou volta a ler).', 'ok'); if (S.fich) lerFicheiros(); };
    $('#eMeta').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { S.meta = JSON.parse(await f.text()); msg('obras_meta.json lido (' + Object.keys((S.meta && S.meta.obras) || S.meta || {}).length + ' obras).', 'ok'); } catch (err) { msg('obras_meta.json inválido: ' + err.message, 'err'); } };
  }
  function msg(t, tipo){ const m = $('#eMsg'); if (m) m.innerHTML = t ? `<div class="msg ${tipo || ''}">${esc(t)}</div>` : ''; }

  async function escolherPasta(){
    try {
      const dir = await W.showDirectoryPicker({ id: 'crm_erp_bfc', mode: 'read' });
      await KV.set(kPasta(), dir); S.dir = dir;
      await lerDaPasta();
    } catch (e) { if (e && e.name !== 'AbortError') msg('Não consegui usar a pasta: ' + e.message, 'err'); }
  }
  async function lerDaPasta(){
    if (!S.dir) return;
    msg('A procurar o ficheiro na pasta ' + S.dir.name + '…');
    try {
      let xl = null, xl2 = null, meta = null, candidatos = [];
      for await (const [nome, h] of S.dir.entries()){
        if (h.kind !== 'file') continue;
        if (/^control.*produ.*\.xlsm?$/i.test(nome) || /^control.*produ.*\.xlsx$/i.test(nome)) xl = h;
        else if (/^outros\s*custos.*\.(xlsm|xlsx)$/i.test(nome)) xl2 = h;
        else if (/\.(xlsm|xlsx)$/i.test(nome) && !/^~\$/.test(nome)) candidatos.push(h);
        if (/^obras_meta\.json$/i.test(nome)) meta = h;
      }
      if (!xl && candidatos.length === 1) xl = candidatos[0];
      if (!xl) return msg('Não encontrei «Control de Produção.xlsm» na pasta ' + S.dir.name + '. Escolhe outra pasta ou o ficheiro à mão.', 'err');
      S.fich = await xl.getFile();
      S.fich2 = xl2 ? await xl2.getFile() : null;
      S.meta = meta ? JSON.parse(await (await meta.getFile()).text()) : null;
      await lerFicheiros();
    } catch (e) { msg('Erro a ler a pasta: ' + e.message, 'err'); }
  }

  // ---------- leitura do xlsm → linhas ----------
  const COLS = { cod: 'Projecto', desc: 'Descrição', tipo: 'TIPO', do: 'D. Obra', estado: 'Estado', exercicio: 'Exercício', contratado: 'Contratado', mais: 'Trab. a mais', menos: 'Trab. a menos',
                 executado: 'Executado', porExecutar: 'Por Executar', faturado: 'Faturado', custoPrevisto: 'Custo Total Previsto', custoReal: 'Cust. Total Actual Real' };
  async function lerLinhas(wb, meta){
    const nomeFolha = wb.folhas.find(f => /an[áa]lise total/i.test(f));
    if (!nomeFolha) throw new Error('O ficheiro não tem a folha «ANÁLISE TOTAL» (tem: ' + wb.folhas.join(', ') + ').');
    const L = await wb.linhas(nomeFolha);
    let hi = -1; for (let i = 0; i < Math.min(L.length, 15); i++){ if ((L[i] || []).some(v => norm(v).toLowerCase() === 'projecto')){ hi = i; break; } }
    if (hi < 0) throw new Error('Não encontrei o cabeçalho (coluna «Projecto») na folha ' + nomeFolha + '.');
    const hdr = L[hi].map(v => norm(v).toLowerCase());
    const ix = {}; for (const k in COLS){ ix[k] = hdr.indexOf(COLS[k].toLowerCase()); }
    const faltam = ['cod', 'desc', 'estado', 'exercicio', 'contratado'].filter(k => ix[k] < 0);
    if (faltam.length) throw new Error('Faltam colunas na ANÁLISE TOTAL: ' + faltam.map(k => COLS[k]).join(', '));
    const M = (meta && meta.obras) || meta || {};
    const out = [];
    for (let i = hi + 1; i < L.length; i++){
      const r = L[i] || []; const cod = norm(r[ix.cod]); if (!cod) continue;
      const m = M[cod] || {};
      const g = (k) => ix[k] >= 0 ? r[ix[k]] : null;
      out.push({ cod, desc: norm(g('desc')), tipo: norm(m.tipo || g('tipo')), do: norm(g('do')), doMeta: norm(m.do), interna: !!m.interna,
                 estado: norm(g('estado')), exercicio: g('exercicio'), contratado: g('contratado'), mais: g('mais'), menos: g('menos'),
                 executado: g('executado'), porExecutar: g('porExecutar'), faturado: g('faturado'), custoPrevisto: g('custoPrevisto'), custoReal: g('custoReal') });
    }
    return out;
  }
  // ---------- extras: autos de cliente, autos de sub, clientes (Control de Produção) + custos (Outros Custos) ----------
  async function folhaTab(wb, re, chave){   // lê uma folha e devolve {hdr, linhas} a partir da linha de cabeçalho que contém `chave`
    const nome = wb.folhas.find(f => re.test(f)); if (!nome) return null;
    const L = await wb.linhas(nome);
    let hi = -1; for (let i = 0; i < Math.min(L.length, 30); i++){ if ((L[i] || []).some(v => norm(v) === chave)){ hi = i; break; } }
    if (hi < 0) return null;
    const hdr = L[hi].map(v => norm(v)); const ix = (k) => hdr.indexOf(k);
    return { ix, linhas: L.slice(hi + 1) };
  }
  const dISO = (v) => { if (v == null || v === '') return null; if (typeof v === 'number'){ const d = W.XlsxLite.dataExcel(v); return d ? d.toISOString().slice(0, 10) : null; } const t = norm(v).slice(0, 10); return /^\d{4}-\d\d-\d\d$/.test(t) ? t : null; };
  async function lerExtras(wb, file2){
    const ex = { autosCliente: [], autosSub: [], clientes: {}, custos: [], custosMes: [], nObrasCustos: 0, ficheiro2: file2 ? file2.name : '', ficheiro2Em: file2 && file2.lastModified ? new Date(file2.lastModified).toISOString() : null };
    const af = await folhaTab(wb, /^autos faturados$/i, 'strCodProjecto');
    if (af){ const g = (r, k) => { const i = af.ix(k); return i >= 0 ? r[i] : null; };
      for (const r of af.linhas){ const cod = norm(g(r, 'strCodProjecto')); if (!cod) continue;
        ex.autosCliente.push({ cod, numero: g(r, 'CA_N_AUTO'), docEx: norm(g(r, 'strCodExercicio')), docNum: norm(g(r, 'strNumero')), data: dISO(g(r, 'dtmData')), valor: g(r, 'Total Auto') || 0, estado: norm(g(r, 'strCodEstadoDocumento')), nAdj: norm(g(r, 'CA_N_ADJ')), doErp: norm(g(r, 'CA_D_OBRA')) }); } }
    const ap = await folhaTab(wb, /^auto cliente proposto$/i, 'strCodProjecto');
    if (ap){ const g = (r, k) => { const i = ap.ix(k); return i >= 0 ? r[i] : null; };
      for (const r of ap.linhas){ const cod = norm(g(r, 'strCodProjecto')); if (!cod) continue;
        ex.autosCliente.push({ cod, numero: g(r, 'CA_N_AUTO'), docEx: norm(g(r, 'strCodExercicio')), docNum: '', data: dISO(g(r, 'dtmData')), valor: g(r, 'Total Auto') || 0, estado: 'PROP', nAdj: '', doErp: norm(g(r, 'CA_D_OBRA')), cliente: norm(g(r, 'strNomeCliente')) }); } }
    const as = await folhaTab(wb, /^autos subemp$/i, 'strCodProjecto');
    if (as){ const g = (r, k) => { const i = as.ix(k); return i >= 0 ? r[i] : null; };
      for (const r of as.linhas){ const cod = norm(g(r, 'strCodProjecto')); if (!cod) continue;
        ex.autosSub.push({ cod, subCod: norm(g(r, 'Cod Subempr.')), subNome: norm(g(r, 'Subempreiteiro')), subempreitada: norm(g(r, 'nº Subempreitada')), numero: g(r, 'CA_N_AUTO'), docEx: norm(g(r, 'strCodExercicio')), docNum: norm(g(r, 'strNumero')),
                           data: dISO(g(r, 'dtmData')), dataDe: dISO(g(r, 'dtmDataDe')), dataAte: dISO(g(r, 'dtmDataAte')), valor: g(r, 'Total Sub_E') || 0, estado: norm(g(r, 'strCodEstadoDocumento')), esp: norm(g(r, 'EspDescricao')), doErp: norm(g(r, 'CA_D_OBRA')) }); } }
    const cl = await folhaTab(wb, /^clientes obra$/i, 'strCodProjecto');
    if (cl){ for (const r of cl.linhas){ const cod = norm(r[cl.ix('strCodProjecto')]); const nome = norm(r[cl.ix('strNomeCliente')]); if (cod && nome && !ex.clientes[cod]) ex.clientes[cod] = nome; } }
    if (file2){
      const wb2 = await W.XlsxLite.abrir(await file2.arrayBuffer());
      const CAT = { materiais: [/^custos? materiais previsto$/i, /^custos? materiais atual$/i], mao_obra: [/^custos? m[ãa]o de obra previsto$/i, /^custos? m[ãa]o de obra atual$/i], equipamento: [/^custos? equipamentos? previsto$/i, /^custos? equipamentos? atual$/i],
                    servicos: [/^custos? servi[çc]os previsto$/i, /^custos? servi[çc]os atual$/i], subempreitadas: [/^custos? subempreiteiros? previsto$/i, /^custos? subempreiteiros? atual$/i], indiretos: [/^custos? indiretos? previsto$/i, /^custos? indiretos? atual$/i] };
      const porObra = {};
      for (const cat of Object.keys(CAT)){
        for (let k = 0; k < 2; k++){
          const nome = wb2.folhas.find(f => CAT[cat][k].test(f.trim())); if (!nome) continue;
          const L = await wb2.linhas(nome);
          for (let i = 1; i < L.length; i++){ const r = L[i] || []; const cod = norm(r[0]); if (!cod || !/^\d+$/.test(cod)) continue; const v = r[1]; if (v == null || v === '') continue;
            const o = porObra[cod] = porObra[cod] || {}; const c = o[cat] = o[cat] || { cod, categoria: cat, previsto: null, atual: null }; c[k === 0 ? 'previsto' : 'atual'] = Number(v) || 0; }
        }
      }
      for (const cod of Object.keys(porObra)) for (const cat of Object.keys(porObra[cod])) ex.custos.push(porObra[cod][cat]);
      ex.nObrasCustos = Object.keys(porObra).length;
      const TIPO = { 0: 'materiais', 1: 'servicos', 2: 'mao_obra', 4: 'equipamento', 5: 'indiretos', 6: 'subempreitadas' };
      const cm = await folhaTab(wb2, /^custos mensais$/i, 'strProjectCode');
      if (cm){ const g = (r, k) => { const i = cm.ix(k); return i >= 0 ? r[i] : null; };
        for (const r of cm.linhas){ const cod = norm(g(r, 'strProjectCode')); const t = TIPO[Number(g(r, 'intResourceType'))]; const mes = norm(g(r, 'Mes')); if (!cod || !t || !/^\d{4}-\d\d$/.test(mes)) continue;
          ex.custosMes.push({ cod, mes, categoria: t, custo: Number(g(r, 'Custo')) || 0 }); } }
    }
    return ex;
  }
  async function lerFicheiros(){
    if (!S.fich) return;
    msg('A ler ' + S.fich.name + '…');
    try {
      const wb = await W.XlsxLite.abrir(await S.fich.arrayBuffer());
      S.linhas = await lerLinhas(wb, S.meta);
      S.fonte = S.fich.name;
      if (!S.linhas.length) return msg('A folha ANÁLISE TOTAL está vazia.', 'err');
      msg('Lidas ' + S.linhas.length + ' obras' + (S.meta ? ' (+ obras_meta.json)' : '') + '. A ler autos e custos…');
      S.extras = await lerExtras(wb, S.fich2);
      msg('Lidas ' + S.linhas.length + ' obras · ' + S.extras.autosCliente.length + ' autos de cliente · ' + S.extras.autosSub.length + ' autos de sub' + (S.fich2 ? ' · custos de ' + S.extras.nObrasCustos + ' obras' : ' · sem Outros Custos') + '. A comparar com o CRM…');
      const r = await C.callSec('obrasImportarERP', { modo: 'prever', linhas: S.linhas, anoRef: new Date().getFullYear() });
      if (!r || r.erro) return msg((r && r.erro) || 'Erro no servidor.', 'err');
      // só as obras que existem (ou vão existir) no CRM seguem para o servidor
      const so = new Set(r.codigosCRM || []);
      S.extras.autosCliente = S.extras.autosCliente.filter(a => so.has(a.cod)); S.extras.autosSub = S.extras.autosSub.filter(a => so.has(a.cod));
      S.extras.custos = S.extras.custos.filter(c => so.has(c.cod)); S.extras.custosMes = S.extras.custosMes.filter(c => so.has(c.cod));
      S.plano = r; prever();
    } catch (e) { msg(e.message || String(e), 'err'); }
  }

  // ---------- ecrã 2: pré-visualização ----------
  const chk = (tipo, cod, on) => `<input type="checkbox" data-t="${tipo}" data-c="${esc(cod)}"${on ? ' checked' : ''}>`;
  const tagEst = (p) => `<span class="tag ${p.estado === 'AGFC' ? 'warn' : ''}">${esc(p.estadoLabel || p.estado)}</span>`;
  function alteracaoHTML(a){
    return a.alteracoes.map(x => {
      if (x.campo === 'descricao') return `Descrição <span class="chg">${esc(x.de)}</span> <b>${esc(x.para)}</b>`;
      if (x.campo === 'valor') return `Valor de contrato <span class="chg">${x.de == null ? 'vazio' : eur(x.de)}</span> <b>${eur(x.para)}</b>${a.mais ? ` <span class="hint">(contratado ${eur(a.contratado)} + trab. a mais ${eur(a.mais)}${a.menos ? ' − a menos ' + eur(a.menos) : ''})</span>` : ''}`;
      if (x.campo === 'especialidade') return `Especialidade <span class="chg">${esc(x.de || 'vazia')}</span> <b>${esc(x.para)}</b>`;
      return esc(x.campo);
    }).join(' · ');
  }
  function prever(){
    const p = S.plano, el = $('#erpFull'); if (!p || !el) return;
    const ex = Object.keys(p.exercicios || {}).sort();
    const semDO = p.novas.filter(n => n.semDO).length;
    el.innerHTML = topo('Atualizar obras do ERP — pré-visualização', `${esc(S.fonte)} · dados do ERP de ${esc(dt(S.fich.lastModified))} · ${p.nLidas} obras no ficheiro · ${p.nAmbito} no âmbito (${ex.length > 1 ? ex[0] + '–' + ex[ex.length - 1] : ex[0] || '—'})`, `<button class="btn" id="eVoltar">‹ Voltar</button>`)
      + `<div class="eBody">
      <div class="kp"><div><small>Novas no CRM</small><b>${p.novas.length}</b></div><div><small>A atualizar</small><b>${p.atualizar.length}</b></div><div><small>Sem alteração</small><b>${p.iguais.length}</b></div><div><small>A encerrar</small><b>${p.encerrar.length}</b></div><div><small>Divergências</small><b>${p.divergencias.length}</b></div><div><small>Sem DO reconhecido</small><b>${semDO}</b></div></div>
      ${secNovas(p)}${secAtualizar(p)}${secEncerrar(p)}${secDivergencias(p)}${secIguais(p)}${secIgnoradas(p)}${secFotografias()}
      <div class="foot"><span class="hint" style="flex:1">Nada é gravado antes de confirmares. Fica registado quem, quando e o que foi feito.</span><span id="eCont" class="hint"></span><button class="btn p" id="eAplicar">Aplicar</button></div>
      </div>`;
    $('#eX').onclick = fechar; $('#eVoltar').onclick = () => abrir(C);
    el.querySelectorAll('input[data-all]').forEach(cb => cb.onchange = () => { el.querySelectorAll(`input[data-t="${cb.dataset.all}"]`).forEach(x => x.checked = cb.checked); contar(); });
    el.querySelectorAll('input[data-t]').forEach(cb => cb.onchange = contar);
    $('#eAplicar').onclick = aplicar;
    contar();
  }
  function escolhas(){
    const e = { criar: [], atualizar: [], encerrar: [] };
    document.querySelectorAll('#erpFull input[data-t]:checked').forEach(cb => { if (e[cb.dataset.t]) e[cb.dataset.t].push(cb.dataset.c); });
    return e;
  }
  function contar(){
    const e = escolhas(); const n = e.criar.length + e.atualizar.length + e.encerrar.length;
    const c = $('#eCont'); if (c) c.textContent = `${e.criar.length} a criar · ${e.atualizar.length} a atualizar · ${e.encerrar.length} a encerrar`;
    const b = $('#eAplicar'); if (b){ b.disabled = false; b.textContent = n ? `Aplicar ${n} ${n === 1 ? 'alteração' : 'alterações'} + fotografias` : 'Só atualizar fotografias (autos, custos)'; }
  }
  function secNovas(p){
    if (!p.novas.length) return `<div class="grp"><h3>Novas</h3><span class="tag">0</span><span class="hint">todas as obras do âmbito já existem no CRM</span></div>`;
    return `<div class="grp"><h3>Novas</h3><span class="tag ok">${p.novas.length}</span><span class="hint">são criadas; o DO vem do ERP/meta quando bate com um colaborador ativo do CRM</span></div>
      <div class="card" style="padding:0;overflow:auto"><table><thead><tr><th><input type="checkbox" data-all="criar" checked></th><th>Código</th><th>Descrição (ERP)</th><th>Estado ERP</th><th>Exerc.</th><th>Especialidade</th><th>DO</th><th class="num">Valor contrato</th></tr></thead><tbody>
      ${p.novas.map(n => `<tr><td>${chk('criar', n.cod, true)}</td><td><b>${esc(n.cod)}</b></td><td>${esc(n.desc)}</td><td>${tagEst(n)}</td><td>${esc(n.exercicio)}</td><td>${n.esp ? (n.esp === 'Misto' ? '<span class="tag pur">Misto</span>' : esc(n.esp)) : '<span class="hint">—</span>'}</td>
        <td>${n.semDO ? `<span class="tag warn">por atribuir</span> <span class="hint">${esc(n.semDOMotivo)}</span>` : esc(n.doNome)}</td><td class="num">${n.valor ? eur(n.valor) : '—'}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function secAtualizar(p){
    if (!p.atualizar.length) return `<div class="grp"><h3>A atualizar</h3><span class="tag">0</span></div>`;
    return `<div class="grp"><h3>A atualizar</h3><span class="tag">${p.atualizar.length}</span><span class="hint">descrição do ERP; valor e especialidade só quando estão vazios no CRM; o DO não muda</span></div>
      <div class="card" style="padding:0;overflow:auto"><table><thead><tr><th><input type="checkbox" data-all="atualizar" checked></th><th>Código</th><th>Obra</th><th>O que muda</th><th>Estado ERP</th></tr></thead><tbody>
      ${p.atualizar.map(a => `<tr><td>${chk('atualizar', a.cod, true)}</td><td><b>${esc(a.cod)}</b></td><td>${esc(a.descCRM)}${a.fechadaCRM ? ' <span class="tag">encerrada no CRM</span>' : ''}<div class="hint">${a.doNome ? 'DO ' + esc(a.doNome) : 'sem DO'}</div></td><td>${alteracaoHTML(a)}</td><td>${tagEst(a)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function secEncerrar(p){
    if (!p.encerrar.length) return `<div class="grp"><h3>A encerrar</h3><span class="tag">0</span><span class="hint">nenhuma obra aberta no CRM está concluída ou fechada no ERP</span></div>`;
    return `<div class="grp"><h3>A encerrar</h3><span class="tag err">${p.encerrar.length}</span><span class="hint">concluídas ou fechadas no ERP e ainda abertas no CRM — passam a encerradas (deixam de aparecer aos DO; ficam no arquivo 🔒). Com ponto por validar ou dias de subempreiteiros em aberto não fecham — fica indicado.</span></div>
      <div class="card" style="padding:0;overflow:auto"><table><thead><tr><th><input type="checkbox" data-all="encerrar" checked></th><th>Código</th><th>Descrição</th><th>Estado ERP</th><th>Exerc.</th><th>DO no CRM</th></tr></thead><tbody>
      ${p.encerrar.map(e => `<tr><td>${chk('encerrar', e.cod, true)}</td><td><b>${esc(e.cod)}</b></td><td>${esc(e.desc)}</td><td><span class="tag ok">${esc(e.estadoLabel)}</span></td><td>${esc(e.exercicio || '')}</td><td>${esc(e.doNome || '—')}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function secDivergencias(p){
    if (!p.divergencias.length && !p.foraERP.length) return '';
    const T = { valor: 'Valor de contrato', especialidade: 'Especialidade', fechadaCRM: 'Estado', interna: 'Interna', estado: 'Estado' };
    return `<div class="grp"><h3>Divergências</h3><span class="tag warn">${p.divergencias.length}</span><span class="hint">só informação — o CRM mantém o que tem; corriges à mão na ficha se for caso disso</span></div>
      <div class="card" style="padding:0;overflow:auto"><table><thead><tr><th>Código</th><th>Obra</th><th>Campo</th><th>CRM</th><th>ERP</th><th>Nota</th></tr></thead><tbody>
      ${p.divergencias.map(d => `<tr><td><b>${esc(d.cod)}</b></td><td>${esc(d.desc)}</td><td>${esc(T[d.tipo] || d.tipo)}</td><td>${d.tipo === 'valor' ? eur(d.crm) : esc(d.crm)}</td><td>${d.tipo === 'valor' ? eur(d.erp) : esc(d.erp)}</td><td class="hint">${esc(d.nota)}</td></tr>`).join('')}
      ${p.foraERP.map(o => `<tr><td><b>${esc(o.cod)}</b></td><td>${esc(o.desc)}</td><td>—</td><td>Aberta</td><td><span class="hint">não vem no ficheiro</span></td><td class="hint">obra do CRM que o ERP não conhece${o.doNome ? ' · DO ' + esc(o.doNome) : ''}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function secIguais(p){
    if (!p.iguais.length) return '';
    return `<details class="card"><summary>Sem alteração · ${p.iguais.length}</summary><div class="hint" style="margin-top:6px">${p.iguais.map(i => `<b>${esc(i.cod)}</b> ${esc(i.descCRM)}`).join(' · ')}</div></details>`;
  }
  function secFotografias(){
    const x = S.extras || {}; const nOb = (arr) => new Set((arr || []).map(a => a.cod)).size;
    return `<div class="grp"><h3>Fotografias do ERP</h3><span class="tag">sempre</span><span class="hint">gravadas para as obras do CRM ao aplicar, com ou sem alterações marcadas — alimentam a Análise de produção, «Autos de cliente» e a consola</span></div>
      <div class="kp"><div><small>Autos de cliente</small><b>${(x.autosCliente || []).length}</b><div class="hint">${nOb(x.autosCliente)} obras</div></div><div><small>Autos de subempreiteiro</small><b>${(x.autosSub || []).length}</b><div class="hint">${nOb(x.autosSub)} obras</div></div>
      <div><small>Custos por categoria</small><b>${x.ficheiro2 ? nOb(x.custos) : '—'}</b><div class="hint">${x.ficheiro2 ? esc(x.ficheiro2) : '<span style="color:#b02a37">Outros Custos direto sql.xlsm não encontrado</span>'}</div></div><div><small>Custos mensais</small><b>${x.ficheiro2 ? (x.custosMes || []).length : '—'}</b><div class="hint">${x.ficheiro2 ? nOb(x.custosMes) + ' obras' : ''}</div></div></div>`;
  }
  function secIgnoradas(p){
    const ig = p.ignoradas || {}; const est = Object.keys(ig.estadoForaAmbito || {}).map(k => `${esc(k)} ${ig.estadoForaAmbito[k]}`).join(' · ');
    const n = Object.values(ig.estadoForaAmbito || {}).reduce((a, b) => a + b, 0) + (ig.interna || []).length + (ig.exercicioAntigo || []).length + (ig.duplicadas || []).length;
    return `<div class="grp"><h3>Ignoradas</h3><span class="tag">${n}</span><span class="hint">não entram: por estado (${est || '—'})${(ig.interna || []).length ? ` · internas ${ig.interna.length} (${ig.interna.map(esc).join(', ')})` : ''}${(ig.exercicioAntigo || []).length ? ` · exercícios anteriores a ${p.anoMin}: ${ig.exercicioAntigo.length}` : ''}${(ig.duplicadas || []).length ? ` · códigos repetidos: ${ig.duplicadas.map(esc).join(', ')}` : ''}</span></div>`;
  }

  // ---------- aplicar ----------
  async function aplicar(){
    const e = escolhas();
    const b = $('#eAplicar'); b.disabled = true; b.textContent = 'A aplicar…';
    try {
      const r = await C.callSec('obrasImportarERP', { modo: 'aplicar', linhas: S.linhas, anoRef: new Date().getFullYear(), ficheiro: S.fonte, ficheiroEm: S.fich.lastModified ? new Date(S.fich.lastModified).toISOString() : null, escolhas: e, extras: S.extras || {} });
      if (!r || r.erro || !Array.isArray(r.criadas)){ b.disabled = false; contar(); const f = $('.foot');
        const txt = (r && r.erro) || (r && (r.message || r.msg)) || (r ? 'Resposta inesperada do servidor: ' + JSON.stringify(r).slice(0, 300) : 'Erro no servidor.');
        if (f) f.insertAdjacentHTML('afterbegin', `<div class="msg err" style="flex-basis:100%">${esc(txt)}</div>`); return; }
      resultado(r);
      if (typeof C.aoTerminar === 'function') try { C.aoTerminar(r); } catch (err) {}
    } catch (err) { b.disabled = false; contar(); alert('Erro: ' + (err.message || err)); }
  }
  function resultado(r){
    const el = $('#erpFull'); if (!el) return;
    const p = S.plano; const nome = (cod) => { const x = (p.novas.concat(p.atualizar, p.encerrar)).find(o => o.cod === cod); return x ? (x.desc || x.descCRM || '') : ''; };
    el.innerHTML = topo('Obras atualizadas do ERP', esc(dt(new Date()))) + `<div class="eBody">
      <div class="msg ok">✔ <b>${r.criadas.length} criadas · ${r.atualizadas.length} atualizadas · ${r.encerradas.length} encerradas</b>${r.extras ? ` · fotografias: ${r.extras.estado} obras, ${r.extras.autosCliente} autos de cliente, ${r.extras.autosSub} autos de sub, custos de ${r.extras.custos ? Math.round(r.extras.custos / 1) : 0} linhas${r.extras.fechados ? ` · <b>${r.extras.fechados} auto(s) da consola fechado(s) pelo ERP</b>` : ''}` : ''}${r.semDO.length ? ` · <b>${r.semDO.length} por atribuir DO</b>` : ''}${r.naoEncerradas.length ? ` · ${r.naoEncerradas.length} não encerradas` : ''}</div>
      ${r.semDO.length ? `<div class="grp"><h3>Por atribuir DO</h3><span class="tag warn">${r.semDO.length}</span><span class="hint">só tu as vês até lhes dares Diretor de Obra — abre a ficha e escolhe</span></div>
        ${r.semDO.map(o => `<div class="ob"><div><b>${esc(o.cod)} · ${esc(o.desc)}</b> <span class="tag warn">por atribuir DO</span><div class="hint">${esc(o.motivo)}</div></div><span class="sp"></span><button class="btn p" data-ficha="${esc(o.cod)}">Atribuir DO</button></div>`).join('')}` : ''}
      ${r.naoEncerradas.length ? `<div class="grp"><h3>Não encerradas</h3><span class="tag err">${r.naoEncerradas.length}</span><span class="hint">resolve primeiro e volta a correr a importação</span></div>
        ${r.naoEncerradas.map(o => `<div class="ob"><div><b>${esc(o.cod)} · ${esc(nome(o.cod))}</b><div class="hint">${esc(o.motivo)}</div></div></div>`).join('')}` : ''}
      ${r.criadas.length ? `<details class="card" open><summary>Criadas · ${r.criadas.length}</summary><div class="hint" style="margin-top:6px">${r.criadas.map(c => `<b>${esc(c)}</b> ${esc(nome(c))}`).join(' · ')}</div></details>` : ''}
      ${r.atualizadas.length ? `<details class="card" open><summary>Atualizadas · ${r.atualizadas.length}</summary><div class="hint" style="margin-top:6px">${r.atualizadas.map(c => `<b>${esc(c)}</b> ${esc(nome(c))}`).join(' · ')}</div></details>` : ''}
      ${r.encerradas.length ? `<details class="card" open><summary>Encerradas · ${r.encerradas.length}</summary><div class="hint" style="margin-top:6px">${r.encerradas.map(c => `<b>${esc(c)}</b> ${esc(nome(c))}`).join(' · ')}</div></details>` : ''}
      <div class="row" style="margin-top:14px"><button class="btn p" id="eOk">Fechar</button></div></div>`;
    $('#eX').onclick = fechar; $('#eOk').onclick = fechar;
    el.querySelectorAll('button[data-ficha]').forEach(b => b.onclick = () => { fechar(); if (typeof C.abrirFicha === 'function') C.abrirFicha(b.dataset.ficha); });
  }

  W.ErpObras = { abrir, fechar, lerLinhas, VERSAO, _S: () => S };
})(window);
