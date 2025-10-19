import{j as e}from"./app-BByfSfuC.js";import{F as m}from"./FrontLayout-C85N90XF.js";import{B as n,C as d,P as i,G as o,T as g,a as t}from"./Title-ZeNDVGLn.js";import{B as l}from"./Badge-Aqzdn07U.js";import{U as x}from"./user-D_i7W3jX.js";import{C as b}from"./calendar-DcJcnZgA.js";import{E as h}from"./eye-BOqE52_8.js";import{D as a}from"./Divider-DfaJXAuO.js";/* empty css            */import"./Burger-C6E3aGFj.js";import"./createLucideIcon-BT_P5zGE.js";const v=({post:r})=>{const s=c=>({news:"blue",announcement:"orange",reflection:"purple",saint_day:"gold",teaching:"teal"})[c]||"gray";return e.jsx(m,{children:e.jsx(n,{style:{minHeight:"calc(100vh - 200px)",background:"linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)",padding:"3rem 0"},children:e.jsx(d,{size:"lg",children:e.jsxs(i,{p:"xl",withBorder:!0,style:{backgroundColor:"rgba(240, 230, 200, 0.95)",backdropFilter:"blur(10px)",border:"2px solid rgba(139, 69, 19, 0.25)",borderRadius:"12px",boxShadow:"0 8px 32px rgba(139, 69, 19, 0.1)"},children:[e.jsxs(o,{mb:"md",children:[e.jsx(l,{color:s(r.category),variant:"light",size:"lg",tt:"capitalize",children:r.category.replace("_"," ")}),r.is_featured&&e.jsx(l,{color:"yellow",variant:"filled",size:"sm",children:"Featured"})]}),e.jsx(g,{order:1,mb:"md",c:"#8B4513",style:{fontFamily:"serif",fontSize:"2.5rem"},children:r.title}),e.jsxs(o,{gap:"xl",mb:"xl",children:[e.jsxs(o,{gap:"xs",children:[e.jsx(x,{size:18,color:"#8B4513"}),e.jsx(t,{c:"#654321",fw:500,size:"sm",children:r.author?.name||"Unknown"})]}),e.jsxs(o,{gap:"xs",children:[e.jsx(b,{size:18,color:"#8B4513"}),e.jsx(t,{c:"#654321",size:"sm",children:new Date(r.published_at||r.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]}),e.jsxs(o,{gap:"xs",children:[e.jsx(h,{size:18,color:"#8B4513"}),e.jsxs(t,{c:"#654321",size:"sm",children:[r.views_count||0," views"]})]})]}),e.jsx(a,{color:"rgba(139, 69, 19, 0.3)",mb:"xl"}),r.excerpt&&e.jsx(i,{p:"lg",mb:"xl",style:{backgroundColor:"rgba(139, 69, 19, 0.08)",border:"1px solid rgba(139, 69, 19, 0.2)",borderLeft:"4px solid #8B4513",borderRadius:"8px"},children:e.jsx(t,{c:"#8B4513",fw:500,size:"lg",style:{fontStyle:"italic",lineHeight:1.8},children:r.excerpt})}),e.jsx(n,{mb:"xl",children:e.jsx("div",{className:"blog-content",dangerouslySetInnerHTML:{__html:r.content},style:{lineHeight:1.9,fontSize:"1.05rem"}})}),e.jsx("style",{children:`
              .blog-content h1 {
                font-size: 2rem;
                font-weight: bold;
                margin: 1.5rem 0 1rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content h2 {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 1.2rem 0 0.8rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content h3 {
                font-size: 1.25rem;
                font-weight: bold;
                margin: 1rem 0 0.6rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content p {
                margin: 0.8rem 0;
                color: #654321;
              }
              .blog-content ul, .blog-content ol {
                padding-left: 2rem;
                margin: 1rem 0;
                color: #654321;
              }
              .blog-content li {
                margin: 0.5rem 0;
              }
              .blog-content img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 1.5rem 0;
                box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
              }
              .blog-content a {
                color: #8B4513;
                text-decoration: underline;
                font-weight: 500;
              }
              .blog-content strong {
                font-weight: 600;
                color: #8B4513;
              }
              .blog-content em {
                font-style: italic;
              }
              .blog-content blockquote {
                border-left: 4px solid #8B4513;
                padding-left: 1rem;
                margin: 1rem 0;
                font-style: italic;
                color: #654321;
              }
            `}),e.jsx(a,{color:"rgba(139, 69, 19, 0.3)",my:"xl"}),e.jsxs(o,{justify:"space-between",children:[e.jsxs(t,{c:"#8B4513",size:"sm",children:["Published on ",new Date(r.published_at||r.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]}),e.jsxs(t,{c:"#8B4513",size:"sm",children:["by ",r.author?.name]})]})]})})})})};export{v as default};
