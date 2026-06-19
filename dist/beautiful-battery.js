const Ht="modulepreload",It=function(i){return"/"+i},at={},Lt=function(t,e,s){let a=Promise.resolve();if(e&&e.length>0){let n=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),r=l?.nonce||l?.getAttribute("nonce");a=n(e.map(h=>{if(h=It(h),h in at)return;at[h]=!0;const p=h.endsWith(".css"),c=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${c}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":Ht,p||(u.as="script"),u.crossOrigin="",u.href=h,r&&u.setAttribute("nonce",r),document.head.appendChild(u),p)return new Promise((f,v)=>{u.addEventListener("load",f),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return a.then(n=>{for(const l of n||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,X=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),ot=new WeakMap;let $t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(X&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}};const Bt=i=>new $t(typeof i=="string"?i:i+"",void 0,W),wt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,a,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[o+1],i[0]);return new $t(e,i,W)},jt=(i,t)=>{if(X)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),a=D.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}},nt=X?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Bt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:qt,defineProperty:Yt,getOwnPropertyDescriptor:Ft,getOwnPropertyNames:Xt,getOwnPropertySymbols:Wt,getPrototypeOf:Vt}=Object,L=globalThis,rt=L.trustedTypes,Gt=rt?rt.emptyScript:"",Zt=L.reactiveElementPolyfillSupport,M=(i,t)=>i,H={toAttribute(i,t){switch(t){case Boolean:i=i?Gt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},V=(i,t)=>!qt(i,t),lt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Yt(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){const{get:a,set:o}=Ft(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:a,set(n){const l=a?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,s=[...Xt(e),...Wt(e)];for(const a of s)this.createProperty(a,e[a])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,a]of e)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const a=this._$Eu(e,s);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const a of s)e.unshift(nt(a))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return jt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,s);if(a!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,a=s._$Eh.get(t);if(a!==void 0&&this._$Em!==a){const o=s.getPropertyOptions(a),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:H;this._$Em=a;const l=n.fromAttribute(e,o.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(t,e,s,a=!1,o){if(t!==void 0){const n=this.constructor;if(a===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??V)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:a,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),a===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[a,o]of s){const{wrapped:n}=o,l=this[a];n!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[M("elementProperties")]=new Map,E[M("finalized")]=new Map,Zt?.({ReactiveElement:E}),(L.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,ct=i=>i,I=G.trustedTypes,ht=I?I.createPolicy("lit-html",{createHTML:i=>i}):void 0,xt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+$,Jt=`<${At}>`,A=document,T=()=>A.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",Z=Array.isArray,Kt=i=>Z(i)||typeof i?.[Symbol.iterator]=="function",j=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,pt=/>/g,w=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ut=/"/g,St=/^(?:script|style|textarea|title)$/i,Qt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),g=Qt(1),C=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),_t=new WeakMap,x=A.createTreeWalker(A,129);function Et(i,t){if(!Z(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}const te=(i,t)=>{const e=i.length-1,s=[];let a,o=t===2?"<svg>":t===3?"<math>":"",n=z;for(let l=0;l<e;l++){const r=i[l];let h,p,c=-1,u=0;for(;u<r.length&&(n.lastIndex=u,p=n.exec(r),p!==null);)u=n.lastIndex,n===z?p[1]==="!--"?n=dt:p[1]!==void 0?n=pt:p[2]!==void 0?(St.test(p[2])&&(a=RegExp("</"+p[2],"g")),n=w):p[3]!==void 0&&(n=w):n===w?p[0]===">"?(n=a??z,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?w:p[3]==='"'?ut:gt):n===ut||n===gt?n=w:n===dt||n===pt?n=z:(n=w,a=void 0);const f=n===w&&i[l+1].startsWith("/>")?" ":"";o+=n===z?r+Jt:c>=0?(s.push(h),r.slice(0,c)+xt+r.slice(c)+$+f):r+$+(c===-2?l:f)}return[Et(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class N{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let o=0,n=0;const l=t.length-1,r=this.parts,[h,p]=te(t,e);if(this.el=N.createElement(h,s),x.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=x.nextNode())!==null&&r.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(const c of a.getAttributeNames())if(c.endsWith(xt)){const u=p[n++],f=a.getAttribute(c).split($),v=/([.?@])?(.*)/.exec(u);r.push({type:1,index:o,name:v[2],strings:f,ctor:v[1]==="."?ie:v[1]==="?"?se:v[1]==="@"?ae:B}),a.removeAttribute(c)}else c.startsWith($)&&(r.push({type:6,index:o}),a.removeAttribute(c));if(St.test(a.tagName)){const c=a.textContent.split($),u=c.length-1;if(u>0){a.textContent=I?I.emptyScript:"";for(let f=0;f<u;f++)a.append(c[f],T()),x.nextNode(),r.push({type:2,index:++o});a.append(c[u],T())}}}else if(a.nodeType===8)if(a.data===At)r.push({type:2,index:o});else{let c=-1;for(;(c=a.data.indexOf($,c+1))!==-1;)r.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function k(i,t,e=i,s){if(t===C)return t;let a=s!==void 0?e._$Co?.[s]:e._$Cl;const o=O(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(i),a._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=a:e._$Cl=a),a!==void 0&&(t=k(i,a._$AS(i,t.values),a,s)),t}class ee{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??A).importNode(e,!0);x.currentNode=a;let o=x.nextNode(),n=0,l=0,r=s[0];for(;r!==void 0;){if(n===r.index){let h;r.type===2?h=new R(o,o.nextSibling,this,t):r.type===1?h=new r.ctor(o,r.name,r.strings,this,t):r.type===6&&(h=new oe(o,this,t)),this._$AV.push(h),r=s[++l]}n!==r?.index&&(o=x.nextNode(),n++)}return x.currentNode=A,a}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(e);else{const o=new ee(a,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new N(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,a=0;for(const o of t)a===e.length?e.push(s=new R(this.O(T()),this.O(T()),this,this.options)):s=e[a],s._$AI(o),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=ct(t).nextSibling;ct(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,a){const o=this.strings;let n=!1;if(o===void 0)t=k(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==C,n&&(this._$AH=t);else{const l=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=k(this,l[s+r],e,r),h===C&&(h=this._$AH[r]),n||=!O(h)||h!==this._$AH[r],h===d?t=d:t!==d&&(t+=(h??"")+o[r+1]),this._$AH[r]=h}n&&!a&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ie extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class se extends B{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class ae extends B{constructor(t,e,s,a,o){super(t,e,s,a,o),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??d)===C)return;const s=this._$AH,a=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||a);a&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class oe{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const ne=G.litHtmlPolyfillSupport;ne?.(N,R),(G.litHtmlVersions??=[]).push("3.3.3");const re=(i,t,e)=>{const s=e?.renderBefore??t;let a=s._$litPart$;if(a===void 0){const o=e?.renderBefore??null;s._$litPart$=a=new R(t.insertBefore(T(),o),o,void 0,e??{})}return a._$AI(i),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis;class P extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}}P._$litElement$=!0,P.finalized=!0,J.litElementHydrateSupport?.({LitElement:P});const le=J.litElementPolyfillSupport;le?.({LitElement:P});(J.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ce={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V},he=(i=ce,t,e)=>{const{kind:s,metadata:a}=e;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){const{name:n}=e;return{set(l){const r=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,r,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){const{name:n}=e;return function(l){const r=this[n];t.call(this,l),this.requestUpdate(n,r,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function K(i){return(t,e)=>typeof e=="object"?he(i,t,e):((s,a,o)=>{const n=a.hasOwnProperty(o);return a.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(a,o):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(i){return K({...i,state:!0,attribute:!1})}var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,b=(i,t,e,s)=>{for(var a=s>1?void 0:s?pe(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(a=(s?n(t,e,a):n(a))||a);return s&&a&&de(t,e,a),a};const Y={float:!0,tilt_3d:!0,wave:!0,fill_transition:!0,shimmer:!0,droplets:!0,particles:!0,convection:!0,caustics:!0,breathing:!0,sloshing:!0,electrolysis:!0,gradient_wave:!0},ft={type:"custom:beautiful-battery",entity:"",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,show_particles:!0,animations:{...Y},charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,voltage_entity:"",power_entity:""},mt={small:140,medium:200,large:260},vt={it:{charging:"In carica",discharging:"In scarica",idle:"Inattiva",full:"Piena",empty:"Vuota"},en:{charging:"Charging",discharging:"Discharging",idle:"Idle",full:"Full",empty:"Empty"}};function S(i,t,e){return Math.min(Math.max(i,t),e)}function q(i,t,e){const s=parseInt(i.slice(1),16),a=parseInt(t.slice(1),16),o=s>>16&255,n=s>>8&255,l=s&255,r=a>>16&255,h=a>>8&255,p=a&255,c=Math.round(o+(r-o)*e),u=Math.round(n+(h-n)*e),f=Math.round(l+(p-l)*e);return`#${((1<<24)+(c<<16)+(u<<8)+f).toString(16).slice(1)}`}function ge(i,t){return i<25?q(t.low,t.mid,i/25):i<50?q(t.mid,t.high,(i-25)/25):i<85?q(t.high,t.full,(i-50)/35):t.full}let m=class extends P{constructor(){super(...arguments),this._chargePercent=0,this._displayPercent=0,this._isCharging=!1,this._batteryState="idle",this._mouseX=0,this._mouseY=0,this._mouseActive=!1,this._isDark=!0,this._initialized=!1,this._particles=[],this._sparks=[],this._convectionPaths=[]}static async getConfigElement(){return await Lt(()=>Promise.resolve().then(()=>me),void 0),document.createElement("beautiful-battery-editor")}static getStubConfig(){return{type:"custom:beautiful-battery",entity:""}}setConfig(i){const t={...ft,...i};t.animations={...Y,...i.animations??{}},this._config=t,this._syncState()}_anim(i){return this._config?.animations?.[i]??Y[i]}updated(i){i.has("hass")&&this._syncState(),i.has("_chargePercent")&&this._anim("particles")&&this._generateParticles()}_syncState(){if(!this.hass||!this._config?.entity)return;const i=this.hass.states[this._config.entity];if(!i)return;if(this._config.test_override!=null)this._chargePercent=S(this._config.test_override,0,100);else{const e=Number(i.state);this._chargePercent=S(Number.isFinite(e)?e:0,0,100)}const t=this._getEntityState(this._config.power_entity);t!==null?Math.abs(t)<5?(this._batteryState="idle",this._isCharging=!1):t<0?(this._batteryState="charging",this._isCharging=!0):(this._batteryState="discharging",this._isCharging=!1):(this._isCharging=i.state==="charging"||typeof i.attributes?.battery_charging=="boolean"&&i.attributes.battery_charging||i.attributes?.charging===!0,this._batteryState=this._isCharging?"charging":"discharging"),this._isDark=this.hass.themes?.darkMode!==!1,this._initialized?this._displayPercent=this._chargePercent:(this._initialized=!0,setTimeout(()=>{this._displayPercent=this._chargePercent},50)),this._generateParticles(),this._generateSparks(),this._generateConvection()}_generateParticles(){const i=Math.max(2,Math.floor(this._chargePercent/15));this._particles=Array.from({length:i},()=>({x:10+Math.random()*80,y:10+Math.random()*70,size:2+Math.random()*4,dur:2+Math.random()*3,delay:Math.random()*2}))}_generateSparks(){this._sparks=Array.from({length:6},()=>({x:15+Math.random()*70,y:10+Math.random()*60,size:1+Math.random()*2.5,delay:Math.random()*1.5}))}_generateConvection(){this._convectionPaths=Array.from({length:3},(i,t)=>{const e=20+t*25,s=e+10+Math.random()*15,a=e+5+Math.random()*10,o=s-5+Math.random()*10;return{d:`M${e},90 C${a},60 ${o},40 ${s},10 C${o+5},40 ${a+5},60 ${e+3},90`,delay:t*1.2}})}_getLang(){return this._config?.language&&this._config.language!=="auto"?this._config.language:this.hass?.locale?.language??this.hass?.language??"en"}_getStatusLabel(){const i=this._getLang(),t=vt[i]??vt.en;return this._batteryState==="charging"?t.charging:this._batteryState==="idle"?t.idle:this._chargePercent>=100?t.full:this._chargePercent<=0?t.empty:t.discharging}_getColor(){return ge(this._chargePercent,this._config?.charge_colors??ft.charge_colors)}_getEntityState(i){if(!this.hass||!i)return null;const t=this.hass.states[i];if(!t)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}_onPointerMove(i){if(!this._anim("tilt_3d"))return;const t=this.shadowRoot?.querySelector(".battery-wrapper");if(!t)return;const e=t.getBoundingClientRect(),s=(i.clientX-e.left)/e.width-.5,a=(i.clientY-e.top)/e.height-.5;this._mouseX=s,this._mouseY=a,this._mouseActive=!0}_onPointerLeave(){this._mouseActive=!1}_handleTap(i){i.stopPropagation();const t=this._config?.tap_action;if(!(!t||t.action==="none"||!this.hass||!this._config?.entity))switch(t.action){case"more-info":{const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}});this.dispatchEvent(e);break}case"toggle":this.hass.callService?.("homeassistant","toggle",{entity_id:this._config.entity});break;case"call-service":if(t.service){const[e,s]=t.service.split(".");this.hass.callService?.(e,s,t.service_data,t.target)}break}}_renderPlaceholder(){const i=mt[this._config?.size??"medium"],t=i*.45,e=i,s=t*.35,a=12,o=this._getColor(),n=S(this._config?.glow_intensity??.8,0,1);return g`
      <ha-card>
        <div class="battery-wrapper ${this._anim("float")?"":"no-float"}">
          <div class="battery-outer" style="transform: rotateX(2deg) rotateY(0deg);">
            <div class="drops-area">
              <div class="drops-above"></div>
              <div>
                <div class="battery-cap"
                     style="width:${s}px; height:${a}px;">
                  <div class="battery-cap-inner"></div>
                </div>
                <div class="battery-body"
                     style="width:${t}px; height:${e}px;">
                  <div class="charge-glow"
                       style="height: 50%; background: ${o}; opacity: ${n}; filter: blur(${12+n*20}px); box-shadow: 0 0 ${20+n*30}px ${o};">
                  </div>
                  <div class="charge-fill"
                       style="height: 50%; background: linear-gradient(0deg, ${o}, ${o}ee);">
                    ${this._anim("wave")?g`
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
    `}render(){if(!this._config)return g``;const i=this.hass?.states[this._config.entity];if(!i)return this._config.entity?g`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`:this._renderPlaceholder();const t=this._displayPercent,e=this._getColor(),s=mt[this._config.size],a=s*.45,o=s,n=a*.35,l=12,r=S(this._config.glow_intensity,0,1),h=this._getEntityState(this._config.voltage_entity),p=this._getEntityState(this._config.power_entity),c=this._anim("tilt_3d"),u=c&&this._mouseActive?S(this._mouseY*-15,-12,12):0,f=c&&this._mouseActive?S(this._mouseX*15,-12,12):0,v=this._anim("sloshing")&&this._mouseActive?1+Math.abs(this._mouseX)*2+Math.abs(this._mouseY)*1.5:1,tt=[{left:"20%",delay:"0s"},{left:"45%",delay:"0.6s"},{left:"70%",delay:"1.2s"}],Ct=this._anim("wave"),kt=this._anim("breathing"),et=this._anim("gradient_wave"),it=this._anim("fill_transition"),zt=this._anim("shimmer"),st=this._anim("droplets"),Mt=this._anim("particles"),Tt=this._anim("convection"),Ot=this._anim("caustics"),Nt=this._anim("electrolysis"),Ut=["charge-fill",!this._initialized&&it?"animating":"",it?"":"no-transition",kt?"breathing":"",et?"gradient-wave":""].filter(Boolean).join(" "),Rt=et?`linear-gradient(180deg, ${e}, ${e}cc, ${e}, ${e}ee)`:`linear-gradient(0deg, ${e}, ${e}ee)`,Dt=["battery-body",this._batteryState==="charging"?"charging":"",zt&&this._batteryState==="charging"?"shimmer-on":""].filter(Boolean).join(" ");return g`
      <ha-card>
        <div class="battery-wrapper ${this._mouseActive?"mouse-active":""} ${this._anim("float")?"":"no-float"}"
             @pointermove=${this._onPointerMove}
             @pointerleave=${this._onPointerLeave}
             @click=${this._handleTap}>
          <div class="battery-outer" style="transform: rotateX(${u}deg) rotateY(${f}deg);">

            <div class="drops-area">
              <div class="drops-above">
                ${st&&this._batteryState==="charging"?tt.map(_=>g`
                  <div class="drop falling-in" style="
                    left: calc(${_.left} - 4px);
                    animation-delay: ${_.delay};
                    --drop-distance: ${o+l+10}px;
                  ">
                    <div class="drop-inner" style="background: ${e};"></div>
                  </div>
                `):d}
              </div>

              <div>
                <div class="battery-cap"
                     style="width:${n}px; height:${l}px;">
                  <div class="battery-cap-inner"></div>
                </div>

                <div class="${Dt}"
                     style="width:${a}px; height:${o}px;">
                  <div class="charge-glow"
                       style="height: ${t}%; background: ${e}; opacity: ${r}; filter: blur(${12+r*20}px); box-shadow: 0 0 ${20+r*30}px ${e};">
                  </div>

                  <div class="${Ut}"
                       style="height: ${t}%; background: ${Rt};">
                    ${Ct?g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${e};">
                        <path d="${this._wavePath(0,v)}">
                          <animate attributeName="d"
                                   values="${this._wavePath(0,v)};${this._wavePath(1,v)};${this._wavePath(0,v)}"
                                   dur="3s"
                                   repeatCount="indefinite" />
                        </path>
                      </svg>
                    `:g`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${e};">
                        <path d="${this._wavePath(0,v)}" />
                      </svg>
                    `}

                    ${Tt&&t>5?g`
                      <svg class="convection-line" viewBox="0 0 100 100" preserveAspectRatio="none"
                           style="width:100%;height:100%;left:0;top:0;">
                        ${this._convectionPaths.map(_=>g`
                          <path d="${_.d}" style="animation-delay:${_.delay}s;" />
                        `)}
                      </svg>
                    `:d}

                    ${Ot&&t>5?g`
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

                    ${Mt?this._particles.map(_=>g`
                      <div class="particle" style="
                        left: ${_.x}%;
                        bottom: ${_.y}%;
                        width: ${_.size}px;
                        height: ${_.size}px;
                        animation-duration: ${_.dur}s;
                        animation-delay: ${_.delay}s;
                      "></div>
                    `):d}

                    ${Nt&&this._batteryState==="charging"?this._sparks.map(_=>g`
                      <div class="electrolysis-spark" style="
                        left: ${_.x}%;
                        bottom: ${_.y}%;
                        width: ${_.size}px;
                        height: ${_.size}px;
                        animation-delay: ${_.delay}s;
                      "></div>
                    `):d}
                  </div>
                </div>
              </div>

              <div class="drops-below">
                ${st&&this._batteryState==="discharging"&&t>5?tt.map(_=>g`
                  <div class="drop draining-out" style="
                    left: calc(${_.left} - 4px);
                    animation-delay: ${_.delay};
                    --drop-distance: ${50}px;
                  ">
                    <div class="drop-inner" style="background: ${e};"></div>
                  </div>
                `):d}
              </div>
            </div>

          </div>

          <div class="battery-info">
            <span class="battery-name">${this._config.name??i.attributes?.friendly_name??this._config.entity}</span>
            ${this._config.show_percentage?g`
              <span class="battery-percentage" style="color: ${e};">${Math.round(t)}%</span>
            `:d}
            ${this._config.show_status?g`
              <span class="battery-status" style="color: ${e};">${this._getStatusLabel()}</span>
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
      </ha-card>
    `}_wavePath(i=0,t=1){const e=[];for(let s=0;s<=100;s+=2){const a=8+(Math.sin((s+i*50)*.08)*4+Math.sin((s+i*30)*.15)*2)*t;e.push(`${s},${a.toFixed(1)}`)}return`M0,16 L${e.join(" L")} L100,16 Z`}getCardSize(){return 3}};m.styles=wt`
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

    .charge-fill.no-transition {
      transition: none;
    }

    .charge-fill.animating {
      transition: height 2s cubic-bezier(0.34, 1.56, 0.64, 1),
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
      0%, 100% { transform: scaleX(1); }
      50% { transform: scaleX(0.97); }
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
  `;b([K({attribute:!1})],m.prototype,"hass",2);b([y()],m.prototype,"_config",2);b([y()],m.prototype,"_chargePercent",2);b([y()],m.prototype,"_displayPercent",2);b([y()],m.prototype,"_isCharging",2);b([y()],m.prototype,"_batteryState",2);b([y()],m.prototype,"_mouseX",2);b([y()],m.prototype,"_mouseY",2);b([y()],m.prototype,"_mouseActive",2);b([y()],m.prototype,"_isDark",2);b([y()],m.prototype,"_initialized",2);m=b([Pt("beautiful-battery")],m);const ue="beautiful-battery";window.customCards=window.customCards??[];window.customCards.push({type:ue,name:"Beautiful Battery",description:"3D liquid glass battery visualization with smooth animations",icon:"mdi:battery",preview:!0});var _e=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,Q=(i,t,e,s)=>{for(var a=s>1?void 0:s?fe(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(a=(s?n(t,e,a):n(a))||a);return s&&a&&_e(t,e,a),a};const F={float:!0,tilt_3d:!0,wave:!0,fill_transition:!0,shimmer:!0,droplets:!0,particles:!0,convection:!0,caustics:!0,breathing:!0,sloshing:!0,electrolysis:!0,gradient_wave:!0},bt={type:"custom:beautiful-battery",entity:"",show_percentage:!0,show_voltage:!1,show_power:!1,show_status:!0,show_particles:!0,animations:{...F},charge_colors:{low:"#ff4444",mid:"#ffaa00",high:"#44cc44",full:"#00ddff"},size:"medium",glow_intensity:.8,tap_action:{action:"more-info"},language:"auto",test_override:null,voltage_entity:"",power_entity:""},yt={it:{entity:"Entita",battery_sensor:"Sensore batteria",display_name:"Nome visualizzato",appearance:"Aspetto",size:"Dimensione",size_small:"Piccolo (140px)",size_medium:"Medio (200px)",size_large:"Grande (260px)",glow:"Intensita bagliore",display:"Visualizzazione",show_pct:"Mostra percentuale",show_status:"Mostra stato",show_voltage:"Mostra voltaggio",show_power:"Mostra potenza",show_particles:"Mostra particelle",voltage_entity:"Entita voltaggio",power_entity:"Entita potenza",language:"Lingua",lang_auto:"Automatica (da HA)",interaction:"Interazione",tap_action:"Azione al tocco",tap_more:"Piu info",tap_toggle:"Toggle",tap_none:"Nessuna",test_override:"Override test percentuale",test_off:"Disabilitato (usa entita)",test_reset:"Reset",colors:"Colori",color_low:"Basso 0%",color_mid:"Medio 25%",color_high:"Alto 50%",color_full:"Pieno 85%",animations:"Animazioni",anim_all_on:"Attiva tutte",anim_all_off:"Disattiva tutte",anim_float:"Galleggiamento",anim_tilt_3d:"Inclinazione 3D (mouse)",anim_wave:"Onda superficie",anim_fill_transition:"Transizione riempimento",anim_shimmer:"Riflesso in carica",anim_droplets:"Gocce carica/scarica",anim_particles:"Particelle (bolle)",anim_convection:"Correnti di convezione",anim_caustics:"Caustiche luminose",anim_breathing:"Respiro liquido",anim_sloshing:"Sciabordio reattivo",anim_electrolysis:"Elettrolisi (in carica)",anim_gradient_wave:"Onda di colore"},en:{entity:"Entity",battery_sensor:"Battery sensor",display_name:"Display name",appearance:"Appearance",size:"Size",size_small:"Small (140px)",size_medium:"Medium (200px)",size_large:"Large (260px)",glow:"Glow intensity",display:"Display",show_pct:"Show percentage",show_status:"Show status",show_voltage:"Show voltage",show_power:"Show power",show_particles:"Show particles",voltage_entity:"Voltage entity",power_entity:"Power entity",language:"Language",lang_auto:"Auto (from HA)",interaction:"Interaction",tap_action:"Tap action",tap_more:"More Info",tap_toggle:"Toggle",tap_none:"None",test_override:"Test percentage override",test_off:"Disabled (using entity)",test_reset:"Reset",colors:"Colors",color_low:"Low 0%",color_mid:"Mid 25%",color_high:"High 50%",color_full:"Full 85%",animations:"Animations",anim_all_on:"Enable all",anim_all_off:"Disable all",anim_float:"Float",anim_tilt_3d:"3D tilt (mouse)",anim_wave:"Surface wave",anim_fill_transition:"Fill transition",anim_shimmer:"Charging shimmer",anim_droplets:"Charge/discharge droplets",anim_particles:"Particles (bubbles)",anim_convection:"Convection currents",anim_caustics:"Caustic light",anim_breathing:"Liquid breathing",anim_sloshing:"Reactive sloshing",anim_electrolysis:"Electrolysis (charging)",anim_gradient_wave:"Color wave"}};let U=class extends P{constructor(){super(...arguments),this._config={...bt}}setConfig(i){const t={...bt,...i};t.animations={...F,...i.animations??{}},this._config=t}_t(i){const t=this._config.language==="auto"?this.hass?.locale?.language??this.hass?.language??"en":this._config.language;return yt[t]?.[i]??yt.en[i]??i}render(){return this.hass?g`
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
          ${this._config.show_voltage?g`
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
          ${this._config.show_power?g`
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
        </section>

        <section class="section">
          <div class="section-title">${this._t("animations")}</div>
          <div class="anim-bulk">
            <button class="anim-bulk-btn" @click=${()=>this._setAllAnimations(!0)}>${this._t("anim_all_on")}</button>
            <button class="anim-bulk-btn" @click=${()=>this._setAllAnimations(!1)}>${this._t("anim_all_off")}</button>
          </div>
          ${this._renderAnimToggle("float","anim_float")}
          ${this._renderAnimToggle("tilt_3d","anim_tilt_3d")}
          ${this._renderAnimToggle("wave","anim_wave")}
          ${this._renderAnimToggle("fill_transition","anim_fill_transition")}
          ${this._renderAnimToggle("shimmer","anim_shimmer")}
          ${this._renderAnimToggle("droplets","anim_droplets")}
          ${this._renderAnimToggle("particles","anim_particles")}
          ${this._renderAnimToggle("convection","anim_convection")}
          ${this._renderAnimToggle("caustics","anim_caustics")}
          ${this._renderAnimToggle("breathing","anim_breathing")}
          ${this._renderAnimToggle("sloshing","anim_sloshing")}
          ${this._renderAnimToggle("electrolysis","anim_electrolysis")}
          ${this._renderAnimToggle("gradient_wave","anim_gradient_wave")}
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
    `:g``}_update(i,t){this._config={...this._config,[i]:t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateColor(i,t){this._config={...this._config,charge_colors:{...this._config.charge_colors,[i]:t}},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateTapAction(i){this._config={...this._config,tap_action:{action:i}},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_renderAnimToggle(i,t){return g`
      <div class="toggle-row">
        <div><div class="toggle-label">${this._t(t)}</div></div>
        <ha-switch .checked=${this._config.animations[i]}
          @change=${e=>this._updateAnimation(i,e.target.checked)}
        ></ha-switch>
      </div>
    `}_updateAnimation(i,t){this._config={...this._config,animations:{...this._config.animations,[i]:t},show_particles:this._config.animations.particles},i==="particles"&&(this._config.show_particles=t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_setAllAnimations(i){const t={};for(const e of Object.keys(F))t[e]=i;this._config={...this._config,animations:t,show_particles:i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};U.styles=wt`
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
    .anim-bulk {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .anim-bulk-btn {
      flex: 1;
      padding: 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-color);
      font-size: 12px;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }
    .anim-bulk-btn:hover {
      background: var(--secondary-background-color);
    }
  `;Q([K({attribute:!1})],U.prototype,"hass",2);Q([y()],U.prototype,"_config",2);U=Q([Pt("beautiful-battery-editor")],U);const me=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));
