// 35-effects.js - Golden Star: Match Mayhem (Super Duper Techno)
const rc=e=>{const r=e.getBoundingClientRect(),q=$("stage").getBoundingClientRect();return{x:(r.left-q.left+r.width/2)/ZZ,y:(r.top-q.top+r.height/2)/ZZ}};
const pose=n=>{$("pl").dataset.p=n;$("pl").src=SP[n]};
function ring(x,y,big){sfx(big?"boom":"hit");const e=document.createElement("div");e.className="ring";e.style.left=x+"px";e.style.top=y+"px";$("fx").appendChild(e);e.animate([{transform:"scale(1)",opacity:1},{transform:"scale("+(big?8:4)+")",opacity:0}],{duration:big?600:350}).finished.then(()=>e.remove())}
function proj(cls,dur,arc,from,to){const a=from||rc($("pl")),b=to||rc($("foe")),e=document.createElement("div");e.className="pj "+cls;$("fx").appendChild(e);
const T=(x,y,r)=>"translate("+x+"px,"+y+"px) rotate("+r+"deg)";
const an=e.animate([{transform:T(a.x+30,a.y-10,0)},{transform:T((a.x+b.x)/2,a.y-10+arc,cls=="ax"?360:180)},{transform:T(b.x,b.y-10,cls=="ax"?720:360)}],{duration:dur,easing:"ease-in"});return an.finished.then(()=>e.remove())}
async function strike(len){const pl=$("pl"),a=rc(pl),b=rc($("foe"));sfx(len<=3?"kick":len==4?"blast":len==5?"sword":"axe");vib([[25],[20,20,35],[15,20,15,20,50],[40,30,80,30,120]][Math.min(len,6)-3]);
if(len<=3){pose("gs_kick");pl.style.transform="translateX("+(b.x-a.x-70)+"px)";await sl(230);ring(b.x-30,b.y);await sl(100);pl.style.transform=""}
else if(len==4){pose("gs_blast");await sl(180);await proj("orb",320,0);ring(b.x,b.y)}
else if(len==5){pose("gs_dash");await sl(160);await proj("sw",420,30);ring(b.x,b.y);await sl(140)}
else{pose("gs_fly");pl.classList.add("big");await sl(250);await proj("ax",650,-70);ring(b.x,b.y,1);shake();await sl(220);pl.classList.remove("big")}
pose("gs_idle")}
async function cameo(){const n=$("nv");n.src=SP.nova;n.animate([{opacity:0,transform:"translateX(-40px)"},{opacity:1,transform:"none"}],{duration:200,fill:"forwards"});await sl(220);sfx("shutter");vib([20,30,20]);$("flash").animate([{opacity:.9},{opacity:0}],{duration:350});await sl(350);n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards"})}
function hurt(){sfx("hurt");vib([60,40,80]);pose("gs_hurt");setTimeout(()=>pose("gs_idle"),380)}
async function lunge(){sfx("whoosh");fpose("a",450);const f=$("foe");f.classList.add("act");await sl(230);f.classList.remove("act")}
async function shot(){sfx("gun");fpose("a",500);const b=rc($("foe")),a=rc($("pl"));ring(b.x-45,b.y-20);await proj("bl",240,0,{x:b.x-80,y:b.y-10},{x:a.x+30,y:a.y})}
async function slam(){const bub=$("bub"),f=$("fi");bub.textContent="!!";bub.classList.add("on");sfx("ping");f.dataset.p="w";f.src=SP.b_w;$("log").textContent="THE BOSS RAISES HIS FISTS...";await sl(750);f.src=SP.b_s;sfx("boom");shake();const d=Math.round(18*L.k),ab=Math.min(sh,d);sh-=ab;hp-=d-ab;if(d-ab){fl(d-ab,"p");hurt();burn()}$("log").textContent="SLAM! "+(d-ab)+" damage"+(ab?" ("+ab+" blocked)":"");hud();await sl(650);bub.classList.remove("on");f.dataset.p="i"}
