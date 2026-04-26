import{r as d,j as e,d as R,q as S,t as C,v as H,w as W,x as G,f as M,b as T,o as Y,y as D,c as L,g as q,u as U,s as I,n as K,L as Q,p as N,z as w}from"./index-Qek0RTiS.js";import{B as A,C as J,b as z,c as P}from"./Button-76y5hd_a.js";import{A as X}from"./ApiError-CvRiywcI.js";import{e as Z,c as ee,T as B}from"./TextField-DszuZpgQ.js";import{u as te}from"./index-CvziCLUJ.js";import{C as ae,D as se,a as re,b as oe}from"./DialogTitle-CDRUEwrr.js";import{E as ie}from"./Email-wL2BZQRo.js";import{E as ne}from"./Edit-CtswFxDE.js";import{s as le,u as ce}from"./useThemeProps-B3-BQ-lR.js";import{B as de}from"./Box-CB7OZnwj.js";import{A as pe,C as ue}from"./Avatar-BWMl7ZmQ.js";import{I as me}from"./IconButton-BqXrQ4z-.js";import"./index-BVLelm8A.js";import"./getThemeProps-fos6G40Y.js";import"./Typography-B4Zp4HI-.js";const ge=Y(),fe=le("div",{name:"MuiStack",slot:"Root"});function xe(t){return ce({props:t,name:"MuiStack",defaultTheme:ge})}function he(t,s){const a=d.Children.toArray(t).filter(Boolean);return a.reduce((r,p,o)=>(r.push(p),o<a.length-1&&r.push(d.cloneElement(s,{key:`separator-${o}`})),r),[])}const be=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],ve=({ownerState:t,theme:s})=>{let a={display:"flex",flexDirection:"column",...S({theme:s},C({values:t.direction,breakpoints:s.breakpoints.values}),r=>({flexDirection:r}))};if(t.spacing){const r=H(s),p=Object.keys(s.breakpoints.values).reduce((i,l)=>((typeof t.spacing=="object"&&t.spacing[l]!=null||typeof t.direction=="object"&&t.direction[l]!=null)&&(i[l]=!0),i),{}),o=C({values:t.direction,base:p}),n=C({values:t.spacing,base:p});typeof o=="object"&&Object.keys(o).forEach((i,l,x)=>{if(!o[i]){const f=l>0?o[x[l-1]]:"column";o[i]=f}}),a=W(a,S({theme:s},n,(i,l)=>t.useFlexGap?{gap:D(r,i)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${be(l?o[l]:t.direction)}`]:D(r,i)}}))}return a=G(s.breakpoints,a),a};function ye(t={}){const{createStyledComponent:s=fe,useThemeProps:a=xe,componentName:r="MuiStack"}=t,p=()=>M({root:["root"]},i=>T(r,i),{}),o=s(ve);return d.forwardRef(function(i,l){const x=a(i),h=Z(x),{component:f="div",direction:v="column",spacing:y=0,divider:b,children:_,className:j,useFlexGap:g=!1,...F}=h,k={direction:v,spacing:y,useFlexGap:g},E=p();return e.jsx(o,{as:f,ownerState:k,ref:l,className:R(E.root,j),...F,children:b?he(_,b):_})})}const _e=L(e.jsx("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"})),je=L(e.jsx("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z"}));function Fe(t){return T("MuiDialogActions",t)}q("MuiDialogActions",["root","spacing"]);const ke=t=>{const{classes:s,disableSpacing:a}=t;return M({root:["root",!a&&"spacing"]},Fe,s)},we=I("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:a}=t;return[s.root,!a.disableSpacing&&s.spacing]}})({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto",variants:[{props:({ownerState:t})=>!t.disableSpacing,style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),Ee=d.forwardRef(function(s,a){const r=U({props:s,name:"MuiDialogActions"}),{className:p,disableSpacing:o=!1,...n}=r,m={...r,disableSpacing:o},i=ke(m);return e.jsx(we,{className:R(i.root,p),ownerState:m,ref:a,...n})}),Ce=ye({createStyledComponent:I("div",{name:"MuiStack",slot:"Root"}),useThemeProps:t=>U({props:t,name:"MuiStack"})}),$e=()=>{const t=ee(),s=te(t.breakpoints.down("sm")),a=K(),r=localStorage.getItem("TOKEN"),[p,o]=d.useState(!1),[n,m]=d.useState(null),[i,l]=d.useState(""),[x,h]=d.useState(!1),[f,v]=d.useState(!1),[y,b]=d.useState(null),[_,j]=d.useState(null),[g,F]=d.useState({username:"",email:""}),k=c=>{F({...g,[c.target.name]:c.target.value})},E=c=>{if(c.target.files&&c.target.files[0]){const u=c.target.files[0];b(u),j(URL.createObjectURL(u))}};d.useEffect(()=>{(async()=>{if(!r)return w.error("Please login to continue"),a("/login");try{h(!0);const u=await z.get(`${P}/api/user/profile`,{headers:{Authorization:`Bearer ${r}`}});m(u.data),F({username:u.data.username,email:u.data.email})}catch{l("Failed to load profile data")}finally{h(!1)}})()},[r,a]);const V=async()=>{const c=new FormData;c.append("username",g.username),c.append("email",g.email),y&&c.append("file",y),v(!0);try{const u=await z.put(`${P}/api/user/editProfile`,c,{headers:{Authorization:`Bearer ${r}`}});m(u.data),o(!1),j(null),b(null),w.success("Profile updated successfully!")}catch{w.error("Update failed. Please try again.")}finally{v(!1)}},O=()=>{localStorage.clear(),a("/login"),w.success("Logged out successfully")},$=()=>n?.createdAt?new Date(n.createdAt).toLocaleDateString("en-US",{month:"long",year:"numeric"}):"Recent";return i?e.jsx(X,{error:i}):x?e.jsx(Q,{}):e.jsxs("div",{className:"profile-container",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F3E8FF 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Decorative Background */
        .profile-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%);
          pointer-events: none;
        }

        .profile-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .profile_main_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .profile_card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.8);
          padding: 3rem;
          border-radius: 32px;
          width: 100%;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .profile_card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 40px -12px rgba(79, 70, 229, 0.2);
        }

        /* Avatar Section */
        .avatar_wrapper {
          position: relative;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        .avatar_ring {
          width: 140px;
          height: 140px;
          padding: 4px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED, #EC4899);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .avatar_ring:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(79, 70, 229, 0.4);
        }

        .avatar_ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          background: #F3F4F6;
        }

        .online_indicator {
          position: absolute;
          bottom: 10px;
          right: 15px;
          width: 18px;
          height: 18px;
          background: #10B981;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 2px #FFFFFF;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        /* Profile Info */
        .profile_info {
          width: 100%;
        }

        .badge_row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .role_badge {
          font-size: 0.7rem;
          letter-spacing: 1px;
          font-weight: 700;
          color: #4F46E5;
          background: rgba(79, 70, 229, 0.1);
          padding: 5px 12px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .verified_icon {
          color: #3B82F6;
          font-size: 1.1rem;
        }

        .member_since {
          font-size: 0.7rem;
          color: #6B7280;
          background: #F3F4F6;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .profile_info h1 {
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .email_text {
          color: #6B7280;
          font-size: 0.9rem;
          margin: 0.5rem 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Stats Section */
        .stats_section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 1.5rem 0;
          padding: 1rem;
          background: #F9FAFB;
          border-radius: 20px;
        }

        .stat_item {
          text-align: center;
        }

        .stat_value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1F2937;
          line-height: 1;
        }

        .stat_label {
          font-size: 0.7rem;
          color: #6B7280;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-top: 6px;
        }

        /* Buttons */
        .edit_btn {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border: none;
          border-radius: 14px;
          padding: 12px 28px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: none;
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .edit_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .logout_btn {
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 10px 20px;
          font-weight: 500;
          font-size: 0.85rem;
          text-transform: none;
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
        }

        .logout_btn:hover {
          background: #FEF2F2;
          border-color: #FCA5A5;
          color: #EF4444;
        }

        /* Dialog Styles */
        .dialog_title {
          text-align: center;
          font-weight: 700;
          color: #1F2937;
          padding-bottom: 8px;
        }

        .upload_preview_container {
          position: relative;
          display: inline-block;
        }

        .upload_icon_btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 8px;
        }

        .upload_icon_btn:hover {
          background: #4F46E5;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .profile_main_wrapper {
            padding: 1rem;
          }

          .profile_card {
            padding: 1.5rem;
          }

          .avatar_ring {
            width: 110px;
            height: 110px;
          }

          .profile_info h1 {
            font-size: 1.5rem;
          }

          .stats_section {
            gap: 10px;
            padding: 0.8rem;
          }

          .stat_value {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .stats_section {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .badge_row {
            flex-direction: column;
            align-items: center;
          }
        }
      `}),e.jsx("main",{className:"profile_main_wrapper",children:e.jsxs(N.div,{className:"profile_card",initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.5,type:"spring",stiffness:100},children:[e.jsxs("div",{className:"avatar_wrapper",children:[e.jsx(N.div,{className:"avatar_ring",whileHover:{rotate:5,scale:1.05},transition:{duration:.3},children:e.jsx("img",{src:n?.avatar||`https://ui-avatars.com/api/?name=${n?.username}&background=4F46E5&color=fff&size=140`,alt:n?.username})}),e.jsx("div",{className:"online_indicator"})]}),e.jsxs("div",{className:"profile_info",children:[e.jsxs("div",{className:"badge_row",children:[e.jsx("span",{className:"role_badge",children:"✨ PRO MEMBER"}),e.jsx(je,{className:"verified_icon"}),e.jsxs("span",{className:"member_since",children:[e.jsx(ae,{sx:{fontSize:12}}),"Member since ",$()]})]}),e.jsx("h1",{children:n?.username}),e.jsxs("p",{className:"email_text",children:[e.jsx(ie,{sx:{fontSize:14}}),n?.email]}),e.jsxs("div",{className:"stats_section",children:[e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.totalTasks||0}),e.jsx("div",{className:"stat_label",children:"Total Tasks"})]}),e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.completedTasks||0}),e.jsx("div",{className:"stat_label",children:"Completed"})]}),e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.streak||0}),e.jsx("div",{className:"stat_label",children:"Day Streak"})]})]}),e.jsxs("button",{className:"edit_btn",onClick:()=>o(!0),children:[e.jsx(ne,{sx:{fontSize:18}}),"Edit Profile"]}),e.jsxs("button",{className:"logout_btn",onClick:O,children:[e.jsx(_e,{sx:{fontSize:16}}),"Logout"]})]})]})}),e.jsxs(se,{open:p,onClose:()=>o(!1),fullScreen:s,fullWidth:!0,maxWidth:"xs",PaperProps:{sx:{borderRadius:"24px",background:"white",padding:"8px"}},children:[e.jsx(re,{className:"dialog_title",children:"Account Settings"}),e.jsx(oe,{children:e.jsxs(Ce,{spacing:3,sx:{mt:2,alignItems:"center"},children:[e.jsxs(de,{className:"upload_preview_container",children:[e.jsx(pe,{src:_||n?.avatar||`https://ui-avatars.com/api/?name=${g.username}&background=4F46E5&color=fff`,sx:{width:100,height:100,border:"3px solid #4F46E5"}}),e.jsxs(me,{component:"label",className:"upload_icon_btn",sx:{position:"absolute",bottom:0,right:0,background:"linear-gradient(135deg, #4F46E5, #7C3AED)",color:"white","&:hover":{background:"#4F46E5"}},children:[e.jsx(ue,{sx:{fontSize:18}}),e.jsx("input",{hidden:!0,type:"file",accept:"image/*",onChange:E})]})]}),e.jsx(B,{label:"Username",name:"username",fullWidth:!0,value:g.username,onChange:k,sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}}}),e.jsx(B,{label:"Email",name:"email",fullWidth:!0,value:g.email,onChange:k,sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}}})]})}),e.jsxs(Ee,{sx:{p:3,gap:2},children:[e.jsx(A,{onClick:()=>o(!1),color:"inherit",sx:{borderRadius:"10px",textTransform:"none"},children:"Cancel"}),e.jsx(A,{variant:"contained",onClick:V,disabled:f,sx:{background:"linear-gradient(135deg, #4F46E5, #7C3AED)",borderRadius:"10px",textTransform:"none",px:3,"&:hover":{background:"linear-gradient(135deg, #4338CA, #6D28D9)"}},children:f?e.jsx(J,{size:24,color:"inherit"}):"Save Changes"})]})]})]})};export{$e as default};
