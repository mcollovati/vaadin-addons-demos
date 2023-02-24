(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.enforceFieldValidation=!1;const Mo="modulepreload",Do=function(o,e){return new URL(o,e).href},yt={},Oe=function(e,t,n){if(!t||t.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(t.map(r=>{if(r=Do(r,n),r in yt)return;yt[r]=!0;const i=r.endsWith(".css"),c=i?'[rel="stylesheet"]':"";if(!!n)for(let d=a.length-1;d>=0;d--){const b=a[d];if(b.href===r&&(!i||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${c}`))return;const s=document.createElement("link");if(s.rel=i?"stylesheet":Mo,i||(s.as="script",s.crossOrigin=""),s.href=r,document.head.appendChild(s),i)return new Promise((d,b)=>{s.addEventListener("load",d),s.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function Ne(o){return o=o||[],Array.isArray(o)?o:[o]}function P(o){return`[Vaadin.Router] ${o}`}function Bo(o){if(typeof o!="object")return String(o);const e=Object.prototype.toString.call(o).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(o)}`:e}const Pe="module",Me="nomodule",at=[Pe,Me];function kt(o){if(!o.match(/.+\.[m]?js$/))throw new Error(P(`Unsupported type for bundle "${o}": .js or .mjs expected.`))}function oo(o){if(!o||!N(o.path))throw new Error(P('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=o.bundle,t=["component","redirect","bundle"];if(!W(o.action)&&!Array.isArray(o.children)&&!W(o.children)&&!De(e)&&!t.some(n=>N(o[n])))throw new Error(P(`Expected route config "${o.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(N(e))kt(e);else if(at.some(n=>n in e))at.forEach(n=>n in e&&kt(e[n]));else throw new Error(P('Expected route bundle to include either "'+Me+'" or "'+Pe+'" keys, or both'));o.redirect&&["bundle","component"].forEach(n=>{n in o&&console.warn(P(`Route config "${o.path}" has both "redirect" and "${n}" properties, and "redirect" will always override the latter. Did you mean to only use "${n}"?`))})}function _t(o){Ne(o).forEach(e=>oo(e))}function zt(o,e){let t=document.head.querySelector('script[src="'+o+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",o),e===Pe?t.setAttribute("type",Pe):e===Me&&t.setAttribute(Me,""),t.async=!0),new Promise((n,a)=>{t.onreadystatechange=t.onload=r=>{t.__dynamicImportLoaded=!0,n(r)},t.onerror=r=>{t.parentNode&&t.parentNode.removeChild(t),a(r)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&n()})}function qo(o){return N(o)?zt(o):Promise.race(at.filter(e=>e in o).map(e=>zt(o[e],e)))}function be(o,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${o}`,{cancelable:o==="go",detail:e}))}function De(o){return typeof o=="object"&&!!o}function W(o){return typeof o=="function"}function N(o){return typeof o=="string"}function no(o){const e=new Error(P(`Page not found (${o.pathname})`));return e.context=o,e.code=404,e}const te=new class{};function jo(o){const e=o.port,t=o.protocol,r=t==="http:"&&e==="80"||t==="https:"&&e==="443"?o.hostname:o.host;return`${t}//${r}`}function St(o){if(o.defaultPrevented||o.button!==0||o.shiftKey||o.ctrlKey||o.altKey||o.metaKey)return;let e=o.target;const t=o.composedPath?o.composedPath():o.path||[];for(let c=0;c<t.length;c++){const l=t[c];if(l.nodeName&&l.nodeName.toLowerCase()==="a"){e=l;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||jo(e))!==window.location.origin)return;const{pathname:a,search:r,hash:i}=e;be("go",{pathname:a,search:r,hash:i})&&(o.preventDefault(),o&&o.type==="click"&&window.scrollTo(0,0))}const Uo={activate(){window.document.addEventListener("click",St)},inactivate(){window.document.removeEventListener("click",St)}},Vo=/Trident/.test(navigator.userAgent);Vo&&!W(window.PopStateEvent)&&(window.PopStateEvent=function(o,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(o,Boolean(e.bubbles),Boolean(e.cancelable)),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function At(o){if(o.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:n}=window.location;be("go",{pathname:e,search:t,hash:n})}const Ho={activate(){window.addEventListener("popstate",At)},inactivate(){window.removeEventListener("popstate",At)}};var se=co,Wo=st,Go=Jo,Yo=io,Ko=so,ao="/",ro="./",Xo=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function st(o,e){for(var t=[],n=0,a=0,r="",i=e&&e.delimiter||ao,c=e&&e.delimiters||ro,l=!1,s;(s=Xo.exec(o))!==null;){var d=s[0],b=s[1],p=s.index;if(r+=o.slice(a,p),a=p+d.length,b){r+=b[1],l=!0;continue}var u="",B=o[a],I=s[2],ke=s[3],Ve=s[4],R=s[5];if(!l&&r.length){var M=r.length-1;c.indexOf(r[M])>-1&&(u=r[M],r=r.slice(0,M))}r&&(t.push(r),r="",l=!1);var Y=u!==""&&B!==void 0&&B!==u,K=R==="+"||R==="*",He=R==="?"||R==="*",q=u||i,_e=ke||Ve;t.push({name:I||n++,prefix:u,delimiter:q,optional:He,repeat:K,partial:Y,pattern:_e?Zo(_e):"[^"+j(q)+"]+?"})}return(r||a<o.length)&&t.push(r+o.substr(a)),t}function Jo(o,e){return io(st(o,e))}function io(o){for(var e=new Array(o.length),t=0;t<o.length;t++)typeof o[t]=="object"&&(e[t]=new RegExp("^(?:"+o[t].pattern+")$"));return function(n,a){for(var r="",i=a&&a.encode||encodeURIComponent,c=0;c<o.length;c++){var l=o[c];if(typeof l=="string"){r+=l;continue}var s=n?n[l.name]:void 0,d;if(Array.isArray(s)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but got array');if(s.length===0){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var b=0;b<s.length;b++){if(d=i(s[b],l),!e[c].test(d))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'"');r+=(b===0?l.prefix:l.delimiter)+d}continue}if(typeof s=="string"||typeof s=="number"||typeof s=="boolean"){if(d=i(String(s),l),!e[c].test(d))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but got "'+d+'"');r+=l.prefix+d;continue}if(l.optional){l.partial&&(r+=l.prefix);continue}throw new TypeError('Expected "'+l.name+'" to be '+(l.repeat?"an array":"a string"))}return r}}function j(o){return o.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Zo(o){return o.replace(/([=!:$/()])/g,"\\$1")}function lo(o){return o&&o.sensitive?"":"i"}function Qo(o,e){if(!e)return o;var t=o.source.match(/\((?!\?)/g);if(t)for(var n=0;n<t.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return o}function en(o,e,t){for(var n=[],a=0;a<o.length;a++)n.push(co(o[a],e,t).source);return new RegExp("(?:"+n.join("|")+")",lo(t))}function tn(o,e,t){return so(st(o,t),e,t)}function so(o,e,t){t=t||{};for(var n=t.strict,a=t.start!==!1,r=t.end!==!1,i=j(t.delimiter||ao),c=t.delimiters||ro,l=[].concat(t.endsWith||[]).map(j).concat("$").join("|"),s=a?"^":"",d=o.length===0,b=0;b<o.length;b++){var p=o[b];if(typeof p=="string")s+=j(p),d=b===o.length-1&&c.indexOf(p[p.length-1])>-1;else{var u=p.repeat?"(?:"+p.pattern+")(?:"+j(p.delimiter)+"(?:"+p.pattern+"))*":p.pattern;e&&e.push(p),p.optional?p.partial?s+=j(p.prefix)+"("+u+")?":s+="(?:"+j(p.prefix)+"("+u+"))?":s+=j(p.prefix)+"("+u+")"}}return r?(n||(s+="(?:"+i+")?"),s+=l==="$"?"$":"(?="+l+")"):(n||(s+="(?:"+i+"(?="+l+"))?"),d||(s+="(?="+i+"|"+l+")")),new RegExp(s,lo(t))}function co(o,e,t){return o instanceof RegExp?Qo(o,e):Array.isArray(o)?en(o,e,t):tn(o,e,t)}se.parse=Wo;se.compile=Go;se.tokensToFunction=Yo;se.tokensToRegExp=Ko;const{hasOwnProperty:on}=Object.prototype,rt=new Map;rt.set("|false",{keys:[],pattern:/(?:)/});function Et(o){try{return decodeURIComponent(o)}catch{return o}}function nn(o,e,t,n,a){t=!!t;const r=`${o}|${t}`;let i=rt.get(r);if(!i){const s=[];i={keys:s,pattern:se(o,s,{end:t,strict:o===""})},rt.set(r,i)}const c=i.pattern.exec(e);if(!c)return null;const l=Object.assign({},a);for(let s=1;s<c.length;s++){const d=i.keys[s-1],b=d.name,p=c[s];(p!==void 0||!on.call(l,b))&&(d.repeat?l[b]=p?p.split(d.delimiter).map(Et):[]:l[b]=p&&Et(p))}return{path:c[0],keys:(n||[]).concat(i.keys),params:l}}function fo(o,e,t,n,a){let r,i,c=0,l=o.path||"";return l.charAt(0)==="/"&&(t&&(l=l.substr(1)),t=!0),{next(s){if(o===s)return{done:!0};const d=o.__children=o.__children||o.children;if(!r&&(r=nn(l,e,!d,n,a),r))return{done:!1,value:{route:o,keys:r.keys,params:r.params,path:r.path}};if(r&&d)for(;c<d.length;){if(!i){const p=d[c];p.parent=o;let u=r.path.length;u>0&&e.charAt(u)==="/"&&(u+=1),i=fo(p,e.substr(u),t,r.keys,r.params)}const b=i.next(s);if(!b.done)return{done:!1,value:b.value};i=null,c++}return{done:!0}}}}function an(o){if(W(o.route.action))return o.route.action(o)}function rn(o,e){let t=e;for(;t;)if(t=t.parent,t===o)return!0;return!1}function ln(o){let e=`Path '${o.pathname}' is not properly resolved due to an error.`;const t=(o.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function sn(o,e){const{route:t,path:n}=e;if(t&&!t.__synthetic){const a={path:n,route:t};if(!o.chain)o.chain=[];else if(t.parent){let r=o.chain.length;for(;r--&&o.chain[r].route&&o.chain[r].route!==t.parent;)o.chain.pop()}o.chain.push(a)}}class ue{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||an,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){_t(e);const t=[...Ne(e)];this.root.__children=t}addRoutes(e){return _t(e),this.root.__children.push(...Ne(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,N(e)?{pathname:e}:e),n=fo(this.root,this.__normalizePathname(t.pathname),this.baseUrl),a=this.resolveRoute;let r=null,i=null,c=t;function l(s,d=r.value.route,b){const p=b===null&&r.value.route;return r=i||n.next(p),i=null,!s&&(r.done||!rn(d,r.value.route))?(i=r,Promise.resolve(te)):r.done?Promise.reject(no(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,r.value),sn(c,r.value),Promise.resolve(a(c)).then(u=>u!=null&&u!==te?(c.result=u.result||u,c):l(s,d,u)))}return t.next=l,Promise.resolve().then(()=>l(!0,this.root)).catch(s=>{const d=ln(c);if(s?console.warn(d):s=new Error(d),s.context=s.context||c,s instanceof DOMException||(s.code=s.code||500),this.errorHandler)return c.result=this.errorHandler(s),c;throw s})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,n=this.constructor.__createUrl(e,t).href;if(n.slice(0,t.length)===t)return n.slice(t.length)}}ue.pathToRegexp=se;const{pathToRegexp:Lt}=ue,$t=new Map;function po(o,e,t){const n=e.name||e.component;if(n&&(o.has(n)?o.get(n).push(e):o.set(n,[e])),Array.isArray(t))for(let a=0;a<t.length;a++){const r=t[a];r.parent=e,po(o,r,r.__children||r.children)}}function Ct(o,e){const t=o.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function Tt(o){let e=o.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function cn(o,e={}){if(!(o instanceof ue))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(n,a)=>{let r=Ct(t,n);if(!r&&(t.clear(),po(t,o.root,o.root.__children),r=Ct(t,n),!r))throw new Error(`Route "${n}" not found`);let i=$t.get(r.fullPath);if(!i){let l=Tt(r),s=r.parent;for(;s;){const u=Tt(s);u&&(l=u.replace(/\/$/,"")+"/"+l.replace(/^\//,"")),s=s.parent}const d=Lt.parse(l),b=Lt.tokensToFunction(d),p=Object.create(null);for(let u=0;u<d.length;u++)N(d[u])||(p[d[u].name]=!0);i={toPath:b,keys:p},$t.set(l,i),r.fullPath=l}let c=i.toPath(a,e)||"/";if(e.stringifyQueryParams&&a){const l={},s=Object.keys(a);for(let b=0;b<s.length;b++){const p=s[b];i.keys[p]||(l[p]=a[p])}const d=e.stringifyQueryParams(l);d&&(c+=d.charAt(0)==="?"?d:`?${d}`)}return c}}let Rt=[];function fn(o){Rt.forEach(e=>e.inactivate()),o.forEach(e=>e.activate()),Rt=o}const dn=o=>{const e=getComputedStyle(o).getPropertyValue("animation-name");return e&&e!=="none"},pn=(o,e)=>{const t=()=>{o.removeEventListener("animationend",t),e()};o.addEventListener("animationend",t)};function It(o,e){return o.classList.add(e),new Promise(t=>{if(dn(o)){const n=o.getBoundingClientRect(),a=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;o.setAttribute("style",`position: absolute; ${a}`),pn(o,()=>{o.classList.remove(e),o.removeAttribute("style"),t()})}else o.classList.remove(e),t()})}const bn=256;function Ke(o){return o!=null}function mn(o){const e=Object.assign({},o);return delete e.next,e}function F({pathname:o="",search:e="",hash:t="",chain:n=[],params:a={},redirectFrom:r,resolver:i},c){const l=n.map(s=>s.route);return{baseUrl:i&&i.baseUrl||"",pathname:o,search:e,hash:t,routes:l,route:c||l.length&&l[l.length-1]||null,params:a,redirectFrom:r,getUrl:(s={})=>Te(V.pathToRegexp.compile(bo(l))(Object.assign({},a,s)),i)}}function Ft(o,e){const t=Object.assign({},o.params);return{redirect:{pathname:e,from:o.pathname,params:t}}}function un(o,e){e.location=F(o);const t=o.chain.map(n=>n.route).indexOf(o.route);return o.chain[t].element=e,e}function Ce(o,e,t){if(W(o))return o.apply(t,e)}function Ot(o,e,t){return n=>{if(n&&(n.cancel||n.redirect))return n;if(t)return Ce(t[o],e,t)}}function hn(o,e){if(!Array.isArray(o)&&!De(o))throw new Error(P(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${o}`));e.__children=[];const t=Ne(o);for(let n=0;n<t.length;n++)oo(t[n]),e.__children.push(t[n])}function Le(o){if(o&&o.length){const e=o[0].parentNode;for(let t=0;t<o.length;t++)e.removeChild(o[t])}}function Te(o,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(o.replace(/^\//,""),t).pathname:o}function bo(o){return o.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class V extends ue{constructor(e,t){const n=document.head.querySelector("base"),a=n&&n.getAttribute("href");super([],Object.assign({baseUrl:a&&ue.__createUrl(a,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=i=>this.__resolveRoute(i);const r=V.NavigationTrigger;V.setTriggers.apply(V,Object.keys(r).map(i=>r[i])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=F({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let n=Promise.resolve();W(t.children)&&(n=n.then(()=>t.children(mn(e))).then(r=>{!Ke(r)&&!W(t.children)&&(r=t.children),hn(r,t)}));const a={redirect:r=>Ft(e,r),component:r=>{const i=document.createElement(r);return this.__createdByRouter.set(i,!0),i}};return n.then(()=>{if(this.__isLatestRender(e))return Ce(t.action,[e,a],t)}).then(r=>{if(Ke(r)&&(r instanceof HTMLElement||r.redirect||r===te))return r;if(N(t.redirect))return a.redirect(t.redirect);if(t.bundle)return qo(t.bundle).then(()=>{},()=>{throw new Error(P(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(r=>{if(Ke(r))return r;if(N(t.component))return a.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const n=++this.__lastStartedRenderId,a=Object.assign({search:"",hash:""},N(e)?{pathname:e}:e,{__renderId:n});return this.ready=this.resolve(a).then(r=>this.__fullyResolveChain(r)).then(r=>{if(this.__isLatestRender(r)){const i=this.__previousContext;if(r===i)return this.__updateBrowserHistory(i,!0),this.location;if(this.location=F(r),t&&this.__updateBrowserHistory(r,n===1),be("location-changed",{router:this,location:this.location}),r.__skipAttach)return this.__copyUnchangedElements(r,i),this.__previousContext=r,this.location;this.__addAppearingContent(r,i);const c=this.__animateIfNeeded(r);return this.__runOnAfterEnterCallbacks(r),this.__runOnAfterLeaveCallbacks(r,i),c.then(()=>{if(this.__isLatestRender(r))return this.__removeDisappearingContent(),this.__previousContext=r,this.location})}}).catch(r=>{if(n===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(a),Le(this.__outlet&&this.__outlet.children),this.location=F(Object.assign(a,{resolver:this})),be("error",Object.assign({router:this,error:r},a)),r}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(n=>{const r=n!==t?n:e,c=Te(bo(n.chain),n.resolver)===n.pathname,l=(s,d=s.route,b)=>s.next(void 0,d,b).then(p=>p===null||p===te?c?s:d.parent!==null?l(s,d.parent,p):p:p);return l(n).then(s=>{if(s===null||s===te)throw no(r);return s&&s!==te&&s!==n?this.__fullyResolveChain(r,s):this.__amendWithOnBeforeCallbacks(n)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(un(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(n=>this.__findComponentContextAfterAllRedirects(n)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(P(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Bo(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},n=t.chain||[],a=e.chain;let r=Promise.resolve();const i=()=>({cancel:!0}),c=l=>Ft(e,l);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let l=0;l<Math.min(n.length,a.length)&&!(n[l].route!==a[l].route||n[l].path!==a[l].path&&n[l].element!==a[l].element||!this.__isReusableElement(n[l].element,a[l].element));l=++e.__divergedChainIndex);if(e.__skipAttach=a.length===n.length&&e.__divergedChainIndex==a.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let l=a.length-1;l>=0;l--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:i},n[l]);for(let l=0;l<a.length;l++)r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:i,redirect:c},a[l]),n[l].element.location=F(e,n[l].route)}else for(let l=n.length-1;l>=e.__divergedChainIndex;l--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:i},n[l])}if(!e.__skipAttach)for(let l=0;l<a.length;l++)l<e.__divergedChainIndex?l<n.length&&n[l].element&&(n[l].element.location=F(e,n[l].route)):(r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:i,redirect:c},a[l]),a[l].element&&(a[l].element.location=F(e,a[l].route)));return r.then(l=>{if(l){if(l.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(l.redirect)return this.__redirect(l.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,n,a){const r=F(t);return e.then(i=>{if(this.__isLatestRender(t))return Ot("onBeforeLeave",[r,n,this],a.element)(i)}).then(i=>{if(!(i||{}).redirect)return i})}__runOnBeforeEnterCallbacks(e,t,n,a){const r=F(t,a.route);return e.then(i=>{if(this.__isLatestRender(t))return Ot("onBeforeEnter",[r,n,this],a.element)(i)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,n){if(t>bn)throw new Error(P(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:n})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(P(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:n=""},a){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==n){const r=a?"replaceState":"pushState";window.history[r](null,document.title,e+t+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let n=this.__outlet;for(let a=0;a<e.__divergedChainIndex;a++){const r=t&&t.chain[a].element;if(r)if(r.parentNode===n)e.chain[a].element=r,n=r;else break}return n}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const n=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(n.children).filter(r=>this.__addedByRouter.get(r)&&r!==e.result);let a=n;for(let r=e.__divergedChainIndex;r<e.chain.length;r++){const i=e.chain[r].element;i&&(a.appendChild(i),this.__addedByRouter.set(i,!0),a===n&&this.__appearingContent.push(i),a=i)}}__removeDisappearingContent(){this.__disappearingContent&&Le(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(Le(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let n=t.chain.length-1;n>=e.__divergedChainIndex&&this.__isLatestRender(e);n--){const a=t.chain[n].element;if(a)try{const r=F(e);Ce(a.onAfterLeave,[r,{},t.resolver],a)}finally{this.__disappearingContent.indexOf(a)>-1&&Le(a.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const n=e.chain[t].element||{},a=F(e,e.chain[t].route);Ce(n.onAfterEnter,[a,{},e.resolver],n)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],n=(this.__appearingContent||[])[0],a=[],r=e.chain;let i;for(let c=r.length;c>0;c--)if(r[c-1].route.animate){i=r[c-1].route.animate;break}if(t&&n&&i){const c=De(i)&&i.leave||"leaving",l=De(i)&&i.enter||"entering";a.push(It(t,c)),a.push(It(n,l))}return Promise.all(a).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:n,hash:a}=e?e.detail:window.location;N(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:n,hash:a},!0))}static setTriggers(...e){fn(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=cn(this)),Te(this.__urlForName(e,t),this)}urlForPath(e,t){return Te(V.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:n,hash:a}=N(e)?this.__createUrl(e,"http://a"):e;return be("go",{pathname:t,search:n,hash:a})}}const gn=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,Re=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function wn(){function o(){return!0}return mo(o)}function xn(){try{return vn()?!0:yn()?Re?!kn():!wn():!1}catch{return!1}}function vn(){return localStorage.getItem("vaadin.developmentmode.force")}function yn(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function kn(){return!!(Re&&Object.keys(Re).map(e=>Re[e]).filter(e=>e.productionMode).length>0)}function mo(o,e){if(typeof o!="function")return;const t=gn.exec(o.toString());if(t)try{o=new Function(t[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return o(e)}window.Vaadin=window.Vaadin||{};const Nt=function(o,e){if(window.Vaadin.developmentMode)return mo(o,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=xn());function _n(){}const zn=function(){if(typeof Nt=="function")return Nt(_n)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});zn();V.NavigationTrigger={POPSTATE:Ho,CLICK:Uo};var Xe,z;(function(o){o.CONNECTED="connected",o.LOADING="loading",o.RECONNECTING="reconnecting",o.CONNECTION_LOST="connection-lost"})(z||(z={}));class Sn{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(t=>{var n;(n=t==null?void 0:t.active)===null||n===void 0||n.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=z.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(z.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(z.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const t=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const n of this.stateChangeListeners)n(t,this.connectionState)}}get online(){return this.connectionState===z.CONNECTED||this.connectionState===z.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=z.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const $e=window;!((Xe=$e.Vaadin)===null||Xe===void 0)&&Xe.connectionState||($e.Vaadin=$e.Vaadin||{},$e.Vaadin.connectionState=new Sn(navigator.onLine?z.CONNECTED:z.CONNECTION_LOST));function T(o,e,t,n){var a=arguments.length,r=a<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,n);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(r=(a<3?i(r):a>3?i(e,t,r):i(e,t))||r);return a>3&&r&&Object.defineProperty(e,t,r),r}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=window,ct=Ie.ShadowRoot&&(Ie.ShadyCSS===void 0||Ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),Pt=new WeakMap;let dt=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ct&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Pt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Pt.set(t,e))}return e}toString(){return this.cssText}};const _=o=>new dt(typeof o=="string"?o:o+"",void 0,ft),w=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,a,r)=>n+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[r+1],o[0]);return new dt(t,o,ft)},An=(o,e)=>{ct?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const n=document.createElement("style"),a=Ie.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=t.cssText,o.appendChild(n)})},Mt=ct?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return _(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Je;const Be=window,Dt=Be.trustedTypes,En=Dt?Dt.emptyScript:"",Bt=Be.reactiveElementPolyfillSupport,it={toAttribute(o,e){switch(e){case Boolean:o=o?En:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},uo=(o,e)=>e!==o&&(e==e||o==o),Ze={attribute:!0,type:String,converter:it,reflect:!1,hasChanged:uo};let ee=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,n)=>{const a=this._$Ep(n,t);a!==void 0&&(this._$Ev.set(a,n),e.push(a))}),e}static createProperty(e,t=Ze){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const n=typeof e=="symbol"?Symbol():"__"+e,a=this.getPropertyDescriptor(e,n,t);a!==void 0&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(a){const r=this[e];this[t]=a,this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ze}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,n=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const a of n)this.createProperty(a,t[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const a of n)t.unshift(Mt(a))}else e!==void 0&&t.push(Mt(e));return t}static _$Ep(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,n;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return An(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostConnected)===null||n===void 0?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostDisconnected)===null||n===void 0?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=Ze){var a;const r=this.constructor._$Ep(e,n);if(r!==void 0&&n.reflect===!0){const i=(((a=n.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?n.converter:it).toAttribute(t,n.type);this._$El=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$El=null}}_$AK(e,t){var n;const a=this.constructor,r=a._$Ev.get(e);if(r!==void 0&&this._$El!==r){const i=a.getPropertyOptions(r),c=typeof i.converter=="function"?{fromAttribute:i.converter}:((n=i.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?i.converter:it;this._$El=r,this[r]=c.fromAttribute(t,i.type),this._$El=null}}requestUpdate(e,t,n){let a=!0;e!==void 0&&(((n=n||this.constructor.getPropertyOptions(e)).hasChanged||uo)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,n))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((a,r)=>this[r]=a),this._$Ei=void 0);let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$ES)===null||e===void 0||e.forEach(a=>{var r;return(r=a.hostUpdate)===null||r===void 0?void 0:r.call(a)}),this.update(n)):this._$Ek()}catch(a){throw t=!1,this._$Ek(),a}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(n=>{var a;return(a=n.hostUpdated)===null||a===void 0?void 0:a.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,n)=>this._$EO(n,this[n],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};ee.finalized=!0,ee.elementProperties=new Map,ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},Bt==null||Bt({ReactiveElement:ee}),((Je=Be.reactiveElementVersions)!==null&&Je!==void 0?Je:Be.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qe;const qe=window,ae=qe.trustedTypes,qt=ae?ae.createPolicy("lit-html",{createHTML:o=>o}):void 0,U=`lit$${(Math.random()+"").slice(9)}$`,ho="?"+U,Ln=`<${ho}>`,re=document,he=(o="")=>re.createComment(o),ge=o=>o===null||typeof o!="object"&&typeof o!="function",go=Array.isArray,$n=o=>go(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jt=/-->/g,Ut=/>/g,H=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vt=/'/g,Ht=/"/g,wo=/^(?:script|style|textarea|title)$/i,xo=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),$=xo(1),Na=xo(2),G=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Wt=new WeakMap,oe=re.createTreeWalker(re,129,null,!1),Cn=(o,e)=>{const t=o.length-1,n=[];let a,r=e===2?"<svg>":"",i=fe;for(let l=0;l<t;l++){const s=o[l];let d,b,p=-1,u=0;for(;u<s.length&&(i.lastIndex=u,b=i.exec(s),b!==null);)u=i.lastIndex,i===fe?b[1]==="!--"?i=jt:b[1]!==void 0?i=Ut:b[2]!==void 0?(wo.test(b[2])&&(a=RegExp("</"+b[2],"g")),i=H):b[3]!==void 0&&(i=H):i===H?b[0]===">"?(i=a??fe,p=-1):b[1]===void 0?p=-2:(p=i.lastIndex-b[2].length,d=b[1],i=b[3]===void 0?H:b[3]==='"'?Ht:Vt):i===Ht||i===Vt?i=H:i===jt||i===Ut?i=fe:(i=H,a=void 0);const B=i===H&&o[l+1].startsWith("/>")?" ":"";r+=i===fe?s+Ln:p>=0?(n.push(d),s.slice(0,p)+"$lit$"+s.slice(p)+U+B):s+U+(p===-2?(n.push(void 0),l):B)}const c=r+(o[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[qt!==void 0?qt.createHTML(c):c,n]};class we{constructor({strings:e,_$litType$:t},n){let a;this.parts=[];let r=0,i=0;const c=e.length-1,l=this.parts,[s,d]=Cn(e,t);if(this.el=we.createElement(s,n),oe.currentNode=this.el.content,t===2){const b=this.el.content,p=b.firstChild;p.remove(),b.append(...p.childNodes)}for(;(a=oe.nextNode())!==null&&l.length<c;){if(a.nodeType===1){if(a.hasAttributes()){const b=[];for(const p of a.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith(U)){const u=d[i++];if(b.push(p),u!==void 0){const B=a.getAttribute(u.toLowerCase()+"$lit$").split(U),I=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:I[2],strings:B,ctor:I[1]==="."?Rn:I[1]==="?"?Fn:I[1]==="@"?On:je})}else l.push({type:6,index:r})}for(const p of b)a.removeAttribute(p)}if(wo.test(a.tagName)){const b=a.textContent.split(U),p=b.length-1;if(p>0){a.textContent=ae?ae.emptyScript:"";for(let u=0;u<p;u++)a.append(b[u],he()),oe.nextNode(),l.push({type:2,index:++r});a.append(b[p],he())}}}else if(a.nodeType===8)if(a.data===ho)l.push({type:2,index:r});else{let b=-1;for(;(b=a.data.indexOf(U,b+1))!==-1;)l.push({type:7,index:r}),b+=U.length-1}r++}}static createElement(e,t){const n=re.createElement("template");return n.innerHTML=e,n}}function ie(o,e,t=o,n){var a,r,i,c;if(e===G)return e;let l=n!==void 0?(a=t._$Co)===null||a===void 0?void 0:a[n]:t._$Cl;const s=ge(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==s&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),s===void 0?l=void 0:(l=new s(o),l._$AT(o,t,n)),n!==void 0?((i=(c=t)._$Co)!==null&&i!==void 0?i:c._$Co=[])[n]=l:t._$Cl=l),l!==void 0&&(e=ie(o,l._$AS(o,e.values),l,n)),e}class Tn{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:n},parts:a}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:re).importNode(n,!0);oe.currentNode=r;let i=oe.nextNode(),c=0,l=0,s=a[0];for(;s!==void 0;){if(c===s.index){let d;s.type===2?d=new ye(i,i.nextSibling,this,e):s.type===1?d=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(d=new Nn(i,this,e)),this.u.push(d),s=a[++l]}c!==(s==null?void 0:s.index)&&(i=oe.nextNode(),c++)}return r}p(e){let t=0;for(const n of this.u)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ye{constructor(e,t,n,a){var r;this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=a,this._$Cm=(r=a==null?void 0:a.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ie(this,e,t),ge(e)?e===k||e==null||e===""?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==G&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):$n(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==k&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(re.createTextNode(e)),this._$AH=e}$(e){var t;const{values:n,_$litType$:a}=e,r=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=we.createElement(a.h,this.options)),a);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.p(n);else{const i=new Tn(r,this),c=i.v(this.options);i.p(n),this.T(c),this._$AH=i}}_$AC(e){let t=Wt.get(e.strings);return t===void 0&&Wt.set(e.strings,t=new we(e)),t}k(e){go(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,a=0;for(const r of e)a===t.length?t.push(n=new ye(this.O(he()),this.O(he()),this,this.options)):n=t[a],n._$AI(r),a++;a<t.length&&(this._$AR(n&&n._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cm=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class je{constructor(e,t,n,a,r){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=k}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,a){const r=this.strings;let i=!1;if(r===void 0)e=ie(this,e,t,0),i=!ge(e)||e!==this._$AH&&e!==G,i&&(this._$AH=e);else{const c=e;let l,s;for(e=r[0],l=0;l<r.length-1;l++)s=ie(this,c[n+l],t,l),s===G&&(s=this._$AH[l]),i||(i=!ge(s)||s!==this._$AH[l]),s===k?e=k:e!==k&&(e+=(s??"")+r[l+1]),this._$AH[l]=s}i&&!a&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Rn extends je{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}}const In=ae?ae.emptyScript:"";class Fn extends je{constructor(){super(...arguments),this.type=4}j(e){e&&e!==k?this.element.setAttribute(this.name,In):this.element.removeAttribute(this.name)}}class On extends je{constructor(e,t,n,a,r){super(e,t,n,a,r),this.type=5}_$AI(e,t=this){var n;if((e=(n=ie(this,e,t,0))!==null&&n!==void 0?n:k)===G)return;const a=this._$AH,r=e===k&&a!==k||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==k&&(a===k||r);r&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}}class Nn{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ie(this,e)}}const Gt=qe.litHtmlPolyfillSupport;Gt==null||Gt(we,ye),((Qe=qe.litHtmlVersions)!==null&&Qe!==void 0?Qe:qe.litHtmlVersions=[]).push("2.6.1");const Pn=(o,e,t)=>{var n,a;const r=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:e;let i=r._$litPart$;if(i===void 0){const c=(a=t==null?void 0:t.renderBefore)!==null&&a!==void 0?a:null;r._$litPart$=i=new ye(e.insertBefore(he(),c),c,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var et,tt;class ne extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const n=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=n.firstChild),n}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return G}}ne.finalized=!0,ne._$litElement$=!0,(et=globalThis.litElementHydrateSupport)===null||et===void 0||et.call(globalThis,{LitElement:ne});const Yt=globalThis.litElementPolyfillSupport;Yt==null||Yt({LitElement:ne});((tt=globalThis.litElementVersions)!==null&&tt!==void 0?tt:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mn=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}};function y(o){return(e,t)=>t!==void 0?((n,a,r)=>{a.constructor.createProperty(r,n)})(o,e,t):Mn(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce(o){return y({...o,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dn=({finisher:o,descriptor:e})=>(t,n)=>{var a;if(n===void 0){const r=(a=t.originalKey)!==null&&a!==void 0?a:t.key,i=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return o!=null&&(i.finisher=function(c){o(c,r)}),i}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,n,e(n)),o==null||o(r,n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Bn(o,e){return Dn({descriptor:t=>{const n={get(){var a,r;return(r=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(o))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const a=typeof t=="symbol"?Symbol():"__"+t;n.get=function(){var r,i;return this[a]===void 0&&(this[a]=(i=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&i!==void 0?i:null),this[a]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;((ot=window.HTMLSlotElement)===null||ot===void 0?void 0:ot.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jn=o=>(...e)=>({_$litDirective$:o,values:e});class Un{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vo=jn(class extends Un{constructor(o){var e;if(super(o),o.type!==qn.ATTRIBUTE||o.name!=="class"||((e=o.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var t,n;if(this.nt===void 0){this.nt=new Set,o.strings!==void 0&&(this.st=new Set(o.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((t=this.st)===null||t===void 0)&&t.has(r))&&this.nt.add(r);return this.render(e)}const a=o.element.classList;this.nt.forEach(r=>{r in e||(a.remove(r),this.nt.delete(r))});for(const r in e){const i=!!e[r];i===this.nt.has(r)||!((n=this.st)===null||n===void 0)&&n.has(r)||(i?(a.add(r),this.nt.add(r)):(a.remove(r),this.nt.delete(r)))}return G}}),nt="css-loading-indicator";var O;(function(o){o.IDLE="",o.FIRST="first",o.SECOND="second",o.THIRD="third"})(O||(O={}));class S extends ne{constructor(){super(),this.firstDelay=300,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=O.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=z.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,t;const n=window;return!((e=n.Vaadin)===null||e===void 0)&&e.connectionIndicator||(n.Vaadin=n.Vaadin||{},n.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(n.Vaadin.connectionIndicator)),(t=n.Vaadin)===null||t===void 0?void 0:t.connectionIndicator}render(){return $`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${vo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const t=window;!((e=t.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=t.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const t=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=t===z.CONNECTION_LOST,this.reconnecting=t===z.RECONNECTING,this.updateLoading(t===z.LOADING),this.loading?!1:t!==this.lastMessageState?(this.lastMessageState=t,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=O.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=O.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=O.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=O.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(nt)){const e=document.createElement("style");e.id=nt,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(nt);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case O.IDLE:return"display: none";case O.FIRST:case O.SECOND:case O.THIRD:return"display: block";default:return""}}timeoutFor(e,t,n,a){return e!==0&&window.clearTimeout(e),t?window.setTimeout(n,a):0}static get instance(){return S.create()}}T([y({type:Number})],S.prototype,"firstDelay",void 0);T([y({type:Number})],S.prototype,"secondDelay",void 0);T([y({type:Number})],S.prototype,"thirdDelay",void 0);T([y({type:Number})],S.prototype,"expandedDuration",void 0);T([y({type:String})],S.prototype,"onlineText",void 0);T([y({type:String})],S.prototype,"offlineText",void 0);T([y({type:String})],S.prototype,"reconnectingText",void 0);T([y({type:Boolean,reflect:!0})],S.prototype,"offline",void 0);T([y({type:Boolean,reflect:!0})],S.prototype,"reconnecting",void 0);T([y({type:Boolean,reflect:!0})],S.prototype,"expanded",void 0);T([y({type:Boolean,reflect:!0})],S.prototype,"loading",void 0);T([y({type:String})],S.prototype,"loadingBarState",void 0);T([y({type:Boolean})],S.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",S);S.instance;const xe=window;xe.Vaadin=xe.Vaadin||{};xe.Vaadin.registrations=xe.Vaadin.registrations||[];xe.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.17"});class Kt extends Error{}const de=window.document.body,v=window;class Vn{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,de.$=de.$||[],this.config=e||{},v.Vaadin=v.Vaadin||{},v.Vaadin.Flow=v.Vaadin.Flow||{},v.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const t=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||t&&t.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,v.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,v.Vaadin.connectionState.loadingFinished()}get action(){return async e=>{if(this.pathname=e.pathname,v.Vaadin.connectionState.online)try{await this.flowInit()}catch(t){if(t instanceof Kt)return v.Vaadin.connectionState.state=z.CONNECTION_LOST,this.offlineStubAction();throw t}else return this.offlineStubAction();return this.container.onBeforeEnter=(t,n)=>this.flowNavigate(t,n),this.container.onBeforeLeave=(t,n)=>this.flowLeave(t,n),this.container}}async flowLeave(e,t){const{connectionState:n}=v.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||n.offline?Promise.resolve({}):new Promise(a=>{this.loadingStarted(),this.container.serverConnected=r=>{a(t&&r?t.prevent():{}),this.loadingFinished()},de.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,t){return this.response?new Promise(n=>{this.loadingStarted(),this.container.serverConnected=(a,r)=>{t&&a?n(t.prevent()):t&&t.redirect&&r?n(t.redirect(r.pathname)):(this.container.style.display="",n(this.container)),this.loadingFinished()},de.$server.connectClient(this.container.localName,this.container.id,this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state)}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(e=!1){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi(e),this.response.appConfig.clientRouting=!e;const{pushScript:t,appConfig:n}=this.response;typeof t=="string"&&await this.loadScript(t);const{appId:a}=n;await(await Oe(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(a),await this.config.imports());const i=await Oe(()=>import("./FlowClient-e0ae8105.js"),[],import.meta.url);if(await this.flowInitClient(i),!e){const c=`flow-container-${a.toLowerCase()}`;this.container=document.createElement(c),de.$[a]=this.container,this.container.id=a}this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((t,n)=>{const a=document.createElement("script");a.onload=()=>t(),a.onerror=n,a.src=e,document.body.appendChild(a)})}injectAppIdScript(e){const t=e.substring(0,e.lastIndexOf("-")),n=document.createElement("script");n.type="module",n.setAttribute("data-app-id",t),document.body.append(n)}async flowInitClient(e){return e.init(),new Promise(t=>{const n=setInterval(()=>{Object.keys(v.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").reduce((r,i)=>r||v.Vaadin.Flow.clients[i].isActive(),!1)||(clearInterval(n),t())},5)})}async flowInitUi(e){const t=v.Vaadin&&v.Vaadin.TypeScript&&v.Vaadin.TypeScript.initial;return t?(v.Vaadin.TypeScript.initial=void 0,Promise.resolve(t)):new Promise((n,a)=>{const i=new XMLHttpRequest,c=e?"&serverSideRouting":"",l=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}${c}`;i.open("GET",l),i.onerror=()=>a(new Kt(`Invalid server response when initializing Flow UI.
        ${i.status}
        ${i.responseText}`)),i.onload=()=>{const s=i.getResponseHeader("content-type");s&&s.indexOf("application/json")!==-1?n(JSON.parse(i.responseText)):i.onerror()},i.send()})}addConnectionIndicator(){S.create(),v.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){v.Vaadin.connectionState.state=z.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{v.Vaadin.connectionState.state=z.CONNECTED},e.onerror=()=>{v.Vaadin.connectionState.state=z.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),v.addEventListener("offline",()=>{this.isFlowClientLoaded()||(v.Vaadin.connectionState.state=z.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),t="./offline-stub.html";e.setAttribute("src",t),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let n;const a=()=>{n!==void 0&&(v.Vaadin.connectionState.removeStateChangeListener(n),n=void 0)};return e.onBeforeEnter=(r,i,c)=>{n=()=>{v.Vaadin.connectionState.online&&(a(),c.render(r,!1))},v.Vaadin.connectionState.addStateChangeListener(n)},e.onBeforeLeave=(r,i,c)=>{a()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:Hn}=new Vn({imports:()=>Oe(()=>import("./generated-flow-imports-0b7699bb.js"),[],import.meta.url)}),Wn=[...Hn],Gn=new V(document.querySelector("#outlet"));Gn.setRoutes(Wn);var Yn=function(){var o=document.getSelection();if(!o.rangeCount)return function(){};for(var e=document.activeElement,t=[],n=0;n<o.rangeCount;n++)t.push(o.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return o.removeAllRanges(),function(){o.type==="Caret"&&o.removeAllRanges(),o.rangeCount||t.forEach(function(a){o.addRange(a)}),e&&e.focus()}},Xt={"text/plain":"Text","text/html":"Url",default:"Text"},Kn="Copy to clipboard: #{key}, Enter";function Xn(o){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return o.replace(/#{\s*key\s*}/g,e)}function Jn(o,e){var t,n,a,r,i,c,l=!1;e||(e={}),t=e.debug||!1;try{a=Yn(),r=document.createRange(),i=document.getSelection(),c=document.createElement("span"),c.textContent=o,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var b=Xt[e.format]||Xt.default;window.clipboardData.setData(b,o)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,o);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(c),r.selectNodeContents(c),i.addRange(r);var s=document.execCommand("copy");if(!s)throw new Error("copy command was unsuccessful");l=!0}catch(d){t&&console.error("unable to copy using execCommand: ",d),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",o),e.onCopy&&e.onCopy(window.clipboardData),l=!0}catch(b){t&&console.error("unable to copy using clipboardData: ",b),t&&console.error("falling back to prompt"),n=Xn("message"in e?e.message:Kn),window.prompt(n,o)}}finally{i&&(typeof i.removeRange=="function"?i.removeRange(r):i.removeAllRanges()),c&&document.body.removeChild(c),a()}return l}const pt=1e3,bt=(o,e)=>{const t=Array.from(o.querySelectorAll(e.join(", "))),n=Array.from(o.querySelectorAll("*")).filter(a=>a.shadowRoot).flatMap(a=>bt(a.shadowRoot,e));return[...t,...n]};let Jt=!1;const ve=(o,e)=>{Jt||(window.addEventListener("message",a=>{a.data==="validate-license"&&window.location.reload()},!1),Jt=!0);const t=o._overlayElement;if(t){if(t.shadowRoot){const a=t.shadowRoot.querySelector("slot:not([name])");if(a&&a.assignedElements().length>0){ve(a.assignedElements()[0],e);return}}ve(t,e);return}const n=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");o.isConnected&&(o.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${n}</div></no-license>`)},me={},Zt={},le={},yo={},D=o=>`${o.name}_${o.version}`,Qt=o=>{const{cvdlName:e,version:t}=o.constructor,n={name:e,version:t},a=o.tagName.toLowerCase();me[e]=me[e]??[],me[e].push(a);const r=le[D(n)];r&&setTimeout(()=>ve(o,r),pt),le[D(n)]||yo[D(n)]||Zt[D(n)]||(Zt[D(n)]=!0,window.Vaadin.devTools.checkLicense(n))},Zn=o=>{yo[D(o)]=!0,console.debug("License check ok for",o)},ko=o=>{const e=o.product.name;le[D(o.product)]=o,console.error("License check failed for",e);const t=me[e];(t==null?void 0:t.length)>0&&bt(document,t).forEach(n=>{setTimeout(()=>ve(n,le[D(o.product)]),pt)})},Qn=o=>{const e=o.message,t=o.product.name;o.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,le[D(o.product)]=o,console.error("No license found when checking",t);const n=me[t];(n==null?void 0:n.length)>0&&bt(document,n).forEach(a=>{setTimeout(()=>ve(a,le[D(o.product)]),pt)})},ea=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(o=>{Qt(o)}),window.Vaadin.devTools.createdCvdlElements={push:o=>{Qt(o)}}};var ta=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,E=(o,e,t,n)=>{for(var a=n>1?void 0:n?oa(e,t):e,r=o.length-1,i;r>=0;r--)(i=o[r])&&(a=(n?i(e,t,a):i(a))||a);return n&&a&&ta(e,t,a),a};const _o=class extends Object{constructor(o){super(),this.status="unavailable",o&&(this.webSocket=new WebSocket(o),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},_o.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onConnectionError(o){}onStatusChange(o){}onMessage(o){console.error("Unknown message received from the live reload server:",o)}handleMessage(o){let e;try{e=JSON.parse(o.data)}catch(t){this.handleError(`[${t.name}: ${t.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="license-check-ok"?Zn(e.data):e.command==="license-check-failed"?ko(e.data):e.command==="license-check-nokey"?Qn(e.data):this.onMessage(e)}handleError(o){console.error(o),this.setStatus("error"),o instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(o)}setActive(o){!o&&this.status==="active"?this.setStatus("inactive"):o&&this.status==="inactive"&&this.setStatus("active")}setStatus(o){this.status!==o&&(this.status=o,this.onStatusChange(o))}send(o,e){const t=JSON.stringify({command:o,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(t)):this.webSocket.send(t):console.error(`Unable to send message ${o}. No websocket is available`)}setFeature(o,e){this.send("setFeature",{featureId:o,enabled:e})}sendTelemetry(o){this.send("reportTelemetry",{browserData:o})}sendLicenseCheck(o){this.send("checkLicense",o)}sendShowComponentCreateLocation(o){this.send("showComponentCreateLocation",o)}sendShowComponentAttachLocation(o){this.send("showComponentAttachLocation",o)}};let Fe=_o;Fe.HEARTBEAT_INTERVAL=18e4;const na=w`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`,x=class extends ne{constructor(){super(...arguments),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus="unavailable",this.javaStatus="unavailable",this.tabs=[{id:"log",title:"Log",render:this.renderLog,activate:this.activateLog},{id:"info",title:"Info",render:this.renderInfo},{id:"features",title:"Feature Flags",render:this.renderFeatures}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.nextMessageId=1,this.transitionDuration=0}static get styles(){return[w`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: ${this.BLUE_HSL};
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: ${this.GREEN_HSL};
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: ${this.GREY_HSL};
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: ${this.YELLOW_HSL};
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: ${this.RED_HSL};
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: hidden;
          margin: 0.5rem;
          width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,na]}static get isActive(){const o=window.sessionStorage.getItem(x.ACTIVE_KEY_IN_SESSION_STORAGE);return o===null||o!=="false"}static notificationDismissed(o){const e=window.localStorage.getItem(x.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(o)}elementTelemetry(){let o={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;o=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(o)}openWebSocketConnection(){this.frontendStatus="unavailable",this.javaStatus="unavailable";const o=i=>this.log("error",i),e=()=>{if(this.liveReloadDisabled)return;this.showSplashMessage("Reloading…");const i=window.sessionStorage.getItem(x.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),c=i?parseInt(i,10)+1:1;window.sessionStorage.setItem(x.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,c.toString()),window.sessionStorage.setItem(x.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},t=new Fe(this.getDedicatedWebSocketUrl());t.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),x.isActive||t.setActive(!1),this.elementTelemetry()},t.onConnectionError=o,t.onReload=e,t.onStatusChange=i=>{this.frontendStatus=i},t.onMessage=i=>{(i==null?void 0:i.command)==="serverInfo"?this.serverInfo=i.data:(i==null?void 0:i.command)==="featureFlags"?this.features=i.data.features:(i==null?void 0:i.command)==="vaadin-dev-tools-code-ok"?window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:this.renderCode}):console.error("Unknown message from front-end connection:",JSON.stringify(i))},this.frontendConnection=t;let n;this.backend===x.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(n=new Fe(this.getSpringBootWebSocketUrl(window.location)),n.onHandshake=()=>{x.isActive||n.setActive(!1)},n.onReload=e,n.onConnectionError=o):this.backend===x.JREBEL||this.backend===x.HOTSWAP_AGENT?n=t:n=new Fe(void 0);const a=n.onStatusChange;n.onStatusChange=i=>{a(i),this.javaStatus=i};const r=n.onHandshake;n.onHandshake=()=>{r(),this.backend&&this.log("information",`Java live reload available: ${x.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=n,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}getDedicatedWebSocketUrl(){function o(t){const n=document.createElement("div");return n.innerHTML=`<a href="${t}"/>`,n.firstChild.href}if(this.url===void 0)return;const e=o(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(o){const{hostname:e}=o,t=o.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const n=e.replace(/.*?-/,"");return`${t}://${this.springBootLiveReloadPort}-${n}`}else return`${t}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=t=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(x.TRIGGERED_KEY_IN_SESSION_STORAGE)){const t=new Date,n=`${`0${t.getHours()}`.slice(-2)}:${`0${t.getMinutes()}`.slice(-2)}:${`0${t.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${n}`),window.sessionStorage.removeItem(x.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const e=window;e.Vaadin=e.Vaadin||{},e.Vaadin.devTools=Object.assign(this,e.Vaadin.devTools),ea()}format(o){return o.toString()}catchErrors(){const o=window.Vaadin.ConsoleErrors;o&&o.forEach(e=>{this.log("error",e.map(t=>this.format(t)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(t=>this.format(t)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(o=>this.dismissNotification(o.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(o){this.splashMessage=o,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},x.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(o){this.frontendConnection?this.frontendConnection.sendLicenseCheck(o):ko({message:"Internal error: no connection",product:o})}log(o,e,t,n){const a=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:a,type:o,message:e,details:t,link:n,dontShowAgain:!1,deleted:!1});this.messages.length>x.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const r=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&r?(setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):o==="error"&&(this.unreadErrors=!0)})}showNotification(o,e,t,n,a){if(a===void 0||!x.notificationDismissed(a)){if(this.notifications.filter(c=>c.persistentId===a).filter(c=>!c.deleted).length>0)return;const i=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:i,type:o,message:e,details:t,link:n,persistentId:a,dontShowAgain:!1,deleted:!1}),n===void 0&&setTimeout(()=>{this.dismissNotification(i)},x.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(o,e,t,n)}dismissNotification(o){const e=this.findNotificationIndex(o);if(e!==-1&&!this.notifications[e].deleted){const t=this.notifications[e];if(t.dontShowAgain&&t.persistentId&&!x.notificationDismissed(t.persistentId)){let n=window.localStorage.getItem(x.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);n=n===null?t.persistentId:`${n},${t.persistentId}`,window.localStorage.setItem(x.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,n)}t.deleted=!0,this.log(t.type,t.message,t.details,t.link),setTimeout(()=>{const n=this.findNotificationIndex(o);n!==-1&&(this.notifications.splice(n,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(o){let e=-1;return this.notifications.some((t,n)=>t.id===o?(e=n,!0):!1),e}toggleDontShowAgain(o){const e=this.findNotificationIndex(o);if(e!==-1&&!this.notifications[e].deleted){const t=this.notifications[e];t.dontShowAgain=!t.dontShowAgain,this.requestUpdate()}}setActive(o){var e,t;(e=this.frontendConnection)==null||e.setActive(o),(t=this.javaConnection)==null||t.setActive(o),window.sessionStorage.setItem(x.ACTIVE_KEY_IN_SESSION_STORAGE,o?"true":"false")}getStatusColor(o){return o==="active"?w`hsl(${x.GREEN_HSL})`:o==="inactive"?w`hsl(${x.GREY_HSL})`:o==="unavailable"?w`hsl(${x.YELLOW_HSL})`:o==="error"?w`hsl(${x.RED_HSL})`:w`none`}renderMessage(o){return $`
      <div
        class="message ${o.type} ${o.deleted?"animate-out":""} ${o.details||o.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${o.message}</div>
          <div class="message-details" ?hidden="${!o.details&&!o.link}">
            ${o.details?$`<p>${o.details}</p>`:""}
            ${o.link?$`<a class="ahreflike" href="${o.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${o.persistentId?$`<div
                class="persist ${o.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(o.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(o.id)}>Dismiss</div>
      </div>
    `}render(){return $` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${o=>o.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(o=>$`<button
                class=${vo({tab:!0,active:this.activeTab===o.id,unreadErrors:o.id==="log"&&this.unreadErrors})}
                id="${o.id}"
                @click=${()=>{this.activeTab=o.id,o.activate&&o.activate.call(this)}}
              >
                ${o.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(o=>this.activeTab===o.id?o.render.call(this):k)}
      </div>

      <div class="notification-tray">${this.notifications.map(o=>this.renderMessage(o))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-pick=${o=>{const e=o.detail.component;this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e),this.componentPickActive=!1}}
        @component-picker-abort=${o=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?$`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:$`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?$`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return $`<div class="message-tray">${this.messages.map(o=>this.renderMessage(o))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const o=this.renderRoot.querySelector(".message-tray .message:last-child");o&&o.scrollIntoView()})}renderCode(){return $`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${()=>{this.componentPickActive=!0,Oe(()=>import("./component-picker-84bbd72c.js"),[],import.meta.url)}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return $`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus==="unavailable"||this.frontendStatus==="error")&&(this.javaStatus==="unavailable"||this.javaStatus==="error")}
              ?checked="${this.frontendStatus==="active"||this.javaStatus==="active"}"
              @change=${o=>this.setActive(o.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${x.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return $`<div class="features-tray">
      ${this.features.map(o=>$`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${o.id}"
              type="checkbox"
              ?checked=${o.enabled}
              @change=${e=>this.toggleFeatureFlag(e,o)}
            />
            <span class="slider"></span>
            ${o.title}
          </label>
          <a class="ahreflike" href="${o.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}copyInfoToClipboard(){const o=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(o).map(t=>(t.localName==="dd"?": ":`
`)+t.textContent.trim()).join("").replace(/^\n/,"");Jn(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(o,e){const t=o.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,t),this.showNotification("information",`“${e.title}” ${t?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${t?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let g=x;g.BLUE_HSL=w`206, 100%, 70%`;g.GREEN_HSL=w`145, 80%, 42%`;g.GREY_HSL=w`0, 0%, 50%`;g.YELLOW_HSL=w`38, 98%, 64%`;g.RED_HSL=w`355, 100%, 68%`;g.MAX_LOG_ROWS=1e3;g.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";g.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";g.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";g.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";g.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;g.HOTSWAP_AGENT="HOTSWAP_AGENT";g.JREBEL="JREBEL";g.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";g.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};E([y({type:String})],g.prototype,"url",2);E([y({type:Boolean,attribute:!0})],g.prototype,"liveReloadDisabled",2);E([y({type:String})],g.prototype,"backend",2);E([y({type:Number})],g.prototype,"springBootLiveReloadPort",2);E([y({type:Boolean,attribute:!1})],g.prototype,"expanded",2);E([y({type:Array,attribute:!1})],g.prototype,"messages",2);E([y({type:String,attribute:!1})],g.prototype,"splashMessage",2);E([y({type:Array,attribute:!1})],g.prototype,"notifications",2);E([y({type:String,attribute:!1})],g.prototype,"frontendStatus",2);E([y({type:String,attribute:!1})],g.prototype,"javaStatus",2);E([ce()],g.prototype,"tabs",2);E([ce()],g.prototype,"activeTab",2);E([ce()],g.prototype,"serverInfo",2);E([ce()],g.prototype,"features",2);E([ce()],g.prototype,"unreadErrors",2);E([Bn(".window")],g.prototype,"root",2);E([ce()],g.prototype,"componentPickActive",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",g);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var o="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),t=new WeakMap,n=typeof DOMException=="object"?Error:DOMException,a=Object.defineProperty,r=Array.prototype.forEach,i=/@import.+?;?$/gm;function c(f){var m=f.replace(i,"");return m!==f&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),m.trim()}function l(f){return"isConnected"in f?f.isConnected:document.contains(f)}function s(f){return f.filter(function(m,h){return f.indexOf(m)===h})}function d(f,m){return f.filter(function(h){return m.indexOf(h)===-1})}function b(f){f.parentNode.removeChild(f)}function p(f){return f.shadowRoot||t.get(f)}var u=["addRule","deleteRule","insertRule","removeRule"],B=CSSStyleSheet,I=B.prototype;I.replace=function(){return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))},I.replaceSync=function(){throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function ke(f){return typeof f=="object"?X.isPrototypeOf(f)||I.isPrototypeOf(f):!1}function Ve(f){return typeof f=="object"?I.isPrototypeOf(f):!1}var R=new WeakMap,M=new WeakMap,Y=new WeakMap,K=new WeakMap;function He(f,m){var h=document.createElement("style");return Y.get(f).set(m,h),M.get(f).push(m),h}function q(f,m){return Y.get(f).get(m)}function _e(f,m){Y.get(f).delete(m),M.set(f,M.get(f).filter(function(h){return h!==m}))}function mt(f,m){requestAnimationFrame(function(){m.textContent=R.get(f).textContent,K.get(f).forEach(function(h){return m.sheet[h.method].apply(m.sheet,h.args)})})}function ze(f){if(!R.has(f))throw new TypeError("Illegal invocation")}function We(){var f=this,m=document.createElement("style");e.body.appendChild(m),R.set(f,m),M.set(f,[]),Y.set(f,new WeakMap),K.set(f,[])}var X=We.prototype;X.replace=function(m){try{return this.replaceSync(m),Promise.resolve(this)}catch(h){return Promise.reject(h)}},X.replaceSync=function(m){if(ze(this),typeof m=="string"){var h=this;R.get(h).textContent=c(m),K.set(h,[]),M.get(h).forEach(function(L){L.isConnected()&&mt(h,q(h,L))})}},a(X,"cssRules",{configurable:!0,enumerable:!0,get:function(){return ze(this),R.get(this).sheet.cssRules}}),a(X,"media",{configurable:!0,enumerable:!0,get:function(){return ze(this),R.get(this).sheet.media}}),u.forEach(function(f){X[f]=function(){var m=this;ze(m);var h=arguments;K.get(m).push({method:f,args:h}),M.get(m).forEach(function(C){if(C.isConnected()){var A=q(m,C).sheet;A[f].apply(A,h)}});var L=R.get(m).sheet;return L[f].apply(L,h)}}),a(We,Symbol.hasInstance,{configurable:!0,value:ke});var ut={childList:!0,subtree:!0},ht=new WeakMap;function J(f){var m=ht.get(f);return m||(m=new xt(f),ht.set(f,m)),m}function gt(f){a(f.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return J(this).sheets},set:function(m){J(this).update(m)}})}function Ge(f,m){for(var h=document.createNodeIterator(f,NodeFilter.SHOW_ELEMENT,function(C){return p(C)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),L=void 0;L=h.nextNode();)m(p(L))}var Se=new WeakMap,Z=new WeakMap,Ae=new WeakMap;function No(f,m){return m instanceof HTMLStyleElement&&Z.get(f).some(function(h){return q(h,f)})}function wt(f){var m=Se.get(f);return m instanceof Document?m.body:m}function Ye(f){var m=document.createDocumentFragment(),h=Z.get(f),L=Ae.get(f),C=wt(f);L.disconnect(),h.forEach(function(A){m.appendChild(q(A,f)||He(A,f))}),C.insertBefore(m,null),L.observe(C,ut),h.forEach(function(A){mt(A,q(A,f))})}function xt(f){var m=this;m.sheets=[],Se.set(m,f),Z.set(m,[]),Ae.set(m,new MutationObserver(function(h,L){if(!document){L.disconnect();return}h.forEach(function(C){o||r.call(C.addedNodes,function(A){A instanceof Element&&Ge(A,function(Q){J(Q).connect()})}),r.call(C.removedNodes,function(A){A instanceof Element&&(No(m,A)&&Ye(m),o||Ge(A,function(Q){J(Q).disconnect()}))})})}))}if(xt.prototype={isConnected:function(){var f=Se.get(this);return f instanceof Document?f.readyState!=="loading":l(f.host)},connect:function(){var f=wt(this);Ae.get(this).observe(f,ut),Z.get(this).length>0&&Ye(this),Ge(f,function(m){J(m).connect()})},disconnect:function(){Ae.get(this).disconnect()},update:function(f){var m=this,h=Se.get(m)===document?"Document":"ShadowRoot";if(!Array.isArray(f))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Iterator getter is not callable.");if(!f.every(ke))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Failed to convert value to 'CSSStyleSheet'");if(f.some(Ve))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Can't adopt non-constructed stylesheets");m.sheets=f;var L=Z.get(m),C=s(f),A=d(L,C);A.forEach(function(Q){b(q(Q,m)),_e(Q,m)}),Z.set(m,C),m.isConnected()&&C.length>0&&Ye(m)}},window.CSSStyleSheet=We,gt(Document),"ShadowRoot"in window){gt(ShadowRoot);var vt=Element.prototype,Po=vt.attachShadow;vt.attachShadow=function(m){var h=Po.call(this,m);return m.mode==="closed"&&t.set(this,h),h}}var Ee=J(document);Ee.isConnected()?Ee.connect():document.addEventListener("DOMContentLoaded",Ee.connect.bind(Ee))})();const{toString:aa}=Object.prototype;function ra(o){return aa.call(o)==="[object RegExp]"}function ia(o,{preserve:e=!0,whitespace:t=!0,all:n}={}){if(n)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let a=e,r;typeof e=="function"?(a=!1,r=e):ra(e)&&(a=!1,r=d=>e.test(d));let i=!1,c="",l="",s="";for(let d=0;d<o.length;d++){if(c=o[d],o[d-1]!=="\\"&&(c==='"'||c==="'")&&(i===c?i=!1:i||(i=c)),!i&&c==="/"&&o[d+1]==="*"){const b=o[d+2]==="!";let p=d+2;for(;p<o.length;p++){if(o[p]==="*"&&o[p+1]==="/"){a&&b||r&&r(l)?s+=`/*${l}*/`:t||(o[p+2]===`
`?p++:o[p+2]+o[p+3]===`\r
`&&(p+=2)),l="";break}l+=o[p]}d=p+1;continue}s+=c}return s}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class la extends HTMLElement{static get version(){return"24.0.0-rc1"}}customElements.define("vaadin-lumo-styles",la);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sa=o=>class extends o{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(t,n,a){super.attributeChangedCallback(t,n,a),t==="theme"&&this._set_theme(a)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const zo=[];function So(o){return o&&Object.prototype.hasOwnProperty.call(o,"__themes")}function ca(o){return So(customElements.get(o))}function fa(o=[]){return[o].flat(1/0).filter(e=>e instanceof dt?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ue(o,e,t={}){o&&ca(o)&&console.warn(`The custom element definition for "${o}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=fa(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(o,e,t):zo.push({themeFor:o,styles:e,include:t.include,moduleId:t.moduleId})}function lt(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():zo}function da(o,e){return(o||"").split(" ").some(t=>new RegExp(`^${t.split("*").join(".*")}$`,"u").test(e))}function pa(o=""){let e=0;return o.startsWith("lumo-")||o.startsWith("material-")?e=1:o.startsWith("vaadin-")&&(e=2),e}function Ao(o){const e=[];return o.include&&[].concat(o.include).forEach(t=>{const n=lt().find(a=>a.moduleId===t);n?e.push(...Ao(n),...n.styles):console.warn(`Included moduleId ${t} not found in style registry`)},o.styles),e}function ba(o,e){const t=document.createElement("style");t.innerHTML=o.map(n=>n.cssText).join(`
`),e.content.appendChild(t)}function ma(o){const e=`${o}-default-theme`,t=lt().filter(n=>n.moduleId!==e&&da(n.themeFor,o)).map(n=>({...n,styles:[...Ao(n),...n.styles],includePriority:pa(n.moduleId)})).sort((n,a)=>a.includePriority-n.includePriority);return t.length>0?t:lt().filter(n=>n.moduleId===e)}const Ma=o=>class extends sa(o){static finalize(){if(super.finalize(),this.elementStyles)return;const t=this.prototype._template;!t||So(this)||ba(this.getStylesForThis(),t)}static finalizeStyles(t){const n=this.getStylesForThis();return t?[...super.finalizeStyles(t),...n]:n}static getStylesForThis(){const t=Object.getPrototypeOf(this.prototype),n=(t?t.constructor.__themes:[])||[];this.__themes=[...n,...ma(this.is)];const a=this.__themes.flatMap(r=>r.styles);return a.filter((r,i)=>i===a.lastIndexOf(r))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ua=w`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,Eo=w`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ue("",Eo,{moduleId:"lumo-typography"});const Lo=document.createElement("template");Lo.innerHTML=`<style>${ua.toString().replace(":host","html")}</style>`;document.head.appendChild(Lo.content);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ha=w`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;
  }
`,$o=document.createElement("template");$o.innerHTML=`<style>${ha.toString().replace(":host","html")}</style>`;document.head.appendChild($o.content);const Co=w`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ue("",Co,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const To=w`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`,Ro=document.createElement("template");Ro.innerHTML=`<style>${To.toString().replace(":host","html")}</style>`;document.head.appendChild(Ro.content);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ga=w`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;w`
  html {
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-input-container-border-radius: var(--lumo-border-radius-m);
  }
`;const Io=document.createElement("template");Io.innerHTML=`<style>${ga.toString().replace(":host","html")}$</style>`;document.head.appendChild(Io.content);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Fo=w`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;Ue("",Fo,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const wa=w`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const xa=w`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast {
    background-color: var(--lumo-contrast);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const va=w`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border {
    border: 1px solid;
  }
  .border-b {
    border-bottom: 1px solid;
  }
  .border-l {
    border-left: 1px solid;
  }
  .border-r {
    border-right: 1px solid;
  }
  .border-t {
    border-top: 1px solid;
  }

  /* === Border color === */
  .border-contrast-5 {
    border-color: var(--lumo-contrast-5pct);
  }
  .border-contrast-10 {
    border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-20 {
    border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-30 {
    border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-40 {
    border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-50 {
    border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-60 {
    border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-70 {
    border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-80 {
    border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-90 {
    border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast {
    border-color: var(--lumo-contrast);
  }

  .border-primary {
    border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    border-color: var(--lumo-success-color-10pct);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ya=w`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-auto {
    flex: auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }

  /* === Flex shrink === */
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-shrink {
    flex-shrink: 1;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ka=w`
  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }
  .grid {
    display: grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex {
      display: flex;
    }
    .sm\\:hidden {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .md\\:flex {
      display: flex;
    }
    .md\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex {
      display: flex;
    }
    .lg\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex {
      display: flex;
    }
    .xl\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\:hidden {
      display: none;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const _a=w`
  /* === Box shadows === */
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const za=w`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Sa=w`
  /* === Margin === */
  .m-auto {
    margin: auto;
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }

  /* === Margin (bottom) === */
  .mb-auto {
    margin-bottom: auto;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }

  /* === Margin (end) === */
  .me-auto {
    margin-inline-end: auto;
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }

  /* === Margin (horizontal) === */
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .mx-xs {
    margin-left: var(--lumo-space-xs);
    margin-right: var(--lumo-space-xs);
  }
  .mx-s {
    margin-left: var(--lumo-space-s);
    margin-right: var(--lumo-space-s);
  }
  .mx-m {
    margin-left: var(--lumo-space-m);
    margin-right: var(--lumo-space-m);
  }
  .mx-l {
    margin-left: var(--lumo-space-l);
    margin-right: var(--lumo-space-l);
  }
  .mx-xl {
    margin-left: var(--lumo-space-xl);
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (left) === */
  .ml-auto {
    margin-left: auto;
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }

  /* === Margin (right) === */
  .mr-auto {
    margin-right: auto;
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (start) === */
  .ms-auto {
    margin-inline-start: auto;
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }

  /* === Margin (top) === */
  .mt-auto {
    margin-top: auto;
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }

  /* === Margin (vertical) === */
  .my-auto {
    margin-bottom: auto;
    margin-top: auto;
  }
  .my-0 {
    margin-bottom: 0;
    margin-top: 0;
  }
  .my-xs {
    margin-bottom: var(--lumo-space-xs);
    margin-top: var(--lumo-space-xs);
  }
  .my-s {
    margin-bottom: var(--lumo-space-s);
    margin-top: var(--lumo-space-s);
  }
  .my-m {
    margin-bottom: var(--lumo-space-m);
    margin-top: var(--lumo-space-m);
  }
  .my-l {
    margin-bottom: var(--lumo-space-l);
    margin-top: var(--lumo-space-l);
  }
  .my-xl {
    margin-bottom: var(--lumo-space-xl);
    margin-top: var(--lumo-space-xl);
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Aa=w`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Oo=w`
${wa}
${xa}
${va}
${_a}
${ya}
${ka}
${za}
${Sa}
${Aa}
`;Ue("",Oo,{moduleId:"lumo-utility"});const Ea=w`.la,.lab,.lad,.lal,.lar,.las{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1}.la-lg{font-size:1.33333em;line-height:.75em;vertical-align:-.0667em}.la-xs{font-size:.75em}.la-sm{font-size:.875em}.la-1x{font-size:1em}.la-2x{font-size:2em}.la-3x{font-size:3em}.la-4x{font-size:4em}.la-5x{font-size:5em}.la-6x{font-size:6em}.la-7x{font-size:7em}.la-8x{font-size:8em}.la-9x{font-size:9em}.la-10x{font-size:10em}.la-fw{text-align:center;width:1.25em}.la-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.la-ul>li{position:relative}.la-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.la-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.la-pull-left{float:left}.la-pull-right{float:right}.la.la-pull-left,.lab.la-pull-left,.lal.la-pull-left,.lar.la-pull-left,.las.la-pull-left{margin-right:.3em}.la.la-pull-right,.lab.la-pull-right,.lal.la-pull-right,.lar.la-pull-right,.las.la-pull-right{margin-left:.3em}.la-spin{-webkit-animation:la-spin 2s infinite linear;animation:la-spin 2s infinite linear}.la-pulse{-webkit-animation:la-spin 1s infinite steps(8);animation:la-spin 1s infinite steps(8)}@-webkit-keyframes la-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes la-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.la-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.la-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.la-flip-horizontal{-webkit-transform:scale(-1,1);transform:scaleX(-1)}.la-flip-vertical{-webkit-transform:scale(1,-1);transform:scaleY(-1)}.la-flip-both,.la-flip-horizontal.la-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1)}:root .la-flip-both,:root .la-flip-horizontal,:root .la-flip-vertical,:root .la-rotate-180,:root .la-rotate-270,:root .la-rotate-90{-webkit-filter:none;filter:none}.la-stack{display:inline-block;height:2em;line-height:2em;position:relative;vertical-align:middle;width:2.5em}.la-stack-1x,.la-stack-2x{left:0;position:absolute;text-align:center;width:100%}.la-stack-1x{line-height:inherit}.la-stack-2x{font-size:2em}.la-inverse{color:#fff}.la-500px:before{content:"\\f26e"}.la-accessible-icon:before{content:"\\f368"}.la-accusoft:before{content:"\\f369"}.la-acquisitions-incorporated:before{content:"\\f6af"}.la-ad:before{content:"\\f641"}.la-address-book:before{content:"\\f2b9"}.la-address-card:before{content:"\\f2bb"}.la-adjust:before{content:"\\f042"}.la-adn:before{content:"\\f170"}.la-adobe:before{content:"\\f778"}.la-adversal:before{content:"\\f36a"}.la-affiliatetheme:before{content:"\\f36b"}.la-air-freshener:before{content:"\\f5d0"}.la-airbnb:before{content:"\\f834"}.la-algolia:before{content:"\\f36c"}.la-align-center:before{content:"\\f037"}.la-align-justify:before{content:"\\f039"}.la-align-left:before{content:"\\f036"}.la-align-right:before{content:"\\f038"}.la-alipay:before{content:"\\f642"}.la-allergies:before{content:"\\f461"}.la-amazon:before{content:"\\f270"}.la-amazon-pay:before{content:"\\f42c"}.la-ambulance:before{content:"\\f0f9"}.la-american-sign-language-interpreting:before{content:"\\f2a3"}.la-amilia:before{content:"\\f36d"}.la-anchor:before{content:"\\f13d"}.la-android:before{content:"\\f17b"}.la-angellist:before{content:"\\f209"}.la-angle-double-down:before{content:"\\f103"}.la-angle-double-left:before{content:"\\f100"}.la-angle-double-right:before{content:"\\f101"}.la-angle-double-up:before{content:"\\f102"}.la-angle-down:before{content:"\\f107"}.la-angle-left:before{content:"\\f104"}.la-angle-right:before{content:"\\f105"}.la-angle-up:before{content:"\\f106"}.la-angry:before{content:"\\f556"}.la-angrycreative:before{content:"\\f36e"}.la-angular:before{content:"\\f420"}.la-ankh:before{content:"\\f644"}.la-app-store:before{content:"\\f36f"}.la-app-store-ios:before{content:"\\f370"}.la-apper:before{content:"\\f371"}.la-apple:before{content:"\\f179"}.la-apple-alt:before{content:"\\f5d1"}.la-apple-pay:before{content:"\\f415"}.la-archive:before{content:"\\f187"}.la-archway:before{content:"\\f557"}.la-arrow-alt-circle-down:before{content:"\\f358"}.la-arrow-alt-circle-left:before{content:"\\f359"}.la-arrow-alt-circle-right:before{content:"\\f35a"}.la-arrow-alt-circle-up:before{content:"\\f35b"}.la-arrow-circle-down:before{content:"\\f0ab"}.la-arrow-circle-left:before{content:"\\f0a8"}.la-arrow-circle-right:before{content:"\\f0a9"}.la-arrow-circle-up:before{content:"\\f0aa"}.la-arrow-down:before{content:"\\f063"}.la-arrow-left:before{content:"\\f060"}.la-arrow-right:before{content:"\\f061"}.la-arrow-up:before{content:"\\f062"}.la-arrows-alt:before{content:"\\f0b2"}.la-arrows-alt-h:before{content:"\\f337"}.la-arrows-alt-v:before{content:"\\f338"}.la-artstation:before{content:"\\f77a"}.la-assistive-listening-systems:before{content:"\\f2a2"}.la-asterisk:before{content:"\\f069"}.la-asymmetrik:before{content:"\\f372"}.la-at:before{content:"\\f1fa"}.la-atlas:before{content:"\\f558"}.la-atlassian:before{content:"\\f77b"}.la-atom:before{content:"\\f5d2"}.la-audible:before{content:"\\f373"}.la-audio-description:before{content:"\\f29e"}.la-autoprefixer:before{content:"\\f41c"}.la-avianex:before{content:"\\f374"}.la-aviato:before{content:"\\f421"}.la-award:before{content:"\\f559"}.la-aws:before{content:"\\f375"}.la-baby:before{content:"\\f77c"}.la-baby-carriage:before{content:"\\f77d"}.la-backspace:before{content:"\\f55a"}.la-backward:before{content:"\\f04a"}.la-bacon:before{content:"\\f7e5"}.la-balance-scale:before{content:"\\f24e"}.la-balance-scale-left:before{content:"\\f515"}.la-balance-scale-right:before{content:"\\f516"}.la-ban:before{content:"\\f05e"}.la-band-aid:before{content:"\\f462"}.la-bandcamp:before{content:"\\f2d5"}.la-barcode:before{content:"\\f02a"}.la-bars:before{content:"\\f0c9"}.la-baseball-ball:before{content:"\\f433"}.la-basketball-ball:before{content:"\\f434"}.la-bath:before{content:"\\f2cd"}.la-battery-empty:before{content:"\\f244"}.la-battery-full:before{content:"\\f240"}.la-battery-half:before{content:"\\f242"}.la-battery-quarter:before{content:"\\f243"}.la-battery-three-quarters:before{content:"\\f241"}.la-battle-net:before{content:"\\f835"}.la-bed:before{content:"\\f236"}.la-beer:before{content:"\\f0fc"}.la-behance:before{content:"\\f1b4"}.la-behance-square:before{content:"\\f1b5"}.la-bell:before{content:"\\f0f3"}.la-bell-slash:before{content:"\\f1f6"}.la-bezier-curve:before{content:"\\f55b"}.la-bible:before{content:"\\f647"}.la-bicycle:before{content:"\\f206"}.la-biking:before{content:"\\f84a"}.la-bimobject:before{content:"\\f378"}.la-binoculars:before{content:"\\f1e5"}.la-biohazard:before{content:"\\f780"}.la-birthday-cake:before{content:"\\f1fd"}.la-bitbucket:before{content:"\\f171"}.la-bitcoin:before{content:"\\f379"}.la-bity:before{content:"\\f37a"}.la-black-tie:before{content:"\\f27e"}.la-blackberry:before{content:"\\f37b"}.la-blender:before{content:"\\f517"}.la-blender-phone:before{content:"\\f6b6"}.la-blind:before{content:"\\f29d"}.la-blog:before{content:"\\f781"}.la-blogger:before{content:"\\f37c"}.la-blogger-b:before{content:"\\f37d"}.la-bluetooth:before{content:"\\f293"}.la-bluetooth-b:before{content:"\\f294"}.la-bold:before{content:"\\f032"}.la-bolt:before{content:"\\f0e7"}.la-bomb:before{content:"\\f1e2"}.la-bone:before{content:"\\f5d7"}.la-bong:before{content:"\\f55c"}.la-book:before{content:"\\f02d"}.la-book-dead:before{content:"\\f6b7"}.la-book-medical:before{content:"\\f7e6"}.la-book-open:before{content:"\\f518"}.la-book-reader:before{content:"\\f5da"}.la-bookmark:before{content:"\\f02e"}.la-bootstrap:before{content:"\\f836"}.la-border-all:before{content:"\\f84c"}.la-border-none:before{content:"\\f850"}.la-border-style:before{content:"\\f853"}.la-bowling-ball:before{content:"\\f436"}.la-box:before{content:"\\f466"}.la-box-open:before{content:"\\f49e"}.la-boxes:before{content:"\\f468"}.la-braille:before{content:"\\f2a1"}.la-brain:before{content:"\\f5dc"}.la-bread-slice:before{content:"\\f7ec"}.la-briefcase:before{content:"\\f0b1"}.la-briefcase-medical:before{content:"\\f469"}.la-broadcast-tower:before{content:"\\f519"}.la-broom:before{content:"\\f51a"}.la-brush:before{content:"\\f55d"}.la-btc:before{content:"\\f15a"}.la-buffer:before{content:"\\f837"}.la-bug:before{content:"\\f188"}.la-building:before{content:"\\f1ad"}.la-bullhorn:before{content:"\\f0a1"}.la-bullseye:before{content:"\\f140"}.la-burn:before{content:"\\f46a"}.la-buromobelexperte:before{content:"\\f37f"}.la-bus:before{content:"\\f207"}.la-bus-alt:before{content:"\\f55e"}.la-business-time:before{content:"\\f64a"}.la-buy-n-large:before{content:"\\f8a6"}.la-buysellads:before{content:"\\f20d"}.la-calculator:before{content:"\\f1ec"}.la-calendar:before{content:"\\f133"}.la-calendar-alt:before{content:"\\f073"}.la-calendar-check:before{content:"\\f274"}.la-calendar-day:before{content:"\\f783"}.la-calendar-minus:before{content:"\\f272"}.la-calendar-plus:before{content:"\\f271"}.la-calendar-times:before{content:"\\f273"}.la-calendar-week:before{content:"\\f784"}.la-camera:before{content:"\\f030"}.la-camera-retro:before{content:"\\f083"}.la-campground:before{content:"\\f6bb"}.la-canadian-maple-leaf:before{content:"\\f785"}.la-candy-cane:before{content:"\\f786"}.la-cannabis:before{content:"\\f55f"}.la-capsules:before{content:"\\f46b"}.la-car:before{content:"\\f1b9"}.la-car-alt:before{content:"\\f5de"}.la-car-battery:before{content:"\\f5df"}.la-car-crash:before{content:"\\f5e1"}.la-car-side:before{content:"\\f5e4"}.la-caret-down:before{content:"\\f0d7"}.la-caret-left:before{content:"\\f0d9"}.la-caret-right:before{content:"\\f0da"}.la-caret-square-down:before{content:"\\f150"}.la-caret-square-left:before{content:"\\f191"}.la-caret-square-right:before{content:"\\f152"}.la-caret-square-up:before{content:"\\f151"}.la-caret-up:before{content:"\\f0d8"}.la-carrot:before{content:"\\f787"}.la-cart-arrow-down:before{content:"\\f218"}.la-cart-plus:before{content:"\\f217"}.la-cash-register:before{content:"\\f788"}.la-cat:before{content:"\\f6be"}.la-cc-amazon-pay:before{content:"\\f42d"}.la-cc-amex:before{content:"\\f1f3"}.la-cc-apple-pay:before{content:"\\f416"}.la-cc-diners-club:before{content:"\\f24c"}.la-cc-discover:before{content:"\\f1f2"}.la-cc-jcb:before{content:"\\f24b"}.la-cc-mastercard:before{content:"\\f1f1"}.la-cc-paypal:before{content:"\\f1f4"}.la-cc-stripe:before{content:"\\f1f5"}.la-cc-visa:before{content:"\\f1f0"}.la-centercode:before{content:"\\f380"}.la-centos:before{content:"\\f789"}.la-certificate:before{content:"\\f0a3"}.la-chair:before{content:"\\f6c0"}.la-chalkboard:before{content:"\\f51b"}.la-chalkboard-teacher:before{content:"\\f51c"}.la-charging-station:before{content:"\\f5e7"}.la-chart-area:before{content:"\\f1fe"}.la-chart-bar:before{content:"\\f080"}.la-chart-line:before{content:"\\f201"}.la-chart-pie:before{content:"\\f200"}.la-check:before{content:"\\f00c"}.la-check-circle:before{content:"\\f058"}.la-check-double:before{content:"\\f560"}.la-check-square:before{content:"\\f14a"}.la-cheese:before{content:"\\f7ef"}.la-chess:before{content:"\\f439"}.la-chess-bishop:before{content:"\\f43a"}.la-chess-board:before{content:"\\f43c"}.la-chess-king:before{content:"\\f43f"}.la-chess-knight:before{content:"\\f441"}.la-chess-pawn:before{content:"\\f443"}.la-chess-queen:before{content:"\\f445"}.la-chess-rook:before{content:"\\f447"}.la-chevron-circle-down:before{content:"\\f13a"}.la-chevron-circle-left:before{content:"\\f137"}.la-chevron-circle-right:before{content:"\\f138"}.la-chevron-circle-up:before{content:"\\f139"}.la-chevron-down:before{content:"\\f078"}.la-chevron-left:before{content:"\\f053"}.la-chevron-right:before{content:"\\f054"}.la-chevron-up:before{content:"\\f077"}.la-child:before{content:"\\f1ae"}.la-chrome:before{content:"\\f268"}.la-chromecast:before{content:"\\f838"}.la-church:before{content:"\\f51d"}.la-circle:before{content:"\\f111"}.la-circle-notch:before{content:"\\f1ce"}.la-city:before{content:"\\f64f"}.la-clinic-medical:before{content:"\\f7f2"}.la-clipboard:before{content:"\\f328"}.la-clipboard-check:before{content:"\\f46c"}.la-clipboard-list:before{content:"\\f46d"}.la-clock:before{content:"\\f017"}.la-clone:before{content:"\\f24d"}.la-closed-captioning:before{content:"\\f20a"}.la-cloud:before{content:"\\f0c2"}.la-cloud-download-alt:before{content:"\\f381"}.la-cloud-meatball:before{content:"\\f73b"}.la-cloud-moon:before{content:"\\f6c3"}.la-cloud-moon-rain:before{content:"\\f73c"}.la-cloud-rain:before{content:"\\f73d"}.la-cloud-showers-heavy:before{content:"\\f740"}.la-cloud-sun:before{content:"\\f6c4"}.la-cloud-sun-rain:before{content:"\\f743"}.la-cloud-upload-alt:before{content:"\\f382"}.la-cloudscale:before{content:"\\f383"}.la-cloudsmith:before{content:"\\f384"}.la-cloudversify:before{content:"\\f385"}.la-cocktail:before{content:"\\f561"}.la-code:before{content:"\\f121"}.la-code-branch:before{content:"\\f126"}.la-codepen:before{content:"\\f1cb"}.la-codiepie:before{content:"\\f284"}.la-coffee:before{content:"\\f0f4"}.la-cog:before{content:"\\f013"}.la-cogs:before{content:"\\f085"}.la-coins:before{content:"\\f51e"}.la-columns:before{content:"\\f0db"}.la-comment:before{content:"\\f075"}.la-comment-alt:before{content:"\\f27a"}.la-comment-dollar:before{content:"\\f651"}.la-comment-dots:before{content:"\\f4ad"}.la-comment-medical:before{content:"\\f7f5"}.la-comment-slash:before{content:"\\f4b3"}.la-comments:before{content:"\\f086"}.la-comments-dollar:before{content:"\\f653"}.la-compact-disc:before{content:"\\f51f"}.la-compass:before{content:"\\f14e"}.la-compress:before{content:"\\f066"}.la-compress-arrows-alt:before{content:"\\f78c"}.la-concierge-bell:before{content:"\\f562"}.la-confluence:before{content:"\\f78d"}.la-connectdevelop:before{content:"\\f20e"}.la-contao:before{content:"\\f26d"}.la-cookie:before{content:"\\f563"}.la-cookie-bite:before{content:"\\f564"}.la-copy:before{content:"\\f0c5"}.la-copyright:before{content:"\\f1f9"}.la-cotton-bureau:before{content:"\\f89e"}.la-couch:before{content:"\\f4b8"}.la-cpanel:before{content:"\\f388"}.la-creative-commons:before{content:"\\f25e"}.la-creative-commons-by:before{content:"\\f4e7"}.la-creative-commons-nc:before{content:"\\f4e8"}.la-creative-commons-nc-eu:before{content:"\\f4e9"}.la-creative-commons-nc-jp:before{content:"\\f4ea"}.la-creative-commons-nd:before{content:"\\f4eb"}.la-creative-commons-pd:before{content:"\\f4ec"}.la-creative-commons-pd-alt:before{content:"\\f4ed"}.la-creative-commons-remix:before{content:"\\f4ee"}.la-creative-commons-sa:before{content:"\\f4ef"}.la-creative-commons-sampling:before{content:"\\f4f0"}.la-creative-commons-sampling-plus:before{content:"\\f4f1"}.la-creative-commons-share:before{content:"\\f4f2"}.la-creative-commons-zero:before{content:"\\f4f3"}.la-credit-card:before{content:"\\f09d"}.la-critical-role:before{content:"\\f6c9"}.la-crop:before{content:"\\f125"}.la-crop-alt:before{content:"\\f565"}.la-cross:before{content:"\\f654"}.la-crosshairs:before{content:"\\f05b"}.la-crow:before{content:"\\f520"}.la-crown:before{content:"\\f521"}.la-crutch:before{content:"\\f7f7"}.la-css3:before{content:"\\f13c"}.la-css3-alt:before{content:"\\f38b"}.la-cube:before{content:"\\f1b2"}.la-cubes:before{content:"\\f1b3"}.la-cut:before{content:"\\f0c4"}.la-cuttlefish:before{content:"\\f38c"}.la-d-and-d:before{content:"\\f38d"}.la-d-and-d-beyond:before{content:"\\f6ca"}.la-dashcube:before{content:"\\f210"}.la-database:before{content:"\\f1c0"}.la-deaf:before{content:"\\f2a4"}.la-delicious:before{content:"\\f1a5"}.la-democrat:before{content:"\\f747"}.la-deploydog:before{content:"\\f38e"}.la-deskpro:before{content:"\\f38f"}.la-desktop:before{content:"\\f108"}.la-dev:before{content:"\\f6cc"}.la-deviantart:before{content:"\\f1bd"}.la-dharmachakra:before{content:"\\f655"}.la-dhl:before{content:"\\f790"}.la-diagnoses:before{content:"\\f470"}.la-diaspora:before{content:"\\f791"}.la-dice:before{content:"\\f522"}.la-dice-d20:before{content:"\\f6cf"}.la-dice-d6:before{content:"\\f6d1"}.la-dice-five:before{content:"\\f523"}.la-dice-four:before{content:"\\f524"}.la-dice-one:before{content:"\\f525"}.la-dice-six:before{content:"\\f526"}.la-dice-three:before{content:"\\f527"}.la-dice-two:before{content:"\\f528"}.la-digg:before{content:"\\f1a6"}.la-digital-ocean:before{content:"\\f391"}.la-digital-tachograph:before{content:"\\f566"}.la-directions:before{content:"\\f5eb"}.la-discord:before{content:"\\f392"}.la-discourse:before{content:"\\f393"}.la-divide:before{content:"\\f529"}.la-dizzy:before{content:"\\f567"}.la-dna:before{content:"\\f471"}.la-dochub:before{content:"\\f394"}.la-docker:before{content:"\\f395"}.la-dog:before{content:"\\f6d3"}.la-dollar-sign:before{content:"\\f155"}.la-dolly:before{content:"\\f472"}.la-dolly-flatbed:before{content:"\\f474"}.la-donate:before{content:"\\f4b9"}.la-door-closed:before{content:"\\f52a"}.la-door-open:before{content:"\\f52b"}.la-dot-circle:before{content:"\\f192"}.la-dove:before{content:"\\f4ba"}.la-download:before{content:"\\f019"}.la-draft2digital:before{content:"\\f396"}.la-drafting-compass:before{content:"\\f568"}.la-dragon:before{content:"\\f6d5"}.la-draw-polygon:before{content:"\\f5ee"}.la-dribbble:before{content:"\\f17d"}.la-dribbble-square:before{content:"\\f397"}.la-dropbox:before{content:"\\f16b"}.la-drum:before{content:"\\f569"}.la-drum-steelpan:before{content:"\\f56a"}.la-drumstick-bite:before{content:"\\f6d7"}.la-drupal:before{content:"\\f1a9"}.la-dumbbell:before{content:"\\f44b"}.la-dumpster:before{content:"\\f793"}.la-dumpster-fire:before{content:"\\f794"}.la-dungeon:before{content:"\\f6d9"}.la-dyalog:before{content:"\\f399"}.la-earlybirds:before{content:"\\f39a"}.la-ebay:before{content:"\\f4f4"}.la-edge:before{content:"\\f282"}.la-edit:before{content:"\\f044"}.la-egg:before{content:"\\f7fb"}.la-eject:before{content:"\\f052"}.la-elementor:before{content:"\\f430"}.la-ellipsis-h:before{content:"\\f141"}.la-ellipsis-v:before{content:"\\f142"}.la-ello:before{content:"\\f5f1"}.la-ember:before{content:"\\f423"}.la-empire:before{content:"\\f1d1"}.la-envelope:before{content:"\\f0e0"}.la-envelope-open:before{content:"\\f2b6"}.la-envelope-open-text:before{content:"\\f658"}.la-envelope-square:before{content:"\\f199"}.la-envira:before{content:"\\f299"}.la-equals:before{content:"\\f52c"}.la-eraser:before{content:"\\f12d"}.la-erlang:before{content:"\\f39d"}.la-ethereum:before{content:"\\f42e"}.la-ethernet:before{content:"\\f796"}.la-etsy:before{content:"\\f2d7"}.la-euro-sign:before{content:"\\f153"}.la-evernote:before{content:"\\f839"}.la-exchange-alt:before{content:"\\f362"}.la-exclamation:before{content:"\\f12a"}.la-exclamation-circle:before{content:"\\f06a"}.la-exclamation-triangle:before{content:"\\f071"}.la-expand:before{content:"\\f065"}.la-expand-arrows-alt:before{content:"\\f31e"}.la-expeditedssl:before{content:"\\f23e"}.la-external-link-alt:before{content:"\\f35d"}.la-external-link-square-alt:before{content:"\\f360"}.la-eye:before{content:"\\f06e"}.la-eye-dropper:before{content:"\\f1fb"}.la-eye-slash:before{content:"\\f070"}.la-facebook:before{content:"\\f09a"}.la-facebook-f:before{content:"\\f39e"}.la-facebook-messenger:before{content:"\\f39f"}.la-facebook-square:before{content:"\\f082"}.la-fan:before{content:"\\f863"}.la-fantasy-flight-games:before{content:"\\f6dc"}.la-fast-backward:before{content:"\\f049"}.la-fast-forward:before{content:"\\f050"}.la-fax:before{content:"\\f1ac"}.la-feather:before{content:"\\f52d"}.la-feather-alt:before{content:"\\f56b"}.la-fedex:before{content:"\\f797"}.la-fedora:before{content:"\\f798"}.la-female:before{content:"\\f182"}.la-fighter-jet:before{content:"\\f0fb"}.la-figma:before{content:"\\f799"}.la-file:before{content:"\\f15b"}.la-file-alt:before{content:"\\f15c"}.la-file-archive:before{content:"\\f1c6"}.la-file-audio:before{content:"\\f1c7"}.la-file-code:before{content:"\\f1c9"}.la-file-contract:before{content:"\\f56c"}.la-file-csv:before{content:"\\f6dd"}.la-file-download:before{content:"\\f56d"}.la-file-excel:before{content:"\\f1c3"}.la-file-export:before{content:"\\f56e"}.la-file-image:before{content:"\\f1c5"}.la-file-import:before{content:"\\f56f"}.la-file-invoice:before{content:"\\f570"}.la-file-invoice-dollar:before{content:"\\f571"}.la-file-medical:before{content:"\\f477"}.la-file-medical-alt:before{content:"\\f478"}.la-file-pdf:before{content:"\\f1c1"}.la-file-powerpoint:before{content:"\\f1c4"}.la-file-prescription:before{content:"\\f572"}.la-file-signature:before{content:"\\f573"}.la-file-upload:before{content:"\\f574"}.la-file-video:before{content:"\\f1c8"}.la-file-word:before{content:"\\f1c2"}.la-fill:before{content:"\\f575"}.la-fill-drip:before{content:"\\f576"}.la-film:before{content:"\\f008"}.la-filter:before{content:"\\f0b0"}.la-fingerprint:before{content:"\\f577"}.la-fire:before{content:"\\f06d"}.la-fire-alt:before{content:"\\f7e4"}.la-fire-extinguisher:before{content:"\\f134"}.la-firefox:before{content:"\\f269"}.la-first-aid:before{content:"\\f479"}.la-first-order:before{content:"\\f2b0"}.la-first-order-alt:before{content:"\\f50a"}.la-firstdraft:before{content:"\\f3a1"}.la-fish:before{content:"\\f578"}.la-fist-raised:before{content:"\\f6de"}.la-flag:before{content:"\\f024"}.la-flag-checkered:before{content:"\\f11e"}.la-flag-usa:before{content:"\\f74d"}.la-flask:before{content:"\\f0c3"}.la-flickr:before{content:"\\f16e"}.la-flipboard:before{content:"\\f44d"}.la-flushed:before{content:"\\f579"}.la-fly:before{content:"\\f417"}.la-folder:before{content:"\\f07b"}.la-folder-minus:before{content:"\\f65d"}.la-folder-open:before{content:"\\f07c"}.la-folder-plus:before{content:"\\f65e"}.la-font:before{content:"\\f031"}.la-font-awesome:before{content:"\\f2b4"}.la-font-awesome-alt:before{content:"\\f35c"}.la-font-awesome-flag:before{content:"\\f425"}.la-font-awesome-logo-full:before{content:"\\f4e6"}.la-fonticons:before{content:"\\f280"}.la-fonticons-fi:before{content:"\\f3a2"}.la-football-ball:before{content:"\\f44e"}.la-fort-awesome:before{content:"\\f286"}.la-fort-awesome-alt:before{content:"\\f3a3"}.la-forumbee:before{content:"\\f211"}.la-forward:before{content:"\\f04e"}.la-foursquare:before{content:"\\f180"}.la-free-code-camp:before{content:"\\f2c5"}.la-freebsd:before{content:"\\f3a4"}.la-frog:before{content:"\\f52e"}.la-frown:before{content:"\\f119"}.la-frown-open:before{content:"\\f57a"}.la-fulcrum:before{content:"\\f50b"}.la-funnel-dollar:before{content:"\\f662"}.la-futbol:before{content:"\\f1e3"}.la-galactic-republic:before{content:"\\f50c"}.la-galactic-senate:before{content:"\\f50d"}.la-gamepad:before{content:"\\f11b"}.la-gas-pump:before{content:"\\f52f"}.la-gavel:before{content:"\\f0e3"}.la-gem:before{content:"\\f3a5"}.la-genderless:before{content:"\\f22d"}.la-get-pocket:before{content:"\\f265"}.la-gg:before{content:"\\f260"}.la-gg-circle:before{content:"\\f261"}.la-ghost:before{content:"\\f6e2"}.la-gift:before{content:"\\f06b"}.la-gifts:before{content:"\\f79c"}.la-git:before{content:"\\f1d3"}.la-git-alt:before{content:"\\f841"}.la-git-square:before{content:"\\f1d2"}.la-github:before{content:"\\f09b"}.la-github-alt:before{content:"\\f113"}.la-github-square:before{content:"\\f092"}.la-gitkraken:before{content:"\\f3a6"}.la-gitlab:before{content:"\\f296"}.la-gitter:before{content:"\\f426"}.la-glass-cheers:before{content:"\\f79f"}.la-glass-martini:before{content:"\\f000"}.la-glass-martini-alt:before{content:"\\f57b"}.la-glass-whiskey:before{content:"\\f7a0"}.la-glasses:before{content:"\\f530"}.la-glide:before{content:"\\f2a5"}.la-glide-g:before{content:"\\f2a6"}.la-globe:before{content:"\\f0ac"}.la-globe-africa:before{content:"\\f57c"}.la-globe-americas:before{content:"\\f57d"}.la-globe-asia:before{content:"\\f57e"}.la-globe-europe:before{content:"\\f7a2"}.la-gofore:before{content:"\\f3a7"}.la-golf-ball:before{content:"\\f450"}.la-goodreads:before{content:"\\f3a8"}.la-goodreads-g:before{content:"\\f3a9"}.la-google:before{content:"\\f1a0"}.la-google-drive:before{content:"\\f3aa"}.la-google-play:before{content:"\\f3ab"}.la-google-plus:before{content:"\\f2b3"}.la-google-plus-g:before{content:"\\f0d5"}.la-google-plus-square:before{content:"\\f0d4"}.la-google-wallet:before{content:"\\f1ee"}.la-gopuram:before{content:"\\f664"}.la-graduation-cap:before{content:"\\f19d"}.la-gratipay:before{content:"\\f184"}.la-grav:before{content:"\\f2d6"}.la-greater-than:before{content:"\\f531"}.la-greater-than-equal:before{content:"\\f532"}.la-grimace:before{content:"\\f57f"}.la-grin:before{content:"\\f580"}.la-grin-alt:before{content:"\\f581"}.la-grin-beam:before{content:"\\f582"}.la-grin-beam-sweat:before{content:"\\f583"}.la-grin-hearts:before{content:"\\f584"}.la-grin-squint:before{content:"\\f585"}.la-grin-squint-tears:before{content:"\\f586"}.la-grin-stars:before{content:"\\f587"}.la-grin-tears:before{content:"\\f588"}.la-grin-tongue:before{content:"\\f589"}.la-grin-tongue-squint:before{content:"\\f58a"}.la-grin-tongue-wink:before{content:"\\f58b"}.la-grin-wink:before{content:"\\f58c"}.la-grip-horizontal:before{content:"\\f58d"}.la-grip-lines:before{content:"\\f7a4"}.la-grip-lines-vertical:before{content:"\\f7a5"}.la-grip-vertical:before{content:"\\f58e"}.la-gripfire:before{content:"\\f3ac"}.la-grunt:before{content:"\\f3ad"}.la-guitar:before{content:"\\f7a6"}.la-gulp:before{content:"\\f3ae"}.la-h-square:before{content:"\\f0fd"}.la-hacker-news:before{content:"\\f1d4"}.la-hacker-news-square:before{content:"\\f3af"}.la-hackerrank:before{content:"\\f5f7"}.la-hamburger:before{content:"\\f805"}.la-hammer:before{content:"\\f6e3"}.la-hamsa:before{content:"\\f665"}.la-hand-holding:before{content:"\\f4bd"}.la-hand-holding-heart:before{content:"\\f4be"}.la-hand-holding-usd:before{content:"\\f4c0"}.la-hand-lizard:before{content:"\\f258"}.la-hand-middle-finger:before{content:"\\f806"}.la-hand-paper:before{content:"\\f256"}.la-hand-peace:before{content:"\\f25b"}.la-hand-point-down:before{content:"\\f0a7"}.la-hand-point-left:before{content:"\\f0a5"}.la-hand-point-right:before{content:"\\f0a4"}.la-hand-point-up:before{content:"\\f0a6"}.la-hand-pointer:before{content:"\\f25a"}.la-hand-rock:before{content:"\\f255"}.la-hand-scissors:before{content:"\\f257"}.la-hand-spock:before{content:"\\f259"}.la-hands:before{content:"\\f4c2"}.la-hands-helping:before{content:"\\f4c4"}.la-handshake:before{content:"\\f2b5"}.la-hanukiah:before{content:"\\f6e6"}.la-hard-hat:before{content:"\\f807"}.la-hashtag:before{content:"\\f292"}.la-hat-cowboy:before{content:"\\f8c0"}.la-hat-cowboy-side:before{content:"\\f8c1"}.la-hat-wizard:before{content:"\\f6e8"}.la-haykal:before{content:"\\f666"}.la-hdd:before{content:"\\f0a0"}.la-heading:before{content:"\\f1dc"}.la-headphones:before{content:"\\f025"}.la-headphones-alt:before{content:"\\f58f"}.la-headset:before{content:"\\f590"}.la-heart:before{content:"\\f004"}.la-heart-broken:before{content:"\\f7a9"}.la-heartbeat:before{content:"\\f21e"}.la-helicopter:before{content:"\\f533"}.la-highlighter:before{content:"\\f591"}.la-hiking:before{content:"\\f6ec"}.la-hippo:before{content:"\\f6ed"}.la-hips:before{content:"\\f452"}.la-hire-a-helper:before{content:"\\f3b0"}.la-history:before{content:"\\f1da"}.la-hockey-puck:before{content:"\\f453"}.la-holly-berry:before{content:"\\f7aa"}.la-home:before{content:"\\f015"}.la-hooli:before{content:"\\f427"}.la-hornbill:before{content:"\\f592"}.la-horse:before{content:"\\f6f0"}.la-horse-head:before{content:"\\f7ab"}.la-hospital:before{content:"\\f0f8"}.la-hospital-alt:before{content:"\\f47d"}.la-hospital-symbol:before{content:"\\f47e"}.la-hot-tub:before{content:"\\f593"}.la-hotdog:before{content:"\\f80f"}.la-hotel:before{content:"\\f594"}.la-hotjar:before{content:"\\f3b1"}.la-hourglass:before{content:"\\f254"}.la-hourglass-end:before{content:"\\f253"}.la-hourglass-half:before{content:"\\f252"}.la-hourglass-start:before{content:"\\f251"}.la-house-damage:before{content:"\\f6f1"}.la-houzz:before{content:"\\f27c"}.la-hryvnia:before{content:"\\f6f2"}.la-html5:before{content:"\\f13b"}.la-hubspot:before{content:"\\f3b2"}.la-i-cursor:before{content:"\\f246"}.la-ice-cream:before{content:"\\f810"}.la-icicles:before{content:"\\f7ad"}.la-icons:before{content:"\\f86d"}.la-id-badge:before{content:"\\f2c1"}.la-id-card:before{content:"\\f2c2"}.la-id-card-alt:before{content:"\\f47f"}.la-igloo:before{content:"\\f7ae"}.la-image:before{content:"\\f03e"}.la-images:before{content:"\\f302"}.la-imdb:before{content:"\\f2d8"}.la-inbox:before{content:"\\f01c"}.la-indent:before{content:"\\f03c"}.la-industry:before{content:"\\f275"}.la-infinity:before{content:"\\f534"}.la-info:before{content:"\\f129"}.la-info-circle:before{content:"\\f05a"}.la-instagram:before{content:"\\f16d"}.la-intercom:before{content:"\\f7af"}.la-internet-explorer:before{content:"\\f26b"}.la-invision:before{content:"\\f7b0"}.la-ioxhost:before{content:"\\f208"}.la-italic:before{content:"\\f033"}.la-itch-io:before{content:"\\f83a"}.la-itunes:before{content:"\\f3b4"}.la-itunes-note:before{content:"\\f3b5"}.la-java:before{content:"\\f4e4"}.la-jedi:before{content:"\\f669"}.la-jedi-order:before{content:"\\f50e"}.la-jenkins:before{content:"\\f3b6"}.la-jira:before{content:"\\f7b1"}.la-joget:before{content:"\\f3b7"}.la-joint:before{content:"\\f595"}.la-joomla:before{content:"\\f1aa"}.la-journal-whills:before{content:"\\f66a"}.la-js:before{content:"\\f3b8"}.la-js-square:before{content:"\\f3b9"}.la-jsfiddle:before{content:"\\f1cc"}.la-kaaba:before{content:"\\f66b"}.la-kaggle:before{content:"\\f5fa"}.la-key:before{content:"\\f084"}.la-keybase:before{content:"\\f4f5"}.la-keyboard:before{content:"\\f11c"}.la-keycdn:before{content:"\\f3ba"}.la-khanda:before{content:"\\f66d"}.la-kickstarter:before{content:"\\f3bb"}.la-kickstarter-k:before{content:"\\f3bc"}.la-kiss:before{content:"\\f596"}.la-kiss-beam:before{content:"\\f597"}.la-kiss-wink-heart:before{content:"\\f598"}.la-kiwi-bird:before{content:"\\f535"}.la-korvue:before{content:"\\f42f"}.la-landmark:before{content:"\\f66f"}.la-language:before{content:"\\f1ab"}.la-laptop:before{content:"\\f109"}.la-laptop-code:before{content:"\\f5fc"}.la-laptop-medical:before{content:"\\f812"}.la-laravel:before{content:"\\f3bd"}.la-lastfm:before{content:"\\f202"}.la-lastfm-square:before{content:"\\f203"}.la-laugh:before{content:"\\f599"}.la-laugh-beam:before{content:"\\f59a"}.la-laugh-squint:before{content:"\\f59b"}.la-laugh-wink:before{content:"\\f59c"}.la-layer-group:before{content:"\\f5fd"}.la-leaf:before{content:"\\f06c"}.la-leanpub:before{content:"\\f212"}.la-lemon:before{content:"\\f094"}.la-less:before{content:"\\f41d"}.la-less-than:before{content:"\\f536"}.la-less-than-equal:before{content:"\\f537"}.la-level-down-alt:before{content:"\\f3be"}.la-level-up-alt:before{content:"\\f3bf"}.la-life-ring:before{content:"\\f1cd"}.la-lightbulb:before{content:"\\f0eb"}.la-line:before{content:"\\f3c0"}.la-link:before{content:"\\f0c1"}.la-linkedin:before{content:"\\f08c"}.la-linkedin-in:before{content:"\\f0e1"}.la-linode:before{content:"\\f2b8"}.la-linux:before{content:"\\f17c"}.la-lira-sign:before{content:"\\f195"}.la-list:before{content:"\\f03a"}.la-list-alt:before{content:"\\f022"}.la-list-ol:before{content:"\\f0cb"}.la-list-ul:before{content:"\\f0ca"}.la-location-arrow:before{content:"\\f124"}.la-lock:before{content:"\\f023"}.la-lock-open:before{content:"\\f3c1"}.la-long-arrow-alt-down:before{content:"\\f309"}.la-long-arrow-alt-left:before{content:"\\f30a"}.la-long-arrow-alt-right:before{content:"\\f30b"}.la-long-arrow-alt-up:before{content:"\\f30c"}.la-low-vision:before{content:"\\f2a8"}.la-luggage-cart:before{content:"\\f59d"}.la-lyft:before{content:"\\f3c3"}.la-magento:before{content:"\\f3c4"}.la-magic:before{content:"\\f0d0"}.la-magnet:before{content:"\\f076"}.la-mail-bulk:before{content:"\\f674"}.la-mailchimp:before{content:"\\f59e"}.la-male:before{content:"\\f183"}.la-mandalorian:before{content:"\\f50f"}.la-map:before{content:"\\f279"}.la-map-marked:before{content:"\\f59f"}.la-map-marked-alt:before{content:"\\f5a0"}.la-map-marker:before{content:"\\f041"}.la-map-marker-alt:before{content:"\\f3c5"}.la-map-pin:before{content:"\\f276"}.la-map-signs:before{content:"\\f277"}.la-markdown:before{content:"\\f60f"}.la-marker:before{content:"\\f5a1"}.la-mars:before{content:"\\f222"}.la-mars-double:before{content:"\\f227"}.la-mars-stroke:before{content:"\\f229"}.la-mars-stroke-h:before{content:"\\f22b"}.la-mars-stroke-v:before{content:"\\f22a"}.la-mask:before{content:"\\f6fa"}.la-mastodon:before{content:"\\f4f6"}.la-maxcdn:before{content:"\\f136"}.la-mdb:before{content:"\\f8ca"}.la-medal:before{content:"\\f5a2"}.la-medapps:before{content:"\\f3c6"}.la-medium:before{content:"\\f23a"}.la-medium-m:before{content:"\\f3c7"}.la-medkit:before{content:"\\f0fa"}.la-medrt:before{content:"\\f3c8"}.la-meetup:before{content:"\\f2e0"}.la-megaport:before{content:"\\f5a3"}.la-meh:before{content:"\\f11a"}.la-meh-blank:before{content:"\\f5a4"}.la-meh-rolling-eyes:before{content:"\\f5a5"}.la-memory:before{content:"\\f538"}.la-mendeley:before{content:"\\f7b3"}.la-menorah:before{content:"\\f676"}.la-mercury:before{content:"\\f223"}.la-meteor:before{content:"\\f753"}.la-microchip:before{content:"\\f2db"}.la-microphone:before{content:"\\f130"}.la-microphone-alt:before{content:"\\f3c9"}.la-microphone-alt-slash:before{content:"\\f539"}.la-microphone-slash:before{content:"\\f131"}.la-microscope:before{content:"\\f610"}.la-microsoft:before{content:"\\f3ca"}.la-minus:before{content:"\\f068"}.la-minus-circle:before{content:"\\f056"}.la-minus-square:before{content:"\\f146"}.la-mitten:before{content:"\\f7b5"}.la-mix:before{content:"\\f3cb"}.la-mixcloud:before{content:"\\f289"}.la-mizuni:before{content:"\\f3cc"}.la-mobile:before{content:"\\f10b"}.la-mobile-alt:before{content:"\\f3cd"}.la-modx:before{content:"\\f285"}.la-monero:before{content:"\\f3d0"}.la-money-bill:before{content:"\\f0d6"}.la-money-bill-alt:before{content:"\\f3d1"}.la-money-bill-wave:before{content:"\\f53a"}.la-money-bill-wave-alt:before{content:"\\f53b"}.la-money-check:before{content:"\\f53c"}.la-money-check-alt:before{content:"\\f53d"}.la-monument:before{content:"\\f5a6"}.la-moon:before{content:"\\f186"}.la-mortar-pestle:before{content:"\\f5a7"}.la-mosque:before{content:"\\f678"}.la-motorcycle:before{content:"\\f21c"}.la-mountain:before{content:"\\f6fc"}.la-mouse:before{content:"\\f8cc"}.la-mouse-pointer:before{content:"\\f245"}.la-mug-hot:before{content:"\\f7b6"}.la-music:before{content:"\\f001"}.la-napster:before{content:"\\f3d2"}.la-neos:before{content:"\\f612"}.la-network-wired:before{content:"\\f6ff"}.la-neuter:before{content:"\\f22c"}.la-newspaper:before{content:"\\f1ea"}.la-nimblr:before{content:"\\f5a8"}.la-node:before{content:"\\f419"}.la-node-js:before{content:"\\f3d3"}.la-not-equal:before{content:"\\f53e"}.la-notes-medical:before{content:"\\f481"}.la-npm:before{content:"\\f3d4"}.la-ns8:before{content:"\\f3d5"}.la-nutritionix:before{content:"\\f3d6"}.la-object-group:before{content:"\\f247"}.la-object-ungroup:before{content:"\\f248"}.la-odnoklassniki:before{content:"\\f263"}.la-odnoklassniki-square:before{content:"\\f264"}.la-oil-can:before{content:"\\f613"}.la-old-republic:before{content:"\\f510"}.la-om:before{content:"\\f679"}.la-opencart:before{content:"\\f23d"}.la-openid:before{content:"\\f19b"}.la-opera:before{content:"\\f26a"}.la-optin-monster:before{content:"\\f23c"}.la-orcid:before{content:"\\f8d2"}.la-osi:before{content:"\\f41a"}.la-otter:before{content:"\\f700"}.la-outdent:before{content:"\\f03b"}.la-page4:before{content:"\\f3d7"}.la-pagelines:before{content:"\\f18c"}.la-pager:before{content:"\\f815"}.la-paint-brush:before{content:"\\f1fc"}.la-paint-roller:before{content:"\\f5aa"}.la-palette:before{content:"\\f53f"}.la-palfed:before{content:"\\f3d8"}.la-pallet:before{content:"\\f482"}.la-paper-plane:before{content:"\\f1d8"}.la-paperclip:before{content:"\\f0c6"}.la-parachute-box:before{content:"\\f4cd"}.la-paragraph:before{content:"\\f1dd"}.la-parking:before{content:"\\f540"}.la-passport:before{content:"\\f5ab"}.la-pastafarianism:before{content:"\\f67b"}.la-paste:before{content:"\\f0ea"}.la-patreon:before{content:"\\f3d9"}.la-pause:before{content:"\\f04c"}.la-pause-circle:before{content:"\\f28b"}.la-paw:before{content:"\\f1b0"}.la-paypal:before{content:"\\f1ed"}.la-peace:before{content:"\\f67c"}.la-pen:before{content:"\\f304"}.la-pen-alt:before{content:"\\f305"}.la-pen-fancy:before{content:"\\f5ac"}.la-pen-nib:before{content:"\\f5ad"}.la-pen-square:before{content:"\\f14b"}.la-pencil-alt:before{content:"\\f303"}.la-pencil-ruler:before{content:"\\f5ae"}.la-penny-arcade:before{content:"\\f704"}.la-people-carry:before{content:"\\f4ce"}.la-pepper-hot:before{content:"\\f816"}.la-percent:before{content:"\\f295"}.la-percentage:before{content:"\\f541"}.la-periscope:before{content:"\\f3da"}.la-person-booth:before{content:"\\f756"}.la-phabricator:before{content:"\\f3db"}.la-phoenix-framework:before{content:"\\f3dc"}.la-phoenix-squadron:before{content:"\\f511"}.la-phone:before{content:"\\f095"}.la-phone-alt:before{content:"\\f879"}.la-phone-slash:before{content:"\\f3dd"}.la-phone-square:before{content:"\\f098"}.la-phone-square-alt:before{content:"\\f87b"}.la-phone-volume:before{content:"\\f2a0"}.la-photo-video:before{content:"\\f87c"}.la-php:before{content:"\\f457"}.la-pied-piper:before{content:"\\f2ae"}.la-pied-piper-alt:before{content:"\\f1a8"}.la-pied-piper-hat:before{content:"\\f4e5"}.la-pied-piper-pp:before{content:"\\f1a7"}.la-piggy-bank:before{content:"\\f4d3"}.la-pills:before{content:"\\f484"}.la-pinterest:before{content:"\\f0d2"}.la-pinterest-p:before{content:"\\f231"}.la-pinterest-square:before{content:"\\f0d3"}.la-pizza-slice:before{content:"\\f818"}.la-place-of-worship:before{content:"\\f67f"}.la-plane:before{content:"\\f072"}.la-plane-arrival:before{content:"\\f5af"}.la-plane-departure:before{content:"\\f5b0"}.la-play:before{content:"\\f04b"}.la-play-circle:before{content:"\\f144"}.la-playstation:before{content:"\\f3df"}.la-plug:before{content:"\\f1e6"}.la-plus:before{content:"\\f067"}.la-plus-circle:before{content:"\\f055"}.la-plus-square:before{content:"\\f0fe"}.la-podcast:before{content:"\\f2ce"}.la-poll:before{content:"\\f681"}.la-poll-h:before{content:"\\f682"}.la-poo:before{content:"\\f2fe"}.la-poo-storm:before{content:"\\f75a"}.la-poop:before{content:"\\f619"}.la-portrait:before{content:"\\f3e0"}.la-pound-sign:before{content:"\\f154"}.la-power-off:before{content:"\\f011"}.la-pray:before{content:"\\f683"}.la-praying-hands:before{content:"\\f684"}.la-prescription:before{content:"\\f5b1"}.la-prescription-bottle:before{content:"\\f485"}.la-prescription-bottle-alt:before{content:"\\f486"}.la-print:before{content:"\\f02f"}.la-procedures:before{content:"\\f487"}.la-product-hunt:before{content:"\\f288"}.la-project-diagram:before{content:"\\f542"}.la-pushed:before{content:"\\f3e1"}.la-puzzle-piece:before{content:"\\f12e"}.la-python:before{content:"\\f3e2"}.la-qq:before{content:"\\f1d6"}.la-qrcode:before{content:"\\f029"}.la-question:before{content:"\\f128"}.la-question-circle:before{content:"\\f059"}.la-quidditch:before{content:"\\f458"}.la-quinscape:before{content:"\\f459"}.la-quora:before{content:"\\f2c4"}.la-quote-left:before{content:"\\f10d"}.la-quote-right:before{content:"\\f10e"}.la-quran:before{content:"\\f687"}.la-r-project:before{content:"\\f4f7"}.la-radiation:before{content:"\\f7b9"}.la-radiation-alt:before{content:"\\f7ba"}.la-rainbow:before{content:"\\f75b"}.la-random:before{content:"\\f074"}.la-raspberry-pi:before{content:"\\f7bb"}.la-ravelry:before{content:"\\f2d9"}.la-react:before{content:"\\f41b"}.la-reacteurope:before{content:"\\f75d"}.la-readme:before{content:"\\f4d5"}.la-rebel:before{content:"\\f1d0"}.la-receipt:before{content:"\\f543"}.la-record-vinyl:before{content:"\\f8d9"}.la-recycle:before{content:"\\f1b8"}.la-red-river:before{content:"\\f3e3"}.la-reddit:before{content:"\\f1a1"}.la-reddit-alien:before{content:"\\f281"}.la-reddit-square:before{content:"\\f1a2"}.la-redhat:before{content:"\\f7bc"}.la-redo:before{content:"\\f01e"}.la-redo-alt:before{content:"\\f2f9"}.la-registered:before{content:"\\f25d"}.la-remove-format:before{content:"\\f87d"}.la-renren:before{content:"\\f18b"}.la-reply:before{content:"\\f3e5"}.la-reply-all:before{content:"\\f122"}.la-replyd:before{content:"\\f3e6"}.la-republican:before{content:"\\f75e"}.la-researchgate:before{content:"\\f4f8"}.la-resolving:before{content:"\\f3e7"}.la-restroom:before{content:"\\f7bd"}.la-retweet:before{content:"\\f079"}.la-rev:before{content:"\\f5b2"}.la-ribbon:before{content:"\\f4d6"}.la-ring:before{content:"\\f70b"}.la-road:before{content:"\\f018"}.la-robot:before{content:"\\f544"}.la-rocket:before{content:"\\f135"}.la-rocketchat:before{content:"\\f3e8"}.la-rockrms:before{content:"\\f3e9"}.la-route:before{content:"\\f4d7"}.la-rss:before{content:"\\f09e"}.la-rss-square:before{content:"\\f143"}.la-ruble-sign:before{content:"\\f158"}.la-ruler:before{content:"\\f545"}.la-ruler-combined:before{content:"\\f546"}.la-ruler-horizontal:before{content:"\\f547"}.la-ruler-vertical:before{content:"\\f548"}.la-running:before{content:"\\f70c"}.la-rupee-sign:before{content:"\\f156"}.la-sad-cry:before{content:"\\f5b3"}.la-sad-tear:before{content:"\\f5b4"}.la-safari:before{content:"\\f267"}.la-salesforce:before{content:"\\f83b"}.la-sass:before{content:"\\f41e"}.la-satellite:before{content:"\\f7bf"}.la-satellite-dish:before{content:"\\f7c0"}.la-save:before{content:"\\f0c7"}.la-schlix:before{content:"\\f3ea"}.la-school:before{content:"\\f549"}.la-screwdriver:before{content:"\\f54a"}.la-scribd:before{content:"\\f28a"}.la-scroll:before{content:"\\f70e"}.la-sd-card:before{content:"\\f7c2"}.la-search:before{content:"\\f002"}.la-search-dollar:before{content:"\\f688"}.la-search-location:before{content:"\\f689"}.la-search-minus:before{content:"\\f010"}.la-search-plus:before{content:"\\f00e"}.la-searchengin:before{content:"\\f3eb"}.la-seedling:before{content:"\\f4d8"}.la-sellcast:before{content:"\\f2da"}.la-sellsy:before{content:"\\f213"}.la-server:before{content:"\\f233"}.la-servicestack:before{content:"\\f3ec"}.la-shapes:before{content:"\\f61f"}.la-share:before{content:"\\f064"}.la-share-alt:before{content:"\\f1e0"}.la-share-alt-square:before{content:"\\f1e1"}.la-share-square:before{content:"\\f14d"}.la-shekel-sign:before{content:"\\f20b"}.la-shield-alt:before{content:"\\f3ed"}.la-ship:before{content:"\\f21a"}.la-shipping-fast:before{content:"\\f48b"}.la-shirtsinbulk:before{content:"\\f214"}.la-shoe-prints:before{content:"\\f54b"}.la-shopping-bag:before{content:"\\f290"}.la-shopping-basket:before{content:"\\f291"}.la-shopping-cart:before{content:"\\f07a"}.la-shopware:before{content:"\\f5b5"}.la-shower:before{content:"\\f2cc"}.la-shuttle-van:before{content:"\\f5b6"}.la-sign:before{content:"\\f4d9"}.la-sign-in-alt:before{content:"\\f2f6"}.la-sign-language:before{content:"\\f2a7"}.la-sign-out-alt:before{content:"\\f2f5"}.la-signal:before{content:"\\f012"}.la-signature:before{content:"\\f5b7"}.la-sim-card:before{content:"\\f7c4"}.la-simplybuilt:before{content:"\\f215"}.la-sistrix:before{content:"\\f3ee"}.la-sitemap:before{content:"\\f0e8"}.la-sith:before{content:"\\f512"}.la-skating:before{content:"\\f7c5"}.la-sketch:before{content:"\\f7c6"}.la-skiing:before{content:"\\f7c9"}.la-skiing-nordic:before{content:"\\f7ca"}.la-skull:before{content:"\\f54c"}.la-skull-crossbones:before{content:"\\f714"}.la-skyatlas:before{content:"\\f216"}.la-skype:before{content:"\\f17e"}.la-slack:before{content:"\\f198"}.la-slack-hash:before{content:"\\f3ef"}.la-slash:before{content:"\\f715"}.la-sleigh:before{content:"\\f7cc"}.la-sliders-h:before{content:"\\f1de"}.la-slideshare:before{content:"\\f1e7"}.la-smile:before{content:"\\f118"}.la-smile-beam:before{content:"\\f5b8"}.la-smile-wink:before{content:"\\f4da"}.la-smog:before{content:"\\f75f"}.la-smoking:before{content:"\\f48d"}.la-smoking-ban:before{content:"\\f54d"}.la-sms:before{content:"\\f7cd"}.la-snapchat:before{content:"\\f2ab"}.la-snapchat-ghost:before{content:"\\f2ac"}.la-snapchat-square:before{content:"\\f2ad"}.la-snowboarding:before{content:"\\f7ce"}.la-snowflake:before{content:"\\f2dc"}.la-snowman:before{content:"\\f7d0"}.la-snowplow:before{content:"\\f7d2"}.la-socks:before{content:"\\f696"}.la-solar-panel:before{content:"\\f5ba"}.la-sort:before{content:"\\f0dc"}.la-sort-alpha-down:before{content:"\\f15d"}.la-sort-alpha-down-alt:before{content:"\\f881"}.la-sort-alpha-up:before{content:"\\f15e"}.la-sort-alpha-up-alt:before{content:"\\f882"}.la-sort-amount-down:before{content:"\\f160"}.la-sort-amount-down-alt:before{content:"\\f884"}.la-sort-amount-up:before{content:"\\f161"}.la-sort-amount-up-alt:before{content:"\\f885"}.la-sort-down:before{content:"\\f0dd"}.la-sort-numeric-down:before{content:"\\f162"}.la-sort-numeric-down-alt:before{content:"\\f886"}.la-sort-numeric-up:before{content:"\\f163"}.la-sort-numeric-up-alt:before{content:"\\f887"}.la-sort-up:before{content:"\\f0de"}.la-soundcloud:before{content:"\\f1be"}.la-sourcetree:before{content:"\\f7d3"}.la-spa:before{content:"\\f5bb"}.la-space-shuttle:before{content:"\\f197"}.la-speakap:before{content:"\\f3f3"}.la-speaker-deck:before{content:"\\f83c"}.la-spell-check:before{content:"\\f891"}.la-spider:before{content:"\\f717"}.la-spinner:before{content:"\\f110"}.la-splotch:before{content:"\\f5bc"}.la-spotify:before{content:"\\f1bc"}.la-spray-can:before{content:"\\f5bd"}.la-square:before{content:"\\f0c8"}.la-square-full:before{content:"\\f45c"}.la-square-root-alt:before{content:"\\f698"}.la-squarespace:before{content:"\\f5be"}.la-stack-exchange:before{content:"\\f18d"}.la-stack-overflow:before{content:"\\f16c"}.la-stackpath:before{content:"\\f842"}.la-stamp:before{content:"\\f5bf"}.la-star:before{content:"\\f005"}.la-star-and-crescent:before{content:"\\f699"}.la-star-half:before{content:"\\f089"}.la-star-half-alt:before{content:"\\f5c0"}.la-star-of-david:before{content:"\\f69a"}.la-star-of-life:before{content:"\\f621"}.la-staylinked:before{content:"\\f3f5"}.la-steam:before{content:"\\f1b6"}.la-steam-square:before{content:"\\f1b7"}.la-steam-symbol:before{content:"\\f3f6"}.la-step-backward:before{content:"\\f048"}.la-step-forward:before{content:"\\f051"}.la-stethoscope:before{content:"\\f0f1"}.la-sticker-mule:before{content:"\\f3f7"}.la-sticky-note:before{content:"\\f249"}.la-stop:before{content:"\\f04d"}.la-stop-circle:before{content:"\\f28d"}.la-stopwatch:before{content:"\\f2f2"}.la-store:before{content:"\\f54e"}.la-store-alt:before{content:"\\f54f"}.la-strava:before{content:"\\f428"}.la-stream:before{content:"\\f550"}.la-street-view:before{content:"\\f21d"}.la-strikethrough:before{content:"\\f0cc"}.la-stripe:before{content:"\\f429"}.la-stripe-s:before{content:"\\f42a"}.la-stroopwafel:before{content:"\\f551"}.la-studiovinari:before{content:"\\f3f8"}.la-stumbleupon:before{content:"\\f1a4"}.la-stumbleupon-circle:before{content:"\\f1a3"}.la-subscript:before{content:"\\f12c"}.la-subway:before{content:"\\f239"}.la-suitcase:before{content:"\\f0f2"}.la-suitcase-rolling:before{content:"\\f5c1"}.la-sun:before{content:"\\f185"}.la-superpowers:before{content:"\\f2dd"}.la-superscript:before{content:"\\f12b"}.la-supple:before{content:"\\f3f9"}.la-surprise:before{content:"\\f5c2"}.la-suse:before{content:"\\f7d6"}.la-swatchbook:before{content:"\\f5c3"}.la-swift:before{content:"\\f8e1"}.la-swimmer:before{content:"\\f5c4"}.la-swimming-pool:before{content:"\\f5c5"}.la-symfony:before{content:"\\f83d"}.la-synagogue:before{content:"\\f69b"}.la-sync:before{content:"\\f021"}.la-sync-alt:before{content:"\\f2f1"}.la-syringe:before{content:"\\f48e"}.la-table:before{content:"\\f0ce"}.la-table-tennis:before{content:"\\f45d"}.la-tablet:before{content:"\\f10a"}.la-tablet-alt:before{content:"\\f3fa"}.la-tablets:before{content:"\\f490"}.la-tachometer-alt:before{content:"\\f3fd"}.la-tag:before{content:"\\f02b"}.la-tags:before{content:"\\f02c"}.la-tape:before{content:"\\f4db"}.la-tasks:before{content:"\\f0ae"}.la-taxi:before{content:"\\f1ba"}.la-teamspeak:before{content:"\\f4f9"}.la-teeth:before{content:"\\f62e"}.la-teeth-open:before{content:"\\f62f"}.la-telegram:before{content:"\\f2c6"}.la-telegram-plane:before{content:"\\f3fe"}.la-temperature-high:before{content:"\\f769"}.la-temperature-low:before{content:"\\f76b"}.la-tencent-weibo:before{content:"\\f1d5"}.la-tenge:before{content:"\\f7d7"}.la-terminal:before{content:"\\f120"}.la-text-height:before{content:"\\f034"}.la-text-width:before{content:"\\f035"}.la-th:before{content:"\\f00a"}.la-th-large:before{content:"\\f009"}.la-th-list:before{content:"\\f00b"}.la-the-red-yeti:before{content:"\\f69d"}.la-theater-masks:before{content:"\\f630"}.la-themeco:before{content:"\\f5c6"}.la-themeisle:before{content:"\\f2b2"}.la-thermometer:before{content:"\\f491"}.la-thermometer-empty:before{content:"\\f2cb"}.la-thermometer-full:before{content:"\\f2c7"}.la-thermometer-half:before{content:"\\f2c9"}.la-thermometer-quarter:before{content:"\\f2ca"}.la-thermometer-three-quarters:before{content:"\\f2c8"}.la-think-peaks:before{content:"\\f731"}.la-thumbs-down:before{content:"\\f165"}.la-thumbs-up:before{content:"\\f164"}.la-thumbtack:before{content:"\\f08d"}.la-ticket-alt:before{content:"\\f3ff"}.la-times:before{content:"\\f00d"}.la-times-circle:before{content:"\\f057"}.la-tint:before{content:"\\f043"}.la-tint-slash:before{content:"\\f5c7"}.la-tired:before{content:"\\f5c8"}.la-toggle-off:before{content:"\\f204"}.la-toggle-on:before{content:"\\f205"}.la-toilet:before{content:"\\f7d8"}.la-toilet-paper:before{content:"\\f71e"}.la-toolbox:before{content:"\\f552"}.la-tools:before{content:"\\f7d9"}.la-tooth:before{content:"\\f5c9"}.la-torah:before{content:"\\f6a0"}.la-torii-gate:before{content:"\\f6a1"}.la-tractor:before{content:"\\f722"}.la-trade-federation:before{content:"\\f513"}.la-trademark:before{content:"\\f25c"}.la-traffic-light:before{content:"\\f637"}.la-train:before{content:"\\f238"}.la-tram:before{content:"\\f7da"}.la-transgender:before{content:"\\f224"}.la-transgender-alt:before{content:"\\f225"}.la-trash:before{content:"\\f1f8"}.la-trash-alt:before{content:"\\f2ed"}.la-trash-restore:before{content:"\\f829"}.la-trash-restore-alt:before{content:"\\f82a"}.la-tree:before{content:"\\f1bb"}.la-trello:before{content:"\\f181"}.la-tripadvisor:before{content:"\\f262"}.la-trophy:before{content:"\\f091"}.la-truck:before{content:"\\f0d1"}.la-truck-loading:before{content:"\\f4de"}.la-truck-monster:before{content:"\\f63b"}.la-truck-moving:before{content:"\\f4df"}.la-truck-pickup:before{content:"\\f63c"}.la-tshirt:before{content:"\\f553"}.la-tty:before{content:"\\f1e4"}.la-tumblr:before{content:"\\f173"}.la-tumblr-square:before{content:"\\f174"}.la-tv:before{content:"\\f26c"}.la-twitch:before{content:"\\f1e8"}.la-twitter:before{content:"\\f099"}.la-twitter-square:before{content:"\\f081"}.la-typo3:before{content:"\\f42b"}.la-uber:before{content:"\\f402"}.la-ubuntu:before{content:"\\f7df"}.la-uikit:before{content:"\\f403"}.la-umbraco:before{content:"\\f8e8"}.la-umbrella:before{content:"\\f0e9"}.la-umbrella-beach:before{content:"\\f5ca"}.la-underline:before{content:"\\f0cd"}.la-undo:before{content:"\\f0e2"}.la-undo-alt:before{content:"\\f2ea"}.la-uniregistry:before{content:"\\f404"}.la-universal-access:before{content:"\\f29a"}.la-university:before{content:"\\f19c"}.la-unlink:before{content:"\\f127"}.la-unlock:before{content:"\\f09c"}.la-unlock-alt:before{content:"\\f13e"}.la-untappd:before{content:"\\f405"}.la-upload:before{content:"\\f093"}.la-ups:before{content:"\\f7e0"}.la-usb:before{content:"\\f287"}.la-user:before{content:"\\f007"}.la-user-alt:before{content:"\\f406"}.la-user-alt-slash:before{content:"\\f4fa"}.la-user-astronaut:before{content:"\\f4fb"}.la-user-check:before{content:"\\f4fc"}.la-user-circle:before{content:"\\f2bd"}.la-user-clock:before{content:"\\f4fd"}.la-user-cog:before{content:"\\f4fe"}.la-user-edit:before{content:"\\f4ff"}.la-user-friends:before{content:"\\f500"}.la-user-graduate:before{content:"\\f501"}.la-user-injured:before{content:"\\f728"}.la-user-lock:before{content:"\\f502"}.la-user-md:before{content:"\\f0f0"}.la-user-minus:before{content:"\\f503"}.la-user-ninja:before{content:"\\f504"}.la-user-nurse:before{content:"\\f82f"}.la-user-plus:before{content:"\\f234"}.la-user-secret:before{content:"\\f21b"}.la-user-shield:before{content:"\\f505"}.la-user-slash:before{content:"\\f506"}.la-user-tag:before{content:"\\f507"}.la-user-tie:before{content:"\\f508"}.la-user-times:before{content:"\\f235"}.la-users:before{content:"\\f0c0"}.la-users-cog:before{content:"\\f509"}.la-usps:before{content:"\\f7e1"}.la-ussunnah:before{content:"\\f407"}.la-utensil-spoon:before{content:"\\f2e5"}.la-utensils:before{content:"\\f2e7"}.la-vaadin:before{content:"\\f408"}.la-vector-square:before{content:"\\f5cb"}.la-venus:before{content:"\\f221"}.la-venus-double:before{content:"\\f226"}.la-venus-mars:before{content:"\\f228"}.la-viacoin:before{content:"\\f237"}.la-viadeo:before{content:"\\f2a9"}.la-viadeo-square:before{content:"\\f2aa"}.la-vial:before{content:"\\f492"}.la-vials:before{content:"\\f493"}.la-viber:before{content:"\\f409"}.la-video:before{content:"\\f03d"}.la-video-slash:before{content:"\\f4e2"}.la-vihara:before{content:"\\f6a7"}.la-vimeo:before{content:"\\f40a"}.la-vimeo-square:before{content:"\\f194"}.la-vimeo-v:before{content:"\\f27d"}.la-vine:before{content:"\\f1ca"}.la-vk:before{content:"\\f189"}.la-vnv:before{content:"\\f40b"}.la-voicemail:before{content:"\\f897"}.la-volleyball-ball:before{content:"\\f45f"}.la-volume-down:before{content:"\\f027"}.la-volume-mute:before{content:"\\f6a9"}.la-volume-off:before{content:"\\f026"}.la-volume-up:before{content:"\\f028"}.la-vote-yea:before{content:"\\f772"}.la-vr-cardboard:before{content:"\\f729"}.la-vuejs:before{content:"\\f41f"}.la-walking:before{content:"\\f554"}.la-wallet:before{content:"\\f555"}.la-warehouse:before{content:"\\f494"}.la-water:before{content:"\\f773"}.la-wave-square:before{content:"\\f83e"}.la-waze:before{content:"\\f83f"}.la-weebly:before{content:"\\f5cc"}.la-weibo:before{content:"\\f18a"}.la-weight:before{content:"\\f496"}.la-weight-hanging:before{content:"\\f5cd"}.la-weixin:before{content:"\\f1d7"}.la-whatsapp:before{content:"\\f232"}.la-whatsapp-square:before{content:"\\f40c"}.la-wheelchair:before{content:"\\f193"}.la-whmcs:before{content:"\\f40d"}.la-wifi:before{content:"\\f1eb"}.la-wikipedia-w:before{content:"\\f266"}.la-wind:before{content:"\\f72e"}.la-window-close:before{content:"\\f410"}.la-window-maximize:before{content:"\\f2d0"}.la-window-minimize:before{content:"\\f2d1"}.la-window-restore:before{content:"\\f2d2"}.la-windows:before{content:"\\f17a"}.la-wine-bottle:before{content:"\\f72f"}.la-wine-glass:before{content:"\\f4e3"}.la-wine-glass-alt:before{content:"\\f5ce"}.la-wix:before{content:"\\f5cf"}.la-wizards-of-the-coast:before{content:"\\f730"}.la-wolf-pack-battalion:before{content:"\\f514"}.la-won-sign:before{content:"\\f159"}.la-wordpress:before{content:"\\f19a"}.la-wordpress-simple:before{content:"\\f411"}.la-wpbeginner:before{content:"\\f297"}.la-wpexplorer:before{content:"\\f2de"}.la-wpforms:before{content:"\\f298"}.la-wpressr:before{content:"\\f3e4"}.la-wrench:before{content:"\\f0ad"}.la-x-ray:before{content:"\\f497"}.la-xbox:before{content:"\\f412"}.la-xing:before{content:"\\f168"}.la-xing-square:before{content:"\\f169"}.la-y-combinator:before{content:"\\f23b"}.la-yahoo:before{content:"\\f19e"}.la-yammer:before{content:"\\f840"}.la-yandex:before{content:"\\f413"}.la-yandex-international:before{content:"\\f414"}.la-yarn:before{content:"\\f7e3"}.la-yelp:before{content:"\\f1e9"}.la-yen-sign:before{content:"\\f157"}.la-yin-yang:before{content:"\\f6ad"}.la-yoast:before{content:"\\f2b1"}.la-youtube:before{content:"\\f167"}.la-youtube-square:before{content:"\\f431"}.la-zhihu:before{content:"\\f63f"}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}@font-face{font-family:Line Awesome Brands;font-style:normal;font-weight:400;font-display:auto;src:url(${_(""+new URL("la-brands-400-c0e32387.eot",import.meta.url).href)});src:url(${_(""+new URL("la-brands-400-c0e32387.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${_(""+new URL("la-brands-400-ff70c9bc.woff2",import.meta.url).href)}) format("woff2"),url(${_(""+new URL("la-brands-400-14c63377.woff",import.meta.url).href)}) format("woff"),url(${_(""+new URL("la-brands-400-fbc98702.ttf",import.meta.url).href)}) format("truetype"),url(${_(""+new URL("la-brands-400-4da18191.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.lab{font-family:Line Awesome Brands}@font-face{font-family:Line Awesome Free;font-style:normal;font-weight:400;font-display:auto;src:url(${_(""+new URL("la-regular-400-7dc456f0.eot",import.meta.url).href)});src:url(${_(""+new URL("la-regular-400-7dc456f0.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${_(""+new URL("la-regular-400-51ca2c00.woff2",import.meta.url).href)}) format("woff2"),url(${_(""+new URL("la-regular-400-7711fabc.woff",import.meta.url).href)}) format("woff"),url(${_(""+new URL("la-regular-400-4b6ab8d0.ttf",import.meta.url).href)}) format("truetype"),url(${_(""+new URL("la-regular-400-884ce19c.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.lar{font-family:Line Awesome Free;font-weight:400}@font-face{font-family:Line Awesome Free;font-style:normal;font-weight:900;font-display:auto;src:url(${_(""+new URL("la-solid-900-8a57f8a9.eot",import.meta.url).href)});src:url(${_(""+new URL("la-solid-900-8a57f8a9.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${_(""+new URL("la-solid-900-10a68e01.woff2",import.meta.url).href)}) format("woff2"),url(${_(""+new URL("la-solid-900-a0d21b2a.woff",import.meta.url).href)}) format("woff"),url(${_(""+new URL("la-solid-900-07ce3559.ttf",import.meta.url).href)}) format("truetype"),url(${_(""+new URL("la-solid-900-0ce0cc40.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.la,.las{font-family:Line Awesome Free;font-weight:900}.la.la-glass:before{content:"\\f000"}.la.la-meetup{font-family:Line Awesome Brands;font-weight:400}.la.la-star-o{font-family:Line Awesome Free;font-weight:400}.la.la-star-o:before{content:"\\f005"}.la.la-remove:before{content:"\\f00d"}.la.la-close:before{content:"\\f00d"}.la.la-gear:before{content:"\\f013"}.la.la-trash-o{font-family:Line Awesome Free;font-weight:400}.la.la-trash-o:before{content:"\\f2ed"}.la.la-file-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-o:before{content:"\\f15b"}.la.la-clock-o{font-family:Line Awesome Free;font-weight:400}.la.la-clock-o:before{content:"\\f017"}.la.la-arrow-circle-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-down:before{content:"\\f358"}.la.la-arrow-circle-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-up:before{content:"\\f35b"}.la.la-play-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-play-circle-o:before{content:"\\f144"}.la.la-repeat:before{content:"\\f01e"}.la.la-rotate-right:before{content:"\\f01e"}.la.la-refresh:before{content:"\\f021"}.la.la-list-alt{font-family:Line Awesome Free;font-weight:400}.la.la-dedent:before{content:"\\f03b"}.la.la-video-camera:before{content:"\\f03d"}.la.la-picture-o{font-family:Line Awesome Free;font-weight:400}.la.la-picture-o:before{content:"\\f03e"}.la.la-photo{font-family:Line Awesome Free;font-weight:400}.la.la-photo:before{content:"\\f03e"}.la.la-image{font-family:Line Awesome Free;font-weight:400}.la.la-image:before{content:"\\f03e"}.la.la-pencil:before{content:"\\f303"}.la.la-map-marker:before{content:"\\f3c5"}.la.la-pencil-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-pencil-square-o:before{content:"\\f044"}.la.la-share-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-share-square-o:before{content:"\\f14d"}.la.la-check-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-check-square-o:before{content:"\\f14a"}.la.la-arrows:before{content:"\\f0b2"}.la.la-times-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-times-circle-o:before{content:"\\f057"}.la.la-check-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-check-circle-o:before{content:"\\f058"}.la.la-mail-forward:before{content:"\\f064"}.la.la-eye,.la.la-eye-slash{font-family:Line Awesome Free;font-weight:400}.la.la-warning:before{content:"\\f071"}.la.la-calendar:before{content:"\\f073"}.la.la-arrows-v:before{content:"\\f338"}.la.la-arrows-h:before{content:"\\f337"}.la.la-bar-chart{font-family:Line Awesome Free;font-weight:400}.la.la-bar-chart:before{content:"\\f080"}.la.la-bar-chart-o{font-family:Line Awesome Free;font-weight:400}.la.la-bar-chart-o:before{content:"\\f080"}.la.la-twitter-square,.la.la-facebook-square{font-family:Line Awesome Brands;font-weight:400}.la.la-gears:before{content:"\\f085"}.la.la-thumbs-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-thumbs-o-up:before{content:"\\f164"}.la.la-thumbs-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-thumbs-o-down:before{content:"\\f165"}.la.la-heart-o{font-family:Line Awesome Free;font-weight:400}.la.la-heart-o:before{content:"\\f004"}.la.la-sign-out:before{content:"\\f2f5"}.la.la-linkedin-square{font-family:Line Awesome Brands;font-weight:400}.la.la-linkedin-square:before{content:"\\f08c"}.la.la-thumb-tack:before{content:"\\f08d"}.la.la-external-link:before{content:"\\f35d"}.la.la-sign-in:before{content:"\\f2f6"}.la.la-github-square{font-family:Line Awesome Brands;font-weight:400}.la.la-lemon-o{font-family:Line Awesome Free;font-weight:400}.la.la-lemon-o:before{content:"\\f094"}.la.la-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-square-o:before{content:"\\f0c8"}.la.la-bookmark-o{font-family:Line Awesome Free;font-weight:400}.la.la-bookmark-o:before{content:"\\f02e"}.la.la-twitter,.la.la-facebook{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook:before{content:"\\f39e"}.la.la-facebook-f{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook-f:before{content:"\\f39e"}.la.la-github{font-family:Line Awesome Brands;font-weight:400}.la.la-credit-card{font-family:Line Awesome Free;font-weight:400}.la.la-feed:before{content:"\\f09e"}.la.la-hdd-o{font-family:Line Awesome Free;font-weight:400}.la.la-hdd-o:before{content:"\\f0a0"}.la.la-hand-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-right:before{content:"\\f0a4"}.la.la-hand-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-left:before{content:"\\f0a5"}.la.la-hand-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-up:before{content:"\\f0a6"}.la.la-hand-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-down:before{content:"\\f0a7"}.la.la-arrows-alt:before{content:"\\f31e"}.la.la-group:before{content:"\\f0c0"}.la.la-chain:before{content:"\\f0c1"}.la.la-scissors:before{content:"\\f0c4"}.la.la-files-o{font-family:Line Awesome Free;font-weight:400}.la.la-files-o:before{content:"\\f0c5"}.la.la-floppy-o{font-family:Line Awesome Free;font-weight:400}.la.la-floppy-o:before{content:"\\f0c7"}.la.la-navicon:before{content:"\\f0c9"}.la.la-reorder:before{content:"\\f0c9"}.la.la-pinterest,.la.la-pinterest-square,.la.la-google-plus-square,.la.la-google-plus{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus:before{content:"\\f0d5"}.la.la-money{font-family:Line Awesome Free;font-weight:400}.la.la-money:before{content:"\\f3d1"}.la.la-unsorted:before{content:"\\f0dc"}.la.la-sort-desc:before{content:"\\f0dd"}.la.la-sort-asc:before{content:"\\f0de"}.la.la-linkedin{font-family:Line Awesome Brands;font-weight:400}.la.la-linkedin:before{content:"\\f0e1"}.la.la-rotate-left:before{content:"\\f0e2"}.la.la-legal:before{content:"\\f0e3"}.la.la-tachometer:before{content:"\\f3fd"}.la.la-dashboard:before{content:"\\f3fd"}.la.la-comment-o{font-family:Line Awesome Free;font-weight:400}.la.la-comment-o:before{content:"\\f075"}.la.la-comments-o{font-family:Line Awesome Free;font-weight:400}.la.la-comments-o:before{content:"\\f086"}.la.la-flash:before{content:"\\f0e7"}.la.la-clipboard,.la.la-paste{font-family:Line Awesome Free;font-weight:400}.la.la-paste:before{content:"\\f328"}.la.la-lightbulb-o{font-family:Line Awesome Free;font-weight:400}.la.la-lightbulb-o:before{content:"\\f0eb"}.la.la-exchange:before{content:"\\f362"}.la.la-cloud-download:before{content:"\\f381"}.la.la-cloud-upload:before{content:"\\f382"}.la.la-bell-o{font-family:Line Awesome Free;font-weight:400}.la.la-bell-o:before{content:"\\f0f3"}.la.la-cutlery:before{content:"\\f2e7"}.la.la-file-text-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-text-o:before{content:"\\f15c"}.la.la-building-o{font-family:Line Awesome Free;font-weight:400}.la.la-building-o:before{content:"\\f1ad"}.la.la-hospital-o{font-family:Line Awesome Free;font-weight:400}.la.la-hospital-o:before{content:"\\f0f8"}.la.la-tablet:before{content:"\\f3fa"}.la.la-mobile:before{content:"\\f3cd"}.la.la-mobile-phone:before{content:"\\f3cd"}.la.la-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-circle-o:before{content:"\\f111"}.la.la-mail-reply:before{content:"\\f3e5"}.la.la-github-alt{font-family:Line Awesome Brands;font-weight:400}.la.la-folder-o{font-family:Line Awesome Free;font-weight:400}.la.la-folder-o:before{content:"\\f07b"}.la.la-folder-open-o{font-family:Line Awesome Free;font-weight:400}.la.la-folder-open-o:before{content:"\\f07c"}.la.la-smile-o{font-family:Line Awesome Free;font-weight:400}.la.la-smile-o:before{content:"\\f118"}.la.la-frown-o{font-family:Line Awesome Free;font-weight:400}.la.la-frown-o:before{content:"\\f119"}.la.la-meh-o{font-family:Line Awesome Free;font-weight:400}.la.la-meh-o:before{content:"\\f11a"}.la.la-keyboard-o{font-family:Line Awesome Free;font-weight:400}.la.la-keyboard-o:before{content:"\\f11c"}.la.la-flag-o{font-family:Line Awesome Free;font-weight:400}.la.la-flag-o:before{content:"\\f024"}.la.la-mail-reply-all:before{content:"\\f122"}.la.la-star-half-o{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-o:before{content:"\\f089"}.la.la-star-half-empty{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-empty:before{content:"\\f089"}.la.la-star-half-full{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-full:before{content:"\\f089"}.la.la-code-fork:before{content:"\\f126"}.la.la-chain-broken:before{content:"\\f127"}.la.la-shield:before{content:"\\f3ed"}.la.la-calendar-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-o:before{content:"\\f133"}.la.la-maxcdn,.la.la-html5,.la.la-css3{font-family:Line Awesome Brands;font-weight:400}.la.la-ticket:before{content:"\\f3ff"}.la.la-minus-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-minus-square-o:before{content:"\\f146"}.la.la-level-up:before{content:"\\f3bf"}.la.la-level-down:before{content:"\\f3be"}.la.la-pencil-square:before{content:"\\f14b"}.la.la-external-link-square:before{content:"\\f360"}.la.la-compass,.la.la-caret-square-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-down:before{content:"\\f150"}.la.la-toggle-down{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-down:before{content:"\\f150"}.la.la-caret-square-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-up:before{content:"\\f151"}.la.la-toggle-up{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-up:before{content:"\\f151"}.la.la-caret-square-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-right:before{content:"\\f152"}.la.la-toggle-right{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-right:before{content:"\\f152"}.la.la-eur:before{content:"\\f153"}.la.la-euro:before{content:"\\f153"}.la.la-gbp:before{content:"\\f154"}.la.la-usd:before{content:"\\f155"}.la.la-dollar:before{content:"\\f155"}.la.la-inr:before{content:"\\f156"}.la.la-rupee:before{content:"\\f156"}.la.la-jpy:before{content:"\\f157"}.la.la-cny:before{content:"\\f157"}.la.la-rmb:before{content:"\\f157"}.la.la-yen:before{content:"\\f157"}.la.la-rub:before{content:"\\f158"}.la.la-ruble:before{content:"\\f158"}.la.la-rouble:before{content:"\\f158"}.la.la-krw:before{content:"\\f159"}.la.la-won:before{content:"\\f159"}.la.la-btc,.la.la-bitcoin{font-family:Line Awesome Brands;font-weight:400}.la.la-bitcoin:before{content:"\\f15a"}.la.la-file-text:before{content:"\\f15c"}.la.la-sort-alpha-asc:before{content:"\\f15d"}.la.la-sort-alpha-desc:before{content:"\\f881"}.la.la-sort-amount-asc:before{content:"\\f160"}.la.la-sort-amount-desc:before{content:"\\f884"}.la.la-sort-numeric-asc:before{content:"\\f162"}.la.la-sort-numeric-desc:before{content:"\\f886"}.la.la-youtube-square,.la.la-youtube,.la.la-xing,.la.la-xing-square,.la.la-youtube-play{font-family:Line Awesome Brands;font-weight:400}.la.la-youtube-play:before{content:"\\f167"}.la.la-dropbox,.la.la-stack-overflow,.la.la-instagram,.la.la-flickr,.la.la-adn,.la.la-bitbucket,.la.la-bitbucket-square{font-family:Line Awesome Brands;font-weight:400}.la.la-bitbucket-square:before{content:"\\f171"}.la.la-tumblr,.la.la-tumblr-square{font-family:Line Awesome Brands;font-weight:400}.la.la-long-arrow-down:before{content:"\\f309"}.la.la-long-arrow-up:before{content:"\\f30c"}.la.la-long-arrow-left:before{content:"\\f30a"}.la.la-long-arrow-right:before{content:"\\f30b"}.la.la-apple,.la.la-windows,.la.la-android,.la.la-linux,.la.la-dribbble,.la.la-skype,.la.la-foursquare,.la.la-trello,.la.la-gratipay,.la.la-gittip{font-family:Line Awesome Brands;font-weight:400}.la.la-gittip:before{content:"\\f184"}.la.la-sun-o{font-family:Line Awesome Free;font-weight:400}.la.la-sun-o:before{content:"\\f185"}.la.la-moon-o{font-family:Line Awesome Free;font-weight:400}.la.la-moon-o:before{content:"\\f186"}.la.la-vk,.la.la-weibo,.la.la-renren,.la.la-pagelines,.la.la-stack-exchange{font-family:Line Awesome Brands;font-weight:400}.la.la-arrow-circle-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-right:before{content:"\\f35a"}.la.la-arrow-circle-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-left:before{content:"\\f359"}.la.la-caret-square-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-left:before{content:"\\f191"}.la.la-toggle-left{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-left:before{content:"\\f191"}.la.la-dot-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-dot-circle-o:before{content:"\\f192"}.la.la-vimeo-square{font-family:Line Awesome Brands;font-weight:400}.la.la-try:before{content:"\\f195"}.la.la-turkish-lira:before{content:"\\f195"}.la.la-plus-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-plus-square-o:before{content:"\\f0fe"}.la.la-slack,.la.la-wordpress,.la.la-openid{font-family:Line Awesome Brands;font-weight:400}.la.la-institution:before{content:"\\f19c"}.la.la-bank:before{content:"\\f19c"}.la.la-mortar-board:before{content:"\\f19d"}.la.la-yahoo,.la.la-google,.la.la-reddit,.la.la-reddit-square,.la.la-stumbleupon-circle,.la.la-stumbleupon,.la.la-delicious,.la.la-digg,.la.la-pied-piper-pp,.la.la-pied-piper-alt,.la.la-drupal,.la.la-joomla{font-family:Line Awesome Brands;font-weight:400}.la.la-spoon:before{content:"\\f2e5"}.la.la-behance,.la.la-behance-square,.la.la-steam,.la.la-steam-square{font-family:Line Awesome Brands;font-weight:400}.la.la-automobile:before{content:"\\f1b9"}.la.la-cab:before{content:"\\f1ba"}.la.la-envelope-o{font-family:Line Awesome Free;font-weight:400}.la.la-envelope-o:before{content:"\\f0e0"}.la.la-deviantart,.la.la-soundcloud{font-family:Line Awesome Brands;font-weight:400}.la.la-file-pdf-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-pdf-o:before{content:"\\f1c1"}.la.la-file-word-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-word-o:before{content:"\\f1c2"}.la.la-file-excel-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-excel-o:before{content:"\\f1c3"}.la.la-file-powerpoint-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-powerpoint-o:before{content:"\\f1c4"}.la.la-file-image-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-image-o:before{content:"\\f1c5"}.la.la-file-photo-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-photo-o:before{content:"\\f1c5"}.la.la-file-picture-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-picture-o:before{content:"\\f1c5"}.la.la-file-archive-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-archive-o:before{content:"\\f1c6"}.la.la-file-zip-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-zip-o:before{content:"\\f1c6"}.la.la-file-audio-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-audio-o:before{content:"\\f1c7"}.la.la-file-sound-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-sound-o:before{content:"\\f1c7"}.la.la-file-video-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-video-o:before{content:"\\f1c8"}.la.la-file-movie-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-movie-o:before{content:"\\f1c8"}.la.la-file-code-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-code-o:before{content:"\\f1c9"}.la.la-vine,.la.la-codepen,.la.la-jsfiddle{font-family:Line Awesome Brands;font-weight:400}.la.la-life-ring,.la.la-life-bouy{font-family:Line Awesome Free;font-weight:400}.la.la-life-bouy:before{content:"\\f1cd"}.la.la-life-buoy{font-family:Line Awesome Free;font-weight:400}.la.la-life-buoy:before{content:"\\f1cd"}.la.la-life-saver{font-family:Line Awesome Free;font-weight:400}.la.la-life-saver:before{content:"\\f1cd"}.la.la-support{font-family:Line Awesome Free;font-weight:400}.la.la-support:before{content:"\\f1cd"}.la.la-circle-o-notch:before{content:"\\f1ce"}.la.la-rebel,.la.la-ra{font-family:Line Awesome Brands;font-weight:400}.la.la-ra:before{content:"\\f1d0"}.la.la-resistance{font-family:Line Awesome Brands;font-weight:400}.la.la-resistance:before{content:"\\f1d0"}.la.la-empire,.la.la-ge{font-family:Line Awesome Brands;font-weight:400}.la.la-ge:before{content:"\\f1d1"}.la.la-git-square,.la.la-git,.la.la-hacker-news,.la.la-y-combinator-square{font-family:Line Awesome Brands;font-weight:400}.la.la-y-combinator-square:before{content:"\\f1d4"}.la.la-yc-square{font-family:Line Awesome Brands;font-weight:400}.la.la-yc-square:before{content:"\\f1d4"}.la.la-tencent-weibo,.la.la-qq,.la.la-weixin,.la.la-wechat{font-family:Line Awesome Brands;font-weight:400}.la.la-wechat:before{content:"\\f1d7"}.la.la-send:before{content:"\\f1d8"}.la.la-paper-plane-o{font-family:Line Awesome Free;font-weight:400}.la.la-paper-plane-o:before{content:"\\f1d8"}.la.la-send-o{font-family:Line Awesome Free;font-weight:400}.la.la-send-o:before{content:"\\f1d8"}.la.la-circle-thin{font-family:Line Awesome Free;font-weight:400}.la.la-circle-thin:before{content:"\\f111"}.la.la-header:before{content:"\\f1dc"}.la.la-sliders:before{content:"\\f1de"}.la.la-futbol-o{font-family:Line Awesome Free;font-weight:400}.la.la-futbol-o:before{content:"\\f1e3"}.la.la-soccer-ball-o{font-family:Line Awesome Free;font-weight:400}.la.la-soccer-ball-o:before{content:"\\f1e3"}.la.la-slideshare,.la.la-twitch,.la.la-yelp{font-family:Line Awesome Brands;font-weight:400}.la.la-newspaper-o{font-family:Line Awesome Free;font-weight:400}.la.la-newspaper-o:before{content:"\\f1ea"}.la.la-paypal,.la.la-google-wallet,.la.la-cc-visa,.la.la-cc-mastercard,.la.la-cc-discover,.la.la-cc-amex,.la.la-cc-paypal,.la.la-cc-stripe{font-family:Line Awesome Brands;font-weight:400}.la.la-bell-slash-o{font-family:Line Awesome Free;font-weight:400}.la.la-bell-slash-o:before{content:"\\f1f6"}.la.la-trash:before{content:"\\f2ed"}.la.la-copyright{font-family:Line Awesome Free;font-weight:400}.la.la-eyedropper:before{content:"\\f1fb"}.la.la-area-chart:before{content:"\\f1fe"}.la.la-pie-chart:before{content:"\\f200"}.la.la-line-chart:before{content:"\\f201"}.la.la-lastfm,.la.la-lastfm-square,.la.la-ioxhost,.la.la-angellist{font-family:Line Awesome Brands;font-weight:400}.la.la-cc{font-family:Line Awesome Free;font-weight:400}.la.la-cc:before{content:"\\f20a"}.la.la-ils:before{content:"\\f20b"}.la.la-shekel:before{content:"\\f20b"}.la.la-sheqel:before{content:"\\f20b"}.la.la-meanpath{font-family:Line Awesome Brands;font-weight:400}.la.la-meanpath:before{content:"\\f2b4"}.la.la-buysellads,.la.la-connectdevelop,.la.la-dashcube,.la.la-forumbee,.la.la-leanpub,.la.la-sellsy,.la.la-shirtsinbulk,.la.la-simplybuilt,.la.la-skyatlas{font-family:Line Awesome Brands;font-weight:400}.la.la-diamond{font-family:Line Awesome Free;font-weight:400}.la.la-diamond:before{content:"\\f3a5"}.la.la-intersex:before{content:"\\f224"}.la.la-facebook-official{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook-official:before{content:"\\f09a"}.la.la-pinterest-p,.la.la-whatsapp{font-family:Line Awesome Brands;font-weight:400}.la.la-hotel:before{content:"\\f236"}.la.la-viacoin,.la.la-medium,.la.la-y-combinator,.la.la-yc{font-family:Line Awesome Brands;font-weight:400}.la.la-yc:before{content:"\\f23b"}.la.la-optin-monster,.la.la-opencart,.la.la-expeditedssl{font-family:Line Awesome Brands;font-weight:400}.la.la-battery-4:before{content:"\\f240"}.la.la-battery:before{content:"\\f240"}.la.la-battery-3:before{content:"\\f241"}.la.la-battery-2:before{content:"\\f242"}.la.la-battery-1:before{content:"\\f243"}.la.la-battery-0:before{content:"\\f244"}.la.la-object-group,.la.la-object-ungroup,.la.la-sticky-note-o{font-family:Line Awesome Free;font-weight:400}.la.la-sticky-note-o:before{content:"\\f249"}.la.la-cc-jcb,.la.la-cc-diners-club{font-family:Line Awesome Brands;font-weight:400}.la.la-clone,.la.la-hourglass-o{font-family:Line Awesome Free;font-weight:400}.la.la-hourglass-o:before{content:"\\f254"}.la.la-hourglass-1:before{content:"\\f251"}.la.la-hourglass-2:before{content:"\\f252"}.la.la-hourglass-3:before{content:"\\f253"}.la.la-hand-rock-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-rock-o:before{content:"\\f255"}.la.la-hand-grab-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-grab-o:before{content:"\\f255"}.la.la-hand-paper-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-paper-o:before{content:"\\f256"}.la.la-hand-stop-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-stop-o:before{content:"\\f256"}.la.la-hand-scissors-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-scissors-o:before{content:"\\f257"}.la.la-hand-lizard-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-lizard-o:before{content:"\\f258"}.la.la-hand-spock-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-spock-o:before{content:"\\f259"}.la.la-hand-pointer-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-pointer-o:before{content:"\\f25a"}.la.la-hand-peace-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-peace-o:before{content:"\\f25b"}.la.la-registered{font-family:Line Awesome Free;font-weight:400}.la.la-creative-commons,.la.la-gg,.la.la-gg-circle,.la.la-tripadvisor,.la.la-odnoklassniki,.la.la-odnoklassniki-square,.la.la-get-pocket,.la.la-wikipedia-w,.la.la-safari,.la.la-chrome,.la.la-firefox,.la.la-opera,.la.la-internet-explorer{font-family:Line Awesome Brands;font-weight:400}.la.la-television:before{content:"\\f26c"}.la.la-contao,.la.la-500px,.la.la-amazon{font-family:Line Awesome Brands;font-weight:400}.la.la-calendar-plus-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-plus-o:before{content:"\\f271"}.la.la-calendar-minus-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-minus-o:before{content:"\\f272"}.la.la-calendar-times-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-times-o:before{content:"\\f273"}.la.la-calendar-check-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-check-o:before{content:"\\f274"}.la.la-map-o{font-family:Line Awesome Free;font-weight:400}.la.la-map-o:before{content:"\\f279"}.la.la-commenting:before{content:"\\f4ad"}.la.la-commenting-o{font-family:Line Awesome Free;font-weight:400}.la.la-commenting-o:before{content:"\\f4ad"}.la.la-houzz,.la.la-vimeo{font-family:Line Awesome Brands;font-weight:400}.la.la-vimeo:before{content:"\\f27d"}.la.la-black-tie,.la.la-fonticons,.la.la-reddit-alien,.la.la-edge{font-family:Line Awesome Brands;font-weight:400}.la.la-credit-card-alt:before{content:"\\f09d"}.la.la-codiepie,.la.la-modx,.la.la-fort-awesome,.la.la-usb,.la.la-product-hunt,.la.la-mixcloud,.la.la-scribd{font-family:Line Awesome Brands;font-weight:400}.la.la-pause-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-pause-circle-o:before{content:"\\f28b"}.la.la-stop-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-stop-circle-o:before{content:"\\f28d"}.la.la-bluetooth,.la.la-bluetooth-b,.la.la-gitlab,.la.la-wpbeginner,.la.la-wpforms,.la.la-envira,.la.la-wheelchair-alt{font-family:Line Awesome Brands;font-weight:400}.la.la-wheelchair-alt:before{content:"\\f368"}.la.la-question-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-question-circle-o:before{content:"\\f059"}.la.la-volume-control-phone:before{content:"\\f2a0"}.la.la-asl-interpreting:before{content:"\\f2a3"}.la.la-deafness:before{content:"\\f2a4"}.la.la-hard-of-hearing:before{content:"\\f2a4"}.la.la-glide,.la.la-glide-g{font-family:Line Awesome Brands;font-weight:400}.la.la-signing:before{content:"\\f2a7"}.la.la-viadeo,.la.la-viadeo-square,.la.la-snapchat,.la.la-snapchat-ghost,.la.la-snapchat-square,.la.la-pied-piper,.la.la-first-order,.la.la-yoast,.la.la-themeisle,.la.la-google-plus-official{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus-official:before{content:"\\f2b3"}.la.la-google-plus-circle{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus-circle:before{content:"\\f2b3"}.la.la-font-awesome,.la.la-fa{font-family:Line Awesome Brands;font-weight:400}.la.la-fa:before{content:"\\f2b4"}.la.la-handshake-o{font-family:Line Awesome Free;font-weight:400}.la.la-handshake-o:before{content:"\\f2b5"}.la.la-envelope-open-o{font-family:Line Awesome Free;font-weight:400}.la.la-envelope-open-o:before{content:"\\f2b6"}.la.la-linode{font-family:Line Awesome Brands;font-weight:400}.la.la-address-book-o{font-family:Line Awesome Free;font-weight:400}.la.la-address-book-o:before{content:"\\f2b9"}.la.la-vcard:before{content:"\\f2bb"}.la.la-address-card-o{font-family:Line Awesome Free;font-weight:400}.la.la-address-card-o:before{content:"\\f2bb"}.la.la-vcard-o{font-family:Line Awesome Free;font-weight:400}.la.la-vcard-o:before{content:"\\f2bb"}.la.la-user-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-user-circle-o:before{content:"\\f2bd"}.la.la-user-o{font-family:Line Awesome Free;font-weight:400}.la.la-user-o:before{content:"\\f007"}.la.la-id-badge{font-family:Line Awesome Free;font-weight:400}.la.la-drivers-license:before{content:"\\f2c2"}.la.la-id-card-o{font-family:Line Awesome Free;font-weight:400}.la.la-id-card-o:before{content:"\\f2c2"}.la.la-drivers-license-o{font-family:Line Awesome Free;font-weight:400}.la.la-drivers-license-o:before{content:"\\f2c2"}.la.la-quora,.la.la-free-code-camp,.la.la-telegram{font-family:Line Awesome Brands;font-weight:400}.la.la-thermometer-4:before{content:"\\f2c7"}.la.la-thermometer:before{content:"\\f2c7"}.la.la-thermometer-3:before{content:"\\f2c8"}.la.la-thermometer-2:before{content:"\\f2c9"}.la.la-thermometer-1:before{content:"\\f2ca"}.la.la-thermometer-0:before{content:"\\f2cb"}.la.la-bathtub:before{content:"\\f2cd"}.la.la-s15:before{content:"\\f2cd"}.la.la-window-maximize,.la.la-window-restore{font-family:Line Awesome Free;font-weight:400}.la.la-times-rectangle:before{content:"\\f410"}.la.la-window-close-o{font-family:Line Awesome Free;font-weight:400}.la.la-window-close-o:before{content:"\\f410"}.la.la-times-rectangle-o{font-family:Line Awesome Free;font-weight:400}.la.la-times-rectangle-o:before{content:"\\f410"}.la.la-bandcamp,.la.la-grav,.la.la-etsy,.la.la-imdb,.la.la-ravelry,.la.la-eercast{font-family:Line Awesome Brands;font-weight:400}.la.la-eercast:before{content:"\\f2da"}.la.la-snowflake-o{font-family:Line Awesome Free;font-weight:400}.la.la-snowflake-o:before{content:"\\f2dc"}.la.la-superpowers,.la.la-wpexplorer,.la.la-spotify{font-family:Line Awesome Brands;font-weight:400}
`,La=w`/*!
 * Materialize v1.0.0-rc.2 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */.materialize-red{background-color:#e51c23!important}.materialize-red-text{color:#e51c23!important}.materialize-red.lighten-5{background-color:#fdeaeb!important}.materialize-red-text.text-lighten-5{color:#fdeaeb!important}.materialize-red.lighten-4{background-color:#f8c1c3!important}.materialize-red-text.text-lighten-4{color:#f8c1c3!important}.materialize-red.lighten-3{background-color:#f3989b!important}.materialize-red-text.text-lighten-3{color:#f3989b!important}.materialize-red.lighten-2{background-color:#ee6e73!important}.materialize-red-text.text-lighten-2{color:#ee6e73!important}.materialize-red.lighten-1{background-color:#ea454b!important}.materialize-red-text.text-lighten-1{color:#ea454b!important}.materialize-red.darken-1{background-color:#d0181e!important}.materialize-red-text.text-darken-1{color:#d0181e!important}.materialize-red.darken-2{background-color:#b9151b!important}.materialize-red-text.text-darken-2{color:#b9151b!important}.materialize-red.darken-3{background-color:#a21318!important}.materialize-red-text.text-darken-3{color:#a21318!important}.materialize-red.darken-4{background-color:#8b1014!important}.materialize-red-text.text-darken-4{color:#8b1014!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.red.lighten-5{background-color:#ffebee!important}.red-text.text-lighten-5{color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red-text.text-lighten-4{color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red-text.text-lighten-3{color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red-text.text-lighten-2{color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red-text.text-lighten-1{color:#ef5350!important}.red.darken-1{background-color:#e53935!important}.red-text.text-darken-1{color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red-text.text-darken-2{color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red-text.text-darken-3{color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red-text.text-darken-4{color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red-text.text-accent-1{color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red-text.text-accent-2{color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red-text.text-accent-3{color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.red-text.text-accent-4{color:#d50000!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.pink.lighten-5{background-color:#fce4ec!important}.pink-text.text-lighten-5{color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink-text.text-lighten-4{color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink-text.text-lighten-3{color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink-text.text-lighten-2{color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink-text.text-lighten-1{color:#ec407a!important}.pink.darken-1{background-color:#d81b60!important}.pink-text.text-darken-1{color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink-text.text-darken-2{color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink-text.text-darken-3{color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink-text.text-darken-4{color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink-text.text-accent-1{color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink-text.text-accent-2{color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink-text.text-accent-3{color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.pink-text.text-accent-4{color:#c51162!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple-text.text-lighten-5{color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple-text.text-lighten-4{color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple-text.text-lighten-3{color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple-text.text-lighten-2{color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple-text.text-lighten-1{color:#ab47bc!important}.purple.darken-1{background-color:#8e24aa!important}.purple-text.text-darken-1{color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple-text.text-darken-2{color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple-text.text-darken-3{color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple-text.text-darken-4{color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple-text.text-accent-1{color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple-text.text-accent-2{color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple-text.text-accent-3{color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.purple-text.text-accent-4{color:#a0f!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple-text.text-lighten-5{color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple-text.text-lighten-4{color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple-text.text-lighten-3{color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple-text.text-lighten-2{color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple-text.text-lighten-1{color:#7e57c2!important}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple-text.text-darken-1{color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple-text.text-darken-2{color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple-text.text-darken-3{color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple-text.text-darken-4{color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple-text.text-accent-1{color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple-text.text-accent-2{color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple-text.text-accent-3{color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.deep-purple-text.text-accent-4{color:#6200ea!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo-text.text-lighten-5{color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo-text.text-lighten-4{color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo-text.text-lighten-3{color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo-text.text-lighten-2{color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo-text.text-lighten-1{color:#5c6bc0!important}.indigo.darken-1{background-color:#3949ab!important}.indigo-text.text-darken-1{color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo-text.text-darken-2{color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo-text.text-darken-3{color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo-text.text-darken-4{color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo-text.text-accent-1{color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo-text.text-accent-2{color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo-text.text-accent-3{color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.indigo-text.text-accent-4{color:#304ffe!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue-text.text-lighten-5{color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue-text.text-lighten-4{color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue-text.text-lighten-3{color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue-text.text-lighten-2{color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue-text.text-lighten-1{color:#42a5f5!important}.blue.darken-1{background-color:#1e88e5!important}.blue-text.text-darken-1{color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue-text.text-darken-2{color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue-text.text-darken-3{color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue-text.text-darken-4{color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue-text.text-accent-1{color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue-text.text-accent-2{color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue-text.text-accent-3{color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.blue-text.text-accent-4{color:#2962ff!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue-text.text-lighten-5{color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue-text.text-lighten-4{color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue-text.text-lighten-3{color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue-text.text-lighten-2{color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue-text.text-lighten-1{color:#29b6f6!important}.light-blue.darken-1{background-color:#039be5!important}.light-blue-text.text-darken-1{color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue-text.text-darken-2{color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue-text.text-darken-3{color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue-text.text-darken-4{color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue-text.text-accent-1{color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue-text.text-accent-2{color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue-text.text-accent-3{color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.light-blue-text.text-accent-4{color:#0091ea!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan-text.text-lighten-5{color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan-text.text-lighten-4{color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan-text.text-lighten-3{color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan-text.text-lighten-2{color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan-text.text-lighten-1{color:#26c6da!important}.cyan.darken-1{background-color:#00acc1!important}.cyan-text.text-darken-1{color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan-text.text-darken-2{color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan-text.text-darken-3{color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan-text.text-darken-4{color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan-text.text-accent-1{color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan-text.text-accent-2{color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan-text.text-accent-3{color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.cyan-text.text-accent-4{color:#00b8d4!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal-text.text-lighten-5{color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal-text.text-lighten-4{color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal-text.text-lighten-3{color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal-text.text-lighten-2{color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal-text.text-lighten-1{color:#26a69a!important}.teal.darken-1{background-color:#00897b!important}.teal-text.text-darken-1{color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal-text.text-darken-2{color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal-text.text-darken-3{color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal-text.text-darken-4{color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal-text.text-accent-1{color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal-text.text-accent-2{color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal-text.text-accent-3{color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.teal-text.text-accent-4{color:#00bfa5!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.green.lighten-5{background-color:#e8f5e9!important}.green-text.text-lighten-5{color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green-text.text-lighten-4{color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green-text.text-lighten-3{color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green-text.text-lighten-2{color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green-text.text-lighten-1{color:#66bb6a!important}.green.darken-1{background-color:#43a047!important}.green-text.text-darken-1{color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green-text.text-darken-2{color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green-text.text-darken-3{color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green-text.text-darken-4{color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green-text.text-accent-1{color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green-text.text-accent-2{color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green-text.text-accent-3{color:#00e676!important}.green.accent-4{background-color:#00c853!important}.green-text.text-accent-4{color:#00c853!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green-text.text-lighten-5{color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green-text.text-lighten-4{color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green-text.text-lighten-3{color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green-text.text-lighten-2{color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green-text.text-lighten-1{color:#9ccc65!important}.light-green.darken-1{background-color:#7cb342!important}.light-green-text.text-darken-1{color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green-text.text-darken-2{color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green-text.text-darken-3{color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green-text.text-darken-4{color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green-text.text-accent-1{color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green-text.text-accent-2{color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green-text.text-accent-3{color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.light-green-text.text-accent-4{color:#64dd17!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime-text.text-lighten-5{color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime-text.text-lighten-4{color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime-text.text-lighten-3{color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime-text.text-lighten-2{color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime-text.text-lighten-1{color:#d4e157!important}.lime.darken-1{background-color:#c0ca33!important}.lime-text.text-darken-1{color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime-text.text-darken-2{color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime-text.text-darken-3{color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime-text.text-darken-4{color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime-text.text-accent-1{color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime-text.text-accent-2{color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime-text.text-accent-3{color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.lime-text.text-accent-4{color:#aeea00!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow-text.text-lighten-5{color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow-text.text-lighten-4{color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow-text.text-lighten-3{color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow-text.text-lighten-2{color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow-text.text-lighten-1{color:#ffee58!important}.yellow.darken-1{background-color:#fdd835!important}.yellow-text.text-darken-1{color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow-text.text-darken-2{color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow-text.text-darken-3{color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow-text.text-darken-4{color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow-text.text-accent-1{color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow-text.text-accent-2{color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow-text.text-accent-3{color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.yellow-text.text-accent-4{color:#ffd600!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.amber.lighten-5{background-color:#fff8e1!important}.amber-text.text-lighten-5{color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber-text.text-lighten-4{color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber-text.text-lighten-3{color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber-text.text-lighten-2{color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber-text.text-lighten-1{color:#ffca28!important}.amber.darken-1{background-color:#ffb300!important}.amber-text.text-darken-1{color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber-text.text-darken-2{color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber-text.text-darken-3{color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber-text.text-darken-4{color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber-text.text-accent-1{color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber-text.text-accent-2{color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber-text.text-accent-3{color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.amber-text.text-accent-4{color:#ffab00!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.orange.lighten-5{background-color:#fff3e0!important}.orange-text.text-lighten-5{color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange-text.text-lighten-4{color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange-text.text-lighten-3{color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange-text.text-lighten-2{color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange-text.text-lighten-1{color:#ffa726!important}.orange.darken-1{background-color:#fb8c00!important}.orange-text.text-darken-1{color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange-text.text-darken-2{color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange-text.text-darken-3{color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange-text.text-darken-4{color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange-text.text-accent-1{color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange-text.text-accent-2{color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange-text.text-accent-3{color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.orange-text.text-accent-4{color:#ff6d00!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange-text.text-lighten-5{color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange-text.text-lighten-4{color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange-text.text-lighten-3{color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange-text.text-lighten-2{color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange-text.text-lighten-1{color:#ff7043!important}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange-text.text-darken-1{color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange-text.text-darken-2{color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange-text.text-darken-3{color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange-text.text-darken-4{color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange-text.text-accent-1{color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange-text.text-accent-2{color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange-text.text-accent-3{color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.deep-orange-text.text-accent-4{color:#dd2c00!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.brown.lighten-5{background-color:#efebe9!important}.brown-text.text-lighten-5{color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown-text.text-lighten-4{color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown-text.text-lighten-3{color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown-text.text-lighten-2{color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown-text.text-lighten-1{color:#8d6e63!important}.brown.darken-1{background-color:#6d4c41!important}.brown-text.text-darken-1{color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown-text.text-darken-2{color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown-text.text-darken-3{color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.brown-text.text-darken-4{color:#3e2723!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey-text.text-lighten-5{color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey-text.text-lighten-4{color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey-text.text-lighten-3{color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey-text.text-lighten-2{color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey-text.text-lighten-1{color:#78909c!important}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey-text.text-darken-1{color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey-text.text-darken-2{color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey-text.text-darken-3{color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.blue-grey-text.text-darken-4{color:#263238!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.grey.lighten-5{background-color:#fafafa!important}.grey-text.text-lighten-5{color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey-text.text-lighten-4{color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey-text.text-lighten-3{color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey-text.text-lighten-2{color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey-text.text-lighten-1{color:#bdbdbd!important}.grey.darken-1{background-color:#757575!important}.grey-text.text-darken-1{color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey-text.text-darken-2{color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey-text.text-darken-3{color:#424242!important}.grey.darken-4{background-color:#212121!important}.grey-text.text-darken-4{color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.white{background-color:#fff!important}.white-text{color:#fff!important}.transparent{background-color:#0000!important}.transparent-text{color:#0000!important}/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;-moz-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}button,input,optgroup,select,textarea{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}ul:not(.browser-default){padding-left:0;list-style-type:none}ul:not(.browser-default)>li{list-style-type:none}a{color:#039be5;text-decoration:none;-webkit-tap-highlight-color:transparent}.valign-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.clearfix{clear:both}.z-depth-0{-webkit-box-shadow:none!important;box-shadow:none!important}.z-depth-1,nav,.card-panel,.card,.toast,.btn,.btn-large,.btn-small,.btn-floating,.dropdown-content,.collapsible,.sidenav{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px #00000024,0 3px 1px -2px #0000001f,0 1px 5px #0003}.z-depth-1-half,.btn:hover,.btn-large:hover,.btn-small:hover,.btn-floating:hover{-webkit-box-shadow:0 3px 3px 0 rgba(0,0,0,.14),0 1px 7px 0 rgba(0,0,0,.12),0 3px 1px -1px rgba(0,0,0,.2);box-shadow:0 3px 3px #00000024,0 1px 7px #0000001f,0 3px 1px -1px #0003}.z-depth-2{-webkit-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.3);box-shadow:0 4px 5px #00000024,0 1px 10px #0000001f,0 2px 4px -1px #0000004d}.z-depth-3{-webkit-box-shadow:0 8px 17px 2px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2);box-shadow:0 8px 17px 2px #00000024,0 3px 14px 2px #0000001f,0 5px 5px -3px #0003}.z-depth-4{-webkit-box-shadow:0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -7px rgba(0,0,0,.2);box-shadow:0 16px 24px 2px #00000024,0 6px 30px 5px #0000001f,0 8px 10px -7px #0003}.z-depth-5,.modal{-webkit-box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2);box-shadow:0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f,0 11px 15px -7px #0003}.hoverable{-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s}.hoverable:hover{-webkit-box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 8px 17px #0003,0 6px 20px #00000030}.divider{height:1px;overflow:hidden;background-color:#e0e0e0}blockquote{margin:20px 0;padding-left:1.5rem;border-left:5px solid #ee6e73}i{line-height:inherit}i.left{float:left;margin-right:15px}i.right{float:right;margin-left:15px}i.tiny{font-size:1rem}i.small{font-size:2rem}i.medium{font-size:4rem}i.large{font-size:6rem}img.responsive-img,video.responsive-video{max-width:100%;height:auto}.pagination li{display:inline-block;border-radius:2px;text-align:center;vertical-align:top;height:30px}.pagination li a{color:#444;display:inline-block;font-size:1.2rem;padding:0 10px;line-height:30px}.pagination li.active a{color:#fff}.pagination li.active{background-color:#ee6e73}.pagination li.disabled a{cursor:default;color:#999}.pagination li i{font-size:2rem}.pagination li.pages ul li{display:inline-block;float:none}@media only screen and (max-width: 992px){.pagination{width:100%}.pagination li.prev,.pagination li.next{width:10%}.pagination li.pages{width:80%;overflow:hidden;white-space:nowrap}}.breadcrumb{font-size:18px;color:#ffffffb3}.breadcrumb i,.breadcrumb [class^=mdi-],.breadcrumb [class*=mdi-],.breadcrumb i.material-icons{display:inline-block;float:left;font-size:24px}.breadcrumb:before{content:"\\e5cc";color:#ffffffb3;vertical-align:top;display:inline-block;font-family:Material Icons;font-weight:400;font-style:normal;font-size:25px;margin:0 10px 0 8px;-webkit-font-smoothing:antialiased}.breadcrumb:first-child:before{display:none}.breadcrumb:last-child{color:#fff}.parallax-container{position:relative;overflow:hidden;height:500px}.parallax-container .parallax{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.parallax-container .parallax img{opacity:0;position:absolute;left:50%;bottom:0;min-width:100%;min-height:100%;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);-webkit-transform:translateX(-50%);transform:translate(-50%)}.pin-top,.pin-bottom{position:relative}.pinned{position:fixed!important}ul.staggered-list li{opacity:0}.fade-in{opacity:0;-webkit-transform-origin:0 50%;transform-origin:0 50%}@media only screen and (max-width: 600px){.hide-on-small-only,.hide-on-small-and-down{display:none!important}}@media only screen and (max-width: 992px){.hide-on-med-and-down{display:none!important}}@media only screen and (min-width: 601px){.hide-on-med-and-up{display:none!important}}@media only screen and (min-width: 600px) and (max-width: 992px){.hide-on-med-only{display:none!important}}@media only screen and (min-width: 993px){.hide-on-large-only{display:none!important}}@media only screen and (min-width: 1201px){.hide-on-extra-large-only{display:none!important}}@media only screen and (min-width: 1201px){.show-on-extra-large{display:block!important}}@media only screen and (min-width: 993px){.show-on-large{display:block!important}}@media only screen and (min-width: 600px) and (max-width: 992px){.show-on-medium{display:block!important}}@media only screen and (max-width: 600px){.show-on-small{display:block!important}}@media only screen and (min-width: 601px){.show-on-medium-and-up{display:block!important}}@media only screen and (max-width: 992px){.show-on-medium-and-down{display:block!important}}@media only screen and (max-width: 600px){.center-on-small-only{text-align:center}}.page-footer{padding-top:20px;color:#fff;background-color:#ee6e73}.page-footer .footer-copyright{overflow:hidden;min-height:50px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:10px 0;color:#fffc;background-color:#33333314}table,th,td{border:none}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:none}table.striped>tbody>tr:nth-child(odd){background-color:#f2f2f280}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{-webkit-transition:background-color .25s ease;transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:#f2f2f280}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width: 992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:"\\a0"}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th:before{content:"\\a0"}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:none;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,.12)}}.collection{margin:.5rem 0 1rem;border:1px solid #e0e0e0;border-radius:2px;overflow:hidden;position:relative}.collection .collection-item{background-color:#fff;line-height:1.5rem;padding:10px 20px;margin:0;border-bottom:1px solid #e0e0e0}.collection .collection-item.avatar{min-height:84px;padding-left:72px;position:relative}.collection .collection-item.avatar:not(.circle-clipper)>.circle,.collection .collection-item.avatar :not(.circle-clipper)>.circle{position:absolute;width:42px;height:42px;overflow:hidden;left:15px;display:inline-block;vertical-align:middle}.collection .collection-item.avatar i.circle{font-size:18px;line-height:42px;color:#fff;background-color:#999;text-align:center}.collection .collection-item.avatar .title{font-size:16px}.collection .collection-item.avatar p{margin:0}.collection .collection-item.avatar .secondary-content{position:absolute;top:16px;right:16px}.collection .collection-item:last-child{border-bottom:none}.collection .collection-item.active{background-color:#26a69a;color:#eafaf9}.collection .collection-item.active .secondary-content{color:#fff}.collection a.collection-item{display:block;-webkit-transition:.25s;transition:.25s;color:#26a69a}.collection a.collection-item:not(.active):hover{background-color:#ddd}.collection.with-header .collection-header{background-color:#fff;border-bottom:1px solid #e0e0e0;padding:10px 20px}.collection.with-header .collection-item{padding-left:30px}.collection.with-header .collection-item.avatar{padding-left:72px}.secondary-content{float:right;color:#26a69a}.collapsible .collection{margin:0;border:none}.video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container iframe,.video-container object,.video-container embed{position:absolute;top:0;left:0;width:100%;height:100%}.progress{position:relative;height:4px;display:block;width:100%;background-color:#acece6;border-radius:2px;margin:.5rem 0 1rem;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;-webkit-transition:width .3s linear;transition:width .3s linear}.progress .indeterminate{background-color:#26a69a}.progress .indeterminate:before{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite;animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.progress .indeterminate:after{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;-webkit-animation-delay:1.15s;animation-delay:1.15s}@-webkit-keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@-webkit-keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}.hide{display:none!important}.left-align{text-align:left}.right-align{text-align:right}.center,.center-align{text-align:center}.left{float:left!important}.right{float:right!important}.no-select,input[type=range],input[type=range]+.thumb{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.circle{border-radius:50%}.center-block{display:block;margin-left:auto;margin-right:auto}.truncate{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.no-padding{padding:0!important}span.badge{min-width:3rem;padding:0 6px;margin-left:14px;text-align:center;font-size:1rem;line-height:22px;height:22px;color:#757575;float:right;-webkit-box-sizing:border-box;box-sizing:border-box}span.badge.new{font-weight:300;font-size:.8rem;color:#fff;background-color:#26a69a;border-radius:2px}span.badge.new:after{content:" new"}span.badge[data-badge-caption]:after{content:" " attr(data-badge-caption)}nav ul a span.badge{display:inline-block;float:none;margin-left:4px;line-height:22px;height:22px;-webkit-font-smoothing:auto}.collection-item span.badge{margin-top:calc(.75rem - 11px)}.collapsible span.badge{margin-left:auto}.sidenav span.badge{margin-top:13px}table span.badge{display:inline-block;float:none;margin-left:auto}.material-icons{text-rendering:optimizeLegibility;-webkit-font-feature-settings:"liga";-moz-font-feature-settings:"liga";font-feature-settings:"liga"}.container{margin:0 auto;max-width:1280px;width:90%}@media only screen and (min-width: 601px){.container{width:85%}}@media only screen and (min-width: 993px){.container{width:70%}}.col .row{margin-left:-.75rem;margin-right:-.75rem}.section{padding-top:1rem;padding-bottom:1rem}.section.no-pad{padding:0}.section.no-pad-bot{padding-bottom:0}.section.no-pad-top{padding-top:0}.row{margin-left:auto;margin-right:auto;margin-bottom:20px}.row:after{content:"";display:table;clear:both}.row .col{float:left;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 .75rem;min-height:1px}.row .col[class*=push-],.row .col[class*=pull-]{position:relative}.row .col.s1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.s10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-s1{margin-left:8.3333333333%}.row .col.pull-s1{right:8.3333333333%}.row .col.push-s1{left:8.3333333333%}.row .col.offset-s2{margin-left:16.6666666667%}.row .col.pull-s2{right:16.6666666667%}.row .col.push-s2{left:16.6666666667%}.row .col.offset-s3{margin-left:25%}.row .col.pull-s3{right:25%}.row .col.push-s3{left:25%}.row .col.offset-s4{margin-left:33.3333333333%}.row .col.pull-s4{right:33.3333333333%}.row .col.push-s4{left:33.3333333333%}.row .col.offset-s5{margin-left:41.6666666667%}.row .col.pull-s5{right:41.6666666667%}.row .col.push-s5{left:41.6666666667%}.row .col.offset-s6{margin-left:50%}.row .col.pull-s6{right:50%}.row .col.push-s6{left:50%}.row .col.offset-s7{margin-left:58.3333333333%}.row .col.pull-s7{right:58.3333333333%}.row .col.push-s7{left:58.3333333333%}.row .col.offset-s8{margin-left:66.6666666667%}.row .col.pull-s8{right:66.6666666667%}.row .col.push-s8{left:66.6666666667%}.row .col.offset-s9{margin-left:75%}.row .col.pull-s9{right:75%}.row .col.push-s9{left:75%}.row .col.offset-s10{margin-left:83.3333333333%}.row .col.pull-s10{right:83.3333333333%}.row .col.push-s10{left:83.3333333333%}.row .col.offset-s11{margin-left:91.6666666667%}.row .col.pull-s11{right:91.6666666667%}.row .col.push-s11{left:91.6666666667%}.row .col.offset-s12{margin-left:100%}.row .col.pull-s12{right:100%}.row .col.push-s12{left:100%}@media only screen and (min-width: 601px){.row .col.m1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.m4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.m7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.m10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-m1{margin-left:8.3333333333%}.row .col.pull-m1{right:8.3333333333%}.row .col.push-m1{left:8.3333333333%}.row .col.offset-m2{margin-left:16.6666666667%}.row .col.pull-m2{right:16.6666666667%}.row .col.push-m2{left:16.6666666667%}.row .col.offset-m3{margin-left:25%}.row .col.pull-m3{right:25%}.row .col.push-m3{left:25%}.row .col.offset-m4{margin-left:33.3333333333%}.row .col.pull-m4{right:33.3333333333%}.row .col.push-m4{left:33.3333333333%}.row .col.offset-m5{margin-left:41.6666666667%}.row .col.pull-m5{right:41.6666666667%}.row .col.push-m5{left:41.6666666667%}.row .col.offset-m6{margin-left:50%}.row .col.pull-m6{right:50%}.row .col.push-m6{left:50%}.row .col.offset-m7{margin-left:58.3333333333%}.row .col.pull-m7{right:58.3333333333%}.row .col.push-m7{left:58.3333333333%}.row .col.offset-m8{margin-left:66.6666666667%}.row .col.pull-m8{right:66.6666666667%}.row .col.push-m8{left:66.6666666667%}.row .col.offset-m9{margin-left:75%}.row .col.pull-m9{right:75%}.row .col.push-m9{left:75%}.row .col.offset-m10{margin-left:83.3333333333%}.row .col.pull-m10{right:83.3333333333%}.row .col.push-m10{left:83.3333333333%}.row .col.offset-m11{margin-left:91.6666666667%}.row .col.pull-m11{right:91.6666666667%}.row .col.push-m11{left:91.6666666667%}.row .col.offset-m12{margin-left:100%}.row .col.pull-m12{right:100%}.row .col.push-m12{left:100%}}@media only screen and (min-width: 993px){.row .col.l1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.l4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.l7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.l10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-l1{margin-left:8.3333333333%}.row .col.pull-l1{right:8.3333333333%}.row .col.push-l1{left:8.3333333333%}.row .col.offset-l2{margin-left:16.6666666667%}.row .col.pull-l2{right:16.6666666667%}.row .col.push-l2{left:16.6666666667%}.row .col.offset-l3{margin-left:25%}.row .col.pull-l3{right:25%}.row .col.push-l3{left:25%}.row .col.offset-l4{margin-left:33.3333333333%}.row .col.pull-l4{right:33.3333333333%}.row .col.push-l4{left:33.3333333333%}.row .col.offset-l5{margin-left:41.6666666667%}.row .col.pull-l5{right:41.6666666667%}.row .col.push-l5{left:41.6666666667%}.row .col.offset-l6{margin-left:50%}.row .col.pull-l6{right:50%}.row .col.push-l6{left:50%}.row .col.offset-l7{margin-left:58.3333333333%}.row .col.pull-l7{right:58.3333333333%}.row .col.push-l7{left:58.3333333333%}.row .col.offset-l8{margin-left:66.6666666667%}.row .col.pull-l8{right:66.6666666667%}.row .col.push-l8{left:66.6666666667%}.row .col.offset-l9{margin-left:75%}.row .col.pull-l9{right:75%}.row .col.push-l9{left:75%}.row .col.offset-l10{margin-left:83.3333333333%}.row .col.pull-l10{right:83.3333333333%}.row .col.push-l10{left:83.3333333333%}.row .col.offset-l11{margin-left:91.6666666667%}.row .col.pull-l11{right:91.6666666667%}.row .col.push-l11{left:91.6666666667%}.row .col.offset-l12{margin-left:100%}.row .col.pull-l12{right:100%}.row .col.push-l12{left:100%}}@media only screen and (min-width: 1201px){.row .col.xl1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.xl4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.xl7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.xl10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-xl1{margin-left:8.3333333333%}.row .col.pull-xl1{right:8.3333333333%}.row .col.push-xl1{left:8.3333333333%}.row .col.offset-xl2{margin-left:16.6666666667%}.row .col.pull-xl2{right:16.6666666667%}.row .col.push-xl2{left:16.6666666667%}.row .col.offset-xl3{margin-left:25%}.row .col.pull-xl3{right:25%}.row .col.push-xl3{left:25%}.row .col.offset-xl4{margin-left:33.3333333333%}.row .col.pull-xl4{right:33.3333333333%}.row .col.push-xl4{left:33.3333333333%}.row .col.offset-xl5{margin-left:41.6666666667%}.row .col.pull-xl5{right:41.6666666667%}.row .col.push-xl5{left:41.6666666667%}.row .col.offset-xl6{margin-left:50%}.row .col.pull-xl6{right:50%}.row .col.push-xl6{left:50%}.row .col.offset-xl7{margin-left:58.3333333333%}.row .col.pull-xl7{right:58.3333333333%}.row .col.push-xl7{left:58.3333333333%}.row .col.offset-xl8{margin-left:66.6666666667%}.row .col.pull-xl8{right:66.6666666667%}.row .col.push-xl8{left:66.6666666667%}.row .col.offset-xl9{margin-left:75%}.row .col.pull-xl9{right:75%}.row .col.push-xl9{left:75%}.row .col.offset-xl10{margin-left:83.3333333333%}.row .col.pull-xl10{right:83.3333333333%}.row .col.push-xl10{left:83.3333333333%}.row .col.offset-xl11{margin-left:91.6666666667%}.row .col.pull-xl11{right:91.6666666667%}.row .col.push-xl11{left:91.6666666667%}.row .col.offset-xl12{margin-left:100%}.row .col.pull-xl12{right:100%}.row .col.push-xl12{left:100%}}nav{color:#fff;background-color:#ee6e73;width:100%;height:56px;line-height:56px}nav.nav-extended{height:auto}nav.nav-extended .nav-wrapper{min-height:56px;height:auto}nav.nav-extended .nav-content{position:relative;line-height:normal}nav a{color:#fff}nav i,nav [class^=mdi-],nav [class*=mdi-],nav i.material-icons{display:block;font-size:24px;height:56px;line-height:56px}nav .nav-wrapper{position:relative;height:100%}@media only screen and (min-width: 993px){nav a.sidenav-trigger{display:none}}nav .sidenav-trigger{float:left;position:relative;z-index:1;height:56px;margin:0 18px}nav .sidenav-trigger i{height:56px;line-height:56px}nav .brand-logo{position:absolute;color:#fff;display:inline-block;font-size:2.1rem;padding:0}nav .brand-logo.center{left:50%;-webkit-transform:translateX(-50%);transform:translate(-50%)}@media only screen and (max-width: 992px){nav .brand-logo{left:50%;-webkit-transform:translateX(-50%);transform:translate(-50%)}nav .brand-logo.left,nav .brand-logo.right{padding:0;-webkit-transform:none;transform:none}nav .brand-logo.left{left:.5rem}nav .brand-logo.right{right:.5rem;left:auto}}nav .brand-logo.right{right:.5rem;padding:0}nav .brand-logo i,nav .brand-logo [class^=mdi-],nav .brand-logo [class*=mdi-],nav .brand-logo i.material-icons{float:left;margin-right:15px}nav .nav-title{display:inline-block;font-size:32px;padding:28px 0}nav ul{margin:0}nav ul li{-webkit-transition:background-color .3s;transition:background-color .3s;float:left;padding:0}nav ul li.active{background-color:#0000001a}nav ul a{-webkit-transition:background-color .3s;transition:background-color .3s;font-size:1rem;color:#fff;display:block;padding:0 15px;cursor:pointer}nav ul a.btn,nav ul a.btn-large,nav ul a.btn-small,nav ul a.btn-large,nav ul a.btn-flat,nav ul a.btn-floating{margin-top:-2px;margin-left:15px;margin-right:15px}nav ul a.btn>.material-icons,nav ul a.btn-large>.material-icons,nav ul a.btn-small>.material-icons,nav ul a.btn-large>.material-icons,nav ul a.btn-flat>.material-icons,nav ul a.btn-floating>.material-icons{height:inherit;line-height:inherit}nav ul a:hover{background-color:#0000001a}nav ul.left{float:left}nav form{height:100%}nav .input-field{margin:0;height:100%}nav .input-field input{height:100%;font-size:1.2rem;border:none;padding-left:2rem}nav .input-field input:focus,nav .input-field input[type=text]:valid,nav .input-field input[type=password]:valid,nav .input-field input[type=email]:valid,nav .input-field input[type=url]:valid,nav .input-field input[type=date]:valid{border:none;-webkit-box-shadow:none;box-shadow:none}nav .input-field label{top:0;left:0}nav .input-field label i{color:#ffffffb3;-webkit-transition:color .3s;transition:color .3s}nav .input-field label.active i{color:#fff}.navbar-fixed{position:relative;height:56px;z-index:997}.navbar-fixed nav{position:fixed}@media only screen and (min-width: 601px){nav.nav-extended .nav-wrapper{min-height:64px}nav,nav .nav-wrapper i,nav a.sidenav-trigger,nav a.sidenav-trigger i{height:64px;line-height:64px}.navbar-fixed{height:64px}}a{text-decoration:none}html{line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-weight:400;color:#000000de}@media only screen and (min-width: 0){html{font-size:14px}}@media only screen and (min-width: 992px){html{font-size:14.5px}}@media only screen and (min-width: 1200px){html{font-size:15px}}h1,h2,h3,h4,h5,h6{font-weight:400;line-height:1.3}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}h1{font-size:4.2rem;line-height:110%;margin:2.8rem 0 1.68rem}h2{font-size:3.56rem;line-height:110%;margin:2.3733333333rem 0 1.424rem}h3{font-size:2.92rem;line-height:110%;margin:1.9466666667rem 0 1.168rem}h4{font-size:2.28rem;line-height:110%;margin:1.52rem 0 .912rem}h5{font-size:1.64rem;line-height:110%;margin:1.0933333333rem 0 .656rem}h6{font-size:1.15rem;line-height:110%;margin:.7666666667rem 0 .46rem}em{font-style:italic}strong{font-weight:500}small{font-size:75%}.light{font-weight:300}.thin{font-weight:200}@media only screen and (min-width: 360px){.flow-text{font-size:1.2rem}}@media only screen and (min-width: 390px){.flow-text{font-size:1.224rem}}@media only screen and (min-width: 420px){.flow-text{font-size:1.248rem}}@media only screen and (min-width: 450px){.flow-text{font-size:1.272rem}}@media only screen and (min-width: 480px){.flow-text{font-size:1.296rem}}@media only screen and (min-width: 510px){.flow-text{font-size:1.32rem}}@media only screen and (min-width: 540px){.flow-text{font-size:1.344rem}}@media only screen and (min-width: 570px){.flow-text{font-size:1.368rem}}@media only screen and (min-width: 600px){.flow-text{font-size:1.392rem}}@media only screen and (min-width: 630px){.flow-text{font-size:1.416rem}}@media only screen and (min-width: 660px){.flow-text{font-size:1.44rem}}@media only screen and (min-width: 690px){.flow-text{font-size:1.464rem}}@media only screen and (min-width: 720px){.flow-text{font-size:1.488rem}}@media only screen and (min-width: 750px){.flow-text{font-size:1.512rem}}@media only screen and (min-width: 780px){.flow-text{font-size:1.536rem}}@media only screen and (min-width: 810px){.flow-text{font-size:1.56rem}}@media only screen and (min-width: 840px){.flow-text{font-size:1.584rem}}@media only screen and (min-width: 870px){.flow-text{font-size:1.608rem}}@media only screen and (min-width: 900px){.flow-text{font-size:1.632rem}}@media only screen and (min-width: 930px){.flow-text{font-size:1.656rem}}@media only screen and (min-width: 960px){.flow-text{font-size:1.68rem}}@media only screen and (max-width: 360px){.flow-text{font-size:1.2rem}}.scale-transition{-webkit-transition:-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:transform .3s cubic-bezier(.53,.01,.36,1.63),-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important}.scale-transition.scale-out{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .2s!important;transition:-webkit-transform .2s!important;transition:transform .2s!important;transition:transform .2s,-webkit-transform .2s!important}.scale-transition.scale-in{-webkit-transform:scale(1);transform:scale(1)}.card-panel{-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s;padding:24px;margin:.5rem 0 1rem;border-radius:2px;background-color:#fff}.card{position:relative;margin:.5rem 0 1rem;background-color:#fff;-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s;border-radius:2px}.card .card-title{font-size:24px;font-weight:300}.card .card-title.activator{cursor:pointer}.card.small,.card.medium,.card.large{position:relative}.card.small .card-image,.card.medium .card-image,.card.large .card-image{max-height:60%;overflow:hidden}.card.small .card-image+.card-content,.card.medium .card-image+.card-content,.card.large .card-image+.card-content{max-height:40%}.card.small .card-content,.card.medium .card-content,.card.large .card-content{max-height:100%;overflow:hidden}.card.small .card-action,.card.medium .card-action,.card.large .card-action{position:absolute;bottom:0;left:0;right:0}.card.small{height:300px}.card.medium{height:400px}.card.large{height:500px}.card.horizontal{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.card.horizontal.small .card-image,.card.horizontal.medium .card-image,.card.horizontal.large .card-image{height:100%;max-height:none;overflow:visible}.card.horizontal.small .card-image img,.card.horizontal.medium .card-image img,.card.horizontal.large .card-image img{height:100%}.card.horizontal .card-image{max-width:50%}.card.horizontal .card-image img{border-radius:2px 0 0 2px;max-width:100%;width:auto}.card.horizontal .card-stacked{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative}.card.horizontal .card-stacked .card-content{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.card.sticky-action .card-action{z-index:2}.card.sticky-action .card-reveal{z-index:1;padding-bottom:64px}.card .card-image{position:relative}.card .card-image img{display:block;border-radius:2px 2px 0 0;position:relative;left:0;right:0;top:0;bottom:0;width:100%}.card .card-image .card-title{color:#fff;position:absolute;bottom:0;left:0;max-width:100%;padding:24px}.card .card-content{padding:24px;border-radius:0 0 2px 2px}.card .card-content p{margin:0}.card .card-content .card-title{display:block;line-height:32px;margin-bottom:8px}.card .card-content .card-title i{line-height:32px}.card .card-action{background-color:inherit;border-top:1px solid rgba(160,160,160,.2);position:relative;padding:16px 24px}.card .card-action:last-child{border-radius:0 0 2px 2px}.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating){color:#ffab40;margin-right:24px;-webkit-transition:color .3s ease;transition:color .3s ease;text-transform:uppercase}.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating):hover{color:#ffd8a6}.card .card-reveal{padding:24px;position:absolute;background-color:#fff;width:100%;overflow-y:auto;left:0;top:100%;height:100%;z-index:3;display:none}.card .card-reveal .card-title{cursor:pointer;display:block}#toast-container{display:block;position:fixed;z-index:10000}@media only screen and (max-width: 600px){#toast-container{min-width:100%;bottom:0%}}@media only screen and (min-width: 601px) and (max-width: 992px){#toast-container{left:5%;bottom:7%;max-width:90%}}@media only screen and (min-width: 993px){#toast-container{top:10%;right:7%;max-width:86%}}.toast{border-radius:2px;top:35px;width:auto;margin-top:10px;position:relative;max-width:100%;height:auto;min-height:48px;line-height:1.5em;background-color:#323232;padding:10px 25px;font-size:1.1rem;font-weight:300;color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;cursor:default}.toast .toast-action{color:#eeff41;font-weight:500;margin-right:-25px;margin-left:3rem}.toast.rounded{border-radius:24px}@media only screen and (max-width: 600px){.toast{width:100%;border-radius:0}}.tabs{position:relative;overflow-x:auto;overflow-y:hidden;height:48px;width:100%;background-color:#fff;margin:0 auto;white-space:nowrap}.tabs.tabs-transparent{background-color:transparent}.tabs.tabs-transparent .tab a,.tabs.tabs-transparent .tab.disabled a,.tabs.tabs-transparent .tab.disabled a:hover{color:#ffffffb3}.tabs.tabs-transparent .tab a:hover,.tabs.tabs-transparent .tab a.active{color:#fff}.tabs.tabs-transparent .indicator{background-color:#fff}.tabs.tabs-fixed-width{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.tabs.tabs-fixed-width .tab{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.tabs .tab{display:inline-block;text-align:center;line-height:48px;height:48px;padding:0;margin:0;text-transform:uppercase}.tabs .tab a{color:#ee6e73b3;display:block;width:100%;height:100%;padding:0 24px;font-size:14px;text-overflow:ellipsis;overflow:hidden;-webkit-transition:color .28s ease,background-color .28s ease;transition:color .28s ease,background-color .28s ease}.tabs .tab a:focus,.tabs .tab a:focus.active{background-color:#f6b2b533;outline:none}.tabs .tab a:hover,.tabs .tab a.active{background-color:transparent;color:#ee6e73}.tabs .tab.disabled a,.tabs .tab.disabled a:hover{color:#ee6e7366;cursor:default}.tabs .indicator{position:absolute;bottom:0;height:2px;background-color:#f6b2b5;will-change:left,right}@media only screen and (max-width: 992px){.tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.tabs .tab{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.tabs .tab a{padding:0 12px}}.material-tooltip{padding:10px 8px;font-size:1rem;z-index:2000;background-color:transparent;border-radius:2px;color:#fff;min-height:36px;line-height:120%;opacity:0;position:absolute;text-align:center;max-width:calc(100% - 4px);overflow:hidden;left:0;top:0;pointer-events:none;visibility:hidden;background-color:#323232}.backdrop{position:absolute;opacity:0;height:7px;width:14px;border-radius:0 0 50% 50%;background-color:#323232;z-index:-1;-webkit-transform-origin:50% 0%;transform-origin:50% 0%;visibility:hidden}.btn,.btn-large,.btn-small,.btn-flat{border:none;border-radius:2px;display:inline-block;height:36px;line-height:36px;padding:0 16px;text-transform:uppercase;vertical-align:middle;-webkit-tap-highlight-color:transparent}.btn.disabled,.disabled.btn-large,.disabled.btn-small,.btn-floating.disabled,.btn-large.disabled,.btn-small.disabled,.btn-flat.disabled,.btn:disabled,.btn-large:disabled,.btn-small:disabled,.btn-floating:disabled,.btn-large:disabled,.btn-small:disabled,.btn-flat:disabled,.btn[disabled],.btn-large[disabled],.btn-small[disabled],.btn-floating[disabled],.btn-large[disabled],.btn-small[disabled],.btn-flat[disabled]{pointer-events:none;background-color:#dfdfdf!important;-webkit-box-shadow:none;box-shadow:none;color:#9f9f9f!important;cursor:default}.btn.disabled:hover,.disabled.btn-large:hover,.disabled.btn-small:hover,.btn-floating.disabled:hover,.btn-large.disabled:hover,.btn-small.disabled:hover,.btn-flat.disabled:hover,.btn:disabled:hover,.btn-large:disabled:hover,.btn-small:disabled:hover,.btn-floating:disabled:hover,.btn-large:disabled:hover,.btn-small:disabled:hover,.btn-flat:disabled:hover,.btn[disabled]:hover,.btn-large[disabled]:hover,.btn-small[disabled]:hover,.btn-floating[disabled]:hover,.btn-large[disabled]:hover,.btn-small[disabled]:hover,.btn-flat[disabled]:hover{background-color:#dfdfdf!important;color:#9f9f9f!important}.btn,.btn-large,.btn-small,.btn-floating,.btn-large,.btn-small,.btn-flat{font-size:14px;outline:0}.btn i,.btn-large i,.btn-small i,.btn-floating i,.btn-large i,.btn-small i,.btn-flat i{font-size:1.3rem;line-height:inherit}.btn:focus,.btn-large:focus,.btn-small:focus,.btn-floating:focus{background-color:#1d7d74}.btn,.btn-large,.btn-small{text-decoration:none;color:#fff;background-color:#26a69a;text-align:center;letter-spacing:.5px;-webkit-transition:background-color .2s ease-out;transition:background-color .2s ease-out;cursor:pointer}.btn:hover,.btn-large:hover,.btn-small:hover{background-color:#2bbbad}.btn-floating{display:inline-block;color:#fff;position:relative;overflow:hidden;z-index:1;width:40px;height:40px;line-height:40px;padding:0;background-color:#26a69a;border-radius:50%;-webkit-transition:background-color .3s;transition:background-color .3s;cursor:pointer;vertical-align:middle}.btn-floating:hover{background-color:#26a69a}.btn-floating:before{border-radius:0}.btn-floating.btn-large{width:56px;height:56px;padding:0}.btn-floating.btn-large.halfway-fab{bottom:-28px}.btn-floating.btn-large i{line-height:56px}.btn-floating.btn-small{width:32.4px;height:32.4px}.btn-floating.btn-small.halfway-fab{bottom:-16.2px}.btn-floating.btn-small i{line-height:32.4px}.btn-floating.halfway-fab{position:absolute;right:24px;bottom:-20px}.btn-floating.halfway-fab.left{right:auto;left:24px}.btn-floating i{width:inherit;display:inline-block;text-align:center;color:#fff;font-size:1.6rem;line-height:40px}button.btn-floating{border:none}.fixed-action-btn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:997}.fixed-action-btn.active ul{visibility:visible}.fixed-action-btn.direction-left,.fixed-action-btn.direction-right{padding:0 0 0 15px}.fixed-action-btn.direction-left ul,.fixed-action-btn.direction-right ul{text-align:right;right:64px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:100%;left:auto;width:500px}.fixed-action-btn.direction-left ul li,.fixed-action-btn.direction-right ul li{display:inline-block;margin:7.5px 15px 0 0}.fixed-action-btn.direction-right{padding:0 15px 0 0}.fixed-action-btn.direction-right ul{text-align:left;direction:rtl;left:64px;right:auto}.fixed-action-btn.direction-right ul li{margin:7.5px 0 0 15px}.fixed-action-btn.direction-bottom{padding:0 0 15px}.fixed-action-btn.direction-bottom ul{top:64px;bottom:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.fixed-action-btn.direction-bottom ul li{margin:15px 0 0}.fixed-action-btn.toolbar{padding:0;height:56px}.fixed-action-btn.toolbar.active>a i{opacity:0}.fixed-action-btn.toolbar ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;top:0;bottom:0;z-index:1}.fixed-action-btn.toolbar ul li{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:inline-block;margin:0;height:100%;-webkit-transition:none;transition:none}.fixed-action-btn.toolbar ul li a{display:block;overflow:hidden;position:relative;width:100%;height:100%;background-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;line-height:56px;z-index:1}.fixed-action-btn.toolbar ul li a i{line-height:inherit}.fixed-action-btn ul{left:0;right:0;text-align:center;position:absolute;bottom:64px;margin:0;visibility:hidden}.fixed-action-btn ul li{margin-bottom:15px}.fixed-action-btn ul a.btn-floating{opacity:0}.fixed-action-btn .fab-backdrop{position:absolute;top:0;left:0;z-index:-1;width:40px;height:40px;background-color:#26a69a;border-radius:50%;-webkit-transform:scale(0);transform:scale(0)}.btn-flat{-webkit-box-shadow:none;box-shadow:none;background-color:transparent;color:#343434;cursor:pointer;-webkit-transition:background-color .2s;transition:background-color .2s}.btn-flat:focus,.btn-flat:hover{-webkit-box-shadow:none;box-shadow:none}.btn-flat:focus{background-color:#0000001a}.btn-flat.disabled,.btn-flat.btn-flat[disabled]{background-color:transparent!important;color:#b3b2b2!important;cursor:default}.btn-large{height:54px;line-height:54px;font-size:15px;padding:0 28px}.btn-large i{font-size:1.6rem}.btn-small{height:32.4px;line-height:32.4px;font-size:13px}.btn-small i{font-size:1.2rem}.btn-block{display:block}.dropdown-content{background-color:#fff;margin:0;display:none;min-width:100px;overflow-y:auto;opacity:0;position:absolute;left:0;top:0;z-index:9999;-webkit-transform-origin:0 0;transform-origin:0 0}.dropdown-content:focus{outline:0}.dropdown-content li{clear:both;color:#000000de;cursor:pointer;min-height:50px;line-height:1.5rem;width:100%;text-align:left}.dropdown-content li:hover,.dropdown-content li.active{background-color:#eee}.dropdown-content li:focus{outline:none}.dropdown-content li.divider{min-height:0;height:1px}.dropdown-content li>a,.dropdown-content li>span{font-size:16px;color:#26a69a;display:block;line-height:22px;padding:14px 16px}.dropdown-content li>span>label{top:1px;left:0;height:18px}.dropdown-content li>a>i{height:inherit;line-height:inherit;float:left;margin:0 24px 0 0;width:24px}body.keyboard-focused .dropdown-content li:focus{background-color:#dadada}.input-field.col .dropdown-content [type=checkbox]+label{top:1px;left:0;height:18px;-webkit-transform:none;transform:none}.dropdown-trigger{cursor:pointer}/*!
* Waves v0.6.0
* http://fian.my.id/Waves
*
* Copyright 2014 Alfiana E. Sibuea and other contributors
* Released under the MIT license
* https://github.com/fians/Waves/blob/master/LICENSE
*/.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:middle;z-index:1;-webkit-transition:.3s ease-out;transition:.3s ease-out}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:20px;height:20px;margin-top:-10px;margin-left:-10px;opacity:0;background:rgba(0,0,0,.2);-webkit-transition:all .7s ease-out;transition:all .7s ease-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transform:scale(0);transform:scale(0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background-color:#ffffff73}.waves-effect.waves-red .waves-ripple{background-color:#f44336b3}.waves-effect.waves-yellow .waves-ripple{background-color:#ffeb3bb3}.waves-effect.waves-orange .waves-ripple{background-color:#ff9800b3}.waves-effect.waves-purple .waves-ripple{background-color:#9c27b0b3}.waves-effect.waves-green .waves-ripple{background-color:#4caf50b3}.waves-effect.waves-teal .waves-ripple{background-color:#009688b3}.waves-effect input[type=button],.waves-effect input[type=reset],.waves-effect input[type=submit]{border:0;font-style:normal;font-size:inherit;text-transform:inherit;background:none}.waves-effect img{position:relative;z-index:-1}.waves-notransition{-webkit-transition:none!important;transition:none!important}.waves-circle{-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle,white 100%,black 100%)}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%;-webkit-mask-image:none}.waves-block{display:block}.waves-effect .waves-ripple{z-index:-1}.modal{display:none;position:fixed;left:0;right:0;background-color:#fafafa;padding:0;max-height:70%;width:55%;margin:auto;overflow-y:auto;border-radius:2px;will-change:top,opacity}.modal:focus{outline:none}@media only screen and (max-width: 992px){.modal{width:80%}}.modal h1,.modal h2,.modal h3,.modal h4{margin-top:0}.modal .modal-content{padding:24px}.modal .modal-close{cursor:pointer}.modal .modal-footer{border-radius:0 0 2px 2px;background-color:#fafafa;padding:4px 6px;height:56px;width:100%;text-align:right}.modal .modal-footer .btn,.modal .modal-footer .btn-large,.modal .modal-footer .btn-small,.modal .modal-footer .btn-flat{margin:6px 0}.modal-overlay{position:fixed;z-index:999;top:-25%;left:0;bottom:0;right:0;height:125%;width:100%;background:#000;display:none;will-change:opacity}.modal.modal-fixed-footer{padding:0;height:70%}.modal.modal-fixed-footer .modal-content{position:absolute;height:calc(100% - 56px);max-height:100%;width:100%;overflow-y:auto}.modal.modal-fixed-footer .modal-footer{border-top:1px solid rgba(0,0,0,.1);position:absolute;bottom:0}.modal.bottom-sheet{top:auto;bottom:-100%;margin:0;width:100%;max-height:45%;border-radius:0;will-change:bottom,opacity}.collapsible{border-top:1px solid #ddd;border-right:1px solid #ddd;border-left:1px solid #ddd;margin:.5rem 0 1rem}.collapsible-header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;cursor:pointer;-webkit-tap-highlight-color:transparent;line-height:1.5;padding:1rem;background-color:#fff;border-bottom:1px solid #ddd}.collapsible-header:focus{outline:0}.collapsible-header i{width:2rem;font-size:1.6rem;display:inline-block;text-align:center;margin-right:1rem}.keyboard-focused .collapsible-header:focus{background-color:#eee}.collapsible-body{display:none;border-bottom:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box;padding:2rem}.sidenav .collapsible,.sidenav.fixed .collapsible{border:none;-webkit-box-shadow:none;box-shadow:none}.sidenav .collapsible li,.sidenav.fixed .collapsible li{padding:0}.sidenav .collapsible-header,.sidenav.fixed .collapsible-header{background-color:transparent;border:none;line-height:inherit;height:inherit;padding:0 16px}.sidenav .collapsible-header:hover,.sidenav.fixed .collapsible-header:hover{background-color:#0000000d}.sidenav .collapsible-header i,.sidenav.fixed .collapsible-header i{line-height:inherit}.sidenav .collapsible-body,.sidenav.fixed .collapsible-body{border:0;background-color:#fff}.sidenav .collapsible-body li a,.sidenav.fixed .collapsible-body li a{padding:0 23.5px 0 31px}.collapsible.popout{border:none;-webkit-box-shadow:none;box-shadow:none}.collapsible.popout>li{-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 5px #00000029,0 2px 10px #0000001f;margin:0 24px;-webkit-transition:margin .35s cubic-bezier(.25,.46,.45,.94);transition:margin .35s cubic-bezier(.25,.46,.45,.94)}.collapsible.popout>li.active{-webkit-box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);box-shadow:0 5px 11px #0000002e,0 4px 15px #00000026;margin:16px 0}.chip{display:inline-block;height:32px;font-size:13px;font-weight:500;color:#0009;line-height:32px;padding:0 12px;border-radius:16px;background-color:#e4e4e4;margin-bottom:5px;margin-right:5px}.chip:focus{outline:none;background-color:#26a69a;color:#fff}.chip>img{float:left;margin:0 8px 0 -12px;height:32px;width:32px;border-radius:50%}.chip .close{cursor:pointer;float:right;font-size:16px;line-height:32px;padding-left:8px}.chips{border:none;border-bottom:1px solid #9e9e9e;-webkit-box-shadow:none;box-shadow:none;margin:0 0 8px;min-height:45px;outline:none;-webkit-transition:all .3s;transition:all .3s}.chips.focus{border-bottom:1px solid #26a69a;-webkit-box-shadow:0 1px 0 0 #26a69a;box-shadow:0 1px #26a69a}.chips:hover{cursor:text}.chips .input{background:none;border:0;color:#0009;display:inline-block;font-size:16px;height:3rem;line-height:32px;outline:0;margin:0;padding:0!important;width:120px!important}.chips .input:focus{border:0!important;-webkit-box-shadow:none!important;box-shadow:none!important}.chips .autocomplete-content{margin-top:0;margin-bottom:0}.prefix~.chips{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.chips:empty~label{font-size:.8rem;-webkit-transform:translateY(-140%);transform:translateY(-140%)}.materialboxed{display:block;cursor:-webkit-zoom-in;cursor:zoom-in;position:relative;-webkit-transition:opacity .4s;transition:opacity .4s;-webkit-backface-visibility:hidden}.materialboxed:hover:not(.active){opacity:.8}.materialboxed.active{cursor:-webkit-zoom-out;cursor:zoom-out}#materialbox-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#292929;z-index:1000;will-change:opacity}.materialbox-caption{position:fixed;display:none;color:#fff;line-height:50px;bottom:0;left:0;width:100%;text-align:center;padding:0% 15%;height:50px;z-index:1000;-webkit-font-smoothing:antialiased}select:focus{outline:1px solid #c9f3ef}button:focus{outline:none;background-color:#2ab7a9}label{font-size:.8rem;color:#9e9e9e}::-webkit-input-placeholder{color:#d1d1d1}::-moz-placeholder{color:#d1d1d1}:-ms-input-placeholder{color:#d1d1d1}::-ms-input-placeholder{color:#d1d1d1}::placeholder{color:#d1d1d1}input:not([type]),input[type=text]:not(.browser-default),input[type=password]:not(.browser-default),input[type=email]:not(.browser-default),input[type=url]:not(.browser-default),input[type=time]:not(.browser-default),input[type=date]:not(.browser-default),input[type=datetime]:not(.browser-default),input[type=datetime-local]:not(.browser-default),input[type=tel]:not(.browser-default),input[type=number]:not(.browser-default),input[type=search]:not(.browser-default),textarea.materialize-textarea{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:none;height:3rem;width:100%;font-size:16px;margin:0 0 8px;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-transition:border .3s,-webkit-box-shadow .3s;transition:border .3s,-webkit-box-shadow .3s;transition:box-shadow .3s,border .3s;transition:box-shadow .3s,border .3s,-webkit-box-shadow .3s}input:not([type]):disabled,input:not([type])[readonly=readonly],input[type=text]:not(.browser-default):disabled,input[type=text]:not(.browser-default)[readonly=readonly],input[type=password]:not(.browser-default):disabled,input[type=password]:not(.browser-default)[readonly=readonly],input[type=email]:not(.browser-default):disabled,input[type=email]:not(.browser-default)[readonly=readonly],input[type=url]:not(.browser-default):disabled,input[type=url]:not(.browser-default)[readonly=readonly],input[type=time]:not(.browser-default):disabled,input[type=time]:not(.browser-default)[readonly=readonly],input[type=date]:not(.browser-default):disabled,input[type=date]:not(.browser-default)[readonly=readonly],input[type=datetime]:not(.browser-default):disabled,input[type=datetime]:not(.browser-default)[readonly=readonly],input[type=datetime-local]:not(.browser-default):disabled,input[type=datetime-local]:not(.browser-default)[readonly=readonly],input[type=tel]:not(.browser-default):disabled,input[type=tel]:not(.browser-default)[readonly=readonly],input[type=number]:not(.browser-default):disabled,input[type=number]:not(.browser-default)[readonly=readonly],input[type=search]:not(.browser-default):disabled,input[type=search]:not(.browser-default)[readonly=readonly],textarea.materialize-textarea:disabled,textarea.materialize-textarea[readonly=readonly]{color:#0000006b;border-bottom:1px dotted rgba(0,0,0,.42)}input:not([type]):disabled+label,input:not([type])[readonly=readonly]+label,input[type=text]:not(.browser-default):disabled+label,input[type=text]:not(.browser-default)[readonly=readonly]+label,input[type=password]:not(.browser-default):disabled+label,input[type=password]:not(.browser-default)[readonly=readonly]+label,input[type=email]:not(.browser-default):disabled+label,input[type=email]:not(.browser-default)[readonly=readonly]+label,input[type=url]:not(.browser-default):disabled+label,input[type=url]:not(.browser-default)[readonly=readonly]+label,input[type=time]:not(.browser-default):disabled+label,input[type=time]:not(.browser-default)[readonly=readonly]+label,input[type=date]:not(.browser-default):disabled+label,input[type=date]:not(.browser-default)[readonly=readonly]+label,input[type=datetime]:not(.browser-default):disabled+label,input[type=datetime]:not(.browser-default)[readonly=readonly]+label,input[type=datetime-local]:not(.browser-default):disabled+label,input[type=datetime-local]:not(.browser-default)[readonly=readonly]+label,input[type=tel]:not(.browser-default):disabled+label,input[type=tel]:not(.browser-default)[readonly=readonly]+label,input[type=number]:not(.browser-default):disabled+label,input[type=number]:not(.browser-default)[readonly=readonly]+label,input[type=search]:not(.browser-default):disabled+label,input[type=search]:not(.browser-default)[readonly=readonly]+label,textarea.materialize-textarea:disabled+label,textarea.materialize-textarea[readonly=readonly]+label{color:#0000006b}input:not([type]):focus:not([readonly]),input[type=text]:not(.browser-default):focus:not([readonly]),input[type=password]:not(.browser-default):focus:not([readonly]),input[type=email]:not(.browser-default):focus:not([readonly]),input[type=url]:not(.browser-default):focus:not([readonly]),input[type=time]:not(.browser-default):focus:not([readonly]),input[type=date]:not(.browser-default):focus:not([readonly]),input[type=datetime]:not(.browser-default):focus:not([readonly]),input[type=datetime-local]:not(.browser-default):focus:not([readonly]),input[type=tel]:not(.browser-default):focus:not([readonly]),input[type=number]:not(.browser-default):focus:not([readonly]),input[type=search]:not(.browser-default):focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid #26a69a;-webkit-box-shadow:0 1px 0 0 #26a69a;box-shadow:0 1px #26a69a}input:not([type]):focus:not([readonly])+label,input[type=text]:not(.browser-default):focus:not([readonly])+label,input[type=password]:not(.browser-default):focus:not([readonly])+label,input[type=email]:not(.browser-default):focus:not([readonly])+label,input[type=url]:not(.browser-default):focus:not([readonly])+label,input[type=time]:not(.browser-default):focus:not([readonly])+label,input[type=date]:not(.browser-default):focus:not([readonly])+label,input[type=datetime]:not(.browser-default):focus:not([readonly])+label,input[type=datetime-local]:not(.browser-default):focus:not([readonly])+label,input[type=tel]:not(.browser-default):focus:not([readonly])+label,input[type=number]:not(.browser-default):focus:not([readonly])+label,input[type=search]:not(.browser-default):focus:not([readonly])+label,textarea.materialize-textarea:focus:not([readonly])+label{color:#26a69a}input:not([type]):focus.valid~label,input[type=text]:not(.browser-default):focus.valid~label,input[type=password]:not(.browser-default):focus.valid~label,input[type=email]:not(.browser-default):focus.valid~label,input[type=url]:not(.browser-default):focus.valid~label,input[type=time]:not(.browser-default):focus.valid~label,input[type=date]:not(.browser-default):focus.valid~label,input[type=datetime]:not(.browser-default):focus.valid~label,input[type=datetime-local]:not(.browser-default):focus.valid~label,input[type=tel]:not(.browser-default):focus.valid~label,input[type=number]:not(.browser-default):focus.valid~label,input[type=search]:not(.browser-default):focus.valid~label,textarea.materialize-textarea:focus.valid~label{color:#4caf50}input:not([type]):focus.invalid~label,input[type=text]:not(.browser-default):focus.invalid~label,input[type=password]:not(.browser-default):focus.invalid~label,input[type=email]:not(.browser-default):focus.invalid~label,input[type=url]:not(.browser-default):focus.invalid~label,input[type=time]:not(.browser-default):focus.invalid~label,input[type=date]:not(.browser-default):focus.invalid~label,input[type=datetime]:not(.browser-default):focus.invalid~label,input[type=datetime-local]:not(.browser-default):focus.invalid~label,input[type=tel]:not(.browser-default):focus.invalid~label,input[type=number]:not(.browser-default):focus.invalid~label,input[type=search]:not(.browser-default):focus.invalid~label,textarea.materialize-textarea:focus.invalid~label{color:#f44336}input:not([type]).validate+label,input[type=text]:not(.browser-default).validate+label,input[type=password]:not(.browser-default).validate+label,input[type=email]:not(.browser-default).validate+label,input[type=url]:not(.browser-default).validate+label,input[type=time]:not(.browser-default).validate+label,input[type=date]:not(.browser-default).validate+label,input[type=datetime]:not(.browser-default).validate+label,input[type=datetime-local]:not(.browser-default).validate+label,input[type=tel]:not(.browser-default).validate+label,input[type=number]:not(.browser-default).validate+label,input[type=search]:not(.browser-default).validate+label,textarea.materialize-textarea.validate+label{width:100%}input.valid:not([type]),input.valid:not([type]):focus,input.valid[type=text]:not(.browser-default),input.valid[type=text]:not(.browser-default):focus,input.valid[type=password]:not(.browser-default),input.valid[type=password]:not(.browser-default):focus,input.valid[type=email]:not(.browser-default),input.valid[type=email]:not(.browser-default):focus,input.valid[type=url]:not(.browser-default),input.valid[type=url]:not(.browser-default):focus,input.valid[type=time]:not(.browser-default),input.valid[type=time]:not(.browser-default):focus,input.valid[type=date]:not(.browser-default),input.valid[type=date]:not(.browser-default):focus,input.valid[type=datetime]:not(.browser-default),input.valid[type=datetime]:not(.browser-default):focus,input.valid[type=datetime-local]:not(.browser-default),input.valid[type=datetime-local]:not(.browser-default):focus,input.valid[type=tel]:not(.browser-default),input.valid[type=tel]:not(.browser-default):focus,input.valid[type=number]:not(.browser-default),input.valid[type=number]:not(.browser-default):focus,input.valid[type=search]:not(.browser-default),input.valid[type=search]:not(.browser-default):focus,textarea.materialize-textarea.valid,textarea.materialize-textarea.valid:focus,.select-wrapper.valid>input.select-dropdown{border-bottom:1px solid #4CAF50;-webkit-box-shadow:0 1px 0 0 #4CAF50;box-shadow:0 1px #4caf50}input.invalid:not([type]),input.invalid:not([type]):focus,input.invalid[type=text]:not(.browser-default),input.invalid[type=text]:not(.browser-default):focus,input.invalid[type=password]:not(.browser-default),input.invalid[type=password]:not(.browser-default):focus,input.invalid[type=email]:not(.browser-default),input.invalid[type=email]:not(.browser-default):focus,input.invalid[type=url]:not(.browser-default),input.invalid[type=url]:not(.browser-default):focus,input.invalid[type=time]:not(.browser-default),input.invalid[type=time]:not(.browser-default):focus,input.invalid[type=date]:not(.browser-default),input.invalid[type=date]:not(.browser-default):focus,input.invalid[type=datetime]:not(.browser-default),input.invalid[type=datetime]:not(.browser-default):focus,input.invalid[type=datetime-local]:not(.browser-default),input.invalid[type=datetime-local]:not(.browser-default):focus,input.invalid[type=tel]:not(.browser-default),input.invalid[type=tel]:not(.browser-default):focus,input.invalid[type=number]:not(.browser-default),input.invalid[type=number]:not(.browser-default):focus,input.invalid[type=search]:not(.browser-default),input.invalid[type=search]:not(.browser-default):focus,textarea.materialize-textarea.invalid,textarea.materialize-textarea.invalid:focus,.select-wrapper.invalid>input.select-dropdown,.select-wrapper.invalid>input.select-dropdown:focus{border-bottom:1px solid #F44336;-webkit-box-shadow:0 1px 0 0 #F44336;box-shadow:0 1px #f44336}input:not([type]).valid~.helper-text[data-success],input:not([type]):focus.valid~.helper-text[data-success],input:not([type]).invalid~.helper-text[data-error],input:not([type]):focus.invalid~.helper-text[data-error],input[type=text]:not(.browser-default).valid~.helper-text[data-success],input[type=text]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=text]:not(.browser-default).invalid~.helper-text[data-error],input[type=text]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=password]:not(.browser-default).valid~.helper-text[data-success],input[type=password]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=password]:not(.browser-default).invalid~.helper-text[data-error],input[type=password]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=email]:not(.browser-default).valid~.helper-text[data-success],input[type=email]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=email]:not(.browser-default).invalid~.helper-text[data-error],input[type=email]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=url]:not(.browser-default).valid~.helper-text[data-success],input[type=url]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=url]:not(.browser-default).invalid~.helper-text[data-error],input[type=url]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=time]:not(.browser-default).valid~.helper-text[data-success],input[type=time]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=time]:not(.browser-default).invalid~.helper-text[data-error],input[type=time]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=date]:not(.browser-default).valid~.helper-text[data-success],input[type=date]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=date]:not(.browser-default).invalid~.helper-text[data-error],input[type=date]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=tel]:not(.browser-default).valid~.helper-text[data-success],input[type=tel]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=tel]:not(.browser-default).invalid~.helper-text[data-error],input[type=tel]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=number]:not(.browser-default).valid~.helper-text[data-success],input[type=number]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=number]:not(.browser-default).invalid~.helper-text[data-error],input[type=number]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=search]:not(.browser-default).valid~.helper-text[data-success],input[type=search]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=search]:not(.browser-default).invalid~.helper-text[data-error],input[type=search]:not(.browser-default):focus.invalid~.helper-text[data-error],textarea.materialize-textarea.valid~.helper-text[data-success],textarea.materialize-textarea:focus.valid~.helper-text[data-success],textarea.materialize-textarea.invalid~.helper-text[data-error],textarea.materialize-textarea:focus.invalid~.helper-text[data-error],.select-wrapper.valid .helper-text[data-success],.select-wrapper.invalid~.helper-text[data-error]{color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}input:not([type]).valid~.helper-text:after,input:not([type]):focus.valid~.helper-text:after,input[type=text]:not(.browser-default).valid~.helper-text:after,input[type=text]:not(.browser-default):focus.valid~.helper-text:after,input[type=password]:not(.browser-default).valid~.helper-text:after,input[type=password]:not(.browser-default):focus.valid~.helper-text:after,input[type=email]:not(.browser-default).valid~.helper-text:after,input[type=email]:not(.browser-default):focus.valid~.helper-text:after,input[type=url]:not(.browser-default).valid~.helper-text:after,input[type=url]:not(.browser-default):focus.valid~.helper-text:after,input[type=time]:not(.browser-default).valid~.helper-text:after,input[type=time]:not(.browser-default):focus.valid~.helper-text:after,input[type=date]:not(.browser-default).valid~.helper-text:after,input[type=date]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime]:not(.browser-default).valid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime-local]:not(.browser-default).valid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text:after,input[type=tel]:not(.browser-default).valid~.helper-text:after,input[type=tel]:not(.browser-default):focus.valid~.helper-text:after,input[type=number]:not(.browser-default).valid~.helper-text:after,input[type=number]:not(.browser-default):focus.valid~.helper-text:after,input[type=search]:not(.browser-default).valid~.helper-text:after,input[type=search]:not(.browser-default):focus.valid~.helper-text:after,textarea.materialize-textarea.valid~.helper-text:after,textarea.materialize-textarea:focus.valid~.helper-text:after,.select-wrapper.valid~.helper-text:after{content:attr(data-success);color:#4caf50}input:not([type]).invalid~.helper-text:after,input:not([type]):focus.invalid~.helper-text:after,input[type=text]:not(.browser-default).invalid~.helper-text:after,input[type=text]:not(.browser-default):focus.invalid~.helper-text:after,input[type=password]:not(.browser-default).invalid~.helper-text:after,input[type=password]:not(.browser-default):focus.invalid~.helper-text:after,input[type=email]:not(.browser-default).invalid~.helper-text:after,input[type=email]:not(.browser-default):focus.invalid~.helper-text:after,input[type=url]:not(.browser-default).invalid~.helper-text:after,input[type=url]:not(.browser-default):focus.invalid~.helper-text:after,input[type=time]:not(.browser-default).invalid~.helper-text:after,input[type=time]:not(.browser-default):focus.invalid~.helper-text:after,input[type=date]:not(.browser-default).invalid~.helper-text:after,input[type=date]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime]:not(.browser-default).invalid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default).invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text:after,input[type=tel]:not(.browser-default).invalid~.helper-text:after,input[type=tel]:not(.browser-default):focus.invalid~.helper-text:after,input[type=number]:not(.browser-default).invalid~.helper-text:after,input[type=number]:not(.browser-default):focus.invalid~.helper-text:after,input[type=search]:not(.browser-default).invalid~.helper-text:after,input[type=search]:not(.browser-default):focus.invalid~.helper-text:after,textarea.materialize-textarea.invalid~.helper-text:after,textarea.materialize-textarea:focus.invalid~.helper-text:after,.select-wrapper.invalid~.helper-text:after{content:attr(data-error);color:#f44336}input:not([type])+label:after,input[type=text]:not(.browser-default)+label:after,input[type=password]:not(.browser-default)+label:after,input[type=email]:not(.browser-default)+label:after,input[type=url]:not(.browser-default)+label:after,input[type=time]:not(.browser-default)+label:after,input[type=date]:not(.browser-default)+label:after,input[type=datetime]:not(.browser-default)+label:after,input[type=datetime-local]:not(.browser-default)+label:after,input[type=tel]:not(.browser-default)+label:after,input[type=number]:not(.browser-default)+label:after,input[type=search]:not(.browser-default)+label:after,textarea.materialize-textarea+label:after,.select-wrapper+label:after{display:block;content:"";position:absolute;top:100%;left:0;opacity:0;-webkit-transition:.2s opacity ease-out,.2s color ease-out;transition:.2s opacity ease-out,.2s color ease-out}.input-field{position:relative;margin-top:1rem;margin-bottom:1rem}.input-field.inline{display:inline-block;vertical-align:middle;margin-left:5px}.input-field.inline input,.input-field.inline .select-dropdown{margin-bottom:1rem}.input-field.col label{left:.75rem}.input-field.col .prefix~label,.input-field.col .prefix~.validate~label{width:calc(100% - 4.5rem)}.input-field>label{color:#9e9e9e;position:absolute;top:0;left:0;font-size:1rem;cursor:text;-webkit-transition:color .2s ease-out,-webkit-transform .2s ease-out;transition:color .2s ease-out,-webkit-transform .2s ease-out;transition:transform .2s ease-out,color .2s ease-out;transition:transform .2s ease-out,color .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;-webkit-transform:translateY(12px);transform:translateY(12px)}.input-field>label:not(.label-icon).active{-webkit-transform:translateY(-14px) scale(.8);transform:translateY(-14px) scale(.8);-webkit-transform-origin:0 0;transform-origin:0 0}.input-field>input[type]:-webkit-autofill:not(.browser-default)+label,.input-field>input[type=date]:not(.browser-default)+label,.input-field>input[type=time]:not(.browser-default)+label{-webkit-transform:translateY(-14px) scale(.8);transform:translateY(-14px) scale(.8);-webkit-transform-origin:0 0;transform-origin:0 0}.input-field .helper-text{position:relative;min-height:18px;display:block;font-size:12px;color:#0000008a}.input-field .helper-text:after{opacity:1;position:absolute;top:0;left:0}.input-field .prefix{position:absolute;width:3rem;font-size:2rem;-webkit-transition:color .2s;transition:color .2s;top:.5rem}.input-field .prefix.active{color:#26a69a}.input-field .prefix~input,.input-field .prefix~textarea,.input-field .prefix~label,.input-field .prefix~.validate~label,.input-field .prefix~.helper-text,.input-field .prefix~.autocomplete-content{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field .prefix~label{margin-left:3rem}@media only screen and (max-width: 992px){.input-field .prefix~input{width:86%;width:calc(100% - 3rem)}}@media only screen and (max-width: 600px){.input-field .prefix~input{width:80%;width:calc(100% - 3rem)}}.input-field input[type=search]{display:block;line-height:inherit;-webkit-transition:.3s background-color;transition:.3s background-color}.nav-wrapper .input-field input[type=search]{height:inherit;padding-left:4rem;width:calc(100% - 4rem);border:0;-webkit-box-shadow:none;box-shadow:none}.input-field input[type=search]:focus:not(.browser-default){background-color:#fff;border:0;-webkit-box-shadow:none;box-shadow:none;color:#444}.input-field input[type=search]:focus:not(.browser-default)+label i,.input-field input[type=search]:focus:not(.browser-default)~.mdi-navigation-close,.input-field input[type=search]:focus:not(.browser-default)~.material-icons{color:#444}.input-field input[type=search]+.label-icon{-webkit-transform:none;transform:none;left:1rem}.input-field input[type=search]~.mdi-navigation-close,.input-field input[type=search]~.material-icons{position:absolute;top:0;right:1rem;color:transparent;cursor:pointer;font-size:2rem;-webkit-transition:.3s color;transition:.3s color}textarea{width:100%;height:3rem;background-color:transparent}textarea.materialize-textarea{line-height:normal;overflow-y:hidden;padding:.8rem 0;resize:none;min-height:3rem;-webkit-box-sizing:border-box;box-sizing:border-box}.hiddendiv{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem;position:absolute;top:0;z-index:-1}.autocomplete-content li .highlight{color:#444}.autocomplete-content li img{height:40px;width:40px;margin:5px 15px}.character-counter{min-height:18px}[type=radio]:not(:checked),[type=radio]:checked{position:absolute;opacity:0;pointer-events:none}[type=radio]:not(:checked)+span,[type=radio]:checked+span{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;-webkit-transition:.28s ease;transition:.28s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[type=radio]+span:before,[type=radio]+span:after{content:"";position:absolute;left:0;top:0;margin:4px;width:16px;height:16px;z-index:0;-webkit-transition:.28s ease;transition:.28s ease}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after,[type=radio]:checked+span:before,[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border-radius:50%}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after{border:2px solid #5a5a5a}[type=radio]:not(:checked)+span:after{-webkit-transform:scale(0);transform:scale(0)}[type=radio]:checked+span:before{border:2px solid transparent}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border:2px solid #26a69a}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:after{background-color:#26a69a}[type=radio]:checked+span:after{-webkit-transform:scale(1.02);transform:scale(1.02)}[type=radio].with-gap:checked+span:after{-webkit-transform:scale(.5);transform:scale(.5)}[type=radio].tabbed:focus+span:before{-webkit-box-shadow:0 0 0 10px rgba(0,0,0,.1);box-shadow:0 0 0 10px #0000001a}[type=radio].with-gap:disabled:checked+span:before{border:2px solid rgba(0,0,0,.42)}[type=radio].with-gap:disabled:checked+span:after{border:none;background-color:#0000006b}[type=radio]:disabled:not(:checked)+span:before,[type=radio]:disabled:checked+span:before{background-color:transparent;border-color:#0000006b}[type=radio]:disabled+span{color:#0000006b}[type=radio]:disabled:not(:checked)+span:before{border-color:#0000006b}[type=radio]:disabled:checked+span:after{background-color:#0000006b;border-color:#949494}[type=checkbox]:not(:checked),[type=checkbox]:checked{position:absolute;opacity:0;pointer-events:none}[type=checkbox]+span:not(.lever){position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[type=checkbox]+span:not(.lever):before,[type=checkbox]:not(.filled-in)+span:not(.lever):after{content:"";position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #5a5a5a;border-radius:1px;margin-top:3px;-webkit-transition:.2s;transition:.2s}[type=checkbox]:not(.filled-in)+span:not(.lever):after{border:0;-webkit-transform:scale(0);transform:scale(0)}[type=checkbox]:not(:checked):disabled+span:not(.lever):before{border:none;background-color:#0000006b}[type=checkbox].tabbed:focus+span:not(.lever):after{-webkit-transform:scale(1);transform:scale(1);border:0;border-radius:50%;-webkit-box-shadow:0 0 0 10px rgba(0,0,0,.1);box-shadow:0 0 0 10px #0000001a;background-color:#0000001a}[type=checkbox]:checked+span:not(.lever):before{top:-4px;left:-5px;width:12px;height:22px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #26a69a;border-bottom:2px solid #26a69a;-webkit-transform:rotate(40deg);transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:checked:disabled+span:before{border-right:2px solid rgba(0,0,0,.42);border-bottom:2px solid rgba(0,0,0,.42)}[type=checkbox]:indeterminate+span:not(.lever):before{top:-11px;left:-12px;width:10px;height:22px;border-top:none;border-left:none;border-right:2px solid #26a69a;border-bottom:none;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:indeterminate:disabled+span:not(.lever):before{border-right:2px solid rgba(0,0,0,.42);background-color:transparent}[type=checkbox].filled-in+span:not(.lever):after{border-radius:2px}[type=checkbox].filled-in+span:not(.lever):before,[type=checkbox].filled-in+span:not(.lever):after{content:"";left:0;position:absolute;-webkit-transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}[type=checkbox].filled-in:not(:checked)+span:not(.lever):before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;-webkit-transform:rotateZ(37deg);transform:rotate(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox].filled-in:not(:checked)+span:not(.lever):after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0px;z-index:0}[type=checkbox].filled-in:checked+span:not(.lever):before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;-webkit-transform:rotateZ(37deg);transform:rotate(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox].filled-in:checked+span:not(.lever):after{top:0;width:20px;height:20px;border:2px solid #26a69a;background-color:#26a69a;z-index:0}[type=checkbox].filled-in.tabbed:focus+span:not(.lever):after{border-radius:2px;border-color:#5a5a5a;background-color:#0000001a}[type=checkbox].filled-in.tabbed:checked:focus+span:not(.lever):after{border-radius:2px;background-color:#26a69a;border-color:#26a69a}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):before{background-color:transparent;border:2px solid transparent}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):after{border-color:transparent;background-color:#949494}[type=checkbox].filled-in:disabled:checked+span:not(.lever):before{background-color:transparent}[type=checkbox].filled-in:disabled:checked+span:not(.lever):after{background-color:#949494;border-color:#949494}.switch,.switch *{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.switch label{cursor:pointer}.switch label input[type=checkbox]{opacity:0;width:0;height:0}.switch label input[type=checkbox]:checked+.lever{background-color:#84c7c1}.switch label input[type=checkbox]:checked+.lever:before,.switch label input[type=checkbox]:checked+.lever:after{left:18px}.switch label input[type=checkbox]:checked+.lever:after{background-color:#26a69a}.switch label .lever{content:"";display:inline-block;position:relative;width:36px;height:14px;background-color:#00000061;border-radius:15px;-webkit-transition:background .3s ease;transition:background .3s ease;vertical-align:middle;margin:0 16px}.switch label .lever:before,.switch label .lever:after{content:"";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;-webkit-transition:left .3s ease,background .3s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;transition:left .3s ease,background .3s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease}.switch label .lever:before{background-color:#26a69a26}.switch label .lever:after{background-color:#f1f1f1;-webkit-box-shadow:0px 3px 1px -2px rgba(0,0,0,.2),0px 2px 2px 0px rgba(0,0,0,.14),0px 1px 5px 0px rgba(0,0,0,.12);box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}input[type=checkbox]:checked:not(:disabled)~.lever:active:before,input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever:before{-webkit-transform:scale(2.4);transform:scale(2.4);background-color:#26a69a26}input[type=checkbox]:not(:disabled)~.lever:active:before,input[type=checkbox]:not(:disabled).tabbed:focus~.lever:before{-webkit-transform:scale(2.4);transform:scale(2.4);background-color:#00000014}.switch input[type=checkbox][disabled]+.lever{cursor:default;background-color:#0000001f}.switch label input[type=checkbox][disabled]+.lever:after,.switch label input[type=checkbox][disabled]:checked+.lever:after{background-color:#949494}select{display:none}select.browser-default{display:block}select{background-color:#ffffffe6;width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper.valid+label,.select-wrapper.invalid+label{width:100%;pointer-events:none}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;outline:none;height:3rem;line-height:3rem;width:100%;font-size:16px;margin:0 0 8px;padding:0;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}.select-wrapper input.select-dropdown:focus{border-bottom:1px solid #26a69a}.select-wrapper .caret{position:absolute;right:0;top:0;bottom:0;margin:auto 0;z-index:0;fill:#000000de}.select-wrapper+label{position:absolute;top:-26px;font-size:.8rem}select:disabled{color:#0000006b}.select-wrapper.disabled+label{color:#0000006b}.select-wrapper.disabled .caret{fill:#0000006b}.select-wrapper input.select-dropdown:disabled{color:#0000006b;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select-wrapper i{color:#0000004d}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:#0000004d;background-color:transparent}body.keyboard-focused .select-dropdown.dropdown-content li:focus{background-color:#00000014}.select-dropdown.dropdown-content li:hover{background-color:#00000014}.select-dropdown.dropdown-content li.selected{background-color:#00000008}.prefix~.select-wrapper{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.prefix~label{margin-left:3rem}.select-dropdown li img{height:40px;width:40px;margin:5px 15px;float:right}.select-dropdown li.optgroup{border-top:1px solid #eee}.select-dropdown li.optgroup.selected>span{color:#000000b3}.select-dropdown li.optgroup>span{color:#0006}.select-dropdown li.optgroup~li.optgroup-option{padding-left:1rem}.file-field{position:relative}.file-field .file-path-wrapper{overflow:hidden;padding-left:10px}.file-field input.file-path{width:100%}.file-field .btn,.file-field .btn-large,.file-field .btn-small{float:left;height:3rem;line-height:3rem}.file-field span{cursor:pointer}.file-field input[type=file]{position:absolute;top:0;right:0;left:0;bottom:0;width:100%;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.file-field input[type=file]::-webkit-file-upload-button{display:none}.range-field{position:relative}input[type=range],input[type=range]+.thumb{cursor:pointer}input[type=range]{position:relative;background-color:transparent;border:none;outline:none;width:100%;margin:15px 0;padding:0}input[type=range]:focus{outline:none}input[type=range]+.thumb{position:absolute;top:10px;left:0;border:none;height:0;width:0;border-radius:50%;background-color:#26a69a;margin-left:7px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#26a69a;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}input[type=range]{-webkit-appearance:none}input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-webkit-slider-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;-webkit-appearance:none;background-color:#26a69a;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0}.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb{-webkit-box-shadow:0 0 0 10px rgba(38,166,154,.26);box-shadow:0 0 0 10px #26a69a42}input[type=range]{border:1px solid white}input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-moz-focus-inner{border:0}input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;margin-top:-5px}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb{box-shadow:0 0 0 10px #26a69a42}input[type=range]::-ms-track{height:3px;background:transparent;border-color:transparent;border-width:6px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#777}input[type=range]::-ms-fill-upper{background:#ddd}input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s}.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb{box-shadow:0 0 0 10px #26a69a42}.table-of-contents.fixed{position:fixed}.table-of-contents li{padding:2px 0}.table-of-contents a{font-weight:300;color:#757575;padding-left:16px;height:1.5rem;line-height:1.5rem;letter-spacing:.4;display:inline-block}.table-of-contents a:hover{color:#a8a8a8;padding-left:15px;border-left:1px solid #ee6e73}.table-of-contents a.active{font-weight:500;padding-left:14px;border-left:2px solid #ee6e73}.sidenav{position:fixed;width:300px;left:0;top:0;margin:0;-webkit-transform:translateX(-100%);transform:translate(-100%);height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;background-color:#fff;z-index:999;overflow-y:auto;will-change:transform;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateX(-105%);transform:translate(-105%)}.sidenav.right-aligned{right:0;-webkit-transform:translateX(105%);transform:translate(105%);left:auto;-webkit-transform:translateX(100%);transform:translate(100%)}.sidenav .collapsible{margin:0}.sidenav li{float:none;line-height:48px}.sidenav li.active{background-color:#0000000d}.sidenav li>a{color:#000000de;display:block;font-size:14px;font-weight:500;height:48px;line-height:48px;padding:0 32px}.sidenav li>a:hover{background-color:#0000000d}.sidenav li>a.btn,.sidenav li>a.btn-large,.sidenav li>a.btn-small,.sidenav li>a.btn-large,.sidenav li>a.btn-flat,.sidenav li>a.btn-floating{margin:10px 15px}.sidenav li>a.btn,.sidenav li>a.btn-large,.sidenav li>a.btn-small,.sidenav li>a.btn-large,.sidenav li>a.btn-floating{color:#fff}.sidenav li>a.btn-flat{color:#343434}.sidenav li>a.btn:hover,.sidenav li>a.btn-large:hover,.sidenav li>a.btn-small:hover,.sidenav li>a.btn-large:hover{background-color:#2bbbad}.sidenav li>a.btn-floating:hover{background-color:#26a69a}.sidenav li>a>i,.sidenav li>a>[class^=mdi-],.sidenav li>a li>a>[class*=mdi-],.sidenav li>a>i.material-icons{float:left;height:48px;line-height:48px;margin:0 32px 0 0;width:24px;color:#0000008a}.sidenav .divider{margin:8px 0 0}.sidenav .subheader{cursor:initial;pointer-events:none;color:#0000008a;font-size:14px;font-weight:500;line-height:48px}.sidenav .subheader:hover{background-color:transparent}.sidenav .user-view{position:relative;padding:32px 32px 0;margin-bottom:8px}.sidenav .user-view>a{height:auto;padding:0}.sidenav .user-view>a:hover{background-color:transparent}.sidenav .user-view .background{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.sidenav .user-view .circle,.sidenav .user-view .name,.sidenav .user-view .email{display:block}.sidenav .user-view .circle{height:64px;width:64px}.sidenav .user-view .name,.sidenav .user-view .email{font-size:14px;line-height:24px}.sidenav .user-view .name{margin-top:16px;font-weight:500}.sidenav .user-view .email{padding-bottom:16px;font-weight:400}.drag-target{height:100%;width:10px;position:fixed;top:0;z-index:998}.drag-target.right-aligned{right:0}.sidenav.sidenav-fixed{left:0;-webkit-transform:translateX(0);transform:translate(0);position:fixed}.sidenav.sidenav-fixed.right-aligned{right:0;left:auto}@media only screen and (max-width: 992px){.sidenav.sidenav-fixed{-webkit-transform:translateX(-105%);transform:translate(-105%)}.sidenav.sidenav-fixed.right-aligned{-webkit-transform:translateX(105%);transform:translate(105%)}.sidenav>a{padding:0 16px}.sidenav .user-view{padding:16px 16px 0}}.sidenav .collapsible-body>ul:not(.collapsible)>li.active,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active{background-color:#ee6e73}.sidenav .collapsible-body>ul:not(.collapsible)>li.active a,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active a{color:#fff}.sidenav .collapsible-body{padding:0}.sidenav-overlay{position:fixed;top:0;left:0;right:0;opacity:0;height:120vh;background-color:#00000080;z-index:997;display:none}.preloader-wrapper{display:inline-block;position:relative;width:50px;height:50px}.preloader-wrapper.small{width:36px;height:36px}.preloader-wrapper.big{width:64px;height:64px}.preloader-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes container-rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-layer{position:absolute;width:100%;height:100%;opacity:0;border-color:#26a69a}.spinner-blue,.spinner-blue-only{border-color:#4285f4}.spinner-red,.spinner-red-only{border-color:#db4437}.spinner-yellow,.spinner-yellow-only{border-color:#f4b400}.spinner-green,.spinner-green-only{border-color:#0f9d58}.active .spinner-layer.spinner-blue{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-red{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-yellow{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-green{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer,.active .spinner-layer.spinner-blue-only,.active .spinner-layer.spinner-red-only,.active .spinner-layer.spinner-yellow-only,.active .spinner-layer.spinner-green-only{opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg)}}@keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@-webkit-keyframes blue-fade-in-out{0%{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}to{opacity:1}}@keyframes blue-fade-in-out{0%{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}to{opacity:1}}@-webkit-keyframes red-fade-in-out{0%{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@keyframes red-fade-in-out{0%{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@-webkit-keyframes yellow-fade-in-out{0%{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@keyframes yellow-fade-in-out{0%{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@-webkit-keyframes green-fade-in-out{0%{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}to{opacity:0}}@keyframes green-fade-in-out{0%{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}to{opacity:0}}.gap-patch{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle{width:1000%;left:-450%}.circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle{left:0;border-right-color:transparent!important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle{left:-100%;border-left-color:transparent!important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle{-webkit-animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}.active .circle-clipper.right .circle{-webkit-animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes left-spin{0%{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{0%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg);transform:rotate(130deg)}}@-webkit-keyframes right-spin{0%{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{0%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}}#spinnerContainer.cooldown{-webkit-animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1);animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1)}@-webkit-keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}.slider{position:relative;height:400px;width:100%}.slider.fullscreen{height:100%;width:100%;position:absolute;top:0;left:0;right:0;bottom:0}.slider.fullscreen ul.slides{height:100%}.slider.fullscreen ul.indicators{z-index:2;bottom:30px}.slider .slides{background-color:#9e9e9e;margin:0;height:400px}.slider .slides li{opacity:0;position:absolute;top:0;left:0;z-index:1;width:100%;height:inherit;overflow:hidden}.slider .slides li img{height:100%;width:100%;background-size:cover;background-position:center}.slider .slides li .caption{color:#fff;position:absolute;top:15%;left:15%;width:70%;opacity:0}.slider .slides li .caption p{color:#e0e0e0}.slider .slides li.active{z-index:2}.slider .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.slider .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:16px;width:16px;margin:0 12px;background-color:#e0e0e0;-webkit-transition:background-color .3s;transition:background-color .3s;border-radius:50%}.slider .indicators .indicator-item.active{background-color:#4caf50}.carousel{overflow:hidden;position:relative;width:100%;height:400px;-webkit-perspective:500px;perspective:500px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform-origin:0% 50%;transform-origin:0% 50%}.carousel.carousel-slider{top:0;left:0}.carousel.carousel-slider .carousel-fixed-item{position:absolute;left:0;right:0;bottom:20px;z-index:1}.carousel.carousel-slider .carousel-fixed-item.with-indicators{bottom:68px}.carousel.carousel-slider .carousel-item{width:100%;height:100%;min-height:400px;position:absolute;top:0;left:0}.carousel.carousel-slider .carousel-item h2{font-size:24px;font-weight:500;line-height:32px}.carousel.carousel-slider .carousel-item p{font-size:15px}.carousel .carousel-item{visibility:hidden;width:200px;height:200px;position:absolute;top:0;left:0}.carousel .carousel-item>img{width:100%}.carousel .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.carousel .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:8px;width:8px;margin:24px 4px;background-color:#ffffff80;-webkit-transition:background-color .3s;transition:background-color .3s;border-radius:50%}.carousel .indicators .indicator-item.active{background-color:#fff}.carousel.scrolling .carousel-item .materialboxed,.carousel .carousel-item:not(.active) .materialboxed{pointer-events:none}.tap-target-wrapper{width:800px;height:800px;position:fixed;z-index:1000;visibility:hidden;-webkit-transition:visibility 0s .3s;transition:visibility 0s .3s}.tap-target-wrapper.open{visibility:visible;-webkit-transition:visibility 0s;transition:visibility 0s}.tap-target-wrapper.open .tap-target{-webkit-transform:scale(1);transform:scale(1);opacity:.95;-webkit-transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1)}.tap-target-wrapper.open .tap-target-wave:before{-webkit-transform:scale(1);transform:scale(1)}.tap-target-wrapper.open .tap-target-wave:after{visibility:visible;-webkit-animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;-webkit-transition:opacity .3s,visibility 0s 1s,-webkit-transform .3s;transition:opacity .3s,visibility 0s 1s,-webkit-transform .3s;transition:opacity .3s,transform .3s,visibility 0s 1s;transition:opacity .3s,transform .3s,visibility 0s 1s,-webkit-transform .3s}.tap-target{position:absolute;font-size:1rem;border-radius:50%;background-color:#ee6e73;-webkit-box-shadow:0 20px 20px 0 rgba(0,0,0,.14),0 10px 50px 0 rgba(0,0,0,.12),0 30px 10px -20px rgba(0,0,0,.2);box-shadow:0 20px 20px #00000024,0 10px 50px #0000001f,0 30px 10px -20px #0003;width:100%;height:100%;opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1)}.tap-target-content{position:relative;display:table-cell}.tap-target-wave{position:absolute;border-radius:50%;z-index:10001}.tap-target-wave:before,.tap-target-wave:after{content:"";display:block;position:absolute;width:100%;height:100%;border-radius:50%;background-color:#fff}.tap-target-wave:before{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.tap-target-wave:after{visibility:hidden;-webkit-transition:opacity .3s,visibility 0s,-webkit-transform .3s;transition:opacity .3s,visibility 0s,-webkit-transform .3s;transition:opacity .3s,transform .3s,visibility 0s;transition:opacity .3s,transform .3s,visibility 0s,-webkit-transform .3s;z-index:-1}.tap-target-origin{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10002;position:absolute!important}.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small),.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small):hover{background:none}@media only screen and (max-width: 600px){.tap-target,.tap-target-wrapper{width:600px;height:600px}}.pulse{overflow:visible;position:relative}.pulse:before{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;background-color:inherit;border-radius:inherit;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-webkit-animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;z-index:-1}@-webkit-keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}@keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}.datepicker-modal{max-width:325px;min-width:300px;max-height:none}.datepicker-container.modal-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0}.datepicker-controls{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:280px;margin:0 auto}.datepicker-controls .selects-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.datepicker-controls .select-wrapper input{border-bottom:none;text-align:center;margin:0}.datepicker-controls .select-wrapper input:focus{border-bottom:none}.datepicker-controls .select-wrapper .caret{display:none}.datepicker-controls .select-year input{width:50px}.datepicker-controls .select-month input{width:70px}.month-prev,.month-next{margin-top:4px;cursor:pointer;background-color:transparent;border:none}.datepicker-date-display{-webkit-box-flex:1;-webkit-flex:1 auto;-ms-flex:1 auto;flex:1 auto;background-color:#26a69a;color:#fff;padding:20px 22px;font-weight:500}.datepicker-date-display .year-text{display:block;font-size:1.5rem;line-height:25px;color:#ffffffb3}.datepicker-date-display .date-text{display:block;font-size:2.8rem;line-height:47px;font-weight:500}.datepicker-calendar-container{-webkit-box-flex:2.5;-webkit-flex:2.5 auto;-ms-flex:2.5 auto;flex:2.5 auto}.datepicker-table{width:280px;font-size:1rem;margin:0 auto}.datepicker-table thead{border-bottom:none}.datepicker-table th{padding:10px 5px;text-align:center}.datepicker-table tr{border:none}.datepicker-table abbr{text-decoration:none;color:#999}.datepicker-table td{border-radius:50%;padding:0}.datepicker-table td.is-today{color:#26a69a}.datepicker-table td.is-selected{background-color:#26a69a;color:#fff}.datepicker-table td.is-outside-current-month,.datepicker-table td.is-disabled{color:#0000004d;pointer-events:none}.datepicker-day-button{background-color:transparent;border:none;line-height:38px;display:block;width:100%;border-radius:50%;padding:0 5px;cursor:pointer;color:inherit}.datepicker-day-button:focus{background-color:#2ba19640}.datepicker-footer{width:280px;margin:0 auto;padding-bottom:5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.datepicker-cancel,.datepicker-clear,.datepicker-today,.datepicker-done{color:#26a69a;padding:0 1rem}.datepicker-clear{color:#f44336}@media only screen and (min-width: 601px){.datepicker-modal{max-width:625px}.datepicker-container.modal-content{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.datepicker-date-display{-webkit-box-flex:0;-webkit-flex:0 1 270px;-ms-flex:0 1 270px;flex:0 1 270px}.datepicker-controls,.datepicker-table,.datepicker-footer{width:320px}.datepicker-day-button{line-height:44px}}.timepicker-modal{max-width:325px;max-height:none}.timepicker-container.modal-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0}.text-primary{color:#fff}.timepicker-digital-display{-webkit-box-flex:1;-webkit-flex:1 auto;-ms-flex:1 auto;flex:1 auto;background-color:#26a69a;padding:10px;font-weight:300}.timepicker-text-container{font-size:4rem;font-weight:700;text-align:center;color:#fff9;font-weight:400;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.timepicker-span-hours,.timepicker-span-minutes,.timepicker-span-am-pm div{cursor:pointer}.timepicker-span-hours{margin-right:3px}.timepicker-span-minutes{margin-left:3px}.timepicker-display-am-pm{font-size:1.3rem;position:absolute;right:1rem;bottom:1rem;font-weight:400}.timepicker-analog-display{-webkit-box-flex:2.5;-webkit-flex:2.5 auto;-ms-flex:2.5 auto;flex:2.5 auto}.timepicker-plate{background-color:#eee;border-radius:50%;width:270px;height:270px;overflow:visible;position:relative;margin:25px auto 5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.timepicker-canvas,.timepicker-dial{position:absolute;left:0;right:0;top:0;bottom:0}.timepicker-minutes{visibility:hidden}.timepicker-tick{border-radius:50%;color:#000000de;line-height:40px;text-align:center;width:40px;height:40px;position:absolute;cursor:pointer;font-size:15px}.timepicker-tick.active,.timepicker-tick:hover{background-color:#26a69a40}.timepicker-dial{-webkit-transition:opacity .35s,-webkit-transform .35s;transition:opacity .35s,-webkit-transform .35s;transition:transform .35s,opacity .35s;transition:transform .35s,opacity .35s,-webkit-transform .35s}.timepicker-dial-out{opacity:0}.timepicker-dial-out.timepicker-hours{-webkit-transform:scale(1.1,1.1);transform:scale(1.1)}.timepicker-dial-out.timepicker-minutes{-webkit-transform:scale(.8,.8);transform:scale(.8)}.timepicker-canvas{-webkit-transition:opacity 175ms;transition:opacity 175ms}.timepicker-canvas line{stroke:#26a69a;stroke-width:4;stroke-linecap:round}.timepicker-canvas-out{opacity:.25}.timepicker-canvas-bearing,.timepicker-canvas-bg{stroke:none;fill:#26a69a}.timepicker-footer{margin:0 auto;padding:5px 1rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.timepicker-clear{color:#f44336}.timepicker-close{color:#26a69a}.timepicker-clear,.timepicker-close{padding:0 20px}@media only screen and (min-width: 601px){.timepicker-modal{max-width:600px}.timepicker-container.modal-content{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.timepicker-text-container{top:32%}.timepicker-display-am-pm{position:relative;right:auto;bottom:auto;text-align:center;margin-top:1.2rem}}
`,$a=(o,e)=>{const t=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(o)!=null&&(o=ia(o));for(var n,a=o;(n=t.exec(o))!==null;){a=a.replace(n[0],"");const r=document.createElement("link");r.rel="stylesheet",r.href=n[2]||n[4];const i=n[1]||n[5];i&&(r.media=i),e===document?document.head.appendChild(r):e.appendChild(r)}return a},eo=(o,e,t)=>{if(e===document){const a=Ca(o);if(window.Vaadin.theme.injectedGlobalCss.indexOf(a)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(a)}const n=new CSSStyleSheet;n.replaceSync($a(o,e)),t?e.adoptedStyleSheets=[n,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,n]},pe=(o,e)=>{const t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(o)),e===document?document.head.appendChild(t):e.appendChild(t)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function to(o){let e,t,n=2166136261;for(e=0,t=o.length;e<t;e++)n^=o.charCodeAt(e),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return("0000000"+(n>>>0).toString(16)).substr(-8)}function Ca(o){let e=to(o);return e+to(e+o)}const Ta=o=>{eo(Ea.toString(),o),eo(La.toString(),o),document["_vaadintheme_add-ondemos_componentCss"]||(document["_vaadintheme_add-ondemos_componentCss"]=!0),pe(Eo.cssText,o),pe(Co.cssText,o),pe(To.cssText,o),pe(Fo.cssText,o),pe(Oo.cssText,o)},Ra=Ta;Ra(document);export{Ma as T,Pn as Z,sa as a,Un as b,k as c,Co as d,jn as e,Eo as f,zo as g,_ as h,w as i,y as j,ce as k,Bn as l,na as p,Ue as r,ne as s,qn as t,Na as w,G as x,$ as y};
