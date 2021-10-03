var A=Object.defineProperty,L=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var M=(t,e,s)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,f=(t,e)=>{for(var s in e||(e={}))x.call(e,s)&&M(t,s,e[s]);if(m)for(var s of m(e))C.call(e,s)&&M(t,s,e[s]);return t},p=(t,e)=>L(t,O(e));var S=(t,e)=>{var s={};for(var o in t)x.call(t,o)&&e.indexOf(o)<0&&(s[o]=t[o]);if(t!=null&&m)for(var o of m(t))e.indexOf(o)<0&&C.call(t,o)&&(s[o]=t[o]);return s};import{u as P,r as u,j as l,a,F as j,b as N,C as I,M as F,c as B,d as R,e as w,f as K,R as T,g as k,h as q}from"./vendor.887d598f.js";const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}};H();const g="https://jsonplaceholder.typicode.com/";function X(t){const e=()=>{t.update(p(f({},t.task),{completed:!t.task.completed}))},s=()=>{t.delete(t.task)},_=P(),{toggleMenu:o}=_,n=S(_,["toggleMenu"]),[i,r]=u.exports.useState({x:0,y:0}),[v,h]=u.exports.useState(!1),[c,D]=u.exports.useState(t.task.title),b=d=>{D(d.target.value)},E=d=>{d.code==="Enter"&&y()},y=()=>{o(!1),h(!v),t.update(p(f({},t.task),{title:c}))};return l("div",{className:"task_item",onContextMenu:d=>{d.preventDefault(),r({x:d.clientX,y:d.clientY}),o(!0)},children:[l("div",{className:"task_left",children:[a("div",{className:"task_icon_holder",onClick:e,children:t.task.completed?a(j,{}):a(N,{})}),a("div",{className:t.task.completed?"task_item_completed":void 0,children:c})]}),l(I,p(f({},n),{anchorPoint:i,onClose:()=>o(!1),children:[l(F,{onClick:y,children:[a(B,{})," Edit "]}),l(F,{onClick:s,children:[a(R,{})," Delete "]})]})),l(w,{open:v,onClose:y,center:!0,children:[a("h1",{children:"Edit!"}),a("input",{value:c,onChange:b,onKeyDown:E})]})]})}function Y(t){const[e,s]=u.exports.useState(""),o=h=>{s(h.target.value)},[n,i]=u.exports.useState(!1),r=h=>{i(c=>!c)};return l("div",{className:"create_holder",children:[n||e!==""?a(N,{}):a(K,{}),a("input",{type:"text",maxLength:255,placeholder:"Add a task",value:e,onChange:o,onFocus:r,onBlur:r,className:e===""?"create_empty_input":"create_filled_input"}),e===""?null:a("button",{onClick:()=>{t.add(e)},children:"ADD"})]})}class z extends T.Component{constructor(e){super(e);this.state={tasks:[]},this.create=this.create.bind(this),this.update=this.update.bind(this),this.delete=this.delete.bind(this)}componentDidMount(){this.read()}create(e){k.post(g+"todos",{title:e,userId:1,completed:!1}).then(({data:s})=>{this.setState(o=>({tasks:[...o.tasks,s]}))})}read(){k.get(g+"todos/").then(e=>{this.setState({tasks:e.data})})}update(e){k.put(g+"todos/"+e.id,e).then(({data:s})=>{this.setState(o=>({tasks:o.tasks.map(n=>s.id===n.id?s:n)}))}).catch(s=>{console.log(s)})}delete(e){k.delete(g+"todos/"+e.id).then(s=>{this.setState(o=>({tasks:o.tasks.filter(n=>n.id!==e.id)}))})}render(){return l("div",{className:"task_item_holder",children:[a("h1",{className:"title_mobile",children:"ToDo"}),a("h1",{className:"title_desktop",children:"ToDo List"}),a(Y,{add:this.create}),this.state.tasks.sort((e,s)=>e.completed&&!s.completed?1:!e.completed&&s.completed?-1:0).map(e=>a(X,{task:e,update:this.update,delete:this.delete},e.id))]})}}function G(){return a(z,{})}q.render(a(T.StrictMode,{children:a(G,{})}),document.getElementById("root"));
