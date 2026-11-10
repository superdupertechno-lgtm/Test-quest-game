// 40-dialogue.js - Golden Star: Match Mayhem (Super Duper Techno)
function type(t){const id=++_ty,el=$("ot");el.textContent="";let i=0;(function k(){if(id!=_ty)return;el.textContent=t.slice(0,++i);if(i%3==0)sfx("type");if(i<t.length)setTimeout(k,18)})();el.onclick=()=>{_ty++;el.textContent=t}}
function over(h,t,b,f){$("os").textContent="CASE FILE · DECLASSIFIED";$("oh").textContent=h;type(t);$("ob").textContent=b;$("ov").classList.add("show");$("ob").onclick=()=>{$("ov").classList.remove("show");f()}}
function typeTo(el,t){const id=++_td;el.textContent="";let i=0;typing=1;(function k(){if(id!=_td)return;el.textContent=t.slice(0,++i);if(i%3==0)sfx("type");if(i<t.length)setTimeout(k,16);else typing=0})();return()=>{_td++;el.textContent=t;typing=0}}
function scene(lines,done){let i=0,fin=null;const d=$("dlg");d.style.display="flex";
const nxt=()=>{if(i>=lines.length){d.style.display="none";d.onclick=null;done();return}
const[sp,tx]=lines[i++],m=SPK[sp];$("dn").textContent=m.n;$("dn").style.display=m.n?"inline-block":"none";
const im=$("dport");if(m.s){im.style.display="block";im.src=SP[m.s];im.style.transform=m.f?"scaleX(-1)":""}else im.style.display="none";
d.className=m.r?"r":"";$("dt").className=sp=="nar"?"nar":"";fin=typeTo($("dt"),tx)};
d.onclick=e=>{if(e.target.id=="dsk")return;if(typing){fin();return}nxt()};
$("dsk").onclick=()=>{_td++;typing=0;d.style.display="none";d.onclick=null;done()};nxt()}
