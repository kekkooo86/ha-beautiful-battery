const $t="modulepreload",wt=function(i){return"/"+i},K={},xt=function(t,e,s){let o=Promise.resolve();if(e&&e.length>0){let a=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),n=l?.nonce||l?.getAttribute("nonce");o=a(e.map(c=>{if(c=wt(c),c in K)return;K[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":$t,d||(u.as="script"),u.crossOrigin="",u.href=c,n&&u.setAttribute("nonce",n),document.head.appendChild(u),d)return new Promise((g,y)=>{u.addEventListener("load",g),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return o.then(a=>{for(const l of a||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,Y=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),Q=new WeakMap;let gt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const At=i=>new gt(typeof i=="string"?i:i+"",void 0,F),_t=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,o,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new gt(e,i,F)},Et=(i,t)=>{if(Y)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=H.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},tt=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return At(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:St,defineProperty:Pt,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:kt,getOwnPropertySymbols:zt,getPrototypeOf:Mt}=Object,I=globalThis,et=I.trustedTypes,Ot=et?et.emptyScript:"",Tt=I.reactiveElementPolyfillSupport,M=(i,t)=>i,D={toAttribute(i,t){switch(t){case Boolean:i=i?Ot:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},V=(i,t)=>!St(i,t),it={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),I.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=it){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&Pt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:r}=Ct(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:o,set(a){const l=o?.call(this);r?.call(this,a),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??it}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,s=[...kt(e),...zt(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(tt(o))}else t!==void 0&&e.push(tt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const r=s.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:D;this._$Em=o;const l=a.fromAttribute(e,r.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(t,e,s,o=!1,r){if(t!==void 0){const a=this.constructor;if(o===!1&&(r=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??V)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[M("elementProperties")]=new Map,E[M("finalized")]=new Map,Tt?.({ReactiveElement:E}),(I.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=globalThis,st=i=>i,L=X.trustedTypes,ot=L?L.createPolicy("lit-html",{createHTML:i=>i}):void 0,ft="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+$,Nt=`<${bt}>`,A=document,O=()=>A.createComment(""),T=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,Ut=i=>W(i)||typeof i?.[Symbol.iterator]=="function",B=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,at=/>/g,w=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,lt=/"/g,vt=/^(?:script|style|textarea|title)$/i,Rt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),_=Rt(1),P=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ct=new WeakMap,x=A.createTreeWalker(A,129);function mt(i,t){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}const Ht=(i,t)=>{const e=i.length-1,s=[];let o,r=t===2?"<svg>":t===3?"<math>":"",a=k;for(let l=0;l<e;l++){const n=i[l];let c,d,h=-1,u=0;for(;u<n.length&&(a.lastIndex=u,d=a.exec(n),d!==null);)u=a.lastIndex,a===k?d[1]==="!--"?a=rt:d[1]!==void 0?a=at:d[2]!==void 0?(vt.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=w):d[3]!==void 0&&(a=w):a===w?d[0]===">"?(a=o??k,h=-1):d[1]===void 0?h=-2:(h=a.lastIndex-d[2].length,c=d[1],a=d[3]===void 0?w:d[3]==='"'?lt:nt):a===lt||a===nt?a=w:a===rt||a===at?a=k:(a=w,o=void 0);const g=a===w&&i[l+1].startsWith("/>")?" ":"";r+=a===k?n+Nt:h>=0?(s.push(c),n.slice(0,h)+ft+n.slice(h)+$+g):n+$+(h===-2?l:g)}return[mt(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class N{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,a=0;const l=t.length-1,n=this.parts,[c,d]=Ht(t,e);if(this.el=N.createElement(c,s),x.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=x.nextNode())!==null&&n.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(ft)){const u=d[a++],g=o.getAttribute(h).split($),y=/([.?@])?(.*)/.exec(u);n.push({type:1,index:r,name:y[2],strings:g,ctor:y[1]==="."?Lt:y[1]==="?"?It:y[1]==="@"?jt:j}),o.removeAttribute(h)}else h.startsWith($)&&(n.push({type:6,index:r}),o.removeAttribute(h));if(vt.test(o.tagName)){const h=o.textContent.split($),u=h.length-1;if(u>0){o.textContent=L?L.emptyScript:"";for(let g=0;g<u;g++)o.append(h[g],O()),x.nextNode(),n.push({type:2,index:++r});o.append(h[u],O())}}}else if(o.nodeType===8)if(o.data===bt)n.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf($,h+1))!==-1;)n.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function C(i,t,e=i,s){if(t===P)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl;const r=T(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=C(i,o._$AS(i,t.values),o,s)),t}class Dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??A).importNode(e,!0);x.currentNode=o;let r=x.nextNode(),a=0,l=0,n=s[0];for(;n!==void 0;){if(a===n.index){let c;n.type===2?c=new R(r,r.nextSibling,this,t):n.type===1?c=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(c=new Bt(r,this,t)),this._$AV.push(c),n=s[++l]}a!==n?.index&&(r=x.nextNode(),a++)}return x.currentNode=A,o}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),T(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==P&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(mt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const r=new Dt(o,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=ct.get(t.strings);return e===void 0&&ct.set(t.strings,e=new N(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const r of t)o===e.length?e.push(s=new R(this.O(O()),this.O(O()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=st(t).nextSibling;st(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,o){const r=this.strings;let a=!1;if(r===void 0)t=C(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==P,a&&(this._$AH=t);else{const l=t;let n,c;for(t=r[0],n=0;n<r.length-1;n++)c=C(this,l[s+n],e,n),c===P&&(c=this._$AH[n]),a||=!T(c)||c!==this._$AH[n],c===p?t=p:t!==p&&(t+=(c??"")+r[n+1]),this._$AH[n]=c}a&&!o&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Lt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class It extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class jt extends j{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??p)===P)return;const s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Bt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const qt=X.litHtmlPolyfillSupport;qt?.(N,R),(X.litHtmlVersions??=[]).push("3.3.3");const Yt=(i,t,e)=>{const s=e?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const r=e?.renderBefore??null;s._$litPart$=o=new R(t.insertBefore(O(),r),r,void 0,e??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis;class S extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}}S._$litElement$=!0,S.finalized=!0,G.litElementHydrateSupport?.({LitElement:S});const Ft=G.litElementPolyfillSupport;Ft?.({LitElement:S});(G.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:V},Xt=(i=Vt,t,e)=>{const{kind:s,metadata:o}=e;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){const{name:a}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,n,i,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,i,l),l}}}if(s==="setter"){const{name:a}=e;return function(l){const n=this[a];t.call(this,l),this.requestUpdate(a,n,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function Z(i){return(t,e)=>typeof e=="object"?Xt(i,t,e):((s,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),a?Object.getOwnPropertyDescriptor(o,r):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(i){return Z({...i,state:!0,attribute:!1})}var Wt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,v=(i,t,e,s)=>{for(var o=s>1?void 0:s?Gt(t,e):t,r=i.length-1,a;r>=0;r--)(a=i[r])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Wt(t,e,o),o};const ht={type:"custom:beautiful-battery",entity:"",theme:"liquid-glass",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,show_particles:!0,charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,voltage_entity:"",power_entity:""},Zt={small:140,medium:200,large:260},dt={it:{charging:"In carica",discharging:"Scarica",full:"Piena",empty:"Vuota"},en:{charging:"Charging",discharging:"Discharging",full:"Full",empty:"Empty"}};function z(i,t,e){return Math.min(Math.max(i,t),e)}function q(i,t,e){const s=parseInt(i.slice(1),16),o=parseInt(t.slice(1),16),r=s>>16&255,a=s>>8&255,l=s&255,n=o>>16&255,c=o>>8&255,d=o&255,h=Math.round(r+(n-r)*e),u=Math.round(a+(c-a)*e),g=Math.round(l+(d-l)*e);return`#${((1<<24)+(h<<16)+(u<<8)+g).toString(16).slice(1)}`}function Jt(i,t){return i<25?q(t.low,t.mid,i/25):i<50?q(t.mid,t.high,(i-25)/25):i<85?q(t.high,t.full,(i-50)/35):t.full}let f=class extends S{constructor(){super(...arguments),this._chargePercent=0,this._displayPercent=0,this._isCharging=!1,this._mouseX=0,this._mouseY=0,this._mouseActive=!1,this._isDark=!0,this._initialized=!1,this._particles=[]}static async getConfigElement(){return await xt(()=>Promise.resolve().then(()=>ee),void 0),document.createElement("beautiful-battery-editor")}static getStubConfig(){return{type:"custom:beautiful-battery",entity:""}}setConfig(i){this._config={...ht,...i},this._syncState()}updated(i){i.has("hass")&&this._syncState(),i.has("_chargePercent")&&this._config?.show_particles&&this._generateParticles()}_syncState(){if(!this.hass||!this._config?.entity)return;const i=this.hass.states[this._config.entity];if(i){if(this._config.test_override!=null)this._chargePercent=z(this._config.test_override,0,100);else{const t=Number(i.state);this._chargePercent=z(Number.isFinite(t)?t:0,0,100)}this._isCharging=i.state==="charging"||typeof i.attributes?.battery_charging=="boolean"&&i.attributes.battery_charging||i.attributes?.charging===!0,this._isDark=this.hass.themes?.darkMode!==!1,this._initialized?this._displayPercent=this._chargePercent:(this._initialized=!0,setTimeout(()=>{this._displayPercent=this._chargePercent},50)),this._generateParticles()}}_generateParticles(){const i=Math.max(2,Math.floor(this._chargePercent/15));this._particles=Array.from({length:i},()=>({x:10+Math.random()*80,y:10+Math.random()*70,size:2+Math.random()*4,dur:2+Math.random()*3,delay:Math.random()*2}))}_getLang(){return this._config?.language&&this._config.language!=="auto"?this._config.language:this.hass?.locale?.language??this.hass?.language??"en"}_getStatusLabel(){const i=this._getLang(),t=dt[i]??dt.en;return this._isCharging?t.charging:this._chargePercent>=100?t.full:this._chargePercent<=0?t.empty:t.discharging}_getColor(){return Jt(this._chargePercent,this._config?.charge_colors??ht.charge_colors)}_getEntityState(i){if(!this.hass||!i)return null;const t=this.hass.states[i];if(!t)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}_onPointerMove(i){const t=this.shadowRoot?.querySelector(".battery-wrapper");if(!t)return;const e=t.getBoundingClientRect(),s=(i.clientX-e.left)/e.width-.5,o=(i.clientY-e.top)/e.height-.5;this._mouseX=s,this._mouseY=o,this._mouseActive=!0}_onPointerLeave(){this._mouseActive=!1}_handleTap(i){i.stopPropagation();const t=this._config?.tap_action;if(!(!t||t.action==="none"||!this.hass||!this._config?.entity))switch(t.action){case"more-info":{const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}});this.dispatchEvent(e);break}case"toggle":this.hass.callService?.("homeassistant","toggle",{entity_id:this._config.entity});break;case"call-service":if(t.service){const[e,s]=t.service.split(".");this.hass.callService?.(e,s,t.service_data,t.target)}break}}render(){if(!this._config)return _``;const i=this.hass?.states[this._config.entity];if(!i)return _`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`;const t=this._displayPercent,e=this._getColor(),s=this._config.theme==="solid",o=Zt[this._config.size],r=o*.45,a=o,l=r*.35,n=12,c=z(this._config.glow_intensity,0,1),d=this._getEntityState(this._config.voltage_entity),h=this._getEntityState(this._config.power_entity),u=this._mouseActive?z(this._mouseY*-15,-12,12):0,g=this._mouseActive?z(this._mouseX*15,-12,12):0,y=[{left:"20%",delay:"0s"},{left:"45%",delay:"0.6s"},{left:"70%",delay:"1.2s"}];return _`
      <ha-card>
        <div class="battery-wrapper ${this._mouseActive?"mouse-active":""}"
             @pointermove=${this._onPointerMove}
             @pointerleave=${this._onPointerLeave}
             @click=${this._handleTap}>
          <div class="battery-outer" style="transform: rotateX(${u}deg) rotateY(${g}deg);">

            <div class="drops-area">
              <div class="drops-above">
                ${this._isCharging?y.map(b=>_`
                  <div class="drop falling-in" style="
                    left: calc(${b.left} - 4px);
                    animation-delay: ${b.delay};
                    --drop-distance: ${a+n+10}px;
                  ">
                    <div class="drop-inner" style="background: ${e};"></div>
                  </div>
                `):p}
              </div>

              <div>
                <div class="battery-cap ${s?"solid-theme":""}"
                     style="width:${l}px; height:${n}px;">
                  <div class="battery-cap-inner"></div>
                </div>

                <div class="battery-body ${this._isCharging?"charging":""} ${s?"solid-theme":""}"
                     style="width:${r}px; height:${a}px;">
                  <div class="charge-glow"
                       style="height: ${t}%; background: ${e}; opacity: ${c}; filter: blur(${12+c*20}px); box-shadow: 0 0 ${20+c*30}px ${e};">
                  </div>

                  <div class="charge-fill ${this._initialized?"":"animating"}"
                       style="height: ${t}%; background: linear-gradient(0deg, ${e}, ${e}ee);">
                    <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                         style="fill: ${e};">
                      <path d="${this._wavePath()}">
                        <animate attributeName="d"
                                 values="${this._wavePath()};${this._wavePath(1)};${this._wavePath()}"
                                 dur="3s"
                                 repeatCount="indefinite" />
                      </path>
                    </svg>

                    ${this._config.show_particles?this._particles.map(b=>_`
                      <div class="particle" style="
                        left: ${b.x}%;
                        bottom: ${b.y}%;
                        width: ${b.size}px;
                        height: ${b.size}px;
                        animation-duration: ${b.dur}s;
                        animation-delay: ${b.delay}s;
                      "></div>
                    `):p}
                  </div>
                </div>
              </div>

              <div class="drops-below">
                ${!this._isCharging&&t>5?y.map(b=>_`
                  <div class="drop draining-out" style="
                    left: calc(${b.left} - 4px);
                    animation-delay: ${b.delay};
                    --drop-distance: ${50}px;
                  ">
                    <div class="drop-inner" style="background: ${e};"></div>
                  </div>
                `):p}
              </div>
            </div>

          </div>

          <div class="battery-info">
            <span class="battery-name">${this._config.name??i.attributes?.friendly_name??this._config.entity}</span>
            ${this._config.show_percentage?_`
              <span class="battery-percentage" style="color: ${e};">${Math.round(t)}%</span>
            `:p}
            ${this._config.show_status?_`
              <span class="battery-status" style="color: ${e};">${this._getStatusLabel()}</span>
            `:p}
            <div class="battery-details">
              ${this._config.show_voltage&&d!=null?_`
                <span><span class="battery-detail-value">${d.toFixed(1)}</span> V</span>
              `:p}
              ${this._config.show_power&&h!=null?_`
                <span><span class="battery-detail-value">${h.toFixed(1)}</span> W</span>
              `:p}
            </div>
          </div>
        </div>
      </ha-card>
    `}_wavePath(i=0){const t=[];for(let e=0;e<=100;e+=2){const s=8+Math.sin((e+i*50)*.08)*4+Math.sin((e+i*30)*.15)*2;t.push(`${e},${s.toFixed(1)}`)}return`M0,16 L${t.join(" L")} L100,16 Z`}getCardSize(){return 3}};f.styles=_t`
    :host {
      display: block;
    }

    ha-card {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
    }

    .battery-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      padding: 20px;
      perspective: 800px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .battery-outer {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    }

    .battery-wrapper:not(.mouse-active) .battery-outer {
      animation: bb-float 4s ease-in-out infinite;
    }

    @keyframes bb-float {
      0%, 100% { transform: translateY(0) rotateX(2deg) rotateY(0deg); }
      25% { transform: translateY(-6px) rotateX(0deg) rotateY(3deg); }
      50% { transform: translateY(-2px) rotateX(-2deg) rotateY(0deg); }
      75% { transform: translateY(-8px) rotateX(0deg) rotateY(-3deg); }
    }

    .drops-area {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .drops-above {
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      height: 30px;
      pointer-events: none;
      overflow: visible;
    }

    .drops-below {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 30px;
      pointer-events: none;
      overflow: visible;
    }

    .drop {
      position: absolute;
      pointer-events: none;
    }

    .drop-inner {
      width: 8px;
      height: 12px;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      opacity: 0.85;
    }

    .drop.falling-in {
      animation: bb-drop-fall-in 2s ease-in infinite;
    }

    .drop.draining-out {
      animation: bb-drop-drain-out 2s ease-in infinite;
    }

    @keyframes bb-drop-fall-in {
      0% {
        transform: translateY(0) scale(0.6);
        opacity: 0;
      }
      15% {
        opacity: 0.9;
        transform: translateY(-5px) scale(0.8);
      }
      60% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(var(--drop-distance, 50px)) scale(1.2, 0.3);
        opacity: 0;
      }
    }

    @keyframes bb-drop-drain-out {
      0% {
        transform: translateY(0) scale(0.8);
        opacity: 0;
      }
      15% {
        opacity: 0.9;
      }
      60% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(var(--drop-distance, 50px)) scale(0.5, 1.3);
        opacity: 0;
      }
    }

    .battery-cap {
      position: relative;
      margin: 0 auto;
      border-radius: 6px 6px 0 0;
      z-index: 2;
    }

    .battery-cap-inner {
      width: 100%;
      height: 100%;
      border-radius: 6px 6px 0 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: none;
      box-shadow:
        0 -2px 8px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .battery-body {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.05) 40%,
        rgba(0, 0, 0, 0.1) 100%
      );
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    }

    .battery-body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.0) 100%
      );
      border-radius: 16px 16px 0 0;
      pointer-events: none;
      z-index: 3;
    }

    .battery-body::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 8px;
      right: 60%;
      height: 6px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 100px;
      filter: blur(3px);
      pointer-events: none;
      z-index: 4;
    }

    .battery-body.solid-theme {
      background: linear-gradient(135deg, #3a3a40 0%, #252528 50%, #1a1a1d 100%);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    }

    .battery-body.solid-theme::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%);
    }

    .battery-body.solid-theme::after {
      background: rgba(255, 255, 255, 0.12);
    }

    .battery-cap.solid-theme .battery-cap-inner {
      background: linear-gradient(180deg, #3a3a40 0%, #2a2a2e 100%);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
    }

    .charge-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 16px 16px;
      pointer-events: none;
      z-index: 0;
    }

    .charge-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 14px 14px;
      transition: height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                  background 0.8s ease;
      z-index: 1;
    }

    .charge-fill.animating {
      transition: height 2s cubic-bezier(0.34, 1.56, 0.64, 1),
                  background 0.8s ease;
    }

    .charge-fill::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.35) 0%,
        rgba(255, 255, 255, 0.0) 100%
      );
      pointer-events: none;
    }

    .charge-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 10%;
      right: 50%;
      height: 8px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 100px;
      filter: blur(4px);
    }

    .liquid-wave {
      position: absolute;
      top: -8px;
      left: -5%;
      width: 110%;
      height: 16px;
      z-index: 2;
      pointer-events: none;
    }

    .liquid-wave path {
      fill: inherit;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      pointer-events: none;
      z-index: 2;
      animation: bb-particle-float linear infinite;
    }

    @keyframes bb-particle-float {
      0% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      10% { opacity: 0.6; }
      90% { opacity: 0.3; }
      100% {
        transform: translateY(-100%) translateX(10px) scale(0.5);
        opacity: 0;
      }
    }

    .battery-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin-top: 14px;
    }

    .battery-name {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      text-align: center;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .battery-percentage {
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .battery-status {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      opacity: 0.7;
    }

    .battery-details {
      display: flex;
      gap: 16px;
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 2px;
    }

    .battery-detail-value {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
    }

    .charging .charge-fill::before {
      animation: bb-shimmer 2s ease-in-out infinite;
    }

    @keyframes bb-shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .battery-body:active {
      transform: scale(0.97);
      transition: transform 0.1s ease;
    }

    :host(.light-theme) .battery-body {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.65) 0%,
        rgba(255, 255, 255, 0.35) 40%,
        rgba(200, 200, 200, 0.2) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    }

    :host(.light-theme) .battery-name,
    :host(.light-theme) .battery-percentage,
    :host(.light-theme) .battery-status,
    :host(.light-theme) .battery-details {
      color: rgba(0, 0, 0, 0.75);
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    }

    :host(.light-theme) .battery-detail-value {
      color: rgba(0, 0, 0, 0.85);
    }

    :host(.light-theme) .battery-cap-inner {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    :host(.light-theme) .battery-body::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    }

    :host(.light-theme) .battery-body::after {
      background: rgba(255, 255, 255, 0.4);
    }
  `;v([Z({attribute:!1})],f.prototype,"hass",2);v([m()],f.prototype,"_config",2);v([m()],f.prototype,"_chargePercent",2);v([m()],f.prototype,"_displayPercent",2);v([m()],f.prototype,"_isCharging",2);v([m()],f.prototype,"_mouseX",2);v([m()],f.prototype,"_mouseY",2);v([m()],f.prototype,"_mouseActive",2);v([m()],f.prototype,"_isDark",2);v([m()],f.prototype,"_initialized",2);f=v([yt("beautiful-battery")],f);const Kt="beautiful-battery";window.customCards=window.customCards??[];window.customCards.push({type:Kt,name:"Beautiful Battery",description:"3D liquid glass battery visualization with smooth animations",icon:"mdi:battery",preview:!0});var Qt=Object.defineProperty,te=Object.getOwnPropertyDescriptor,J=(i,t,e,s)=>{for(var o=s>1?void 0:s?te(t,e):t,r=i.length-1,a;r>=0;r--)(a=i[r])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Qt(t,e,o),o};const pt={type:"custom:beautiful-battery",entity:"",theme:"liquid-glass",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,show_particles:!0,charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,voltage_entity:"",power_entity:""},ut={it:{entity:"Entita",battery_sensor:"Sensore batteria",display_name:"Nome visualizzato",appearance:"Aspetto",theme:"Tema",theme_liquid:"Vetro liquido",theme_solid:"Solido",size:"Dimensione",size_small:"Piccolo (140px)",size_medium:"Medio (200px)",size_large:"Grande (260px)",glow:"Intensita bagliore",display:"Visualizzazione",show_pct:"Mostra percentuale",show_status:"Mostra stato",show_voltage:"Mostra voltaggio",show_power:"Mostra potenza",show_particles:"Mostra particelle",voltage_entity:"Entita voltaggio",power_entity:"Entita potenza",language:"Lingua",lang_auto:"Automatica (da HA)",interaction:"Interazione",tap_action:"Azione al tocco",tap_more:"Piu info",tap_toggle:"Toggle",tap_none:"Nessuna",test_override:"Override test percentuale",test_off:"Disabilitato (usa entita)",test_reset:"Reset",colors:"Colori",color_low:"Basso 0%",color_mid:"Medio 25%",color_high:"Alto 50%",color_full:"Pieno 85%"},en:{entity:"Entity",battery_sensor:"Battery sensor",display_name:"Display name",appearance:"Appearance",theme:"Theme",theme_liquid:"Liquid Glass",theme_solid:"Solid",size:"Size",size_small:"Small (140px)",size_medium:"Medium (200px)",size_large:"Large (260px)",glow:"Glow intensity",display:"Display",show_pct:"Show percentage",show_status:"Show status",show_voltage:"Show voltage",show_power:"Show power",show_particles:"Show particles",voltage_entity:"Voltage entity",power_entity:"Power entity",language:"Language",lang_auto:"Auto (from HA)",interaction:"Interaction",tap_action:"Tap action",tap_more:"More Info",tap_toggle:"Toggle",tap_none:"None",test_override:"Test percentage override",test_off:"Disabled (using entity)",test_reset:"Reset",colors:"Colors",color_low:"Low 0%",color_mid:"Mid 25%",color_high:"High 50%",color_full:"Full 85%"}};let U=class extends S{constructor(){super(...arguments),this._config={...pt}}setConfig(i){this._config={...pt,...i}}_t(i){const t=this._config.language==="auto"?this.hass?.locale?.language??this.hass?.language??"en":this._config.language;return ut[t]?.[i]??ut.en[i]??i}render(){return this.hass?_`
      <div class="editor">
        <section class="section">
          <div class="section-title">${this._t("entity")}</div>
          <div class="field">
            <ha-selector
              .hass=${this.hass}
              .value=${this._config.entity}
              .selector=${{entity:{device_class:"battery"}}}
              .label=${this._t("battery_sensor")}
              .required=${!1}
              @value-changed=${i=>this._update("entity",i.detail?.value??"")}
            ></ha-selector>
          </div>
          <div class="field">
            <label class="field-label">${this._t("display_name")}</label>
            <input type="text" .value=${this._config.name??""}
                   @input=${i=>this._update("name",i.target.value||void 0)} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("appearance")}</div>
          <div class="field">
            <label class="field-label">${this._t("theme")}</label>
            <select .value=${this._config.theme}
                    @change=${i=>this._update("theme",i.target.value)}>
              <option value="liquid-glass">${this._t("theme_liquid")}</option>
              <option value="solid">${this._t("theme_solid")}</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">${this._t("size")}</label>
            <select .value=${this._config.size}
                    @change=${i=>this._update("size",i.target.value)}>
              <option value="small">${this._t("size_small")}</option>
              <option value="medium">${this._t("size_medium")}</option>
              <option value="large">${this._t("size_large")}</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">${this._t("glow")}: ${this._config.glow_intensity.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.05" .value=${String(this._config.glow_intensity)}
                   @input=${i=>this._update("glow_intensity",Number(i.target.value))} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("display")}</div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_pct")}</div></div>
            <ha-switch .checked=${this._config.show_percentage}
              @change=${i=>this._update("show_percentage",i.target.checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_status")}</div></div>
            <ha-switch .checked=${this._config.show_status}
              @change=${i=>this._update("show_status",i.target.checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_voltage")}</div></div>
            <ha-switch .checked=${this._config.show_voltage}
              @change=${i=>this._update("show_voltage",i.target.checked)}
            ></ha-switch>
          </div>
          ${this._config.show_voltage?_`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.voltage_entity}
                .selector=${{entity:{device_class:"voltage"}}}
                .label=${this._t("voltage_entity")}
                .required=${!1}
                @value-changed=${i=>this._update("voltage_entity",i.detail?.value??"")}
              ></ha-selector>
            </div>
          `:""}
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_power")}</div></div>
            <ha-switch .checked=${this._config.show_power}
              @change=${i=>this._update("show_power",i.target.checked)}
            ></ha-switch>
          </div>
          ${this._config.show_power?_`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.power_entity}
                .selector=${{entity:{device_class:"power"}}}
                .label=${this._t("power_entity")}
                .required=${!1}
                @value-changed=${i=>this._update("power_entity",i.detail?.value??"")}
              ></ha-selector>
            </div>
          `:""}
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_particles")}</div></div>
            <ha-switch .checked=${this._config.show_particles}
              @change=${i=>this._update("show_particles",i.target.checked)}
            ></ha-switch>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("language")}</div>
          <div class="field">
            <select .value=${this._config.language}
                    @change=${i=>this._update("language",i.target.value)}>
              <option value="auto">${this._t("lang_auto")}</option>
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("interaction")}</div>
          <div class="field">
            <label class="field-label">${this._t("tap_action")}</label>
            <select .value=${this._config.tap_action.action}
                    @change=${i=>this._updateTapAction(i.target.value)}>
              <option value="more-info">${this._t("tap_more")}</option>
              <option value="toggle">${this._t("tap_toggle")}</option>
              <option value="none">${this._t("tap_none")}</option>
            </select>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("test_override")}</div>
          <div class="field">
            <label class="field-label">
              ${this._config.test_override!=null?`${this._config.test_override}%`:this._t("test_off")}
            </label>
            <div class="test-override">
              <button style="background:none;border:none;color:var(--primary-color);cursor:pointer;font-size:12px;padding:4px 0;"
                      @click=${()=>this._update("test_override",null)}>
                ${this._t("test_reset")}
              </button>
              <input type="range" min="0" max="100" step="1"
                     .value=${String(this._config.test_override??50)}
                     @input=${i=>this._update("test_override",Number(i.target.value))} />
              <span class="value">${this._config.test_override!=null?this._config.test_override+"%":"Off"}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("colors")}</div>
          <div class="color-row">
            <div class="color-item">
              <label>${this._t("color_low")}</label>
              <input type="color" .value=${this._config.charge_colors.low}
                     @input=${i=>this._updateColor("low",i.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_mid")}</label>
              <input type="color" .value=${this._config.charge_colors.mid}
                     @input=${i=>this._updateColor("mid",i.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_high")}</label>
              <input type="color" .value=${this._config.charge_colors.high}
                     @input=${i=>this._updateColor("high",i.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_full")}</label>
              <input type="color" .value=${this._config.charge_colors.full}
                     @input=${i=>this._updateColor("full",i.target.value)} />
            </div>
          </div>
        </section>
      </div>
    `:_``}_update(i,t){this._config={...this._config,[i]:t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateColor(i,t){this._config={...this._config,charge_colors:{...this._config.charge_colors,[i]:t}},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateTapAction(i){this._config={...this._config,tap_action:{action:i}},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};U.styles=_t`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }
    select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    ha-switch {
      margin: 4px 0;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }
    .toggle-label {
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .color-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex: 1;
    }
    .color-item label {
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .color-item input[type="color"] {
      width: 40px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      cursor: pointer;
    }
    .test-override {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .test-override input[type="range"] {
      flex: 1;
    }
    .test-override .value {
      font-size: 12px;
      color: var(--secondary-text-color);
      min-width: 40px;
      text-align: right;
    }
  `;J([Z({attribute:!1})],U.prototype,"hass",2);J([m()],U.prototype,"_config",2);U=J([yt("beautiful-battery-editor")],U);const ee=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));
