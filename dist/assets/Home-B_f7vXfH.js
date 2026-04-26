import{c as z,j as e,a as re,g as Ve,b as Ee,r as c,u as Le,s as Z,d as G,e as be,f as He,m as ge,h as _e,i as $e,z as H,L as he,k as fe,l as Y}from"./index-D1d2hExM.js";import{u as ye,a as Ue,i as me,b as K,c as Q}from"./Button-Cq4D5WZc.js";import{A as ve}from"./ApiError-B0SVJbMa.js";import{u as Be,a as De,b as O,T as We}from"./TextField-a_j3tlpg.js";import{D as Oe}from"./Delete-CTB_jkXR.js";import"./index-BeioXqBv.js";const Ye=z(e.jsx("path",{d:"M16.01 11H4v2h12.01v3L20 12l-3.99-4z"})),Je=z(e.jsx("path",{d:"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"})),Xe=z(e.jsx("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})),qe=z(e.jsx("path",{d:"M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"})),Ge=z(e.jsx("path",{d:"M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39z"})),Ke=z(e.jsx("path",{d:"M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V8h2z"})),Qe=z(e.jsx("path",{d:"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z"}));const Ze=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],en=re("bolt",Ze);const nn=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],tn=re("keyboard",nn);const an=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],on=re("message-square",an),sn={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},rn=z(e.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"})),ln=z(e.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}));function cn(n){return Ee("MuiRating",n)}const W=Ve("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]);function dn(n){const t=n.toString().split(".")[1];return t?t.length:0}function se(n,t){if(n==null)return n;const a=Math.round(n/t)*t;return Number(a.toFixed(dn(t)))}const pn=n=>{const{classes:t,size:a,readOnly:m,disabled:u,emptyValueFocused:h,focusVisible:o}=n,f={root:["root",`size${be(a)}`,u&&"disabled",o&&"focusVisible",m&&"readOnly"],label:["label","pristine"],labelEmptyValue:[h&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return He(f,cn,t)},fn=Z("span",{name:"MuiRating",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[{[`& .${W.visuallyHidden}`]:t.visuallyHidden},t.root,t[`size${be(a.size)}`],a.readOnly&&t.readOnly]}})(ge(({theme:n})=>({display:"inline-flex",position:"relative",fontSize:n.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${W.disabled}`]:{opacity:(n.vars||n).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${W.focusVisible} .${W.iconActive}`]:{outline:"1px solid #999"},[`& .${W.visuallyHidden}`]:sn,variants:[{props:{size:"small"},style:{fontSize:n.typography.pxToRem(18)}},{props:{size:"large"},style:{fontSize:n.typography.pxToRem(30)}},{props:({ownerState:t})=>t.readOnly,style:{pointerEvents:"none"}}]}))),we=Z("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:n},t)=>[t.label,n.emptyValueFocused&&t.labelEmptyValueActive]})({cursor:"inherit",variants:[{props:({ownerState:n})=>n.emptyValueFocused,style:{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"}}]}),mn=Z("span",{name:"MuiRating",slot:"Icon",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.icon,a.iconEmpty&&t.iconEmpty,a.iconFilled&&t.iconFilled,a.iconHover&&t.iconHover,a.iconFocus&&t.iconFocus,a.iconActive&&t.iconActive]}})(ge(({theme:n})=>({display:"flex",transition:n.transitions.create("transform",{duration:n.transitions.duration.shortest}),pointerEvents:"none",variants:[{props:({ownerState:t})=>t.iconActive,style:{transform:"scale(1.2)"}},{props:({ownerState:t})=>t.iconEmpty,style:{color:(n.vars||n).palette.action.disabled}}]}))),xn=Z("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:n=>_e(n)&&n!=="iconActive",overridesResolver:(n,t)=>{const{iconActive:a}=n;return[t.decimal,a&&t.iconActive]}})({position:"relative",variants:[{props:({iconActive:n})=>n,style:{transform:"scale(1.2)"}}]});function un(n){const{value:t,...a}=n;return e.jsx("span",{...a})}function xe(n){const{classes:t,disabled:a,emptyIcon:m,focus:u,getLabelText:h,highlightSelectedOnly:o,hover:f,icon:b,IconContainerComponent:g,isActive:s,itemValue:x,labelProps:j,name:d,onBlur:p,onChange:_,onClick:N,onFocus:r,readOnly:k,ownerState:C,ratingValue:y,ratingValueRounded:A,slots:ee={},slotProps:ne={}}=n,P=o?x===y:x<=y,$=x<=f,J=x<=u,U=x===A,X=`${d}-${ye()}`,B={slots:ee,slotProps:ne},[I,te]=O("icon",{elementType:mn,className:G(t.icon,P?t.iconFilled:t.iconEmpty,$&&t.iconHover,J&&t.iconFocus,s&&t.iconActive),externalForwardedProps:B,ownerState:{...C,iconEmpty:!P,iconFilled:P,iconHover:$,iconFocus:J,iconActive:s},additionalProps:{value:x},internalForwardedProps:{as:g}}),[v,T]=O("label",{elementType:we,externalForwardedProps:B,ownerState:{...C,emptyValueFocused:void 0},additionalProps:{style:j?.style,htmlFor:X}}),F=e.jsx(I,{...te,children:m&&!P?m:b});return k?e.jsx("span",{...j,children:F}):e.jsxs(c.Fragment,{children:[e.jsxs(v,{...T,children:[F,e.jsx("span",{className:t.visuallyHidden,children:h(x)})]}),e.jsx("input",{className:t.visuallyHidden,onFocus:r,onBlur:p,onChange:_,onClick:N,disabled:a,value:x,id:X,type:"radio",name:d,checked:U})]})}const bn=e.jsx(rn,{fontSize:"inherit"}),gn=e.jsx(ln,{fontSize:"inherit"});function hn(n){return`${n||"0"} Star${n!==1?"s":""}`}const ue=c.forwardRef(function(t,a){const m=Le({name:"MuiRating",props:t}),{component:u="span",className:h,defaultValue:o=null,disabled:f=!1,emptyIcon:b=gn,emptyLabelText:g="Empty",getLabelText:s=hn,highlightSelectedOnly:x=!1,icon:j=bn,IconContainerComponent:d=un,max:p=5,name:_,onChange:N,onChangeActive:r,onMouseLeave:k,onMouseMove:C,precision:y=1,readOnly:A=!1,size:ee="medium",value:ne,slots:P={},slotProps:$={},...J}=m,U=ye(_),[X,B]=Be({controlled:ne,default:o,name:"Rating"}),I=se(X,y),te=De(),[{hover:v,focus:T},F]=c.useState({hover:-1,focus:-1});let V=I;v!==-1&&(V=v),T!==-1&&(V=T);const[ke,ae]=c.useState(!1),le=c.useRef(),je=Ue(le,a),Se=i=>{C&&C(i);const l=le.current,{right:w,left:q,width:E}=l.getBoundingClientRect();let L;te?L=(w-i.clientX)/E:L=(i.clientX-q)/E;let S=se(p*L+y/2,y);S=$e(S,y,p),F(M=>M.hover===S&&M.focus===S?M:{hover:S,focus:S}),ae(!1),r&&v!==S&&r(i,S)},ze=i=>{k&&k(i);const l=-1;F({hover:l,focus:l}),r&&v!==l&&r(i,l)},ce=i=>{let l=i.target.value===""?null:parseFloat(i.target.value);v!==-1&&(l=v),B(l),N&&N(i,l)},Ne=i=>{i.clientX===0&&i.clientY===0||(F({hover:-1,focus:-1}),B(null),N&&parseFloat(i.target.value)===I&&N(i,null))},Fe=i=>{me(i.target)&&ae(!0);const l=parseFloat(i.target.value);F(w=>({hover:w.hover,focus:l}))},Re=i=>{if(v!==-1)return;me(i.target)||ae(!1);const l=-1;F(w=>({hover:w.hover,focus:l}))},[Ce,de]=c.useState(!1),D={...m,component:u,defaultValue:o,disabled:f,emptyIcon:b,emptyLabelText:g,emptyValueFocused:Ce,focusVisible:ke,getLabelText:s,icon:j,IconContainerComponent:d,max:p,precision:y,readOnly:A,size:ee},R=pn(D),ie={slots:P,slotProps:$},[Ae,Pe]=O("root",{ref:je,className:G(R.root,h),elementType:fn,externalForwardedProps:{...ie,...J,component:u},getSlotProps:i=>({...i,onMouseMove:l=>{Se(l),i.onMouseMove?.(l)},onMouseLeave:l=>{ze(l),i.onMouseLeave?.(l)}}),ownerState:D,additionalProps:{role:A?"img":null,"aria-label":A?s(V):null}}),[Me,Ie]=O("label",{className:G(R.label,R.labelEmptyValue),elementType:we,externalForwardedProps:ie,ownerState:D}),[Te,pe]=O("decimal",{className:R.decimal,elementType:xn,externalForwardedProps:ie,ownerState:D});return e.jsxs(Ae,{...Pe,children:[Array.from(new Array(p)).map((i,l)=>{const w=l+1,q={classes:R,disabled:f,emptyIcon:b,focus:T,getLabelText:s,highlightSelectedOnly:x,hover:v,icon:j,IconContainerComponent:d,name:U,onBlur:Re,onChange:ce,onClick:Ne,onFocus:Fe,ratingValue:V,ratingValueRounded:I,readOnly:A,ownerState:D,slots:P,slotProps:$},E=w===Math.ceil(V)&&(v!==-1||T!==-1);if(y<1){const L=Array.from(new Array(1/y));return c.createElement(Te,{...pe,key:w,className:G(pe.className,E&&R.iconActive),iconActive:E},L.map((S,M)=>{const oe=se(w-1+(M+1)*y,y);return e.jsx(xe,{...q,isActive:!1,itemValue:oe,labelProps:{style:L.length-1===M?{}:{width:oe===V?`${(M+1)*y*100}%`:"0%",overflow:"hidden",position:"absolute"}}},oe)}))}return e.jsx(xe,{...q,isActive:E,itemValue:w},w)}),!A&&!f&&e.jsxs(Me,{...Ie,children:[e.jsx("input",{className:R.visuallyHidden,value:"",id:`${U}-empty`,type:"radio",name:U,checked:I==null,onFocus:()=>de(!0),onBlur:()=>de(!1),onChange:ce}),e.jsx("span",{className:R.visuallyHidden,children:g})]})]})}),yn="/assets/one-BTJIon6V.png",vn="/assets/two-XzyhilJD.png",wn="/assets/three-BExiJACz.png",kn="/assets/four-B0RnhIqP.png",jn="/assets/five-Cw_09Nus.png",Sn=()=>{const n=Y.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsx("style",{children:`
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
  `}),n[0]=t):t=n[0],t},zn=()=>{const[n,t]=c.useState([]),[a,m]=c.useState(""),[u,h]=c.useState(!1),[o,f]=c.useState(0),[b,g]=c.useState(!1),s=[{id:1,image:yn,title:"Banner one"},{id:2,image:vn,title:"Feature"},{id:3,image:wn,title:"Daily Planner"},{id:4,image:kn,title:"Habbit Tracker"},{id:5,image:jn,title:"Focus Mode"}],x=c.useCallback(()=>f(d=>(d+1)%s.length),[s.length]),j=()=>f(d=>(d-1+s.length)%s.length);return c.useEffect(()=>{if(b)return;const d=setInterval(x,5e3);return()=>clearInterval(d)},[b,x]),c.useEffect(()=>{(async()=>{try{h(!0);const d=await K.get(`${Q}/api/user/allUser`);t(d.data)}catch{H.error("Something went wrong"),m("Something went wrong")}finally{h(!1)}})()},[]),a?e.jsx(ve,{error:a}):u?e.jsx(he,{}):e.jsxs(e.Fragment,{children:[e.jsx(Sn,{}),e.jsxs("section",{style:{minHeight:"100vh",background:"#ffffff",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",fontFamily:"'Plus Jakarta Sans', sans-serif"},children:[e.jsx("div",{style:{position:"absolute",top:"-140px",left:"-140px",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle, rgba(79,70,229,.08) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",bottom:"-100px",right:"-100px",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsxs("div",{className:"banner-inner",style:{width:"100%",maxWidth:"860px",margin:"0 auto",padding:"110px 40px 80px",textAlign:"center",position:"relative",zIndex:1},children:[e.jsx("div",{className:"anim-badge",style:{display:"flex",justifyContent:"center",marginBottom:"22px"},children:e.jsxs("span",{className:"badge-pill",children:[e.jsx("span",{className:"live-dot"}),"Now in Public Beta — Free Forever"]})}),e.jsxs("h1",{className:"anim-title",style:{fontSize:"clamp(32px, 5.5vw, 64px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-0.03em",color:"#111827",marginBottom:"20px"},children:["Organize everything"," ",e.jsx("span",{className:"shimmer-text title-underline",children:"in one place"})]}),e.jsxs("p",{className:"anim-sub",style:{fontSize:"clamp(15px, 2vw, 18px)",color:"#6b7280",lineHeight:1.75,maxWidth:"520px",margin:"0 auto 32px",fontWeight:400},children:["Write, plan, and track — all in one distraction-free workspace."," ",e.jsx("strong",{style:{color:"#111827",fontWeight:600},children:"NextThink"})," ","keeps your tasks, notes, and projects in perfect order."]}),e.jsxs("div",{className:"anim-avs",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[n.slice(0,7).map((d,p)=>e.jsx("div",{className:"av-img",style:{width:"38px",height:"38px",borderRadius:"50%",backgroundImage:`url(${d?.avatar||"https://cdn-icons-png.flaticon.com/512/149/149071.png"})`,backgroundSize:"cover",backgroundPosition:"center",marginLeft:p!==0?"-10px":"0",position:"relative",zIndex:8-p}},d._id||p)),n.length>4&&e.jsxs("div",{style:{width:"38px",height:"38px",borderRadius:"50%",background:"#f3f4f6",border:"2.5px solid #fff",boxShadow:"0 2px 6px rgba(0,0,0,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:"#4f46e5",marginLeft:"-10px"},children:["+",n.length-4]})]}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{display:"flex",gap:"2px",marginBottom:"2px"},children:[...Array(5)].map((d,p)=>e.jsx("span",{style:{color:"#f59e0b",fontSize:"13px"},children:"★"},p))}),e.jsxs("span",{style:{fontSize:"13px",color:"#9ca3af"},children:["Trusted by"," ",e.jsxs("strong",{style:{color:"#374151"},children:[n.length,"+ users"]})]})]})]}),e.jsxs("div",{className:"anim-cta cta-row",style:{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"64px",flexWrap:"wrap"},children:[e.jsx(fe,{to:"/dashboard",style:{textDecoration:"none"},children:e.jsxs("button",{className:"cta-btn",children:["Get Started Free",e.jsx(Ye,{style:{fontSize:20}})]})}),e.jsx(fe,{to:"/about",style:{textDecoration:"none"},children:e.jsx("button",{className:"cta-outline",children:"See how it works"})})]}),e.jsxs("div",{className:"anim-carousel",onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px",paddingInline:"2px"},children:[e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("span",{style:{fontSize:"11px",color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Feature preview"}),e.jsx("p",{style:{margin:0,fontSize:"14px",fontWeight:600,color:"#374151"},children:s[o].title})]}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{className:"nav-btn",onClick:j,"aria-label":"Previous",children:e.jsx(Je,{style:{fontSize:20}})}),e.jsx("button",{className:"nav-btn",onClick:x,"aria-label":"Next",children:e.jsx(Xe,{style:{fontSize:20}})})]})]}),e.jsxs("div",{style:{borderRadius:"16px",overflow:"hidden",boxShadow:"0 4px 6px rgba(0,0,0,.04), 0 20px 50px rgba(0,0,0,.09), 0 0 0 1px rgba(0,0,0,.05)",position:"relative",aspectRatio:"16/9",background:"#f9fafb"},children:[e.jsx("img",{src:s[o].image,alt:s[o].title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"opacity .35s ease"}},o),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,padding:"40px 20px 20px",background:"linear-gradient(to top, rgba(17,24,39,.78) 0%, transparent 100%)",textAlign:"left"},children:e.jsx("p",{style:{margin:"0 0 3px",fontSize:"17px",fontWeight:700,color:"#fff"},children:s[o].title})}),e.jsxs("div",{style:{position:"absolute",top:"14px",right:"14px",background:"rgba(255,255,255,.88)",backdropFilter:"blur(6px)",border:"1px solid rgba(0,0,0,.06)",borderRadius:"50px",padding:"3px 12px",fontSize:"12px",fontWeight:600,color:"#374151"},children:[o+1," / ",s.length]}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"3px",background:"rgba(255,255,255,.18)"},children:e.jsx("div",{className:"progress-bar",style:{animationDuration:b?"0s":"5s"}},`prog-${o}`)})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"6px",marginTop:"18px"},children:s.map((d,p)=>e.jsx("button",{className:"dot-btn",onClick:()=>f(p),"aria-label":`Go to slide ${p+1}`,style:{width:o===p?"28px":"6px",background:o===p?"#4f46e5":"#e5e7eb"}},p))})]})]})]})]})},Nn=()=>{const n=Y.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsx("style",{children:`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @keyframes fadeUpFeature {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    @keyframes iconShimmer {
      0%   { background-position: 0% 50%;   }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%;   }
    }

    @keyframes slideRightFeat {
      from { width: 0%;   }
      to   { width: 100%; }
    }

    .animate-fadeUp {
      animation: fadeUpFeature 0.6s cubic-bezier(.22,1,.36,1) forwards;
    }
    .animate-slideRight {
      animation: slideRightFeat 0.8s cubic-bezier(.22,1,.36,1) forwards;
    }
    .animate-iconShimmer {
      animation: iconShimmer 4s linear infinite;
      background-size: 200% auto;
    }
  `}),n[0]=t):t=n[0],t},Fn=()=>{const n=Y.c(9);let t;n[0]===Symbol.for("react.memo_cache_sentinel")?(t={icon:e.jsx(Ge,{sx:{fontSize:22}}),title:"Task Management",gradientTailwind:"from-indigo-600 to-purple-600",des:"Organize your work with smart task lists, priorities, and completion tracking.",tag:"Productivity"},n[0]=t):t=n[0];let a;n[1]===Symbol.for("react.memo_cache_sentinel")?(a={icon:e.jsx(Ke,{sx:{fontSize:22}}),title:"Focus Timer & Challenges",gradientTailwind:"from-sky-500 to-indigo-600",des:"Stay focused with Pomodoro sessions and daily productivity challenges.",tag:"Focus"},n[1]=a):a=n[1];let m;n[2]===Symbol.for("react.memo_cache_sentinel")?(m={icon:e.jsx(qe,{sx:{fontSize:22}}),title:"Dashboard Analytics",gradientTailwind:"from-purple-600 to-purple-500",des:"Visualize your productivity with clean and detailed analytics.",tag:"Insights"},n[2]=m):m=n[2];let u;n[3]===Symbol.for("react.memo_cache_sentinel")?(u=[t,a,m,{icon:e.jsx(Qe,{sx:{fontSize:22}}),title:"Habit Tracker",gradientTailwind:"from-indigo-500 to-indigo-600",des:"Build positive habits and track your progress with our intuitive habit tracker.",tag:"Habits"},{icon:e.jsx(en,{size:22}),title:"Your Planner",gradientTailwind:"from-indigo-600 to-sky-500",des:"Create and manage your planners with ease and stay ahead of your schedule.",tag:"Planning"},{icon:e.jsx(tn,{size:22}),title:"Keyboard Navigation",gradientTailwind:"from-purple-600 to-indigo-600",des:"Navigate instantly using Ctrl + K command palette and productivity shortcuts.",tag:"Shortcuts"}],n[3]=u):u=n[3];const h=u;let o;n[4]===Symbol.for("react.memo_cache_sentinel")?(o=e.jsx(Nn,{}),n[4]=o):o=n[4];let f;n[5]===Symbol.for("react.memo_cache_sentinel")?(f=e.jsxs("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",children:[e.jsx("div",{className:"absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]"}),e.jsx("div",{className:"absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px]"})]}),n[5]=f):f=n[5];let b;n[6]===Symbol.for("react.memo_cache_sentinel")?(b=e.jsx("span",{className:"inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-6",children:"✦ Features"}),n[6]=b):b=n[6];let g;n[7]===Symbol.for("react.memo_cache_sentinel")?(g=e.jsxs("div",{className:"text-center mb-16 opacity-0 animate-fadeUp [animation-fill-mode:forwards]",children:[b,e.jsxs("h2",{className:"text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6",children:["Everything You Need to"," ",e.jsxs("span",{className:"relative inline-block",children:[e.jsx("span",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-iconShimmer",children:"Stay Productive"}),e.jsx("span",{className:"absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-slideRight [animation-delay:0.5s]"})]})]}),e.jsx("p",{className:"text-gray-500 max-w-lg mx-auto text-lg leading-relaxed",children:"A complete toolkit built for focused work — tasks, habits, timers, and analytics in one clean workspace."})]}),n[7]=g):g=n[7];let s;return n[8]===Symbol.for("react.memo_cache_sentinel")?(s=e.jsxs(e.Fragment,{children:[o,e.jsxs("section",{className:"bg-white py-24 px-5 md:px-8 lg:px-10 font-['Plus_Jakarta_Sans'] relative overflow-hidden",children:[f,g,e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto",children:h.map(Rn)})]})]}),n[8]=s):s=n[8],s};function Rn(n,t){return e.jsxs("div",{className:"group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-100 cursor-default opacity-0 animate-fadeUp [animation-fill-mode:forwards]",style:{animationDelay:`${.1+t*.1}s`},children:[e.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${n.gradientTailwind} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`,children:n.icon}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-lg font-bold text-slate-800 tracking-tight",children:n.title}),e.jsx("p",{className:"text-sm text-slate-500 leading-relaxed",children:n.des})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0",children:[e.jsx("span",{children:n.tag}),e.jsx("svg",{className:"w-3 h-3 transition-transform group-hover:translate-x-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7l5 5m0 0l-5 5m5-5H6"})})]})]},t)}const Cn=()=>{const n=Y.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsx("style",{children:`
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
  `}),n[0]=t):t=n[0],t},An=()=>{const[n,t]=c.useState(0),[a,m]=c.useState(""),[u,h]=c.useState(!1),[o,f]=c.useState([]),[b,g]=c.useState(""),[s,x]=c.useState(!1),j=localStorage.getItem("USERID"),d=localStorage.getItem("TOKEN"),p=async()=>{try{x(!0);const r=await K.get(`${Q}/api/feedback/get/feedbacks`);f(r.data.feedbacks)}catch{g("Failed to fetch feedbacks")}finally{x(!1)}};c.useEffect(()=>{p()},[]);const _=async()=>{if(!a||!n)return H.error("Please provide both feedback and rating.");try{h(!0),await K.post(`${Q}/api/feedback/create/feedback`,{feedback:a,rating:n},{headers:{Authorization:`Bearer ${d}`}}),H.success("Feedback submitted!"),m(""),t(0),p()}catch{H.error("Submission failed.")}finally{h(!1)}},N=async r=>{try{await K.delete(`${Q}/api/feedback/delete/feedback/${r}`,{headers:{Authorization:`Bearer ${d}`}}),H.success("Deleted!"),f(k=>k.filter(C=>C._id!==r))}catch{H.error("Delete failed.")}};return b?e.jsx(ve,{error:b}):s?e.jsx(he,{}):e.jsxs(e.Fragment,{children:[e.jsx(Cn,{}),e.jsxs("section",{className:"fb-section",children:[e.jsx("div",{className:"fb-blob-tl"}),e.jsx("div",{className:"fb-blob-br"}),e.jsxs("div",{className:"fb-heading-wrap",children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"16px"},children:e.jsx("span",{className:"fb-eyebrow",children:"✦ Community"})}),e.jsxs("h2",{className:"fb-title",children:["What Our Users"," ",e.jsx("span",{className:"fb-title-accent",children:"Are Saying"})]}),e.jsx("p",{className:"fb-subtitle",children:"Your thoughts directly shape our roadmap. Share what you love or what we can do better."})]}),e.jsxs("div",{className:"fb-grid",children:[e.jsxs("div",{className:"fb-form-card",children:[e.jsx("p",{className:"fb-form-label",children:"✦ Write a Review"}),e.jsx("h3",{className:"fb-form-title",children:"Help us improve."}),e.jsx("p",{className:"fb-form-sub",children:"Your feedback shapes our next release."}),e.jsxs("div",{className:"fb-rating-row",children:[e.jsx("span",{className:"fb-rating-label",children:"Overall Experience"}),e.jsx(ue,{value:n,onChange:(r,k)=>t(k),size:"large",sx:{color:"#4f46e5"}})]}),e.jsx("div",{className:"fb-textarea-wrap",children:e.jsx(We,{placeholder:"What features would you like to see next?",multiline:!0,rows:5,value:a,onChange:r=>m(r.target.value),fullWidth:!0,variant:"standard",InputProps:{disableUnderline:!0},sx:{"& textarea":{fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.65},"& textarea::placeholder":{color:"#9ca3af"}}})}),e.jsxs("button",{className:"fb-submit-btn",onClick:_,disabled:u,children:[e.jsx(on,{size:17}),u?"Sending...":"Submit Review"]})]}),e.jsxs("div",{className:"fb-feed-card",children:[e.jsxs("div",{className:"fb-feed-top",children:[e.jsx("h3",{className:"fb-feed-title",children:"Community Wall"}),e.jsxs("span",{className:"fb-count-pill",children:[o.length," Reviews"]})]}),e.jsx("div",{className:"fb-list",children:o.length===0?e.jsxs("div",{className:"fb-empty",children:[e.jsx("div",{className:"fb-empty-icon",children:"💬"}),e.jsx("p",{children:"No reviews yet. Be the first!"})]}):o.map((r,k)=>e.jsxs("div",{className:"fb-review",style:{animationDelay:`${.05*k}s`},children:[e.jsxs("div",{className:"fb-review-header",children:[e.jsxs("div",{className:"fb-user-row",children:[e.jsx("div",{className:"fb-avatar",children:r.userId.username.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("p",{className:"fb-username",children:r.userId.username}),e.jsx(ue,{value:r.rating,readOnly:!0,size:"small",sx:{color:"#f59e0b",fontSize:"14px"}})]})]}),r.userId._id===j&&e.jsx("button",{className:"fb-del-btn",onClick:()=>N(r._id),"aria-label":"Delete review",children:e.jsx(Oe,{style:{fontSize:16}})})]}),e.jsx("p",{className:"fb-review-text",children:r.feedback})]},r._id))})]})]})]})]})},Ln=()=>{const n=Y.c(1);let t;return n[0]===Symbol.for("react.memo_cache_sentinel")?(t=e.jsxs("div",{children:[e.jsx(zn,{}),e.jsx(Fn,{}),e.jsx(An,{})]}),n[0]=t):t=n[0],t};export{Ln as default};
