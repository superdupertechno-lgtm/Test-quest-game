// 30-board.js - Golden Star: Match Mayhem (Super Duper Techno)
function burn(){const b=$("board");b.classList.remove("burn");void b.offsetWidth;b.classList.add("burn")}
function tile(c,r,k){const el=document.createElement("div");el.className="t c"+c;el.innerHTML="<i data-g='"+GL[c]+"'></i>";const t={c,el};put(t,r,k);$("board").appendChild(el);return t}
function put(t,r,c){t.el.style.transform="translate("+c*100+"%,"+r*100+"%)"}
function runs(){const s=new Set,best=[0,0,0,0,0];
for(let a=0;a<2;a++)for(let i=0;i<N;i++){let j=0;while(j<N){const v=a?g[j][i].c:g[i][j].c;let e=j;while(e<N&&(a?g[e][i].c:g[i][e].c)==v)e++;
if(e-j>=3){best[v]=Math.max(best[v],e-j);for(let x=j;x<e;x++)s.add(a?x*N+i:i*N+x)}j=e}}
return{s,best}}
function moves(){const out=[];
for(let r=0;r<N;r++)for(let c=0;c<N;c++)for(const[dr,dc]of[[0,1],[1,0]]){const r2=r+dr,c2=c+dc;if(r2>=N||c2>=N)continue;
sw2([r,c],[r2,c2]);const q=runs();sw2([r,c],[r2,c2]);
if(q.s.size){const cnt=[0,0,0,0,0];q.s.forEach(i=>cnt[0]);q.s.forEach(i=>{});out.push({a:[r,c],b:[r2,c2],q})}}return out}
function sw2(a,b){const t=g[a[0]][a[1]];g[a[0]][a[1]]=g[b[0]][b[1]];g[b[0]][b[1]]=t}
function build(){$("board").innerHTML="";
do{g=Array.from({length:N},()=>Array.from({length:N},()=>({c:rnd()})))}while(runs().s.size);
g.forEach((row,r)=>row.forEach((o,c)=>{g[r][c]=tile(o.c,r,c)}));
if(!moves().length)return build();
const b=$("board");b.onpointerdown=e=>{kcOn=0;kcDraw();down={x:e.clientX,y:e.clientY,p:cell(e)}};
b.onpointerup=e=>{if(!down||busy||paused)return;const p=down.p,dx=e.clientX-down.x,dy=e.clientY-down.y;down=null;if(!p)return;
if(Math.hypot(dx,dy)>14){const h=Math.abs(dx)>Math.abs(dy);go(p,[p[0]+(h?0:Math.sign(dy)),p[1]+(h?Math.sign(dx):0)])}else tap(p)}}
function cell(e){const R=$("board").getBoundingClientRect(),c=(e.clientX-R.left)/R.width*N|0,r=(e.clientY-R.top)/R.height*N|0;return r>=0&&c>=0&&r<N&&c<N?[r,c]:null}
function tap(p){if(!sel){sel=p;g[p[0]][p[1]].el.classList.add("sel");return}
const a=sel;g[a[0]][a[1]].el.classList.remove("sel");sel=null;if(Math.abs(a[0]-p[0])+Math.abs(a[1]-p[1])==1)go(a,p);else{sel=p;g[p[0]][p[1]].el.classList.add("sel")}}
function swp(a,b){const x=g[a[0]][a[1]],y=g[b[0]][b[1]];g[a[0]][a[1]]=y;g[b[0]][b[1]]=x;put(y,a[0],a[1]);put(x,b[0],b[1])}
async function go(a,b){if(busy||b[0]<0||b[1]<0||b[0]>=N||b[1]>=N)return;if(TUTM&&!sameMv(a,b)){$("log").textContent="Try the glowing tiles.";if(sel){g[sel[0]][sel[1]].el.classList.remove("sel");sel=null}return}busy=true;
if(sel){g[sel[0]][sel[1]].el.classList.remove("sel");sel=null}
swp(a,b);sfx("swap");vib(6);await sl(140);
if(!runs().s.size){sfx("bad");swp(a,b);await sl(140);busy=false;return}
if(TUTM){TUTM=null;tutClear()}await resolve("p");if(eh<=0)return fin();mc++;if(MD.nova&&mc%(MD.nn||4)==0){stun=true;await cameo()}
await enemy();if(hp<=0)return lose();
if(!moves().length){$("log").textContent="No moves left. Board reshuffled.";build()}
$("turn").textContent="YOUR MOVE";if(L.tut&&!tutDone())await tutNext();busy=false}
function fl(t,who){const f=$(who=="e"?"foe":"pb").getBoundingClientRect(),d=document.createElement("div");d.className="fl";d.textContent=t;d.style.left=f.left+f.width/2-16+"px";d.style.top=f.top+"px";document.body.appendChild(d);setTimeout(()=>d.remove(),1200)}
function hitFx(){fpose("h",260);const f=$("foe");f.classList.remove("hit");void f.offsetWidth;f.classList.add("hit")}
function shake(){const m=$("m");m.classList.remove("shake","sh2","sh3");void m.offsetWidth;m.classList.add(lv==1?"sh2":lv==2?"sh3":"shake");vib(PAT[Math.min(lv,2)])}
async function resolve(o){let combo=0;const P=o=="p";
for(let q=runs();q.s.size;q=runs()){combo++;const s=q.s,best=q.best,tags=[];
for(let c=0;c<5;c++)if(best[c]>=5){tags.push("SURGE "+GL[c]);for(let r=0;r<N;r++)for(let k=0;k<N;k++)if(g[r][k].c==c)s.add(r*N+k)}
const cnt=[0,0,0,0,0];s.forEach(i=>{const t=g[i/N|0][i%N];cnt[t.c]++;t.el.classList.add("pop")});sfx("pop",combo);vib(8*combo);
await sl(150);
const m=1+.3*(combo-1);let dmg=(cnt[0]+cnt[4])*2,heal=cnt[1]*2,shd=cnt[2]*2,chg=0;
if(P){dmg+=cnt[weak]*3;chg=cnt[3]*2+cnt[4];dmg*=MD.dm}else{dmg=dmg*L.k}
dmg*=m;heal*=m;shd*=m;
if(best[0]>=4){dmg+=P?10:8;tags.push("STAR BOLT")}
if(best[1]>=4){heal+=P?10:8;tags.push("RESCUE")}
if(best[2]>=4){shd+=P?10:8;if(P)dmg+=5;tags.push("FORTIFY")}
if(best[3]>=4&&P){stun=true;chg+=4;tags.push("SCOOP: enemy stunned")}
if(best[4]>=4){if(P){mark=true;tags.push("HUNT MARK")}else dmg+=4}
dmg=Math.round(dmg);heal=Math.round(heal);shd=Math.round(shd);
s.forEach(i=>{g[i/N|0][i%N].el.remove();g[i/N|0][i%N]=null});
if(P&&best[3]>=4)await cameo();if(P&&dmg>0)await strike(Math.max(...best));if(!P&&dmg>0)await(L.gun?shot():lunge());
if(P){if(dmg&&mark&&!(best[4]>=4)){dmg*=2;mark=false;tags.push("x2")}
const ab=Math.min(esh,dmg);esh-=ab;dmg-=ab;eh-=dmg;if(dmg){hitFx();fl(dmg,"e")}hp=Math.min(PM,hp+Math.round(heal*MD.hm));sh+=shd;ch=Math.min(10,ch+chg)}
else{eh=Math.min(mx,eh+heal);esh+=shd;const ab=Math.min(sh,dmg);sh-=ab;dmg-=ab;hp-=dmg;if(dmg){fl(dmg,"p");shake();hurt();burn()}}
$("log").textContent=(combo>1?"Combo x"+combo+"  ":"")+tags.join(" · ");
if(dmg>=18){shake();await sl(70)}
for(let c=0;c<N;c++){let w=N-1;
for(let r=N-1;r>=0;r--)if(g[r][c]){if(r!=w){g[w][c]=g[r][c];g[r][c]=null;put(g[w][c],w,c)}w--}
for(let r=w;r>=0;r--){g[r][c]=tile(rnd(),r-w-1,c);void g[r][c].el.offsetWidth;put(g[r][c],r,c)}}
hud();await sl(200)}}
function score(q){const cnt=[0,0,0,0,0];q.s.forEach(i=>cnt[g[i/N|0][i%N].c]++);
let v=(cnt[0]+cnt[4])*2+cnt[1]*(eh<mx*.5&&L.ai=="planner"?3:.5)+cnt[2]*(L.ai=="planner"?1.5:.3);
for(let c=0;c<5;c++)if(q.best[c]>=4)v+=6;return v}
async function enemy(){$("turn").textContent=L.n.toUpperCase()+" IS THINKING";
if(stun){stun=false;$("bub").textContent="!?";$("bub").classList.add("on");$("log").textContent="Scooped! "+L.n+" loses a turn.";await sl(900);$("bub").classList.remove("on");return}
if(L.boss){bt++;if(bt%3==0){await slam();return}if(bt%3==2)$("log").textContent="The Boss is gathering himself. Next turn: SLAM. Build shield!"}
const bub=$("bub");bub.classList.add("on");
for(let i=0;i<3;i++){bub.textContent=".".repeat(i+1);const t=g[rnd()+0>6?0:Math.random()*N|0][Math.random()*N|0];t.el.classList.add("scan");sfx("think",i);await sl(230);t.el.classList.remove("scan")}
const mv=moves();mv.forEach(x=>x.v=score(x.q)+(L.ai=="reckless"?Math.random()*6:0));mv.sort((a,b)=>b.v-a.v);
const pick=mv[0],col=g[pick.a[0]][pick.a[1]].c;bub.textContent=L.ai=="planner"?"Hm.":"!";sfx("ping");
const A=g[pick.a[0]][pick.a[1]].el,B=g[pick.b[0]][pick.b[1]].el;A.classList.add("ai");B.classList.add("ai");
await sl(520);A.classList.remove("ai");B.classList.remove("ai");$("foe").classList.remove("act");
bub.classList.remove("on");swp(pick.a,pick.b);await sl(150);
if(runs().s.size)await resolve("e");if(!MD.lockw)weak=rnd();hud()}
function hud(){$("eh").textContent=Math.max(0,eh)+"/"+mx+(esh?"  +"+esh+" shield":"");$("eb").style.width=Math.max(0,eh)/mx*100+"%";
$("ph").textContent="LV "+PR.gs.lv+" · HP "+Math.max(0,hp);$("pb").style.width=Math.max(0,hp)/PM*100+"%";$("sh").textContent="Shield "+sh+(mark?"  · MARKED x2":"");
$("weak").innerHTML="Weak to <b style='color:"+COL[weak]+"'>"+GL[weak]+"</b>";
const a=$("ab");a.style.setProperty("--p",ch*10+"%");a.classList.toggle("rdy",ch>=10);a.textContent=ch>=10?"NOVA STRIKE: TAP":"Nova Strike "+ch+"/10 (gold tiles)"}
function start(sk,cfg){L=cfg||LV[lv];CUR=L;drone(Math.min(lv,2));mc=0;bt=0;$("tag").innerHTML=L.n+"<small>"+L.f+"</small>";setFoe(L.spr);pose("gs_idle");
mx=eh=L.hp;PM=60+(MD.ph||0);hp=L.carry!=null?Math.min(PM,L.carry):PM;sh=MD.sh||0;esh=0;ch=Math.min(10,MD.ch||0);mark=false;stun=false;weak=MD.lockw?0:rnd();busy=true;sel=null;$("foe").className=L.boss?"boss":"";build();hud();$("log").textContent="";$("turn").textContent="";
go0()}
const go0=()=>{busy=false;$("turn").textContent="YOUR MOVE";if(L&&L.tut&&!tutDone())tutBegin()};
function setFoe(sp){FS=sp;fdead=0;const f=$("fi");f.dataset.p="i";f.style.transform=sp=="b"?"":"scaleX(-1)";f.src=SP[sp+"_i0"]}
function fpose(k,ms){if(fdead)return;const f=$("fi");f.dataset.p=k;f.src=SP[FS+"_"+k];if(ms)setTimeout(()=>{if(!fdead){f.dataset.p="i";f.src=SP[FS+"_i0"]}},ms)}
