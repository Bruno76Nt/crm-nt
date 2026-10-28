// CRM_NT · módulo AUTOS · autos.js · build 2026-10-28
// A Consola de Autos v0.30 levantada para dentro do CRM_NT: o código da consola está aqui tal e qual
// (gerado por build_autos.py a partir de consola_v0.30.html, com os patches assinalados P1–P13);
// o CRM entra só onde a consola não podia: login (nome/papel), obras do CRM, tabela de subempreiteiros,
// envio pelo servidor e estado do fluxo. Carregado só no separador Autos em modo PC.
window.Autos=(function(){
'use strict';
let ROOT=null,CTX=null,CRM=null,CFG={dia_fecho:25},KEY_ROOT='root';
const AUTOS_CSS="#autosRoot{--base:#1e4c84;--base-dark:#163963;--base-soft:#e8eef6;--bg:#f3f5f8;--card:#fff;--tx:#212529;--mut:#6c757d;--line:#dee2e6;\n    --ok:#198754;--ok-bg:#d1e7dd;--warn:#856404;--warn-bg:#fff3cd;--err:#b02a37;--err-bg:#f8d7da;--yel:#fff2cc;--acc:var(--base);--acc2:var(--base-soft);\n    --base-tx:#1e4c84;--radius:8px;--shadow:0 1px 2px rgba(16,24,40,.06),0 1px 3px rgba(16,24,40,.08);--mono:ui-monospace,Consolas,\"Cascadia Mono\",monospace}\n#autosRoot *{box-sizing:border-box}\n  \n#autosRoot{margin:0;background:var(--bg);color:var(--tx);font:14px/1.45 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;display:flex;flex-direction:column}\n#autosRoot header{height:56px;background:var(--card);border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 16px;gap:14px;flex-shrink:0}\n#autosRoot header .logo{display:flex;align-items:center;gap:10px;font-weight:700;color:var(--base-tx);font-size:16px;white-space:nowrap}\n#autosRoot header .logo img{height:34px;max-width:160px;object-fit:contain}\n#autosRoot header .logo .mark{width:34px;height:34px;border-radius:7px;background:var(--base);color:#fff;display:grid;place-items:center;font-weight:800;font-size:13px}\n#autosRoot header .logo small{font-weight:500;color:var(--mut);font-size:12px}\n#autosRoot header .ctx{font-size:13px;color:var(--mut);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#autosRoot header .sp{flex:1}\n#autosRoot .chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--line);background:var(--card);white-space:nowrap}\n#autosRoot .chip.do{background:var(--base-soft);color:var(--base-tx);border-color:transparent}#autosRoot .chip.ctrl{background:#e6f4ef;color:#0f5132;border-color:transparent}\n#autosRoot .avatar{width:32px;height:32px;border-radius:50%;background:var(--base);color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px;flex-shrink:0}\n#autosRoot .icnbtn{width:34px;height:34px;border-radius:7px;border:1px solid var(--line);background:var(--card);display:grid;place-items:center;color:var(--mut);cursor:pointer;padding:0;margin:0}\n#autosRoot .wrap{display:flex;flex:1;min-height:0}\n#autosRoot .anav{width:220px;background:var(--card);border-right:1px solid var(--line);padding:10px 8px;flex-shrink:0;overflow:auto}\n#autosRoot .anav a{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:7px;color:var(--tx);text-decoration:none;cursor:pointer;font-weight:500;margin:1px 0}\n#autosRoot .anav a svg{width:18px;height:18px;flex-shrink:0;color:var(--mut)}\n#autosRoot .anav a.on{background:var(--base);color:#fff}#autosRoot .anav a.on svg{color:#fff}\n#autosRoot .anav a:hover:not(.on){background:var(--base-soft)}\n#autosRoot .anav a.dis{color:#aab;cursor:default}\n#autosRoot .anav .sec{padding:12px 12px 4px;font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.06em}\n#autosRoot .anav .nb{margin-left:auto;background:#ffc107;color:#000;font-size:11px;padding:1px 7px;border-radius:999px;font-weight:700}\n#autosRoot .amain{flex:1;overflow:auto;padding:20px 26px;min-width:0}\n#autosRoot h2{font-size:21px;margin:0 0 12px;font-weight:700}\n#autosRoot h3{font-size:15px;margin:18px 0 8px}\n#autosRoot .card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;margin-bottom:14px;box-shadow:var(--shadow)}\n#autosRoot button{font:inherit;background:var(--base);color:#fff;border:1px solid transparent;border-radius:7px;padding:7px 13px;cursor:pointer;margin:2px 6px 2px 0;font-weight:600}\n#autosRoot button:hover{background:var(--base-dark)}\n#autosRoot button.sec{background:var(--card);color:var(--tx);border-color:var(--line)}#autosRoot button.sec:hover{background:var(--base-soft)}\n#autosRoot button.danger{background:var(--err)}#autosRoot button.danger:hover{background:#8b1a1a}#autosRoot button.sm{padding:4px 10px;font-size:12.5px}\n#autosRoot button:disabled{opacity:.45;cursor:default}\n#autosRoot input, #autosRoot select{font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--tx)}\n#autosRoot input[type=number]{width:110px}#autosRoot input.short{width:90px}\n#autosRoot label{display:inline-block;margin:4px 14px 4px 0}\n#autosRoot label span{display:block;font-size:12px;color:var(--mut)}\n#autosRoot table{border-collapse:collapse;width:100%;font-size:13px;background:var(--card)}\n#autosRoot th, #autosRoot td{border-bottom:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:middle}\n#autosRoot th{background:var(--base-soft);color:var(--base-tx);position:sticky;top:0;z-index:2;font-size:12px;text-transform:uppercase;letter-spacing:.03em;font-weight:700}\n#autosRoot thead.h2 tr:first-child th{height:26px;box-sizing:border-box}#autosRoot thead.h2 tr:nth-child(2) th{top:26px}\n#autosRoot td.num, #autosRoot th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}\n#autosRoot table.wide td:nth-child(2){min-width:280px}\n#autosRoot td input[type=number]{width:85px;padding:3px 5px;text-align:right}\n#autosRoot tr.cap td{background:color-mix(in srgb,var(--card) 85%,var(--bg));font-weight:700}\n#autosRoot tr.rem td{color:var(--mut);text-decoration:line-through}\n#autosRoot tbody tr:hover td{background:color-mix(in srgb,var(--base-soft) 40%,var(--card))}\n#autosRoot .tag{display:inline-block;font-size:11.5px;padding:1px 8px;border-radius:999px;background:var(--base-soft);color:var(--base-tx);margin-left:4px;font-weight:600}\n#autosRoot .tag.ok{background:var(--ok-bg);color:var(--ok)}#autosRoot .tag.err{background:var(--err-bg);color:var(--err)}#autosRoot .tag.warn{background:var(--warn-bg);color:var(--warn)}\n#autosRoot .msg{padding:9px 12px;border-radius:7px;margin:8px 0;background:var(--base-soft);border:1px solid transparent}\n#autosRoot .msg.ok{background:var(--ok-bg);color:var(--ok)}#autosRoot .msg.err{background:var(--err-bg);color:var(--err)}#autosRoot .msg.warn{background:var(--warn-bg);color:var(--warn);border-color:#ffe69c}\n#autosRoot .row{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end}\n#autosRoot .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px}\n#autosRoot .obra{border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;background:var(--card);cursor:pointer;box-shadow:var(--shadow);transition:border-color .15s}\n#autosRoot .obra:hover{border-color:var(--base)}#autosRoot .obra b{display:block;font-size:15px;margin-bottom:4px}\n#autosRoot .obra small{color:var(--mut);line-height:1.6}\n#autosRoot .muted{color:var(--mut)}#autosRoot .right{text-align:right}\n#autosRoot .crumb{color:var(--mut);font-size:13px;margin-bottom:4px}\n#autosRoot .subt{color:var(--mut);margin:-6px 0 14px}\n#autosRoot .toolbar{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap}\n#autosRoot .toolbar .tabs{margin:0;border:0}\n#autosRoot .ocard{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);display:flex;flex-direction:column;overflow:hidden;cursor:pointer;transition:border-color .15s}\n#autosRoot .ocard:hover{border-color:var(--base)}\n#autosRoot .ocard .body{padding:14px 16px;flex:1}\n#autosRoot .ocard .foot{padding:9px 14px;border-top:1px solid var(--line);display:flex;gap:8px;align-items:center;background:color-mix(in srgb,var(--card) 92%,var(--bg))}\n#autosRoot .ocard .foot .sp{flex:1}\n#autosRoot .ocard .foot{flex-wrap:wrap}\n#autosRoot .ocard .foot button, #autosRoot .ocard .foot .selo{white-space:nowrap}\n#autosRoot .ocard .ttl{display:flex;align-items:center;gap:10px;margin-bottom:8px}\n#autosRoot .ocard .ttl .ico{width:36px;height:36px;border-radius:8px;background:var(--base-soft);color:var(--base-tx);display:grid;place-items:center;flex-shrink:0}\n#autosRoot .ocard .ttl b{font-size:15px;display:block}#autosRoot .ocard .ttl small{display:block;color:var(--mut)}\n#autosRoot .meta{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;font-size:13px;color:var(--mut)}\n#autosRoot .meta b{color:var(--tx);font-weight:600}\n#autosRoot .prog{height:6px;background:var(--line);border-radius:3px;overflow:hidden;margin:9px 0 4px}#autosRoot .prog i{display:block;height:100%;background:var(--base)}\n#autosRoot .ocard.add{border-style:dashed;box-shadow:none;display:grid;place-items:center;min-height:170px;color:var(--mut)}\n#autosRoot .tabs{display:flex;gap:2px;border-bottom:1px solid var(--line);margin-bottom:12px}\n#autosRoot .tabs a{padding:8px 14px;cursor:pointer;border-bottom:2px solid transparent;color:var(--mut);font-weight:600}\n#autosRoot .tabs a.on{border-bottom-color:var(--base);color:var(--base-tx)}\n#autosRoot .scroll{max-height:60vh;overflow:auto;border:1px solid var(--line);border-radius:8px}\n#autosRoot #toast{position:fixed;bottom:18px;right:18px;background:#111827;color:#fff;padding:10px 14px;border-radius:8px;opacity:0;transition:opacity .3s;pointer-events:none;max-width:420px;z-index:20}\n#autosRoot #toast.show{opacity:1}#autosRoot #toast.ok{background:var(--ok)}#autosRoot #toast.err{background:var(--err)}#autosRoot #toast.warn{background:#9a6700}\n#autosRoot dialog{border:1px solid var(--line);border-radius:12px;padding:18px 20px;max-width:760px;width:90vw;background:var(--card);color:var(--tx)}\n#autosRoot dialog::backdrop{background:rgba(0,0,0,.4)}\n#autosRoot .chk{display:inline-flex;align-items:center;gap:6px;margin:3px 12px 3px 0}\n#autosRoot .hint{font-size:12.5px;color:var(--mut)}\n#autosRoot .kv{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:13px}\n#autosRoot code{font-family:var(--mono);font-size:12.5px;background:var(--base-soft);color:var(--base-tx);padding:1px 5px;border-radius:4px}\n#autosRoot #printArea{display:none}\n#autosRoot{display:block;min-height:60vh;font:14px/1.45 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;color:var(--tx);background:var(--bg);border-radius:10px}\n#autosRoot .abar{display:flex;align-items:center;gap:12px;padding:8px 14px;border-bottom:1px solid var(--line);background:var(--card);border-radius:10px 10px 0 0}\n#autosRoot .wrap{display:flex;align-items:flex-start;min-height:0}\n#autosRoot nav{position:sticky;top:0;align-self:flex-start;max-height:calc(100vh - 80px);overflow:auto;border-radius:0 0 0 10px}\n#autosRoot .amain{overflow:visible}\n#autosRoot th{position:static}\n#autosRoot .scroll th{position:sticky}\n#autosRoot #toast{z-index:9999}\n#autosRoot dialog{z-index:9998}\n/* AU-5 · consola embutida no separador Autos da obra: chips em vez de menu lateral */\n#autosRoot.emb{min-height:0;border:1px solid var(--line)}\n#autosRoot.emb .abar{flex-wrap:wrap;gap:8px;padding:7px 10px;font-size:12px}\n#autosRoot.emb .abar .ctx{font-size:11.5px;color:var(--mut);white-space:normal}\n#autosRoot.emb .wrap{display:block}\n#autosRoot .anav.emb{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid var(--line);display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px;background:var(--card);border-radius:0}\n#autosRoot .anav.emb .sec{display:none}\n#autosRoot .anav.emb a{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--tx);font-size:12.5px;font-weight:600;margin:0;cursor:pointer}\n#autosRoot .anav.emb a.on{background:var(--base);border-color:var(--base);color:#fff}\n#autosRoot .anav.emb a .nb{margin-left:2px}\n#autosRoot.emb .amain{padding:12px 14px}\n#autosRoot.emb .amain h2{font-size:16px;margin:4px 0 8px}\n#autosRoot.emb .crumb{display:none}\n#autosRoot tr.tFora td{color:var(--mut);background:#fafbfc}\n#autosRoot #autoFull{position:fixed;inset:0;z-index:9990;background:var(--bg);display:flex;flex-direction:column;overflow:hidden}\n#autosRoot #autoFull .afTop{display:flex;align-items:center;gap:10px;padding:8px 14px;background:var(--card);border-bottom:1px solid var(--line);flex-wrap:wrap}\n#autosRoot #autoFull .afTop h2{margin:0;font-size:16px}\n#autosRoot #autoFull .afBody{flex:1;overflow:auto;padding:12px 16px}\n#autosRoot #autoFull .afCab{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:6px 18px;background:var(--card);border:1px solid var(--line);border-radius:9px;padding:10px 12px;margin-bottom:10px;font-size:12.5px}\n#autosRoot #autoFull .afCab span{color:var(--mut);display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px}\n#autosRoot #autoFull .afCab b{font-size:13.5px;user-select:all;overflow-wrap:anywhere;word-break:break-word}\n#autosRoot #autoFull .afCab>div{min-width:0}\n#autosRoot #autoFull table{font-size:12.5px}\n#autosRoot #autoFull tr.tot td{font-weight:700;background:var(--base-soft)}\n#autosRoot tr.tFora td input.tP{opacity:.55}\n#autosRoot .card{overflow-x:auto}\n#autosRoot button,#autosRoot .tag,#autosRoot small,#autosRoot .sec,#autosRoot h2,#autosRoot h3,#autosRoot .chip,#autosRoot label span,#autosRoot .hint{text-transform:none;letter-spacing:normal}\n#autosRoot .anav a{text-transform:none}\n#autosRoot table th{text-transform:uppercase}\n#autosRoot .nb{margin-left:auto;background:#ffc107;color:#000;font-size:11px;padding:1px 7px;border-radius:999px;font-weight:700}\n@media print{ @page{size:A4 landscape;margin:12mm} }\n";
const AUTOS_SKELETON="<svg style=\"display:none\"><defs>\n<symbol id=\"i-book\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm2 2h6v1H5zm0 3h6v1H5z\"/></symbol>\n<symbol id=\"i-tag\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0\"/><path fill=\"currentColor\" d=\"M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z\"/></symbol>\n<symbol id=\"i-people\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.2 2.2 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4\"/></symbol>\n<symbol id=\"i-clip\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0\"/><path fill=\"currentColor\" d=\"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z\"/><path fill=\"currentColor\" d=\"M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z\"/></symbol>\n<symbol id=\"i-send\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z\"/></symbol>\n<symbol id=\"i-gear\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0\"/><path fill=\"currentColor\" d=\"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52z\"/></symbol>\n<symbol id=\"i-chart\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z\"/></symbol>\n<symbol id=\"i-bell\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6\"/></symbol>\n<symbol id=\"i-inbox\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z\"/></symbol>\n<symbol id=\"i-moon\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278\"/></symbol>\n<symbol id=\"i-euro\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936q-.002-.165.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.6 6.6 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z\"/></symbol>\n</defs></svg><div class=\"abar\"><span class=\"chip\" id=\"papel\"></span><span class=\"ctx\" id=\"ctx\"></span><span class=\"sp\"></span><span class=\"chip\" id=\"descTg\" style=\"cursor:pointer;border-style:dashed\" title=\"Mostrar a descrição abreviada (1.ª linha, como no Excel) ou a completa\"></span><span class=\"hint\" id=\"ver\"></span><div class=\"avatar\" id=\"avatar\" style=\"display:none\"></div></div><div class=\"wrap\"><div class=\"anav\" id=\"nav\"></div><div class=\"amain\" id=\"main\"></div></div><div id=\"toast\"></div><dialog id=\"dlg\"></dialog><div id=\"printArea\"></div><input type=\"file\" id=\"fileOrc\" accept=\".xlsx,.xlsm\" style=\"display:none\"><input type=\"file\" id=\"fileEnt\" accept=\".xlsx,.xlsm,.csv,.txt,.json\" style=\"display:none\"><input type=\"file\" id=\"fileEnv\" accept=\".json\" style=\"display:none\">";
/* =========================================================
   Consola de Autos — v0.1 (Fase 1: obra, orçamento, subempreiteiros)
   ========================================================= */
const VERSAO='0.30';
const ESPECIALIDADES=['MONTAGEM','MASSAS','PAVIMENTOS'];
const CUSTO_COL={MONTAGEM:'PUCustoSubMont',MASSAS:'PUCustoSubEmass',PAVIMENTOS:'PUCustoSubPav'};

const S={ root:null, obraDir:null, obra:null, orc:null, view:'entrada', papel:'DO', obras:[] };

/* ---------- utilitários ---------- */
const $=s=>ROOT.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=(n,d=2)=>(n==null||isNaN(n))?'':Number(n).toLocaleString('pt-PT',{minimumFractionDigits:d,maximumFractionDigits:d});
const eur=n=>fmt(n)+' €';
const hoje=()=>new Date().toISOString();
const r2=x=>Math.round(x*100)/100;
function toast(m,cls){const t=$('#toast');t.textContent=m;t.className='show '+(cls||'');clearTimeout(t._h);t._h=setTimeout(()=>t.className='',3500);}
function slug(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase().replace(/[^A-Z0-9]+/g,'_').replace(/^_|_$/g,'');}
function tituloDesc(d){const l=String(d??'').split(/\r?\n/)[0].trim();return l.toUpperCase();}
const DESC_KEY='crmnt_descCompleta';
function descCompleta_(){try{return localStorage.getItem(DESC_KEY)==='1';}catch(e){return false;}}
function descToggle_(){try{localStorage.setItem(DESC_KEY,descCompleta_()?'0':'1');}catch(e){}S.descCompleta=descCompleta_();go(S.view);}
// descrição a mostrar: abreviada (1.ª linha, como no Excel) ou completa, conforme o comutador; o Excel dos autos usa sempre a abreviada
function descH(a){if(!a)return '';const c=a.descricao_completa;return (S.descCompleta&&c)?esc(c).replace(/\n/g,'<br>'):esc(a.descricao||'');}

/* ---------- IndexedDB (handle da pasta) ---------- */
const DB={open(){return new Promise((res,rej)=>{const r=indexedDB.open('consola_autos',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})},
  async set(k,v){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=res;t.onerror=()=>rej(t.error)})},
  async get(k){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction('kv','readonly');const q=t.objectStore('kv').get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}};

/* ---------- sistema de ficheiros ---------- */
const FS={
  async readJson(dir,name){try{const fh=await dir.getFileHandle(name);const f=await fh.getFile();return JSON.parse(await f.text());}catch(e){if(e.name==='NotFoundError')return null;throw e;}},
  async writeJson(dir,name,obj){const fh=await dir.getFileHandle(name,{create:true});const w=await fh.createWritable();await w.write(JSON.stringify(obj,null,2));await w.close();},
  async exists(dir,name){try{await dir.getFileHandle(name);return true;}catch(e){try{await dir.getDirectoryHandle(name);return true;}catch(e2){return false;}}},
  async listDirs(dir){const out=[];for await(const [n,h] of dir.entries())if(h.kind==='directory'&&!n.startsWith('_')&&!n.startsWith('.'))out.push([n,h]);return out.sort((a,b)=>a[0].localeCompare(b[0]));}
};

/* ---------- navegação ---------- */
const VIEWS=[
  {id:'entrada',t:'Obras',sec:null,ic:'book',semAdmin:true},
  {id:'fila',t:'Envios recebidos',sec:null,papel:'CONTROLLER',ic:'inbox',badge:true},
  {id:'fluxo',t:'Fluxo de autos — aprovar',sec:null,papel:'ADMIN',ic:'inbox',badge:true},
  {id:'cobras',t:'Autos por obra',sec:null,papel:'ADMIN',ic:'chart'},
  {id:'aconfig',t:'Configurações Autos',sec:null,papel:'ADMIN',ic:'gear'},
  {id:'orcamento',t:'Orçamento',sec:'Obra aberta',need:'obra',papel:'DO',ic:'clip'},
  {id:'tabela',t:'Tabela de preços',sec:null,need:'obra',papel:'DO',ic:'tag'},
  {id:'subs',t:'Subempreiteiros',sec:null,need:'obra',papel:'DO',ic:'people'},
  {id:'subempreitadas',t:'Subempreitadas',sec:null,need:'obra',papel:'DO',ic:'euro'},
  {id:'envios',t:'Envios',sec:null,need:'obra',papel:'DO',ic:'send'},
  {id:'cautos',t:'Autos recebidos',sec:'Obra aberta',need:'obra',papel:'CONTROLLER',ic:'inbox'},
  {id:'dr',t:'DR',sec:null,need:'obra',papel:'CONTROLLER',ic:'chart'},
  {id:'alertas',t:'Alertas',sec:null,need:'obra',papel:'CONTROLLER',ic:'bell'},
  {id:'obraautos',t:'Autos da obra (CRM)',sec:null,need:'obra',ic:'chart',semAdmin:true},
  {id:'config',t:'Configurações',sec:' ',ic:'gear',semAdmin:true},
];
function renderNav(){
  if(S.emb)return renderNavEmb_();
  let h='';let lastSec=null;
  for(const v of VIEWS){
    if(v.papel&&v.papel!==S.papel)continue;
    if(v.semAdmin&&S.papel==='ADMIN')continue;
    if(v.need==='obra'&&!S.obra)continue;
    if(v.sec&&v.sec!==lastSec){const t=v.sec.trim()?(v.sec==='Obra aberta'&&S.obra?`Obra aberta — ${esc(S.obra.obra.numero)} ${esc(S.obra.obra.nome)}`:esc(v.sec)):'&nbsp;';h+=`<div class="sec">${t}</div>`;lastSec=v.sec;}
    h+=`<a class="${S.view===v.id?'on':''}" data-v="${v.id}"><svg><use href="#i-${v.ic||'book'}"/></svg>${v.t}${v.badge&&S.badge?`<span class="nb">${S.badge}</span>`:''}</a>`;
  }
  $('#nav').innerHTML=h;
  $('#nav').querySelectorAll('a:not(.dis)').forEach(a=>a.onclick=()=>go(a.dataset.v));
  $('#ctx').textContent=S.root?(S.obra?`${S.root.name} › ${S.obra.obra.numero} – ${S.obra.obra.nome}`:S.root.name):'sem pasta';
  const tg=$('#descTg');if(tg){tg.textContent='Descrição: '+(S.descCompleta?'completa':'abreviada')+' ⇄';tg.onclick=descToggle_;}
  const pap=$('#papel');pap.className='chip '+(S.papel==='CONTROLLER'?'ctrl':'do');pap.textContent=S.papel==='CONTROLLER'?'Controller':S.papel==='ADMIN'?'Admin · sem pasta':'Diretor de Obra';pap.style.display='';
  const nm=S.cfg?.nome||'';$('#avatar').textContent=nm?nm.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase():'?';$('#avatar').title=nm;
}
function go(v){if(S.emb&&v==='entrada')v='embEntrada';if(S.soVista&&v==='entrada')v=S.soVista;S.view=v;renderNav();({embEntrada:viewEntradaEmb_,entrada:viewEntrada,orcamento:viewOrc,tabela:viewTabela,subs:viewSubs,subempreitadas:viewSubempreitadas,envios:viewEnvios,cautos:viewCtrlAutos,dr:viewDR,alertas:viewAlertas,config:viewConfig,fila:viewFila,fluxo:viewFluxo,cobras:viewObrasCRM,aconfig:viewAdminConfig,obraautos:viewObraAutos}[v])();}

/* ---------- pasta OBRAS ---------- */
async function escolherPasta(){
  try{const dir=await window.showDirectoryPicker({mode:'readwrite',id:'crmnt-'+CTX.papel.toLowerCase()});await DB.set(KEY_ROOT,dir);S.root=dir;S.obra=null;S.obraDir=null;await sincCfg_(dir);go('entrada');}
  catch(e){if(e.name!=='AbortError')toast('Erro: '+e.message,'err');}
}
async function reabrirPasta(){
  const dir=await DB.get(KEY_ROOT);if(!dir)return false;
  let p=await dir.queryPermission({mode:'readwrite'});
  if(p!=='granted')return {dir};        // precisa de gesto do utilizador
  S.root=dir;return true;
}

/* ---------- vista: entrada (CRM_NT: obras do CRM, pasta preparada ao primeiro clique) ---------- */
async function viewEntrada(){
  const m=$('#main');
  if(!S.root){
    const pend=await DB.get(KEY_ROOT);const ctrl=S.papel==='CONTROLLER';
    m.innerHTML=`<h2>Obras</h2><div class="card"><p>Escolhe a tua pasta pessoal <b>${ctrl?'CONTROLO_AUTOS':'OBRAS'}</b> neste computador ${ctrl?'(onde ficam as obras recebidas)':'(uma subpasta por obra)'}.</p>
      ${pend?`<button id="bRe">Reabrir "${esc(pend.name)}"</button>`:''}<button id="bPick" class="${pend?'sec':''}">Escolher pasta…</button>
      <p class="hint">Só funciona no Edge ou Chrome. A permissão fica memorizada neste computador para o teu utilizador do CRM_NT. Noutro PC, escolhe a pasta outra vez — nada se perde.</p></div>`;
    $('#bPick').onclick=escolherPasta;
    if(pend)$('#bRe').onclick=async()=>{const p=await pend.requestPermission({mode:'readwrite'});if(p==='granted'){S.root=pend;await sincCfg_(pend);go('entrada');}else toast('Permissão recusada','err');};
    return;
  }
  m.innerHTML=`<h2>Obras</h2><div class="muted">a carregar…</div>`;
  const dirs=await FS.listDirs(S.root);S.obras=[];
  for(const [n,h] of dirs){if(/^(recebidos|envios|exportacoes)$/i.test(n))continue;const o=await FS.readJson(h,'obra.json');S.obras.push({nome:n,h,o});}
  S.cfg=(await FS.readJson(S.root,'consola.json'))||{};S.papel=papelAtual();if(!S.ent)S.ent=await FS.readJson(S.root,'entidades.json');
  const rc=await CRM.obras();const crmObras=(rc&&rc.obras)||[];S.crmObras=crmObras;
  const porCod={};for(const o of crmObras)porCod[String(o.codigo)]=o;
  const pastaDe=pastaDe_;
  const mesAtual=(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');})();
  const ctrl=S.papel==='CONTROLLER';
  let h=`<div class="crumb">CRM_NT › Autos › Obras</div><h2>Obras <span class="tag">${ctrl?S.obras.length:crmObras.length}</span></h2>
  <p class="subt">${ctrl?'Obras recebidas dos diretores de obra (pasta <code>'+esc(S.cfg.caminho||S.root.name)+'</code>). Os envios feitos pelo CRM_NT entram por <b>Envios recebidos</b>.':`<b>As obras são as do CRM_NT</b> (as tuas). A pasta local em <code>${esc(S.cfg.caminho||S.root.name)}</code> prepara-se ao primeiro clique; dentro da obra: importar orçamento → tabela de preços → adjudicar.`}</p>
  <div class="toolbar"><div class="tabs"><a class="on">Todas</a></div><span style="flex:1"></span><span class="hint">Dia de fecho <b>${CFG.dia_fecho}</b> — regra global do CRM_NT</span>${ctrl?`<button class="sm" id="tImp">Importar envio de um DO… (ficheiro)</button>`:''}</div>`;
  h+=`<div class="grid">`;
  const cartao=async(ob,oc)=>{ // ob: pasta local (ou null) · oc: obra do CRM (ou null)
    const o=ob?ob.o:null;
    if(!ob){ // obra do CRM sem pasta neste PC
      return `<div class="ocard" style="border-style:dashed"><div class="body"><div class="ttl"><div class="ico"><svg width="18" height="18"><use href="#i-book"/></svg></div><div><b>${esc(oc.codigo+' · '+oc.nome)}</b><small>obra do CRM · <span class="tag warn">sem pasta neste PC</span></small></div></div>
        <div class="meta"><span>Autos no CRM</span><b>${oc.n_autos?`${oc.n_autos} · ${eur(oc.total)}${oc.a_aprovar?` · <span class="tag warn">${oc.a_aprovar} a aprovar</span>`:''}`:'—'}</b></div>
        <p class="hint">Cria <code>${esc(oc.codigo+'_'+slug(oc.nome))}\\</code> com <code>obra.json</code> (número, nome e dia de fecho do CRM), <code>autos\\</code>, <code>exportacoes\\</code>.</p></div>
        <div class="foot"><span class="sp"></span>${oc.n_autos?`<button class="sec sm" data-repor="${esc(oc.codigo)}">Repor do CRM_NT</button>`:''}<button class="sm" data-prep="${esc(oc.codigo)}">Preparar pasta desta obra</button></div></div>`;
    }
    const nsubs=o?o.subempreiteiros.length:0;const rec=o?.recebido;const orc=await FS.readJson(ob.h,'orcamento.json');ob.orc=orc;const rs=await resumoObra(ob.h,o);
    const nTab=o?Object.values(o.tabela_precos||{}).reduce((t,v)=>t+Object.keys(v).length,0):0;
    const pct=rs.adj>0?Math.min(100,Math.round(100*rs.exec/rs.adj)):0;
    let selo='';
    if(ctrl)selo=rec?`<span class="tag ${rec.conflitos?.length?'err':'ok'}">último envio ${new Date(rec.gerado_em).toLocaleDateString('pt-PT')} · ${esc(rec.enviado_por||'?')}${rec.conflitos?.length?' · conflitos':''}</span>`:'<span class="tag warn">sem envios</span>';
    else{const ue=o?.ultimo_envio;const enviadoMes=ue&&ue.gerado_em.slice(0,7)===mesAtual;selo=ue?`<span class="tag ${enviadoMes?'ok':'err'}">${enviadoMes?'último envio':'sem envio este mês · último'} ${new Date(ue.gerado_em).toLocaleDateString('pt-PT')}${ue.enviado_por?' · '+esc(ue.enviado_por.split(' ')[0]):''}</span>`:(rs.emitidos?'<span class="tag err">sem envio</span>':'');}
    if(oc&&oc.a_aprovar)selo+=`<span class="tag warn">${oc.a_aprovar} a aprovar</span>`;
    return `<div class="ocard" data-n="${esc(ob.nome)}"><div class="body">
      <div class="ttl"><div class="ico"><svg width="18" height="18"><use href="#i-book"/></svg></div><div><b>${esc(o?o.obra.numero+' · '+o.obra.nome:ob.nome)}</b><small>${oc?'obra do CRM · ':'<span class="tag warn">sem obra no CRM</span> · '}${o?`fecho dia ${o.obra.dia_fecho}${o.criado_em?' · pasta de '+new Date(o.criado_em).toLocaleDateString('pt-PT'):''}`:'sem obra.json — abrir para criar'}</small></div></div>
      ${o?`<div class="meta"><span>Orçamento</span><b>${orc?`${orc.artigos.filter(a=>a.estado==='ATIVO').length} artigos <span class="tag ok">em vigor ${new Date(orc.importado_em).toLocaleDateString('pt-PT')}</span>`:'<span class="tag warn">sem orçamento</span>'}</b>
        <span>Tabela de preços</span><b>${nTab?nTab+' preços':'<span class="tag warn">vazia</span>'}</b>
        <span>Subempreiteiros</span><b>${nsubs?nsubs+(nsubs===1&&o.subempreiteiros[0].nome?' · '+esc(o.subempreiteiros[0].nome):''):'<span class="tag">nenhum</span>'}</b>
        <span>Autos</span><b>${rs.emitidos} emitido(s)${rs.rascunhos?` · <span class="tag warn">${rs.rascunhos} rascunho${rs.rascunhos>1?'s':''}</span>`:''}${rs.ultimoPer?` · ${rs.ultimoPer}`:''}${oc&&oc.n_autos?` · <span class="tag">Σ CRM ${eur(oc.total)}</span>`:''}</b></div>
      <div class="prog"><i style="width:${pct}%"></i></div><small class="muted">${rs.adj>0?`Executado ${pct} % do adjudicado · ${eur(rs.exec)}`:'sem adjudicação'}</small>`:''}
      </div>
      <div class="foot">${selo}<span class="sp"></span><button class="sm" data-open="${esc(ob.nome)}">abrir</button></div></div>`;
  };
  if(ctrl){for(const ob of S.obras)h+=await cartao(ob,porCod[(ob.o?String(ob.o.obra.numero):ob.nome.split(/[_ ]/)[0])]||null);}
  else{
    const vistas=new Set();
    for(const oc of crmObras){const ob=pastaDe(oc.codigo);if(ob)vistas.add(ob.nome);h+=await cartao(ob,oc);}
    for(const ob of S.obras)if(!vistas.has(ob.nome))h+=await cartao(ob,null);
  }
  h+='</div>';
  m.innerHTML=h;
  if($('#tImp'))$('#tImp').onclick=()=>{$('#fileEnv').value='';$('#fileEnv').click();};
  $('#fileEnv').onchange=e=>{const f=e.target.files[0];if(f)importarEnvioUI(f);};
  m.querySelectorAll('.ocard[data-n]').forEach(d=>d.onclick=()=>abrirObra(d.dataset.n));
  m.querySelectorAll('[data-open]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();abrirObra(b.dataset.open);});
  m.querySelectorAll('[data-prep]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();prepararPasta_(porCod[b.dataset.prep]);});
  m.querySelectorAll('[data-repor]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();reporPastaUI_(porCod[b.dataset.repor]);});
}
// cria NNN_NOME\obra.json a partir da obra do CRM (número, nome, dia de fecho global)
function pastaDe_(cod){return S.obras.find(ob=>ob.nome===String(cod)||ob.nome.startsWith(String(cod)+'_')||ob.nome.startsWith(String(cod)+' '));}
async function prepararPasta_(oc){
  const pasta=`${oc.codigo}_${slug(oc.nome)}`;
  if(await FS.exists(S.root,pasta))return toast('Já existe a pasta '+pasta,'err');
  const h=await S.root.getDirectoryHandle(pasta,{create:true});
  const o=novaObra(String(oc.codigo),oc.nome,CFG.dia_fecho);o.crm={codigo:oc.codigo,preparada_por:CTX.nome,preparada_em:hoje()};await FS.writeJson(h,'obra.json',o);
  await h.getDirectoryHandle('autos',{create:true});await h.getDirectoryHandle('exportacoes',{create:true});
  toast('Pasta preparada: '+pasta,'ok');await abrirObra(pasta);
}

function editarObraDlg(ob){
  const o=ob.o;const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Editar obra</h3><div class="row"><label><span>Número</span><input id="eNum" class="short" value="${esc(o.obra.numero)}"></label><label><span>Nome</span><input id="eNomeO" style="width:320px" value="${esc(o.obra.nome)}"></label><label><span>Dia de fecho</span><input id="eDia" type="number" min="1" max="31" value="${o.obra.dia_fecho}"></label></div>
    <p class="hint">O nome da pasta não é alterado. O dia de fecho aplica‑se aos Autos criados a partir de agora.</p><div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Guardar</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{o.obra.numero=$('#eNum').value.trim();o.obra.nome=$('#eNomeO').value.trim();o.obra.dia_fecho=+$('#eDia').value||25;o.atualizado_em=hoje();await FS.writeJson(ob.h,'obra.json',o);if(S.obra&&S.obraDir?.name===ob.nome)S.obra=o;dlg.close();toast('Obra guardada','ok');viewEntrada();};
}
async function viewConfig(){
  const m=$('#main');S.cfg=S.root?((await FS.readJson(S.root,'consola.json'))||{}):{};const pend=await DB.get(KEY_ROOT);
  m.innerHTML=`<h2>Configurações</h2>
  <div class="card"><h3 style="margin-top:0">Pasta pessoal ${S.papel==='CONTROLLER'?'CONTROLO_AUTOS':'OBRAS'}</h3><div class="row"><span>${S.root?`<b>${esc(S.root.name)}</b> (ligada)`:(pend?`"${esc(pend.name)}" memorizada — <button id="bRe">reabrir</button>`:'nenhuma')}</span><button class="sec" id="bPick">Escolher outra pasta…</button></div>
    <p class="hint">A pasta onde ficam as obras (uma subpasta por obra). Só funciona no Edge ou Chrome; a permissão fica memorizada neste computador para o teu utilizador do CRM_NT. Noutro PC, escolhe a pasta outra vez — nada se perde.</p>
    <div class="row" style="margin-top:8px"><label style="flex:1"><span>Caminho completo desta pasta no Windows (para «Abrir no Excel» — abre diretamente no Excel instalado, sem instalador)</span><input id="cfgPath" style="width:100%" placeholder="C:\\Users\\...\\OBRAS" value="${esc(S.cfg.caminho||'')}"></label></div></div>
  <div class="card"><h3 style="margin-top:0">Utilizador</h3><div class="kv"><span>Nome</span><span><b>${esc(CTX.nome)}</b> <span class="tag ok">do login do CRM_NT</span> — fica nos Autos emitidos e nos envios</span><span>Papel</span><span><span class="chip ${S.papel==='CONTROLLER'?'ctrl':'do'}">${S.papel==='CONTROLLER'?'Controller':'Diretor de Obra'}</span> <span class="hint">definido pelo CRM_NT</span></span><span>Dia de fecho</span><span><b>${CFG.dia_fecho}</b> · regra global do CRM_NT (Admin)</span></div>
    <p class="hint">O <code>consola.json</code> da pasta é escrito com estes valores — a consola autónoma abre a mesma pasta sem notar diferença.</p></div>
  <button id="bCfg" ${S.root?'':'disabled'}>Guardar</button>
  <div class="card" style="margin-top:18px"><h3 style="margin-top:0">Tabela de subempreiteiros</h3>
    <div class="row"><span><b>${(S.ent?.entidades||[]).length} subempreiteiros</b> · tabela do CRM_NT (ERP + provisórios) <span class="tag ok">fonte única</span></span><button class="sec sm" id="bSincEnt">Atualizar da tabela</button></div>
    <p class="hint">Gerida pelo Admin no CRM_NT. É escrita automaticamente em <code>entidades.json</code> na pasta, para a consola autónoma continuar a abrir a mesma pasta.</p></div>
  ${S.obra&&S.papel==='DO'?`<div class="card" style="margin-top:18px;border-color:#f5c2c7"><h3 style="margin-top:0;color:var(--err)">Zona de perigo — obra aberta: ${esc(S.obra.obra.numero)} ${esc(S.obra.obra.nome)}</h3>
    <p class="hint">Apaga todos os Autos (rascunhos e emitidos), os envios preparados e repõe a numeração a 1. Mantém orçamento, tabela de preços e subempreitadas. Não pode ser anulado.</p>
    <button class="danger" id="bReset">Reiniciar Autos desta obra…</button></div>`:''}
  ${S.obra&&S.papel==='CONTROLLER'?`<div class="card" style="margin-top:18px;border-color:#f5c2c7"><h3 style="margin-top:0;color:var(--err)">Zona de perigo — obra aberta: ${esc(S.obra.obra.numero)} ${esc(S.obra.obra.nome)}</h3>
    <p class="hint">Remove esta obra da consola do Controller: apaga a pasta da obra (Autos recebidos, orçamento, subempreitadas, conflitos) e os envios dela guardados em <code>recebidos\\</code>. O DO mantém tudo na consola dele e pode voltar a enviar. Não pode ser anulado.</p>
    <button class="danger" id="bRemObra">Remover esta obra da consola…</button></div>`:''}`;
  $('#bPick').onclick=escolherPasta;
  if($('#bSincEnt'))$('#bSincEnt').onclick=async()=>{await sincEnt_(true);toast('Tabela atualizada','ok');viewConfig();};
  if($('#bRe'))$('#bRe').onclick=async()=>{const p=await pend.requestPermission({mode:'readwrite'});if(p==='granted'){S.root=pend;go('config');}else toast('Permissão recusada','err');};
  $('#bCfg').onclick=async()=>{S.cfg.caminho=$('#cfgPath').value.trim().replace(/[\\/]+$/,'');S.cfg.papel=papelPasta_();S.cfg.nome=CTX.nome;await FS.writeJson(S.root,'consola.json',S.cfg);toast('Configurações guardadas','ok');go('entrada');};
  if($('#bRemObra'))$('#bRemObra').onclick=async()=>{
    const o=S.obra;const dlg=$('#dlg');const pasta=S.obraDir.name;
    dlg.innerHTML=`<h3 style="margin-top:0;color:var(--err)">Remover ${esc(o.obra.numero)} – ${esc(o.obra.nome)}</h3>
      <p>Vai apagar a pasta <code>${esc(pasta)}</code> e os ficheiros <code>recebidos\\ENVIO_${esc(o.obra.numero)}_*.json</code>.</p>
      <p>Para confirmar escreve o número da obra: <b>${esc(o.obra.numero)}</b></p><input id="rConf" class="short">
      <div class="right" style="margin-top:10px"><button class="sec" id="dCancel">Cancelar</button><button class="danger" id="dOk">Remover</button></div>`;
    dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
    $('#dOk').onclick=async()=>{if($('#rConf').value.trim()!==String(o.obra.numero))return toast('Número da obra não confere','err');
      try{await S.root.removeEntry(pasta,{recursive:true});let n=0;
        try{const rd=await S.root.getDirectoryHandle('recebidos');const pref=`ENVIO_${o.obra.numero}_`;const del=[];for await(const [k,h] of rd.entries())if(h.kind==='file'&&k.startsWith(pref))del.push(k);for(const k of del){await rd.removeEntry(k);n++;}}catch(e){}
        S.obra=null;S.obraDir=null;S.orc=null;S.autos=[];dlg.close();toast(`Obra removida${n?` · ${n} envio(s) apagado(s) de recebidos`:''}`,'ok');go('entrada');}
      catch(e){toast('Erro: '+e.message,'err');}};
  };
  if($('#bReset'))$('#bReset').onclick=async()=>{
    const o=S.obra;const dlg=$('#dlg');
    dlg.innerHTML=`<h3 style="margin-top:0;color:var(--err)">Reiniciar Autos de ${esc(o.obra.numero)} – ${esc(o.obra.nome)}</h3>
      <p>Vai apagar: a pasta <code>autos\\</code> (todos os xlsx e json), a pasta <code>envios\\</code>, o histórico de envios e repor o n.º do próximo Auto a 1 em todas as séries.</p>
      <p>Para confirmar escreve o número da obra: <b>${esc(o.obra.numero)}</b></p><input id="rConf" class="short">
      <div class="right" style="margin-top:10px"><button class="sec" id="dCancel">Cancelar</button><button class="danger" id="dOk">Apagar e reiniciar</button></div>`;
    dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
    $('#dOk').onclick=async()=>{if($('#rConf').value.trim()!==String(o.obra.numero))return toast('Número da obra não confere','err');
      try{for(const n of ['autos','envios']){try{await S.obraDir.removeEntry(n,{recursive:true});}catch(e){if(e.name!=='NotFoundError')throw e;}}
        await S.obraDir.getDirectoryHandle('autos',{create:true});
        for(const sub of o.subempreiteiros){sub.proximo_auto={};for(const e of sub.especialidades)sub.proximo_auto[e]=sub.primeiro_auto?.[e]||1;}
        delete o.ultimo_envio;delete o.envios;o.autos_reiniciados_em=hoje();await guardarObra();S.autos=[];
        dlg.close();toast('Autos reiniciados','ok');go('subs');}
      catch(e){toast('Erro: '+e.message,'err');}};
  };
}
/* ---------- entidades do ERP ---------- */
async function lerTabelaGenerica(file){
  const nome=file.name.toLowerCase();
  if(nome.endsWith('.json')){const j=JSON.parse(await file.text());const arr=Array.isArray(j)?j:(j.entidades||j.data||j.rows||j.items||Object.values(j).find(Array.isArray)||[]);
    if(!arr.length||typeof arr[0]!=='object')throw new Error('JSON sem lista de entidades');const cols=[...new Set(arr.flatMap(o=>Object.keys(o)))];return {cols,rows:arr.map(o=>cols.map(c=>o[c]??''))};}
  if(nome.endsWith('.csv')||nome.endsWith('.txt')){let t=await file.text();if(t.charCodeAt(0)===0xFEFF)t=t.slice(1);const lines=t.split(/\r?\n/).filter(l=>l.trim());const sep=(lines[0].match(/;/g)||[]).length>=(lines[0].match(/,/g)||[]).length?';':',';
    const parse=l=>{const out=[];let cur='',q=false;for(let i=0;i<l.length;i++){const ch=l[i];if(ch==='"'){if(q&&l[i+1]==='"'){cur+='"';i++;}else q=!q;}else if(ch===sep&&!q){out.push(cur);cur='';}else cur+=ch;}out.push(cur);return out.map(x=>x.trim());};
    const cols=parse(lines[0]);return {cols,rows:lines.slice(1).map(parse)};}
  const wb=new ExcelJS.Workbook();await wb.xlsx.load(await file.arrayBuffer());const ws=wb.worksheets[0];if(!ws)throw new Error('Excel sem folhas');
  let hdr=0;for(let r=1;r<=Math.min(ws.rowCount,30);r++){let n=0;ws.getRow(r).eachCell(c=>{if(String(c.text??'').trim())n++;});if(n>=2){hdr=r;break;}}
  if(!hdr)throw new Error('Não encontrei a linha de cabeçalho');
  const cols=[];ws.getRow(hdr).eachCell({includeEmpty:true},(c,n)=>{cols[n-1]=String(c.text??'').trim()||('Col'+n);});
  const rows=[];for(let r=hdr+1;r<=ws.rowCount;r++){const row=cols.map((_,i)=>{const c=ws.getCell(r,i+1);const v=c.value;return v==null?'':(typeof v==='object'&&'result' in v?v.result:(v.text??c.text??v));});if(row.some(x=>String(x).trim()))rows.push(row.map(x=>String(x??'').trim()));}
  return {cols,rows};
}
function adivinharCol(cols,cands){const low=cols.map(c=>c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''));for(const k of cands){const i=low.findIndex(c=>c===k);if(i>=0)return i;}for(const k of cands){const i=low.findIndex(c=>c.startsWith(k));if(i>=0)return i;}for(const k of cands){const i=low.findIndex(c=>new RegExp('(^|[^a-z])'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z]|$)').test(c));if(i>=0)return i;}return -1;}
async function importarEntidadesUI(file){
  let t;try{t=await lerTabelaGenerica(file);}catch(e){return toast('Erro a ler: '+e.message,'err');}
  const campos=[['codigo','N.º entidade (ERP)',['cod.fornecedor','codigo','cod','n.º','nº','numero','id','entidade']],['nome','Nome',['nome','entidade','designacao','razao social','fornecedor','subempreiteiro']],['nif','NIF',['nif','contribuinte','nipc','vat']],['email','E‑mail',['email','e-mail','mail','correio']],['telefone','Telefone (opcional)',['telefone','telemovel','tel','contacto']],['tipo','Tipo de entidade (opcional — filtra "Subempreiteiro")',['tipo ent','tipo','descricao tipo']]];
  const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Importar entidades — ${esc(file.name)}</h3><p class="hint">${t.rows.length} linhas, ${t.cols.length} colunas. Confirma que coluna corresponde a cada campo.</p>
    <div class="kv">${campos.map(([k,lab,c])=>`<span>${lab}</span><span><select class="mapC" data-k="${k}"><option value="-1">— (nenhuma)</option>${t.cols.map((c2,i)=>`<option value="${i}" ${adivinharCol(t.cols,c)===i?'selected':''}>${esc(c2)}</option>`).join('')}</select></span>`).join('')}</div>
    <div class="scroll" style="max-height:30vh;margin-top:8px"><table><thead><tr>${t.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.slice(0,6).map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div id="entMsg"></div><div class="right" style="margin-top:8px"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Importar</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{const map={};dlg.querySelectorAll('.mapC').forEach(sl=>map[sl.dataset.k]=+sl.value);
    if(map.codigo<0||map.nome<0)return toast('N.º e Nome são obrigatórios','warn');
    const ents=[],vistos=new Set();let semNif=0,nifInv=0,filtrados=0;
    for(const r of t.rows){if(map.tipo>=0){const tp=String(r[map.tipo]??'').toLowerCase();if(tp&&!tp.includes('subempreit')){filtrados++;continue;}}const codigo=String(r[map.codigo]??'').trim();const nome=String(r[map.nome]??'').trim().toUpperCase();if(!codigo||!nome)continue;if(vistos.has(codigo))continue;vistos.add(codigo);
      const nif=map.nif>=0?String(r[map.nif]??'').replace(/\D/g,''):'';const email=map.email>=0?String(r[map.email]??'').trim().toLowerCase():'';const tel=map.telefone>=0?String(r[map.telefone]??'').trim():'';
      if(!nif)semNif++;else if(!nifValido(nif))nifInv++;ents.push({codigo,nome,nif,email,telefone:tel});}
    if(!ents.length)return toast('Nenhuma entidade válida','err');
    // preserva NIF/e‑mail já completados na consola para entidades que o ERP não traz
    if(S.ent)for(const e of ents){const old=S.ent.entidades.find(x=>x.codigo===e.codigo);if(old){if(!e.nif&&old.nif)e.nif=old.nif;if(!e.email&&old.email)e.email=old.email;}}
    S.ent={importado_em:hoje(),ficheiro:file.name,entidades:ents};await FS.writeJson(S.root,'entidades.json',S.ent);
    let lig=0;if(S.obra){lig=await ligarEntidades(S.obra);if(lig)await guardarObra();}
    dlg.close();toast(`${ents.length} entidades importadas${filtrados?` · ${filtrados} de outro tipo ignoradas`:''}${semNif?` · ${semNif} sem NIF`:''}${nifInv?` · ${nifInv} com NIF inválido`:''}${lig?` · ${lig} subempreiteiro(s) desta obra ligados pelo NIF`:''}`,'ok');go('config');};
}
function entidadePorCodigo(c){return (S.ent?.entidades||[]).find(e=>e.codigo===String(c))||null;}
// liga subempreiteiros já existentes (sem n.º ERP) às entidades pelo NIF
async function ligarEntidades(o){let n=0;for(const s of (o.subempreiteiros||[])){if(s.codigo_erp||!s.nif)continue;const e=(S.ent?.entidades||[]).find(x=>x.nif===s.nif);if(e){s.codigo_erp=e.codigo;if(!s.email&&e.email)s.email=e.email;n++;}}return n;}
async function resumoObra(h,o){
  const r={emitidos:0,rascunhos:0,exec:0,adj:0,ultimoPer:null};if(!o)return r;
  try{const ad=await h.getDirectoryHandle('autos');const xl=new Set(),js={};for await(const [n,fh] of ad.entries()){const m=n.match(RE_AUTO);if(!m||fh.kind!=='file')continue;const id=n.replace(/\.(xlsx|json)$/,'');if(m[5]==='xlsx')xl.add(id);else js[id]=fh;}
    const porSerie={};for(const id of Object.keys(js)){const d=JSON.parse(await (await js[id].getFile()).text());r.emitidos++;const k=d.sub+'|'+d.especialidade;const S_=d.substitutivo_de?1:0;
      const cur=porSerie[k];if(!cur||d.numero>cur.numero||(d.numero===cur.numero&&S_>cur.S_))porSerie[k]={numero:d.numero,S_,v:d.totais?.valor_acumulado||0};if(!r.ultimoPer||d.periodo>r.ultimoPer)r.ultimoPer=d.periodo;}
    for(const id of xl)if(!js[id])r.rascunhos++;
    r.exec=Object.values(porSerie).reduce((t,x)=>t+x.v,0);}catch(e){}
  for(const sb of (o.subempreiteiros||[]))for(const e of (sb.especialidades||[]))for(const it of (sb.artigos?.[e]||[])){const q=sb.qtds?.[it]?.[e];const p=sb.precos?.[it]?.[e];if(q!=null&&p!=null)r.adj+=q*p;}
  return r;
}
function novaObra(num,nome,dia){return {versao:1,criado_em:hoje(),obra:{numero:num,nome,dia_fecho:dia},subempreiteiros:[]};}
async function abrirObra(nomePasta){
  const h=await S.root.getDirectoryHandle(nomePasta);
  let o=await FS.readJson(h,'obra.json');
  if(!o){const m=nomePasta.match(/^(\d+)[_ -]+(.*)$/);o=novaObra(m?m[1]:'',m?m[2].replace(/_/g,' '):nomePasta,25);await FS.writeJson(h,'obra.json',o);toast('obra.json criado a partir do nome da pasta','warn');}
  S.obraDir=h;S.obra=o;S.orc=await FS.readJson(h,'orcamento.json');herdarOrcCRM_();
  S.papel=papelAtual();if(!S.ent)S.ent=await FS.readJson(S.root,'entidades.json');
  if(S.ent&&await ligarEntidades(o))await guardarObra();
  go(S.emb?(S.papel==='CONTROLLER'?'cautos':'obraautos'):(S.papel==='CONTROLLER'?'cautos':'orcamento'));
}
async function guardarObra(){S.obra.atualizado_em=hoje();await FS.writeJson(S.obraDir,'obra.json',S.obra);}

/* ---------- orçamento: leitura do ficheiro ERP ---------- */
const COLS_ERP=['Item','Descricao','Artigo','QtdContratada','UnMedida','PUVenda','PUCustoSubMont','PUCustoSubEmass','PUCustoSubPav','PUCustoSubOut'];
async function lerOrcamentoERP(file){
  const wb=new ExcelJS.Workbook();await wb.xlsx.load(await file.arrayBuffer());
  let ws=null,hdrRow=0,idx={};
  for(const sh of wb.worksheets){
    for(let r=1;r<=Math.min(sh.rowCount,30);r++){
      const vals={};sh.getRow(r).eachCell((c,n)=>{const v=String(c.text??c.value??'').trim();if(v)vals[v]=n;});
      if(COLS_ERP.every(k=>vals[k])){ws=sh;hdrRow=r;idx=vals;break;}
    }
    if(ws)break;
  }
  if(!ws)throw new Error('Não encontrei a folha com as colunas '+COLS_ERP.join(', '));
  const cellv=(row,k)=>{const c=row.getCell(idx[k]);const v=c.value;if(v&&typeof v==='object'){if('result' in v)return v.result;if('richText' in v)return v.richText.map(t=>t.text).join('');}return v;};
  const num=v=>{const n=parseFloat(String(v??'').replace(',','.'));return isNaN(n)?0:n;};
  const artigos=[],capitulos=[];let tm=null,cap=null;
  for(let r=hdrRow+1;r<=ws.rowCount;r++){
    const row=ws.getRow(r);const item=String(cellv(row,'Item')??'').trim();if(!item)continue;
    const un=String(cellv(row,'UnMedida')??'').trim();const desc=String(cellv(row,'Descricao')??'');
    if(!un){
      if(!item.includes('.')){const p=desc.toUpperCase().indexOf('TM-');tm=p>=0?desc.substr(p,5).trim():null;}
      cap=item;capitulos.push({item,descricao:tituloDesc(desc),tm});continue;
    }
    const ref=String(cellv(row,'Artigo')??'').trim();
    artigos.push({item,ref_cliente:ref==='0'?'':ref,capitulo:cap,descricao:tituloDesc(desc),descricao_completa:desc.trim(),uni:un.toUpperCase(),
      qtd:num(cellv(row,'QtdContratada')),pu_venda:num(cellv(row,'PUVenda')),
      custo_sub:{MONTAGEM:num(cellv(row,'PUCustoSubMont')),MASSAS:num(cellv(row,'PUCustoSubEmass')),PAVIMENTOS:num(cellv(row,'PUCustoSubPav')),OUTROS:num(cellv(row,'PUCustoSubOut'))},
      tm,estado:'ATIVO'});
  }
  return {artigos,capitulos,folha:ws.name};
}
function diffOrcamento(novo){
  const old=S.orc?Object.fromEntries(S.orc.artigos.map(a=>[a.item,a])):{};
  const vistos=new Set();const res={novos:[],alterados:[],iguais:[],removidos:[],reativados:[]};
  for(const a of novo.artigos){vistos.add(a.item);const o=old[a.item];
    if(!o)res.novos.push(a);
    else{const ch=[];for(const k of ['descricao','uni','qtd','pu_venda','tm','ref_cliente'])if(JSON.stringify(o[k]??null)!==JSON.stringify(a[k]??null))ch.push(k);
      for(const e of ['MONTAGEM','MASSAS','PAVIMENTOS','OUTROS'])if((o.custo_sub?.[e]??0)!==a.custo_sub[e])ch.push('custo '+e);
      if(o.estado==='REMOVIDO')res.reativados.push(a);else if(ch.length)res.alterados.push({a,o,ch});else res.iguais.push(a);}}
  for(const o of Object.values(old))if(!vistos.has(o.item)&&o.estado==='ATIVO')res.removidos.push(o);
  return res;
}
async function aplicarImportacao(novo,file,d){
  const antigo=S.orc;
  const artigos=[...novo.artigos];
  for(const r of d.removidos)artigos.push({...r,estado:'REMOVIDO'});
  if(antigo)for(const a of antigo.artigos)if(a.estado==='REMOVIDO'&&!novo.artigos.find(x=>x.item===a.item)&&!d.removidos.find(x=>x.item===a.item))artigos.push(a);
  // artigos criados pelo DO fora do orçamento (origem AUTO) que agora existem → tornam-se contratuais; os que continuam fora mantêm-se nos subs
  const quando=hoje();
  if(antigo){for(const a of artigos){const old=antigo.artigos.find(x=>x.item===a.item);if(old?.novo_em&&!precoTabelaQualquer(a.item))a.novo_em=old.novo_em;}
    for(const a of d.novos){const x=artigos.find(y=>y.item===a.item);if(x)x.novo_em=quando;}}
  const snap=quando.replace(/[:.]/g,'-').slice(0,19);
  const orc={versao:1,importado_em:quando,ficheiro:file.name,folha:novo.folha,artigos,capitulos:novo.capitulos,
    historico:[...(antigo?.historico||[]),{importado_em:quando,ficheiro:file.name,novos:d.novos.length,alterados:d.alterados.length,removidos:d.removidos.length,reativados:d.reativados.length,snapshot:`${snap}.json`}]};
  if(antigo&&Object.keys(S.obra.tabela_precos||{}).length){S.obra.tabela_versoes=S.obra.tabela_versoes||[];
    S.obra.tabela_versoes.push({orc_importado_em:antigo.importado_em,orc_ficheiro:antigo.ficheiro,orc_snapshot:antigo.historico?.[antigo.historico.length-1]?.snapshot||null,publicada_em:S.obra.tabela_publicada_em||null,precos:JSON.parse(JSON.stringify(S.obra.tabela_precos))});await guardarObra();}
  await FS.writeJson(S.obraDir,'orcamento.json',orc);S.orc=orc;
  try{const vd=await S.obraDir.getDirectoryHandle('orcamentos',{create:true});await FS.writeJson(vd,`${snap}.json`,{importado_em:quando,ficheiro:file.name,folha:novo.folha,artigos:novo.artigos,capitulos:novo.capitulos});}catch(e){console.warn(e);}
  // preços dos subs: artigos novos não entram automaticamente; artigos removidos ficam assinalados no ecrã de subs
  let conv=0;for(const s of S.obra.subempreiteiros)for(const f of (s.fora_orcamento||[]))if(novo.artigos.find(a=>a.item===f.item)){f.contratual_desde=hoje();conv++;}
  if(conv)await guardarObra();
  return conv;
}
function precoTabelaQualquer(item){const t=S.obra?.tabela_precos?.[item];return !!(t&&Object.keys(t).length);}
async function verVersaoOrc(hist){
  const dlg=$('#dlg');let v=null;try{const vd=await S.obraDir.getDirectoryHandle('orcamentos');v=await FS.readJson(vd,hist.snapshot);}catch(e){}
  if(!v)return toast('Esta versão não tem cópia guardada (importada antes da v0.15)','warn');
  const atual=Object.fromEntries((S.orc?.artigos||[]).map(a=>[a.item,a]));
  dlg.innerHTML=`<h3 style="margin-top:0">Orçamento importado em ${new Date(v.importado_em).toLocaleString('pt-PT')} — ${esc(v.ficheiro)}</h3>
    <p class="hint">${v.artigos.length} artigos. Coluna "vs em vigor": igual, alterado, ou já não existe no orçamento em vigor.</p>
    <div class="scroll" style="max-height:60vh"><table><thead><tr><th>Item</th><th>Ref.</th><th>Descrição</th><th>Uni</th><th class="num">Qtd</th><th class="num">PU venda</th><th class="num">C. mont.</th><th class="num">C. massas</th><th class="num">C. pav.</th><th>vs em vigor</th></tr></thead><tbody>
    ${v.artigos.map(a=>{const c=atual[a.item];let st='';if(!c||c.estado!=='ATIVO')st='<span class="tag err">não existe</span>';else{const ch=[];for(const k of ['descricao','uni','qtd','pu_venda'])if(JSON.stringify(c[k]??null)!==JSON.stringify(a[k]??null))ch.push(k);for(const e of ['MONTAGEM','MASSAS','PAVIMENTOS'])if((c.custo_sub?.[e]||0)!==(a.custo_sub?.[e]||0))ch.push('custo '+e);st=ch.length?`<span class="tag warn">${ch.join(', ')}</span>`:'<span class="tag ok">igual</span>';}
      return `<tr><td>${esc(a.item)}</td><td>${esc(a.ref_cliente)}</td><td>${descH(a)}</td><td>${esc(a.uni)}</td><td class="num">${fmt(a.qtd)}</td><td class="num">${fmt(a.pu_venda)}</td><td class="num">${fmt(a.custo_sub.MONTAGEM)}</td><td class="num">${fmt(a.custo_sub.MASSAS)}</td><td class="num">${fmt(a.custo_sub.PAVIMENTOS)}</td><td>${st}</td></tr>`;}).join('')}
    </tbody></table></div><div class="right" style="margin-top:8px"><button id="dCancel">Fechar</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
}
function viewOrc(){
  const m=$('#main');const o=S.orc;
  let h=`<h2>Orçamento</h2><div class="card"><div class="row" style="align-items:center;gap:10px;flex-wrap:wrap">
    <span class="hint" style="flex:1">${S.papel==='DO'?'Herdado do CRM_NT: o orçamento da obra importa-se no separador «Orçamento» do cartão da obra (Admin, Administrativo ou DO) e a consola carrega-o sozinha ao abrir a obra.':'Orçamento recebido no envio do Diretor de Obra (vem do CRM_NT).'}</span>
    ${S.papel==='DO'?`<button id="bCRM" class="sec sm">Verificar atualizações no CRM_NT</button>`:''}</div>
    ${o&&o.versao_crm!=null?`<div class="kv" style="margin-top:8px"><span>CRM_NT</span><span><span class="tag ok">v${o.versao_crm}</span> ${o.versao_crm_em?dtl(o.versao_crm_em):''}</span></div>`:(o&&S.papel==='DO'?`<div class="msg warn" style="margin-top:8px">Este orçamento não veio do CRM_NT (importação antiga por xlsx). Ao abrir a obra a consola substitui-o pela versão do CRM_NT quando ela existir.</div>`:'')}
    ${o?`<div class="kv" style="margin-top:10px"><span>Em vigor</span><span><b>${esc(o.ficheiro)}</b> · ${new Date(o.importado_em).toLocaleString('pt-PT')} · ${o.artigos.filter(a=>a.estado==='ATIVO').length} artigos ativos</span></div>
    <h3>Versões importadas</h3><table><thead><tr><th>Data</th><th>Ficheiro</th><th class="num">Novos</th><th class="num">Alterados</th><th class="num">Removidos</th><th></th></tr></thead><tbody>
    ${[...o.historico].reverse().map((x,i)=>`<tr><td>${new Date(x.importado_em).toLocaleString('pt-PT')}${i===0?' <span class="tag ok">em vigor</span>':''}</td><td>${esc(x.ficheiro)}</td><td class="num">${x.novos}</td><td class="num">${x.alterados}</td><td class="num">${x.removidos}</td><td>${x.snapshot?`<button class="sec sm" data-ver="${x.snapshot}">ver</button>`:'<span class="hint">sem cópia</span>'}</td></tr>`).join('')}</tbody></table>`:''}
    <div id="impMsg"></div></div>`;
  if(o){
    const at=o.artigos.filter(a=>a.estado==='ATIVO'),rem=o.artigos.filter(a=>a.estado!=='ATIVO');
    h+=`<div class="card"><h3 style="margin-top:0">Artigos <span class="tag">${at.length} ativos</span>${rem.length?`<span class="tag warn">${rem.length} removidos</span>`:''}</h3>
      <input id="fil" placeholder="filtrar por item, ref. ou descrição" style="width:340px;margin-bottom:8px">
      <div class="scroll"><table id="tOrc"><thead><tr><th>Item</th><th>Ref.</th><th>Descrição</th><th>Uni</th><th class="num">Qtd</th><th class="num">PU venda</th><th class="num">C. mont.</th><th class="num">C. massas</th><th class="num">C. pav.</th><th>TM</th></tr></thead><tbody></tbody></table></div></div>`;
  }
  m.innerHTML=h;
  if(o){
    const tb=$('#tOrc tbody');const caps=Object.fromEntries(o.capitulos.map(c=>[c.item,c]));
    const draw=f=>{f=(f||'').toLowerCase();let out='',lastCap=null;
      for(const a of o.artigos){if(f&&!(a.item.toLowerCase().includes(f)||a.ref_cliente.toLowerCase().includes(f)||a.descricao.toLowerCase().includes(f)))continue;
        if(a.capitulo!==lastCap&&caps[a.capitulo]){out+=`<tr class="cap"><td>${esc(a.capitulo)}</td><td></td><td colspan="8">${esc(caps[a.capitulo].descricao)}</td></tr>`;lastCap=a.capitulo;}
        out+=`<tr class="${a.estado!=='ATIVO'?'rem':''}"><td>${esc(a.item)}</td><td>${esc(a.ref_cliente)}</td><td>${descH(a)}</td><td>${esc(a.uni)}</td><td class="num">${fmt(a.qtd)}</td><td class="num">${fmt(a.pu_venda)}</td><td class="num">${fmt(a.custo_sub.MONTAGEM)}</td><td class="num">${fmt(a.custo_sub.MASSAS)}</td><td class="num">${fmt(a.custo_sub.PAVIMENTOS)}</td><td>${esc(a.tm||'')}</td></tr>`;}
      tb.innerHTML=out;};
    draw();$('#fil').oninput=e=>draw(e.target.value);
  }
  if($('#bCRM'))$('#bCRM').onclick=()=>carregarOrcCRM_(false);
  m.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>verVersaoOrc(S.orc.historico.find(x=>x.snapshot===b.dataset.ver)));
  if($('#fileOrc'))$('#fileOrc').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    $('#impMsg').innerHTML='<div class="msg">a ler…</div>';
    try{const novo=await lerOrcamentoERP(file);const d=diffOrcamento(novo);
      const li=(arr,f)=>arr.slice(0,15).map(f).join('')+(arr.length>15?`<li>… mais ${arr.length-15}</li>`:'');
      const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Importar ${esc(file.name)}</h3>
        <div class="kv"><span>Folha</span><span>${esc(novo.folha)}</span><span>Artigos no ficheiro</span><span>${novo.artigos.length} (${novo.capitulos.length} capítulos)</span>
        <span>Novos</span><span><b>${d.novos.length}</b><ul>${li(d.novos,a=>`<li>${esc(a.item)} ${esc(a.descricao)}</li>`)}</ul></span>
        <span>Alterados</span><span><b>${d.alterados.length}</b><ul>${li(d.alterados,x=>`<li>${esc(x.a.item)}: ${x.ch.join(', ')}</li>`)}</ul></span>
        <span>Removidos</span><span><b>${d.removidos.length}</b><ul>${li(d.removidos,a=>`<li>${esc(a.item)} ${esc(a.descricao)}</li>`)}</ul></span>
        ${d.reativados.length?`<span>Reativados</span><span>${d.reativados.length}</span>`:''}
        <span>Iguais</span><span>${d.iguais.length}</span></div>
        <p class="hint">Os preços já definidos nos subempreiteiros não são alterados. Artigos removidos ficam assinalados; artigos novos têm de ser atribuídos aos subempreiteiros.</p>
        <div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Confirmar importação</button></div>`;
      dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
      $('#dOk').onclick=async()=>{const conv=await aplicarImportacao(novo,file,d);dlg.close();toast(`Importado: +${d.novos.length} ~${d.alterados.length} −${d.removidos.length}${conv?` · ${conv} artigo(s) fora do orçamento passaram a contratuais`:''}`,'ok');viewOrc();renderNav();};
    }catch(err){$('#impMsg').innerHTML=`<div class="msg err">Erro: ${esc(err.message)}</div>`;}
  };
}

/* ---------- subempreiteiros ---------- */
function artigosAtivos(){return S.orc?S.orc.artigos.filter(a=>a.estado==='ATIVO'):[];}
function artigoPorItem(item){return S.orc?.artigos.find(a=>a.item===item);}
function precoTabela(item,esp){return S.obra.tabela_precos?.[item]?.[esp]??null;}
function precoFonte(a,esp,fonte){const co=a.custo_sub?.[esp]||0;if(fonte==='TABELA'){const t=precoTabela(a.item,esp);if(t!=null)return t;}return co>0?co:null;}
// quantidade já adjudicada a OUTROS subempreiteiros (mesma especialidade)
function adjOutros(item,esp,subId){let t=0;for(const o of S.obra.subempreiteiros){if(o.id===subId)continue;if((o.artigos?.[esp]||[]).includes(item))t+=o.qtds?.[item]?.[esp]??(artigoPorItem(item)?.qtd||0);}return t;}
function qtdAdj(s,item,esp){return s.qtds?.[item]?.[esp]??null;}
function temEmitidos(s,e){return (s.proximo_auto?.[e]||1)>(s.primeiro_auto?.[e]||1);}
function iniciarEsp(s,e){
  s.artigos[e]=artigosAtivos().filter(a=>a.custo_sub[e]>0).map(a=>a.item);s.proximo_auto[e]=s.proximo_auto[e]||1;s.fonte_precos=s.fonte_precos||{};s.fonte_precos[e]=s.fonte_precos[e]||'ORCAMENTO';s.qtds=s.qtds||{};
  for(const a of artigosAtivos())if(a.custo_sub[e]>0){const p=precoFonte(a,e,s.fonte_precos[e]);if(p!=null){s.precos[a.item]=s.precos[a.item]||{};s.precos[a.item][e]=p;}
    s.qtds[a.item]=s.qtds[a.item]||{};s.qtds[a.item][e]=Math.max(0,r2(a.qtd-adjOutros(a.item,e,s.id)));}
}
function nifValido(n){n=String(n).replace(/\s/g,'');if(!/^\d{9}$/.test(n))return false;const t=n.split('').map(Number);let soma=0;for(let i=0;i<8;i++)soma+=t[i]*(9-i);const r=soma%11;const cd=r<2?0:11-r;return cd===t[8];}
function emailValido(e){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);}
function novoSub(nome,esps,nif,email){
  const s={id:slug(nome),nome,nif,email,especialidades:esps,precos:{},qtds:{},fonte_precos:{},artigos:{},proximo_auto:{},fora_orcamento:[],criado_em:hoje()};
  for(const e of esps)iniciarEsp(s,e);
  return s;
}
function viewTabela(){
  const m=$('#main');
  if(!S.orc){m.innerHTML=`<h2>Tabela de preços</h2><div class="msg warn">Importa primeiro o orçamento.</div>`;return;}
  const o=S.obra;o.tabela_precos=o.tabela_precos||{};const caps=Object.fromEntries(S.orc.capitulos.map(c=>[c.item,c]));
  const excl=new Set(o.tabela_excl||[]);const nAtivos=artigosAtivos().length;
  let h=`<h2>Tabela de preços</h2><div class="card"><p class="hint" style="margin-top:0">Custo de mão de obra previsto no orçamento (só leitura) e <b>Preço Subemp.</b> — a tabela a praticar com os subempreiteiros. Em Subempreitadas escolhe‑se, por especialidade, se a adjudicação usa os preços do orçamento ou os desta tabela; o preço continua a poder ser ajustado artigo a artigo. Vazio = sem preço de tabela (usa o do orçamento). <b>A negrito</b>: artigos que entraram numa reimportação e ainda não têm preço.</p>
    <div class="row" style="margin-bottom:8px"><input id="filT" placeholder="filtrar" style="width:300px"><span class="hint">${o.tabela_publicada_em?`Tabela publicada em ${new Date(o.tabela_publicada_em).toLocaleString('pt-PT')}`:'Tabela ainda não publicada'}${(o.tabela_versoes||[]).length?` · ${o.tabela_versoes.length} versão(ões) anterior(es)`:''} · <span id="tSelN"></span></span><span style="flex:1"></span><button class="sec" id="bImprT">Imprimir / PDF…</button><button id="bGuardarT">Guardar</button></div>
    <p class="hint" style="margin:0 0 6px">A caixa de cada linha diz se o artigo <b>entra na tabela de preços</b> (impressão/PDF para o subempreiteiro). Desmarcado fica na lista, a cinzento, e não é impresso; o preço que tiver não se perde. Guardar fixa a escolha nesta obra.</p>
    <div class="scroll"><table><thead class="h2"><tr><th rowspan="2"><input type="checkbox" id="tSelAll" title="marcar / desmarcar os artigos visíveis"></th><th rowspan="2">Item</th><th rowspan="2">Ref.</th><th rowspan="2">Descrição</th><th rowspan="2">Uni</th><th rowspan="2" class="num">Qtd</th>${ESPECIALIDADES.map(e=>`<th colspan="2" style="text-align:center">${e}</th>`).join('')}</tr>
    <tr>${ESPECIALIDADES.map(()=>`<th class="num">Orçamento</th><th class="num">Preço Subemp.</th>`).join('')}</tr></thead><tbody id="tbT"></tbody></table></div></div>`;
  m.innerHTML=h;
  const draw=f=>{f=(f||'').toLowerCase();let out='',lastCap=null;
    for(const a of artigosAtivos()){if(f&&!(a.item.toLowerCase().includes(f)||a.descricao.toLowerCase().includes(f)||a.ref_cliente.toLowerCase().includes(f)))continue;
      if(a.capitulo!==lastCap&&caps[a.capitulo]){out+=`<tr class="cap"><td></td><td>${esc(a.capitulo)}</td><td></td><td colspan="${3+ESPECIALIDADES.length*2}">${esc(caps[a.capitulo].descricao)}</td></tr>`;lastCap=a.capitulo;}
      const novo=!!a.novo_em&&!precoTabelaQualquer(a.item);const fora=excl.has(a.item);
      out+=`<tr class="${fora?'tFora':''}" style="${novo?'font-weight:700':''}"><td><input type="checkbox" class="tSel" data-item="${esc(a.item)}" ${fora?'':'checked'}></td><td>${esc(a.item)}</td><td>${esc(a.ref_cliente)}</td><td>${descH(a)}${novo?` <span class="tag warn" style="font-weight:400">novo em ${new Date(a.novo_em).toLocaleDateString('pt-PT')}</span>`:''}</td><td>${esc(a.uni)}</td><td class="num">${fmt(a.qtd)}</td>`;
      for(const e of ESPECIALIDADES){const co=a.custo_sub[e]||0,t=o.tabela_precos[a.item]?.[e];const acima=t!=null&&co>0&&t>co+1e-9;
        out+=`<td class="num">${co?fmt(co):'<span class="muted">—</span>'}</td><td class="num"><input type="number" step="0.01" class="tP" data-item="${esc(a.item)}" data-e="${e}" value="${t!=null?t:''}" style="${acima?'color:var(--err);font-weight:600':''}"></td>`;}
      out+='</tr>';}
    $('#tbT').innerHTML=out;
    const nSel=()=>{const n=nAtivos-[...excl].filter(it=>artigoPorItem(it)).length;$('#tSelN').textContent=`${n} de ${nAtivos} artigo(s) na tabela`;};nSel();
    m.querySelectorAll('.tSel').forEach(c=>c.onchange=()=>{if(c.checked)excl.delete(c.dataset.item);else excl.add(c.dataset.item);c.closest('tr').classList.toggle('tFora',!c.checked);nSel();});
    const all=$('#tSelAll');const vis=[...m.querySelectorAll('.tSel')];all.checked=vis.length>0&&vis.every(c=>c.checked);all.onchange=()=>{vis.forEach(c=>{c.checked=all.checked;c.onchange();});};};
  draw();$('#filT').oninput=e=>draw(e.target.value);
  $('#bGuardarT').onclick=async()=>{o.tabela_excl=[...excl].filter(it=>artigoPorItem(it));if(!o.tabela_excl.length)delete o.tabela_excl;m.querySelectorAll('.tP').forEach(inp=>{const it=inp.dataset.item,e=inp.dataset.e;o.tabela_precos[it]=o.tabela_precos[it]||{};if(inp.value==='')delete o.tabela_precos[it][e];else o.tabela_precos[it][e]=+inp.value;if(!Object.keys(o.tabela_precos[it]).length)delete o.tabela_precos[it];});
    for(const a of S.orc.artigos)if(a.novo_em&&precoTabelaQualquer(a.item))delete a.novo_em;await FS.writeJson(S.obraDir,'orcamento.json',S.orc);
    o.tabela_publicada_em=hoje();await guardarObra();toast('Tabela de preços guardada','ok');viewTabela();};
  $('#bImprT').onclick=imprimirTabelaUI;
}
/* ---------- impressão da tabela de preços ---------- */
function imprimirTabelaUI(){
  const o=S.obra,dlg=$('#dlg');const vers=o.tabela_versoes||[];
  dlg.innerHTML=`<h3 style="margin-top:0">Imprimir tabela de preços</h3>
    <div class="kv">
      <span>Versão</span><span><select id="pVer"><option value="-1">Em vigor — orçamento ${esc(S.orc.ficheiro)} (${new Date(S.orc.importado_em).toLocaleDateString('pt-PT')})</option>${vers.map((v,i)=>`<option value="${i}">Orçamento ${esc(v.orc_ficheiro)} (${new Date(v.orc_importado_em).toLocaleDateString('pt-PT')}) — tabela ${v.publicada_em?'publicada em '+new Date(v.publicada_em).toLocaleDateString('pt-PT'):'não publicada'}</option>`).reverse().join('')}</select></span>
      <span>Preços</span><span><label><input type="radio" name="pFonte" value="TABELA" checked> Preço Subemp. <span class="hint">(artigos sem preço de tabela usam o do orçamento, assinalados em itálico *)</span></label><br><label><input type="radio" name="pFonte" value="ORCAMENTO"> Custo do orçamento</label></span>
      <span>Especialidades</span><span>${ESPECIALIDADES.map(e=>`<label style="margin-right:12px"><input type="checkbox" class="pEsp" value="${e}" checked> ${e}</label>`).join('')}</span>
      <span>Quantidades</span><span><label><input type="radio" name="pQtd" value="ORC" checked> Do orçamento</label><br><label><input type="radio" name="pQtd" value="PCT"> Ajustadas em <input id="pPct" type="number" step="0.5" value="0" class="short" style="width:80px"> % <span class="hint">(negativo = a menos)</span></label></span>
      <span>Artigos</span><span><label><input type="checkbox" id="pSemPreco"> incluir artigos sem preço nas especialidades escolhidas</label>${(o.tabela_excl||[]).length?`<br><span class="hint">${o.tabela_excl.length} artigo(s) desmarcado(s) na tabela não entram.</span>`:''}</span>
    </div>
    <p class="hint">Abre a janela de impressão do browser — escolhe <b>Guardar como PDF</b> como impressora. Formato A4 horizontal.</p>
    <div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Imprimir / PDF</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{
    const vi=+$('#pVer').value;const fonte=dlg.querySelector('[name=pFonte]:checked').value;const esps=[...dlg.querySelectorAll('.pEsp:checked')].map(c=>c.value);
    if(!esps.length)return toast('Escolhe pelo menos uma especialidade','warn');
    const pct=dlg.querySelector('[name=pQtd]:checked').value==='PCT'?(+$('#pPct').value||0):0;const semPreco=$('#pSemPreco').checked;
    let artigos,capitulos,precos,orcInfo,publicada;
    if(vi<0){artigos=artigosAtivos();capitulos=S.orc.capitulos;precos=o.tabela_precos||{};orcInfo={ficheiro:S.orc.ficheiro,importado_em:S.orc.importado_em};publicada=o.tabela_publicada_em;}
    else{const v=vers[vi];let snap=null;try{const vd=await S.obraDir.getDirectoryHandle('orcamentos');snap=await FS.readJson(vd,v.orc_snapshot);}catch(e){}
      if(!snap)return toast('Esta versão do orçamento não tem cópia guardada','warn');
      artigos=snap.artigos;capitulos=snap.capitulos;precos=v.precos;orcInfo={ficheiro:v.orc_ficheiro,importado_em:v.orc_importado_em};publicada=v.publicada_em;}
    dlg.close();imprimirTabela({artigos,capitulos,precos,orcInfo,publicada,fonte,esps,pct,semPreco});
  };
}
function imprimirTabela({artigos,capitulos,precos,orcInfo,publicada,fonte,esps,pct,semPreco}){
  const o=S.obra;const caps=Object.fromEntries((capitulos||[]).map(c=>[c.item,c]));const f=1+pct/100;
  const preco=(a,e)=>{const co=a.custo_sub?.[e]||0;if(fonte==='TABELA'){const t=precos[a.item]?.[e];if(t!=null)return {v:t,fb:false};}return co>0?{v:co,fb:fonte==='TABELA'}:null;};
  const tot={};for(const e of esps)tot[e]=0;let lastCap=null,rows='',n=0,fbCount=0;const exclP=new Set(o.tabela_excl||[]);
  for(const a of artigos){if(exclP.has(a.item))continue;const ps=esps.map(e=>preco(a,e));if(!semPreco&&ps.every(p=>!p))continue;
    if(a.capitulo!==lastCap&&caps[a.capitulo]){rows+=`<tr class="cap"><td>${esc(a.capitulo)}</td><td colspan="${3+esps.length*2}">${esc(caps[a.capitulo].descricao)}</td></tr>`;lastCap=a.capitulo;}
    const q=r2((a.qtd||0)*f);n++;
    rows+=`<tr><td>${esc(a.item)}</td><td>${descH(a)}</td><td>${esc(a.uni)}</td><td class="num">${fmt(q)}</td>`;
    esps.forEach((e,i)=>{const p=ps[i];if(!p){rows+='<td class="num">—</td><td class="num">—</td>';return;}if(p.fb)fbCount++;const v=r2(q*p.v);tot[e]+=v;rows+=`<td class="num${p.fb?' fb':''}">${fmt(p.v)}${p.fb?' *':''}</td><td class="num">${fmt(v)}</td>`;});
    rows+='</tr>';}
  const logo=`<img src="${CTX.logo||'logo.png'}" alt="" onerror="this.remove()">`;
  $('#printArea').innerHTML=`<div class="pcab">${logo}<div><h1>Tabela de preços de subempreitada</h1><div class="pob">${esc(o.obra.numero)} · ${esc(o.obra.nome)}</div></div>
    <div class="pmt">Preços: <b>${fonte==='TABELA'?'Subemp.':'custo do orçamento'}</b><br>Tabela publicada: <b>${publicada?new Date(publicada).toLocaleDateString('pt-PT'):'—'}</b><br>Orçamento: ${esc(orcInfo.ficheiro)} · ${new Date(orcInfo.importado_em).toLocaleDateString('pt-PT')}<br>Quantidades: ${pct?`orçamento <b>${pct>0?'+':''}${pct} %</b>`:'do orçamento'}<br>Impresso em ${new Date().toLocaleString('pt-PT')} por ${esc(S.cfg?.nome||'')}</div></div>
    <table><thead><tr><th rowspan="2">Item</th><th rowspan="2">Descrição</th><th rowspan="2">Uni</th><th rowspan="2" class="num">Qtd${pct?` (${pct>0?'+':''}${pct} %)`:''}</th>${esps.map(e=>`<th colspan="2" style="text-align:center">${e}</th>`).join('')}</tr><tr>${esps.map(()=>'<th class="num">Preço</th><th class="num">Valor</th>').join('')}</tr></thead>
    <tbody>${rows}<tr class="tot"><td colspan="4">TOTAL (${n} artigos)</td>${esps.map(e=>`<td></td><td class="num">${fmt(tot[e])} €</td>`).join('')}</tr></tbody></table>
    <div class="prod">${fbCount?`* ${fbCount} preço(s) sem valor na tabela de preços — aplicado o custo do orçamento. `:''}Valores sem IVA. Quantidades ${pct?'ajustadas sobre o orçamento':'do orçamento'}; as quantidades adjudicadas a cada subempreiteiro constam das respetivas subempreitadas.</div>`;
  imprimirHTML_($('#printArea').innerHTML,'Tabela de preços '+String(o.obra.numero||'')+' '+String(o.obra.nome||''));
}
async function viewSubs(){
  const m=$('#main');const subs=S.obra.subempreiteiros;
  if(!S.orc){m.innerHTML=`<h2>Subempreiteiros</h2><div class="msg warn">Importa primeiro o orçamento — os artigos e preços dos subempreiteiros partem dele.</div>`;return;}
  await listarAutos();
  const temEnt=!!(S.ent&&S.ent.entidades.length);
  const formNovo=`<div class="card"><h3 style="margin-top:0">Chamar subempreiteiro à obra <span class="tag">tabela do CRM_NT · ${(S.ent?.entidades||[]).length}</span></h3>
    ${temEnt?`<div class="row" style="margin-bottom:8px"><label style="flex:1"><span>Subempreiteiro (código, nome ou NIF) — fonte única: a tabela do CRM_NT</span><input id="sEnt" list="dlEnt" style="width:100%" placeholder="escreve para procurar…"><datalist id="dlEnt">${S.ent.entidades.map(e=>`<option value="${esc(e.codigo)} · ${esc(e.nome)}">${esc(e.nif||'')} ${esc(e.email||'')}</option>`).join('')}</datalist></label><span id="sEntSel" class="hint"></span><span class="hint">Não está na lista? <a href="#" id="sNovoERP" style="color:var(--base-tx);font-weight:600">criar novo subempreiteiro…</a></span></div>`:`<div class="msg warn" style="margin-bottom:8px">A tabela de subempreiteiros do CRM_NT ainda não foi carregada pelo Admin.</div>`}
    <div class="row">
    <label><span>Nome</span><input id="sNome" style="width:260px" placeholder="ALFA LDA"></label>
    <label><span>NIF</span><input id="sNif" class="short" maxlength="9" placeholder="500000000" ${temEnt?'readonly':''}></label>
    <label><span>E‑mail <span class="tag err">obrigatório</span></span><input id="sEmail" type="email" style="width:240px" placeholder="fica gravado na tabela"></label>
    <label><span>Especialidades</span>${ESPECIALIDADES.map(e=>`<span class="chk"><input type="checkbox" class="sEsp" value="${e}" ${e!=='PAVIMENTOS'?'checked':''}>${e}</span>`).join('')}</label>
    <input type="hidden" id="sCod">
    <button id="bNovoSub">Criar</button></div>
    <p class="hint">Gesso cartonado = MONTAGEM + MASSAS (uma série de Autos por especialidade). A adjudicação (artigos, quantidades e preços) faz‑se em <b>Subempreitadas</b>; por omissão entram todos os artigos com custo. <b>O e-mail fica gravado na tabela do CRM_NT</b> — é o destinatário que o Controller usa.</p></div>`;
  let h=`<h2>Subempreiteiros <span class="tag">${subs.length}</span></h2>`;
  if(!subs.length){h+=formNovo;}
  else if(S._subSel!=null&&subs[S._subSel]){h+=`<div class="tabs"><a id="tVoltar">← todos</a><a class="on">${esc(subs[S._subSel].nome)}</a></div><div id="subBody"></div>`;}
  else{h+=`<div class="tabs"><a class="${S._tabSubs!=='novo'?'on':''}" id="tLista">Lista</a><a class="${S._tabSubs==='novo'?'on':''}" id="tNovo">+ Novo subempreiteiro</a></div>`;
    if(S._tabSubs==='novo')h+=formNovo;
    h+=`<div class="grid">`+subs.map((s,i)=>{const linhas=s.especialidades.map(e=>{const l=serie(s.id,e);const em=l.filter(a=>a.estado==='EMITIDO').length;const ras=l.find(a=>a.estado==='RASCUNHO');const ult=l.filter(a=>a.estado==='EMITIDO').pop();
        return `<span>${e.charAt(0)+e.slice(1).toLowerCase()}</span><b>${em} emitido(s)${ras?` · <span class="tag warn">rascunho ${pad3(ras.numero)}</span>`:''}${ult?` · último ${ult.dados.periodo}`:''} · ${(s.artigos?.[e]||{}).length} art.</b>`;}).join('');
      const ras=s.especialidades.map(e=>rascunho(s.id,e)).find(Boolean);
      return `<div class="ocard" data-i="${i}"><div class="body"><div class="ttl"><div class="ico"><svg width="18" height="18"><use href="#i-people"/></svg></div><div><b>${esc(s.nome)}</b><small>${s.codigo_erp?`<span class="tag ok">ERP ${esc(s.codigo_erp)}</span> `:(S.ent?'<span class="tag warn">sem n.º ERP</span> ':'')}${s.nif?`<code>NIF ${esc(s.nif)}</code> · ${esc(s.email||'')}`:'<span class="tag warn">sem NIF/e‑mail</span>'}</small></div></div>
        <div class="meta">${linhas}</div></div>
        <div class="foot">${ras?`<button class="sec sm" data-open="${ras.id}"><svg width="13" height="13" style="vertical-align:-2px"><use href="#i-clip"/></svg> Abrir ${pad3(ras.numero)} no Excel</button>`:''}<span class="sp"></span><button class="sec sm" data-adj="${i}">adjudicação →</button><button class="sm" data-i2="${i}">abrir</button></div></div>`;}).join('')+`</div>`;}
  m.innerHTML=h;
  if($('#bNovoSub'))$('#bNovoSub').onclick=async()=>{const nome=$('#sNome').value.trim().toUpperCase();const esps=[...m.querySelectorAll('.sEsp:checked')].map(x=>x.value);const nif=$('#sNif').value.replace(/\s/g,''),email=$('#sEmail').value.trim();
    if(!nome)return toast('Nome obrigatório','warn');if(!esps.length)return toast('Escolhe pelo menos uma especialidade','warn');
    if(!nifValido(nif))return toast('NIF inválido (9 dígitos com dígito de controlo)','err');if(!emailValido(email))return toast('E‑mail inválido','err');
    if(subs.find(s=>s.id===slug(nome)))return toast('Já existe um subempreiteiro com esse nome','err');if(subs.find(s=>s.nif===nif))return toast('Já existe um subempreiteiro com esse NIF','err');
    const cod=$('#sCod')?$('#sCod').value:'';if(!cod)return toast('Escolhe o subempreiteiro da tabela (ou «criar novo»)','warn');
    if(cod&&subs.find(s=>s.codigo_erp===cod))return toast('Essa entidade já é subempreiteiro desta obra','err');
    const ns=novoSub(nome,esps,nif,email);if(cod){ns.codigo_erp=cod;const e=entidadePorCodigo(cod);const mailAntes=e?String(e.email||''):'';if(e&&(e.nif!==nif||e.email!==email)){e.nif=nif;e.email=email;try{await FS.writeJson(S.root,'entidades.json',S.ent);}catch(err){}}
      if(mailAntes.toLowerCase()!==email.toLowerCase()){const r=await CRM.subEmail(cod,email);if(r&&r.erro)return toast(r.erro,'err');}}subs.push(ns);await guardarObra();toast('Subempreiteiro criado — adjudicação em Subempreitadas','ok');S._tabSubs='lista';S._subSel=subs.length-1;viewSubs();};
  if($('#sEnt')){const aplicar=()=>{const v=$('#sEnt').value;const cod=v.split('·')[0].trim();let e=entidadePorCodigo(cod);if(!e){const q=v.trim().toLowerCase();e=S.ent.entidades.find(x=>x.nif===q||x.nome.toLowerCase()===q)||null;}
      if(e){$('#sCod').value=e.codigo;$('#sNome').value=e.nome;$('#sNif').value=e.nif||'';$('#sEmail').value=e.email||'';$('#sEntSel').innerHTML=`<span class="tag ok">n.º ERP ${esc(e.codigo)}</span>${!e.nif||!e.email?' <span class="tag warn">ERP sem '+[!e.nif?'NIF':'',!e.email?'e‑mail':''].filter(Boolean).join(' nem ')+' — preenche (fica guardado na tabela)</span>':''}`;$('#sNif').readOnly=!!e.nif;}
      else{$('#sCod').value='';$('#sEntSel').innerHTML='';}};
    $('#sEnt').addEventListener('input',aplicar);$('#sEnt').addEventListener('change',aplicar);
    $('#sNovoERP').onclick=ev=>{ev.preventDefault();criarSubNovoUI();};}
  if($('#tLista'))$('#tLista').onclick=()=>{S._tabSubs='lista';viewSubs();};
  if($('#tNovo'))$('#tNovo').onclick=()=>{S._tabSubs='novo';viewSubs();};
  if($('#tVoltar'))$('#tVoltar').onclick=()=>{S._subSel=null;viewSubs();};
  m.querySelectorAll('.ocard[data-i]').forEach(d=>d.onclick=()=>{S._subSel=+d.dataset.i;viewSubs();});
  m.querySelectorAll('[data-i2]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();S._subSel=+b.dataset.i2;viewSubs();});
  m.querySelectorAll('[data-adj]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();S._sub=+b.dataset.adj;go('subempreitadas');});
  m.querySelectorAll('[data-open]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();abrirNoExcel(b.dataset.open);});
  if(S._subSel!=null&&subs[S._subSel])detalheSub(S._subSel);
}
function detalheSub(i){
  const s=S.obra.subempreiteiros[i];const body=$('#subBody');
  let h=`<div class="card"><div class="row"><label><span>N.º ERP</span>${s.codigo_erp?`<b style="line-height:32px">${esc(s.codigo_erp)}</b>`:(S.ent?`<input id="eEnt" list="dlEnt2" class="short" placeholder="ligar…"><datalist id="dlEnt2">${S.ent.entidades.map(e=>`<option value="${esc(e.codigo)}">${esc(e.nome)} ${esc(e.nif||'')}</option>`).join('')}</datalist>`:'<span class="hint" style="line-height:32px">—</span>')}</label><label><span>Nome</span><input id="eNome" value="${esc(s.nome)}" style="width:260px"></label><label><span>NIF</span><input id="eNif" class="short" maxlength="9" value="${esc(s.nif||'')}"></label><label><span>E‑mail</span><input id="eEmail" type="email" style="width:240px" value="${esc(s.email||'')}"></label>
    <label><span>Especialidades</span>${ESPECIALIDADES.map(e=>`<span class="chk"><input type="checkbox" class="eEsp" value="${e}" ${s.especialidades.includes(e)?'checked':''}>${e}</span>`).join('')}</label>
    <button id="bGuardarSubD">Guardar</button><button class="danger sm" id="bDelSub">Eliminar</button><span class="sp" style="flex:1"></span><button class="sec" id="bAdj">Adjudicação (Subempreitadas) →</button></div></div>`;
  for(const esp of s.especialidades)h+=htmlAutosSerie(s,esp);
  body.innerHTML=h;bindAutosActions(body);
  $('#bAdj').onclick=()=>{S._sub=i;go('subempreitadas');};
  $('#bGuardarSubD').onclick=async()=>{const nif=$('#eNif').value.replace(/\s/g,''),email=$('#eEmail').value.trim();if(!nifValido(nif))return toast('NIF inválido','err');if(!emailValido(email))return toast('E‑mail inválido','err');
    if(S.obra.subempreiteiros.some((x,k)=>k!==i&&x.nif===nif))return toast('Já existe um subempreiteiro com esse NIF','err');
    if($('#eEnt')&&$('#eEnt').value.trim()){const e=entidadePorCodigo($('#eEnt').value.trim());if(!e)return toast('N.º de entidade não existe na tabela do ERP','err');if(S.obra.subempreiteiros.some((x,k)=>k!==i&&x.codigo_erp===e.codigo))return toast('Essa entidade já está ligada a outro subempreiteiro','err');s.codigo_erp=e.codigo;}
    s.nome=$('#eNome').value.trim().toUpperCase();s.nif=nif;s.email=email;const esps=[...body.querySelectorAll('.eEsp:checked')].map(x=>x.value);
    for(const e of esps)if(!s.especialidades.includes(e))iniciarEsp(s,e);
    for(const e of s.especialidades)if(!esps.includes(e)&&temEmitidos(s,e)){toast(`${e} já tem Autos emitidos; não pode ser removida`,'err');esps.push(e);}
    s.especialidades=ESPECIALIDADES.filter(e=>esps.includes(e));await guardarObra();toast('Guardado','ok');viewSubs();};
  $('#bDelSub').onclick=async()=>{if(s.especialidades.some(e=>temEmitidos(s,e)))return toast('Tem Autos emitidos; não pode ser eliminado','err');if(!confirm(`Eliminar ${s.nome}?`))return;S.obra.subempreiteiros.splice(i,1);S._subSel=null;await guardarObra();viewSubs();};
}
function acumInicialUI(i,esp,depois){
  const s=S.obra.subempreiteiros[i];const n=s.primeiro_auto?.[esp]||1;s.acum_inicial=s.acum_inicial||{};const cur=s.acum_inicial[esp]||{};
  const itens=(s.artigos[esp]||[]).map(it=>{const a=artigoPorItem(it)||(s.fora_orcamento||[]).find(f=>f.item===it);if(!a)return null;return {item:it,descricao:a.descricao,uni:a.uni,qtd:qtdAdj(s,it,esp)??a.qtd,preco:s.precos?.[it]?.[esp]??0};}).filter(Boolean);
  const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Acumulados anteriores — ${esc(s.nome)} / ${esp}</h3>
    <p class="hint">Quantidades já executadas (e pagas) nos Autos 1 a ${n-1}, emitidos fora da consola. Entram na coluna H (ACUM. ANTERIOR) do Auto n.º ${n}; o Controller recebe o aviso de que foram introduzidas manualmente. Podem ser alteradas até à emissão do Auto n.º ${n}.</p>
    <div class="scroll" style="max-height:55vh"><table><thead><tr><th>Item</th><th>Descrição</th><th>Uni</th><th class="num">Qtd adj.</th><th class="num">Acumulado anterior</th><th class="num">Valor</th></tr></thead><tbody>
    ${itens.map(x=>`<tr><td>${esc(x.item)}</td><td>${esc(x.descricao)}</td><td>${esc(x.uni)}</td><td class="num">${fmt(x.qtd)}</td><td class="num"><input type="number" step="0.01" min="0" class="acI" data-item="${esc(x.item)}" data-q="${x.qtd}" data-p="${x.preco}" value="${cur[x.item]??''}" style="width:110px"></td><td class="num acV" data-item="${esc(x.item)}">${fmt((cur[x.item]||0)*x.preco)}</td></tr>`).join('')}
    </tbody></table></div>
    <div class="row" style="margin-top:8px"><b>Valor ao preço adjudicado: <span id="acTot">—</span></b><span class="sp" style="flex:1"></span><span id="acMsg" class="hint"></span></div>
    <div class="row"><label><span>Valor realmente faturado nos Autos 1 a ${n-1} (€, sem IVA)</span><input id="acFat" type="number" step="0.01" min="0" style="width:160px" value="${s.acum_inicial_valor?.[esp]??''}"></label><span class="hint">Preenche se os Autos antigos foram pagos a preços diferentes dos adjudicados; a diferença entra na DR do Controller como ajuste. Vazio = igual ao valor ao preço adjudicado.</span></div>
    <div class="right" style="margin-top:8px"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Guardar acumulados</button></div>`;
  const recalc=()=>{let tot=0,exc=0;dlg.querySelectorAll('.acI').forEach(inp=>{const v=+inp.value||0,p=+inp.dataset.p,q=+inp.dataset.q;tot+=v*p;dlg.querySelector(`.acV[data-item="${CSS.escape(inp.dataset.item)}"]`).textContent=fmt(v*p);const ex=v>q+1e-6;if(ex)exc++;inp.style.color=ex?'var(--err)':'';});
    $('#acTot').textContent=fmt(tot)+' €';$('#acMsg').innerHTML=exc?`<span class="tag warn">${exc} artigo(s) acima da quantidade adjudicada</span>`:'';};
  recalc();dlg.querySelectorAll('.acI').forEach(inp=>inp.oninput=recalc);
  dlg.showModal();$('#dCancel').onclick=()=>{dlg.close();if(depois)depois();};
  $('#dOk').onclick=async()=>{const o={};let neg=false;dlg.querySelectorAll('.acI').forEach(inp=>{const v=inp.value===''?0:+inp.value;if(v<0)neg=true;if(v)o[inp.dataset.item]=r2(v);});
    if(neg)return toast('Acumulados não podem ser negativos','err');
    const fat=$('#acFat').value;s.acum_inicial_valor=s.acum_inicial_valor||{};if(fat==='')delete s.acum_inicial_valor[esp];else{if(+fat<0)return toast('Valor faturado não pode ser negativo','err');s.acum_inicial_valor[esp]=r2(+fat);}
    s.acum_inicial[esp]=o;s.acum_inicial_em=s.acum_inicial_em||{};s.acum_inicial_em[esp]=hoje();await guardarObra();dlg.close();toast('Acumulados anteriores guardados','ok');if(depois)depois();};
}
function viewSubempreitadas(){
  const m=$('#main');const subs=S.obra.subempreiteiros;
  if(!S.orc){m.innerHTML=`<h2>Subempreitadas</h2><div class="msg warn">Importa primeiro o orçamento.</div>`;return;}
  if(!subs.length){m.innerHTML=`<h2>Subempreitadas</h2><div class="msg warn">Ainda não há subempreiteiros — cria‑os em <b>Subempreiteiros</b>.</div>`;return;}
  m.innerHTML=`<h2>Subempreitadas</h2><p class="hint">Adjudicação por subempreiteiro e especialidade: artigos, quantidades e preços. Artigos a negrito entraram numa reimportação; artigos <span class="tag err">FORA DO ORÇAMENTO</span> foram adicionados manualmente e não estão previstos no orçamento.</p>
    <div class="tabs" id="subTabs">${subs.map((s,i)=>`<a data-i="${i}">${esc(s.nome)}</a>`).join('')}</div><div id="subBody"></div>`;
  m.querySelectorAll('#subTabs a').forEach(a=>a.onclick=()=>selSub(+a.dataset.i));selSub(Math.min(S._sub??0,subs.length-1));
}
function selSub(i){
  S._sub=i;const s=S.obra.subempreiteiros[i];if(!s)return;
  document.querySelectorAll('#subTabs a').forEach(a=>a.classList.toggle('on',+a.dataset.i===i));
  const esp=S._esp&&s.especialidades.includes(S._esp)?S._esp:s.especialidades[0];S._esp=esp;
  const arts=artigosAtivos();const caps=Object.fromEntries(S.orc.capitulos.map(c=>[c.item,c]));
  const sel=new Set(s.artigos[esp]||[]);
  let h=`<div class="tabs">${s.especialidades.map(e=>`<a class="${e===esp?'on':''}" data-e="${e}">${e}</a>`).join('')}</div>`;
  s.fonte_precos=s.fonte_precos||{};s.qtds=s.qtds||{};const fonte=s.fonte_precos[esp]||'ORCAMENTO';
  let excessos=0;for(const a of arts)if(sel.has(a.item)){const q=qtdAdj(s,a.item,esp)??a.qtd;if(q+adjOutros(a.item,esp,s.id)>a.qtd+1e-6)excessos++;}
  h+=`<div class="card"><div class="row" style="margin-bottom:8px"><b>Adjudicação — ${esp}</b><span class="tag">${sel.size} artigos</span>
    <label style="margin:0 6px"><span>Usar preços</span><span class="chk"><input type="radio" name="fonte" value="ORCAMENTO" ${fonte==='ORCAMENTO'?'checked':''}>Orçamento</span><span class="chk"><input type="radio" name="fonte" value="TABELA" ${fonte==='TABELA'?'checked':''}>Tabela de preços</span></label>
    <label style="margin:0 6px"><span>N.º do 1.º Auto</span><input id="aPrim" type="number" min="1" step="1" class="short" style="width:70px" value="${s.primeiro_auto?.[esp]||1}" ${temEmitidos(s,esp)?'disabled title="já há Autos emitidos nesta série"':''}></label>
    ${(s.primeiro_auto?.[esp]||1)>1&&!temEmitidos(s,esp)?`<button class="sec sm" id="bAcum">acumulados anteriores…${s.acum_inicial?.[esp]?'':' <span class="tag warn">por introduzir</span>'}</button>`:''}
    <button class="sec sm" id="bRepor">aplicar preços da fonte</button><button class="sec sm" id="bTodos">selecionar todos com custo</button><button class="sec sm" id="bNenhum">limpar seleção</button>
    <span class="sp" style="flex:1"></span><button class="sm" id="bFora">+ artigo fora do orçamento</button></div>
    ${excessos?`<div class="msg warn">${excessos} artigo(s) com quantidade adjudicada (este + outros subempreiteiros) acima do orçamento — fica registado e visível ao Controller.</div>`:''}
    <p class="hint">${(s.primeiro_auto?.[esp]||1)>1?`<b>Série a começar no Auto n.º ${s.primeiro_auto[esp]}</b> (obra com Autos anteriores à consola): os acumulados dos Autos 1 a ${s.primeiro_auto[esp]-1} introduzem‑se em <b>acumulados anteriores…</b> e entram na coluna H do primeiro Auto. `:''}Qtd adjudicada = o que este subempreiteiro tem contratado (sugerida: orçamento − já adjudicado a outros; pode ser superior). Preço a vermelho quando é superior ao custo do orçamento.</p>
    <div class="scroll"><table><thead><tr><th></th><th>Item</th><th>Ref.</th><th>Descrição</th><th>Uni</th><th class="num">Qtd orç.</th><th class="num">Outros subs</th><th class="num">Qtd adjudicada</th><th class="num">Custo orç.</th><th class="num">Tabela</th><th class="num">Preço</th></tr></thead><tbody>`;
  let lastCap=null;
  for(const a of arts){
    if(a.capitulo!==lastCap&&caps[a.capitulo]){h+=`<tr class="cap"><td></td><td>${esc(a.capitulo)}</td><td></td><td colspan="8">${esc(caps[a.capitulo].descricao)}</td></tr>`;lastCap=a.capitulo;}
    const co=a.custo_sub[esp]||0,p=s.precos[a.item]?.[esp],t=precoTabela(a.item,esp);const acima=p!=null&&co>0&&p>co+1e-9;
    const outros=adjOutros(a.item,esp,s.id);const q=qtdAdj(s,a.item,esp);const qv=q!=null?q:Math.max(0,r2(a.qtd-outros));const exc=sel.has(a.item)&&(qv+outros>a.qtd+1e-6);const novo=!!a.novo_em;
    h+=`<tr style="${novo?'font-weight:700':''}"><td><input type="checkbox" class="aSel" data-item="${esc(a.item)}" ${sel.has(a.item)?'checked':''}></td><td>${esc(a.item)}</td><td>${esc(a.ref_cliente)}</td><td>${descH(a)}${novo?' <span class="tag warn" style="font-weight:400">novo</span>':''}</td><td>${esc(a.uni)}</td><td class="num">${fmt(a.qtd)}</td><td class="num">${outros?fmt(outros):''}</td>
      <td class="num"><input type="number" step="0.01" class="aQtd" data-item="${esc(a.item)}" value="${qv}" style="${exc?'color:var(--err);font-weight:600':''}"></td><td class="num">${fmt(co)}</td><td class="num">${t!=null?fmt(t):''}</td>
      <td class="num"><input type="number" step="0.01" class="aPreco" data-item="${esc(a.item)}" value="${p!=null?p:''}" style="${acima?'color:var(--err);font-weight:600':''}"></td></tr>`;
  }
  for(const a of (S.orc.artigos.filter(x=>x.estado!=='ATIVO'&&sel.has(x.item)))){const p=s.precos[a.item]?.[esp];
    h+=`<tr class="rem"><td><input type="checkbox" class="aSel" data-item="${esc(a.item)}" checked></td><td>${esc(a.item)} <span class="tag err">removido do orçamento</span></td><td>${esc(a.ref_cliente)}</td><td>${descH(a)}</td><td>${esc(a.uni)}</td><td class="num">${fmt(a.qtd)}</td><td></td><td class="num"><input type="number" step="0.01" class="aQtd" data-item="${esc(a.item)}" value="${qtdAdj(s,a.item,esp)??a.qtd}"></td><td class="num">${fmt(a.custo_sub[esp]||0)}</td><td></td><td class="num"><input type="number" step="0.01" class="aPreco" data-item="${esc(a.item)}" value="${p!=null?p:''}"></td></tr>`;}
  for(const f of (s.fora_orcamento||[])){const p=s.precos[f.item]?.[esp];if(!(f.especialidades||[]).includes(esp))continue;
    h+=`<tr style="${f.contratual_desde?'':'background:#fff4f2'}"><td><input type="checkbox" class="aSel" data-item="${esc(f.item)}" ${sel.has(f.item)?'checked':''}></td><td>${esc(f.item)} <span class="tag ${f.contratual_desde?'ok':'err'}">${f.contratual_desde?'passou a contratual':'FORA DO ORÇAMENTO — não previsto'}</span></td><td>${esc(f.ref_cliente||'')}</td><td>${descH(f)}</td><td>${esc(f.uni)}</td><td class="num">${fmt(f.qtd)}</td><td></td><td class="num"><input type="number" step="0.01" class="aQtd" data-item="${esc(f.item)}" value="${qtdAdj(s,f.item,esp)??f.qtd}"></td><td class="num">—</td><td></td><td class="num"><input type="number" step="0.01" class="aPreco" data-item="${esc(f.item)}" value="${p!=null?p:''}"></td></tr>`;}
  h+=`</tbody></table></div><div style="margin-top:10px"><button id="bGuardarSub">Guardar</button></div></div>`;
  const body=$('#subBody');body.innerHTML=h;
  body.querySelectorAll('.tabs a').forEach(a=>a.onclick=()=>{S._esp=a.dataset.e;selSub(i);});
  const lerForm=()=>{
    const pa=$('#aPrim');if(pa&&!pa.disabled){const n=Math.max(1,Math.floor(+pa.value||1));s.primeiro_auto=s.primeiro_auto||{};s.primeiro_auto[esp]=n;s.proximo_auto[esp]=n;}
    s.fonte_precos[esp]=body.querySelector('input[name=fonte]:checked')?.value||'ORCAMENTO';
    body.querySelectorAll('.aQtd').forEach(inp=>{const it=inp.dataset.item;s.qtds[it]=s.qtds[it]||{};s.qtds[it][esp]=inp.value===''?0:+inp.value;});
    s.artigos[esp]=[...body.querySelectorAll('.aSel:checked')].map(x=>x.dataset.item);
    body.querySelectorAll('.aPreco').forEach(inp=>{const it=inp.dataset.item;const v=inp.value===''?null:+inp.value;s.precos[it]=s.precos[it]||{};if(v==null)delete s.precos[it][esp];else s.precos[it][esp]=v;if(!Object.keys(s.precos[it]).length)delete s.precos[it];});};
  $('#bGuardarSub').onclick=async()=>{lerForm();await guardarObra();toast('Adjudicação guardada','ok');
    if((s.primeiro_auto?.[esp]||1)>1&&!temEmitidos(s,esp)&&!s.acum_inicial?.[esp])acumInicialUI(i,esp,()=>viewSubempreitadas());else viewSubempreitadas();};
  if($('#bAcum'))$('#bAcum').onclick=()=>{lerForm();acumInicialUI(i,esp,()=>selSub(i));};
  $('#bTodos').onclick=()=>{body.querySelectorAll('.aSel').forEach(c=>{const a=artigoPorItem(c.dataset.item);c.checked=!a||(a.custo_sub[esp]>0);});};
  $('#bNenhum').onclick=()=>body.querySelectorAll('.aSel').forEach(c=>c.checked=false);
  $('#bRepor').onclick=()=>{const f=body.querySelector('input[name=fonte]:checked')?.value||'ORCAMENTO';body.querySelectorAll('.aPreco').forEach(inp=>{const a=artigoPorItem(inp.dataset.item);if(a){const p=precoFonte(a,esp,f);inp.value=p!=null?p:'';}});toast('Preços preenchidos a partir de: '+(f==='TABELA'?'Tabela de preços':'Orçamento')+' — Guardar para confirmar');};
  $('#bFora').onclick=()=>{
    const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Artigo fora do orçamento</h3><p class="hint">Entra nos Autos deste subempreiteiro e aparece ao Controller como "NÃO EXISTE NO ORÇAMENTO IMPORTADO". Se mais tarde vier no orçamento (mesmo código), passa a contratual.</p>
      <div class="row"><label><span>Código (Item)</span><input id="fItem" class="short" placeholder="NOVO-01"></label><label><span>Ref. cliente</span><input id="fRef" class="short"></label><label><span>Uni</span><input id="fUni" class="short" value="M2"></label><label><span>Qtd prevista</span><input id="fQtd" type="number" step="0.01" value="0"></label></div>
      <div class="row"><label style="flex:1"><span>Descrição</span><input id="fDesc" style="width:100%"></label></div>
      <div class="row">${s.especialidades.map(e=>`<label><span>Preço ${e}</span><input type="number" step="0.01" class="fP" data-e="${e}" ${e===esp?'value="0"':''}></label>`).join('')}</div>
      <div class="right"><button class="sec" id="fCancel">Cancelar</button><button id="fOk">Adicionar</button></div>`;
    dlg.showModal();$('#fCancel').onclick=()=>dlg.close();
    $('#fOk').onclick=async()=>{const item=$('#fItem').value.trim().toUpperCase(),desc=$('#fDesc').value.trim().toUpperCase();
      if(!item||!desc)return toast('Código e descrição obrigatórios','warn');
      if(artigoPorItem(item)||(s.fora_orcamento||[]).find(f=>f.item===item))return toast('Esse código já existe','err');
      const esps=[],pre={};dlg.querySelectorAll('.fP').forEach(inp=>{if(inp.value!==''){esps.push(inp.dataset.e);pre[inp.dataset.e]=+inp.value;}});
      if(!esps.length)return toast('Indica o preço em pelo menos uma especialidade','warn');
      lerForm();s.fora_orcamento=s.fora_orcamento||[];s.fora_orcamento.push({item,ref_cliente:$('#fRef').value.trim(),descricao:desc,uni:$('#fUni').value.trim().toUpperCase(),qtd:+$('#fQtd').value||0,especialidades:esps,origem:'AUTO',criado_em:hoje()});
      s.precos[item]=pre;for(const e of esps){s.artigos[e]=s.artigos[e]||[];if(!s.artigos[e].includes(item))s.artigos[e].push(item);}
      await guardarObra();dlg.close();toast('Artigo adicionado','ok');selSub(i);};
  };
}

/* =========================================================
   Fase 2 — Autos: gerar xlsx, emitir, transporte, substitutivo
   ========================================================= */
const COL_LIVRE=15;                // O = 1.ª coluna livre
const LINHA_1=17;                  // 1.ª linha de artigos
const RE_AUTO=/^(.+)_(MONTAGEM|MASSAS|PAVIMENTOS)_(\d{3})(S?)\.(xlsx|json)$/;
function colL(n){let s='';while(n>0){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26);}return s;}
function colN(s){let n=0;for(const c of s)n=n*26+(c.charCodeAt(0)-64);return n;}
function pad3(n){return String(n).padStart(3,'0');}
function nomeAuto(sub,esp,n,S){return `${sub}_${esp}_${pad3(n)}${S?'S':''}`;}
function ymd(d){return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');}
function periodoDe(dataStr,diaFecho){const [y,m,d]=dataStr.split('-').map(Number);let yy=y,mm=m;if(d>diaFecho){mm++;if(mm>12){mm=1;yy++;}}return `${yy}-${String(mm).padStart(2,'0')}`;}
function proximoFecho(diaFecho){const t=new Date();let y=t.getFullYear(),m=t.getMonth();if(t.getDate()>diaFecho){m++;if(m>11){m=0;y++;}}const ult=new Date(Date.UTC(y,m+1,0)).getUTCDate();return new Date(Date.UTC(y,m,Math.min(diaFecho,ult)));}
async function sha256(buf){const h=await crypto.subtle.digest('SHA-256',buf);return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('');}

/* ---------- reescrita de referências (validada na Fase 0) ---------- */
function remapFormula(f, mapa, opts={}){
  const fixas=opts.fixas||(()=>false);const removidas=opts.removidas||new Set();
  const erros=[], outras=[];let out='', i=0, inStr=false;
  const re=/((?:'[^']+'|[A-Za-z0-9_\.]+)!)?(\$?)([A-Z]{1,3})(\$?)(\d+)(?![\d(])/y;
  while(i<f.length){
    const ch=f[i];
    if(ch==='"'){inStr=!inStr;out+=ch;i++;continue;}
    if(inStr){out+=ch;i++;continue;}
    re.lastIndex=i;const m=re.exec(f);
    if(m && !/[A-Za-z0-9_]/.test(f[i-1]||'')){
      const [all,sheet,dc,colS,dr,rowS]=m;const row=+rowS;
      if(sheet){const nm=sheet.replace(/!$/,'').replace(/^'|'$/g,'');
        if(opts.folhaAlvo&&nm.toUpperCase()===opts.folhaAlvo){ // referência explícita à folha AUTO a partir de outra folha
          if(fixas(row)||!(row in mapa)){out+=all;i+=all.length;continue;}
          if(removidas.has(row)){erros.push(all);out+=all;i+=all.length;continue;}
          out+=`${sheet}${dc}${colS}${dr}${mapa[row]}`;i+=all.length;continue;}
        if(opts.soFolhaAlvo){out+=all;i+=all.length;continue;}
        outras.push(all);out+=all;i+=all.length;continue;}
      if(opts.soFolhaAlvo){out+=all;i+=all.length;continue;}  // noutra folha, refs sem prefixo são locais: não mexer
      if(fixas(row)){out+=all;i+=all.length;continue;}
      if(removidas.has(row)){erros.push(all);out+=all;i+=all.length;continue;}
      if(!(row in mapa)){out+=all;i+=all.length;continue;}
      out+=`${dc}${colS}${dr}${mapa[row]}`;i+=all.length;continue;
    }
    out+=ch;i++;
  }
  return {formula:out,erros,outras};
}

/* ---------- inventário da pasta autos\ ---------- */
async function autosDir(){return await S.obraDir.getDirectoryHandle('autos',{create:true});}
async function listarAutos(){
  if(S.memAutos){S.autos=S.memAutos;return S.autos;}
  const dir=await autosDir();const map={};
  for await(const [name,h] of dir.entries()){
    const m=name.match(RE_AUTO);if(!m||h.kind!=='file')continue;
    const id=`${m[1]}_${m[2]}_${m[3]}${m[4]}`;map[id]=map[id]||{id,sub:m[1],esp:m[2],numero:+m[3],S:!!m[4],xlsx:null,json:null};
    if(m[5]==='xlsx')map[id].xlsx=h;else map[id].json=h;
  }
  const out=[];
  for(const a of Object.values(map)){
    if(a.json){const f=await a.json.getFile();a.dados=JSON.parse(await f.text());a.estado='EMITIDO';}
    else if(a.xlsx){a.estado='RASCUNHO';}
    else continue;
    out.push(a);
  }
  // substituído: existe json de <id>S
  for(const a of out)if(!a.S&&a.estado==='EMITIDO'&&out.find(b=>b.S&&b.json&&b.sub===a.sub&&b.esp===a.esp&&b.numero===a.numero))a.estado='SUBSTITUIDO';
  out.sort((a,b)=>a.sub.localeCompare(b.sub)||a.esp.localeCompare(b.esp)||a.numero-b.numero||(a.S?1:-1));
  S.autos=out;return out;
}
function serie(sub,esp){return (S.autos||[]).filter(a=>a.sub===sub&&a.esp===esp);}
function ultimoEmitido(sub,esp){const v=serie(sub,esp).filter(a=>a.estado==='EMITIDO');return v.length?v[v.length-1]:null;}
function rascunho(sub,esp){return serie(sub,esp).find(a=>a.estado==='RASCUNHO')||null;}

/* ---------- linhas de um Auto (artigos da série, com separadores de capítulo) ---------- */
function linhasSerie(s,esp){
  const caps=Object.fromEntries((S.orc?.capitulos||[]).map(c=>[c.item,c]));
  const sel=new Set(s.artigos[esp]||[]);const out=[];let lastCap=null;
  for(const a of (S.orc?.artigos||[])){
    if(!sel.has(a.item))continue;
    if(a.capitulo!==lastCap&&caps[a.capitulo]){out.push({cap:true,item:a.capitulo,descricao:caps[a.capitulo].descricao});lastCap=a.capitulo;}
    out.push({item:a.item,ref:a.ref_cliente,descricao:a.descricao,descricao_completa:a.descricao_completa||'',uni:a.uni,qtd:s.qtds?.[a.item]?.[esp]??a.qtd,qtd_orc:a.qtd,preco:s.precos[a.item]?.[esp]??0,custo_orc:a.custo_sub?.[esp]??0,origem:'ORCAMENTO',removido:a.estado!=='ATIVO'});
  }
  const fora=(s.fora_orcamento||[]).filter(f=>(f.especialidades||[]).includes(esp)&&sel.has(f.item));
  if(fora.length){out.push({cap:true,item:'#FORA',descricao:'ARTIGOS FORA DO ORÇAMENTO'});
    for(const f of fora)out.push({item:f.item,ref:f.ref_cliente||'',descricao:f.descricao,uni:f.uni,qtd:s.qtds?.[f.item]?.[esp]??f.qtd??0,qtd_orc:0,preco:s.precos[f.item]?.[esp]??0,custo_orc:0,origem:f.contratual_desde?'ORCAMENTO':'AUTO',removido:false});}
  return out;
}

/* ---------- gerar xlsx ---------- */
async function gerarAutoXlsx({s,esp,numero,S:subst,anterior,base,data,srcXlsx}){
  // anterior: json do último emitido da série (acumulado + transporte). base: json do Auto a substituir (transporte), se S.
  const o=S.obra;const linhas=linhasSerie(s,esp);
  const wb=new ExcelJS.Workbook();wb.creator='Consola de Autos '+VERSAO;
  const ws=wb.addWorksheet('AUTO',{views:[{state:'frozen',xSplit:3,ySplit:16}]});
  const B={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}};
  const F=c=>({type:'pattern',pattern:'solid',fgColor:{argb:c}});
  const fillH=F('FF1F4E78'),fillJ=F('FFFFF2CC'),fillCap=F('FFD9D9D9'),fillTot=F('FFBDD7EE');
  const id=nomeAuto(s.id,esp,numero,subst);
  ws.getCell('B2').value='AUTO DE SUBEMPREITEIRO';ws.getCell('B2').font={bold:true,size:14};
  ws.getCell('B3').value=subst?`SUBSTITUTIVO do Auto n.º ${numero} — anula o anterior`:'';ws.getCell('B3').font={bold:true,color:{argb:'FFC00000'}};
  const kv=[['Obra:',`${o.obra.numero} - ${o.obra.nome}`],['Subempreiteiro:',s.nome],['Especialidade:',esp],['Auto n.º:',numero+(subst?' (substitutivo)':'')]];
  kv.forEach(([k,v],i)=>{ws.getCell(4+i,2).value=k;ws.getCell(4+i,2).font={bold:true};ws.getCell(4+i,3).value=v;});
  ws.getCell('B8').value='Data do Auto:';ws.getCell('B8').font={bold:true};
  const dataIni=new Date(data+'T00:00:00Z');
  ws.getCell('C8').value=dataIni;ws.getCell('C8').numFmt='dd/mm/yyyy';ws.getCell('C8').border=B;
  ws.getCell('B9').value='Período:';ws.getCell('B9').font={bold:true};ws.getCell('C9').value=periodoDe(data,o.obra.dia_fecho);
  ws.getCell('D8').value='(data e período definidos na consola)';ws.getCell('D8').font={italic:true,color:{argb:'FF5F6B7A'}};
  ws.getCell('B11').value='Preencha a coluna J (EXECUTADO NO MÊS) — valor, ou fórmula para as suas colunas de medição à direita de N (ex.: =SUM(colunas Auto)-H18 se medir por % acumulada). Grave no Excel antes de emitir na consola.';
  ws.getCell('B11').font={italic:true,color:{argb:'FF5F6B7A'}};
  ws.getCell('A1').value=id;ws.getCell('A2').value='CONSOLA_AUTOS';ws.getCell('A3').value=VERSAO;
  const H=['chave','REF.','DESCRIÇÃO','UNI','QTD ADJ.','PREÇO','TOTAL ADJ.','ACUM. ANTERIOR','VALOR ANTERIOR','EXECUTADO NO MÊS','ACUMULADO','VALOR MÊS','SALDO','% EXEC.'];
  H.forEach((h,i)=>{const c=ws.getCell(16,i+1);c.value=h;c.font={bold:true,color:{argb:'FFFFFFFF'}};c.fill=fillH;c.alignment={horizontal:'center',vertical:'middle',wrapText:true};c.border=B;});
  ws.getRow(16).height=30;
  [0,8,46,6,11,9,12,12,12,15,11,12,11,9].forEach((w,i)=>{ws.getColumn(i+1).width=w||8;});
  ws.getColumn(1).hidden=true;
  // transporte: mapa linha antiga -> nova por item
  const src=base||anterior;const antRows={};if(src)for(const l of src.linhas)antRows[l.item]=l;
  let prevWb=null,prevWs=null;
  if(srcXlsx){try{const f=await srcXlsx.getFile();prevWb=new ExcelJS.Workbook();await prevWb.xlsx.load(await f.arrayBuffer());prevWs=prevWb.getWorksheet('AUTO')||null;}catch(e){console.warn('xlsx anterior ilegível, transporte a partir do JSON',e);prevWb=null;prevWs=null;}}
  const prevRow=src?Object.fromEntries(src.linhas.map(l=>[l.item,l.linha])):{};
  const acum={};if(anterior)for(const l of anterior.linhas)acum[l.item]=l.real||0;
  const inicial=!anterior&&numero>1;   // 1.º Auto da série na consola com Autos anteriores fora dela: H vem dos acumulados introduzidos na consola
  if(inicial){const ai=s.acum_inicial?.[esp]||{};for(const [k,v] of Object.entries(ai))acum[k]=v;
    ws.getCell('B12').value=`AUTO INICIAL n.º ${numero}: a coluna H (ACUM. ANTERIOR) traz os acumulados dos Autos 1 a ${numero-1} introduzidos na consola.`;ws.getCell('B12').font={bold:true,color:{argb:'FFC00000'}};}
  let r=LINHA_1;const mapa={};const novas={};
  for(const l of linhas){if(!l.cap){novas[l.item]=r;if(prevRow[l.item])mapa[prevRow[l.item]]=r;}r++;}
  // artigos que existiam no anterior e já não existem → linhas removidas
  const removidas=new Set();if(src)for(const l of src.linhas)if(!(l.item in novas))removidas.add(l.linha);
  const avisosGer=[];const fixas=rr=>rr<LINHA_1;
  r=LINHA_1;
  for(const l of linhas){
    if(l.cap){ws.getCell(r,1).value='#'+l.item;ws.getCell(r,2).value=l.item.startsWith('#')?'':l.item;ws.getCell(r,3).value=l.descricao;
      for(let c=1;c<=14;c++){const cell=ws.getCell(r,c);cell.fill=fillCap;cell.font={bold:true};cell.border=B;}r++;continue;}
    ws.getCell(r,1).value=l.item;ws.getCell(r,2).value=l.ref;ws.getCell(r,3).value=l.descricao+(l.origem==='AUTO'?'  [FORA DO ORÇAMENTO]':'')+(l.removido?'  [REMOVIDO DO ORÇAMENTO]':'');
    ws.getCell(r,4).value=l.uni;ws.getCell(r,5).value=l.qtd;ws.getCell(r,6).value=l.preco;
    ws.getCell(r,7).value={formula:`E${r}*F${r}`};ws.getCell(r,8).value=r2(acum[l.item]||0);ws.getCell(r,9).value={formula:`H${r}*F${r}`};
    const J=ws.getCell(r,10);J.fill=fillJ;J.protection={locked:false};
    const ant=antRows[l.item];
    if(ant&&ant.mes_formula){const rm=remapFormula(ant.mes_formula,mapa,{fixas,removidas});J.value={formula:rm.formula.replace(/^=/,'')};if(rm.erros.length)avisosGer.push(`J${r} (${l.item}): referência a linha removida ${rm.erros.join(',')}`);}
    else if(base&&ant&&ant.mes!=null)J.value=ant.mes;   // substitutivo: parte dos valores do original
    ws.getCell(r,11).value={formula:`H${r}+J${r}`};ws.getCell(r,12).value={formula:`J${r}*F${r}`};ws.getCell(r,13).value={formula:`E${r}-K${r}`};ws.getCell(r,14).value={formula:`IF(E${r}=0,0,K${r}/E${r})`};
    for(let c=1;c<=14;c++){const cell=ws.getCell(r,c);cell.border=B;if([5,8,10,11,13].includes(c))cell.numFmt='#,##0.00';if([6,7,9,12].includes(c))cell.numFmt='#,##0.00 €';if(c===14)cell.numFmt='0.0%';}
    if(l.origem==='AUTO')ws.getCell(r,3).font={color:{argb:'FF9A6700'}};
    if(l.removido)ws.getCell(r,3).font={color:{argb:'FFB42318'}};
    // zona livre transportada (a partir do JSON só quando não há xlsx anterior)
    if(!prevWs&&ant&&ant.livre)for(const c of ant.livre){const cell=ws.getCell(r,colN(c.col));cell.protection={locked:false};
      if(c.f){const rm=remapFormula(c.f,mapa,{fixas,removidas});cell.value={formula:rm.formula.replace(/^=/,'')};if(rm.erros.length)avisosGer.push(`${c.col}${r} (${l.item}): referência a linha removida ${rm.erros.join(',')}`);}
      else cell.value=c.v;
      if(c.fmt)cell.numFmt=c.fmt;}
    r++;
  }
  const rTot=r;
  ws.getCell(rTot,3).value='TOTAIS';
  [7,9,12].forEach(c=>{const L=colL(c);ws.getCell(rTot,c).value={formula:`SUM(${L}${LINHA_1}:${L}${rTot-1})`};ws.getCell(rTot,c).numFmt='#,##0.00 €';});
  for(let c=1;c<=14;c++){const cell=ws.getCell(rTot,c);cell.border=B;cell.fill=fillTot;cell.font={bold:true};}
  const rTotPrev=prevWs?(()=>{for(let rr=LINHA_1;rr<=prevWs.rowCount+1;rr++){const k=String(cv(prevWs.getCell(rr,1))??'');if(!k&&String(cv(prevWs.getCell(rr,3))??'').trim()==='TOTAIS')return rr;}return null;})():null;
  if(rTotPrev)mapa[rTotPrev]=rTot;
  if(prevWs){ // mapa completo pela chave da coluna A: artigos e linhas de capítulo; linhas abaixo dos totais seguem o deslocamento
    const novasKey={};{let rr=LINHA_1;for(const l of linhas){novasKey[l.cap?'#'+l.item:l.item]=rr;rr++;}}
    for(let rr=LINHA_1;rr<=prevWs.rowCount;rr++){if(rTotPrev&&rr>rTotPrev){mapa[rr]=rTot+(rr-rTotPrev);continue;}
      const k=String(cv(prevWs.getCell(rr,1))??'');if(k&&novasKey[k]!=null)mapa[rr]=novasKey[k];else if(k&&!(rr in mapa))removidas.add(rr);}}
  if(prevWs)copiarZonaLivre(prevWs,ws,mapa,{fixas,removidas,rTotPrev,rTot,avisos:avisosGer});
  // cabeçalhos livres e larguras (fallback JSON)
  if(src&&!prevWs){for(const c of (src.cabecalhos_livres||[])){const cell=ws.getCell(c.ref);cell.protection={locked:false};if(c.f)cell.value={formula:c.f.replace(/^=/,'')};else cell.value=c.v;if(c.fmt)cell.numFmt=c.fmt;if(c.bold)cell.font={bold:true};}
    for(const c of (src.colunas_livres||[]))ws.getColumn(colN(c.col)).width=c.width;}
  // células livres: desbloquear toda a zona à direita de N nas linhas 1..rTot (as não escritas ficam desbloqueadas por defeito? não — em folha protegida tudo é bloqueado por defeito)
  const maxCol=Math.max(COL_LIVRE+65,...(src?[...(src.colunas_livres||[]).map(c=>colN(c.col)+5)]:[0]));
  for(let rr=1;rr<=rTot+40;rr++)for(let c=COL_LIVRE;c<=maxCol;c++){const cell=ws.getCell(rr,c);if(cell.protection?.locked!==false)cell.protection={locked:false};}
  ws.getCell(13,COL_LIVRE).value=ws.getCell(13,COL_LIVRE).value||'ZONA LIVRE — medições do DO (não é lida pelo Controller)';ws.getCell(13,COL_LIVRE).font={italic:true,color:{argb:'FF5F6B7A'}};
  ws.pageSetup={printArea:`A1:N${rTot}`,orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0};
  await ws.protect('',{selectLockedCells:true,selectUnlockedCells:true,formatCells:true,formatColumns:true,formatRows:true,insertRows:false,deleteRows:false,insertColumns:false,deleteColumns:false,sort:false,autoFilter:false});
  // folhas auxiliares do Auto anterior: copiadas por inteiro
  let folhas=0;if(prevWb)for(const pws of prevWb.worksheets){if(pws.name==='AUTO')continue;copiarFolha(pws,wb,{mapa,fixas,removidas,avisos:avisosGer});folhas++;}
  const buf=await wb.xlsx.writeBuffer();
  const dir=await autosDir();const fh=await dir.getFileHandle(id+'.xlsx',{create:true});const w=await fh.createWritable();await w.write(buf);await w.close();
  return {id,avisos:avisosGer,nLinhas:Object.keys(novas).length,folhas,deXlsx:!!prevWs};
}
/* ---------- cópia de células com estilo ---------- */
function copiarCelula(src,dst,remap){
  const f=src.formula;
  if(f){const rm=remap?remap('='+f):{formula:'='+f,erros:[]};dst.value={formula:rm.formula.replace(/^=/,''),result:src.result};if(rm.erros?.length&&remap.avisos)remap.avisos.push(`${dst.worksheet.name}!${dst.address}: referência a linha removida ${rm.erros.join(',')}`);}
  else{let v=src.value;if(v&&typeof v==='object'&&!(v instanceof Date)){if('richText' in v)v={richText:v.richText};else if('hyperlink' in v)v={text:v.text,hyperlink:v.hyperlink};else if('error' in v)v=null;}dst.value=v;}
  try{dst.style=JSON.parse(JSON.stringify(src.style||{}));}catch(e){}
}
function copiarZonaLivre(prevWs,ws,mapa,o){
  const remapAuto=(f)=>remapFormula(f,mapa,{fixas:o.fixas,removidas:o.removidas});remapAuto.avisos=o.avisos;
  const rowMap=r=>r<LINHA_1?r:(r in mapa?mapa[r]:null);
  let maxC=COL_LIVRE;
  prevWs.eachRow({includeEmpty:false},(row,r)=>{const nr=rowMap(r);if(nr==null)return;
    row.eachCell({includeEmpty:false},(cell,c)=>{if(c<COL_LIVRE)return;maxC=Math.max(maxC,c);const d=ws.getCell(nr,c);copiarCelula(cell,d,remapAuto);d.protection={locked:false};});
    if(row.height&&r>=LINHA_1)ws.getRow(nr).height=row.height;});
  for(let c=COL_LIVRE;c<=Math.max(maxC,prevWs.columnCount);c++){const pc=prevWs.getColumn(c);if(pc.width)ws.getColumn(c).width=pc.width;if(pc.hidden)ws.getColumn(c).hidden=true;}
  for(const m of (prevWs.model.merges||[])){const [a,b]=m.split(':');const ma=a.match(/^([A-Z]+)(\d+)$/),mb=b.match(/^([A-Z]+)(\d+)$/);if(!ma||!mb)continue;
    if(colN(ma[1])<COL_LIVRE)continue;const r1=rowMap(+ma[2]),r2_=rowMap(+mb[2]);if(r1==null||r2_==null)continue;try{ws.mergeCells(`${ma[1]}${r1}:${mb[1]}${r2_}`);}catch(e){}}
}
function copiarFolha(pws,wb,o){
  const ws=wb.addWorksheet(pws.name,{properties:JSON.parse(JSON.stringify(pws.properties||{})),views:JSON.parse(JSON.stringify(pws.views||[]))});
  const remap=(f)=>remapFormula(f,o.mapa,{fixas:o.fixas,removidas:o.removidas,folhaAlvo:'AUTO',soFolhaAlvo:true});remap.avisos=o.avisos;
  pws.eachRow({includeEmpty:false},(row,r)=>{row.eachCell({includeEmpty:false},(cell,c)=>{copiarCelula(cell,ws.getCell(r,c),remap);});if(row.height)ws.getRow(r).height=row.height;});
  for(let c=1;c<=pws.columnCount;c++){const pc=pws.getColumn(c);if(pc.width)ws.getColumn(c).width=pc.width;if(pc.hidden)ws.getColumn(c).hidden=true;}
  for(const m of (pws.model.merges||[])){try{ws.mergeCells(m);}catch(e){}}
  if(pws.pageSetup)ws.pageSetup=JSON.parse(JSON.stringify(pws.pageSetup));
  return ws;
}

/* ---------- ler xlsx e validar ---------- */
function cv(cell){if(cell.formula)return cell.result;const v=cell.value;if(v&&typeof v==='object'&&!(v instanceof Date)){if('richText' in v)return v.richText.map(t=>t.text).join('');if('error' in v)return v.error;}return v;}
function cf(cell){const f=cell.formula;return f?'='+f:null;}
function isNum(x){return typeof x==='number'&&isFinite(x);}
async function lerAutoXlsx(a){
  const s=S.obra.subempreiteiros.find(x=>x.id===a.sub);if(!s)throw new Error('Subempreiteiro não existe em obra.json: '+a.sub);
  const file=await a.xlsx.getFile();const buf=await file.arrayBuffer();
  const wb=new ExcelJS.Workbook();await wb.xlsx.load(buf);const ws=wb.getWorksheet('AUTO');
  const bloq=[],avisos=[];
  if(!ws){bloq.push('A folha AUTO não existe.');return {bloq,avisos};}
  if(String(cv(ws.getCell('A1')))!==a.id)bloq.push(`Chave do ficheiro (${cv(ws.getCell('A1'))}) não corresponde a ${a.id}.`);
  // data
  let d=cv(ws.getCell('C8'));let dataStr=null;
  if(d instanceof Date)dataStr=ymd(d);else if(isNum(d)){const dt=new Date(Math.round((d-25569)*86400000));dataStr=ymd(dt);}
  else if(typeof d==='string'&&/^\d{1,2}[\/.-]\d{1,2}[\/.-]\d{4}$/.test(d.trim())){const [dd,mm,yy]=d.trim().split(/[\/.-]/).map(Number);dataStr=`${yy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;}
  if(!dataStr)bloq.push('Data do Auto (C8) inválida ou vazia.');
  const periodo=dataStr?periodoDe(dataStr,S.obra.obra.dia_fecho):null;
  // série
  const emitidos=serie(a.sub,a.esp).filter(x=>x.estado==='EMITIDO');
  const anterior=a.S?emitidos.filter(x=>x.numero<a.numero).pop()||null:(emitidos.length?emitidos[emitidos.length-1]:null);
  const original=a.S?serie(a.sub,a.esp).find(x=>!x.S&&x.numero===a.numero&&x.json):null;
  if(a.S){if(!original)bloq.push(`Não existe o Auto ${a.numero} emitido para substituir.`);
    if(emitidos.some(x=>x.numero>a.numero))bloq.push('Só o último Auto emitido da série pode ser substituído.');}
  else{const esperado=(s.proximo_auto?.[a.esp])||1;if(a.numero!==esperado)bloq.push(`Número de sequência: esperado ${esperado}, ficheiro é ${a.numero}.`);}
  if(dataStr&&anterior&&dataStr<=anterior.dados.data_auto)bloq.push(`Data ${dataStr} não é posterior à do Auto anterior (${anterior.dados.data_auto}).`);
  if(periodo&&!a.S&&emitidos.some(x=>x.dados.periodo===periodo))bloq.push(`Já existe um Auto emitido para o período ${periodo} nesta série (use substitutivo).`);
  // linhas
  const esperadas=linhasSerie(s,a.esp).filter(l=>!l.cap);const espMap=Object.fromEntries(esperadas.map(l=>[l.item,l]));
  const acumAnt={};if(anterior)for(const l of anterior.dados.linhas)acumAnt[l.item]=l.real||0;
  const inicial=!anterior&&a.numero>1;if(inicial){avisos.push('AUTO_INICIAL_ACUMULADO_MANUAL');for(const [k,v] of Object.entries(s.acum_inicial?.[a.esp]||{}))acumAnt[k]=v;}
  const linhas=[];let semCache=0,r=LINHA_1,vistos=new Set(),estrut=0,real0=0,rTot=null;
  for(;r<=ws.rowCount+1;r++){
    const key=String(cv(ws.getCell(r,1))??'');
    if(!key){if(String(cv(ws.getCell(r,3))??'').trim()==='TOTAIS'){rTot=r;break;}if(r>ws.rowCount)break;continue;}
    if(key.startsWith('#'))continue;
    const e=espMap[key];if(!e){bloq.push(`Linha ${r}: artigo ${key} não pertence a esta série.`);continue;}
    vistos.add(key);
    const E=cv(ws.getCell(r,5)),F=cv(ws.getCell(r,6)),Hc=cv(ws.getCell(r,8));
    if(Math.abs((E||0)-e.qtd)>1e-6||Math.abs((F||0)-e.preco)>1e-6)estrut++;
    if(cf(ws.getCell(r,11))!==`=H${r}+J${r}`||cf(ws.getCell(r,12))!==`=J${r}*F${r}`||cf(ws.getCell(r,13))!==`=E${r}-K${r}`)estrut++;
    const Jcell=ws.getCell(r,10);let J=cv(Jcell);const Jf=cf(Jcell);
    if(Jf&&(J===undefined||J===null)){semCache++;J=0;}
    if(J==null||J==='')J=0;
    if(!isNum(J)){bloq.push(`Linha ${r} (${key}): EXECUTADO NO MÊS não é um número (${JSON.stringify(J)}).`);J=0;}
    const K=cv(ws.getCell(r,11));
    if(!isNum(K))semCache++;else if(Math.abs(K-((Hc||0)+J))>0.005)bloq.push(`Linha ${r} (${key}): ACUMULADO guardado (${K}) ≠ ANTERIOR + MÊS (${r2((Hc||0)+J)}). Recalcule e grave no Excel.`);
    const acumEsperado=r2(acumAnt[key]||0);
    if(Math.abs((Hc||0)-acumEsperado)>0.005)bloq.push(`Linha ${r} (${key}): acumulado anterior ${Hc} ≠ registo ${acumEsperado}.`);
    const mes=r2(J);const real=r2(acumEsperado+J);const lav=[];
    if(real>e.qtd+1e-6)lav.push('ACUMULADO_ACIMA_ADJUDICADO');
    if(mes<-0.005)lav.push('MES_NEGATIVO');
    if(e.preco>e.custo_orc+1e-9&&e.custo_orc>0)lav.push('PRECO_ACIMA_ORCAMENTO');
    if(e.origem==='AUTO')lav.push('FORA_DO_ORCAMENTO');
    if(e.removido)lav.push('REMOVIDO_DO_ORCAMENTO');
    if(mes===0)real0++;
    // zona livre
    const livre=[];ws.getRow(r).eachCell({includeEmpty:false},(cell,cn)=>{if(cn<COL_LIVRE)return;const f=cf(cell);const v=f?cell.result:cv(cell);if(f==null&&(v==null||v===''))return;livre.push({col:colL(cn),f,v:(v instanceof Date)?ymd(v):(v&&typeof v==='object'?String(v):v),fmt:(cell.numFmt&&cell.numFmt!=='General')?cell.numFmt:null});});
    if(anterior&&!a.S&&livre.length===0&&mes===0&&!(key in acumAnt))lav.push('ARTIGO_NOVO_SEM_MEDICAO');
    linhas.push({item:key,origem:e.origem,ref_cliente:e.ref,descricao:e.descricao,uni:e.uni,qtd_adjudicada:e.qtd,qtd_orcamento:e.qtd_orc,preco:e.preco,custo_orcamento:e.custo_orc,
      acum_anterior:acumEsperado,real,mes,valor_mes:r2(mes*e.preco),valor_acumulado:r2(real*e.preco),mes_formula:Jf,linha:r,livre,avisos:lav});
    for(const x of lav)avisos.push(`${key}: ${x}`);
  }
  for(const e of esperadas)if(!vistos.has(e.item))bloq.push(`Artigo ${e.item} falta no ficheiro (estrutura alterada).`);
  if(estrut)bloq.push(`${estrut} célula(s) da estrutura bloqueada foram alteradas (quantidades, preços ou fórmulas K/L/M).`);
  if(semCache)bloq.push(`${semCache} fórmula(s) sem valor calculado — abra e grave o ficheiro no Excel.`);
  if(linhas.length&&real0===linhas.length)avisos.push('TODAS_AS_LINHAS_A_ZERO');
  // cabeçalhos livres (linhas 1..16) e larguras
  const cab=[];for(let rr=1;rr<LINHA_1;rr++)ws.getRow(rr).eachCell({includeEmpty:false},(cell,cn)=>{if(cn<COL_LIVRE)return;const f=cf(cell);const v=f?cell.result:cv(cell);if(f==null&&(v==null||v===''))return;cab.push({ref:cell.address,f,v:(v instanceof Date)?ymd(v):v,fmt:(cell.numFmt&&cell.numFmt!=='General')?cell.numFmt:null,bold:!!cell.font?.bold});});
  const colsL=[];for(let c=COL_LIVRE;c<=Math.max(ws.columnCount,COL_LIVRE);c++){const w=ws.getColumn(c).width;if(w)colsL.push({col:colL(c),width:w});}
  const totais={valor_anterior:r2(linhas.reduce((t,l)=>t+l.acum_anterior*l.preco,0)),valor_mes:r2(linhas.reduce((t,l)=>t+l.valor_mes,0)),valor_acumulado:r2(linhas.reduce((t,l)=>t+l.valor_acumulado,0))};
  if(inicial&&s.acum_inicial_valor?.[a.esp]!=null)totais.valor_anterior_faturado=r2(s.acum_inicial_valor[a.esp]);
  const dados={versao:1,consola:VERSAO,id:a.id,obra:{numero:S.obra.obra.numero,nome:S.obra.obra.nome},sub:a.sub,sub_nome:s.nome,especialidade:a.esp,numero:a.numero,substitutivo_de:a.S?nomeAuto(a.sub,a.esp,a.numero,false):null,
    data_auto:dataStr,periodo,emitido_em:null,emitido_por:S.cfg?.nome||null,xlsx:{ficheiro:a.id+'.xlsx',sha256:await sha256(buf),tamanho:buf.byteLength},linhas,cabecalhos_livres:cab,colunas_livres:colsL,totais,avisos,estado:'EMITIDO'};
  return {bloq,avisos,dados};
}
async function emitirAuto(a,dados){
  dados.emitido_em=hoje();dados.emitido_por=S.cfg?.nome||null;
  const dir=await autosDir();await FS.writeJson(dir,a.id+'.json',dados);
  const s=S.obra.subempreiteiros.find(x=>x.id===a.sub);
  if(!a.S){s.proximo_auto=s.proximo_auto||{};s.proximo_auto[a.esp]=a.numero+1;await guardarObra();}
}

/* ---------- abrir no Excel ---------- */
function caminhoAuto(id){const base=S.cfg?.caminho;if(!base)return null;return `${base}\\${S.obraDir.name}\\autos\\${id}.xlsx`;}
function urlExcel_(p){
  // C:\\Users\\x\\a.xlsx → file:///C:/Users/x/a.xlsx ; \\\\servidor\\partilha\\a.xlsx → file://servidor/partilha/a.xlsx
  let f=String(p).replace(/\\/g,'/');
  if(!f.startsWith('//'))f='//'+(f.startsWith('/')?'':'/')+f;
  return 'ms-excel:ofe|u|file:'+encodeURI(f);
}
function abrirNoExcel(id){
  const p=caminhoAuto(id);
  if(!p){toast('Para abrir no Excel indica o caminho completo da pasta OBRAS em Configurações (ex.: C:\\Users\\nome\\Documents\\OBRAS)','warn');if(typeof go==='function')go('config');return;}
  const url=urlExcel_(p);
  if(p.length>216)toast('Caminho com '+p.length+' caracteres — o Excel só aceita até 216 por este método; se não abrir, usa ⧉ copiar caminho','warn');
  try{console.log('[autos] abrir no Excel →',url);}catch(e){}
  // dentro do CRM a consola corre num iframe: o pedido de protocolo externo é feito pela janela de topo
  // (mesma origem no GitHub Pages); se o browser recusar, tenta pela própria frame e, por fim, por janela nova
  let lancado=false;
  try{if(window.top&&window.top!==window){window.top.location.href=url;lancado=true;}}catch(e){console.warn('[autos] top.location recusado',e);}
  if(!lancado){try{const a=document.createElement('a');a.href=url;document.body.appendChild(a);a.click();a.remove();lancado=true;}catch(e){console.warn('[autos] anchor recusado',e);}}
  if(!lancado){try{window.open(url,'_blank');}catch(e){console.warn('[autos] window.open recusado',e);}}
  toast('A abrir '+id+'.xlsx no Excel — à primeira vez o browser pergunta se pode abrir o Excel: «Permitir sempre». Se nada acontecer, usa ⧉ copiar caminho.');
}
async function copiarCaminho(id){const p=caminhoAuto(id)||`${S.obraDir.name}\\autos\\${id}.xlsx`;try{await navigator.clipboard.writeText(p);toast('Caminho copiado: '+p,'ok');}catch(e){prompt('Caminho do ficheiro:',p);}}

/* ---------- Autos por série (usado em Subempreiteiros e Envios) ---------- */
function htmlAutosSerie(s,esp){
  const lst=serie(s.id,esp);const ras=rascunho(s.id,esp);const ult=ultimoEmitido(s.id,esp);const nArt=(s.artigos?.[esp]||[]).length;
  let h=`<div class="card"><div class="row" style="align-items:center;margin-bottom:6px"><b>${esp}</b><span class="tag">${nArt} artigos adjudicados</span>
    ${ras?`<span class="tag warn">rascunho ${ras.id} em curso</span>`
         :(nArt?`<button class="sm" data-novo="${s.id}|${esp}">Novo Auto n.º ${(s.proximo_auto?.[esp])||1}</button>${ult?`<button class="sec sm" data-subst="${ult.id}">Substitutivo do ${ult.numero}</button>`:''}`
               :`<span class="hint">sem artigos adjudicados nesta especialidade — faça a adjudicação em Subempreitadas antes de criar Autos</span>`)}</div>`;
  if(lst.length){h+=`<table><thead><tr><th>Auto</th><th>Estado</th><th>Data</th><th>Período</th><th class="num">Valor mês</th><th class="num">Acumulado</th><th>Avisos</th><th>Emitido em</th><th></th></tr></thead><tbody>`;
    for(const a of lst){const d=a.dados;
      h+=`<tr class="${a.estado==='SUBSTITUIDO'?'rem':''}"><td>${a.id}</td><td><span class="tag ${a.estado==='EMITIDO'?'ok':a.estado==='RASCUNHO'?'warn':''}">${a.estado}</span></td>
        <td>${d?d.data_auto:''}</td><td>${d?d.periodo:''}</td><td class="num">${d?eur(d.totais.valor_mes):''}</td><td class="num">${d?eur(d.totais.valor_acumulado):''}</td>
        <td>${d&&d.avisos.length?`<span class="tag warn">${d.avisos.length}</span>`:''}</td><td>${d?new Date(d.emitido_em).toLocaleString('pt-PT'):''}</td>
        <td style="white-space:nowrap"><button class="sec sm" data-open="${a.id}">Excel</button><button class="sec sm" data-copy="${a.id}" title="copiar caminho">⧉</button>${d?`<button class="sec sm" data-ver="${a.id}">ver</button>`:`<button class="sm" data-emit="${a.id}">Emitir</button><button class="sm danger" data-del="${a.id}">Apagar</button>`}</td></tr>`;}
    h+=`</tbody></table>`;}
  return h+'</div>';
}
function bindAutosActions(m){
  m.querySelectorAll('[data-novo]').forEach(b=>b.onclick=()=>novoAuto(...b.dataset.novo.split('|')));
  m.querySelectorAll('[data-subst]').forEach(b=>b.onclick=()=>novoSubstitutivo(b.dataset.subst));
  m.querySelectorAll('[data-emit]').forEach(b=>b.onclick=()=>emitirUI(b.dataset.emit));
  m.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm(`Apagar o rascunho ${b.dataset.del}.xlsx? As medições já escritas perdem‑se.`))return;(await autosDir()).removeEntry(b.dataset.del+'.xlsx');toast('Rascunho apagado');refreshAutos();});
  m.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>verAuto(b.dataset.ver));
  m.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>abrirNoExcel(b.dataset.open));
  m.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>copiarCaminho(b.dataset.copy));
}
// re-render do ecrã atual depois de criar/emitir/apagar
function refreshAutos(){if(S.view==='envios')viewEnvios();else viewSubs();}
const viewAutos=refreshAutos;
async function viewEnvios(){
  const m=$('#main');m.innerHTML='<h2>Envios</h2><div class="muted">a ler…</div>';await listarAutos();
  const o=S.obra;const pers=[...new Set(S.autos.filter(a=>a.dados).map(a=>a.dados.periodo))].sort();
  const porPer={};for(const a of S.autos)if(a.dados){const p=a.dados.periodo;porPer[p]=porPer[p]||{n:0,v:0};if(a.estado==='EMITIDO'){porPer[p].n++;porPer[p].v+=a.dados.totais.valor_mes;}}
  const ras=S.autos.filter(a=>a.estado==='RASCUNHO');
  let h=`<h2>Envios ao Controller</h2>
  <div class="card"><div class="row"><button id="bEnvio">Preparar envio ao Controller</button><span class="hint">Gera um ficheiro com a obra, o orçamento, as subempreitadas e todos os Autos emitidos (sem medições). Pode repetir‑se; a importação no Controller nunca duplica.</span></div>
    ${ras.length?`<div class="msg warn">${ras.length} rascunho(s) por emitir: ${ras.map(a=>a.id).join(', ')} — não entram no envio.</div>`:''}
    <div class="kv" style="margin-top:8px"><span>Último envio</span><span>${o.ultimo_envio?`${new Date(o.ultimo_envio.gerado_em).toLocaleString('pt-PT')} · ${esc(o.ultimo_envio.enviado_por||'')} · ${o.ultimo_envio.autos} Auto(s) · ${esc(o.ultimo_envio.ficheiro)}`:'—'}</span>
    <span>Histórico</span><span>${(o.envios||[]).slice(-10).reverse().map(e=>`${new Date(e.gerado_em).toLocaleString('pt-PT')} · ${esc(e.enviado_por||'')} · ${e.autos} Auto(s)`).join('<br>')||'—'}</span></div></div>
  ${htmlAutosEnvio(o)}
  <div class="card"><h3 style="margin-top:0">Autos por período</h3><table><thead><tr><th>Período</th><th class="num">Autos emitidos</th><th class="num">Valor do mês</th></tr></thead><tbody>${pers.map(p=>`<tr><td>${p}</td><td class="num">${porPer[p].n}</td><td class="num">${eur(porPer[p].v)}</td></tr>`).join('')||'<tr><td colspan="3" class="hint">ainda sem Autos emitidos</td></tr>'}</tbody></table></div>`;
  m.innerHTML=h;bindAutosActions(m);$('#bEnvio').onclick=prepararEnvio;
}
// quando foi enviado cada Auto: pelo registo de ids dos envios; envios antigos (sem ids) contam pela data
function enviadoEm(o,a){for(const e of (o.envios||[])){if(e.ids){if(e.ids.includes(a.id))return e;}else if(a.dados?.emitido_em&&a.dados.emitido_em<=e.gerado_em)return e;}return null;}
function htmlAutosEnvio(o){
  const subs=Object.fromEntries(o.subempreiteiros.map(s=>[s.id,s]));
  const linha=(a,env)=>{const d=a.dados;const s=subs[a.sub];
    return `<tr class="${a.estado==='SUBSTITUIDO'?'rem':''}"><td>${a.id}</td><td>${esc(s?.nome||a.sub)} · ${a.esp}</td><td><span class="tag ${a.estado==='EMITIDO'?'ok':a.estado==='RASCUNHO'?'warn':''}">${a.estado}</span></td>
      <td>${d?d.data_auto:''}</td><td>${d?d.periodo:''}</td><td class="num">${d?eur(d.totais.valor_mes):''}</td><td class="num">${d?eur(d.totais.valor_acumulado):''}</td>
      <td>${d&&d.avisos.length?`<span class="tag warn">${d.avisos.length}</span>`:''}</td><td>${d?new Date(d.emitido_em).toLocaleString('pt-PT'):''}</td>
      <td>${env?`${new Date(env.gerado_em).toLocaleString('pt-PT')}<br><small class="hint">${esc(env.enviado_por||'')}</small>`:''}</td>
      <td style="white-space:nowrap"><button class="sec sm" data-open="${a.id}">Excel</button><button class="sec sm" data-copy="${a.id}" title="copiar caminho">⧉</button>${d?`<button class="sec sm" data-ver="${a.id}">ver</button>`:`<button class="sm" data-emit="${a.id}">Emitir</button><button class="sm danger" data-del="${a.id}">Apagar</button>`}</td></tr>`;};
  const cab=`<thead><tr><th>Auto</th><th>Subempreiteiro · esp.</th><th>Estado</th><th>Data</th><th>Período</th><th class="num">Valor mês</th><th class="num">Acumulado</th><th>Avisos</th><th>Emitido em</th><th>Enviado em</th><th></th></tr></thead>`;
  const ord=(x,y)=>x.sub.localeCompare(y.sub)||x.esp.localeCompare(y.esp)||x.numero-y.numero||(x.S?1:0)-(y.S?1:0);
  const por=[],ja=[];for(const a of [...S.autos].sort(ord)){const env=a.dados?enviadoEm(o,a):null;(env?ja:por).push([a,env]);}
  const nEm=por.filter(([a])=>a.estado!=='RASCUNHO').length,nRas=por.length-nEm;
  return `<div class="card"><h3 style="margin-top:0">Por enviar <span class="tag ${nEm?'warn':''}">${nEm} emitido(s)</span>${nRas?`<span class="tag">${nRas} rascunho(s)</span>`:''}</h3>
    ${por.length?`<table>${cab}<tbody>${por.map(([a,e])=>linha(a,e)).join('')}</tbody></table>`:'<p class="hint">Nada por enviar.</p>'}</div>
  <div class="card"><h3 style="margin-top:0">Já enviados <span class="tag ok">${ja.length}</span></h3>
    ${ja.length?`<table>${cab}<tbody>${ja.map(([a,e])=>linha(a,e)).join('')}</tbody></table>`:'<p class="hint">Ainda nenhum Auto foi enviado ao Controller.</p>'}</div>`;
}
function dataSugerida(ant){
  let d=proximoFecho(S.obra.obra.dia_fecho);
  if(ant?.data_auto){const [y,mo,dd]=ant.data_auto.split('-').map(Number);let yy=y,mm=mo+1;if(mm>12){mm=1;yy++;}const ult=new Date(Date.UTC(yy,mm,0)).getUTCDate();const seg=new Date(Date.UTC(yy,mm-1,Math.min(dd,ult)));if(seg>d)d=seg;}
  return ymd(d);
}
function pedirData(titulo,sugestao,minData){
  return new Promise(res=>{const dlg=$('#dlg');const dia=S.obra.obra.dia_fecho;
    dlg.innerHTML=`<h3 style="margin-top:0">${esc(titulo)}</h3><div class="row"><label><span>Data do Auto</span><input type="date" id="dData" value="${sugestao}"></label><label><span>Período</span><b id="dPer"></b></label></div>
      <p class="hint">O período é o mês do fecho (dia ${dia}): de ${dia+1} de um mês a ${dia} do seguinte.${minData?` Tem de ser posterior a ${minData} (Auto anterior).`:''}</p>
      <div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Criar Auto</button></div>`;
    const upd=()=>{const v=$('#dData').value;$('#dPer').textContent=v?periodoDe(v,dia):'';};upd();$('#dData').oninput=upd;
    dlg.showModal();$('#dCancel').onclick=()=>{dlg.close();res(null);};
    $('#dOk').onclick=()=>{const v=$('#dData').value;if(!v)return toast('Indica a data','warn');if(minData&&v<=minData)return toast('A data tem de ser posterior a '+minData,'err');dlg.close();res(v);};});
}
async function novoAuto(subId,esp){
  const s=S.obra.subempreiteiros.find(x=>x.id===subId);const n=(s.proximo_auto?.[esp])||1;
  if(!(s.artigos[esp]||[]).length)return toast('Esta especialidade não tem artigos atribuídos','warn');
  const ant=ultimoEmitido(subId,esp);
  if(!ant&&n>1&&!s.acum_inicial?.[esp])return toast(`Série a começar no Auto n.º ${n}: introduz primeiro os acumulados anteriores em Subempreitadas`,'warn');
  const data=await pedirData(`Novo Auto n.º ${n} — ${s.nome} / ${esp}`,dataSugerida(ant?.dados),ant?.dados.data_auto||null);if(!data)return;
  try{const r=await gerarAutoXlsx({s,esp,numero:n,S:false,anterior:ant?ant.dados:null,base:null,data,srcXlsx:ant?.xlsx||null});
    const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Auto criado: ${r.id}.xlsx</h3><p>${r.nLinhas} artigos. ${ant?`Acumulado anterior, zona livre${r.deXlsx?' (com formatação)':''} e ${r.folhas} folha(s) auxiliar(es) transportados do ${ant.id}.`:(n>1?`<b>Auto inicial n.º ${n}</b> — coluna H com os acumulados dos Autos 1 a ${n-1} introduzidos na consola. `:'')+'Primeiro Auto da série na consola: zona livre vazia — construa as suas colunas de medição à direita de N e, se quiser, folhas auxiliares.'}</p>
      ${r.avisos.length?`<div class="msg warn">Referências a artigos que deixaram de existir (verifique no Excel):<br>${r.avisos.map(esc).join('<br>')}</div>`:''}
      <p class="hint">Abra o ficheiro em <code>${esc(S.obraDir.name)}\\autos\\</code>, preencha, grave no Excel e volte aqui para <b>Emitir</b>.</p><div class="right"><button class="sec" id="dOpen">Abrir no Excel</button><button id="dOk">Fechar</button></div>`;
    dlg.showModal();$('#dOk').onclick=()=>{dlg.close();refreshAutos();};$('#dOpen').onclick=()=>{abrirNoExcel(r.id);};
  }catch(e){toast('Erro ao gerar: '+e.message,'err');console.error(e);}
}
async function novoSubstitutivo(id){
  const a=S.autos.find(x=>x.id===id);const s=S.obra.subempreiteiros.find(x=>x.id===a.sub);
  if(!confirm(`Criar substitutivo do ${id}? O ${id} fica anulado quando o substitutivo for emitido.`))return;
  const anterior=serie(a.sub,a.esp).filter(x=>x.estado==='EMITIDO'&&x.numero<a.numero).pop();
  const data=await pedirData(`Substitutivo do Auto n.º ${a.numero} — ${s.nome} / ${a.esp}`,a.dados.data_auto,anterior?.dados.data_auto||null);if(!data)return;
  try{const r=await gerarAutoXlsx({s,esp:a.esp,numero:a.numero,S:true,anterior:anterior?anterior.dados:null,base:a.dados,data,srcXlsx:a.xlsx||null});toast(`Rascunho ${r.id}.xlsx criado com os valores do ${id}`,'ok');refreshAutos();}
  catch(e){toast('Erro: '+e.message,'err');console.error(e);}
}
async function emitirUI(id){
  if(!S.cfg?.nome)return toast('Indica o teu nome em Configurações antes de emitir','warn');
  const a=S.autos.find(x=>x.id===id);const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Emitir ${id}</h3><div class="muted">a ler o ficheiro…</div>`;dlg.showModal();
  try{
    const r=await lerAutoXlsx(a);
    const d=r.dados;
    dlg.innerHTML=`<h3 style="margin-top:0">Emitir ${id}</h3>
      ${d?`<div class="kv"><span>Data / período</span><span>${d.data_auto} → <b>${d.periodo}</b></span><span>Linhas</span><span>${d.linhas.length}</span><span>Valor do mês</span><span><b>${eur(d.totais.valor_mes)}</b></span><span>Acumulado</span><span>${eur(d.totais.valor_acumulado)}</span></div>`:''}
      ${r.bloq.length?`<div class="msg err"><b>Não pode ser emitido:</b><br>${r.bloq.map(esc).join('<br>')}</div>`:'<div class="msg ok">Ficheiro válido.</div>'}
      ${r.avisos.length?`<div class="msg warn"><b>Avisos (ficam registados e visíveis ao Controller):</b><br>${r.avisos.map(esc).join('<br>')}</div>`:''}
      <div class="right"><button class="sec" id="dCancel">Cancelar</button>${r.bloq.length?'':'<button id="dOk">Emitir</button>'}</div>`;
    $('#dCancel').onclick=()=>dlg.close();
    if(!r.bloq.length)$('#dOk').onclick=async()=>{await emitirAuto(a,d);dlg.close();toast(`${id} emitido (${d.periodo})`,'ok');refreshAutos();};
  }catch(e){dlg.innerHTML=`<h3>Emitir ${id}</h3><div class="msg err">Erro ao ler: ${esc(e.message)}</div><div class="right"><button id="dCancel">Fechar</button></div>`;$('#dCancel').onclick=()=>dlg.close();console.error(e);}
}
function verAuto(id){ return verAutoFull_(id); }
function verAutoDlg_(id){
  const a=S.autos.find(x=>x.id===id);const d=a.dados;const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">${id} <span class="tag ${a.estado==='EMITIDO'?'ok':''}">${a.estado}</span></h3>
    <div class="kv"><span>Subempreiteiro</span><span>${esc(d.sub_nome)} — ${d.especialidade}</span><span>Data / período</span><span>${d.data_auto} / ${d.periodo}</span><span>Emitido</span><span>${new Date(d.emitido_em).toLocaleString('pt-PT')}</span><span>xlsx</span><span>${d.xlsx.ficheiro} (sha256 ${d.xlsx.sha256.slice(0,12)}…)</span></div>
    <div class="scroll" style="max-height:50vh;margin-top:8px"><table><thead><tr><th>Item</th><th>Descrição</th><th class="num">Adj.</th><th class="num">Preço</th><th class="num">Anterior</th><th class="num">Mês</th><th class="num">Acumulado</th><th class="num">Valor mês</th><th>Avisos</th></tr></thead><tbody>
    ${d.linhas.map(l=>`<tr><td>${esc(l.item)}</td><td>${descH(l)}</td><td class="num">${fmt(l.qtd_adjudicada)}</td><td class="num">${fmt(l.preco)}</td><td class="num">${fmt(l.acum_anterior)}</td><td class="num">${fmt(l.mes)}</td><td class="num">${fmt(l.real)}</td><td class="num">${eur(l.valor_mes)}</td><td>${l.avisos.map(x=>`<span class="tag warn">${x}</span>`).join('')}</td></tr>`).join('')}
    </tbody></table></div><div class="right" style="margin-top:8px"><button id="dCancel">Fechar</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
}

/* =========================================================
   Fase 3 — envio DO → Controller, consola do Controller (DR, alertas)
   ========================================================= */
const NOMES_AVISO={PRECO_ACIMA_ORCAMENTO:'preço acima do custo do orçamento',ACUMULADO_ACIMA_ADJUDICADO:'acumulado acima da quantidade adjudicada',MES_NEGATIVO:'quantidade do mês negativa (correção)',FORA_DO_ORCAMENTO:'artigo fora do orçamento',REMOVIDO_DO_ORCAMENTO:'artigo removido do orçamento',ARTIGO_NOVO_SEM_MEDICAO:'artigo novo sem medição',TODAS_AS_LINHAS_A_ZERO:'auto sem quantidades',ADJUDICADO_ACIMA_ORCAMENTO:'adjudicado (todos os subs) acima do orçamento',EXECUTADO_ACIMA_ORCAMENTO:'executado acima do orçamento',AUTO_INICIAL_ACUMULADO_MANUAL:'auto inicial — acumulado anterior introduzido manualmente'};
function papelAtual(){return CTX.papel;}

/* ---------- DO: preparar envio ---------- */
function autoParaEnvio(d){const c=JSON.parse(JSON.stringify(d));delete c.cabecalhos_livres;delete c.colunas_livres;for(const l of c.linhas){delete l.livre;delete l.mes_formula;delete l.linha;}return c;}
async function prepararEnvio(){
  if(!S.cfg?.nome)return toast('Indica o teu nome em Configurações antes de preparar o envio','warn');
  await listarAutos();
  const emitidos=S.autos.filter(a=>a.json);
  if(!emitidos.length)return toast('Ainda não há Autos emitidos nesta obra','warn');
  const agora=new Date();const stamp=agora.toISOString().slice(0,16).replace('T','_').replace(':','');
  const env={tipo:'ENVIO_CONSOLA_AUTOS',versao:1,consola:VERSAO,gerado_em:hoje(),enviado_por:S.cfg.nome,pasta:S.obraDir.name,
    obra:JSON.parse(JSON.stringify(S.obra)),orcamento:S.orc,autos:emitidos.map(a=>({id:a.id,estado:a.estado,...autoParaEnvio(a.dados)}))};
  const nome=`ENVIO_${S.obra.obra.numero}_${stamp}.json`;
  const dir=await S.obraDir.getDirectoryHandle('envios',{create:true});await FS.writeJson(dir,nome,env);
  S.obra.ultimo_envio={ficheiro:nome,gerado_em:env.gerado_em,enviado_por:S.cfg.nome,autos:emitidos.length,ids:emitidos.map(a=>a.id)};S.obra.envios=[...(S.obra.envios||[]),S.obra.ultimo_envio].slice(-100);await guardarObra();
  const blob=new Blob([JSON.stringify(env)],{type:'application/json'});const url=URL.createObjectURL(blob);
  const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Envio preparado</h3><div class="kv"><span>Ficheiro</span><span><code>${esc(S.obraDir.name)}\\envios\\${nome}</code></span><span>Conteúdo</span><span>obra, orçamento em vigor, ${S.obra.subempreiteiros.length} subempreiteiro(s), ${emitidos.length} Auto(s) emitido(s) — sem medições (zona livre)</span></div>
    <p class="hint"><b>Enviar pelo CRM_NT</b> entrega-o ao Controller dentro da app (com cópia de segurança dos Excel emitidos). Em alternativa, transfere e envia por e-mail. Pode repetir-se: a importação não duplica nada.</p>
    <div id="dEnvMsg"></div>
    <div class="right"><a class="sec" href="${url}" download="${nome}" id="dDown" style="display:inline-block;padding:7px 13px;border-radius:7px;background:#e9edf2;color:var(--tx);text-decoration:none;margin-right:6px">Transferir cópia (Downloads)</a><button id="dCRM"><svg width="13" height="13" style="vertical-align:-2px"><use href="#i-send"/></svg> Enviar pelo CRM_NT</button><button class="sec" id="dOk">Fechar</button></div>`;
  dlg.showModal();$('#dOk').onclick=()=>{dlg.close();URL.revokeObjectURL(url);refreshAutos();};
  $('#dCRM').onclick=()=>enviarPeloCRM_(env,emitidos,nome);
}

/* ---------- Controller: importar envio ---------- */
async function importarEnvioUI(file,envioId){
  let env;try{env=JSON.parse(await file.text());}catch(e){return toast('Ficheiro inválido (não é JSON)','err');}
  if(env.tipo!=='ENVIO_CONSOLA_AUTOS')return toast('Este ficheiro não é um envio da Consola de Autos','err');
  const pasta=env.pasta||`${env.obra.obra.numero}_${slug(env.obra.obra.nome)}`;
  let h=null,existente=null,orcAtual=null,conhecidos={};
  try{h=await S.root.getDirectoryHandle(pasta);existente=await FS.readJson(h,'obra.json');orcAtual=await FS.readJson(h,'orcamento.json');
    const ad=await h.getDirectoryHandle('autos',{create:true});for await(const [n,fh] of ad.entries()){const m=n.match(RE_AUTO);if(m&&m[5]==='json'){const d=JSON.parse(await (await fh.getFile()).text());conhecidos[d.id||n.replace('.json','')]=d;}}}catch(e){}
  const novos=[],iguais=[],conflitos=[];
  for(const a of env.autos){const k=conhecidos[a.id];if(!k)novos.push(a);else if(k.xlsx?.sha256===a.xlsx?.sha256&&k.emitido_em===a.emitido_em)iguais.push(a);else conflitos.push(a);}
  const orcNovo=!orcAtual||(env.orcamento&&env.orcamento.importado_em>orcAtual.importado_em);
  const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Importar ${esc(file.name)}</h3>
    <div class="kv"><span>Obra</span><span><b>${esc(env.obra.obra.numero)} – ${esc(env.obra.obra.nome)}</b> ${existente?'<span class="tag">já conhecida</span>':'<span class="tag ok">nova</span>'}</span>
    <span>Enviado por</span><span><b>${esc(env.enviado_por||'(sem nome)')}</b></span>
    <span>Gerado em</span><span>${new Date(env.gerado_em).toLocaleString('pt-PT')} (consola ${esc(env.consola||'?')})</span>
    <span>Orçamento</span><span>${env.orcamento?`${esc(env.orcamento.ficheiro)} · ${new Date(env.orcamento.importado_em).toLocaleString('pt-PT')} ${orcNovo?'<span class="tag ok">será atualizado</span>':'<span class="tag">igual ou mais antigo — mantém o atual</span>'}`:'<span class="tag warn">sem orçamento</span>'}</span>
    <span>Subempreiteiros</span><span>${env.obra.subempreiteiros.length}</span>
    <span>Autos novos</span><span><b>${novos.length}</b> ${novos.slice(0,12).map(a=>esc(a.id)).join(', ')}${novos.length>12?' …':''}</span>
    <span>Já recebidos</span><span>${iguais.length}</span>
    ${conflitos.length?`<span>Conflitos</span><span class="msg err" style="margin:0"><b>${conflitos.length} Auto(s) já recebidos com conteúdo diferente — NÃO serão substituídos:</b> ${conflitos.map(a=>esc(a.id)).join(', ')}. Um Auto emitido não muda; a correção legítima é um substitutivo. Pergunte ao DO.</span>`:''}</div>
    <div class="right" style="margin-top:10px"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Importar</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{
    h=await S.root.getDirectoryHandle(pasta,{create:true});const ad=await h.getDirectoryHandle('autos',{create:true});
    const obraC=JSON.parse(JSON.stringify(env.obra));obraC.recebido={ficheiro:file.name,gerado_em:env.gerado_em,enviado_por:env.enviado_por||null,recebido_em:hoje(),recebido_por:S.cfg?.nome||null,autos_novos:novos.length,conflitos:conflitos.map(a=>a.id)};
    obraC.historico_recebidos=[...(existente?.historico_recebidos||[]),obraC.recebido].slice(-50);
    await FS.writeJson(h,'obra.json',obraC);
    if(orcNovo&&env.orcamento)await FS.writeJson(h,'orcamento.json',env.orcamento);
    for(const a of novos)await FS.writeJson(ad,a.id+'.json',a);
    if(conflitos.length){const cf=(await FS.readJson(h,'conflitos.json'))||[];for(const a of conflitos)cf.push({id:a.id,ficheiro:file.name,em:hoje(),sha256_recebido:a.xlsx?.sha256});await FS.writeJson(h,'conflitos.json',cf);}
    try{const rd=await S.root.getDirectoryHandle('recebidos',{create:true});const fh=await rd.getFileHandle(file.name,{create:true});const w=await fh.createWritable();await w.write(await file.arrayBuffer());await w.close();}catch(e){}
    if(envioId){const r=await CRM.marcarImportado(envioId,{novos:novos.map(a=>a.id),iguais:iguais.map(a=>a.id),conflitos:conflitos.map(a=>a.id)});if(r&&r.erro)toast(r.erro,'err');}
    dlg.close();toast(`Importado: ${novos.length} Auto(s) novo(s)${conflitos.length?`, ${conflitos.length} conflito(s)`:''}`,conflitos.length?'warn':'ok');go(S.emb?'entrada':(envioId?'fila':'entrada'));
  };
}

/* ---------- Controller: cálculo da DR ---------- */
function autosValidos(){return (S.autos||[]).filter(a=>a.estado==='EMITIDO'&&a.dados);}
function periodosObra(){return [...new Set(autosValidos().map(a=>a.dados.periodo))].sort();}
function calcularDR(periodo){
  const o=S.obra;const orc=S.orc;const arts={};
  const add=(item,base)=>{if(!arts[item])arts[item]={item,...base,adj:{},exe:{},mes:{},custo_acum:0,custo_mes:0,avisos:new Set(),subs:new Set()};return arts[item];};
  for(const a of (orc?.artigos||[]))add(a.item,{ref:a.ref_cliente,descricao:a.descricao,descricao_completa:a.descricao_completa||'',uni:a.uni,qtd:a.qtd,pu_venda:a.pu_venda,custo_sub:a.custo_sub,estado:a.estado,origem:'ORCAMENTO',tm:a.tm,capitulo:a.capitulo});
  for(const s of (o.subempreiteiros||[]))for(const f of (s.fora_orcamento||[]))if(!arts[f.item])add(f.item,{ref:f.ref_cliente||'',descricao:f.descricao,uni:f.uni,qtd:0,pu_venda:0,custo_sub:{},estado:'ATIVO',origem:f.contratual_desde?'ORCAMENTO':'AUTO',capitulo:'#FORA'});
  // adjudicado por especialidade (todos os subs)
  for(const s of (o.subempreiteiros||[]))for(const e of (s.especialidades||[]))for(const it of (s.artigos?.[e]||[])){const A=arts[it];if(!A)continue;A.adj[e]=(A.adj[e]||0)+(s.qtds?.[it]?.[e]??A.qtd);A.subs.add(s.nome||s.id);}
  // executado: último Auto válido de cada série (acumulado) + custo (soma dos meses) + mês do período
  const ajustes=[];const series={};for(const a of autosValidos()){const k=a.sub+'|'+a.esp;(series[k]=series[k]||[]).push(a);}
  for(const k of Object.keys(series)){const lst=series[k].sort((x,y)=>x.numero-y.numero);const ult=lst[lst.length-1];const e=ult.esp;
    for(const l of ult.dados.linhas){const A=arts[l.item]||add(l.item,{ref:l.ref_cliente,descricao:l.descricao,uni:l.uni,qtd:0,pu_venda:0,custo_sub:{},estado:'ATIVO',origem:'AUTO',capitulo:'#FORA'});A.exe[e]=(A.exe[e]||0)+l.real;}
    {const first=lst[0];for(const l of first.dados.linhas){const A=arts[l.item];if(A&&l.acum_anterior)A.custo_acum+=r2(l.acum_anterior*l.preco);}
      const fat=first.dados.totais?.valor_anterior_faturado;if(fat!=null){const calc=first.dados.totais.valor_anterior||0;if(Math.abs(fat-calc)>0.005)ajustes.push({sub:first.sub,esp:e,calculado:calc,faturado:fat,ajuste:r2(fat-calc)});}}
    for(const a of lst)for(const l of a.dados.linhas){const A=arts[l.item];if(!A)continue;A.custo_acum+=l.valor_mes;if(periodo&&a.dados.periodo===periodo){A.mes[e]=(A.mes[e]||0)+l.mes;A.custo_mes+=l.valor_mes;}for(const v of (l.avisos||[]))A.avisos.add(v);}}
  for(const A of Object.values(arts)){const adjT=Object.values(A.adj).reduce((t,v)=>t+v,0),exeT=Object.values(A.exe).reduce((t,v)=>t+v,0);
    A.adj_max=Math.max(0,...Object.values(A.adj));A.exe_max=Math.max(0,...Object.values(A.exe));
    if(A.qtd>0&&A.adj_max>A.qtd+1e-6)A.avisos.add('ADJUDICADO_ACIMA_ORCAMENTO');
    if(A.qtd>0&&A.exe_max>A.qtd+1e-6)A.avisos.add('EXECUTADO_ACIMA_ORCAMENTO');
    if(A.origem==='AUTO')A.avisos.add('FORA_DO_ORCAMENTO');
    A.venda=r2(A.qtd*A.pu_venda);A.custo_orc=r2(A.qtd*Object.values(A.custo_sub||{}).reduce((t,v)=>t+(v||0),0));A.venda_exe=r2(A.exe_max*A.pu_venda);A.avisos=[...A.avisos];}
  const out=Object.values(arts);out.ajustes=ajustes;return out;
}

/* ---------- Controller: vistas ---------- */
async function viewCtrlAutos(){
  const m=$('#main');m.innerHTML='<h2>Autos recebidos</h2><div class="muted">a ler…</div>';
  let hEnv='';if(S.emb){hEnv=await enviosObraHTML_();if(!S.obra){m.innerHTML=`<h2>Autos recebidos — ${esc(S.emb.cod)} ${esc(S.emb.nome)}</h2>${hEnv}<div class="msg">Esta obra ainda não tem pasta em CONTROLO_AUTOS — fica criada ao importar o primeiro envio.</div>`;ligarEnvios_(m);return;}}
  await listarAutos();
  const o=S.obra;let h=`<h2>Autos recebidos — ${esc(o.obra.numero)} ${esc(o.obra.nome)}</h2>${hEnv}
    <div class="card"><div class="kv"><span>Último envio</span><span>${o.recebido?`<b>${esc(o.recebido.enviado_por||'(sem nome)')}</b> · ${esc(o.recebido.ficheiro)} · gerado ${new Date(o.recebido.gerado_em).toLocaleString('pt-PT')} · recebido ${new Date(o.recebido.recebido_em).toLocaleString('pt-PT')}`:'—'}</span>
    <span>Histórico de envios</span><span>${(o.historico_recebidos||[]).slice(-8).reverse().map(r=>`${new Date(r.gerado_em).toLocaleDateString('pt-PT')} ${esc(r.enviado_por||'?')} (+${r.autos_novos})`).join('<br>')||'—'}</span>
    <span>Orçamento</span><span>${S.orc?`${esc(S.orc.ficheiro)} · ${new Date(S.orc.importado_em).toLocaleString('pt-PT')} · ${S.orc.artigos.filter(a=>a.estado==='ATIVO').length} artigos`:'<span class="tag warn">não recebido</span>'}</span>
    <span>Períodos</span><span>${periodosObra().join(' · ')||'—'}</span></div></div>`;
  for(const s of o.subempreiteiros){h+=`<div class="card"><h3 style="margin-top:0">${esc(s.nome)} <span class="tag">${s.nif?'NIF '+esc(s.nif):'sem NIF'}${s.email?' · '+esc(s.email):''}</span></h3>`;
    for(const esp of s.especialidades){const lst=serie(s.id,esp);h+=`<div style="margin:6px 0 12px"><b>${esp}</b> <span class="tag">${(s.artigos?.[esp]||[]).length} artigos · preços: ${(s.fonte_precos?.[esp]||'ORCAMENTO').toLowerCase()}</span>`;
      if(lst.length){h+=`<table style="margin-top:6px"><thead><tr><th>Auto</th><th>Estado</th><th>Data</th><th>Período</th><th class="num">Valor mês</th><th class="num">Acumulado</th><th>Avisos</th><th>Emitido</th><th></th></tr></thead><tbody>`;
        for(const a of lst){const d=a.dados;h+=`<tr class="${a.estado==='SUBSTITUIDO'?'rem':''}"><td>${a.id}</td><td><span class="tag ${a.estado==='EMITIDO'?'ok':''}">${a.estado}</span></td><td>${d.data_auto}</td><td>${d.periodo}</td><td class="num">${eur(d.totais.valor_mes)}</td><td class="num">${eur(d.totais.valor_acumulado)}</td><td>${d.avisos.length?`<span class="tag warn">${d.avisos.length}</span>`:''}</td><td>${new Date(d.emitido_em).toLocaleString('pt-PT')}${d.emitido_por?' · '+esc(d.emitido_por):''}</td><td><button class="sec sm" data-ver="${a.id}">ver</button></td></tr>`;}
        h+='</tbody></table>';}else h+='<div class="hint">sem Autos</div>';
      h+='</div>';}
    h+='</div>';}
  m.innerHTML=h;m.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>verAuto(b.dataset.ver));ligarEnvios_(m);
}
async function viewDR(){
  const m=$('#main');m.innerHTML='<h2>DR</h2><div class="muted">a calcular…</div>';await listarAutos();
  const pers=periodosObra();const per=S._per&&pers.includes(S._per)?S._per:pers[pers.length-1]||'';S._per=per;
  const arts=calcularDR(per);const caps=Object.fromEntries((S.orc?.capitulos||[]).map(c=>[c.item,c]));
  const T=arts.reduce((t,A)=>{t.venda+=A.venda;t.custo_orc+=A.custo_orc;t.venda_exe+=A.venda_exe;t.custo_acum+=A.custo_acum;t.custo_mes+=A.custo_mes;return t;},{venda:0,custo_orc:0,venda_exe:0,custo_acum:0,custo_mes:0});
  const ajT=(arts.ajustes||[]).reduce((t,x)=>t+x.ajuste,0);T.custo_acum=r2(T.custo_acum+ajT);
  const E=ESPECIALIDADES;
  let h=`<h2>DR — ${esc(S.obra.obra.numero)} ${esc(S.obra.obra.nome)}</h2>
  <div class="card"><div class="row"><label><span>Período (coluna "mês")</span><select id="selPer">${pers.map(p=>`<option ${p===per?'selected':''}>${p}</option>`).join('')}</select></label>
    <label><span>Mostrar</span><select id="selFil"><option value="todos">todos os artigos</option><option value="exe">só com execução</option><option value="av">só com avisos</option></select></label>
    <input id="filDR" placeholder="filtrar" style="width:240px"><span class="sp" style="flex:1"></span><button id="bExp">Exportar DR (xlsx)</button></div>
    <div class="kv" style="margin-top:10px"><span>Venda orçamento</span><span><b>${eur(T.venda)}</b> · custo M.O. previsto ${eur(T.custo_orc)} (${T.venda?fmt(100*T.custo_orc/T.venda,1):'0'} %)</span>
    <span>Executado (venda)</span><span><b>${eur(T.venda_exe)}</b> · custo M.O. pago acumulado ${eur(T.custo_acum)} (${T.venda_exe?fmt(100*T.custo_acum/T.venda_exe,1):'0'} %)</span>
    ${(arts.ajustes||[]).length?`<span>Ajuste Autos anteriores</span><span>${eur(ajT)} <span class="hint">— diferença entre o faturado nos Autos anteriores à consola e o acumulado ao preço adjudicado (${arts.ajustes.map(x=>`${esc(x.sub)}/${x.esp}: faturado ${eur(x.faturado)} vs ${eur(x.calculado)}`).join('; ')}). Incluído no custo pago acumulado, não distribuído por artigo.</span></span>`:''}
    <span>Custo M.O. do período ${per}</span><span>${eur(T.custo_mes)}</span>
    <span>Artigos com avisos</span><span>${arts.filter(A=>A.avisos.length).length}</span></div></div>
  <div class="card"><div class="scroll" style="max-height:65vh"><table class="wide"><thead class="h2"><tr><th rowspan="2">Item</th><th rowspan="2">Descrição</th><th rowspan="2">Uni</th><th rowspan="2" class="num">Qtd orç.</th><th rowspan="2" class="num">PU venda</th>
    ${E.map(e=>`<th colspan="3" style="text-align:center">${e.slice(0,4)}.</th>`).join('')}<th rowspan="2" class="num">Custo pago acum.</th><th rowspan="2" class="num">Custo mês</th><th rowspan="2">Avisos</th></tr>
    <tr>${E.map(()=>`<th class="num">Adj.</th><th class="num">Exec.</th><th class="num">Mês</th>`).join('')}</tr></thead><tbody id="tbDR"></tbody></table></div></div>`;
  m.innerHTML=h;
  const draw=()=>{const f=($('#filDR').value||'').toLowerCase(),fil=$('#selFil').value;let out='',lastCap=null;
    for(const A of arts){if(fil==='exe'&&!A.exe_max)continue;if(fil==='av'&&!A.avisos.length)continue;if(f&&!(A.item.toLowerCase().includes(f)||A.descricao.toLowerCase().includes(f)))continue;
      if(A.capitulo!==lastCap){const c=caps[A.capitulo];out+=`<tr class="cap"><td>${esc(A.capitulo==='#FORA'?'':A.capitulo)}</td><td colspan="${8+E.length*3}">${esc(A.capitulo==='#FORA'?'FORA DO ORÇAMENTO':(c?c.descricao:''))}</td></tr>`;lastCap=A.capitulo;}
      out+=`<tr class="${A.estado!=='ATIVO'?'rem':''}"><td>${esc(A.item)}</td><td>${descH(A)}</td><td>${esc(A.uni)}</td><td class="num">${fmt(A.qtd)}</td><td class="num">${fmt(A.pu_venda)}</td>`;
      for(const e of E){const adj=A.adj[e],ex=A.exe[e],ms=A.mes[e];const red=(adj!=null&&A.qtd>0&&adj>A.qtd+1e-6)?'color:var(--err);font-weight:600':'';const red2=(ex!=null&&A.qtd>0&&ex>A.qtd+1e-6)?'color:var(--err);font-weight:600':'';
        out+=`<td class="num" style="${red}">${adj!=null?fmt(adj):''}</td><td class="num" style="${red2}">${ex?fmt(ex):''}</td><td class="num">${ms?fmt(ms):''}</td>`;}
      out+=`<td class="num">${A.custo_acum?eur(A.custo_acum):''}</td><td class="num">${A.custo_mes?eur(A.custo_mes):''}</td><td>${A.avisos.map(v=>`<span class="tag warn" title="${esc(NOMES_AVISO[v]||v)}">${v}</span>`).join(' ')}</td></tr>`;}
    $('#tbDR').innerHTML=out;};
  draw();$('#filDR').oninput=draw;$('#selFil').onchange=draw;$('#selPer').onchange=e=>{S._per=e.target.value;viewDR();};
  $('#bExp').onclick=()=>exportarDR(arts,per);
}
async function exportarDR(arts,per){
  const wb=new ExcelJS.Workbook();const ws=wb.addWorksheet('DR');const E=ESPECIALIDADES;
  ws.addRow([`DR — ${S.obra.obra.numero} ${S.obra.obra.nome}`]).font={bold:true,size:14};ws.addRow([`Período: ${per} · gerado ${new Date().toLocaleString('pt-PT')}`]);ws.addRow([]);
  const hdr=['Item','Ref.','Descrição','Uni','Qtd orç.','PU venda','Venda orç.'];for(const e of E)hdr.push(`${e} adj.`,`${e} exec.`,`${e} mês`);hdr.push('Custo M.O. orç.','Custo pago acum.','Custo mês','Avisos');
  const hr=ws.addRow(hdr);hr.font={bold:true,color:{argb:'FFFFFFFF'}};hr.eachCell(c=>{c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF1F4E78'}};});
  for(const A of arts){const r=[A.item,A.ref,A.descricao,A.uni,A.qtd,A.pu_venda,A.venda];for(const e of E)r.push(A.adj[e]??null,A.exe[e]||null,A.mes[e]||null);r.push(A.custo_orc,A.custo_acum||null,A.custo_mes||null,A.avisos.map(v=>NOMES_AVISO[v]||v).join('; '));ws.addRow(r);}
  ws.columns.forEach((c,i)=>{c.width=i===2?50:12;});ws.views=[{state:'frozen',ySplit:4}];
  const buf=await wb.xlsx.writeBuffer();const nome=`DR_${S.obra.obra.numero}_${per||'todos'}.xlsx`;if(!S.obraDir){descarregarBlob_(buf,nome);return toast('DR transferida para Downloads: '+nome,'ok');}const dir=await S.obraDir.getDirectoryHandle('exportacoes',{create:true});
  const fh=await dir.getFileHandle(nome,{create:true});const w=await fh.createWritable();await w.write(buf);await w.close();toast(`Exportado: ${S.obraDir.name}\\exportacoes\\${nome}`,'ok');
}
async function viewAlertas(){
  const m=$('#main');m.innerHTML='<h2>Alertas</h2><div class="muted">a calcular…</div>';await listarAutos();
  const arts=calcularDR(null);const rows=[];
  for(const A of arts)for(const v of A.avisos)rows.push({tipo:v,item:A.item,desc:A.descricao,detalhe:v==='ADJUDICADO_ACIMA_ORCAMENTO'?`adjudicado ${fmt(A.adj_max)} / orçamento ${fmt(A.qtd)}`:v==='EXECUTADO_ACIMA_ORCAMENTO'?`executado ${fmt(A.exe_max)} / orçamento ${fmt(A.qtd)}`:'',subs:[...A.subs].join(', ')});
  const porTipo={};for(const r of rows)porTipo[r.tipo]=(porTipo[r.tipo]||0)+1;
  let h=`<h2>Alertas — ${esc(S.obra.obra.numero)} ${esc(S.obra.obra.nome)}</h2><div class="card"><div class="row">${Object.entries(porTipo).map(([t,n])=>`<span class="tag warn">${esc(NOMES_AVISO[t]||t)}: ${n}</span>`).join('')||'<span class="tag ok">sem alertas</span>'}</div></div>
    <div class="card"><table><thead><tr><th>Alerta</th><th>Item</th><th>Descrição</th><th>Detalhe</th><th>Subempreiteiros</th></tr></thead><tbody>${rows.map(r=>`<tr><td><span class="tag warn">${esc(NOMES_AVISO[r.tipo]||r.tipo)}</span></td><td>${esc(r.item)}</td><td>${esc(r.desc)}</td><td>${esc(r.detalhe)}</td><td>${esc(r.subs)}</td></tr>`).join('')}</tbody></table></div>`;
  m.innerHTML=h;
}


/* ---------- CRM_NT: adaptador, montagem e vistas novas (F1b) ---------- */
function crmAdapter_(callSec){const c=(fn,...a)=>Promise.resolve().then(()=>callSec(fn,...a)).catch(e=>({erro:String(e&&e.message||e)}));return {
  config:(novo)=>novo?c('autosConfig',novo):c('autosConfig'),obras:()=>c('autosObras'),subs:()=>c('autosSubs'),
  subEmail:(cod,em)=>c('autosSubEmail',cod,em),subCriar:(o)=>c('autosSubCriar',o),subsImportar:(l)=>c('autosSubsImportar',l),subLigarERP:(cod,erp)=>c('autosSubLigarERP',cod,erp),
  enviar:(env,x)=>c('autosEnviar',env,x),envios:()=>c('autosEnviosRecebidos'),descarregar:(id,x)=>c('autosDescarregarEnvio',id,!!x),marcarImportado:(id,r)=>c('autosMarcarImportado',id,r),
  aprovar:(cod,id,ok,m)=>c('autosAprovar',cod,id,ok,m),registarERP:(cod,id,doc)=>c('autosRegistarERP',cod,id,doc),registarEnvioSub:(cod,id)=>c('autosRegistarEnvioSub',cod,id),
  estadoObra:(cod)=>c('autosEstadoObra',cod),fluxo:()=>c('autosFluxo'),
  orcConsola:(cod)=>c('orcConsola',cod)};}
// ---- orçamento do CRM_NT (fonte única): carregar a versão corrente para a pasta da obra (cache local = orcamento.json) ----
async function carregarOrcCRM_(silencioso){
  const msg=silencioso?null:$('#impMsg');if(msg)msg.innerHTML='<div class="msg">a pedir o orçamento ao CRM_NT…</div>';
  const r=await CRM.orcConsola(S.obra.obra.numero);
  if(!r||r.erro){if(msg)msg.innerHTML=`<div class="msg err">${esc(r?r.erro:'sem resposta')}</div>`;else toast('CRM_NT: '+(r?r.erro:'sem resposta'),'err');return;}
  if(!r.orcamento){if(silencioso){if(!S.orc)toast('Esta obra ainda não tem orçamento no CRM_NT — importa-o no cartão da obra (separador Orçamento) antes de adjudicar','warn');return;}if(msg)msg.innerHTML='<div class="msg warn">Esta obra ainda não tem orçamento no CRM_NT. Importa o xlsx do ERP no separador «Orçamento» do cartão da obra (Admin, Administrativo ou DO da obra) e volta aqui.</div>';return;}
  const v=r.versao;const artsN=r.orcamento.artigos.map(a=>{const dc=String(a.descricao_completa||a.descricao||'').trim();return {...a,descricao:tituloDesc(dc),descricao_completa:dc,estado:'ATIVO'};});
  // ERP primeiro, trabalhos não previstos (TM) no fim, com o seu capítulo — como no separador Orçamento
  const capsN=(r.orcamento.capitulos||[]).map(c=>({...c,descricao:tituloDesc(c.descricao||'')}));
  if(artsN.some(a=>a.origem==='TM')&&!capsN.some(c=>String(c.item)==='TM'))capsN.push({item:'TM',descricao:'TRABALHOS NÃO PREVISTOS (FORA DO ORÇAMENTO)',tm:null});
  const novo={artigos:artsN.filter(a=>a.origem!=='TM').concat(artsN.filter(a=>a.origem==='TM')),capitulos:capsN,folha:r.orcamento.folha||'CRM_NT'};
  const d=diffOrcamento(novo);const fileLike={name:`CRM_NT v${v.numero}`};
  if(S.orc&&S.orc.versao_crm===v.numero&&!d.novos.length&&!d.alterados.length&&!d.removidos.length){if(msg)msg.innerHTML='';if(!silencioso)toast(`Já tens a versão v${v.numero} do CRM_NT (${dtl(v.data)}) — nada mudou`,'ok');return;}
  if(silencioso){ // herdar: aplica sem perguntar (a consola nunca escolhe outra fonte); os preços dos subs ficam como estão
    const conv=await aplicarImportacao(novo,fileLike,d);S.orc.versao_crm=v.numero;S.orc.versao_crm_em=v.data;S.orc.origem='CRM_NT';await FS.writeJson(S.obraDir,'orcamento.json',S.orc);
    toast(`Orçamento v${v.numero} do CRM_NT carregado na pasta: +${d.novos.length} ~${d.alterados.length} −${d.removidos.length}${conv?` · ${conv} artigo(s) fora do orçamento passaram a contratuais`:''}`,'ok',7000);
    if(S.view==='orcamento'&&typeof viewOrc==='function')viewOrc();if(typeof renderNav==='function')renderNav();return;}
  const li=(arr,f)=>arr.slice(0,15).map(f).join('')+(arr.length>15?`<li>… mais ${arr.length-15}</li>`:'');
  const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Carregar orçamento do CRM_NT — v${v.numero}</h3>
    <div class="kv"><span>Versão</span><span><b>v${v.numero}</b> · ativada ${dtl(v.data)} por ${esc(v.autor||'')}</span><span>Artigos</span><span>${novo.artigos.length} (${novo.capitulos.length} capítulos)${novo.artigos.filter(a=>a.origem==='TM').length?` · ${novo.artigos.filter(a=>a.origem==='TM').length} trabalho(s) não previsto(s)`:''}</span>
    <span>Novos</span><span><b>${d.novos.length}</b><ul>${li(d.novos,a=>`<li>${esc(a.item)} ${esc(a.descricao)}</li>`)}</ul></span>
    <span>Alterados</span><span><b>${d.alterados.length}</b><ul>${li(d.alterados,x=>`<li>${esc(x.a.item)}: ${x.ch.join(', ')}</li>`)}</ul></span>
    <span>Removidos</span><span><b>${d.removidos.length}</b><ul>${li(d.removidos,a=>`<li>${esc(a.item)} ${esc(a.descricao)}</li>`)}</ul></span>
    ${d.reativados.length?`<span>Reativados</span><span>${d.reativados.length}</span>`:''}<span>Iguais</span><span>${d.iguais.length}</span></div>
    <p class="hint">Fica guardado nesta pasta como cópia local (orcamento.json). Os preços já definidos nos subempreiteiros não são alterados; artigos novos têm de ser atribuídos aos subempreiteiros.</p>
    <div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Carregar v${v.numero}</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{const conv=await aplicarImportacao(novo,fileLike,d);S.orc.versao_crm=v.numero;S.orc.versao_crm_em=v.data;S.orc.origem='CRM_NT';await FS.writeJson(S.obraDir,'orcamento.json',S.orc);dlg.close();
    toast(`Orçamento v${v.numero} do CRM_NT carregado: +${d.novos.length} ~${d.alterados.length} −${d.removidos.length}${conv?` · ${conv} artigo(s) fora do orçamento passaram a contratuais`:''}`,'ok');viewOrc();renderNav();};
}
// ao abrir a obra (DO): herda a versão corrente do CRM_NT — carrega se não há orçamento, substitui se é de xlsx ou mais antigo; nunca bloqueia
async function herdarOrcCRM_(){try{if(S.papel!=='DO'||!S.obra)return;await carregarOrcCRM_(true);}catch(e){console.warn('herdar orçamento',e);}}
async function verificarVersaoOrc_(){
  try{if(S.papel!=='DO'||!S.obra)return;const r=await CRM.orcConsola(S.obra.obra.numero);if(!r||!r.ok)return;
    if(!r.orcamento){if(!S.orc)toast('Esta obra ainda não tem orçamento no CRM_NT — importa-o no cartão da obra antes de adjudicar','warn');return;}
    if(!S.orc)toast(`O CRM_NT tem o orçamento v${r.versao.numero} desta obra — carrega-o no ecrã Orçamento`,'warn');
    else if(S.orc.versao_crm==null)toast(`Esta pasta tem um orçamento importado por xlsx; o CRM_NT tem a v${r.versao.numero} — carrega-a no ecrã Orçamento para ficarem alinhados`,'warn');
    else if(r.versao.numero>S.orc.versao_crm)toast(`Há uma versão mais recente do orçamento no CRM_NT (v${r.versao.numero}; tens a v${S.orc.versao_crm}) — carrega-a no ecrã Orçamento`,'warn');
  }catch(e){}
}
function papelPasta_(){return S.papel==='CONTROLLER'?'CONTROLLER':'DO';}
async function sincCfg_(dir){const cfg=(await FS.readJson(dir,'consola.json'))||{};cfg.papel=papelPasta_();cfg.nome=CTX.nome;cfg.crm={email:CTX.email,em:hoje()};try{await FS.writeJson(dir,'consola.json',cfg);}catch(e){}S.cfg=cfg;if(S.ent){try{await FS.writeJson(dir,'entidades.json',S.ent);}catch(e){}}}
async function sincEnt_(){const r=await CRM.subs();if(r&&r.ok){S.ent={importado_em:hoje(),ficheiro:'CRM_NT',entidades:r.subs.map(s=>({codigo:s.codigo,nome:s.nome,nif:s.nif,email:s.email||'',telefone:''}))};if(S.root){try{await FS.writeJson(S.root,'entidades.json',S.ent);}catch(e){}}}return r;}
async function atualizarBadge_(){try{if(S.papel==='CONTROLLER'){const r=await CRM.envios();S.badge=r&&r.ok?r.envios.filter(e=>e.estado==='pendente').length:0;}else if(S.papel==='ADMIN'){const r=await CRM.fluxo();S.badge=r&&r.ok?r.contadores.a_aprovar:0;}else S.badge=0;}catch(e){S.badge=0;}if(typeof CTX.onBadge==='function')CTX.onBadge(S.badge||0);}
// ---- AU-12 · auto a ecrã inteiro (Controller: copiar para o Eticadata; DO/Admin: consulta) ----
function subDoAuto_(d){const subs=(S.obra&&S.obra.subempreiteiros)||[];return subs.find(x=>x.id===d.sub)||subs.find(x=>x.nome===d.sub_nome)||{};}
function autoCabecalho_(a){const d=a.dados,s=subDoAuto_(d),t=d.totais||{};
  const cab=[['Auto n.º',`${a.numero}${a.S?'S':''}`],['Identificador',a.id],['Subempreiteiro',d.sub_nome],['NIF',s.nif||'—'],['E-mail',s.email||'—'],['Código ERP',s.codigo_erp||s.codigo||'—'],['Especialidade',d.especialidade],['Período',d.periodo],['Data do auto',d.data_auto],['Emitido',`${new Date(d.emitido_em).toLocaleString('pt-PT')}${d.emitido_por?' · '+d.emitido_por:''}`],['Valor do mês',eur(t.valor_mes)],['Acumulado',eur(t.valor_acumulado)]];
  return cab;}
function autoTabelaHTML_(d){const t=d.totais||{};
  return `<table><thead><tr><th>Item</th><th>Descrição</th><th class="num">Adj.</th><th class="num">Preço</th><th class="num">Anterior</th><th class="num">Mês</th><th class="num">Acumulado</th><th class="num">Valor mês</th><th>Avisos</th></tr></thead><tbody>
    ${d.linhas.map(l=>`<tr><td>${esc(l.item)}</td><td>${descH(l)}</td><td class="num">${fmt(l.qtd_adjudicada)}</td><td class="num">${fmt(l.preco)}</td><td class="num">${fmt(l.acum_anterior)}</td><td class="num">${fmt(l.mes)}</td><td class="num">${fmt(l.real)}</td><td class="num">${eur(l.valor_mes)}</td><td>${(l.avisos||[]).map(x=>`<span class="tag warn" title="${esc(NOMES_AVISO[x]||x)}">${x}</span>`).join(' ')}</td></tr>`).join('')}
    <tr class="tot"><td colspan="7">TOTAL</td><td class="num">${eur(t.valor_mes)}</td><td></td></tr></tbody></table>`;}
function verAutoFull_(id){
  const a=S.autos.find(x=>x.id===id);if(!a||!a.dados)return toast('Auto sem dados','warn');const d=a.dados;
  let el=$('#autoFull');if(el)el.remove();el=document.createElement('div');el.id='autoFull';
  el.innerHTML=`<div class="afTop"><h2>${esc(id)}</h2><span class="tag ${a.estado==='EMITIDO'?'ok':''}">${a.estado}</span><span class="sp" style="flex:1"></span><button class="sm" id="afSep">Abrir em separador</button><button class="sm" id="afImp">Imprimir / PDF</button><button class="sm" id="afX">✕ Fechar</button></div>
    <div class="afBody"><div class="afCab">${autoCabecalho_(a).map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(String(v==null?'':v))}</b></div>`).join('')}</div>
    <div class="card" style="padding:0;overflow:auto">${autoTabelaHTML_(d)}</div>
    ${d.avisos&&d.avisos.length?`<div class="msg warn" style="margin-top:8px">${d.avisos.length} aviso(s) neste auto: ${d.avisos.map(x=>esc(NOMES_AVISO[x]||x)).join('; ')}</div>`:''}</div>`;
  ROOT.appendChild(el);
  const fechar=()=>{el.remove();document.removeEventListener('keydown',esc_);};const esc_=e=>{if(e.key==='Escape')fechar();};document.addEventListener('keydown',esc_);
  $('#afX').onclick=fechar;
  $('#afImp').onclick=()=>imprimirHTML_(autoPaginaHTML_(a),'Auto '+id);
  $('#afSep').onclick=()=>{const w=window.open('','_blank');if(!w)return toast('O browser bloqueou o separador novo — permite popups para o CRM_NT','warn');w.document.open();w.document.write('<!doctype html><html lang="pt"><head><meta charset="utf-8"><title>Auto '+esc(id)+'</title><style>'+PRINT_CSS_+' body{padding:16px;font-size:11pt} .afCab{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:6px 18px;border:1px solid #c9d7e8;border-radius:9px;padding:10px 12px;margin-bottom:12px} .afCab span{display:block;font-size:9pt;color:#6c757d;text-transform:uppercase} .afCab b{font-size:11.5pt;user-select:all;overflow-wrap:anywhere} table{font-size:10pt}</style></head><body>'+autoPaginaHTML_(a)+'</body></html>');w.document.close();};
}
function autoPaginaHTML_(a){const d=a.dados;
  return `<div class="pcab">${CTX.logo?`<img src="${CTX.logo}" alt="">`:''}<div><h1>Auto de medição ${esc(a.id)}</h1><div class="pob">${esc(S.obra.obra.numero)} · ${esc(S.obra.obra.nome)}</div></div><div class="pmt">${a.estado}<br>Impresso em ${new Date().toLocaleString('pt-PT')}</div></div>
    <div class="afCab">${autoCabecalho_(a).map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(String(v==null?'':v))}</b></div>`).join('')}</div>${autoTabelaHTML_(d)}`;}
// ---- AU-12 · Controller dentro da obra: envios por importar desta obra no topo de «Autos recebidos» ----
async function enviosObraHTML_(){
  const r=await CRM.envios();const todos=(r&&r.envios)||[];const lst=todos.filter(e=>String(e.obra)===String(S.emb.cod));
  S.badge=todos.filter(e=>e.estado==='pendente').length;const pend=lst.filter(e=>e.estado==='pendente');S.badgeEmb=pend.length;renderNav();
  if(!lst.length)return '';
  return `<div class="card" style="${pend.length?'border-color:#f0c36d;background:#fffbea':''}"><h3 style="margin-top:0">Envios do Diretor de Obra ${pend.length?`<span class="tag warn">${pend.length} por importar</span>`:'<span class="tag ok">tudo importado</span>'}</h3>
    <table><thead><tr><th>Recebido</th><th>De</th><th>Ficheiro</th><th class="num">Autos</th><th>Estado</th><th></th></tr></thead><tbody>
    ${lst.slice(0,12).map(e=>`<tr><td>${dtl(e.enviado_em)}</td><td>${esc(e.enviado_por)}</td><td>${esc(e.ficheiro)}</td><td class="num">${e.n_autos}</td><td>${e.estado==='pendente'?'<span class="tag warn">por importar</span>':`<span class="tag ok">importado ${dtl(e.importado_em)}</span>`}</td><td>${e.estado==='pendente'?`<button class="sm" data-imp="${e.id}" ${S.root?'':'disabled'}>Importar</button>`:`<button class="sec sm" data-imp="${e.id}" ${S.root?'':'disabled'}>Importar de novo</button>`}</td></tr>`).join('')}</tbody></table></div>`;
}
function ligarEnvios_(m){m.querySelectorAll('[data-imp]').forEach(b=>b.onclick=()=>importarEnvioCRM_(+b.dataset.imp));}
const PRINT_CSS_='@page{size:A4 landscape;margin:12mm} html,body{margin:0;padding:0;background:#fff} body{font:10pt/1.3 "Segoe UI",Arial,sans-serif;color:#000} '
 +'.pcab{display:flex;align-items:center;gap:16px;border-bottom:2px solid #1e4c84;padding-bottom:8px;margin-bottom:10px} .pcab img{height:40px;max-width:180px;object-fit:contain} .pcab h1{font-size:15pt;margin:0;color:#1e4c84} .pcab .pob{font-size:12pt;font-weight:700} .pcab .pmt{margin-left:auto;text-align:right;font-size:9pt;color:#333;display:block} '
 +'table{width:100%;border-collapse:collapse;font-size:8.5pt} th,td{border:1px solid #999;padding:3px 5px;vertical-align:top} th{background:#e8eef6;color:#1e4c84;text-align:left;font-size:8.5pt} thead{display:table-header-group} tr{page-break-inside:avoid} td.num,th.num{text-align:right;white-space:nowrap} tr.cap td{background:#f1f3f5;font-weight:700} tr.tot td{font-weight:700;background:#e8eef6} .fb{color:#555;font-style:italic} .prod{margin-top:10px;font-size:8.5pt;color:#444;border-top:1px solid #999;padding-top:6px} '
 +'@media print{ th{-webkit-print-color-adjust:exact;print-color-adjust:exact} tr.cap td,tr.tot td{-webkit-print-color-adjust:exact;print-color-adjust:exact} }';
// imprime HTML num iframe isolado (a página do CRM não entra): sem páginas em branco, sem cortes; o título vira o nome do PDF
function imprimirHTML_(html,titulo){
  let fr=document.getElementById('autosPrintFrame');if(fr)fr.remove();
  fr=document.createElement('iframe');fr.id='autosPrintFrame';fr.setAttribute('aria-hidden','true');fr.style.cssText='position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
  document.body.appendChild(fr);
  const d=fr.contentDocument;d.open();d.write('<!doctype html><html lang="pt"><head><meta charset="utf-8"><title>'+esc(titulo||'Impressão')+'</title><style>'+PRINT_CSS_+'</style></head><body>'+html+'</body></html>');d.close();
  let feito=false;const go=()=>{if(feito)return;feito=true;try{fr.contentWindow.focus();fr.contentWindow.print();}catch(e){console.warn('[autos] print no iframe falhou',e);window.print();}};
  const img=d.querySelector('img');
  if(img&&!img.complete){img.addEventListener('load',go);img.addEventListener('error',go);setTimeout(go,1500);}else setTimeout(go,120);
}
function descarregarBlob_(buf,nome){const blob=new Blob([buf]);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function bytesParaB64_(buf){const b=new Uint8Array(buf);let s='';for(let i=0;i<b.length;i+=0x8000)s+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000));return btoa(s);}
function b64ParaBytes_(b64){const bin=atob(b64);const out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out;}
const PASSO_LBL={2:'enviado ao Controller',3:'importado',4:'aprovação',5:'lançado no ERP',6:'enviado ao sub'};
function fluxoTag_(a){if(!a)return '<span class="tag">só local</span>';
  if(a.sub_env_em)return `<span class="tag ${a.sem_autorizacao?'err':'ok'}">6 · enviado ao sub${a.sem_autorizacao?' · SEM AUTORIZAÇÃO':''}</span>`;
  if(a.erp_em)return `<span class="tag ok">5 · lançado no ERP</span>`;
  if(a.aprovacao==='recusado')return `<span class="tag err">4 · recusado</span>`;
  if(a.aprovacao==='aprovado')return `<span class="tag ok">4 · aprovado</span>`;
  if(a.importado_em)return `<span class="tag warn">3 · importado · aguarda Admin</span>`;
  return `<span class="tag">2 · enviado ao Controller</span>`;}
const dtl=v=>v?new Date(v).toLocaleString('pt-PT'):'';

// ---- DO: enviar pelo CRM_NT (JSON + xlsx dos emitidos) ----
async function enviarPeloCRM_(env,emitidos,nome){
  const msg=$('#dEnvMsg');const btn=$('#dCRM');if(btn)btn.disabled=true;msg.innerHTML='<div class="msg">a enviar…</div>';
  try{
    const xlsx=[];let total=0;
    for(const a of emitidos){if(!a.xlsx)continue;try{const f=await a.xlsx.getFile();const buf=await f.arrayBuffer();total+=buf.byteLength;if(total>6.5*1024*1024)break;xlsx.push({auto_id:a.id,sha256:a.dados?.xlsx?.sha256||'',b64:bytesParaB64_(buf)});}catch(e){}}
    const r=await CRM.enviar(env,xlsx);
    if(!r||r.erro){msg.innerHTML=`<div class="msg err">${esc(r?r.erro:'sem resposta')}</div>`;if(btn)btn.disabled=false;return;}
    S.obra.ultimo_envio=Object.assign(S.obra.ultimo_envio||{},{crm:{id:r.id,em:hoje(),xlsx:r.xlsx}});if(S.obra.envios&&S.obra.envios.length)S.obra.envios[S.obra.envios.length-1].crm={id:r.id,em:hoje()};await guardarObra();
    msg.innerHTML=`<div class="msg ok">${r.repetido?'Este envio já tinha sido entregue ao Controller (nada duplicado).':`Entregue ao Controller pelo CRM_NT: ${r.n_autos} Auto(s), ${r.xlsx} Excel guardado(s) como cópia de segurança.`}</div>`;
  }catch(e){msg.innerHTML=`<div class="msg err">${esc(e.message)}</div>`;if(btn)btn.disabled=false;}
}
// ---- DO/Controller: repor a pasta de uma obra a partir do último envio no CRM ----
async function reporPastaUI_(oc){
  const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Repor ${esc(oc.codigo+' · '+oc.nome)} a partir do CRM_NT</h3><div class="muted">a procurar envios…</div>`;dlg.showModal();
  const r=await CRM.envios();const lst=(r&&r.envios||[]).filter(e=>String(e.obra)===String(oc.codigo));
  if(!lst.length){dlg.innerHTML=`<h3 style="margin-top:0">Repor obra</h3><div class="msg warn">Não há envios desta obra feitos pelo CRM_NT.</div><div class="right"><button id="dOk">Fechar</button></div>`;$('#dOk').onclick=()=>dlg.close();return;}
  const ult=lst[0];const comX=lst.filter(e=>e.xlsx>0);
  dlg.innerHTML=`<h3 style="margin-top:0">Repor ${esc(oc.codigo+' · '+oc.nome)} a partir do CRM_NT</h3>
    <div class="kv"><span>Último envio</span><span>${esc(ult.ficheiro)} · ${esc(ult.enviado_por)} · ${dtl(ult.enviado_em)} · ${ult.n_autos} auto(s)</span><span>Excel guardados</span><span>${comX.reduce((t,e)=>t+e.xlsx,0)} em ${comX.length} envio(s)</span></div>
    <p class="hint">Cria a pasta <code>${esc(oc.codigo+'_'+slug(oc.nome))}</code> com <code>obra.json</code>, <code>orcamento.json</code> e <code>autos\\*.json</code> do último envio, e os <code>*.xlsx</code> guardados no CRM (de todos os envios). <b>Nunca substitui ficheiros que já existam.</b> As medições da zona livre só vêm nos Excel guardados; rascunhos por emitir não se recuperam.</p>
    <div id="rpMsg"></div><div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Repor</button></div>`;
  $('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{const msg=$('#rpMsg');$('#dOk').disabled=true;msg.innerHTML='<div class="msg">a repor…</div>';
    try{const d=await CRM.descarregar(ult.id,false);if(!d||!d.ok)throw new Error(d&&d.erro||'sem resposta');const env=d.envio;
      const pasta=env.pasta||`${oc.codigo}_${slug(oc.nome)}`;const h=await S.root.getDirectoryHandle(pasta,{create:true});let n=0,x=0,saltados=0;
      if(!(await FS.exists(h,'obra.json'))){const o=JSON.parse(JSON.stringify(env.obra));o.reposto={de:ult.ficheiro,em:hoje(),por:CTX.nome};await FS.writeJson(h,'obra.json',o);n++;}else saltados++;
      if(env.orcamento&&!(await FS.exists(h,'orcamento.json'))){await FS.writeJson(h,'orcamento.json',env.orcamento);n++;}
      const ad=await h.getDirectoryHandle('autos',{create:true});await h.getDirectoryHandle('exportacoes',{create:true});
      for(const a of (env.autos||[])){const c=JSON.parse(JSON.stringify(a));delete c.estado;if(!(await FS.exists(ad,a.id+'.json'))){await FS.writeJson(ad,a.id+'.json',c);n++;}else saltados++;}
      for(const e of comX){const dx=await CRM.descarregar(e.id,true);for(const f of (dx&&dx.xlsx||[])){if(await FS.exists(ad,f.auto_id+'.xlsx')){saltados++;continue;}const fh=await ad.getFileHandle(f.auto_id+'.xlsx',{create:true});const w=await fh.createWritable();await w.write(b64ParaBytes_(f.b64));await w.close();x++;}}
      msg.innerHTML=`<div class="msg ok">Reposto: ${n} ficheiro(s) JSON, ${x} Excel${saltados?` · ${saltados} já existiam e ficaram como estavam`:''}.</div>`;
      setTimeout(()=>{dlg.close();abrirObra(pasta);},900);
    }catch(e){msg.innerHTML=`<div class="msg err">${esc(e.message)}</div>`;$('#dOk').disabled=false;}
  };
}
// ---- DO: criar subempreiteiro novo (não está no ERP) — regras do CRM ----
function criarSubNovoUI(){
  const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Criar novo subempreiteiro (não está no ERP)</h3>
    <div class="row"><label><span>Nome (como vai ficar no ERP)</span><input id="nsNome" style="width:300px"></label><label><span>NIF (PT, 9 dígitos)</span><input id="nsNif" class="short" maxlength="9"></label><label><span>E-mail <span class="tag err">obrigatório</span></span><input id="nsEmail" type="email" style="width:240px"></label></div>
    <div class="msg warn" style="margin-top:8px"><b>Regras:</b> NIF português válido e único na tabela (se já existir, o CRM devolve esse); e-mail obrigatório; nome em maiúsculas. Recebe um código provisório <code>C-nnn</code> e fica marcado «por criar no ERP» para o Admin; quando o Admin o ligar ao código ERP, tudo o que foi emitido mantém-se.</div>
    <div id="nsMsg"></div><div class="right"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Criar e chamar à obra</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{const nome=$('#nsNome').value.trim(),nif=$('#nsNif').value.replace(/\s/g,''),email=$('#nsEmail').value.trim();
    if(!nifValido(nif))return toast('NIF inválido (9 dígitos com dígito de controlo)','err');if(!emailValido(email))return toast('E‑mail obrigatório e válido','err');
    const r=await CRM.subCriar({nome,nif,email});if(!r||r.erro)return toast(r?r.erro:'sem resposta','err');
    await sincEnt_();dlg.close();toast(r.existia?`Já existia na tabela: ${r.codigo} · ${r.nome}`:`Criado: ${r.codigo} · ${r.nome} (por criar no ERP)`,'ok');
    S._tabSubs='novo';await viewSubs();const inp=$('#sEnt');if(inp){inp.value=`${r.codigo} · ${r.nome}`;inp.dispatchEvent(new Event('input'));}
  };
}
// ---- Controller: fila de envios recebidos pelo CRM_NT ----
async function viewFila(){
  const m=$('#main');m.innerHTML='<h2>Envios recebidos</h2><div class="muted">a ler…</div>';
  const r=await CRM.envios();const todos=(r&&r.envios)||[];const lst=S.emb?todos.filter(e=>String(e.obra)===String(S.emb.cod)):todos;S.badge=todos.filter(e=>e.estado==='pendente').length;const pend=lst.filter(e=>e.estado==='pendente').length;if(S.emb)S.badgeEmb=pend;renderNav();
  let h=`<div class="crumb">CRM_NT › Autos › Envios recebidos</div><h2>Envios recebidos${S.emb?' — '+esc(S.emb.cod)+' '+esc(S.emb.nome):''} ${pend?`<span class="tag warn">${pend} por importar</span>`:''}</h2>${S.emb&&!S.obra?'<div class="msg">Esta obra ainda não tem pasta em CONTROLO_AUTOS — fica criada ao importar o primeiro envio.</div>':''}
  <p class="subt">Envios entregues pelos DO através do CRM_NT. Importar corre a mesma verificação de sempre (novos / já recebidos / conflitos) e grava na tua pasta de controlo.${S.root?'':' <span class="tag err">Escolhe primeiro a pasta CONTROLO_AUTOS em Obras.</span>'}</p>
  <div class="card"><table><thead><tr><th>Recebido</th><th>Obra</th><th>De</th><th>Ficheiro</th><th class="num">Autos</th><th>Resumo</th><th>Estado</th><th></th></tr></thead><tbody>`;
  for(const e of lst){const rs=e.resumo||{};
    h+=`<tr><td>${dtl(e.enviado_em)}</td><td><b>${esc(e.obra)}</b> ${esc(e.obra_nome)}</td><td>${esc(e.enviado_por)}</td><td>${esc(e.ficheiro)}<br><small class="hint">${Math.round((e.tamanho||0)/1024)} KB${e.xlsx?` · ${e.xlsx} Excel`:''}</small></td><td class="num">${e.n_autos}</td><td>${(e.periodos||[]).join(' · ')}${rs.valor_total?` · ${eur(rs.valor_total)}`:''}${!e.n_autos?' <span class="hint">sem autos emitidos (orçamento + subempreitadas)</span>':''}</td>
      <td>${e.estado==='pendente'?'<span class="tag warn">por importar</span>':`<span class="tag ok">importado ${dtl(e.importado_em)} · ${esc(e.importado_por)}</span>${e.importado_resultado&&e.importado_resultado.conflitos&&e.importado_resultado.conflitos.length?` <span class="tag err">${e.importado_resultado.conflitos.length} conflito(s)</span>`:''}`}</td>
      <td style="white-space:nowrap">${e.estado==='pendente'?`<button class="sm" data-imp="${e.id}" ${S.root?'':'disabled'}>Importar</button>`:`<button class="sec sm" data-imp="${e.id}" ${S.root?'':'disabled'}>Importar de novo</button>`}</td></tr>`;}
  if(!lst.length)h+=`<tr><td colspan="8" class="hint">ainda sem envios pelo CRM_NT</td></tr>`;
  h+=`</tbody></table><p class="hint" style="margin-top:8px">Um envio recebido por e-mail continua a importar-se por «Importar envio de um DO… (ficheiro)» em Obras.</p></div>`;
  m.innerHTML=h;
  m.querySelectorAll('[data-imp]').forEach(b=>b.onclick=()=>importarEnvioCRM_(+b.dataset.imp));
}
async function importarEnvioCRM_(id){
  if(!S.root)return toast('Escolhe primeiro a pasta CONTROLO_AUTOS','warn');
  toast('a descarregar o envio…');const d=await CRM.descarregar(id,false);if(!d||!d.ok)return toast(d&&d.erro||'sem resposta','err');
  const file=new File([JSON.stringify(d.envio)],d.ficheiro,{type:'application/json'});
  await importarEnvioUI(file,id);
}
// ---- DO / Controller: autos da obra tal como o CRM os regista (valor por auto, somatório, fluxo) ----
async function viewObraAutos(cod){
  const m=$('#main');const codigo=cod||(S.emb&&S.emb.cod)||(S.obra&&S.obra.obra.numero);if(!codigo)return go('entrada');
  m.innerHTML='<h2>Autos da obra</h2><div class="muted">a ler…</div>';
  const r=await CRM.estadoObra(codigo);if(!r||!r.ok){m.innerHTML=`<h2>Autos da obra</h2><div class="msg err">${esc(r&&r.erro||'sem resposta')}</div>`;return;}
  const ctrl=S.papel==='CONTROLLER';const pe=r.por_estado||{};
  let h=`<div class="crumb">CRM_NT › Obras › ${esc(r.obra.codigo)} ${esc(r.obra.nome)} › Autos a subempreiteiros</div><h2>Autos a subempreiteiros — ${esc(r.obra.codigo)} ${esc(r.obra.nome)}</h2>
  <p class="subt">O que está registado no CRM_NT a partir dos envios — nunca o Excel local. Substituídos excluídos dos somatórios.</p>
  <div class="card"><div class="kv"><span>Somatório da obra</span><span><b style="font-size:18px">${eur(r.total)}</b> · ${r.n_autos} auto(s) válido(s) · ${r.n_subs} subempreiteiro(s) · ${(r.por_periodo||[]).length} período(s)</span>
    <span>Por estado</span><span><span class="tag warn">aguarda Admin: ${eur(pe.a_aprovar||0)}</span> <span class="tag ok">aprovado: ${eur(pe.aprovado||0)}</span> <span class="tag err">recusado: ${eur(pe.recusado||0)}</span> <span class="tag">lançado no ERP: ${eur(pe.erp||0)}</span> <span class="tag ok">enviado ao sub: ${eur(pe.enviado_sub||0)}</span>${pe.sem_autorizacao?` <span class="tag err">sem autorização: ${eur(pe.sem_autorizacao)}</span>`:''}</span>
    <span>DO</span><span>${esc(r.obra.do_nome||'—')}</span></div></div>`;
  for(const s of (r.por_sub||[])){const rows=r.autos.filter(a=>(a.sub_codigo||a.sub_nome)===(s.sub_codigo||s.sub_nome));
    h+=`<div class="card"><h3 style="margin-top:0">${esc(s.sub_nome)} <span class="tag">${esc(s.sub_codigo||'')}</span> <span class="tag ok" style="float:right">Σ ${eur(s.total)}</span></h3>
    <table><thead><tr><th>Esp.</th><th>Auto</th><th>Período</th><th class="num">Valor mês</th><th class="num">Acumulado</th><th>Fluxo</th><th>Detalhe</th>${ctrl?'<th></th>':''}</tr></thead><tbody>`;
    for(const a of rows){h+=`<tr class="${a.substituido?'rem':''}"><td>${esc(a.especialidade)}</td><td>${esc(a.auto_id)}</td><td>${esc(a.periodo)}</td><td class="num">${eur(a.valor_mes)}</td><td class="num">${eur(a.valor_acumulado)}</td><td>${a.substituido?'<span class="tag">substituído</span>':fluxoTag_(a)}</td>
      <td class="hint">${a.aprov_em?`${a.aprovacao} ${dtl(a.aprov_em)} · ${esc(a.aprov_por)}${a.aprov_motivo?' — '+esc(a.aprov_motivo):''}<br>`:''}${a.erp_em?`ERP ${esc(a.erp_doc||'')} ${dtl(a.erp_em)}<br>`:''}${a.sub_env_em?`✉ ${esc(a.sub_email||'sem e-mail')} ${dtl(a.sub_env_em)} · ${esc(a.sub_env_por)}`:''}</td>
      ${ctrl?`<td style="white-space:nowrap">${!a.substituido&&!a.erp_em?`<button class="sec sm" data-erp="${esc(a.auto_id)}">Lançado no ERP…</button>`:''}${!a.substituido&&!a.sub_env_em?`<button class="${a.aprovacao==='aprovado'?'':'sec'} sm" data-sub="${esc(a.auto_id)}">Enviado ao sub</button>`:''}</td>`:''}</tr>`;}
    h+=`</tbody></table></div>`;}
  h+=`<div class="card"><h3 style="margin-top:0">Por período</h3><table><thead><tr><th>Período</th><th class="num">Autos</th><th class="num">Valor do mês</th><th class="num">Acumulado da obra</th></tr></thead><tbody>${(r.por_periodo||[]).map(p=>`<tr><td>${esc(p.periodo)}</td><td class="num">${p.n}</td><td class="num">${eur(p.total)}</td><td class="num"><b>${eur(p.acumulado)}</b></td></tr>`).join('')||'<tr><td colspan="4" class="hint">sem autos registados no CRM</td></tr>'}</tbody></table></div>
  <div class="card"><h3 style="margin-top:0">Envios pelo CRM_NT</h3>${(r.envios||[]).map(e=>`<div>${dtl(e.enviado_em)} · ${esc(e.enviado_por)} · ${esc(e.ficheiro)} · ${e.n_autos} auto(s) · ${e.estado==='pendente'?'<span class="tag warn">por importar</span>':'<span class="tag ok">importado</span>'}</div>`).join('')||'<span class="hint">nenhum</span>'}</div>`;
  m.innerHTML=h;
  m.querySelectorAll('[data-erp]').forEach(b=>b.onclick=async()=>{const doc=prompt('Documento do ERP (ex.: FC 2026/1187) — opcional:','');if(doc===null)return;const x=await CRM.registarERP(codigo,b.dataset.erp,doc);if(!x||x.erro)return toast(x&&x.erro||'erro','err');toast(x.sem_aprovacao?'Registado no ERP — atenção: este auto NÃO tem aprovação do Admin':'Registado como lançado no ERP','ok');viewObraAutos(codigo);});
  m.querySelectorAll('[data-sub]').forEach(b=>b.onclick=async()=>{const a=r.autos.find(z=>z.auto_id===b.dataset.sub);const ok=confirm(`Registar que o auto ${a.auto_id} foi enviado ao subempreiteiro?${a.aprovacao!=='aprovado'?'\n\nATENÇÃO: não tem aprovação do Admin — fica registado como SEM AUTORIZAÇÃO.':''}`);if(!ok)return;const x=await CRM.registarEnvioSub(codigo,a.auto_id);if(!x||x.erro)return toast(x&&x.erro||'erro','err');toast(x.sem_autorizacao?'Registado SEM autorização do Admin':'Registado: enviado a '+(x.email||'(sem e-mail na tabela)'),x.sem_autorizacao?'warn':'ok');viewObraAutos(codigo);});
}
// ---- Admin: fluxo (aprovar / recusar), autos por obra, configurações ----
async function viewFluxo(){
  const m=$('#main');m.innerHTML='<h2>Fluxo de autos</h2><div class="muted">a ler…</div>';limparMemoria_();
  let r=await CRM.fluxo();if(!r||!r.ok){m.innerHTML=`<h2>Fluxo de autos</h2><div class="msg err">${esc(r&&r.erro||'sem resposta')}</div>`;return;}
  const c=r.contadores;S.badge=c.a_aprovar;if(S.emb){const cod=String(S.emb.cod);r={...r,a_aprovar:r.a_aprovar.filter(a=>String(a.obra)===cod),historico:(r.historico||[]).filter(x=>String(x.obra)===cod)};S.badgeEmb=r.a_aprovar.length;}renderNav();S._fluxo=r;
  let h=`<div class="crumb">CRM_NT › Autos › Fluxo</div><h2>Fluxo de autos${S.emb?' — '+esc(S.emb.cod)+' '+esc(S.emb.nome):''} ${S.emb?(r.a_aprovar.length?`<span class="tag warn">${r.a_aprovar.length} a aprovar</span>`:''):(c.a_aprovar?`<span class="tag warn">${c.a_aprovar} a aprovar</span>`:'')}</h2>
  <p class="subt">O Admin não tem pasta: vê o que está gravado no CRM_NT e aprova ou recusa a emissão de cada auto ao subempreiteiro. Se o Controller enviar sem aprovação, fica registado como <b>sem autorização</b>.</p>
  ${S.emb?'':`<div class="card"><div class="row" style="gap:6px"><span class="tag warn">a aprovar: ${c.a_aprovar}</span><span class="tag ok">aprovados sem ERP: ${c.aprovados_sem_erp}</span><span class="tag">lançados no ERP por enviar: ${c.erp_por_enviar}</span><span class="tag ok">enviados ao sub: ${c.enviados_sub}</span><span class="tag err">recusados: ${c.recusados}</span>${c.sem_autorizacao?`<span class="tag err">sem autorização: ${c.sem_autorizacao}</span>`:''}</div></div>`}
  <div class="card"><h3 style="margin-top:0">A aprovar</h3><table><thead><tr><th>Auto · obra</th><th>Subempreiteiro · esp.</th><th>DO · importado</th><th>Per.</th><th class="num">Valor mês</th><th class="num">Acum.</th><th>Avisos</th><th></th></tr></thead><tbody>`;
  for(const a of r.a_aprovar){h+=`<tr><td><b>${esc(a.auto_id)}</b><br><small class="hint">${esc(a.obra)} ${esc(a.obra_nome)}</small></td><td>${esc(a.sub_nome)} · ${esc(a.especialidade)}</td><td>${esc(a.do_nome)}<br><small class="hint">${a.importado_em?dtl(a.importado_em):'<span class="tag">ainda não importado pelo Controller</span>'}</small></td><td>${esc(a.periodo)}</td><td class="num">${eur(a.valor_mes)}</td><td class="num">${eur(a.valor_acumulado)}</td><td>${a.conflito?'<span class="tag err">conflito na importação</span>':''}${a.substitutivo?' <span class="tag warn">substitutivo</span>':''}</td>
    <td style="white-space:nowrap"><button class="sm" data-ap="${esc(a.obra)}|${esc(a.auto_id)}">Aprovar</button> <button class="danger sm" data-rec="${esc(a.obra)}|${esc(a.auto_id)}">Recusar…</button><br><button class="sec sm" style="margin-top:4px" data-ver="${esc(a.obra)}|${esc(a.auto_id)}|${a.envio_id||''}">ver auto</button> <button class="sec sm" style="margin-top:4px" data-dr="${esc(a.obra)}|${a.envio_id||''}">DR</button></td></tr>`;}
  if(!r.a_aprovar.length)h+=`<tr><td colspan="8" class="hint">nada a aprovar</td></tr>`;
  h+=`</tbody></table><p class="hint">«DR» calcula a demonstração de resultados em memória a partir do envio guardado no CRM_NT — a mesma função da consola do Controller, sem pasta.</p></div>
  <div class="card"><h3 style="margin-top:0">Histórico do fluxo</h3><table><thead><tr><th>Quando</th><th>Auto</th><th>Obra</th><th>Passo</th><th>Por</th><th>Detalhe</th></tr></thead><tbody>${r.historico.slice(0,40).map(x=>`<tr><td>${dtl(x.em)}</td><td>${esc(x.auto_id)}</td><td>${esc(x.obra)}</td><td><span class="tag ${x.passo>=4?'ok':''}">${x.passo} · ${PASSO_LBL[x.passo]||''}</span></td><td>${esc(x.por||'')}</td><td class="hint">${esc(x.detalhe||'')}</td></tr>`).join('')||'<tr><td colspan="6" class="hint">—</td></tr>'}</tbody></table></div>`;
  m.innerHTML=h;
  m.querySelectorAll('[data-ap]').forEach(b=>b.onclick=async()=>{const [cod,id]=b.dataset.ap.split('|');const x=await CRM.aprovar(cod,id,true,'');if(!x||x.erro)return toast(x&&x.erro||'erro','err');toast(id+' aprovado','ok');viewFluxo();});
  m.querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>{const [cod,id]=b.dataset.rec.split('|');const dlg=$('#dlg');dlg.innerHTML=`<h3 style="margin-top:0">Recusar ${esc(id)}</h3><label style="display:block"><span>Motivo (vai ao DO e ao Controller)</span><textarea id="rcMot" style="width:100%;height:80px;font:inherit;border:1px solid var(--line);border-radius:6px;padding:6px"></textarea></label><p class="hint">O auto fica RECUSADO; o DO corrige com um substitutivo (S) na consola e volta a enviar. O ficheiro no PC do DO não é alterado pelo CRM_NT.</p><div class="right"><button class="sec" id="dCancel">Cancelar</button><button class="danger" id="dOk">Recusar</button></div>`;dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
    $('#dOk').onclick=async()=>{const mot=$('#rcMot').value.trim();if(!mot)return toast('Indica o motivo','warn');const x=await CRM.aprovar(cod,id,false,mot);if(!x||x.erro)return toast(x&&x.erro||'erro','err');dlg.close();toast(id+' recusado','warn');viewFluxo();};});
  m.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>{const [cod,id,env]=b.dataset.ver.split('|');verAutoCRM_(cod,id,env);});
  m.querySelectorAll('[data-dr]').forEach(b=>b.onclick=()=>{const [cod,env]=b.dataset.dr.split('|');drEmMemoria_(cod,env);});
}
function limparMemoria_(){if(S.memAutos){S.memAutos=null;S.obra=null;S.orc=null;S.autos=[];S.obraDir=null;}}
async function carregarEnvioMemoria_(envioId){
  const d=await CRM.descarregar(envioId,false);if(!d||!d.ok)throw new Error(d&&d.erro||'sem resposta');const env=d.envio;
  const autos=(env.autos||[]).map(a=>{const m=String(a.id).match(RE_AUTO_ID_);return {id:a.id,sub:a.sub,esp:a.especialidade,numero:a.numero,S:!!(m&&m[4]),estado:'EMITIDO',dados:a};});
  for(const a of autos)if(!a.S&&autos.find(b=>b.S&&b.sub===a.sub&&b.esp===a.esp&&b.numero===a.numero))a.estado='SUBSTITUIDO';
  S.obra=env.obra;S.orc=env.orcamento;S.memAutos=autos;S.autos=autos;S.obraDir=null;return env;
}
const RE_AUTO_ID_=/^(.+)_(MONTAGEM|MASSAS|PAVIMENTOS)_(\d{3})(S?)$/;
async function verAutoCRM_(cod,id,envioId){
  if(!envioId)return toast('Este auto não tem envio guardado no CRM','warn');
  try{await carregarEnvioMemoria_(+envioId);verAuto(id);}catch(e){toast(e.message,'err');}
}
async function drEmMemoria_(cod,envioId){
  if(!envioId)return toast('Sem envio guardado no CRM para esta obra','warn');
  try{const env=await carregarEnvioMemoria_(+envioId);await viewDR();$('#main').insertAdjacentHTML('afterbegin',`<div class="crumb"><a href="#" id="bVoltarFluxo" style="color:var(--base-tx);font-weight:600">← Fluxo de autos</a> · DR calculada em memória a partir do envio ${esc(env.pasta||'')} (${env.gerado_em?dtl(env.gerado_em):''}) — sem pasta</div>`);$('#bVoltarFluxo').onclick=ev=>{ev.preventDefault();go('fluxo');};}
  catch(e){toast(e.message,'err');}
}
async function viewObrasCRM(){
  const m=$('#main');m.innerHTML='<h2>Autos por obra</h2><div class="muted">a ler…</div>';limparMemoria_();
  const r=await CRM.obras();const lst=(r&&r.obras)||[];
  let h=`<div class="crumb">CRM_NT › Autos › Autos por obra</div><h2>Autos por obra <span class="tag">${lst.length}</span></h2><p class="subt">Valor de cada auto e somatório por obra, tal como registado nos envios pelo CRM_NT.</p><div class="grid">`;
  for(const o of lst)h+=`<div class="ocard" data-c="${esc(o.codigo)}"><div class="body"><div class="ttl"><div class="ico"><svg width="18" height="18"><use href="#i-book"/></svg></div><div><b>${esc(o.codigo+' · '+o.nome)}</b><small>${esc(o.do_nome||'')}</small></div></div>
    <div class="meta"><span>Autos</span><b>${o.n_autos||0}</b><span>Somatório</span><b>${eur(o.total||0)}</b><span>A aprovar</span><b>${o.a_aprovar?`<span class="tag warn">${o.a_aprovar}</span>`:'—'}</b><span>Último envio</span><b>${o.ultimo_envio?dtl(o.ultimo_envio):'—'}</b></div></div>
    <div class="foot"><span class="sp"></span><button class="sm" data-c2="${esc(o.codigo)}">abrir</button></div></div>`;
  h+='</div>';m.innerHTML=h;
  m.querySelectorAll('[data-c],[data-c2]').forEach(d=>d.onclick=ev=>{ev.stopPropagation();S.view='cobras';viewObraAutos(d.dataset.c||d.dataset.c2);});
}
async function viewAdminConfig(){
  const m=$('#main');m.innerHTML='<h2>Configurações Autos</h2><div class="muted">a ler…</div>';limparMemoria_();
  const cfg=await CRM.config();const rs=await CRM.subs();const subs=(rs&&rs.subs)||[];const prov=subs.filter(s=>s.origem==='CRM'&&!s.codigo_erp);
  let h=`<h2>Configurações Autos (Admin)</h2>
  <div class="card"><h3 style="margin-top:0">Regra global</h3><div class="row"><label><span>Dia de fecho dos autos</span><input id="cfDia" type="number" min="1" max="28" value="${cfg&&cfg.dia_fecho||25}"></label><span class="hint" style="flex:1">Período de um auto = de (dia+1) de um mês a (dia) do seguinte. Vale para todas as obras; escrito em cada <code>obra.json</code> quando a pasta é preparada. Mudar o dia não altera autos já emitidos.</span><button id="bCfDia">Guardar</button></div></div>
  <div class="card"><h3 style="margin-top:0">Tabela de subempreiteiros <span class="tag">${subs.length}</span> ${prov.length?`<span class="tag warn">${prov.length} provisório(s) por criar no ERP</span>`:''}</h3>
    <div class="row"><button id="bImpERP">Importar tabela do ERP (xlsx)…</button><span class="hint" style="flex:1">Colunas Codigo · Subempreiteiro · NIF · Pais. Reimportar atualiza nomes e acrescenta novos; <b>NIF não português fica fora</b>; nunca apaga e-mails preenchidos pelos DO.</span></div>
    <div class="row" style="margin-top:8px"><input id="fSubs" placeholder="filtrar por código, nome, NIF ou e-mail" style="width:340px"><label class="chk"><input type="checkbox" id="fSemMail"> só sem e-mail</label><label class="chk"><input type="checkbox" id="fProv"> só provisórios</label></div>
    <div class="scroll" style="max-height:55vh;margin-top:8px"><table><thead><tr><th>Código</th><th>Subempreiteiro</th><th>NIF</th><th>E-mail</th><th>Origem</th><th></th></tr></thead><tbody id="tbSubs"></tbody></table></div></div>
  <div class="card"><h3 style="margin-top:0">Quem faz o quê</h3><div class="kv"><span>Diretor de Obra</span><span>pasta OBRAS no PC · prepara e emite os autos · envia ao Controller</span><span>Controller</span><span>pasta CONTROLO_AUTOS no PC · importa, DR, alertas · lança no ERP e envia ao subempreiteiro</span><span>Admin</span><span>sem pasta · aprova/recusa · esta configuração</span><span>Telemóvel</span><span>consulta de estados e somatórios</span></div></div>`;
  m.innerHTML=h;
  const draw=()=>{const f=($('#fSubs').value||'').toLowerCase(),sm=$('#fSemMail').checked,pv=$('#fProv').checked;let out='';
    for(const s of subs){if(sm&&s.email)continue;if(pv&&!(s.origem==='CRM'))continue;if(f&&!(`${s.codigo} ${s.nome} ${s.nif} ${s.email}`.toLowerCase().includes(f)))continue;
      out+=`<tr><td>${esc(s.codigo)}${s.codigo_erp?` <span class="tag ok">ERP ${esc(s.codigo_erp)}</span>`:''}</td><td>${esc(s.nome)}</td><td>${esc(s.nif)}</td><td>${s.email?esc(s.email):'<span class="tag warn">sem e-mail</span>'}</td><td>${s.origem==='CRM'?`<span class="tag warn">provisório${s.criado_por?' · '+esc(s.criado_por):''}</span>`:'<span class="tag ok">ERP</span>'}</td><td style="white-space:nowrap"><button class="sec sm" data-mail="${esc(s.codigo)}">e-mail…</button>${s.origem==='CRM'&&!s.codigo_erp?` <button class="sm" data-lig="${esc(s.codigo)}">Ligar ao ERP…</button>`:''}</td></tr>`;}
    $('#tbSubs').innerHTML=out||'<tr><td colspan="6" class="hint">sem resultados</td></tr>';
    m.querySelectorAll('[data-mail]').forEach(b=>b.onclick=async()=>{const s=subs.find(x=>x.codigo===b.dataset.mail);const e=prompt(`E-mail de ${s.nome}:`,s.email||'');if(e===null)return;const x=await CRM.subEmail(s.codigo,e.trim());if(!x||x.erro)return toast(x&&x.erro||'erro','err');s.email=x.email;toast('E-mail gravado','ok');draw();});
    m.querySelectorAll('[data-lig]').forEach(b=>b.onclick=async()=>{const s=subs.find(x=>x.codigo===b.dataset.lig);const c=prompt(`Código ERP definitivo para ${s.nome} (${s.codigo}):`,'');if(!c)return;const x=await CRM.subLigarERP(s.codigo,c.trim());if(!x||x.erro)return toast(x&&x.erro||'erro','err');s.codigo_erp=x.codigo_erp;toast('Ligado ao ERP '+x.codigo_erp,'ok');draw();});};
  draw();$('#fSubs').oninput=draw;$('#fSemMail').onchange=draw;$('#fProv').onchange=draw;
  $('#bCfDia').onclick=async()=>{const x=await CRM.config({dia_fecho:+$('#cfDia').value});if(!x||x.erro)return toast(x&&x.erro||'erro','err');CFG.dia_fecho=x.dia_fecho;toast('Dia de fecho: '+x.dia_fecho,'ok');};
  $('#bImpERP').onclick=()=>{$('#fileEnt').value='';$('#fileEnt').click();};
  $('#fileEnt').onchange=e=>{const f=e.target.files[0];if(f)importarERPAdmin_(f);};
}
async function importarERPAdmin_(file){
  let t;try{t=await lerTabelaGenerica(file);}catch(e){return toast('Erro a ler: '+e.message,'err');}
  const campos=[['codigo','Código (ERP)',['codigo','cod','n.º','nº','numero','id','entidade']],['nome','Subempreiteiro',['subempreiteiro','nome','entidade','designacao','fornecedor']],['nif','NIF',['nif','contribuinte','nipc','vat']],['pais','País (opcional)',['pais','país','country']]];
  const dlg=$('#dlg');
  dlg.innerHTML=`<h3 style="margin-top:0">Importar tabela do ERP — ${esc(file.name)}</h3><p class="hint">${t.rows.length} linhas, ${t.cols.length} colunas. Confirma que coluna corresponde a cada campo.</p>
    <div class="kv">${campos.map(([k,lab,c])=>`<span>${lab}</span><span><select class="mapC" data-k="${k}"><option value="-1">— (nenhuma)</option>${t.cols.map((c2,i)=>`<option value="${i}" ${adivinharCol(t.cols,c)===i?'selected':''}>${esc(c2)}</option>`).join('')}</select></span>`).join('')}</div>
    <div class="scroll" style="max-height:30vh;margin-top:8px"><table><thead><tr>${t.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.slice(0,6).map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div id="entMsg"></div><div class="right" style="margin-top:8px"><button class="sec" id="dCancel">Cancelar</button><button id="dOk">Importar para a tabela do CRM_NT</button></div>`;
  dlg.showModal();$('#dCancel').onclick=()=>dlg.close();
  $('#dOk').onclick=async()=>{const map={};dlg.querySelectorAll('.mapC').forEach(sl=>map[sl.dataset.k]=+sl.value);
    if(map.codigo<0||map.nome<0||map.nif<0)return toast('Código, Subempreiteiro e NIF são obrigatórios','warn');
    const linhas=t.rows.map(r=>({codigo:String(r[map.codigo]??'').trim(),nome:String(r[map.nome]??'').trim(),nif:String(r[map.nif]??'').trim(),pais:map.pais>=0?String(r[map.pais]??'').trim():''})).filter(l=>l.codigo&&l.nome);
    $('#dOk').disabled=true;const x=await CRM.subsImportar(linhas);if(!x||x.erro){$('#dOk').disabled=false;return toast(x&&x.erro||'erro','err');}
    dlg.close();toast(`Importado: ${x.novos} novo(s), ${x.atualizados} atualizado(s), ${x.ignorados} ignorado(s) (NIF não PT), ${x.semNif} sem NIF`,'ok');await sincEnt_();viewAdminConfig();};
}

