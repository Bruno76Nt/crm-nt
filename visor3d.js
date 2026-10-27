// CRM_NT · visor3d.js · visor 3D de preparação de obra (gerado por build_visor.py a partir de visor_teste.html 2026-10-23-V6)
// window.Visor3D.montar(el,{glbBuffer,nome,bytes,pub,titulo,onFechar}) → {desmontar,...}. Precisa do three_nt.min.js carregado antes.
window.Visor3D=(function(){
'use strict';
var CSS='#v3dRoot{position:fixed;inset:0;z-index:9000;overflow:hidden;font:13px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1f2937;background:#e9edf2;text-transform:none;letter-spacing:0}#v3dRoot *{text-transform:none;letter-spacing:0}#v3dRoot h2,#v3dRoot h3,#v3dRoot b{text-transform:none}#v3dRoot #bFechar{margin-left:4px}#v3dRoot label{display:inline-flex;align-items:center;gap:5px;margin:0;font-weight:400;font-size:11px;color:#6c757d}#v3dRoot input[type=checkbox]{width:auto;height:auto;margin:0;padding:0;flex:0 0 auto}#v3dRoot select,#v3dRoot input[type=range]{margin:0;font-size:12px}#v3dRoot .arv{text-transform:none}#v3dRoot{--azul:#163963;--azul2:#1e4c84;--cinza:#6c757d;--f:#f4f7fb;--b:#c9d7e8}#v3dRoot *{box-sizing:border-box}#v3dRoot{margin:0;height:100%;overflow:hidden;font:13px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1f2937;background:#e9edf2}#v3dRoot #c{position:fixed;inset:0;display:block;touch-action:none}#v3dRoot #top{position:fixed;top:0;left:0;right:0;height:44px;background:var(--azul);color:#fff;display:flex;align-items:center;gap:8px;padding:0 10px;z-index:5}#v3dRoot #top b{font-size:14px;white-space:nowrap}#v3dRoot #top .s{font-size:11.5px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}#v3dRoot button{font:inherit;border:1px solid var(--b);background:#fff;color:var(--azul2);border-radius:7px;padding:5px 10px;cursor:pointer}#v3dRoot button.p{background:var(--azul2);color:#fff;border-color:var(--azul2)}#v3dRoot button.sm{padding:2px 7px;font-size:11.5px;border-radius:5px}#v3dRoot #top button{border-color:rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff}#v3dRoot #drop{position:fixed;inset:44px 0 0 0;display:flex;align-items:center;justify-content:center;z-index:4;pointer-events:none}#v3dRoot #drop .card{pointer-events:auto;background:#fff;border:2px dashed var(--b);border-radius:14px;padding:26px 30px;max-width:520px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.08)}#v3dRoot #drop h2{margin:0 0 8px;color:var(--azul);font-size:18px}#v3dRoot #drop p{margin:0 0 10px;color:var(--cinza)}#v3dRoot #drop.arr .card{border-color:var(--azul2);background:#eef4fb}#v3dRoot #painel{position:fixed;top:44px;left:0;bottom:0;width:360px;background:#fff;border-right:1px solid var(--b);display:flex;flex-direction:column;z-index:5;transform:translateX(0);transition:transform .2s}#v3dRoot #painel.fechado{transform:translateX(-100%)}#v3dRoot #tabs{display:flex;border-bottom:1px solid var(--b)}#v3dRoot #tabs button{flex:1;border:0;border-radius:0;background:#fff;color:var(--cinza);padding:9px 4px;border-bottom:2px solid transparent}#v3dRoot #tabs button.on{color:var(--azul);border-bottom-color:var(--azul2);font-weight:600}#v3dRoot .pg{display:none;flex:1;overflow:auto;padding:10px 12px}#v3dRoot .pg.on{display:block}#v3dRoot #bPainel{position:fixed;top:52px;left:368px;z-index:6;transition:left .2s}#v3dRoot #painel.fechado~#bPainel{left:8px}#v3dRoot #ferr{position:fixed;right:10px;top:52px;z-index:5;display:flex;flex-direction:column;gap:6px;align-items:flex-end}#v3dRoot #ferr .grp{background:#fff;border:1px solid var(--b);border-radius:9px;padding:6px;display:flex;flex-direction:column;gap:5px;min-width:150px}#v3dRoot #ferr label{font-size:11px;color:var(--cinza)}#v3dRoot select,#v3dRoot input[type=range]{font:inherit;width:100%}#v3dRoot .arv ul{list-style:none;margin:0;padding-left:14px}#v3dRoot .arv>ul{padding-left:0}#v3dRoot .arv li{margin:1px 0}#v3dRoot .arv .n{display:flex;align-items:center;gap:5px;padding:2px 3px;border-radius:5px;cursor:pointer}#v3dRoot .arv .n:hover{background:var(--f)}#v3dRoot .arv .n.sel{background:#dbe7f6}#v3dRoot .arv .tg{width:14px;color:var(--cinza);font-size:10px;text-align:center;flex:none}#v3dRoot .arv .nm{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#v3dRoot .arv .nm small{color:var(--cinza)}#v3dRoot .arv .acc{opacity:0;display:flex;gap:3px}#v3dRoot .arv .n:hover .acc,#v3dRoot .arv .n.sel .acc{opacity:1}#v3dRoot .arv li.off>.n .nm{color:#9aa3ae;text-decoration:line-through}#v3dRoot .k{display:grid;grid-template-columns:150px 1fr;gap:3px 8px;font-size:12.5px}#v3dRoot .k div:nth-child(odd){color:var(--cinza)}#v3dRoot h3{margin:12px 0 6px;font-size:13px;color:var(--azul);text-transform:uppercase;letter-spacing:.4px}#v3dRoot .tag{display:inline-block;border-radius:999px;padding:1px 8px;font-size:11px;font-weight:700;background:#e8eef6;color:#1e4c84}#v3dRoot .tag.w{background:#fff3cd;color:#664d03}#v3dRoot .tag.g{background:#d1e7dd;color:#0f5132}#v3dRoot .tag.r{background:#f8d7da;color:#842029}#v3dRoot pre{background:var(--f);border:1px solid var(--b);border-radius:7px;padding:8px;font-size:11.5px;white-space:pre-wrap;word-break:break-all;margin:6px 0}#v3dRoot #aviso{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);background:#1f2937;color:#fff;padding:8px 14px;border-radius:9px;font-size:12.5px;z-index:8;opacity:0;transition:opacity .2s;pointer-events:none;max-width:90vw}#v3dRoot #aviso.on{opacity:1}#v3dRoot .hint{color:var(--cinza);font-size:12px}@media (max-width:760px){#v3dRoot #painel{top:auto;left:0;right:0;bottom:0;width:auto;height:52vh;border-right:0;border-top:1px solid var(--b);border-radius:14px 14px 0 0;transform:translateY(0)}#v3dRoot #painel.fechado{transform:translateY(100%)}#v3dRoot #bPainel{top:auto;bottom:calc(52vh + 8px);left:8px}#v3dRoot #painel.fechado~#bPainel{bottom:8px;left:8px}#v3dRoot #ferr{top:52px}#v3dRoot #ferr{gap:4px;top:50px}#v3dRoot #ferr .grp{min-width:0;padding:4px;gap:3px;flex-direction:row;flex-wrap:wrap;max-width:46vw}#v3dRoot #ferr .grp label{width:100%}#v3dRoot #ferr button.sm{padding:2px 6px;font-size:11px}#v3dRoot #bWire{display:none}#v3dRoot #ferr label:has(#chkInst),#v3dRoot #ferr label:has(#chkFus){display:none}#v3dRoot #top .s{display:none}}';
var TEMPLATE='<canvas id="c"></canvas>\n<div id="top"><b id="v3dTit">Visor 3D</b><span class="s" id="stTop">sem modelo</span><button id="bFechar" style="display:none">✕ Fechar</button><button id="bAbrir">Abrir pasta PUBLICACAO…</button><button id="bJson" title="escolher ficheiros à mão (.glb e .json)">Ficheiros…</button></div>\n<input type="file" id="fGlb" multiple hidden><input type="file" id="fJson" multiple hidden>\n\n<div id="drop"><div class="card"><h2>Arrasta para aqui a pasta PUBLICACAO_…</h2><p>Ou o <code>modelo.glb</code> e o <code>publicacao.json</code> juntos (ou um GLB exportado do SketchUp, sem JSON).<br>Nada sai deste computador — a página não tem servidor.</p><button class="p" id="bAbrir2">Abrir pasta…</button> <button id="bAbrir3">Escolher ficheiros…</button></div></div>\n\n<div id="painel" class="fechado">\n  <div id="tabs"><button class="on" data-pg="arv">Árvore</button><button data-pg="el">Elemento</button><button data-pg="st">Medições</button></div>\n  <div class="pg on" id="pg-arv"><div class="hint" style="margin-bottom:6px">Toca no nome para selecionar e voar até lá · 👁 esconde · ◎ isola (só este ramo).</div><div class="arv" id="arv"></div></div>\n  <div class="pg" id="pg-el"><div id="el" class="hint">Toca num elemento no modelo ou na árvore.</div></div>\n  <div class="pg" id="pg-st"><div id="st" class="hint">Carrega um modelo.</div></div>\n</div>\n<button id="bPainel" class="sm">☰ painel</button>\n\n<div id="ferr">\n  <div class="grp"><button class="sm" id="bTudo">Ver tudo</button><button class="sm" id="bTopo">Vista de cima</button><button class="sm" id="bVista" title="planta ortográfica: arrastar move, roda do rato amplia">Planta 2D</button><button class="sm" id="bMostrar">Mostrar tudo</button><button class="sm" id="bWire">Arame</button></div>\n  <div class="grp"><label>Cor</label><select id="selCor"><option value="orig">original</option><option value="tipo">por tipo</option><option value="artigo">por artigo (JSON)</option><option value="elem">por elemento</option></select></div>\n  <div class="grp"><label>Corte em altura <span id="lblCorte">—</span></label><input type="range" id="corte" min="0" max="1000" value="1000"></div>\n  <div class="grp"><label><input type="checkbox" id="chkInst" checked> Instanciar (1 chamada por geometria)</label><label><input type="checkbox" id="chkFus" checked> Fundir malhas únicas (1 chamada por material)</label><label><input type="checkbox" id="chkDet"> Modo obra: detalhe só no elemento tocado</label></div>\n  <div class="grp" id="grpCam" style="display:none"><label>Camadas</label><div id="camadas" style="display:flex;flex-direction:column;gap:2px;font-size:11.5px"></div></div>\n</div>\n<div id="aviso"></div>';
var VERSAO_VISOR='2026-10-23-V6';
function montar(el,opts){
  opts=opts||{};var ROOT=el;ROOT.id='v3dRoot';
  if(!document.getElementById('v3dCss')){var st=document.createElement('style');st.id='v3dCss';st.textContent=CSS;document.head.appendChild(st);}
  ROOT.innerHTML=TEMPLATE;

'use strict';
var VERSAO='2026-10-23-V6';
var $=function(s){return ROOT.querySelector(s);};
var T=window.THREE, X=window.THREE_X;
if(!T){ROOT.innerHTML='<p style="padding:30px">Falta o three_nt.min.js (biblioteca 3D).</p>';return {desmontar:function(){ROOT.innerHTML='';}};}

// ---------- cena ----------
var canvas=$('#c');
var renderer=new T.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
renderer.localClippingEnabled=true;
renderer.setClearColor(0xe9edf2,1);
var scene=new T.Scene();
var camPersp=new T.PerspectiveCamera(50,1,0.05,5000),camOrto=new T.OrthographicCamera(-1,1,1,-1,-5000,5000),camera=camPersp,vista2D=false;
var controls=new X.OrbitControls(camera,canvas);controls.zoomToCursor=true;
controls.enableDamping=true;controls.dampingFactor=0.12;controls.screenSpacePanning=true;
var hemi=new T.HemisphereLight(0xffffff,0x9aa3ae,1.1);scene.add(hemi);
var sol=new T.DirectionalLight(0xffffff,1.4);sol.position.set(1,2,1.2);scene.add(sol);
var sol2=new T.DirectionalLight(0xffffff,0.5);sol2.position.set(-1.5,1,-1);scene.add(sol2);
var modelo=null, bbox=null, mats=[], malhas=[], orig=new Map(), sel=null, corte=new T.Plane(new T.Vector3(0,-1,0),1e9), pub=null, uidMap={}, arame=false;
var precisa=true; function pedir(){precisa=true;}
controls.addEventListener('change',pedir);
function dim(){var w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h,false);camPersp.aspect=w/h;camPersp.updateProjectionMatrix();if(vista2D)ortoEnquadrar();pedir();}
window.addEventListener('resize',dim);dim();
var tFrame=0,nFrames=0,tAcc=0;
var vivo=true;
function loop(){if(!vivo)return;requestAnimationFrame(loop);var mexeu=controls.update();if(precisa||mexeu){var t0=performance.now();renderer.render(scene,camera);tFrame=performance.now()-t0;nFrames++;tAcc+=tFrame;precisa=false;var sc=$('#stCalls');if(sc)sc.textContent=fmt(renderer.info.render.calls);}}
loop();

function aviso(t,ms){var a=$('#aviso');a.textContent=t;a.classList.add('on');clearTimeout(aviso._t);aviso._t=setTimeout(function(){a.classList.remove('on');},ms||2600);}

// ---------- carregar ----------
function carregarGLB(file){
  var t0=performance.now();aviso('A ler '+file.name+'…',60000);
  var fr=new FileReader();
  fr.onload=function(){ carregarGLBBuffer_(fr.result,file.name,file.size,t0); };
  fr.readAsArrayBuffer(file);
}
function carregarGLBBuffer_(buf,nome,bytes,t0){
  var file={name:nome||'modelo.glb',size:bytes||(buf&&buf.byteLength)||0}; t0=t0||performance.now(); var t1=performance.now();
  {
    new X.GLTFLoader().parse(buf,'',function(g){
      var t2=performance.now();
      if(modelo)scene.remove(modelo);
      modelo=g.scene;scene.add(modelo);
      preparar();
      enquadrar(bbox);
      estatisticas({nome:file.name,bytes:file.size,msLer:t1-t0,msParse:t2-t1});
      arvore();
      $('#drop').style.display='none';$('#painel').classList.remove('fechado');
      $('#stTop').textContent=file.name+' · '+(file.size>1048576?(file.size/1048576).toFixed(1)+' MB':Math.round(file.size/1024)+' KB')+' · '+fmt(ST.tri)+' triângulos';
      aviso('Modelo carregado em '+((t2-t0)/1000).toFixed(1)+' s');
      benchmark();
    },function(e){aviso('Erro a ler o GLB: '+(e&&e.message||e),8000);console.error(e);});
  }
}
function carregarJSON(file){
  var fr=new FileReader();fr.onload=function(){try{aplicarPub_(JSON.parse(fr.result));}catch(e){aviso('JSON inválido: '+e.message,6000);}};fr.readAsText(file);
}
function aplicarPub_(obj){
  try{pub=obj;uidMap={};Object.keys(pub.elementos||{}).forEach(function(u){uidMap[u]=pub.elementos[u];});aviso('publicacao.json: '+Object.keys(uidMap).length+' elementos, '+Object.keys(pub.artigos||{}).length+' artigos');if(modelo){estatisticas();arvore();}}catch(e){aviso('JSON inválido: '+e.message,6000);}
}
var ST={};
function preparar(){
  mats=[];malhas=[];orig=new Map();var tri=0,nos=0,nMesh=0,matSet=new Set(),geoSet=new Set(),vert=0;
  modelo.traverse(function(o){
    nos++;
    if(o.isMesh){nMesh++;malhas.push(o);o.frustumCulled=true;
      var g=o.geometry;geoSet.add(g.uuid);var n=g.index?g.index.count:(g.attributes.position?g.attributes.position.count:0);tri+=n/3;vert+=g.attributes.position?g.attributes.position.count:0;
      var ms=Array.isArray(o.material)?o.material:[o.material];
      ms.forEach(function(m){if(!matSet.has(m.uuid)){matSet.add(m.uuid);mats.push(m);m.clippingPlanes=[corte];m.clipShadows=false;m.side=T.DoubleSide;if(m.map===undefined)m.map=null;}});
      orig.set(o,o.material);
      o.userData.el=elementoDe(o);o.userData.tri=n/3;o.userData.cam=camadaDe(o);
    }
  });
  ST.porCamada={};malhas.forEach(function(m){var c=m.userData.cam;ST.porCamada[c]=ST.porCamada[c]||{tri:0,n:0};ST.porCamada[c].tri+=m.userData.tri;ST.porCamada[c].n++;});
  camadasUI();construirInst();
  ST.tri=Math.round(tri);ST.nos=nos;ST.malhas=nMesh;ST.mats=mats.length;ST.geos=geoSet.size;ST.vert=vert;
  bbox=new T.Box3().setFromObject(modelo);
  var s=new T.Vector3();bbox.getSize(s);ST.dim=s;
  var r=$('#corte');r.value=1000;corte.constant=1e9;$('#lblCorte').textContent='—';
  aplicarCor($('#selCor').value);
}
// elemento = antepassado mais próximo cujo nome tem «#uid» (ou prefixo conhecido); senão a própria malha
var PREF=[['Parede_Pladur','wall'],['Tecto_','ceiling'],['Recaida_','recaida'],['Sanca_','sanca'],['Pav_','floor'],['VinilP_','wallvinyl']];
function kindDe(nome){for(var i=0;i<PREF.length;i++)if(nome.indexOf(PREF[i][0])===0)return PREF[i][1];return '';}
function sanit(n){return String(n||'').replace(/\s/g,'_').replace(/[\[\]\.:\/]/g,'');}
function uidDe(nome){var m=/#([A-Za-z0-9_-]{4,})\s*$/.exec(nome||'');return m?m[1]:'';}
function uidObj(o){return (o&&o.userData&&(o.userData.nt_uid||o.userData.uid))||uidDe(o&&o.name);}
function kindObj(o){return (o&&o.userData&&o.userData.nt_kind)||kindDe(o&&o.name||'');}
function elementoDe(o){var p=o;while(p&&p!==modelo){if(uidObj(p)||kindObj(p))return p;p=p.parent;}return o;}
// camadas construtivas pelo nome do subgrupo (catálogo do plugin)
var CAMADAS=[['estrutura',/^(estrutura|primario|perfil|pendural|varao|cruzeta|canal_|reforco|canal_l)/i],['placas',/^placa/i],['isolamento',/^isolamento/i],['vaos',/^vao_/i],['etiquetas',/^etiquetas/i],['estereotomia',/^(estereotomia|juntas)/i]];
function camadaDe(o){var p=o;while(p&&p!==modelo){var n=p.name||'';if(/^contexto/i.test(n))return 'contexto';for(var i=0;i<CAMADAS.length;i++)if(CAMADAS[i][1].test(n))return CAMADAS[i][0];if(uidObj(p)||kindObj(p))return 'envelope';p=p.parent;}return 'outros';}
var DET=['estrutura','isolamento','vaos','estereotomia','etiquetas'],detOn=false;
function ehDetalhe(o){return DET.indexOf(o.userData.cam)>=0;}
function visivelReal(o){var p=o;while(p){if(!p.visible)return false;p=p.parent;}if(detOn&&o.isMesh&&ehDetalhe(o)&&!(sel&&isDesc(o,sel)))return false;return true;}
function sanitObj(o){return sanit(o.name);}

function enquadrar(box){
  if(!box||box.isEmpty())return;if(vista2D){ortoEnquadrar(box);return;}var c=new T.Vector3(),s=new T.Vector3();box.getCenter(c);box.getSize(s);
  var d=Math.max(s.x,s.y,s.z)*1.2/Math.tan(camera.fov*Math.PI/360);
  camera.position.copy(c).add(new T.Vector3(d*0.6,d*0.5,d*0.7));camera.near=Math.max(0.02,d/500);camera.far=d*20;camera.updateProjectionMatrix();
  controls.target.copy(c);controls.update();pedir();
}
function voarPara(o){var b=new T.Box3().setFromObject(o);if(b.isEmpty())return;if(vista2D){ortoEnquadrar(b);return;}var c=new T.Vector3(),s=new T.Vector3();b.getCenter(c);b.getSize(s);var d=Math.max(s.x,s.y,s.z,1)*1.6/Math.tan(camera.fov*Math.PI/360);var dir=camera.position.clone().sub(controls.target).normalize();camera.position.copy(c).add(dir.multiplyScalar(d));controls.target.copy(c);controls.update();pedir();}

// ---------- estatísticas ----------
function fmt(n){return (n||0).toLocaleString('pt-PT');}
function estatisticas(info){
  if(info)ST.info=info;var i=ST.info||{};
  var h='<div class="k">';
  h+='<div>Ficheiro</div><div>'+esc(i.nome||'')+'</div><div>Tamanho</div><div>'+(i.bytes/1048576).toFixed(2)+' MB</div>';
  h+='<div>Ler + interpretar</div><div>'+Math.round(i.msLer||0)+' ms + '+Math.round(i.msParse||0)+' ms</div>';
  h+='<div>Triângulos</div><div><b>'+fmt(ST.tri)+'</b> '+semaforo(ST.tri,300000,1200000)+'</div><div>Vértices</div><div>'+fmt(ST.vert)+'</div>';
  h+='<div>Nós / malhas</div><div>'+fmt(ST.nos)+' / '+fmt(ST.malhas)+' '+semaforo(ST.malhas,1500,5000)+'</div><div>Geometrias / materiais</div><div>'+fmt(ST.geos)+' / '+fmt(ST.mats)+'</div><div>Instanciação</div><div>'+fmt(ST.instMalhas||0)+' malhas em '+fmt(ST.instGeos||0)+' lotes</div><div>Fusão</div><div>'+fmt(ST.fusMalhas||0)+' malhas únicas em '+fmt(ST.fusGrupos||0)+' grupos (por material)</div><div>Chamadas teóricas</div><div>'+fmt((ST.instGeos||0)+(ST.fusGrupos||0)+(ST.malhas-(ST.instMalhas||0)-(ST.fusMalhas||0)))+' (com tudo ligado)</div>';
  h+='<div>Dimensões (m)</div><div>'+ST.dim.x.toFixed(1)+' × '+ST.dim.z.toFixed(1)+' × '+ST.dim.y.toFixed(1)+' (altura)</div>';
  h+='<div>Chamadas de desenho</div><div id="stCalls">'+fmt(renderer.info.render.calls)+'</div><div>Visível agora</div><div id="stVis">'+visivelAgora()+'</div>';
  h+='<div>Tempo por imagem</div><div id="stFps">'+(ST.fps?ST.fps:'a medir…')+'</div>';
  h+='<div>Nomes dos nós</div><div style="font-size:11px">o three.js troca espaços por _ e apaga [ ] . : / — o uid «#…» sobrevive; códigos Item nos nomes de grupo perdem os pontos (o JSON é a fonte)</div><div>Ecrã</div><div>'+window.innerWidth+'×'+window.innerHeight+' · dpr '+(window.devicePixelRatio||1).toFixed(2)+' → '+renderer.getPixelRatio().toFixed(2)+'</div>';
  h+='<div>Dispositivo</div><div style="font-size:11px">'+esc(navigator.userAgent.replace(/Mozilla\/5\.0 \(|\) .*$/g,''))+'</div>';
  var gl=renderer.getContext();var dbg=gl.getExtension('WEBGL_debug_renderer_info');if(dbg)h+='<div>GPU</div><div style="font-size:11px">'+esc(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))+'</div>';
  h+='</div>';
  if(pub){var falta=0,semNo=0;var nomes=new Set();modelo.traverse(function(o){if(o.name)nomes.add(o.name);});Object.keys(uidMap).forEach(function(u){if(!nomes.has(uidMap[u].no_glb)&&!nomes.has(sanit(uidMap[u].no_glb)))semNo++;});malhas.forEach(function(m){var u=uidObj(m.userData.el);if(u&&!uidMap[u])falta++;});
    h+='<h3>Cruzamento com publicacao.json</h3><div class="k"><div>Obra</div><div>'+esc((pub.obra||{}).numero+' '+(pub.obra||{}).nome)+'</div><div>Elementos no JSON</div><div>'+Object.keys(uidMap).length+'</div><div>JSON sem nó no GLB</div><div>'+(semNo?'<span class="tag r">'+semNo+'</span>':'<span class="tag g">0</span>')+'</div><div>Malhas com uid sem JSON</div><div>'+(falta?'<span class="tag w">'+falta+'</span>':'<span class="tag g">0</span>')+'</div></div>';
    if(Array.isArray(pub.avisos)&&pub.avisos.length){h+='<h3>Avisos do exportador ('+pub.avisos.length+')</h3><ul style="margin:4px 0 8px 16px;font-size:12px">'+pub.avisos.slice(0,40).map(function(a){return '<li>'+esc(typeof a==='string'?a:JSON.stringify(a))+'</li>';}).join('')+'</ul>';}
    h+='<h3>Artigos</h3><table style="width:100%;border-collapse:collapse;font-size:12px">';Object.keys(pub.artigos||{}).sort().forEach(function(k){var a=pub.artigos[k];h+='<tr><td style="padding:2px 4px;border-bottom:1px solid #eee"><b>'+esc(k)+'</b><br><small>'+esc(a.descricao||'')+'</small></td><td style="text-align:right;padding:2px 4px;border-bottom:1px solid #eee;white-space:nowrap">'+(a.qtd_medida!=null?a.qtd_medida.toFixed(2):'—')+' / '+(a.qtd_contratada!=null?a.qtd_contratada.toFixed(2):'—')+' '+esc(a.unidade||'')+'<br><small>'+(a.n_elementos||0)+' elem.</small></td></tr>';});h+='</table>';}
  if(ST.porCamada){h+='<h3>Triângulos por camada</h3><table style="width:100%;border-collapse:collapse;font-size:12px">';var tot=ST.tri||1;Object.keys(ST.porCamada).sort(function(a,b){return ST.porCamada[b].tri-ST.porCamada[a].tri;}).forEach(function(c){var v=ST.porCamada[c];h+='<tr><td style="padding:2px 4px;border-bottom:1px solid #eee">'+esc(c)+'</td><td style="text-align:right;padding:2px 4px;border-bottom:1px solid #eee">'+fmt(Math.round(v.tri))+' <small>('+(100*v.tri/tot).toFixed(0)+'%) · '+v.n+' malhas</small></td></tr>';});h+='</table>';}
  h+='<h3>Veredicto para telemóvel</h3><div class="hint">'+veredicto()+'</div>';
  h+='<div style="margin-top:10px"><button class="sm" id="bCopiar">Copiar relatório</button> <span class="hint">cola-o na conversa</span></div>';
  $('#st').innerHTML=h;
  $('#bCopiar').onclick=function(){var txt='VISOR 3D TESTE '+VERSAO+'\n'+$('#st').innerText.replace(/\n{2,}/g,'\n');navigator.clipboard.writeText(txt).then(function(){aviso('Relatório copiado');},function(){prompt('Copia:',txt);});};
}
function visivelAgora(){var t=0,n=0;malhas.forEach(function(m){if(visivelReal(m)){t+=m.userData.tri;n++;}});return fmt(Math.round(t))+' triângulos · '+fmt(n)+' malhas';}
function semaforo(v,a,b){return v<a?'<span class="tag g">leve</span>':v<b?'<span class="tag w">médio</span>':'<span class="tag r">pesado</span>';}
function veredicto(){var t=ST.tri,m=ST.malhas,mb=(ST.info&&ST.info.bytes||0)/1048576;var p=[];
  if(mb>25)p.push('Ficheiro com '+mb.toFixed(0)+' MB: acima dos 25 MB que proponho como teto do modelo leve (e dos 50 MB do Storage no plano Free).');
  if(t>1200000)p.push(fmt(t)+' triângulos: um telemóvel médio não aguenta isto fluido — o exportador tem de separar envelope e detalhe.');else if(t>300000)p.push(fmt(t)+' triângulos: abre em PC sem problema; em telemóvel vai depender do aparelho — testar.');else p.push(fmt(t)+' triângulos: leve, serve tal e qual.');
  var ch=renderer.info.render.calls||0;if(ch>1500)p.push(fmt(ch)+' chamadas de desenho: demasiadas para telemóvel — liga «Instanciar» e «Fundir».');else if(m>1500)p.push(fmt(m)+' malhas reduzidas a '+fmt(ch)+' chamadas de desenho (instanciação + fusão): bom para telemóvel.');
  if(ST.porCamada&&ST.tri>300000){var pc=ST.porCamada,leve=0;['placas','envelope','outros','contexto'].forEach(function(c){if(pc[c])leve+=pc[c].tri;});if(pc.contexto&&pc.contexto.tri>300000)p.push('CONTEXTO com '+fmt(Math.round(pc.contexto.tri))+' triângulos: a arquitetura entrou inteira — limpar ou simplificar o que tem a etiqueta NT_Contexto no SketchUp (só lajes, paredes, escadas).');p.push('Modelo leve = placas + envelope + contexto: '+fmt(Math.round(leve))+' triângulos ('+(100*leve/ST.tri).toFixed(0)+'% do total) — é esse o que vai para o telemóvel; o resto (estrutura, isolamento…) é detalhe a pedido.');}
  if(ST.fps)p.push('Tempo por imagem medido: '+ST.fps+'.');
  return p.join(' ');}
function benchmark(){nFrames=0;tAcc=0;var t0=performance.now();var a=controls.getAzimuthalAngle();var id=setInterval(function(){var k=(performance.now()-t0)/1500;var c=controls.target,r=camera.position.distanceTo(c);camera.position.set(c.x+r*Math.sin(a+k*Math.PI*2)*0.8,camera.position.y,c.z+r*Math.cos(a+k*Math.PI*2)*0.8);pedir();if(k>=1){clearInterval(id);var med=nFrames?tAcc/nFrames:0;ST.fps=med.toFixed(1)+' ms ('+(nFrames/1.5).toFixed(0)+' img/s a rodar; GPU '+(med<16?'folgada':med<40?'no limite':'a sofrer')+')';estatisticas();enquadrar(bbox);}},16);}

// ---------- árvore ----------
var liDe=new Map();
function arvore(){
  var root=$('#arv');root.innerHTML='';liDe=new Map();
  function ramo(o,prof){
    var li=document.createElement('li');liDe.set(o,li);
    var filhos=o.children.filter(function(c){return !c.isLight;});
    var n=document.createElement('div');n.className='n';
    var tg=document.createElement('span');tg.className='tg';tg.textContent=filhos.length?(prof<2?'▾':'▸'):'·';
    var nm=document.createElement('span');nm.className='nm';var nome=o.name||(o.isMesh?'(malha)':'(grupo)');var u=uidObj(o);var cnt=0;o.traverse(function(c){if(c.isMesh)cnt++;});
    nm.innerHTML=esc(u?nome.replace('#'+u,'').replace(/[_\s]+$/,''):nome)+(u?' <small>#'+esc(u)+'</small>':'')+(filhos.length&&cnt?' <small>('+cnt+')</small>':'');
    var acc=document.createElement('span');acc.className='acc';
    var bV=document.createElement('button');bV.className='sm';bV.textContent='👁';bV.title='mostrar/esconder';bV.onclick=function(e){e.stopPropagation();o.visible=!o.visible;li.classList.toggle('off',!o.visible);sincInst();};
    var bI=document.createElement('button');bI.className='sm';bI.textContent='◎';bI.title='isolar (só este ramo)';bI.onclick=function(e){e.stopPropagation();isolar(o);};
    acc.appendChild(bV);acc.appendChild(bI);
    n.appendChild(tg);n.appendChild(nm);n.appendChild(acc);li.appendChild(n);
    var ul=null;
    if(filhos.length){ul=document.createElement('ul');if(prof>=2)ul.style.display='none';filhos.forEach(function(c){ul.appendChild(ramo(c,prof+1));});li.appendChild(ul);
      tg.onclick=function(e){e.stopPropagation();var ab=ul.style.display==='none';ul.style.display=ab?'':'none';tg.textContent=ab?'▾':'▸';};}
    n.onclick=function(){selecionar(o,true);};
    return li;
  }
  var ul=document.createElement('ul');modelo.children.forEach(function(c){ul.appendChild(ramo(c,0));});root.appendChild(ul);
  pisosUI();
}
function isolar(o){var p=o.parent;if(!p)return;p.children.forEach(function(c){c.visible=(c===o);var li=liDe.get(c);if(li)li.classList.toggle('off',!c.visible);});
  var q=p;while(q&&q!==modelo){q.visible=true;var li=liDe.get(q);if(li)li.classList.remove('off');q=q.parent;}
  var r=$('#corte');r.value=1000;corte.constant=1e9;$('#lblCorte').textContent='—';
  sincInst();var b=new T.Box3().setFromObject(o);boxOrto=b;if(vista2D&&/^piso/i.test(o.name||'')){var y=b.min.y+1.5;if(y<b.max.y){corte.constant=y;var k=(y-bbox.min.y)/(bbox.max.y-bbox.min.y);r.value=Math.round(k*1000);$('#lblCorte').textContent=(y-bbox.min.y).toFixed(2)+' m (planta)';}}enquadrar(b);aviso('Isolado: '+(o.name||'(grupo)'));}
function mostrarTudo(){if(!modelo)return;boxOrto=null;modelo.traverse(function(o){o.visible=true;});liDe.forEach(function(li){li.classList.remove('off');});ROOT.querySelectorAll('#camadas input').forEach(function(c){c.checked=true;});sincInst();}

// pisos (do JSON ou de nós com «Piso» no nome)
function pisosUI(){}

// ---------- seleção e ficha ----------
var matSel=new T.MeshLambertMaterial({color:0xff3fa4,emissive:0x5a0f3a,side:T.DoubleSide});
function selecionar(o,voar){
  if(sel){sel.traverse(function(m){if(m.isMesh&&orig.has(m))m.material=corAtual(m);});var li=liDe.get(sel);if(li)li.querySelector('.n').classList.remove('sel');}
  sel=o;if(!o)return;
  o.traverse(function(m){if(m.isMesh)m.material=matSel;});
  var li=liDe.get(o);if(li){li.querySelector('.n').classList.add('sel');var p=li.parentElement;while(p&&p!==$('#arv')){if(p.tagName==='UL'){p.style.display='';var t=p.previousElementSibling&&p.previousElementSibling.querySelector('.tg');if(t)t.textContent='▾';}p=p.parentElement;}li.scrollIntoView({block:'nearest'});}
  if(voar)voarPara(o);
  ficha(o);mostrarPg('el');sincInst();
}
function ficha(o){
  var nome=o.name||'(sem nome)';var u=uidObj(o);var k=kindObj(o);var b=new T.Box3().setFromObject(o);var s=new T.Vector3();b.getSize(s);var tri=0,nm=0;o.traverse(function(m){if(m.isMesh){nm++;var g=m.geometry;tri+=(g.index?g.index.count:g.attributes.position.count)/3;}});
  var h='<div style="font-size:15px;font-weight:700;color:var(--azul)">'+esc(u?nome.replace('#'+u,'').replace(/[_\s]+$/,''):nome)+'</div>';
  if(k)h+='<span class="tag">'+({wall:'parede',ceiling:'tecto',recaida:'recaída',sanca:'sanca',floor:'pavimento',wallvinyl:'vinil de parede'})[k]+'</span> ';
  if(u)h+='<span class="tag">#'+esc(u)+'</span>';
  h+='<div class="k" style="margin-top:8px"><div>Dimensões (m)</div><div>'+s.x.toFixed(2)+' × '+s.z.toFixed(2)+' × '+s.y.toFixed(2)+' (alt.)</div><div>Malhas / triângulos</div><div>'+nm+' / '+fmt(Math.round(tri))+'</div>';
  var cam=[];o.children.forEach(function(c){if(c.name)cam.push(c.name);});if(cam.length)h+='<div>Subgrupos</div><div>'+esc(cam.join(', '))+'</div>';
  h+='</div>';
  var e=u&&uidMap[u];
  if(e){var a=pub.artigos&&pub.artigos[e.item]||{};
    h+='<h3>Artigo</h3><div class="k"><div>Item</div><div><b>'+esc(e.item||'—')+'</b> '+esc(a.descricao||'')+'</div><div>Quantidade</div><div><b>'+(e.qtd!=null?e.qtd:'—')+' '+esc(e.unidade||'')+'</b></div><div>Bloco · Piso</div><div>'+esc((e.bloco||'')+' · '+(e.piso||''))+'</div></div>';
    if(e.ficha){h+='<h3>Ficha</h3><div class="k">';Object.keys(e.ficha).forEach(function(c){var v=e.ficha[c];h+='<div>'+esc(c)+'</div><div>'+(typeof v==='object'?'<pre>'+esc(JSON.stringify(v))+'</pre>':esc(String(v)))+'</div>';});h+='</div>';}
    if(Array.isArray(e.fases)&&e.fases.length){h+='<h3>Fases de montagem</h3><table style="width:100%;border-collapse:collapse;font-size:12px">';e.fases.forEach(function(f){h+='<tr><td style="padding:2px 4px;border-bottom:1px solid #eee">'+esc(f.nome||f.id)+'<br><small>'+esc((f.camadas_glb||[]).join(', ')||'—')+'</small></td><td style="text-align:right;padding:2px 4px;border-bottom:1px solid #eee">'+(f.peso!=null?(100*f.peso).toFixed(0)+' %':'')+'</td></tr>';});h+='</table>';}
    if(e.materiais){h+='<h3>Materiais</h3><div class="k">';Object.keys(e.materiais).forEach(function(c){h+='<div>'+esc(c)+'</div><div>'+esc(String(e.materiais[c]))+'</div>';});h+='</div>';}
  }else if(pub&&u)h+='<div class="tag w" style="margin-top:8px">uid sem entrada no publicacao.json</div>';
  else if(!pub)h+='<div class="hint" style="margin-top:8px">Carrega o publicacao.json para ver artigo, quantidade e ficha.</div>';
  $('#el').innerHTML=h;
}
// toque/clique no modelo
var ray=new T.Raycaster(),pDown=null;
canvas.addEventListener('pointerdown',function(e){pDown=[e.clientX,e.clientY];});
canvas.addEventListener('pointerup',function(e){if(!pDown||!modelo)return;var dx=e.clientX-pDown[0],dy=e.clientY-pDown[1];pDown=null;if(dx*dx+dy*dy>36)return;
  var v=new T.Vector2((e.clientX/window.innerWidth)*2-1,-(e.clientY/window.innerHeight)*2+1);ray.setFromCamera(v,camera);
  var vis=malhas.filter(function(m){return visivelReal(m)&&!(instOn&&instDe.has(m))&&!(fusOn&&fusDe.has(m));});
  var alvos=vis;if(instOn)alvos=alvos.concat(instGrp.children);if(fusOn)alvos=alvos.concat(fusGrp.children);
  var hits=ray.intersectObjects(alvos,false);var hit=null;for(var i=0;i<hits.length;i++){var pt=hits[i].point;if(corte.distanceToPoint(pt)>=0){hit=hits[i];break;}}
  if(hit){var mo=hit.object;if(mo.isInstancedMesh){mo=mo.userData.rec.meshes[hit.instanceId];}else if(mo.userData.fus){mo=mo.userData.fus.faceMesh[hit.faceIndex];}selecionar(mo.userData.el||mo,false);}else{selecionar(null);$('#el').innerHTML='<div class="hint">Toca num elemento no modelo ou na árvore.</div>';pedir();}
});

// ---------- cores ----------
var PAL=[0x4e79a7,0xf28e2b,0x59a14f,0xe15759,0x76b7b2,0xedc948,0xb07aa1,0xff9da7,0x9c755f,0xbab0ac,0x1f77b4,0x8c564b];
var CORTIPO={wall:0xeeeeee,ceiling:0xcfe0f5,recaida:0xf7d58a,sanca:0xf2b874,floor:0xc39a73,wallvinyl:0xa9c8a0,'':0xd2d2cc};
var cache={};function matCor(c){if(!cache[c])cache[c]=new T.MeshLambertMaterial({color:c,side:T.DoubleSide,clippingPlanes:[corte]});return cache[c];}
var modoCor='orig';
function corAtual(m){var el=m.userData.el||m;var nome=el.name||'';
  if(modoCor==='orig')return orig.get(m);
  if(modoCor==='tipo')return matCor(CORTIPO[kindDe(nome)]);
  if(modoCor==='elem'){var h=0;for(var i=0;i<nome.length;i++)h=(h*31+nome.charCodeAt(i))>>>0;return matCor(PAL[h%PAL.length]);}
  if(modoCor==='artigo'){var u=uidDe(nome);var e=u&&uidMap[u];if(!e||!e.item)return matCor(0xd2d2cc);var ks=Object.keys(pub.artigos||{}).sort();var ix=ks.indexOf(e.item);return matCor(PAL[(ix<0?ks.length:ix)%PAL.length]);}
  return orig.get(m);}
function corHex(m){if(sel&&isDesc(m,sel))return 0xff3fa4;if(modoCor==='orig'){var om=orig.get(m);var c=om&&om.color?om.color.getHex():0xffffff;return c;}var mt=corAtual(m);return mt&&mt.color?mt.color.getHex():0xffffff;}
function aplicarCor(modo){modoCor=modo;malhas.forEach(function(m){if(sel&&isDesc(m,sel))return;var mt=corAtual(m);if(mt){m.material=mt;mt.wireframe=arame;}});sincInst();}
// ---------- instanciação: malhas com a mesma geometria+material → 1 InstancedMesh ----------
var instGrp=new T.Group();instGrp.name='__inst';scene.add(instGrp);var instRecs=[],instDe=new Map(),instOn=true,matsInst=[];
var _m4=new T.Matrix4(),_zero=new T.Matrix4().makeScale(0,0,0),_col=new T.Color();
function construirInst(){
  instGrp.children.slice().forEach(function(c){instGrp.remove(c);c.dispose&&c.dispose();});instRecs=[];instDe=new Map();matsInst=[];
  var grupos={};malhas.forEach(function(m){if(Array.isArray(m.material))return;var k=m.geometry.uuid+'|'+m.material.uuid;(grupos[k]=grupos[k]||[]).push(m);});
  modelo.updateMatrixWorld(true);
  Object.keys(grupos).forEach(function(k){var ms=grupos[k];if(ms.length<2)return;var m0=ms[0].material;
    var mw=new T.MeshLambertMaterial({color:0xffffff,side:T.DoubleSide,clippingPlanes:[corte],map:m0.map||null,transparent:!!m0.transparent,opacity:m0.opacity!=null?m0.opacity:1});matsInst.push(mw);
    var im=new T.InstancedMesh(ms[0].geometry,mw,ms.length);im.frustumCulled=false;im.instanceColor=new T.InstancedBufferAttribute(new Float32Array(ms.length*3),3);
    var rec={im:im,meshes:ms};im.userData.rec=rec;instRecs.push(rec);ms.forEach(function(m,i){instDe.set(m,{rec:rec,i:i});});instGrp.add(im);});
  ST.instGeos=instRecs.length;ST.instMalhas=instDe.size;
  construirFus();
  var pesado=ST.tri>1000000;$('#chkDet').checked=pesado;detOn=pesado;if(pesado)aviso('Modelo pesado: «modo obra» ligado — a estrutura só aparece no elemento tocado',5000);
  ligarInst($('#chkInst').checked);
}
$('#chkDet').onchange=function(){detOn=this.checked;sincInst();};
function ligarInst(on){instOn=on;instGrp.visible=on;malhas.forEach(function(m){if(instDe.has(m)){if(on)m.layers.set(1);else m.layers.set(0);}});sincInst();}
// ---------- fusão: malhas únicas (não instanciáveis) → 1 malha por material, cor por vértice, esconder = colapsar ----------
var fusGrp=new T.Group();fusGrp.name='__fus';scene.add(fusGrp);var fusRecs=[],fusDe=new Map(),fusOn=true;
function construirFus(){
  fusGrp.children.slice().forEach(function(c){fusGrp.remove(c);c.geometry.dispose();c.material.dispose();});fusRecs=[];fusDe=new Map();
  var grupos={};malhas.forEach(function(m){if(instDe.has(m)||Array.isArray(m.material))return;var g=m.geometry;if(!g.attributes.position)return;(grupos[m.material.uuid]=grupos[m.material.uuid]||[]).push(m);});
  var _n=new T.Matrix3();
  Object.keys(grupos).forEach(function(k){var ms=grupos[k];if(ms.length<2)return;var m0=ms[0].material;
    var total=0;ms.forEach(function(m){var g=m.geometry;total+=g.index?g.index.count:g.attributes.position.count;});
    var pos=new Float32Array(total*3),nrm=new Float32Array(total*3),col=new Float32Array(total*3),faceMesh=new Array(total/3),ranges=[];var off=0;
    ms.forEach(function(m){var g=m.geometry;var P=g.attributes.position,N=g.attributes.normal,I=g.index;var n=I?I.count:P.count;m.updateMatrixWorld(true);_n.getNormalMatrix(m.matrixWorld);var v=new T.Vector3(),w=new T.Vector3();
      for(var i=0;i<n;i++){var vi=I?I.getX(i):i;v.fromBufferAttribute(P,vi).applyMatrix4(m.matrixWorld);pos[(off+i)*3]=v.x;pos[(off+i)*3+1]=v.y;pos[(off+i)*3+2]=v.z;
        if(N){w.fromBufferAttribute(N,vi).applyMatrix3(_n).normalize();}else w.set(0,1,0);nrm[(off+i)*3]=w.x;nrm[(off+i)*3+1]=w.y;nrm[(off+i)*3+2]=w.z;}
      for(var f=0;f<n/3;f++)faceMesh[off/3+f]=m;
      ranges.push({m:m,start:off,count:n});off+=n;});
    var geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('normal',new T.BufferAttribute(nrm,3));geo.setAttribute('color',new T.BufferAttribute(col,3));
    if(!ms[0].geometry.attributes.normal)geo.computeVertexNormals();
    var mat=new T.MeshLambertMaterial({color:0xffffff,vertexColors:true,side:T.DoubleSide,clippingPlanes:[corte],transparent:!!m0.transparent,opacity:m0.opacity!=null?m0.opacity:1});matsInst.push(mat);
    var mesh=new T.Mesh(geo,mat);mesh.frustumCulled=false;var rec={mesh:mesh,ranges:ranges,posOrig:pos.slice(),faceMesh:faceMesh};mesh.userData.fus=rec;fusRecs.push(rec);ranges.forEach(function(r){fusDe.set(r.m,rec);});fusGrp.add(mesh);});
  ST.fusGrupos=fusRecs.length;ST.fusMalhas=fusDe.size;
  ligarFus($('#chkFus').checked);
}
function ligarFus(on){fusOn=on;fusGrp.visible=on;malhas.forEach(function(m){if(fusDe.has(m)){if(on)m.layers.set(1);else m.layers.set(0);}});sincInst();}
$('#chkFus').onchange=function(){ligarFus(this.checked);aviso(this.checked?'Fusão ligada':'Fusão desligada (cada malha única é uma chamada)');};
function sincFus(){
  fusRecs.forEach(function(r){var P=r.mesh.geometry.attributes.position,C=r.mesh.geometry.attributes.color,pa=P.array,ca=C.array,po=r.posOrig;
    r.ranges.forEach(function(rg){var vis=visivelReal(rg.m);var c=corHex(rg.m);var cr=((c>>16)&255)/255,cg=((c>>8)&255)/255,cb=(c&255)/255;var a=rg.start*3,b=(rg.start+rg.count)*3;
      if(vis){for(var i=a;i<b;i++)pa[i]=po[i];}else{for(var i=a;i<b;i++)pa[i]=0;}
      for(var j=rg.start;j<rg.start+rg.count;j++){ca[j*3]=cr;ca[j*3+1]=cg;ca[j*3+2]=cb;}});
    P.needsUpdate=true;C.needsUpdate=true;r.mesh.material.wireframe=arame;});
}
function sincInst(){
  malhas.forEach(function(m){if((instDe.has(m)&&instOn)||(fusDe.has(m)&&fusOn))return;m.layers.set(visivelReal(m)||!detOn?0:1);});
  if(fusOn)sincFus();
  if(instOn){instRecs.forEach(function(r){var alg=false;r.meshes.forEach(function(m,i){if(visivelReal(m)){r.im.setMatrixAt(i,m.matrixWorld);alg=true;}else r.im.setMatrixAt(i,_zero);_col.setHex(corHex(m));r.im.setColorAt(i,_col);});r.im.visible=alg;r.im.instanceMatrix.needsUpdate=true;r.im.instanceColor.needsUpdate=true;r.im.material.wireframe=arame;});}
  var sv=$('#stVis');if(sv)sv.textContent=visivelAgora();pedir();
}
$('#chkInst').onchange=function(){ligarInst(this.checked);aviso(this.checked?'Instanciação ligada':'Instanciação desligada (cada malha é uma chamada)');setTimeout(function(){var sv=$('#stVis');if(sv)sv.textContent=visivelAgora();},300);};
// ---------- camadas construtivas ----------
function camadasUI(){var box=$('#camadas');box.innerHTML='';var cs=Object.keys(ST.porCamada||{}).filter(function(c){return c!=='envelope'&&c!=='outros';});if(!cs.length){$('#grpCam').style.display='none';return;}$('#grpCam').style.display='';
  cs.forEach(function(c){var l=document.createElement('label');l.style.display='flex';l.style.gap='4px';l.style.alignItems='center';var i=document.createElement('input');i.type='checkbox';i.checked=true;i.dataset.cam=c;i.onchange=function(){var on=i.checked;modelo.traverse(function(o){if(o!==modelo&&o.name&&CAMADAS.some(function(x){return x[0]===c&&x[1].test(o.name);})){o.visible=on;var li=liDe.get(o);if(li)li.classList.toggle('off',!on);}});sincInst();};l.appendChild(i);l.appendChild(document.createTextNode(c+' ('+fmt(Math.round(ST.porCamada[c].tri))+')'));box.appendChild(l);});}
function isDesc(m,o){var p=m;while(p){if(p===o)return true;p=p.parent;}return false;}
$('#selCor').onchange=function(){if(modo_artigo_sem_json())return;aplicarCor(this.value);};
function modo_artigo_sem_json(){if($('#selCor').value==='artigo'&&!pub){aviso('Carrega primeiro o publicacao.json');$('#selCor').value='tipo';return false;}return false;}

// ---------- ferramentas ----------
$('#bTudo').onclick=function(){enquadrar(bbox);};
$('#bTopo').onclick=function(){if(!bbox)return;if(vista2D){ortoEnquadrar(boxOrto||bbox);return;}var c=new T.Vector3(),s=new T.Vector3();bbox.getCenter(c);bbox.getSize(s);var d=Math.max(s.x,s.z)*1.1/Math.tan(camera.fov*Math.PI/360);camera.position.set(c.x,c.y+d,c.z+0.001);controls.target.copy(c);controls.update();pedir();};
$('#bMostrar').onclick=mostrarTudo;
// planta 2D: câmara ortográfica a olhar para baixo; sem rotação; arrastar = mover
var boxOrto=null;
function ortoEnquadrar(box){if(box)boxOrto=box;var b=boxOrto||bbox;if(!b)return;var c=new T.Vector3(),sz=new T.Vector3();b.getCenter(c);b.getSize(sz);var w=window.innerWidth,h=window.innerHeight,asp=w/h;
  var mx=Math.max(sz.x,0.1),mz=Math.max(sz.z,0.1);var half=Math.max(mx/asp,mz)*0.55;camOrto.left=-half*asp;camOrto.right=half*asp;camOrto.top=half;camOrto.bottom=-half;camOrto.zoom=1;camOrto.updateProjectionMatrix();
  camOrto.position.set(c.x,b.max.y+50,c.z);camOrto.up.set(0,0,-1);camOrto.lookAt(c.x,c.y,c.z);controls.target.set(c.x,c.y,c.z);controls.update();pedir();}
function vista(dois){vista2D=dois;camera=dois?camOrto:camPersp;controls.object=camera;controls.enableRotate=!dois;
  controls.mouseButtons={LEFT:dois?T.MOUSE.PAN:T.MOUSE.ROTATE,MIDDLE:T.MOUSE.DOLLY,RIGHT:dois?T.MOUSE.ROTATE:T.MOUSE.PAN};controls.touches={ONE:dois?T.TOUCH.PAN:T.TOUCH.ROTATE,TWO:T.TOUCH.DOLLY_PAN};
  sol.visible=!dois;sol2.visible=!dois;hemi.intensity=dois?2.6:1.1;hemi.groundColor.setHex(dois?0xffffff:0x9aa3ae);
  $('#bVista').classList.toggle('p',dois);$('#bVista').textContent=dois?'3D':'Planta 2D';
  if(dois){ortoEnquadrar(boxOrto||bbox);}else{camPersp.up.set(0,1,0);enquadrar(boxOrto||bbox);}
  pedir();}
$('#bVista').onclick=function(){if(!bbox)return;vista(!vista2D);};
$('#bWire').onclick=function(){arame=!arame;mats.concat(matsInst,Object.keys(cache).map(function(k){return cache[k];})).forEach(function(m){m.wireframe=arame;});matSel.wireframe=arame;this.classList.toggle('p',arame);pedir();};
$('#corte').oninput=function(){if(!bbox)return;var k=this.value/1000;var y=bbox.min.y+(bbox.max.y-bbox.min.y)*k;if(k>=0.999){corte.constant=1e9;$('#lblCorte').textContent='—';}else{corte.constant=y;$('#lblCorte').textContent=(y-bbox.min.y).toFixed(2)+' m';}pedir();};
$('#bPainel').onclick=function(){$('#painel').classList.toggle('fechado');};
ROOT.querySelectorAll('#tabs button').forEach(function(b){b.onclick=function(){mostrarPg(b.dataset.pg);};});
function mostrarPg(p){ROOT.querySelectorAll('#tabs button').forEach(function(b){b.classList.toggle('on',b.dataset.pg===p);});ROOT.querySelectorAll('.pg').forEach(function(d){d.classList.toggle('on',d.id==='pg-'+p);});$('#painel').classList.remove('fechado');}

// ---------- ficheiros ----------
function tratarFicheiros(fs){var glb=null,json=null;fs.forEach(function(f){if(/\.glb$|\.gltf$/i.test(f.name)){if(!glb||/^modelo\.glb$/i.test(f.name))glb=f;}else if(/\.json$/i.test(f.name)){if(!json||/^publicacao\.json$/i.test(f.name))json=f;}});
  if(json)carregarJSON(json);if(glb)carregarGLB(glb);if(!glb&&!json)aviso('Nenhum .glb ou .json entre os ficheiros escolhidos');
  if(glb&&!json)aviso('Sem publicacao.json ao lado — a ficha dos elementos fica sem artigo/quantidade',5000);}
async function abrirPasta(){
  if(!window.showDirectoryPicker){$('#fGlb').click();return;}
  try{var dir=await window.showDirectoryPicker({id:'publicacao'});var fs=[];for await(var ent of dir.values()){if(ent.kind==='file'&&/\.(glb|gltf|json)$/i.test(ent.name))fs.push(await ent.getFile());}
    if(!fs.length)return aviso('A pasta não tem modelo.glb nem publicacao.json');tratarFicheiros(fs);}catch(e){if(e&&e.name!=='AbortError')aviso('Não consegui abrir a pasta: '+e.message,5000);}}
$('#bAbrir').onclick=$('#bAbrir2').onclick=abrirPasta;
$('#bJson').onclick=$('#bAbrir3').onclick=function(){$('#fJson').click();};
$('#fGlb').onchange=$('#fJson').onchange=function(){tratarFicheiros(Array.prototype.slice.call(this.files));this.value='';};
['dragenter','dragover'].forEach(function(ev){ROOT.addEventListener(ev,function(e){e.preventDefault();$('#drop').classList.add('arr');});});
['dragleave','drop'].forEach(function(ev){ROOT.addEventListener(ev,function(e){e.preventDefault();$('#drop').classList.remove('arr');});});
ROOT.addEventListener('drop',function(e){
  var items=e.dataTransfer.items?Array.prototype.slice.call(e.dataTransfer.items):[];var dirs=items.map(function(i){return i.webkitGetAsEntry&&i.webkitGetAsEntry();}).filter(function(x){return x&&x.isDirectory;});
  if(dirs.length){var fs=[];var pend=0;dirs.forEach(function(d){pend++;d.createReader().readEntries(function(ents){ents.forEach(function(en){if(en.isFile&&/\.(glb|gltf|json)$/i.test(en.name)){pend++;en.file(function(f){fs.push(f);if(--pend===0)tratarFicheiros(fs);});}});if(--pend===0)tratarFicheiros(fs);});});return;}
  tratarFicheiros(Array.prototype.slice.call(e.dataTransfer.files));});
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
if(opts.titulo)$('#v3dTit').textContent=opts.titulo;
if(opts.onFechar){$('#bFechar').style.display='';$('#bFechar').onclick=function(){opts.onFechar();};}
if(opts.glbBuffer||opts.pub){$('#bAbrir').style.display='none';$('#bJson').style.display='none';$('#drop').style.display='none';}
if(opts.pub)aplicarPub_(opts.pub);
if(opts.glbBuffer)carregarGLBBuffer_(opts.glbBuffer,opts.nome,opts.bytes);
function desmontar(){vivo=false;try{controls.dispose();renderer.dispose();}catch(e){}ROOT.innerHTML='';ROOT.removeAttribute('id');}
var api={desmontar:desmontar,ST:ST,scene:scene,get camera(){return camera;},get vista2D(){return vista2D;},carregarGLB:carregarGLB,carregarJSON:carregarJSON,aplicarPub:aplicarPub_,selecionar:selecionar,versao:VERSAO};
window.__visor=api;return api;
var _ignorar={ST:ST,scene:scene,get camera(){return camera;},get vista2D(){return vista2D;},carregarGLB:carregarGLB,carregarJSON:carregarJSON,selecionar:selecionar,versao:VERSAO};

}
return {montar:montar,versao:VERSAO_VISOR};
})();
