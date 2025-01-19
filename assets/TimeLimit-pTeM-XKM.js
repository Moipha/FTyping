import{s as O,r as k,y as A,w as E,z as J,n as j,a as G,c as V,e as t,j as u,m as i,A as P,k as B,u as a,x as _,B as I,h as F,i as H,T as $,p as W,q as v,F as N,f as U,C as K,t as z,_ as Q}from"./index-CxhtOLru.js";import{u as X}from"./useSettingStore-BzqOtbVG.js";import{u as Y}from"./useDataStore-CiqW6bRx.js";let D=(b=21)=>crypto.getRandomValues(new Uint8Array(b)).reduce((m,s)=>(s&=63,s<36?m+=s.toString(36):s<62?m+=(s-26).toString(36).toUpperCase():s>62?m+="-":m+="_",m),"");function Z(){const{allWords:b,settings:m}=O(X()),s=k(),h=A(m.value.limitTime),r=k([]),d=k([]),q=k(!0),f=k({wpm:"",correctWords:[],wrongWords:[]}),w=k(null),g=k("");let y;E(h,(o,e)=>{o>0?(s.value=o,j(()=>{l()})):e?h.value=e:console.error("初始设置时间为非正数")},{deep:!0,immediate:!0});function x(){y||(y=setInterval(()=>{s.value--,s.value<=0&&(clearInterval(y),p())},1e3))}function p(){r.value.forEach(S=>{S.cn="时间已到",S.en="timeout",S.isCorrect=!1}),q.value=!1,s.value=0;const o=d.value.filter(S=>S.isCorrect),e=d.value.filter(S=>!S.isCorrect),n=o.length;let c=n/h.value*60;c=Math.round(c*100)/100;const C=c.toFixed(2);f.value={wpm:C,correctWords:o,wrongWords:e};const{addTypingRecord:M}=Y();M({wpm:parseFloat(f.value.wpm),timestamp:new Date().toLocaleString(),mode:"fixed_time",total_words:d.value.length,accuracy:Math.round(n/d.value.length*100)})}function l(){q.value=!0,r.value=[],d.value=[],g.value="",s.value=h.value,clearInterval(y),y=void 0,T(!0),j(()=>{w.value&&w.value.focus()})}function T(o){const e=JSON.parse(JSON.stringify(b.value));if(!e){console.error("当前无词块");return}if(e.length<5&&console.error("可用词块数不足5个！"),o){const n=[];for(let c=0;c<5;c++){const C=Math.floor(Math.random()*e.length);n.push({id:D(),...e[C]})}r.value=n}else{const n=e.splice(Math.floor(Math.random()*e.length),1)[0];r.value.push({id:D(),...n})}}function R(o){if((o.code.startsWith("Key")||o.key==" ")&&x(),o.key==" "){const{id:e,en:n,cn:c}=r.value[2],C=g.value.trim(),M=C==n||C==c;d.value.push({id:e,cn:c,en:n,typing:C,isCorrect:M}),r.value[2].isCorrect=M,j(()=>{g.value=""}),r.value.shift(),T(!1)}}const L=J(()=>{const o=Math.floor(s.value/60),e=s.value%60,n=String(o).padStart(2,"0"),c=String(e).padStart(2,"0");return`${n}:${c}`});return j(()=>{w.value&&w.value.focus()}),T(!0),{cards:r,status:q,formatTime:L,timeLimit:h,input:g,result:f,inputRef:w,handleTyping:R,restart:l}}const ee={class:"items-center column"},te={class:"q-mt-sm q-mb-xl row card-container items-center"},se={class:"q-mt-xl row items-center full-width"},oe={class:"col row justify-end"},ne={class:"input-container shadow-3"},ae={class:"col row justify-start"},le={class:"btn-container shadow-3"},re={class:"result-container"},ie={class:"wpm correct"},ce={key:0,class:"row item-container"},ue={class:"result-item col"},de={class:"row expansion-container"},me={class:"result-item col"},fe={class:"row expansion-container"},pe=G({__name:"TimeLimit",setup(b){const{cards:m,status:s,formatTime:h,timeLimit:r,input:d,inputRef:q,result:f,handleTyping:w,restart:g}=Z();function y(x,p){let l="";return x==2?l+="mid-card ":(x==0||x==4)&&(l+="edge-card "),p.isCorrect!=null&&(p.isCorrect?l+="correct-card":l+="wrong-card"),l}return(x,p)=>{const l=W("q-card"),T=W("q-input"),R=W("q-popup-edit"),L=W("q-btn"),o=W("q-expansion-item");return v(),V("div",ee,[t("div",te,[u(P,{name:"card",appear:""},{default:i(()=>[(v(!0),V(N,null,U(a(m),(e,n)=>(v(),K(l,{key:e.id,class:B([y(n,e),"column justify-center items-center shadow-5"])},{default:i(()=>[t("div",null,_(e.cn),1),t("div",null,_(e.en),1)]),_:2},1032,["class"]))),128))]),_:1})]),t("div",se,[t("div",oe,[t("div",null,[t("div",{class:B(["time-limit shadow-3",a(s)?"":"wrong"])},_(a(h)),3),u(R,{class:"popup",modelValue:a(r),"onUpdate:modelValue":p[0]||(p[0]=e=>I(r)?r.value=e:null),"auto-save":""},{default:i(e=>[u(T,{color:"active",placeholder:"限时时长(单位: 秒)",modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,autofocus:"",onKeyup:F(e.set,["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeyup"])]),_:1},8,["modelValue"])])]),t("div",ne,[u(T,{ref_key:"inputRef",ref:q,disable:!a(s),modelValue:a(d),"onUpdate:modelValue":p[1]||(p[1]=e=>I(d)?d.value=e:null),onKeydown:a(w),"input-class":"input",borderless:""},null,8,["disable","modelValue","onKeydown"])]),t("div",ae,[t("div",le,[u(L,{onKeydown:F(H(a(g),["prevent"]),["space"]),onClick:a(g),class:"re-btn",icon:"refresh",size:"lg",flat:""},null,8,["onKeydown","onClick"])])])]),t("div",re,[u($,{name:"wpm"},{default:i(()=>[a(s)?z("",!0):(v(),K(l,{key:0,class:"shadow-3 row justify-center"},{default:i(()=>[t("div",ie,"WPM "+_(a(f).wpm),1)]),_:1}))]),_:1}),u($,{name:"word"},{default:i(()=>[a(s)?z("",!0):(v(),V("div",ce,[t("div",ue,[u(l,{class:"col shadow-3 correct row justify-center"},{default:i(()=>[u(o,{"header-class":"expansion",class:"fit",label:`正确 ${a(f).correctWords.length.toString()}`},{default:i(()=>[t("div",de,[(v(!0),V(N,null,U(a(f).correctWords,e=>(v(),K(l,{class:"shadow-3 correct-card column justify-center items-center result-block"},{default:i(()=>[t("div",null,_(e.cn),1),t("div",null,_(e.typing),1)]),_:2},1024))),256))])]),_:1},8,["label"])]),_:1})]),t("div",me,[u(l,{class:"col shadow-3 wrong row justify-center"},{default:i(()=>[u(o,{"header-class":"expansion",class:"fit",label:`错误 ${a(f).wrongWords.length.toString()}`},{default:i(()=>[t("div",fe,[(v(!0),V(N,null,U(a(f).wrongWords,e=>(v(),K(l,{class:"shadow-3 wrong-card column justify-center items-center result-block"},{default:i(()=>[t("div",null,_(e.cn),1),t("div",null,_(e.typing),1)]),_:2},1024))),256))])]),_:1},8,["label"])]),_:1})])]))]),_:1})])])}}}),we=Q(pe,[["__scopeId","data-v-5b948cb6"]]);export{we as default};
