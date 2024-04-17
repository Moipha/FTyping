import{s as W,n as M,o as Q,R as U,S as Z,d as x,r as z,a as I,w as ee,b as C,c as T,e as s,F,f as V,g as G,v as J,u as p,h as P,i as j,j as L,k as O,l as N,m as H,T as te,p as A,q as se,t as q,x as oe,y as le}from"./index-ksUF1uSU.js";import{u as R}from"./useTypingStore-CezI6xvN.js";import{_ as ne}from"./_plugin-vue_export-helper-DlAUqK2U.js";function ae(e){const{blockRefs:m,caret:u,blocksContainer:y}=W(R()),k=()=>{const o=m.value[e.value[0]];if(!o){console.error("Block元素未定义");return}l(e.value[1],o)},l=(o,f)=>{if(!f){console.error("Block元素不存在");return}const a=f.children[1].children;if(a.length<o){console.error(`Block中不足${o}个code`);return}const n=a[o]||a[o-1];o!=a.length,w(n,o!=a.length)};function w(o,f){const d=u.value;if(!d){console.error("CaretElement元素不存在");return}const a=o.offsetTop+o.offsetHeight/2-d.offsetHeight/2,n=o.offsetLeft+(f?0:o.offsetWidth);d.style.top=`${a}px`,d.style.left=`${n}px`}return{handleTyping:k}}function ie(e,m){const{words:u,blockRefs:y,caret:k,enWords:l,startTime:w}=W(R());function o(){var n,i;(n=k.value)==null||n.classList.remove("hide"),(i=k.value)==null||i.classList.add("waiting")}function f(){var n;(n=k.value)==null||n.classList.add("hide")}function d(n){const{codeElements:i,cn:v}=a(e.value[0]);if(k.value&&k.value.classList.remove("waiting"),n.code.startsWith("Key")){if(w.value||(w.value=Date.now()),l.value[e.value[0]].typing?l.value[e.value[0]].typing+=n.key:l.value[e.value[0]].typing=n.key,e.value[1]!=i.length){const r=i[e.value[1]];r.classList.add(n.key==l.value[e.value[0]].en[e.value[1]]?"correct":"wrong"),r.classList.remove("skip")}u.value.length<=e.value[0]&&console.error("block索引越界"),e.value[1]<u.value[e.value[0]].en.length?e.value[0]==u.value.length-1&&e.value[1]==l.value[e.value[0]].en.length-1?m(l.value):e.value[1]++:u.value.length>e.value[0]+1?(u.value[e.value[0]].en+=n.key,M(()=>{i[e.value[1]].classList.add("wrong"),e.value[1]++})):m(l.value)}else if(n.code==="Space")e.value[1]!=0&&(e.value[0]<u.value.length-1?([...i].slice(e.value[1],i.length).forEach(g=>g.classList.add("skip")),l.value[e.value[0]].isCorrect=l.value[e.value[0]].typing==l.value[e.value[0]].en,v.classList.toggle("wrong",!l.value[e.value[0]].isCorrect),v.classList.toggle("correct",l.value[e.value[0]].isCorrect),e.value=[e.value[0]+1,0]):m(l.value));else if(n.code==="Backspace"){if(e.value[0]==0&&e.value[1]==0)return;if(e.value[1]<=0){const{codeElements:r,cn:g}=a(e.value[0]-1),h=[...r];if(g.classList.remove("wrong","correct"),l.value[e.value[0]-1].isCorrect=void 0,h.filter(_=>_.classList.contains("skip")).length>0){let _;for(let t=0;t<h.length;t++)if(h[t].classList.contains("skip")){_=t;break}h.slice(_,h.length).forEach(t=>t.classList.remove("skip")),_?e.value=[e.value[0]-1,_]:console.error("索引元素不存在")}else e.value=[e.value[0]-1,u.value[e.value[0]-1].en.length]}else{const r=l.value[e.value[0]].typing;r&&(l.value[e.value[0]].typing=r.slice(0,-1)),e.value[1]>l.value[e.value[0]].en.length?(u.value[e.value[0]].en=u.value[e.value[0]].en.slice(0,-1),M(()=>e.value[1]--)):(e.value[1]--,i[e.value[1]].classList.remove("correct","wrong"))}}}function a(n){const i=y.value[n];if(!i){console.error("Block元素不存在");return}const v=i.children[0],g=i.children[1].children;return{cn:v,codeElements:g}}return{startTyping:o,endTyping:f,typing:d,startTime:w}}function re(e,m,u){const{generateWords:y,updateRefs:k,settings:l}=R(),{words:w,startTime:o,blocksContainer:f,blockRefs:d}=W(R());function a(v){v[m.value[0]].isCorrect=v[m.value[0]].typing==v[m.value[0]].en;const r=Date.now();if(!o.value){console.error("计时未开始");return}const g=(r-o.value)/1e3,h=Math.round(g)+"s",E=v.filter(D=>D.isCorrect).length;let _=E/g*60;_=Math.round(_*100)/100;const S=_.toFixed(2);let t=E/w.value.length;t=Math.round(t*100);const B=t+"%";e.value.wpm=S,e.value.correctness=B,e.value.during=h,u.value=!0}function n(v){d.value.forEach(r=>{r.children[0].classList.remove("wrong","correct","skip"),[...r.children[1].children].forEach(h=>{h.classList.remove("wrong","correct","skip")})}),o.value=null,i(v),u.value=!1,M(()=>{f.value&&f.value.focus(),m.value=[0,0]})}function i(v){k(),y(v)}return y(l.generateWordsNum),Q(()=>{o.value=null}),{handleEnd:a,restart:n}}function ce(){return console.log(U("active")),Z("text","green"),console.log(U("active")),{}}const b=e=>(oe("data-v-f0658214"),e=e(),le(),e),ue={class:"items-center column"},ve={class:"q-ma-lg num-chooser"},pe={key:0,class:"num-chooser-split"},fe=["onClick"],de={class:"items-center column"},ge={class:"cn-word"},me={class:"en-word"},he=b(()=>s("span",null,"点击任意词块开始输入",-1)),_e=b(()=>s("span",null,"从右上角进入设置 可以对样式和功能进行定制",-1)),ke=b(()=>s("span",null,"我们将于该提示隐藏时开始计时",-1)),ye=b(()=>s("span",null,"祝玩得开心 : )",-1)),we={class:"result items-center column"},be={class:"row justify-around result-item-container"},Ce={class:"result-item"},Te={class:"result-key row items-center"},Le=b(()=>s("b",null,[s("em",{style:{"text-decoration":"underline","font-size":"14px"}},"Words Per Minute")],-1)),Be=b(()=>s("br",null,null,-1)),Ee=b(()=>s("span",{style:{"font-size":"13px"}},"每分钟键入的单词数",-1)),Se={class:"result-value correct"},Ne={class:"result-item"},qe=b(()=>s("div",{class:"result-key"},"正确率",-1)),Re={class:"result-value correct"},$e={class:"result-item"},ze=b(()=>s("div",{class:"result-key"},"用时",-1)),Ke={class:"result-value correct"},Me=x({__name:"TimeKeep",setup(e){ce();const{words:m,caret:u,blocksContainer:y,startTime:k}=W(R()),{setBlockRef:l,settings:w}=R(),o=z(!1),f=z({wpm:"",correctness:"",during:""}),d=z([0,0]),a=z(w.generateWordsNum),n=z([20,30,40,50]),{handleTyping:i}=ae(d),{handleEnd:v,restart:r}=re(f,d,o),{startTyping:g,endTyping:h,typing:E}=ie(d,v);function _(S){a.value!=S&&(a.value=S,r(a.value))}return M(()=>{y.value&&y.value.focus()}),I(()=>{window.addEventListener("resize",i),ee(d,()=>{i()},{deep:!0,immediate:!0})}),Q(()=>{window.removeEventListener("resize",i)}),(S,t)=>{const B=A("q-btn"),D=A("q-tooltip"),X=A("q-icon");return C(),T("div",ue,[s("div",ve,[(C(!0),T(F,null,V(n.value,(c,$)=>(C(),T("span",{key:$},[$!=0?(C(),T("span",pe,"/")):se("",!0),s("span",{onClick:K=>_(c),class:O([a.value==c?"correct":"","num-chooser-num"])},q(c),11,fe)]))),128))]),G(s("div",de,[s("div",{ref_key:"blocksContainer",ref:y,onFocus:t[0]||(t[0]=(...c)=>p(g)&&p(g)(...c)),onBlur:t[1]||(t[1]=(...c)=>p(h)&&p(h)(...c)),onKeydown:[t[2]||(t[2]=(...c)=>p(E)&&p(E)(...c)),t[3]||(t[3]=P(j(()=>{},["prevent"]),["space"]))],onClick:t[4]||(t[4]=(...c)=>p(i)&&p(i)(...c)),tabindex:"0",class:"row words-container"},[s("div",{ref_key:"caret",ref:u,class:"caret"},null,512),(C(!0),T(F,null,V(p(m),(c,$)=>(C(),T("div",{ref_for:!0,ref:K=>p(l)(K,$),key:$,class:"column items-center word-block"},[s("div",ge,q(c.cn),1),s("div",me,[(C(!0),T(F,null,V(c.en,(K,Y)=>(C(),T("code",{key:Y},q(K),1))),128))])]))),128))],544),L(B,{onKeydown:t[5]||(t[5]=P(j(c=>p(r)(a.value),["prevent"]),["space"])),onClick:t[6]||(t[6]=c=>p(r)(a.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""}),s("div",{class:O([p(k)?"transport":"","tip column q-mt-xl items-center"])},[he,s("span",null,[N("按"),L(B,{padding:"0px 3px",push:"",label:"Space"}),N("可以进入下一个词块")]),s("span",null,[N("输入状态"),L(B,{padding:"0px 3px",push:"",label:"Tab"}),N("后按下"),L(B,{padding:"0px 3px",push:"",label:"Space"}),N("可以重来")]),_e,ke,ye],2)],512),[[J,!o.value]]),L(te,{name:"result"},{default:H(()=>[G(s("div",we,[s("div",be,[s("div",Ce,[s("div",Te,[N("WPM "),L(X,{class:"q-ml-xs cursor-pointer",name:"info"},{default:H(()=>[L(D,{"transition-show":"scale","transition-hide":"scale",class:"text-btnText bg-active",anchor:"top middle",self:"bottom middle",offset:[10,10]},{default:H(()=>[Le,Be,Ee]),_:1})]),_:1})]),s("div",Se,q(f.value.wpm),1)]),s("div",Ne,[qe,s("div",Re,q(f.value.correctness),1)]),s("div",$e,[ze,s("div",Ke,q(f.value.during),1)])]),L(B,{onKeydown:t[7]||(t[7]=P(j(c=>p(r)(a.value),["prevent"]),["space"])),onClick:t[8]||(t[8]=c=>p(r)(a.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""})],512),[[J,o.value]])]),_:1})])}}}),Ve=ne(Me,[["__scopeId","data-v-f0658214"]]);export{Ve as default};
