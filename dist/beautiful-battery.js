const Ut="modulepreload",Lt=function(e){return"/"+e},nt={},Rt=function(t,i,s){let a=Promise.resolve();if(i&&i.length>0){let n=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=r?.nonce||r?.getAttribute("nonce");a=n(i.map(h=>{if(h=Lt(h),h in nt)return;nt[h]=!0;const p=h.endsWith(".css"),l=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${l}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":Ut,p||(u.as="script"),u.crossOrigin="",u.href=h,c&&u.setAttribute("nonce",c),document.head.appendChild(u),p)return new Promise((v,m)=>{u.addEventListener("load",v),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return a.then(n=>{for(const r of n||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,Z=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),rt=new WeakMap;let xt=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Z&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=rt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&rt.set(i,t))}return t}toString(){return this.cssText}};const Ht=e=>new xt(typeof e=="string"?e:e+"",void 0,J),At=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,a,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[o+1],e[0]);return new xt(i,e,J)},Dt=(e,t)=>{if(Z)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),a=j.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}},lt=Z?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Ht(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:It,defineProperty:qt,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:jt,getOwnPropertySymbols:Yt,getPrototypeOf:Ft}=Object,X=globalThis,ct=X.trustedTypes,Xt=ct?ct.emptyScript:"",Wt=X.reactiveElementPolyfillSupport,N=(e,t)=>e,Y={toAttribute(e,t){switch(t){case Boolean:e=e?Xt:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},K=(e,t)=>!It(e,t),ht={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=ht){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(t,s,i);a!==void 0&&qt(this.prototype,t,a)}}static getPropertyDescriptor(t,i,s){const{get:a,set:o}=Bt(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:a,set(n){const r=a?.call(this);o?.call(this,n),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;const t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){const i=this.properties,s=[...jt(i),...Yt(i)];for(const a of s)this.createProperty(a,i[a])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,a]of i)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const a=this._$Eu(i,s);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const a of s)i.unshift(lt(a))}else t!==void 0&&i.push(lt(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,s);if(a!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:Y).toAttribute(i,s.type);this._$Em=t,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(t,i){const s=this.constructor,a=s._$Eh.get(t);if(a!==void 0&&this._$Em!==a){const o=s.getPropertyOptions(a),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Y;this._$Em=a;const r=n.fromAttribute(i,o.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(t,i,s,a=!1,o){if(t!==void 0){const n=this.constructor;if(a===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??K)(o,i)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:a,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),a===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[a,o]of s){const{wrapped:n}=o,r=this[a];n!==!0||this._$AL.has(a)||r===void 0||this.C(a,void 0,o,r)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[N("elementProperties")]=new Map,E[N("finalized")]=new Map,Wt?.({ReactiveElement:E}),(X.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis,dt=e=>e,F=tt.trustedTypes,pt=F?F.createPolicy("lit-html",{createHTML:e=>e}):void 0,St="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+w,Vt=`<${Pt}>`,P=document,U=()=>P.createComment(""),L=e=>e===null||typeof e!="object"&&typeof e!="function",et=Array.isArray,Gt=e=>et(e)||typeof e?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,ut=/>/g,x=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,ft=/"/g,Et=/^(?:script|style|textarea|title)$/i,Qt=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),g=Qt(1),k=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),vt=new WeakMap,S=P.createTreeWalker(P,129);function Ct(e,t){if(!et(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}const Zt=(e,t)=>{const i=e.length-1,s=[];let a,o=t===2?"<svg>":t===3?"<math>":"",n=O;for(let r=0;r<i;r++){const c=e[r];let h,p,l=-1,u=0;for(;u<c.length&&(n.lastIndex=u,p=n.exec(c),p!==null);)u=n.lastIndex,n===O?p[1]==="!--"?n=gt:p[1]!==void 0?n=ut:p[2]!==void 0?(Et.test(p[2])&&(a=RegExp("</"+p[2],"g")),n=x):p[3]!==void 0&&(n=x):n===x?p[0]===">"?(n=a??O,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?x:p[3]==='"'?ft:_t):n===ft||n===_t?n=x:n===gt||n===ut?n=O:(n=x,a=void 0);const v=n===x&&e[r+1].startsWith("/>")?" ":"";o+=n===O?c+Vt:l>=0?(s.push(h),c.slice(0,l)+St+c.slice(l)+w+v):c+w+(l===-2?r:v)}return[Ct(e,o+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class R{constructor({strings:t,_$litType$:i},s){let a;this.parts=[];let o=0,n=0;const r=t.length-1,c=this.parts,[h,p]=Zt(t,i);if(this.el=R.createElement(h,s),S.currentNode=this.el.content,i===2||i===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(a=S.nextNode())!==null&&c.length<r;){if(a.nodeType===1){if(a.hasAttributes())for(const l of a.getAttributeNames())if(l.endsWith(St)){const u=p[n++],v=a.getAttribute(l).split(w),m=/([.?@])?(.*)/.exec(u);c.push({type:1,index:o,name:m[2],strings:v,ctor:m[1]==="."?Kt:m[1]==="?"?te:m[1]==="@"?ee:W}),a.removeAttribute(l)}else l.startsWith(w)&&(c.push({type:6,index:o}),a.removeAttribute(l));if(Et.test(a.tagName)){const l=a.textContent.split(w),u=l.length-1;if(u>0){a.textContent=F?F.emptyScript:"";for(let v=0;v<u;v++)a.append(l[v],U()),S.nextNode(),c.push({type:2,index:++o});a.append(l[u],U())}}}else if(a.nodeType===8)if(a.data===Pt)c.push({type:2,index:o});else{let l=-1;for(;(l=a.data.indexOf(w,l+1))!==-1;)c.push({type:7,index:o}),l+=w.length-1}o++}}static createElement(t,i){const s=P.createElement("template");return s.innerHTML=t,s}}function z(e,t,i=e,s){if(t===k)return t;let a=s!==void 0?i._$Co?.[s]:i._$Cl;const o=L(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(e),a._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=a:i._$Cl=a),a!==void 0&&(t=z(e,a._$AS(e,t.values),a,s)),t}class Jt{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,a=(t?.creationScope??P).importNode(i,!0);S.currentNode=a;let o=S.nextNode(),n=0,r=0,c=s[0];for(;c!==void 0;){if(n===c.index){let h;c.type===2?h=new D(o,o.nextSibling,this,t):c.type===1?h=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(h=new ie(o,this,t)),this._$AV.push(h),c=s[++r]}n!==c?.index&&(o=S.nextNode(),n++)}return S.currentNode=P,a}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class D{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=z(this,t,i),L(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=R.createElement(Ct(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(i);else{const o=new Jt(a,this),n=o.u(this.options);o.p(i),this.T(n),this._$AH=o}}_$AC(t){let i=vt.get(t.strings);return i===void 0&&vt.set(t.strings,i=new R(t)),i}k(t){et(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const o of t)a===i.length?i.push(s=new D(this.O(U()),this.O(U()),this,this.options)):s=i[a],s._$AI(o),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=dt(t).nextSibling;dt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class W{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,a,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=i,this._$AM=a,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,i=this,s,a){const o=this.strings;let n=!1;if(o===void 0)t=z(this,t,i,0),n=!L(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{const r=t;let c,h;for(t=o[0],c=0;c<o.length-1;c++)h=z(this,r[s+c],i,c),h===k&&(h=this._$AH[c]),n||=!L(h)||h!==this._$AH[c],h===d?t=d:t!==d&&(t+=(h??"")+o[c+1]),this._$AH[c]=h}n&&!a&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class te extends W{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class ee extends W{constructor(t,i,s,a,o){super(t,i,s,a,o),this.type=5}_$AI(t,i=this){if((t=z(this,t,i,0)??d)===k)return;const s=this._$AH,a=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||a);a&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ie{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const se=tt.litHtmlPolyfillSupport;se?.(R,D),(tt.litHtmlVersions??=[]).push("3.3.3");const ae=(e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(a===void 0){const o=i?.renderBefore??null;s._$litPart$=a=new D(t.insertBefore(U(),o),o,void 0,i??{})}return a._$AI(e),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=globalThis;class C extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ae(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}}C._$litElement$=!0,C.finalized=!0,it.litElementHydrateSupport?.({LitElement:C});const oe=it.litElementPolyfillSupport;oe?.({LitElement:C});(it.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:K},re=(e=ne,t,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),s==="accessor"){const{name:n}=i;return{set(r){const c=t.get.call(this);t.set.call(this,r),this.requestUpdate(n,c,e,!0,r)},init(r){return r!==void 0&&this.C(n,void 0,e,r),r}}}if(s==="setter"){const{name:n}=i;return function(r){const c=this[n];t.call(this,r),this.requestUpdate(n,c,e,!0,r)}}throw Error("Unsupported decorator location: "+s)};function st(e){return(t,i)=>typeof i=="object"?re(e,t,i):((s,a,o)=>{const n=a.hasOwnProperty(o);return a.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(a,o):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(e){return st({...e,state:!0,attribute:!1})}var le=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,b=(e,t,i,s)=>{for(var a=s>1?void 0:s?ce(t,i):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(a=(s?n(t,i,a):n(a))||a);return s&&a&&le(t,i,a),a};const Q={float:!0,liquid_movement:!0},bt={type:"custom:beautiful-battery",entity:"",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,animations:{...Q},charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,test_state:null,voltage_entity:"",power_entity:""},mt={tiny:100,small:140,medium:200,large:260},yt={it:{charging:"In carica",discharging:"In scarica",idle:"Inattiva",full:"Piena",empty:"Vuota"},en:{charging:"Charging",discharging:"Discharging",idle:"Idle",full:"Full",empty:"Empty"}};function A(e,t,i){return Math.min(Math.max(e,t),i)}function G(e,t,i){const s=parseInt(e.slice(1),16),a=parseInt(t.slice(1),16),o=s>>16&255,n=s>>8&255,r=s&255,c=a>>16&255,h=a>>8&255,p=a&255,l=Math.round(o+(c-o)*i),u=Math.round(n+(h-n)*i),v=Math.round(r+(p-r)*i);return`#${((1<<24)+(l<<16)+(u<<8)+v).toString(16).slice(1)}`}function he(e,t){return e<25?t.low:e<50?G(t.low,t.mid,(e-25)/25):e<75?G(t.mid,t.high,(e-50)/25):G(t.high,t.full,(e-75)/25)}let f=class extends C{constructor(){super(...arguments),this._chargePercent=0,this._displayPercent=0,this._isCharging=!1,this._batteryState="idle",this._mouseX=0,this._mouseY=0,this._mouseActive=!1,this._isDark=!0,this._initialized=!1,this._previewActive=!1,this._particles=[],this._sparks=[],this._convectionPaths=[],this._onPreviewEvent=e=>{e.detail?.entity&&e.detail.entity!==this._config?.entity||this.setPreviewOverrides(e.detail?.percent??null,e.detail?.state??null)}}static async getConfigElement(){return await Rt(()=>Promise.resolve().then(()=>ue),void 0),document.createElement("beautiful-battery-editor")}static getStubConfig(){return{type:"custom:beautiful-battery",entity:""}}setConfig(e){const t={...bt,...e};t.animations={...Q,...e.animations??{}},this._config=t,this._syncState()}connectedCallback(){super.connectedCallback(),window.addEventListener("beautiful-battery-preview",this._onPreviewEvent)}disconnectedCallback(){window.removeEventListener("beautiful-battery-preview",this._onPreviewEvent),super.disconnectedCallback()}setPreviewOverrides(e,t){this._previewActive=e!=null||t!=null,this._previewActive?(e!=null&&(this._chargePercent=A(e,0,100)),t!=null&&(this._batteryState=t,this._isCharging=t==="charging"),this._displayPercent=this._chargePercent,this._generateParticles(),this._generateSparks(),this._generateConvection()):this._config&&this._syncState(),this.requestUpdate()}_anim(e){return this._config?.animations?.[e]??Q[e]}updated(e){e.has("hass")&&this._syncState(),e.has("_chargePercent")&&this._anim("liquid_movement")&&this._generateParticles()}_syncState(){if(!this.hass||!this._config?.entity)return;const e=this.hass.states[this._config.entity];if(e&&!this._previewActive){if(this._config.test_override!=null)this._chargePercent=A(this._config.test_override,0,100);else{const t=Number(e.state);this._chargePercent=A(Number.isFinite(t)?t:0,0,100)}if(this._config.test_state)this._batteryState=this._config.test_state,this._isCharging=this._config.test_state==="charging";else{const t=this._getEntityState(this._config.power_entity);t!==null?Math.abs(t)<5?(this._batteryState="idle",this._isCharging=!1):t<0?(this._batteryState="charging",this._isCharging=!0):(this._batteryState="discharging",this._isCharging=!1):(this._isCharging=e.state==="charging"||typeof e.attributes?.battery_charging=="boolean"&&e.attributes.battery_charging||e.attributes?.charging===!0,this._batteryState=this._isCharging?"charging":"discharging")}this._isDark=this.hass.themes?.darkMode!==!1,this._initialized?this._displayPercent=this._chargePercent:(this._initialized=!0,setTimeout(()=>{this._displayPercent=this._chargePercent},50)),this._generateParticles(),this._generateSparks(),this._generateConvection()}}_generateParticles(){const e=Math.max(2,Math.floor(this._chargePercent/15));this._particles=Array.from({length:e},()=>({x:10+Math.random()*80,y:10+Math.random()*70,size:2+Math.random()*4,dur:2+Math.random()*3,delay:Math.random()*2}))}_generateSparks(){this._sparks=Array.from({length:6},()=>({x:15+Math.random()*70,y:10+Math.random()*60,size:1+Math.random()*2.5,delay:Math.random()*1.5}))}_generateConvection(){this._convectionPaths=Array.from({length:3},(e,t)=>{const i=20+t*25,s=i+10+Math.random()*15,a=i+5+Math.random()*10,o=s-5+Math.random()*10;return{d:`M${i},90 C${a},60 ${o},40 ${s},10 C${o+5},40 ${a+5},60 ${i+3},90`,delay:t*1.2}})}_getLang(){return this._config?.language&&this._config.language!=="auto"?this._config.language:this.hass?.locale?.language??this.hass?.language??"en"}_getStatusLabel(){const e=this._getLang(),t=yt[e]??yt.en;return this._batteryState==="charging"?t.charging:this._batteryState==="idle"?t.idle:this._chargePercent>=100?t.full:this._chargePercent<=0?t.empty:t.discharging}_getColor(){return he(this._chargePercent,this._config?.charge_colors??bt.charge_colors)}_getEntityState(e){if(!this.hass||!e)return null;const t=this.hass.states[e];if(!t)return null;const i=Number(t.state);return Number.isFinite(i)?i:null}_onPointerMove(e){if(!this._anim("liquid_movement"))return;const t=this.shadowRoot?.querySelector(".battery-wrapper");if(!t)return;const i=t.getBoundingClientRect(),s=(e.clientX-i.left)/i.width-.5,a=(e.clientY-i.top)/i.height-.5;this._mouseX=s,this._mouseY=a,this._mouseActive=!0}_onPointerLeave(){this._mouseActive=!1}_handleTap(e){e.stopPropagation();const t=this._config?.tap_action;if(!(!t||t.action==="none"||!this.hass||!this._config?.entity))switch(t.action){case"more-info":{const i=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}});this.dispatchEvent(i);break}case"toggle":this.hass.callService?.("homeassistant","toggle",{entity_id:this._config.entity});break;case"call-service":if(t.service){const[i,s]=t.service.split(".");this.hass.callService?.(i,s,t.service_data,t.target)}break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),window.dispatchEvent(new Event("location-changed")));break}}_renderPlaceholder(){const e=mt[this._config?.size??"medium"],t=e*.45,i=e,s=t*.35,a=12,o=this._getColor(),n=A(this._config?.glow_intensity??.8,0,1),r=i+a;return g`
      <ha-card>
        <div class="battery-wrapper ${this._anim("float")?"":"no-float"}">
          <div class="battery-outer" style="transform: rotateX(2deg) rotateY(0deg);">
            <div class="drops-area">
              <div class="drops-above"></div>
              <div>
                <div class="battery-shell" style="width:${t}px; height:${r}px;">
                  <div class="charge-glow"
                       style="transform: translateY(50%); background: ${o}; opacity: ${n}; filter: blur(${12+n*20}px); box-shadow: 0 0 ${20+n*30}px ${o};">
                  </div>
                  <div class="charge-fill"
                       style="transform: translateY(50%); background: linear-gradient(0deg, ${o}, ${o}ee);">
                    ${this._anim("liquid_movement")?g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${o};">
                        <path d="${this._wavePath()}">
                          <animate attributeName="d"
                                   values="${this._wavePath()};${this._wavePath(1)};${this._wavePath()}"
                                   dur="3s"
                                   repeatCount="indefinite" />
                        </path>
                      </svg>
                    `:g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${o};">
                        <path d="${this._wavePath()}" />
                      </svg>
                    `}
                  </div>
                  <div class="battery-cap"
                       style="width:${s}px; height:${a}px;">
                    <div class="battery-cap-inner"></div>
                  </div>
                  <div class="battery-body"
                       style="width:${t}px; height:${i}px;">
                  </div>
                </div>
              </div>
              <div class="drops-below"></div>
            </div>
          </div>
          <div class="battery-info">
            <span class="battery-name">Select an entity</span>
            ${this._config?.show_percentage!==!1?g`
              <span class="battery-percentage" style="color: ${o};">50%</span>
            `:d}
          </div>
        </div>
      </ha-card>
    `}render(){if(!this._config)return g``;const e=this.hass?.states[this._config.entity];if(!e)return this._config.entity?g`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`:this._renderPlaceholder();const t=this._displayPercent,i=this._getColor(),s=mt[this._config.size],a=s*.45,o=s,n=a*.35,r=12,c=A(this._config.glow_intensity,0,1),h=this._getEntityState(this._config.voltage_entity),p=this._getEntityState(this._config.power_entity),l=this._anim("liquid_movement"),u=l&&this._mouseActive?A(this._mouseY*-15,-12,12):0,v=l&&this._mouseActive?A(this._mouseX*15,-12,12):0,m=l&&this._mouseActive?1+Math.abs(this._mouseX)*2+Math.abs(this._mouseY)*1.5:1,ot=[{left:"20%",delay:"0s"},{left:"45%",delay:"0.6s"},{left:"70%",delay:"1.2s"}],Mt=["charge-fill",!this._initialized&&l?"animating":"",l?"":"no-transition",l?"breathing":"",l?"gradient-wave":""].filter(Boolean).join(" "),Tt=l?`linear-gradient(180deg, ${i}, ${i}cc, ${i}, ${i}ee)`:`linear-gradient(0deg, ${i}, ${i}ee)`,Ot=["battery-body",this._batteryState==="charging"?"charging":"",l&&this._batteryState==="charging"?"shimmer-on":""].filter(Boolean).join(" "),$=o+r,M=(a-n)/2,I=(a+n)/2,T=6,q=6,B=16,Nt=`path("M ${M+T} 0 L ${I-T} 0 Q ${I} 0 ${I} ${T} L ${I} ${r} L ${a-q} ${r} Q ${a} ${r} ${a} ${r+q} L ${a} ${$-B} Q ${a} ${$} ${a-B} ${$} L ${B} ${$} Q 0 ${$} 0 ${$-B} L 0 ${r+q} Q 0 ${r} ${q} ${r} L ${M} ${r} L ${M} ${T} Q ${M} 0 ${M+T} 0 Z")`;return g`
      <ha-card>
        <div class="battery-wrapper ${this._mouseActive?"mouse-active":""} ${this._anim("float")?"":"no-float"}"
             @pointermove=${this._onPointerMove}
             @pointerleave=${this._onPointerLeave}
             @click=${this._handleTap}>
          <div class="battery-outer" style="transform: rotateX(${u}deg) rotateY(${v}deg);">

            <div class="drops-area">
              <div class="drops-above">
                ${l&&this._batteryState==="charging"?ot.map(_=>g`
                  <div class="drop falling-in" style="
                    left: calc(${_.left} - 4px);
                    animation-delay: ${_.delay};
                    --drop-distance: ${$+10}px;
                  ">
                    <div class="drop-inner" style="background: ${i};"></div>
                  </div>
                `):d}
              </div>

              <div>
                <div class="battery-shell" style="width:${a}px; height:${$}px; clip-path: ${Nt};">
                  <div class="charge-glow"
                       style="transform: translateY(${100-t}%); background: ${i}; opacity: ${c}; filter: blur(${12+c*20}px); box-shadow: 0 0 ${20+c*30}px ${i};">
                  </div>

                  <div class="${Mt}"
                       style="transform: translateY(${100-t}%); background: ${Tt};">
                    ${l?g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${i};">
                        <path d="${this._wavePath(0,m)}">
                          <animate attributeName="d"
                                   values="${this._wavePath(0,m)};${this._wavePath(1,m)};${this._wavePath(0,m)}"
                                   dur="3s"
                                   repeatCount="indefinite" />
                        </path>
                      </svg>
                    `:g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${i};">
                        <path d="${this._wavePath(0,m)}" />
                      </svg>
                    `}

                    ${l&&t>5?g`
                      <svg class="convection-line" viewBox="0 0 100 100" preserveAspectRatio="none"
                           style="width:100%;height:100%;left:0;top:0;">
                        ${this._convectionPaths.map(_=>g`
                          <path d="${_.d}" style="animation-delay:${_.delay}s;" />
                        `)}
                      </svg>
                    `:d}

                    ${l&&t>5?g`
                      <svg class="caustics-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
                           style="width:100%;height:${t}%;left:0;bottom:0;position:absolute;">
                        <filter id="caustics-filter">
                          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="2">
                            <animate attributeName="baseFrequency" values="0.03;0.05;0.03" dur="8s" repeatCount="indefinite" />
                          </feTurbulence>
                          <feDisplacementMap in="SourceGraphic" scale="8" />
                        </filter>
                        <rect width="100" height="100" fill="rgba(255,255,255,0.3)" filter="url(#caustics-filter)" />
                      </svg>
                    `:d}

                    ${l?this._particles.map(_=>g`
                      <div class="particle" style="
                        left: ${_.x}%;
                        bottom: ${_.y}%;
                        width: ${_.size}px;
                        height: ${_.size}px;
                        animation-duration: ${_.dur}s;
                        animation-delay: ${_.delay}s;
                      "></div>
                    `):d}

                    ${l&&this._batteryState==="charging"?this._sparks.map(_=>g`
                      <div class="electrolysis-spark" style="
                        left: ${_.x}%;
                        bottom: ${_.y}%;
                        width: ${_.size}px;
                        height: ${_.size}px;
                        animation-delay: ${_.delay}s;
                      "></div>
                    `):d}
                  </div>

                  <div class="battery-cap"
                       style="width:${n}px; height:${r}px;">
                    <div class="battery-cap-inner"></div>
                  </div>

                  <div class="${Ot}"
                       style="width:${a}px; height:${o}px;">
                  </div>
                </div>
              </div>

              <div class="drops-below">
                ${l&&this._batteryState==="discharging"&&t>5?ot.map(_=>g`
                  <div class="drop draining-out" style="
                    left: calc(${_.left} - 4px);
                    animation-delay: ${_.delay};
                    --drop-distance: ${50}px;
                  ">
                    <div class="drop-inner" style="background: ${i};"></div>
                  </div>
                `):d}
              </div>
            </div>

          </div>

          <div class="battery-info">
            <span class="battery-name">${this._config.name??e.attributes?.friendly_name??this._config.entity}</span>
            ${this._config.show_percentage?g`
              <span class="battery-percentage" style="color: ${i};">${Math.round(t)}%</span>
            `:d}
            ${this._config.show_status?g`
              <span class="battery-status" style="color: ${i};">${this._getStatusLabel()}</span>
            `:d}
            <div class="battery-details">
              ${this._config.show_voltage&&h!=null?g`
                <span><span class="battery-detail-value">${h.toFixed(1)}</span> V</span>
              `:d}
              ${this._config.show_power&&p!=null?g`
                <span><span class="battery-detail-value">${p.toFixed(1)}</span> W</span>
              `:d}
            </div>
          </div>
        </div>
        </div>
      </ha-card>
    `}_wavePath(e=0,t=1){const i=[];for(let s=0;s<=100;s+=2){const a=8+(Math.sin((s+e*50)*.08)*4+Math.sin((s+e*30)*.15)*2)*t;i.push(`${s},${a.toFixed(1)}`)}return`M0,16 L${i.join(" L")} L100,16 Z`}getCardSize(){return 3}};f.styles=At`
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

    .battery-wrapper.no-float:not(.mouse-active) .battery-outer {
      animation: none;
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
      border: none;
      box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 3;
    }

    .battery-shell {
      position: relative;
      overflow: hidden;
      border-radius: 6px 6px 16px 16px;
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

    .battery-shell::before {
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
      border-radius: 6px 6px 0 0;
      pointer-events: none;
      z-index: 3;
    }

    .battery-shell::after {
      content: '';
      position: absolute;
      top: 16px;
      left: 8px;
      right: 60%;
      height: 6px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 100px;
      filter: blur(3px);
      pointer-events: none;
      z-index: 4;
    }

    .battery-body {
      position: relative;
    }

    .charge-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      border-radius: 0 0 16px 16px;
      pointer-events: none;
      z-index: 0;
    }

    .charge-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      border-radius: 0 0 14px 14px;
      transform-origin: bottom center;
      transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.8s ease;
      z-index: 1;
      will-change: transform;
    }

    .charge-fill.no-transition {
      transition: none;
    }

    .charge-fill.animating {
      transition: transform 2s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.8s ease;
    }

    .charge-fill.breathing {
      animation: bb-breathe 4s ease-in-out infinite;
    }

    .charge-fill.gradient-wave {
      background-size: 100% 200%;
      animation: bb-gradient-flow 6s ease-in-out infinite;
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

    .charging.shimmer-on .charge-fill::before {
      animation: bb-shimmer 2s ease-in-out infinite;
    }

    @keyframes bb-shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes bb-breathe {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.08); }
    }

    @keyframes bb-gradient-flow {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 0% 100%; }
    }

    .convection-line {
      position: absolute;
      pointer-events: none;
      z-index: 2;
      opacity: 0.15;
    }

    .convection-line path {
      fill: none;
      stroke: rgba(255, 255, 255, 0.5);
      stroke-width: 0.8;
      stroke-dasharray: 8 12;
      animation: bb-convection-flow 4s linear infinite;
    }

    @keyframes bb-convection-flow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -40; }
    }

    .caustics-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      z-index: 1;
      opacity: 0.12;
      mix-blend-mode: overlay;
    }

    .electrolysis-spark {
      position: absolute;
      border-radius: 50%;
      background: white;
      pointer-events: none;
      z-index: 3;
      animation: bb-spark 0.8s ease-out infinite;
    }

    @keyframes bb-spark {
      0% { transform: scale(0); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.8; }
      100% { transform: scale(0); opacity: 0; }
    }

    .battery-body:active {
      transform: scale(0.97);
      transition: transform 0.1s ease;
    }

    :host(.light-theme) .battery-shell {
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
    }

    :host(.light-theme) .battery-shell::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    }

    :host(.light-theme) .battery-shell::after {
      background: rgba(255, 255, 255, 0.4);
    }
  `;b([st({attribute:!1})],f.prototype,"hass",2);b([y()],f.prototype,"_config",2);b([y()],f.prototype,"_chargePercent",2);b([y()],f.prototype,"_displayPercent",2);b([y()],f.prototype,"_isCharging",2);b([y()],f.prototype,"_batteryState",2);b([y()],f.prototype,"_mouseX",2);b([y()],f.prototype,"_mouseY",2);b([y()],f.prototype,"_mouseActive",2);b([y()],f.prototype,"_isDark",2);b([y()],f.prototype,"_initialized",2);b([y()],f.prototype,"_previewActive",2);f=b([kt("beautiful-battery")],f);const de="beautiful-battery";window.customCards=window.customCards??[];window.customCards.push({type:de,name:"Beautiful Battery",description:"3D liquid glass battery visualization with smooth animations",icon:"mdi:battery",preview:!0});var pe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,at=(e,t,i,s)=>{for(var a=s>1?void 0:s?ge(t,i):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(a=(s?n(t,i,a):n(a))||a);return s&&a&&pe(t,i,a),a};const zt={float:!0,liquid_movement:!0},$t={type:"custom:beautiful-battery",entity:"",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,animations:{...zt},charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,test_state:null,voltage_entity:"",power_entity:""},wt={it:{entity:"Entita",battery_sensor:"Sensore batteria",display_name:"Nome visualizzato",appearance:"Aspetto",size:"Dimensione",size_tiny:"Minuscolo (100px)",size_small:"Piccolo (140px)",size_medium:"Medio (200px)",size_large:"Grande (260px)",glow:"Intensita bagliore",display:"Visualizzazione",show_pct:"Mostra percentuale",show_status:"Mostra stato",show_voltage:"Mostra voltaggio",show_power:"Mostra potenza",show_particles:"Mostra particelle",voltage_entity:"Entita voltaggio",power_entity:"Entita potenza",language:"Lingua",lang_auto:"Automatica (da HA)",interaction:"Interazione",tap_action:"Azione al tocco",tap_more:"Piu info",tap_toggle:"Toggle",tap_navigate:"Naviga",tap_none:"Nessuna",navigation_path:"Percorso navigazione",test_override:"Override test percentuale",test_off:"Disabilitato (usa entita)",test_reset:"Reset",colors:"Colori",color_low:"Basso 0-25%",color_mid:"Medio 25-50%",color_high:"Alto 50-75%",color_full:"Pieno 75-100%",animations:"Animazioni",anim_float:"Animazione galleggiamento",anim_liquid:"Animazione movimento liquido",test_state:"Simula stato batteria",test_state_off:"Disabilitato (usa entita)",test_state_charging:"In carica",test_state_discharging:"In scarica",test_state_idle:"Inattiva"},en:{entity:"Entity",battery_sensor:"Battery sensor",display_name:"Display name",appearance:"Appearance",size:"Size",size_tiny:"Tiny (100px)",size_small:"Small (140px)",size_medium:"Medium (200px)",size_large:"Large (260px)",glow:"Glow intensity",display:"Display",show_pct:"Show percentage",show_status:"Show status",show_voltage:"Show voltage",show_power:"Show power",show_particles:"Show particles",voltage_entity:"Voltage entity",power_entity:"Power entity",language:"Language",lang_auto:"Auto (from HA)",interaction:"Interaction",tap_action:"Tap action",tap_more:"More Info",tap_toggle:"Toggle",tap_navigate:"Navigate",tap_none:"None",navigation_path:"Navigation path",test_override:"Test percentage override",test_off:"Disabled (using entity)",test_reset:"Reset",colors:"Colors",color_low:"Low 0-25%",color_mid:"Mid 25-50%",color_high:"High 50-75%",color_full:"Full 75-100%",animations:"Animations",anim_float:"Float animation",anim_liquid:"Liquid movement animation",test_state:"Simulate battery state",test_state_off:"Disabled (using entity)",test_state_charging:"Charging",test_state_discharging:"Discharging",test_state_idle:"Idle"}};let H=class extends C{constructor(){super(...arguments),this._config={...$t}}setConfig(e){const t={...$t,...e};t.animations={...zt,...e.animations??{}},this._config=t}disconnectedCallback(){super.disconnectedCallback(),this._dispatchPreview(null,null)}_dispatchPreview(e,t){window.dispatchEvent(new CustomEvent("beautiful-battery-preview",{detail:{entity:this._config.entity,percent:e,state:t},bubbles:!0,composed:!0}))}_updateCardPreview(){this._dispatchPreview(this._config.test_override,this._config.test_state)}_t(e){const t=this._config.language==="auto"?this.hass?.locale?.language??this.hass?.language??"en":this._config.language;return wt[t]?.[e]??wt.en[e]??e}render(){return this.hass?g`
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
              @value-changed=${e=>this._update("entity",e.detail?.value??"")}
            ></ha-selector>
          </div>
          <div class="field">
            <label class="field-label">${this._t("display_name")}</label>
            <input type="text" .value=${this._config.name??""}
                   @input=${e=>this._update("name",e.target.value||void 0)} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("appearance")}</div>
          <div class="field">
            <label class="field-label">${this._t("size")}</label>
            <select .value=${this._config.size}
                    @change=${e=>this._update("size",e.target.value)}>
              <option value="tiny">${this._t("size_tiny")}</option>
              <option value="small">${this._t("size_small")}</option>
              <option value="medium">${this._t("size_medium")}</option>
              <option value="large">${this._t("size_large")}</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">${this._t("glow")}: ${this._config.glow_intensity.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.05" .value=${String(this._config.glow_intensity)}
                   @input=${e=>this._update("glow_intensity",Number(e.target.value))} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("display")}</div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_pct")}</div></div>
            <ha-switch .checked=${this._config.show_percentage}
              @change=${e=>this._update("show_percentage",e.target.checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_status")}</div></div>
            <ha-switch .checked=${this._config.show_status}
              @change=${e=>this._update("show_status",e.target.checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_voltage")}</div></div>
            <ha-switch .checked=${this._config.show_voltage}
              @change=${e=>this._update("show_voltage",e.target.checked)}
            ></ha-switch>
          </div>
          ${this._config.show_voltage?g`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.voltage_entity}
                .selector=${{entity:{device_class:"voltage"}}}
                .label=${this._t("voltage_entity")}
                .required=${!1}
                @value-changed=${e=>this._update("voltage_entity",e.detail?.value??"")}
              ></ha-selector>
            </div>
          `:""}
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t("show_power")}</div></div>
            <ha-switch .checked=${this._config.show_power}
              @change=${e=>this._update("show_power",e.target.checked)}
            ></ha-switch>
          </div>
          ${this._config.show_power?g`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.power_entity}
                .selector=${{entity:{device_class:"power"}}}
                .label=${this._t("power_entity")}
                .required=${!1}
                @value-changed=${e=>this._update("power_entity",e.detail?.value??"")}
              ></ha-selector>
            </div>
          `:""}
        </section>

        <section class="section">
          <div class="section-title">${this._t("animations")}</div>
          ${this._renderAnimToggle("float","anim_float")}
          ${this._renderAnimToggle("liquid_movement","anim_liquid")}
        </section>

        <section class="section">
          <div class="section-title">${this._t("language")}</div>
          <div class="field">
            <select .value=${this._config.language}
                    @change=${e=>this._update("language",e.target.value)}>
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
                    @change=${e=>this._updateTapAction(e.target.value)}>
              <option value="more-info">${this._t("tap_more")}</option>
              <option value="toggle">${this._t("tap_toggle")}</option>
              <option value="navigate">${this._t("tap_navigate")}</option>
              <option value="none">${this._t("tap_none")}</option>
            </select>
          </div>
          ${this._config.tap_action.action==="navigate"?g`
            <div class="field">
              <label class="field-label">${this._t("navigation_path")}</label>
              <input type="text" .value=${this._config.tap_action.navigation_path??""}
                     placeholder="#energia"
                     @input=${e=>this._updateTapActionField("navigation_path",e.target.value)} />
            </div>
          `:""}
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
                     @input=${e=>this._update("test_override",Number(e.target.value))} />
              <span class="value">${this._config.test_override!=null?this._config.test_override+"%":"Off"}</span>
            </div>
          </div>
          <div class="field">
            <label class="field-label">${this._t("test_state")}</label>
            <select .value=${this._config.test_state??""}
                    @change=${e=>{const t=e.target.value;this._update("test_state",t===""?null:t)}}>
              <option value="">${this._t("test_state_off")}</option>
              <option value="charging">${this._t("test_state_charging")}</option>
              <option value="discharging">${this._t("test_state_discharging")}</option>
              <option value="idle">${this._t("test_state_idle")}</option>
            </select>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t("colors")}</div>
          <div class="color-row">
            <div class="color-item">
              <label>${this._t("color_low")}</label>
              <input type="color" .value=${this._config.charge_colors.low}
                     @input=${e=>this._updateColor("low",e.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_mid")}</label>
              <input type="color" .value=${this._config.charge_colors.mid}
                     @input=${e=>this._updateColor("mid",e.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_high")}</label>
              <input type="color" .value=${this._config.charge_colors.high}
                     @input=${e=>this._updateColor("high",e.target.value)} />
            </div>
            <div class="color-item">
              <label>${this._t("color_full")}</label>
              <input type="color" .value=${this._config.charge_colors.full}
                     @input=${e=>this._updateColor("full",e.target.value)} />
            </div>
          </div>
        </section>
      </div>
    `:g``}_dispatchConfig(){const e={...this._config,test_override:null,test_state:null};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_update(e,t){this._config={...this._config,[e]:t},this._dispatchConfig(),this._updateCardPreview()}_updateColor(e,t){this._config={...this._config,charge_colors:{...this._config.charge_colors,[e]:t}},this._dispatchConfig()}_updateTapAction(e){this._config={...this._config,tap_action:{action:e}},this._dispatchConfig()}_updateTapActionField(e,t){this._config={...this._config,tap_action:{...this._config.tap_action,[e]:t}},this._dispatchConfig()}_renderAnimToggle(e,t){return g`
      <div class="toggle-row">
        <div><div class="toggle-label">${this._t(t)}</div></div>
        <ha-switch .checked=${this._config.animations[e]}
          @change=${i=>this._updateAnimation(e,i.target.checked)}
        ></ha-switch>
      </div>
    `}_updateAnimation(e,t){this._config={...this._config,animations:{...this._config.animations,[e]:t}},this._dispatchConfig()}};H.styles=At`
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
  `;at([st({attribute:!1})],H.prototype,"hass",2);at([y()],H.prototype,"_config",2);H=at([kt("beautiful-battery-editor")],H);const ue=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));
