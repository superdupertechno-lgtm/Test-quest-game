// 10-core.js - Golden Star: Match Mayhem (Super Duper Techno)
const N=7,CS=100/N,$=i=>document.getElementById(i),sl=ms=>new Promise(res=>{let left=ms,last=performance.now();(function tick(){const n=performance.now();if(!paused)left-=n-last;last=n;if(left<=0)res();else setTimeout(tick,Math.min(30,Math.max(4,left)))})()});
const GL=["◆","✚","■","★","⬢"],COL=["var(--red)","var(--grn)","var(--blu)","var(--gold)","var(--pur)"];
const rnd=()=>Math.random()*5|0;
function save(){try{localStorage.setItem("vm_lv",lv)}catch(e){}}
function saved(){try{return Math.min(+localStorage.getItem("vm_lv")||0,LV.length-1)}catch(e){return 0}}
var ZZ=1,paused=false;
function layout(){const W=innerWidth,H=innerHeight;let z=1;if(Math.min(W,H)>=600)z=W>=H?Math.min(2.2,Math.max(1,H/700)):Math.min(2,Math.max(1,Math.min(W/480,H/800)));
const vW=W/z,vH=H/z,r=document.documentElement;ZZ=z;r.style.setProperty("--z",z);r.style.setProperty("--aw",vW+"px");r.style.setProperty("--ah",vH+"px");r.style.setProperty("--vw",vW/100+"px");r.style.setProperty("--vh",vH/100+"px");
const land=vW/vH>1.15;r.dataset.o=land?"l":"p";r.dataset.sh=(!land&&vH<=740)?"1":"0"}
function setPaused(p){paused=p;document.body.classList.toggle("paused",p)}
