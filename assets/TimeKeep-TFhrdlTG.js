import{d as Z,s as M,r as b,n as K,o as Q,a as x,b as I,w as ee,c as C,e as T,f as n,F,g as V,h as A,v as U,i as P,j,u as g,k as L,l as G,m as $,p as H,T as te,q as J,t as se,x as q,y as oe,z as le,_ as ne}from"./index-BL9A1CZm.js";import{u as O}from"./useSettingStore-Bf-aX0H6.js";const W=Z("typing",()=>{const{allWords:e}=M(O()),m=b(null),c=b([]),k=b([]);function h(s){const t=JSON.parse(JSON.stringify(e.value));if(!t){console.error("当前无词块");return}t.length<s&&(console.error(`可用词块数不足${s}个！当前最多生成${t.length}个词块`),s=t.length),c.value=[];for(let i=0;i<s;i++){const u=Math.floor(Math.random()*t.length),r=t.splice(u,1)[0];c.value.push(r)}k.value=c.value.map(({cn:i,...u})=>u)}const a=b(null),l=b([]),f=b(null),p=(s,t)=>{s&&(l.value[t]=s)};function d(){l.value=[];for(let s=0;s<c.value.length;s++){const t=l.value[s];t&&l.value.push(t)}}return{words:c,caret:a,blockRefs:l,enWords:k,startTime:m,blocksContainer:f,setBlockRef:p,generateWords:h,updateRefs:d}});function ae(e){const{blockRefs:m,caret:c}=M(W()),k=()=>{const l=m.value[e.value[0]];if(!l){console.error("Block元素未定义");return}h(e.value[1],l)},h=(l,f)=>{if(!f){console.error("Block元素不存在");return}const d=f.children[1].children;if(d.length<l){console.error(`Block中不足${l}个code`);return}const s=d[l]||d[l-1];a(s,l!=d.length)};function a(l,f){const p=c.value;if(!p){console.error("CaretElement元素不存在");return}const d=l.offsetTop+l.offsetHeight/2-p.offsetHeight/2,s=l.offsetLeft+(f?0:l.offsetWidth);p.style.transform=`translate(${s}px, ${d}px)`}return{handleTyping:k}}function ie(e,m){const{words:c,blockRefs:k,caret:h,enWords:a,startTime:l}=M(W());function f(){var t,i;(t=h.value)==null||t.classList.remove("hide"),(i=h.value)==null||i.classList.add("waiting")}function p(){var t;(t=h.value)==null||t.classList.add("hide")}function d(t){const{codeElements:i,cn:u}=s(e.value[0]);if(h.value&&h.value.classList.remove("waiting"),t.code.startsWith("Key")){if(l.value||(l.value=Date.now()),a.value[e.value[0]].typing?a.value[e.value[0]].typing+=t.key:a.value[e.value[0]].typing=t.key,e.value[1]!=i.length){const r=i[e.value[1]];r.classList.add(t.key==a.value[e.value[0]].en[e.value[1]]?"correct":"wrong"),r.classList.remove("skip")}c.value.length<=e.value[0]&&console.error("block索引越界"),e.value[1]<c.value[e.value[0]].en.length?e.value[0]==c.value.length-1&&e.value[1]==a.value[e.value[0]].en.length-1?m(a.value):e.value[1]++:c.value.length>e.value[0]+1?(c.value[e.value[0]].en+=t.key,K(()=>{i[e.value[1]].classList.add("wrong"),e.value[1]++})):m(a.value)}else if(t.code==="Space")e.value[1]!=0&&(e.value[0]<c.value.length-1?([...i].slice(e.value[1],i.length).forEach(_=>_.classList.add("skip")),a.value[e.value[0]].isCorrect=a.value[e.value[0]].typing==a.value[e.value[0]].en,u.classList.toggle("wrong",!a.value[e.value[0]].isCorrect),u.classList.toggle("correct",a.value[e.value[0]].isCorrect),e.value=[e.value[0]+1,0]):m(a.value));else if(t.code==="Backspace"){if(e.value[0]==0&&e.value[1]==0)return;if(e.value[1]<=0){const{codeElements:r,cn:_}=s(e.value[0]-1),y=[...r];if(_.classList.remove("wrong","correct"),a.value[e.value[0]-1].isCorrect=void 0,y.filter(w=>w.classList.contains("skip")).length>0){let w;for(let o=0;o<y.length;o++)if(y[o].classList.contains("skip")){w=o;break}y.slice(w,y.length).forEach(o=>o.classList.remove("skip")),w?e.value=[e.value[0]-1,w]:console.error("索引元素不存在")}else e.value=[e.value[0]-1,c.value[e.value[0]-1].en.length]}else{const r=a.value[e.value[0]].typing;r&&(a.value[e.value[0]].typing=r.slice(0,-1)),e.value[1]>a.value[e.value[0]].en.length?(c.value[e.value[0]].en=c.value[e.value[0]].en.slice(0,-1),K(()=>e.value[1]--)):(e.value[1]--,i[e.value[1]].classList.remove("correct","wrong"))}}}function s(t){const i=k.value[t];if(!i){console.error("Block元素不存在");return}const u=i.children[0],_=i.children[1].children;return{cn:u,codeElements:_}}return{startTyping:f,endTyping:p,typing:d,startTime:l}}function re(e,m,c){const{settings:k}=O(),{generateWords:h,updateRefs:a}=W(),{words:l,startTime:f,blocksContainer:p,blockRefs:d}=M(W());function s(u){u[m.value[0]].isCorrect=u[m.value[0]].typing==u[m.value[0]].en;const r=Date.now();if(!f.value){console.error("计时未开始");return}const _=(r-f.value)/1e3,y=Math.round(_)+"s",E=u.filter(D=>D.isCorrect).length;let w=E/_*60;w=Math.round(w*100)/100;const N=w.toFixed(2);let o=E/l.value.length;o=Math.round(o*100);const B=o+"%";e.value.wpm=N,e.value.correctness=B,e.value.during=y,c.value=!0}function t(u){d.value.forEach(r=>{r.children[0].classList.remove("wrong","correct","skip"),[...r.children[1].children].forEach(y=>{y.classList.remove("wrong","correct","skip")})}),f.value=null,i(u),c.value=!1,K(()=>{p.value&&p.value.focus(),m.value=[0,0]})}function i(u){a(),h(u)}return h(k.generateWordsNum),Q(()=>{f.value=null}),{handleEnd:s,restart:t}}const S=e=>(oe("data-v-c14eb214"),e=e(),le(),e),ce={class:"items-center column"},ue={class:"q-ma-lg num-chooser"},ve={key:0,class:"num-chooser-split"},fe=["onClick"],de={class:"items-center column q-mt-xl"},pe={class:"cn-word"},ge={class:"en-word"},me=S(()=>n("span",null,"点击词块即可开始输入",-1)),he=S(()=>n("span",null,"输入第一个字母后开始计时",-1)),_e={class:"result items-center column q-mt-xl"},ke={class:"row justify-around result-item-container"},ye={class:"result-item"},we={class:"result-key row items-center"},be=S(()=>n("b",null,[n("em",{style:{"text-decoration":"underline","font-size":"14px"}},"Words Per Minute")],-1)),Ce=S(()=>n("br",null,null,-1)),Te=S(()=>n("span",{style:{"font-size":"13px"}},"每分钟键入的单词数",-1)),Le={class:"result-value correct"},Be={class:"result-item"},Se=S(()=>n("div",{class:"result-key"},"正确率",-1)),Ee={class:"result-value correct"},Ne={class:"result-item"},qe=S(()=>n("div",{class:"result-key"},"用时",-1)),We={class:"result-value correct"},Re=x({__name:"TimeKeep",setup(e){const{words:m,caret:c,blocksContainer:k,startTime:h}=M(W()),{setBlockRef:a}=W(),{settings:l}=O(),f=b(!1),p=b({wpm:"",correctness:"",during:""}),d=b([0,0]),s=b(l.generateWordsNum),t=b([20,30,40,50]),{handleTyping:i}=ae(d),{handleEnd:u,restart:r}=re(p,d,f),{startTyping:_,endTyping:y,typing:E}=ie(d,u);function w(N){s.value!=N&&(s.value=N,r(s.value))}return K(()=>{k.value&&k.value.focus()}),I(()=>{window.addEventListener("resize",i),ee(d,()=>{i()},{deep:!0,immediate:!0})}),Q(()=>{window.removeEventListener("resize",i)}),(N,o)=>{const B=J("q-btn"),D=J("q-tooltip"),X=J("q-icon");return C(),T("div",ce,[n("div",ue,[(C(!0),T(F,null,V(t.value,(v,R)=>(C(),T("span",{key:R},[R!=0?(C(),T("span",ve,"/")):se("",!0),n("span",{onClick:z=>w(v),class:G([s.value==v?"correct":"","num-chooser-num"])},q(v),11,fe)]))),128))]),A(n("div",de,[n("div",{ref_key:"blocksContainer",ref:k,onKeydown:[o[0]||(o[0]=P(j(()=>{},["prevent"]),["space"])),o[3]||(o[3]=(...v)=>g(E)&&g(E)(...v))],onFocus:o[1]||(o[1]=(...v)=>g(_)&&g(_)(...v)),onBlur:o[2]||(o[2]=(...v)=>g(y)&&g(y)(...v)),onClick:o[4]||(o[4]=(...v)=>g(i)&&g(i)(...v)),tabindex:"0",class:"row words-container"},[n("div",{ref_key:"caret",ref:c,class:"caret"},null,512),(C(!0),T(F,null,V(g(m),(v,R)=>(C(),T("div",{ref_for:!0,ref:z=>g(a)(z,R),key:R,class:"column items-center word-block"},[n("div",pe,q(v.cn),1),n("div",ge,[(C(!0),T(F,null,V(v.en,(z,Y)=>(C(),T("code",{key:Y},q(z),1))),128))])]))),128))],544),L(B,{onKeydown:o[5]||(o[5]=P(j(v=>g(r)(s.value),["prevent"]),["space"])),onClick:o[6]||(o[6]=v=>g(r)(s.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""}),n("div",{class:G([g(h)?"transport":"","tip column q-mt-xl items-center"])},[me,n("span",null,[$("按"),L(B,{padding:"0px 3px",push:"",label:"Space"}),$("进入下一个词块")]),he,n("span",null,[L(B,{padding:"0px 3px",push:"",label:"Tab"}),$("+"),L(B,{padding:"0px 3px",push:"",label:"Space"}),$("可以快速刷新")])],2)],512),[[U,!f.value]]),L(te,{name:"result"},{default:H(()=>[A(n("div",_e,[n("div",ke,[n("div",ye,[n("div",we,[$("WPM "),L(X,{color:"text",class:"q-ml-xs cursor-pointer",name:"info"},{default:H(()=>[L(D,{"transition-show":"scale","transition-hide":"scale",class:"text-btnText bg-active",anchor:"top middle",self:"bottom middle",offset:[10,10]},{default:H(()=>[be,Ce,Te]),_:1})]),_:1})]),n("div",Le,q(p.value.wpm),1)]),n("div",Be,[Se,n("div",Ee,q(p.value.correctness),1)]),n("div",Ne,[qe,n("div",We,q(p.value.during),1)])]),L(B,{onKeydown:o[7]||(o[7]=P(j(v=>g(r)(s.value),["prevent"]),["space"])),onClick:o[8]||(o[8]=v=>g(r)(s.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""})],512),[[U,f.value]])]),_:1})])}}}),ze=ne(Re,[["__scopeId","data-v-c14eb214"]]);export{ze as default};