/* ---------- montagem no CRM_NT ---------- */
async function montar(el,ctx){
  ROOT=el;CTX=Object.assign({papel:'DO',nome:'',email:'',logo:''},ctx||{});CRM=crmAdapter_(CTX.callSec);
  KEY_ROOT='root:'+String(CTX.email||'').toLowerCase();
  if(!document.getElementById('autosCss')){const st=document.createElement('style');st.id='autosCss';st.textContent=AUTOS_CSS;document.head.appendChild(st);}
  el.id='autosRoot';el.innerHTML=AUTOS_SKELETON;
  $('#ver').textContent='consola v'+VERSAO+' · CRM_NT';
  const cfg=await CRM.config();
  if(!cfg||!cfg.ok){$('#main').innerHTML=`<div class="msg err">${esc(cfg&&cfg.erro||'Não foi possível ligar ao CRM_NT.')}</div>`;return;}
  CFG.dia_fecho=cfg.dia_fecho||25;CTX.papel=cfg.papel;CTX.nome=cfg.nome||CTX.nome;CTX.email=cfg.email||CTX.email;KEY_ROOT='root:'+String(CTX.email||'').toLowerCase();
  S.papel=CTX.papel;S.root=null;S.obra=null;S.obraDir=null;S.orc=null;S.autos=[];S.memAutos=null;S.descCompleta=descCompleta_();
  // AU-5: montada dentro do cartão da obra (ctx.obra={codigo,nome}) → sem menu lateral, obra fixa, chips em vez de vistas
  S.emb=ctx&&ctx.obra&&ctx.obra.codigo?{cod:String(ctx.obra.codigo),nome:String(ctx.obra.nome||'')}:null;S.badgeEmb=0;
  S.soVista=(ctx&&ctx.vista)||null;
  if(S.emb){$('#nav').className='anav emb';el.classList.add('emb');}
  if(S.soVista){$('#nav').style.display='none';el.classList.add('emb');}
  if(S.papel!=='ADMIN'){
    if(typeof window.showDirectoryPicker!=='function'){renderNav();$('#main').innerHTML=`<div class="msg err">Este browser não suporta acesso a pastas. Abre o CRM_NT no <b>Microsoft Edge</b> ou <b>Google Chrome</b>, em modo PC.</div>`;return;}
    await sincEnt_();
    let r=await reabrirPasta();
    if(r&&r!==true&&r.dir){ // pasta memorizada sem permissão nesta sessão: pede-a já (Chrome/Edge: «Permitir sempre» / app instalada = nunca mais pergunta)
      try{const p=await r.dir.requestPermission({mode:'readwrite'});if(p==='granted'){S.root=r.dir;r=true;}}catch(e){console.warn('[autos] requestPermission ao arranque',e&&e.message);}
    }
    if(r===true)await sincCfg_(S.root);
  }
  await atualizarBadge_();
  renderNav();go(S.soVista||(S.emb?'entrada':(S.papel==='ADMIN'?'fluxo':'entrada')));
}
// ---- AU-5: vista de entrada quando a consola vive no separador Autos da obra ----
async function viewEntradaEmb_(){
  const m=$('#main');const E=S.emb;
  if(S.papel==='ADMIN')return go('obraautos');
  if(!S.root){
    const pend=await DB.get(KEY_ROOT);const ctrl=S.papel==='CONTROLLER';
    m.innerHTML=`<div class="card"><h3 style="margin-top:0">Pasta pessoal ${ctrl?'CONTROLO_AUTOS':'OBRAS'}</h3><p>Para trabalhar os autos desta obra a consola precisa da tua pasta <b>${ctrl?'CONTROLO_AUTOS':'OBRAS'}</b> neste computador ${ctrl?'(onde ficam as obras recebidas dos DO)':'(uma subpasta por obra)'}. Escolhe-a uma vez; serve para todas as obras.</p>
      ${pend?`<button id="bRe">Reabrir "${esc(pend.name)}"</button>`:''}<button id="bPick" class="${pend?'sec':''}">Escolher pasta…</button>
      <p class="hint">Só funciona no Edge ou Chrome, em modo PC. A permissão fica memorizada neste computador para o teu utilizador do CRM_NT. Noutro PC, escolhe a pasta outra vez — nada se perde.</p></div>`;
    $('#bPick').onclick=escolherPasta;
    if(pend)$('#bRe').onclick=async()=>{const p=await pend.requestPermission({mode:'readwrite'});if(p==='granted'){S.root=pend;await sincCfg_(pend);go('entrada');}else toast('Permissão recusada','err');};
    return;
  }
  m.innerHTML='<div class="muted">a abrir a obra…</div>';
  const dirs=await FS.listDirs(S.root);S.obras=[];
  for(const [n,h] of dirs){if(/^(recebidos|envios|exportacoes)$/i.test(n))continue;const o=await FS.readJson(h,'obra.json');S.obras.push({nome:n,h,o});}
  S.cfg=(await FS.readJson(S.root,'consola.json'))||{};S.papel=papelAtual();if(!S.ent)S.ent=await FS.readJson(S.root,'entidades.json');
  const ob=pastaDe_(E.cod);
  if(ob){await abrirObra(ob.nome);return;}
  S.obra=null;S.obraDir=null;S.orc=null;S.autos=[];
  if(S.papel==='CONTROLLER')return go('cautos');
  m.innerHTML=`<div class="card"><h3 style="margin-top:0">${esc(E.cod)} · ${esc(E.nome)} — ainda sem pasta neste PC</h3>
    <p>A consola cria <code>${esc(E.cod+'_'+slug(E.nome))}\\</code> em <code>${esc(S.cfg.caminho||S.root.name)}</code> com <code>obra.json</code> (número, nome e dia de fecho ${CFG.dia_fecho} do CRM_NT), <code>autos\\</code> e <code>exportacoes\\</code>. O orçamento vem do separador «Orçamento» desta obra.</p>
    <div class="row"><button id="bPrep">Preparar pasta desta obra</button><button class="sec" id="bCfgE">Configurações…</button></div></div>`;
  $('#bPrep').onclick=()=>prepararPasta_({codigo:E.cod,nome:E.nome});
  $('#bCfgE').onclick=()=>go('config');
  renderNav();
}
function renderNavEmb_(){
  const E=S.emb;const nav=$('#nav');const temObra=!!S.obra;
  const L=S.papel==='ADMIN'?[['obraautos','Resumo'],['fluxo','Aprovar',S.badgeEmb]]
    :S.papel==='CONTROLLER'?[['obraautos','Resumo'],['cautos','Autos recebidos',S.badgeEmb]].concat(temObra?[['dr','DR'],['alertas','Alertas']]:[]).concat([['config','Configurações']])
    :[['obraautos','Resumo']].concat(temObra?[['orcamento','Orçamento · preços'],['tabela','Tabela de preços'],['subs','Subempreiteiros'],['subempreitadas','Subempreitadas'],['envios','Autos e envios'],['dr','DR'],['alertas','Alertas']]:[]).concat([['config','Configurações']]);
  nav.innerHTML=L.map(([id,t,b])=>`<a class="${S.view===id?'on':''}" data-v="${id}">${t}${b?`<span class="nb">${b}</span>`:''}</a>`).join('');
  nav.querySelectorAll('a').forEach(a=>a.onclick=()=>go(a.dataset.v));
  const pap=$('#papel');pap.className='chip '+(S.papel==='CONTROLLER'?'ctrl':'do');pap.textContent=S.papel==='CONTROLLER'?'Controller':S.papel==='ADMIN'?'Admin · sem pasta':'Diretor de Obra';pap.style.display='';
  const orcV=S.orc&&S.orc.versao_crm!=null?' · orçamento v'+S.orc.versao_crm+' do CRM_NT':(S.obra&&!S.orc?' · sem orçamento':'');
  $('#ctx').textContent=(S.root?(S.cfg&&S.cfg.caminho?S.cfg.caminho:S.root.name)+(S.obraDir?' › '+S.obraDir.name:''):(S.papel==='ADMIN'?'':'sem pasta'))+orcV+' · dia de fecho '+CFG.dia_fecho;
  const tg=$('#descTg');if(tg){tg.textContent='Descrição: '+(S.descCompleta?'completa':'abreviada')+' ⇄';tg.onclick=descToggle_;}
  const nm=S.cfg?.nome||CTX.nome||'';$('#avatar').textContent=nm?nm.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase():'?';$('#avatar').title=nm;
}
function desmontar(){if(ROOT){ROOT.innerHTML='';ROOT.removeAttribute('id');ROOT.classList.remove('emb');}ROOT=null;S.root=null;S.obra=null;S.obraDir=null;S.orc=null;S.autos=[];S.memAutos=null;S.emb=null;S.soVista=null;S.badgeEmb=0;}
async function pastaEstado(email,papel){
  const pap=String(papel||'').toLowerCase().indexOf('controller')>=0?'CONTROLLER':'DO';
  try{const dir=await DB.get('root:'+String(email||'').toLowerCase());if(!dir)return {nome:'',permissao:'',caminho:'',papel:pap};
    const perm=await dir.queryPermission({mode:'readwrite'});let caminho='';
    if(perm==='granted'){try{const cfg=await FS.readJson(dir,'consola.json');caminho=(cfg&&cfg.caminho)||'';}catch(e){}}
    return {nome:dir.name,permissao:perm,caminho,papel:pap};}
  catch(e){return {nome:'',permissao:'',caminho:'',papel:pap};}
}
return {montar,desmontar,pastaEstado,VERSAO,get estado(){return S;}};


})();
