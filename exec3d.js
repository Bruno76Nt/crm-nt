// CRM_NT · exec3d.js · EXECUÇÃO NO 3D · 3D-2b (2026-10-29) — módulo isolado, carregado só quando a obra tem a flag (exec3dFlag).
// window.Exec3D.montar(visorApi, {cod, modelo_id, papel, api}) → {desmontar, recarregar, estado, sel}
// Modelo (decidido com o Bruno a 29/10):
//  · fases com especialidade; % somam 100 dentro de cada especialidade (montagem · massas · pavimentos…);
//  · subempreiteiros criados na consola da obra aparecem aqui (separador Subempreiteiros);
//  · SEM PREÇOS e SEM «autos» no V3D: aqui só quantidades e medições; preços e autos são da consola de autos (regra do Bruno 29/10);
//  · cada fase de cada elemento tem um dono (sub × especialidade): «Adjudicar seleção», quantidade congelada;
//  · medir vai para a série do dono (sem escolher série à mão);
//  · «Substituir…»: o medido fica com o A, o confirmado pelo encarregado mede-se para o A, o resto passa ao B (o preço trata-se na consola);
//  · sem menu de cor: o desenho abre por artigo (preparação); camadas S · E · D no topo; «Ver no 3D» por sub/auto com faixa «A ver… ✕».
window.Exec3D=(function(){
'use strict';
var VERSAO='2026-10-29-14 · 3D-2b';
var CSS='#v3dRoot #painel{width:420px}#v3dRoot #bPainel{left:428px}'
+'#v3dRoot .exctx{background:#f4f7fb;border:1px solid #c9d7e8;border-radius:7px;padding:6px 8px;margin-bottom:6px;font-size:12.5px}'
+'#v3dRoot .chips{display:flex;gap:4px;flex-wrap:wrap;align-items:center;margin:4px 0}#v3dRoot .vazio{background:#f4f7fb;border:1px dashed #c9d7e8;border-radius:8px;padding:10px;color:#6c757d;font-size:12.5px}'
+'#v3dRoot .selres{font-size:13px;margin:6px 0 4px}#v3dRoot .sellist .tag{cursor:pointer;margin:2px 0}'
+'#v3dRoot .tag.b{background:#dbe7f6;color:#163963}#v3dRoot .tag.gl{background:#e3f3e6;color:#1f6b3a}#v3dRoot .tag.n{background:#eef0f3;color:#6c757d}#v3dRoot .tag.o{background:#fde8d4;color:#8a4b0f}#v3dRoot .tag.v{background:#ece4f6;color:#5b3d86}'
+'#v3dRoot table.fases,#v3dRoot table.med{width:100%;border-collapse:collapse;font-size:12px;margin:2px 0 6px}#v3dRoot table.fases td{padding:5px 4px;border-bottom:1px solid #eee;vertical-align:top}#v3dRoot table.fases td.fn{width:36%}#v3dRoot table.fases td.ac{text-align:right;white-space:nowrap}#v3dRoot table.fases td.st .tag{margin:1px 0;font-weight:600}'
+'#v3dRoot table.med th{font-weight:600;color:#6c757d;text-align:right;padding:3px 4px;border-bottom:1px solid #c9d7e8;font-size:11px}#v3dRoot table.med th:first-child{text-align:left}#v3dRoot table.med td{text-align:right;padding:4px;border-bottom:1px solid #eee;vertical-align:top;white-space:nowrap}#v3dRoot table.med td:first-child{text-align:left;white-space:normal}#v3dRoot table.med td.b{color:#163963;font-weight:700;background:#eef4fb}#v3dRoot table.med input{width:64px;font:inherit;border:1px solid #c9d7e8;border-radius:4px;padding:1px 4px;text-align:right}'
+'#v3dRoot .pat{background:#f8d7da;color:#842029;border-radius:7px;padding:6px 8px;font-size:12px;margin:6px 0}#v3dRoot .hist div{padding:3px 0;border-bottom:1px dotted #e3e6ea;font-size:12px}#v3dRoot .hist div.off{opacity:.5;text-decoration:line-through}'
+'#v3dRoot .sub3 .cab{display:flex;align-items:flex-start;gap:6px}#v3dRoot .sub3 .cab .tit{flex:1;min-width:0}#v3dRoot .sub3 .exp{border:0;background:transparent;color:#1e4c84;font-size:15px;padding:0 4px;line-height:1.2}#v3dRoot .sub3 .res{font-size:12px;color:#333;margin-top:3px}#v3dRoot .sub3 .res b{color:#163963}#v3dRoot .sub3.min{padding:6px 10px}'
+'#v3dRoot .esph{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6c757d;margin:8px 0 2px}'
+'#v3dRoot .sub3{border:1px solid #c9d7e8;border-radius:10px;padding:8px 10px;margin:8px 0;background:#fff}#v3dRoot .sub3.vis{border-color:#1e4c84;box-shadow:0 0 0 2px #dbe7f6}#v3dRoot .sub3 h4{margin:0 0 2px;font-size:13.5px;color:#163963}#v3dRoot .sub3 .meta{font-size:11.5px;color:#6c757d}'
+'#v3dRoot .acts{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}#v3dRoot .acts button{font-size:12px;padding:3px 8px}'
+'#v3dRoot .av{border-radius:7px;padding:5px 8px;font-size:12px;margin:5px 0}#v3dRoot .av.r{background:#fde2e2;color:#7a1414}#v3dRoot .av.g{background:#e6f4ea;color:#1e5b2e}#v3dRoot .av.w{background:#fff3cd;color:#664d03}#v3dRoot .av.i{background:#eef4fb;color:#163963}'
+'#v3dRoot .dlg{border:1px solid #1e4c84;border-radius:9px;padding:8px 10px;margin:6px 0;background:#f8fbff}#v3dRoot .dlg h5{margin:0 0 4px;font-size:13px;color:#163963}#v3dRoot .dlg label{display:block;margin:3px 0;font-size:12.5px}#v3dRoot .dlg input[type=text],#v3dRoot .dlg select{font:inherit;border:1px solid #c9d7e8;border-radius:6px;padding:3px 6px;max-width:100%}#v3dRoot .dlg input[type=text]{width:100%}'
+'#v3dRoot .autos .auto{display:flex;justify-content:space-between;gap:8px;border:1px solid #c9d7e8;border-radius:8px;padding:6px 8px;margin:4px 0;cursor:pointer;background:#fff;font-size:12px}#v3dRoot .autos .auto:hover{background:#f4f7fb}#v3dRoot .autos .auto.on{border-color:#1e4c84;box-shadow:0 0 0 2px #dbe7f6}#v3dRoot .autos .auto.prep{border-style:dashed}#v3dRoot .autos .auto .v{text-align:right;white-space:nowrap;font-weight:700;color:#163963}'
+'#v3dRoot #exCam{position:fixed;top:52px;left:calc(50% + 210px);transform:translateX(-50%);z-index:6;display:flex;gap:6px;align-items:center;background:#fff;border:1px solid #c9d7e8;border-radius:12px;padding:5px 7px;box-shadow:0 4px 14px rgba(0,0,0,.08);white-space:nowrap}'
+'#v3dRoot #exCam .cam{display:inline-flex;align-items:center;gap:6px;border-radius:20px;padding:4px 11px 4px 6px;border:1.5px solid #c9d7e8;background:#fff;color:#333;font-weight:600;font-size:12.5px}#v3dRoot #exCam .cam .d{width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:10.5px;font-weight:700}#v3dRoot #exCam .cam small{font-weight:400;color:#6c757d}#v3dRoot #exCam .cam.on{color:#fff}#v3dRoot #exCam .cam.on small{color:rgba(255,255,255,.85)}#v3dRoot #exCam .cam.on .d{background:rgba(255,255,255,.25)!important}'
+'#v3dRoot #exCam .cam[data-k=S] .d{background:#f28e2b}#v3dRoot #exCam .cam[data-k=S].on{background:#f28e2b;border-color:#f28e2b}#v3dRoot #exCam .cam[data-k=E] .d{background:#8e6bbf}#v3dRoot #exCam .cam[data-k=E].on{background:#8e6bbf;border-color:#8e6bbf}#v3dRoot #exCam .cam[data-k=D] .d{background:#1e4c84}#v3dRoot #exCam .cam[data-k=D].on{background:#1e4c84;border-color:#1e4c84}'
+'#v3dRoot #exCam select{width:auto!important;min-width:112px;font:inherit;font-size:12.5px;border:1px solid #c9d7e8;border-radius:7px;padding:3px 5px;color:#1e4c84;background:#fff}#v3dRoot #exCam .sp{width:1px;height:22px;background:#c9d7e8}'
+'#v3dRoot #exVer{position:fixed;top:98px;left:calc(50% + 210px);transform:translateX(-50%);z-index:6;background:#1e4c84;color:#fff;border-radius:9px;padding:5px 7px 5px 12px;display:none;align-items:center;gap:10px;box-shadow:0 4px 14px rgba(0,0,0,.12);font-size:12.5px}#v3dRoot #exVer button{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:2px 9px}'
+'#v3dRoot #exLegenda{position:fixed;right:12px;bottom:12px;z-index:6;background:#fff;border:1px solid #c9d7e8;border-radius:9px;padding:7px 10px;box-shadow:0 4px 14px rgba(0,0,0,.08);font-size:11.5px;color:#333;line-height:1.6;min-width:210px;max-width:400px;max-height:calc(100vh - 150px);overflow:auto}#v3dRoot #exLegenda b.t{display:block;color:#1e4c84;font-size:12px;margin-bottom:2px}#v3dRoot #exLegenda .sw{display:inline-block;width:11px;height:11px;border-radius:3px;vertical-align:-2px;margin-right:5px;border:1px solid rgba(0,0,0,.15)}#v3dRoot #exLegenda .n{flex:0 0 auto;color:#6c757d;margin-left:10px;padding-top:2px}#v3dRoot #exLegenda .li{display:flex;align-items:flex-start}#v3dRoot #exLegenda .li .sw{flex:0 0 auto;margin-top:5px}#v3dRoot #exLegenda .li .tx{flex:1;min-width:0;line-height:1.35;padding:2px 0}#v3dRoot #exLegBtn,#v3dRoot #exCam .cam .ct{display:none}#v3dRoot #exLegenda .lgx{float:right;margin:-2px -4px 0 6px;padding:0 9px;font-size:13px;line-height:20px}#v3dRoot.legmin #exLegenda{display:none!important}#v3dRoot.legmin #exLegBtn{display:inline-block}#v3dRoot #exLegBtn{position:fixed;right:12px;bottom:12px;z-index:7}#v3dRoot #exLegenda .li{cursor:pointer;border-radius:5px;padding:0 4px;margin:0 -4px}#v3dRoot #exLegenda .li:hover{background:#f1f5fb}#v3dRoot #exLegenda .li.on{background:#dbe7f6;font-weight:600}#v3dRoot #exLegenda .lx{color:#1e4c84;cursor:pointer;text-decoration:underline}#v3dRoot .falta{background:#f4f7fb;border:1px solid #c9d7e8;border-radius:8px;padding:6px 8px;margin:6px 0;font-size:12.5px}'
+'#v3dRoot details summary{cursor:pointer;color:#1e4c84;font-size:12.5px;margin:6px 0}#v3dRoot button:disabled{opacity:.5;cursor:default}'
+'#v3dRoot .cfg{border:1px solid #c9d7e8;border-radius:9px;padding:8px 10px;margin:8px 0;background:#fff}#v3dRoot .cfgh{font-size:13px;margin-bottom:6px}#v3dRoot .pool{background:#f4f7fb;border:1px dashed #c9d7e8;border-radius:7px;padding:5px 7px;margin:4px 0 6px;min-height:28px}'
+'#v3dRoot .chip{display:inline-block;background:#dbe7f6;color:#163963;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;cursor:grab;margin:2px 0;user-select:none}#v3dRoot .chip.in{background:#e3f3e6;color:#1f6b3a}'
+'#v3dRoot table.cfgt{width:100%;border-collapse:collapse;font-size:12px}#v3dRoot table.cfgt td{padding:4px 3px;border-bottom:1px solid #eee;vertical-align:middle}#v3dRoot table.cfgt tr.fr{cursor:pointer}#v3dRoot table.cfgt tr.fr.on td{background:#eef4fb}#v3dRoot table.cfgt tr.fr.drop td{background:#fff3cd}'
+'#v3dRoot table.cfgt td.n{width:34%}#v3dRoot table.cfgt td.p{width:58px;white-space:nowrap}#v3dRoot table.cfgt td.x{width:26px;text-align:right}#v3dRoot table.cfgt input.fn{width:100%;font:inherit;border:1px solid transparent;border-radius:4px;padding:2px 4px;background:transparent}#v3dRoot table.cfgt input.fn:focus{border-color:#c9d7e8;background:#fff}#v3dRoot table.cfgt input.fp{width:40px;font:inherit;border:1px solid #c9d7e8;border-radius:4px;padding:2px 3px;text-align:right}#v3dRoot table.cfgt select.fe{font:inherit;font-size:11px;border:1px solid #c9d7e8;border-radius:4px;padding:1px 2px;max-width:92px}'
+'#v3dRoot table.cfgt tr.tot td{font-weight:700;border-bottom:0;font-size:11.5px}#v3dRoot table.cfgt td.p.ok{color:#0f5132}#v3dRoot table.cfgt td.p.err{color:#842029}#v3dRoot .cfgf{margin:6px 0 2px}#v3dRoot .nota{background:#fff8e1;border:1px solid #f0d58c;border-radius:8px;padding:8px 10px;font-size:12px;margin:10px 0}'
+'@media (max-width:760px){#v3dRoot #painel{width:auto;height:56vh}#v3dRoot #bPainel{bottom:calc(56vh + 8px)}#v3dRoot table.fases td.ac{white-space:normal}#v3dRoot #exCam{left:8px;right:8px;transform:none;flex-wrap:wrap;white-space:normal}#v3dRoot #exVer{left:8px;right:8px;transform:none;top:98px;bottom:auto}#v3dRoot #exLegenda{top:auto;left:8px;right:8px;min-width:0;max-width:none;bottom:calc(56vh + 44px);max-height:calc(44vh - 150px);overflow:auto;font-size:12px}#v3dRoot #painel.fechado~#exLegenda{bottom:44px;max-height:calc(100% - 200px)}#v3dRoot #exLegenda .cod{display:none}#v3dRoot #exLegenda .dup .cod{display:inline}#v3dRoot #exLegenda .tx small{font-size:12px;color:#333}#v3dRoot #exLegenda .lgx{display:inline-block;float:right;margin:-2px -4px 0 6px;padding:0 9px;font-size:13px;line-height:20px}#v3dRoot.legmin #exLegenda{display:none!important}#v3dRoot.legmin #exLegBtn{display:inline-block}#v3dRoot #exLegBtn{position:fixed;right:8px;bottom:calc(56vh + 8px);z-index:7}#v3dRoot #painel.fechado~#exLegBtn{bottom:8px}#v3dRoot #bPainel{left:8px;top:auto;bottom:calc(56vh + 8px)}#v3dRoot #bFerr{top:auto;right:auto;left:92px;bottom:calc(56vh + 8px)}#v3dRoot #painel.fechado~#bFerr{bottom:8px}#v3dRoot #ferr{top:98px}#v3dRoot #exCam{flex-wrap:nowrap;gap:4px;padding:4px;justify-content:space-between}#v3dRoot #exCam .cam{padding:3px 9px 3px 4px;font-size:12px;gap:4px}#v3dRoot #exCam .cam .lg{display:none}#v3dRoot #exCam .cam .ct{display:inline}#v3dRoot #exCam select{min-width:0}}';

var NOMES_ESP={MONTAGEM:'Montagem',MASSAS:'Massas',PAVIMENTOS:'Pavimentos',OUTROS:'Outros'};
var PAL=[0x4e79a7,0xf28e2b,0x59a14f,0xe15759,0x76b7b2,0xedc948,0xb07aa1,0xff9da7,0x9c755f,0xbab0ac,0x1f77b4,0x8c564b];
// cores das classes (camadas S/E/D, vista de um sub, vista de um auto, por adjudicar)
var COR={S:0xf28e2b,E:0x8e6bbf,D:0x1e4c84,ambos:0x2e9e4f,fechado:0x2e9e4f,pronto:0x17a2b8,porvalidar:0xf28e2b,risco:0xd63384,pat:0xe03131,base:0xd3d9e0,out:0xeceff3,ctx:0xd5dae1,
  pago:0x2e8b57,prep:0x1e4c84,conf:0x17a2b8,adj:0xf6c89f,outro:0xc9ced6,semdono:0xf2d16b,neste:0x1e4c84,ant:0xb9cde6,falta:0xe6e8ec,fora:0xf1f3f5,livre:0xf2a33a,comdono:0xdfe6ee,aconf:0x17a2b8,adecl:0xf28e2b,jamed:0xb9cde6,env:0x6f9bd1};
var PRI={camadas:['pat','risco','porvalidar','pronto','fechado','ambos','S','E','D','base'],serie:['prep','conf','adj','env','pago','semdono','outro'],auto:['neste','ant','falta','fora'],poradj:['livre','comdono'],aceitar:['aconf','adecl','jamed','falta','fora']};

function montar(V,ctx){
  var api=ctx.api, cod=ctx.cod, ROOT=V.root, T=window.THREE;
  var $=function(s){return ROOT.querySelector(s);}, esc=V.esc;
  var host=ROOT===document?document.body:ROOT;
  function num(v,d){d=d==null?2:d;return (Math.round((v||0)*Math.pow(10,d))/Math.pow(10,d)).toFixed(d).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
  function dt(s){if(!s)return '';var d=new Date(s);if(isNaN(d))return String(s);return ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();}
  function hex(c){return '#'+('000000'+c.toString(16)).slice(-6);}
  if(!document.getElementById('ex3Css')){var st=document.createElement('style');st.id='ex3Css';st.textContent=CSS;document.head.appendChild(st);}else document.getElementById('ex3Css').textContent=CSS;
  var FALTA={}, EXP={}, EST=null, SEL=new Set(), ESP=null, CAM={S:false,E:false,D:false}, VISTA=null, FASE_ATIVA={}, RASCUNHO={}, DLG=null, ABERTO={}, AUTOS={}, vivo=true;
  var exBox=V.separador('ex','Execução','arv'), auBox=V.separador('au','Subempreiteiros','ex'), fsBox=V.seccao?V.seccao('cfg','Fases',true):V.separador('fs','Fases');
  exBox.innerHTML='<div class="hint">A carregar a execução…</div>';
  var podeMedir=function(){return EST&&(EST.papel==='DO'||EST.papel==='Admin');}, podeConfirmar=function(){return EST&&(EST.papel==='Encarregado'||EST.papel==='Admin');}, podeDeclarar=function(){return EST&&(EST.papel==='Sub'||EST.papel==='Admin');}, podeConfigurar=podeMedir;

  // ---------- barra de camadas, faixa «A ver…» e legenda (uma só instância) ----------
  ['#exCam','#exVer','#exLegenda'].forEach(function(s){Array.prototype.slice.call(ROOT.querySelectorAll(s)).forEach(function(x){x.remove();});});
  var cam=document.createElement('div');cam.id='exCam';host.appendChild(cam);
  var ver=document.createElement('div');ver.id='exVer';ver.innerHTML='<span></span><button title="voltar às camadas">✕ sair</button>';host.appendChild(ver);
  var lb=document.createElement('div');lb.id='exLegenda';host.appendChild(lb);Array.prototype.slice.call(ROOT.querySelectorAll('#exLegBtn')).forEach(function(x){x.remove();});var lbB=document.createElement('button');lbB.id='exLegBtn';lbB.className='sm';lbB.style.display='none';host.appendChild(lbB);if(window.matchMedia&&matchMedia('(max-width:760px)').matches)host.classList.add('legmin');else host.classList.remove('legmin');lbB.onclick=function(){host.classList.remove('legmin');};
  ver.querySelector('button').onclick=function(){sairVista();};

  // ---------- estado ----------
  function elem(uid){return EST&&EST.elPorUid[uid];}
  function artigoDe(uid){var e=elem(uid);return e&&e.artigo_id?EST.artigos[e.artigo_id]:null;}
  function regsDe(uid,fase){return (EST&&EST.regPorChave[uid+'|'+fase])||[];}
  function estado(uid,fase){var st={prop:false,conf:false,pat:null,med:false,auto_n:undefined,serie:null,semConf:false,idMed:null,idsEnc:[],dev:null};
    regsDe(uid,fase).forEach(function(r){
      if(r.origem==='Sub'&&r.estado==='proposto'){st.prop=true;st.dev=null;}
      if(r.origem==='Enc'&&r.estado==='confirmado'){st.conf=true;st.pat=null;st.dev=null;st.idsEnc.push(r.id);}
      if(r.origem==='DO'&&r.estado==='devolvido'){st.prop=false;st.conf=false;st.dev=r.nota||'devolvido pelo DO';}
      if(r.origem==='Enc'&&r.estado==='recusado'){st.prop=false;st.conf=false;}
      if(r.origem==='Enc'&&r.estado==='patologia'){st.pat=r.nota||'patologia';st.conf=false;st.idsEnc.push(r.id);}
      if(r.estado==='medido'){st.med=true;st.auto_n=r.auto_n;st.lote=r.lote==null?null:r.lote;st.serie=r.sub_codigo+'|'+r.especialidade;st.idMed=r.id;}});
    if(st.med&&!st.conf)st.semConf=true;return st;}
  function fasesComCfg(fases,comps){var fs=(fases||[]).filter(function(f){return !f.comps||!f.comps.length||f.comps.some(function(c){return comps.indexOf(c)>=0;});});var tot={};fs.forEach(function(f){var e=f.esp||'MONTAGEM';tot[e]=(tot[e]||0)+(+f.pct||0);});
    return fs.map(function(f){var e=f.esp||'MONTAGEM';var t=tot[e]||1;return {id:f.id,nome:f.nome,esp:e,pct:+f.pct||0,peso:(+f.pct||0)/t,comps:f.comps||[],renorm:Math.abs(t-100)>0.01};});}
  var _fc={};function fasesDe(uid){if(_fc[uid])return _fc[uid];var e=elem(uid);var a=artigoDe(uid);if(!e||!a||!a.config)return [];return (_fc[uid]=fasesComCfg(a.config.fases,e.componentes||[]));}
  function donoKey(uid,fase){var d=EST&&EST.dono[uid+'|'+fase];return d?d.sub_codigo+'|'+d.especialidade:null;}
  function serie(key){return (EST&&EST.series||[]).filter(function(s){return s.key===key;})[0]||null;}
  function nomeSerie(key){var s=serie(key);if(!s){var p=String(key||'').split('|');return p[0]+' · '+(NOMES_ESP[p[1]]||p[1]||'');}return (s.sub_nome||s.sub_codigo)+' · '+(NOMES_ESP[s.especialidade]||s.especialidade);}
  function espsPresentes(){var m={};Object.keys(EST.artigos).forEach(function(a){((EST.artigos[a].config||{}).fases||[]).forEach(function(f){m[f.esp||'MONTAGEM']=1;});});return (EST.especialidades||Object.keys(NOMES_ESP)).filter(function(e){return m[e];});}

  function recarregar(){return api('exec3dEstado',cod,{modelo_id:ctx.modelo_id}).then(function(r){if(!vivo)return;
    if(!r||!r.ok){exBox.innerHTML='<div class="hint">'+esc((r&&r.erro)||'Sem acesso à execução 3D.')+'</div>';return;}
    EST=r;_fc={};EST.elPorUid={};r.elementos.forEach(function(e){EST.elPorUid[e.uid]=e;});EST.regPorChave={};r.registos.forEach(function(x){var k=x.uid+'|'+x.fase;(EST.regPorChave[k]=EST.regPorChave[k]||[]).push(x);});
    var es=espsPresentes();if(!ESP||es.indexOf(ESP)<0)ESP=es[0]||'MONTAGEM';
    AUTOS={};V.limparComp();if(LEGF){if(V.filtrar)V.filtrar(LEGF.uids);}else if(FILTRO){FILTRO=null;aplicarFiltro(true);}render();pintar();}).catch(function(e){if(vivo)exBox.innerHTML='<div class="hint">Erro de ligação: '+esc(e&&e.message||e)+'</div>';});}

  // ---------- cores ----------
  function camadasOn(){return ['S','E','D'].filter(function(k){return CAM[k];});}
  function classe(uid,f){var k=uid+'|'+f.id;var st=estado(uid,f.id);
    if(VISTA){
      if(VISTA.tipo==='aceitar'){if(donoKey(uid,f.id)!==VISTA.key)return 'fora';if(st.med)return 'jamed';if(st.pat)return 'falta';if(st.conf)return 'aconf';if(st.prop)return 'adecl';return 'falta';}
      if(VISTA.tipo==='poradj')return EST.dono[k]?'comdono':(st.med?'comdono':'livre');
      var dk=donoKey(uid,f.id);
      if(VISTA.tipo==='serie'){if(st.med&&st.serie===VISTA.key)return st.auto_n!=null?'pago':st.lote!=null?'env':'prep';if(dk!==VISTA.key)return dk?'outro':'semdono';return st.conf?'conf':'adj';}
      if(VISTA.tipo==='auto'){if(st.med&&st.serie===VISTA.key){if(VISTA.n==null)return (st.lote==null&&st.auto_n==null)?'neste':'ant';return st.lote===VISTA.n?'neste':(st.lote!=null&&st.lote<VISTA.n)?'ant':'falta';}return dk===VISTA.key?'falta':'fora';}}
    var on=camadasOn();var v={S:st.prop,E:st.conf,D:st.med};
    if(st.pat&&CAM.E)return 'pat';
    if(on.length===1)return v[on[0]]?on[0]:'base';
    if(on.length===2){var a=v[on[0]],b=v[on[1]];return a&&b?'ambos':a?on[0]:b?on[1]:'base';}
    if(st.prop&&st.conf&&st.med)return 'fechado';if(st.med&&!st.conf)return 'risco';if(st.conf&&!st.med)return 'pronto';if(st.prop)return 'porvalidar';return 'base';}
  function prioridade(){return VISTA?PRI[VISTA.tipo]:PRI.camadas;}
  function espVista(){return VISTA&&VISTA.esp||ESP;}
  function corHex(m,uid,comp){if(!EST)return null;if(!VISTA&&!camadasOn().length)return null;   // sem camadas: o visor pinta por artigo (preparação)
    var e=elem(uid);if(!e||!e.artigo_id||comp==='~')return COR.ctx;
    var esp=espVista();var fs=fasesDe(uid).filter(function(f){return f.esp===esp;});if(!fs.length)return COR.out;
    // a cor é do ELEMENTO inteiro (todas as malhas, os dois lados): pintar só a malha da fase (ex.: só a placa B) induz em erro.
    // A cor resulta da fase mais relevante da especialidade, pela prioridade da vista; o detalhe por fase está no separador Execução.
    var pr=prioridade();var best=null,bi=99;fs.forEach(function(x){var c=classe(uid,x);var i=pr.indexOf(c);if(i>=0&&i<bi){bi=i;best=c;}});return COR[best||'base'];}
  V.hooks.cor=corHex;
  function pintar(){V.recolorir();legenda();barra();}
  var ROT={S:'Subempreiteiro declarou',E:'Encarregado confirmou',D:'Diretor de obra mediu',ambos:'Coincidem',fechado:'Fechado: declarado, confirmado e medido',pronto:'Pronto a medir: confirmado, falta o DO',porvalidar:'Declarado pelo sub, falta o encarregado',risco:'Medido SEM confirmação do encarregado',pat:'Patologia (encarregado)',base:'Sem registo nas camadas ligadas',
    pago:'Medido · já em auto (consola)',env:'Enviado · à espera da consola',prep:'Medido · por enviar',conf:'Confirmado pelo encarregado, por medir',adj:'Adjudicado, por executar',outro:'De outro subempreiteiro',semdono:'Sem subempreiteiro',neste:'Nesta medição',ant:'Medições anteriores',falta:'Adjudicado, ainda não medido',fora:'Não é deste subempreiteiro',livre:'Por adjudicar',comdono:'Já adjudicado',aconf:'Confirmado pelo encarregado — para aceitar',adecl:'Declarado pelo subempreiteiro — para aceitar',jamed:'Já medido'};
  var NOME_K={S:'Subempreiteiro',E:'Encarregado',D:'Diretor de obra'};var NOME_C={S:'Sub',E:'Enc',D:'DO'};
  // legenda clicável: tocar numa linha seleciona os elementos dessa classe, mostra só esses e abre a Execução; tocar de novo desfaz
  var LEGF=null;
  function uidsDaClasse(cls){var esp=espVista();var out=[];EST.elementos.forEach(function(e){if(!e.artigo_id)return;if(fasesDe(e.uid).some(function(f){return f.esp===esp&&classe(e.uid,f)===cls;}))out.push(e.uid);});return out;}
  function aplicarLegenda(id,uids,rot){if(LEGF&&LEGF.id===id){limparLegenda();return;}if(!uids.length){V.aviso('Nenhum elemento nesta linha da legenda',2500);return;}
    LEGF={id:id,uids:uids,rot:rot};SEL.clear();uids.forEach(function(u){SEL.add(u);});V.marcar(uids);if(V.filtrar)V.filtrar(uids);var b=V.caixaUids(uids);if(!b.isEmpty()){V.enquadrar(b);ajustarMovel();}
    render();V.mostrarPg('ex');legenda();V.aviso(uids.length+' elemento(s) · '+rot,2500);}
  function limparLegenda(){LEGF=null;SEL.clear();V.marcar([]);if(V.filtrar)V.filtrar(null);FILTRO=null;aplicarFiltro(true);render();legenda();}
  var LEG_X='<button class="lgx sm" title="recolher a legenda">▾</button>';
  // descrição abreviada da legenda: tira a lã (LMxx), a largura dos perfis (M70/60 → M70) e os espaços do «+» — o que distingue os artigos fica no fim do texto
  function abrevDesc(d){var s=String(d||'').replace(/\s+/g,' ').trim();var m=s.match(/^([^a-zà-ÿ]{6,}?)\s+(?=[A-ZÀ-Ý][a-zà-ÿ])/);if(m)s=m[1];else{var k=s.search(/\s(?:Fornecimento|Execução|Execucao|Aplicação|Aplicacao|Maior valia|Inclui|Inclusive|Revestimento|Constituíd|Formad)/);if(k>6)s=s.slice(0,k);}s=s.replace(/\s*\bLM\d+\b(?=\s*(?:\+|$))/g,'').replace(/(\bM\d+)\/\d+/g,'$1').replace(/\s*\+\s*/g,'+').replace(/\s{2,}/g,' ').trim();if(s.length>60)s=s.slice(0,58).trim()+'…';return s;}
  function legenda(){if(!EST){lb.style.display='none';lbB.style.display='none';return;}lbB.style.display='';var esp=espVista();var cont={},els={};
    var on=camadasOn();var rodape=LEGF?'<div style="margin-top:3px"><span class="lx" data-lx="1">✕ limpar filtro</span> <small>('+LEGF.uids.length+' elementos)</small></div>':'';
    if(!VISTA&&!on.length){var ks=Object.keys((V.pub&&V.pub.artigos)||{}).sort();var na={};EST.elementos.forEach(function(e){if(e.artigo_id)na[e.artigo_id]=(na[e.artigo_id]||0)+1;});var h=LEG_X+'<b class="t">Legenda · artigos (preparação)</b>';var arts=Object.keys(EST.artigos).map(function(a){return EST.artigos[a];}).sort(function(a,b){return String(a.item).localeCompare(String(b.item));});var nab={};arts.forEach(function(a){var k=abrevDesc(a.descricao);nab[k]=(nab[k]||0)+1;});
      arts.forEach(function(a){var ix=ks.indexOf(a.item);var id='art:'+a.artigo_id;var ab=abrevDesc(a.descricao);h+='<div class="li'+(LEGF&&LEGF.id===id?' on':'')+(nab[ab]>1?' dup':'')+'" data-lart="'+esc(a.artigo_id)+'" title="'+esc(a.item+' · '+(a.descricao||''))+'"><span class="sw" style="background:'+hex(PAL[(ix<0?ks.length:ix)%PAL.length])+'"></span><span class="tx"><span class="cod">'+esc(a.item)+' </span><small>'+esc(ab)+'</small></span><span class="n">'+(na[a.artigo_id]||0)+' el.</span></div>';});
      h+=rodape+'<div class="hint" style="line-height:1.35;margin-top:3px">Toca numa linha para filtrar. Liga S, E ou D no topo para ver a execução.</div>';lb.innerHTML=h;lb.style.display='';ligarLegenda();return;}
    EST.elementos.forEach(function(e){if(!e.artigo_id)return;fasesDe(e.uid).forEach(function(f){if(f.esp!==esp)return;var c=classe(e.uid,f);cont[c]=(cont[c]||0)+1;(els[c]=els[c]||{})[e.uid]=1;});});
    var itens,tit;
    if(VISTA){tit=VISTA.tipo==='aceitar'?'Para aceitar · '+nomeSerie(VISTA.key):VISTA.tipo==='serie'?'A ver: '+nomeSerie(VISTA.key):VISTA.tipo==='auto'?(VISTA.n==null?'Medição por enviar':'Medição de '+dataMed(VISTA.key,VISTA.n))+' · '+nomeSerie(VISTA.key):'Por adjudicar · '+(NOMES_ESP[esp]||esp);itens=PRI[VISTA.tipo];}
    else if(on.length===1){tit='Camada · '+NOME_K[on[0]];itens=[on[0]].concat(CAM.E?['pat']:[]).concat(['base']);}
    else if(on.length===2){tit='Comparação';itens=['ambos',on[0],on[1]].concat(CAM.E?['pat']:[]).concat(['base']);}
    else{tit='Estado da cadeia S → E → D';itens=['fechado','pronto','porvalidar','risco','pat','base'];}
    var h2=LEG_X+'<b class="t">Legenda · '+esc(tit)+'</b>';itens.forEach(function(c){var lab=c==='S'||c==='E'||c==='D'?ROT[c]:(on.length===2&&(c===on[0]||c===on[1]))?'Só '+NOME_K[c]:ROT[c];var ne=els[c]?Object.keys(els[c]).length:0;
      h2+='<div class="li'+(LEGF&&LEGF.id==='c:'+c?' on':'')+'" data-lcls="'+c+'" data-rot="'+esc(lab)+'" title="toca para selecionar e ver só estes elementos"><span class="sw" style="background:'+hex(COR[c])+'"></span><span class="tx">'+esc(lab)+'</span><span class="n">'+(cont[c]||0)+' f · '+ne+' el.</span></div>';});
    h2+=rodape+'<div class="hint" style="line-height:1.35;margin-top:3px">'+esc(NOMES_ESP[esp]||esp)+' · f = fases, el. = elementos · toca numa linha para filtrar</div>';lb.innerHTML=h2;lb.style.display='';ligarLegenda();}
  function ajLeg(){if(!lb)return;window.__ajLeg=ajLeg;if(!window.__ajLegOn){window.__ajLegOn=1;window.addEventListener('resize',function(){try{window.__ajLeg&&window.__ajLeg();}catch(e){}});}var f0=ROOT.querySelector('#ferr');if(f0&&!f0.__ajObs&&window.MutationObserver){f0.__ajObs=1;new MutationObserver(function(){try{window.__ajLeg&&window.__ajLeg();}catch(e){}}).observe(f0,{attributes:true,attributeFilter:['class','style']});}if(window.matchMedia&&matchMedia('(max-width:760px)').matches){lb.style.maxHeight='';return;}var f=ROOT.querySelector('#ferr'),top=140;if(f&&!f.classList.contains('fechado')&&getComputedStyle(f).display!=='none'){var r=f.getBoundingClientRect();if(r.height)top=Math.max(top,r.bottom+12);}lb.style.maxHeight=Math.max(110,innerHeight-12-top)+'px';}
  function ligarLegenda(){ajLeg();var lx=lb.querySelector('.lgx');if(lx)lx.onclick=function(ev){ev.stopPropagation();host.classList.add('legmin');};lbB.textContent='▦ Legenda · '+lb.querySelectorAll('.li').length+' ▴';lb.querySelectorAll('[data-lcls]').forEach(function(d){d.onclick=function(){aplicarLegenda('c:'+d.dataset.lcls,uidsDaClasse(d.dataset.lcls),d.dataset.rot);};});
    lb.querySelectorAll('[data-lart]').forEach(function(d){d.onclick=function(){var a=d.dataset.lart;aplicarLegenda('art:'+a,EST.elementos.filter(function(e){return e.artigo_id===a;}).map(function(e){return e.uid;}),(EST.artigos[a]||{}).item||a);};});
    var x=lb.querySelector('[data-lx]');if(x)x.onclick=limparLegenda;}
  function barra(){if(!EST){cam.style.display='none';return;}var esp=ESP;var n={S:0,E:0,D:0};EST.elementos.forEach(function(e){if(!e.artigo_id)return;fasesDe(e.uid).forEach(function(f){if(f.esp!==esp)return;var s=estado(e.uid,f.id);if(s.prop)n.S++;if(s.conf||s.pat)n.E++;if(s.med)n.D++;});});
    var es=espsPresentes();
    cam.innerHTML=['S','E','D'].map(function(k){return '<button class="cam'+(CAM[k]?' on':'')+'" data-k="'+k+'" aria-pressed="'+CAM[k]+'" title="'+esc(ROT[k])+'"><span class="d">'+k+'</span><span class="lg">'+NOME_K[k]+'</span><span class="ct">'+NOME_C[k]+'</span> <small>'+n[k]+'</small></button>';}).join('')
      +'<span class="sp"></span><select id="exEsp" title="especialidade das fases mostradas">'+es.map(function(e){return '<option value="'+e+'"'+(e===esp?' selected':'')+'>'+esc(NOMES_ESP[e]||e)+'</option>';}).join('')+'</select>';
    cam.style.display='flex';
    cam.querySelectorAll('.cam').forEach(function(b){b.onclick=function(){if(LEGF){largarLegenda();render();}if(VISTA){VISTA=null;ver.style.display='none';aplicarFiltro(true);}CAM[b.dataset.k]=!CAM[b.dataset.k];pintar();renderAutos();};});
    cam.querySelector('#exEsp').onchange=function(){if(LEGF){largarLegenda();aplicarFiltro(true);render();}ESP=this.value;if(VISTA&&VISTA.tipo==='poradj')VISTA.esp=ESP;pintar();};}
  // elementos com alguma fase adjudicada ao sub (ou medida para ele): é só isso que fica visível quando se escolhe o sub
  function uidsDoSub(k){var esp=k.split('|')[1];var out=[];EST.elementos.forEach(function(e){if(!e.artigo_id)return;if(fasesDe(e.uid).some(function(f){if(f.esp!==esp)return false;if(donoKey(e.uid,f.id)===k)return true;var st=estado(e.uid,f.id);return st.med&&st.serie===k;}))out.push(e.uid);});return out;}
  var FILTRO=null;
  function aplicarFiltro(semEnq){var k=VISTA&&VISTA.key&&VISTA.tipo!=='poradj'?VISTA.key:null;if(k===FILTRO)return;FILTRO=k;
    if(!k){if(V.filtrar)V.filtrar(null);return;}var us=uidsDoSub(k);if(!us.length){if(V.filtrar)V.filtrar(null);V.aviso('Este subempreiteiro ainda não tem nada adjudicado — mostra-se o modelo todo',3500);return;}
    if(V.filtrar){V.filtrar(us);if(!semEnq){var b=V.caixaUids(us);if(!b.isEmpty()){V.enquadrar(b);ajustarMovel();}}}}
  function largarLegenda(){if(LEGF){LEGF=null;SEL.clear();V.marcar([]);if(V.filtrar)V.filtrar(null);FILTRO=null;}}
  function abrirVista(v,txt){largarLegenda();VISTA=v;ver.querySelector('span').textContent=txt+(v.key&&v.tipo!=='poradj'?' · só o adjudicado':'');ver.style.display='flex';aplicarFiltro();pintar();renderAutos();}
  function sairVista(){largarLegenda();VISTA=null;ver.style.display='none';aplicarFiltro();pintar();renderAutos();}

  // ---------- seleção ----------
  V.hooks.toque=function(o,uid,info){if(!EST)return false;
    if(!o){if(!(info&&info.evento&&info.evento.shiftKey)&&SEL.size){SEL.clear();V.marcar([]);render();}return true;}
    var uids=[];o.traverse(function(x){var u=V.uidObj(x);if(u&&elem(u)&&uids.indexOf(u)<0)uids.push(u);});
    if(!uids.length){V.aviso('Elemento sem entrada na publicação (contexto) — não se mede');return true;}
    if(uids.length===1){var u=uids[0];if(SEL.has(u))SEL.delete(u);else SEL.add(u);}
    else{var todos=uids.every(function(u){return SEL.has(u);});uids.forEach(function(u){if(todos)SEL.delete(u);else SEL.add(u);});}
    if(uids.length===1&&V.ficha)try{V.ficha(o);}catch(x){}
    V.marcar(Array.from(SEL));render();if(!DLG)V.mostrarPg('ex');return true;};
  V.hooks.janela=function(uids,info){if(!EST)return false;var us=(uids||[]).filter(function(u){return !!elem(u);});if(!(info&&info.evento&&info.evento.shiftKey))SEL.clear();us.forEach(function(u){SEL.add(u);});V.marcar(Array.from(SEL));render();if(!DLG)V.mostrarPg('ex');V.aviso(us.length+' elemento(s) '+(info&&info.cruzamento?'tocados pela':'dentro da')+' janela'+(uids.length>us.length?' ('+(uids.length-us.length)+' sem artigo, ignorados)':''),2500);return true;};
  function ajustarMovel(){if(window.innerWidth>=760||$('#painel').classList.contains('fechado')||V.vista2D)return;var cm=V.camera,ct=V.controls;var d=cm.position.distanceTo(ct.target);var dir=cm.position.clone().sub(ct.target).normalize();cm.position.copy(ct.target).add(dir.multiplyScalar(d*1.35));
    var Hh=2*d*1.35*Math.tan(cm.fov*Math.PI/360);var up=new T.Vector3(0,1,0).applyQuaternion(cm.quaternion).multiplyScalar(-0.28*Hh);cm.position.add(up);ct.target.add(up);ct.update();V.pedir();}
  function vistaPiso(nome){var no=V.isolarNo(nome);if(!no){V.aviso('Não encontrei o nó «'+nome+'» no modelo');return;}var b=new T.Box3().setFromObject(no);V.enquadrar(b);ajustarMovel();}
  function selecionarPor(f,semVoar){SEL.clear();EST.elementos.forEach(function(e){if(f(e))SEL.add(e.uid);});V.marcar(Array.from(SEL));render();if(!semVoar&&SEL.size){var b=V.enquadrarUids(Array.from(SEL));if(!b.isEmpty())ajustarMovel();}}

  // ---------- separador Execução ----------
  var nomesK={wall:'paredes',ceiling:'tectos',recaida:'recaídas',floor:'pavimentos',sanca:'sancas',wallvinyl:'vinil parede'};
  function nomeComp(c){return ({estrutura:'Estrutura',placa_A_1:'Placa A · 1.ª',placa_A_2:'Placa A · 2.ª',placa_A_3:'Placa A · 3.ª',placa_B_1:'Placa B · 1.ª',placa_B_2:'Placa B · 2.ª',placa_B_3:'Placa B · 3.ª',placa_intermedia:'Placa intermédia',isolamento:'Isolamento',vaos:'Reforços de vão',reforcos:'Reforços',placa_1:'Placas · 1.ª',placa_2:'Placas · 2.ª',placa_3:'Placas · 3.ª',assentamento:'Assentamento',rodape:'Rodapé',remates:'Remates'})[c]||c;}
  function render(){renderExec();renderAutos();renderFases();}
  function renderExec(){if(!EST)return;var h='';
    h+='<div class="exctx">Papel: <b>'+esc(EST.papel)+'</b> · '+EST.elementos.length+' elementos · '+Object.keys(EST.artigos).length+' artigos<br><span class="hint">Medir vai para o subempreiteiro a quem a fase está adjudicada (separador Subempreiteiros).</span></div>';
    h+='<div class="hint" style="margin:4px 0 8px">Toca nos elementos para juntar/retirar da seleção, ou usa «Janela» nas ferramentas.</div>';
    if(!SEL.size){h+='<div class="vazio">Nenhum elemento selecionado.</div>'+resumoPrep()+historicoHTML();exBox.innerHTML=h;ligarExec();return;}
    var tot={},kinds={},n=0;SEL.forEach(function(u){var e=elem(u);if(!e)return;n++;var k=e.kind||'?';kinds[k]=(kinds[k]||0)+1;tot[e.unidade||'']=(tot[e.unidade||'']||0)+(e.qtd||0);});
    h+='<div class="selres"><button class="sm" data-limpar="1" style="float:right" title="limpar a seleção">✕ limpar</button><b>'+n+' elemento'+(n>1?'s':'')+'</b> · '+Object.keys(kinds).map(function(k){return kinds[k]+' '+(nomesK[k]||k);}).join(', ')+' · '+Object.keys(tot).map(function(u){return num(tot[u])+' '+u;}).join(' + ')+'</div>';
    h+='<div class="sellist">'+Array.from(SEL).slice(0,10).map(function(u){var e=elem(u);return '<span class="tag" data-voar="'+esc(u)+'" title="voar até lá">'+esc(e.nome||u)+' <small>'+num(e.qtd)+' '+esc(e.unidade||'')+'</small></span>';}).join(' ')+(SEL.size>10?' <span class="hint">… +'+(SEL.size-10)+'</span>':'')+'</div>';
    // execução da seleção por especialidade: medido % · falta % e «Medir o que falta» (fases ainda não medidas com dono)
    var ex={};SEL.forEach(function(u){var e=elem(u);if(!e||!e.artigo_id)return;fasesDe(u).forEach(function(f){var x=ex[f.esp]=ex[f.esp]||{tot:0,med:0,falta:0,itens:[],semDono:0,pat:0,porArt:{}};var q=(e.qtd||0)*f.peso;x.tot+=q;var st=estado(u,f.id);
      if(st.med){x.med+=q;return;}if(st.pat){x.pat++;return;}if(!donoKey(u,f.id)){x.semDono++;return;}x.falta+=q;x.itens.push({uid:u,fase:f.id});var a=EST.artigos[e.artigo_id];var pa=x.porArt[a.item]=x.porArt[a.item]||{q:0,u:a.unidade||''};pa.q+=q;});});
    FALTA=ex;var esps=Object.keys(ex);
    if(esps.length){h+='<div class="falta"><b>Execução da seleção</b>';esps.forEach(function(e){var x=ex[e];var pm=x.tot?Math.round(100*x.med/x.tot):0;
      h+='<div style="margin-top:3px">'+esc(NOMES_ESP[e]||e)+': medido <b>'+pm+' %</b> · falta '+(100-pm)+' %'+(x.semDono?' <span class="tag w">'+x.semDono+' fase(s) sem sub</span>':'')+(x.pat?' <span class="tag r">'+x.pat+' com patologia</span>':'')
        +(podeMedir()&&x.itens.length?' <button class="sm p" data-falta="'+e+'" title="mede de uma vez todas as fases ainda não medidas (cada uma vai para o seu dono)">Medir o que falta · '+Object.keys(x.porArt).map(function(k){return num(x.porArt[k].q,1)+' '+esc(x.porArt[k].u);}).join(' + ')+'</button>':'')+'</div>';});h+='</div>';}
    var grupos={};SEL.forEach(function(u){var e=elem(u);if(!e)return;var k=e.artigo_id||'_';(grupos[k]=grupos[k]||[]).push(u);});
    Object.keys(grupos).forEach(function(k){var us=grupos[k];if(k==='_'){h+='<div class="pat" style="background:#fff3cd;color:#664d03">'+us.length+' elemento(s) sem artigo no orçamento — não se medem.</div>';return;}
      var a=EST.artigos[k];h+='<h3>'+esc(a.item)+' <small>'+esc(nomesK[(elem(us[0])||{}).kind]||'')+' ('+us.length+')</small></h3>';
      var fasesU={},ordem=[];us.forEach(function(u){fasesDe(u).forEach(function(f){if(!fasesU[f.id]){fasesU[f.id]=f;ordem.push(f.id);}});});
      var porEsp={};ordem.forEach(function(fid){var e=fasesU[fid].esp;(porEsp[e]=porEsp[e]||[]).push(fid);});
      Object.keys(porEsp).forEach(function(esp){h+='<div class="esph">'+esc(NOMES_ESP[esp]||esp)+'</div><table class="fases">';
        porEsp[esp].forEach(function(fid){var f=fasesU[fid];var c={med:0,n:0,env:0,conf:0,prop:0,pat:0,sem:0,na:0,dev:0},idsN=[],donos={},semDono=0,medivel=0,devN=[];
          us.forEach(function(u){if(!fasesDe(u).some(function(x){return x.id===fid;})){c.na++;return;}var s=estado(u,fid);var dk=donoKey(u,fid);
            if(s.med){c.med++;if(s.auto_n==null&&s.lote==null){c.n++;idsN.push(s.idMed);}else if(s.auto_n==null)c.env++;}else{if(dk)medivel++;else semDono++;if(s.pat)c.pat++;else if(s.conf)c.conf++;else if(s.prop)c.prop++;else if(s.dev){c.dev++;if(devN.indexOf(s.dev)<0)devN.push(s.dev);}else c.sem++;}
            if(dk)donos[dk]=(donos[dk]||0)+1;});
          var est='';if(c.n)est+='<span class="tag b" title="medido, ainda não enviado para a consola">'+c.n+' medido · por enviar</span> ';if(c.env)est+='<span class="tag b" style="background:#e3ecf8" title="enviado pelo DO, à espera de a consola o passar a auto">'+c.env+' enviado</span> ';if(c.med-c.n-c.env)est+='<span class="tag g" title="a consola já o passou a auto">'+(c.med-c.n-c.env)+' em auto</span> ';if(c.conf)est+='<span class="tag gl">'+c.conf+' confirmado</span> ';if(c.prop)est+='<span class="tag w">'+c.prop+' declarado</span> ';if(c.pat)est+='<span class="tag r">'+c.pat+' patologia</span> ';if(c.dev)est+='<span class="tag r" title="devolvido pelo DO: '+esc(devN.join(' · '))+'">'+c.dev+' devolvido pelo DO</span> ';if(c.sem)est+='<span class="tag n">'+c.sem+' sem registo</span>';if(c.na)est+=' <span class="tag n" title="elementos sem os componentes desta fase">'+c.na+' n/a</span>';
          var dn=Object.keys(donos).map(function(dk){return '<span class="tag o" title="dono da fase">'+esc(nomeSerie(dk).split(' · ')[0])+' ×'+donos[dk]+'</span>';}).join(' ')+(semDono?' <span class="tag w" title="sem subempreiteiro: adjudica no separador Subempreiteiros">'+semDono+' sem sub</span>':'');
          var acs='';if(podeMedir()){if(medivel)acs+='<button class="sm p" data-medir="'+esc(k+'|'+fid)+'" title="vai para as medições do dono de cada fase">Medir</button>';if(c.n)acs+=' <button class="sm" data-anular="'+esc(idsN.join(','))+'">Anular</button>';}
          if(podeConfirmar()){if(c.prop||c.sem||c.pat||c.dev||semDono)acs+=' <button class="sm'+(podeMedir()?'':' p')+'" data-conf="'+esc(k+'|'+fid)+'">Confirmar</button>';if(c.prop||c.conf||c.sem)acs+=' <button class="sm" data-pat="'+esc(k+'|'+fid)+'">Patologia…</button>';}
          if(podeDeclarar()&&(c.sem||c.conf||c.dev))acs+=' <button class="sm'+(podeMedir()||podeConfirmar()?'':' p')+'" data-prop="'+esc(k+'|'+fid)+'">Declarar feito</button>';
          h+='<tr><td class="fn">'+esc(f.nome)+'<br><small>'+f.pct+' % de '+esc((NOMES_ESP[esp]||esp).toLowerCase())+(f.renorm?' (renorm.)':'')+(f.comps.length?'':' · sem componente 3D')+'</small></td><td class="st">'+est+(dn?'<br>'+dn:'')+'</td><td class="ac">'+acs+'</td></tr>';});
        h+='</table>';});});
    var pats=[];SEL.forEach(function(u){fasesDe(u).forEach(function(f){var s=estado(u,f.id);if(s.pat)pats.push(esc((elem(u)||{}).nome)+' · '+esc(f.nome)+': '+esc(s.pat));});});
    if(pats.length)h+='<div class="pat">⚠ '+pats.join('<br>⚠ ')+'</div>';
    h+=resumoPrep()+historicoHTML();exBox.innerHTML=h;ligarExec();}
  function resumoPrep(){var ls=(EST.series||[]).map(function(s){var p=s.artigos.reduce(function(x,a){return x+a.prep;},0);return p?'<div><b>'+esc(nomeSerie(s.key))+'</b>: '+s.artigos.filter(function(a){return a.prep;}).map(function(a){return esc(a.item)+' '+num(a.prep,1)+' '+esc(a.unidade||'');}).join(' · ')+'</div>':'';}).filter(Boolean);
    return '<h3>Medições por enviar</h3>'+(ls.length?'<div style="font-size:12.5px">'+ls.join('')+'</div><div class="hint">Envia-as no cartão de cada subempreiteiro (separador Subempreiteiros).</div>':'<div class="hint">Nada medido por enviar.</div>');}
  function historicoHTML(){var ult=(EST.historico||[]).slice(0,10);if(!ult.length)return '';var h='<h3>Histórico</h3><div class="hist">';
    ult.forEach(function(r){var e=elem(r.uid);var f=fasesDe(r.uid).filter(function(x){return x.id===r.fase;})[0];h+='<div'+(r.anulado?' class="off"':'')+'><small>'+esc(dt(r.quando))+'</small> · <b>'+esc(e?e.nome:r.uid)+'</b> · '+esc(f?f.nome:r.fase)+' → <span class="tag '+({medido:'b',confirmado:'gl',proposto:'w',patologia:'r',recusado:'n'})[r.estado]+'">'+esc(r.estado==='proposto'?'declarado':r.estado)+(r.estado==='medido'?' · '+esc(r.sub_codigo):'')+(r.auto_n?' · em auto':r.lote?' · enviado':'')+'</span> <small>'+esc(r.quem)+(r.nota?' · '+esc(r.nota):'')+'</small></div>';});
    return h+'</div>';}
  function alvo(d){var kf=d.split('|');return Array.from(SEL).filter(function(u){var e=elem(u);return e&&e.artigo_id===kf[0]&&fasesDe(u).some(function(f){return f.id===kf[1];});}).map(function(u){return {uid:u,fase:kf[1]};});}
  function registar(estadoNovo,itens,nota){if(!itens.length){V.aviso('Nada para registar');return;}
    api('exec3dRegistar',cod,{modelo_id:ctx.modelo_id,estado:estadoNovo,itens:itens,nota:nota||null}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);return;}
      var ig=(r.ignorados||[]).length;var ps=r.por_serie?Object.keys(r.por_serie).map(function(k){return nomeSerie(k).split(' · ')[0]+' '+r.por_serie[k];}).join(', '):'';
      V.aviso(r.n+' registo'+(r.n!==1?'s':'')+' ('+(estadoNovo==='proposto'?'declarado':estadoNovo)+')'+(ps?' → '+ps:'')+(r.sem_confirmacao?' · '+r.sem_confirmacao+' sem confirmação do encarregado':'')+(ig?' · '+ig+' ignorado'+(ig>1?'s':'')+': '+r.ignorados.slice(0,2).map(function(x){return x.motivo;}).join('; '):''),5500);
      return recarregar();});}
  function ligarExec(){var box=exBox;
    box.querySelectorAll('[data-piso]').forEach(function(b){b.onclick=function(){var p=b.dataset.piso;vistaPiso(p);selecionarPor(function(e){return e.piso===p;},true);};});
    box.querySelectorAll('[data-art]').forEach(function(b){b.onclick=function(){var id=b.dataset.art;selecionarPor(function(e){return e.artigo_id===id;});};});
    box.querySelectorAll('[data-limpar]').forEach(function(b){b.onclick=function(){if(LEGF){limparLegenda();return;}SEL.clear();V.marcar([]);render();};});
    box.querySelectorAll('[data-voar]').forEach(function(t){t.onclick=function(){V.voarUid(t.dataset.voar);ajustarMovel();};});
    box.querySelectorAll('[data-medir]').forEach(function(b){b.onclick=function(){registar('medido',alvo(b.dataset.medir));};});
    box.querySelectorAll('[data-falta]').forEach(function(b){b.onclick=function(){var x=FALTA[b.dataset.falta];if(!x||!x.itens.length)return;
      if(!confirm('Medir o que falta em '+(NOMES_ESP[b.dataset.falta]||b.dataset.falta).toLowerCase()+' nos '+SEL.size+' elementos selecionados?\n\n'+Object.keys(x.porArt).map(function(k){return k+': '+num(x.porArt[k].q,2)+' '+x.porArt[k].u;}).join('\n')+'\n\n'+x.itens.length+' fase(s) · cada uma vai para o subempreiteiro dono · fica «por enviar»'+(x.semDono?'\n'+x.semDono+' fase(s) sem sub ficam de fora':'')+(x.pat?'\n'+x.pat+' com patologia ficam de fora':'')))return;
      registar('medido',x.itens);};});
    box.querySelectorAll('[data-conf]').forEach(function(b){b.onclick=function(){registar('confirmado',alvo(b.dataset.conf));};});
    box.querySelectorAll('[data-prop]').forEach(function(b){b.onclick=function(){registar('proposto',alvo(b.dataset.prop));};});
    box.querySelectorAll('[data-pat]').forEach(function(b){b.onclick=function(){var nota=prompt('Patologia / observação (fica ligada aos elementos selecionados):','');if(nota==null)return;registar('patologia',alvo(b.dataset.pat),nota||'patologia');};});
    box.querySelectorAll('[data-anular]').forEach(function(b){b.onclick=function(){var ids=b.dataset.anular.split(',').map(Number).filter(Boolean);if(!confirm('Anular '+ids.length+' medição(ões) ainda por enviar?'))return;api('exec3dAnular',cod,{ids:ids}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);return;}V.aviso(r.anulados+' anulada(s)'+(r.bloqueados&&r.bloqueados.length?' · '+r.bloqueados.length+' bloqueada(s)':''),4000);recarregar();});};});}

  // ---------- separador Autos: subempreiteiros da obra, adjudicação, substituição ----------
  function renderAutos(){if(!EST)return;var h='';var pa=EST.por_adjudicar||{};var esps=Object.keys(pa).filter(function(e){return pa[e].some(function(x){return x.qtd>0.004;});});
    h+='<h3>Por adjudicar</h3>';
    if(!esps.length)h+='<div class="hint">Todas as fases têm subempreiteiro.</div>';
    esps.forEach(function(e){h+='<div class="exctx"><b>'+esc(NOMES_ESP[e]||e)+'</b> · '+pa[e].filter(function(x){return x.qtd>0.004;}).map(function(x){return esc(x.item)+' '+num(x.qtd,1)+' '+esc(x.unidade||'');}).join(' · ')+'<div class="acts"><button data-pver="'+e+'">Ver no 3D</button><button data-psel="'+e+'" title="seleciona os elementos com fases desta especialidade sem sub">Selecionar</button></div></div>';});
    h+='<h3 style="display:flex;align-items:center;gap:6px"><span style="flex:1">Subempreiteiros da obra</span>'+(EST.series.length>1?'<button class="sm" data-expall="1" title="expandir todos">▾ todos</button><button class="sm" data-expall="0" title="recolher todos">▸ todos</button>':'')+'</h3>';
    if(!EST.series.length)h+='<div class="vazio">Ainda não há subempreiteiros nesta obra.<br><small>Criam-se na consola de autos da obra (Subempreitadas) e aparecem aqui quando o DO guarda.</small></div>';
    var ordem=EST.series.slice().sort(function(a,b){return a.especialidade.localeCompare(b.especialidade)||a.sub_codigo.localeCompare(b.sub_codigo);});var espAnt=null;
    ordem.forEach(function(s){if(s.especialidade!==espAnt){h+='<div class="esph">'+esc(NOMES_ESP[s.especialidade]||s.especialidade)+'</div>';espAnt=s.especialidade;}h+=cartaoSerie(s);});
    auBox.innerHTML=h;ligarAutos();}
  function cartaoSerie(s){var k=s.key;var vis=VISTA&&(VISTA.key===k);var av=[];var trs=(EST.transf||[]).filter(function(t){return !t.anulada&&(t.de===k||t.para===k);});
    var sub=s.artigos.length?'':'<div class="hint">Sem fases adjudicadas. Seleciona elementos no desenho e carrega em «Adjudicar seleção».</div>';
    var aberto=!!EXP[k]||!!(DLG&&DLG.key===k);
    var tags=(trs.some(function(t){return t.de===k;})?' <span class="tag r">substituído</span>':'')+(trs.some(function(t){return t.para===k;})?' <span class="tag gl">herdou</span>':'');
    var h='<div class="sub3'+(vis?' vis':'')+(aberto?'':' min')+'" data-k="'+esc(k)+'"><div class="cab"><div class="tit"><h4>'+esc(s.sub_nome||s.sub_codigo)+'</h4><div class="meta">'+esc(s.sub_codigo)+' · '+esc(NOMES_ESP[s.especialidade]||s.especialidade)+tags+'</div></div><button class="exp" data-exp="'+esc(k)+'" title="'+(aberto?'recolher':'expandir')+'" aria-expanded="'+aberto+'">'+(aberto?'▾':'▸')+'</button></div>';
    if(!aberto){var por={};s.artigos.forEach(function(a){var u=a.unidade||'';var x=por[u]=por[u]||{adj:0,prep:0,exec:0,acc:0};x.adj+=a.adjudicado;x.prep+=a.prep;x.exec+=a.porExec;x.acc+=(a.conf||0)+(a.decl||0);});
      var us=Object.keys(por);var nAv=s.artigos.reduce(function(x,a){return x+a.avisos.length;},0);
      h+='<div class="res">'+(us.length?us.map(function(u){var x=por[u];return 'Adjudicado <b>'+num(x.adj,1)+'</b> · por enviar <b>'+num(x.prep,1)+'</b> · por executar '+num(x.exec,1)+' '+esc(u);}).join('<br>'):'<span class="hint">sem fases adjudicadas</span>')
        +(us.some(function(u){return por[u].acc>0.004;})?' <span class="tag gl" title="marcado pelo encarregado/sub, à espera do DO">para aceitar</span>':'')+(nAv?' <span class="tag w" title="avisos de adjudicação">'+nAv+' aviso'+(nAv>1?'s':'')+'</span>':'')+'</div>';
      return h+'</div>';}
    if(s.artigos.length){h+='<table class="med"><tr><th>Artigo</th><th title="congelado na adjudicação">Adjudicado</th><th title="medido e enviado para a consola (inclui o que já está em auto)">Enviado</th><th title="medido, por enviar para a consola">Por enviar</th><th>Por executar</th></tr>';
      s.artigos.forEach(function(a){h+='<tr><td><b>'+esc(a.item)+'</b></td><td>'+num(a.adjudicado,1)+'</td><td>'+num(a.pago+(a.env||0),1)+(a.env?'<br><small title="enviado, à espera da consola">'+num(a.env,1)+' à espera</small>':'')+'</td><td class="b">'+num(a.prep,1)+'</td><td>'+num(a.porExec,1)+(a.conf?'<br><small title="confirmado pelo encarregado, por medir">'+num(a.conf,1)+' conf.</small>':'')+'</td></tr>';
        if(Math.abs(a.adjudicado-a.modelo)>0.05)av.push('<div class="av w">'+esc(a.item)+': o modelo atual dá '+num(a.modelo,2)+' '+esc(a.unidade||'')+' ('+(a.modelo>a.adjudicado?'+':'')+num(a.modelo-a.adjudicado,2)+' face ao adjudicado). A adjudicação não muda sozinha.</div>');
        a.avisos.forEach(function(l){if(l.tipo==='transferido')av.push('<div class="av r"><b>Adjudicação reduzida</b> · '+esc(a.item)+': '+num(-l.qtd,2)+' '+esc(a.unidade||'')+' passados para '+esc(l.para)+' em '+esc(dt(l.quando))+(l.motivo?' — «'+esc(l.motivo)+'»':'')+(l.reportado_auto?' <small>(já comunicado à consola)</small>':' <small>(a consola avisa no próximo auto)</small>')+'</div>');
          else if(l.tipo==='herdado')av.push('<div class="av g"><b>Quantidade herdada</b> · '+esc(a.item)+': '+num(l.qtd,2)+' '+esc(a.unidade||'')+' do Sub '+esc(l.de)+' em '+esc(dt(l.quando))+(l.motivo?' — «'+esc(l.motivo)+'»':'')+' <small>(preço: tabela de preços da obra na consola)</small></div>');
          else if(l.tipo==='retirado')av.push('<div class="av w">Retirado da adjudicação · '+esc(a.item)+': '+num(-l.qtd,2)+' '+esc(a.unidade||'')+' em '+esc(dt(l.quando))+'</div>');});});
      h+='</table>';}
    var tC=s.artigos.reduce(function(x,a){return x+(a.conf||0);},0),tD=s.artigos.reduce(function(x,a){return x+(a.decl||0);},0);
    if(tC+tD>0.004){h+='<div class="av i"><b>Para aceitar</b> · '+s.artigos.filter(function(a){return a.conf||a.decl;}).map(function(a){return esc(a.item)+': '+(a.conf?num(a.conf,1)+' confirmado pelo encarregado':'')+(a.conf&&a.decl?' + ':'')+(a.decl?num(a.decl,1)+' declarado pelo sub':'')+' '+esc(a.unidade||'');}).join(' · ')
      +'<div class="acts" style="margin-top:4px"><button data-aver="'+esc(k)+'" class="'+(VISTA&&VISTA.tipo==='aceitar'&&VISTA.key===k?'p':'')+'">Ver no 3D</button>'+(podeMedir()?'<button class="p" data-acc="'+esc(k)+'">Aceitar…</button>':'')+'</div></div>';}
    h+=sub+av.join('');
    trs.filter(function(t){return t.para===k;}).forEach(function(t){h+='<div class="acts"><button class="sm" data-desf="'+t.id+'" title="só enquanto este sub não tiver nada medido no que herdou">Desfazer transferência de '+esc(t.de.split('|')[0])+'</button></div>';});
    var ns=SEL.size;var tP=s.artigos.reduce(function(x,a){return x+a.prep;},0);var tAv=s.artigos.some(function(a){return a.avisos.some(function(l){return !l.reportado_lote&&!l.reportado_auto;});});
    if(podeMedir()&&(tP>0.004||tAv))h+='<div class="acts"><button class="p" data-env="'+esc(k)+'" title="fecha a medição com a data de hoje e deixa-a disponível para a consola de autos">Enviar para a consola · '+s.artigos.filter(function(a){return a.prep;}).map(function(a){return num(a.prep,1)+' '+esc(a.unidade||'');}).join(' + ')+(tP>0.004?'':'avisos')+'</button></div>';
    h+='<div class="acts"><button data-ver="'+esc(k)+'" class="'+(VISTA&&VISTA.tipo==='serie'&&VISTA.key===k?'p':'')+'">'+(VISTA&&VISTA.tipo==='serie'&&VISTA.key===k?'A ver no 3D':'Ver no 3D')+'</button>'
      +(podeMedir()?'<button data-adj="'+esc(k)+'"'+(ns?'':' disabled title="seleciona primeiro elementos no desenho"')+'>Adjudicar seleção'+(ns?' ('+ns+')':'')+'</button><button data-ret="'+esc(k)+'"'+(ns&&s.artigos.length?'':' disabled')+'>Retirar seleção</button>'+(s.artigos.some(function(a){return a.porExec>0.004;})?'<button data-sub="'+esc(k)+'">Substituir…</button>':''):'')
      +'<button data-aut="'+esc(k)+'">Medições '+(ABERTO[k]?'▾':'▸')+'</button></div>';
    if(DLG&&DLG.key===k)h+=dialogo();
    if(ABERTO[k])h+=listaAutos(s);
    return h+'</div>';}
  function dataMed(k,n){var a=(EST.lotes||[]).filter(function(x){return x.id===n;})[0];return a?dt(a.quando):'—';}
  function listaAutos(s){var k=s.key;var meds=(EST.lotes||[]).filter(function(a){return a.sub_codigo+'|'+a.especialidade===k;});var h='<div class="autos">';
    meds.forEach(function(a){var tot=(a.linhas||[]).reduce(function(x,l){return x+(l.total||0);},0);var on=VISTA&&VISTA.tipo==='auto'&&VISTA.key===k&&VISTA.n===a.id;var conv=a.auto_n!=null;
      h+='<div class="auto'+(on?' on':'')+'" data-auto="'+esc(k)+'|'+a.id+'"><div><b>Medição de '+esc(dt(a.quando))+'</b> <small>'+esc(a.quem||'')+'</small><br><small>'+(a.linhas||[]).map(function(l){return esc(l.item)+' '+num(l.total,1)+' '+esc(l.unidade||'');}).join(' · ')+'</small>'+(!conv&&podeMedir()?'<div style="margin-top:3px"><button class="sm" data-anenv="'+a.id+'" title="só enquanto a consola não a converteu em auto">Anular envio</button></div>':'')+'</div><div class="v">'+num(tot,1)+'<br>'+(conv?'<span class="tag g">EM AUTO</span>':'<span class="tag b">ENVIADA</span>')+'</div></div>';});
    var ap=AUTOS[k];if(!ap){calcAuto(k);}var onP=VISTA&&VISTA.tipo==='auto'&&VISTA.key===k&&VISTA.n==null;
    h+='<div class="auto prep'+(onP?' on':'')+'" data-auto="'+esc(k)+'|"><div><b>Medição por enviar</b><br><small>'+(ap?ap.linhas.filter(function(l){return l.total;}).map(function(l){return esc(l.item)+' '+num(l.total,1)+' '+esc(l.unidade||'')+(l.ajuste?' (inclui ajuste de fases '+num(l.ajuste,1)+')':'');}).join(' · ')||'nada medido':'a calcular…')+'</small></div><div class="v">'+(ap?num(ap.linhas.reduce(function(x,l){return x+l.total;},0),1):'')+'<br><span class="tag b">EM CURSO</span></div></div>';
    return h+'<div class="hint">Toca numa medição para a ver no 3D. «Enviar para a consola» fecha a medição em curso; a consola de autos converte as enviadas em auto.</div></div>';}
  function calcAuto(k){var p=k.split('|');api('exec3dAuto',cod,{sub_codigo:p[0],especialidade:p[1]}).then(function(r){if(!vivo||!r||!r.ok)return;AUTOS[k]=r;renderAutos();});}

  // diálogos (dentro do cartão do sub)
  function dialogo(){var d=DLG,s=serie(d.key);var r=d.prev;var h='<div class="dlg">';
    if(d.tipo==='adj'){h+='<h5>Adjudicar seleção a '+esc(nomeSerie(d.key))+'</h5>';
      if(!r)return h+'<div class="hint">a calcular…</div></div>';
      if(!r.artigos.length)h+='<div class="av w">Nada para adjudicar: '+(r.conflitos?r.conflitos+' fase(s) já são de outro sub (usa «Substituir…» nesse sub)':'')+(r.ja_seus?' · '+r.ja_seus+' já são deste sub':'')+(r.ja_medidos?' · '+r.ja_medidos+' já medidas':'')+'.</div>';
      else{h+='<table class="med"><tr><th>Artigo</th><th>Quantidade (fica congelada)</th></tr>'+r.artigos.map(function(a){return '<tr><td><b>'+esc(a.item)+'</b></td><td>'+num(a.qtd,2)+' '+esc(a.unidade||'')+'</td></tr>';}).join('')+'</table>';
        h+='<div class="hint">'+r.n_fases+' fase(s) de '+esc((NOMES_ESP[s.especialidade]||s.especialidade).toLowerCase())+(r.conflitos?' · '+r.conflitos+' de outro sub ignoradas':'')+(r.ja_seus?' · '+r.ja_seus+' já deste sub':'')+'. Os preços são os da tabela de preços da obra na consola.</div>';}
      h+='<div class="acts"><button class="p" data-dok="1"'+(r.artigos.length?'':' disabled')+'>Adjudicar</button><button data-dx="1">Cancelar</button></div>';}
    if(d.tipo==='ret'){h+='<h5>Retirar seleção a '+esc(nomeSerie(d.key))+'</h5>';if(!r)return h+'<div class="hint">a calcular…</div></div>';
      h+=r.artigos.length?'<div>'+r.artigos.map(function(a){return esc(a.item)+': −'+num(a.qtd,2)+' '+esc(a.unidade||'');}).join(' · ')+'</div>':'<div class="av w">Nada deste sub por medir na seleção.</div>';
      if(r.medidas)h+='<div class="hint">'+r.medidas+' fase(s) já medidas ficam com o sub.</div>';h+='<label>Motivo <input type="text" data-motivo value="'+esc(d.motivo||'')+'"></label><div class="acts"><button class="p" data-dok="1"'+(r.artigos.length?'':' disabled')+'>Retirar</button><button data-dx="1">Cancelar</button></div>';}
    if(d.tipo==='acc'){h+='<h5>Aceitar medições de '+esc(nomeSerie(d.key))+'</h5>';
      h+='<label><input type="checkbox" data-cconf'+(d.cconf!==false?' checked':'')+'> o que o encarregado confirmou</label><label><input type="checkbox" data-cdecl'+(d.cdecl!==false?' checked':'')+'> o que o subempreiteiro declarou (sem confirmação do encarregado)</label>';
      h+='<label><input type="radio" name="exAmb" value="todo"'+(d.ambito!=='sel'?' checked':'')+'> Tudo o que está marcado</label><label><input type="radio" name="exAmb" value="sel"'+(d.ambito==='sel'?' checked':'')+(SEL.size?'':' disabled')+'> Só na seleção do desenho ('+SEL.size+' elementos)</label>';
      if(!r)return h+'<div class="hint">a calcular…</div></div>';
      h+=r.artigos.length?'<table class="med"><tr><th>Artigo</th><th>Passa a medido · por enviar</th></tr>'+r.artigos.map(function(a){return '<tr><td><b>'+esc(a.item)+'</b></td><td class="b">'+num(a.qtd,2)+' '+esc(a.unidade||'')+'</td></tr>';}).join('')+'</table><div class="hint">'+r.n_fases+' fase(s): '+r.confirmados+' confirmadas pelo encarregado · '+r.declarados+' só declaradas pelo sub. Para levar mais ou menos, usa a seleção e «Medir»/«Anular» no separador Execução.</div>':'<div class="av w">Nada marcado com estes critérios.</div>';
      h+='<div class="acts"><button class="p" data-dok="1"'+(r.n_fases?'':' disabled')+'>Aceitar</button><button data-ddev="1"'+(r.n_fases?'':' disabled')+' title="anula as marcações com uma nota — o encarregado/sub vê «devolvido pelo DO»">Devolver…</button><button data-dx="1">Cancelar</button></div>';}
    if(d.tipo==='sub'){var outros=EST.series.filter(function(x){return x.especialidade===s.especialidade&&x.key!==d.key;});
      h+='<h5>Substituir '+esc(s.sub_nome||s.sub_codigo)+' ('+esc(NOMES_ESP[s.especialidade]||s.especialidade)+')</h5>';
      if(!outros.length)return h+'<div class="av w">Não há outro subempreiteiro de '+esc((NOMES_ESP[s.especialidade]||s.especialidade).toLowerCase())+' nesta obra. Cria-o primeiro na consola.</div><div class="acts"><button data-dx="1">Fechar</button></div></div>';
      h+='<label>Passar para <select data-para>'+outros.map(function(x){return '<option value="'+esc(x.sub_codigo)+'"'+(d.para===x.sub_codigo?' selected':'')+'>'+esc((x.sub_nome||x.sub_codigo)+' · '+x.sub_codigo)+'</option>';}).join('')+'</select></label>';
      h+='<label><input type="radio" name="exAmb" value="todo"'+(d.ambito!=='sel'?' checked':'')+'> Todo o remanescente</label><label><input type="radio" name="exAmb" value="sel"'+(d.ambito==='sel'?' checked':'')+(SEL.size?'':' disabled')+'> Só a seleção no desenho ('+SEL.size+' elementos)</label>';
      h+='<label><input type="checkbox" data-mconf'+(d.medirConf!==false?' checked':'')+'> Medir já para '+esc(s.sub_codigo)+' o que o encarregado confirmou e ainda não está medido</label>';
      if(!r)return h+'<div class="hint">a calcular…</div></div>';
      var S=function(x){return x.reduce(function(a,b){return a+b.qtd;},0);};
      h+='<table class="med"><tr><th>Artigo</th><th>Fica com '+esc(s.sub_codigo)+'</th><th>Passa</th></tr>';
      var arts={};['pago','prep','confirmados','passa'].forEach(function(c){r[c].forEach(function(a){var x=arts[a.artigo_id]=arts[a.artigo_id]||{item:a.item,un:a.unidade,fica:0,passa:0};if(c==='passa')x.passa+=a.qtd;else x.fica+=a.qtd;});});
      Object.keys(arts).forEach(function(aid){var x=arts[aid];h+='<tr><td><b>'+esc(x.item)+'</b></td><td>'+num(x.fica,2)+' '+esc(x.un||'')+'</td><td class="b">'+num(x.passa,2)+' '+esc(x.un||'')+'</td></tr>';});
      h+='</table><div class="hint">Fica com '+esc(s.sub_codigo)+': medido e enviado '+num(S(r.pago),1)+' · medido por enviar '+num(S(r.prep),1)+(S(r.confirmados)?' · confirmado a medir agora '+num(S(r.confirmados),1):'')+'. O preço do novo sub trata-se na consola (proposta: o preço do '+esc(s.sub_codigo)+').</div>';
      h+='<label>Motivo (fica registado; a consola mostra-o nos dois autos) <input type="text" data-motivo value="'+esc(d.motivo||'')+'" placeholder="ex.: sem resposta na obra"></label>';
      h+='<div class="acts"><button class="p" data-dok="1"'+(r.n_passa||S(r.confirmados)?'':' disabled')+'>Confirmar substituição</button><button data-dx="1">Cancelar</button></div>';}
    return h+'</div>';}
  function abrirDlg(tipo,k){DLG={tipo:tipo,key:k,prev:null,precos:{},motivo:'',ambito:(tipo==='acc'&&SEL.size)?'sel':'todo',medirConf:true,para:null,cconf:true,cdecl:true};simular();renderAutos();}
  function lerDlg(){var c=auBox.querySelector('.dlg');if(!c||!DLG)return;var m=c.querySelector('[data-motivo]');if(m)DLG.motivo=m.value;var p=c.querySelector('[data-para]');if(p)DLG.para=p.value;var a=c.querySelector('input[name=exAmb]:checked');if(a)DLG.ambito=a.value;var mc=c.querySelector('[data-mconf]');if(mc)DLG.medirConf=mc.checked;var cc=c.querySelector('[data-cconf]');if(cc)DLG.cconf=cc.checked;var cd=c.querySelector('[data-cdecl]');if(cd)DLG.cdecl=cd.checked;}
  function payload(sim){var d=DLG,p=d.key.split('|');var uids=Array.from(SEL);
    if(d.tipo==='adj')return ['exec3dAdjudicar',{sub_codigo:p[0],especialidade:p[1],uids:uids,simular:sim}];
    if(d.tipo==='acc')return ['exec3dAceitar',{sub_codigo:p[0],especialidade:p[1],uids:d.ambito==='sel'?uids:null,confirmados:d.cconf!==false,declarados:d.cdecl!==false,simular:sim}];
    if(d.tipo==='ret')return ['exec3dRetirar',{sub_codigo:p[0],especialidade:p[1],uids:uids,motivo:d.motivo,simular:sim}];
    var outros=EST.series.filter(function(x){return x.especialidade===p[1]&&x.key!==d.key;});if(!d.para&&outros.length)d.para=outros[0].sub_codigo;
    return ['exec3dSubstituir',{de_sub:p[0],para_sub:d.para,especialidade:p[1],uids:d.ambito==='sel'?uids:null,medir_confirmados:d.medirConf!==false,motivo:d.motivo,simular:sim}];}
  function simular(){if(!DLG)return;var d=DLG;if(d.tipo==='sub'&&!EST.series.some(function(x){return x.especialidade===d.key.split('|')[1]&&x.key!==d.key;}))return;var pl=payload(true);api(pl[0],cod,pl[1]).then(function(r){if(!vivo||DLG!==d)return;if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);DLG=null;renderAutos();return;}d.prev=r;renderAutos();});}
  function confirmarDlg(){lerDlg();var d=DLG;if(d.tipo==='sub'&&!s_(d.motivo)){V.aviso('Indica o motivo da substituição (fica nos dois autos)',4000);return;}var pl=payload(false);
    api(pl[0],cod,pl[1]).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',6000);return;}
      if(d.tipo==='adj')V.aviso('Adjudicado a '+nomeSerie(d.key)+': '+r.artigos.map(function(a){return a.item+' '+num(a.qtd,2)+' '+(a.unidade||'');}).join(' · ')+(r.conflitos?' · '+r.conflitos+' fase(s) de outro sub ignoradas':''),5500);
      else if(d.tipo==='acc')V.aviso('Aceite para '+nomeSerie(d.key)+': '+r.artigos.map(function(a){return a.item+' '+num(a.qtd,2)+' '+(a.unidade||'');}).join(' · ')+' → medido · por enviar',5500);
      else if(d.tipo==='ret')V.aviso('Retirado: '+r.artigos.map(function(a){return a.item+' '+num(a.qtd,2);}).join(' · '),4500);
      else V.aviso('Substituição feita: '+r.passa.map(function(a){return a.item+' '+num(a.qtd,2)+' '+(a.unidade||'');}).join(' · ')+' passam para '+d.para+'. A consola avisa os dois nos próximos autos.',6500);
      DLG=null;recarregar();});}
  function devolverDlg(){lerDlg();var d=DLG,p=d.key.split('|');var nota=prompt('Motivo da devolução (o encarregado / subempreiteiro vê esta nota):','');if(nota==null)return;if(!s_(nota)){V.aviso('Indica o motivo',3000);return;}
    var o={sub_codigo:p[0],especialidade:p[1],uids:d.ambito==='sel'?Array.from(SEL):null,nota:nota};
    api('exec3dDevolver',cod,o).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);return;}V.aviso(r.n_fases+' fase(s) devolvidas com nota — voltam a «por marcar»',4500);DLG=null;recarregar();});}
  function s_(v){return v==null?'':String(v).trim();}
  function ligarAutos(){var box=auBox;
    box.querySelectorAll('[data-pver]').forEach(function(b){b.onclick=function(){ESP=b.dataset.pver;abrirVista({tipo:'poradj',esp:ESP},'Por adjudicar · '+(NOMES_ESP[ESP]||ESP));};});
    box.querySelectorAll('[data-psel]').forEach(function(b){b.onclick=function(){var e=b.dataset.psel;selecionarPor(function(el){return el.artigo_id&&fasesDe(el.uid).some(function(f){return f.esp===e&&!EST.dono[el.uid+'|'+f.id]&&!estado(el.uid,f.id).med;});});V.aviso(SEL.size+' elemento(s) com '+(NOMES_ESP[e]||e).toLowerCase()+' por adjudicar',3000);};});
    box.querySelectorAll('[data-ver]').forEach(function(b){b.onclick=function(){var k=b.dataset.ver;if(VISTA&&VISTA.tipo==='serie'&&VISTA.key===k){sairVista();return;}abrirVista({tipo:'serie',key:k,esp:k.split('|')[1]},'A ver no 3D: '+nomeSerie(k));};});
    box.querySelectorAll('[data-exp]').forEach(function(b){b.onclick=function(e){e.stopPropagation();var k=b.dataset.exp;EXP[k]=!EXP[k];if(!EXP[k]&&DLG&&DLG.key===k)DLG=null;renderAutos();};});
    box.querySelectorAll('[data-expall]').forEach(function(b){b.onclick=function(){var on=b.dataset.expall==='1';EST.series.forEach(function(x){EXP[x.key]=on;});if(!on)DLG=null;renderAutos();};});
    box.querySelectorAll('.sub3[data-k]').forEach(function(c){c.onclick=function(e){if(e.target.closest('button,input,select,label,a,.dlg,.autos'))return;var k=c.dataset.k;if(VISTA&&VISTA.tipo==='serie'&&VISTA.key===k){sairVista();return;}EXP[k]=true;abrirVista({tipo:'serie',key:k,esp:k.split('|')[1]},'A ver no 3D: '+nomeSerie(k));};c.style.cursor='pointer';c.title='toca para ver no 3D só o que está adjudicado a este subempreiteiro';});
    box.querySelectorAll('[data-aver]').forEach(function(b){b.onclick=function(){var k=b.dataset.aver;if(VISTA&&VISTA.tipo==='aceitar'&&VISTA.key===k){sairVista();return;}abrirVista({tipo:'aceitar',key:k,esp:k.split('|')[1]},'Para aceitar · '+nomeSerie(k));};});
    box.querySelectorAll('[data-acc]').forEach(function(b){b.onclick=function(){abrirDlg('acc',b.dataset.acc);};});
    box.querySelectorAll('[data-adj]').forEach(function(b){b.onclick=function(){abrirDlg('adj',b.dataset.adj);};});
    box.querySelectorAll('[data-ret]').forEach(function(b){b.onclick=function(){abrirDlg('ret',b.dataset.ret);};});
    box.querySelectorAll('[data-sub]').forEach(function(b){b.onclick=function(){abrirDlg('sub',b.dataset.sub);};});
    box.querySelectorAll('[data-aut]').forEach(function(b){b.onclick=function(){var k=b.dataset.aut;ABERTO[k]=!ABERTO[k];renderAutos();};});
    box.querySelectorAll('[data-auto]').forEach(function(d){d.onclick=function(){var p=d.dataset.auto.split('|');var k=p[0]+'|'+p[1];var n=p[2]===''?null:+p[2];abrirVista({tipo:'auto',key:k,n:n,esp:p[1]},(n==null?'Medição por enviar':'Medição de '+dataMed(k,n))+' · '+nomeSerie(k));};});
    box.querySelectorAll('[data-env]').forEach(function(b){b.onclick=function(){var k=b.dataset.env;var s=serie(k);var txt=s.artigos.filter(function(a){return a.prep;}).map(function(a){return a.item+' '+num(a.prep,2)+' '+(a.unidade||'');}).join('\n');
      if(!confirm('Enviar para a consola a medição de '+nomeSerie(k)+'?\n\n'+(txt||'(só avisos de adjudicação)')+'\n\nFica com a data de hoje. Pode anular-se enquanto a consola não a converter em auto.'))return;var p=k.split('|');
      api('exec3dEnviar',cod,{sub_codigo:p[0],especialidade:p[1]}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);return;}V.aviso('Medição enviada para a consola: '+r.linhas.map(function(l){return l.item+' '+num(l.total,2)+' '+(l.unidade||'');}).join(' · '),5000);ABERTO[k]=true;recarregar();});};});
    box.querySelectorAll('[data-anenv]').forEach(function(b){b.onclick=function(e){e.stopPropagation();if(!confirm('Anular este envio? As medições voltam a «por enviar».'))return;api('exec3dAnularEnvio',cod,{lote_id:+b.dataset.anenv}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',5000);return;}V.aviso('Envio anulado',3000);recarregar();});};});
    box.querySelectorAll('[data-desf]').forEach(function(b){b.onclick=function(){if(!confirm('Desfazer a transferência? As fases voltam ao subempreiteiro anterior.'))return;api('exec3dDesfazerSubstituicao',cod,{transf_id:+b.dataset.desf}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',6000);return;}V.aviso('Transferência desfeita',3000);recarregar();});};});
    var c=box.querySelector('.dlg');if(c){c.querySelectorAll('[data-para],input[name=exAmb],[data-mconf],[data-cconf],[data-cdecl]').forEach(function(i){i.onchange=function(){lerDlg();DLG.prev=null;simular();renderAutos();};});
      c.querySelectorAll('[data-motivo]').forEach(function(i){i.onchange=lerDlg;});
      var ok=c.querySelector('[data-dok]');if(ok)ok.onclick=confirmarDlg;var dv=c.querySelector('[data-ddev]');if(dv)dv.onclick=devolverDlg;var x=c.querySelector('[data-dx]');if(x)x.onclick=function(){DLG=null;renderAutos();};}}

  // ---------- Configurações › Fases ----------
  function cfgRascunho(id){if(!RASCUNHO[id]){var a=EST.artigos[id];RASCUNHO[id]=JSON.parse(JSON.stringify((a.config&&a.config.fases)||[]));RASCUNHO[id].forEach(function(f){f.esp=f.esp||'MONTAGEM';});}return RASCUNHO[id];}
  function totaisEsp(cfg){var t={};cfg.forEach(function(f){t[f.esp]=(t[f.esp]||0)+(+f.pct||0);});return t;}
  function renderFases(){if(!EST)return;var ids=Object.keys(EST.artigos).sort(function(a,b){return String(EST.artigos[a].item).localeCompare(String(EST.artigos[b].item));});var ro=!podeConfigurar();var ESPS=EST.especialidades||Object.keys(NOMES_ESP);
    var h='<div class="exctx"><b>Fases de execução</b> · por artigo e por especialidade<br><span class="hint">Cada fase vale uma % da quantidade do artigo <b>dentro da sua especialidade</b>: montagem soma 100 %, massas soma 100 % (100 m² com uma fase de 50 % = 50 m² medidos). '+(ro?'Só o DO da obra altera as fases.':'Toca numa fase e depois nos componentes para os atribuir.')+'</span></div>';
    if(!ro)h+='<div class="chips"><button class="sm" data-modelo="1">Repor modelo da empresa</button></div>';
    ids.forEach(function(id){var a=EST.artigos[id];var cfg=cfgRascunho(id);var vig=(a.config&&a.config.fases)||[];var cs=a.componentes||[];var fa=FASE_ATIVA[id]||(cfg[0]&&cfg[0].id);var faF=cfg.filter(function(f){return f.id===fa;})[0];var ver=a.config?a.config.versao:0;
      var canon=function(fs){return JSON.stringify(fs.map(function(f){return [f.id,f.nome,f.esp||'MONTAGEM',+f.pct||0,(f.comps||[]).slice().sort()];}));};var sujo=canon(cfg)!==canon(vig);var tot=totaisEsp(cfg);var okT=Object.keys(tot).every(function(e){return Math.abs(tot[e]-100)<0.01;});
      var ajP=a.config&&a.config.ajuste&&a.config.ajuste.series?Object.keys(a.config.ajuste.series).filter(function(k){return !a.config.ajuste.series[k].consumido_em;}):[];
      h+='<div class="cfg" data-it="'+esc(id)+'"><div class="cfgh"><b>'+esc(a.item)+'</b> '+esc(a.descricao||'')+' <small>· '+a.n_elementos+' elementos · v'+ver+(ajP.length?' · <span class="tag w">ajuste pendente: '+ajP.map(function(k){return esc(k.split('|')[0])+' '+(a.config.ajuste.series[k].dif>0?'+':'')+num(a.config.ajuste.series[k].dif,1);}).join(', ')+'</span>':'')+'</small></div>';
      if(!ro&&faF){var usados=[];cfg.forEach(function(f){if(f.esp===faF.esp)usados=usados.concat(f.comps||[]);});var livres=cs.filter(function(c){return usados.indexOf(c)<0;});
        h+='<div class="pool"><span class="hint">Componentes por atribuir em '+esc((NOMES_ESP[faF.esp]||faF.esp).toLowerCase())+':</span> '+(livres.length?livres.map(function(c){return '<span class="chip" data-comp="'+esc(c)+'" title="toca para pôr em «'+esc(faF.nome)+'»">'+esc(nomeComp(c))+'</span>';}).join(' '):'<span class="tag g">todos atribuídos</span>')+'</div>';}
      var grupos={};cfg.forEach(function(f){(grupos[f.esp]=grupos[f.esp]||[]).push(f);});
      h+='<table class="cfgt">';
      ESPS.filter(function(e){return grupos[e];}).forEach(function(e){h+='<tr><td colspan="4" class="esph" style="border:0;padding-top:6px">'+esc(NOMES_ESP[e]||e)+'</td></tr>';
        grupos[e].forEach(function(f){h+='<tr class="fr'+(f.id===fa?' on':'')+'" data-fase="'+esc(f.id)+'"><td class="n">'+(ro?esc(f.nome):'<input class="fn" value="'+esc(f.nome)+'" data-fase="'+esc(f.id)+'">')+(ro?'':'<br><select class="fe" data-fase="'+esc(f.id)+'" title="especialidade">'+ESPS.map(function(x){return '<option value="'+x+'"'+(x===f.esp?' selected':'')+'>'+esc(NOMES_ESP[x]||x)+'</option>';}).join('')+'</select>')+'</td><td class="p">'+(ro?(+f.pct||0):'<input type="number" min="0" max="100" step="1" class="fp" value="'+(+f.pct||0)+'" data-fase="'+esc(f.id)+'">')+' %</td><td class="c">'+((f.comps||[]).length?f.comps.map(function(c){return '<span class="chip in" data-comp="'+esc(c)+'" data-de="'+esc(f.id)+'" title="toca para devolver">'+esc(nomeComp(c))+'</span>';}).join(' '):'<span class="hint">sem componente 3D</span>')+'</td><td class="x">'+(ro?'':'<button class="sm" data-rm="'+esc(f.id)+'" title="remover fase">✕</button>')+'</td></tr>';});
        h+='<tr class="tot"><td>Total '+esc((NOMES_ESP[e]||e).toLowerCase())+'</td><td class="p '+(Math.abs(tot[e]-100)<0.01?'ok':'err')+'">'+tot[e]+' %</td><td colspan="2">'+(ro?'':'<button class="sm" data-add="'+e+'">+ fase</button>')+'</td></tr>';});
      h+='</table>';
      if(!ro){var faltam=ESPS.filter(function(e){return !grupos[e];});if(faltam.length)h+='<div class="chips"><span class="hint">+ fase noutra especialidade:</span>'+faltam.map(function(e){return '<button class="sm" data-add="'+e+'">'+esc(NOMES_ESP[e]||e)+'</button>';}).join('')+'</div>';
        h+='<div class="cfgf"><button class="sm p" data-guardar="1"'+(okT&&sujo?'':' disabled')+'>Guardar como v'+(ver+1)+'</button> <span class="hint">'+(!okT?'cada especialidade tem de somar 100 %':sujo?'rascunho por guardar — o 3D e os autos usam a v'+ver:'em vigor: v'+ver+(a.config&&a.config.criado_em?' · '+esc(dt(a.config.criado_em))+' · '+esc(a.config.criado_por||''):''))+'</span></div>';}
      h+='<details><summary>Histórico de versões</summary><div class="hist" data-vers="'+esc(id)+'">a carregar…</div></details></div>';});
    h+='<div class="nota"><b>Medições já enviadas:</b> mudar as % recalcula o que cada subempreiteiro já tem enviado; a diferença entra na medição seguinte dele. O que foi enviado não se reescreve. Fases com adjudicações ou registos não podem ser apagadas.</div>';
    fsBox.innerHTML=h;ligarFases();}
  function faseCfg(id,fid){return cfgRascunho(id).filter(function(f){return f.id===fid;})[0];}
  function ligarFases(){var box=fsBox;function it(el){return el.closest('.cfg').dataset.it;}
    box.querySelectorAll('details').forEach(function(d){d.ontoggle=function(){if(!d.open)return;var div=d.querySelector('[data-vers]');if(div.dataset.ok)return;api('exec3dFasesVersoes',cod,div.dataset.vers).then(function(r){if(!r||!r.ok)return;div.dataset.ok='1';div.innerHTML=r.versoes.slice().reverse().map(function(x){return '<div><b>v'+x.versao+'</b> · '+esc(dt(x.criado_em))+' · '+esc(x.criado_por||'')+(x.motivo?' · '+esc(x.motivo):'')+' · '+x.fases.map(function(f){return esc(f.nome)+' '+f.pct+' %';}).join(', ')+'</div>';}).join('')||'<div class="hint">sem versões</div>';});};});
    if(!podeConfigurar())return;
    box.querySelectorAll('.fr').forEach(function(tr){tr.onclick=function(e){if(/INPUT|SELECT/.test(e.target.tagName)||e.target.closest('.chip')||e.target.closest('button'))return;FASE_ATIVA[it(tr)]=tr.dataset.fase;renderFases();};});
    box.querySelectorAll('.chip').forEach(function(ch){ch.onclick=function(){var i=it(ch);var cfg=cfgRascunho(i);if(ch.classList.contains('in')){var f=faseCfg(i,ch.dataset.de);if(f)f.comps=f.comps.filter(function(c){return c!==ch.dataset.comp;});}
        else{var fa=faseCfg(i,FASE_ATIVA[i]||(cfg[0]||{}).id);if(!fa)return V.aviso('Cria primeiro uma fase');cfg.forEach(function(f){if(f.esp===fa.esp)f.comps=(f.comps||[]).filter(function(c){return c!==ch.dataset.comp;});});fa.comps.push(ch.dataset.comp);}renderFases();};});
    box.querySelectorAll('.fn').forEach(function(inp){inp.onchange=function(){var f=faseCfg(it(inp),inp.dataset.fase);if(f)f.nome=inp.value;renderFases();};});
    box.querySelectorAll('.fp').forEach(function(inp){inp.onchange=function(){var f=faseCfg(it(inp),inp.dataset.fase);if(f)f.pct=+inp.value||0;renderFases();};});
    box.querySelectorAll('.fe').forEach(function(sel){sel.onchange=function(){var i=it(sel);var f=faseCfg(i,sel.dataset.fase);if(!f)return;f.esp=sel.value;var cfg=cfgRascunho(i);f.comps=(f.comps||[]).filter(function(c){return !cfg.some(function(g){return g!==f&&g.esp===f.esp&&(g.comps||[]).indexOf(c)>=0;});});renderFases();};});
    box.querySelectorAll('[data-rm]').forEach(function(b){b.onclick=function(){var i=it(b);var cfg=cfgRascunho(i);if(cfg.length<=1)return V.aviso('Tem de ficar pelo menos uma fase');RASCUNHO[i]=cfg.filter(function(f){return f.id!==b.dataset.rm;});renderFases();};});
    box.querySelectorAll('[data-add]').forEach(function(b){b.onclick=function(){var i=it(b);var id='f'+Date.now().toString(36);cfgRascunho(i).push({id:id,nome:'Nova fase',esp:b.dataset.add,pct:0,comps:[]});FASE_ATIVA[i]=id;renderFases();};});
    box.querySelectorAll('[data-guardar]').forEach(function(b){b.onclick=function(){var i=it(b);var motivo=prompt('Motivo da alteração (reunião de coordenação, data…):','');if(motivo==null)return;b.disabled=true;
      api('exec3dFasesGuardar',cod,i,{fases:cfgRascunho(i),motivo:motivo,modelo_id:ctx.modelo_id}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',6000);renderFases();return;}
        V.aviso('v'+r.versao+' guardada'+(r.ajuste?' · diferenças a absorver nas próximas medições: '+Object.keys(r.ajuste.series).map(function(k){return k.split('|')[0]+' '+(r.ajuste.series[k].dif>0?'+':'')+num(r.ajuste.series[k].dif,1);}).join(', '):''),6000);delete RASCUNHO[i];recarregar();});};});
    box.querySelectorAll('[data-modelo]').forEach(function(b){b.onclick=function(){if(!confirm('Repor o modelo da empresa em todos os artigos desta obra (versão nova em cada um que mude)?'))return;api('exec3dFasesRepor',cod,{modelo_id:ctx.modelo_id}).then(function(r){if(!r||!r.ok){V.aviso((r&&r.erro)||'Erro',6000);return;}var er=r.artigos.filter(function(x){return x.erro;});V.aviso(r.artigos.filter(function(x){return !x.igual&&!x.erro;}).length+' artigo(s) com versão nova'+(er.length?' · '+er.length+' recusado(s): '+er[0].erro:''),6000);RASCUNHO={};recarregar();});};});}

  // ---------- arranque ----------
  function arranque(){return recarregar().then(function(){if(!EST||!vivo)return;V.mostrarPg('ex');});}
  var esperas=0;(function espera(){if(!vivo)return;if(V.modelo&&V.malhas.length){arranque();return;}if(++esperas>400){exBox.innerHTML='<div class="hint">O modelo não carregou.</div>';return;}setTimeout(espera,150);})();
  function desmontar(){vivo=false;V.hooks.cor=null;V.hooks.toque=null;V.hooks.janela=null;try{V.marcar([]);if(V.filtrar)V.filtrar(null);}catch(e){}try{cam.remove();ver.remove();lb.remove();V.recolorir();}catch(e){}}
  return {desmontar:desmontar,recarregar:recarregar,versao:VERSAO,get estado(){return EST;},get sel(){return SEL;},get vista(){return VISTA;},camadas:CAM};
}
return {montar:montar,versao:VERSAO};
})();
