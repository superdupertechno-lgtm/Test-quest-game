// 99-main.js - Golden Star: Match Mayhem (Super Duper Techno)
try{snd=localStorage.getItem("vm_snd")!="0";hap=localStorage.getItem("vm_hap")!="0"}catch(e){}
$("ab").onclick=async()=>{if(ch<10||busy||paused)return;busy=true;ch=0;hud();const b=document.body;
b.classList.add("cine");sfx("super");vib([60,40,60,40,150]);pose("gs_super");$("pl").classList.add("big");await sl(500);$("title").classList.add("go");await sl(900);$("burst").classList.add("go");sfx("boom");vib([150,60,250]);
for(let i=0;i<3;i++){await sl(550);const d=Math.round((i<2?10:20)*(MD.sup||1));eh-=d;hitFx();sfx("hit");fl(d,"e");hud();shake()}
await sl(900);b.classList.remove("cine");$("pl").classList.remove("big");pose("gs_idle");$("title").classList.remove("go");$("burst").classList.remove("go");await sl(300);
if(eh<=0)return fin();await enemy();if(hp<=0)return lose();$("turn").textContent="YOUR MOVE";busy=false};
setT();
$("b5").onclick=()=>{snd=!snd;try{localStorage.setItem("vm_snd",snd?1:0)}catch(e){}setT();if(!snd)drone(-1);else if(inGame&&$("menu").style.display=="none")drone(Math.min(lv,2))};
$("b6").onclick=()=>{hap=!hap;try{localStorage.setItem("vm_hap",hap?1:0)}catch(e){}setT();if(hap)vib(40)};
document.addEventListener("pointerdown",()=>ac());
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("button"))sfx("click")});
setInterval(()=>{const f=$("fi");if(f.dataset.p=="i"&&!fdead&&f.src)f.src=SP[FS+"_i"+[0,1,2,1][fk++%4]];const p=$("pl");if(p.dataset.p=="gs_idle")p.src=SP["gs_i"+[0,1,2,3,2,1][gk++%6]]},200);
addEventListener("resize",layout);
addEventListener("orientationchange",()=>setTimeout(layout,250));
if(window.visualViewport)visualViewport.addEventListener("resize",layout);
layout();
addEventListener("popstate",e=>{const n=e.state&&e.state.n;
if(cutOn){history.pushState({n:"game"},"");cutSkip=1;return}
if(cur=="up"&&upReturn){history.pushState({n:"game"},"");back();return}
if(inPlay&&cur=="game"){history.pushState({n:"game"},"");show("pause");return}
if(cur=="pause"){history.pushState({n:"game"},"");show("game");return}
if(fromPause&&["settings","how","credits"].includes(cur)){fromPause=false;show("pause");return}
if(!n||(n=="game"&&!inPlay)){show("main");return}
show(n)});
history.replaceState({n:"main"},"");
$("mb").onclick=()=>{if(inPlay&&cur=="game")show("pause");else if(inPlay&&cur=="pause")show("game");else show("main")};
$("m1").onclick=()=>navGo("play");
$("m3").onclick=()=>navGo("settings");
$("m4").onclick=()=>navGo("how");
$("m5").onclick=()=>navGo("extras");
$("b11").onclick=()=>navGo("credits");
document.querySelectorAll(".bk").forEach(b=>b.onclick=back);
$("m2").onclick=cont;
$("b2").onclick=cont;
$("b1").onclick=()=>{F={trust:0,heat:0,mercy:0};mode="s";startPlay(()=>play(0))};
$("b7").onclick=()=>startPlay(startE);
$("b10").onclick=()=>{try{localStorage.removeItem("vm_tut")}catch(e){}F={trust:0,heat:0,mercy:0};mode="s";startPlay(()=>play(0))};
$("b8").onclick=()=>{const d=document;try{if(d.fullscreenElement)d.exitFullscreen();else d.documentElement.requestFullscreen()}catch(e){}};
if(!document.documentElement.requestFullscreen)$("b8").style.display="none";
$("b9").onclick=()=>{if(!rs){rs=1;$("b9").textContent="Tap again to confirm reset";setTimeout(()=>{rs=0;$("b9").textContent="Reset progress"},3000);return}rs=0;["vm_st","vm_tut","vm_best","vm_pr"].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});PR=defPR();$("b9").textContent="Progress reset";setTimeout(()=>$("b9").textContent="Reset progress",1500);show(cur)};
$("p1").onclick=()=>show("game");
$("p2").onclick=()=>{show("game");start(true,CUR)};
$("p3").onclick=()=>{fromPause=true;navGo("settings")};
$("p4").onclick=()=>{fromPause=true;navGo("how")};
$("p5").onclick=()=>{inPlay=false;inGame=false;fromPause=false;show("main")};
document.addEventListener("visibilitychange",()=>{if(document.hidden&&inPlay&&cur=="game")show("pause")});
setInterval(()=>{if(kcOn&&cur=="game")kcDraw()},300);
addEventListener("keydown",e=>{const M={ArrowUp:"up",w:"up",W:"up",ArrowDown:"down",s:"down",S:"down",ArrowLeft:"left",a:"left",A:"left",ArrowRight:"right",d:"right",D:"right",Enter:"ok"," ":"ok",Escape:"back",Backspace:"back",p:"start",P:"start"};const a=M[e.key];if(!a)return;
if(cur!="game"&&document.activeElement&&document.activeElement.tagName=="BUTTON"&&(a=="ok"))return;e.preventDefault();act(a)});
addEventListener("gamepadconnected",()=>{if(!gpOn){gpOn=1;gpLoop()}});
if("serviceWorker" in navigator&&location.protocol.indexOf("http")==0&&!/(^|\.)claude\.ai$/.test(location.hostname))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
initProgress();initCutscenes();
intro();
