import{r as d,j as e,d as R,q as S,t as C,v as $,w as H,x as W,f as T,b as M,p as G,y as D,c as Y,g as q,u as L,s as U,n as K,L as Q,o as N,z as w}from"./index-xU34ato2.js";import{B as A,C as J,b as z,c as P}from"./Button-lRlRJ2vx.js";import{A as X}from"./ApiError-BRUjwm1s.js";import{e as Z,c as ee,T as B}from"./TextField-BtxwPQBZ.js";import{u as te}from"./index-gqecgABn.js";import{V as ae}from"./VerifiedUser-C4y55uy8.js";import{C as se,D as re,a as ie,b as oe}from"./DialogTitle-9iQgXWZR.js";import{E as ne}from"./Email-DCCzfTNh.js";import{E as le}from"./Edit-DD7Buoh2.js";import{s as ce,u as de,B as pe}from"./Box-CNPBP5gp.js";import{A as ue,C as me}from"./Avatar-BjalOU83.js";import{I as ge}from"./Typography-DvG1CLWm.js";import"./index-DL1CzIVZ.js";import"./getThemeProps-DMYS3lkH.js";const fe=G(),xe=ce("div",{name:"MuiStack",slot:"Root"});function he(t){return de({props:t,name:"MuiStack",defaultTheme:fe})}function be(t,s){const a=d.Children.toArray(t).filter(Boolean);return a.reduce((r,p,i)=>(r.push(p),i<a.length-1&&r.push(d.cloneElement(s,{key:`separator-${i}`})),r),[])}const ve=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],ye=({ownerState:t,theme:s})=>{let a={display:"flex",flexDirection:"column",...S({theme:s},C({values:t.direction,breakpoints:s.breakpoints.values}),r=>({flexDirection:r}))};if(t.spacing){const r=$(s),p=Object.keys(s.breakpoints.values).reduce((o,l)=>((typeof t.spacing=="object"&&t.spacing[l]!=null||typeof t.direction=="object"&&t.direction[l]!=null)&&(o[l]=!0),o),{}),i=C({values:t.direction,base:p}),n=C({values:t.spacing,base:p});typeof i=="object"&&Object.keys(i).forEach((o,l,x)=>{if(!i[o]){const f=l>0?i[x[l-1]]:"column";i[o]=f}}),a=H(a,S({theme:s},n,(o,l)=>t.useFlexGap?{gap:D(r,o)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${ve(l?i[l]:t.direction)}`]:D(r,o)}}))}return a=W(s.breakpoints,a),a};function _e(t={}){const{createStyledComponent:s=xe,useThemeProps:a=he,componentName:r="MuiStack"}=t,p=()=>T({root:["root"]},o=>M(r,o),{}),i=s(ye);return d.forwardRef(function(o,l){const x=a(o),h=Z(x),{component:f="div",direction:v="column",spacing:y=0,divider:b,children:_,className:j,useFlexGap:g=!1,...F}=h,k={direction:v,spacing:y,useFlexGap:g},E=p();return e.jsx(i,{as:f,ownerState:k,ref:l,className:R(E.root,j),...F,children:b?be(_,b):_})})}const je=Y(e.jsx("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"}));function Fe(t){return M("MuiDialogActions",t)}q("MuiDialogActions",["root","spacing"]);const ke=t=>{const{classes:s,disableSpacing:a}=t;return T({root:["root",!a&&"spacing"]},Fe,s)},we=U("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:a}=t;return[s.root,!a.disableSpacing&&s.spacing]}})({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto",variants:[{props:({ownerState:t})=>!t.disableSpacing,style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),Ee=d.forwardRef(function(s,a){const r=L({props:s,name:"MuiDialogActions"}),{className:p,disableSpacing:i=!1,...n}=r,m={...r,disableSpacing:i},o=ke(m);return e.jsx(we,{className:R(o.root,p),ownerState:m,ref:a,...n})}),Ce=_e({createStyledComponent:U("div",{name:"MuiStack",slot:"Root"}),useThemeProps:t=>L({props:t,name:"MuiStack"})}),Oe=()=>{const t=ee(),s=te(t.breakpoints.down("sm")),a=K(),r=localStorage.getItem("TOKEN"),[p,i]=d.useState(!1),[n,m]=d.useState(null),[o,l]=d.useState(""),[x,h]=d.useState(!1),[f,v]=d.useState(!1),[y,b]=d.useState(null),[_,j]=d.useState(null),[g,F]=d.useState({username:"",email:""}),k=c=>{F({...g,[c.target.name]:c.target.value})},E=c=>{if(c.target.files&&c.target.files[0]){const u=c.target.files[0];b(u),j(URL.createObjectURL(u))}};d.useEffect(()=>{(async()=>{if(!r)return w.error("Please login to continue"),a("/login");try{h(!0);const u=await z.get(`${P}/api/user/profile`,{headers:{Authorization:`Bearer ${r}`}});m(u.data),F({username:u.data.username,email:u.data.email})}catch{l("Failed to load profile data")}finally{h(!1)}})()},[r,a]);const I=async()=>{const c=new FormData;c.append("username",g.username),c.append("email",g.email),y&&c.append("file",y),v(!0);try{const u=await z.put(`${P}/api/user/editProfile`,c,{headers:{Authorization:`Bearer ${r}`}});m(u.data),i(!1),j(null),b(null),w.success("Profile updated successfully!")}catch{w.error("Update failed. Please try again.")}finally{v(!1)}},V=()=>{localStorage.clear(),a("/login"),w.success("Logged out successfully")},O=()=>n?.createdAt?new Date(n.createdAt).toLocaleDateString("en-US",{month:"long",year:"numeric"}):"Recent";return o?e.jsx(X,{error:o}):x?e.jsx(Q,{}):e.jsxs("div",{className:"profile-container",children:[e.jsx("style",{children:`
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
      `}),e.jsx("main",{className:"profile_main_wrapper",children:e.jsxs(N.div,{className:"profile_card",initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.5,type:"spring",stiffness:100},children:[e.jsxs("div",{className:"avatar_wrapper",children:[e.jsx(N.div,{className:"avatar_ring",whileHover:{rotate:5,scale:1.05},transition:{duration:.3},children:e.jsx("img",{src:n?.avatar||`https://ui-avatars.com/api/?name=${n?.username}&background=4F46E5&color=fff&size=140`,alt:n?.username})}),e.jsx("div",{className:"online_indicator"})]}),e.jsxs("div",{className:"profile_info",children:[e.jsxs("div",{className:"badge_row",children:[e.jsx("span",{className:"role_badge",children:"✨ PRO MEMBER"}),e.jsx(ae,{className:"verified_icon"}),e.jsxs("span",{className:"member_since",children:[e.jsx(se,{sx:{fontSize:12}}),"Member since ",O()]})]}),e.jsx("h1",{children:n?.username}),e.jsxs("p",{className:"email_text",children:[e.jsx(ne,{sx:{fontSize:14}}),n?.email]}),e.jsxs("div",{className:"stats_section",children:[e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.totalTasks||0}),e.jsx("div",{className:"stat_label",children:"Total Tasks"})]}),e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.completedTasks||0}),e.jsx("div",{className:"stat_label",children:"Completed"})]}),e.jsxs("div",{className:"stat_item",children:[e.jsx("div",{className:"stat_value",children:n?.stats?.streak||0}),e.jsx("div",{className:"stat_label",children:"Day Streak"})]})]}),e.jsxs("button",{className:"edit_btn",onClick:()=>i(!0),children:[e.jsx(le,{sx:{fontSize:18}}),"Edit Profile"]}),e.jsxs("button",{className:"logout_btn",onClick:V,children:[e.jsx(je,{sx:{fontSize:16}}),"Logout"]})]})]})}),e.jsxs(re,{open:p,onClose:()=>i(!1),fullScreen:s,fullWidth:!0,maxWidth:"xs",PaperProps:{sx:{borderRadius:"24px",background:"white",padding:"8px"}},children:[e.jsx(ie,{className:"dialog_title",children:"Account Settings"}),e.jsx(oe,{children:e.jsxs(Ce,{spacing:3,sx:{mt:2,alignItems:"center"},children:[e.jsxs(pe,{className:"upload_preview_container",children:[e.jsx(ue,{src:_||n?.avatar||`https://ui-avatars.com/api/?name=${g.username}&background=4F46E5&color=fff`,sx:{width:100,height:100,border:"3px solid #4F46E5"}}),e.jsxs(ge,{component:"label",className:"upload_icon_btn",sx:{position:"absolute",bottom:0,right:0,background:"linear-gradient(135deg, #4F46E5, #7C3AED)",color:"white","&:hover":{background:"#4F46E5"}},children:[e.jsx(me,{sx:{fontSize:18}}),e.jsx("input",{hidden:!0,type:"file",accept:"image/*",onChange:E})]})]}),e.jsx(B,{label:"Username",name:"username",fullWidth:!0,value:g.username,onChange:k,sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}}}),e.jsx(B,{label:"Email",name:"email",fullWidth:!0,value:g.email,onChange:k,sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}}})]})}),e.jsxs(Ee,{sx:{p:3,gap:2},children:[e.jsx(A,{onClick:()=>i(!1),color:"inherit",sx:{borderRadius:"10px",textTransform:"none"},children:"Cancel"}),e.jsx(A,{variant:"contained",onClick:I,disabled:f,sx:{background:"linear-gradient(135deg, #4F46E5, #7C3AED)",borderRadius:"10px",textTransform:"none",px:3,"&:hover":{background:"linear-gradient(135deg, #4338CA, #6D28D9)"}},children:f?e.jsx(J,{size:24,color:"inherit"}):"Save Changes"})]})]})]})};export{Oe as default};
