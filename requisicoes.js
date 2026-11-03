// CRM_NT · requisicoes.js · REQUISIÇÕES DE MATERIAIS (v2026-11-02; mock validado mock_requisicoes_obra.html)
// Carregado à preguiça pelo app.html (REQ_VER). Fala só com a Edge (reqObra, reqArvore, reqCriar, reqAprovar, reqRecusar, reqCancelar,
// reqEncomendar, reqReceber, reqFecharFalta, reqFotoGuia, reqFila). Sem preços. Notificações só com o número (regra AU-16).
//   Req.obra(el, cod, {callSec})  · separador «Requisições» do cartão da obra (e «Material» do Encarregado)
//   Req.fila(el, {callSec})       · fila do Aprovisionamento / Admin (todas as obras)
window.Req=(function(){
'use strict';
var CSS='.rq{font-size:13px}.rq .rq-bar{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:4px 0 8px}.rq .rq-bar h3{margin:0 auto 0 0;font-size:15px;color:var(--navy,#163963)}'
+'.rq button{font:inherit;border:1px solid #c9d7e8;background:#fff;color:#1e4c84;border-radius:8px;padding:6px 11px;cursor:pointer}.rq button.p{background:#1e4c84;color:#fff;border-color:#1e4c84}.rq button.x{color:#b42318;border-color:#f0b8b0}.rq button:disabled{opacity:.45;cursor:default}.rq button.sm{padding:3px 8px;font-size:12px}'
+'.rq input,.rq select{font:inherit;border:1px solid #c9d7e8;border-radius:7px;padding:5px 7px;background:#fff;max-width:100%}.rq input[type=number]{width:86px;text-align:right}'
+'.rq .chips{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}.rq .chip{border-radius:16px;padding:4px 11px}.rq .chip.on{background:#1e4c84;color:#fff;border-color:#1e4c84}.rq .chip b{margin-left:4px}'
+'.rq table{border-collapse:collapse;width:100%;font-size:12.5px}.rq th{background:#f4f7fb;color:#163963;text-align:right;padding:5px 7px;border-bottom:1px solid #c9d7e8;font-weight:600;white-space:nowrap}.rq td{padding:6px 7px;border-bottom:1px solid #eef1f5;text-align:right;vertical-align:middle}.rq td.l,.rq th.l{text-align:left}'
+'.rq tr.clk{cursor:pointer}.rq tr.clk:hover td{background:#f6f9fd}.rq tr.atr td{color:#b42318}.rq .tw{overflow-x:auto}'
+'.rq .tag{display:inline-block;border-radius:10px;padding:1px 8px;font-size:11px;background:#eef3f9;color:#1e4c84;white-space:nowrap}.rq .tag.w{background:#fff3cd;color:#664d03}.rq .tag.g{background:#e6f4ea;color:#1e6b34}.rq .tag.r{background:#fde2e2;color:#8a1c1c}.rq .tag.n{background:#eef0f3;color:#6c757d}.rq .tag.v{background:#ece4f6;color:#5b3d86}.rq .tag.b{background:#dfeafa;color:#1b4f8f}'
+'.rq .al{border-radius:9px;padding:7px 10px;margin:8px 0;font-size:12.5px}.rq .al.w{background:#fff3cd;border:1px solid #f0d58c;color:#664d03}.rq .al.i{background:#eef4fb;border:1px solid #c9d7e8}'
+'.rq .bar{height:6px;border-radius:3px;background:#e7edf5;overflow:hidden;width:90px;display:inline-block;vertical-align:middle}.rq .bar i{display:block;height:6px;background:#2e9e4f}'
+'.rq .kv{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;margin:6px 0}.rq .kv div:nth-child(odd){color:#6c757d}'
+'.rq .dois{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:12px}.rq .dois>div{min-width:0}.rq .tw{max-width:100%}@media (max-width:900px){.rq .dois{grid-template-columns:minmax(0,1fr)}}@media (max-width:640px){.rq .mh{display:none}.rq td,.rq th{padding:5px 4px}}'
+'.rq .tl{list-style:none;margin:6px 0 0;padding:0}.rq .tl li{display:flex;gap:9px;padding:0 0 9px;font-size:12.5px}.rq .tl li::before{content:"";flex:0 0 9px;height:9px;border-radius:50%;background:#1e4c84;margin-top:5px}.rq .tl li span{color:#6c757d}'
+'.rq .frm{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin:6px 0 10px}.rq .lbl{font-size:12px;color:#6c757d;display:block;margin-bottom:2px}'
+'.rq .arv{border:1px solid #c9d7e8;border-radius:9px;padding:6px 8px;max-height:420px;overflow:auto}.rq .arv .no{display:flex;align-items:center;gap:4px;padding:2px 0}.rq .arv .tv{width:18px;cursor:pointer;color:#1e4c84;text-align:center}.rq .arv label{cursor:pointer;display:inline-flex;gap:5px;align-items:center}'
+'.rq input[type=checkbox]{width:auto;height:auto;margin:0;padding:0;flex:0 0 auto;accent-color:#1e4c84;cursor:pointer}.rq .arv{max-height:62vh;padding:6px 10px}.rq .arv .no{gap:2px;padding:3px 0}.rq .arv label{display:flex;flex:1;min-width:0;gap:7px;align-items:center;margin:0;font-size:12.5px;font-weight:400;color:#1f2937;text-transform:none;letter-spacing:0;text-align:left}.rq .arv .cod{color:#6c757d;white-space:nowrap;font-variant-numeric:tabular-nums}.rq .arv .ds{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rq .arv .no.i:hover{background:#f6f9fd}.rq .dois.rq3d{grid-template-columns:minmax(0,1fr) minmax(0,1.3fr)}.rq .fams{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:6px 0}.rq .fams>span{font-size:12px;color:#6c757d;margin-right:2px}.rq label.fam{display:inline-flex;gap:6px;align-items:center;border:1px solid #c9d7e8;border-radius:16px;padding:4px 11px;cursor:pointer;margin:0;font-size:12.5px;font-weight:600;color:#1e4c84;text-transform:none;letter-spacing:0;background:#fff}.rq label.fam.on{background:#eef4fb;border-color:#1e4c84}.rq label.fam small{font-weight:400;color:#6c757d}.rq tr.fg td{background:#f4f7fb;color:#163963;font-weight:600;text-align:left;padding:4px 7px;font-size:12px}.rq tr.off td{color:#9aa3ae}.rq td.nw{white-space:nowrap}.rq .mo{display:none}@media (max-width:900px){.rq .dois.rq3d{grid-template-columns:minmax(0,1fr)}.rq .arv{max-height:42vh}}@media (max-width:640px){.rq .arv .cod{display:none}.rq .arv .ds{white-space:normal;line-height:1.3}.rq .arv .no.i{padding-left:44px!important}.rq .t3 .mh2{display:none}.rq .t3 .mo{display:block}.rq .t3 input[type=number]{width:74px}}'
+'.rq .hint{color:#6c757d;font-size:12px}.rq .foto{border:2px dashed #c9d7e8;border-radius:10px;padding:14px;text-align:center;color:#6c757d;margin:8px 0;cursor:pointer;display:block}.rq .foto.ok{border-style:solid;border-color:#2e9e4f;color:#1e5b2e;background:#e6f4ea}'
+'.rq .lin{border-bottom:1px solid #eef1f5;padding:8px 0}.rq .lin .r{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:5px}.rq .seg button{padding:3px 9px;font-size:12px}.rq .seg button.on{background:#1e4c84;color:#fff;border-color:#1e4c84}';
function css_(){ if(!document.getElementById('rqCss')){ var s=document.createElement('style'); s.id='rqCss'; s.textContent=CSS; document.head.appendChild(s); } }
var esc=function(t){ return String(t==null?'':t).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
var n=function(v){ v=Number(v)||0; return (Math.round(v*100)/100).toLocaleString('pt-PT',{maximumFractionDigits:2}); };
var fd=function(d){ return d?String(d).slice(8,10)+'/'+String(d).slice(5,7):'—'; };
var hoje=function(){ return new Date().toISOString().slice(0,10); };
var nat=function(a,b){ return String(a).localeCompare(String(b),'pt',{numeric:true}); };
var EST={por_aprovar:['Por aprovar','w'],por_encomendar:['Por encomendar','v'],encomendada:['Encomendada','b'],parcial:['Receção parcial','b'],recebida:['Recebida','g'],fechada_falta:['Fechada com falta','g'],recusada:['Recusada','r'],cancelada:['Cancelada','n']};
var VIVAS=['por_aprovar','por_encomendar','encomendada','parcial'];
function tag(r){ var e=EST[r.estado]||[r.estado,'n']; return '<span class="tag '+e[1]+'">'+e[0]+'</span>'+(r.atrasada?' <span class="tag r">atrasada</span>':''); }
function prog(r){ if(!r.encomenda) return null; var t=0,f=0; r.linhas.forEach(function(l){ if(l.fechada) return; t+=Number(l.guia_qtd||0); f+=Math.min(Number(l.qtd_recebida),Number(l.guia_qtd||0)); }); return t?Math.round(f/t*100):100; }
function guiaProposta(l){ var q=Number(l.qtd_aprovada)||0; if(/^placa/i.test(l.codigo||'')) return ['placa 1,2×2,6',Math.ceil(q/3.12)]; if(/^isol/i.test(l.codigo||'')) return ['rolo 7,2 m²',Math.ceil(q/7.2)]; if(l.unidade==='ml') return ['barra 3 m',Math.ceil(q/3)]; return [l.unidade,Math.ceil(q)]; }
// foto da guia: reduz para ~1600 px JPEG (≈300 KB) antes de enviar
function reduzFoto(file){ return new Promise(function(res,rej){ var fr=new FileReader(); fr.onerror=rej; fr.onload=function(){ var im=new Image(); im.onerror=rej; im.onload=function(){ var M=1600, k=Math.min(1,M/Math.max(im.width,im.height)); var c=document.createElement('canvas'); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext('2d').drawImage(im,0,0,c.width,c.height); res(c.toDataURL('image/jpeg',0.7)); }; im.src=fr.result; }; fr.readAsDataURL(file); }); }

// ======================= separador da obra =======================
function abrevDesc(d){var s=String(d||'').replace(/\s+/g,' ').trim();var m=s.match(/^([^a-zà-ÿ]{6,}?)\s+(?=[A-ZÀ-Ý][a-zà-ÿ])/);if(m)s=m[1];else{var k=s.search(/\s(?:Fornecimento|Execução|Execucao|Aplicação|Aplicacao|Maior valia|Inclui|Inclusive|Revestimento|Constituíd|Formad)/);if(k>6)s=s.slice(0,k);}s=s.replace(/\s*\bLM\d+\b(?=\s*(?:\+|$))/g,'').replace(/(\bM\d+)\/\d+/g,'$1').replace(/\s*\+\s*/g,'+').replace(/\s{2,}/g,' ').trim();if(s.length>60)s=s.slice(0,58).trim()+'…';return s;}
var FAMS=['Estrutura','Placas','Isolamento','Outros'], FAM_DE={canal:'Estrutura',montante:'Estrutura',tecto:'Estrutura',perfil:'Estrutura',estrutura:'Estrutura',placa:'Placas',placas:'Placas',isolamento:'Isolamento'};
function obra(el, cod, opts){
  css_(); opts=opts||{}; var call=opts.callSec; var S={cod:cod,filtro:'vivas',vista:'lista',sel:null,nova:null,arv:null,modo:'3d',rec:null,d:null};
  el.innerHTML='<div class="rq"><div class="hint">A carregar as requisições…</div></div>';
  function carregar(depois){ return call('reqObra',cod).then(function(d){ if(!d||!d.ok){ el.innerHTML='<div class="rq"><div class="hint">'+esc((d&&d.erro)||'Sem acesso.')+'</div></div>'; return; } S.d=d; if(depois) depois(); desenha(); }).catch(function(){ el.innerHTML='<div class="rq"><div class="hint">Erro de ligação.</div></div>'; }); }
  function desenha(){ var h=S.vista==='nova'?vNova():S.vista==='ficha'?vFicha():S.vista==='receber'?vReceber():vLista(); el.innerHTML='<div class="rq">'+h+'</div>'; liga(); el.querySelectorAll('input[data-ind]').forEach(function(i){ i.indeterminate=true; }); }
  function vLista(){ var d=S.d, rs=d.reqs;
    var G=[['vivas','Em curso',rs.filter(function(r){ return VIVAS.indexOf(r.estado)>=0; })],['por_aprovar','Por aprovar',rs.filter(function(r){ return r.estado==='por_aprovar'; })],['por_encomendar','Por encomendar',rs.filter(function(r){ return r.estado==='por_encomendar'; })],
           ['receber','Por receber',rs.filter(function(r){ return r.estado==='encomendada'||r.estado==='parcial'; })],['fechadas','Fechadas',rs.filter(function(r){ return VIVAS.indexOf(r.estado)<0; })],['todas','Todas',rs]];
    var g=G.filter(function(x){ return x[0]===S.filtro; })[0]||G[0];
    var h='<div class="rq-bar"><h3>Requisições</h3>'+(d.pode.pedir?'<button class="p" data-a="nova">＋ Nova requisição</button>':'<span class="hint">'+(d.papel==='Aprovisionamento'?'O Aprovisionamento não pede: encomenda e regista o que vem.':'')+'</span>')+'</div>';
    h+='<div class="chips">'+G.map(function(x){ return '<button class="chip'+(x[0]===g[0]?' on':'')+'" data-f="'+x[0]+'">'+x[1]+'<b>'+x[2].length+'</b></button>'; }).join('')+'</div>';
    if(!g[2].length) return h+'<div class="hint">Nada neste filtro.</div>';
    h+='<div class="tw"><table><thead><tr><th class="l">N.º</th><th class="l">Estado</th><th class="l">Pedida por</th><th>Pedida</th><th>Para</th><th>Linhas</th><th class="l">Recebido</th></tr></thead><tbody>';
    g[2].forEach(function(r){ var p=prog(r); h+='<tr class="clk'+(r.atrasada?' atr':'')+'" data-r="'+r.id+'"><td class="l"><b>'+esc(r.ref)+'</b><div class="hint">'+esc(r.origem||'')+'</div></td><td class="l">'+tag(r)+'</td><td class="l">'+esc(r.pedido_por)+'</td><td>'+fd(r.pedido_em)+'</td><td>'+fd(r.para)+'</td><td>'+r.linhas.length+'</td><td class="l">'+(p==null?'<span class="hint">—</span>':'<span class="bar"><i style="width:'+p+'%"></i></span> '+p+'%')+'</td></tr>'; });
    return h+'</tbody></table></div><div class="hint" style="margin-top:6px">«Para» é a data em que a obra precisa do material; fica a vermelho quando passa e o material ainda não chegou.</div>';
  }
  // ---------- nova ----------
  function folhas(path){ var A=S.arv.arv, L=[]; Object.keys(A).forEach(function(b){ if(path[0]&&b!==path[0]) return; Object.keys(A[b]).forEach(function(p){ if(path[1]&&p!==path[1]) return; Object.keys(A[b][p]).forEach(function(t){ if(path[2]&&t!==path[2]) return; Object.keys(A[b][p][t]).forEach(function(i){ L.push([b,p,t,i].join('|')); }); }); }); }); return L; }
  function ck(path){ var L=folhas(path), k=L.filter(function(x){ return S.nova.sel[x]; }).length; return k===0?'':k===L.length?'checked':'data-ind="1"'; }
  function matsSel(){ var A=S.arv.arv, ag={}; Object.keys(S.nova.sel).forEach(function(k){ var p=k.split('|'); var m=A[p[0]][p[1]][p[2]][p[3]]||{}; Object.keys(m).forEach(function(c){ var a=ag[c]||(ag[c]={cod:c,liq:0,ja:0,orig:{}}); var ja=Math.min(m[c],Number(S.arv.ja[k+'|'+c]||0)); a.liq+=m[c]; a.ja+=ja; var f=Math.max(0,m[c]-ja); if(f>0) a.orig[k]=f; }); }); return Object.keys(ag).sort(nat).map(function(c){ return ag[c]; }); }
  function famDe(c){ var m=(S.arv&&S.arv.mats[c])||{}; return FAM_DE[String(m.familia||'').toLowerCase()]||'Outros'; }
  function valor(m){ var falta=Math.max(0,Math.round((m.liq-m.ja)*100)/100); if(S.nova.famOff&&S.nova.famOff[famDe(m.cod)]) return 0; return S.nova.prop[m.cod]!==undefined?S.nova.prop[m.cod]:falta; }
  function caminho(){ var bs={}; Object.keys(S.nova.sel).forEach(function(k){ var p=k.split('|'); ((bs[p[0]]=bs[p[0]]||{})[p[1]]=bs[p[0]][p[1]]||{})[p[2]]=1; }); return Object.keys(bs).sort(nat).map(function(b){ return b+' › '+Object.keys(bs[b]).sort(nat).map(function(p){ return p+' ('+Object.keys(bs[b][p]).join('/')+')'; }).join(', '); }).join(' · '); }
  function arvore(){ var A=S.arv.arv, ab=S.nova.ab, h='<div class="arv">';
    Object.keys(A).sort(nat).forEach(function(b){ var ob=ab[b]; h+='<div class="no"><span class="tv" data-ab="'+esc(b)+'">'+(ob?'▾':'▸')+'</span><label><input type="checkbox" '+ck([b])+' data-ck="'+esc(b)+'"> <b>'+esc(b)+'</b></label></div>'; if(!ob) return;
      Object.keys(A[b]).sort(nat).forEach(function(p){ var ip=b+'|'+p, op=ab[ip]; h+='<div class="no" style="padding-left:20px"><span class="tv" data-ab="'+esc(ip)+'">'+(op?'▾':'▸')+'</span><label><input type="checkbox" '+ck([b,p])+' data-ck="'+esc(ip)+'"> '+esc(p)+'</label></div>'; if(!op) return;
        Object.keys(A[b][p]).sort(nat).forEach(function(t){ var it=ip+'|'+t, ot=ab[it]; h+='<div class="no" style="padding-left:40px"><span class="tv" data-ab="'+esc(it)+'">'+(ot?'▾':'▸')+'</span><label><input type="checkbox" '+ck([b,p,t])+' data-ck="'+esc(it)+'"> '+esc(t)+'</label></div>'; if(!ot) return;
          Object.keys(A[b][p][t]).sort(nat).forEach(function(i){ var k=it+'|'+i; h+='<div class="no i" style="padding-left:62px"><label title="'+esc(i+' · '+(S.arv.arts[i]||''))+'"><input type="checkbox" '+(S.nova.sel[k]?'checked':'')+' data-lf="'+esc(k)+'"><span class="cod">'+esc(i)+'</span><span class="ds">'+esc(abrevDesc(S.arv.arts[i]))+'</span></label></div>'; }); }); }); });
    return h+'</div>'; }
  function vNova(){ var N=S.nova, d=S.d, h='<div class="rq-bar"><button class="sm" data-a="voltar">← Requisições</button><h3>Nova requisição</h3></div>';
    h+='<div class="al i">'+(d.papel==='Encarregado'?'Pedida pelo <b>Encarregado</b>: vai para <b>aprovação do DO</b>, que pode corrigir as quantidades.':'Pedida pelo <b>'+esc(d.papel)+'</b>: segue <b>direto para o Aprovisionamento</b>.')+'</div>';
    h+='<div class="chips">'+(d.tem_3d?'<button class="chip'+(S.modo==='3d'?' on':'')+'" data-modo="3d">Da preparação 3D</button>':'')+'<button class="chip'+(S.modo==='livre'||!d.tem_3d?' on':'')+'" data-modo="livre">Outro material (texto livre)</button></div>';
    if(S.modo==='3d'&&d.tem_3d){
      if(!S.arv) h+='<div class="hint">A carregar a estrutura do desenho…</div>';
      else { var M=matsSel(); h+='<div class="dois rq3d"><div><div class="hint">Marca um bloco, um piso, paredes/tetos ou artigos soltos. Marcar o pai marca tudo o que está por baixo.</div>'+arvore()+'</div><div>';
        if(!Object.keys(N.sel).length) h+='<div class="hint">Nada marcado.</div>';
        else { var G={}; M.forEach(function(a){ (G[famDe(a.cod)]=G[famDe(a.cod)]||[]).push(a); }); var off=N.famOff||{};
          h+='<div class="hint">'+esc(caminho())+'</div><div class="fams"><span>Pedir:</span>'+FAMS.filter(function(f){ return G[f]; }).map(function(f){ var on=!off[f]; return '<label class="fam'+(on?' on':'')+'"><input type="checkbox" '+(on?'checked':'')+' data-fam="'+f+'"> '+f+' <small>'+G[f].length+'</small></label>'; }).join('')+'</div>';
          h+='<div class="tw"><table class="t3" style="margin-top:4px"><thead><tr><th></th><th class="l">Material</th><th class="mh2">Líquido</th><th class="mh2">Já pedido</th><th>A pedir</th></tr></thead><tbody>';
          FAMS.filter(function(f){ return G[f]; }).forEach(function(f){ h+='<tr class="fg"><td colspan="5">'+f+(off[f]?' <span style="font-weight:400;color:#6c757d">— não pedir</span>':'')+'</td></tr>';
            G[f].forEach(function(a){ var falta=Math.max(0,Math.round((a.liq-a.ja)*100)/100), v=valor(a), m=S.arv.mats[a.cod]||{descricao:a.cod,unidade:''};
              h+='<tr'+(off[f]?' class="off"':'')+'><td><input type="checkbox" '+(v>0?'checked':'')+(off[f]?' disabled':'')+' data-pc="'+esc(a.cod)+'" data-falta="'+falta+'"></td><td class="l">'+esc(m.descricao)+' <span class="tag n">'+esc(a.cod)+'</span><div class="hint mo">líquido '+n(a.liq)+' '+esc(m.unidade)+(a.ja?' · já pedido '+n(a.ja):'')+'</div></td><td class="nw mh2">'+n(a.liq)+' '+esc(m.unidade)+'</td><td class="mh2">'+(a.ja?'<b style="color:#8a5a00">'+n(a.ja)+'</b>':'—')+'</td><td><input type="number" min="0" step="any" value="'+v+'"'+(off[f]?' disabled':'')+' data-pq="'+esc(a.cod)+'"></td></tr>'; }); });
          h+='</tbody></table></div>'+(M.some(function(a){ return a.ja>0; })?'<div class="al w">Parte deste material já está noutras requisições vivas desta obra. «A pedir» propõe só a diferença.</div>':'')+'<div style="margin-top:6px"><button class="p" data-a="j3d"'+(M.some(function(a){ return valor(a)>0; })?'':' disabled')+'>Juntar à requisição ↓</button></div>'; }
        h+='</div></div>'; }
    } else {
      h+='<div class="hint">Para o que não está no desenho (parafusos, fita, massa, buchas…) ou para obras sem 3D.</div><div class="frm"><label style="flex:1;min-width:200px"><span class="lbl">Material</span><input id="rqMat" list="rqSug" style="width:100%" placeholder="escreve ou escolhe…"></label>'
        +'<label><span class="lbl">Unidade</span><select id="rqUn">'+['un','m²','ml','kg','m³','cx','rolo','saco'].map(function(u){ return '<option>'+u+'</option>'; }).join('')+'</select></label><label><span class="lbl">Quantidade</span><input id="rqQ" type="number" min="0" step="any"></label><button class="p" data-a="jlivre">Juntar ↓</button></div>';
      var sug={}; S.d.reqs.forEach(function(r){ r.linhas.forEach(function(l){ if(!l.codigo) sug[l.material]=1; }); }); h+='<datalist id="rqSug">'+Object.keys(sug).sort().map(function(x){ return '<option value="'+esc(x)+'">'; }).join('')+'</datalist>';
    }
    h+='<h3 style="margin:14px 0 4px;font-size:14px;color:#163963">Requisição a enviar <span class="hint">('+N.linhas.length+' linha(s))</span></h3>';
    h+='<div class="frm"><label><span class="lbl">Para quando (obra precisa em)</span><input id="rqPara" type="date" value="'+N.para+'" min="'+hoje()+'"></label><label style="flex:1;min-width:200px"><span class="lbl">Nota (opcional)</span><input id="rqNota" style="width:100%" value="'+esc(N.nota)+'" placeholder="ex.: para os tetos do piso 2"></label></div>';
    h+='<div class="tw"><table><thead><tr><th class="l">Material</th><th class="l">Origem</th><th class="l">Un.</th><th>Quantidade</th><th></th></tr></thead><tbody>'
      +(N.linhas.map(function(l,i){ return '<tr><td class="l">'+esc(l.material)+(l.codigo?' <span class="tag n">'+esc(l.codigo)+'</span>':'')+'</td><td class="l"><span class="hint">'+esc(l.onde||'texto livre')+'</span></td><td class="l">'+esc(l.unidade)+'</td><td>'+n(l.qtd)+'</td><td><button class="sm x" data-rm="'+i+'">✕</button></td></tr>'; }).join('')||'<tr><td colspan="5" class="l hint">Ainda vazia.</td></tr>')+'</tbody></table></div>';
    h+='<div style="display:flex;gap:6px;justify-content:flex-end;margin-top:8px"><button data-a="voltar">Cancelar</button><button class="p" data-a="criar"'+(N.linhas.length?'':' disabled')+'>'+(d.papel==='Encarregado'?'Enviar ao DO':'Criar e enviar ao Aprovisionamento')+'</button></div>';
    return h; }
  // ---------- ficha ----------
  function R(){ return S.d.reqs.filter(function(x){ return x.id===S.sel; })[0]; }
  function vFicha(){ var r=R(); if(!r){ S.vista='lista'; return vLista(); } var d=S.d, P=d.pode, e=r.estado;
    var aprovar=e==='por_aprovar'&&P.aprovar, encomendar=e==='por_encomendar'&&P.encomendar, receber=(e==='encomendada'||e==='parcial')&&P.receber, fechar=(e==='encomendada'||e==='parcial')&&P.fechar;
    var cancelar=(e==='por_aprovar'&&d.papel==='Encarregado'&&r.pedido_por===d.eu)||((e==='por_aprovar'||e==='por_encomendar')&&P.aprovar);
    var h='<div class="rq-bar"><button class="sm" data-a="voltar">← Requisições</button><h3>'+esc(r.ref)+'</h3>'+tag(r)+'</div><div class="dois"><div>';
    h+='<div class="kv"><div>Pedida por</div><div>'+esc(r.pedido_por)+' · '+fd(r.pedido_em)+'</div><div>Origem</div><div>'+esc(r.origem||'')+'</div><div>Para quando</div><div>'+fd(r.para)+'</div>'+(r.nota?'<div>Nota</div><div>'+esc(r.nota)+'</div>':'')
      +(r.encomenda?'<div>Encomenda</div><div>'+esc(r.encomenda.erp)+' · '+esc(r.encomenda.fornecedor)+' · prevista '+fd(r.encomenda.prevista)+'</div>':'')+(r.recusa_motivo?'<div>Recusa</div><div style="color:#8a1c1c">'+esc(r.recusa_motivo)+'</div>':'')+'</div>';
    var mostraGuia=!!r.encomenda||encomendar;
    var mh=(r.encomenda&&!encomendar)?' mh':'';
    h+='<div class="tw"><table><thead><tr><th class="l">Material</th><th class="l'+mh+'">Un.</th><th class="'+mh+'">Pedido</th><th class="'+mh+'">Aprovado</th>'+(mostraGuia?'<th class="l">Vem na guia como</th><th>Qtd. guia</th><th>Recebido</th><th>Falta</th>':'')+'</tr></thead><tbody>';
    r.linhas.forEach(function(l){ var dif=Math.abs(l.qtd_aprovada-l.qtd_pedida)>1e-9;
      h+='<tr><td class="l">'+esc(l.material)+(l.codigo?' <span class="tag n">'+esc(l.codigo)+'</span>':'')+(l.fechada?' <span class="tag n">fechada com falta</span>':'')+(l.onde?'<div class="hint">'+esc(l.onde)+'</div>':'')+'</td><td class="l'+mh+'">'+esc(l.unidade)+'</td><td class="'+mh+'">'+n(l.qtd_pedida)+'</td>';
      h+='<td class="'+mh+'">'+(aprovar?'<input type="number" min="0" step="any" value="'+l.qtd_aprovada+'" data-ap="'+l.id+'">':(dif?'<b style="color:#8a5a00">'+n(l.qtd_aprovada)+'</b>':n(l.qtd_aprovada)))+'</td>';
      if(encomendar){ var g=guiaProposta(l); h+='<td class="l"><input data-gu="'+l.id+'" value="'+esc(g[0])+'" style="width:130px"></td><td><input type="number" min="0" step="any" data-gq="'+l.id+'" value="'+(Number(l.qtd_aprovada)>0?g[1]:0)+'"></td><td>—</td><td>—</td>'; }
      else if(r.encomenda){ var falta=Number(l.guia_qtd||0)-Number(l.qtd_recebida); h+='<td class="l">'+esc(l.guia_unidade||l.unidade)+'</td><td>'+n(l.guia_qtd)+'</td><td>'+n(l.qtd_recebida)+'</td><td>'+(l.fechada?'—':(falta>1e-9?'<b style="color:#8a1c1c">'+n(falta)+'</b>':'<span class="tag g">ok</span>'))+'</td>'; }
      h+='</tr>'; });
    h+='</tbody></table></div>';
    if(aprovar) h+='<div class="al w">Podes corrigir a coluna «Aprovado» antes de aprovar. O Encarregado vê o que mudou.</div>';
    if(encomendar) h+='<div class="frm"><label><span class="lbl">N.º da encomenda no ERP</span><input id="rqErp" style="width:150px"></label><label><span class="lbl">Fornecedor</span><input id="rqForn" style="width:200px"></label><label><span class="lbl">Entrega prevista</span><input id="rqPrev" type="date" value="'+esc(r.para)+'"></label></div><div class="al i">Recebes quantidades líquidas. A conversão e o desperdício fazem-se no ERP; aqui regista-se o que vem na guia (unidade de compra e quantidade), para quem recebe em obra saber o que contar.</div>';
    h+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">'+(aprovar?'<button class="p" data-a="aprovar">Aprovar</button><button class="x" data-a="recusar">Recusar…</button>':'')+(encomendar?'<button class="p" data-a="encomendar">Registar encomenda</button>':'')
      +(receber?'<button class="p" data-a="receber">Receber material</button>':'')+(fechar&&r.linhas.some(function(l){ return !l.fechada&&Number(l.qtd_recebida)<Number(l.guia_qtd||0); })?'<button data-a="fechar">Fechar o que falta…</button>':'')+(cancelar?'<button class="x" data-a="cancelar">Cancelar requisição</button>':'')
      +(!aprovar&&!encomendar&&!receber&&!fechar&&!cancelar?'<span class="hint">Nesta fase só consultas.</span>':'')+'</div></div>';
    h+='<div><h3 style="font-size:14px;color:#163963;margin:4px 0">Percurso</h3><ol class="tl">'+r.eventos.map(function(x){ return '<li><div><b>'+esc(x.texto)+'</b><br><span>'+fd(x.quando)+' · '+esc(x.quem)+'</span></div></li>'; }).join('')+'</ol>';
    if(r.rececoes.length) h+='<h3 style="font-size:14px;color:#163963;margin:10px 0 4px">Guias</h3>'+r.rececoes.map(function(x){ return '<div><button class="sm" data-foto="'+x.id+'">📷 '+esc(x.guia)+'</button> <span class="hint">'+fd(x.quando)+' · '+esc(x.quem)+'</span></div>'; }).join('')+'<div class="hint" style="margin-top:4px">A gestão documental passa a gerir estas fotos quando for integrada.</div>';
    return h+'</div></div>'; }
  // ---------- receber (telemóvel) ----------
  function vReceber(){ var r=R(), RC=S.rec; var h='<div class="rq-bar"><button class="sm" data-a="ficha">← '+esc(r.ref)+'</button><h3>Receber material</h3></div><div class="hint">'+esc(r.encomenda.fornecedor)+' · '+esc(r.encomenda.erp)+'</div>';
    h+='<label class="foto'+(RC.foto?' ok':'')+'">'+(RC.foto?'✔ Foto da guia tirada (toca para repetir)':'📷 Tirar foto da guia de remessa (obrigatório)')+'<input id="rqFoto" type="file" accept="image/*" capture="environment" style="display:none"></label>';
    h+='<label class="lbl">N.º da guia (obrigatório)</label><input id="rqGuia" value="'+esc(RC.guia)+'" placeholder="ex.: GR 88611" style="width:100%;padding:8px">';
    r.linhas.filter(function(l){ return !l.fechada&&Number(l.qtd_recebida)<Number(l.guia_qtd||0); }).forEach(function(l){ var s=RC.l[l.id], falta=Number(l.guia_qtd||0)-Number(l.qtd_recebida);
      h+='<div class="lin"><b>'+esc(l.material)+'</b><div class="hint">falta '+n(falta)+' × '+esc(l.guia_unidade||l.unidade)+'</div><div class="r seg">'+['tudo','parte','não veio'].map(function(o){ return '<button class="'+(s.o===o?'on':'')+'" data-op="'+l.id+'|'+o+'">'+o+'</button>'; }).join('')
        +(s.o==='parte'?' <input type="number" min="0" max="'+falta+'" step="any" value="'+s.q+'" data-rq="'+l.id+'"> <span class="hint">'+esc(l.guia_unidade||l.unidade)+'</span>':'')+'</div></div>'; });
    h+='<button class="p" data-a="confRec" style="width:100%;margin-top:10px;padding:10px"'+(RC.foto&&RC.guia?'':' disabled')+'>Confirmar receção</button><div class="hint" style="text-align:center;margin-top:4px">Sem foto e n.º da guia não confirma. Nunca recebe mais do que falta.</div>';
    return h; }
  // ---------- eventos ----------
  function aviso(r){ alert((r&&r.erro)||'Não foi possível.'); }
  function depois(r,vista){ if(!r||!r.ok){ aviso(r); return; } carregar(function(){ S.vista=vista||'ficha'; }); }
  function liga(){ var q=function(s){ return el.querySelectorAll(s); };
    q('[data-f]').forEach(function(b){ b.onclick=function(){ S.filtro=b.dataset.f; desenha(); }; });
    q('[data-r]').forEach(function(t){ t.onclick=function(){ S.sel=+t.dataset.r; S.vista='ficha'; desenha(); }; });
    q('[data-modo]').forEach(function(b){ b.onclick=function(){ S.modo=b.dataset.modo; desenha(); }; });
    q('[data-ab]').forEach(function(b){ b.onclick=function(){ var k=b.dataset.ab; S.nova.ab[k]=!S.nova.ab[k]; desenha(); }; });
    q('[data-ck]').forEach(function(c){ c.onclick=function(){ var L=folhas(c.dataset.ck.split('|')); var all=L.every(function(k){ return S.nova.sel[k]; }); L.forEach(function(k){ if(all) delete S.nova.sel[k]; else S.nova.sel[k]=1; }); S.nova.prop={}; desenha(); }; });
    q('[data-lf]').forEach(function(c){ c.onclick=function(){ var k=c.dataset.lf; if(S.nova.sel[k]) delete S.nova.sel[k]; else S.nova.sel[k]=1; S.nova.prop={}; desenha(); }; });
    q('[data-fam]').forEach(function(c){ c.onclick=function(){ var f=c.dataset.fam, o=S.nova.famOff=S.nova.famOff||{}; if(c.checked) delete o[f]; else o[f]=1; matsSel().forEach(function(m){ if(famDe(m.cod)===f) delete S.nova.prop[m.cod]; }); desenha(); }; });
    q('[data-pc]').forEach(function(c){ c.onclick=function(){ S.nova.prop[c.dataset.pc]=c.checked?+c.dataset.falta:0; desenha(); }; });
    q('[data-pq]').forEach(function(i){ i.onchange=function(){ S.nova.prop[i.dataset.pq]=Math.max(0,+i.value||0); desenha(); }; });
    q('[data-rm]').forEach(function(b){ b.onclick=function(){ S.nova.linhas.splice(+b.dataset.rm,1); desenha(); }; });
    var pa=el.querySelector('#rqPara'); if(pa) pa.onchange=function(){ S.nova.para=pa.value; }; var no=el.querySelector('#rqNota'); if(no) no.oninput=function(){ S.nova.nota=no.value; };
    q('[data-op]').forEach(function(b){ b.onclick=function(){ var p=b.dataset.op.split('|'); S.rec.l[p[0]].o=p[1]; desenha(); }; });
    q('[data-rq]').forEach(function(i){ i.oninput=function(){ S.rec.l[i.dataset.rq].q=+i.value||0; }; });
    var gu=el.querySelector('#rqGuia'); if(gu) gu.oninput=function(){ S.rec.guia=gu.value.trim(); var b=el.querySelector('[data-a=confRec]'); if(b) b.disabled=!(S.rec.foto&&S.rec.guia); };
    var fo=el.querySelector('#rqFoto'); if(fo) fo.onchange=function(){ var f=fo.files&&fo.files[0]; if(!f) return; reduzFoto(f).then(function(u){ S.rec.foto=u; desenha(); }).catch(function(){ alert('Não consegui ler a foto — volta a tentar.'); }); };
    q('[data-foto]').forEach(function(b){ b.onclick=function(){ var w=window.open('','_blank'); call('reqFotoGuia',cod,+b.dataset.foto).then(function(r){ if(r&&r.ok&&r.url){ if(w) w.location=r.url; else window.open(r.url,'_blank'); } else { if(w) w.close(); aviso(r); } }); }; });
    q('[data-a]').forEach(function(b){ b.onclick=function(){ acao(b.dataset.a); }; });
  }
  function acao(a){ var r=S.sel?R():null;
    if(a==='voltar'){ S.vista='lista'; S.nova=null; desenha(); return; }
    if(a==='ficha'){ S.vista='ficha'; desenha(); return; }
    if(a==='nova'){ var d7=new Date(Date.now()+7*864e5).toISOString().slice(0,10); S.nova={para:d7,nota:'',linhas:[],sel:{},prop:{},ab:{}}; S.vista='nova'; if(!S.d.tem_3d) S.modo='livre'; desenha();
      if(S.d.tem_3d&&!S.arv) call('reqArvore',cod).then(function(t){ if(t&&t.ok){ S.arv=t; var bs=Object.keys(t.arv).sort(nat); if(bs.length===1) S.nova.ab[bs[0]]=1; } else { S.modo='livre'; } desenha(); }); return; }
    if(a==='j3d'){ var onde=caminho(); matsSel().forEach(function(m){ var falta=Math.max(0,m.liq-m.ja), v=valor(m); if(!(v>0)) return; var f=falta?v/falta:0, orig={}; Object.keys(m.orig).forEach(function(k){ orig[k]=Math.round(m.orig[k]*f*1000)/1000; });
        var mt=S.arv.mats[m.cod]||{descricao:m.cod,unidade:''}; S.nova.linhas.push({material:mt.descricao,codigo:m.cod,unidade:mt.unidade==='m2'?'m²':mt.unidade,qtd:Math.round(v*100)/100,orig:orig,onde:onde}); }); S.nova.sel={}; S.nova.prop={}; desenha(); return; }
    if(a==='jlivre'){ var m=el.querySelector('#rqMat').value.trim(), qv=+el.querySelector('#rqQ').value; if(!m||!(qv>0)){ alert('Indica o material e a quantidade.'); return; } S.nova.linhas.push({material:m,unidade:el.querySelector('#rqUn').value,qtd:qv}); desenha(); return; }
    if(a==='criar'){ var N=S.nova; if(!N.para){ alert('Indica para quando a obra precisa do material.'); return; } call('reqCriar',cod,{para:N.para,nota:N.nota,linhas:N.linhas}).then(function(x){ if(!x||!x.ok){ aviso(x); return; } S.nova=null; carregar(function(){ S.sel=x.id; S.vista='ficha'; S.arv=null; }); }); return; }
    if(a==='aprovar'){ var ls=[]; el.querySelectorAll('[data-ap]').forEach(function(i){ ls.push({id:+i.dataset.ap,qtd_aprovada:+i.value}); }); call('reqAprovar',cod,r.id,{linhas:ls}).then(function(x){ depois(x); }); return; }
    if(a==='recusar'){ var mo=prompt('Motivo da recusa (o Encarregado vê):',''); if(!mo) return; call('reqRecusar',cod,r.id,{motivo:mo}).then(function(x){ depois(x); }); return; }
    if(a==='cancelar'){ if(!confirm('Cancelar a '+r.ref+'?')) return; call('reqCancelar',cod,r.id).then(function(x){ depois(x); }); return; }
    if(a==='encomendar'){ var ls2=r.linhas.map(function(l){ var u=el.querySelector('[data-gu="'+l.id+'"]'), g=el.querySelector('[data-gq="'+l.id+'"]'); return {id:l.id,guia_unidade:u?u.value:'',guia_qtd:g?+g.value:0}; });
      call('reqEncomendar',cod,r.id,{erp:el.querySelector('#rqErp').value,fornecedor:el.querySelector('#rqForn').value,prevista:el.querySelector('#rqPrev').value,linhas:ls2}).then(function(x){ depois(x); }); return; }
    if(a==='fechar'){ if(!confirm('Fechar as linhas que ainda não chegaram?\n\nO resto já não vem (ou já não é preciso). A requisição fica «Fechada com falta» e sai das listas «Por receber».')) return; call('reqFecharFalta',cod,r.id).then(function(x){ depois(x); }); return; }
    if(a==='receber'){ var L={}; r.linhas.forEach(function(l){ L[l.id]={o:'tudo',q:0}; }); S.rec={guia:'',foto:null,l:L}; S.vista='receber'; desenha(); return; }
    if(a==='confRec'){ var RC=S.rec, ls3=[]; r.linhas.forEach(function(l){ if(l.fechada) return; var s=RC.l[l.id], falta=Number(l.guia_qtd||0)-Number(l.qtd_recebida); if(falta<=1e-9) return; var qq=s.o==='tudo'?falta:s.o==='parte'?Math.min(Math.max(0,+s.q||0),falta):0; if(qq>0) ls3.push({id:l.id,qtd:qq}); });
      var b=el.querySelector('[data-a=confRec]'); if(b){ b.disabled=true; b.textContent='A enviar…'; }
      call('reqReceber',cod,r.id,{guia:RC.guia,foto_b64:RC.foto,linhas:ls3}).then(function(x){ if(!x||!x.ok){ aviso(x); if(b){ b.disabled=false; b.textContent='Confirmar receção'; } return; } S.rec=null; carregar(function(){ S.vista='ficha'; }); }); return; }
  }
  carregar();
  return { recarregar: function(){ carregar(); } };
}

// ======================= fila do Aprovisionamento =======================
function fila(el, opts){
  css_(); opts=opts||{}; var call=opts.callSec;
  el.innerHTML='<div class="rq"><div class="hint">A carregar a fila…</div></div>';
  function carregar(){ call('reqFila').then(function(d){ if(!d||!d.ok){ el.innerHTML='<div class="rq"><div class="hint">'+esc((d&&d.erro)||'Sem acesso.')+'</div></div>'; return; }
    var ord=['por_encomendar','encomendada','parcial','por_aprovar']; var l=d.reqs.slice().sort(function(a,b){ return ord.indexOf(a.estado)-ord.indexOf(b.estado)||String(a.para).localeCompare(String(b.para)); });
    var h='<div class="rq"><div class="rq-bar"><h3>Requisições · todas as obras</h3><button class="sm" data-a="rec">↻</button></div><div class="hint">Por ordem de urgência. As «Por aprovar» aparecem só para saberes o que vem a caminho.</div>';
    h+=l.length?'<div class="tw"><table style="margin-top:6px"><thead><tr><th class="l">Obra</th><th class="l">N.º</th><th class="l">Estado</th><th class="l">Pedida por</th><th>Para</th><th>Linhas</th><th class="l">Encomenda</th></tr></thead><tbody>'
      +l.map(function(r){ return '<tr class="clk'+(r.atrasada?' atr':'')+'" data-o="'+esc(r.obra_codigo)+'" data-r="'+r.id+'"><td class="l">'+esc(r.obra_codigo+' · '+(r.obra_nome||''))+'</td><td class="l"><b>'+esc(r.ref)+'</b></td><td class="l">'+tag(r)+'</td><td class="l">'+esc(r.pedido_por)+'</td><td>'+fd(r.para)+'</td><td>'+r.linhas.length+'</td><td class="l">'+(r.encomenda?esc(r.encomenda.erp)+' · '+fd(r.encomenda.prevista):'—')+'</td></tr>'; }).join('')+'</tbody></table></div>'
      :'<div class="hint" style="margin-top:8px">Não há requisições em curso.</div>';
    el.innerHTML=h+'</div>';
    el.querySelector('[data-a=rec]').onclick=carregar;
    el.querySelectorAll('[data-r]').forEach(function(t){ t.onclick=function(){ var host=document.createElement('div'); el.innerHTML='<div class="rq"><button class="sm" id="rqVolta" style="margin-bottom:6px">← Fila</button></div>'; el.appendChild(host); el.querySelector('#rqVolta').onclick=carregar;
      var o=obra(host,t.dataset.o,{callSec:call}); var alvo=+t.dataset.r; var tenta=0; (function abre(){ var b=host.querySelector('[data-r="'+alvo+'"]'); if(b){ b.click(); return; } if(++tenta<40) setTimeout(abre,100); })(); }; });
  }).catch(function(){ el.innerHTML='<div class="rq"><div class="hint">Erro de ligação.</div></div>'; }); }
  carregar();
}
return { obra: obra, fila: fila, versao: '2026-11-02-1' };
})();
