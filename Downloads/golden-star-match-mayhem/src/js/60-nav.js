// 60-nav.js - Golden Star: Match Mayhem (Super Duper Techno)
const setT=()=>{$("b5").textContent="Sound: "+(snd?"ON":"OFF");$("b6").textContent="Vibration: "+(hap?"ON":"OFF")};
const PGS=["main","play","settings","how","extras","credits","up"];
function show(n){prevCur=cur;cur=n;const mn=PGS.includes(n);
$("menu").style.display=mn?"flex":"none";
if(mn){PGS.forEach(x=>$("pg-"+x).style.display=x==n?"flex":"none");const sv=!!loadS();$("m2").style.display=sv?"block":"none";$("b2").style.display=sv?"block":"none";$("mimg").src=ART;let b=0;try{b=+localStorage.getItem("vm_best")||0}catch(e){}$("b7").textContent="Endless mode"+(b?" (best "+b+")":"");drone(-1);if(n=="up")renderUp();if(n=="main")updBadge()}
$("pause").style.display=(n=="pause"||(mn&&fromPause))?"flex":"none";
setPaused(n=="pause"||(mn&&inPlay&&fromPause));
if(n=="pause")drone(-1);
if(n=="game"&&prevCur=="pause"&&inPlay)drone(Math.min(lv,2));
if(n!="game"&&n!="intro"){const root=n=="pause"?$("pause"):$("menu");const bs=[...root.querySelectorAll("button:not([disabled])")].filter(b=>b.offsetParent);if(bs.length&&matchMedia("(pointer:fine)").matches)bs[0].focus()}}
function navGo(n){history.pushState({n},"");show(n)}
function back(){if(cur=="game")return show("pause");if(cur=="pause")return show("game");if(cur=="up"&&upReturn){const f=upReturn;upReturn=null;show("game");return f()}
if(PGS.includes(cur)&&cur!="main"){if(history.state&&history.state.n==cur)history.back();else show(fromPause?"pause":"main")}}
function showMenu(){inPlay=false;inGame=false;fromPause=false;show("main")}
function startPlay(fn){inPlay=true;inGame=true;fromPause=false;history.pushState({n:"game"},"");show("game");fn()}
function kcDraw(){document.querySelectorAll(".t.kc").forEach(e=>e.classList.remove("kc"));if(kcOn&&g&&g[kc[0]]&&g[kc[0]][kc[1]])g[kc[0]][kc[1]].el.classList.add("kc")}
function act(a){if(cutOn){cutSkip=1;return}if(cur=="intro")return;
if(cur=="game"){if(a=="back"||a=="start")return show("pause");if(busy||paused)return;if(a=="ok"){kcOn=1;tap(kc);kcDraw();return}
const d={up:[-1,0],down:[1,0],left:[0,-1],right:[0,1]}[a];if(d){kcOn=1;kc=[Math.max(0,Math.min(N-1,kc[0]+d[0])),Math.max(0,Math.min(N-1,kc[1]+d[1]))];kcDraw()}return}
if(a=="back")return back();if(a=="start"&&cur=="pause")return show("game");
const root=cur=="pause"?$("pause"):$("menu"),bs=[...root.querySelectorAll("button:not([disabled])")].filter(b=>b.offsetParent),i=bs.indexOf(document.activeElement);if(!bs.length)return;
if(a=="up"||a=="left")bs[(i-1+bs.length)%bs.length].focus();else if(a=="down"||a=="right")bs[(i+1)%bs.length].focus();else if(a=="ok")(i>=0?bs[i]:bs[0]).click()}
function gpLoop(){const gp=navigator.getGamepads?navigator.getGamepads():[];for(const p of gp){if(!p)continue;const B=i=>p.buttons[i]&&p.buttons[i].pressed,st={ok:B(0),back:B(1),start:B(9),up:B(12)||p.axes[1]<-.6,down:B(13)||p.axes[1]>.6,left:B(14)||p.axes[0]<-.6,right:B(15)||p.axes[0]>.6};for(const k in st){if(st[k]&&!gpPrev[k])act(k);gpPrev[k]=st[k]}}requestAnimationFrame(gpLoop)}
