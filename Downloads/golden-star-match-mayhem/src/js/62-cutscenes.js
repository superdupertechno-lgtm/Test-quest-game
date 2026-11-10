// 62-cutscenes.js - tiny scripted cutscene engine (sprites, camera, captions) and the cutscenes
let cutOn=0,cutSkip=0,cutTap=0;
const cw=ms=>new Promise(r=>{let t=0;const iv=setInterval(()=>{t+=30;if(cutSkip||t>=ms){clearInterval(iv);r()}},30)});
// Step format: ["bg",theme] ["add",id,sprite,left%,flip,height%,bottom%] ["mv",id,left%,ms,"nb"?] ["air",id,bottom%,ms]
// ["fr",id,sprite] ["rot",id,deg] ["rm",id] ["w",ms] ["fl"] ["sh"] ["z",scale,ms] ["sfx",name] ["ttl",text,ms] ["cap",speaker,text]
const CUTS={
 open:[["bg","night"],["ttl","ARKEN CITY, 2006",1700],
  ["add","nova","nova",-14,0,30],["add","g1","g1_i0",-34,0,34],["sfx","swell"],
  ["mv","nova",56,1700,"nb"],["mv","g1",22,1900],
  ["cap","NOVA","Don't turn around. Don't turn around."],
  ["add","gs","gs_fly",118,1,36,64],["mv","gs",78,900,"nb"],["air","gs",20,900],["fr","gs","gs_idle"],["w",350],
  ["cap","GOLDEN STAR","She's busy. Talk to me."],
  ["fr","gs","gs_kick"],["mv","gs",36,320],["sfx","hit"],["fl"],["sh"],["fr","g1","g1_h"],["rot","g1",-75],["mv","g1",-30,550,"nb"],["w",500],
  ["fr","gs","gs_idle"],["z",1.12,1400],["w",900]],
 boss:[["bg","roof"],["ttl","THE ROOFTOP",1500],["add","gs","gs_idle",28,0,36],["sfx","swell"],["w",700],["fl"],["sfx","boom"],["sh"],["w",600],
  ["add","b","b_i0",125,0,50],["mv","b",74,2600,"nb"],["w",900],["sh"],["sfx","hit"],["w",800],["sh"],["sfx","hit"],["w",900],["z",1.15,1400],["w",600],["ttl","THE BOSS",1700]],
 end0:[["bg","dawn"],["add","gs","gs_idle",38,0,38],["add","nova","nova",64,0,30],["z",1.06,3200],["sfx","chime"],["w",1200],["ttl","DAYLIGHT",2000]],
 end1:[["bg","red"],["add","gs","gs_idle",50,0,38],["z",1.1,3000],["sfx","swell"],["w",1000],["mv","gs",132,2600,"nb"],["w",1000],["ttl","SHADOW FILE",2000]],
 end2:[["bg","gray"],["add","gs","gs_idle",50,0,38],["z",1.08,3000],["sfx","ping"],["w",1400],["ttl","OPEN CASE",2000]]};
async function cstep(s){const A=id=>document.getElementById("ca_"+id);
 switch(s[0]){
  case"bg":$("cbg").className=s[1];break;
  case"add":{const el=document.createElement("div");el.className="ca";el.id="ca_"+s[1];el.style.left=s[3]+"%";el.style.height=(s[5]||34)+"%";el.style.bottom=(s[6]==null?20:s[6])+"%";
    const im=document.createElement("img");im.src=SP[s[2]];if(s[4])im.style.transform="scaleX(-1)";el.appendChild(im);$("cact").appendChild(el);break}
  case"mv":{const el=A(s[1]);if(!el)break;el.style.setProperty("--d",s[3]+"ms");el.classList.add("walk");el.style.left=s[2]+"%";
    if(s[4]=="nb"){setTimeout(()=>el.classList.remove("walk"),s[3]);break}await cw(s[3]);el.classList.remove("walk");break}
  case"air":{const el=A(s[1]);if(el){el.style.transition="left var(--d,1s) ease-in-out,bottom "+s[3]+"ms ease-in";el.style.bottom=s[2]+"%"}await cw(s[3]);break}
  case"fr":{const el=A(s[1]);if(el)el.querySelector("img").src=SP[s[2]];break}
  case"rot":{const el=A(s[1]);if(el){el.style.transition="transform .5s ease-out,left .5s ease-out";el.style.transform="translateX(-50%) rotate("+s[2]+"deg)"}break}
  case"rm":{const el=A(s[1]);if(el)el.remove();break}
  case"w":await cw(s[1]);break;
  case"fl":$("cfl").animate([{opacity:.9},{opacity:0}],{duration:500});break;
  case"sh":{const b=$("cbg");b.classList.remove("cshake");void b.offsetWidth;b.classList.add("cshake");vib(40);break}
  case"z":{const b=$("cbg");b.style.setProperty("--zd",s[2]+"ms");b.style.transform="scale("+s[1]+")";break}
  case"sfx":sfx(s[1]);break;
  case"ttl":{const t=$("cttl"),d=s[2]||1600;t.textContent=s[1];t.animate([{opacity:0,transform:"scale(1.2)"},{opacity:1,transform:"scale(1)",offset:.2},{opacity:1,offset:.8},{opacity:0}],{duration:d,fill:"forwards"});await cw(d);t.style.opacity=0;break}
  case"cap":{$("csp").textContent=s[1];const el=$("ctx");el.textContent="";cutTap=0;
    for(const c of s[2]){if(cutSkip)break;if(cutTap){break}el.textContent+=c;await cw(26)}
    el.textContent=s[2];cutTap=0;let t=0;while(t<1300&&!cutSkip&&!cutTap){await cw(60);t+=60}cutTap=0;break}
 }}
async function playCut(name,done){const S=CUTS[name];if(!S||cutOn)return done();
 cutOn=1;cutSkip=0;cutTap=0;setPaused(false);const c=$("cut");c.style.display="block";$("cact").innerHTML="";const bg=$("cbg");bg.className="night";bg.style.transform="";bg.style.setProperty("--zd","1.2s");
 $("ctx").textContent="";$("csp").textContent="";$("cttl").style.opacity=0;
 for(const s of S){if(cutSkip)break;try{await cstep(s)}catch(e){}}
 c.style.display="none";cutOn=0;done()}
function initCutscenes(){$("cut").onclick=()=>{cutTap=1};$("cskip").onclick=e=>{e.stopPropagation();cutSkip=1}}
