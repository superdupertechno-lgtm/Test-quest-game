// 45-tutorial.js - Golden Star: Match Mayhem (Super Duper Techno)
const tutDone=()=>{try{return localStorage.getItem("vm_tut")=="1"}catch(e){return false}};
const sameMv=(a,b)=>TUTM&&((a[0]==TUTM.a[0]&&a[1]==TUTM.a[1]&&b[0]==TUTM.b[0]&&b[1]==TUTM.b[1])||(a[0]==TUTM.b[0]&&a[1]==TUTM.b[1]&&b[0]==TUTM.a[0]&&b[1]==TUTM.a[1]));
const TS=[{t:"COLORS",p:"◆ red: strike. ✚ green: heal. ■ blue: shield. ★ gold: charges Nova Strike. ⬢ purple: strike.",h:"#board"},
{t:"ENEMY TURNS",p:"The enemy thinks, then swaps tiles on the same board to hit you. Shield tiles block damage.",h:"#stage"},
{t:"WEAKNESS",p:"Match the glowing weakness color for bonus damage. It changes every turn.",h:"#weak"},
{t:"NOVA STRIKE",p:"Gold stars fill this meter. When it is full, tap it for a huge slow-motion attack.",h:"#ab"},
{t:"BIG MATCHES",p:"Match 4 for a color special, 5 clears a whole color, 6 or more throws a giant axe. Good luck.",h:"#board"}];
function showCard(t,p,hl,btn){const c=$("tcard");$("tt").textContent=t;$("tp").textContent=p;$("tn").style.display=btn?"inline-block":"none";
document.querySelectorAll(".tutHL").forEach(e=>e.classList.remove("tutHL"));let low=false;
if(hl){const el=document.querySelector(hl);el.classList.add("tutHL");low=el.getBoundingClientRect().top<innerHeight*.45}
if(low){c.style.top="auto";c.style.bottom="14px"}else{c.style.bottom="auto";c.style.top="max(10px,env(safe-area-inset-top))"}
c.classList.add("show");
return new Promise(res=>{$("tn").onclick=()=>{c.classList.remove("show");document.querySelectorAll(".tutHL").forEach(e=>e.classList.remove("tutHL"));res()};
$("tk").onclick=()=>{try{localStorage.setItem("vm_tut","1")}catch(e){}tutClear();c.classList.remove("show");res()}})}
function tutClear(){document.querySelectorAll(".hint").forEach(e=>e.classList.remove("hint"));const h=$("hand");if(h)h.remove();if(!TUTM)$("tcard").classList.remove("show");document.querySelectorAll(".tutHL").forEach(e=>e.classList.remove("tutHL"))}
function tutBegin(){tutStep=0;const mv=moves().sort((x,y)=>y.q.s.size-x.q.s.size);if(!mv.length)return;TUTM=mv[0];const[a,b]=[TUTM.a,TUTM.b];
g[a[0]][a[1]].el.classList.add("hint");g[b[0]][b[1]].el.classList.add("hint");
const h=document.createElement("div");h.id="hand";h.textContent="\u{1F446}";$("board").appendChild(h);
const P=(r,c)=>({left:(c+.5)*CS+"%",top:(r+.5)*CS+"%"});const A=P(a[0],a[1]),B=P(b[0],b[1]);
h.animate([{...A,opacity:0},{...A,opacity:1,offset:.18},{...A,opacity:1,offset:.3},{...B,opacity:1,offset:.65},{...B,opacity:1,offset:.85},{...B,opacity:0}],{duration:1900,iterations:Infinity,easing:"ease-in-out"});
showCard("YOUR FIRST MOVE","Drag one tile onto its neighbor (or tap one, then the other) to line up 3 of the same. Try the glowing tiles.",null,false)}
async function tutNext(){const S=TS[tutStep];if(!S)return;tutStep++;await showCard(S.t,S.p,S.h,true);if(tutStep>=TS.length)try{localStorage.setItem("vm_tut","1")}catch(e){}}
