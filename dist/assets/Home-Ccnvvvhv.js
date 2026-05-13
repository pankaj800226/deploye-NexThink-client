import{c as z,j as e,a as re,g as Ee,b as Le,r as l,u as He,s as Q,d as G,e as ue,f as Te,m as ge,h as $e,i as _e,z as T,L as he,k as fe,l as Z}from"./index-C5Kzh6cw.js";import{u as ye,a as Be,i as xe,b as q,c as K}from"./Button-BAqlsFz9.js";import{A as ve}from"./ApiError-By9rD-W4.js";import{u as De,a as Ue,b as W,T as Oe}from"./TextField-D0GAxb7z.js";import{D as We}from"./Delete-CFOF1ljg.js";import"./index-CPhfH0m9.js";const Ye=z(e.jsx("path",{d:"M16.01 11H4v2h12.01v3L20 12l-3.99-4z"})),Je=z(e.jsx("path",{d:"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"})),Xe=z(e.jsx("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})),Ge=z(e.jsx("path",{d:"M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"})),qe=z(e.jsx("path",{d:"M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39z"})),Ke=z(e.jsx("path",{d:"M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V8h2z"})),Qe=z(e.jsx("path",{d:"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z"}));const Ze=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],en=re("bolt",Ze);const nn=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],tn=re("keyboard",nn);const an=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],sn=re("message-square",an),on={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},rn=z(e.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"})),ln=z(e.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}));function cn(n){return Le("MuiRating",n)}const O=Ee("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]);function dn(n){const t=n.toString().split(".")[1];return t?t.length:0}function oe(n,t){if(n==null)return n;const a=Math.round(n/t)*t;return Number(a.toFixed(dn(t)))}const pn=n=>{const{classes:t,size:a,readOnly:x,disabled:b,emptyValueFocused:u,focusVisible:s}=n,p={root:["root",`size${ue(a)}`,b&&"disabled",s&&"focusVisible",x&&"readOnly"],label:["label","pristine"],labelEmptyValue:[u&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return Te(p,cn,t)},fn=Q("span",{name:"MuiRating",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[{[`& .${O.visuallyHidden}`]:t.visuallyHidden},t.root,t[`size${ue(a.size)}`],a.readOnly&&t.readOnly]}})(ge(({theme:n})=>({display:"inline-flex",position:"relative",fontSize:n.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${O.disabled}`]:{opacity:(n.vars||n).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${O.focusVisible} .${O.iconActive}`]:{outline:"1px solid #999"},[`& .${O.visuallyHidden}`]:on,variants:[{props:{size:"small"},style:{fontSize:n.typography.pxToRem(18)}},{props:{size:"large"},style:{fontSize:n.typography.pxToRem(30)}},{props:({ownerState:t})=>t.readOnly,style:{pointerEvents:"none"}}]}))),we=Q("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:n},t)=>[t.label,n.emptyValueFocused&&t.labelEmptyValueActive]})({cursor:"inherit",variants:[{props:({ownerState:n})=>n.emptyValueFocused,style:{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"}}]}),xn=Q("span",{name:"MuiRating",slot:"Icon",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.icon,a.iconEmpty&&t.iconEmpty,a.iconFilled&&t.iconFilled,a.iconHover&&t.iconHover,a.iconFocus&&t.iconFocus,a.iconActive&&t.iconActive]}})(ge(({theme:n})=>({display:"flex",transition:n.transitions.create("transform",{duration:n.transitions.duration.shortest}),pointerEvents:"none",variants:[{props:({ownerState:t})=>t.iconActive,style:{transform:"scale(1.2)"}},{props:({ownerState:t})=>t.iconEmpty,style:{color:(n.vars||n).palette.action.disabled}}]}))),mn=Q("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:n=>$e(n)&&n!=="iconActive",overridesResolver:(n,t)=>{const{iconActive:a}=n;return[t.decimal,a&&t.iconActive]}})({position:"relative",variants:[{props:({iconActive:n})=>n,style:{transform:"scale(1.2)"}}]});function bn(n){const{value:t,...a}=n;return e.jsx("span",{...a})}function me(n){const{classes:t,disabled:a,emptyIcon:x,focus:b,getLabelText:u,highlightSelectedOnly:s,hover:p,icon:g,IconContainerComponent:h,isActive:f,itemValue:m,labelProps:k,name:c,onBlur:d,onChange:$,onClick:N,onFocus:o,readOnly:j,ownerState:C,ratingValue:y,ratingValueRounded:A,slots:ee={},slotProps:ne={}}=n,P=s?m===y:m<=y,_=m<=p,Y=m<=b,B=m===A,J=`${c}-${ye()}`,D={slots:ee,slotProps:ne},[I,te]=W("icon",{elementType:xn,className:G(t.icon,P?t.iconFilled:t.iconEmpty,_&&t.iconHover,Y&&t.iconFocus,f&&t.iconActive),externalForwardedProps:D,ownerState:{...C,iconEmpty:!P,iconFilled:P,iconHover:_,iconFocus:Y,iconActive:f},additionalProps:{value:m},internalForwardedProps:{as:h}}),[v,V]=W("label",{elementType:we,externalForwardedProps:D,ownerState:{...C,emptyValueFocused:void 0},additionalProps:{style:k?.style,htmlFor:J}}),F=e.jsx(I,{...te,children:x&&!P?x:g});return j?e.jsx("span",{...k,children:F}):e.jsxs(l.Fragment,{children:[e.jsxs(v,{...V,children:[F,e.jsx("span",{className:t.visuallyHidden,children:u(m)})]}),e.jsx("input",{className:t.visuallyHidden,onFocus:o,onBlur:d,onChange:$,onClick:N,disabled:a,value:m,id:J,type:"radio",name:c,checked:B})]})}const un=e.jsx(rn,{fontSize:"inherit"}),gn=e.jsx(ln,{fontSize:"inherit"});function hn(n){return`${n||"0"} Star${n!==1?"s":""}`}const be=l.forwardRef(function(t,a){const x=He({name:"MuiRating",props:t}),{component:b="span",className:u,defaultValue:s=null,disabled:p=!1,emptyIcon:g=gn,emptyLabelText:h="Empty",getLabelText:f=hn,highlightSelectedOnly:m=!1,icon:k=un,IconContainerComponent:c=bn,max:d=5,name:$,onChange:N,onChangeActive:o,onMouseLeave:j,onMouseMove:C,precision:y=1,readOnly:A=!1,size:ee="medium",value:ne,slots:P={},slotProps:_={},...Y}=x,B=ye($),[J,D]=De({controlled:ne,default:s,name:"Rating"}),I=oe(J,y),te=Ue(),[{hover:v,focus:V},F]=l.useState({hover:-1,focus:-1});let E=I;v!==-1&&(E=v),V!==-1&&(E=V);const[je,ae]=l.useState(!1),le=l.useRef(),ke=Be(le,a),Se=i=>{C&&C(i);const r=le.current,{right:w,left:X,width:L}=r.getBoundingClientRect();let H;te?H=(w-i.clientX)/L:H=(i.clientX-X)/L;let S=oe(d*H+y/2,y);S=_e(S,y,d),F(M=>M.hover===S&&M.focus===S?M:{hover:S,focus:S}),ae(!1),o&&v!==S&&o(i,S)},ze=i=>{j&&j(i);const r=-1;F({hover:r,focus:r}),o&&v!==r&&o(i,r)},ce=i=>{let r=i.target.value===""?null:parseFloat(i.target.value);v!==-1&&(r=v),D(r),N&&N(i,r)},Ne=i=>{i.clientX===0&&i.clientY===0||(F({hover:-1,focus:-1}),D(null),N&&parseFloat(i.target.value)===I&&N(i,null))},Fe=i=>{xe(i.target)&&ae(!0);const r=parseFloat(i.target.value);F(w=>({hover:w.hover,focus:r}))},Re=i=>{if(v!==-1)return;xe(i.target)||ae(!1);const r=-1;F(w=>({hover:w.hover,focus:r}))},[Ce,de]=l.useState(!1),U={...x,component:b,defaultValue:s,disabled:p,emptyIcon:g,emptyLabelText:h,emptyValueFocused:Ce,focusVisible:je,getLabelText:f,icon:k,IconContainerComponent:c,max:d,precision:y,readOnly:A,size:ee},R=pn(U),ie={slots:P,slotProps:_},[Ae,Pe]=W("root",{ref:ke,className:G(R.root,u),elementType:fn,externalForwardedProps:{...ie,...Y,component:b},getSlotProps:i=>({...i,onMouseMove:r=>{Se(r),i.onMouseMove?.(r)},onMouseLeave:r=>{ze(r),i.onMouseLeave?.(r)}}),ownerState:U,additionalProps:{role:A?"img":null,"aria-label":A?f(E):null}}),[Me,Ie]=W("label",{className:G(R.label,R.labelEmptyValue),elementType:we,externalForwardedProps:ie,ownerState:U}),[Ve,pe]=W("decimal",{className:R.decimal,elementType:mn,externalForwardedProps:ie,ownerState:U});return e.jsxs(Ae,{...Pe,children:[Array.from(new Array(d)).map((i,r)=>{const w=r+1,X={classes:R,disabled:p,emptyIcon:g,focus:V,getLabelText:f,highlightSelectedOnly:m,hover:v,icon:k,IconContainerComponent:c,name:B,onBlur:Re,onChange:ce,onClick:Ne,onFocus:Fe,ratingValue:E,ratingValueRounded:I,readOnly:A,ownerState:U,slots:P,slotProps:_},L=w===Math.ceil(E)&&(v!==-1||V!==-1);if(y<1){const H=Array.from(new Array(1/y));return l.createElement(Ve,{...pe,key:w,className:G(pe.className,L&&R.iconActive),iconActive:L},H.map((S,M)=>{const se=oe(w-1+(M+1)*y,y);return e.jsx(me,{...X,isActive:!1,itemValue:se,labelProps:{style:H.length-1===M?{}:{width:se===E?`${(M+1)*y*100}%`:"0%",overflow:"hidden",position:"absolute"}}},se)}))}return e.jsx(me,{...X,isActive:L,itemValue:w},w)}),!A&&!p&&e.jsxs(Me,{...Ie,children:[e.jsx("input",{className:R.visuallyHidden,value:"",id:`${B}-empty`,type:"radio",name:B,checked:I==null,onFocus:()=>de(!0),onBlur:()=>de(!1),onChange:ce}),e.jsx("span",{className:R.visuallyHidden,children:h})]})]})}),yn="/assets/one-BTJIon6V.png",vn="/assets/two-XzyhilJD.png",wn="/assets/three-BExiJACz.png",jn="/assets/four-B0RnhIqP.png",kn="/assets/five-Cw_09Nus.png",Sn=()=>{const n=Z.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsx("style",{children:`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Entrance animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(26px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Underline slide-in ── */
    @keyframes slideRight {
      from { width: 0%; }
      to   { width: 100%; }
    }

    /* ── Gradient text shimmer ── */
    @keyframes shimmerText {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    /* ── CTA shine sweep ── */
    @keyframes btnShine {
      0%       { left: -80%;  }
      60%,100% { left: 120%;  }
    }

    /* ── Progress bar fill ── */
    @keyframes progressFill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    /* ── Stagger helpers ── */
    .anim-badge    { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.05s; }
    .anim-title    { opacity:0; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.15s; }
    .anim-sub      { opacity:0; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.28s; }
    .anim-avs      { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.38s; }
    .anim-cta      { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.48s; }
    .anim-carousel { opacity:0; animation: fadeIn 0.7s  ease                      forwards; animation-delay:.58s; }

    /* ── Shimmer gradient text ── */
    .shimmer-text {
      background: linear-gradient(
        90deg,
        #1e1b4b 0%,
        #4f46e5 30%,
        #7c3aed 50%,
        #4f46e5 70%,
        #1e1b4b 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerText 4s linear infinite;
    }

    /* ── Animated underline under gradient text ── */
    .title-underline { position: relative; }
    .title-underline::after {
      content: '';
      position: absolute;
      bottom: -5px; left: 0;
      height: 3px; width: 0;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: slideRight 0.7s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .75s;
    }

    /* ── Badge pill ── */
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 16px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 13px;
      font-weight: 500;
      color: #4338ca;
      letter-spacing: .01em;
    }
    .badge-pill .live-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #4f46e5;
    }

    /* ── Primary CTA ── */
    .cta-btn {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 34px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(79,70,229,.32);
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(79,70,229,.40);
    }
    /* shine sweep */
    .cta-btn::after {
      content: '';
      position: absolute;
      top: 0; left: -80%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
      animation: btnShine 2.8s ease-in-out infinite;
      animation-delay: 1.2s;
    }

    /* ── Outline CTA ── */
    .cta-outline {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 13px 28px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #4f46e5;
      background: #fff;
      border: 1.5px solid #c7d2fe;
      cursor: pointer;
      text-decoration: none;
      transition: border-color .18s, background .18s;
    }
    .cta-outline:hover { border-color: #4f46e5; background: #f5f3ff; }

    /* ── Avatar ── */
    .av-img {
      border: 2.5px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,.10);
      transition: transform .18s;
    }
    .av-img:hover { transform: translateY(-4px); z-index: 10 !important; }

    /* ── Carousel nav btn ── */
    .nav-btn {
      width: 38px; height: 38px;
      border-radius: 10px;
      border: 1.5px solid #e5e7eb;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #374151;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
      transition: border-color .18s, background .18s, color .18s, transform .18s;
    }
    .nav-btn:hover {
      border-color: #4f46e5;
      background: #eef2ff;
      color: #4f46e5;
      transform: scale(1.07);
    }

    /* ── Dot indicators ── */
    .dot-btn {
      height: 6px;
      border-radius: 3px;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: width .32s ease, background .22s ease;
    }

    /* ── Progress bar ── */
    .progress-bar {
      height: 100%;
      width: 100%;
      transform-origin: left;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: progressFill 5s linear forwards;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .banner-inner  { padding: 90px 20px 60px !important; }
      .cta-row       { flex-direction: column !important; align-items: center !important; }
    }
  `}),n[0]=t):t=n[0],t},zn=()=>{const[n,t]=l.useState([]),[a,x]=l.useState(""),[b,u]=l.useState(!1),[s,p]=l.useState(0),[g,h]=l.useState(!1),f=[{id:1,image:yn,title:"Banner one"},{id:2,image:vn,title:"Feature"},{id:3,image:wn,title:"Daily Planner"},{id:4,image:jn,title:"Habbit Tracker"},{id:5,image:kn,title:"Focus Mode"}],m=l.useCallback(()=>p(c=>(c+1)%f.length),[f.length]),k=()=>p(c=>(c-1+f.length)%f.length);return l.useEffect(()=>{if(g)return;const c=setInterval(m,5e3);return()=>clearInterval(c)},[g,m]),l.useEffect(()=>{(async()=>{try{u(!0);const c=await q.get(`${K}/api/user/allUser`);t(c.data)}catch{T.error("Something went wrong"),x("Something went wrong")}finally{u(!1)}})()},[]),a?e.jsx(ve,{error:a}):b?e.jsx(he,{}):e.jsxs(e.Fragment,{children:[e.jsx(Sn,{}),e.jsxs("section",{style:{minHeight:"100vh",background:"#ffffff",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",fontFamily:"'Plus Jakarta Sans', sans-serif"},children:[e.jsx("div",{style:{position:"absolute",top:"-140px",left:"-140px",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle, rgba(79,70,229,.08) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",bottom:"-100px",right:"-100px",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsxs("div",{className:"banner-inner",style:{width:"100%",maxWidth:"860px",margin:"0 auto",padding:"110px 40px 80px",textAlign:"center",position:"relative",zIndex:1},children:[e.jsx("div",{className:"anim-badge",style:{display:"flex",justifyContent:"center",marginBottom:"22px"},children:e.jsxs("span",{className:"badge-pill",children:[e.jsx("span",{className:"live-dot"}),"Now in Public Beta — Free Forever"]})}),e.jsxs("h1",{className:"anim-title",style:{fontSize:"clamp(32px, 5.5vw, 64px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-0.03em",color:"#111827",marginBottom:"20px"},children:["Organize everything"," ",e.jsx("span",{className:"shimmer-text title-underline",children:"in one place"})]}),e.jsxs("p",{className:"anim-sub",style:{fontSize:"clamp(15px, 2vw, 18px)",color:"#6b7280",lineHeight:1.75,maxWidth:"520px",margin:"0 auto 32px",fontWeight:400},children:["Write, plan, and track — all in one distraction-free workspace."," ",e.jsx("strong",{style:{color:"#111827",fontWeight:600},children:"NextThink"})," ","keeps your tasks, notes, and projects in perfect order."]}),e.jsxs("div",{className:"anim-avs",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[n.slice(0,7).map((c,d)=>e.jsx("div",{className:"av-img",style:{width:"38px",height:"38px",borderRadius:"50%",backgroundImage:`url(${c?.avatar||"https://cdn-icons-png.flaticon.com/512/149/149071.png"})`,backgroundSize:"cover",backgroundPosition:"center",marginLeft:d!==0?"-10px":"0",position:"relative",zIndex:8-d}},c._id||d)),n.length>4&&e.jsxs("div",{style:{width:"38px",height:"38px",borderRadius:"50%",background:"#f3f4f6",border:"2.5px solid #fff",boxShadow:"0 2px 6px rgba(0,0,0,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:"#4f46e5",marginLeft:"-10px"},children:["+",n.length-4]})]}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{display:"flex",gap:"2px",marginBottom:"2px"},children:[...Array(5)].map((c,d)=>e.jsx("span",{style:{color:"#f59e0b",fontSize:"13px"},children:"★"},d))}),e.jsxs("span",{style:{fontSize:"13px",color:"#9ca3af"},children:["Trusted by"," ",e.jsxs("strong",{style:{color:"#374151"},children:[n.length,"+ users"]})]})]})]}),e.jsxs("div",{className:"anim-cta cta-row",style:{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"64px",flexWrap:"wrap"},children:[e.jsx(fe,{to:"/timechallaner",style:{textDecoration:"none"},children:e.jsxs("button",{className:"cta-btn",children:["Get Started Free",e.jsx(Ye,{style:{fontSize:20}})]})}),e.jsx(fe,{to:"/about",style:{textDecoration:"none"},children:e.jsx("button",{className:"cta-outline",children:"See how it works"})})]}),e.jsxs("div",{className:"anim-carousel",onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px",paddingInline:"2px"},children:[e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("span",{style:{fontSize:"11px",color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Feature preview"}),e.jsx("p",{style:{margin:0,fontSize:"14px",fontWeight:600,color:"#374151"},children:f[s].title})]}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{className:"nav-btn",onClick:k,"aria-label":"Previous",children:e.jsx(Je,{style:{fontSize:20}})}),e.jsx("button",{className:"nav-btn",onClick:m,"aria-label":"Next",children:e.jsx(Xe,{style:{fontSize:20}})})]})]}),e.jsxs("div",{style:{borderRadius:"16px",overflow:"hidden",boxShadow:"0 4px 6px rgba(0,0,0,.04), 0 20px 50px rgba(0,0,0,.09), 0 0 0 1px rgba(0,0,0,.05)",position:"relative",aspectRatio:"16/9",background:"#f9fafb"},children:[e.jsx("img",{src:f[s].image,alt:f[s].title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"opacity .35s ease"}},s),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,padding:"40px 20px 20px",background:"linear-gradient(to top, rgba(17,24,39,.78) 0%, transparent 100%)",textAlign:"left"},children:e.jsx("p",{style:{margin:"0 0 3px",fontSize:"17px",fontWeight:700,color:"#fff"},children:f[s].title})}),e.jsxs("div",{style:{position:"absolute",top:"14px",right:"14px",background:"rgba(255,255,255,.88)",backdropFilter:"blur(6px)",border:"1px solid rgba(0,0,0,.06)",borderRadius:"50px",padding:"3px 12px",fontSize:"12px",fontWeight:600,color:"#374151"},children:[s+1," / ",f.length]}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"3px",background:"rgba(255,255,255,.18)"},children:e.jsx("div",{className:"progress-bar",style:{animationDuration:g?"0s":"5s"}},`prog-${s}`)})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"6px",marginTop:"18px"},children:f.map((c,d)=>e.jsx("button",{className:"dot-btn",onClick:()=>p(d),"aria-label":`Go to slide ${d+1}`,style:{width:s===d?"28px":"6px",background:s===d?"#4f46e5":"#e5e7eb"}},d))})]})]})]})]})},Nn=()=>{const n=Z.c(8);let t;n[0]===Symbol.for("react.memo_cache_sentinel")?(t=[{icon:e.jsx(qe,{}),title:"Task Management",desc:"Organize your work with smart task lists, priorities, and completion tracking.",tag:"Productivity",gradient:"from-indigo-600 to-purple-600"},{icon:e.jsx(Ke,{}),title:"Focus Timer & Challenges",desc:"Stay focused with Pomodoro sessions and daily productivity challenges.",tag:"Focus",gradient:"from-sky-500 to-indigo-600"},{icon:e.jsx(Ge,{}),title:"Dashboard Analytics",desc:"Visualize your productivity with clean and detailed analytics.",tag:"Insights",gradient:"from-purple-600 to-indigo-500"},{icon:e.jsx(Qe,{}),title:"Habit Tracker",desc:"Build positive habits and track your progress with intuitive tracking.",tag:"Habits",gradient:"from-indigo-500 to-indigo-700"},{icon:e.jsx(en,{size:20}),title:"Smart Planner",desc:"Plan your schedule and stay ahead of your goals with ease.",tag:"Planning",gradient:"from-indigo-600 to-sky-500"},{icon:e.jsx(tn,{size:20}),title:"Keyboard Shortcuts",desc:"Navigate instantly using powerful command shortcuts (Ctrl + K).",tag:"Speed",gradient:"from-purple-600 to-indigo-600"}],n[0]=t):t=n[0];const a=t;let x;n[1]===Symbol.for("react.memo_cache_sentinel")?(x=e.jsxs("div",{className:"absolute inset-0 opacity-10",children:[e.jsx("div",{className:"absolute -top-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"}),e.jsx("div",{className:"absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"})]}),n[1]=x):x=n[1];let b,u;n[2]===Symbol.for("react.memo_cache_sentinel")?(b=e.jsxs("h1",{className:"text-4xl md:text-6xl font-extrabold tracking-tight",children:["Your All-in-One",e.jsxs("span",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",children:[" ","Productivity OS"]})]}),u=e.jsx("p",{className:"mt-6 text-lg text-slate-500 max-w-2xl mx-auto",children:"Manage tasks, build habits, stay focused, and track progress — all in one clean workspace designed for deep productivity."}),n[2]=b,n[3]=u):(b=n[2],u=n[3]);let s;n[4]===Symbol.for("react.memo_cache_sentinel")?(s=e.jsxs("section",{className:"relative overflow-hidden px-6 py-24 text-center",children:[x,b,u,e.jsxs("div",{className:"mt-10 flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx("button",{className:"px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition",children:"Get Started Free"}),e.jsx("button",{className:"px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:border-slate-400 transition",children:"View Dashboard"})]})]}),n[4]=s):s=n[4];let p;n[5]===Symbol.for("react.memo_cache_sentinel")?(p=e.jsxs("div",{className:"text-center mb-14",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold",children:"Everything You Need to Stay Productive"}),e.jsx("p",{className:"text-slate-500 mt-3",children:"A complete toolkit built for focus, clarity, and execution."})]}),n[5]=p):p=n[5];let g;n[6]===Symbol.for("react.memo_cache_sentinel")?(g=e.jsxs("section",{className:"px-6 py-20 max-w-6xl mx-auto",children:[p,e.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:a.map(Fn)})]}),n[6]=g):g=n[6];let h;return n[7]===Symbol.for("react.memo_cache_sentinel")?(h=e.jsxs("div",{className:"min-h-screen bg-white text-slate-900",children:[s,g,e.jsxs("section",{className:"px-6 py-24 text-center bg-gradient-to-b from-white to-indigo-50",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold",children:"Start Organizing Your Life Today"}),e.jsx("p",{className:"text-slate-500 mt-4 max-w-xl mx-auto",children:"Stop switching between apps. Bring everything into one powerful workspace."}),e.jsx("button",{className:"mt-8 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition",children:"Get Started Now"})]})]}),n[7]=h):h=n[7],h};function Fn(n,t){return e.jsxs("div",{className:"p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition hover:-translate-y-1",children:[e.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${n.gradient}`,children:n.icon}),e.jsx("h3",{className:"mt-4 font-bold text-lg",children:n.title}),e.jsx("p",{className:"text-sm text-slate-500 mt-2",children:n.desc}),e.jsx("span",{className:"inline-block mt-4 text-xs font-semibold text-indigo-600",children:n.tag})]},t)}const Rn=()=>{const n=Z.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsx("style",{children:`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Entrance ── */
    @keyframes fadeUpFb {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fadeInFb {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes shimmerFb {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes slideRightFb {
      from { width: 0%; }
      to   { width: 100%; }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── Section ── */
    .fb-section {
      background: #ffffff;
      padding: 90px 40px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .fb-section::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 120px; height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
    }

    /* ── Static blobs ── */
    .fb-blob-tl {
      position: absolute; top: -140px; left: -120px;
      width: 440px; height: 440px; border-radius: 50%;
      background: radial-gradient(circle, rgba(79,70,229,.07) 0%, transparent 70%);
      pointer-events: none;
    }
    .fb-blob-br {
      position: absolute; bottom: -100px; right: -100px;
      width: 360px; height: 360px; border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Heading block ── */
    .fb-heading-wrap {
      text-align: center;
      margin-bottom: 52px;
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .05s;
    }
    .fb-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 14px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 12px;
      font-weight: 600;
      color: #4338ca;
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .fb-title {
      font-size: clamp(26px, 4vw, 42px);
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin: 0 0 12px;
    }
    .fb-title-accent {
      background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #4f46e5 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerFb 4s linear infinite;
      position: relative;
      display: inline-block;
    }
    .fb-title-accent::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      height: 3px; width: 0;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: slideRightFb 0.7s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .65s;
    }
    .fb-subtitle {
      font-size: clamp(14px, 1.8vw, 17px);
      color: #6b7280;
      line-height: 1.7;
      max-width: 460px;
      margin: 0 auto;
    }

    /* ── Two-column layout ── */
    .fb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      max-width: 980px;
      margin: 0 auto;
      align-items: start;
    }
    @media (max-width: 860px) {
      .fb-grid     { grid-template-columns: 1fr; }
      .fb-section  { padding: 70px 24px; }
    }
    @media (max-width: 480px) {
      .fb-section  { padding: 60px 16px; }
    }

    /* ── Form card ── */
    .fb-form-card {
      background: #ffffff;
      border: 1.5px solid #f3f4f6;
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 30px rgba(0,0,0,.06);
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .18s;
    }

    .fb-form-label {
      font-size: 12px;
      font-weight: 700;
      color: #4f46e5;
      text-transform: uppercase;
      letter-spacing: .06em;
      margin-bottom: 8px;
    }
    .fb-form-title {
      font-size: clamp(20px, 2.5vw, 26px);
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.025em;
      margin: 0 0 6px;
    }
    .fb-form-sub {
      font-size: 14px;
      color: #9ca3af;
      margin: 0 0 28px;
    }

    /* ── Rating row ── */
    .fb-rating-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      margin-bottom: 16px;
    }
    .fb-rating-label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    /* ── Textarea box ── */
    .fb-textarea-wrap {
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 20px;
      transition: border-color .18s;
    }
    .fb-textarea-wrap:focus-within {
      border-color: #a5b4fc;
      background: #fff;
    }

    /* ── Submit button ── */
    .fb-submit-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(79,70,229,.30);
      transition: transform .18s ease, box-shadow .18s ease, opacity .18s;
      position: relative;
      overflow: hidden;
    }
    .fb-submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(79,70,229,.38);
    }
    .fb-submit-btn:disabled { opacity: .65; cursor: not-allowed; }

    /* ── Feed column ── */
    .fb-feed-card {
      background: #ffffff;
      border: 1.5px solid #f3f4f6;
      border-radius: 20px;
      padding: 24px 24px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 30px rgba(0,0,0,.06);
      display: flex;
      flex-direction: column;
      max-height: 540px;
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .28s;
    }

    .fb-feed-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .fb-feed-title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
    .fb-count-pill {
      padding: 4px 12px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 12px;
      font-weight: 600;
      color: #4338ca;
    }

    /* ── Scrollable list ── */
    .fb-list {
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-right: 4px;
    }
    .fb-list::-webkit-scrollbar { width: 4px; }
    .fb-list::-webkit-scrollbar-track { background: transparent; }
    .fb-list::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

    /* ── Review card ── */
    .fb-review {
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 16px;
      transition: border-color .18s, box-shadow .18s;
      animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
    }
    .fb-review:hover {
      border-color: #c7d2fe;
      box-shadow: 0 4px 16px rgba(79,70,229,.07);
    }

    .fb-review-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .fb-user-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .fb-avatar {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }
    .fb-username {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 2px;
    }

    /* ── Delete button ── */
    .fb-del-btn {
      width: 32px; height: 32px;
      border-radius: 8px;
      border: 1.5px solid #fee2e2;
      background: #fff5f5;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #ef4444;
      transition: background .18s, border-color .18s, transform .18s;
      flex-shrink: 0;
    }
    .fb-del-btn:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      transform: scale(1.08);
    }

    .fb-review-text {
      font-size: 13.5px;
      color: #6b7280;
      line-height: 1.65;
      margin: 0;
    }

    /* ── Empty state ── */
    .fb-empty {
      text-align: center;
      padding: 40px 20px;
      color: #9ca3af;
      font-size: 14px;
    }
    .fb-empty-icon {
      font-size: 32px;
      margin-bottom: 10px;
      opacity: .4;
    }
  `}),n[0]=t):t=n[0],t},Cn=()=>{const[n,t]=l.useState(0),[a,x]=l.useState(""),[b,u]=l.useState(!1),[s,p]=l.useState([]),[g,h]=l.useState(""),[f,m]=l.useState(!1),k=localStorage.getItem("USERID"),c=localStorage.getItem("TOKEN"),d=async()=>{try{m(!0);const o=await q.get(`${K}/api/feedback/get/feedbacks`);p(o.data.feedbacks)}catch{h("Failed to fetch feedbacks")}finally{m(!1)}};l.useEffect(()=>{d()},[]);const $=async()=>{if(!a||!n)return T.error("Please provide both feedback and rating.");try{u(!0),await q.post(`${K}/api/feedback/create/feedback`,{feedback:a,rating:n},{headers:{Authorization:`Bearer ${c}`}}),T.success("Feedback submitted!"),x(""),t(0),d()}catch{T.error("Submission failed.")}finally{u(!1)}},N=async o=>{try{await q.delete(`${K}/api/feedback/delete/feedback/${o}`,{headers:{Authorization:`Bearer ${c}`}}),T.success("Deleted!"),p(j=>j.filter(C=>C._id!==o))}catch{T.error("Delete failed.")}};return g?e.jsx(ve,{error:g}):f?e.jsx(he,{}):e.jsxs(e.Fragment,{children:[e.jsx(Rn,{}),e.jsxs("section",{className:"fb-section",children:[e.jsx("div",{className:"fb-blob-tl"}),e.jsx("div",{className:"fb-blob-br"}),e.jsxs("div",{className:"fb-heading-wrap",children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"16px"},children:e.jsx("span",{className:"fb-eyebrow",children:"✦ Community"})}),e.jsxs("h2",{className:"fb-title",children:["What Our Users"," ",e.jsx("span",{className:"fb-title-accent",children:"Are Saying"})]}),e.jsx("p",{className:"fb-subtitle",children:"Your thoughts directly shape our roadmap. Share what you love or what we can do better."})]}),e.jsxs("div",{className:"fb-grid",children:[e.jsxs("div",{className:"fb-form-card",children:[e.jsx("p",{className:"fb-form-label",children:"✦ Write a Review"}),e.jsx("h3",{className:"fb-form-title",children:"Help us improve."}),e.jsx("p",{className:"fb-form-sub",children:"Your feedback shapes our next release."}),e.jsxs("div",{className:"fb-rating-row",children:[e.jsx("span",{className:"fb-rating-label",children:"Overall Experience"}),e.jsx(be,{value:n,onChange:(o,j)=>t(j),size:"large",sx:{color:"#4f46e5"}})]}),e.jsx("div",{className:"fb-textarea-wrap",children:e.jsx(Oe,{placeholder:"What features would you like to see next?",multiline:!0,rows:5,value:a,onChange:o=>x(o.target.value),fullWidth:!0,variant:"standard",InputProps:{disableUnderline:!0},sx:{"& textarea":{fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.65},"& textarea::placeholder":{color:"#9ca3af"}}})}),e.jsxs("button",{className:"fb-submit-btn",onClick:$,disabled:b,children:[e.jsx(sn,{size:17}),b?"Sending...":"Submit Review"]})]}),e.jsxs("div",{className:"fb-feed-card",children:[e.jsxs("div",{className:"fb-feed-top",children:[e.jsx("h3",{className:"fb-feed-title",children:"Community Wall"}),e.jsxs("span",{className:"fb-count-pill",children:[s.length," Reviews"]})]}),e.jsx("div",{className:"fb-list",children:s.length===0?e.jsxs("div",{className:"fb-empty",children:[e.jsx("div",{className:"fb-empty-icon",children:"💬"}),e.jsx("p",{children:"No reviews yet. Be the first!"})]}):s.map((o,j)=>e.jsxs("div",{className:"fb-review",style:{animationDelay:`${.05*j}s`},children:[e.jsxs("div",{className:"fb-review-header",children:[e.jsxs("div",{className:"fb-user-row",children:[e.jsx("div",{className:"fb-avatar",children:o.userId.username.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("p",{className:"fb-username",children:o.userId.username}),e.jsx(be,{value:o.rating,readOnly:!0,size:"small",sx:{color:"#f59e0b",fontSize:"14px"}})]})]}),o.userId._id===k&&e.jsx("button",{className:"fb-del-btn",onClick:()=>N(o._id),"aria-label":"Delete review",children:e.jsx(We,{style:{fontSize:16}})})]}),e.jsx("p",{className:"fb-review-text",children:o.feedback})]},o._id))})]})]})]})]})},Ln=()=>{const n=Z.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsxs("div",{children:[e.jsx(zn,{}),e.jsx(Nn,{}),e.jsx(Cn,{})]}),n[0]=t):t=n[0],t};export{Ln as default};
