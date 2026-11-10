// 50-story.js - Golden Star: Match Mayhem (Super Duper Techno)
const LV=[
{n:"Street Goon",f:"Hired muscle · Arken City",k:1,hp:70,ai:"reckless",spr:"g1",intro:"Arken City, 2006. A hired goon is chasing Nova Reyes through the Industrial Zone. Samantha ducks into an alley and Golden Star steps out.",win:"The goon folds. He was paid in GC by someone who never gave a name."},
{n:"Crowbar Brute",f:"Hired muscle · heavy",k:1.25,hp:100,ai:"planner",spr:"g2",intro:"A bigger one this time, swinging a crowbar and thinking three moves ahead. He heals when hurt.",win:"The brute drops his crowbar. Someone further up is giving the orders."},
{n:"Hooded Gunman",f:"Hired muscle · armed",k:1.4,hp:120,ai:"planner",gun:true,spr:"g3",intro:"The last of them stays at range. Shields up, break his rhythm, and use Nova's camera to stall him.",win:"The gunman runs. File continues."}];
const SPK={gs:{n:"GOLDEN STAR",s:"gs_idle"},nova:{n:"NOVA",s:"nova"},g1:{n:"STREET GOON",s:"g1",r:1,f:1},g2:{n:"CROWBAR BRUTE",s:"g2",r:1,f:1},d1:{n:"DOCK ENFORCER",s:"g1",r:1,f:1},cap:{n:"CAPTAIN BRANN",s:"g2",r:1,f:1},voice:{n:"THE VOICE",s:"g3",r:1,f:1},boss:{n:"THE BOSS",s:"b",r:1},g3:{n:"HOODED GUNMAN",s:"g3",r:1,f:1},nar:{n:"",s:""}};
async function fin(){busy=true;sfx("boom");sfx("win");vib([100,60,100,60,250]);$("burst").classList.add("go");fdead=1;const f=$("fi");f.src=SP[FS+"_d1"];document.body.classList.add("cine");await sl(600);f.src=SP[FS+"_d2"];await sl(900);$("foe").classList.add("die");await sl(600);document.body.classList.remove("cine");$("burst").classList.remove("go");fightDone()}
function lose(){sfx("lose");vib([200,80,200]);if(mode=="e")return endOver();over("Golden Star is down","Get back up.","Retry",()=>start(true,CUR))}
function fightDone(){giveRewards(()=>mode=="e"?upgrade():play(si+1))}
const ST=[
{ch:"CHAPTER 1",t:"Blackout"},
{cut:"open"},
{s:[["nar","Arken City, Industrial Zone. 2006. The streetlights die one block at a time."],["nova","Okay. Don't turn around. Don't turn around. He's still there."],["g1","Give me the camera, reporter. Nobody has to get hurt."],["nova","Someone paid you to chase me. That's the story, you know."],["gs","She's busy. Talk to me."],["g1","...Golden Star? They said you were a rumor."]]},
{f:{n:"Street Goon",f:"Hired muscle · Industrial Zone",spr:"g1",hp:70,k:1,ai:"reckless",st:0,tut:1}},
{s:[["nar","The goon drops to his knees. His bravado leaves with his breath."],["nova","He knows who pays him. I'd bet my camera on it."]]},
{c:{q:"The goon is shaking. He knows something. What do you do?",o:[
{t:"Let him go. He's just muscle.",F:{spared:1,mercy:1},s:[["gs","Go home. Don't come back to this block."],["g1","...Pier 9. Everything goes through Pier 9. Please, I'll remember this."],["nar","He runs. You'll see him again, one way or another."]]},
{t:"Squeeze him for every name.",F:{intel:1,heat:1},s:[["g1","Okay! Pier 9! A voice on a phone pays us!"],["g1","And everyone the Voice trains flinches at the red first. Always the red. Ask me why. I can't tell you."],["nar","You learn something useful. Someone on that block also heard him scream."]]}]}},
{ch:"CHAPTER 2",t:"The Ledger"},
{s:[["nar","A warehouse on the edge of the zone. Crates stamped with the same black mark."],["nova","I followed the trucks. Every crate has the same stamp."],["gs","You followed trucks. Alone. At night."],["nova","Someone has to."],["g2","Two for one. I charge by the head."]]},
{f:{n:"Crowbar Brute",f:"Hired muscle · heavy",spr:"g2",hp:100,k:1.2,ai:"planner",st:1}},
{s:[["nar","The brute drops his crowbar. Behind a loose panel, you find a ledger."],["nova","Names. Dates. Payments. Half the dock office is in here."],["gs","And someone wants it badly enough to hire this much muscle."]]},
{c:{q:"The ledger could blow the case open. Who gets it?",o:[
{t:"Give it to Nova. The city deserves to know.",F:{shared:1,nova:1,trust:1,heat:1},s:[["nova","I'll run it tonight. You're not the only one who can hit back."],["gs","Be careful. They'll notice."],["nova","Let them."]]},
{t:"Keep it from the press. She'll be a target.",F:{hidden:1,trust:-1},s:[["nova","You don't get to decide what I'm allowed to know."],["gs","I'm trying to keep you alive."],["nova","That's not your call."],["nar","She walks into the dark without looking back."]]}]}},
{ch:"CHAPTER 3",t:"Pier 9"},
{s:[["nar","Pier 9, past midnight. Fog off the water. A worker is tied to a crate. A figure in a hood waits on the roof."],["g3","Hold still. Both of you."]]},
{c:{q:"The worker is in the line of fire. The gunman is reloading.",o:[
{t:"Free the worker first.",F:{saved:1,mercy:1},s:[["gs","Stay down. I've got you."],["g3","Too slow."],["nar","He gets the first shot off. It costs you."]]},
{t:"Rush the gunman. End it fast.",F:{chased:1,heat:1},s:[["gs","Stay put. This'll be quick."],["nar","You reach the roof before he finishes reloading. The worker takes a stray hit below."]]}]}},
{f:{n:"Hooded Gunman",f:"Hired muscle · armed",spr:"g3",hp:120,k:1.4,ai:"planner",gun:1,st:2},m:()=>F.saved?{ph:-12}:{},e:()=>F.chased?-15:0},
{s:[["nar","The gunman falls back and vanishes into the fog. His phone buzzes on the planks."],["voice","Your shipment is lost. Fix it, or you are next."],["gs","That voice. I've heard it before."]]},
{ch:"CHAPTER 4",t:"Static"},
{w:()=>F.shared,s:[["nar","Nova's story airs at dawn. By noon, every screen in Arken City is talking about the ledger."],["nar","By evening, the cleaners arrive."],["d1","Pull the story. Or we pull the people who read it."],["gs","The city is watching. Try it."]]},
{w:()=>F.shared,f:{n:"Dock Enforcer",f:"Cleaner · the city is watching",spr:"g1",hp:110,k:1.3,ai:"planner",st:0},m:()=>({sh:10})},
{w:()=>F.hidden,s:[["nar","Nova went to the docks alone. Her camera is on the floor, still recording."],["d1","She asked too many questions."],["gs","Where is she?"],["d1","You'll find out. After me."]]},
{w:()=>F.hidden,f:{n:"Dock Enforcer",f:"Cleaner · holding a hostage",spr:"g1",hp:130,k:1.4,ai:"planner",st:0}},
{s:[["nar","The phone from Pier 9 buzzes again. A trace is running."]]},
{c:{q:"You can trace the Voice's phone now, or follow its signal quietly.",o:[
{t:"Go loud. Trace it now.",F:{loud:1,heat:1},s:[["gs","If he's listening, he's about to hear me."],["nar","The signal pings across the city. So does yours."]]},
{t:"Go quiet. Follow without alarming him.",F:{quiet:1},s:[["gs","Let him think he's still in control."],["nar","You follow the signal like a shadow."]]}]}},
{ch:"CHAPTER 5",t:"The Voice"},
{s:[["nar","The old shipping office, rooftop. A man waits beside a captain with an iron bar."],["voice","Golden Star. I hoped you'd come."],["cap","I'll handle her, sir."]]},
{f:{n:"Captain Brann",f:"The Voice's bodyguard",spr:"g2",hp:150,k:1.5,ai:"planner",st:1},m:()=>F.loud?{ph:-10}:{},e:()=>F.quiet?-20:0},
{s:[["voice","Impressive. But the Accord's hand is longer than your city."],["gs","Then I'll start with yours."]]},
{f:{n:"The Voice",f:"Mastermind",spr:"g3",hp:160,k:1.6,ai:"planner",gun:1,st:2},m:()=>F.saved?{ph:10}:{}},
{s:[["nar","The Voice kneels on the rooftop. His phone lies cracked beside him."],["voice","Do it. Or don't. You'll never find the others without me."]]},
{c:{q:"The Voice is yours. What happens to him?",o:[
{t:"Expose him live on air.",F:{expose:1},s:[["gs","The city will see you for what you are."]]},
{t:"Use him to reach the people above.",F:{use:1,heat:1},s:[["gs","You're going to take me to them."],["voice","Gladly."]]},
{t:"Hand him to the police.",F:{police:1,mercy:1},s:[["gs","Let the law have you."]]}]}},
{ch:"CHAPTER 6",t:"The Boss"},
{cut:"boss"},
{s:[["nar","The roof door groans open. Slow, heavy footsteps. The Voice's phone rings once and stops."],["boss","Enough. I told my people to handle this quietly."],["voice","Sir... I tried."],["boss","You tried. That is why I am standing here."],["gs","So you're the one who pays for everything."],["boss","I pay for everyone."]]},
{f:{n:"The Boss",f:"Head of the local hand · SLAM every 3rd turn",spr:"b",hp:230,k:1.7,ai:"planner",boss:1,st:2},m:()=>F.expose?{sh:10}:{},e:()=>F.police?-15:(F.use?15:0)},
{s:[["nar","The Boss falls like a wall coming down. The rooftop shakes once more, then goes still."],["boss","...You don't know what you've started."],["gs","I know exactly what I've started."]]},
{e:1}];
function saveS(){try{localStorage.setItem("vm_st",JSON.stringify({i:si,F}))}catch(e){}}
function loadS(){try{return JSON.parse(localStorage.getItem("vm_st"))}catch(e){return null}}
function play(i){si=i;const t=ST[i];if(!t)return;if(t.w&&!t.w())return play(i+1);saveS();
if(t.ch)return over(t.ch,t.t,"Continue",()=>play(i+1));
if(t.cut)return playCut(t.cut,()=>play(i+1));
if(t.s)return scene(t.s,()=>play(i+1));
if(t.c)return choose(t.c,()=>play(i+1));
if(t.f){mode="s";MD=baseMD(!!F.nova);MD.lockw=F.intel?1:0;if(F.spared)MD.sh+=12;const x=t.m?t.m():{};for(const k in x)MD[k]+=x[k];lv=t.f.st;
const c=Object.assign({},t.f,{hp:Math.max(40,t.f.hp+(t.e?t.e():0)+6*F.heat),k:+(t.f.k+.08*F.heat).toFixed(2)});$("menu").style.display="none";start(false,c);return}
if(t.e)ending()}
function choose(c,done){$("cs").textContent="DECISION";$("cq").textContent=c.q;const o=$("co");o.innerHTML="";
c.o.forEach(op=>{const b=document.createElement("button");b.textContent=op.t;b.onclick=()=>{$("chs").classList.remove("show");const d=[];
for(const k in op.F){const v=op.F[k];if(k=="trust"||k=="heat"||k=="mercy"){F[k]+=v;d.push((k=="trust"?"Trust":k=="heat"?"Heat":"Mercy")+(v>0?" +":" ")+v)}else F[k]=v}
scene(op.s.concat(d.length?[["nar","["+d.join(" · ")+"]"]]:[]),done)};o.appendChild(b)});$("chs").classList.add("show")}
function ending(){const m=F.mercy,h=F.heat;let k=F.shared&&m>=2&&h<=3?0:(h>=3||(F.hidden&&F.use))?1:2;
const E=[{n:"DAYLIGHT",s:[["nar","By morning the ledger is on every screen. The Accord's names are read aloud."],["nova","They can't bury this. Not anymore."],["gs","Then keep writing."],["nar","Arken City sleeps with the lights on. For once, it feels like a promise."]]},
{n:"SHADOW FILE",s:[["nar","The Voice vanishes from custody. The ledger vanishes from every archive."],["nova","They erased it. All of it."],["nar","Golden Star is a name on a file now. Someone is already hunting her."],["gs","Then I'll hunt back."]]},
{n:"OPEN CASE",s:[["nar","The Voice is in custody. The ledger is half-published, half-buried."],["nova","It's not over."],["gs","No. It never is."],["nar","The case file stays open."]]}][k];
playCut("end"+k,()=>scene(E.s,()=>over("ENDING: "+E.n,"Trust "+F.trust+" · Heat "+F.heat+" · Mercy "+F.mercy+". Different choices lead to different endings. Story update coming soon.","Main menu",()=>{inGame=false;try{localStorage.removeItem("vm_st")}catch(e){}showMenu()})))}
const cont=()=>{const st=loadS();if(!st)return;F=st.F;mode="s";startPlay(()=>play(st.i))};
