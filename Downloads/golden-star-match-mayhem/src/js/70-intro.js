// 70-intro.js - Golden Star: Match Mayhem (Super Duper Techno)
function intro(){const R=document.documentElement.style;R.setProperty("--r1","0.8187");R.setProperty("--r2","1.2190");R.setProperty("--m","url("+MASK+")");
["pS","pJ","pT"].forEach((id,i)=>$(id).src=IMGS[i]);
for(let i=0;i<16;i++){const d=document.createElement("i");d.className="sp";d.style.left=(8+Math.random()*84)+"%";d.style.top=(35+Math.random()*50)+"%";d.style.animationDelay=(Math.random()*3.5)+"s";$("sparks").appendChild(d)}
["SDG","SDS","SDPD","SDSM","SDN","SDAI","SDE","SDRD"].forEach(n=>{const b=document.createElement("b");b.textContent=n;$("nodes").appendChild(b)});
const T=[],at=(ms,fn)=>T.push(setTimeout(fn,ms)),wait=ms=>new Promise(r=>setTimeout(r,ms));let ended=0;
function typeIn(el,txt,ms,cls,quiet){return new Promise(r=>{let i=0;(function k(){if(ended)return r();const c=txt[i];el.insertAdjacentHTML("beforeend",cls&&cls[i]?"<span class='"+cls[i]+"'>"+c+"</span>":c);if(!quiet)sfx("type");if(++i<txt.length)setTimeout(k,ms);else r()})()})}
function endIntro(){if(ended)return;ended=1;T.forEach(clearTimeout);const e=$("intro");e.style.transition="opacity .6s";e.style.opacity=0;setTimeout(()=>{e.style.display="none";showMenu()},600)}
$("iskip").onclick=endIntro;
$("itap").onclick=()=>{$("itap").style.display="none";ac();$("intro").classList.add("on");sfx("swell");
at(200,()=>{$("s1").classList.add("on");let p=0;const iv=setInterval(()=>{p=Math.min(100,p+4);$("lfill").style.width=p+"%";$("lpct").textContent=p+"%";if(p%20==0)tone(300+p*6,.05,"square",.04);if(p>=100)clearInterval(iv)},48)});
at(1700,async()=>{const L=["> connecting 10.0.1.00 ....... OK","> NETWORK STATUS ......... ONLINE","> UPLINK STRENGTH ........ 100%","> SESSION ........... ENCRYPTED","> eight nodes detected"];for(const t of L){if(ended)return;$("tlog").insertAdjacentHTML("beforeend",$("tlog").textContent?"\n":"");await typeIn($("tlog"),t,9,null,true);tone(900,.03,"square",.04);await wait(120)}
const nb=[...$("nodes").children];for(const b of nb){if(ended)return;b.classList.add("on");tone(500+nb.indexOf(b)*60,.06,"triangle",.06);await wait(80)}});
at(4100,()=>{$("grant").classList.add("go");$("term").classList.add("off");sfx("ping");sfx("hit");vib([30,20,60])});
at(4900,()=>{$("brand").classList.add("on")});
at(5200,()=>$("pS").classList.add("go"));at(5450,()=>$("pJ").classList.add("go"));at(5700,()=>$("pT").classList.add("go"));
at(6100,()=>{sfx("hit");vib(15)});at(6350,()=>{sfx("hit");vib(15)});at(6600,()=>{sfx("hit");vib(30)});
at(6800,()=>{$("ring").classList.add("go");$("sdt").classList.add("glow");$("sdt").classList.add("glitch");sfx("boom");sfx("chime");vib([30,20,60])});
at(7300,async()=>{await typeIn($("sdtn"),"SUPER DUPER TECHNO",65,{0:"r",6:"g",12:"bl"});$("inn").style.opacity=1;sfx("ping")});
at(9300,()=>{$("iflash").animate([{opacity:.85},{opacity:0}],{duration:600});$("s1").classList.remove("on");sfx("hit")});
at(9900,()=>{$("s2").classList.add("on");$("intro").classList.add("sparks")});
at(10500,()=>{$("vcm").classList.add("go");sfx("boom");sfx("super");vib([40,30,80])});
at(12100,()=>{$("vV").classList.remove("hide");$("vC").classList.remove("hide");sfx("ping")});
at(13000,async()=>{await typeIn($("vA"),"OLTA",200);$("vsp").style.width=".7em";await wait(500);await typeIn($("vB"),"HRONICLES",150);await wait(300);await typeIn($("tag2"),"TWO CENTURIES. ZERO CLEAN HANDS.",45);$("st1").classList.add("on");sfx("hit");await wait(450);$("st2").classList.add("on");sfx("boom");vib(40)});
at(17400,()=>{sfx("win");$("gname").style.opacity=1;$("beta").style.opacity=1;$("iflash").animate([{opacity:.35},{opacity:0}],{duration:900})});
at(19800,endIntro)}}
