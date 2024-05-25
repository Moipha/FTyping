import{u as G}from"./useSettingStore-DLVheZFV.js";import{a as D,q as a,c as y,E as Z,p as c,f as e,G as x,m as de,x as U,e as V,i as o,t as A,g as P,F as W,_ as J,r as k,w as R,u as m,B as X,l as Y,j as ee,n as ue,y as te,z as oe,d as me,S as se,s as le,H as _e,I as ve,T as fe,h as pe}from"./index-Bod516PY.js";const he={class:"card-inner"},ge={key:0,class:"icon-container"},be={class:"color-key q-ml-md"},qe={class:"color-value"},xe=D({__name:"ThemeCard",props:["themeKey","value","current","changeTheme"],setup(n){return(w,s)=>{const i=a("q-icon"),h=a("q-card");return y(),Z(h,{onClick:s[0]||(s[0]=t=>n.changeTheme(n.themeKey)),flat:""},{default:c(()=>[e("div",he,[e("div",{class:"front shadow-5",style:x(`background-color: ${n.value.color.bg};color: ${n.value.color.active}`)},[de(U(n.themeKey)+" ",1),n.current==n.themeKey?(y(),V("div",ge,[o(i,{name:"check_circle_outline",size:"3rem",class:"q-ma-sm"})])):A("",!0)],4),e("div",{class:"back shadow-5 column justify-center",style:x(`background: linear-gradient(to bottom right ,${n.value.color.bg}, ${n.value.color.active})`)},[(y(!0),V(W,null,P(n.value.color,(t,r)=>(y(),V("div",{class:"row items-center q-px-xl",style:x(`color: ${t}`)},[e("div",{class:"color-square",style:x(`background-color: ${t}`)},null,4),e("div",be,U(r)+" : ",1),e("div",qe,U(t),1)],4))),256))],4)])]),_:1})}}}),ye=J(xe,[["__scopeId","data-v-55aa9883"]]),Se={class:"q-pa-md setting-tree"},we={class:"row items-center q-ma-xs"},$e=D({__name:"SettingTree",props:["modelValue"],emits:["update:modelValue"],setup(n,{emit:w}){const{isPhone:s}=G(),{modelValue:i}=n,h=w,t=k(i);R(()=>i,v=>{t.value=v});const r=["设置","主题"],g=k();R(t,(v,d)=>{if(r.includes(v)){t.value=d;const l=!g.value.isExpanded(v);g.value.setExpanded(v,l)}else h("update:modelValue",v)});const b=k([{label:"设置",icon:"settings",fontSize:"1.5rem",iconSize:"2rem",children:[{label:"通用",icon:"tune",fontSize:"1rem",iconSize:"1.4rem"},{label:"主题",icon:"color_lens",fontSize:"1rem",iconSize:"1.4rem",children:[{label:"切换主题",icon:"compare_arrows",fontSize:"1rem",iconSize:"1.4rem"},{label:"自定义主题",icon:"colorize",fontSize:"1rem",iconSize:"1.4rem"}]}]}]);return(v,d)=>{const l=a("q-icon"),C=a("q-tree");return y(),V("div",Se,[o(C,{ref_key:"tree",ref:g,dense:m(s),"no-selection-unset":"","text-color":"text",color:"text",nodes:b.value,"node-key":"label","selected-color":"active",selected:t.value,"onUpdate:selected":d[0]||(d[0]=$=>t.value=$),"default-expand-all":""},{"default-header":c($=>[e("div",we,[o(l,{name:$.node.icon||"share",size:$.node.iconSize,class:"q-mr-sm"},null,8,["name","size"]),e("div",{class:"text-weight-bold",style:x(`font-size: ${$.node.fontSize}`)},U($.node.label),5)])]),_:1},8,["dense","nodes","selected"])])}}}),z=n=>(te("data-v-241e15ec"),n=n(),oe(),n),Te={class:"q-px-lg q-py-sm"},Ve=z(()=>e("div",{class:"text-h5"},"词组设置",-1)),ke={class:"q-pa-md q-mt-lg"},ze={class:"row items-center"},Ce=z(()=>e("span",{class:"text-subtitle1"},"使用默认词组",-1)),Ie=z(()=>e("b",{style:{"font-size":"13px"}},"设置词组时注意词组间用 | 分隔；",-1)),je=z(()=>e("br",null,null,-1)),Oe=z(()=>e("b",{style:{"font-size":"13px"}},"在保存时会自动忽略重复词组",-1)),Ne={class:"words-count q-ml-lg"},Ue={class:"q-mt-sm words-setting"},We={class:"row justify-end"},De=z(()=>e("span",{class:"q-px-md"},"保存",-1)),Le=z(()=>e("div",{class:"text-h5 q-mt-xl"},"计时模式",-1)),Be={class:"row q-pa-md q-mt-lg"},Ee={class:"col"},Je=z(()=>e("div",{class:"text-h5"},"限时模式",-1)),Ke={class:"row q-pa-md q-mt-lg time-limit-setting"},Ae={class:"col row"},Re=D({__name:"GeneralSetting",setup(n){const{isPhone:w,settings:s,saveSettings:i}=G(),h=X({get(){return s.useDefaultWords?s.wordsString:s.customString},set(d){s.useDefaultWords?s.wordsString=d:s.customString=d}}),t=[{label:"20",value:20},{label:"30",value:30},{label:"40",value:40},{label:"50",value:50}];function r(d){s.generateWordsNum=d,i(s)}function g(d){s.useDefaultWords=d,i(s)}function b(){s.wordsString&&(s.wordsString+=" ",ue(()=>{s.wordsString=s.wordsString.substring(0,s.wordsString.length-1)}))}const v=X({get(){return s.limitTime||20},set(d){d>0&&(s.limitTime=d)}});return(d,l)=>{const C=a("q-toggle"),$=a("q-tooltip"),p=a("q-icon"),T=a("q-resize-observer"),L=a("q-input"),B=a("q-btn"),I=a("q-separator"),K=a("q-option-group");return y(),V("div",Te,[Ve,e("div",ke,[e("div",ze,[o(C,{"onUpdate:modelValue":[l[0]||(l[0]=_=>g(_)),l[1]||(l[1]=_=>m(s).useDefaultWords=_)],size:"50px",color:"active",dark:"","keep-color":"",modelValue:m(s).useDefaultWords},{default:c(()=>[Ce]),_:1},8,["modelValue"]),o(p,{size:"20px",color:"text",class:"q-ml-xs cursor-pointer",name:"info"},{default:c(()=>[o($,{"transition-show":"scale","transition-hide":"scale",class:"text-btnText bg-active",anchor:"top middle",self:"bottom middle",offset:[10,10]},{default:c(()=>[Ie,je,Oe]),_:1})]),_:1}),e("span",Ne,"共"+U([...new Set(h.value.split("|"))].filter(_=>_.trim()!=="").length)+"词",1)]),e("div",Ue,[o(L,{placeholder:"请在此处输入自定义词组...",disable:m(s).useDefaultWords,color:"active","input-class":"words-input",modelValue:h.value,"onUpdate:modelValue":l[2]||(l[2]=_=>h.value=_),autogrow:"",outlined:""},{default:c(()=>[o(T,{onResize:b})]),_:1},8,["disable","modelValue"]),e("div",We,[o(B,{onClick:l[3]||(l[3]=_=>m(i)(m(s))),disable:m(s).useDefaultWords,push:"",class:"q-mt-sm q-mr-sm",size:"16px",color:"active","text-color":"btnText"},{default:c(()=>[De]),_:1},8,["disable"])])])]),o(I,{class:"q-my-xl divider",color:"text"}),Le,e("div",Be,[e("div",{class:Y(["row items-center text-subtitle1 q-ml-sm",m(w)?"col-12":"col-2"])},"默认生成词数",2),e("div",Ee,[o(K,{"onUpdate:modelValue":[l[4]||(l[4]=_=>r(_)),l[5]||(l[5]=_=>m(s).generateWordsNum=_)],modelValue:m(s).generateWordsNum,options:t,color:"active",dark:"",inline:""},null,8,["modelValue"])])]),o(I,{class:"q-my-xl divider",color:"text"}),Je,e("div",Ke,[e("div",{class:Y(["row items-center text-subtitle1 q-ml-sm",m(w)?"col-12":"col-2"])},"默认限定时长",2),e("div",Ae,[o(L,{onBlur:l[6]||(l[6]=_=>m(i)(m(s))),onKeydown:l[7]||(l[7]=ee(_=>m(i)(m(s)),["enter"])),suffix:"秒","input-class":"time-input",modelValue:v.value,"onUpdate:modelValue":l[8]||(l[8]=_=>v.value=_),color:"active",outlined:""},null,8,["modelValue"])])])])}}}),Fe=J(Re,[["__scopeId","data-v-241e15ec"]]),F={vue:{desc:"Vue官网配色",color:{active:"#42b883",error:"#ff6464",text:"#213547",btnText:"#ffffff",bg:"#ffffff"}},amber:{desc:"琥珀",color:{active:"#ffc107",error:"#c10015",text:"whitesmoke",btnText:"black",bg:"#282c34"}},watermelon:{desc:"测试",color:{active:"#3F7A63",error:"#9f2218",text:"#000000",btnText:"#ffffff",bg:"#f29089"}},"red/blue":{desc:"测试2",color:{active:"#EA3A4A",error:"white",text:"#000000",btnText:"#ffffff",bg:"#92C8E9"}},grey:{desc:"测试3",color:{active:"#17516e",error:"#9e0000",bg:"#cfcfcf",text:"#000000",btnText:"#ffffff"}}},E=me("theme",()=>{const n=k("vue"),w=localStorage.getItem("theme"),s=w?JSON.parse(w):null;s&&(n.value=s.name);let i=k({...F});function h(){const r=localStorage.getItem("custom-theme-list"),g=r?JSON.parse(r):{};i.value={...F,...g}}h();function t(r){if(!(r in i.value)){console.error(`要切换的主题${r}不存在`);return}const g=i.value[r];Object.entries(g.color).forEach(([v,d])=>{se(v,d)}),n.value=r;const b={...g,name:r};localStorage.setItem("theme",JSON.stringify(b))}return{changeTheme:t,refreshThemeList:h,themes:i,current:n}}),S=n=>(te("data-v-c095662c"),n=n(),oe(),n),Ge={class:"q-px-lg q-py-sm"},Pe=S(()=>e("div",{class:"text-h5 q-mb-xl"},"定制主题",-1)),He={class:"q-pa-md q-mt-lg row"},Me={class:"row q-gutter-lg justify-center"},Qe=S(()=>e("div",{class:"cn-word"},"示例",-1)),Xe=S(()=>e("div",{class:"en-word"},[e("code",null,"shili")],-1)),Ye=[Qe,Xe],Ze=S(()=>e("div",{class:"cn-word"},"示例",-1)),et=S(()=>e("div",{class:"en-word"},[e("code",null,"shili")],-1)),tt=[Ze,et],ot=S(()=>e("div",{class:"cn-word"},"示例",-1)),st={class:"en-word",style:{opacity:"0.5"}},lt=S(()=>e("code",{style:{"margin-left":"-2.5px"}},"shili",-1)),nt={class:"q-my-md row q-gutter-md justify-center"},ct=S(()=>e("div",null,"示例",-1)),at=S(()=>e("div",null,"shili",-1)),rt=S(()=>e("div",null,"示例",-1)),it=S(()=>e("div",null,"shili",-1)),dt=S(()=>e("div",null,"示例",-1)),ut=S(()=>e("div",null,"shili",-1)),mt={key:0,class:"checked-icon"},_t={class:"column q-gutter-lg col-4 color-choose"},vt={class:"row items-center"},ft={class:"row justify-start q-ml-lg q-mt-md btn-group"},pt=S(()=>e("div",{class:"text-h6"},"为该主题命名",-1)),ht=D({__name:"CustomTheme",setup(n){const{refreshThemeList:w}=E(),{current:s}=le(E()),i=_e(),h=localStorage.getItem("custom-theme")?JSON.parse(localStorage.getItem("custom-theme")):{active:"",error:"",bg:"",text:"",btnText:""},t=k({desc:"",color:h,name:"custom"});Object.keys(t.value.color).forEach(u=>{R(()=>t.value.color[u],q=>{q!==""&&d(u)})});const r={active:"#00aaff",error:"#ff0000",bg:"#ffffff",text:"#000000",btnText:"#ffffff"},g={active:"主题颜色",error:"错误颜色",bg:"背景颜色",text:"文字颜色",btnText:"按钮文字颜色"};function b(){localStorage.setItem("custom-theme",JSON.stringify(t.value.color)),i.notify({type:"positive",message:"当前主题已保存！",position:"bottom-right",timeout:2e3})}function v(){let u="";for(const[q,j]of Object.entries(t.value.color).reverse())j===""&&(u=q);return u?(l[u].classList.remove("shake"),l[u].offsetWidth,l[u].classList.add("shake"),i.notify({type:"negative",message:`请确定${g[u]}！`,position:"bottom-right",timeout:2e3})):localStorage.setItem("custom-theme",JSON.stringify(t.value.color)),!u}function d(u){l[u].classList.remove("shake")}const l={},C=(u,q)=>{u&&(l[q]=u)};function $(){v()&&(Object.entries(t.value.color).forEach(([u,q])=>{se(u,q)}),s.value=t.value.name,localStorage.setItem("theme",JSON.stringify(t.value)))}const p=k(!1),T=k("");function L(){v()&&(T.value="",p.value=!0)}const B=localStorage.getItem("custom-theme-list"),I=B?JSON.parse(B):{};function K(){_(T.value)&&(I[T.value]=t.value,localStorage.setItem("custom-theme-list",JSON.stringify(I)),i.notify({type:"positive",message:`已将主题 [${T.value}] 添加至主题列表中`,position:"bottom-right",timeout:2e3}),localStorage.removeItem("custom-theme"),t.value.color={active:"",error:"",bg:"",text:"",btnText:""},w(),s.value==="custom"&&(s.value=T.value),p.value=!1)}function _(u){return!(Object.keys(F).includes(u)||Object.keys(I).includes(u))}return(u,q)=>{const j=a("q-card"),H=a("q-icon"),ne=a("q-color"),ce=a("q-popup-proxy"),M=a("q-input"),O=a("q-btn"),Q=a("q-card-section"),ae=a("q-card-actions"),re=a("q-dialog"),ie=ve("close-popup");return y(),V(W,null,[e("div",Ge,[Pe,e("div",He,[e("div",{class:"col q-mx-lg q-pa-md example-container column justify-center",style:x(`background: ${t.value.color.bg};color: ${t.value.color.text}`)},[e("div",Me,[e("div",{class:"column items-center word-block",style:x(`color: ${t.value.color.active}`)},Ye,4),e("div",{class:"column items-center word-block",style:x(`color: ${t.value.color.error}`)},tt,4),e("div",{class:"column items-center word-block",style:x(`color: ${t.value.color.text}`)},[ot,e("div",st,[e("div",{class:"caret waiting",style:x(`background: ${t.value.color.active}`)},null,4),lt])],4)]),e("div",nt,[o(j,{class:"column justify-center items-center shadow-3",style:x(`color: ${t.value.color.btnText};background: ${t.value.color.active}`)},{default:c(()=>[ct,at]),_:1},8,["style"]),o(j,{class:"column justify-center items-center shadow-3",style:x(`color: ${t.value.color.btnText};background: ${t.value.color.error}`)},{default:c(()=>[rt,it]),_:1},8,["style"]),o(j,{class:"column justify-center items-center shadow-3",style:x(`color: ${t.value.color.text}; background: ${t.value.color.bg}`)},{default:c(()=>[dt,ut]),_:1},8,["style"])]),m(s)==="custom"?(y(),V("div",mt,[o(H,{name:"check_circle_outline",size:"3rem",class:"q-ma-sm"})])):A("",!0)],4),e("div",_t,[(y(!0),V(W,null,P(Object.keys(r),f=>(y(),V("div",vt,[o(fe,{name:"dot"},{default:c(()=>[t.value.color[f]?(y(),V("div",{key:0,class:"color-dot q-mr-sm",style:x(`background-color: ${t.value.color[f]}`)},null,4)):A("",!0)]),_:2},1024),e("div",{ref_for:!0,ref:N=>C(N,f)},[o(M,{"input-class":"theme-input",color:"active","label-color":"text",modelValue:t.value.color[f],"onUpdate:modelValue":N=>t.value.color[f]=N,label:g[f],outlined:""},{append:c(()=>[o(H,{name:"colorize",color:"text",class:"cursor-pointer"},{default:c(()=>[o(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:c(()=>[o(ne,{modelValue:t.value.color[f],"onUpdate:modelValue":N=>t.value.color[f]=N,"default-value":r[f],"no-header-tabs":""},null,8,["modelValue","onUpdate:modelValue","default-value"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","label"])],512)]))),256))])]),e("div",ft,[o(O,{onClick:b,class:"q-mr-sm q-ml-md",icon:"save",label:"保存",size:"16px",color:"active","text-color":"btnText",push:""}),o(O,{onClick:$,class:"q-mr-sm",icon:"check_circle",label:"应用",size:"16px",color:"active","text-color":"btnText",push:""}),o(O,{onClick:L,icon:"dashboard",label:"添加至主题列表",size:"16px",color:"active","text-color":"btnText",push:""})])]),o(re,{modelValue:p.value,"onUpdate:modelValue":q[2]||(q[2]=f=>p.value=f),persistent:""},{default:c(()=>[o(j,{style:{"min-width":"350px","background-color":"var(--q-bg)"}},{default:c(()=>[o(Q,null,{default:c(()=>[pt]),_:1}),o(Q,{class:"q-pt-none"},{default:c(()=>[o(M,{"input-class":"theme-input",color:"active",dense:"",modelValue:T.value,"onUpdate:modelValue":q[0]||(q[0]=f=>T.value=f),autofocus:"",onKeyup:q[1]||(q[1]=ee(f=>p.value=!1,["enter"])),rules:[f=>_(f)||"已存在该名称的主题！"]},null,8,["modelValue","rules"])]),_:1}),o(ae,{align:"right",class:"text-primary"},{default:c(()=>[pe(o(O,{color:"error",flat:"",label:"算了"},null,512),[[ie]]),o(O,{onClick:K,color:"active",flat:"",label:"确定"})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}}),gt=J(ht,[["__scopeId","data-v-c095662c"]]),bt={class:"q-px-lg q-py-md row q-gutter-lg"},qt=D({__name:"Setting",setup(n){const{isPhone:w}=G(),{changeTheme:s}=E(),{themes:i,current:h}=le(E()),t=k(w?30:20),r=k("通用");return(g,b)=>{const v=a("q-separator"),d=a("q-avatar"),l=a("q-tab-panel"),C=a("q-tab-panels"),$=a("q-splitter");return y(),V(W,null,[o(v,{color:"text"}),o($,{horizontal:m(w),modelValue:t.value,"onUpdate:modelValue":b[2]||(b[2]=p=>t.value=p),"separator-style":"background-color: var(--q-text)",style:{height:"calc(100vh - 170px)"}},{before:c(()=>[o($e,{modelValue:r.value,"onUpdate:modelValue":b[0]||(b[0]=p=>r.value=p)},null,8,["modelValue"])]),separator:c(()=>[o(d,{color:"active","text-color":"btnText",size:"40px",icon:"drag_indicator"})]),after:c(()=>[o(C,{modelValue:r.value,"onUpdate:modelValue":b[1]||(b[1]=p=>r.value=p),animated:"","transition-prev":"slide-down","transition-next":"slide-up","transition-duration":"500"},{default:c(()=>[o(l,{name:"通用"},{default:c(()=>[o(Fe)]),_:1}),o(l,{name:"切换主题"},{default:c(()=>[e("div",bt,[(y(!0),V(W,null,P(m(i),(p,T)=>(y(),Z(ye,{key:T,themeKey:T,value:p,current:m(h),changeTheme:m(s)},null,8,["themeKey","value","current","changeTheme"]))),128))])]),_:1}),o(l,{name:"自定义主题"},{default:c(()=>[o(gt)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["horizontal","modelValue"]),o(v,{color:"text"})],64)}}}),St=J(qt,[["__scopeId","data-v-c0b495b9"]]);export{St as default};