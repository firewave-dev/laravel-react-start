import{j as e,L as l}from"./app-BByfSfuC.js";import{L as b}from"./Layout-Dwbte8SX.js";import{C as x,P as s,G as t,b as a,T as g,a as o}from"./Title-ZeNDVGLn.js";import{A as p}from"./arrow-left-XHsFXUax.js";import{S as h}from"./square-pen-yEjnqL2U.js";import{B as n}from"./Badge-Aqzdn07U.js";import{U as f}from"./user-D_i7W3jX.js";import{C as j}from"./calendar-DcJcnZgA.js";import{E as u}from"./eye-BOqE52_8.js";import{D as c}from"./Divider-DfaJXAuO.js";/* empty css            */import"./use-window-event-DxuP8sAt.js";import"./get-sorted-breakpoints-DFaYOGKe.js";import"./Burger-C6E3aGFj.js";import"./createLucideIcon-BT_P5zGE.js";import"./users-CDhnMT-6.js";import"./book-open-C5UyFhRw.js";import"./bell-pBXD-JBQ.js";import"./heart-C_qBthq1.js";import"./CloseButton-DeOFDxF2.js";import"./check-DWn_i8sN.js";import"./x-BywK-egi.js";import"./circle-alert-DsNFdFtg.js";const W=({post:r})=>{const d=i=>i==="published"?"green":"yellow",m=i=>({news:"blue",announcement:"orange",reflection:"purple",saint_day:"gold",teaching:"teal"})[i]||"gray";return e.jsx(b,{children:e.jsx(x,{size:"lg",py:"xl",children:e.jsxs(s,{p:"xl",withBorder:!0,style:{background:"linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 215, 0, 0.2)",borderRadius:"16px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4)"},children:[e.jsxs(t,{justify:"space-between",mb:"xl",children:[e.jsx(t,{children:e.jsx(l,{href:"/posts",children:e.jsx(a,{variant:"subtle",leftSection:e.jsx(p,{size:18}),c:"#FFD700",children:"Back to Posts"})})}),e.jsx(l,{href:`/posts/${r.id}/edit`,children:e.jsx(a,{leftSection:e.jsx(h,{size:18}),style:{background:"linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",color:"#1a1f2e",fontWeight:600},children:"Edit Post"})})]}),e.jsx(g,{order:2,c:"#FFD700",mb:"md",style:{fontFamily:"serif"},children:r.title}),e.jsxs(t,{mb:"xl",children:[e.jsx(n,{color:m(r.category),variant:"light",tt:"capitalize",children:r.category.replace("_"," ")}),e.jsx(n,{color:d(r.status),variant:"dot",tt:"capitalize",children:r.status}),r.is_featured&&e.jsx(n,{color:"yellow",variant:"filled",children:"Featured"})]}),e.jsxs(t,{gap:"xl",mb:"xl",children:[e.jsxs(t,{gap:"xs",children:[e.jsx(f,{size:16,color:"#FFD700"}),e.jsx(o,{c:"#b8b8b8",size:"sm",children:r.author?.name||"Unknown"})]}),r.published_at&&e.jsxs(t,{gap:"xs",children:[e.jsx(j,{size:16,color:"#FFD700"}),e.jsx(o,{c:"#b8b8b8",size:"sm",children:new Date(r.published_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]}),e.jsxs(t,{gap:"xs",children:[e.jsx(u,{size:16,color:"#FFD700"}),e.jsxs(o,{c:"#b8b8b8",size:"sm",children:[r.views_count||0," views"]})]})]}),e.jsx(c,{color:"rgba(255, 215, 0, 0.2)",mb:"xl"}),r.excerpt&&e.jsxs(s,{p:"md",mb:"xl",style:{backgroundColor:"rgba(255, 215, 0, 0.05)",border:"1px solid rgba(255, 215, 0, 0.15)",borderLeft:"4px solid rgba(255, 215, 0, 0.5)"},children:[e.jsx(o,{c:"#FFD700",fw:500,size:"sm",mb:"xs",children:"EXCERPT"}),e.jsx(o,{c:"#b8b8b8",style:{fontStyle:"italic"},children:r.excerpt})]}),e.jsx(s,{p:"xl",mb:"xl",withBorder:!0,style:{backgroundColor:"rgba(15, 20, 25, 0.5)",border:"1px solid rgba(255, 215, 0, 0.1)"},children:e.jsx("div",{className:"post-content",dangerouslySetInnerHTML:{__html:r.content},style:{color:"#b8b8b8",lineHeight:1.8}})}),e.jsx("style",{children:`
            .post-content h1 {
              font-size: 2rem;
              font-weight: bold;
              margin: 1rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content h2 {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0.8rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content h3 {
              font-size: 1.25rem;
              font-weight: bold;
              margin: 0.6rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content p {
              margin: 0.5rem 0;
              color: #b8b8b8;
            }
            .post-content ul, .post-content ol {
              padding-left: 1.5rem;
              margin: 0.5rem 0;
              color: #b8b8b8;
            }
            .post-content li {
              margin: 0.25rem 0;
            }
            .post-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 1rem 0;
            }
            .post-content a {
              color: #FFD700;
              text-decoration: underline;
            }
            .post-content strong {
              font-weight: 600;
              color: #FFD700;
            }
            .post-content em {
              font-style: italic;
            }
          `}),e.jsx(c,{color:"rgba(255, 215, 0, 0.2)",mb:"md"}),e.jsxs(t,{justify:"space-between",children:[e.jsxs(o,{c:"#b8b8b8",size:"sm",children:[e.jsx("strong",{children:"Created:"})," ",new Date(r.created_at).toLocaleString()]}),e.jsxs(o,{c:"#b8b8b8",size:"sm",children:[e.jsx("strong",{children:"Last Updated:"})," ",new Date(r.updated_at).toLocaleString()]})]})]})})})};export{W as default};
