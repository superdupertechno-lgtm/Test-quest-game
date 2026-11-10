// 20-audio.js - Golden Star: Match Mayhem (Super Duper Techno)
let NB=null,AC=null,snd=true,hap=true,DR=null;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state=="suspended")AC.resume();return AC}
function tone(f,d,ty,v,sl2,at){const c=ac();if(!c||!snd)return;const t=c.currentTime+(at||0),o=c.createOscillator(),g=c.createGain();o.type=ty||"sine";o.frequency.setValueAtTime(f,t);if(sl2)o.frequency.exponentialRampToValueAtTime(Math.max(20,sl2),t+d);g.gain.setValueAtTime(v||.15,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.02)}
function noise(d,v,f0,f1,at,q){const c=ac();if(!c||!snd)return;const t=c.currentTime+(at||0);if(!NB||NB.sampleRate!=c.sampleRate){NB=c.createBuffer(1,c.sampleRate*2,c.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}const sr=c.createBufferSource();sr.buffer=NB;const f=c.createBiquadFilter();f.type="bandpass";f.Q.value=q||1;f.frequency.setValueAtTime(f0,t);if(f1)f.frequency.exponentialRampToValueAtTime(f1,t+d);const g=c.createGain();g.gain.setValueAtTime(v||.2,t);g.gain.exponentialRampToValueAtTime(.001,t+d);sr.connect(f);f.connect(g);g.connect(c.destination);sr.start(t,Math.random()*.7,d)}
const SFX={swap:()=>tone(520,.07,"triangle",.1,700),bad:()=>tone(180,.12,"sawtooth",.08,120),
pop:n=>{const m=Math.pow(1.122,Math.min(n,8)*2);tone(440*m,.12,"triangle",.14);tone(660*m,.1,"sine",.08,0,.04)},
kick:()=>{noise(.18,.25,900,200);tone(160,.15,"square",.1,60,.1)},blast:()=>{tone(300,.35,"sawtooth",.12,1400);noise(.3,.12,2000,600)},
sword:()=>{noise(.4,.2,500,3000,0,.8);tone(1800,.25,"triangle",.07,900,.35)},axe:()=>{noise(.5,.25,200,1200,0,.6);tone(90,.5,"sawtooth",.14,40,.4)},
hit:()=>{noise(.12,.3,1200,300);tone(120,.15,"square",.15,50)},boom:()=>{noise(.7,.35,400,60);tone(70,.7,"sine",.4,30)},
shutter:()=>{noise(.04,.3,3000,3000);noise(.05,.3,2500,2500,.07)},hurt:()=>{tone(110,.3,"sawtooth",.18,55);noise(.15,.2,600,150)},
whoosh:()=>noise(.35,.18,300,1500,0,.7),gun:()=>{noise(.1,.4,2500,400);tone(90,.12,"square",.2,40)},
think:i=>tone(300+i*80,.09,"sine",.07),ping:()=>{tone(880,.15,"triangle",.1);tone(1320,.2,"sine",.06,0,.08)},
super:()=>{tone(120,1.4,"sawtooth",.08,900);noise(1.2,.1,300,3500,0,.5)},
win:()=>[0,.13,.26,.4].forEach((d,i)=>tone([392,494,587,784][i],.3,"triangle",.14,0,d)),
lose:()=>{tone(300,.5,"sawtooth",.12,80);tone(220,.6,"sawtooth",.1,60,.25)},type:()=>noise(.02,.05,2800,2800,0,2),click:()=>tone(660,.05,"square",.06)};
function sfx(n,a){try{SFX[n](a)}catch(e){}}
const VM=[1,1.5,2.1],PAT=[[30],[50,30,50],[25,20,25,20,70]];
function vib(p){if(!hap||!navigator.vibrate)return;try{const k=VM[Math.min(lv,2)];navigator.vibrate(Array.isArray(p)?p.map((x,i)=>i%2?x:Math.round(x*k)):Math.round(p*k))}catch(e){}}
function drone(k){const c=ac();if(DR){try{DR.forEach(o=>o.stop())}catch(e){}DR=null}if(k<0||!c||!snd)return;const g=c.createGain();g.gain.value=.035;const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=220+k*80;const b=[55,62,73][k]||55;DR=[b,b*1.5,b*2.01].map(fr=>{const x=c.createOscillator();x.type=k==2?"sawtooth":"triangle";x.frequency.value=fr;x.connect(f);x.start();return x});f.connect(g);g.connect(c.destination)}
SFX.swell=()=>{tone(80,2.6,"sawtooth",.05,200);tone(160,2.6,"triangle",.05,320)};
SFX.chime=()=>[0,.15,.3].forEach((d,i)=>tone([523,659,784][i],.7,"sine",.1,0,d));
