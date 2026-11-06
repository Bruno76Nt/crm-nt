// CRM_NT · materiais.js · MAT-1 — ecrã «Materiais genéricos» do CRM ONLINE (só Admin). VERSÃO MAT_VER no app.html.
// GERADO por MAT-1/gerar_front_online.py a partir do ecrã da fusão (orc_front/rc.js + vbody.html) — não editar à mão.
// Uso: window.Mat.abrir(elemento, {callSec}). O servidor é quem decide as permissões (revisão = só Admin).
(function(){
var CSS = "\n#matRoot{--line:#dee2e6;--text:#212529;--muted:#6c757d;--accent:#1e4c84;--accent-d:#163963;--accent-bg:#e8eef6;--base-tx:#1e4c84;--ok-bg:#e6f4ea;--green:#1e7b34;--warn-bg:#fff4e0;--amber:#a15c00;--red:#b42318;--mono:ui-monospace,Consolas,\"Cascadia Mono\",monospace;--r:8px;--shadow:0 1px 2px rgba(16,24,40,.06),0 1px 3px rgba(16,24,40,.08);color:var(--text);font-size:13px;text-align:left}\n#matRoot *,#matMod *{box-sizing:border-box}\n#matRoot .hid,#matMod .hid,#matMod.hid{display:none!important}\n#matRoot .mhead{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:4px 0 8px}\n#matRoot .mpend{background:#b42318;color:#fff;border-radius:999px;padding:0 8px;font-size:11px;font-weight:700}#matRoot .mpend:empty{display:none}\n#matRoot .sp,#matMod .sp{flex:1}\n#matRoot .mut,#matMod .mut{color:var(--muted);font-size:12px}\n#matRoot .mono,#matMod .mono{font-family:var(--mono)}\n#matRoot button,#matMod button{font:inherit;font-weight:600;font-size:12.5px;cursor:pointer;border:1px solid #c3cbd5;background:#fff;border-radius:7px;padding:0 12px;height:32px;color:#334155;display:inline-flex;align-items:center;gap:6px;width:auto;margin:0;box-shadow:none;text-transform:none}\n#matRoot button:hover,#matMod button:hover{border-color:var(--accent);color:var(--accent)}\n#matRoot button.p,#matMod button.p{background:var(--accent);color:#fff;border-color:var(--accent)}\n#matRoot button.sm,#matMod button.sm{height:26px;padding:0 9px;font-size:12px}\n#matRoot button:disabled,#matMod button:disabled{opacity:.4;cursor:not-allowed}\n#matRoot input,#matRoot select,#matMod input,#matMod select,#matMod textarea{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:6px;padding:5px 8px;background:#fff;color:var(--text);width:auto;margin:0;height:auto;min-height:0}\n#matRoot input[type=checkbox],#matMod input[type=checkbox]{width:auto;height:auto}\n#matRoot label,#matMod label{text-transform:none;font-size:12.5px;font-weight:400;letter-spacing:0;color:var(--text);display:inline-flex;align-items:center;gap:5px;margin:0}\n#matRoot .chip,#matMod .chip{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:600;background:var(--accent-bg);color:var(--base-tx);white-space:nowrap;line-height:1.5}\n#matRoot .chip.ok{background:var(--ok-bg);color:var(--green)}#matRoot .chip.wa{background:var(--warn-bg);color:var(--amber)}#matRoot .chip.mu{background:#eef1f5;color:var(--muted)}\n#matRoot .li,#matMod .li{width:14px;height:14px;vertical-align:-2px;fill:none;stroke:currentColor;stroke-width:2}\n#matRoot .note{position:relative;background:#fff;border:1px solid var(--line);border-radius:7px;padding:8px 12px;margin:0 0 10px;font-size:12.5px}\n#matMod .note{background:#fff8e6;border:1px solid #f0d9a8;border-radius:7px;padding:8px 12px;margin:8px 0;font-size:12.5px}\n#matRoot .card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:12px 14px;box-shadow:var(--shadow)}\n#matRoot .lbl,#matMod .lbl{font-size:10.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:10px 0 4px}\n#matRoot .ktool{display:flex;gap:10px;align-items:center;margin:4px 0 10px;flex-wrap:wrap}\n#matRoot .ktool input:not([type=checkbox]){height:36px;min-width:260px;flex:0 1 420px;padding:0 12px;border-radius:7px}\n#matRoot .ktool select{height:36px;border-radius:7px;font-weight:600}\n#matRoot .ktool button{height:36px}\n#matRoot .tsc{overflow:auto;border:1px solid var(--line);border-radius:var(--r);background:#fff;box-shadow:var(--shadow)}\n#matRoot table{width:100%;border-collapse:collapse;background:#fff;font-size:12.5px}\n#matRoot th,#matRoot td{border-bottom:1px solid #edf0f3;padding:6px 8px;text-align:left;vertical-align:middle}\n#matRoot th{background:var(--accent-bg);color:var(--base-tx);font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;position:sticky;top:0;z-index:1;white-space:nowrap}\n#matRoot td.n,#matRoot th.n{text-align:right;white-space:nowrap}\n#matRoot .gped{display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-top:1px solid var(--line)}#matRoot .gped:first-child{border-top:0}\n#matRoot #gPed .card{max-height:300px;overflow:auto}\n#matMod{position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-start;justify-content:center;padding-top:6vh;z-index:9000;color:#212529;font-size:13px;text-align:left}\n#matMod .box{background:#fff;border-radius:12px;width:min(820px,94vw);max-height:84vh;overflow:auto;padding:16px 18px;box-shadow:0 12px 40px rgba(0,0,0,.2)}\n#matMod h3{font-size:16px;color:#212529;margin:0}\n#matMod .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0}\n#matMod .wgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px}\n#matMod .wgrid input,#matMod .wgrid select{height:34px}\n#matToast{position:fixed;bottom:18px;right:18px;background:#111827;color:#fff;padding:9px 16px;border-radius:8px;font-size:13px;z-index:9100;opacity:0;transition:opacity .2s;pointer-events:none}\n#matToast.on{opacity:1}\n@media (min-width:1000px){body[data-tab=materiais] .wrap{max-width:1500px}}\n#matRoot .gped button,#matRoot td button{white-space:nowrap}\n@media (max-width:760px){#matRoot #gPed{grid-template-columns:1fr!important}#matMod .wgrid{grid-template-columns:1fr}#matRoot .ktool input:not([type=checkbox]){min-width:0;flex:1 1 100%}}\n";
var MARCA = "<div id=\"matRoot\"><div id=\"vRec\"><div class=\"mhead\"><b>Materiais genéricos</b> <span class=\"mut\">lista mestre do 3D · contrato com o plugin v2.3</span> <span class=\"mpend\" id=\"genPend\"></span><span class=\"sp\"></span><button class=\"sm\" id=\"gRecarregar\">↻ Atualizar</button></div>\n<div id=\"recGen\">\n    <div class=\"ktool\"><input id=\"gQ\" placeholder=\"procurar genérico (código, descrição ou alias)…\"><select id=\"gFam\"><option value=\"\">Família: todas</option></select>\n      <select id=\"gDono\"><option value=\"\">Dono: todos</option><option value=\"crm\">CRM (placas, isolamentos)</option><option value=\"plugin\">Plugin (estrutura, só leitura)</option></select><label><input type=\"checkbox\" id=\"gInat\"> mostrar inativos/juntados</label><span class=\"sp\"></span>\n      <span class=\"mut\" id=\"gConta\"></span><button class=\"p\" id=\"gNovo\"><svg class=\"li s\"><use href=\"#li-plus\"/></svg>Novo genérico</button></div>\n    <div class=\"note\" style=\"margin-bottom:10px\">Lista mestre dos materiais genéricos (contrato com o plugin v2.3). <b>Placas e isolamentos são do CRM</b>: só se criam aqui, a partir dos pedidos dos DO (aprovar · juntar a um existente · recusar com motivo); a espessura e o tipo servem para desenhar e congelam depois do 1.º uso. <b>Estrutura e acessórios são do plugin</b> (elementos SKP, <svg class=\"li s\"><use href=\"#li-lock\"/></svg> só leitura). Um código nunca se apaga: juntar = passa a alias. Lista sucinta — marca, formato e densidade ficam no artigo comercial.</div>\n    <div id=\"gPed\" class=\"hid\" style=\"display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px\">\n      <div class=\"card\"><div class=\"lbl\">Pedidos dos DO</div><div id=\"gPedL\"></div></div>\n      <div class=\"card\"><div class=\"lbl\">Chaves locais por ligar (modelos antigos)</div><div id=\"gChL\"></div></div>\n    </div>\n    <div class=\"tsc\" style=\"max-height:calc(100vh - 250px)\"><table id=\"tbGen\"></table></div>\n  </div>\n</div></div>";
function __css(){ if(document.getElementById('matCss')) return; var s=document.createElement('style'); s.id='matCss'; s.textContent=CSS; document.head.appendChild(s); }
function __on(ev,fn){ if(window.__matH) document.removeEventListener(ev,window.__matH); window.__matH=fn; document.addEventListener(ev,fn); }
function abrir(v, ctx){
  __css(); v.innerHTML = MARCA;
  if(!document.getElementById('matMod')){ var m=document.createElement('div'); m.id='matMod'; m.className='hid'; m.innerHTML='<div class="box" id="matModBox"></div>'; document.body.appendChild(m);
    var t=document.createElement('div'); t.id='matToast'; document.body.appendChild(t); }
  var __matOn=__on;
  var $=function(s){ return document.querySelector(s); }, $$=function(s){ return [].slice.call(document.querySelectorAll(s)); };
  var esc=function(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var dataPT=function(s){ if(!s) return '—'; var d=new Date(s); return isNaN(d)?String(s):d.toLocaleDateString('pt-PT'); };
  var toast=function(t){ var e=document.getElementById('matToast'); e.textContent=t; e.classList.add('on'); clearTimeout(e._t); e._t=setTimeout(function(){ e.classList.remove('on'); },2600); };
  var falhou=function(r){ if(r&&r.ok) return false; toast((r&&(r.erro||r.mensagem))||'Não foi possível.'); return true; };
  var api=function(fn,a){ return Promise.resolve().then(function(){ return ctx.callSec(fn,a); }).catch(function(e){ return {erro:'Sem ligação ao servidor ('+(e&&e.message||e)+').'}; }); };
  var NIV=function(){ return 2; };   // só o Admin chega aqui (o servidor confirma)
  var modal=function(html){ $('#matModBox').innerHTML=html; $('#matMod').classList.remove('hid'); };
  var fechaModal=function(){ $('#matMod').classList.add('hid'); };
// =============================================================================
// MATERIAIS GENÉRICOS (contrato com o plugin v2.3 rev2) · orc.recursos: Ver 1 · Editar 2
// Dois donos: placas e isolamentos são do CRM (pedidos dos DO → aprovar · juntar · recusar); estrutura e acessórios
// são do plugin (só leitura, cadeado). Chaves locais dos modelos antigos ligam-se a um código do CRM (passam a alias).
// =============================================================================
const GN={rows:[],pedidos:[],chaves:[],fam:'',dono:'',q:'',inat:false,familias:[],familias_crm:[],unidades:[],tipos:{}};
const FAMN={placa:'Placas',isolamento:'Isolamento',montante:'Montantes',canal:'Canais',omega:'Ómegas',tecto:'Tectos',pavimento:'Pavimentos',rodape:'Rodapés',consumivel:'Consumíveis (só CRM)',outro:'Outros'};
const TIPON={standard:'standard',hydro:'hidrófuga',fire:'fogo',impact:'alta dureza',acoustic:'acústica',technical:'técnica',LR:'lã de rocha',LV:'lã de vidro'};
const geoTxt=p=>p&&p.espessura_mm!=null?`${String(p.espessura_mm).replace('.',',')} mm${p.tipo?' · '+esc(TIPON[p.tipo]||p.tipo):''}`:'';
const mesmaGeo=(fam,a,b)=>Number(a&&a.espessura_mm)===Number(b&&b.espessura_mm)&&(fam!=='isolamento'||String(a.tipo||'').toUpperCase()===String(b.tipo||'').toUpperCase());
const swc=c=>c?`<span title="cor no 3D" style="display:inline-block;width:12px;height:12px;border-radius:3px;border:1px solid #c3cbd5;vertical-align:-2px;background:rgb(${c.join(',')})"></span> `:'';
function carregarGen(){ $('#tbGen').innerHTML='<tr><td class="mut">A carregar…</td></tr>';
  api('matLista').then(r=>{ if(!r||!r.ok){$('#tbGen').innerHTML=`<tr><td class="mut">${esc(r&&r.erro||'Sem acesso.')}</td></tr>`;return;}
    Object.assign(GN,{rows:r.materiais,pedidos:r.pedidos||[],chaves:r.chaves||[],familias:r.familias,familias_crm:r.familias_crm||[],unidades:r.unidades,tipos:r.tipos||{}});
    if($('#gFam').options.length<2) $('#gFam').innerHTML='<option value="">Família: todas</option>'+r.familias.map(f=>`<option value="${f}">${esc(FAMN[f]||f)}</option>`).join('');
    const np=GN.pedidos.filter(p=>p.estado==='pendente').length+GN.chaves.length; $('#genPend').textContent=np?String(np):''; rGen(); }); }
function rPedidos(ed){
  const P=GN.pedidos.filter(p=>p.estado==='pendente'), R=GN.pedidos.filter(p=>p.estado!=='pendente').slice(0,8);
  $('#gPed').classList.toggle('hid',!P.length&&!R.length&&!GN.chaves.length);
  $('#gPedL').innerHTML=(P.length?P.map(p=>`<div class="gped"><div><b>${esc(p.descricao)}</b> <span class="chip">${esc(FAMN[p.familia]||p.familia)}</span> <span class="mut">${geoTxt(p.propriedades)}</span> ${swc(p.cor)}
      <div class="mut">pedido por ${esc(p.pedido_por_nome||'?')}${p.obra_codigo?' · obra '+esc(p.obra_codigo):''} · ${dataPT(p.criado_em)} · «${esc(p.motivo||'')}»</div></div><span class="sp"></span>
      ${ed?`<button class="sm p" data-papr="${p.id}">Aprovar</button> <button class="sm" data-pjun="${p.id}">Juntar a…</button> <button class="sm" data-prec="${p.id}">Recusar</button>`:''}</div>`).join(''):'<div class="mut">Sem pedidos por rever.</div>')
    +(R.length?`<div class="mut" style="margin-top:6px">Revistos: ${R.map(p=>`${esc(p.descricao)} → ${p.estado==='recusado'?'recusado':'<span class="mono">'+esc(p.codigo||p.junto_a)+'</span>'}`).join(' · ')}</div>`:'');
  $('#gChL').innerHTML=GN.chaves.length?GN.chaves.map(c=>`<div class="gped"><div><span class="mono">${esc(c.chave_original||c.chave)}</span> <span class="chip">${esc(FAMN[c.familia]||c.familia)}</span> <span class="mut">${geoTxt(c.propriedades)}</span> ${swc(c.cor)}
      <div class="mut">nome local de um modelo SketchUp · enviado ${c.vezes}× · por ${esc(c.enviada_por_nome||'?')}${c.detalhe&&c.detalhe.n_elementos_modelo?' · '+c.detalhe.n_elementos_modelo+' no modelo':''}${c.detalhe&&c.detalhe.espessuras_medidas_mm?' · medida '+esc(c.detalhe.espessuras_medidas_mm.join('/'))+' mm':''}</div>${c.detalhe&&(c.detalhe.conflito||c.detalhe.aviso)?`<div style="color:#a15c00;font-size:12px">⚠ ${esc(c.detalhe.conflito||'')}${c.detalhe.aviso?' · '+esc(c.detalhe.aviso):''}</div>`:''}</div><span class="sp"></span>
      ${ed?`<button class="sm p" data-clig="${esc(c.familia+'|'+c.chave)}">Ligar a…</button> <button class="sm" data-ccri="${esc(c.familia+'|'+c.chave)}">Criar material</button>`:''}</div>`).join(''):'<div class="mut">Nenhuma chave local por ligar.</div>';
}
function rGen(){
  const ed=NIV('orc.recursos')>=2, q=GN.q.trim().toLowerCase();
  rPedidos(ed);
  const L=GN.rows.filter(m=>(!GN.fam||m.familia===GN.fam)&&(!GN.dono||m.dono===GN.dono)&&(GN.inat||m.estado!=='inativo')&&(!q||(m.codigo+' '+m.descricao+' '+(m.aliases||[]).join(' ')).toLowerCase().includes(q)))
    .sort((a,b)=>(a.dono===b.dono?0:a.dono==='crm'?-1:1)||a.familia.localeCompare(b.familia)||a.codigo.localeCompare(b.codigo));
  $('#gConta').textContent=`${L.length} genérico(s)`; $('#gNovo').classList.toggle('hid',!ed);
  $('#tbGen').innerHTML=`<tr><th>Código</th><th>Descrição</th><th>Família</th><th>Un</th><th>Dono</th><th>Estado</th><th>Aliases (códigos antigos e nomes locais)</th><th class="n">Linhas 3D</th><th>Obras</th><th></th></tr>`+(L.length?L.map(m=>`<tr style="${m.estado==='inativo'?'opacity:.55':''}">
    <td class="mono" style="white-space:nowrap">${swc(m.cor)}${esc(m.codigo)}</td>
    <td style="min-width:220px">${esc(m.descricao)}${m.dono==='crm'&&m.propriedades&&m.propriedades.espessura_mm!=null?`<div class="mut">${geoTxt(m.propriedades)}</div>`:Object.keys(m.propriedades||{}).length?`<div class="mut">${Object.entries(m.propriedades).map(([k,v])=>esc(k.replace(/_/g,' '))+' '+esc(v)).join(' · ')}</div>`:''}</td>
    <td>${esc(FAMN[m.familia]||m.familia)}</td><td>${esc(m.unidade)}</td>
    <td style="white-space:nowrap">${m.dono==='plugin'?`<span class="chip mu" title="Elemento SKP do plugin: o CRM não o altera${m.versao_plugin?' · registado pela v'+esc(m.versao_plugin):''}"><svg class="li s"><use href="#li-lock"/></svg>plugin</span>`:'<span class="chip">CRM</span>'}</td>
    <td style="white-space:nowrap">${m.estado==='inativo'?(m.substituido_por?`<span class="chip mu">juntado a <b class="mono">${esc(m.substituido_por)}</b></span>`:'<span class="chip mu">inativo</span>'):'<span class="chip ok">ativo</span>'}${m.so_crm?' <span class="chip">só CRM</span>':''}${m.dono==='crm'&&m.congelado?' <span class="chip mu" title="Já usado em modelos ou requisições: código, unidade, espessura e tipo não mudam">congelado</span>':''}</td>
    <td class="mono mut" style="font-size:11.5px">${(m.aliases||[]).map(esc).join(' · ')}</td>
    <td class="n">${m.uso&&m.uso.linhas||0}</td><td class="mut">${esc(m.uso&&m.uso.lista||'')}</td>
    <td style="white-space:nowrap">${ed&&m.dono==='crm'&&!m.substituido_por?`<button class="sm" data-gedit="${esc(m.codigo)}">Corrigir</button> <button class="sm" data-gjun="${esc(m.codigo)}">Juntar a…</button>`:''}</td></tr>`).join(''):'<tr><td colspan="10" class="mut">Nada encontrado.</td></tr>');
}
// campos de desenho (placa/isolamento: espessura + tipo do vocabulário fechado)
const camposGeo=(fam,p,bloq)=>`<div class="row" style="margin-top:8px"><div><div class="lbl">Espessura (mm)</div><input id="gEsp" type="number" step="0.5" style="width:110px" value="${p&&p.espessura_mm!=null?p.espessura_mm:''}" ${bloq?'disabled':''}></div>
   <div><div class="lbl">Tipo</div><select id="gTipo" ${bloq?'disabled':''}>${(GN.tipos[fam]||[]).map(t=>`<option value="${t}" ${p&&String(p.tipo)===t?'selected':''}>${esc(TIPON[t]||t)}</option>`).join('')}</select></div></div>`;
const lerGeo=()=>({espessura_mm:Number(String($('#gEsp').value).replace(',','.')),tipo:$('#gTipo').value});
const lerCor=()=>$('#gSemCor').checked?null:[1,3,5].map(i=>parseInt($('#gCor').value.substr(i,2),16));
const campoCor=c=>`<div><div class="lbl">Cor no 3D (GLB e SketchUp)</div><input type="color" id="gCor" value="${c?'#'+c.map(x=>Number(x).toString(16).padStart(2,'0')).join(''):'#cccccc'}"> <label><input type="checkbox" id="gSemCor" ${c?'':'checked'}> sem cor</label></div>`;
function editarGen(m){
  const novo=!m; m=m||{familia:GN.familias_crm.includes(GN.fam)?GN.fam:'placa',unidade:'m2',propriedades:{},cor:null};
  const geo=f=>f==='placa'||f==='isolamento', bloq=!novo&&m.congelado;
  const props=Object.entries(m.propriedades||{}).map(([k,v])=>k+'='+v).join('; ');
  modal(`<div class="row"><h3 style="margin:0">${novo?'Novo material genérico':'Corrigir · <span class="mono">'+esc(m.codigo)+'</span>'}</h3><span class="sp"></span><button id="xMod">✕</button></div>
   ${bloq?'<div class="note">Já usado em modelos ou requisições: só mudam a descrição, a cor e o estado. Para mudar a espessura, o tipo ou a unidade, cria um material novo e inativa este.</div>':''}
   <div class="wgrid"><div>${novo?`<div class="lbl">Família</div><select id="gFa" style="width:100%">${GN.familias_crm.map(f=>`<option value="${f}" ${f===m.familia?'selected':''}>${esc(FAMN[f]||f)}</option>`).join('')}</select>
       <div class="mut">Montantes, canais, ómegas, tectos e rodapés são do plugin (elementos SKP) — entram pelo plugin.</div>
       <div class="lbl">Código (vazio = o CRM gera)</div><input id="gCod" class="mono" style="width:100%" placeholder="ex.: placa_BA13_STD · isol_LR45">`:''}
     <div class="lbl">Descrição</div><input id="gDes" style="width:100%" value="${esc(m.descricao||'')}">
     <div id="gGeo"></div></div>
     <div>${campoCor(m.cor)}
     ${!novo?`<div class="lbl" style="margin-top:8px">Estado</div><select id="gEstM"><option value="ativo" ${m.estado==='ativo'?'selected':''}>ativo</option><option value="inativo" ${m.estado==='inativo'?'selected':''}>inativo (não se usa em paredes novas)</option></select>`:''}</div></div>
   <div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk">Guardar</button></div>`);
  const pintaGeo=f=>{ $('#gGeo').innerHTML=geo(f)?camposGeo(f,m.propriedades,bloq):`<div class="row" style="margin-top:8px"><div><div class="lbl">Unidade</div><select id="gUn" ${bloq?'disabled':''}>${GN.unidades.map(u=>`<option ${u===m.unidade?'selected':''}>${u}</option>`).join('')}</select></div>
      <div style="flex:1"><div class="lbl">Propriedades (opcional; ex.: largura_mm=48)</div><input id="gPro" class="mono" style="width:100%" value="${esc(props)}" ${bloq?'disabled':''}></div></div>`; };
  pintaGeo(m.familia); if(novo) $('#gFa').onchange=e=>pintaGeo(e.target.value);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const fam=novo?$('#gFa').value:m.familia;
    const o={descricao:$('#gDes').value,familia:fam,cor:lerCor()};
    if(geo(fam)){ if(!bloq) o.propriedades=lerGeo(); }
    else { o.unidade=$('#gUn').value; if(!bloq){ const pr={}; $('#gPro').value.split(/[;,]/).map(x=>x.trim()).filter(Boolean).forEach(x=>{const [k,val]=x.split('=').map(y=>y.trim());if(k&&val!=null)pr[k.toLowerCase().replace(/\s+/g,'_')]=isNaN(Number(String(val).replace(',','.')))?val:Number(String(val).replace(',','.'));}); o.propriedades=pr; } }
    if(novo) o.codigo=$('#gCod').value; else { o.codigo_atual=m.codigo; o.estado=$("#gEstM").value; }
    const r=await api('matGuardar',o); if(falhou(r))return; fechaModal(); toast(novo?'Criado: '+r.codigo:'Guardado'); carregarGen(); };
}
// destino de juntar/ligar: só materiais do CRM, ativos, da mesma família; os de outra espessura/tipo aparecem desativados
function selDestino(fam,geo,exceto){
  const A=GN.rows.filter(x=>x.dono==='crm'&&x.estado==='ativo'&&x.familia===fam&&x.codigo!==exceto).sort((a,b)=>a.codigo.localeCompare(b.codigo));
  const ok=A.filter(x=>!geo||geo.espessura_mm==null||mesmaGeo(fam,x.propriedades,geo));
  return {n:ok.length,html:`<select id="jPara" style="width:100%">${A.map(x=>{const b=geo&&geo.espessura_mm!=null&&!mesmaGeo(fam,x.propriedades,geo);return `<option value="${esc(x.codigo)}" ${b?'disabled':''}>${esc(x.codigo)} · ${esc(x.descricao)} · ${geoTxt(x.propriedades)}${b?' — outra espessura/tipo':''}</option>`;}).join('')}</select>`};
}
function juntarGen(m){
  const d=selDestino(m.familia,m.familia==='placa'||m.familia==='isolamento'?m.propriedades:null,m.codigo);
  modal(`<div class="row"><h3 style="margin:0">Juntar <span class="mono">${esc(m.codigo)}</span> a…</h3><span class="sp"></span><button id="xMod">✕</button></div>
   <p class="mut">«${esc(m.descricao)}» passa a <b>alias</b> do material escolhido (fica inativo, com «substituído por»). As publicações antigas continuam a bater. Só a mesma família e, nas placas e isolamentos, a mesma espessura e tipo (as paredes não podem mudar).</p>
   ${d.html}<div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk" ${d.n?'':'disabled'}>Juntar</button></div>`);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const para=$('#jPara').value; if(!confirm(`Juntar ${m.codigo} a ${para}? Não se desfaz (o código fica para sempre como alias).`))return;
    const r=await api('matJuntar',{codigo:m.codigo,para}); if(falhou(r))return; fechaModal(); toast('Juntado a '+para); carregarGen(); };
}
function aprovarPed(p){
  modal(`<div class="row"><h3 style="margin:0">Aprovar pedido</h3><span class="sp"></span><button id="xMod">✕</button></div>
   <p class="mut">Pedido por ${esc(p.pedido_por_nome||'?')}${p.obra_codigo?' (obra '+esc(p.obra_codigo)+')':''}: «${esc(p.motivo||'')}». Ao aprovar nasce o código; o DO vê-o na próxima sincronização do plugin.</p>
   <div class="wgrid"><div><div class="lbl">Descrição</div><input id="gDes" style="width:100%" value="${esc(p.descricao)}">
     <div class="lbl">Código (vazio = o CRM gera)</div><input id="gCod" class="mono" style="width:100%" placeholder="${p.familia==='isolamento'?'isol_'+esc(p.propriedades.tipo||'')+esc(p.propriedades.espessura_mm||''):'placa_…'}">
     ${camposGeo(p.familia,p.propriedades,false)}</div><div>${campoCor(p.cor)}</div></div>
   <div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk">Aprovar</button></div>`);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const r=await api('matRever',{id:p.id,acao:'aprovar',descricao:$('#gDes').value,codigo:$('#gCod').value,propriedades:lerGeo(),cor:lerCor()}); if(falhou(r))return; fechaModal(); toast('Aprovado: '+r.codigo); carregarGen(); };
}
function juntarPed(p){
  const d=selDestino(p.familia,p.propriedades);
  modal(`<div class="row"><h3 style="margin:0">Juntar o pedido a um existente</h3><span class="sp"></span><button id="xMod">✕</button></div>
   <p class="mut">«${esc(p.descricao)}» (${geoTxt(p.propriedades)}) já existe com outro nome. O DO vê no plugin qual deve usar.</p>
   ${d.html}<div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk" ${d.n?'':'disabled'}>Juntar</button></div>`);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const r=await api('matRever',{id:p.id,acao:'juntar',junto_a:$('#jPara').value}); if(falhou(r))return; fechaModal(); toast('Pedido junto a '+r.junto_a); carregarGen(); };
}
function recusarPed(p){
  modal(`<div class="row"><h3 style="margin:0">Recusar pedido</h3><span class="sp"></span><button id="xMod">✕</button></div>
   <p class="mut">«${esc(p.descricao)}». O motivo aparece ao DO no plugin.</p><textarea id="gMot" rows="3" style="width:100%" placeholder="ex.: é a BA13 STD; usa placa_BA13_STD"></textarea>
   <div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk">Recusar</button></div>`);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const r=await api('matRever',{id:p.id,acao:'recusar',motivo_recusa:$('#gMot').value}); if(falhou(r))return; fechaModal(); toast('Pedido recusado'); carregarGen(); };
}
function ligarChave(c,criar){
  const d=selDestino(c.familia,c.propriedades);
  modal(`<div class="row"><h3 style="margin:0">${criar?'Criar material para':'Ligar'} <span class="mono">${esc(c.chave_original||c.chave)}</span></h3><span class="sp"></span><button id="xMod">✕</button></div>
   <p class="mut">Nome local usado em modelos SketchUp antigos (${geoTxt(c.propriedades)||'sem espessura'}). Fica como <b>alias</b> do código escolhido: o plugin passa a ler as paredes antigas com esse código. Só a mesma espessura${c.familia==='isolamento'?' e o mesmo tipo':''}.</p>
   ${criar?`<div class="wgrid"><div><div class="lbl">Descrição</div><input id="gDes" style="width:100%" value="${esc(c.chave_original||'')}">${camposGeo(c.familia,c.propriedades,false)}</div><div>${campoCor(c.cor)}</div></div>`:d.html}
   <div class="row" style="margin-top:14px"><span class="sp"></span><button id="mC">Cancelar</button><button class="p" id="mOk" ${criar||d.n?'':'disabled'}>${criar?'Criar e ligar':'Ligar'}</button></div>`);
  $('#xMod').onclick=$('#mC').onclick=fechaModal;
  $('#mOk').onclick=async()=>{ const o={familia:c.familia,chave:c.chave}; if(criar) o.criar={descricao:$('#gDes').value,propriedades:lerGeo(),cor:lerCor()}; else o.codigo=$('#jPara').value;
    const r=await api('matLigarChave',o); if(falhou(r))return; fechaModal(); toast('Ligada a '+r.codigo); carregarGen(); };
}
__matOn('click',e=>{ if($('#vRec').classList.contains('hid')||e.target.closest('#matMod'))return;
  const b=e.target.closest('[data-gedit],[data-gjun],[data-papr],[data-pjun],[data-prec],[data-clig],[data-ccri]'); if(!b)return;
  const d=b.dataset;
  if(d.gedit||d.gjun){ const m=GN.rows.find(x=>x.codigo===(d.gedit||d.gjun)); if(m) (d.gedit?editarGen:juntarGen)(m); return; }
  if(d.papr||d.pjun||d.prec){ const p=GN.pedidos.find(x=>x.id===(d.papr||d.pjun||d.prec)); if(p) (d.papr?aprovarPed:d.pjun?juntarPed:recusarPed)(p); return; }
  const c=GN.chaves.find(x=>x.familia+'|'+x.chave===(d.clig||d.ccri)); if(c) ligarChave(c,!!d.ccri);
});
$('#gQ').oninput=e=>{GN.q=e.target.value;rGen();};
$('#gFam').onchange=e=>{GN.fam=e.target.value;rGen();};
$('#gDono').onchange=e=>{GN.dono=e.target.value;rGen();};
$('#gInat').onchange=e=>{GN.inat=e.target.checked;rGen();};
$('#gNovo').onclick=()=>editarGen(null);

  $('#gRecarregar').onclick=function(){ carregarGen(); };
  carregarGen();
}
window.Mat={abrir:abrir};
})();
