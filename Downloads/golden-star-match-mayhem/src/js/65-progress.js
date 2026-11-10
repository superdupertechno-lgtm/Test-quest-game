// 65-progress.js - character levels, XP, rewards and the Upgrades menu
const XP_CAP=20;
const CHARS={gs:"Golden Star",nova:"Nova"};
const UPG={
  gs:[
    {k:"hp",n:"Vitality",d:"+8 max HP per rank",max:10},
    {k:"atk",n:"Star Strike",d:"+5% damage per rank",max:10},
    {k:"shd",n:"Gold Plating",d:"+4 starting shield per rank",max:8},
    {k:"heal",n:"Second Wind",d:"+8% healing per rank",max:8},
    {k:"chg",n:"Nova Charge",d:"+1 starting Nova Strike charge per rank",max:6},
    {k:"sup",n:"Supernova",d:"+10% Nova Strike damage per rank",max:8}],
  nova:[
    {k:"flash",n:"Camera Flash",d:"Nova stuns the enemy more often (every 7 minus rank moves)",max:5},
    {k:"press",n:"Press Pass",d:"+10% XP from every fight per rank",max:5}]};
function defPR(){return{gs:{lv:1,xp:0,pts:1,r:{hp:0,atk:0,shd:0,heal:0,chg:0,sup:0}},nova:{lv:1,xp:0,pts:0,r:{flash:0,press:0}}}}
let PR=defPR(),upWho="gs",upReturn=null;
function prLoad(){try{const o=JSON.parse(localStorage.getItem("vm_pr"));if(o&&o.gs&&o.nova){const d=defPR();for(const c of["gs","nova"]){PR[c]=Object.assign(d[c],o[c]);PR[c].r=Object.assign(d[c].r,o[c].r||{})}}}catch(e){}}
function prSave(){try{localStorage.setItem("vm_pr",JSON.stringify(PR))}catch(e){}}
const xpNeed=lv=>50+25*(lv-1);
function addXp(c,amt){const p=PR[c],from=p.lv;if(p.lv>=XP_CAP)return{from,to:p.lv,pts:0};p.xp+=amt;let pts=0;
  while(p.lv<XP_CAP&&p.xp>=xpNeed(p.lv)){p.xp-=xpNeed(p.lv);p.lv++;p.pts++;pts++}
  if(p.lv>=XP_CAP)p.xp=0;return{from,to:p.lv,pts}}
// Fight modifiers from level + upgrades. novaStory = story flag that gives Nova a free rank.
function baseMD(novaStory){const g=PR.gs,r=g.r,nr=PR.nova.r.flash+(novaStory?1:0);
  return{ph:(g.lv-1)*3+r.hp*8,sh:r.shd*4,ch:r.chg,dm:(1+(g.lv-1)*.01)*(1+r.atk*.05),hm:1+r.heal*.08,sup:1+r.sup*.1,nova:nr>0?1:0,nn:Math.max(2,7-nr),lockw:0}}
const rewardFor=()=>mode=="e"?20+wave*10:Math.round(25+(CUR&&CUR.hp||60)*.5);
function giveRewards(next){
  const xp=Math.round(rewardFor()*(1+.1*PR.nova.r.press)),nx=Math.round(xp*.6),a=addXp("gs",xp),b=addXp("nova",nx);prSave();
  const pts=PR.gs.pts+PR.nova.pts;
  const line=(n,x,r)=>n+" +"+x+" XP"+(r.to>r.from?" - LEVEL UP "+r.from+" > "+r.to+"!":" (LV "+r.to+")");
  $("cs").textContent="REWARDS";$("cq").innerHTML=line("Golden Star",xp,a)+"<br>"+line("Nova",nx,b)+(pts?"<br>Upgrade points to spend: "+pts:"");
  const o=$("co");o.innerHTML="";
  const done=f=>()=>{$("chs").classList.remove("show");f()};
  const c=document.createElement("button");c.textContent="Continue";c.onclick=done(next);o.appendChild(c);
  if(pts){const u=document.createElement("button");u.textContent="Spend upgrade points ("+pts+")";u.onclick=done(()=>openUp(next));o.appendChild(u)}
  $("chs").classList.add("show");sfx(a.to>a.from||b.to>b.from?"win":"ping");
}
function openUp(ret){upReturn=ret;show("up")}
function statLine(c){if(c=="gs"){const m=baseMD(false);return"Max HP "+(60+m.ph)+" · Damage x"+m.dm.toFixed(2)+" · Start shield "+m.sh+" · Healing x"+m.hm.toFixed(2)+" · Start charge "+m.ch+" · Nova Strike x"+m.sup.toFixed(2)}
  return"Camera Flash: "+(PR.nova.r.flash?"every "+Math.max(2,7-PR.nova.r.flash)+" moves":"locked (needs 1 rank, or help her in the story)")+" · XP bonus +"+PR.nova.r.press*10+"%"}
function renderUp(){const c=upWho,p=PR[c];$("ut1").classList.toggle("on",c=="gs");$("ut2").classList.toggle("on",c=="nova");
  const need=p.lv>=XP_CAP?0:xpNeed(p.lv);
  $("uphead").innerHTML="<b>"+CHARS[c].toUpperCase()+"</b> &middot; LEVEL "+p.lv+(p.lv>=XP_CAP?" (MAX)":"")+"<div class='xpb'><i style='width:"+(need?Math.round(p.xp/need*100):100)+"%'></i></div>XP "+p.xp+"/"+(need||"MAX")+" &middot; Upgrade points: <b>"+p.pts+"</b><br><span>"+statLine(c)+"</span>";
  const L=$("uplist");L.innerHTML="";
  UPG[c].forEach(u=>{const rk=p.r[u.k],row=document.createElement("div");row.className="urow";
    row.innerHTML="<div class='ui'><b>"+u.n+"</b><span>"+u.d+"</span><em>"+"\u25cf".repeat(rk)+"\u25cb".repeat(u.max-rk)+"</em></div>";
    const b=document.createElement("button");b.className="ub";b.textContent=rk>=u.max?"MAX":"+";b.disabled=rk>=u.max||p.pts<1;
    b.onclick=()=>{if(p.pts<1||p.r[u.k]>=u.max)return;p.r[u.k]++;p.pts--;prSave();sfx("ping");vib(15);renderUp()};
    row.appendChild(b);L.appendChild(row)})}
function updBadge(){const n=PR.gs.pts+PR.nova.pts,t="Upgrades"+(n?" ("+n+")":"");$("m6").textContent=t;$("p6").textContent=t}
function initProgress(){prLoad();
  $("m6").onclick=()=>navGo("up");$("p6").onclick=()=>{fromPause=true;navGo("up")};
  $("ut1").onclick=()=>{upWho="gs";renderUp()};$("ut2").onclick=()=>{upWho="nova";renderUp()};
  $("upreset").onclick=()=>{for(const c of["gs","nova"]){const p=PR[c];for(const k in p.r){p.pts+=p.r[k];p.r[k]=0}}prSave();sfx("hit");renderUp()};updBadge()}
