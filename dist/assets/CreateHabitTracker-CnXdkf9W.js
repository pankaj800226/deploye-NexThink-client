import{c as $,j as e,a as W,r as x,L as P,p as c,W as Y,A as _,z as g}from"./index-kHg4kFo9.js";import{b as m,c as f}from"./Button-DOZou9N9.js";import{A as G}from"./ApiError-DQpI4mZP.js";import{A as O}from"./Add-Csy4lEA-.js";import{D as K}from"./Delete-LrWx-br9.js";import{A as R}from"./AutoAwesome-g54-z3hL.js";import{T as V}from"./target-CNJEII4i.js";const U=$(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"}));const q=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],J=W("circle-check-big",q),N=(l,s)=>{if(s)return!1;const n=new Date;n.setHours(0,0,0,0);const u=new Date(l);return u.setHours(0,0,0,0),u<n},Q=l=>{const s=new Date;s.setHours(0,0,0,0);const n=new Date(l);return n.setHours(0,0,0,0),n.getTime()===s.getTime()},X=l=>{const s=new Date;s.setHours(0,0,0,0);const n=new Date(l);return n.setHours(0,0,0,0),n>s},Z=l=>l.days.every(s=>s.checked?!0:N(s.date,s.checked)),ne=()=>{const[l,s]=x.useState([]),[n,u]=x.useState(""),b=localStorage.getItem("TOKEN"),[E,y]=x.useState(!1),[k,F]=x.useState(""),[D,j]=x.useState(!1),S=async t=>{for(const a of t)for(const i of a.weeks){const o=Z(i),p=a.weeks.some(r=>r.weekNo===i.weekNo+1);if(o&&!p)try{const r=await m.put(`${f}/api/shedular/check`,{taskId:a._id,weekNo:i.weekNo,dayIndex:6,checked:i.days[6].checked},{headers:{Authorization:`Bearer ${b}`}});s(h=>h.map(d=>d._id===a._id?r.data.task:d))}catch(r){console.log("Week trigger error:",r)}}};x.useEffect(()=>{(async()=>{try{y(!0);const i=(await m.get(`${f}/api/shedular/get/shedular`,{headers:{Authorization:`Bearer ${b}`}})).data.schedulers;s(i),await S(i)}catch(a){console.log(a),F("API fetch error")}finally{y(!1)}})()},[b]);const A=t=>t===0?"Every journey starts with a single check! 🌱":t<30?"You're getting started, keep it up! 💪":t<70?"Consistency is key. You're doing great! 🚀":t<100?"So close to perfection! Don't stop! 🎯":"Masterpiece! You crushed it this week! 🏆✨",C=t=>t===100?{icon:"👑",text:"Perfect Week!",color:"#fbbf24"}:t>=80?{icon:"🔥",text:"On Fire!",color:"#f97316"}:t>=60?{icon:"⚡",text:"Great Progress!",color:"#6366f1"}:t>=40?{icon:"🌱",text:"Growing!",color:"#10b981"}:{icon:"🎯",text:"Keep Going!",color:"#6b7280"},T=t=>{const a=t.weeks.flatMap(o=>o.days),i=a.filter(o=>o.checked).length;return a.length>0?Math.round(i/a.length*100):0},v=async()=>{if(!n.trim())return;j(!0);const t=new Date,a=Array.from({length:7}).map((o,p)=>{const r=new Date(t);return r.setDate(r.getDate()+p),{checked:!1,date:r.toISOString()}}),i={title:n.trim(),weeks:[{weekNo:1,days:a}]};try{const o=await m.post(`${f}/api/shedular/create/shedular`,i,{headers:{Authorization:`Bearer ${b}`}});g.success("Scheduler created 🎉"),s(p=>[...p,o.data.task]),u("")}catch(o){console.log(o),g.error("Error creating task")}finally{j(!1)}},B=async t=>{try{await m.delete(`${f}/api/shedular/delete/shedular/${t}`),s(a=>a.filter(i=>i._id!==t)),g.success("Habit Deleted")}catch(a){console.log(a),g.error("Error deleting")}},H=async(t,a,i,o)=>{try{const p=await m.put(`${f}/api/shedular/check`,{taskId:t,weekNo:a,dayIndex:i,checked:o},{headers:{Authorization:`Bearer ${b}`}});s(r=>r.map(h=>h._id===t?p.data.task:h)),g.success(o?"Great job! ✅":"Task unchecked")}catch{g.error("Failed to update")}};return k?e.jsx(G,{error:k}):E?e.jsx(P,{}):e.jsxs("div",{className:"habit-container",children:[e.jsx("style",{children:`
                .habit-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
                    padding: 20px;
                    font-family: 'Inter', sans-serif;
                }

                .habit-content {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Header Styles */
                .habit-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .habit-header h1 {
                    font-size: 28px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #1F2937, #4F46E5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0;
                }

                .habit-header p {
                    color: #6B7280;
                    margin-top: 5px;
                    font-size: 14px;
                }

                /* Input Wrapper */
                .habit-input-wrapper {
                    display: flex;
                    gap: 10px;
                    background: white;
                    padding: 4px 4px 4px 16px;
                    border-radius: 50px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .habit-input-wrapper:hover,
                .habit-input-wrapper:focus-within {
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
                    border-color: #4F46E5;
                }

                .habit-input-wrapper input {
                    border: none;
                    outline: none;
                    width: 220px;
                    font-size: 14px;
                    background: transparent;
                    color: #1F2937;
                }

                .habit-input-wrapper input::placeholder {
                    color: #9CA3AF;
                }

                .add-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: none;
                    background: linear-gradient(135deg, #4F46E5, #7C3AED);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .add-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
                }

                /* Grid Layout */
                .habit-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                    gap: 20px;
                }

                /* Card Styles */
                .habit-card {
                    background: white;
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border: 1px solid #E5E7EB;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .habit-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
                    border-color: #C7D2FE;
                }

                /* Card Header */
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .title-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .title-group h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1F2937;
                    word-break: break-word;
                }

                .progress-pill {
                    background: linear-gradient(135deg, #4F46E5, #7C3AED);
                    color: white;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .delete-icon-btn {
                    background: transparent;
                    border: none;
                    color: #9CA3AF;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .delete-icon-btn:hover {
                    color: #EF4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                /* Scroll Area - Fix for overflow */
                .grid-scroll-area {
                    overflow-x: auto;
                    overflow-y: visible;
                    margin: 0 -8px;
                    padding: 0 8px;
                    -webkit-overflow-scrolling: touch;
                }

                /* Hide scrollbar for cleaner look */
                .grid-scroll-area::-webkit-scrollbar {
                    height: 4px;
                }

                .grid-scroll-area::-webkit-scrollbar-track {
                    background: #F3F4F6;
                    border-radius: 10px;
                }

                .grid-scroll-area::-webkit-scrollbar-thumb {
                    background: #C7D2FE;
                    border-radius: 10px;
                }

                .grid-scroll-area::-webkit-scrollbar-thumb:hover {
                    background: #4F46E5;
                }

                /* Table Styles */
                .habit-table {
                    width: 100%;
                    min-width: 500px;
                    border-collapse: separate;
                    border-spacing: 6px 3px;
                }

                .habit-table th {
                    font-size: 11px;
                    font-weight: 600;
                    color: #6B7280;
                    text-align: center;
                    padding-bottom: 6px;
                }

                .week-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #4F46E5;
                    text-align: center;
                    white-space: nowrap;
                }

                .current-day {
                    background: rgba(79, 70, 229, 0.08);
                    border-radius: 10px;
                }

                /* Cell Wrapper */
                .cell-wrapper {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 40px;
                    min-height: 40px;
                }

                .cell-wrapper.is-future {
                    opacity: 0.3;
                    pointer-events: none;
                }

                /* Checkbox Custom */
                .checkbox-custom {
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox-custom input {
                    display: none;
                }

                .check-ui {
                    font-size: 24px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox-custom:hover .check-ui {
                    transform: scale(1.1);
                }

                .icon-done {
                    color: #10B981;
                    filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
                }

                .icon-empty {
                    color: #D1D5DB;
                }

                /* Missed Indicator - Centered */
                .missed-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 18px;
                    height: 18px;
                    background: #EF4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeInScale 0.3s ease-out;
                    box-shadow: 0 0 0 2px white, 0 2px 4px rgba(0,0,0,0.1);
                }

                .missed-indicator::before {
                    content: '✕';
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                }

                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }

                /* Card Footer */
                .card-footer {
                    margin-top: 16px;
                    padding-top: 12px;
                    border-top: 1px solid #E5E7EB;
                }

                .footer-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .motivation-text {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #6B7280;
                }

                .stats-badges {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                }

                .stat-count {
                    font-weight: 600;
                    color: #1F2937;
                }

                .badge-text {
                    font-size: 11px;
                    font-weight: 600;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 50px 20px;
                    background: white;
                    border-radius: 20px;
                    margin-top: 30px;
                    border: 1px solid #E5E7EB;
                }

                /* ========== RESPONSIVE STYLES ========== */
                
                /* Tablet (768px - 1024px) */
                @media (max-width: 1024px) {
                    .habit-grid {
                        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
                        gap: 16px;
                    }
                }

                /* Mobile Large (600px - 768px) */
                @media (max-width: 768px) {
                    .habit-container {
                        padding: 16px;
                    }
                    
                    .habit-header {
                        flex-direction: column;
                        align-items: stretch;
                        margin-bottom: 20px;
                    }
                    
                    .habit-header h1 {
                        font-size: 24px;
                    }
                    
                    .habit-header p {
                        font-size: 13px;
                    }
                    
                    .habit-input-wrapper {
                        width: 100%;
                    }
                    
                    .habit-input-wrapper input {
                        width: 100%;
                        flex: 1;
                    }
                    
                    .habit-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    
                    .habit-card {
                        padding: 16px;
                    }
                    
                    .title-group h3 {
                        font-size: 15px;
                    }
                    
                    .progress-pill {
                        font-size: 10px;
                        padding: 2px 8px;
                    }
                    
                    .habit-table {
                        min-width: 450px;
                        border-spacing: 4px 2px;
                    }
                    
                    .cell-wrapper {
                        min-width: 36px;
                        min-height: 36px;
                    }
                    
                    .check-ui {
                        font-size: 20px;
                    }
                    
                    .missed-indicator {
                        width: 16px;
                        height: 16px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 9px;
                    }
                    
                    .footer-content {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .stats-badges {
                        width: 100%;
                        justify-content: space-between;
                    }
                }

                /* Mobile Small (480px and below) */
                @media (max-width: 480px) {
                    .habit-container {
                        padding: 12px;
                    }
                    
                    .habit-header h1 {
                        font-size: 20px;
                    }
                    
                    .habit-card {
                        padding: 14px;
                    }
                    
                    .title-group {
                        gap: 8px;
                    }
                    
                    .title-group h3 {
                        font-size: 14px;
                    }
                    
                    .progress-pill {
                        font-size: 9px;
                        padding: 2px 6px;
                    }
                    
                    .delete-icon-btn {
                        padding: 4px;
                    }
                    
                    .habit-table {
                        min-width: 380px;
                        border-spacing: 3px 2px;
                    }
                    
                    .habit-table th {
                        font-size: 9px;
                    }
                    
                    .week-label {
                        font-size: 9px;
                    }
                    
                    .cell-wrapper {
                        min-width: 32px;
                        min-height: 32px;
                    }
                    
                    .check-ui {
                        font-size: 18px;
                    }
                    
                    .missed-indicator {
                        width: 14px;
                        height: 14px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 8px;
                    }
                    
                    .motivation-text {
                        font-size: 11px;
                    }
                    
                    .stat-item {
                        font-size: 11px;
                    }
                    
                    .badge-text {
                        font-size: 10px;
                    }
                    
                    .empty-state {
                        padding: 40px 16px;
                    }
                    
                    .empty-state h3 {
                        font-size: 18px;
                    }
                    
                    .empty-state p {
                        font-size: 13px;
                    }
                }

                /* Very Small (360px and below) */
                @media (max-width: 360px) {
                    .habit-table {
                        min-width: 320px;
                        border-spacing: 2px;
                    }
                    
                    .cell-wrapper {
                        min-width: 28px;
                        min-height: 28px;
                    }
                    
                    .check-ui {
                        font-size: 16px;
                    }
                    
                    .missed-indicator {
                        width: 12px;
                        height: 12px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 7px;
                    }
                    
                    .habit-table th {
                        font-size: 8px;
                    }
                    
                    .week-label {
                        font-size: 8px;
                    }
                }
            `}),e.jsxs("main",{className:"habit-content",children:[e.jsxs(c.header,{className:"habit-header",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},children:[e.jsxs("div",{children:[e.jsx("h1",{children:"🧠 Your Habits"}),e.jsx("p",{children:"Turn consistency into your greatest strength."})]}),e.jsxs(c.div,{className:"habit-input-wrapper",whileHover:{scale:1.02},children:[e.jsx("input",{placeholder:"Type a new goal...",value:n,onChange:t=>u(t.target.value),onKeyDown:t=>t.key==="Enter"&&v()}),e.jsx(c.button,{onClick:v,className:"add-btn",whileTap:{scale:.95},children:D?e.jsx(Y,{}):e.jsx(O,{})})]})]}),e.jsx("div",{className:"habit-grid",children:e.jsx(_,{mode:"popLayout",children:l.map(t=>{const a=T(t),i=C(a),o=t.weeks.flatMap(r=>r.days).filter(r=>r.checked).length,p=t.weeks.flatMap(r=>r.days).length;return e.jsxs(c.div,{className:"habit-card",layout:!0,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},whileHover:{y:-3},transition:{type:"spring",stiffness:300},children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"title-group",children:[e.jsx("h3",{children:t.title}),e.jsxs(c.span,{className:"progress-pill",animate:{scale:[1,1.1,1]},transition:{duration:.5},children:[a,"%"]})]}),e.jsx(c.button,{className:"delete-icon-btn",onClick:()=>B(t._id),whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsx(K,{fontSize:"small"})})]}),e.jsx("div",{className:"grid-scroll-area",children:e.jsxs("table",{className:"habit-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),["M","T","W","T","F","S","S"].map((r,h)=>e.jsx("th",{children:r},h))]})}),e.jsx("tbody",{children:t.weeks.map((r,h)=>e.jsxs(c.tr,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:h*.05},children:[e.jsxs("td",{className:"week-label",children:["W",r.weekNo]}),r.days.map((d,z)=>{const M=N(d.date,d.checked),I=Q(d.date),w=X(d.date);return e.jsx("td",{className:I?"current-day":"",children:e.jsxs("div",{className:`cell-wrapper ${w?"is-future":""}`,children:[e.jsxs(c.label,{className:"checkbox-custom",whileTap:{scale:.95},children:[e.jsx("input",{type:"checkbox",checked:d.checked,disabled:w,onChange:L=>H(t._id,r.weekNo,z,L.target.checked)}),e.jsx("span",{className:"check-ui",children:d.checked?e.jsx(c.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring",stiffness:400},children:e.jsx(J,{className:"icon-done",size:24})}):e.jsx(U,{className:"icon-empty"})})]}),M&&!d.checked&&!w&&e.jsx("div",{className:"missed-indicator"})]})},z)})]},h))})]})}),e.jsx(c.div,{className:"card-footer",initial:{opacity:0},animate:{opacity:1},children:e.jsxs("div",{className:"footer-content",children:[e.jsxs("div",{className:"motivation-text",children:[e.jsx(R,{sx:{fontSize:14,color:"#4F46E5"}}),e.jsx("span",{children:A(a)})]}),e.jsxs("div",{className:"stats-badges",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{children:"✅"}),e.jsxs("span",{className:"stat-count",children:[o,"/",p]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{style:{fontSize:14},children:i.icon}),e.jsx("span",{className:"badge-text",style:{color:i.color},children:i.text})]})]})]})})]},t._id)})})}),l.length===0&&e.jsxs(c.div,{className:"empty-state",initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[e.jsx(V,{size:40,style:{margin:"0 auto 15px",color:"#4F46E5"}}),e.jsx("h3",{children:"No habits yet"}),e.jsx("p",{children:"Create your first habit above and start building consistency! 🚀"})]})]})]})};export{ne as default};
