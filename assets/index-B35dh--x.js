var tr=Object.defineProperty;var ar=(e,t,a)=>t in e?tr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var b=(e,t,a)=>ar(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const sr=""+new URL("silkscreen-latin-400-normal-BlgCvw1V.woff2",import.meta.url).href,nr="attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }",rr=`
precision mediump float;
uniform vec2 res;
uniform float t;
uniform vec3 c1;
uniform vec3 c2;
uniform vec3 c3;
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * res) / res.y;
  float r = length(uv);
  float a = atan(uv.y, uv.x) + 1.8 * r - t * 0.06;
  vec2 p = vec2(cos(a), sin(a)) * r * 2.6;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    p += 0.55 * vec2(sin(p.y * 1.4 + t * 0.21 + fi * 1.3), cos(p.x * 1.2 - t * 0.17 + fi * 2.1));
  }
  float v = 0.5 + 0.5 * sin(p.x * 1.1 + p.y);
  float w = 0.5 + 0.5 * sin(p.x * 0.6 - p.y * 1.4 + 1.7);
  vec3 col = mix(c1, c2, smoothstep(0.25, 0.75, v));
  col = mix(col, c3, smoothstep(0.6, 0.95, w) * 0.55);
  col = floor(col * 12.0 + 0.5) / 12.0;
  col *= 1.0 - 0.45 * r * r;
  gl_FragColor = vec4(col, 1.0);
}`,Ya=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255),oa={r:["#3b1420","#7a2335","#1d5a63"],y:["#3a2a10","#7a5517","#5b2a6e"],g:["#0f2e22","#1f6646","#6b2b3a"],b:["#121f3d","#244a8a","#7a3b1d"]};class or{constructor(t){b(this,"gl");b(this,"loc",{});b(this,"cur",oa.g.map(Ya));b(this,"target",this.cur.map(t=>[...t]));b(this,"raf",0);b(this,"last",0);b(this,"t0",performance.now());b(this,"animate",!0);b(this,"hd",!1);b(this,"frames",0);this.canvas=t,this.gl=t.getContext("webgl",{antialias:!1,depth:!1,alpha:!1,powerPreference:"low-power"}),this.gl?this.init(this.gl):t.classList.add("fallback"),this.resize(),document.addEventListener("visibilitychange",()=>document.hidden?this.stop():this.kick())}init(t){const a=(i,o)=>{const l=t.createShader(i);return t.shaderSource(l,o),t.compileShader(l),l},s=t.createProgram();if(t.attachShader(s,a(t.VERTEX_SHADER,nr)),t.attachShader(s,a(t.FRAGMENT_SHADER,rr)),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS)){this.gl=null,this.canvas.classList.add("fallback");return}t.useProgram(s);const n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);const r=t.getAttribLocation(s,"p");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0);for(const i of["res","t","c1","c2","c3"])this.loc[i]=t.getUniformLocation(s,i)}resize(){var a;const t=this.hd?2:6;this.canvas.width=Math.max(32,Math.ceil(window.innerWidth/t)),this.canvas.height=Math.max(18,Math.ceil(window.innerHeight/t)),(a=this.gl)==null||a.viewport(0,0,this.canvas.width,this.canvas.height),this.kick()}setTheme(t){this.target=(oa[t]??oa.g).map(Ya),this.kick()}setHd(t){t!==this.hd&&(this.hd=t,this.resize())}setAnimate(t){this.animate=t,this.kick()}kick(){!this.raf&&!document.hidden&&(this.raf=requestAnimationFrame(t=>this.frame(t)))}stop(){cancelAnimationFrame(this.raf),this.raf=0}frame(t){if(this.raf=0,t-this.last<32){this.kick();return}this.last=t;let a=!1;for(let n=0;n<3;n++)for(let r=0;r<3;r++){const i=this.target[n][r]-this.cur[n][r];Math.abs(i)>.002&&(a=!0),this.cur[n][r]+=i*.08}const s=this.gl;s?(s.uniform2f(this.loc.res,this.canvas.width,this.canvas.height),s.uniform1f(this.loc.t,this.animate?(t-this.t0)/1e3:12),s.uniform3fv(this.loc.c1,this.cur[0]),s.uniform3fv(this.loc.c2,this.cur[1]),s.uniform3fv(this.loc.c3,this.cur[2]),s.drawArrays(s.TRIANGLES,0,3),this.frames++):this.canvas.style.background=`radial-gradient(circle, rgb(${this.cur[1].map(n=>n*255).join(",")}), rgb(${this.cur[0].map(n=>n*255).join(",")}))`,(this.animate&&s||a)&&this.kick()}}let le=null,nt=!1;const Rs=[];function Os(e){nt=e;for(const t of Rs)t(e)}function ir(e){Rs.push(e)}function Is(){try{return le??(le=new AudioContext),le.state==="suspended"&&le.resume(),le}catch{return null}}function Se(e,t,a="sine",s=.08,n=0){if(!nt)try{le??(le=new AudioContext),le.state==="suspended"&&le.resume();const r=le.currentTime,i=le.createOscillator(),o=le.createGain();i.type=a,i.frequency.setValueAtTime(e,r),n&&i.frequency.exponentialRampToValueAtTime(e*n,r+t),o.gain.setValueAtTime(s,r),o.gain.exponentialRampToValueAtTime(1e-4,r+t),i.connect(o).connect(le.destination),i.start(r),i.stop(r+t)}catch{}}const V={play:()=>Se(520,.08,"triangle",.07,.7),draw:()=>Se(300,.06,"sine",.05,1.3),special:()=>Se(660,.18,"square",.035,1.5),call:()=>Se(880,.22,"triangle",.07,1.25),bad:()=>Se(200,.3,"sawtooth",.04,.6),tick:e=>Se(330*Math.pow(1.06,Math.min(e,24)),.06,"square",.03),cash:()=>[660,880].forEach((e,t)=>setTimeout(()=>Se(e,.12,"triangle",.06),t*90)),win:()=>[523,659,784,1046].forEach((e,t)=>setTimeout(()=>Se(e,.25,"triangle",.07),t*120))},lr=92,jt=60/lr/2,Xa=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],cr=[0,1,2,1,2,1,0,2],es=[76,-1,74,72,-1,72,69,-1,72,-1,71,69,-1,67,69,-1,67,-1,64,67,-1,69,67,-1,71,-1,72,74,-1,71,67,-1],ia=e=>440*Math.pow(2,(e-69)/12);let Ns=!1,Ot=0,ot=0,Ae=0,Ie=null;function la(e,t,a,s,n,r){const i=e.createOscillator(),o=e.createGain();i.type=n,i.frequency.setValueAtTime(t,a),o.gain.setValueAtTime(1e-4,a),o.gain.exponentialRampToValueAtTime(r,a+.01),o.gain.exponentialRampToValueAtTime(1e-4,a+s),i.connect(o).connect(Ie),i.start(a),i.stop(a+s+.02)}function hr(e,t){const a=Math.floor(e.sampleRate*.03),s=e.createBuffer(1,a,e.sampleRate),n=s.getChannelData(0);for(let l=0;l<a;l++)n[l]=(Math.random()*2-1)*(1-l/a);const r=e.createBufferSource(),i=e.createGain(),o=e.createBiquadFilter();o.type="highpass",o.frequency.value=6e3,i.gain.value=.25,r.buffer=s,r.connect(o).connect(i).connect(Ie),r.start(t)}function ts(){const e=Is();if(!(!e||!Ie))for(;Ae<e.currentTime+.3;){const t=Math.floor(ot/8)%Xa.length,a=Xa[t],s=ot%8;la(e,ia(a[cr[s]]),Ae,jt*.9,"triangle",.35),(s===0||s===4)&&la(e,ia(a[0]-24),Ae,jt*3.5,"square",.22),s%2===1&&hr(e,Ae);const n=es[ot%es.length];n>0&&ot%64>=32&&la(e,ia(n),Ae,jt*1.6,"square",.12),ot++,Ae+=jt}}function dr(){const e=Is();!e||Ot||(Ie||(Ie=e.createGain(),Ie.gain.value=.07,Ie.connect(e.destination)),Ae=e.currentTime+.05,Ot=window.setInterval(ts,100),ts())}function fr(){clearInterval(Ot),Ot=0}function Ht(){Ns&&!nt&&!document.hidden?dr():fr()}function ur(e){Ns=e,Ft&&Ht()}let Ft=!1;const It=()=>{Ft=!0,Ht(),window.removeEventListener("pointerdown",It),window.removeEventListener("keydown",It)};window.addEventListener("pointerdown",It);window.addEventListener("keydown",It);document.addEventListener("visibilitychange",()=>Ft&&Ht());ir(()=>Ft&&Ht());const pt={0:[".###.","#...#","#...#","#...#","#...#","#...#",".###."],1:["..#..",".##..","#.#..","..#..","..#..","..#..","#####"],2:[".###.","#...#","....#","..##.",".#...","#....","#####"],3:["####.","....#","....#",".###.","....#","....#","####."],4:["...#.","..##.",".#.#.","#..#.","#####","...#.","...#."],5:["#####","#....","####.","....#","....#","#...#",".###."],6:[".###.","#....","#....","####.","#...#","#...#",".###."],7:["#####","....#","...#.","..#..",".#...",".#...",".#..."],8:[".###.","#...#","#...#",".###.","#...#","#...#",".###."],9:[".###.","#...#","#...#",".####","....#","....#",".###."],"+":[".....","..#..","..#..","#####","..#..","..#..","....."],skip:["..###..",".#...#.","#...#.#","#..#..#","#.#...#",".#...#.","..###.."],rev:["..#....",".######","..#....",".......","....#..","######.","....#.."]},Zs={0:["###","#.#","#.#","#.#","###"],1:[".#.","##.",".#.",".#.","###"],2:["##.","..#",".#.","#..","###"],3:["##.","..#",".#.","..#","##."],4:["#.#","#.#","###","..#","..#"],5:["###","#..","##.","..#","##."],6:[".##","#..","###","#.#","###"],7:["###","..#",".#.",".#.",".#."],8:["###","#.#","###","#.#","###"],9:["###","#.#","###","..#","##."],"+":["...",".#.","###",".#.","..."],skip:["...",".##","#.#","##.","..."],rev:[".#..","####","....","####","..#."]};function as(e){const t=`rev@${e}`;if(pt[t])return t;const a=Math.max(5,Math.round(e*.38)|1),s=(a-1)/2,n=s+1,r=a>=9?1:0,i=Math.max(n+2,Math.round(e*.8)),o=a>=9?2:1,l=Array.from({length:a*2+o},()=>Array(e).fill(".")),c=(h,u,m)=>{for(let w=0;w<i;w++)for(let y=0;y<a;y++){const C=m?w:i-1-w,Q=C<n&&Math.abs(y-s)<=C,E=C>=n-1&&Math.abs(y-s)<=r;(Q||E)&&(l[h+y][u+w]="#")}};return c(0,0,!0),c(a+o,e-i,!1),pt[t]=l.map(h=>h.join("")),t}function dt(e,t){const a=(t==="big"?pt:Zs)[e];return{w:a?a[0].length:0,h:a?a.length:0}}function ca(e,t){return e.reduce((a,s,n)=>a+dt(s,t).w+(n?1:0),0)}function pr(e,t,a,s,n,r,i="big",o=!1){const l=(i==="big"?pt:Zs)[t];if(!l)return;e.fillStyle=r;const c=l.length,h=l[0].length;for(let u=0;u<c;u++)for(let m=0;m<h;m++)(o?l[c-1-u][h-1-m]:l[u][m])==="#"&&e.fillRect(a+m*n,s+u*n,n,n)}function Lt(e,t,a,s,n,r,i,o="big",l=!1){const c=l?[...t].reverse():t,h=(u,m,w)=>{let y=a;for(const C of c)pr(e,C,y+u,s+m,n,w,o,l),y+=(dt(C,o).w+1)*n};for(const[u,m]of _s)h(u,m,i);h(0,0,r)}const _s=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],Qt={A:[".###.","#...#","#...#","#####","#...#","#...#","#...#"],B:["####.","#...#","#...#","####.","#...#","#...#","####."],C:[".###.","#...#","#....","#....","#....","#...#",".###."],D:["####.","#...#","#...#","#...#","#...#","#...#","####."],E:["#####","#....","#....","####.","#....","#....","#####"],F:["#####","#....","#....","####.","#....","#....","#...."],G:[".###.","#...#","#....","#.###","#...#","#...#",".####"],H:["#...#","#...#","#...#","#####","#...#","#...#","#...#"],I:["###",".#.",".#.",".#.",".#.",".#.","###"],J:["..###","...#.","...#.","...#.","#..#.","#..#.",".##.."],K:["#...#","#..#.","#.#..","##...","#.#..","#..#.","#...#"],L:["#....","#....","#....","#....","#....","#....","#####"],M:["#...#","##.##","#.#.#","#.#.#","#...#","#...#","#...#"],N:["#...#","##..#","#.#.#","#..##","#...#","#...#","#...#"],O:[".###.","#...#","#...#","#...#","#...#","#...#",".###."],P:["####.","#...#","#...#","####.","#....","#....","#...."],Q:[".###.","#...#","#...#","#...#","#.#.#","#..#.",".##.#"],R:["####.","#...#","#...#","####.","#.#..","#..#.","#...#"],S:[".####","#....","#....",".###.","....#","....#","####."],T:["#####","..#..","..#..","..#..","..#..","..#..","..#.."],U:["#...#","#...#","#...#","#...#","#...#","#...#",".###."],V:["#...#","#...#","#...#","#...#","#...#",".#.#.","..#.."],W:["#...#","#...#","#...#","#.#.#","#.#.#","##.##","#...#"],X:["#...#","#...#",".#.#.","..#..",".#.#.","#...#","#...#"],Y:["#...#","#...#",".#.#.","..#..","..#..","..#..","..#.."],Z:["#####","....#","...#.","..#..",".#...","#....","#####"],0:[".###.","#...#","#...#","#...#","#...#","#...#",".###."],1:["..#..",".##..","..#..","..#..","..#..","..#..",".###."],"+":[".....","..#..","..#..","#####","..#..","..#..","....."],"-":["....","....","....","####","....","....","...."],"×":[".....","#...#",".#.#.","..#..",".#.#.","#...#","....."],$:["..#..",".####","#.#..",".###.","..#.#","####.","..#.."],"!":["#","#","#","#","#",".","#"],"?":[".###.","#...#","....#","...#.","..#..",".....","..#.."],".":[".",".",".",".",".",".","#"],",":["..","..","..","..","..",".#","#."],":":[".","#",".",".",".","#","."],"·":[".",".",".","#",".",".","."],"/":["....#","...#.","...#.","..#..",".#...",".#...","#...."],"(":[".#","#.","#.","#.","#.","#.",".#"],")":["#.",".#",".#",".#",".#",".#","#."],"%":["##..#","##.#.","...#.","..#..",".#...",".#.##","#..##"]," ":["..","..","..","..","..","..",".."]};for(const e of"23456789")Qt[e]=pt[e];const mr={Á:["A",["...#.","..#.."],"up"],À:["A",[".#...","..#.."],"up"],Â:["A",["..#..",".#.#."],"up"],Ã:["A",[".#..#","#.##."],"up"],É:["E",["...#.","..#.."],"up"],Ê:["E",["..#..",".#.#."],"up"],Í:["I",["..#",".#."],"up"],Ó:["O",["...#.","..#.."],"up"],Ô:["O",["..#..",".#.#."],"up"],Õ:["O",[".#..#","#.##."],"up"],Ú:["U",["...#.","..#.."],"up"],Ç:["C",["..#..",".#..."],"down"]};function Gs(e){const t=mr[e];return t?{rows:Qt[t[0]],accent:t[1],dir:t[2]}:{rows:Qt[e]??Qt["?"]}}const Vs=e=>e.toUpperCase().replace(/[−–—]/g,"-");function gr(e,t=1){return[...Vs(e)].reduce((s,n,r)=>s+Gs(n).rows[0].length+(r?1:0),0)*t}const ka=7,qt=new Map;function ss(e,t,a,s=1){const n=`${e}|${t}|${a}|${s}`;let r=qt.get(n);if(r)return r;const i=Vs(e),o=a?1:0;r=document.createElement("canvas"),r.width=Math.max(1,gr(i,s)+o*2),r.height=(ka+4)*s+o*2;const l=r.getContext("2d"),c=(u,m)=>l.fillRect(u,m,s,s),h=(u,m,w)=>{l.fillStyle=w;let y=o+u;const C=o+m+2*s;for(const Q of i){const E=Gs(Q);if(E.rows.forEach((N,F)=>[...N].forEach((Z,Me)=>Z==="#"&&c(y+Me*s,C+F*s))),E.accent){const N=E.dir==="up"?C-2*s:C+ka*s;E.accent.forEach((F,Z)=>[...F].forEach((Me,$e)=>Me==="#"&&c(y+$e*s,N+Z*s)))}y+=(E.rows[0].length+1)*s}};if(a)for(const[u,m]of _s)h(u,m,a);return h(0,0,t),qt.size>400&&qt.clear(),qt.set(n,r),r}const ns="#1f2130",Ds="#fbfaf7",br={ouro:"#f5c542",bomba:"#4a4458",brilho:"#9fd8ff",sorte:"#86d46b",holo:"#e3b6ff",vidro:"#dff4f7"},ha=e=>`800 ${e}px system-ui, "Segoe UI", sans-serif`;function Ne(e,t,a,s,n,r){e.beginPath(),e.roundRect(t,a,s,n,r)}function yr(e,t,a,s,n){e.beginPath(),t==="r"?e.arc(a,s,n,0,Math.PI*2):t==="y"?(e.moveTo(a,s-n),e.lineTo(a+n,s+n*.8),e.lineTo(a-n,s+n*.8)):t==="g"?e.rect(a-n*.85,s-n*.85,n*1.7,n*1.7):(e.moveTo(a,s-n*1.1),e.lineTo(a+n,s),e.lineTo(a,s+n*1.1),e.lineTo(a-n,s)),e.closePath(),e.fill()}function vr(e){return e.kind==="num"?String(e.value):e.kind==="draw2"?"+2":e.kind==="wild4"?"+4":""}function rs(e,t,a,s){e.lineWidth=s*.28,e.beginPath(),e.arc(t,a,s,0,Math.PI*2),e.moveTo(t-s*.7,a+s*.7),e.lineTo(t+s*.7,a-s*.7),e.stroke()}function os(e,t,a,s){e.lineWidth=s*.26,e.lineCap="round";for(const n of[1,-1]){e.beginPath(),e.arc(t,a,s*.8,n===1?Math.PI*1.1:Math.PI*.1,n===1?Math.PI*1.85:Math.PI*.85),e.stroke();const r=n===1?Math.PI*1.85:Math.PI*.85,i=t+Math.cos(r)*s*.8,o=a+Math.sin(r)*s*.8,l=r+Math.PI/2;e.beginPath(),e.moveTo(i+Math.cos(l)*s*.45,o+Math.sin(l)*s*.45),e.lineTo(i+Math.cos(l-2.3)*s*.4,o+Math.sin(l-2.3)*s*.4),e.lineTo(i+Math.cos(l+2.3)*s*.4,o+Math.sin(l+2.3)*s*.4),e.closePath(),e.fill()}}function is(e,t,a,s){["r","y","g","b"].forEach((r,i)=>{e.fillStyle=ne[r],e.beginPath(),e.moveTo(t,a),e.arc(t,a,s,i*Math.PI/2-Math.PI/2,(i+1)*Math.PI/2-Math.PI/2),e.closePath(),e.fill()})}function kr(e,t,a,s){const n=a/2;if(t==="vidro")e.strokeStyle="rgba(255,255,255,0.55)",e.lineWidth=a*.03,e.beginPath(),e.moveTo(a*.18,s*.3),e.lineTo(a*.42,s*.12),e.moveTo(a*.58,s*.88),e.lineTo(a*.85,s*.66),e.stroke();else if(t==="holo"){const r=e.createLinearGradient(0,0,a,s);["#ff7a7a","#ffd36b","#7ae08a","#7ab8ff","#c49bff"].forEach((i,o)=>r.addColorStop(o/4,i)),e.globalAlpha=.3,e.fillStyle=r,Ne(e,a*.055,a*.055,a*.89,s-a*.11,a*.07),e.fill(),e.globalAlpha=1}else if(t==="brilho"){e.fillStyle="#fff";for(const[r,i,o]of[[.78,.2,.07],[.22,.75,.06],[.7,.72,.045]])e.beginPath(),e.moveTo(a*r,s*i-a*o),e.lineTo(a*r+a*o*.3,s*i),e.lineTo(a*r,s*i+a*o),e.lineTo(a*r-a*o*.3,s*i),e.closePath(),e.fill()}else if(t==="sorte"){e.fillStyle="#2f8a3a";for(const[r,i]of[[-1,0],[1,0],[0,-1],[0,1]])e.beginPath(),e.arc(n+r*a*.05,s*.9+i*a*.05,a*.05,0,Math.PI*2),e.fill()}else t==="ouro"?(e.fillStyle="#b98a12",e.beginPath(),e.arc(n,s*.9,a*.08,0,Math.PI*2),e.fill(),e.fillStyle="#f5c542",e.beginPath(),e.arc(n,s*.9,a*.055,0,Math.PI*2),e.fill()):t==="bomba"&&(e.fillStyle="#1c1a28",e.beginPath(),e.arc(n,s*.9,a*.07,0,Math.PI*2),e.fill(),e.strokeStyle="#f5b52e",e.lineWidth=a*.02,e.beginPath(),e.moveTo(n+a*.04,s*.86),e.lineTo(n+a*.08,s*.82),e.stroke())}function wr(e,t,a,s){const n=a*.1;e.fillStyle=t.enh&&br[t.enh]||Ds,Ne(e,0,0,a,s,n),e.fill();const r=a*.055;e.fillStyle=t.color?ne[t.color]:ns,Ne(e,r,r,a-r*2,s-r*2,n*.7),e.fill(),t.enh==="vidro"&&(e.fillStyle="rgba(255,255,255,0.3)",Ne(e,r,r,a-r*2,s-r*2,n*.7),e.fill()),e.save(),Ne(e,r,r,a-r*2,s-r*2,n*.7),e.clip(),e.fillStyle="rgba(255,255,255,0.13)",e.beginPath(),e.moveTo(r,s*.62),e.lineTo(a-r,s*.22),e.lineTo(a-r,s*.42),e.lineTo(r,s*.82),e.closePath(),e.fill(),e.restore(),t.enh&&kr(e,t.enh,a,s);const i=a/2,o=s/2,l=a*.3;e.fillStyle="#fff",e.strokeStyle="#fff";const c=vr(t);t.kind==="wild"||t.kind==="wild4"?(is(e,i,o,l),e.lineWidth=a*.035,e.beginPath(),e.arc(i,o,l,0,Math.PI*2),e.stroke(),c&&(e.fillStyle="#fff",e.font=ha(a*.3),e.textAlign="center",e.textBaseline="middle",e.lineWidth=a*.05,e.strokeStyle=ns,e.strokeText(c,i,o+a*.02),e.fillText(c,i,o+a*.02))):(e.lineWidth=a*.04,e.beginPath(),e.arc(i,o,l*1.12,0,Math.PI*2),e.stroke(),t.kind==="skip"?rs(e,i,o,l*.62):t.kind==="rev"?os(e,i,o,l*.8):(e.font=ha(c.length>1?a*.36:a*.46),e.textAlign="center",e.textBaseline="middle",e.fillText(c,i,o+a*.03),t.kind==="num"&&(t.value===6||t.value===9)&&e.fillRect(i-a*.1,o+a*.22,a*.2,a*.03)));const h=(u,m,w)=>{e.save(),e.translate(u,m),e.rotate(w),e.fillStyle="#fff",e.strokeStyle="#fff";const y=a*.15;t.kind==="skip"?rs(e,0,0,y*.42):t.kind==="rev"?os(e,0,0,y*.55):t.kind==="wild"?is(e,0,0,y*.45):(e.font=ha(y),e.textAlign="center",e.textBaseline="middle",e.fillText(c,0,y*.05)),t.color&&(e.fillStyle="rgba(255,255,255,0.85)",yr(e,t.color,0,y*.9,y*.17)),e.restore()};h(a*.2,s*.14,0),h(a*.8,s*.86,Math.PI)}function Mr(e,t,a){const s=t*.1;e.fillStyle=Ds,Ne(e,0,0,t,a,s),e.fill();const n=t*.055;e.fillStyle="#7d2238",Ne(e,n,n,t-n*2,a-n*2,s*.7),e.fill();const r=t/2,i=a/2,o=t*.17;["r","y","b","g"].forEach((c,h)=>{e.fillStyle=ne[c];const u=h%2===0?-1:1,m=h<2?-1:1;e.beginPath(),e.roundRect(r+(u<0?-o-o*.08:o*.08),i+(m<0?-o-o*.08:o*.08),o,o,o*.25),e.fill()}),e.strokeStyle="rgba(255,255,255,0.18)",e.lineWidth=t*.02,e.beginPath(),e.arc(r,i,o*1.9,0,Math.PI*2),e.stroke()}const ne={r:"#f0524f",y:"#f5b52e",g:"#3cb371",b:"#3d8ff0"},St={r:"#a8302f",y:"#b97c12",g:"#237a4b",b:"#2459a8"},Ws={r:"Vermelho",y:"Amarelo",g:"Verde",b:"Azul"},xe="#1c1a28",zs="#f3ead7",$r="#2c2840";class Us{constructor(){b(this,"cache",new Map);b(this,"hd",!1);b(this,"k",1)}reset(t=this.hd,a=this.k){this.hd=t,this.k=t?a:1,this.cache.clear()}face(t,a,s,n=!1,r=!1){const i=`${t.kind}${t.color}${t.value}${t.enh??""}|${a}|${s}|${n?1:0}${r?1:0}`;return this.get(i,a,s,o=>{if(this.hd?wr(o,t,a,s):Cr(o,t,a,s),o.globalCompositeOperation="source-atop",r){o.fillStyle="rgba(120,20,30,0.45)",o.fillRect(0,0,a,s),o.fillStyle="#ff6b6b";const l=Math.min(a,s)-12,c=this.hd?.25:1;for(let h=0;h<l;h+=c)o.fillRect(6+h,(s-l)/2+h,2,2),o.fillRect(a-8-h,(s-l)/2+h,2,2)}n&&(o.fillStyle="rgba(20,16,32,0.5)",o.fillRect(0,0,a,s))})}back(t,a){return this.get(`back|${t}|${a}`,t,a,s=>this.hd?Mr(s,t,a):Lr(s,t,a))}get(t,a,s,n){let r=this.cache.get(t);if(!r){r=document.createElement("canvas"),r.width=Math.ceil(a*this.k),r.height=Math.ceil(s*this.k);const i=r.getContext("2d");i.scale(this.k,this.k),n(i),this.cache.set(t,r)}return r}}function re(e,t,a,s,n,r,i){e.fillStyle=i;for(let o=0;o<r;o++){const l=r-o;e.fillRect(t+l,a+o,s-l*2,1),e.fillRect(t+l,a+n-1-o,s-l*2,1)}e.fillRect(t,a+r,s,n-r*2)}function it(e,t,a,s,n){for(let r=-s;r<s;r++)for(let i=-s;i<s;i++){const o=i+.5,l=r+.5;o*o+l*l<=s*s&&(e.fillStyle=n(o,l),e.fillRect(t+i,a+r,1,1))}}const Et=(e,t)=>t<0?e<0?ne.r:ne.y:e<0?ne.b:ne.g,Sr={r:[".#.","###",".#."],y:[".#.",".#.","###"],g:["###","###","###"],b:[".#.","#.#",".#."]};function ls(e,t,a,s){e.fillStyle="rgba(255,255,255,0.8)",Sr[t].forEach((n,r)=>[...n].forEach((i,o)=>i==="#"&&e.fillRect(a+o,s+r,1,1)))}function cs(e){switch(e.kind){case"num":return[String(e.value)];case"draw2":return["+","2"];case"wild4":return["+","4"];case"skip":return["skip"];case"rev":return["rev"];default:return[]}}const Br={ouro:"#f5c542",bomba:"#4a4458",brilho:"#9fd8ff",sorte:"#86d46b",holo:"#e3b6ff",vidro:"#dff4f7"};function xr(e,t){return`rgb(${[1,3,5].map(s=>parseInt(e.slice(s,s+2),16)).map(s=>Math.round(s+(255-s)*t)).join(",")})`}function Cr(e,t,a,s){const n=t.enh;let r=t.color?ne[t.color]:$r;n==="vidro"&&(r=xr(r,.35)),re(e,0,0,a,s,3,xe),re(e,1,1,a-2,s-2,2,n&&Br[n]||zs),re(e,3,3,a-6,s-6,2,r),e.fillStyle="rgba(255,255,255,0.28)",e.fillRect(5,3,a-10,1),e.fillStyle="rgba(0,0,0,0.22)",e.fillRect(5,s-4,a-10,1),e.fillStyle="rgba(255,255,255,0.12)";for(let m=4;m<s-4;m++){const w=Math.round(a-6-(m-4)*.55),y=Math.max(4,w-3),C=Math.min(a-4,w+3);C>y&&e.fillRect(y,m,C-y,1)}jr(e,n,a,s);const i=Math.floor(a/2),o=Math.floor(s/2),l=Math.floor(a*.34);it(e,i,o,l+1,()=>xe),t.color?it(e,i,o,l,()=>St[t.color]):it(e,i,o,l,Et);const c=cs(t);if(t.kind==="rev"){const m=as(Math.round(l*1.25)),w=dt(m,"big");Lt(e,[m],i-Math.floor(w.w/2),o-Math.floor(w.h/2),1,"#fff",xe,"big")}else if(c.length){let m=Math.max(1,Math.floor(l*1.5/7));for(;m>1&&ca(c,"big")*m>l*1.9;)m--;const w=ca(c,"big")*m,y=dt(c[0],"big").h*m;Lt(e,c,i-Math.floor(w/2),o-Math.floor(y/2),m,"#fff",xe,"big")}const h=t.kind==="wild"?[]:t.kind==="rev"?[as(a<44?6:8)]:cs(t),u=h.length?dt(h[0],"big").h:7;if(h.length){const m=ca(h,"big");Lt(e,h,5,5,1,"#fff",xe,"big"),Lt(e,h,a-5-m,s-5-u,1,"#fff",xe,"big",!0)}else it(e,8,8,4,Et),it(e,a-8,s-8,4,Et);t.color&&(ls(e,t.color,5,7+u),ls(e,t.color,a-8,s-10-u))}function jr(e,t,a,s){if(t){if(t==="vidro"){e.fillStyle="rgba(255,255,255,0.45)";for(let n=0;n<10;n++)e.fillRect(8+n,16-n,1,1);for(let n=0;n<14;n++)e.fillRect(a-22+n,s-10-n,1,1)}else if(t==="bomba"){const n=Math.floor(a/2),r=s-8;re(e,n-3,r-2,6,6,2,"#1c1a28"),e.fillStyle="#f5b52e",e.fillRect(n+2,r-4,1,2),e.fillStyle="#f0524f",e.fillRect(n+3,r-5,1,1)}else if(t==="holo"){const n=["#ff7a7a","#ffd36b","#7ae08a","#7ab8ff","#c49bff"];e.globalAlpha=.28;for(let r=3;r<s-3;r++)e.fillStyle=n[Math.floor((r+0)/4)%n.length],e.fillRect(3,r,a-6,1);e.globalAlpha=1}else if(t==="brilho"){e.fillStyle="#ffffff";for(const[n,r]of[[a-9,8],[8,s-16],[a-12,s-20]])e.fillRect(n,r-1,1,3),e.fillRect(n-1,r,3,1)}else if(t==="sorte"){e.fillStyle="#2f8a3a";const n=Math.floor(a/2),r=s-7;for(const[i,o]of[[-1,0],[1,0],[0,-1],[0,1],[0,0]])e.fillRect(n+i*2,r+o*2,2,2)}else if(t==="ouro"){e.fillStyle="#f5c542";const n=Math.floor(a/2);re(e,n-3,s-9,6,6,1,"#b98a12"),re(e,n-2,s-8,4,4,1,"#f5c542")}}}function Lr(e,t,a){re(e,0,0,t,a,3,xe),re(e,1,1,t-2,a-2,2,zs),re(e,3,3,t-6,a-6,2,"#7d2238"),e.fillStyle="#93304a";for(let i=4;i<a-4;i++)for(let o=4;o<t-4;o++)((o+i)%6===0||(o-i+600)%6===0)&&e.fillRect(o,i,1,1);const s=Math.floor(t/2),n=Math.floor(a/2),r=Math.floor(t*.3);for(let i=-r-1;i<=r+1;i++)for(let o=-r-1;o<=r+1;o++){const l=Math.abs(o)+Math.abs(i);l>r+1||(e.fillStyle=l>r-1?xe:Et(o+.5,i+.5),e.fillRect(s+o,n+i,1,1))}e.fillStyle="rgba(255,255,255,0.3)",e.fillRect(5,3,t-10,1)}const $="#1c1a28",W="#f3ead7",S=(e=4)=>`stroke="${$}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,p=(e,t=$,a=4)=>`<path d="${e}" fill="none" stroke="${t}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`,g=(e,t,a=4)=>`<path d="${e}" fill="${t}" ${S(a)}/>`,T=(e,t,a="")=>`<path d="${e}" fill="${t}" ${a}/>`,x=(e,t,a,s,n,r=4)=>`<ellipse cx="${e}" cy="${t}" rx="${a}" ry="${s}" fill="${n}" ${r?S(r):""}/>`,B=(e,t,a,s,n="")=>`<circle cx="${e}" cy="${t}" r="${a}" fill="${s}" ${n}/>`;function L(e,t,a=.2,s=0,n=.8,r=1){const i=t.map((o,l)=>`<stop offset="${l/(t.length-1)}" stop-color="${o}"/>`).join("");return`<linearGradient id="${e}" x1="${a}" y1="${s}" x2="${n}" y2="${r}">${i}</linearGradient>`}function Fe(e,t,a=.5,s=.42,n=.62){const r=t.map((i,o)=>`<stop offset="${o/(t.length-1)}" stop-color="${i}"/>`).join("");return`<radialGradient id="${e}" cx="${a}" cy="${s}" r="${n}">${r}</radialGradient>`}function Hs(e,t,a){const s=i=>[1,3,5].map(o=>parseInt(i.slice(o,o+2),16)),[n,r]=[s(e),s(t)];return"#"+n.map((i,o)=>Math.round(i+(r[o]-i)*a).toString(16).padStart(2,"0")).join("")}const qr={clara:["#fde3c6","#f0c39a","#c98f66"],morena:["#f0c08c","#cf9460","#9a5f36"],escura:["#a86e44","#7a4a2a","#4a2a16"]},Y=(e,t)=>L(e,qr[t]);function K(e,t,a={}){const{look:s=0,iris:n="#4a3020",rx:r=7.5,ry:i=8.5}=a;return x(e,t,r,i,"#ffffff",3)+B(e+s,t+1.5,r*.62,n)+B(e+s,t+1.5,r*.32,$)+B(e+s-1.8,t-1,1.6,"#ffffff")+(a.lid?T(`M${e-r-1} ${t-1} Q${e} ${t-i-6} ${e+r+1} ${t-1} Q${e} ${t-i+2} ${e-r-1} ${t-1} Z`,a.lid,S(3)):"")}const ge=(e,t,a=8)=>p(`M${e-a} ${t} Q${e} ${t+5} ${e+a} ${t}`,$,3.5),We=(e,t,a=8)=>p(`M${e-a} ${t+3} Q${e} ${t-7} ${e+a} ${t+3}`,$,3.5),ie=(e,t=14,a=186,s=150,n=100)=>g(`M${t-10} 204 C${t-6} ${s+18} ${n-60} ${s} ${n} ${s} C${n+60} ${s} ${a+6} ${s+18} ${a+10} 204 Z`,e),se=(e,t=100,a=18,s=122)=>g(`M${t-a} ${s} L${t-a} ${s+30} Q${t} ${s+40} ${t+a} ${s+30} L${t+a} ${s} Z`,e),Pr={torcedor:{bg:["#123a24","#2f8a55"],scene:()=>B(28,26,20,"#fffbe0",'opacity="0.35" filter="url(#blur)"')+B(174,18,16,"#fffbe0",'opacity="0.3" filter="url(#blur)"')+T("M0 150 L200 132 L200 200 L0 200 Z","#0d2a1a",'opacity="0.55"'),fig:(e,t)=>{const a=ne[t],s=St[t];return`<defs>${Y("sk","morena")}${L("tm",[Hs(a,"#ffffff",.3),a,s])}</defs>`+se("#9a5f36",92,17)+g("M2 204 C6 168 38 150 92 148 C144 148 168 162 176 204 Z","url(#tm)")+p("M66 151 L92 178 L118 151",W,8)+p("M66 151 L92 178 L118 151",$,2.5)+x(51,96,8,11,"url(#sk)")+x(133,96,8,11,"url(#sk)")+x(92,92,41,47,"url(#sk)")+g("M53 84 C46 50 70 34 92 36 C118 34 140 50 131 86 C127 70 119 63 111 67 C105 57 93 58 89 65 C81 57 68 62 66 73 C60 69 55 75 53 84 Z","#2a1a12",4)+p("M68 74 Q77 64 87 70",$,5)+p("M97 70 Q107 64 116 74",$,5)+(e?We(78,86)+We(106,86):K(78,86)+K(106,86))+p("M64 101 L83 99",a,5)+p("M64 109 L83 107",a,5)+p("M101 99 L120 101",a,5)+p("M101 107 L120 109",a,5)+p("M92 92 Q98 103 90 106","#9a5f36",3)+g("M72 114 Q92 110 112 114 Q110 142 92 142 Q74 142 72 114 Z","#5a1420")+T("M76 115 L108 115 L106 122 L78 122 Z","#ffffff")+T("M90 115 L95 115 L95 122 L90 122 Z","#5a1420")+T("M80 134 Q92 125 104 134 Q100 141 92 141 Q84 141 80 134 Z","#e0605a")+`<g transform="rotate(${e?-9:0} 166 150)">`+g("M152 158 L156 112 L178 112 L182 158 Z","url(#sk)")+`<rect x="142" y="62" width="46" height="56" rx="15" fill="url(#tm)" ${S()}/><rect x="155" y="10" width="21" height="62" rx="10" fill="url(#tm)" ${S()}/>`+g("M143 80 Q128 78 129 90 Q130 100 143 98","url(#tm)")+`<text x="165" y="106" font-family="system-ui, sans-serif" font-size="30" font-weight="900" text-anchor="middle" fill="${W}" stroke="${$}" stroke-width="2">1</text></g>`}},contador:{bg:["#1c2834","#3d5870"],scene:()=>[40,64,88,112,136,160].map(e=>p(`M0 ${e} L200 ${e}`,"#ffffff",1.5)).join("").replace(/stroke="#ffffff"/g,'stroke="#ffffff" opacity="0.12"')+p("M30 0 L30 200","#f08a8a",2).replace('stroke="#f08a8a"','stroke="#f08a8a" opacity="0.35"'),fig:e=>`<defs>${Y("sk","clara")}${L("sh",["#ffffff","#e8ecf0","#aab4c2"])}${L("le",["#e8f8ff","#bfe6ff"])}</defs>`+se("#c98f66",100,13,126)+ie("url(#sh)",30,170,152)+g("M86 152 L100 168 L114 152 L108 148 L100 158 L92 148 Z","#ffffff",3)+g("M96 160 L104 160 L108 196 L100 204 L92 196 Z","#2459a8",3)+`<rect x="44" y="168" width="26" height="24" rx="3" fill="#dfe6ee" ${S(3)}/><rect x="49" y="158" width="5" height="16" rx="2" fill="#2459a8" ${S(2)}/><rect x="58" y="160" width="5" height="14" rx="2" fill="#d23a3a" ${S(2)}/>`+x(64,96,6,10,"url(#sk)")+x(136,96,6,10,"url(#sk)")+x(100,90,35,49,"url(#sk)")+p("M72 66 Q100 50 130 64","#6b4a2e",3.5)+p("M70 72 Q100 56 132 70","#6b4a2e",3.5)+p("M70 78 Q96 64 126 74","#6b4a2e",3)+`<g transform="rotate(28 140 64)"><rect x="134" y="36" width="9" height="46" rx="2" fill="#f5c542" ${S(3)}/><rect x="134" y="32" width="9" height="8" rx="2" fill="#f08a8a" ${S(3)}/><path d="M134 82 L138.5 92 L143 82 Z" fill="#e8d0a0" ${S(3)}/></g>`+p("M72 80 L90 82",$,4)+p("M110 82 L128 80",$,4)+(e?ge(85,96,7)+ge(115,96,7):K(85,96,{rx:6,ry:6.5,iris:"#3d6b9a"})+K(115,96,{rx:6,ry:6.5,iris:"#3d6b9a"}))+'<circle cx="85" cy="96" r="15" fill="url(#le)" opacity="0.45" stroke="#3a3a48" stroke-width="4"/><circle cx="115" cy="96" r="15" fill="url(#le)" opacity="0.45" stroke="#3a3a48" stroke-width="4"/>'+p("M100 95 L100 95","#3a3a48",4)+p("M70 92 L65 90","#3a3a48",3)+p("M130 92 L135 90","#3a3a48",3)+p(e?"M108 88 Q113 85 118 88":"M78 88 Q83 85 88 88","#ffffff",2.5)+p("M100 100 L96 116 Q100 119 105 116","#c98f66",3)+p("M93 128 Q100 130 107 128",$,3.5)},fominha:{bg:["#5a2410","#b8662e"],scene:e=>[0,40,80,120,160].map(t=>p(`M${t} 0 L${t} 200`,"#ffffff",1)).join("").replace(/stroke="#ffffff"/g,'stroke="#ffffff" opacity="0.08"')+p(e?"M168 70 Q178 56 168 44 Q158 32 168 20":"M164 74 Q174 60 164 48 Q154 36 164 24","#ffffff",4).replace('stroke="#ffffff"','stroke="#ffffff" opacity="0.35"'),fig:e=>`<defs>${Y("sk","clara")}${L("gr",["#5fd48f","#3cb371","#237a4b"])}${L("cx",["#ffcf7a","#e8a040","#b8701e"])}</defs>`+ie("url(#gr)",10,190,148,96)+g("M56 148 L136 148 L96 200 Z",W,3)+[70,86,102,118,82,98,110,96].map((t,a)=>B(t,156+Math.floor(a/4)*14+(a>6?14:0),2.5,"#d23a3a")).join("")+x(46,100,9,12,"url(#sk)")+x(146,100,9,12,"url(#sk)")+x(96,98,51,47,"url(#sk)")+g("M60 70 C60 44 82 40 96 46 C110 38 134 44 132 70 C124 58 112 56 100 60 C88 54 72 58 60 70 Z","#c98b3a",4)+We(78,92,9)+We(112,92,9)+B(66,110,10,"#f2a0a0",'opacity="0.75"')+B(126,110,10,"#f2a0a0",'opacity="0.75"')+p("M96 98 Q100 106 94 108","#c98f66",3)+(e?p("M82 124 Q88 120 94 124 Q100 128 106 124",$,4)+B(76,136,2.5,"#e8a040")+B(110,138,2,"#e8a040"):g("M82 120 Q96 116 108 120 Q106 136 95 136 Q84 136 82 120 Z","#7a1f2b")+T("M86 121 L104 121 L103 125 L87 125 Z","#ffffff"))+'<g transform="rotate(-18 150 126)">'+g("M150 84 C162 98 172 114 170 130 C168 146 132 146 130 130 C128 114 138 98 150 84 Z","url(#cx)")+(e?g("M134 104 Q140 98 146 104 Q142 110 134 104 Z","#f3ead7",2.5):"")+p("M140 118 Q150 122 160 118","#b8701e",2.5)+"</g>"+g("M128 140 Q124 128 136 128 Q150 130 160 138 Q164 152 150 156 Q134 156 128 140 Z","url(#sk)")+p("M138 132 L140 142","#c98f66",2.5)+p("M146 133 L148 144","#c98f66",2.5)},cabecaFria:{bg:["#0f3d48","#2a9aa8"],scene:()=>B(160,46,26,"#ffd27a",'opacity="0.55"')+T("M0 150 Q100 136 200 150 L200 200 L0 200 Z","#0b2c34",'opacity="0.5"')+p("M-4 30 Q40 20 70 46","#1b5a3a",7).replace('stroke="#1b5a3a"','stroke="#1b5a3a" opacity="0.7"')+[14,30,46].map(e=>p(`M${e} ${26+e*.2} L${e+6} ${44+e*.3}`,"#1b5a3a",5).replace('stroke="#1b5a3a"','stroke="#1b5a3a" opacity="0.7"')).join(""),fig:e=>`<defs>${Y("sk","escura")}${L("sh",["#ff7a72","#f0524f","#a8302f"])}${L("gl",["#3a4a70","#141c30"])}</defs>`+se("#4a2a16",100,17)+ie("url(#sh)")+g("M80 150 L100 196 L120 150 Z","url(#sk)",3)+p("M84 152 Q100 186 116 152","#f5c542",3.5)+B(100,182,5,"#f5c542",S(2.5))+[[40,172],[150,168],[166,190],[24,192]].map(([t,a])=>`<ellipse cx="${t}" cy="${a}" rx="10" ry="5" fill="#3cb371" transform="rotate(-30 ${t} ${a})" ${S(2.5)}/>`).join("")+g("M80 150 L68 158 L86 172 Z","#d8403d",3)+g("M120 150 L132 158 L114 172 Z","#d8403d",3)+x(60,96,7,11,"url(#sk)")+x(140,96,7,11,"url(#sk)")+x(100,92,40,46,"url(#sk)")+g("M60 80 L60 52 Q100 38 140 52 L140 80 Q100 70 60 80 Z","#140c08",4)+g("M62 86 L138 86 L136 98 Q126 108 106 102 L100 96 L94 102 Q74 108 64 98 Z","url(#gl)",4)+p(e?"M112 90 L122 100":"M70 90 L80 100","#8fc8f0",3)+p(e?"M118 89 L126 97":"M76 89 L84 97","#8fc8f0",2)+p("M100 104 Q104 112 98 114","#4a2a16",3)+p("M86 126 Q100 130 112 124",$,4)+p(e?"M112 124 L136 116":"M112 124 L136 130","#e8d0a0",3.5)},seteDeOuro:{bg:["#22163e","#6a44a0"],scene:()=>[[24,30],[176,40],[34,120],[170,128],[150,14]].map(([e,t])=>T(`M${e} ${t-6} L${e+2} ${t-2} L${e+6} ${t} L${e+2} ${t+2} L${e} ${t+6} L${e-2} ${t+2} L${e-6} ${t} L${e-2} ${t-2} Z`,"#ffe9a0",'opacity="0.6"')).join(""),fig:e=>`<defs>${Y("sk","morena")}${L("ht",["#fff7e0","#efe3c0","#bfae80"])}<pattern id="lst" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="16" height="16" fill="#f3f6fb"/><rect width="7" height="16" fill="#3d8ff0"/></pattern></defs>`+se("#9a5f36")+ie("url(#lst)")+p("M84 150 L100 172 L116 150","#f5c542",3)+g("M92 172 L108 172 L104 178 L99 192 L95 192 L100 178 L92 178 Z","#f5c542",2.5)+x(60,98,7,11,"url(#sk)")+x(140,98,7,11,"url(#sk)")+x(100,94,40,45,"url(#sk)")+g("M30 66 Q100 50 170 66 Q164 76 100 74 Q36 76 30 66 Z","url(#ht)")+g("M62 66 Q60 30 100 28 Q140 30 138 66 Q100 58 62 66 Z","url(#ht)")+g("M62 60 Q100 52 138 60 L138 68 Q100 60 62 68 Z","#2459a8",3)+p("M70 80 L88 82",$,4.5)+p("M108 78 Q118 70 130 76",$,4.5)+K(80,92)+ge(118,94,8)+p("M100 96 Q106 108 98 110","#9a5f36",3)+p("M80 116 Q90 112 100 115 Q110 112 120 116","#2a1a12",4)+g("M78 122 Q100 140 124 120 Q100 128 78 122 Z","#ffffff",3.5)+T("M104 123 L111 122 L110 128 L104 128 Z","#f5c542")+(e?T("M120 108 L122 114 L128 116 L122 118 L120 124 L118 118 L112 116 L118 114 Z","#ffffff"):"")},carrasco:{bg:["#1e0608","#7a1a1c"],scene:()=>[30,70,110,150,190].map(e=>p(`M${e} 0 L${e} 200`,"#000000",6)).join("").replace(/stroke="#000000"/g,'stroke="#000000" opacity="0.25"'),fig:e=>`<defs>${L("mu",["#e8b07c","#c48552","#7a4a2a"])}${L("hd",["#4a4a5a","#26262e","#121218"])}${L("ax",["#ffffff","#d4dde0","#7f8c93"])}${Fe("ey",["#fff3c0","#ff9a3a","#ff3a1a"],.5,.5,.5)}</defs>`+g("M0 204 C0 168 30 146 100 144 C170 146 200 168 200 204 Z","url(#mu)")+p("M70 170 Q86 178 100 172 Q114 178 130 170","#7a4a2a",3)+p("M100 174 L100 200","#7a4a2a",3)+g("M100 14 C122 40 146 80 148 120 C150 146 132 160 100 162 C68 160 50 146 52 120 C54 80 78 40 100 14 Z","url(#hd)")+g("M58 140 C46 150 40 160 50 166 L150 166 C160 160 154 150 142 140 Z","url(#hd)")+g("M70 92 Q82 84 94 94 Q84 104 70 92 Z","#08080c",3)+g("M106 94 Q118 84 130 92 Q116 104 106 94 Z","#08080c",3)+B(83,94,e?7:4.5,"url(#ey)")+B(117,94,e?7:4.5,"url(#ey)")+(e?B(83,94,13,"#ff5a3a",'opacity="0.35" filter="url(#blur)"')+B(117,94,13,"#ff5a3a",'opacity="0.35" filter="url(#blur)"'):"")+`<rect x="160" y="18" width="11" height="170" rx="4" fill="#8b5a2b" ${S(3.5)}/>`+g("M166 30 C190 22 202 40 198 60 C190 52 178 52 166 58 Z","url(#ax)")+g("M166 30 C146 20 132 36 134 56 C144 50 156 52 166 58 Z","url(#ax)")+g("M150 146 Q148 132 164 132 Q180 134 180 148 Q178 162 164 162 Q150 160 150 146 Z","url(#mu)")},apressado:{bg:["#3e3414","#9a8434"],scene:()=>[36,70,104].map((e,t)=>p(`M${4+t*6} ${e} L${34+t*4} ${e}`,W,4)).join("")+T("M86 200 L96 160 L104 160 L114 200 Z","#f5c542",'opacity="0.35"'),fig:e=>`<defs>${Y("sk","clara")}${L("hm",["#ffb070","#e8732a","#a8460f"])}${L("jk",["#44444f","#2a2a33","#16161c"])}${L("bx",["#ff6a5a","#d23a3a","#8a1a1a"])}</defs><rect x="30" y="74" width="140" height="92" rx="8" fill="url(#bx)" ${S()}/><text x="52" y="100" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="${W}">JÁ!</text>`+se("#c98f66",100,15)+ie("url(#jk)")+p("M10 184 L190 184","#f5c542",7)+x(100,96,38,44,"url(#sk)")+g("M56 104 C50 50 76 30 100 30 C124 30 150 50 144 104 L132 104 C134 74 124 62 100 62 C76 62 66 74 68 104 Z","url(#hm)")+p("M100 30 L100 62",W,6)+g("M64 52 Q100 24 136 52 L132 40 Q100 16 68 40 Z","#24304a",3)+p("M74 40 Q90 30 104 30","#7fb6e6",3)+p("M68 104 Q74 132 90 136","#a8460f",3.5)+p("M132 104 Q126 132 110 136","#a8460f",3.5)+p("M74 78 Q82 72 90 78",$,4)+p("M110 78 Q118 72 126 78",$,4)+x(82,92,9,10,"#ffffff",3)+B(83,94,3,$)+x(118,92,9,10,"#ffffff",3)+B(117,94,3,$)+p("M100 98 Q104 106 98 108","#c98f66",3)+x(100,122,10,9,"#7a1f2b",3.5)+T(`M${e?150:148} ${e?104:80} Q${e?156:154} ${e?116:92} ${e?150:148} ${e?120:96} Q${e?144:142} ${e?116:92} ${e?150:148} ${e?104:80} Z`,"#8cc8ff",S(2.5))+T("M54 70 Q58 78 54 82 Q50 78 54 70 Z","#8cc8ff",S(2.5))},colecionador:{bg:["#2e1a0e","#7a5232"],scene:()=>'<rect x="10" y="20" width="38" height="48" rx="2" fill="none" stroke="#d4a64a" stroke-width="4" opacity="0.45"/><rect x="156" y="30" width="34" height="40" rx="2" fill="none" stroke="#d4a64a" stroke-width="4" opacity="0.45"/><rect x="16" y="26" width="26" height="36" fill="#000" opacity="0.15"/>',fig:e=>`<defs>${Y("sk","clara")}${L("ht",["#4a4a5a","#26262e","#121218"])}${L("co",["#8a5ab0","#5a3a7a","#3a2450"])}${L("wh",["#ffffff","#ececf4","#b8b8cc"])}</defs>`+se("#c98f66")+ie("url(#co)")+g("M84 150 Q100 166 116 150 L112 184 Q100 192 88 184 Z",W,3)+x(100,98,37,43,"url(#sk)")+`<rect x="62" y="8" width="76" height="56" rx="6" fill="url(#ht)" ${S()}/><rect x="62" y="48" width="76" height="10" fill="#a8302f" ${S(3)}/><g transform="rotate(14 128 30)"><rect x="122" y="10" width="16" height="22" rx="2" fill="${W}" ${S(2.5)}/><text x="130" y="27" font-family="system-ui" font-size="13" font-weight="900" text-anchor="middle" fill="#f0524f">7</text></g><g transform="rotate(-8 112 30)"><rect x="104" y="14" width="15" height="20" rx="2" fill="${W}" ${S(2.5)}/><circle cx="111.5" cy="24" r="4" fill="#3d8ff0"/></g>`+g("M40 62 L160 62 L156 70 L44 70 Z","url(#ht)")+g(e?"M64 72 Q76 62 92 72 Q78 74 64 72 Z":"M64 78 Q76 68 92 78 Q78 80 64 78 Z","url(#wh)",3)+g("M108 78 Q124 68 136 78 Q122 80 108 78 Z","url(#wh)",3)+K(80,92,{iris:"#5a7a3a"})+K(120,92,{iris:"#5a7a3a"})+'<circle cx="120" cy="92" r="14" fill="#ffffff" fill-opacity="0.15" stroke="#f5c542" stroke-width="4"/>'+p(e?"M112 84 Q116 80 122 82":"M124 84 Q128 86 129 90","#ffffff",2.5)+p("M134 96 Q142 120 132 150","#f5c542",2)+p("M100 96 Q106 110 98 112","#c98f66",3)+g("M66 120 Q72 108 100 112 Q128 108 134 120 Q138 134 124 132 Q112 124 100 126 Q88 124 76 132 Q62 134 66 120 Z","url(#wh)",3.5)+p("M92 132 Q100 136 108 132",$,3)},gemeos:{bg:["#14306a","#3a74c8"],scene:()=>p("M0 24 Q100 48 200 24","#ffffff",1.5).replace('stroke="#ffffff"','stroke="#ffffff" opacity="0.5"')+[20,52,84,116,148,180].map((e,t)=>T(`M${e-7} ${28+Math.sin(t)*3} L${e+7} ${30+Math.sin(t)*3} L${e} 44 Z`,["#f0524f","#f5c542","#3cb371","#3d8ff0"][t%4],'opacity="0.7"')).join(""),fig:e=>{const t=(a,s,n)=>se("#9a5f36",a,11,140)+g(`M${a-48} 204 C${a-46} 172 ${a-30} 160 ${a} 160 C${a+30} 160 ${a+46} 172 ${a+48} 204 Z`,"url(#lst)")+x(a-32,118,6,9,"url(#sk)")+x(a+32,118,6,9,"url(#sk)")+x(a,116,31,33,"url(#sk)")+g(`M${a-30} 104 Q${a-30} 76 ${a} 76 Q${a+30} 76 ${a+30} 104 Q${a} 96 ${a-30} 104 Z`,"url(#cp)")+g(`M${a+s*24} 104 Q${a+s*46} 104 ${a+s*50} 110 Q${a+s*34} 112 ${a+s*22} 108 Z`,"#a8302f",3.5)+B(a,88,5,W,S(2))+(n?ge(a-12,116,6):K(a-12,116,{rx:6,ry:7}))+K(a+12,116,{rx:6,ry:7})+[-18,-14,14,18].map(r=>B(a+r,128+(Math.abs(r)-14)/2,1.5,"#a8693f")).join("")+g(`M${a-12} 134 Q${a} 146 ${a+12} 134 Q${a} 138 ${a-12} 134 Z`,"#ffffff",3);return`<defs>${Y("sk","morena")}${L("cp",["#ff7a72","#f0524f","#a8302f"])}<pattern id="lst" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#f5c542"/><rect y="7" width="12" height="5" fill="#3d8ff0"/></pattern></defs>`+t(58,-1,e)+t(142,1,!1)}},escadeiro:{bg:["#3a3a42","#7a7a88"],scene:()=>Array.from({length:10},(e,t)=>Array.from({length:6},(a,s)=>`<rect x="${s*40-t%2*20}" y="${t*20}" width="38" height="18" rx="2" fill="#8a4a3a" opacity="0.18"/>`).join("")).join(""),fig:e=>`<defs>${Y("sk","escura")}${L("hh",["#ffe07a","#f5c542","#b97c12"])}${L("vs",["#ffa060","#e8732a","#a8460f"])}</defs><g opacity="0.95"><rect x="150" y="10" width="8" height="190" fill="#b8864a" ${S(3)}/><rect x="186" y="10" width="8" height="190" fill="#b8864a" ${S(3)}/>${[30,66,102,138,174].map(t=>`<rect x="150" y="${t}" width="44" height="7" fill="#9a6c34" ${S(2.5)}/>`).join("")}</g>`+se("#4a2a16")+ie("url(#vs)")+g("M84 150 L100 172 L116 150 Z","url(#sk)",3)+p("M8 182 L192 182","#e8eef2",7)+p("M60 152 L54 204","#e8eef2",7)+p("M140 152 L146 204","#e8eef2",7)+x(60,98,7,11,"url(#sk)")+x(140,98,7,11,"url(#sk)")+x(100,96,40,45,"url(#sk)")+g("M56 70 Q56 26 100 26 Q144 26 144 70 Z","url(#hh)")+g("M44 70 L156 70 L152 80 L48 80 Z","#d8a020",3.5)+p("M100 26 L100 70","#b97c12",4)+p("M74 40 Q84 32 96 32","#ffffff",3.5)+p("M70 88 L88 86",$,5)+p("M112 86 L130 88",$,5)+(e?ge(80,98)+ge(120,98):K(80,98,{iris:"#3a2414"})+K(120,98,{iris:"#3a2414"}))+p("M100 100 Q106 110 98 114","#4a2a16",3)+g("M70 122 Q84 112 100 118 Q116 112 130 122 Q124 132 112 128 Q100 124 88 128 Q76 132 70 122 Z","#140c08",3)+p("M90 134 Q100 140 110 134",$,3.5)},ultimoSuspiro:{bg:["#0a0e26","#26346a"],scene:()=>[[20,30,2],[60,14,1.5],[150,24,2],[180,70,1.5],[30,100,1.5],[170,140,2],[12,160,1.5]].map(([e,t,a])=>B(e,t,a,"#ffffff",'opacity="0.8"')).join(""),fig:e=>`<defs>${L("gh",["#f4fbff","#c4e4f4","#8fb4cc"])}${Fe("ha",["#fff8c0","#f5e27a"],.5,.5,.5)}</defs><g opacity="0.9">`+g("M48 120 C40 160 56 196 88 196 C106 196 112 184 128 188 C150 194 164 176 158 150 C154 132 152 120 150 110 Z","url(#gh)")+g("M128 188 C140 196 156 198 166 188","url(#gh)",3)+x(100,90,46,50,"url(#gh)")+`</g><ellipse cx="100" cy="30" rx="34" ry="8" fill="none" stroke="url(#ha)" stroke-width="${e?8:6}"/>`+(e?'<ellipse cx="100" cy="30" rx="34" ry="8" fill="none" stroke="#fff3a0" stroke-width="14" opacity="0.3" filter="url(#blur)"/>':"")+g("M56 82 C46 76 46 96 54 98 C48 104 54 112 60 106","#ffffff",3)+g("M144 82 C154 76 154 96 146 98 C152 104 146 112 140 106","#ffffff",3)+p("M72 80 Q82 76 90 80","#8fb4cc",4)+p("M110 80 Q118 76 128 80","#8fb4cc",4)+ge(82,92,9)+ge(118,92,9)+p("M100 96 Q104 106 98 108","#8fb4cc",3)+x(100,122,6,8,"#3a4a66",3.5)+(e?`<g opacity="0.85">${B(126,116,7,"#ffffff",S(2))}${B(138,110,9,"#ffffff",S(2))}${B(146,124,6,"#ffffff",S(2))}</g>`:"")+`<g transform="rotate(-6 100 160)"><rect x="84" y="134" width="32" height="46" rx="5" fill="${W}" ${S(3.5)}/><rect x="89" y="139" width="22" height="36" rx="3" fill="#f0524f"/><text x="100" y="166" font-family="system-ui" font-size="24" font-weight="900" text-anchor="middle" fill="${W}">1</text></g>`+x(80,170,10,8,"url(#gh)",3)+x(120,170,10,8,"url(#gh)",3)},agiotaAmigo:{bg:["#0e2a18","#2f6a3e"],scene:()=>[[24,40],[176,34],[20,130],[180,120]].map(([e,t])=>`<text x="${e}" y="${t}" font-family="system-ui" font-size="28" font-weight="900" text-anchor="middle" fill="#7ad08a" opacity="0.3">$</text>`).join(""),fig:e=>`<defs>${Y("sk","morena")}${L("su",["#50506a","#3a3a48","#22222c"])}<pattern id="pin" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="url(#su)"/><rect x="4" width="1.5" height="10" fill="#6e6e88"/></pattern></defs>`+se("#9a5f36",100,22)+ie("url(#pin)",6,194,146)+g("M80 146 L100 196 L120 146 Z",W,3)+g("M94 152 L106 152 L110 194 L100 200 L90 194 Z","#a8302f",3)+p("M74 150 Q100 176 126 150","#f5c542",3.5)+x(52,100,8,12,"url(#sk)")+x(148,100,8,12,"url(#sk)")+g("M54 92 C52 50 74 36 100 36 C126 36 148 50 146 92 C150 126 132 148 100 148 C68 148 50 126 54 92 Z","url(#sk)")+p(e?"M74 42 Q84 36 94 40":"M76 46 Q86 40 96 44","#ffffff",5).replace('stroke="#ffffff"','stroke="#ffffff" opacity="0.7"')+p("M68 80 L88 78",$,4.5)+p(e?"M112 72 Q122 66 132 72":"M112 78 L132 80",$,4.5)+`<circle cx="80" cy="92" r="11" fill="#1e2a1e" ${S(3.5)}/><circle cx="120" cy="92" r="11" fill="#1e2a1e" ${S(3.5)}/>`+p("M91 92 L109 92",$,3.5)+p("M74 87 L78 84","#7ab87a",2.5)+p("M114 87 L118 84","#7ab87a",2.5)+p("M100 96 Q107 108 98 110","#9a5f36",3)+g("M66 114 Q100 112 134 114 Q128 140 100 140 Q72 140 66 114 Z","#5a1420")+T("M70 115 L130 115 L127 124 L73 124 Z","#ffffff")+[82,94,106,118].map(t=>p(`M${t} 115 L${t} 124`,"#c9c0ae",1.5)).join("")+T("M86 132 Q100 126 114 132 Q108 139 100 139 Q92 139 86 132 Z","#e0605a")},cofre:{bg:["#2a1c0a","#6a4e22"],scene:()=>[20,60,140,180].map(e=>`<rect x="${e-4}" y="0" width="8" height="200" fill="#000" opacity="0.22"/>`).join(""),fig:e=>`<defs>${L("me",["#e4ecef","#9fb0ba","#55636b"])}${L("dr",["#c4d2d8","#8a9aa3","#5d6b73"])}${Fe("dl",["#ffe07a","#f5c542","#b97c12"],.4,.35,.7)}</defs><rect x="56" y="180" width="18" height="20" rx="3" fill="#3d474d" ${S(3)}/><rect x="126" y="180" width="18" height="20" rx="3" fill="#3d474d" ${S(3)}/><rect x="20" y="22" width="160" height="164" rx="14" fill="url(#me)" ${S()}/><rect x="34" y="36" width="132" height="136" rx="8" fill="url(#dr)" ${S(3)}/>`+[[28,30],[172,30],[28,178],[172,178]].map(([t,a])=>B(t,a,4,"#e4ecef",S(2))).join("")+`<g transform="rotate(${e?120:0} 74 88)">${B(74,88,24,"url(#dl)",S())}${B(74,88,9,"#b97c12",S(3))}<rect x="71" y="62" width="6" height="12" rx="2" fill="${$}"/></g>`+[0,45,90,135,180,225,270,315].map(t=>`<line x1="${74+Math.cos(t*Math.PI/180)*18}" y1="${88+Math.sin(t*Math.PI/180)*18}" x2="${74+Math.cos(t*Math.PI/180)*22}" y2="${88+Math.sin(t*Math.PI/180)*22}" stroke="${$}" stroke-width="2"/>`).join("")+x(128,90,14,12,"#ffffff",3.5)+B(128,93,6,$)+g("M112 84 Q128 74 144 84 L144 90 Q128 86 112 90 Z","#8a9aa3",3)+`<rect x="70" y="132" width="60" height="10" rx="5" fill="${$}"/><ellipse cx="100" cy="132" rx="11" ry="5" fill="#f5c542" ${S(2.5)}/><rect x="168" y="80" width="16" height="44" rx="6" fill="#8a9aa3" ${S(3.5)}/>`},patrao:{bg:["#2e0814","#7a1a34"],scene:()=>[0,30,60,90,120,150,180].map(e=>`<rect x="${e}" y="0" width="14" height="200" fill="#000" opacity="0.16"/>`).join(""),fig:e=>`<defs>${Y("sk","clara")}${L("su",["#ffffff","#f3ead7","#c4b9a0"])}${L("ht",["#7a5232","#5a3a22","#3a2414"])}${L("gr",["#f0f0f6","#c8c8d0","#8e8e9c"])}</defs>`+se("#c98f66",100,26)+ie("url(#su)",4,196,144)+g("M82 146 L100 200 L118 146 Z","#2a1e1e",3)+g("M95 152 L105 152 L108 196 L100 200 L92 196 Z","#7a1f2b",3)+x(50,102,8,12,"url(#sk)")+x(150,102,8,12,"url(#sk)")+g("M52 94 C52 58 74 46 100 46 C126 46 148 58 148 94 C152 134 134 152 100 152 C66 152 48 134 52 94 Z","url(#sk)")+g("M18 60 Q100 40 182 60 Q172 72 100 68 Q28 72 18 60 Z","url(#ht)")+g("M56 62 Q54 18 100 16 Q146 18 144 62 Q100 54 56 62 Z","url(#ht)")+g("M56 54 Q100 46 144 54 L144 62 Q100 54 56 62 Z","#1c120c",3)+g("M64 82 Q78 74 94 82 L92 88 Q78 82 66 88 Z","url(#gr)",3)+g("M106 82 Q122 74 136 82 L134 88 Q122 82 108 88 Z","url(#gr)",3)+K(80,98,{lid:"#e0ac80",iris:"#4a5a6a"})+K(120,98,{lid:"#e0ac80",iris:"#4a5a6a"})+p("M100 100 Q108 114 98 116","#c98f66",3.5)+g("M56 124 Q70 110 100 116 Q130 110 144 124 Q150 140 132 136 Q116 128 100 130 Q84 128 68 136 Q50 140 56 124 Z","url(#gr)",3.5)+p("M88 140 Q100 144 112 140",$,3)+`<rect x="112" y="132" width="44" height="10" rx="4" fill="#7a4a2a" ${S(3)}/>`+B(156,137,e?6:4.5,e?"#ffb070":"#ff7a3a")+p(e?"M160 118 Q170 104 160 92 Q150 80 160 66":"M160 128 Q168 116 160 106 Q152 96 160 84","#e4ecef",4).replace('stroke="#e4ecef"','stroke="#e4ecef" opacity="0.7"')},viraLata:{bg:["#1c4670","#5a96cc"],scene:()=>`<g opacity="0.8">${B(36,40,14,"#ffffff")}${B(54,34,18,"#ffffff")}${B(72,42,12,"#ffffff")}</g>`+T("M0 172 Q100 160 200 172 L200 200 L0 200 Z","#3a8a4a",'opacity="0.6"'),fig:e=>`<defs>${L("fu",["#f0aa5a","#d08a3c","#9a5c22"])}${L("mz",["#fff4dc","#f0d2a0","#c9a36e"])}</defs>`+g("M22 204 C28 160 58 144 100 144 C142 144 172 160 178 204 Z","url(#fu)")+g("M68 150 Q100 140 132 150 Q130 190 100 200 Q70 190 68 150 Z","url(#mz)",3)+p("M66 148 Q100 162 134 148","#d23a3a",8)+p("M66 148 Q100 162 134 148",$,2)+B(100,166,7,"#f5c542",S(3))+`<g transform="rotate(${e?-6:0} 66 66)">${g("M58 82 L48 30 Q52 20 64 30 L84 64 Z","url(#fu)")}${g("M60 70 L54 38 L70 58 Z","#c9784a",0)}</g>`+g("M136 66 Q160 56 166 76 Q170 104 152 112 Q146 92 132 80 Z","#9a5c22")+x(100,98,46,44,"url(#fu)")+g("M70 112 Q72 92 100 92 Q128 92 130 112 Q130 136 100 138 Q70 136 70 112 Z","url(#mz)",3.5)+K(78,86,{rx:7,ry:8,iris:"#3a2414"})+K(122,86,{rx:7,ry:8,iris:"#3a2414"})+p("M68 72 Q76 68 84 72","#7a4a1a",4)+p("M116 72 Q124 68 132 72","#7a4a1a",4)+g("M90 100 Q100 94 110 100 Q108 110 100 110 Q92 110 90 100 Z",$,2)+B(96,100,2,"#ffffff",'opacity="0.6"')+p("M100 110 L100 118",$,3.5)+p("M86 118 Q93 126 100 118 Q107 126 114 118",$,3.5)+(e?g("M94 122 Q100 120 106 122 Q108 138 100 140 Q92 138 94 122 Z","#f07a8a",3)+p("M100 124 L100 134","#c04a5a",2):"")},bichoPapao:{bg:["#05030a","#2a1440"],scene:()=>T("M150 0 L162 0 L200 200 L176 200 Z","#f5e27a",'opacity="0.12"'),fig:e=>`<defs>${L("fu",["#b58ae8","#7d4bb5","#3e2068"])}${L("hn",["#fff6e0","#e8dcc0","#a89a7a"])}${Fe("ey",["#fff8b0","#ffe14a","#e0a010"],.4,.35,.7)}</defs>`+g("M40 28 Q26 6 36 0 Q48 12 60 40 Z","url(#hn)")+g("M160 28 Q174 6 164 0 Q152 12 140 40 Z","url(#hn)")+g("M14 120 C8 64 44 26 100 26 C156 26 192 64 186 120 C184 160 160 196 100 200 C40 196 16 160 14 120 Z","url(#fu)")+[30,50,70,90,110,130,150,170].map((t,a)=>T(`M${t-8} ${36+Math.abs(100-t)*.18} L${t} ${24+Math.abs(100-t)*.18-a%2*4} L${t+8} ${36+Math.abs(100-t)*.18} Z`,"#a77ad8")).join("")+(e?ge(62,82,18):x(62,82,20,18,"url(#ey)",4)+B(62,84,7,$)+B(57,78,3,"#ffffff"))+x(138,82,20,18,"url(#ey)",4)+B(138,84,7,$)+B(133,78,3,"#ffffff")+p("M40 60 L78 70",$,6)+p("M160 60 L122 70",$,6)+g("M34 118 Q100 104 166 118 Q160 168 100 170 Q40 168 34 118 Z","#1e0a22")+Array.from({length:8},(t,a)=>T(`M${44+a*15} 116 L${51+a*15} 132 L${58+a*15} 116 Z`,W,S(2))).join("")+Array.from({length:7},(t,a)=>T(`M${52+a*15} 166 L${59+a*15} 150 L${66+a*15} 166 Z`,W,S(2))).join("")+[40,160].map(t=>`<g>${[-12,0,12].map(a=>g(`M${t+a-4} 186 Q${t+a} 204 ${t+a+4} 186 Z`,W,2.5)).join("")}${x(t,182,20,10,"url(#fu)",3.5)}</g>`).join("")},batedor:{bg:["#141418","#3e3e4c"],scene:()=>B(170,26,30,"#ffd27a",'opacity="0.25" filter="url(#blur)"')+Array.from({length:10},(e,t)=>`<rect x="${t%2*20}" y="${t*20}" width="200" height="1.5" fill="#000" opacity="0.3"/>`).join(""),fig:e=>{const t=e?3:-3;return`<defs>${Y("sk","morena")}${L("jk",["#7a5232","#5a3a22","#3a2414"])}${L("cp",["#5a6a80","#3e4a5c","#283240"])}<pattern id="lst" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="${W}"/><rect y="7" width="12" height="5" fill="#2f3a4a"/></pattern></defs>`+se("#9a5f36")+ie("url(#lst)",40,160,152)+g("M2 204 C6 170 34 152 76 150 L88 204 Z","url(#jk)")+g("M198 204 C194 170 166 152 124 150 L112 204 Z","url(#jk)")+x(60,98,7,11,"url(#sk)")+x(140,98,7,11,"url(#sk)")+x(100,96,39,45,"url(#sk)")+g("M56 76 Q56 40 100 38 Q146 40 148 70 Q100 62 56 76 Z","url(#cp)")+g("M56 76 Q100 60 150 70 Q160 78 150 82 Q100 72 56 84 Z","#283240",3.5)+B(100,42,4,"#f0524f",S(2))+g("M68 92 Q80 86 92 92 Q80 98 68 92 Z","#ffffff",3)+g("M108 92 Q120 86 132 92 Q120 98 108 92 Z","#ffffff",3)+B(80+t,92.5,4,$)+B(120+t,92.5,4,$)+p("M66 88 Q80 82 94 88",$,4)+p("M106 86 Q120 82 134 88",$,4)+p("M100 98 Q107 110 98 112","#9a5f36",3)+p("M84 126 Q100 128 114 120",$,4)+Array.from({length:14},(a,s)=>B(76+s%7*8+(s>6?4:0),132+(s>6?6:0),1.2,"#5a3a22")).join("")+`<g transform="rotate(${e?6:-4} 170 110)">`+g("M150 204 L156 130 L178 130 L184 204 Z","url(#jk)")+g("M154 132 Q150 112 166 112 Q182 114 180 132 Z","url(#sk)")+`<rect x="150" y="56" width="40" height="58" rx="5" fill="#2c2840" ${S(3.5)}/><path d="M170 66 L170 104 M156 85 L184 85" stroke="#2c2840" stroke-width="0"/>`+T("M156 64 L170 64 L170 85 L156 85 Z","#f0524f")+T("M170 64 L184 64 L184 85 L170 85 Z","#f5c542")+T("M156 85 L170 85 L170 106 L156 106 Z","#3d8ff0")+T("M170 85 L184 85 L184 106 L170 106 Z","#3cb371")+'<ellipse cx="170" cy="85" rx="10" ry="15" fill="#2c2840" transform="rotate(30 170 85)"/></g>'}},maestro:{bg:["#3a0a0a","#9a2a2a"],scene:()=>T("M70 0 L130 0 L180 200 L20 200 Z","#fff3c0",'opacity="0.12"')+[0,24,176].map(e=>`<rect x="${e}" y="0" width="16" height="200" fill="#000" opacity="0.2"/>`).join(""),fig:e=>`<defs>${Y("sk","clara")}${L("co",["#4a4a5a","#26262e","#121218"])}${L("wh",["#ffffff","#ececf4","#a8a8bc"])}</defs>`+se("#c98f66")+ie("url(#co)")+g("M84 150 L100 200 L116 150 Z","#ffffff",3)+B(100,176,2.5,$)+B(100,188,2.5,$)+g("M100 156 L80 146 L80 168 Z","#d23a3a",3)+g("M100 156 L120 146 L120 168 Z","#d23a3a",3)+B(100,157,5,"#8a1a1a",S(2.5))+g("M38 96 C20 70 34 30 60 34 C64 14 96 12 104 26 C120 10 156 18 152 40 C176 44 182 80 162 96 C176 110 160 128 146 116 L54 116 C38 128 22 110 38 96 Z","url(#wh)")+x(100,98,37,43,"url(#sk)")+g("M64 72 C70 54 88 52 100 60 C112 52 130 54 136 72 C120 64 108 70 100 66 C92 70 80 64 64 72 Z","url(#wh)",3.5)+p("M68 80 Q78 72 90 78",$,4.5)+p("M110 78 Q122 72 132 80",$,4.5)+We(80,94,9)+We(120,94,9)+p("M100 98 Q106 110 98 112","#c98f66",3)+g("M82 120 Q100 116 118 120 Q116 142 100 142 Q84 142 82 120 Z","#7a1f2b")+T("M88 133 Q100 126 112 133 Q108 141 100 141 Q92 141 88 133 Z","#e0605a")+`<g transform="rotate(${e?32:0} 162 150)">`+g("M146 204 L150 146 L174 146 L178 204 Z","url(#co)")+`<rect x="148" y="136" width="28" height="12" rx="3" fill="#ffffff" ${S(3)}/>`+x(162,126,13,12,"url(#sk)")+p("M166 118 L196 40",$,7)+p("M166 118 L196 40","#ffffff",3.5)+"</g>"}},Qr='<defs><filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="6" stdDeviation="4" flood-color="#000" flood-opacity="0.45"/></filter><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>';function hs(e,t,a,s){var o;const n=Pr[e],[r,i]=n.bg;return`<svg x="${s}" y="0" width="200" height="200" viewBox="14 8 172 172"><defs>${Fe("bgg",[Hs(i,"#ffffff",.12),i,r],.5,.38,.75)}</defs><rect width="200" height="200" fill="url(#bgg)"/>`+(((o=n.scene)==null?void 0:o.call(n,a))??"")+`<g filter="url(#drop)">${n.fig(a,t)}</g><rect width="200" height="200" fill="url(#vg)"/></svg>`}function Er(e,t="r"){return'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">'+Qr+`<defs>${Fe("vg",["rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0.35)"],.5,.45,.75)}</defs>`+hs(e,t,!1,0)+hs(e,t,!0,200)+"</svg>"}const Tr=(e,t="r")=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(Er(e,t)),_=32,Fs="#1c1a28",Ar={k:Fs,w:"#f3ead7",W:"#ffffff"},D=e=>e.split(`
`).map(t=>t.replace(/\s+/g,"")).filter(t=>t.length>0),k=(e,t,a)=>({x:e,y:t,rows:D(a)}),X={clara:{s:"#f0c39a",h:"#fde0c2",S:"#c98f66"},morena:{s:"#cf9460",h:"#e8b47e",S:"#9a5f36"},escura:{s:"#7a4a2a",h:"#9c623a",S:"#52301a"}},Ks={torcedor:{pal:e=>({...X.morena,b:"#2a1a12",t:ne[e],T:St[e],m:"#5a1420",n:"#e0605a"}),bg:["#1d4a32","#2f7d4f"],every:3.4,shadeR:{h:"s",s:"S",t:"T"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ...b.bbb
      ........ .bbbbbbb
      ........ bbbbbbbb
      .......b bbbbbbbb
      .......b bbhhhhhh
      ........ bhhhhhhh
      ........ shkkkhhh
      .......s shhWkhhh
      .......s shhkkhhh
      .......s shttthhh
      ........ shhhhhhS
      ........ shtttthh
      ........ shhhkkkk
      ........ shhkwwmw
      ........ sshkmmmm
      ........ .shhkmnn
      ........ .sshhkkk
      ........ ..sshhhh
      ........ ....SSSS
      ......tt wwttwwtt
      .....ttw wttwwttw
      ...ttttt tttttttt
      ..tttttt tttttttt
      .ttttttt tttwwttt
      .ttttttt ttttwwtt
      tttttttt tttttwwt
      tttttttt tttttttt
      tttttttt tttttttt
      tttttttt tttttttt
    `),over:[k(24,0,`
        ..tt....
        .tttT...
        .tttT...
        .tttT...
        .tttTt..
        ttttTtT.
        tttwttT.
        ttwwttT.
        tttwttT.
        tttwttT.
        .ttttT..
        .shhsS..
        .shhsS..
        .shhsS..
        .shhsS..
        .tshsS..
        .tttTT..
        ttttTT..
        ttttT...
        tttTT...
        ttTT....
        tTT.....
      `),k(19,16,"w")],tic:[k(11,10,`
        hh......hh
        kk......kk
      `),k(24,0,`
        ________
        ..tt....
      `)]},contador:{pal:{...X.clara,b:"#6b4a2e",g:"#cfeeff",G:"#3a3a48",y:"#f5c542",r:"#f08a8a",P:"#2a2a2a",c:"#e8ecf0",C:"#a9b4c2",i:"#2459a8",I:"#163a70",m:"#8a3a30"},bg:["#22303c","#3a5266"],every:4.2,shadeR:{h:"s",s:"S",c:"C"},shadeFrom:22,half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ....hhhh
      ........ ..hhhhhh
      ........ .hhbbbbb
      ........ .hbhhhhh
      ........ .hhhhhhh
      ........ .hhhhhhh
      ........ .shkkkhh
      ........ .shGGGhh
      .......s sGgWgGGG
      .......s sGgkkGhh
      .......s sGgggGhh
      ........ .shGGGhh
      ........ .shhhhhS
      ........ .shhhhSS
      ........ ..shhhhh
      ........ ..shhhmm
      ........ ...shhhh
      ........ ....shhh
      ........ .....SSS
      ........ ...ccsss
      .....ccc ccccccci
      ....cccc ccccccci
      ...ccccc ccccccci
      ..cccccc ccccccIi
      ..ccGGGc ccccccIi
      .cccGyrc ccccccci
      .cccGyPc ccccccIi
      .cccGGGc ccccccIi
      .ccccccc ccccccci
    `),over:[k(22,4,`
        ....r
        ...yy
        ..yy.
        .yy..
        PP...
      `)],tic:[k(11,11,`
        ggg......ggg
        kkk......kkk
      `)]},fominha:{pal:{...X.clara,b:"#c98b3a",B:"#8a5a22",r:"#f2a0a0",m:"#7a1f2b",c:"#e8a040",C:"#b8701e",d:"#7a4a14",n:"#f3ead7",N:"#c9c0ae",x:"#3cb371",X:"#237a4b"},bg:["#5a2a14","#94512a"],every:2.6,shadeR:{h:"s",s:"S",x:"X"},shadeFrom:25,half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ......bb
      ........ ...bbbbb
      ........ .bbbbbbb
      .......b bbBBhhhh
      ......bh hhhhhhhh
      .....shh hhhhhhhh
      ....shhh hhhhhhhh
      ....shhh hhkkhhhh
      ....shhh hkhhkhhh
      ....shhh hhhhhhhh
      ....shrr rrhhhhhh
      ....shrr rrhhhhhh
      ....shhh hhhhhhkk
      ....sshh hhhhhkmm
      .....shh hhhhhkmm
      .....ssh hhhhhhkk
      ......ss hhhhhhhh
      .......S sshhhhhh
      ........ SSSsssss
      .......n nnnnnnnn
      .....xnn nnnnnnnn
      ...xxxnn nnnnnnnn
      ..xxxxxn nnnnnnnn
      .xxxxxxx nnnnnnnn
      .xxxxxxx xnnnnnnn
      xxxxxxxx xxnnnnnn
      xxxxxxxx xxxxnnnn
      xxxxxxxx xxxxxxnn
      xxxxxxxx xxxxxxxx
    `),over:[k(19,13,`
        ...cc...
        ..cccC..
        .ccccCC.
        .cccCCd.
        hhcCCdd.
        hhhCdd..
        shhhd...
        sSSS....
      `)],tic:[k(14,15,`
        hhhh
        kkkk
        hhhh
      `),k(19,13,`
        ...kk...
        ..k.cC..
      `),k(12,19,"c..c")]},cabecaFria:{pal:{...X.escura,b:"#140c08",g:"#202a44",G:"#7fb6e6",y:"#f5c542",Y:"#b97c12",P:"#e8d0a0",f:"#f0524f",F:"#a8302f",l:"#3cb371",m:"#2a1208"},bg:["#134652","#22808f"],every:5.1,shadeR:{h:"s",s:"S",f:"F"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ..bbbbbb
      ........ .bbbbbbb
      ........ .bbbbbbb
      ........ .bhhhhhh
      ........ .hhhhhhh
      ........ shhhhhhh
      ........ shhhhhhh
      .......s kkkkkkkk
      .......s kGggggkk
      .......s kgGgggkh
      ........ skkkkkhh
      ........ shhhhhhh
      ........ shhhhhhS
      ........ shhhhhSS
      ........ shhhhhhh
      ........ .shhkkkk
      ........ .sshhhhh
      ........ ..sshhhh
      ........ ...SSsss
      ........ ....Ssss
      ......ff fffffyhs
      ....ffff ffffhsyh
      ...fflff fffhssyy
      ..fflllf fffhsssY
      .ffflfff fFfhssss
      .fffffff fFfhssss
      ffllffff ffFhssss
      fflfffff ffFhssss
      ffffffff ffFhssss
    `),over:[k(19,17,`
        ..PP
        PP..
      `)],tic:[k(9,11,`
        kgg
        kgg
      `),k(19,11,`
        GG.
        .G.
      `)]},seteDeOuro:{pal:{...X.morena,a:"#efe3c0",A:"#bfae80",d:"#2459a8",b:"#2a1a12",y:"#f5c542",Y:"#b97c12",u:"#3d8ff0",U:"#2459a8",m:"#5a1420"},bg:["#2e1f4a","#563a80"],every:3.8,shadeR:{h:"s",s:"S",a:"A",w:"A",u:"U"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ...aaaaa
      ........ ..aaaaaa
      ........ ..aaaaaa
      ........ .ddddddd
      ....aaaa aaaaaaaa
      ......AA AAAAAAAA
      ........ bhhhhhhh
      ........ shkkkhhh
      .......s shhWkhhh
      .......s shhkkhhh
      .......s shhhhhhh
      ........ shhhhhhS
      ........ shhbbbbb
      ........ shhkwwww
      ........ .shhkkkk
      ........ .shhhhhh
      ........ ..shhhhh
      ........ ...sshhh
      ........ ....SSSS
      ......ww uwwwssss
      ....uwwu wwuwwsss
      ...wwuww uwwuwsss
      ..wwuwwu wwuwwwss
      .wwuwwuw wuwwuwws
      .wuwwuww uwwuwwuw
      wuwwuwwu wwuwwuww
      uwwuwwuw wuwwuwwu
      wwuwwuww uwwuwwuw
      wuwwuwwu wwuwwuww
    `),over:[k(18,9,`
        kkk
        hhh
        sss
        kkk
      `),k(17,16,"y"),k(14,24,`
        yyyy
        ...y
        ..y.
        .y..
      `)],tic:[k(17,15,".W"),k(17,16,"W"),k(16,17,".W")]},carrasco:{pal:{o:"#26262e",O:"#3e3e4c",q:"#0e0e12",e:"#ff5a3a",E:"#ffd27a",s:"#b57a4e",h:"#d39a6a",S:"#7a4a2a",x:"#d4dde0",X:"#7f8c93",v:"#8b5a2b",V:"#5a3a1a"},bg:["#2a0a0e","#5a1418"],every:2.9,shadeR:{O:"o",h:"s",s:"S"},half:D(`
      ........ ........
      ........ .......O
      ........ ......Oo
      ........ .....Ooo
      ........ ....Oooo
      ........ ...Ooooo
      ........ ..Oooooo
      ........ .Ooooooo
      ........ Oooooooo
      .......O oooooooo
      .......O oqqqqooo
      .......O oqeEqooo
      .......O oqqeqooo
      .......O ooqqoooo
      .......O oooooooo
      .......O oooooooo
      .......O oooooooo
      ......Oo oooooooo
      .....Ooo oooooooo
      ....Oooo oooooooo
      ..hhOooo oooooooo
      .hhhhOoo oooooooo
      hhhhhhOO oooooooo
      hhhhhhhh OOoooooo
      hhhhhhhh hhOOOooo
      hhhhhhhh hhhhOOOO
      hhhhhhhh hhhhhhhs
      hhhhhhhh SSShhhhs
      hhhhhhhh hhhSShhs
      hhhhhhhh hhhhhhhs
      hhhhhhhh hhhhhhhs
      hhhhhhhh hhhhhhhs
    `),over:[k(22,0,`
        .....vV...
        ..xxxvVx..
        .xxxxvVxx.
        xxxxxvVxxX
        xxxXXvVXXX
        .xXX.vV.X.
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        .....vV...
        ....shVs..
        ...shhhhS.
        ...shhhSS.
        ....sSSS..
      `)],tic:[k(10,11,`
        eEE......EEe
        qEe......eEq
      `)]},apressado:{pal:{...X.clara,o:"#e8732a",O:"#a8460f",l:"#ffab66",B:"#d23a3a",b:"#8a1a1a",v:"#24304a",V:"#7fb6e6",d:"#8cc8ff",j:"#2a2a33",J:"#1a1a22",r:"#f5c542",m:"#7a1f2b",z:"#f3ead7"},bg:["#4a3f1a","#7d6c2c"],every:2.2,shadeR:{h:"s",s:"S",o:"O",l:"o",j:"J",B:"b"},under:[k(2,11,`
        BBBBBBBBBBBBBBBBBBBBBBBBBBBB
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBwwwBBBBBBBBBBBBBBBBBBBBBBb
        BBwBBBBBBBBBBBBBBBBBBBBBBBBb
        BBwwwBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        BBBBBBBBBBBBBBBBBBBBBBBBBBBb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbb
      `)],half:D(`
      ........ ........
      ........ ........
      ........ ...vvvvv
      ........ .vVVvvvv
      ........ llllloow
      .......l looooooW
      ......lo oooooooW
      ......lo oshhhhhh
      ......lo shkkhhhh
      ......lo shhhhhhh
      ......oo hWWkhhhh
      ......oo hWkkhhhh
      ......oo hhhhhhhS
      ......oo shhhhhSS
      ......oO shhhhhhh
      ......oO shhhhkkk
      ......oO .shhkmmm
      .......O Oshhkmmm
      ........ .Oshhkkk
      ........ ..Oshhhh
      ........ ...OSSSS
      ........ ...jjjss
      ......jj jjjjjjjj
      ....jjjj jjjjjjjj
      ...jjjjj jjjjjjjj
      ..jjjjjj jjjjjjjj
      .rrrrrrr rrrrrrrr
      .jjjjjjj jjjjjjjj
      jjjjjjjj jjjjjjjj
      jjjjjjjj jjjjjjjj
      jjjjjjjj jjjjjjjj
      jjjjjjjj jjjjjjjj
    `),over:[k(0,9,`
        zz....
        ......
        zzzz..
        ......
        ......
        zz....
      `),k(28,6,`
        .d
        dd
        dd
      `)],tic:[k(28,6,`
        __
        __
        __
        .d
        dd
        dd
      `)]},colecionador:{pal:{...X.clara,t:"#26262e",T:"#3e3e4c",a:"#a8302f",c:"#f3ead7",r:"#f0524f",u:"#3d8ff0",g:"#3cb371",y:"#f5c542",Y:"#b97c12",e:"#ececf4",E:"#a8a8bc",p:"#5a3a7a",P:"#3a2450",v:"#f3ead7"},bg:["#3a2414","#66422a"],every:4.6,shadeR:{h:"s",s:"S",p:"P",e:"E"},half:D(`
      ........ ........
      ........ ..tttttt
      ........ ..tTtttt
      ........ ..tTtttt
      ........ ..tTtttt
      ........ ..aaaaaa
      .......t tttttttt
      ........ ehhhhhhh
      .......e eEhhhhhh
      .......e eeeehhhh
      ........ shWkhhhh
      .......s shkkhhhh
      .......s shhhhhhh
      ........ shhhhhhS
      ......ee eeeeeeee
      .....eee eeeeeeee
      .....eE. .eeeeeee
      ........ .shhkkkk
      ........ ..shhhhh
      ........ ...shhhh
      ........ ....SSSS
      ........ ...pvvvv
      ......pp ppvvvvvv
      ....pppp ppvvvvvv
      ...ppppp pppvvvvv
      ..pppppp pppvvvvv
      .ppppppp ppppvvvv
      .ppppppp ppppvvvv
      pppppppp pppppvvv
      pppppppp pppppvvv
      pppppppp ppppppvv
      pppppppp ppppppvv
    `),over:[k(18,0,`
        .cr.cu
        .cr.cu
        .cc.cc
        ......
        ......
        .gc...
      `),k(17,9,`
        yyyy
        yWky
        ykky
        yyyY
        ...y
        ...y
        ....y
        ....y
        ....y
        ....y
        ...y.
        ..y..
        .y...
      `)],tic:[k(5,16,"..E"),k(23,16,".E"),k(17,10,".kW")]},gemeos:{pal:{...X.morena,b:"#4a2e1a",c:"#f0524f",C:"#a8302f",x:"#f5c542",X:"#b97c12",u:"#3d8ff0",r:"#f2a0a0"},bg:["#183466","#2a5aa0"],every:3.1,shadeR:{},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ....cccc cc......
      ...ccccc cccc....
      ..cccWWc ccccC...
      ..cccWcc ccccC...
      cCCCCCCC CCCCC...
      ...bbhhh hhhhb...
      ..shhhhh hhhhhs..
      .sshhWkh hhWkhhs.
      .sshhkkh hhkkhhs.
      ..shrrhh hhhrrhs.
      ..shhkhh hhkhs...
      ..shhhkk kkhhs...
      ...shhhh hhhs....
      ....SSSS SSS.....
      ......ss ss......
      ...xxxxx xxxxxx..
      ..xuuuuu uuuuuuxx
      .xxxxxxx xxxxxxxx
      .xuuuuuu uuuuuuuu
      xxxxxxxx xxxxxxxx
      xuuuuuuu uuuuuuuu
      xxxxxxxx xxxxxxxx
      xuuuuuuu uuuuuuuu
      xxxxxxxx xxxxxxxx
      xuuuuuuu uuuuuuuu
      xxxxxxxx xxxxxxxx
      xuuuuuuu uuuuuuuu
      xxxxxxxx xxxxxxxx
      xuuuuuuu uuuuuuuu
    `),tic:[k(5,10,`
        hh
        kk
      `)]},escadeiro:{pal:{...X.escura,y:"#f5c542",Y:"#b97c12",b:"#140c08",o:"#e8732a",O:"#a8460f",r:"#e8eef2",v:"#b8864a",V:"#7a5428"},bg:["#4a4a52","#6e6e7a"],every:4,shadeR:{h:"s",s:"S",o:"O",y:"Y"},under:[k(23,2,`
        .v....v.
        .vvvvvvV
        .v....V.
        .v....V.
        .v....V.
        .vvvvvvV
        .v....V.
        .v....V.
        .v....V.
        .vvvvvvV
        .v....V.
        .v....V.
        .v....V.
        .vvvvvvV
        .v....V.
        .v....V.
        .v....V.
        .vvvvvvV
        .v....V.
        .v....V.
        .v....V.
        .vvvvvvV
        .v....V.
      `)],half:D(`
      ........ ........
      ........ ........
      ........ .....yyy
      ........ ...yyyyy
      ........ ..yyWyyy
      ........ .yyWyyyy
      ........ .yyyyyyy
      ......YY YYYYYYYY
      ........ bshhhhhh
      ........ bhhhhhhh
      ........ shkkkhhh
      .......s shhWkhhh
      .......s shhkkhhh
      .......s shhhhhhh
      ........ shhhhhhS
      ........ shhbbbbb
      ........ shbbbbbb
      ........ .shhkkkk
      ........ .sshhhhh
      ........ ..sshhhh
      ........ ...SSSSS
      ........ ....ssss
      ......oo oooooSss
      ....oooo oooooSss
      ...ooooo ooooooSs
      ..oooooo oooooooS
      .rrrrrrr rrrrrrrr
      .ooooooo oooooooo
      oooooooo oooooooo
      rrrrrrrr rrrrrrrr
      oooooooo oooooooo
      oooooooo oooooooo
    `),tic:[k(11,11,`
        hh......hh
        kk......kk
      `)]},ultimoSuspiro:{pal:{g:"#bfe0f0",G:"#8fb4cc",l:"#eef8ff",d:"#6f8fa6",y:"#f5e27a",r:"#f0524f",e:"#ffffff"},bg:["#121836","#24305a"],every:4.8,long:!0,shadeR:{g:"G",l:"g"},half:D(`
      ........ ........
      ........ ....yyyy
      ........ ..yy....
      ........ ....yyyy
      ........ ........
      ........ ....llll
      ........ ..llllll
      ........ .lllgggg
      ........ llgggggg
      ........ lggggggg
      ......ee gggggggg
      .....eeg gggggggg
      ......gg gkkkgggg
      ......gg ggggggGG
      .......g ggggggGg
      .......g gggggggg
      ........ ggggggkk
      ........ gggggkdd
      ........ ggggggkk
      ........ .ggggggg
      ........ gggggggg
      .......g gggggggg
      .......g gggggggg
      ......gg gggggggg
      ......gg gggggggg
      .......g gggggggg
      ........ gggggggg
      ........ .ggggggg
      ........ ..gggggg
      ........ ....gggg
      ........ ......gg
      ........ ........
    `),over:[k(13,20,`
        .wwwwww.
        gwrrrrwg
        gwrrwrwg
        gwrwwrwg
        gwrrwrwg
        gwrrwrwg
        .wwwwww.
      `),k(16,28,`
        GGgggg..
        ..ggggg.
        ....gggG
        ......G.
      `)],tic:[k(20,14,`
        .ll.
        llll
        .lll
        ..l.
      `),k(12,1,"__"),k(18,1,"__")]},agiotaAmigo:{pal:{...X.morena,g:"#2a3a2a",G:"#7ab87a",p:"#3a3a48",P:"#26262e",l:"#5e5e70",c:"#f3ead7",r:"#a8302f",y:"#f5c542",m:"#5a1420"},bg:["#163420","#2a5a36"],every:3.6,shadeR:{h:"s",s:"S",p:"P"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ....hhhh
      ........ ..hhWWhh
      ........ .hhWhhhh
      ........ hhhhhhhh
      .......s hhhhhhhh
      .......s hhhhhhhh
      .......s hkkkhhhh
      ......ss skgggkkk
      ......ss skgGgkhh
      ......ss shkkkhhh
      ......ss hhhhhhhS
      .....ssh hhhhhhSS
      .....ssh hkkkkkkk
      .....ssh hkwwwwww
      .....ssh hhkwwwww
      ......ss hhhkkkkk
      ......ss shhhhhhh
      .......s sshhhhhh
      ........ sSSSSSSS
      ......pp pplpcccr
      ....pplp pplpccrr
      ...pplpp lpplpcyr
      ..pplppl pplppcyr
      .pplpplp pplpcyrr
      .plpplpp lpplpcyr
      pplpplpp lpplpccr
      pplpplpp lpplppcr
      pplpplpp lpplppcr
      pplpplpp lpplppcr
    `),tic:[k(18,8,`
        kkk
        hhh
      `),k(12,4,".W")]},cofre:{pal:{m:"#8a9aa3",M:"#55636b",l:"#c4d2d8",d:"#9fb0ba",D:"#7a8a93",r:"#e4ecef",y:"#f5c542",Y:"#b97c12"},bg:["#33240f","#5a4220"],every:3.3,long:!0,shadeR:{l:"M",d:"D",m:"M"},shadeFrom:26,half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ........
      ..llllll llllllll
      ..lmmmmm mmmmmmmm
      ..lmrmmm mmmmmmmm
      ..lmmddd dddddddd
      ..lmmdll llllllll
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmdld dddddddd
      ..lmmddd dddddddd
      ..lmrmmm mmmmmmmm
      ..lmmmmm mmmmmmmm
      ..MMMMMM MMMMMMMM
      ...MMM.. ........
      ...MMM.. ........
      ........ ........
    `),over:[k(8,9,`
        .kkkk.
        kyyyyk
        kyykyk
        kykyyk
        kyyyyk
        .kkkk.
      `),k(18,11,`
        kkkk
        kWkk
        .kk.
      `),k(12,18,`
        ...yy...
        kkkkkkkk
      `),k(25,13,`
        MM
        rM
        rM
        MM
      `),k(25,29,"MMM"),k(25,30,"MMM")],tic:[k(9,11,`
        yyyy
        yyky
        yyyk
      `)]},patrao:{pal:{...X.clara,t:"#5a3a22",T:"#3a2414",a:"#1c120c",e:"#c8c8d0",E:"#8e8e9c",c:"#f3ead7",C:"#c4b9a0",q:"#2a1e1e",r:"#7a1f2b",b:"#7a4a2a",B:"#4a2a14",o:"#ff7a3a",z:"#d4dde0"},bg:["#3e0c1a","#6a1a30"],every:3,long:!0,shadeR:{h:"s",s:"S",c:"C",e:"E"},shadeFrom:23,half:D(`
      ........ ........
      ........ ...ttttt
      ........ ..tttttt
      ........ ..tttttt
      ........ ..aaaaaa
      ...ttttt tttttttt
      ..TTTTTT TTTTTTTT
      ........ shhhhhhh
      .......s hhhhhhhh
      ......ss hhhhhhhh
      ......ss eeeeehhh
      ......sh SSSShhhh
      ......sh hkkkhhhh
      ......sh hhhhhhhS
      .....ssh hhhhhhSS
      .....seh eeeeeeee
      .....see eeeeeeee
      .....sEe EEhhkkkk
      .....ssh hhhhhhhh
      .....ssS shhhhhhh
      ......sS Sshhhhhh
      .......S SSSsssss
      ......cc cccccqqq
      ....cccc ccccqqqr
      ...ccccc cccccqrr
      ..cccccc ccccccqr
      .ccccccc ccccccqr
      .ccccccc cccccccq
      cccccccc cccccccq
      cccccccc ccccccCq
      cccccccc ccccccCq
      cccccccc ccccccCq
    `),over:[k(19,17,`
        bbbbbo
        BBBBB.
      `),k(25,12,`
        .z
        z.
        .z
        z.
      `)],tic:[k(25,12,`
        __
        __
        __
        __
      `),k(25,9,`
        z.
        .z
        z.
      `),k(24,17,"W")]},viraLata:{pal:{c:"#d08a3c",C:"#9a5c22",l:"#f0d2a0",L:"#c9a36e",r:"#d23a3a",y:"#f5c542",Y:"#b97c12",n:"#f07a8a",N:"#c04a5a"},bg:["#24486a","#4a7aa6"],every:2.7,shadeR:{c:"C",l:"L"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ........
      ....cc.. ........
      ...cCc.. ........
      ...cCCc. ........
      ...cCCcc cccccccc
      ...ccCcc cccccccc
      ....cccc cccccccc
      ....cccc cccccccc
      ....cccc cccccccc
      ...ccccW kccccccc
      ...cccck kccccccc
      ...ccccc ccclllll
      ...ccccc ccllllkk
      ....cccc cllllllk
      ....cccc cllllllk
      .....ccc clllklkk
      .....ccc ccllkkll
      ......cc ccclllll
      .......c cccccccc
      .......r rrrrrrrr
      ......cc ccccclyy
      .....ccc cccclllY
      ....cccc cccllll l
      ...ccccc ccllllll
      ..cccccc ccllllll
      ..cccccc clllllll
      .ccccccc clllllll
      .ccccccc clllllll
      cccccccc clllllll
    `),over:[k(24,4,`
        ____
        ____
        ____
        ._CC
        .CCC
        .CCC
        .CC.
        .C..
      `)],tic:[k(15,18,`
        nn
        nN
        .N
      `),k(4,4,`
        ____
        ..cc
      `)]},bichoPapao:{pal:{p:"#7d4bb5",P:"#4e2a7a",q:"#a77ad8",i:"#e8dcc0",I:"#a89a7a",y:"#ffe14a",m:"#1e0a22",w:"#f3ead7"},bg:["#0c0614","#24123a"],every:3.5,shadeR:{p:"P",q:"p",i:"I"},half:D(`
      ........ ........
      ..i..... ........
      ..ii.... ........
      ..iI.... ........
      ...iI... ........
      ...iI.q. q.q.q.q.
      ...iqqqq qqqqqqqq
      ..qqqqqq qqqqqqqq
      .qqqqppp pppppppp
      .qqppppp pppppppp
      qqpppyyy yppppppp
      qppyyyyy yypppppp
      .ppyykky yypppppp
      qppyykky yypppppp
      .ppyyyyy yypppppp
      qpppyyyy yppppppp
      .ppppppp pppppppp
      qppPmmmm mmmmmmmm
      .ppmwmwm wmwmwmwm
      qppmmmmm mmmmmmmm
      .ppmmmmm mmmmmmmm
      qppmwmwm wmwmwmwm
      .pppmmmm mmmmmmmm
      qppppppp pppppppp
      .ppppppp pppppppp
      qpPppppp pppppppp
      .pPPpppp pppppppp
      ..PPPppp pppppppp
      ...PPPpp pppppppp
      ..wpwpwp pppppppp
      ..w.w.w. pppppppp
      ........ PPPPPPPP
    `),tic:[k(3,10,`
        ..ppppp
        ppppppp
        ppppppp
        kkkkkkk
        ppppppp
        .pppppp
      `)]},batedor:{pal:{...X.morena,b:"#1c120c",g:"#3e4a5c",G:"#283240",j:"#5a3a22",J:"#3a2414",i:"#2f3a4a",K:"#2c2840",r:"#f0524f",y:"#f5c542",u:"#3d8ff0",v:"#3cb371"},bg:["#22222a","#3e3e4a"],every:3.9,long:!0,shadeR:{h:"s",s:"S",j:"J",g:"G"},half:D(`
      ........ ........
      ........ ........
      ........ ........
      ........ ...ggggg
      ........ .ggggggg
      ........ gggggggg
      .......g gggWgggg
      ......GG GGGGGGGG
      .......G GGGGGGGG
      ........ bShhhhhh
      ........ shSSShhh
      ........ shkWWhhh
      .......s shhhhhhh
      .......s shhhhhhS
      ........ shhhhhSS
      ........ shhhhhhh
      ........ .shhhhhh
      ........ .shhhhhh
      ........ ..shShSh
      ........ ...shShS
      ........ ....SSSS
      ........ .....sss
      ......jj jjjwwwww
      ....jjjj jjjiiiii
      ...jjjjj jjjwwwww
      ..jjjjjj jjjiiiii
      .jjjjjjj jjjwwwww
      .jjjjjjj jjjiiiii
      jjjjjjjj jjjwwwww
      jjjjjjjj jjjiiiii
      jjjjjjjj jjjwwwww
      jjjjjjjj jjjiiiii
    `),over:[k(18,11,"kWW"),k(13,16,`
        ....kk
        kkkk..
      `),k(23,8,`
        KKKKKK..
        KrryyK..
        KrryyK..
        KuuvvK..
        KuuvvK..
        KKKKKK..
        shhs....
        shhhs...
        shhhS...
        .shS....
        .jjj....
        jjjj....
        jjjJ....
        jjJ.....
      `)],tic:[k(11,11,"WWk"),k(18,11,"WWk")]},maestro:{pal:{...X.clara,e:"#ececf4",E:"#a8a8bc",q:"#26262e",Q:"#3e3e4c",r:"#d23a3a",R:"#8a1a1a",m:"#7a1f2b",n:"#e0605a"},bg:["#4a1414","#7e2424"],every:2.4,shadeR:{h:"s",s:"S",e:"E",Q:"q"},half:D(`
      ........ ........
      ........ ....e.e.
      ........ .e.eeeee
      .....e.e eeeeeeee
      ....eeee eeeeeeee
      ...eeeee eEEeeeee
      ..eeeeeE hhhhhhhh
      ..eeeeEh hhhhhhhh
      .eeeeeEh hhhhhhhh
      .eeeeeEs hhhhhhhh
      ..eeeeEs hkkhhhhh
      ..eeeeEs hhhhhhhh
      ...eeeEs hhkkkhhh
      ...eeeEs hhhhhhhS
      ....eeEs hhhhhSSS
      ....eeEs hhhhhhhh
      .....eEs hhhkkkkk
      .....eEs hhkmmmmm
      ......Es hhkmmmnn
      ......Es shhkkkkk
      .......s sshhhhhh
      ........ .sSSSSSS
      ........ ..wwrrww
      ......qq qqwrrrrR
      ....qqqq qqwwrrww
      ...qqqqq qqqwwwww
      ..qqqqqq qqqqwwww
      .Qqqqqqq qqqqqwww
      .Qqqqqqq qqqqqwkw
      Qqqqqqqq qqqqqqww
      Qqqqqqqq qqqqqqwk
      Qqqqqqqq qqqqqqqw
    `),over:[k(25,0,`
        ......W
        .....W.
        ....W..
        ..ssW..
        .shhs..
        .shhs..
        .shS...
        .ww....
        .qqqq..
        .qqqQ..
        .qqqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        ..qqQ..
        .qqqQ..
        qqqqQ..
      `)],tic:[k(25,0,`
        _______
        _______
        _______
        _______
        .shhsW.
        .shhs.W
      `)]}};function Rr(e,t){return{...Ar,...typeof e.pal=="function"?e.pal(t):e.pal}}function da(e,t,a){a.rows.forEach((s,n)=>{for(let r=0;r<s.length;r++){const i=s[r],o=a.x+r,l=a.y+n;i==="."||o<0||l<0||o>=_||l>=_||(i==="_"?e.clearRect(o,l,1,1):(e.fillStyle=t[i]??"#ff00ff",e.fillRect(o,l,1,1)))}})}function Or(e,t,a){const s=document.createElement("canvas");s.width=_,s.height=_;const n=s.getContext("2d"),r=Rr(e,t);for(const h of e.under??[])da(n,r,h);const i=e.shadeR??{},o=e.shadeFrom??20;e.half.forEach((h,u)=>{for(let m=0;m<16;m++){const w=h[m];if(w===".")continue;n.fillStyle=r[w]??"#ff00ff",n.fillRect(m,u,1,1);const y=_-1-m,C=y>=o?i[w]??w:w;n.fillStyle=r[C]??"#ff00ff",n.fillRect(y,u,1,1)}});for(const h of e.over??[])da(n,r,h);if(a===1)for(const h of e.tic)da(n,r,h);const l=n.getImageData(0,0,_,_),c=(h,u)=>h>=0&&u>=0&&h<_&&u<_&&l.data[(u*_+h)*4+3]>0;n.fillStyle=Fs;for(let h=0;h<_;h++)for(let u=0;u<_;u++)!c(u,h)&&(c(u-1,h)||c(u+1,h)||c(u,h-1)||c(u,h+1))&&n.fillRect(u,h,1,1);return s}function Ir(e,t,[a,s]){e.fillStyle=a,e.fillRect(t,0,_,_),e.fillStyle=s;for(let n=0;n<_;n++)for(let r=0;r<_;r++){const i=Math.hypot(r-15.5,n-12.5);(i<11||i<13&&(r+n)%2===0)&&e.fillRect(t+r,n,1,1)}}const ds=new Map;function Js(e,t="r",a=!1){const s=`${e}|${t}|${a?"hd":"px"}`,n=ds.get(s);if(n)return n;let r;if(a)r=Tr(e,t);else{const i=Ks[e],o=document.createElement("canvas");o.width=_*2,o.height=_;const l=o.getContext("2d");for(const c of[0,1])Ir(l,c*_,i.bg),l.drawImage(Or(i,t,c),c*_,0);r=o.toDataURL()}return ds.set(s,r),r}function Nr(e){document.querySelectorAll("img[data-face]").forEach(t=>{t.src=Js(t.dataset.face,t.dataset.color||void 0,e)})}function Ys(e,t,a,s,n=!1){const r=Ks[e],i=document.createElement("div");i.className=`portrait ${a}`;const o=document.createElement("img");return o.src=Js(e,t,n),o.dataset.face=e,o.dataset.color=t??"",o.alt=s,o.draggable=!1,r.long&&o.classList.add("long"),o.style.setProperty("--tic",`${r.every}s`),o.style.setProperty("--tic-delay",`${-(Math.random()*r.every).toFixed(2)}s`),i.append(o),i}const f=e=>document.getElementById(e),ze=e=>new Promise(t=>setTimeout(t,e));function Zr(){const t={bots:3,speed:1,effects:!window.matchMedia("(prefers-reduced-motion: reduce)").matches,crt:!0,hd:!1,music:!0,rules:{stacking:!1,sevenZero:!1,jumpIn:!1,drawUntilPlayable:!1,multiNumber:!1,sequences:!1}};try{const a=localStorage.getItem("pilantro.settings");if(a){const s=JSON.parse(a);return{...t,...s,rules:{...t.rules,...s.rules}}}}catch{}return t}const P=Zr();function Xs(){try{localStorage.setItem("pilantro.settings",JSON.stringify(P))}catch{}}const mt=new or(f("bg")),en=[];function _r(e){en.push(e),e(P)}function tn(){mt.setAnimate(P.effects),mt.setHd(P.hd),document.body.classList.toggle("no-crt",!P.crt),document.body.classList.toggle("hd",P.hd),document.body.classList.toggle("retro",!P.hd),document.body.classList.toggle("no-fx",!P.effects),Nr(P.hd),ur(P.music);for(const e of en)e(P)}const Gr=[["music","Música de fundo"],["effects","Efeitos animados (fundo e cartas)"],["crt","Filtro de TV antiga (CRT)"],["hd","Texturas em HD (sem pixel art)"]];function Aa(){return d("fieldset",{class:"opts"},d("legend",{},"Opções"),...Gr.map(([e,t])=>{const a=d("input",{type:"checkbox",checked:P[e]});return a.addEventListener("change",()=>{P[e]=a.checked,Xs(),tn()}),d("label",{},a,` ${t}`)}))}function O(e,t){const a=f("toasts"),s=document.createElement("div");for(s.className="toast",s.textContent=e,t&&s.style.setProperty("--c",t),a.append(s);a.children.length>3;)a.firstElementChild.remove();s.addEventListener("animationend",()=>s.remove())}function an(e,t,a){if(e.dataset.armed==="1")return delete e.dataset.armed,a(),!0;const s=e.textContent;return e.dataset.armed="1",e.textContent=t,e.classList.add("armed"),setTimeout(()=>{e.dataset.armed==="1"&&(delete e.dataset.armed,e.textContent=s,e.classList.remove("armed"))},4e3),!1}function d(e,t={},...a){const s=document.createElement(e),{class:n,...r}=t;n&&(s.className=n),Object.assign(s,r);for(const i of a)i!==null&&i!==!1&&s.append(i);return s}const ve=["r","y","g","b"];function Nt(){const e=[];let t=0;const a=(s,n,r=-1)=>e.push({id:t++,color:s,kind:n,value:r});for(const s of ve){a(s,"num",0);for(let n=1;n<=9;n++)a(s,"num",n),a(s,"num",n);for(const n of["skip","rev","draw2"])a(s,n),a(s,n)}for(let s=0;s<4;s++)a(null,"wild"),a(null,"wild4");return e}const ce=e=>e.kind==="wild"||e.kind==="wild4",Vr=e=>e.kind==="draw2"||e.kind==="wild4",Dr=(e,t)=>!ce(e)&&e.color===t.color&&e.kind===t.kind&&e.value===t.value;function fa(e){return e.kind==="num"?e.value:ce(e)?50:20}function Wr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let a=t;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}}function fs(e,t){for(let a=e.length-1;a>0;a--){const s=Math.floor(t()*(a+1)),n=e[a];e[a]=e[s],e[s]=n}return e}const zr={stacking:!1,sevenZero:!1,jumpIn:!1,drawUntilPlayable:!1,multiNumber:!1,sequences:!1,handSize:7};class Kt{constructor(t,a={},s=Date.now(),n={}){b(this,"rules");b(this,"players");b(this,"drawPile",[]);b(this,"discard",[]);b(this,"color","r");b(this,"turn",0);b(this,"dir",1);b(this,"pending",0);b(this,"drawn",null);b(this,"vulnerable",null);b(this,"winner",null);b(this,"exhausted",!1);b(this,"noReshuffle");b(this,"turnCount",0);b(this,"busy",!1);b(this,"events",[]);b(this,"rng");if(t.length<2||t.length>10)throw new Error("2 a 10 jogadores");this.rules={...zr,...a},this.rng=Wr(s),this.noReshuffle=!!n.noReshuffle,this.players=t.map(o=>({...o,hand:[],called:!1})),this.drawPile=n.keepOrder?[...n.deck??Nt()]:fs([...n.deck??Nt()],this.rng);const r=this.players.map((o,l)=>{var c;return((c=n.handSizes)==null?void 0:c[l])??this.rules.handSize});for(let o=0;o<Math.max(...r);o++)this.players.forEach((l,c)=>{o<r[c]&&this.drawPile.length>1&&l.hand.push(this.drawPile.pop())});let i=this.drawPile.pop();for(let o=this.drawPile.length;i.kind!=="num"&&o>0;o--)this.drawPile.unshift(i),i=this.drawPile.pop();this.discard.push(...n.under??[],i),this.color=i.color??"r",this.turn=n.first??Math.floor(this.rng()*this.players.length)}get top(){return this.discard[this.discard.length-1]}get over(){return this.winner!==null||this.exhausted}next(t=this.turn,a=1){const s=this.players.length;return((t+this.dir*a)%s+s)%s}canPlay(t,a){if(this.over||!this.players[t].hand.includes(a))return!1;if(t!==this.turn)return this.canJumpIn(t,a);if(this.drawn&&a!==this.drawn)return!1;const s=this.top;return this.pending>0?a.kind==="wild4"||a.kind==="draw2"&&s.kind==="draw2":ce(a)||a.color===this.color?!0:a.kind==="num"?s.kind==="num"&&a.value===s.value:a.kind===s.kind}canJumpIn(t,a){return this.rules.jumpIn&&!this.over&&t!==this.turn&&this.pending===0&&Dr(a,this.top)&&this.players[t].hand.includes(a)}playable(t){return this.players[t].hand.filter(a=>this.canPlay(t,a))}needsTarget(t){return this.rules.sevenZero&&t.kind==="num"&&t.value===7}play(t,a,s={}){const n=this.players[t],r=n.hand.find(c=>c.id===a);if(!r||!this.canPlay(t,r)||ce(r)&&!s.color)return!1;const i=n.hand.length===1;if(this.needsTarget(r)&&!i){const c=s.target;if(c===void 0||c===t||c<0||c>=this.players.length)return!1}const o=t!==this.turn;if(this.closeWindow(t),n.hand.splice(n.hand.indexOf(r),1),this.discard.push(r),this.color=ce(r)?s.color:r.color,this.drawn=null,this.turn=t,this.turnCount++,this.events.push({t:"play",p:t,card:r,color:this.color,jumpIn:o}),n.hand.length===0){this.winner=t;const c=this.players.reduce((h,u)=>h+u.hand.reduce((m,w)=>m+fa(w),0),0);return this.events.push({t:"win",p:t,points:c}),!0}n.hand.length===1&&!n.called&&(this.vulnerable=t);let l=1;switch(r.kind){case"skip":this.events.push({t:"skip",p:this.next()}),l=2;break;case"rev":this.players.length===2?(this.events.push({t:"skip",p:this.next()}),l=2):(this.dir=this.dir===1?-1:1,this.events.push({t:"reverse",dir:this.dir}));break;case"draw2":case"wild4":{const c=r.kind==="draw2"?2:4;if(this.rules.stacking)this.pending+=c;else{const h=this.next();this.drawCards(h,c,"penalty"),this.events.push({t:"skip",p:h}),l=2}break}case"num":this.rules.sevenZero&&r.value===7?this.swapHands(t,s.target):this.rules.sevenZero&&r.value===0&&this.rotateHands();break}return this.turn=this.next(t,l),!0}maxDrop(t){return this.turn!==t||this.drawn||this.pending?1:Math.max(1,...this.playable(t).map(a=>this.bestGroup(t,a).length))}groupable(t){return t.kind==="num"&&!(this.rules.sevenZero&&(t.value===7||t.value===0))}multiMates(t,a){return!this.rules.multiNumber||!this.groupable(a)?[]:this.players[t].hand.filter(s=>s!==a&&this.groupable(s)&&s.value===a.value)}seqMates(t,a){return!this.rules.sequences||!this.groupable(a)?[]:this.players[t].hand.filter(s=>s!==a&&this.groupable(s)&&s.color===a.color&&s.value!==a.value)}couldGroup(t){if(t.length<2)return!0;if(!t.every(n=>this.groupable(n)))return!1;const a=this.rules.multiNumber&&t.every(n=>n.value===t[0].value),s=this.rules.sequences&&t.every(n=>n.color===t[0].color)&&new Set(t.map(n=>n.value)).size===t.length;return a||s}groupOrder(t,a){if(a.length<2||!a.every(s=>this.groupable(s)))return null;if(this.rules.multiNumber&&a.every(s=>s.value===a[0].value)){const s=a.find(n=>this.canPlay(t,n));return s?{order:[s,...a.filter(n=>n!==s)],kind:"mesmo"}:null}if(this.rules.sequences&&a.every(s=>s.color===a[0].color)){const s=[...a].sort((r,i)=>r.value-i.value);if(!s.every((r,i)=>i===0||r.value===s[i-1].value+1))return null;if(this.canPlay(t,s[0]))return{order:s,kind:"seq"};const n=[...s].reverse();if(this.canPlay(t,n[0]))return{order:n,kind:"seq"}}return null}bestGroup(t,a){let s=[a];const n=this.multiMates(t,a);if(n.length&&this.groupOrder(t,[a,...n])&&(s=[a,...n]),this.rules.sequences&&this.groupable(a)){const r=new Map;for(const l of[a,...this.seqMates(t,a)])r.has(l.value)||r.set(l.value,l);let i=a.value,o=a.value;for(;r.has(i-1);)i--;for(;r.has(o+1);)o++;for(let l=i;l<=a.value;l++)for(let c=o;c>=a.value;c--){if(c-l+1<=s.length)continue;const h=Array.from({length:c-l+1},(u,m)=>r.get(l+m));this.groupOrder(t,h)&&(s=h)}}return s}playMany(t,a){if(a.length===1)return this.play(t,a[0]);const s=this.players[t];if(this.over||t!==this.turn||this.drawn||this.pending>0)return!1;const n=a.map(l=>s.hand.find(c=>c.id===l));if(n.some(l=>!l)||new Set(a).size!==a.length)return!1;const r=this.groupOrder(t,n);if(!r)return!1;const{order:i,kind:o}=r;this.closeWindow(t);for(const l of i)s.hand.splice(s.hand.indexOf(l),1),this.discard.push(l),this.color=l.color,this.events.push({t:"play",p:t,card:l,color:this.color,jumpIn:!1});if(this.events.push({t:"multi",p:t,cards:i,kind:o}),this.drawn=null,this.turnCount++,s.hand.length===0){this.winner=t;const l=this.players.reduce((c,h)=>c+h.hand.reduce((u,m)=>u+fa(m),0),0);return this.events.push({t:"win",p:t,points:l}),!0}return s.hand.length===1&&!s.called&&(this.vulnerable=t),this.turn=this.next(t,1),!0}draw(t){if(this.over||t!==this.turn||this.drawn)return!1;if(this.closeWindow(t),this.turnCount++,this.pending>0){const s=this.pending;return this.pending=0,this.drawCards(t,s,"stack"),this.turn=this.next(),!0}let a=null;do{const s=this.drawCards(t,1,"turn");if(s.length===0)break;a=s[0]}while(this.rules.drawUntilPlayable&&!this.canPlay(t,a));return this.exhausted||(a&&this.canPlay(t,a)?this.drawn=a:(this.events.push({t:"pass",p:t}),this.turn=this.next())),!0}pass(t){return this.over||t!==this.turn||!this.drawn?!1:(this.drawn=null,this.events.push({t:"pass",p:t}),this.turn=this.next(),!0)}callLast(t){const a=this.players[t];return this.over||a.called||!(this.turn===t&&a.hand.length>=2&&a.hand.length<=1+this.maxDrop(t)||a.hand.length===1&&this.vulnerable===t)?!1:(a.called=!0,this.vulnerable===t&&(this.vulnerable=null),this.events.push({t:"call",p:t}),!0)}catchPlayer(t,a){return this.over||t===a||this.vulnerable!==a?!1:(this.vulnerable=null,this.events.push({t:"caught",by:t,p:a}),this.drawCards(a,2,"caught"),!0)}closeWindow(t){this.vulnerable!==null&&this.vulnerable!==t&&(this.vulnerable=null)}drawCards(t,a,s){const n=[];for(let i=0;i<a;i++){if(this.drawPile.length===0){if(this.noReshuffle){this.exhausted||this.lock();break}if(this.discard.length<=1)break;const o=this.discard.pop();this.drawPile=fs(this.discard,this.rng),this.discard=[o],this.events.push({t:"reshuffle"})}n.push(this.drawPile.pop())}const r=this.players[t];return r.hand.push(...n),r.hand.length>1&&(r.called=!1),n.length&&this.events.push({t:"draw",p:t,cards:n,reason:s}),n}lock(){this.exhausted=!0,this.events.push({t:"exhausted"});const t=this.players.map(r=>r.hand.length),a=Math.min(...t);if(t.filter(r=>r===a).length!==1)return;const s=t.indexOf(a);this.winner=s;const n=this.players.reduce((r,i)=>r+i.hand.reduce((o,l)=>o+fa(l),0),0);this.events.push({t:"win",p:s,points:n})}swapHands(t,a){const s=this.players[t],n=this.players[a];[s.hand,n.hand]=[n.hand,s.hand],this.events.push({t:"swap",a:t,b:a}),this.resetCalls()}rotateHands(){const t=this.players.map(s=>s.hand),a=this.players.length;for(let s=0;s<a;s++)this.players[((s+this.dir)%a+a)%a].hand=t[s];this.events.push({t:"rotate"}),this.resetCalls()}resetCalls(){this.vulnerable=null;for(const t of this.players)t.called=t.hand.length===1}}function us(e){const t={r:0,y:0,g:0,b:0};for(const s of e)s.color&&(t[s.color]+=ce(s)?0:1);let a=ve[0];for(const s of ve)t[s]>t[a]&&(a=s);return a}function wa(e,t){let a=-1;for(let s=0;s<e.players.length;s++)s!==t&&(a<0||e.players[s].hand.length<e.players[a].hand.length)&&(a=s);return a}function Ur(e,t){const a=e.players[t].hand,s=e.playable(t);if(s.length===0)return e.drawn?{type:"pass"}:{type:"draw"};const n=e.players[e.next(t)].hand.length,r=us(a);let i=s[0],o=-1/0;for(const c of s){let h=0;if(ce(c)&&(h-=a.length>2?30:0),c.kind==="wild4"&&(h-=5),c.color===r&&(h+=6),c.kind==="num"&&(h+=c.value*.3),n<=2&&(Vr(c)||c.kind==="skip"||c.kind==="rev")&&(h+=40),e.needsTarget(c)){const u=wa(e,t);h+=(a.length-1-e.players[u].hand.length)*4}h>o&&(o=h,i=c)}const l={};return ce(i)&&(l.color=us(a.filter(c=>c!==i))),e.needsTarget(i)&&(l.target=wa(e,t)),{type:"play",cardId:i.id,opts:l}}function ps(e,t){return e.players[t].hand.find(a=>e.canJumpIn(t,a))??null}function Hr(e,t,a){if(a.type==="draw")return e.draw(t);if(a.type==="pass")return e.pass(t);const s=e.players[t].hand.find(r=>r.id===a.cardId),n=s&&t===e.turn&&!e.drawn&&!e.pending?e.bestGroup(t,s):[];return n.length>1?e.playMany(t,n.map(r=>r.id)):e.play(t,a.cardId,a.opts)}function Fr(e,t,a=1,s=Math.random,n=0){if(n>0&&!e.drawn&&!e.pending&&e.players[t].hand.length>2&&e.playable(t).length&&s()<n)return e.draw(t);const r=Ur(e,t);return r.type==="play"&&e.players[t].hand.length===2&&s()<a&&e.callLast(t),Hr(e,t,r)}const Kr=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,ms=e=>e>=1?0:Math.sin(e*Math.PI*2.5)*(1-e),Pt=e=>(e*2654435761>>>0)%1e3/1e3-.5,gs=e=>`800 ${e}px system-ui, "Segoe UI", sans-serif`,Ue="#1c1a28";class Jr{constructor(t){b(this,"canvas");b(this,"ctx");b(this,"sprites",new Us);b(this,"S",2);b(this,"hd",!1);b(this,"k",1);b(this,"w",0);b(this,"h",0);b(this,"cw",48);b(this,"ch",68);b(this,"flights",[]);b(this,"frame",0);b(this,"idleTimer",0);b(this,"hover",new Map);b(this,"mouse",{x:-999,y:-999});b(this,"popAt",-1e9);b(this,"shakeUntil",0);b(this,"shakeMag",0);b(this,"game",null);b(this,"human",0);b(this,"hoverId",null);b(this,"ambient",!0);b(this,"handRects",new Map);b(this,"pileRect",{x:0,y:0,w:0,h:0});b(this,"discardPos",{x:0,y:0});b(this,"frames",0);b(this,"inset",{left:0,top:0});b(this,"area",{x:0,y:0,w:0,h:0});b(this,"selected",new Set);b(this,"extraHidden",new Set);b(this,"reveal",[]);b(this,"pops",new Map);b(this,"texts",[]);this.canvas=t,this.ctx=t.getContext("2d"),this.resize()}resize(){const t=Math.max(1,window.innerWidth),a=Math.max(1,window.innerHeight);this.S=Math.max(2,Math.round(Math.min(a/340,t/300))),this.w=Math.ceil(t/this.S),this.h=Math.ceil(a/this.S),this.k=this.hd?this.S*Math.min(window.devicePixelRatio||1,2):1,this.canvas.width=Math.round(this.w*this.k),this.canvas.height=Math.round(this.h*this.k),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${a}px`,this.ctx.imageSmoothingEnabled=this.hd;const s=Math.ceil(this.inset.left/this.S),n=Math.ceil(this.inset.top/this.S);this.area={x:s,y:n,w:this.w-s,h:this.h-n};const r=Math.round(Math.max(44,Math.min(84,Math.min(this.area.h*.2,this.area.w*.2))));this.ch=r,this.cw=Math.round(r*.7),this.sprites.reset(this.hd,this.k);const i=this.h-this.ch*1.38;document.documentElement.style.setProperty("--hand-top",`${Math.round((this.h-i)*(a/this.h))}px`),document.documentElement.style.setProperty("--px",`${this.S}px`),document.documentElement.style.setProperty("--area-left",`${s*this.S}px`),this.invalidate()}toLocal(t,a){const s=this.canvas.getBoundingClientRect();return{x:(t-s.left)*this.w/s.width,y:(a-s.top)*this.h/s.height}}setMouse(t){this.mouse=t;const a=this.hitHand(t.x,t.y);a!==this.hoverId?(this.hoverId=a,this.invalidate()):a!==null&&this.invalidate()}invalidate(){this.frame||(this.frame=requestAnimationFrame(t=>this.draw(t)))}get animating(){return this.flights.length>0}shake(t,a=2){this.shakeUntil=performance.now()+t,this.shakeMag=a,this.invalidate()}seat(t){const s=this.game.players.length,n=this.area;if(t===this.human)return{x:n.x+n.w/2,y:this.h-this.ch*.68,vertical:!1};const r=(t-this.human+s)%s,i={1:[[.5,.13,!1]],2:[[.09,.42,!0],[.91,.42,!0]],3:[[.08,.45,!0],[.5,.13,!1],[.92,.45,!0]],4:[[.08,.5,!0],[.3,.13,!1],[.7,.13,!1],[.92,.5,!0]],5:[[.08,.55,!0],[.22,.14,!1],[.5,.12,!1],[.78,.14,!1],[.92,.55,!0]]},[o,l,c]=(i[s-1]??i[5])[r-1];return{x:Math.round(n.x+n.w*o),y:Math.round(n.y+n.h*l),vertical:c}}get center(){return{x:Math.round(this.area.x+this.area.w/2),y:Math.round(this.area.y+this.area.h*.45)}}fly(t,a,s,n,r={}){const i=r.dur??300;this.flights.push({card:t,from:a,to:s,rot0:Pt(n+3)*.35,rot1:r.rot1??0,scale1:r.scale1??1,arc:Math.min(this.ch*.4,Math.hypot(s.x-a.x,s.y-a.y)*.15),start:performance.now()+(r.delay??0),dur:i,hideId:n,toDiscard:!!r.toDiscard}),this.invalidate()}get animEnd(){return this.flights.reduce((t,a)=>Math.max(t,a.start+a.dur),0)}discardRot(t){return Pt(t.id)*.5}draw(t){this.frame=0,this.frames++;const a=this.ctx,s=this.game;if(a.setTransform(this.k,0,0,this.k,0,0),a.clearRect(0,0,this.w,this.h),!s)return;const n=t/1e3;let r=!1;if(t<this.shakeUntil){const l=this.shakeMag*((this.shakeUntil-t)/300);a.translate(Math.round((Math.random()-.5)*2*l),Math.round((Math.random()-.5)*2*l)),r=!0}const i=new Set(this.extraHidden);for(const l of this.flights)i.add(l.hideId);this.drawCenter(s,i,t,n);for(let l=0;l<s.players.length;l++)l!==this.human&&this.drawBot(s,l,i,n);r=this.drawHand(s,i,n)||r,this.reveal.length&&(a.fillStyle="rgba(16,12,24,0.55)",a.fillRect(this.area.x,this.area.y,this.area.w,this.area.h),this.reveal.forEach((l,c)=>{if(i.has(l.id))return;const h=this.revealPos(c,this.reveal.length),u=ms((t-(this.pops.get(l.id)??-1e9))/380);u&&(r=!0),this.card(this.sprites.face(l,this.cw,this.ch),h.x,h.y-u*4,u*.12,1+u*.18,3)}));const o=[];for(const l of this.flights){const c=(t-l.start)/l.dur;if(c>=1){l.toDiscard&&(this.popAt=t);continue}if(o.push(l),c<0)continue;const h=Kr(c),u=l.from.x+(l.to.x-l.from.x)*h,m=l.from.y+(l.to.y-l.from.y)*h-Math.sin(Math.PI*c)*l.arc,w=l.rot0+(l.rot1-l.rot0)*h,y=(1+(l.scale1-1)*h)*(1+Math.sin(Math.PI*c)*.05),C=l.card?this.sprites.face(l.card,this.cw,this.ch):this.sprites.back(this.cw,this.ch);this.card(C,u,m,w,y,3+Math.sin(Math.PI*c)*6)}o.length!==this.flights.length&&(r=!0),this.flights=o,(o.length||t-this.popAt<450)&&(r=!0),this.texts=this.texts.filter(l=>t-l.start<900);for(const l of this.texts){const c=(t-l.start)/900,h=c<.15?.6+c/.15*.6:1.2-Math.min(.2,(c-.15)*.5);a.globalAlpha=c>.7?1-(c-.7)/.3:1,this.outlined(l.text,l.x,l.y-this.ch*.6-c*14,Math.round((l.big?16:11)*h),l.color),a.globalAlpha=1,r=!0}r?this.invalidate():this.ambient&&!this.idleTimer&&(this.idleTimer=window.setTimeout(()=>{this.idleTimer=0,this.invalidate()},33))}revealPos(t,a){const s=Math.min(this.cw*1.05,(this.area.w-this.cw*2)/Math.max(1,a)),n=this.center;return{x:Math.round(n.x-s*(a-1)/2+t*s),y:n.y}}pop(t){this.pops.set(t,performance.now()),this.invalidate()}float(t,a,s,n=!1){this.texts.push({text:t,x:a.x,y:a.y,color:s,start:performance.now(),big:n}),this.invalidate()}cardPoint(t){var n;const a=this.reveal.findIndex(r=>r.id===t);if(a>=0)return this.revealPos(a,this.reveal.length);const s=this.handRects.get(t);return s?{x:s.x+s.w/2,y:s.y+s.h/2}:((n=this.game)==null?void 0:n.top.id)===t?this.discardPos:null}outlined(t,a,s,n,r){const i=this.ctx;if(!this.hd){const o=ss(t,r,Ue,n>=14?2:1);i.drawImage(o,Math.round(a-o.width/2),Math.round(s-o.height/2));return}i.font=gs(n),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.lineWidth=Math.max(2,n*.22),i.strokeStyle=Ue,i.strokeText(t,a,s),i.fillStyle=r,i.fillText(t,a,s)}card(t,a,s,n,r,i=2){const o=this.ctx,l=u=>this.hd?u:Math.round(u);this.hd||(Math.abs(n)<.2&&(n=0),Math.abs(r-1)<.25&&(r=1));const c=l(t.width/this.k*r),h=l(t.height/this.k*r);o.save(),o.translate(l(a),l(s)),n&&o.rotate(n),o.fillStyle="rgba(10,8,20,0.38)",this.hd?(o.beginPath(),o.roundRect(-c/2+i*.6+1,-h/2+i+1,c-2,h-1,c*.1),o.fill()):o.fillRect(-c/2+Math.round(i*.6)+1,-h/2+Math.round(i)+1,c-2,h-1),o.drawImage(t,l(-c/2),l(-h/2),c,h),o.restore()}panel(t,a,s,n,r,i,o=10){const l=this.ctx;if(this.hd){l.font=gs(o);const C=Math.ceil(l.measureText(t).width)+12,Q=o+8,E=Math.min(this.w-C-3,Math.max(3,a-C/2)),N=s-Q/2;l.fillStyle="rgba(10,8,20,0.45)",l.beginPath(),l.roundRect(E,N+2,C,Q,Q/2),l.fill(),l.fillStyle=n,l.strokeStyle=i,l.lineWidth=1,l.beginPath(),l.roundRect(E,N,C,Q,Q/2),l.fill(),l.stroke(),l.fillStyle=r,l.textBaseline="middle",l.textAlign="center",l.fillText(t,E+C/2,N+Q/2+.5);return}const c=o>=12?2:1,h=ss(t,r,null,c),u=h.width+8,m=(ka+6)*c+2,w=Math.round(Math.min(this.w-u-3,Math.max(3,a-u/2))),y=Math.round(s-m/2);re(l,w,y+2,u,m,2,"rgba(10,8,20,0.45)"),re(l,w,y,u,m,2,i),re(l,w+1,y+1,u-2,m-2,1,n),l.drawImage(h,w+4,Math.round(y+(m-h.height)/2))}drawCenter(t,a,s,n){const r=this.ctx,{x:i,y:o}=this.center,l=Math.round(this.cw*.8),c=this.ch*1.35,h=this.ch*.88,u=28,m=this.ambient?n*.35*t.dir:0;r.fillStyle=ne[t.color];for(let Z=0;Z<u;Z++){const Me=Z/u*Math.PI*2+m,$e=Z%7===0,Qe=$e?3:2;r.globalAlpha=$e?1:.75,r.fillRect(Math.round(i+Math.cos(Me)*c-Qe/2),Math.round(o+Math.sin(Me)*h-Qe/2),Qe,Qe)}r.globalAlpha=1;const w=i-l,y=this.sprites.back(this.cw,this.ch),C=Math.min(4,Math.ceil(t.drawPile.length/20));for(let Z=0;Z<C;Z++)this.card(y,w-Z,o-Z*2,0,1,2);this.pileRect={x:w-this.cw/2,y:o-this.ch/2,w:this.cw,h:this.ch},t.turn===this.human&&!t.drawn&&!t.over&&t.playable(this.human).length===0&&(!this.ambient||Math.floor(n*3)%2===0)&&(r.strokeStyle="#fff",r.lineWidth=1,r.strokeRect(Math.round(w-this.cw/2-C)-2.5,Math.round(o-this.ch/2-C*2)-2.5,this.cw+5,this.ch+5));const E=i+l;this.discardPos={x:E,y:o};const N=t.discard.filter(Z=>!a.has(Z.id)).slice(-5),F=ms((s-this.popAt)/450);N.forEach((Z,Me)=>{const $e=Me===N.length-1,Qe=Pt(Z.id);this.card(this.sprites.face(Z,this.cw,this.ch),E+Qe*6,o+Pt(Z.id+7)*5-($e?Math.abs(F)*5:0),Qe*.5+($e?F*.08:0),$e?1+F*.12:1,2)}),t.pending>0&&this.panel(`+${t.pending}`,E+this.cw*.5,o-this.ch*.55,"#f0524f","#fff",Ue,12)}drawBot(t,a,s,n){const r=this.seat(a),i=t.players[a],o=i.hand.filter(Q=>!s.has(Q.id)).length,l=Math.round(this.cw*.55),c=Math.round(this.ch*.55),h=this.sprites.back(l,c),u=Math.min(o,12),m=Math.min(this.cw*2,l*.45*Math.max(0,u-1)),w=u>1?m/(u-1):0,y=t.turn===a&&!t.over;for(let Q=0;Q<u;Q++){const E=-m/2+Q*w,N=this.ambient?Math.sin(n*1.5+Q*.6+a)*.03:0,F=y?-2:0;r.vertical?this.card(h,r.x+F,r.y+E,Math.PI/2+N,1,1):this.card(h,r.x+E,r.y+F,N,1,1)}const C=r.vertical?r.y-m/2-l*.95:r.y+c*.5+9;this.panel(`${i.name} ${o}`,r.x,C,y?"#f5b52e":"#2b3138",y?Ue:"#f3ead7",y?"#fff":"#4a555c"),i.called&&i.hand.length===1&&this.panel("ÚLTIMA!",r.x,C-15,"#f0524f","#fff",Ue)}layoutHand(t,a){const s=t.players[this.human].hand.filter(h=>!(a!=null&&a.has(h.id))),n=s.length,r=Math.min(this.area.w-10,this.cw*11),i=n>1?Math.min(this.cw*.72,(r-this.cw)/(n-1)):0,o=this.cw+i*(n-1),l=this.area.x+this.area.w/2-o/2+this.cw/2,c=this.h-this.ch*.68;return s.map((h,u)=>{const m=n>1?u/(n-1)*2-1:0;return{card:h,x:l+u*i,y:c+m*m*this.ch*.08,rot:m*.07}})}drawHand(t,a,s){this.handRects.clear();const n=t.turn===this.human&&!t.over;let r=!1;for(const o of this.layoutHand(t,a)){const l=o.card.id,c=n&&t.canPlay(this.human,o.card),h=l===this.hoverId?1:0;let u=this.hover.get(l)??0;u+=(h-u)*.35,Math.abs(h-u)<.01?u=h:r=!0,u===0?this.hover.delete(l):this.hover.set(l,u);let m=o.y-(this.selected.has(l)?this.ch*.22:0),w=o.rot;c&&(m-=this.ch*.1),m-=this.ch*.1*u,u&&(w+=Math.max(-1,Math.min(1,(this.mouse.x-o.x)/this.cw))*.12*u),this.ambient&&(w+=Math.sin(s*1.6+l*1.7)*.018,m+=Math.sin(s*2.1+l)*.8);const y=this.sprites.face(o.card,this.cw,this.ch,n&&!c);this.card(y,o.x,m,w,1+.1*u,2+u*5),this.handRects.set(l,{x:o.x-this.cw/2,y:m-this.ch/2,w:this.cw,h:this.ch})}const i=t.players[this.human];return i.called&&i.hand.length===1&&this.panel("ÚLTIMA!",this.area.x+this.area.w/2,this.h-this.ch*1.25,"#f0524f","#fff",Ue),r}hitHand(t,a){let s=null;for(const[n,r]of this.handRects)t>=r.x&&t<=r.x+r.w&&a>=r.y&&a<=r.y+r.h&&(s=n);return s}hitPile(t,a){const s=this.pileRect;return t>=s.x-4&&t<=s.x+s.w+4&&a>=s.y-8&&a<=s.y+s.h+4}}const q=0,v=new Jr(f("table"));_r(e=>{v.ambient=e.effects,v.hd!==e.hd&&(v.hd=e.hd,v.resize()),v.invalidate()});let j=null,ee=null,Ma=[],Zt=!1;const _t=()=>j;function Jt(e,t){Ra(),j=e,ee=t,v.game=e,v.human=q,v.selected.clear(),v.extraHidden.clear(),v.reveal=[],f("table").hidden=!1,f("tableHud").hidden=!1;const a=Math.max(...e.players.map(s=>s.hand.length));for(let s=0;s<a;s++)e.players.forEach((n,r)=>{n.hand[s]&&rn(r,n.hand[s],(s*e.players.length+r)*Xr,420)});te()}function Ra(){Oa(),Zt=!1,j=null,ee=null,v.game=null,v.reveal=[],v.extraHidden.clear(),v.selected.clear(),v.invalidate(),f("picker").hidden=!0}function Yt(){Ra(),f("table").hidden=!0,f("tableHud").hidden=!0}function _e(e){e!==Zt&&(Zt=e,e?Oa():j&&!j.over&&te())}function Oa(){for(const e of Ma)clearTimeout(e);Ma=[]}function Re(e,t){Ma.push(window.setTimeout(t,Math.max(0,e)))}function te(){var a;const e=j;if(!e||!ee)return;Oa(),v.selected.clear(),ao(e),mt.setTheme(e.color),Ia(),v.invalidate(),(a=ee.onAfter)==null||a.call(ee);const t=Math.max(0,v.animEnd-performance.now());if(e.over){const s=ee;Re(t+450,()=>s.onOver(e.winner));return}Zt||Yr(e,t)}function sn(){j&&te()}function Yr(e,t){const a=ee,s=a.speed,n=Math.random;if(a.remote){if(lt(e)){const r=e.vulnerable!==null&&e.vulnerable!==q;Re(t+(r?1600:650),()=>{e===j&&lt(e)&&gt()})}return}if(e.vulnerable!==null){const r=e.vulnerable;if(r!==q&&a.autoCatch)Re(t+450,()=>{e.catchPlayer(q,r)&&te()});else{const i=e.players.map((o,l)=>l).filter(o=>o!==r&&e.players[o].bot);if(i.length&&n()<(r===q?a.botCatchChance:.4)){const o=i[Math.floor(n()*i.length)];Re(t+(900+n()*900)*s,()=>{e.catchPlayer(o,r)&&te()})}}}if(e.rules.jumpIn&&e.players.forEach((r,i)=>{!r.bot||i===e.turn||ps(e,i)&&n()<.5&&Re(t+(350+n()*600)*s,()=>{const o=ps(e,i);if(!o)return;const l=e.needsTarget(o)?{target:wa(e,i)}:{};r.hand.length===2&&n()<a.botCallChance&&e.callLast(i),e.play(i,o.id,l)&&te()})}),lt(e)){const r=e.vulnerable!==null&&e.vulnerable!==q;Re(t+(r?1600:650),()=>{e===j&&lt(e)&&gt()})}if(e.players[e.turn].bot){const r=e.turn;Re(t+(750+n()*450)*s,()=>{e.turn!==r||e.over||(Fr(e,r,a.botCallChance,n,a.botSlip??0),te())})}}function nn(e){const t=v.seat(e);return{x:t.x,y:t.y}}const Xr=85,eo=460,bs=170,ua=420,to=300;function rn(e,t,a,s=eo){const n={x:v.pileRect.x+v.cw/2,y:v.pileRect.y+v.ch/2};if(e===q){const r=v.layoutHand(j).find(i=>i.card.id===t.id);v.fly(t,n,r??nn(e),t.id,{delay:a,dur:s,rot1:(r==null?void 0:r.rot)??0})}else{const r=v.seat(e);v.fly(null,n,r,t.id,{delay:a,dur:s,scale1:.55,rot1:r.vertical?Math.PI/2:0})}}function ao(e){var s;let t=0;const a=n=>e.players[n].name;for(const n of e.events)switch((s=ee==null?void 0:ee.onEvent)==null||s.call(ee,n,t),n.t){case"play":{const r=n.p===q?v.handRects.get(n.card.id):void 0,i=r?{x:r.x+r.w/2,y:r.y+r.h/2}:nn(n.p);v.fly(n.card,i,v.discardPos,n.card.id,{delay:t,dur:ua,rot1:v.discardRot(n.card),toDiscard:!0}),n.card.kind==="wild4"?v.shake(t+ua,2.5):n.card.kind==="draw2"&&v.shake(t+ua,1.5),t+=to,n.jumpIn&&O(`${a(n.p)} jogou por cima!`),ce(n.card)&&O(`${a(n.p)} escolheu ${Ws[n.color]}`,St[n.color]),n.card.kind==="num"?V.play():V.special();break}case"multi":O(`${a(n.p)}: dobradinha de ${n.cards.length}!`,"#5b3fa8");break;case"draw":n.cards.forEach((r,i)=>rn(n.p,r,t+i*bs)),t+=n.cards.length*bs,(n.reason==="stack"||n.reason==="penalty")&&O(`${a(n.p)} comprou ${n.cards.length}`),V.draw();break;case"skip":O(`${a(n.p)} perdeu a vez`);break;case"reverse":O("Sentido invertido");break;case"swap":O(`${a(n.a)} trocou de mão com ${a(n.b)}`);break;case"rotate":O("As mãos giraram");break;case"call":O(`${a(n.p)}: Última carta!`,"#b97c12"),V.call();break;case"caught":O(`${a(n.by)} pegou ${a(n.p)}: +2`,"#a8302f"),v.shake(350,3),V.bad();break;case"reshuffle":O("Monte reembaralhado");break;case"exhausted":break;case"win":n.p===q&&V.win();break}e.events.length=0}function Ia(){const e=j,t=f("status"),a={draw:f("btnDraw"),pass:f("btnPass"),call:f("btnCall"),catch:f("btnCatch"),multi:f("btnMulti")};if(!e||e.over){t.textContent="",Object.values(a).forEach(i=>i.hidden=!0);return}const s=e.players[q],n=e.turn===q;t.textContent=n?lt(e)?e.pending?`Sem +2/+4: comprando ${e.pending}…`:"Sem jogada: comprando…":e.pending?`Jogue um +2/+4 ou compre ${e.pending}`:e.drawn?"Jogue a carta comprada ou passe":"Sua vez":`Vez de ${e.players[e.turn].name}`,a.draw.hidden=!(n&&!e.drawn),a.draw.firstChild.textContent=e.pending?`Comprar ${e.pending} `:"Comprar ",a.pass.hidden=!(n&&e.drawn),a.call.hidden=!(!s.called&&(n&&s.hand.length>=2&&s.hand.length<=1+e.maxDrop(q)||e.vulnerable===q)),a.catch.hidden=!(e.vulnerable!==null&&e.vulnerable!==q);const r=v.selected.size;a.multi.hidden=!r,a.multi.firstChild.textContent=r>1?`Jogar ${r} juntas `:"Jogar "}function so(e){const t=j;if(!t||t.over)return;const a=v.selected,s=t.players[q].hand;if(a.size){if(a.has(e.id))return a.size>1?a.delete(e.id):a.clear(),pa();if(t.couldGroup([...s.filter(i=>a.has(i.id)),e]))return a.add(e.id),pa();a.clear()}const r=t.turn===q&&!t.drawn&&!t.pending?t.bestGroup(q,e):[e];if(r.length>1){for(const i of r)a.add(i.id);return ys||(ys=!0,O('Grupo pronto! Clique nas cartas para tirar/pôr e em "Jogar" (ou Enter)')),pa()}on(e)}let ys=!1;function pa(){V.draw(),Ia(),v.invalidate()}function on(e){const t=j;if(!t.canPlay(q,e)){t.turn===q&&O("Essa carta não serve agora");return}if(ce(e))return no(e);if(t.needsTarget(e)&&t.players[q].hand.length>1)return ro(e);Na(e,{})}function ln(){const e=j;if(!e)return;const t=[...v.selected];if(t.length===1){const a=e.players[q].hand.find(s=>s.id===t[0]);return v.selected.clear(),a&&on(a),Ia()}e.playMany(q,t)?te():(O("Nenhuma dessas serve na mesa"),V.bad())}function Na(e,t){f("picker").hidden=!0,j!=null&&j.play(q,e.id,t)&&te()}function cn(e,t){var s;f("pickerTitle").textContent=e;const a=f("pickerOptions");a.replaceChildren(...t.map(n=>{const r=document.createElement("button");return r.textContent=n.label,r.style.setProperty("--b",n.color),r.style.setProperty("--bd",n.shade),r.onclick=n.onPick,r})),f("picker").hidden=!1,(s=a.firstElementChild)==null||s.focus()}function no(e){cn("Escolha a cor",ve.map(t=>({label:Ws[t],color:ne[t],shade:St[t],onPick:()=>Na(e,{color:t})})))}function ro(e){cn("Trocar de mão com…",j.players.map((a,s)=>({pl:a,i:s})).filter(({i:a})=>a!==q).map(({pl:a,i:s})=>({label:`${a.name} (${a.hand.length})`,color:"#3a434b",shade:"#20262b",onPick:()=>Na(e,{target:s})})))}function lt(e){return!e.over&&!e.busy&&e.turn===q&&!e.drawn&&e.playable(q).length===0}function gt(){j!=null&&j.draw(q)&&te()}function Za(){j!=null&&j.pass(q)&&te()}function hn(){j!=null&&j.callLast(q)&&te()}function dn(){j&&j.vulnerable!==null&&j.catchPlayer(q,j.vulnerable)&&te()}const $a=v.canvas;$a.addEventListener("pointerdown",e=>{if(!j||!f("picker").hidden||v.reveal.length)return;const t=v.toLocal(e.clientX,e.clientY),a=v.hitHand(t.x,t.y);if(a!==null){const s=j.players[q].hand.find(n=>n.id===a);s&&so(s)}else v.hitPile(t.x,t.y)&&j.turn===q&&(j.drawn?Za():gt())});$a.addEventListener("pointermove",e=>{if(!j||e.pointerType!=="mouse")return;const t=v.toLocal(e.clientX,e.clientY);v.setMouse(t);const a=v.hitPile(t.x,t.y)&&j.turn===q;$a.style.cursor=v.hoverId!==null||a?"pointer":"default"});f("btnDraw").onclick=gt;f("btnPass").onclick=Za;f("btnCall").onclick=hn;f("btnCatch").onclick=dn;f("btnMulti").onclick=ln;f("pickerCancel").onclick=()=>f("picker").hidden=!0;function Sa(e){if(!j||j.over||!f("picker").hidden)return!1;if(e==="d")gt();else if(e==="p")Za();else if(e==="u")hn();else if(e==="c")dn();else if(e==="enter"&&v.selected.size)ln();else return!1;return!0}const fn=new TextEncoder,vs=new TextDecoder;function Ee(e){const t=fn.encode(e);return Ce(new Uint8Array([t.length>>8,t.length&255]),t)}function Ce(...e){const t=new Uint8Array(e.reduce((s,n)=>s+n.length,0));let a=0;for(const s of e)t.set(s,(a+=s.length)-s.length);return t}function oo(e){const t=[];do{let a=e%128;e=Math.floor(e/128),e>0&&(a|=128),t.push(a)}while(e>0);return new Uint8Array(t)}const ma=(e,t)=>Ce(new Uint8Array([e]),oo(t.length),t);class io{constructor(t){b(this,"ws",null);b(this,"buf",new Uint8Array(0));b(this,"ping",0);b(this,"subs",new Set);b(this,"packetId",1);b(this,"closed",!1);b(this,"retry",1e3);b(this,"connected",!1);this.o=t,this.open()}open(){if(this.closed)return;let t;try{t=new WebSocket(this.o.url,"mqtt")}catch{return this.later()}t.binaryType="arraybuffer",this.ws=t,t.onopen=()=>{const a=this.o.keepAlive??30,s=this.o.will,n=2|(s?4|(s.retain?32:0):0),r=Ce(Ee("MQTT"),new Uint8Array([4,n,a>>8,a&255])),i=s?Ce(r,Ee(this.o.clientId),Ee(s.topic),Ee(s.payload)):Ce(r,Ee(this.o.clientId));t.send(ma(16,i)),this.ping=window.setInterval(()=>this.send(new Uint8Array([192,0])),a*1e3/2)},t.onmessage=a=>this.read(new Uint8Array(a.data)),t.onclose=()=>{clearInterval(this.ping),this.connected&&this.o.onState(this.connected=!1),this.ws=null,this.later()},t.onerror=()=>t.close()}later(){this.closed||(setTimeout(()=>this.open(),this.retry),this.retry=Math.min(15e3,this.retry*2))}send(t){var a;((a=this.ws)==null?void 0:a.readyState)===WebSocket.OPEN&&this.ws.send(t)}read(t){for(this.buf=Ce(this.buf,t);;){if(this.buf.length<2)return;let a=0,s=1,n=1;for(;n<5;n++){if(n>=this.buf.length)return;const i=this.buf[n];if(a+=(i&127)*s,s*=128,!(i&128))break}const r=n+1;if(this.buf.length<r+a)return;this.handle(this.buf[0],this.buf.subarray(r,r+a)),this.buf=this.buf.slice(r+a)}}handle(t,a){var n;const s=t>>4;if(s===2){if(a[1]!==0)return(n=this.ws)==null?void 0:n.close();this.retry=1e3,this.o.onState(this.connected=!0);for(const r of this.subs)this.sendSub(r)}else if(s===3){const r=a[0]<<8|a[1],i=vs.decode(a.subarray(2,2+r)),o=t>>1&3,l=2+r+(o?2:0);this.o.onMessage(i,vs.decode(a.subarray(l)))}}sendSub(t){const a=this.packetId++&65535||1;this.send(ma(130,Ce(new Uint8Array([a>>8,a&255]),Ee(t),new Uint8Array([0]))))}subscribe(t){this.subs.add(t),this.connected&&this.sendSub(t)}publish(t,a,s=!1){this.send(ma(48|(s?1:0),Ce(Ee(t),fn.encode(a))))}close(){var t;this.closed=!0,clearInterval(this.ping),this.send(new Uint8Array([224,0])),(t=this.ws)==null||t.close()}}const tt={error:""};function ks(e){let t={};const a=s=>s.map(n=>({me:!!(n.isMe&&n.sameTab),presence:n.presence??{}}));return{set(s){const n={...s};for(const r of Object.keys(t))r in s||(n[r]=null);t=s,e.presence(n).then(()=>tt.error="",r=>{tt.error=`${(r==null?void 0:r.code)??"erro"}${r!=null&&r.message?`: ${r.message}`:""}`,console.warn("[pilantro] presença recusada:",tt.error)})},peers:()=>a(e.peers()),onPeers(s){return e.onPeers(n=>s(a(n.peers)))},leave(){e.leave?e.leave().catch(()=>{}):e.presence({...Object.fromEntries(Object.keys(t).map(s=>[s,null]))}).catch(()=>{}),t={}}}}class lo{constructor(t,a,s,n){b(this,"mine",{});b(this,"others",new Map);b(this,"listeners",new Set);b(this,"timer");b(this,"queued",!1);this.bc=t,this.room=a,this.tab=s,this.onLeave=n,this.post({k:"hello",room:a,tab:s}),this.timer=window.setInterval(()=>{this.post({k:"p",room:a,tab:s,pres:this.mine});const r=Date.now();for(const[i,o]of this.others)r-o.seen>7e3&&(this.others.delete(i),this.notify())},2e3)}post(t){this.bc.postMessage(t)}handle(t){t.tab!==this.tab&&(t.k==="hello"&&this.post({k:"p",room:this.room,tab:this.tab,pres:this.mine}),t.k==="bye"&&this.others.delete(t.tab),t.k==="p"&&this.others.set(t.tab,{pres:t.pres??{},seen:Date.now()}),this.notify())}notify(){this.queued||(this.queued=!0,queueMicrotask(()=>{this.queued=!1;const t=this.peers();for(const a of this.listeners)a(t)}))}set(t){this.mine=JSON.parse(JSON.stringify(t)),this.post({k:"p",room:this.room,tab:this.tab,pres:this.mine}),this.notify()}peers(){return[{me:!0,presence:this.mine},...[...this.others.values()].map(t=>({me:!1,presence:t.pres}))]}onPeers(t){return this.listeners.add(t),this.notify(),()=>void this.listeners.delete(t)}leave(){clearInterval(this.timer),this.post({k:"bye",room:this.room,tab:this.tab}),this.listeners.clear(),this.onLeave(this)}}function co(){const e=new BroadcastChannel("pilantro-net"),t=Math.random().toString(36).slice(2,10),a=new Map,s=n=>{const r=new lo(e,n,t,i=>a.delete(i.room));return a.set(n,r),r};return e.onmessage=n=>{var r;return(r=a.get(n.data.room))==null?void 0:r.handle(n.data)},window.addEventListener("pagehide",()=>a.forEach(n=>n.leave())),{kind:"local",lobby:s(""),join:async n=>a.get(n)??s(n)}}const ho=["wss://broker.hivemq.com:8884/mqtt","wss://broker.emqx.io:8084/mqtt"],He="pilantro-uno/v1/";function fo(){const e=Math.random().toString(36).slice(2,12),t=`${He}salao/${e}`;let a={};const s=new Map,n=new Set;let r=!1;const i=()=>[{me:!0,presence:a},...[...s.values()].map(y=>({me:!1,presence:y.pres}))],o=()=>{r||(r=!0,queueMicrotask(()=>{r=!1;const y=i();for(const C of n)C(y)}))},l=y=>m.forEach(y),c=()=>l(y=>y.publish(t,JSON.stringify(a))),h=(y,C)=>{if(y===`${He}ola`){C!==e&&c();return}const Q=y.slice(`${He}salao/`.length);if(!(Q===e||!/^[a-z0-9]{4,16}$/.test(Q))){if(!C){s.delete(Q)&&o();return}try{const E=JSON.parse(C);if(!E||typeof E!="object"||Array.isArray(E))return;s.set(Q,{pres:E,seen:Date.now()}),o()}catch{}}},u=()=>{tt.error=m.some(y=>y.connected)?"":"sem conexão com os servidores do jogo (tentando de novo…)",o()},m=ho.map((y,C)=>new io({url:y,clientId:`pilantro-${e}`,keepAlive:30,will:{topic:t,payload:"",retain:!1},onMessage:h,onState:Q=>{Q&&(m[C].publish(`${He}ola`,e),m[C].publish(t,JSON.stringify(a))),u()}}));for(const y of m)y.subscribe(`${He}salao/+`),y.subscribe(`${He}ola`);window.setInterval(()=>{c();const y=Date.now();for(const[C,Q]of s)y-Q.seen>5e4&&(s.delete(C),o())},2e4),window.addEventListener("pagehide",()=>l(y=>{y.publish(t,""),y.close()})),u();const w={set(y){a=JSON.parse(JSON.stringify(y)),c(),o()},peers:i,onPeers(y){return n.add(y),o(),()=>void n.delete(y)},leave(){w.set({})}};return{kind:"mqtt",lobby:w,join:async()=>w}}let Te=null;const uo=()=>{try{return window.self!==window.top}catch{return!0}};async function po(){var n;if(Te)return{net:Te};const e=window.claude;if(!(e!=null&&e.use)){if(!(new URLSearchParams(location.search).get("rede")==="local")&&typeof WebSocket=="function")Te=fo();else if(typeof BroadcastChannel=="function")Te=co();else return{problem:"unavailable"};return{net:Te}}if(!uo())return{problem:"top"};const t=await e.use("permissions").catch(()=>null);let a=t?await t.state("room").catch(()=>"unavailable"):"granted";if(a==="prompt"&&(a=((n=await t.request(["room"]).catch(()=>({})))==null?void 0:n.room)??"unavailable"),a==="denied")return{problem:"denied"};const s=await e.use("room").catch(()=>null);return s?(Te={kind:"claude",lobby:ks(s),join:async r=>ks(await s.join(r))},{net:Te}):{problem:a==="granted"&&t?"reload":"unavailable"}}async function mo(){var t,a;const e=await((a=(t=window.claude)==null?void 0:t.use)==null?void 0:a.call(t,"permissions").catch(()=>null));return e?e.manage().then(()=>!0,()=>!1):!1}const Xt=6,un=["Ana","Beto","Caio","Duda","Edu"],go=Nt(),Ke=e=>go[e],ws=14;let I=null,ae=null,J=null,bt="";const Ve=Math.random().toString(36).slice(2,10);let he=ko(),Je=null,ct=null,_a=()=>{},R="lobby",G=[],Ge=!1,pn=0,Le=null,Ye=[],bo=0,yo=0,Xe=2;const Ba=new Map;let fe=null,be=-1,xa=-1,Ca=-1,ga=0,vo=0,Gt=!1,at=null,et=0;const mn=()=>J!==null;function ko(){try{const e=localStorage.getItem("pilantro.nick");if(e)return e}catch{}return`Jogador ${10+Math.floor(Math.random()*90)}`}function gn(e){return[...e].filter(t=>{const a=t.codePointAt(0);return a>=32&&!(a>=127&&a<=159)&&!(a>=8203&&a<=8207)&&!(a>=8232&&a<=8238)}).join("")}function ba(e){he=gn(e).trim().slice(0,14)||he;try{localStorage.setItem("pilantro.nick",he)}catch{}}function wo(e){switch(e.t){case"play":return["p",e.p,e.card.id,e.color,e.jumpIn?1:0];case"multi":return["m",e.p,e.kind,...e.cards.map(t=>t.id)];case"draw":return["d",e.p,e.reason,...e.cards.map(t=>t.id)];case"skip":return["s",e.p];case"reverse":return["r",e.dir];case"swap":return["w",e.a,e.b];case"rotate":return["o"];case"call":return["c",e.p];case"caught":return["k",e.by,e.p];case"pass":return["a",e.p];case"reshuffle":return["h"];case"exhausted":return["x"];case"win":return["W",e.p,e.points]}}function Mo(e,t){const a=n=>Number(e[n]),s=n=>e.slice(n).map(r=>Ke(Number(r)));switch(e[0]){case"p":return{t:"play",p:t(a(1)),card:Ke(a(2)),color:e[3],jumpIn:!!e[4]};case"m":return{t:"multi",p:t(a(1)),kind:e[2],cards:s(3)};case"d":return{t:"draw",p:t(a(1)),reason:e[2],cards:s(3)};case"s":return{t:"skip",p:t(a(1))};case"r":return{t:"reverse",dir:a(1)===-1?-1:1};case"w":return{t:"swap",a:t(a(1)),b:t(a(2))};case"o":return{t:"rotate"};case"c":return{t:"call",p:t(a(1))};case"k":return{t:"caught",by:t(a(1)),p:t(a(2))};case"a":return{t:"pass",p:t(a(1))};case"h":return{t:"reshuffle"};case"x":return{t:"exhausted"};case"W":return{t:"win",p:t(a(1)),points:a(2)}}return null}function $o(e){var t;return{p:e.drawPile.map(a=>a.id),d:e.discard.map(a=>a.id),h:e.players.map(a=>a.hand.map(s=>s.id)),k:e.players.reduce((a,s,n)=>a|(s.called?1<<n:0),0),c:e.color,t:e.turn,r:e.dir,pe:e.pending,dr:((t=e.drawn)==null?void 0:t.id)??-1,vu:e.vulnerable??-1,w:e.winner??-1,n:e.turnCount,e:Ye}}function Ms(e,t,a){const s=e.players.length,n=r=>(r-a+s)%s;t.h.forEach((r,i)=>{const o=e.players[n(i)];o.hand=r.map(Ke),o.called=!!(t.k&1<<i)}),e.drawPile=t.p.map(Ke),e.discard=t.d.map(Ke),e.color=t.c,e.turn=n(t.t),e.dir=t.r,e.pending=t.pe,e.drawn=t.dr>=0?Ke(t.dr):null,e.vulnerable=t.vu>=0?n(t.vu):null,e.winner=t.w>=0?n(t.w):null,e.turnCount=t.n,e.busy=!1}class So extends Kt{constructor(t,a,s){super(t.map(n=>({name:n,bot:!1})),a,1),this.toHost=s}send(t){return this.busy=!0,Lo(t),!0}play(t,a,s={}){const n=this.players[t].hand.find(r=>r.id===a);return!n||!this.canPlay(t,n)||(n.kind==="wild"||n.kind==="wild4")&&!s.color?!1:this.send({a:"play",id:a,c:s.color,t:s.target===void 0?void 0:this.toHost(s.target)})}playMany(t,a){if(a.length===1)return this.play(t,a[0]);const s=a.map(n=>this.players[t].hand.find(r=>r.id===n));return this.over||t!==this.turn||this.drawn||this.pending||s.some(n=>!n)||!this.groupOrder(t,s)?!1:this.send({a:"many",ids:a})}draw(t){return this.over||t!==this.turn||this.drawn?!1:this.send({a:"draw"})}pass(t){return this.over||t!==this.turn||!this.drawn?!1:this.send({a:"pass"})}callLast(t){const a=this.players[t];return this.over||a.called||!(this.turn===t&&a.hand.length>=2&&a.hand.length<=1+this.maxDrop(t))&&!(a.hand.length===1&&this.vulnerable===t)?!1:this.send({a:"call"})}catchPlayer(t,a){return this.over||t===a||this.vulnerable!==a?!1:this.send({a:"catch",t:this.toHost(a)})}}function Bo(e){Ye.push([++bo,...wo(e)]),Ye.length>ws&&(Ye=Ye.slice(-ws))}function bn(e,t){const a=s=>s.filter(n=>n.presence.at===t);return{set:s=>e.set({...s,at:t}),peers:()=>a(e.peers()),onPeers:s=>e.onPeers(n=>s(a(n))),leave:()=>e.set({})}}function Vt(){if(J!=="host"||!ae||!I)return;const e={seq:++yo,rules:P.rules,seats:G.map(s=>[s.id,s.nick,s.kind]),started:Ge,gn:pn};for(Le&&(e.g=$o(Le));e.g&&JSON.stringify(e).length>3300&&e.g.e.length>2;)e.g.e=e.g.e.slice(-Math.floor(e.g.e.length/2));const t=G.filter(s=>s.kind==="h").length,a={code:bt,host:he,n:t,open:!Ge&&G.length<Xt};ae.set({id:Ve,nick:he,role:"host",mesa:a,w:e})}function xo(e,t,a){const s=n=>typeof n=="number"&&Number.isInteger(n)?n:-1;switch(a.a){case"play":{const n={};return ve.includes(a.c)&&(n.color=a.c),typeof a.t=="number"&&(n.target=s(a.t)),e.play(t,s(a.id),n)}case"many":return Array.isArray(a.ids)&&e.playMany(t,a.ids.map(s));case"draw":return e.draw(t);case"pass":return e.pass(t);case"call":return e.callLast(t);case"catch":return e.catchPlayer(t,s(a.t))}return!1}function Co(e){const t=e.filter(o=>!o.me&&o.presence.role==="guest"&&typeof o.presence.id=="string"),a=new Map(t.map(o=>[o.presence.id,o.presence]));let s=!1;if(!Ge){const o=G.filter((l,c)=>c===0||a.has(l.id));o.length!==G.length&&(s=!0),G=o;for(const[l,c]of a){const h=G.find(m=>m.id===l),u=Ga(c.nick);h&&h.nick!==u&&(h.nick=u,s=!0),!h&&G.length<Xt&&(G.push({id:l,nick:u,kind:"h"}),s=!0)}s&&Vt(),R==="wait"&&U();return}const n=Le;if(!n)return;G.forEach((o,l)=>{l>0&&o.kind==="h"&&!a.has(o.id)&&(o.kind="b",n.players[l].bot=!0,n.players[l].name=`${o.nick} (bot)`,O(`${o.nick} saiu: um bot assume`),s=!0)});let r=!1,i=!1;for(const[o,l]of a){const c=G.findIndex(u=>u.id===o&&u.kind==="h"),h=l.i;c<=0||!h||typeof h.n!="number"||h.n<=(Ba.get(o)??0)||(Ba.set(o,h.n),i=!0,!n.over&&xo(n,c,h)&&(r=!0))}r||s?sn():i&&Vt()}function $s(){G=G.filter(a=>a.kind==="h");const e=Math.max(2,Math.min(Xt,Math.max(Xe,G.length)));for(let a=0;G.length<e;a++)G.push({id:`bot${a}`,nick:un[a],kind:"b"});const t=G.map((a,s)=>({name:s===0?"Você":a.nick,bot:a.kind==="b"}));Ye=[],Le=new Kt(t,P.rules),Ge=!0,pn++,ea(),Jt(Le,{speed:P.speed,botCallChance:.85,botCatchChance:.7,onEvent:a=>Bo(a),onAfter:Vt,onOver:a=>$n(a)})}async function jo(){I&&(bt=Math.random().toString(36).slice(2,8),ae=bn(I.lobby,bt),J="host",G=[{id:Ve,nick:he,kind:"h"}],Ge=!1,Le=null,Xe=Math.max(2,P.bots+1),Ba.clear(),Je=ae.onPeers(Co),Vt(),R="wait",U())}const Ga=e=>(typeof e=="string"?gn(e).slice(0,14):"")||"Alguém";function Lo(e){J!=="guest"||!ae||ae.set({id:Ve,nick:he,role:"guest",i:{...e,n:++vo}})}function qo(e){const t=e.find(o=>!o.me&&o.presence.role==="host");if(!t){Gt&&!et&&(et=window.setTimeout(()=>ja("O anfitrião saiu e a mesa fechou."),3e3));return}clearTimeout(et),et=0,Gt=!0;const a=t.presence.w;if(!a||typeof a.seq!="number"||a.seq<=Ca)return;if(Ca=a.seq,at=a,be=a.seats.findIndex(o=>o[0]===Ve),!a.started||!a.g){(R==="wait"||R==="end")&&U();return}if(be<0)return ja("A partida dessa mesa já começou.");const s=a.seats.length,n=o=>(o-be+s)%s,r=Array.from({length:s},(o,l)=>{const c=a.seats[(l+be)%s];return l===0?"Você":c[2]==="b"&&!un.includes(c[1])?`${c[1]} (bot)`:c[1]});if(a.gn!==xa||!fe){xa=a.gn,fe=new So(r,Po(),o=>(o+be)%s),Ms(fe,a.g,be),ga=Math.max(0,...a.g.e.map(o=>Number(o[0]))),ea(),Jt(fe,{speed:1,botCallChance:0,botCatchChance:0,remote:!0,onOver:o=>$n(o)});return}r.forEach((o,l)=>fe.players[l].name=o);const i=a.g.e.filter(o=>Number(o[0])>ga);i.length&&(ga=Number(i[i.length-1][0])),Ms(fe,a.g,be),fe.events=i.map(o=>Mo(o.slice(1),n)).filter(o=>!!o),sn()}function Po(){const e=(at==null?void 0:at.rules)??{};return Object.fromEntries(Object.keys(Mn).map(t=>[t,e[t]===!0]))}async function Qo(e){I&&(ae=bn(I.lobby,e),J="guest",bt=e,fe=null,be=-1,xa=-1,Ca=-1,Gt=!1,at=null,ae.set({id:Ve,nick:he,role:"guest"}),Je=ae.onPeers(qo),R="wait",U(),setTimeout(()=>{J==="guest"&&bt===e&&!Gt&&ja("Essa mesa não está mais aberta.")},6e3))}function ja(e){Oe(),vn(e)}function Oe(){Je==null||Je(),Je=null,ae==null||ae.leave(),ae=null,J=null,Va(),Le=null,fe=null,Ge=!1,clearTimeout(et),et=0,Yt(),v.inset={left:0,top:0}}function yn(){J&&Oe(),I==null||I.lobby.set({}),ct==null||ct(),ct=null,f("online").hidden=!0}function ea(){f("online").hidden=!0;for(const e of["menu","end","picker"])f(e).hidden=!0}function vn(e){R="msg",kn=e,U()}let kn="";function z(e,t,a="ghost",s=!1){return d("button",{type:"button",className:a,onclick:t,disabled:s},e)}function Ss(e){return d("ul",{className:"seats"},...e.map(([t,a,s],n)=>d("li",{},d("span",{className:"seatn"},`${n+1}`),d("span",{},a),t===Ve?d("em",{}," (você)"):s==="b"?d("em",{}," (bot)"):n===0?d("em",{}," (anfitrião)"):"")))}function Bs(){return I?I.lobby.peers().filter(e=>!e.me&&e.presence.mesa&&typeof e.presence.mesa.code=="string").map(e=>{const t=e.presence.mesa;return{code:t.code.replace(/[^a-z0-9]/g,"").slice(0,12),host:Ga(t.host),n:Number(t.n)||1,open:!!t.open}}).filter(e=>e.code):[]}function U(){const e=f("onlineBody");if(f("online").hidden=!1,R==="off"){const t=ht==="denied"?z("Abrir permissões",()=>void mo().then(a=>a?location.reload():vn("Abra o menu de permissões da página (no topo do claude.ai) e ative a conexão em tempo real."))):ht==="reload"||ht==="unavailable"?z("Recarregar a página",()=>location.reload()):"";e.replaceChildren(d("p",{className:"sub"},Eo[ht]),d("div",{className:"buttons center"},z("Voltar",ya),t||z("Tentar de novo",()=>void Sn(_a),"primary")));return}if(R==="msg"){e.replaceChildren(d("p",{className:"sub"},kn),d("div",{className:"buttons center"},z("Ver mesas",()=>(R="lobby",U()),"primary"),z("Voltar",ya)));return}if(R==="lobby"){const t=d("input",{type:"text",id:"onlineNick",value:he,maxLength:14,autocomplete:"off"});t.addEventListener("change",()=>{ba(t.value),Va()});const a=Bs();e.replaceChildren(d("label",{className:"row"},"Seu nome",t),La(),d("h2",{className:"olh"},"Mesas abertas"),a.length?d("ul",{className:"tables"},...a.map(s=>d("li",{},d("span",{},`Mesa de ${s.host}`),d("span",{className:"muted"},`${s.n}/${Xt}`),z(s.open?"Entrar":"Em jogo",()=>(ba(t.value),void Qo(s.code)),s.open?"primary":"ghost",!s.open)))):d("p",{className:"sub"},"Nenhuma mesa aberta agora. Crie uma e chame quem está com o jogo aberto."),(I==null?void 0:I.kind)==="local"?d("p",{className:"sub small"},"Modo de teste: as mesas conectam só as abas deste navegador."):"",(I==null?void 0:I.kind)==="mqtt"&&Bs().length===0?d("p",{className:"sub small"},"Quem abrir o jogo por este mesmo link aparece aqui em alguns segundos."):"",d("div",{className:"buttons center"},z("Voltar",ya),z("Criar mesa",()=>(ba(t.value),void jo()),"primary")));return}if(R==="wait"){if(J==="host"){const t=G.filter(n=>n.kind==="h").length;Xe=Math.max(Xe,t,2);const a=d("select",{id:"onlinePlayers"},...[2,3,4,5,6].filter(n=>n>=t).map(n=>d("option",{value:String(n),selected:n===Xe},`${n} jogadores`)));a.addEventListener("change",()=>Xe=Number(a.value));const s=Object.entries(P.rules).filter(([,n])=>n).map(([n])=>Mn[n]);e.replaceChildren(d("p",{className:"sub"},'Sua mesa está aberta. Quem estiver com o jogo aberto vê a mesa em "Jogar online" e pode entrar.'),La(),Ss(G.map(n=>[n.id,n.nick,n.kind])),d("label",{className:"row"},"Completar com bots até",a),d("p",{className:"sub small"},s.length?`Regras da casa: ${s.join(", ")}.`:"Regras de sempre (as regras da casa vêm do menu do clássico)."),d("div",{className:"buttons center"},z("Fechar mesa",()=>(Oe(),R="lobby",U())),z("Começar partida",$s,"primary")))}else{const t=at;e.replaceChildren(t?Ss(t.seats):d("p",{className:"sub"},"Entrando na mesa…"),d("p",{className:"sub"},t?be<0?"A mesa está cheia.":`Esperando ${t.seats[0][1]} começar a partida…`:""),d("div",{className:"buttons center"},z("Sair da mesa",()=>(Oe(),R="lobby",U()))))}return}if(R==="menu"){e.replaceChildren(d("p",{className:"sub"},J==="host"?"Se você sair, a mesa fecha para todo mundo.":"Se você sair, um bot assume o seu lugar."),d("div",{className:"stack"},z("Voltar à partida",ea,"primary"),z("Sair da mesa",()=>(Oe(),R="lobby",U()),"warn-static")));return}R==="end"&&e.replaceChildren(d("p",{className:"sub big"},wn),J==="host"?d("div",{className:"buttons center"},z("Sair da mesa",()=>(Oe(),R="lobby",U())),z("Nova partida",$s,"primary")):d("div",{className:"stack"},d("p",{className:"sub"},"Esperando o anfitrião começar outra…"),z("Sair da mesa",()=>(Oe(),R="lobby",U()))))}let wn="",ht="unavailable";const Eo={top:"Esta janela abriu o jogo fora do claude.ai, e por aqui não dá para conectar. Abra o Pilantro pelo link claude.ai/artifact/… para jogar online.",denied:'A conexão em tempo real está bloqueada nas permissões desta página. Libere em "Abrir permissões" e recarregue.',reload:"Conexão liberada. Recarregue a página para entrar nas mesas.",unavailable:"Não deu para conectar. O jogo online só funciona para quem está logado no claude.ai e foi convidado para a página (quem entra por link público não conecta). Peça um convite a quem compartilhou, ou recarregue a página para pegar a versão mais nova."},Mn={stacking:"empilhar +2/+4",sevenZero:"sete-zero",jumpIn:"jogar por cima",drawUntilPlayable:"comprar até poder",multiNumber:"dobradinha",sequences:"escadinha"};function $n(e){const t=J==="host"?Le:fe;wn=e===null||!t?"Ninguém venceu.":e===q?"Você venceu!":`${t.players[e].name} venceu.`,J==="host"&&(Ge=!1),R="end",U()}function ya(){yn(),_a()}async function Sn(e){_a=e,R="lobby",f("onlineBody").replaceChildren(d("p",{className:"sub"},"Conectando…")),f("online").hidden=!1;const t=await po();if("problem"in t)return ht=t.problem,R="off",U();I=t.net,ct??(ct=I.lobby.onPeers(()=>{var a;f("online").hidden||(R==="lobby"?To():R==="wait"&&J==="host"&&((a=f("roomLine"))==null||a.replaceWith(La())))})),Va(),U()}function Va(){I&&!J&&I.lobby.set({id:Ve,nick:he})}function To(){const e=document.getElementById("onlineNick"),t=document.activeElement===e,a=(e==null?void 0:e.value)??he;U();const s=document.getElementById("onlineNick");s&&(s.value=a,t&&s.focus())}function La(){const e=(I==null?void 0:I.lobby.peers())??[],t=e.map(s=>s.me?"você":Ga(s.presence.nick));return d("p",{className:"sub small",id:"roomLine"},`Na sala agora: ${e.length} ${e.length===1?"pessoa":"pessoas"} (${t.join(", ")}).`,tt.error?d("span",{className:"neterr"},` Problema de conexão: ${tt.error}`):"")}function Bn(){f("online").hidden?(R="menu",U()):R==="menu"&&ea()}const Ao=["Ana","Beto","Caio","Duda","Edu"],Tt=new Map;let Da=!1;function Ro(){Da=!0,v.inset={left:0,top:0},v.resize(),f("table").hidden=!1,Bt()}function xn(){Da=!1,yn(),Yt();for(const e of["menu","end"])f(e).hidden=!0}function Cn(){ta();const e=[{name:"Você",bot:!1},...Ao.slice(0,P.bots).map(t=>({name:t,bot:!0}))];Jt(new Kt(e,P.rules),{speed:P.speed,botCallChance:.85,botCatchChance:.7,onOver:Io})}function Oo(e){return Da?mn()?e==="escape"?(f("picker").hidden?Bn():f("picker").hidden=!0,!0):f("online").hidden?Sa(e):!1:f("online").hidden?e==="escape"?(f("picker").hidden?f("menu").hidden?Bt():_t()&&!_t().over&&ta():f("picker").hidden=!0,!0):!f("menu").hidden||!f("end").hidden?!1:Sa(e):!1:!1}function ta(){for(const e of["menu","end","picker"])f(e).hidden=!0}function Bt(){if(mn())return Bn();const e=f("menuForm");e.elements.namedItem("bots").value=String(P.bots),e.elements.namedItem("speed").value=String(P.speed);for(const a of Object.keys(P.rules)){const s=e.elements.namedItem(a);s&&(s.checked=!!P.rules[a])}f("classicOpts").replaceChildren(Aa());const t=_t();f("menuResume").hidden=!t||t.over,f("end").hidden=!0,f("menu").hidden=!1}f("menuForm").addEventListener("submit",e=>{e.preventDefault();const t=e.target,a=s=>t.elements.namedItem(s);P.bots=Number(a("bots").value),P.speed=Number(a("speed").value),P.rules={stacking:a("stacking").checked,sevenZero:a("sevenZero").checked,jumpIn:a("jumpIn").checked,drawUntilPlayable:a("drawUntilPlayable").checked,multiNumber:a("multiNumber").checked,sequences:a("sequences").checked},Xs(),Tt.clear(),Cn()});f("menuResume").onclick=ta;f("menuOnline").onclick=()=>{ta(),Yt(),Sn(Bt)};f("endAgain").onclick=Cn;f("endMenu").onclick=Bt;function Io(e){const t=_t(),a=t.players[e];Tt.set(a.name,(Tt.get(a.name)??0)+1),f("endTitle").textContent=e===q?"Você venceu!":`${a.name} venceu`;const s=t.players.reduce((n,r)=>n+r.hand.reduce((i,o)=>i+(o.kind==="num"?o.value:ce(o)?50:20),0),0);f("endSub").textContent=`${s} pontos nas mãos dos adversários.`,f("score").replaceChildren(...t.players.map(n=>({name:n.name,n:Tt.get(n.name)??0})).sort((n,r)=>r.n-n.n).map(n=>{const r=document.createElement("li");return r.textContent=`${n.name}: ${n.n} vitória${n.n===1?"":"s"}`,r})),f("end").hidden=!1,f("endAgain").focus()}const aa=[{id:"draw2",name:"Ataque +2",desc:"+{n} multi a cada +2 que você joga",kind:"mult",base:2,up:1},{id:"wild4",name:"Ataque +4",desc:"+{n} multi a cada +4 que você joga",kind:"mult",base:4,up:2},{id:"skip",name:"Pular",desc:"+{n} multi a cada Pular",kind:"mult",base:1,up:1},{id:"rev",name:"Inverter",desc:"+{n} multi a cada Inverter",kind:"mult",base:1,up:1},{id:"wild",name:"Curinga",desc:"+{n} multi a cada Curinga",kind:"mult",base:1,up:1},{id:"dobradinha",name:"Dobradinha",desc:"+{n} multi por carta extra de mesmo número",kind:"mult",base:1,up:1},{id:"escadinha",name:"Escadinha",desc:"+{n} multi por carta extra na sequência da mesma cor",kind:"mult",base:2,up:1},{id:"ultima",name:"Última!",desc:"+{n} multi ao avisar a última carta",kind:"mult",base:1,up:1},{id:"pegada",name:"Pegar no Pulo",desc:"+{n} multi ao pegar o rival sem avisar",kind:"mult",base:2,up:1},{id:"batida",name:"Batida",desc:"+{n} fichas quando você bate",kind:"chips",base:10,up:15}],yt=Object.fromEntries(aa.map(e=>[e.id,e])),jn=(e,t)=>yt[e].base+(t-1)*yt[e].up,Ln=[{id:"brilho",name:"Brilhante",desc:"+30 fichas quando você joga",price:4},{id:"holo",name:"Holográfica",desc:"+3 multi quando você joga",price:5},{id:"vidro",name:"Vidro",desc:"×2 multi quando você joga; 1 em 4 de quebrar",price:6},{id:"ouro",name:"Ouro",desc:"+$3 quando você joga",price:5},{id:"sorte",name:"Sortuda",desc:"1 em 4: +5 multi · 1 em 10: +$15",price:4},{id:"bomba",name:"Bomba",desc:"+60 fichas se estiver na mão do rival quando você bater",price:5}],vt=Object.fromEntries(Ln.map(e=>[e.id,e])),qn=[{id:"maoLeve",name:"Mão Leve",desc:"Você começa cada rodada com 3 cartas",price:10},{id:"folego",name:"Fôlego",desc:"+1 rodada em cada blind",price:10},{id:"radar",name:"Radar",desc:"Você pega na hora o rival que esquece de avisar",price:8},{id:"cofrinho",name:"Cofrinho",desc:"Juros vão até $10 (em vez de $5)",price:10},{id:"liquidacao",name:"Liquidação",desc:"Tudo na loja sai 25% mais barato",price:10},{id:"roleta",name:"Roleta Viciada",desc:"Trocar os itens da loja custa $2 a menos",price:8},{id:"bando",name:"Bando Grande",desc:"+1 vaga de comparsa",price:10}],Pn=Object.fromEntries(qn.map(e=>[e.id,e])),Qn=[{id:"empilhador",name:"O Empilhador",desc:"Vale empilhar +2 e +4 (para os dois)",target:2,minAnte:1,color:"#a8302f",rules:{stacking:!0}},{id:"setezero",name:"O Sete-Zero",desc:"O 7 troca as mãos e o 0 gira as mãos",target:2,minAnte:1,color:"#5b3fa8",rules:{sevenZero:!0}},{id:"furafila",name:"O Fura-Fila",desc:"Vale jogar uma carta idêntica fora da vez",target:2,minAnte:1,color:"#2f6b6b",rules:{jumpIn:!0}},{id:"ligeiro",name:"O Ligeiro",desc:"O rival começa com 3 cartas",target:2,minAnte:1,color:"#8c6b2f",rivalHand:3},{id:"mancha",name:"A Mancha",desc:"Suas cartas {cor} não dão multi nem bônus",target:2,minAnte:1,color:"#8c3b8f"},{id:"agiota",name:"O Agiota",desc:"Cada carta que você compra custa $1",target:2,minAnte:1,color:"#3f6b4a"},{id:"muro",name:"O Muro",desc:"Meta gigante",target:3,minAnte:2,color:"#6b5a4a"},{id:"mudo",name:"O Mudo",desc:"Suas cartas de ação e curingas não dão multi",target:1.75,minAnte:2,color:"#555a66"},{id:"grande",name:"O Grande Pilantra",desc:"Empilha, fura a fila e começa com 3 cartas",target:2,minAnte:99,color:"#a8302f",rules:{stacking:!0,jumpIn:!0},rivalHand:3}],de=Object.fromEntries(Qn.map(e=>[e.id,e])),No=["Zeca","Dona Cida"],En=[5,4],Zo=["Blind Pequeno","Blind Grande"],_o=[1,1.5],Tn=[3,4,5],xs=[75,175,350,600,950,1300,1750,2500],je=8;function Go(e){return e<=je?xs[e-1]:Math.round(xs[je-1]*Math.pow(1.6,e-je)/100)*100}const An={r:"vermelhas",y:"amarelas",g:"verdes",b:"azuis"},Vo=2,ft=4,qa=30,Dt=[{id:"torcedor",name:"Torcedor",desc:"+3 multi por carta {cor} que você joga",rarity:"comum",price:4,quote:"Hoje é dia de jogo, pô! Só dá o meu time!"},{id:"contador",name:"Contador",desc:"+6 fichas por carta na mão do rival quando você bate",rarity:"comum",price:4,quote:"Deixa que eu conto. Uma, duas... catorze."},{id:"fominha",name:"Fominha",desc:"+1 multi por carta que você comprou na rodada",rarity:"comum",price:4,quote:"Só mais uma. Juro que é a última."},{id:"cabecaFria",name:"Cabeça Fria",desc:"+8 multi se você bater sem ter comprado nenhuma carta",rarity:"comum",price:4,quote:"Relaxa. Eu nem precisei comprar."},{id:"seteDeOuro",name:"Sete de Ouro",desc:"Cada 7 que você joga dá +7 multi",rarity:"comum",price:4,quote:"Sete é conta de mentiroso? Comigo, não."},{id:"carrasco",name:"Carrasco",desc:"Cada +2 ou +4 que você joga dá +15 fichas",rarity:"comum",price:4,quote:"Mais duas. Mais quatro. Mais."},{id:"apressado",name:"Apressado",desc:"×2 multi se você bater em até 4 jogadas",rarity:"incomum",price:6,quote:"Tô atrasado, tô atrasado, sai da frente!"},{id:"colecionador",name:"Colecionador",desc:"+4 multi por tipo diferente de carta de ação que você jogou",rarity:"incomum",price:6,quote:"Esse aí eu ainda não tenho."},{id:"gemeos",name:"Gêmeos",desc:"×1,5 multi a cada dobradinha",rarity:"incomum",price:6,quote:"— A gente joga junto. — Junto!"},{id:"escadeiro",name:"Escadeiro",desc:"×1,5 multi a cada escadinha",rarity:"incomum",price:6,quote:"Degrau por degrau a gente chega lá."},{id:"ultimoSuspiro",name:"Último Suspiro",desc:'×2 multi ao avisar "Última!"',rarity:"incomum",price:6,quote:"Só falta uma... só mais uma..."},{id:"agiotaAmigo",name:"Agiota Amigo",desc:"+$2 quando o rival compra 4 ou mais cartas de uma vez",rarity:"incomum",price:6,quote:"Paga quando der, amigão. Com jurinho."},{id:"cofre",name:"Cofre",desc:"Ao bater, +$1 a cada 3 cartas na mão do rival",rarity:"incomum",price:6,quote:"Clanc."},{id:"patrao",name:"O Patrão",desc:"×3 multi se o rival tiver 7 ou mais cartas quando você bate",rarity:"raro",price:8,quote:"Aqui quem manda sou eu."},{id:"viraLata",name:"Vira-Lata",desc:"+{n} multi; cresce +2 a cada rodada que você vence",rarity:"raro",price:8,quote:"Au! (e abana o rabo)"},{id:"bichoPapao",name:"Bicho-Papão",desc:"O rival começa cada rodada com 2 cartas a mais",rarity:"raro",price:8,quote:"Tem espaço debaixo da cama."},{id:"batedor",name:"Batedor de Carteira",desc:"Cada curinga na mão do rival vale +100 fichas quando você bate",rarity:"raro",price:8,quote:"Perdeu alguma coisa, chefia?"},{id:"maestro",name:"Maestro",desc:"×1,25 multi para cada comparsa que você tem",rarity:"raro",price:8,quote:"Todos juntos agora!"}],me=Object.fromEntries(Dt.map(e=>[e.id,e])),Rn={comum:"Comum",incomum:"Incomum",raro:"Raro"},Ze={comum:"#3d8ff0",incomum:"#3cb371",raro:"#f0524f"},Cs={comum:.6,incomum:.3,raro:.1},Do=5;function sa(e){return me[e.id].desc.replace("{cor}",e.color?An[e.color].replace(/s$/,""):"da cor dele").replace("{n}",String(e.counter??0))}const On=e=>Math.max(1,Math.floor(me[e.id].price/2));function ue(e){e.rng=e.rng+1831565813>>>0;let t=e.rng;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}const pe=(e,t)=>t[Math.floor(ue(e)*t.length)];function In(e,t){const a=[...t];for(let s=a.length-1;s>0;s--){const n=Math.floor(ue(e)*(s+1));[a[s],a[n]]=[a[n],a[s]]}return a}function Wo(e=Date.now()){const t=Nt(),a={version:2,seed:e,rng:e>>>0,deck:t,pile:[],spent:[],comparsas:[],nextUid:1,nextId:t.length,money:4,ante:1,blind:0,bosses:{},levels:Object.fromEntries(aa.map(s=>[s.id,1])),vouchers:[],voucherOffer:null,removeCost:3,phase:"select",round:null,shop:null,cash:null,endless:!1,stats:{bestRound:0,rounds:0,wins:0}};return a.pile=In(a,t.map(s=>s.id)),Nn(a),a}function xt(e){e.pile??(e.pile=[]),e.spent??(e.spent=[]);const t=new Set(e.deck.map(s=>s.id));e.pile=e.pile.filter(s=>t.has(s)),e.spent=e.spent.filter(s=>t.has(s));const a=new Set([...e.pile,...e.spent]);for(const s of e.deck)a.has(s.id)||e.pile.splice(Math.floor(ue(e)*(e.pile.length+1)),0,s.id)}function zo(e,t){return new Set(t?t.game.drawPile.map(a=>a.id):e.pile)}function Nn(e){if(!e.bosses[e.ante]){const a=new Set(Object.values(e.bosses)),s=Qn.filter(r=>r.minAnte<=e.ante),n=s.filter(r=>!a.has(r.id));e.bosses[e.ante]=e.ante%je===0?"grande":pe(e,n.length?n:s).id}const t=qn.filter(a=>!e.vouchers.includes(a.id));e.voucherOffer=t.length?pe(e,t).id:null}const Pe=(e,t)=>e.vouchers.includes(t),Be=(e,t)=>jn(t,e.levels[t]);function kt(e,t=e.blind){return t===2?de[e.bosses[e.ante]].name:Zo[t]}function Ct(e,t=e.blind){return t===2?de[e.bosses[e.ante]].name:No[t]}function Zn(e,t=e.blind){const a=t===2?de[e.bosses[e.ante]].target:_o[t];return Math.round(Go(e.ante)*a)}function Uo(e){return e.kind==="num"?e.value:e.kind==="wild"||e.kind==="wild4"?50:20}function Ho(e,t){const a=e.round;return a!=null&&a.boss?a.boss==="mancha"?t.color===a.debuffColor:a.boss==="mudo"?t.kind!=="num":!1:!1}function Fo(e){const t=e.blind===2?.08:0;return{call:Math.min(.97,.6+e.ante*.05),catch:Math.min(.9,.45+e.ante*.06),slip:Math.max(.12,js.base-js.step*(e.ante-1)-t)}}const js={base:.65,step:.06},_n=e=>Vo+(Pe(e,"folego")?1:0);function Gn(e){var s;const t=(s=e.round)!=null&&s.boss?de[e.round.boss]:null,a=e.comparsas.filter(n=>n.id==="bichoPapao").length;return[Pe(e,"maoLeve")?ft-1:ft,(t?t.rivalHand??ft:En[e.blind])+2*a]}function Vn(e){xt(e);const[t,a]=Gn(e);return e.pile.length>=t+a+2}function Ko(e){if(e.phase!=="select")return;const t=e.blind===2?e.bosses[e.ante]:null;e.round={target:Zn(e),score:0,roundsLeft:_n(e),roundsPlayed:0,inProgress:!1,boss:t,debuffColor:t==="mancha"?pe(e,ve):null},e.pile=In(e,e.deck.map(a=>a.id)),e.spent=[],e.phase="blind"}class Jo{constructor(t){b(this,"game");b(this,"mult",1);b(this,"bonusChips",0);b(this,"money",0);b(this,"broken",[]);b(this,"calledBonus",!1);b(this,"plays",0);b(this,"drawn",0);b(this,"actionKinds",new Set);this.s=t;const a=t.round,s=a.boss?de[a.boss]:null;xt(t);const n=new Map(t.deck.map(r=>[r.id,r]));this.game=new Kt([{name:"Você",bot:!1},{name:Ct(t),bot:!0}],{...s==null?void 0:s.rules,multiNumber:!0,sequences:!0,drawUntilPlayable:!1},Math.floor(ue(t)*2**31),{deck:t.pile.map(r=>n.get(r)),keepOrder:!0,under:t.spent.map(r=>n.get(r)),handSizes:Gn(t),first:0,noReshuffle:!0})}onEvent(t){var i;const a=[],s=(o,l,c,h)=>a.push({cardId:o,text:l,tone:c,chips:this.bonusChips,mult:this.mult,comparsa:h}),n=this.s,r=n.comparsas;switch(t.t){case"play":{if(t.p!==0)break;const o=t.card;if(this.plays++,o.kind!=="num"&&this.actionKinds.add(o.kind),Ho(n,o)){s(o.id,"Anulada","bad");break}const l=o.kind==="draw2"?"draw2":o.kind==="wild4"?"wild4":o.kind==="skip"?"skip":o.kind==="rev"?"rev":o.kind==="wild"?"wild":null;switch(l&&(this.mult+=Be(n,l),s(o.id,`+${Be(n,l)} multi`,"mult")),o.enh){case"brilho":this.bonusChips+=30,s(o.id,"+30 fichas","chips");break;case"holo":this.mult+=3,s(o.id,"+3 multi","mult");break;case"vidro":this.mult*=2,s(o.id,"×2 multi","xmult"),ue(n)<.25&&(this.broken.push(o.id),s(o.id,"Quebrou!","bad"));break;case"ouro":this.money+=3,s(o.id,"+$3","money");break;case"sorte":ue(n)<.25&&(this.mult+=5,s(o.id,"+5 multi","mult")),ue(n)<.1&&(this.money+=15,s(o.id,"+$15","money"));break}for(const c of r)c.id==="torcedor"&&o.color&&o.color===c.color?(this.mult+=3,s(o.id,"+3 multi","mult",c.uid)):c.id==="seteDeOuro"&&o.kind==="num"&&o.value===7?(this.mult+=7,s(o.id,"+7 multi","mult",c.uid)):c.id==="carrasco"&&(o.kind==="draw2"||o.kind==="wild4")&&(this.bonusChips+=15,s(o.id,"+15 fichas","chips",c.uid));break}case"multi":if(t.p===0){const o=t.kind==="seq"?"escadinha":"dobradinha",l=Be(n,o)*(t.cards.length-1);this.plays-=t.cards.length-1,this.mult+=l;const c=t.cards[t.cards.length-1].id;s(c,`${yt[o].name} +${l} multi`,"mult");for(const h of r)(h.id==="gemeos"&&t.kind==="mesmo"||h.id==="escadeiro"&&t.kind==="seq")&&(this.mult*=1.5,s(c,"×1,5 multi","xmult",h.uid))}break;case"call":if(t.p===0&&!this.calledBonus){this.calledBonus=!0,this.mult+=Be(n,"ultima"),s(null,`Última! +${Be(n,"ultima")} multi`,"mult");for(const o of r)o.id==="ultimoSuspiro"&&(this.mult*=2,s(null,"×2 multi","xmult",o.uid))}break;case"caught":t.by===0&&(this.mult+=Be(n,"pegada"),s(null,`Pegou no pulo! +${Be(n,"pegada")} multi`,"mult"));break;case"draw":if(t.p===0&&(this.drawn+=t.cards.length),t.p===0&&t.reason==="turn"&&((i=n.round)==null?void 0:i.boss)==="agiota"&&(this.money-=t.cards.length,s(null,`−$${t.cards.length}`,"bad")),t.p===1&&t.cards.length>=4)for(const o of r)o.id==="agiotaAmigo"&&(this.money+=2,s(null,"+$2","money",o.uid));break}return this.mult=Math.round(this.mult*100)/100,a}settle(){const t=this.game,a=t.winner===0;if(!a)return{won:a,steps:[],chips:0,mult:this.mult,total:0};let s=this.bonusChips;const n=[];for(const h of t.players[1].hand){const u=Uo(h);s+=u,n.push({cardId:h.id,text:`+${u}`,tone:"chips",chips:s,mult:this.mult}),h.enh==="bomba"&&(s+=60,n.push({cardId:h.id,text:"Bomba! +60",tone:"chips",chips:s,mult:this.mult}))}const r=Be(this.s,"batida");s+=r;let i=this.mult;n.push({cardId:null,text:`Batida +${r}`,tone:"chips",chips:s,mult:i});const o=t.players[1].hand,l=this.s.comparsas,c=(h,u,m)=>n.push({cardId:null,text:u,tone:m,chips:s,mult:i,comparsa:h.uid});for(const h of l)switch(h.id){case"contador":s+=6*o.length,c(h,`+${6*o.length} fichas`,"chips");break;case"batedor":{const u=o.filter(m=>m.kind==="wild"||m.kind==="wild4").length;u&&(s+=100*u,c(h,`+${100*u} fichas`,"chips"));break}case"fominha":this.drawn&&(i+=this.drawn,c(h,`+${this.drawn} multi`,"mult"));break;case"cabecaFria":this.drawn||(i+=8,c(h,"+8 multi","mult"));break;case"colecionador":this.actionKinds.size&&(i+=4*this.actionKinds.size,c(h,`+${4*this.actionKinds.size} multi`,"mult"));break;case"viraLata":h.counter&&(i+=h.counter,c(h,`+${h.counter} multi`,"mult"));break;case"apressado":this.plays<=4&&(i*=2,c(h,"×2 multi","xmult"));break;case"patrao":o.length>=7&&(i*=3,c(h,"×3 multi","xmult"));break;case"maestro":{const u=Math.round(Math.pow(1.25,l.length)*100)/100;i*=u,c(h,`×${String(u).replace(".",",")} multi`,"xmult");break}case"cofre":{const u=Math.floor(o.length/3);u&&(this.money+=u,c(h,`+$${u}`,"money"));break}}return i=Math.round(i*100)/100,{won:a,steps:n,chips:s,mult:i,total:Math.floor(s*i)}}}function Yo(e){const t=e.round;return t.roundsLeft--,t.inProgress=!0,new Jo(e)}function Xo(e){const t=e.round;return e.phase!=="blind"||!(t!=null&&t.inProgress)?!1:(t.inProgress=!1,t.roundsPlayed++,t.score<t.target&&(t.roundsLeft<=0||!Vn(e))&&(t.deckOut=t.roundsLeft>0,e.phase="lost"),!0)}function ei(e,t,a){const s=e.round;if(s.score+=a.total,s.inProgress=!1,s.roundsPlayed++,e.money=Math.max(0,e.money+t.money),e.stats.rounds++,a.won){e.stats.wins++;for(const r of e.comparsas)r.id==="viraLata"&&(r.counter=(r.counter??0)+2)}e.stats.bestRound=Math.max(e.stats.bestRound,a.total),t.broken.length&&(e.deck=e.deck.filter(r=>!t.broken.includes(r.id))),e.pile=t.game.drawPile.map(r=>r.id);const n=new Set(e.pile);e.spent=e.deck.filter(r=>!n.has(r.id)).map(r=>r.id),s.score>=s.target?ti(e):t.game.exhausted||s.roundsLeft>0&&!Vn(e)?(s.deckOut=!0,e.phase="lost"):s.roundsLeft<=0&&(e.phase="lost")}function ti(e){const t=e.round,a=Pe(e,"cofrinho")?10:5,s=[{label:kt(e),amount:Tn[e.blind]}];t.roundsLeft>0&&s.push({label:`Rodadas que sobraram (${t.roundsLeft})`,amount:t.roundsLeft});const n=Math.min(a,Math.floor(e.money/5));n>0&&s.push({label:`Juros ($1 a cada $5, até $${a})`,amount:n}),e.cash=s,e.phase="cashout"}function ai(e){if(e.phase!=="cashout"||!e.cash)return;e.money+=e.cash.reduce((s,n)=>s+n.amount,0),e.cash=null;const t=e.blind===2,a=t&&e.ante===je&&!e.endless;e.round=null,t?(e.ante++,e.blind=0,Nn(e)):e.blind=e.blind+1,e.phase=a?"won":"shop",a||(e.shop=Wn(e))}function si(e){e.phase==="won"&&(e.endless=!0,e.phase="shop",e.shop=Wn(e))}function At(e,t){return Pe(e,"liquidacao")?Math.max(1,Math.ceil(t*.75)):t}function ni(e){const t=pe(e,Ln).id,a=ue(e);let s="num",n=Math.floor(ue(e)*10);a>.88?(s=pe(e,["wild","wild4"]),n=-1):a>.6&&(s=pe(e,["skip","rev","draw2"]),n=-1);const r=s==="wild"||s==="wild4";return{id:e.nextId++,color:r?null:pe(e,ve),kind:s,value:n,enh:t}}function ri(e,t){let a=ue(e),s="raro";for(const o of["comum","incomum","raro"]){if(a<Cs[o]){s=o;break}a-=Cs[o]}const n=Dt.filter(o=>o.rarity===s&&!t.has(o.id)),r=pe(e,n.length?n:Dt.filter(o=>!t.has(o.id))),i={uid:e.nextUid++,id:r.id};return r.id==="torcedor"&&(i.color=pe(e,ve)),r.id==="viraLata"&&(i.counter=0),i}function Dn(e){const t=new Set(e.comparsas.filter(n=>n.id!=="torcedor").map(n=>n.id)),a=[];for(let n=0;n<2;n++){const r=ri(e,t);t.add(r.id),a.push({kind:"comparsa",comparsa:r,price:At(e,me[r.id].price)})}a.push({kind:"train",train:pe(e,aa).id,price:At(e,3)});const s=ni(e);return a.push({kind:"card",card:s,price:At(e,vt[s.enh].price)}),a}function Wa(e){return Do+(Pe(e,"bando")?1:0)}function oi(e,t){const a=e.comparsas.find(n=>n.uid===t);if(!a)return 0;e.comparsas=e.comparsas.filter(n=>n!==a);const s=On(a);return e.money+=s,s}function ii(e,t,a){const s=e.comparsas.find(r=>r.uid===t);if(!s)return;const n=e.comparsas.filter(r=>r!==s);n.splice(Math.max(0,Math.min(n.length,a)),0,s),e.comparsas=n}function Ls(e,t,a){const s=e.comparsas.findIndex(r=>r.uid===t),n=s+a;s<0||n<0||n>=e.comparsas.length||([e.comparsas[s],e.comparsas[n]]=[e.comparsas[n],e.comparsas[s]])}function Wn(e){return{items:Dn(e),voucher:e.voucherOffer?{kind:"voucher",voucher:e.voucherOffer,price:At(e,Pn[e.voucherOffer].price)}:null,rerollCost:Pe(e,"roleta")?3:5}}function qs(e,t){const a=e.shop;if(e.phase!=="shop"||!a)return!1;const s=t==="voucher"?a.voucher:a.items[t];return!s||s.sold||e.money<s.price||s.kind==="comparsa"&&e.comparsas.length>=Wa(e)?!1:(e.money-=s.price,s.sold=!0,s.kind==="train"?e.levels[s.train]++:s.kind==="comparsa"?e.comparsas.push(s.comparsa):s.kind==="card"?(e.deck.push(s.card),xt(e)):(e.vouchers.push(s.voucher),e.voucherOffer=null,s.voucher==="roleta"&&(a.rerollCost=Math.max(1,a.rerollCost-2))),!0)}function li(e){const t=e.shop;return e.phase!=="shop"||!t||e.money<t.rerollCost?!1:(e.money-=t.rerollCost,t.rerollCost++,t.items=Dn(e),!0)}function ci(e,t){return e.phase!=="shop"||e.money<e.removeCost||e.deck.length<=qa||!e.deck.some(a=>a.id===t)?!1:(e.money-=e.removeCost,e.removeCost++,e.deck=e.deck.filter(a=>a.id!==t),xt(e),!0)}function hi(e){e.phase==="shop"&&(e.shop=null,e.phase="select")}const zn=(e,t)=>yt[e].desc.replace("{n}",String(jn(e,t))),Pa="pilantro.run";function za(e){try{!e||e.phase==="lost"?localStorage.removeItem(Pa):localStorage.setItem(Pa,JSON.stringify(e))}catch{}}function Ua(){try{const e=localStorage.getItem(Pa),t=e?JSON.parse(e):null;return(t==null?void 0:t.version)!==2?null:(t.comparsas??(t.comparsas=[]),t.nextUid??(t.nextUid=1),xt(t),t)}catch{return null}}const Ps=new Us;let Qs=null;const Wt={chips:"#3d8ff0",mult:"#f0524f",xmult:"#f0524f",money:"#f5b52e",bad:"#9aa3a8",info:"#f3ead7"};let M=null,H=null,na=!1,st=!1,wt=()=>{},Un=()=>{};const qe=e=>Math.floor(e).toLocaleString("pt-BR");function di(e,t){wt=t,na=!0,M=e,f("runHud").hidden=!1,f("crewBar").hidden=!1,Ha(),Xo(M)&&O("A rodada interrompida contou como perdida","#a8302f"),ke()}function Hn(){na=!1,M=null,H=null,Yt(),f("runHud").hidden=!0,f("crewBar").hidden=!0,De()}function fi(e){Un=e}function Ha(){if(!na)return;const e=f("side").getBoundingClientRect(),t=e.height>e.width,a=f("crewBar");a.style.left=`${t?e.right+12:8}px`,a.style.top=`${t?12:e.bottom+6}px`;const s=a.getBoundingClientRect();document.documentElement.style.setProperty("--crew-bottom",`${Math.round(s.bottom)}px`),v.inset=t?{left:e.right+6,top:s.bottom+2}:{left:0,top:s.bottom+2},v.resize()}function ye(){M&&za(M)}function ke(){if(M)switch(ye(),rt(),M.phase){case"select":return Qa();case"blind":return De(),pi();case"cashout":return yi();case"shop":return ut();case"lost":return vi();case"won":return ki()}}function rt(){if(!M)return;zt();const e=M.round,t=e!=null&&e.boss?de[e.boss]:null;f("sBlindName").textContent=e?`${kt(M)}`:M.phase==="shop"?"Loja":`Ante ${M.ante}`,f("sBlindDesc").textContent=t?Fn():e?`Rival: ${Ct(M)}`:"",f("sBlind").style.setProperty("--bc",t?t.color:"#3d6b7a"),f("sTarget").textContent=e?qe(e.target):"—",f("sScore").textContent=e?qe(e.score):"0",f("sRounds").textContent=e?String(e.roundsLeft+(e.inProgress?1:0)):"—",f("sMoney").textContent=`$${M.money}`,f("sAnte").textContent=M.endless?`${M.ante}`:`${Math.min(M.ante,je)}/${je}`;const a=H==null?void 0:H.game;f("sRival").textContent=a?String(a.players[1].hand.length):"—",Fa(H?"?":"0",H?H.mult:0)}function Fn(){const e=M.round,t=de[e.boss].desc;return e.debuffColor?t.replace("{cor}",An[e.debuffColor]):t}function Fa(e,t,a){const s=f("sChips"),n=f("sMult");s.textContent=typeof e=="number"?qe(e):e,n.textContent=Number.isInteger(t)?String(t):t.toFixed(1).replace(".",",");const r=a==="chips"?s:a==="mult"?n:null;r&&(r.classList.remove("bump"),r.offsetWidth,r.classList.add("bump"))}function ui(e,t,a=600){return new Promise(s=>{const n=f("sScore"),r=performance.now(),i=()=>{const o=Math.min(1,(performance.now()-r)/a);n.textContent=qe(e+(t-e)*(1-Math.pow(1-o,3))),o<1?setTimeout(i,16):s()};i()})}function pi(){if(!M||M.phase!=="blind")return;const e=M.round;H=Yo(M);const t=H;ye();const a=Fo(M);Jt(t.game,{speed:.8,botCallChance:a.call,botCatchChance:a.catch,botSlip:a.slip,autoCatch:Pe(M,"radar"),onEvent:(n,r)=>{const i=t.onEvent(n);i.length&&setTimeout(()=>mi(i),r+260),setTimeout(rt,r+260)},onOver:()=>void gi(t)});const s=e.roundsPlayed+1;O(`Rodada ${s} — ${Ct(M)}`,e.boss?de[e.boss].color:"#3d6b7a"),rt()}function mi(e){for(const t of e){t.comparsa!==void 0&&Yn(t.comparsa,t.text,Wt[t.tone]);const a=t.cardId!==null&&v.cardPoint(t.cardId)||v.discardPos;v.float(t.text,a,Wt[t.tone],t.tone==="xmult"||t.tone==="money"),(t.tone==="mult"||t.tone==="xmult")&&(Fa("?",t.mult,"mult"),V.tick(Math.round(t.mult))),t.tone==="xmult"&&v.shake(200,3)}}async function gi(e){if(!M||e!==H)return;const t=e.settle(),a=e.game;if(a.exhausted&&(O("O monte acabou! Ganha quem tem menos cartas","#a8302f"),await ze(1100)),t.won){const s=a.players[1].hand,n=v.seat(1);v.extraHidden=new Set(s.map(o=>o.id)),v.reveal=s,s.forEach((o,l)=>v.fly(o,n,v.revealPos(l,s.length),o.id,{delay:l*60,dur:300})),O(a.exhausted?"Rodada sua: você tem menos cartas!":"Você bateu!","#b97c12"),await ze(300+s.length*60+200);const r=t.steps.length>12?140:220;st=!0;for(let o=0;o<t.steps.length;o++){const l=t.steps[o];l.comparsa!==void 0&&Yn(l.comparsa,l.text,Wt[l.tone]);const c=l.cardId!==null&&v.cardPoint(l.cardId)||v.center;l.cardId!==null&&v.pop(l.cardId),v.float(l.text,c,Wt[l.tone],l.cardId===null),Fa(l.chips,l.mult,l.tone==="mult"||l.tone==="xmult"?"mult":"chips"),V.tick(o),await ze(r)}st=!1,V.special();const i=M.round.score;f("sCombo").textContent=`= ${qe(t.total)}`,f("sCombo").classList.add("total"),t.total>=M.round.target*.5&&v.shake(350,4),await ui(i,i+t.total),await ze(500),f("sCombo").classList.remove("total"),f("sCombo").textContent="Rodada"}else O(a.exhausted?"Rodada perdida no monte trancado":`${Ct(M)} bateu! Rodada perdida`,"#a8302f"),V.bad(),v.shake(300,3),await ze(1200);ei(M,e,t),H=null,Ra(),e.broken.length&&O(`${e.broken.length} carta(s) de vidro quebraram`,"#9aa3a8"),ye(),rt(),M.phase==="blind"&&await ze(300),ke()}function we(...e){var a;const t=f("runPanel");t.replaceChildren(...e.filter(s=>!!s)),f("runModal").hidden=!1,(a=t.querySelector("button.primary"))==null||a.focus({preventScroll:!0}),t.scrollTop=0}function De(){f("runModal").hidden=!0}function A(e,t,a="",s=!1){return d("button",{class:a,onclick:t,disabled:s,type:"button"},e)}function Kn(e,t=2){Qs!==P.hd&&(Qs=P.hd,Ps.reset(P.hd,4));const a=Ps.face(e,40,56),s=d("canvas",{class:"pcard",width:a.width,height:a.height});return s.getContext("2d").drawImage(a,0,0),s.style.width=`${40*t}px`,s.style.height=`${56*t}px`,s}function Qa(){const e=M,t=[0,1,2].map(s=>{const n=s===2?de[e.bosses[e.ante]]:null,r=s===e.blind,i=n?n.desc.replace("{cor}","de uma cor"):`${Ct(e,s)} começa com ${En[s]} cartas`,o=d("div",{class:`blind ${r?"cur":s<e.blind?"done":""} ${n?"boss":""}`},d("div",{class:"bname"},kt(e,s)),d("div",{class:"bdesc"},i),d("div",{class:"btarget"},"Meta ",d("b",{},qe(Zn(e,s)))),d("div",{class:"breward"},`Recompensa $${Tn[s]}`),s<e.blind?d("div",{class:"bstate"},"Vencido"):r?A("Jogar",bi,"primary"):d("div",{class:"bstate"},"Depois"));return n&&o.style.setProperty("--bc",n.color),o}),a=_n(e);we(d("h2",{},e.endless?`Ante ${e.ante} (infinito)`:`Ante ${e.ante} de ${je}`),d("p",{class:"sub"},`Cada blind é um duelo de UNO em até ${a} rodadas. Quando você bate, as cartas que sobraram na mão do rival viram fichas. Se o monte acabar no meio da rodada, ganha quem tiver menos cartas; sem cartas para outra rodada, o blind termina com os pontos que você tiver.`),d("div",{class:"blinds"},...t),d("div",{class:"buttons"},A("Treinos",()=>Ka(Qa),"ghost"),A("Baralho",()=>Mt("view",Qa),"ghost")))}function bi(){if(!M)return;Ko(M),De();const e=M.round;e.boss&&O(`${de[e.boss].name}: ${Fn()}`,de[e.boss].color),ye(),ke()}function yi(){const e=M,t=e.cash??[],a=t.reduce((s,n)=>s+n.amount,0);V.cash(),we(d("h2",{},"Blind vencido!"),d("div",{class:"cash"},...t.map((s,n)=>{const r=d("div",{class:"cline"},d("span",{},s.label),d("b",{},`$${s.amount}`));return r.style.animationDelay=`${n*120}ms`,r})),d("div",{class:"buttons center"},A(`Receber $${a}`,()=>{ai(e),ke()},"primary gold-btn")))}function Es(e,t){const a=M,s=e.sold||a.money<e.price;let n;if(e.kind==="train"){const r=a.levels[e.train];n=d("div",{class:"tbody"},d("div",{class:"ticon lvl"},`Nv ${r}→${r+1}`),d("div",{class:"tname"},`Treino: ${yt[e.train].name}`),d("div",{class:"tdesc"},zn(e.train,r+1)))}else if(e.kind==="comparsa"){const r=me[e.comparsa.id];n=d("div",{class:"tbody"},Ja(e.comparsa,"big"),d("div",{class:"tname"},r.name),Jn(r.rarity),d("div",{class:"tdesc"},sa(e.comparsa)));const i=!e.sold&&a.comparsas.length>=Wa(a);return d("div",{class:`tile ${e.sold?"sold":""}`},n,A(e.sold?"Vendido":i?"Vagas cheias":`$${e.price}`,t,"buy",s||i))}else if(e.kind==="card")n=d("div",{class:"tbody"},Kn(e.card,1.5),d("div",{class:"tname"},vt[e.card.enh].name),d("div",{class:"tdesc"},vt[e.card.enh].desc));else{const r=Pn[e.voucher];n=d("div",{class:"tbody"},d("div",{class:"ticon vale"},"VALE"),d("div",{class:"tname"},r.name),d("div",{class:"tdesc"},r.desc))}return d("div",{class:`tile ${e.sold?"sold":""}`},n,A(e.sold?"Vendido":`$${e.price}`,t,"buy",s))}function Rt(e,t){e?(V.cash(),O(t,"#b97c12")):V.bad(),ye(),rt(),ut()}function ut(){const e=M,t=e.shop,a=t.items.map((r,i)=>Es(r,()=>Rt(qs(e,i),r.kind==="comparsa"?`${me[r.comparsa.id].name} entrou no bando!`:"Comprado!"))),s=t.voucher?Es(t.voucher,()=>Rt(qs(e,"voucher"),"Vale ativado!")):d("div",{class:"tile sold"},d("div",{class:"tbody"},d("div",{class:"tdesc"},"Vale do ante já comprado"))),n=e.money>=e.removeCost&&e.deck.length>qa;we(d("div",{class:"shophead"},d("h2",{},"Loja"),d("div",{class:"money"},`$${e.money}`)),d("div",{class:"tiles"},...a),d("div",{class:"tiles two"},s,d("div",{class:"tile"},d("div",{class:"tbody"},d("div",{class:"ticon svc"},"TESOURA"),d("div",{class:"tname"},"Limpar baralho"),d("div",{class:"tdesc"},`Remove 1 carta para sempre (mínimo ${qa})`)),A(`$${e.removeCost}`,()=>Mt("remove",ut),"buy",!n))),d("div",{class:"buttons"},A(`Trocar itens $${t.rerollCost}`,()=>Rt(li(e),"Itens novos"),"ghost",e.money<t.rerollCost),A("Treinos",()=>Ka(ut),"ghost"),A("Baralho",()=>Mt("view",ut),"ghost"),A("Próximo blind",()=>{hi(e),ke()},"primary")))}function Mt(e,t){const a=M,s=zo(a,H),n=[...ve.map(l=>a.deck.filter(c=>c.color===l)),a.deck.filter(l=>!l.color)],r=l=>l.kind==="num"?l.value:l.kind==="wild"||l.kind==="wild4"?20:12,i=n.map(l=>d("div",{class:"deckrow"},...l.sort((c,h)=>r(c)-r(h)).map(c=>{const h=Kn(c,1),u=!s.has(c.id);return u&&h.classList.add("spent"),h.title=[u?"Gasta (volta no próximo blind)":"No monte",c.enh?`${vt[c.enh].name}: ${vt[c.enh].desc}`:""].filter(Boolean).join(" · "),e==="remove"&&(h.classList.add("pick"),h.onclick=()=>{const m=ci(a,c.id);Rt(m,m?"Carta removida":"Não deu")}),h}))),o=a.deck.length-s.size;we(d("h2",{},e==="remove"?`Escolha a carta para remover ($${a.removeCost})`:`Seu baralho (${a.deck.length})`),d("p",{class:"sub"},`No monte: ${s.size} · Gastas: ${o}. Cartas jogadas (e as que ficaram nas mãos) só voltam no próximo blind: se o monte acabar, o blind termina. Você e o rival compram do mesmo monte.`),d("div",{class:"deck"},...i),d("div",{class:"buttons"},A("Voltar",t,"primary")))}function Ka(e){const t=M;we(d("h2",{},"Treinos"),d("table",{class:"combos"},d("tr",{},d("th",{},"Treino"),d("th",{},"Nv"),d("th",{},"Rende")),...aa.map(a=>d("tr",{},d("td",{},d("b",{},a.name)),d("td",{},String(t.levels[a.id])),d("td",{},d("span",{class:a.kind==="mult"?"mult":"chips"},zn(a.id,t.levels[a.id])))))),d("p",{class:"sub"},`Pontos da rodada = fichas × multi. Fichas: as cartas que sobraram na mão do rival quando você bate (número = o número, ação = 20, curinga = 50) + Batida. O multi começa em 1 e cresce com o que você faz na rodada. Você começa com ${Pe(t,"maoLeve")?ft-1:ft} cartas; números iguais podem ser jogados juntos (dobradinha).`),d("div",{class:"buttons"},A("Voltar",e,"primary")))}function vi(){var t;const e=M;V.bad(),we(d("h2",{},"Fim da corrida"),d("p",{class:"sub"},(t=e.round)!=null&&t.deckOut?`O monte acabou antes da meta de ${kt(e)} (ante ${e.ante}).`:`${kt(e)} venceu você no ante ${e.ante}.`),d("div",{class:"cash"},d("div",{class:"cline"},d("span",{},"Melhor rodada"),d("b",{},qe(e.stats.bestRound))),d("div",{class:"cline"},d("span",{},"Rodadas vencidas"),d("b",{},`${e.stats.wins} de ${e.stats.rounds}`))),d("div",{class:"buttons"},A("Menu inicial",()=>wt(),"ghost"),A("Nova corrida",()=>Un(),"primary")))}function ki(){const e=M;V.win(),we(d("h2",{},"Você derrotou o Grande Pilantra!"),d("p",{class:"sub"},`Rodadas vencidas: ${e.stats.wins} de ${e.stats.rounds}. Melhor rodada: ${qe(e.stats.bestRound)}.`),d("div",{class:"buttons"},A("Menu inicial",()=>wt(),"ghost"),A("Modo infinito",()=>{si(e),ke()},"primary")))}function Jn(e,t=!1){const a=d("div",{class:`rarity${t?" center":""}`},Rn[e]);return a.style.color=Ze[e],a}function Ja(e,t="small"){const a=me[e.id],s=Ys(e.id,e.color,t,a.name,P.hd);return s.style.setProperty("--rc",Ze[a.rarity]),s}function zt(){const e=M;if(!e)return;const t=Wa(e);f("sCrewCount").textContent=`${e.comparsas.length}/${t}`;const a=e.comparsas.map(s=>{const n=d("button",{class:"ctile",type:"button",title:`${me[s.id].name}: ${sa(s)}`},Ja(s),d("span",{class:"cname2"},me[s.id].name));return n.style.setProperty("--rc",Ze[me[s.id].rarity]),n.dataset.uid=String(s.uid),n.onclick=()=>{Ea||Ta(s)},n.addEventListener("pointerdown",r=>wi(r,n,s.uid)),n});for(let s=e.comparsas.length;s<t;s++)a.push(d("div",{class:"ctile empty"},d("span",{class:"cname2"},"vaga")));f("sCrew").replaceChildren(...a)}let Ea=!1;function wi(e,t,a){if(st||e.button!==0)return;const s=[...document.querySelectorAll("#sCrew .ctile:not(.empty)")],n=s.indexOf(t),r=s.map(w=>{const y=w.getBoundingClientRect();return y.left+y.width/2}),i=s.length>1?r[1]-r[0]:t.getBoundingClientRect().width+8,o=e.clientX,l=e.clientY;let c=!1,h=n;try{t.setPointerCapture(e.pointerId)}catch{}const u=w=>{const y=w.clientX-o,C=w.clientY-l;if(!c&&Math.hypot(y,C)<6)return;c=!0,t.classList.add("dragging"),t.style.transform=`translate(${y}px, ${C}px) rotate(4deg)`;const Q=r[n]+y;h=r.filter((E,N)=>N!==n&&E<Q).length,s.forEach((E,N)=>{if(E===t)return;let F=0;n<h&&N>n&&N<=h&&(F=-i),n>h&&N>=h&&N<n&&(F=i),E.style.transform=F?`translateX(${F}px)`:""})},m=()=>{t.removeEventListener("pointermove",u),t.removeEventListener("pointerup",m),t.removeEventListener("pointercancel",m),s.forEach(w=>w.style.transform=""),t.classList.remove("dragging"),!(!c||!M)&&(Ea=!0,setTimeout(()=>Ea=!1,0),h!==n&&(ii(M,a,h),ye(),V.draw()),zt())};t.addEventListener("pointermove",u),t.addEventListener("pointerup",m),t.addEventListener("pointercancel",m)}function Yn(e,t,a){const s=document.querySelector(`#sCrew [data-uid="${e}"]`);if(!s)return;s.classList.remove("bump"),s.offsetWidth,s.classList.add("bump");const n=d("span",{class:"cfloat"},t);n.style.color=a,s.append(n),n.addEventListener("animationend",()=>n.remove())}function Ta(e){const t=M,a=t.phase==="blind"&&!!H;a&&_e(!0);const s=()=>{a?(De(),_e(!1)):ke()},n=me[e.id],r=t.comparsas.indexOf(e);we(d("div",{class:"cdetail"},Ja(e,"big"),d("h2",{},n.name)),Jn(n.rarity,!0),d("p",{class:"quote"},`“${n.quote}”`),d("p",{class:"sub"},sa(e)),d("p",{class:"sub"},"Os comparsas agem da esquerda para a direita: some multi antes de multiplicar. Arraste na fileira para mudar a ordem."),d("div",{class:"buttons center"},A("◀ Mover",()=>{Ls(t,e.uid,-1),ye(),zt(),Ta(e)},"ghost",st||r<=0),A("Mover ▶",()=>{Ls(t,e.uid,1),ye(),zt(),Ta(e)},"ghost",st||r>=t.comparsas.length-1),A(`Vender $${On(e)}`,()=>{const i=oi(t,e.uid);O(`${n.name} saiu do bando: +$${i}`,"#b97c12"),V.cash(),ye(),rt(),s()},"warn-static",st),A("Fechar",s,"primary")))}function $t(){if(!M)return;_e(!0);const e=()=>{(M==null?void 0:M.phase)==="blind"&&H?(De(),_e(!1)):ke()};we(d("h2",{},"Pausa"),d("div",{class:"stack"},A("Continuar",e,"primary"),Aa(),A("Treinos",()=>Ka($t),"ghost"),A("Baralho",()=>Mt("view",$t),"ghost"),A("Menu inicial (a corrida fica salva)",()=>wt(),"ghost"),(()=>{const t=A("Abandonar corrida",()=>an(t,"Não dá para desfazer. Toque de novo",()=>{za(null),wt()}),"warn-static");return t})()))}f("btnTrains").onclick=()=>$t();f("btnDeck").onclick=()=>{_e(!0),Mt("view",()=>(M==null?void 0:M.phase)==="blind"&&H?(De(),_e(!1)):ke())};function Mi(e){return na?e==="escape"?(f("runModal").hidden?$t():(M==null?void 0:M.phase)==="blind"&&H&&(De(),_e(!1)),!0):f("runModal").hidden?Sa(e):!1:!1}const $i=["comum","incomum","raro"],Si={comum:"Comuns",incomum:"Incomuns",raro:"Raros"};function Bi(e){const t=Ys(e.id,void 0,"big",e.name,P.hd);t.style.setProperty("--rc",Ze[e.rarity]);const a=d("button",{class:"gcard",type:"button",title:e.quote},t,d("div",{class:"gbody"},d("div",{class:"gname"},e.name),d("div",{class:"gmeta"},d("span",{class:"rarity"},Rn[e.rarity]),d("span",{class:"gold"},`$${e.price}`)),d("div",{class:"gdesc"},sa({id:e.id})),d("div",{class:"quote"},`“${e.quote}”`)));return a.querySelector(".rarity").style.color=Ze[e.rarity],a.style.setProperty("--rc",Ze[e.rarity]),a.onclick=()=>{a.classList.remove("bump"),a.offsetWidth,a.classList.add("bump"),V.draw()},a}let Ts=!1;function xi(e){Ts||(Ts=!0,f("galleryList").replaceChildren(...$i.map(a=>{const s=d("h2",{class:"ghead"},Si[a]);return s.style.color=Ze[a],d("section",{},s,d("div",{class:"ggrid"},...Dt.filter(n=>n.rarity===a).map(Bi)))})));const t=()=>{f("gallery").hidden=!0,e()};f("galleryClose").onclick=t,f("gallery").onclick=a=>{a.target===f("gallery")&&t()},f("gallery").hidden=!1,f("gallery").querySelector(".panel").scrollTop=0,f("galleryClose").focus({preventScroll:!0})}const Ci=()=>!f("gallery").hidden,ji=()=>f("galleryClose").click(),Xn=new FontFace("Pilantro Digits",`url(${sr})`,{unicodeRange:"U+0030-0039",weight:"100 900"});document.fonts.add(Xn);Xn.load();let oe="title";try{Os(localStorage.getItem("pilantro.muted")==="1")}catch{}tn();function ra(){oe==="run"&&Hn(),oe==="classic"&&xn(),oe="title",mt.setTheme("r"),f("titleOpts").replaceChildren(Aa()),f("tContinue").hidden=!Ua(),f("title").hidden=!1,(f("tContinue").hidden?f("tNew"):f("tContinue")).focus()}function Ut(e){const t=e?null:Ua();e&&za(null),f("title").hidden=!0,oe==="classic"&&xn(),oe="run",di(t??Wo(),ra)}fi(()=>{Hn(),Ut(!0)});f("tNew").onclick=()=>{if(!Ua())return Ut(!0);an(f("tNew"),"Apagar a corrida salva? Toque de novo",()=>Ut(!0))};f("tContinue").onclick=()=>Ut(!1);f("tClassic").onclick=()=>{f("title").hidden=!0,oe="classic",Ro()};f("menuBack").onclick=ra;f("tCrew").onclick=()=>{f("title").hidden=!0,xi(()=>{f("title").hidden=!1,f("tCrew").focus()})};function er(){f("btnSound").textContent=nt?"🔇":"🔊"}f("btnSound").onclick=()=>{Os(!nt);try{localStorage.setItem("pilantro.muted",nt?"1":"0")}catch{}er()};er();f("btnMenu").onclick=()=>{oe==="run"?$t():oe==="classic"?Bt():ra()};window.addEventListener("keydown",e=>{if(e.target instanceof HTMLSelectElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLButtonElement&&e.key==="Enter")return;const t=e.key.toLowerCase();if(t==="m")return f("btnSound").click();if(Ci()){t==="escape"&&ji();return}(oe==="run"?Mi(t):oe==="classic"?Oo(t):!1)&&e.preventDefault()});let va=!1;window.addEventListener("resize",()=>{va||(va=!0,requestAnimationFrame(()=>{va=!1,oe==="run"?Ha():v.resize(),mt.resize()}))});var As;(As=document.fonts)==null||As.ready.then(()=>{oe==="run"?Ha():v.resize()});ra();
