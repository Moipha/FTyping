import{u as I}from"./useSettingStore-Daz8fdOw.js";import{r as V,S as J,a as z,q as c,c as q,E as N,p as a,f as e,G as b,m as R,x as T,e as w,i as o,t as A,g as U,F as C,_ as j,w as K,u as d,B as E,l as B,j as L,n as M,y as O,z as F,T as H}from"./index-BflKK8qp.js";const Q={vue:{desc:"Vue官网配色",color:{active:"#42b883",error:"#ff6464",text:"#213547",btnText:"#ffffff",bg:"#ffffff"}},amber:{desc:"琥珀",color:{active:"#ffc107",error:"#c10015",text:"whitesmoke",btnText:"black",bg:"#282c34"}},watermelon:{desc:"测试",color:{active:"#3F7A63",error:"#9f2218",text:"#000000",btnText:"#ffffff",bg:"#f29089"}},"red/blue":{desc:"测试2",color:{active:"#EA3A4A",error:"white",text:"#000000",btnText:"#ffffff",bg:"#92C8E9"}}};function X(){const n=V("vue");localStorage.getItem("theme");const l=localStorage.getItem("theme")?JSON.parse(localStorage.getItem("theme")):null;l&&(n.value=l.name);const t={...Q};function u(m){if(!(m in t)){console.error(`要切换的主题${m}不存在`);return}const r=t[m];Object.entries(r.color).forEach(([$,f])=>{J($,f)}),n.value=m;const _={...r,name:m};localStorage.setItem("theme",JSON.stringify(_))}return{changeTheme:u,themes:t,current:n}}const Y={class:"card-inner"},Z={key:0,class:"icon-container"},ee={class:"color-key q-ml-md"},te={class:"color-value"},oe=z({__name:"ThemeCard",props:["themeKey","value","current","changeTheme"],setup(n){return(l,t)=>{const u=c("q-icon"),m=c("q-card");return q(),N(m,{onClick:t[0]||(t[0]=r=>n.changeTheme(n.themeKey)),flat:""},{default:a(()=>[e("div",Y,[e("div",{class:"front shadow-5",style:b(`background-color: ${n.value.color.bg};color: ${n.value.color.active}`)},[R(T(n.themeKey)+" ",1),n.current==n.themeKey?(q(),w("div",Z,[o(u,{name:"check_circle_outline",size:"3rem",class:"q-ma-sm"})])):A("",!0)],4),e("div",{class:"back shadow-5 column justify-center",style:b(`background: linear-gradient(to bottom right ,${n.value.color.bg}, ${n.value.color.active})`)},[(q(!0),w(C,null,U(n.value.color,(r,_)=>(q(),w("div",{class:"row items-center q-px-xl",style:b(`color: ${r}`)},[e("div",{class:"color-square",style:b(`background-color: ${r}`)},null,4),e("div",ee,T(_)+" : ",1),e("div",te,T(r),1)],4))),256))],4)])]),_:1})}}}),se=j(oe,[["__scopeId","data-v-55aa9883"]]),le={class:"q-pa-md setting-tree"},ne={class:"row items-center q-ma-xs"},ce=z({__name:"SettingTree",props:["modelValue"],emits:["update:modelValue"],setup(n,{emit:l}){const{isPhone:t}=I(),{modelValue:u}=n,m=l,r=V(u);K(()=>u,p=>{r.value=p});const _=["设置","主题"],$=V();K(r,(p,i)=>{if(_.includes(p)){r.value=i;const s=!$.value.isExpanded(p);$.value.setExpanded(p,s)}else m("update:modelValue",p)});const f=V([{label:"设置",icon:"settings",fontSize:"1.5rem",iconSize:"2rem",children:[{label:"通用",icon:"tune",fontSize:"1rem",iconSize:"1.4rem"},{label:"主题",icon:"color_lens",fontSize:"1rem",iconSize:"1.4rem",children:[{label:"切换主题",icon:"compare_arrows",fontSize:"1rem",iconSize:"1.4rem"},{label:"自定义主题",icon:"colorize",fontSize:"1rem",iconSize:"1.4rem"}]}]}]);return(p,i)=>{const s=c("q-icon"),h=c("q-tree");return q(),w("div",le,[o(h,{ref_key:"tree",ref:$,dense:d(t),"no-selection-unset":"","text-color":"text",color:"text",nodes:f.value,"node-key":"label","selected-color":"active",selected:r.value,"onUpdate:selected":i[0]||(i[0]=g=>r.value=g),"default-expand-all":""},{"default-header":a(g=>[e("div",ne,[o(s,{name:g.node.icon||"share",size:g.node.iconSize,class:"q-mr-sm"},null,8,["name","size"]),e("div",{class:"text-weight-bold",style:b(`font-size: ${g.node.fontSize}`)},T(g.node.label),5)])]),_:1},8,["dense","nodes","selected"])])}}}),S=n=>(O("data-v-241e15ec"),n=n(),F(),n),ae={class:"q-px-lg q-py-sm"},re=S(()=>e("div",{class:"text-h5"},"词组设置",-1)),ie={class:"q-pa-md q-mt-lg"},de={class:"row items-center"},ue=S(()=>e("span",{class:"text-subtitle1"},"使用默认词组",-1)),me=S(()=>e("b",{style:{"font-size":"13px"}},"设置词组时注意词组间用 | 分隔；",-1)),_e=S(()=>e("br",null,null,-1)),ve=S(()=>e("b",{style:{"font-size":"13px"}},"在保存时会自动忽略重复词组",-1)),pe={class:"words-count q-ml-lg"},fe={class:"q-mt-sm words-setting"},he={class:"row justify-end"},ge=S(()=>e("span",{class:"q-px-md"},"保存",-1)),be=S(()=>e("div",{class:"text-h5 q-mt-xl"},"计时模式",-1)),qe={class:"row q-pa-md q-mt-lg"},xe={class:"col"},we=S(()=>e("div",{class:"text-h5"},"限时模式",-1)),$e={class:"row q-pa-md q-mt-lg time-limit-setting"},ye={class:"col row"},Se=z({__name:"GeneralSetting",setup(n){const{isPhone:l,settings:t,saveSettings:u}=I(),m=E({get(){return t.useDefaultWords?t.wordsString:t.customString},set(i){t.useDefaultWords?t.wordsString=i:t.customString=i}}),r=[{label:"20",value:20},{label:"30",value:30},{label:"40",value:40},{label:"50",value:50}];function _(i){t.generateWordsNum=i,u(t)}function $(i){t.useDefaultWords=i,u(t)}function f(){t.wordsString&&(t.wordsString+=" ",M(()=>{t.wordsString=t.wordsString.substring(0,t.wordsString.length-1)}))}const p=E({get(){return t.limitTime||20},set(i){i>0&&(t.limitTime=i)}});return(i,s)=>{const h=c("q-toggle"),g=c("q-tooltip"),y=c("q-icon"),k=c("q-resize-observer"),W=c("q-input"),G=c("q-btn"),D=c("q-separator"),P=c("q-option-group");return q(),w("div",ae,[re,e("div",ie,[e("div",de,[o(h,{"onUpdate:modelValue":[s[0]||(s[0]=v=>$(v)),s[1]||(s[1]=v=>d(t).useDefaultWords=v)],size:"50px",color:"active",dark:"","keep-color":"",modelValue:d(t).useDefaultWords},{default:a(()=>[ue]),_:1},8,["modelValue"]),o(y,{size:"20px",color:"text",class:"q-ml-xs cursor-pointer",name:"info"},{default:a(()=>[o(g,{"transition-show":"scale","transition-hide":"scale",class:"text-btnText bg-active",anchor:"top middle",self:"bottom middle",offset:[10,10]},{default:a(()=>[me,_e,ve]),_:1})]),_:1}),e("span",pe,"共"+T([...new Set(m.value.split("|"))].filter(v=>v.trim()!=="").length)+"词",1)]),e("div",fe,[o(W,{placeholder:"请在此处输入自定义词组...",disable:d(t).useDefaultWords,color:"active","input-class":"words-input",modelValue:m.value,"onUpdate:modelValue":s[2]||(s[2]=v=>m.value=v),autogrow:"",outlined:""},{default:a(()=>[o(k,{onResize:f})]),_:1},8,["disable","modelValue"]),e("div",he,[o(G,{onClick:s[3]||(s[3]=v=>d(u)(d(t))),disable:d(t).useDefaultWords,push:"",class:"q-mt-sm q-mr-sm",size:"16px",color:"active","text-color":"btnText"},{default:a(()=>[ge]),_:1},8,["disable"])])])]),o(D,{class:"q-my-xl divider",color:"text"}),be,e("div",qe,[e("div",{class:B(["row items-center text-subtitle1 q-ml-sm",d(l)?"col-12":"col-2"])},"默认生成词数",2),e("div",xe,[o(P,{"onUpdate:modelValue":[s[4]||(s[4]=v=>_(v)),s[5]||(s[5]=v=>d(t).generateWordsNum=v)],modelValue:d(t).generateWordsNum,options:r,color:"active",dark:"",inline:""},null,8,["modelValue"])])]),o(D,{class:"q-my-xl divider",color:"text"}),we,e("div",$e,[e("div",{class:B(["row items-center text-subtitle1 q-ml-sm",d(l)?"col-12":"col-2"])},"默认限定时长",2),e("div",ye,[o(W,{onBlur:s[6]||(s[6]=v=>d(u)(d(t))),onKeydown:s[7]||(s[7]=L(v=>d(u)(d(t)),["enter"])),suffix:"秒","input-class":"time-input",modelValue:p.value,"onUpdate:modelValue":s[8]||(s[8]=v=>p.value=v),color:"active",outlined:""},null,8,["modelValue"])])])])}}}),Ve=j(Se,[["__scopeId","data-v-241e15ec"]]),x=n=>(O("data-v-9b4de149"),n=n(),F(),n),Te={class:"q-px-lg q-py-sm"},ze=x(()=>e("div",{class:"text-h5 q-mb-xl"},"定制主题",-1)),ke={class:"q-pa-md q-mt-lg column"},Ce={class:"row"},je={class:"row q-gutter-lg justify-center"},Ie=x(()=>e("div",{class:"cn-word"},"示例",-1)),Ue=x(()=>e("div",{class:"en-word"},[e("code",null,"shili")],-1)),We=[Ie,Ue],De=x(()=>e("div",{class:"cn-word"},"示例",-1)),Ke=x(()=>e("div",{class:"en-word"},[e("code",null,"shili")],-1)),Ee=[De,Ke],Be=x(()=>e("div",{class:"cn-word"},"示例",-1)),Ne={class:"en-word",style:{opacity:"0.5"}},Ae=x(()=>e("code",null,"shili",-1)),Oe={class:"q-my-md row q-gutter-md justify-center"},Fe=x(()=>e("div",null,"示例",-1)),Ge=x(()=>e("div",null,"shili",-1)),Pe=x(()=>e("div",null,"示例",-1)),Je=x(()=>e("div",null,"shili",-1)),Re=x(()=>e("div",null,"示例",-1)),Le=x(()=>e("div",null,"shili",-1)),Me={class:"column q-gutter-lg col-4 color-choose"},He={class:"row items-center"},Qe={class:"row justify-start q-ml-lg q-mt-md btn-group"},Xe=z({__name:"CustomTheme",setup(n){const l=V({desc:"",color:{active:"",error:"",bg:"",text:"",btnText:""}}),t={active:"#00aaff",error:"#ff0000",bg:"#ffffff",text:"#000000",btnText:"#ffffff"},u={active:"主题颜色",error:"错误颜色",bg:"背景颜色",text:"文字颜色",btnText:"按钮文字颜色"};return(m,r)=>{const _=c("q-card"),$=c("q-color"),f=c("q-popup-proxy"),p=c("q-icon"),i=c("q-input"),s=c("q-btn");return q(),w("div",Te,[ze,e("div",ke,[e("div",Ce,[e("div",{class:"col q-mx-lg q-pa-md example-container column justify-center",style:b(`background: ${l.value.color.bg}`)},[e("div",je,[e("div",{class:"column items-center word-block",style:b(`color: ${l.value.color.active}`)},We,4),e("div",{class:"column items-center word-block",style:b(`color: ${l.value.color.error}`)},Ee,4),e("div",{class:"column items-center word-block",style:b(`color: ${l.value.color.text}`)},[Be,e("div",Ne,[e("div",{class:"caret waiting",style:b(`background: ${l.value.color.active}`)},null,4),Ae])],4)]),e("div",Oe,[o(_,{class:"column justify-center items-center shadow-3",style:b(`color: ${l.value.color.btnText};background: ${l.value.color.active}`)},{default:a(()=>[Fe,Ge]),_:1},8,["style"]),o(_,{class:"column justify-center items-center shadow-3",style:b(`color: ${l.value.color.btnText};background: ${l.value.color.error}`)},{default:a(()=>[Pe,Je]),_:1},8,["style"]),o(_,{class:"column justify-center items-center shadow-3",style:b(`color: ${l.value.color.text}; background: ${l.value.color.bg}`)},{default:a(()=>[Re,Le]),_:1},8,["style"])])],4),e("div",Me,[(q(!0),w(C,null,U(Object.keys(t),h=>(q(),w("div",He,[o(H,{name:"dot"},{default:a(()=>[l.value.color[h]?(q(),w("div",{key:0,class:"color-dot q-mr-sm",style:b(`background-color: ${l.value.color[h]}`)},null,4)):A("",!0)]),_:2},1024),o(i,{"input-class":"theme-input",color:"active","label-color":"text",modelValue:l.value.color[h],"onUpdate:modelValue":g=>l.value.color[h]=g,label:u[h],outlined:""},{append:a(()=>[o(p,{name:"colorize",color:"text",class:"cursor-pointer"},{default:a(()=>[o(f,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:a(()=>[o($,{modelValue:l.value.color[h],"onUpdate:modelValue":g=>l.value.color[h]=g,"default-value":t[h],"no-header-tabs":""},null,8,["modelValue","onUpdate:modelValue","default-value"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","label"])]))),256))])]),e("div",Qe,[o(s,{class:"q-mr-sm",icon:"save",label:"保存",size:"16px",color:"active","text-color":"btnText",push:""}),o(s,{class:"q-mr-sm",icon:"check_circle",label:"应用",size:"16px",color:"active","text-color":"btnText",push:""}),o(s,{class:"q-mr-sm",icon:"dashboard",label:"添加至主题列表",size:"16px",color:"active","text-color":"btnText",push:""})])])])}}}),Ye=j(Xe,[["__scopeId","data-v-9b4de149"]]),Ze={class:"q-px-lg q-py-md row q-gutter-lg"},et=z({__name:"Setting",setup(n){const{isPhone:l}=I(),{themes:t,current:u,changeTheme:m}=X(),r=V(l?30:20),_=V("通用");return($,f)=>{const p=c("q-separator"),i=c("q-avatar"),s=c("q-tab-panel"),h=c("q-tab-panels"),g=c("q-splitter");return q(),w(C,null,[o(p,{color:"text"}),o(g,{horizontal:d(l),modelValue:r.value,"onUpdate:modelValue":f[2]||(f[2]=y=>r.value=y),"separator-style":"background-color: var(--q-text)",style:{height:"calc(100vh - 170px)"}},{before:a(()=>[o(ce,{modelValue:_.value,"onUpdate:modelValue":f[0]||(f[0]=y=>_.value=y)},null,8,["modelValue"])]),separator:a(()=>[o(i,{color:"active","text-color":"btnText",size:"40px",icon:"drag_indicator"})]),after:a(()=>[o(h,{modelValue:_.value,"onUpdate:modelValue":f[1]||(f[1]=y=>_.value=y),animated:"","transition-prev":"slide-down","transition-next":"slide-up","transition-duration":"500"},{default:a(()=>[o(s,{name:"通用"},{default:a(()=>[o(Ve)]),_:1}),o(s,{name:"切换主题"},{default:a(()=>[e("div",Ze,[(q(!0),w(C,null,U(d(t),(y,k)=>(q(),N(se,{key:k,themeKey:k,value:y,current:d(u),changeTheme:d(m)},null,8,["themeKey","value","current","changeTheme"]))),128))])]),_:1}),o(s,{name:"自定义主题"},{default:a(()=>[o(Ye)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["horizontal","modelValue"]),o(p,{color:"text"})],64)}}}),st=j(et,[["__scopeId","data-v-9b48d11e"]]);export{st as default};
