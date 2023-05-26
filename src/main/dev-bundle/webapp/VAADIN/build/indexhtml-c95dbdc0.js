(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.themeEditor=!1;window.Vaadin.featureFlags.sideNavComponent=!0;const Oa="modulepreload",Ma=function(t,e){return new URL(t,e).href},an={},S=function(e,o,n){if(!o||o.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(o.map(r=>{if(r=Ma(r,n),r in an)return;an[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!n)for(let d=a.length-1;d>=0;d--){const m=a[d];if(m.href===r&&(!i||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":Oa,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((d,m)=>{c.addEventListener("load",d),c.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function _t(t){return t=t||[],Array.isArray(t)?t:[t]}function X(t){return`[Vaadin.Router] ${t}`}function Fa(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const St="module",Et="nomodule",_o=[St,Et];function rn(t){if(!t.match(/.+\.[m]?js$/))throw new Error(X(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function ea(t){if(!t||!K(t.path))throw new Error(X('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!ve(t.action)&&!Array.isArray(t.children)&&!ve(t.children)&&!zt(e)&&!o.some(n=>K(t[n])))throw new Error(X(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(K(e))rn(e);else if(_o.some(n=>n in e))_o.forEach(n=>n in e&&rn(e[n]));else throw new Error(X('Expected route bundle to include either "'+Et+'" or "'+St+'" keys, or both'));t.redirect&&["bundle","component"].forEach(n=>{n in t&&console.warn(X(`Route config "${t.path}" has both "redirect" and "${n}" properties, and "redirect" will always override the latter. Did you mean to only use "${n}"?`))})}function ln(t){_t(t).forEach(e=>ea(e))}function sn(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===St?o.setAttribute("type",St):e===Et&&o.setAttribute(Et,""),o.async=!0),new Promise((n,a)=>{o.onreadystatechange=o.onload=r=>{o.__dynamicImportLoaded=!0,n(r)},o.onerror=r=>{o.parentNode&&o.parentNode.removeChild(o),a(r)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&n()})}function Va(t){return K(t)?sn(t):Promise.race(_o.filter(e=>e in t).map(e=>sn(t[e],e)))}function He(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function zt(t){return typeof t=="object"&&!!t}function ve(t){return typeof t=="function"}function K(t){return typeof t=="string"}function ta(t){const e=new Error(X(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Pe=new class{};function ja(t){const e=t.port,o=t.protocol,r=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${r}`}function cn(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let s=0;s<o.length;s++){const l=o[s];if(l.nodeName&&l.nodeName.toLowerCase()==="a"){e=l;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||ja(e))!==window.location.origin)return;const{pathname:a,search:r,hash:i}=e;He("go",{pathname:a,search:r,hash:i})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const Da={activate(){window.document.addEventListener("click",cn)},inactivate(){window.document.removeEventListener("click",cn)}},qa=/Trident/.test(navigator.userAgent);qa&&!ve(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function dn(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:n}=window.location;He("go",{pathname:e,search:o,hash:n})}const Ua={activate(){window.addEventListener("popstate",dn)},inactivate(){window.removeEventListener("popstate",dn)}};var De=la,Ba=No,Ha=Ka,Wa=aa,Ga=ia,oa="/",na="./",Ya=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function No(t,e){for(var o=[],n=0,a=0,r="",i=e&&e.delimiter||oa,s=e&&e.delimiters||na,l=!1,c;(c=Ya.exec(t))!==null;){var d=c[0],m=c[1],p=c.index;if(r+=t.slice(a,p),a=p+d.length,m){r+=m[1],l=!0;continue}var h="",ie=t[a],le=c[2],oe=c[3],Ut=c[4],B=c[5];if(!l&&r.length){var Q=r.length-1;s.indexOf(r[Q])>-1&&(h=r[Q],r=r.slice(0,Q))}r&&(o.push(r),r="",l=!1);var Ee=h!==""&&ie!==void 0&&ie!==h,ze=B==="+"||B==="*",Bt=B==="?"||B==="*",ne=h||i,it=oe||Ut;o.push({name:le||n++,prefix:h,delimiter:ne,optional:Bt,repeat:ze,partial:Ee,pattern:it?Xa(it):"[^"+se(ne)+"]+?"})}return(r||a<t.length)&&o.push(r+t.substr(a)),o}function Ka(t,e){return aa(No(t,e))}function aa(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(n,a){for(var r="",i=a&&a.encode||encodeURIComponent,s=0;s<t.length;s++){var l=t[s];if(typeof l=="string"){r+=l;continue}var c=n?n[l.name]:void 0,d;if(Array.isArray(c)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but got array');if(c.length===0){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var m=0;m<c.length;m++){if(d=i(c[m],l),!e[s].test(d))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'"');r+=(m===0?l.prefix:l.delimiter)+d}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(d=i(String(c),l),!e[s].test(d))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but got "'+d+'"');r+=l.prefix+d;continue}if(l.optional){l.partial&&(r+=l.prefix);continue}throw new TypeError('Expected "'+l.name+'" to be '+(l.repeat?"an array":"a string"))}return r}}function se(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Xa(t){return t.replace(/([=!:$/()])/g,"\\$1")}function ra(t){return t&&t.sensitive?"":"i"}function Ja(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var n=0;n<o.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Qa(t,e,o){for(var n=[],a=0;a<t.length;a++)n.push(la(t[a],e,o).source);return new RegExp("(?:"+n.join("|")+")",ra(o))}function Za(t,e,o){return ia(No(t,o),e,o)}function ia(t,e,o){o=o||{};for(var n=o.strict,a=o.start!==!1,r=o.end!==!1,i=se(o.delimiter||oa),s=o.delimiters||na,l=[].concat(o.endsWith||[]).map(se).concat("$").join("|"),c=a?"^":"",d=t.length===0,m=0;m<t.length;m++){var p=t[m];if(typeof p=="string")c+=se(p),d=m===t.length-1&&s.indexOf(p[p.length-1])>-1;else{var h=p.repeat?"(?:"+p.pattern+")(?:"+se(p.delimiter)+"(?:"+p.pattern+"))*":p.pattern;e&&e.push(p),p.optional?p.partial?c+=se(p.prefix)+"("+h+")?":c+="(?:"+se(p.prefix)+"("+h+"))?":c+=se(p.prefix)+"("+h+")"}}return r?(n||(c+="(?:"+i+")?"),c+=l==="$"?"$":"(?="+l+")"):(n||(c+="(?:"+i+"(?="+l+"))?"),d||(c+="(?="+i+"|"+l+")")),new RegExp(c,ra(o))}function la(t,e,o){return t instanceof RegExp?Ja(t,e):Array.isArray(t)?Qa(t,e,o):Za(t,e,o)}De.parse=Ba;De.compile=Ha;De.tokensToFunction=Wa;De.tokensToRegExp=Ga;const{hasOwnProperty:er}=Object.prototype,So=new Map;So.set("|false",{keys:[],pattern:/(?:)/});function pn(t){try{return decodeURIComponent(t)}catch{return t}}function tr(t,e,o,n,a){o=!!o;const r=`${t}|${o}`;let i=So.get(r);if(!i){const c=[];i={keys:c,pattern:De(t,c,{end:o,strict:t===""})},So.set(r,i)}const s=i.pattern.exec(e);if(!s)return null;const l=Object.assign({},a);for(let c=1;c<s.length;c++){const d=i.keys[c-1],m=d.name,p=s[c];(p!==void 0||!er.call(l,m))&&(d.repeat?l[m]=p?p.split(d.delimiter).map(pn):[]:l[m]=p&&pn(p))}return{path:s[0],keys:(n||[]).concat(i.keys),params:l}}function sa(t,e,o,n,a){let r,i,s=0,l=t.path||"";return l.charAt(0)==="/"&&(o&&(l=l.substr(1)),o=!0),{next(c){if(t===c)return{done:!0};const d=t.__children=t.__children||t.children;if(!r&&(r=tr(l,e,!d,n,a),r))return{done:!1,value:{route:t,keys:r.keys,params:r.params,path:r.path}};if(r&&d)for(;s<d.length;){if(!i){const p=d[s];p.parent=t;let h=r.path.length;h>0&&e.charAt(h)==="/"&&(h+=1),i=sa(p,e.substr(h),o,r.keys,r.params)}const m=i.next(c);if(!m.done)return{done:!1,value:m.value};i=null,s++}return{done:!0}}}}function or(t){if(ve(t.route.action))return t.route.action(t)}function nr(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function ar(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function rr(t,e){const{route:o,path:n}=e;if(o&&!o.__synthetic){const a={path:n,route:o};if(!t.chain)t.chain=[];else if(o.parent){let r=t.chain.length;for(;r--&&t.chain[r].route&&t.chain[r].route!==o.parent;)t.chain.pop()}t.chain.push(a)}}class Ge{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||or,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){ln(e);const o=[..._t(e)];this.root.__children=o}addRoutes(e){return ln(e),this.root.__children.push(..._t(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,K(e)?{pathname:e}:e),n=sa(this.root,this.__normalizePathname(o.pathname),this.baseUrl),a=this.resolveRoute;let r=null,i=null,s=o;function l(c,d=r.value.route,m){const p=m===null&&r.value.route;return r=i||n.next(p),i=null,!c&&(r.done||!nr(d,r.value.route))?(i=r,Promise.resolve(Pe)):r.done?Promise.reject(ta(o)):(s=Object.assign(s?{chain:s.chain?s.chain.slice(0):[]}:{},o,r.value),rr(s,r.value),Promise.resolve(a(s)).then(h=>h!=null&&h!==Pe?(s.result=h.result||h,s):l(c,d,h)))}return o.next=l,Promise.resolve().then(()=>l(!0,this.root)).catch(c=>{const d=ar(s);if(c?console.warn(d):c=new Error(d),c.context=c.context||s,c instanceof DOMException||(c.code=c.code||500),this.errorHandler)return s.result=this.errorHandler(c),s;throw c})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,n=this.constructor.__createUrl(e,o).href;if(n.slice(0,o.length)===o)return n.slice(o.length)}}Ge.pathToRegexp=De;const{pathToRegexp:fn}=Ge,un=new Map;function ca(t,e,o){const n=e.name||e.component;if(n&&(t.has(n)?t.get(n).push(e):t.set(n,[e])),Array.isArray(o))for(let a=0;a<o.length;a++){const r=o[a];r.parent=e,ca(t,r,r.__children||r.children)}}function mn(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function hn(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function ir(t,e={}){if(!(t instanceof Ge))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(n,a)=>{let r=mn(o,n);if(!r&&(o.clear(),ca(o,t.root,t.root.__children),r=mn(o,n),!r))throw new Error(`Route "${n}" not found`);let i=un.get(r.fullPath);if(!i){let l=hn(r),c=r.parent;for(;c;){const h=hn(c);h&&(l=h.replace(/\/$/,"")+"/"+l.replace(/^\//,"")),c=c.parent}const d=fn.parse(l),m=fn.tokensToFunction(d),p=Object.create(null);for(let h=0;h<d.length;h++)K(d[h])||(p[d[h].name]=!0);i={toPath:m,keys:p},un.set(l,i),r.fullPath=l}let s=i.toPath(a,e)||"/";if(e.stringifyQueryParams&&a){const l={},c=Object.keys(a);for(let m=0;m<c.length;m++){const p=c[m];i.keys[p]||(l[p]=a[p])}const d=e.stringifyQueryParams(l);d&&(s+=d.charAt(0)==="?"?d:`?${d}`)}return s}}let bn=[];function lr(t){bn.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),bn=t}const sr=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},cr=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function gn(t,e){return t.classList.add(e),new Promise(o=>{if(sr(t)){const n=t.getBoundingClientRect(),a=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;t.setAttribute("style",`position: absolute; ${a}`),cr(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const dr=256;function Yt(t){return t!=null}function pr(t){const e=Object.assign({},t);return delete e.next,e}function G({pathname:t="",search:e="",hash:o="",chain:n=[],params:a={},redirectFrom:r,resolver:i},s){const l=n.map(c=>c.route);return{baseUrl:i&&i.baseUrl||"",pathname:t,search:e,hash:o,routes:l,route:s||l.length&&l[l.length-1]||null,params:a,redirectFrom:r,getUrl:(c={})=>gt(ce.pathToRegexp.compile(da(l))(Object.assign({},a,c)),i)}}function wn(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function fr(t,e){e.location=G(t);const o=t.chain.map(n=>n.route).indexOf(t.route);return t.chain[o].element=e,e}function bt(t,e,o){if(ve(t))return t.apply(o,e)}function xn(t,e,o){return n=>{if(n&&(n.cancel||n.redirect))return n;if(o)return bt(o[t],e,o)}}function ur(t,e){if(!Array.isArray(t)&&!zt(t))throw new Error(X(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=_t(t);for(let n=0;n<o.length;n++)ea(o[n]),e.__children.push(o[n])}function pt(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function gt(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function da(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class ce extends Ge{constructor(e,o){const n=document.head.querySelector("base"),a=n&&n.getAttribute("href");super([],Object.assign({baseUrl:a&&Ge.__createUrl(a,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=i=>this.__resolveRoute(i);const r=ce.NavigationTrigger;ce.setTriggers.apply(ce,Object.keys(r).map(i=>r[i])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=G({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let n=Promise.resolve();ve(o.children)&&(n=n.then(()=>o.children(pr(e))).then(r=>{!Yt(r)&&!ve(o.children)&&(r=o.children),ur(r,o)}));const a={redirect:r=>wn(e,r),component:r=>{const i=document.createElement(r);return this.__createdByRouter.set(i,!0),i}};return n.then(()=>{if(this.__isLatestRender(e))return bt(o.action,[e,a],o)}).then(r=>{if(Yt(r)&&(r instanceof HTMLElement||r.redirect||r===Pe))return r;if(K(o.redirect))return a.redirect(o.redirect);if(o.bundle)return Va(o.bundle).then(()=>{},()=>{throw new Error(X(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(r=>{if(Yt(r))return r;if(K(o.component))return a.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const n=++this.__lastStartedRenderId,a=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:n});return this.ready=this.resolve(a).then(r=>this.__fullyResolveChain(r)).then(r=>{if(this.__isLatestRender(r)){const i=this.__previousContext;if(r===i)return this.__updateBrowserHistory(i,!0),this.location;if(this.location=G(r),o&&this.__updateBrowserHistory(r,n===1),He("location-changed",{router:this,location:this.location}),r.__skipAttach)return this.__copyUnchangedElements(r,i),this.__previousContext=r,this.location;this.__addAppearingContent(r,i);const s=this.__animateIfNeeded(r);return this.__runOnAfterEnterCallbacks(r),this.__runOnAfterLeaveCallbacks(r,i),s.then(()=>{if(this.__isLatestRender(r))return this.__removeDisappearingContent(),this.__previousContext=r,this.location})}}).catch(r=>{if(n===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(a),pt(this.__outlet&&this.__outlet.children),this.location=G(Object.assign(a,{resolver:this})),He("error",Object.assign({router:this,error:r},a)),r}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(n=>{const r=n!==o?n:e,s=gt(da(n.chain),n.resolver)===n.pathname,l=(c,d=c.route,m)=>c.next(void 0,d,m).then(p=>p===null||p===Pe?s?c:d.parent!==null?l(c,d.parent,p):p:p);return l(n).then(c=>{if(c===null||c===Pe)throw ta(r);return c&&c!==Pe&&c!==n?this.__fullyResolveChain(r,c):this.__amendWithOnBeforeCallbacks(n)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(fr(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(n=>this.__findComponentContextAfterAllRedirects(n)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(X(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Fa(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},n=o.chain||[],a=e.chain;let r=Promise.resolve();const i=()=>({cancel:!0}),s=l=>wn(e,l);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let l=0;l<Math.min(n.length,a.length)&&!(n[l].route!==a[l].route||n[l].path!==a[l].path&&n[l].element!==a[l].element||!this.__isReusableElement(n[l].element,a[l].element));l=++e.__divergedChainIndex);if(e.__skipAttach=a.length===n.length&&e.__divergedChainIndex==a.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let l=a.length-1;l>=0;l--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:i},n[l]);for(let l=0;l<a.length;l++)r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:i,redirect:s},a[l]),n[l].element.location=G(e,n[l].route)}else for(let l=n.length-1;l>=e.__divergedChainIndex;l--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:i},n[l])}if(!e.__skipAttach)for(let l=0;l<a.length;l++)l<e.__divergedChainIndex?l<n.length&&n[l].element&&(n[l].element.location=G(e,n[l].route)):(r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:i,redirect:s},a[l]),a[l].element&&(a[l].element.location=G(e,a[l].route)));return r.then(l=>{if(l){if(l.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(l.redirect)return this.__redirect(l.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,n,a){const r=G(o);return e.then(i=>{if(this.__isLatestRender(o))return xn("onBeforeLeave",[r,n,this],a.element)(i)}).then(i=>{if(!(i||{}).redirect)return i})}__runOnBeforeEnterCallbacks(e,o,n,a){const r=G(o,a.route);return e.then(i=>{if(this.__isLatestRender(o))return xn("onBeforeEnter",[r,n,this],a.element)(i)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,n){if(o>dr)throw new Error(X(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:n})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(X(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:n=""},a){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==n){const r=a?"replaceState":"pushState";window.history[r](null,document.title,e+o+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let n=this.__outlet;for(let a=0;a<e.__divergedChainIndex;a++){const r=o&&o.chain[a].element;if(r)if(r.parentNode===n)e.chain[a].element=r,n=r;else break}return n}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const n=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(n.children).filter(r=>this.__addedByRouter.get(r)&&r!==e.result);let a=n;for(let r=e.__divergedChainIndex;r<e.chain.length;r++){const i=e.chain[r].element;i&&(a.appendChild(i),this.__addedByRouter.set(i,!0),a===n&&this.__appearingContent.push(i),a=i)}}__removeDisappearingContent(){this.__disappearingContent&&pt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(pt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let n=o.chain.length-1;n>=e.__divergedChainIndex&&this.__isLatestRender(e);n--){const a=o.chain[n].element;if(a)try{const r=G(e);bt(a.onAfterLeave,[r,{},o.resolver],a)}finally{this.__disappearingContent.indexOf(a)>-1&&pt(a.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const n=e.chain[o].element||{},a=G(e,e.chain[o].route);bt(n.onAfterEnter,[a,{},e.resolver],n)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],n=(this.__appearingContent||[])[0],a=[],r=e.chain;let i;for(let s=r.length;s>0;s--)if(r[s-1].route.animate){i=r[s-1].route.animate;break}if(o&&n&&i){const s=zt(i)&&i.leave||"leaving",l=zt(i)&&i.enter||"entering";a.push(gn(o,s)),a.push(gn(n,l))}return Promise.all(a).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:n,hash:a}=e?e.detail:window.location;K(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:n,hash:a},!0))}static setTriggers(...e){lr(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=ir(this)),gt(this.__urlForName(e,o),this)}urlForPath(e,o){return gt(ce.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:n,hash:a}=K(e)?this.__createUrl(e,"http://a"):e;return He("go",{pathname:o,search:n,hash:a})}}const mr=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,wt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function hr(){function t(){return!0}return pa(t)}function br(){try{return gr()?!0:wr()?wt?!xr():!hr():!1}catch{return!1}}function gr(){return localStorage.getItem("vaadin.developmentmode.force")}function wr(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function xr(){return!!(wt&&Object.keys(wt).map(e=>wt[e]).filter(e=>e.productionMode).length>0)}function pa(t,e){if(typeof t!="function")return;const o=mr.exec(t.toString());if(o)try{t=new Function(o[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return t(e)}window.Vaadin=window.Vaadin||{};const vn=function(t,e){if(window.Vaadin.developmentMode)return pa(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=br());function vr(){}const yr=function(){if(typeof vn=="function")return vn(vr)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});yr();ce.NavigationTrigger={POPSTATE:Ua,CLICK:Da};var Kt,A;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})(A||(A={}));class kr{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var n;(n=o==null?void 0:o.active)===null||n===void 0||n.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=A.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(A.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(A.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const n of this.stateChangeListeners)n(o,this.connectionState)}}get online(){return this.connectionState===A.CONNECTED||this.connectionState===A.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=A.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const _r=t=>!!(t==="localhost"||t==="[::1]"||t.match(/^127\.\d+\.\d+\.\d+$/)),ft=window;if(!(!((Kt=ft.Vaadin)===null||Kt===void 0)&&Kt.connectionState)){let t;_r(window.location.hostname)?t=!0:t=navigator.onLine,ft.Vaadin=ft.Vaadin||{},ft.Vaadin.connectionState=new kr(t?A.CONNECTED:A.CONNECTION_LOST)}function q(t,e,o,n){var a=arguments.length,r=a<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,o,n);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(r=(a<3?i(r):a>3?i(e,o,r):i(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Sr=!1,xt=window,Po=xt.ShadowRoot&&(xt.ShadyCSS===void 0||xt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ro=Symbol(),yn=new WeakMap;class Io{constructor(e,o,n){if(this._$cssResult$=!0,n!==Ro)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(Po&&e===void 0){const n=o!==void 0&&o.length===1;n&&(e=yn.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),n&&yn.set(o,e))}return e}toString(){return this.cssText}}const Er=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},C=t=>new Io(typeof t=="string"?t:String(t),void 0,Ro),w=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((n,a,r)=>n+Er(a)+t[r+1],t[0]);return new Io(o,t,Ro)},zr=(t,e)=>{Po?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{const n=document.createElement("style"),a=xt.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=o.cssText,t.appendChild(n)})},Cr=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return C(e)},kn=Po||Sr?t=>t:t=>t instanceof CSSStyleSheet?Cr(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Xt,Jt,Qt,fa;const ee=window;let ua,de;const _n=ee.trustedTypes,Ar=_n?_n.emptyScript:"",vt=ee.reactiveElementPolyfillSupportDevMode;{const t=(Xt=ee.litIssuedWarnings)!==null&&Xt!==void 0?Xt:ee.litIssuedWarnings=new Set;de=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},de("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Jt=ee.ShadyDOM)===null||Jt===void 0)&&Jt.inUse&&vt===void 0&&de("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),ua=e=>({then:(o,n)=>{de("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),o!==void 0&&o(!1)}})}const Zt=t=>{ee.emitLitDebugLogEvents&&ee.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},ma=(t,e)=>t,Eo={toAttribute(t,e){switch(e){case Boolean:t=t?Ar:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},ha=(t,e)=>e!==t&&(e===e||t===t),eo={attribute:!0,type:String,converter:Eo,reflect:!1,hasChanged:ha},zo="finalized";class te extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this._initialize()}static addInitializer(e){var o;this.finalize(),((o=this._initializers)!==null&&o!==void 0?o:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((o,n)=>{const a=this.__attributeNameForProperty(n,o);a!==void 0&&(this.__attributeToPropertyMap.set(a,n),e.push(a))}),e}static createProperty(e,o=eo){var n;if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(e,o),!o.noAccessor&&!this.prototype.hasOwnProperty(e)){const a=typeof e=="symbol"?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,a,o);r!==void 0&&(Object.defineProperty(this.prototype,e,r),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((n=this.__reactivePropertyKeys)!==null&&n!==void 0?n:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,o,n){return{get(){return this[o]},set(a){const r=this[e];this[o]=a,this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||eo}static finalize(){if(this.hasOwnProperty(zo))return!1;this[zo]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(ma("properties"))){const o=this.properties,n=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const a of n)this.createProperty(a,o[a])}this.elementStyles=this.finalizeStyles(this.styles);{const o=(n,a=!1)=>{this.prototype.hasOwnProperty(n)&&de(a?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${this.name}. It has been ${a?"renamed":"removed"} in this version of LitElement.`)};o("initialize"),o("requestUpdateInternal"),o("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const a of n)o.unshift(kn(a))}else e!==void 0&&o.push(kn(e));return o}static __attributeNameForProperty(e,o){const n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}_initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(o=>o(this))}addController(e){var o,n;((o=this.__controllers)!==null&&o!==void 0?o:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var o;(o=this.__controllers)===null||o===void 0||o.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,o)=>{this.hasOwnProperty(o)&&(this.__instanceProperties.set(o,this[o]),delete this[o])})}createRenderRoot(){var e;const o=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return zr(o,this.constructor.elementStyles),o}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostConnected)===null||n===void 0?void 0:n.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostDisconnected)===null||n===void 0?void 0:n.call(o)})}attributeChangedCallback(e,o,n){this._$attributeToProperty(e,n)}__propertyToAttribute(e,o,n=eo){var a;const r=this.constructor.__attributeNameForProperty(e,n);if(r!==void 0&&n.reflect===!0){const s=(((a=n.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?n.converter:Eo).toAttribute(o,n.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&s===void 0&&de("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var n;const a=this.constructor,r=a.__attributeToPropertyMap.get(e);if(r!==void 0&&this.__reflectingProperty!==r){const i=a.getPropertyOptions(r),s=typeof i.converter=="function"?{fromAttribute:i.converter}:((n=i.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?i.converter:Eo;this.__reflectingProperty=r,this[r]=s.fromAttribute(o,i.type),this.__reflectingProperty=null}}requestUpdate(e,o,n){let a=!0;return e!==void 0&&(n=n||this.constructor.getPropertyOptions(e),(n.hasChanged||ha)(this[e],o)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,o),n.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,n))):a=!1),!this.isUpdatePending&&a&&(this.__updatePromise=this.__enqueueUpdate()),ua(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,o;if(!this.isUpdatePending)return;if(Zt==null||Zt({kind:"update"}),!this.hasUpdated){const r=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(i=>{var s;this.hasOwnProperty(i)&&!(!((s=this.__instanceProperties)===null||s===void 0)&&s.has(i))&&r.push(i)}),r.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${r.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((r,i)=>this[i]=r),this.__instanceProperties=void 0);let n=!1;const a=this._$changedProperties;try{n=this.shouldUpdate(a),n?(this.willUpdate(a),(o=this.__controllers)===null||o===void 0||o.forEach(r=>{var i;return(i=r.hostUpdate)===null||i===void 0?void 0:i.call(r)}),this.update(a)):this.__markUpdated()}catch(r){throw n=!1,this.__markUpdated(),r}n&&this._$didUpdate(a)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)===null||o===void 0||o.forEach(n=>{var a;return(a=n.hostUpdated)===null||a===void 0?void 0:a.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&de("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((o,n)=>this.__propertyToAttribute(n,this[n],o)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}fa=zo;te[fa]=!0;te.elementProperties=new Map;te.elementStyles=[];te.shadowRootOptions={mode:"open"};vt==null||vt({ReactiveElement:te});{te.enabledWarnings=["change-in-update"];const t=function(e){e.hasOwnProperty(ma("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};te.enableWarning=function(e){t(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},te.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}((Qt=ee.reactiveElementVersions)!==null&&Qt!==void 0?Qt:ee.reactiveElementVersions=[]).push("1.6.1");ee.reactiveElementVersions.length>1&&de("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var to,oo,no,ao;const D=window,g=t=>{D.emitLitDebugLogEvents&&D.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let $r=0,Ct;(to=D.litIssuedWarnings)!==null&&to!==void 0||(D.litIssuedWarnings=new Set),Ct=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",D.litIssuedWarnings.has(e)||(console.warn(e),D.litIssuedWarnings.add(e))},Ct("dev-mode","Lit is in dev mode. Not recommended for production!");const H=!((oo=D.ShadyDOM)===null||oo===void 0)&&oo.inUse&&((no=D.ShadyDOM)===null||no===void 0?void 0:no.noPatch)===!0?D.ShadyDOM.wrap:t=>t,Oe=D.trustedTypes,Sn=Oe?Oe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Lr=t=>t,Ft=(t,e,o)=>Lr,Tr=t=>{if(_e!==Ft)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");_e=t},Nr=()=>{_e=Ft},Co=(t,e,o)=>_e(t,e,o),Ao="$lit$",ae=`lit$${String(Math.random()).slice(9)}$`,ba="?"+ae,Pr=`<${ba}>`,ye=document,Ye=()=>ye.createComment(""),Ke=t=>t===null||typeof t!="object"&&typeof t!="function",ga=Array.isArray,Rr=t=>ga(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",ro=`[ 	
\f\r]`,Ir=`[^ 	
\f\r"'\`<>=]`,Or=`[^\\s"'>=/]`,qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,En=1,io=2,Mr=3,zn=/-->/g,Cn=/>/g,be=new RegExp(`>|${ro}(?:(${Or}+)(${ro}*=${ro}*(?:${Ir}|("|')|))|$)`,"g"),Fr=0,An=1,Vr=2,$n=3,lo=/'/g,so=/"/g,wa=/^(?:script|style|textarea|title)$/i,jr=1,At=2,Oo=1,$t=2,Dr=3,qr=4,Ur=5,Mo=6,Br=7,xa=t=>(e,...o)=>(e.some(n=>n===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:t,strings:e,values:o}),b=xa(jr),Te=xa(At),ke=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Ln=new WeakMap,xe=ye.createTreeWalker(ye,129,null,!1);let _e=Ft;const Hr=(t,e)=>{const o=t.length-1,n=[];let a=e===At?"<svg>":"",r,i=qe;for(let l=0;l<o;l++){const c=t[l];let d=-1,m,p=0,h;for(;p<c.length&&(i.lastIndex=p,h=i.exec(c),h!==null);)if(p=i.lastIndex,i===qe){if(h[En]==="!--")i=zn;else if(h[En]!==void 0)i=Cn;else if(h[io]!==void 0)wa.test(h[io])&&(r=new RegExp(`</${h[io]}`,"g")),i=be;else if(h[Mr]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else i===be?h[Fr]===">"?(i=r??qe,d=-1):h[An]===void 0?d=-2:(d=i.lastIndex-h[Vr].length,m=h[An],i=h[$n]===void 0?be:h[$n]==='"'?so:lo):i===so||i===lo?i=be:i===zn||i===Cn?i=qe:(i=be,r=void 0);console.assert(d===-1||i===be||i===lo||i===so,"unexpected parse state B");const ie=i===be&&t[l+1].startsWith("/>")?" ":"";a+=i===qe?c+Pr:d>=0?(n.push(m),c.slice(0,d)+Ao+c.slice(d)+ae+ie):c+ae+(d===-2?(n.push(void 0),l):ie)}const s=a+(t[o]||"<?>")+(e===At?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let l="invalid template strings array";throw l=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.

          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(l)}return[Sn!==void 0?Sn.createHTML(s):s,n]};class Xe{constructor({strings:e,["_$litType$"]:o},n){this.parts=[];let a,r=0,i=0;const s=e.length-1,l=this.parts,[c,d]=Hr(e,o);if(this.el=Xe.createElement(c,n),xe.currentNode=this.el.content,o===At){const m=this.el.content,p=m.firstChild;p.remove(),m.append(...p.childNodes)}for(;(a=xe.nextNode())!==null&&l.length<s;){if(a.nodeType===1){{const m=a.localName;if(/^(?:textarea|template)$/i.test(m)&&a.innerHTML.includes(ae)){const p=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(p);Ct("",p)}}if(a.hasAttributes()){const m=[];for(const p of a.getAttributeNames())if(p.endsWith(Ao)||p.startsWith(ae)){const h=d[i++];if(m.push(p),h!==void 0){const le=a.getAttribute(h.toLowerCase()+Ao).split(ae),oe=/([.?@])?(.*)/.exec(h);l.push({type:Oo,index:r,name:oe[2],strings:le,ctor:oe[1]==="."?Gr:oe[1]==="?"?Kr:oe[1]==="@"?Xr:Vt})}else l.push({type:Mo,index:r})}for(const p of m)a.removeAttribute(p)}if(wa.test(a.tagName)){const m=a.textContent.split(ae),p=m.length-1;if(p>0){a.textContent=Oe?Oe.emptyScript:"";for(let h=0;h<p;h++)a.append(m[h],Ye()),xe.nextNode(),l.push({type:$t,index:++r});a.append(m[p],Ye())}}}else if(a.nodeType===8)if(a.data===ba)l.push({type:$t,index:r});else{let p=-1;for(;(p=a.data.indexOf(ae,p+1))!==-1;)l.push({type:Br,index:r}),p+=ae.length-1}r++}g==null||g({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const n=ye.createElement("template");return n.innerHTML=e,n}}function Me(t,e,o=t,n){var a,r,i,s;if(e===ke)return e;let l=n!==void 0?(a=o.__directives)===null||a===void 0?void 0:a[n]:o.__directive;const c=Ke(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((r=l==null?void 0:l._$notifyDirectiveConnectionChanged)===null||r===void 0||r.call(l,!1),c===void 0?l=void 0:(l=new c(t),l._$initialize(t,o,n)),n!==void 0?((i=(s=o).__directives)!==null&&i!==void 0?i:s.__directives=[])[n]=l:o.__directive=l),l!==void 0&&(e=Me(t,l._$resolve(t,e.values),l,n)),e}class Wr{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var o;const{el:{content:n},parts:a}=this._$template,r=((o=e==null?void 0:e.creationScope)!==null&&o!==void 0?o:ye).importNode(n,!0);xe.currentNode=r;let i=xe.nextNode(),s=0,l=0,c=a[0];for(;c!==void 0;){if(s===c.index){let d;c.type===$t?d=new nt(i,i.nextSibling,this,e):c.type===Oo?d=new c.ctor(i,c.name,c.strings,this,e):c.type===Mo&&(d=new Jr(i,this,e)),this._$parts.push(d),c=a[++l]}s!==(c==null?void 0:c.index)&&(i=xe.nextNode(),s++)}return xe.currentNode=ye,r}_update(e){let o=0;for(const n of this._$parts)n!==void 0&&(g==null||g({kind:"set part",part:n,value:e[o],valueIndex:o,values:e,templateInstance:this}),n.strings!==void 0?(n._$setValue(e,n,o),o+=n.strings.length-2):n._$setValue(e[o])),o++}}class nt{constructor(e,o,n,a){var r;this.type=$t,this._$committedValue=z,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=n,this.options=a,this.__isConnected=(r=a==null?void 0:a.isConnected)!==null&&r!==void 0?r:!0,this._textSanitizer=void 0}get _$isConnected(){var e,o;return(o=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&o!==void 0?o:this.__isConnected}get parentNode(){let e=H(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var n;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Me(this,e,o),Ke(e))e===z||e==null||e===""?(this._$committedValue!==z&&(g==null||g({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=z):e!==this._$committedValue&&e!==ke&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((n=this.options)===null||n===void 0?void 0:n.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Rr(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return H(H(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),_e!==Ft){const n=(o=this._$startNode.parentNode)===null||o===void 0?void 0:o.nodeName;if(n==="STYLE"||n==="SCRIPT"){let a="Forbidden";throw n==="STYLE"?a="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":a="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(a)}}g==null||g({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==z&&Ke(this._$committedValue)){const o=H(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Co(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=ye.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=Co(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var o;const{values:n,["_$litType$"]:a}=e,r=typeof a=="number"?this._$getTemplate(e):(a.el===void 0&&(a.el=Xe.createElement(a.h,this.options)),a);if(((o=this._$committedValue)===null||o===void 0?void 0:o._$template)===r)g==null||g({kind:"template updating",template:r,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:n}),this._$committedValue._update(n);else{const i=new Wr(r,this),s=i._clone(this.options);g==null||g({kind:"template instantiated",template:r,instance:i,parts:i._$parts,options:this.options,fragment:s,values:n}),i._update(n),g==null||g({kind:"template instantiated and updated",template:r,instance:i,parts:i._$parts,options:this.options,fragment:s,values:n}),this._commitNode(s),this._$committedValue=i}}_$getTemplate(e){let o=Ln.get(e.strings);return o===void 0&&Ln.set(e.strings,o=new Xe(e)),o}_commitIterable(e){ga(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let n=0,a;for(const r of e)n===o.length?o.push(a=new nt(this._insert(Ye()),this._insert(Ye()),this,this.options)):a=o[n],a._$setValue(r),n++;n<o.length&&(this._$clear(a&&H(a._$endNode).nextSibling,n),o.length=n)}_$clear(e=H(this._$startNode).nextSibling,o){var n;for((n=this._$notifyConnectionChanged)===null||n===void 0||n.call(this,!1,!0,o);e&&e!==this._$endNode;){const a=H(e).nextSibling;H(e).remove(),e=a}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)===null||o===void 0||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Vt{constructor(e,o,n,a,r){this.type=Oo,this._$committedValue=z,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=a,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$committedValue=new Array(n.length-1).fill(new String),this.strings=n):this._$committedValue=z,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,o=this,n,a){const r=this.strings;let i=!1;if(r===void 0)e=Me(this,e,o,0),i=!Ke(e)||e!==this._$committedValue&&e!==ke,i&&(this._$committedValue=e);else{const s=e;e=r[0];let l,c;for(l=0;l<r.length-1;l++)c=Me(this,s[n+l],o,l),c===ke&&(c=this._$committedValue[l]),i||(i=!Ke(c)||c!==this._$committedValue[l]),c===z?e=z:e!==z&&(e+=(c??"")+r[l+1]),this._$committedValue[l]=c}i&&!a&&this._commitValue(e)}_commitValue(e){e===z?H(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"attribute")),e=this._sanitizer(e??""),g==null||g({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),H(this.element).setAttribute(this.name,e??""))}}class Gr extends Vt{constructor(){super(...arguments),this.type=Dr}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"property")),e=this._sanitizer(e),g==null||g({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===z?void 0:e}}const Yr=Oe?Oe.emptyScript:"";class Kr extends Vt{constructor(){super(...arguments),this.type=qr}_commitValue(e){g==null||g({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==z),options:this.options}),e&&e!==z?H(this.element).setAttribute(this.name,Yr):H(this.element).removeAttribute(this.name)}}class Xr extends Vt{constructor(e,o,n,a,r){if(super(e,o,n,a,r),this.type=Ur,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){var n;if(e=(n=Me(this,e,o,0))!==null&&n!==void 0?n:z,e===ke)return;const a=this._$committedValue,r=e===z&&a!==z||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==z&&(a===z||r);g==null||g({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:r,addListener:i,oldListener:a}),r&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o,n;typeof this._$committedValue=="function"?this._$committedValue.call((n=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&n!==void 0?n:this.element,e):this._$committedValue.handleEvent(e)}}class Jr{constructor(e,o,n){this.element=e,this.type=Mo,this._$disconnectableChildren=void 0,this._$parent=o,this.options=n}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){g==null||g({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Me(this,e)}}const co=D.litHtmlPolyfillSupportDevMode;co==null||co(Xe,nt);((ao=D.litHtmlVersions)!==null&&ao!==void 0?ao:D.litHtmlVersions=[]).push("2.7.4");D.litHtmlVersions.length>1&&Ct("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Re=(t,e,o)=>{var n,a;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const r=$r++,i=(n=o==null?void 0:o.renderBefore)!==null&&n!==void 0?n:e;let s=i._$litPart$;if(g==null||g({kind:"begin render",id:r,value:t,container:e,options:o,part:s}),s===void 0){const l=(a=o==null?void 0:o.renderBefore)!==null&&a!==void 0?a:null;i._$litPart$=s=new nt(e.insertBefore(Ye(),l),l,void 0,o??{})}return s._$setValue(t),g==null||g({kind:"end render",id:r,value:t,container:e,options:o,part:s}),s};Re.setSanitizer=Tr,Re.createSanitizer=Co,Re._testOnlyClearSanitizerFactoryDoNotCallOrElse=Nr;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var po,fo,uo;let Fo;{const t=(po=globalThis.litIssuedWarnings)!==null&&po!==void 0?po:globalThis.litIssuedWarnings=new Set;Fo=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class N extends te{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,o;const n=super.createRenderRoot();return(e=(o=this.renderOptions).renderBefore)!==null&&e!==void 0||(o.renderBefore=n.firstChild),n}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Re(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return ke}}N.finalized=!0;N._$litElement$=!0;(fo=globalThis.litElementHydrateSupport)===null||fo===void 0||fo.call(globalThis,{LitElement:N});const mo=globalThis.litElementPolyfillSupportDevMode;mo==null||mo({LitElement:N});N.finalize=function(){if(!te.finalize.call(this))return!1;const e=(o,n,a=!1)=>{if(o.hasOwnProperty(n)){const r=(typeof o=="function"?o:o.constructor).name;Fo(a?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${r}. It has been ${a?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((uo=globalThis.litElementVersions)!==null&&uo!==void 0?uo:globalThis.litElementVersions=[]).push("3.3.2");globalThis.litElementVersions.length>1&&Fo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qr=(t,e)=>(customElements.define(t,e),e),Zr=(t,e)=>{const{kind:o,elements:n}=e;return{kind:o,elements:n,finisher(a){customElements.define(t,a)}}},U=t=>e=>typeof e=="function"?Qr(t,e):Zr(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ei=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}},ti=(t,e,o)=>{e.constructor.createProperty(o,t)};function x(t){return(e,o)=>o!==void 0?ti(t,e,o):ei(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(t){return x({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi=({finisher:t,descriptor:e})=>(o,n)=>{var a;if(n!==void 0){const r=o.constructor;e!==void 0&&Object.defineProperty(o,n,e(n)),t==null||t(r,n)}else{const r=(a=o.originalKey)!==null&&a!==void 0?a:o.key,i=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(o.key)}:{...o,key:r};return t!=null&&(i.finisher=function(s){t(s,r)}),i}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t,e){return oi({descriptor:o=>{const n={get(){var a,r;return(r=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(t))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const a=typeof o=="symbol"?Symbol():`__${o}`;n.get=function(){var r,i;return this[a]===void 0&&(this[a]=(i=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&i!==void 0?i:null),this[a]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ho;const ni=window;((ho=ni.HTMLSlotElement)===null||ho===void 0?void 0:ho.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ai={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ri=t=>(...e)=>({_$litDirective$:t,values:e});class ii{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,n){this.__part=e,this._$parent=o,this.__attributeIndex=n}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class li extends ii{constructor(e){var o;if(super(e),e.type!==ai.ATTRIBUTE||e.name!=="class"||((o=e.strings)===null||o===void 0?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var n,a;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in o)o[i]&&!(!((n=this._staticClasses)===null||n===void 0)&&n.has(i))&&this._previousClasses.add(i);return this.render(o)}const r=e.element.classList;this._previousClasses.forEach(i=>{i in o||(r.remove(i),this._previousClasses.delete(i))});for(const i in o){const s=!!o[i];s!==this._previousClasses.has(i)&&!(!((a=this._staticClasses)===null||a===void 0)&&a.has(i))&&(s?(r.add(i),this._previousClasses.add(i)):(r.remove(i),this._previousClasses.delete(i)))}return ke}}const Vo=ri(li),bo="css-loading-indicator";var Y;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(Y||(Y={}));class P extends N{constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=Y.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=A.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,o;const n=window;return!((e=n.Vaadin)===null||e===void 0)&&e.connectionIndicator||(n.Vaadin=n.Vaadin||{},n.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(n.Vaadin.connectionIndicator)),(o=n.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}render(){return b`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Vo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===A.CONNECTION_LOST,this.reconnecting=o===A.RECONNECTING,this.updateLoading(o===A.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=Y.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=Y.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=Y.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=Y.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(bo)){const e=document.createElement("style");e.id=bo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(bo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
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
    `}getLoadingBarStyle(){switch(this.loadingBarState){case Y.IDLE:return"display: none";case Y.FIRST:case Y.SECOND:case Y.THIRD:return"display: block";default:return""}}timeoutFor(e,o,n,a){return e!==0&&window.clearTimeout(e),o?window.setTimeout(n,a):0}static get instance(){return P.create()}}q([x({type:Number})],P.prototype,"firstDelay",void 0);q([x({type:Number})],P.prototype,"secondDelay",void 0);q([x({type:Number})],P.prototype,"thirdDelay",void 0);q([x({type:Number})],P.prototype,"expandedDuration",void 0);q([x({type:String})],P.prototype,"onlineText",void 0);q([x({type:String})],P.prototype,"offlineText",void 0);q([x({type:String})],P.prototype,"reconnectingText",void 0);q([x({type:Boolean,reflect:!0})],P.prototype,"offline",void 0);q([x({type:Boolean,reflect:!0})],P.prototype,"reconnecting",void 0);q([x({type:Boolean,reflect:!0})],P.prototype,"expanded",void 0);q([x({type:Boolean,reflect:!0})],P.prototype,"loading",void 0);q([x({type:String})],P.prototype,"loadingBarState",void 0);q([x({type:Boolean})],P.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",P);P.instance;const Je=window;Je.Vaadin=Je.Vaadin||{};Je.Vaadin.registrations=Je.Vaadin.registrations||[];Je.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Tn extends Error{}const Ue=window.document.body,k=window;class si{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Ue.$=Ue.$||[],this.config=e||{},k.Vaadin=k.Vaadin||{},k.Vaadin.Flow=k.Vaadin.Flow||{},k.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,k.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,k.Vaadin.connectionState.loadingFinished(),!k.Vaadin.listener&&(k.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,k.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof Tn)return k.Vaadin.connectionState.state=A.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,n)=>this.flowNavigate(o,n),this.container.onBeforeLeave=(o,n)=>this.flowLeave(o,n),this.container}}async flowLeave(e,o){const{connectionState:n}=k.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||n.offline?Promise.resolve({}):new Promise(a=>{this.loadingStarted(),this.container.serverConnected=r=>{a(o&&r?o.prevent():{}),this.loadingFinished()},Ue.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(n=>{this.loadingStarted(),this.container.serverConnected=(a,r)=>{o&&a?n(o.prevent()):o&&o.redirect&&r?n(o.redirect(r.pathname)):(this.container.style.display="",n(this.container)),this.loadingFinished()},Ue.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:n}=o;await(await S(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(n),await this.config.imports());const r=`flow-container-${n.toLowerCase()}`,i=document.querySelector(r);i?this.container=i:(this.container=document.createElement(r),this.container.id=n),Ue.$[n]=this.container;const s=await S(()=>import("./FlowClient-d5d5e377.js"),[],import.meta.url);await this.flowInitClient(s),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,n)=>{const a=document.createElement("script");a.onload=()=>o(),a.onerror=n,a.src=e,document.body.appendChild(a)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),n=document.createElement("script");n.type="module",n.setAttribute("data-app-id",o),document.body.append(n)}async flowInitClient(e){return e.init(),new Promise(o=>{const n=setInterval(()=>{Object.keys(k.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").reduce((r,i)=>r||k.Vaadin.Flow.clients[i].isActive(),!1)||(clearInterval(n),o())},5)})}async flowInitUi(){const e=k.Vaadin&&k.Vaadin.TypeScript&&k.Vaadin.TypeScript.initial;return e?(k.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,n)=>{const r=new XMLHttpRequest,i=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;r.open("GET",i),r.onerror=()=>n(new Tn(`Invalid server response when initializing Flow UI.
        ${r.status}
        ${r.responseText}`)),r.onload=()=>{const s=r.getResponseHeader("content-type");s&&s.indexOf("application/json")!==-1?o(JSON.parse(r.responseText)):r.onerror()},r.send()})}addConnectionIndicator(){P.create(),k.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){k.Vaadin.connectionState.state=A.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{k.Vaadin.connectionState.state=A.CONNECTED},e.onerror=()=>{k.Vaadin.connectionState.state=A.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),k.addEventListener("offline",()=>{this.isFlowClientLoaded()||(k.Vaadin.connectionState.state=A.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),o="./offline-stub.html";e.setAttribute("src",o),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let n;const a=()=>{n!==void 0&&(k.Vaadin.connectionState.removeStateChangeListener(n),n=void 0)};return e.onBeforeEnter=(r,i,s)=>{n=()=>{k.Vaadin.connectionState.online&&(a(),s.render(r,!1))},k.Vaadin.connectionState.addStateChangeListener(n)},e.onBeforeLeave=(r,i,s)=>{a()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:ci}=new si({imports:()=>S(()=>import("./generated-flow-imports-cf1d03c3.js").then(t=>t.a),[],import.meta.url)}),di=[...ci],pi=new ce(document.querySelector("#outlet"));pi.setRoutes(di);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,n=typeof DOMException=="object"?Error:DOMException,a=Object.defineProperty,r=Array.prototype.forEach,i=/@import.+?;?$/gm;function s(f){var u=f.replace(i,"");return u!==f&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),u.trim()}function l(f){return"isConnected"in f?f.isConnected:document.contains(f)}function c(f){return f.filter(function(u,v){return f.indexOf(u)===v})}function d(f,u){return f.filter(function(v){return u.indexOf(v)===-1})}function m(f){f.parentNode.removeChild(f)}function p(f){return f.shadowRoot||o.get(f)}var h=["addRule","deleteRule","insertRule","removeRule"],ie=CSSStyleSheet,le=ie.prototype;le.replace=function(){return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))},le.replaceSync=function(){throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function oe(f){return typeof f=="object"?Ce.isPrototypeOf(f)||le.isPrototypeOf(f):!1}function Ut(f){return typeof f=="object"?le.isPrototypeOf(f):!1}var B=new WeakMap,Q=new WeakMap,Ee=new WeakMap,ze=new WeakMap;function Bt(f,u){var v=document.createElement("style");return Ee.get(f).set(u,v),Q.get(f).push(u),v}function ne(f,u){return Ee.get(f).get(u)}function it(f,u){Ee.get(f).delete(u),Q.set(f,Q.get(f).filter(function(v){return v!==u}))}function Jo(f,u){requestAnimationFrame(function(){u.textContent=B.get(f).textContent,ze.get(f).forEach(function(v){return u.sheet[v.method].apply(u.sheet,v.args)})})}function lt(f){if(!B.has(f))throw new TypeError("Illegal invocation")}function Ht(){var f=this,u=document.createElement("style");e.body.appendChild(u),B.set(f,u),Q.set(f,[]),Ee.set(f,new WeakMap),ze.set(f,[])}var Ce=Ht.prototype;Ce.replace=function(u){try{return this.replaceSync(u),Promise.resolve(this)}catch(v){return Promise.reject(v)}},Ce.replaceSync=function(u){if(lt(this),typeof u=="string"){var v=this;B.get(v).textContent=s(u),ze.set(v,[]),Q.get(v).forEach(function(O){O.isConnected()&&Jo(v,ne(v,O))})}},a(Ce,"cssRules",{configurable:!0,enumerable:!0,get:function(){return lt(this),B.get(this).sheet.cssRules}}),a(Ce,"media",{configurable:!0,enumerable:!0,get:function(){return lt(this),B.get(this).sheet.media}}),h.forEach(function(f){Ce[f]=function(){var u=this;lt(u);var v=arguments;ze.get(u).push({method:f,args:v}),Q.get(u).forEach(function(V){if(V.isConnected()){var R=ne(u,V).sheet;R[f].apply(R,v)}});var O=B.get(u).sheet;return O[f].apply(O,v)}}),a(Ht,Symbol.hasInstance,{configurable:!0,value:oe});var Qo={childList:!0,subtree:!0},Zo=new WeakMap;function Ae(f){var u=Zo.get(f);return u||(u=new on(f),Zo.set(f,u)),u}function en(f){a(f.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Ae(this).sheets},set:function(u){Ae(this).update(u)}})}function Wt(f,u){for(var v=document.createNodeIterator(f,NodeFilter.SHOW_ELEMENT,function(V){return p(V)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),O=void 0;O=v.nextNode();)u(p(O))}var st=new WeakMap,$e=new WeakMap,ct=new WeakMap;function Ra(f,u){return u instanceof HTMLStyleElement&&$e.get(f).some(function(v){return ne(v,f)})}function tn(f){var u=st.get(f);return u instanceof Document?u.body:u}function Gt(f){var u=document.createDocumentFragment(),v=$e.get(f),O=ct.get(f),V=tn(f);O.disconnect(),v.forEach(function(R){u.appendChild(ne(R,f)||Bt(R,f))}),V.insertBefore(u,null),O.observe(V,Qo),v.forEach(function(R){Jo(R,ne(R,f))})}function on(f){var u=this;u.sheets=[],st.set(u,f),$e.set(u,[]),ct.set(u,new MutationObserver(function(v,O){if(!document){O.disconnect();return}v.forEach(function(V){t||r.call(V.addedNodes,function(R){R instanceof Element&&Wt(R,function(Le){Ae(Le).connect()})}),r.call(V.removedNodes,function(R){R instanceof Element&&(Ra(u,R)&&Gt(u),t||Wt(R,function(Le){Ae(Le).disconnect()}))})})}))}if(on.prototype={isConnected:function(){var f=st.get(this);return f instanceof Document?f.readyState!=="loading":l(f.host)},connect:function(){var f=tn(this);ct.get(this).observe(f,Qo),$e.get(this).length>0&&Gt(this),Wt(f,function(u){Ae(u).connect()})},disconnect:function(){ct.get(this).disconnect()},update:function(f){var u=this,v=st.get(u)===document?"Document":"ShadowRoot";if(!Array.isArray(f))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+v+": Iterator getter is not callable.");if(!f.every(oe))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+v+": Failed to convert value to 'CSSStyleSheet'");if(f.some(Ut))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+v+": Can't adopt non-constructed stylesheets");u.sheets=f;var O=$e.get(u),V=c(f),R=d(O,V);R.forEach(function(Le){m(ne(Le,u)),it(Le,u)}),$e.set(u,V),u.isConnected()&&V.length>0&&Gt(u)}},window.CSSStyleSheet=Ht,en(Document),"ShadowRoot"in window){en(ShadowRoot);var nn=Element.prototype,Ia=nn.attachShadow;nn.attachShadow=function(u){var v=Ia.call(this,u);return u.mode==="closed"&&o.set(this,v),v}}var dt=Ae(document);dt.isConnected()?dt.connect():document.addEventListener("DOMContentLoaded",dt.connect.bind(dt))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const va=Symbol.for(""),fi=t=>{if((t==null?void 0:t.r)===va)return t==null?void 0:t._$litStatic$},ui=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ut=(t,...e)=>({_$litStatic$:e.reduce((o,n,a)=>o+ui(n)+t[a+1],t[0]),r:va}),Nn=new Map,mi=t=>(e,...o)=>{const n=o.length;let a,r;const i=[],s=[];let l=0,c=!1,d;for(;l<n;){for(d=e[l];l<n&&(r=o[l],(a=fi(r))!==void 0);)d+=a+e[++l],c=!0;l!==n&&s.push(r),i.push(d),l++}if(l===n&&i.push(e[n]),c){const m=i.join("$$lit$$");e=Nn.get(m),e===void 0&&(i.raw=i,Nn.set(m,e=i)),o=s}return t(e,...o)},hi=mi(b),bi="modulepreload",gi=function(t){return"/"+t},Pn={},_=function(t,e,o){if(!e||e.length===0)return t();const n=document.getElementsByTagName("link");return Promise.all(e.map(a=>{if(a=gi(a),a in Pn)return;Pn[a]=!0;const r=a.endsWith(".css"),i=r?'[rel="stylesheet"]':"";if(o)for(let l=n.length-1;l>=0;l--){const c=n[l];if(c.href===a&&(!r||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${i}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":bi,r||(s.as="script",s.crossOrigin=""),s.href=a,document.head.appendChild(s),r)return new Promise((l,c)=>{s.addEventListener("load",l),s.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>t())};function wi(t){var e;const o=[];for(;t&&t.parentNode;){const n=xi(t);if(n.nodeId!==-1){if((e=n.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(n)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function xi(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const a of n){const r=o[a];if(r.getNodeId){const i=r.getNodeId(t);if(i>=0)return{nodeId:i,uiId:r.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function vi(t,e){if(t.contains(e))return!0;let o=e;const n=e.ownerDocument;for(;o&&o!==n&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}const yi=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((n,a)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var T=(t=>(t.text="text",t.checkbox="checkbox",t.range="range",t.color="color",t))(T||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},ki=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),Be={textColor:{propertyName:"color",displayName:"Text color",editorType:T.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:T.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:T.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:T.checkbox,checkedValue:"italic"}},Ne={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:T.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:T.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:T.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:T.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:T.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:T.range,presets:J.lumoSpace,icon:"square"}},_i={height:{propertyName:"height",displayName:"Size",editorType:T.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:T.range,presets:J.lumoSpace,icon:"square"}},Si={iconColor:{propertyName:"color",displayName:"Icon color",editorType:T.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:T.range,presets:J.lumoFontSize,icon:"font"}},Ei=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:_i,iconProperties:Si,shapeProperties:Ne,textProperties:Be},Symbol.toStringTag,{value:"Module"}));function ya(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[Ne.backgroundColor,Ne.borderColor,Ne.borderWidth,Ne.borderRadius,Ne.padding,Be.textColor,Be.fontSize,Be.fontWeight,Be.fontStyle]}]}}const zi=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:ya},Symbol.toStringTag,{value:"Module"})),Ci=t=>yi(Object.assign({"./components/defaults.ts":()=>_(()=>Promise.resolve().then(()=>Ei),void 0),"./components/generic.ts":()=>_(()=>Promise.resolve().then(()=>zi),void 0),"./components/presets.ts":()=>_(()=>Promise.resolve().then(()=>ki),void 0),"./components/vaadin-app-layout.ts":()=>_(()=>S(()=>import("./vaadin-app-layout-37492a04-8e99f46e.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>_(()=>S(()=>import("./vaadin-avatar-7047be31-4ddb3d97.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>_(()=>S(()=>import("./vaadin-big-decimal-field-b42c1de1-2c6084fd.js"),["./vaadin-big-decimal-field-b42c1de1-2c6084fd.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>_(()=>S(()=>import("./vaadin-button-79ad9d5f-64160b52.js"),[],import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>_(()=>S(()=>import("./vaadin-checkbox-group-a9a9e85d-e9188077.js"),["./vaadin-checkbox-group-a9a9e85d-e9188077.js","./vaadin-text-field-e82c445d-74bf58cd.js","./vaadin-checkbox-13797fc9-1623c364.js"],import.meta.url),["assets/vaadin-checkbox-group-a9a9e85d.js","assets/vaadin-text-field-e82c445d.js","assets/vaadin-checkbox-13797fc9.js"]),"./components/vaadin-checkbox.ts":()=>_(()=>S(()=>import("./vaadin-checkbox-13797fc9-1623c364.js"),[],import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>_(()=>S(()=>import("./vaadin-combo-box-9046f78f-4e421766.js"),["./vaadin-combo-box-9046f78f-4e421766.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-combo-box-9046f78f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-email-field.ts":()=>_(()=>S(()=>import("./vaadin-email-field-da851bcb-1fd4a121.js"),["./vaadin-email-field-da851bcb-1fd4a121.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>_(()=>S(()=>import("./vaadin-horizontal-layout-f7b1ab51-63dee63f.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>_(()=>S(()=>import("./vaadin-integer-field-6e2954cf-116be193.js"),["./vaadin-integer-field-6e2954cf-116be193.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>_(()=>S(()=>import("./vaadin-menu-bar-be33385c-1b451128.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>_(()=>S(()=>import("./vaadin-number-field-31df11f5-7c7cfbae.js"),["./vaadin-number-field-31df11f5-7c7cfbae.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>_(()=>S(()=>import("./vaadin-password-field-49ffb113-3237baca.js"),["./vaadin-password-field-49ffb113-3237baca.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>_(()=>S(()=>import("./vaadin-progress-bar-3b53bb70-682344a9.js"),[],import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>_(()=>S(()=>import("./vaadin-radio-group-4a6e2cf4-8fe09a58.js"),["./vaadin-radio-group-4a6e2cf4-8fe09a58.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-radio-group-4a6e2cf4.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-scroller.ts":()=>_(()=>S(()=>import("./vaadin-scroller-35e68818-9224550e.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>_(()=>S(()=>import("./vaadin-select-5d6ab45b-65959da6.js"),["./vaadin-select-5d6ab45b-65959da6.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-select-5d6ab45b.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-split-layout.ts":()=>_(()=>S(()=>import("./vaadin-split-layout-10c9713b-38855eeb.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>_(()=>S(()=>import("./vaadin-text-area-41c5f60c-c43dcab9.js"),["./vaadin-text-area-41c5f60c-c43dcab9.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>_(()=>S(()=>import("./vaadin-text-field-e82c445d-74bf58cd.js"),[],import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>_(()=>S(()=>import("./vaadin-time-picker-2fa5314f-fe178720.js"),["./vaadin-time-picker-2fa5314f-fe178720.js","./vaadin-text-field-e82c445d-74bf58cd.js"],import.meta.url),["assets/vaadin-time-picker-2fa5314f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-vertical-layout.ts":()=>_(()=>S(()=>import("./vaadin-vertical-layout-ff73c403-b0a260d0.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>_(()=>S(()=>import("./vaadin-virtual-list-62d4499a-9c778878.js"),[],import.meta.url),[])}),`./components/${t}.ts`);class Ai{constructor(e=Ci){this.loader=e,this.metadata={}}async getMetadata(e){var o;const n=(o=e.element)==null?void 0:o.localName;if(!n)return null;if(!n.startsWith("vaadin-"))return ya(n);let a=this.metadata[n];if(a)return a;try{a=(await this.loader(n)).default,this.metadata[n]=a}catch{console.warn(`Failed to load metadata for component: ${n}`)}return a||null}}const $i=new Ai,yt={crosshair:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Qe=(t=>(t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme",t))(Qe||{}),j=(t=>(t.local="local",t.global="global",t))(j||{});function go(t,e){return`${t}|${e}`}class pe{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[go(e,o)]||null}updatePropertyValue(e,o,n,a){if(!n){delete this._properties[go(e,o)];return}let r=this.getPropertyValue(e,o);r?(r.value=n,r.modified=a||!1):(r={elementSelector:e,propertyName:o,value:n,modified:a||!1},this._properties[go(e,o)]=r)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new pe(e[0].metadata);return e.forEach(n=>o.addPropertyValues(n.properties)),o}static fromServerRules(e,o,n){const a=new pe(e);return e.elements.forEach(r=>{const i=Fe(r,o),s=n.find(l=>l.selector===i);s&&r.properties.forEach(l=>{const c=s.properties[l.propertyName];c&&a.updatePropertyValue(r.selector,l.propertyName,c,!0)})}),a}}function Fe(t,e){const o=t.selector;if(e.themeScope==="global")return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const n=o.match(/^[\w\d-_]+/),a=n&&n[0];if(!a)throw new Error(`Selector does not start with a tag name: ${o}`);return`${a}.${e.localClassName}${o.substring(a.length,o.length)}`}function Li(t,e,o,n){const a=Fe(t,e),r={[o]:n};return o==="border-width"&&(parseInt(n)>0?r["border-style"]="solid":r["border-style"]=""),{selector:a,properties:r}}function Ti(t){const e=Object.entries(t.properties).map(([o,n])=>`${o}: ${n};`).join(" ");return`${t.selector} { ${e} }`}let mt,Rn="";function jo(t){mt||(mt=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,mt]),Rn+=t.cssText,mt.replaceSync(Rn)}const ka=w`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,In="__vaadin-theme-editor-measure-element",On=/((::before)|(::after))$/,Mn=/::part\(([\w\d_-]+)\)$/;jo(w`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Ni(t){const e=new pe(t),o=document.createElement(t.tagName);o.classList.add(In),document.body.append(o),t.setupElement&&await t.setupElement(o);const n={themeScope:j.local,localClassName:In};try{t.elements.forEach(a=>{Fn(o,a,n,!0);let r=Fe(a,n);const i=r.match(On);r=r.replace(On,"");const s=r.match(Mn),l=r.replace(Mn,"");let c=document.querySelector(l);if(c&&s){const p=`[part~="${s[1]}"]`;c=c.shadowRoot.querySelector(p)}if(!c)return;c.style.transition="none";const d=i?i[1]:null,m=getComputedStyle(c,d);a.properties.forEach(p=>{const h=m.getPropertyValue(p.propertyName)||p.defaultValue||"";e.updatePropertyValue(a.selector,p.propertyName,h)}),Fn(o,a,n,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Fn(t,e,o,n){if(e.stateAttribute){if(e.stateElementSelector){const a=Fe({...e,selector:e.stateElementSelector},o);t=document.querySelector(a)}t&&(n?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function Vn(t){return t.trim()}function Pi(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return Vn(o.textContent);const n=e.textContent;return n?Vn(n):null}class Ri{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const n=this._localClassNameMap.get(e);n&&(e.classList.remove(n),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const ge=new Ri;class Ii{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=n=>{n.command==="themeEditorResponse"?this.handleResponse(n.data):o.call(this.wrappedConnection,n)}}sendRequest(e,o){const n=(this.requestCounter++).toString(),a=o.uiId??this.globalUiId;return new Promise((r,i)=>{this.wrappedConnection.send(e,{...o,requestId:n,uiId:a}),this.pendingRequests[n]={resolve:r,reject:i}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}markAsUsed(){return this.sendRequest("themeEditorMarkAsUsed",{})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const a of n){const r=o[a];if(r.getNodeId)return r.getUIId()}}return-1}}const I={index:-1,entries:[]};class Oi{constructor(e){this.api=e}get allowUndo(){return I.index>=0}get allowRedo(){return I.index<I.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,n){const a={requestId:e,execute:o,rollback:n};if(I.index++,I.entries=I.entries.slice(0,I.index),I.entries.push(a),o)try{o()}catch(r){console.error("Execute history entry failed",r)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=I.entries[I.index];I.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;I.index++;const e=I.entries[I.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){I.entries=[],I.index=-1}}var Mi=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,ue=(t,e,o,n)=>{for(var a=n>1?void 0:n?Fi(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Mi(e,o,a),a};class Vi extends CustomEvent{constructor(e,o,n){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:n}})}}class W extends N{constructor(){super(...arguments),this.value=""}static get styles(){return[ka,w`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return b`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?b`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Vi(this.elementMetadata,this.propertyMetadata,e))}}ue([x({})],W.prototype,"elementMetadata",2);ue([x({})],W.prototype,"propertyMetadata",2);ue([x({})],W.prototype,"theme",2);ue([$()],W.prototype,"propertyValue",2);ue([$()],W.prototype,"value",2);class Lt{constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,n=e.presets??[];this._values=(n||[]).map(r=>r.startsWith("--")?`var(${r})`:r);const a=document.createElement("div");a.style.borderStyle="solid",a.style.visibility="hidden",document.body.append(a);try{this._values.forEach(r=>{a.style.setProperty(o,r);const i=getComputedStyle(a);this._rawValues[r]=i.getPropertyValue(o).trim()})}finally{a.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(n=>this._rawValues[n]===o)}}class jn extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Tt=class extends N{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return w`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return b`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${yt.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new jn(e.value))}handleClearClick(){this.dispatchEvent(new jn(""))}};ue([x({})],Tt.prototype,"value",2);ue([x({})],Tt.prototype,"showClearButton",2);Tt=ue([U("vaadin-dev-tools-theme-text-input")],Tt);var ji=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,jt=(t,e,o,n)=>{for(var a=n>1?void 0:n?Di(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&ji(e,o,a),a};class qi extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Ze=class extends N{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[ka,w`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return b` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?b`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new qi(this.editedClassName))}};jt([x({})],Ze.prototype,"className",2);jt([$()],Ze.prototype,"editedClassName",2);jt([$()],Ze.prototype,"invalid",2);Ze=jt([U("vaadin-dev-tools-theme-class-name-editor")],Ze);var Ui=Object.defineProperty,Bi=Object.getOwnPropertyDescriptor,Dt=(t,e,o,n)=>{for(var a=n>1?void 0:n?Bi(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Ui(e,o,a),a};class Hi extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}jo(w`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let et=class extends N{constructor(){super(...arguments),this.value=j.local}static get styles(){return w`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return b` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",n=`${o}s`;Re(b`
        <vaadin-list-box>
          <vaadin-item value=${j.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${j.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${n}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Hi(e))}};Dt([x({})],et.prototype,"value",2);Dt([x({})],et.prototype,"metadata",2);Dt([at("vaadin-select")],et.prototype,"select",2);et=Dt([U("vaadin-dev-tools-theme-scope-selector")],et);var Wi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,Yi=(t,e,o,n)=>{for(var a=n>1?void 0:n?Gi(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Wi(e,o,a),a};let Dn=class extends W{static get styles(){return[W.styles,w`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return b` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Dn=Yi([U("vaadin-dev-tools-theme-checkbox-property-editor")],Dn);var Ki=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,Ji=(t,e,o,n)=>{for(var a=n>1?void 0:n?Xi(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Ki(e,o,a),a};let qn=class extends W{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return b`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};qn=Ji([U("vaadin-dev-tools-theme-text-property-editor")],qn);var Qi=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,Do=(t,e,o,n)=>{for(var a=n>1?void 0:n?Zi(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Qi(e,o,a),a};let Nt=class extends W{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Lt}static get styles(){return[W.styles,w`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Lt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return b`
      <div class=${Vo(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),n=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[n]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};Do([$()],Nt.prototype,"selectedPresetIndex",2);Do([$()],Nt.prototype,"presets",2);Nt=Do([U("vaadin-dev-tools-theme-range-property-editor")],Nt);const Ve=(t,e=0,o=1)=>t>o?o:t<e?e:t,F=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,_a=({h:t,s:e,v:o,a:n})=>{const a=(200-e)*o/100;return{h:F(t),s:F(a>0&&a<200?e*o/100/(a<=100?a:200-a)*100:0),l:F(a/2),a:F(n,2)}},$o=t=>{const{h:e,s:o,l:n}=_a(t);return`hsl(${e}, ${o}%, ${n}%)`},wo=t=>{const{h:e,s:o,l:n,a}=_a(t);return`hsla(${e}, ${o}%, ${n}%, ${a})`},el=({h:t,s:e,v:o,a:n})=>{t=t/360*6,e=e/100,o=o/100;const a=Math.floor(t),r=o*(1-e),i=o*(1-(t-a)*e),s=o*(1-(1-t+a)*e),l=a%6;return{r:F([o,i,r,r,s,o][l]*255),g:F([s,o,o,i,r,r][l]*255),b:F([r,r,s,o,o,i][l]*255),a:F(n,2)}},tl=t=>{const{r:e,g:o,b:n,a}=el(t);return`rgba(${e}, ${o}, ${n}, ${a})`},ol=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?nl({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},nl=({r:t,g:e,b:o,a:n})=>{const a=Math.max(t,e,o),r=a-Math.min(t,e,o),i=r?a===t?(e-o)/r:a===e?2+(o-t)/r:4+(t-e)/r:0;return{h:F(60*(i<0?i+6:i)),s:F(a?r/a*100:0),v:F(a/255*100),a:n}},al=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},rl=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),Un={},Sa=t=>{let e=Un[t];return e||(e=document.createElement("template"),e.innerHTML=t,Un[t]=e),e},qo=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Ie=!1;const Lo=t=>"touches"in t,il=t=>Ie&&!Lo(t)?!1:(Ie||(Ie=Lo(t)),!0),Bn=(t,e)=>{const o=Lo(e)?e.touches[0]:e,n=t.el.getBoundingClientRect();qo(t.el,"move",t.getMove({x:Ve((o.pageX-(n.left+window.pageXOffset))/n.width),y:Ve((o.pageY-(n.top+window.pageYOffset))/n.height)}))},ll=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),qo(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class Uo{constructor(e,o,n,a){const r=Sa(`<div role="slider" tabindex="0" part="${o}" ${n}><div part="${o}-pointer"></div></div>`);e.appendChild(r.content.cloneNode(!0));const i=e.querySelector(`[part=${o}]`);i.addEventListener("mousedown",this),i.addEventListener("touchstart",this),i.addEventListener("keydown",this),this.el=i,this.xy=a,this.nodes=[i.firstChild,i]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Ie?"touchmove":"mousemove",this),o(Ie?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!il(e)||!Ie&&e.button!=0)return;this.el.focus(),Bn(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Bn(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":ll(this,e);break}}style(e){e.forEach((o,n)=>{for(const a in o)this.nodes[n].style.setProperty(a,o[a])})}}class sl extends Uo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:$o({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${F(e)}`)}getMove(e,o){return{h:o?Ve(this.h+e.x*360,0,360):360*e.x}}}class cl extends Uo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:$o(e)},{"background-color":$o({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${F(e.s)}%, Brightness ${F(e.v)}%`)}getMove(e,o){return{s:o?Ve(this.hsva.s+e.x*100,0,100):e.x*100,v:o?Ve(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const dl=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',pl="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",fl="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",ht=Symbol("same"),xo=Symbol("color"),Hn=Symbol("hsva"),vo=Symbol("update"),Wn=Symbol("parts"),Pt=Symbol("css"),Rt=Symbol("sliders");let ul=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Pt](){return[dl,pl,fl]}get[Rt](){return[cl,sl]}get color(){return this[xo]}set color(t){if(!this[ht](t)){const e=this.colorModel.toHsva(t);this[vo](e),this[xo]=t}}constructor(){super();const t=Sa(`<style>${this[Pt].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[Wn]=this[Rt].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const n=this.colorModel.fromAttr(o);this[ht](n)||(this.color=n)}handleEvent(t){const e=this[Hn],o={...e,...t.detail};this[vo](o);let n;!al(o,e)&&!this[ht](n=this.colorModel.fromHsva(o))&&(this[xo]=n,qo(this,"color-changed",{value:n}))}[ht](t){return this.color&&this.colorModel.equal(t,this.color)}[vo](t){this[Hn]=t,this[Wn].forEach(e=>e.update(t))}};class ml extends Uo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=wo({...e,a:0}),n=wo({...e,a:1}),a=e.a*100;this.style([{left:`${a}%`,color:wo(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${n}`}]);const r=F(a);this.el.setAttribute("aria-valuenow",`${r}`),this.el.setAttribute("aria-valuetext",`${r}%`)}getMove(e,o){return{a:o?Ve(this.hsva.a+e.x):e.x}}}const hl=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class bl extends ul{get[Pt](){return[...super[Pt],hl]}get[Rt](){return[...super[Rt],ml]}}const gl={defaultColor:"rgba(0, 0, 0, 1)",toHsva:ol,fromHsva:tl,equal:rl,fromAttr:t=>t};class wl extends bl{get colorModel(){return gl}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function xl(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const yo={start:"top",end:"bottom"},ko={start:"left",end:"right"},Gn=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),vl=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=xl(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Gn.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Gn.observe(o))),e){const n=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(a=>{this.__margins[a]=parseInt(n[a],10)})),this.setAttribute("dir",n.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const n=this.__isRTL,a=this.__shouldAlignStartHorizontally(e,n),r=!n&&a||n&&!a;this.style.alignItems=r?"flex-start":"flex-end";const i=this.getBoundingClientRect(),s=this.__calculatePositionInOneDimension(e,i,this.noVerticalOverlap,yo,this,o),l=this.__calculatePositionInOneDimension(e,i,this.noHorizontalOverlap,ko,this,a);Object.assign(this.style,s,l),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!r),this.toggleAttribute("start-aligned",r)}__shouldAlignStartHorizontally(e,o){const n=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const a=Math.min(window.innerWidth,document.documentElement.clientWidth),r=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,n,a,this.__margins,r,this.noHorizontalOverlap,ko)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const n=Math.min(window.innerHeight,document.documentElement.clientHeight),a=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,n,this.__margins,a,this.noVerticalOverlap,yo)}__shouldAlignStart(e,o,n,a,r,i,s){const l=n-e[i?s.end:s.start]-a[s.end],c=e[i?s.start:s.end]-a[s.start],d=r?l:c,m=d>(r?c:l)||d>o;return r===m}__adjustBottomProperty(e,o,n){let a;if(e===o.end){if(o.end===yo.end){const r=Math.min(window.innerHeight,document.documentElement.clientHeight);if(n>r&&this.__oldViewportHeight){const i=this.__oldViewportHeight-r;a=n-i}this.__oldViewportHeight=r}if(o.end===ko.end){const r=Math.min(window.innerWidth,document.documentElement.clientWidth);if(n>r&&this.__oldViewportWidth){const i=this.__oldViewportWidth-r;a=n-i}this.__oldViewportWidth=r}}return a}__calculatePositionInOneDimension(e,o,n,a,r,i){const s=i?a.start:a.end,l=i?a.end:a.start,c=parseFloat(r.style[s]||getComputedStyle(r)[s]),d=this.__adjustBottomProperty(s,a,c),m=o[i?a.start:a.end]-e[n===i?a.end:a.start],p=d?`${d}px`:`${c+m*(i?-1:1)}px`;return{[s]:p,[l]:""}}};var yl=Object.defineProperty,kl=Object.getOwnPropertyDescriptor,Se=(t,e,o,n)=>{for(var a=n>1?void 0:n?kl(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&yl(e,o,a),a};class _l extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const Ea=w`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let tt=class extends N{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[Ea,w`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return b` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Re(b` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new _l(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};Se([x({})],tt.prototype,"value",2);Se([x({})],tt.prototype,"presets",2);Se([at("#toggle")],tt.prototype,"toggle",2);tt=Se([U("vaadin-dev-tools-color-picker")],tt);let It=class extends N{static get styles(){return[Ea,w`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return b` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>b` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return b` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};Se([x({})],It.prototype,"value",2);Se([x({})],It.prototype,"presets",2);It=Se([U("vaadin-dev-tools-color-picker-overlay-content")],It);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends vl(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",wl);var Sl=Object.defineProperty,El=Object.getOwnPropertyDescriptor,zl=(t,e,o,n)=>{for(var a=n>1?void 0:n?El(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Sl(e,o,a),a};let Yn=class extends W{constructor(){super(...arguments),this.presets=new Lt}static get styles(){return[W.styles,w`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Lt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return b`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Yn=zl([U("vaadin-dev-tools-theme-color-property-editor")],Yn);var Cl=Object.defineProperty,Al=Object.getOwnPropertyDescriptor,Bo=(t,e,o,n)=>{for(var a=n>1?void 0:n?Al(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Cl(e,o,a),a};class $l extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Ot=class extends N{static get styles(){return w`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return b` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return b`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new $l(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case T.checkbox:o=ut`vaadin-dev-tools-theme-checkbox-property-editor`;break;case T.range:o=ut`vaadin-dev-tools-theme-range-property-editor`;break;case T.color:o=ut`vaadin-dev-tools-theme-color-property-editor`;break;default:o=ut`vaadin-dev-tools-theme-text-property-editor`}return hi` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};Bo([x({})],Ot.prototype,"metadata",2);Bo([x({})],Ot.prototype,"theme",2);Ot=Bo([U("vaadin-dev-tools-theme-property-list")],Ot);var Ll=Object.defineProperty,Tl=Object.getOwnPropertyDescriptor,Nl=(t,e,o,n)=>{for(var a=n>1?void 0:n?Tl(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Ll(e,o,a),a};let Mt=class extends N{render(){return b`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Mt.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0};Mt.styles=[w`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Mt=Nl([U("vaadin-dev-tools-shim")],Mt);const za=w`
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
`;var Pl=Object.defineProperty,Rl=Object.getOwnPropertyDescriptor,rt=(t,e,o,n)=>{for(var a=n>1?void 0:n?Rl(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Pl(e,o,a),a};let fe=class extends N{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var t;return this.active?(this.style.display="block",b`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>b`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){var e;if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),t.has("active")){const o=t.get("active"),n=this.active;!o&&n?requestAnimationFrame(()=>this.shim.focus()):o&&!n&&this.highlight(void 0)}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=t.detail.target;this.components=wi(e),this.selected=this.components.length-1}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){if(this.highlighted!==t)if(t){const e=t.getBoundingClientRect(),o=getComputedStyle(t);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=o.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=t}};fe.styles=[za,w`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];rt([$()],fe.prototype,"active",2);rt([$()],fe.prototype,"components",2);rt([$()],fe.prototype,"selected",2);rt([at("vaadin-dev-tools-shim")],fe.prototype,"shim",2);fe=rt([U("vaadin-dev-tools-component-picker")],fe);const Il=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return fe}},Symbol.toStringTag,{value:"Module"}));var Ol=Object.defineProperty,Ml=Object.getOwnPropertyDescriptor,me=(t,e,o,n)=>{for(var a=n>1?void 0:n?Ml(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Ol(e,o,a),a};jo(w`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let re=class extends N{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Qe.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return w`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Ii(this.connection),this.history=new Oi(this.api),this.historyActions=this.history.allowedActions,this.api.markAsUsed(),document.addEventListener("vaadin-theme-updated",()=>{ge.clear(),this.refreshTheme()})}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((o=this.context)==null?void 0:o.component.element))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element)}render(){var t,e,o;return this.themeEditorState===Qe.missing_theme?this.renderMissingThemeNotice():b`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?b` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${yt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${yt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return b`
      <div class="notice">
        It looks like you have not set up a custom theme yet. Theme editor requires an existing theme to work with.
        Please check our
        <a href="https://vaadin.com/docs/latest/styling/custom-theme/creating-custom-theme" target="_blank"
          >documentation</a
        >
        on how to set up a custom theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return b`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===j.local&&!this.context.accessible){const t=this.context.metadata.displayName;return b`
        <div class="notice">
          The selected ${t} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return b` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=Fe(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===j.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,n=b`<span class="component-type">${o}</span>`,a=this.context.scope===j.local?Pi(this.context.component):null,r=a?b` <span class="instance-name-quote">"</span><span class="instance-name">${a}</span
            ><span class="instance-name-quote">"</span>`:null;e=b`${n} ${r}`}else e=b`<span class="no-selection">Pick an element to get started</span>`;return b`
      <div class="picker">
        <button @click=${this.pickComponent}>${yt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===j.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return b` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const n=this.context.component.element;this.context.localClassName=o;const a=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(a.requestId,()=>ge.previewLocalClassName(n,o),()=>ge.previewLocalClassName(n,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:b`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const n=await $i.getMetadata(e);if(!n){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||j.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,n)}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:n}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,n,!0),this.effectiveTheme=pe.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const a={themeScope:this.context.scope,localClassName:this.context.localClassName},r=Li(e,a,o.propertyName,n);try{const i=await this.api.setCssRules([r]);this.historyActions=this.history.push(i.requestId);const s=Ti(r);ge.add(s)}catch(i){console.error("Failed to update property value",i)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===j.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>ge.previewLocalClassName(t,e),()=>ge.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,n,a;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((n=this.context)==null?void 0:n.metadata),!t||!e)return;const r=await this.api.loadComponentMetadata(t);ge.previewLocalClassName(t.element,r.className),await this.refreshTheme({scope:((a=this.context)==null?void 0:a.scope)||j.local,metadata:e,component:t,localClassName:r.className,suggestedClassName:r.suggestedClassName,accessible:r.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===j.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new pe(e.metadata);if(!(e.scope===j.local&&!e.localClassName)){const a={themeScope:e.scope,localClassName:e.localClassName},r=e.metadata.elements.map(s=>Fe(s,a)),i=await this.api.loadRules(r);o=pe.fromServerRules(e.metadata,a,i.rules)}const n=await Ni(e.metadata);this.context=e,this.baseTheme=n,this.editedTheme=o,this.effectiveTheme=pe.combine(n,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};me([x({})],re.prototype,"expanded",2);me([x({})],re.prototype,"themeEditorState",2);me([x({})],re.prototype,"pickerProvider",2);me([x({})],re.prototype,"connection",2);me([$()],re.prototype,"historyActions",2);me([$()],re.prototype,"context",2);me([$()],re.prototype,"effectiveTheme",2);re=me([U("vaadin-dev-tools-theme-editor")],re);var Fl=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],n=0;n<t.rangeCount;n++)o.push(t.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(a){t.addRange(a)}),e&&e.focus()}},Kn={"text/plain":"Text","text/html":"Url",default:"Text"},Vl="Copy to clipboard: #{key}, Enter";function jl(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function Dl(t,e){var o,n,a,r,i,s,l=!1;e||(e={}),o=e.debug||!1;try{a=Fl(),r=document.createRange(),i=document.getSelection(),s=document.createElement("span"),s.textContent=t,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Kn[e.format]||Kn.default;window.clipboardData.setData(m,t)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,t);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(s),r.selectNodeContents(s),i.addRange(r);var c=document.execCommand("copy");if(!c)throw new Error("copy command was unsuccessful");l=!0}catch(d){o&&console.error("unable to copy using execCommand: ",d),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),l=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),n=jl("message"in e?e.message:Vl),window.prompt(n,t)}}finally{i&&(typeof i.removeRange=="function"?i.removeRange(r):i.removeAllRanges()),s&&document.body.removeChild(s),a()}return l}const Ho=1e3,Wo=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),n=Array.from(t.querySelectorAll("*")).filter(a=>a.shadowRoot).flatMap(a=>Wo(a.shadowRoot,e));return[...o,...n]};let Xn=!1;const ot=(t,e)=>{Xn||(window.addEventListener("message",a=>{a.data==="validate-license"&&window.location.reload()},!1),Xn=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const a=o.shadowRoot.querySelector("slot:not([name])");if(a&&a.assignedElements().length>0){ot(a.assignedElements()[0],e);return}}ot(o,e);return}const n=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${n}</div></no-license>`)},We={},Jn={},je={},Ca={},Z=t=>`${t.name}_${t.version}`,Qn=t=>{const{cvdlName:e,version:o}=t.constructor,n={name:e,version:o},a=t.tagName.toLowerCase();We[e]=We[e]??[],We[e].push(a);const r=je[Z(n)];r&&setTimeout(()=>ot(t,r),Ho),je[Z(n)]||Ca[Z(n)]||Jn[Z(n)]||(Jn[Z(n)]=!0,window.Vaadin.devTools.checkLicense(n))},ql=t=>{Ca[Z(t)]=!0,console.debug("License check ok for",t)},Aa=t=>{const e=t.product.name;je[Z(t.product)]=t,console.error("License check failed for",e);const o=We[e];(o==null?void 0:o.length)>0&&Wo(document,o).forEach(n=>{setTimeout(()=>ot(n,je[Z(t.product)]),Ho)})},Ul=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,je[Z(t.product)]=t,console.error("No license found when checking",o);const n=We[o];(n==null?void 0:n.length)>0&&Wo(document,n).forEach(a=>{setTimeout(()=>ot(a,je[Z(t.product)]),Ho)})},Bl=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{Qn(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{Qn(t)}}};var M=(t=>(t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error",t))(M||{});const $a=class extends Object{constructor(t){super(),this.status="unavailable",t&&(this.webSocket=new WebSocket(t),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},$a.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(t,e){}onConnectionError(t){}onStatusChange(t){}onMessage(t){console.error("Unknown message received from the live reload server:",t)}handleMessage(t){let e;try{e=JSON.parse(t.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="update"?this.status==="active"&&this.onUpdate(e.path,e.content):e.command==="license-check-ok"?ql(e.data):e.command==="license-check-failed"?Aa(e.data):e.command==="license-check-nokey"?Ul(e.data):this.onMessage(e)}handleError(t){console.error(t),this.setStatus("error"),t instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(t)}setActive(t){!t&&this.status==="active"?this.setStatus("inactive"):t&&this.status==="inactive"&&this.setStatus("active")}setStatus(t){this.status!==t&&(this.status=t,this.onStatusChange(t))}send(t,e){const o=JSON.stringify({command:t,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(o)):this.webSocket.send(o):console.error(`Unable to send message ${t}. No websocket is available`)}setFeature(t,e){this.send("setFeature",{featureId:t,enabled:e})}sendTelemetry(t){this.send("reportTelemetry",{browserData:t})}sendLicenseCheck(t){this.send("checkLicense",t)}sendShowComponentCreateLocation(t){this.send("showComponentCreateLocation",t)}sendShowComponentAttachLocation(t){this.send("showComponentAttachLocation",t)}};let kt=$a;kt.HEARTBEAT_INTERVAL=18e4;var Hl=Object.defineProperty,Wl=Object.getOwnPropertyDescriptor,L=(t,e,o,n)=>{for(var a=n>1?void 0:n?Wl(e,o):e,r=t.length-1,i;r>=0;r--)(i=t[r])&&(a=(n?i(e,o,a):i(a))||a);return n&&a&&Hl(e,o,a),a};const E=class extends N{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Qe.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[w`
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

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
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
      `,za]}static get isActive(){const t=window.sessionStorage.getItem(E.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(E.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(t)}openWebSocketConnection(){this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE;const t=s=>this.log("error",s),e=()=>{this.showSplashMessage("Reloading…");const s=window.sessionStorage.getItem(E.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),l=s?parseInt(s,10)+1:1;window.sessionStorage.setItem(E.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,l.toString()),window.sessionStorage.setItem(E.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(s,l)=>{let c=document.head.querySelector(`style[data-file-path='${s}']`);c?(this.log("information","Hot update of "+s),c.textContent=l,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},n=new kt(this.getDedicatedWebSocketUrl());n.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),E.isActive||n.setActive(!1),this.elementTelemetry()},n.onConnectionError=t,n.onReload=e,n.onUpdate=o,n.onStatusChange=s=>{this.frontendStatus=s},n.onMessage=s=>this.handleFrontendMessage(s),this.frontendConnection=n;let a;this.backend===E.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(a=new kt(this.getSpringBootWebSocketUrl(window.location)),a.onHandshake=()=>{E.isActive||a.setActive(!1)},a.onReload=e,a.onConnectionError=t):this.backend===E.JREBEL||this.backend===E.HOTSWAP_AGENT?a=n:a=new kt(void 0);const r=a.onStatusChange;a.onStatusChange=s=>{r(s),this.javaStatus=s};const i=a.onHandshake;a.onHandshake=()=>{i(),this.backend&&this.log("information",`Java live reload available: ${E.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=a,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(t){if((t==null?void 0:t.command)==="serverInfo")this.serverInfo=t.data;else if((t==null?void 0:t.command)==="featureFlags")this.features=t.data.features;else if((t==null?void 0:t.command)==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Qe.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Free Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(t))}getDedicatedWebSocketUrl(){function t(o){const n=document.createElement("div");return n.innerHTML=`<a href="${o}"/>`,n.firstChild.href}if(this.url===void 0)return;const e=t(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const n=e.replace(/.*?-/,"");return`${o}://${this.springBootLiveReloadPort}-${n}`}else return`${o}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=e=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(E.TRIGGERED_KEY_IN_SESSION_STORAGE)){const e=new Date,o=`${`0${e.getHours()}`.slice(-2)}:${`0${e.getMinutes()}`.slice(-2)}:${`0${e.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(E.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),Bl(),document.documentElement.addEventListener("vaadin-overlay-outside-click",e=>{const o=e,n=o.target.owner;n&&vi(this,n)||o.detail.sourceEvent.composedPath().includes(this)&&e.preventDefault()})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},E.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.sendLicenseCheck(t):Aa({message:"Internal error: no connection",product:t})}log(t,e,o,n){const a=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:a,type:t,message:e,details:o,link:n,dontShowAgain:!1,deleted:!1});this.messages.length>E.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const r=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&r?(setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t==="error"&&(this.unreadErrors=!0)})}showNotification(t,e,o,n,a){if(a===void 0||!E.notificationDismissed(a)){if(this.notifications.filter(i=>i.persistentId===a).filter(i=>!i.deleted).length>0)return;const r=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:r,type:t,message:e,details:o,link:n,persistentId:a,dontShowAgain:!1,deleted:!1}),n===void 0&&setTimeout(()=>{this.dismissNotification(r)},E.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,n)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!E.notificationDismissed(o.persistentId)){let n=window.localStorage.getItem(E.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);n=n===null?o.persistentId:`${n},${o.persistentId}`,window.localStorage.setItem(E.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,n)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const n=this.findNotificationIndex(t);n!==-1&&(this.notifications.splice(n,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,n)=>o.id===t?(e=n,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(E.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===M.ACTIVE?"var(--dev-tools-green-color)":t===M.INACTIVE?"var(--dev-tools-grey-color)":t===M.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===M.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return b`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?b`<p>${t.details}</p>`:""}
            ${t.link?b`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?b`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return b` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>b`<button
                class=${Vo({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{this.activeTab=t.id,t.activate&&t.activate.call(this)}}
              >
                ${t.title}
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
        ${this.tabs.map(t=>this.activeTab===t.id?t.render():z)}
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?b`<svg
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
            </svg>`:b`<svg
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
        ${this.splashMessage?b`<span class="status-description">${this.splashMessage}</span></div>`:z}
      </div>`}renderLog(){return b`<div class="message-tray">${this.messages.map(t=>this.renderMessage(t))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}renderCode(){return b`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await _(()=>Promise.resolve().then(()=>Il),void 0),this.componentPicker.open({infoTemplate:b`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return b`<div class="info-tray">
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
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===M.UNAVAILABLE||this.frontendStatus===M.ERROR)&&(this.javaStatus===M.UNAVAILABLE||this.javaStatus===M.ERROR)}
              ?checked="${this.frontendStatus===M.ACTIVE||this.javaStatus===M.ACTIVE}"
              @change=${t=>this.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${E.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return b`<div class="features-tray">
      ${this.features.map(t=>b`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return b` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");Dl(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,o),this.showNotification("information",`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let y=E;y.MAX_LOG_ROWS=1e3;y.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";y.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";y.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";y.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";y.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;y.HOTSWAP_AGENT="HOTSWAP_AGENT";y.JREBEL="JREBEL";y.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";y.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};L([x({type:String})],y.prototype,"url",2);L([x({type:Boolean,attribute:!0})],y.prototype,"liveReloadDisabled",2);L([x({type:String})],y.prototype,"backend",2);L([x({type:Number})],y.prototype,"springBootLiveReloadPort",2);L([x({type:Boolean,attribute:!1})],y.prototype,"expanded",2);L([x({type:Array,attribute:!1})],y.prototype,"messages",2);L([x({type:String,attribute:!1})],y.prototype,"splashMessage",2);L([x({type:Array,attribute:!1})],y.prototype,"notifications",2);L([x({type:String,attribute:!1})],y.prototype,"frontendStatus",2);L([x({type:String,attribute:!1})],y.prototype,"javaStatus",2);L([$()],y.prototype,"tabs",2);L([$()],y.prototype,"activeTab",2);L([$()],y.prototype,"serverInfo",2);L([$()],y.prototype,"features",2);L([$()],y.prototype,"unreadErrors",2);L([at(".window")],y.prototype,"root",2);L([at("vaadin-dev-tools-component-picker")],y.prototype,"componentPicker",2);L([$()],y.prototype,"componentPickActive",2);L([$()],y.prototype,"themeEditorState",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",y);const zs=w``,Cs=w``,{toString:Gl}=Object.prototype;function Yl(t){return Gl.call(t)==="[object RegExp]"}function Kl(t,{preserve:e=!0,whitespace:o=!0,all:n}={}){if(n)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let a=e,r;typeof e=="function"?(a=!1,r=e):Yl(e)&&(a=!1,r=d=>e.test(d));let i=!1,s="",l="",c="";for(let d=0;d<t.length;d++){if(s=t[d],t[d-1]!=="\\"&&(s==='"'||s==="'")&&(i===s?i=!1:i||(i=s)),!i&&s==="/"&&t[d+1]==="*"){const m=t[d+2]==="!";let p=d+2;for(;p<t.length;p++){if(t[p]==="*"&&t[p+1]==="/"){a&&m||r&&r(l)?c+=`/*${l}*/`:o||(t[p+2]===`
`?p++:t[p+2]+t[p+3]===`\r
`&&(p+=2)),l="";break}l+=t[p]}d=p+1;continue}c+=s}return c}const Xl=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Kl(t));for(var n,a=t;(n=o.exec(t))!==null;){a=a.replace(n[0],"");const r=document.createElement("link");r.rel="stylesheet",r.href=n[2]||n[4];const i=n[1]||n[5];i&&(r.media=i),e===document?document.head.appendChild(r):e.appendChild(r)}return a},Jl=(t,e,o)=>{const n=new CSSStyleSheet;return n.replaceSync(t),o?e.adoptedStyleSheets=[n,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,n],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(a=>a!==n)}},Ql=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let n;if(e){const r=Array.from(document.head.childNodes).filter(i=>i.nodeType===Node.COMMENT_NODE).find(i=>i.data.trim()===e);r&&(n=r)}return document.head.insertBefore(o,n),()=>{o.remove()}},we=(t,e,o,n)=>{if(o===document){const r=Zl(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(r)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(r)}const a=Xl(t,o);return o===document?Ql(a,e):Jl(a,o,n)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Zn(t){let e,o,n=2166136261;for(e=0,o=t.length;e<o;e++)n^=t.charCodeAt(e),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return("0000000"+(n>>>0).toString(16)).substr(-8)}function Zl(t){let e=Zn(t);return e+Zn(e+t)}document["_vaadintheme_add-ondemos_componentCss"]||(document["_vaadintheme_add-ondemos_componentCss"]=!0);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class es extends HTMLElement{static get version(){return"24.1.0-beta2"}}customElements.define("vaadin-lumo-styles",es);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ts=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,n,a){super.attributeChangedCallback(o,n,a),o==="theme"&&this._set_theme(a)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const La=[];function Ta(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function os(t){return Ta(customElements.get(t))}function ns(t=[]){return[t].flat(1/0).filter(e=>e instanceof Io?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function qt(t,e,o={}){t&&os(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=ns(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):La.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function To(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():La}function as(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function rs(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function Na(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const n=To().find(a=>a.moduleId===o);n?e.push(...Na(n),...n.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function is(t,e){const o=document.createElement("style");o.innerHTML=t.map(n=>n.cssText).join(`
`),e.content.appendChild(o)}function ls(t){const e=`${t}-default-theme`,o=To().filter(n=>n.moduleId!==e&&as(n.themeFor,t)).map(n=>({...n,styles:[...Na(n),...n.styles],includePriority:rs(n.moduleId)})).sort((n,a)=>a.includePriority-n.includePriority);return o.length>0?o:To().filter(n=>n.moduleId===e)}const $s=t=>class extends ts(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||Ta(this)||is(this.getStylesForThis(),o)}static finalizeStyles(o){const n=this.getStylesForThis();return o?[...super.finalizeStyles(o),...n]:n}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),n=(o?o.constructor.__themes:[])||[];this.__themes=[...n,...ls(this.is)];const a=this.__themes.flatMap(r=>r.styles);return a.filter((r,i)=>i===a.lastIndexOf(r))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ss=(t,...e)=>{const o=document.createElement("style");o.id=t,o.textContent=e.map(n=>n.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)},he=(t,...e)=>{ss(`lumo-${t}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cs=w`
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
`,Go=w`
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
    margin-block: 0;
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
`;qt("",Go,{moduleId:"lumo-typography"});he("typography-props",cs);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */he("typography",Go);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ds=w`
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

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;he("color-props",ds);const Yo=w`
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

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
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
`;qt("",Yo,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */he("color",Yo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pa=w`
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
`;he("spacing-props",Pa);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ps=w`
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
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
  }
`;he("style-props",ps);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ko=w`
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

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
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

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
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

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
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
`;qt("",Ko,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */he("badge",Ko);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const fs=w`
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
 */const us=w`
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

  .bg-warning {
    background-color: var(--lumo-warning-color);
  }
  .bg-warning-10 {
    background-color: var(--lumo-warning-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ms=w`
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

  .border-warning {
    border-color: var(--lumo-warning-color);
  }
  .border-warning-10 {
    border-color: var(--lumo-warning-color-10pct);
  }
  .border-warning-strong {
    border-color: var(--lumo-warning-text-color);
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
 */const hs=w`
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
 */const bs=w`
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
 */const gs=w`
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
 */const ws=w`
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
 */const xs=w`
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
 */const vs=w`
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
  .text-warning {
    color: var(--lumo-warning-text-color);
  }
  .text-warning-contrast {
    color: var(--lumo-warning-contrast-color);
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
 */const Xo=w`
${fs}
${us}
${ms}
${gs}
${hs}
${bs}
${ws}
${xs}
${vs}
`;qt("",Xo,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */he("utility",Xo);const ys=w`.la,.lab,.lad,.lal,.lar,.las{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1}.la-lg{font-size:1.33333em;line-height:.75em;vertical-align:-.0667em}.la-xs{font-size:.75em}.la-sm{font-size:.875em}.la-1x{font-size:1em}.la-2x{font-size:2em}.la-3x{font-size:3em}.la-4x{font-size:4em}.la-5x{font-size:5em}.la-6x{font-size:6em}.la-7x{font-size:7em}.la-8x{font-size:8em}.la-9x{font-size:9em}.la-10x{font-size:10em}.la-fw{text-align:center;width:1.25em}.la-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.la-ul>li{position:relative}.la-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.la-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.la-pull-left{float:left}.la-pull-right{float:right}.la.la-pull-left,.lab.la-pull-left,.lal.la-pull-left,.lar.la-pull-left,.las.la-pull-left{margin-right:.3em}.la.la-pull-right,.lab.la-pull-right,.lal.la-pull-right,.lar.la-pull-right,.las.la-pull-right{margin-left:.3em}.la-spin{-webkit-animation:la-spin 2s infinite linear;animation:la-spin 2s infinite linear}.la-pulse{-webkit-animation:la-spin 1s infinite steps(8);animation:la-spin 1s infinite steps(8)}@-webkit-keyframes la-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes la-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.la-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.la-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.la-flip-horizontal{-webkit-transform:scale(-1,1);transform:scaleX(-1)}.la-flip-vertical{-webkit-transform:scale(1,-1);transform:scaleY(-1)}.la-flip-both,.la-flip-horizontal.la-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1)}:root .la-flip-both,:root .la-flip-horizontal,:root .la-flip-vertical,:root .la-rotate-180,:root .la-rotate-270,:root .la-rotate-90{-webkit-filter:none;filter:none}.la-stack{display:inline-block;height:2em;line-height:2em;position:relative;vertical-align:middle;width:2.5em}.la-stack-1x,.la-stack-2x{left:0;position:absolute;text-align:center;width:100%}.la-stack-1x{line-height:inherit}.la-stack-2x{font-size:2em}.la-inverse{color:#fff}.la-500px:before{content:""}.la-accessible-icon:before{content:""}.la-accusoft:before{content:""}.la-acquisitions-incorporated:before{content:""}.la-ad:before{content:""}.la-address-book:before{content:""}.la-address-card:before{content:""}.la-adjust:before{content:""}.la-adn:before{content:""}.la-adobe:before{content:""}.la-adversal:before{content:""}.la-affiliatetheme:before{content:""}.la-air-freshener:before{content:""}.la-airbnb:before{content:""}.la-algolia:before{content:""}.la-align-center:before{content:""}.la-align-justify:before{content:""}.la-align-left:before{content:""}.la-align-right:before{content:""}.la-alipay:before{content:""}.la-allergies:before{content:""}.la-amazon:before{content:""}.la-amazon-pay:before{content:""}.la-ambulance:before{content:""}.la-american-sign-language-interpreting:before{content:""}.la-amilia:before{content:""}.la-anchor:before{content:""}.la-android:before{content:""}.la-angellist:before{content:""}.la-angle-double-down:before{content:""}.la-angle-double-left:before{content:""}.la-angle-double-right:before{content:""}.la-angle-double-up:before{content:""}.la-angle-down:before{content:""}.la-angle-left:before{content:""}.la-angle-right:before{content:""}.la-angle-up:before{content:""}.la-angry:before{content:""}.la-angrycreative:before{content:""}.la-angular:before{content:""}.la-ankh:before{content:""}.la-app-store:before{content:""}.la-app-store-ios:before{content:""}.la-apper:before{content:""}.la-apple:before{content:""}.la-apple-alt:before{content:""}.la-apple-pay:before{content:""}.la-archive:before{content:""}.la-archway:before{content:""}.la-arrow-alt-circle-down:before{content:""}.la-arrow-alt-circle-left:before{content:""}.la-arrow-alt-circle-right:before{content:""}.la-arrow-alt-circle-up:before{content:""}.la-arrow-circle-down:before{content:""}.la-arrow-circle-left:before{content:""}.la-arrow-circle-right:before{content:""}.la-arrow-circle-up:before{content:""}.la-arrow-down:before{content:""}.la-arrow-left:before{content:""}.la-arrow-right:before{content:""}.la-arrow-up:before{content:""}.la-arrows-alt:before{content:""}.la-arrows-alt-h:before{content:""}.la-arrows-alt-v:before{content:""}.la-artstation:before{content:""}.la-assistive-listening-systems:before{content:""}.la-asterisk:before{content:""}.la-asymmetrik:before{content:""}.la-at:before{content:""}.la-atlas:before{content:""}.la-atlassian:before{content:""}.la-atom:before{content:""}.la-audible:before{content:""}.la-audio-description:before{content:""}.la-autoprefixer:before{content:""}.la-avianex:before{content:""}.la-aviato:before{content:""}.la-award:before{content:""}.la-aws:before{content:""}.la-baby:before{content:""}.la-baby-carriage:before{content:""}.la-backspace:before{content:""}.la-backward:before{content:""}.la-bacon:before{content:""}.la-balance-scale:before{content:""}.la-balance-scale-left:before{content:""}.la-balance-scale-right:before{content:""}.la-ban:before{content:""}.la-band-aid:before{content:""}.la-bandcamp:before{content:""}.la-barcode:before{content:""}.la-bars:before{content:""}.la-baseball-ball:before{content:""}.la-basketball-ball:before{content:""}.la-bath:before{content:""}.la-battery-empty:before{content:""}.la-battery-full:before{content:""}.la-battery-half:before{content:""}.la-battery-quarter:before{content:""}.la-battery-three-quarters:before{content:""}.la-battle-net:before{content:""}.la-bed:before{content:""}.la-beer:before{content:""}.la-behance:before{content:""}.la-behance-square:before{content:""}.la-bell:before{content:""}.la-bell-slash:before{content:""}.la-bezier-curve:before{content:""}.la-bible:before{content:""}.la-bicycle:before{content:""}.la-biking:before{content:""}.la-bimobject:before{content:""}.la-binoculars:before{content:""}.la-biohazard:before{content:""}.la-birthday-cake:before{content:""}.la-bitbucket:before{content:""}.la-bitcoin:before{content:""}.la-bity:before{content:""}.la-black-tie:before{content:""}.la-blackberry:before{content:""}.la-blender:before{content:""}.la-blender-phone:before{content:""}.la-blind:before{content:""}.la-blog:before{content:""}.la-blogger:before{content:""}.la-blogger-b:before{content:""}.la-bluetooth:before{content:""}.la-bluetooth-b:before{content:""}.la-bold:before{content:""}.la-bolt:before{content:""}.la-bomb:before{content:""}.la-bone:before{content:""}.la-bong:before{content:""}.la-book:before{content:""}.la-book-dead:before{content:""}.la-book-medical:before{content:""}.la-book-open:before{content:""}.la-book-reader:before{content:""}.la-bookmark:before{content:""}.la-bootstrap:before{content:""}.la-border-all:before{content:""}.la-border-none:before{content:""}.la-border-style:before{content:""}.la-bowling-ball:before{content:""}.la-box:before{content:""}.la-box-open:before{content:""}.la-boxes:before{content:""}.la-braille:before{content:""}.la-brain:before{content:""}.la-bread-slice:before{content:""}.la-briefcase:before{content:""}.la-briefcase-medical:before{content:""}.la-broadcast-tower:before{content:""}.la-broom:before{content:""}.la-brush:before{content:""}.la-btc:before{content:""}.la-buffer:before{content:""}.la-bug:before{content:""}.la-building:before{content:""}.la-bullhorn:before{content:""}.la-bullseye:before{content:""}.la-burn:before{content:""}.la-buromobelexperte:before{content:""}.la-bus:before{content:""}.la-bus-alt:before{content:""}.la-business-time:before{content:""}.la-buy-n-large:before{content:""}.la-buysellads:before{content:""}.la-calculator:before{content:""}.la-calendar:before{content:""}.la-calendar-alt:before{content:""}.la-calendar-check:before{content:""}.la-calendar-day:before{content:""}.la-calendar-minus:before{content:""}.la-calendar-plus:before{content:""}.la-calendar-times:before{content:""}.la-calendar-week:before{content:""}.la-camera:before{content:""}.la-camera-retro:before{content:""}.la-campground:before{content:""}.la-canadian-maple-leaf:before{content:""}.la-candy-cane:before{content:""}.la-cannabis:before{content:""}.la-capsules:before{content:""}.la-car:before{content:""}.la-car-alt:before{content:""}.la-car-battery:before{content:""}.la-car-crash:before{content:""}.la-car-side:before{content:""}.la-caret-down:before{content:""}.la-caret-left:before{content:""}.la-caret-right:before{content:""}.la-caret-square-down:before{content:""}.la-caret-square-left:before{content:""}.la-caret-square-right:before{content:""}.la-caret-square-up:before{content:""}.la-caret-up:before{content:""}.la-carrot:before{content:""}.la-cart-arrow-down:before{content:""}.la-cart-plus:before{content:""}.la-cash-register:before{content:""}.la-cat:before{content:""}.la-cc-amazon-pay:before{content:""}.la-cc-amex:before{content:""}.la-cc-apple-pay:before{content:""}.la-cc-diners-club:before{content:""}.la-cc-discover:before{content:""}.la-cc-jcb:before{content:""}.la-cc-mastercard:before{content:""}.la-cc-paypal:before{content:""}.la-cc-stripe:before{content:""}.la-cc-visa:before{content:""}.la-centercode:before{content:""}.la-centos:before{content:""}.la-certificate:before{content:""}.la-chair:before{content:""}.la-chalkboard:before{content:""}.la-chalkboard-teacher:before{content:""}.la-charging-station:before{content:""}.la-chart-area:before{content:""}.la-chart-bar:before{content:""}.la-chart-line:before{content:""}.la-chart-pie:before{content:""}.la-check:before{content:""}.la-check-circle:before{content:""}.la-check-double:before{content:""}.la-check-square:before{content:""}.la-cheese:before{content:""}.la-chess:before{content:""}.la-chess-bishop:before{content:""}.la-chess-board:before{content:""}.la-chess-king:before{content:""}.la-chess-knight:before{content:""}.la-chess-pawn:before{content:""}.la-chess-queen:before{content:""}.la-chess-rook:before{content:""}.la-chevron-circle-down:before{content:""}.la-chevron-circle-left:before{content:""}.la-chevron-circle-right:before{content:""}.la-chevron-circle-up:before{content:""}.la-chevron-down:before{content:""}.la-chevron-left:before{content:""}.la-chevron-right:before{content:""}.la-chevron-up:before{content:""}.la-child:before{content:""}.la-chrome:before{content:""}.la-chromecast:before{content:""}.la-church:before{content:""}.la-circle:before{content:""}.la-circle-notch:before{content:""}.la-city:before{content:""}.la-clinic-medical:before{content:""}.la-clipboard:before{content:""}.la-clipboard-check:before{content:""}.la-clipboard-list:before{content:""}.la-clock:before{content:""}.la-clone:before{content:""}.la-closed-captioning:before{content:""}.la-cloud:before{content:""}.la-cloud-download-alt:before{content:""}.la-cloud-meatball:before{content:""}.la-cloud-moon:before{content:""}.la-cloud-moon-rain:before{content:""}.la-cloud-rain:before{content:""}.la-cloud-showers-heavy:before{content:""}.la-cloud-sun:before{content:""}.la-cloud-sun-rain:before{content:""}.la-cloud-upload-alt:before{content:""}.la-cloudscale:before{content:""}.la-cloudsmith:before{content:""}.la-cloudversify:before{content:""}.la-cocktail:before{content:""}.la-code:before{content:""}.la-code-branch:before{content:""}.la-codepen:before{content:""}.la-codiepie:before{content:""}.la-coffee:before{content:""}.la-cog:before{content:""}.la-cogs:before{content:""}.la-coins:before{content:""}.la-columns:before{content:""}.la-comment:before{content:""}.la-comment-alt:before{content:""}.la-comment-dollar:before{content:""}.la-comment-dots:before{content:""}.la-comment-medical:before{content:""}.la-comment-slash:before{content:""}.la-comments:before{content:""}.la-comments-dollar:before{content:""}.la-compact-disc:before{content:""}.la-compass:before{content:""}.la-compress:before{content:""}.la-compress-arrows-alt:before{content:""}.la-concierge-bell:before{content:""}.la-confluence:before{content:""}.la-connectdevelop:before{content:""}.la-contao:before{content:""}.la-cookie:before{content:""}.la-cookie-bite:before{content:""}.la-copy:before{content:""}.la-copyright:before{content:""}.la-cotton-bureau:before{content:""}.la-couch:before{content:""}.la-cpanel:before{content:""}.la-creative-commons:before{content:""}.la-creative-commons-by:before{content:""}.la-creative-commons-nc:before{content:""}.la-creative-commons-nc-eu:before{content:""}.la-creative-commons-nc-jp:before{content:""}.la-creative-commons-nd:before{content:""}.la-creative-commons-pd:before{content:""}.la-creative-commons-pd-alt:before{content:""}.la-creative-commons-remix:before{content:""}.la-creative-commons-sa:before{content:""}.la-creative-commons-sampling:before{content:""}.la-creative-commons-sampling-plus:before{content:""}.la-creative-commons-share:before{content:""}.la-creative-commons-zero:before{content:""}.la-credit-card:before{content:""}.la-critical-role:before{content:""}.la-crop:before{content:""}.la-crop-alt:before{content:""}.la-cross:before{content:""}.la-crosshairs:before{content:""}.la-crow:before{content:""}.la-crown:before{content:""}.la-crutch:before{content:""}.la-css3:before{content:""}.la-css3-alt:before{content:""}.la-cube:before{content:""}.la-cubes:before{content:""}.la-cut:before{content:""}.la-cuttlefish:before{content:""}.la-d-and-d:before{content:""}.la-d-and-d-beyond:before{content:""}.la-dashcube:before{content:""}.la-database:before{content:""}.la-deaf:before{content:""}.la-delicious:before{content:""}.la-democrat:before{content:""}.la-deploydog:before{content:""}.la-deskpro:before{content:""}.la-desktop:before{content:""}.la-dev:before{content:""}.la-deviantart:before{content:""}.la-dharmachakra:before{content:""}.la-dhl:before{content:""}.la-diagnoses:before{content:""}.la-diaspora:before{content:""}.la-dice:before{content:""}.la-dice-d20:before{content:""}.la-dice-d6:before{content:""}.la-dice-five:before{content:""}.la-dice-four:before{content:""}.la-dice-one:before{content:""}.la-dice-six:before{content:""}.la-dice-three:before{content:""}.la-dice-two:before{content:""}.la-digg:before{content:""}.la-digital-ocean:before{content:""}.la-digital-tachograph:before{content:""}.la-directions:before{content:""}.la-discord:before{content:""}.la-discourse:before{content:""}.la-divide:before{content:""}.la-dizzy:before{content:""}.la-dna:before{content:""}.la-dochub:before{content:""}.la-docker:before{content:""}.la-dog:before{content:""}.la-dollar-sign:before{content:""}.la-dolly:before{content:""}.la-dolly-flatbed:before{content:""}.la-donate:before{content:""}.la-door-closed:before{content:""}.la-door-open:before{content:""}.la-dot-circle:before{content:""}.la-dove:before{content:""}.la-download:before{content:""}.la-draft2digital:before{content:""}.la-drafting-compass:before{content:""}.la-dragon:before{content:""}.la-draw-polygon:before{content:""}.la-dribbble:before{content:""}.la-dribbble-square:before{content:""}.la-dropbox:before{content:""}.la-drum:before{content:""}.la-drum-steelpan:before{content:""}.la-drumstick-bite:before{content:""}.la-drupal:before{content:""}.la-dumbbell:before{content:""}.la-dumpster:before{content:""}.la-dumpster-fire:before{content:""}.la-dungeon:before{content:""}.la-dyalog:before{content:""}.la-earlybirds:before{content:""}.la-ebay:before{content:""}.la-edge:before{content:""}.la-edit:before{content:""}.la-egg:before{content:""}.la-eject:before{content:""}.la-elementor:before{content:""}.la-ellipsis-h:before{content:""}.la-ellipsis-v:before{content:""}.la-ello:before{content:""}.la-ember:before{content:""}.la-empire:before{content:""}.la-envelope:before{content:""}.la-envelope-open:before{content:""}.la-envelope-open-text:before{content:""}.la-envelope-square:before{content:""}.la-envira:before{content:""}.la-equals:before{content:""}.la-eraser:before{content:""}.la-erlang:before{content:""}.la-ethereum:before{content:""}.la-ethernet:before{content:""}.la-etsy:before{content:""}.la-euro-sign:before{content:""}.la-evernote:before{content:""}.la-exchange-alt:before{content:""}.la-exclamation:before{content:""}.la-exclamation-circle:before{content:""}.la-exclamation-triangle:before{content:""}.la-expand:before{content:""}.la-expand-arrows-alt:before{content:""}.la-expeditedssl:before{content:""}.la-external-link-alt:before{content:""}.la-external-link-square-alt:before{content:""}.la-eye:before{content:""}.la-eye-dropper:before{content:""}.la-eye-slash:before{content:""}.la-facebook:before{content:""}.la-facebook-f:before{content:""}.la-facebook-messenger:before{content:""}.la-facebook-square:before{content:""}.la-fan:before{content:""}.la-fantasy-flight-games:before{content:""}.la-fast-backward:before{content:""}.la-fast-forward:before{content:""}.la-fax:before{content:""}.la-feather:before{content:""}.la-feather-alt:before{content:""}.la-fedex:before{content:""}.la-fedora:before{content:""}.la-female:before{content:""}.la-fighter-jet:before{content:""}.la-figma:before{content:""}.la-file:before{content:""}.la-file-alt:before{content:""}.la-file-archive:before{content:""}.la-file-audio:before{content:""}.la-file-code:before{content:""}.la-file-contract:before{content:""}.la-file-csv:before{content:""}.la-file-download:before{content:""}.la-file-excel:before{content:""}.la-file-export:before{content:""}.la-file-image:before{content:""}.la-file-import:before{content:""}.la-file-invoice:before{content:""}.la-file-invoice-dollar:before{content:""}.la-file-medical:before{content:""}.la-file-medical-alt:before{content:""}.la-file-pdf:before{content:""}.la-file-powerpoint:before{content:""}.la-file-prescription:before{content:""}.la-file-signature:before{content:""}.la-file-upload:before{content:""}.la-file-video:before{content:""}.la-file-word:before{content:""}.la-fill:before{content:""}.la-fill-drip:before{content:""}.la-film:before{content:""}.la-filter:before{content:""}.la-fingerprint:before{content:""}.la-fire:before{content:""}.la-fire-alt:before{content:""}.la-fire-extinguisher:before{content:""}.la-firefox:before{content:""}.la-first-aid:before{content:""}.la-first-order:before{content:""}.la-first-order-alt:before{content:""}.la-firstdraft:before{content:""}.la-fish:before{content:""}.la-fist-raised:before{content:""}.la-flag:before{content:""}.la-flag-checkered:before{content:""}.la-flag-usa:before{content:""}.la-flask:before{content:""}.la-flickr:before{content:""}.la-flipboard:before{content:""}.la-flushed:before{content:""}.la-fly:before{content:""}.la-folder:before{content:""}.la-folder-minus:before{content:""}.la-folder-open:before{content:""}.la-folder-plus:before{content:""}.la-font:before{content:""}.la-font-awesome:before{content:""}.la-font-awesome-alt:before{content:""}.la-font-awesome-flag:before{content:""}.la-font-awesome-logo-full:before{content:""}.la-fonticons:before{content:""}.la-fonticons-fi:before{content:""}.la-football-ball:before{content:""}.la-fort-awesome:before{content:""}.la-fort-awesome-alt:before{content:""}.la-forumbee:before{content:""}.la-forward:before{content:""}.la-foursquare:before{content:""}.la-free-code-camp:before{content:""}.la-freebsd:before{content:""}.la-frog:before{content:""}.la-frown:before{content:""}.la-frown-open:before{content:""}.la-fulcrum:before{content:""}.la-funnel-dollar:before{content:""}.la-futbol:before{content:""}.la-galactic-republic:before{content:""}.la-galactic-senate:before{content:""}.la-gamepad:before{content:""}.la-gas-pump:before{content:""}.la-gavel:before{content:""}.la-gem:before{content:""}.la-genderless:before{content:""}.la-get-pocket:before{content:""}.la-gg:before{content:""}.la-gg-circle:before{content:""}.la-ghost:before{content:""}.la-gift:before{content:""}.la-gifts:before{content:""}.la-git:before{content:""}.la-git-alt:before{content:""}.la-git-square:before{content:""}.la-github:before{content:""}.la-github-alt:before{content:""}.la-github-square:before{content:""}.la-gitkraken:before{content:""}.la-gitlab:before{content:""}.la-gitter:before{content:""}.la-glass-cheers:before{content:""}.la-glass-martini:before{content:""}.la-glass-martini-alt:before{content:""}.la-glass-whiskey:before{content:""}.la-glasses:before{content:""}.la-glide:before{content:""}.la-glide-g:before{content:""}.la-globe:before{content:""}.la-globe-africa:before{content:""}.la-globe-americas:before{content:""}.la-globe-asia:before{content:""}.la-globe-europe:before{content:""}.la-gofore:before{content:""}.la-golf-ball:before{content:""}.la-goodreads:before{content:""}.la-goodreads-g:before{content:""}.la-google:before{content:""}.la-google-drive:before{content:""}.la-google-play:before{content:""}.la-google-plus:before{content:""}.la-google-plus-g:before{content:""}.la-google-plus-square:before{content:""}.la-google-wallet:before{content:""}.la-gopuram:before{content:""}.la-graduation-cap:before{content:""}.la-gratipay:before{content:""}.la-grav:before{content:""}.la-greater-than:before{content:""}.la-greater-than-equal:before{content:""}.la-grimace:before{content:""}.la-grin:before{content:""}.la-grin-alt:before{content:""}.la-grin-beam:before{content:""}.la-grin-beam-sweat:before{content:""}.la-grin-hearts:before{content:""}.la-grin-squint:before{content:""}.la-grin-squint-tears:before{content:""}.la-grin-stars:before{content:""}.la-grin-tears:before{content:""}.la-grin-tongue:before{content:""}.la-grin-tongue-squint:before{content:""}.la-grin-tongue-wink:before{content:""}.la-grin-wink:before{content:""}.la-grip-horizontal:before{content:""}.la-grip-lines:before{content:""}.la-grip-lines-vertical:before{content:""}.la-grip-vertical:before{content:""}.la-gripfire:before{content:""}.la-grunt:before{content:""}.la-guitar:before{content:""}.la-gulp:before{content:""}.la-h-square:before{content:""}.la-hacker-news:before{content:""}.la-hacker-news-square:before{content:""}.la-hackerrank:before{content:""}.la-hamburger:before{content:""}.la-hammer:before{content:""}.la-hamsa:before{content:""}.la-hand-holding:before{content:""}.la-hand-holding-heart:before{content:""}.la-hand-holding-usd:before{content:""}.la-hand-lizard:before{content:""}.la-hand-middle-finger:before{content:""}.la-hand-paper:before{content:""}.la-hand-peace:before{content:""}.la-hand-point-down:before{content:""}.la-hand-point-left:before{content:""}.la-hand-point-right:before{content:""}.la-hand-point-up:before{content:""}.la-hand-pointer:before{content:""}.la-hand-rock:before{content:""}.la-hand-scissors:before{content:""}.la-hand-spock:before{content:""}.la-hands:before{content:""}.la-hands-helping:before{content:""}.la-handshake:before{content:""}.la-hanukiah:before{content:""}.la-hard-hat:before{content:""}.la-hashtag:before{content:""}.la-hat-cowboy:before{content:""}.la-hat-cowboy-side:before{content:""}.la-hat-wizard:before{content:""}.la-haykal:before{content:""}.la-hdd:before{content:""}.la-heading:before{content:""}.la-headphones:before{content:""}.la-headphones-alt:before{content:""}.la-headset:before{content:""}.la-heart:before{content:""}.la-heart-broken:before{content:""}.la-heartbeat:before{content:""}.la-helicopter:before{content:""}.la-highlighter:before{content:""}.la-hiking:before{content:""}.la-hippo:before{content:""}.la-hips:before{content:""}.la-hire-a-helper:before{content:""}.la-history:before{content:""}.la-hockey-puck:before{content:""}.la-holly-berry:before{content:""}.la-home:before{content:""}.la-hooli:before{content:""}.la-hornbill:before{content:""}.la-horse:before{content:""}.la-horse-head:before{content:""}.la-hospital:before{content:""}.la-hospital-alt:before{content:""}.la-hospital-symbol:before{content:""}.la-hot-tub:before{content:""}.la-hotdog:before{content:""}.la-hotel:before{content:""}.la-hotjar:before{content:""}.la-hourglass:before{content:""}.la-hourglass-end:before{content:""}.la-hourglass-half:before{content:""}.la-hourglass-start:before{content:""}.la-house-damage:before{content:""}.la-houzz:before{content:""}.la-hryvnia:before{content:""}.la-html5:before{content:""}.la-hubspot:before{content:""}.la-i-cursor:before{content:""}.la-ice-cream:before{content:""}.la-icicles:before{content:""}.la-icons:before{content:""}.la-id-badge:before{content:""}.la-id-card:before{content:""}.la-id-card-alt:before{content:""}.la-igloo:before{content:""}.la-image:before{content:""}.la-images:before{content:""}.la-imdb:before{content:""}.la-inbox:before{content:""}.la-indent:before{content:""}.la-industry:before{content:""}.la-infinity:before{content:""}.la-info:before{content:""}.la-info-circle:before{content:""}.la-instagram:before{content:""}.la-intercom:before{content:""}.la-internet-explorer:before{content:""}.la-invision:before{content:""}.la-ioxhost:before{content:""}.la-italic:before{content:""}.la-itch-io:before{content:""}.la-itunes:before{content:""}.la-itunes-note:before{content:""}.la-java:before{content:""}.la-jedi:before{content:""}.la-jedi-order:before{content:""}.la-jenkins:before{content:""}.la-jira:before{content:""}.la-joget:before{content:""}.la-joint:before{content:""}.la-joomla:before{content:""}.la-journal-whills:before{content:""}.la-js:before{content:""}.la-js-square:before{content:""}.la-jsfiddle:before{content:""}.la-kaaba:before{content:""}.la-kaggle:before{content:""}.la-key:before{content:""}.la-keybase:before{content:""}.la-keyboard:before{content:""}.la-keycdn:before{content:""}.la-khanda:before{content:""}.la-kickstarter:before{content:""}.la-kickstarter-k:before{content:""}.la-kiss:before{content:""}.la-kiss-beam:before{content:""}.la-kiss-wink-heart:before{content:""}.la-kiwi-bird:before{content:""}.la-korvue:before{content:""}.la-landmark:before{content:""}.la-language:before{content:""}.la-laptop:before{content:""}.la-laptop-code:before{content:""}.la-laptop-medical:before{content:""}.la-laravel:before{content:""}.la-lastfm:before{content:""}.la-lastfm-square:before{content:""}.la-laugh:before{content:""}.la-laugh-beam:before{content:""}.la-laugh-squint:before{content:""}.la-laugh-wink:before{content:""}.la-layer-group:before{content:""}.la-leaf:before{content:""}.la-leanpub:before{content:""}.la-lemon:before{content:""}.la-less:before{content:""}.la-less-than:before{content:""}.la-less-than-equal:before{content:""}.la-level-down-alt:before{content:""}.la-level-up-alt:before{content:""}.la-life-ring:before{content:""}.la-lightbulb:before{content:""}.la-line:before{content:""}.la-link:before{content:""}.la-linkedin:before{content:""}.la-linkedin-in:before{content:""}.la-linode:before{content:""}.la-linux:before{content:""}.la-lira-sign:before{content:""}.la-list:before{content:""}.la-list-alt:before{content:""}.la-list-ol:before{content:""}.la-list-ul:before{content:""}.la-location-arrow:before{content:""}.la-lock:before{content:""}.la-lock-open:before{content:""}.la-long-arrow-alt-down:before{content:""}.la-long-arrow-alt-left:before{content:""}.la-long-arrow-alt-right:before{content:""}.la-long-arrow-alt-up:before{content:""}.la-low-vision:before{content:""}.la-luggage-cart:before{content:""}.la-lyft:before{content:""}.la-magento:before{content:""}.la-magic:before{content:""}.la-magnet:before{content:""}.la-mail-bulk:before{content:""}.la-mailchimp:before{content:""}.la-male:before{content:""}.la-mandalorian:before{content:""}.la-map:before{content:""}.la-map-marked:before{content:""}.la-map-marked-alt:before{content:""}.la-map-marker:before{content:""}.la-map-marker-alt:before{content:""}.la-map-pin:before{content:""}.la-map-signs:before{content:""}.la-markdown:before{content:""}.la-marker:before{content:""}.la-mars:before{content:""}.la-mars-double:before{content:""}.la-mars-stroke:before{content:""}.la-mars-stroke-h:before{content:""}.la-mars-stroke-v:before{content:""}.la-mask:before{content:""}.la-mastodon:before{content:""}.la-maxcdn:before{content:""}.la-mdb:before{content:""}.la-medal:before{content:""}.la-medapps:before{content:""}.la-medium:before{content:""}.la-medium-m:before{content:""}.la-medkit:before{content:""}.la-medrt:before{content:""}.la-meetup:before{content:""}.la-megaport:before{content:""}.la-meh:before{content:""}.la-meh-blank:before{content:""}.la-meh-rolling-eyes:before{content:""}.la-memory:before{content:""}.la-mendeley:before{content:""}.la-menorah:before{content:""}.la-mercury:before{content:""}.la-meteor:before{content:""}.la-microchip:before{content:""}.la-microphone:before{content:""}.la-microphone-alt:before{content:""}.la-microphone-alt-slash:before{content:""}.la-microphone-slash:before{content:""}.la-microscope:before{content:""}.la-microsoft:before{content:""}.la-minus:before{content:""}.la-minus-circle:before{content:""}.la-minus-square:before{content:""}.la-mitten:before{content:""}.la-mix:before{content:""}.la-mixcloud:before{content:""}.la-mizuni:before{content:""}.la-mobile:before{content:""}.la-mobile-alt:before{content:""}.la-modx:before{content:""}.la-monero:before{content:""}.la-money-bill:before{content:""}.la-money-bill-alt:before{content:""}.la-money-bill-wave:before{content:""}.la-money-bill-wave-alt:before{content:""}.la-money-check:before{content:""}.la-money-check-alt:before{content:""}.la-monument:before{content:""}.la-moon:before{content:""}.la-mortar-pestle:before{content:""}.la-mosque:before{content:""}.la-motorcycle:before{content:""}.la-mountain:before{content:""}.la-mouse:before{content:""}.la-mouse-pointer:before{content:""}.la-mug-hot:before{content:""}.la-music:before{content:""}.la-napster:before{content:""}.la-neos:before{content:""}.la-network-wired:before{content:""}.la-neuter:before{content:""}.la-newspaper:before{content:""}.la-nimblr:before{content:""}.la-node:before{content:""}.la-node-js:before{content:""}.la-not-equal:before{content:""}.la-notes-medical:before{content:""}.la-npm:before{content:""}.la-ns8:before{content:""}.la-nutritionix:before{content:""}.la-object-group:before{content:""}.la-object-ungroup:before{content:""}.la-odnoklassniki:before{content:""}.la-odnoklassniki-square:before{content:""}.la-oil-can:before{content:""}.la-old-republic:before{content:""}.la-om:before{content:""}.la-opencart:before{content:""}.la-openid:before{content:""}.la-opera:before{content:""}.la-optin-monster:before{content:""}.la-orcid:before{content:""}.la-osi:before{content:""}.la-otter:before{content:""}.la-outdent:before{content:""}.la-page4:before{content:""}.la-pagelines:before{content:""}.la-pager:before{content:""}.la-paint-brush:before{content:""}.la-paint-roller:before{content:""}.la-palette:before{content:""}.la-palfed:before{content:""}.la-pallet:before{content:""}.la-paper-plane:before{content:""}.la-paperclip:before{content:""}.la-parachute-box:before{content:""}.la-paragraph:before{content:""}.la-parking:before{content:""}.la-passport:before{content:""}.la-pastafarianism:before{content:""}.la-paste:before{content:""}.la-patreon:before{content:""}.la-pause:before{content:""}.la-pause-circle:before{content:""}.la-paw:before{content:""}.la-paypal:before{content:""}.la-peace:before{content:""}.la-pen:before{content:""}.la-pen-alt:before{content:""}.la-pen-fancy:before{content:""}.la-pen-nib:before{content:""}.la-pen-square:before{content:""}.la-pencil-alt:before{content:""}.la-pencil-ruler:before{content:""}.la-penny-arcade:before{content:""}.la-people-carry:before{content:""}.la-pepper-hot:before{content:""}.la-percent:before{content:""}.la-percentage:before{content:""}.la-periscope:before{content:""}.la-person-booth:before{content:""}.la-phabricator:before{content:""}.la-phoenix-framework:before{content:""}.la-phoenix-squadron:before{content:""}.la-phone:before{content:""}.la-phone-alt:before{content:""}.la-phone-slash:before{content:""}.la-phone-square:before{content:""}.la-phone-square-alt:before{content:""}.la-phone-volume:before{content:""}.la-photo-video:before{content:""}.la-php:before{content:""}.la-pied-piper:before{content:""}.la-pied-piper-alt:before{content:""}.la-pied-piper-hat:before{content:""}.la-pied-piper-pp:before{content:""}.la-piggy-bank:before{content:""}.la-pills:before{content:""}.la-pinterest:before{content:""}.la-pinterest-p:before{content:""}.la-pinterest-square:before{content:""}.la-pizza-slice:before{content:""}.la-place-of-worship:before{content:""}.la-plane:before{content:""}.la-plane-arrival:before{content:""}.la-plane-departure:before{content:""}.la-play:before{content:""}.la-play-circle:before{content:""}.la-playstation:before{content:""}.la-plug:before{content:""}.la-plus:before{content:""}.la-plus-circle:before{content:""}.la-plus-square:before{content:""}.la-podcast:before{content:""}.la-poll:before{content:""}.la-poll-h:before{content:""}.la-poo:before{content:""}.la-poo-storm:before{content:""}.la-poop:before{content:""}.la-portrait:before{content:""}.la-pound-sign:before{content:""}.la-power-off:before{content:""}.la-pray:before{content:""}.la-praying-hands:before{content:""}.la-prescription:before{content:""}.la-prescription-bottle:before{content:""}.la-prescription-bottle-alt:before{content:""}.la-print:before{content:""}.la-procedures:before{content:""}.la-product-hunt:before{content:""}.la-project-diagram:before{content:""}.la-pushed:before{content:""}.la-puzzle-piece:before{content:""}.la-python:before{content:""}.la-qq:before{content:""}.la-qrcode:before{content:""}.la-question:before{content:""}.la-question-circle:before{content:""}.la-quidditch:before{content:""}.la-quinscape:before{content:""}.la-quora:before{content:""}.la-quote-left:before{content:""}.la-quote-right:before{content:""}.la-quran:before{content:""}.la-r-project:before{content:""}.la-radiation:before{content:""}.la-radiation-alt:before{content:""}.la-rainbow:before{content:""}.la-random:before{content:""}.la-raspberry-pi:before{content:""}.la-ravelry:before{content:""}.la-react:before{content:""}.la-reacteurope:before{content:""}.la-readme:before{content:""}.la-rebel:before{content:""}.la-receipt:before{content:""}.la-record-vinyl:before{content:""}.la-recycle:before{content:""}.la-red-river:before{content:""}.la-reddit:before{content:""}.la-reddit-alien:before{content:""}.la-reddit-square:before{content:""}.la-redhat:before{content:""}.la-redo:before{content:""}.la-redo-alt:before{content:""}.la-registered:before{content:""}.la-remove-format:before{content:""}.la-renren:before{content:""}.la-reply:before{content:""}.la-reply-all:before{content:""}.la-replyd:before{content:""}.la-republican:before{content:""}.la-researchgate:before{content:""}.la-resolving:before{content:""}.la-restroom:before{content:""}.la-retweet:before{content:""}.la-rev:before{content:""}.la-ribbon:before{content:""}.la-ring:before{content:""}.la-road:before{content:""}.la-robot:before{content:""}.la-rocket:before{content:""}.la-rocketchat:before{content:""}.la-rockrms:before{content:""}.la-route:before{content:""}.la-rss:before{content:""}.la-rss-square:before{content:""}.la-ruble-sign:before{content:""}.la-ruler:before{content:""}.la-ruler-combined:before{content:""}.la-ruler-horizontal:before{content:""}.la-ruler-vertical:before{content:""}.la-running:before{content:""}.la-rupee-sign:before{content:""}.la-sad-cry:before{content:""}.la-sad-tear:before{content:""}.la-safari:before{content:""}.la-salesforce:before{content:""}.la-sass:before{content:""}.la-satellite:before{content:""}.la-satellite-dish:before{content:""}.la-save:before{content:""}.la-schlix:before{content:""}.la-school:before{content:""}.la-screwdriver:before{content:""}.la-scribd:before{content:""}.la-scroll:before{content:""}.la-sd-card:before{content:""}.la-search:before{content:""}.la-search-dollar:before{content:""}.la-search-location:before{content:""}.la-search-minus:before{content:""}.la-search-plus:before{content:""}.la-searchengin:before{content:""}.la-seedling:before{content:""}.la-sellcast:before{content:""}.la-sellsy:before{content:""}.la-server:before{content:""}.la-servicestack:before{content:""}.la-shapes:before{content:""}.la-share:before{content:""}.la-share-alt:before{content:""}.la-share-alt-square:before{content:""}.la-share-square:before{content:""}.la-shekel-sign:before{content:""}.la-shield-alt:before{content:""}.la-ship:before{content:""}.la-shipping-fast:before{content:""}.la-shirtsinbulk:before{content:""}.la-shoe-prints:before{content:""}.la-shopping-bag:before{content:""}.la-shopping-basket:before{content:""}.la-shopping-cart:before{content:""}.la-shopware:before{content:""}.la-shower:before{content:""}.la-shuttle-van:before{content:""}.la-sign:before{content:""}.la-sign-in-alt:before{content:""}.la-sign-language:before{content:""}.la-sign-out-alt:before{content:""}.la-signal:before{content:""}.la-signature:before{content:""}.la-sim-card:before{content:""}.la-simplybuilt:before{content:""}.la-sistrix:before{content:""}.la-sitemap:before{content:""}.la-sith:before{content:""}.la-skating:before{content:""}.la-sketch:before{content:""}.la-skiing:before{content:""}.la-skiing-nordic:before{content:""}.la-skull:before{content:""}.la-skull-crossbones:before{content:""}.la-skyatlas:before{content:""}.la-skype:before{content:""}.la-slack:before{content:""}.la-slack-hash:before{content:""}.la-slash:before{content:""}.la-sleigh:before{content:""}.la-sliders-h:before{content:""}.la-slideshare:before{content:""}.la-smile:before{content:""}.la-smile-beam:before{content:""}.la-smile-wink:before{content:""}.la-smog:before{content:""}.la-smoking:before{content:""}.la-smoking-ban:before{content:""}.la-sms:before{content:""}.la-snapchat:before{content:""}.la-snapchat-ghost:before{content:""}.la-snapchat-square:before{content:""}.la-snowboarding:before{content:""}.la-snowflake:before{content:""}.la-snowman:before{content:""}.la-snowplow:before{content:""}.la-socks:before{content:""}.la-solar-panel:before{content:""}.la-sort:before{content:""}.la-sort-alpha-down:before{content:""}.la-sort-alpha-down-alt:before{content:""}.la-sort-alpha-up:before{content:""}.la-sort-alpha-up-alt:before{content:""}.la-sort-amount-down:before{content:""}.la-sort-amount-down-alt:before{content:""}.la-sort-amount-up:before{content:""}.la-sort-amount-up-alt:before{content:""}.la-sort-down:before{content:""}.la-sort-numeric-down:before{content:""}.la-sort-numeric-down-alt:before{content:""}.la-sort-numeric-up:before{content:""}.la-sort-numeric-up-alt:before{content:""}.la-sort-up:before{content:""}.la-soundcloud:before{content:""}.la-sourcetree:before{content:""}.la-spa:before{content:""}.la-space-shuttle:before{content:""}.la-speakap:before{content:""}.la-speaker-deck:before{content:""}.la-spell-check:before{content:""}.la-spider:before{content:""}.la-spinner:before{content:""}.la-splotch:before{content:""}.la-spotify:before{content:""}.la-spray-can:before{content:""}.la-square:before{content:""}.la-square-full:before{content:""}.la-square-root-alt:before{content:""}.la-squarespace:before{content:""}.la-stack-exchange:before{content:""}.la-stack-overflow:before{content:""}.la-stackpath:before{content:""}.la-stamp:before{content:""}.la-star:before{content:""}.la-star-and-crescent:before{content:""}.la-star-half:before{content:""}.la-star-half-alt:before{content:""}.la-star-of-david:before{content:""}.la-star-of-life:before{content:""}.la-staylinked:before{content:""}.la-steam:before{content:""}.la-steam-square:before{content:""}.la-steam-symbol:before{content:""}.la-step-backward:before{content:""}.la-step-forward:before{content:""}.la-stethoscope:before{content:""}.la-sticker-mule:before{content:""}.la-sticky-note:before{content:""}.la-stop:before{content:""}.la-stop-circle:before{content:""}.la-stopwatch:before{content:""}.la-store:before{content:""}.la-store-alt:before{content:""}.la-strava:before{content:""}.la-stream:before{content:""}.la-street-view:before{content:""}.la-strikethrough:before{content:""}.la-stripe:before{content:""}.la-stripe-s:before{content:""}.la-stroopwafel:before{content:""}.la-studiovinari:before{content:""}.la-stumbleupon:before{content:""}.la-stumbleupon-circle:before{content:""}.la-subscript:before{content:""}.la-subway:before{content:""}.la-suitcase:before{content:""}.la-suitcase-rolling:before{content:""}.la-sun:before{content:""}.la-superpowers:before{content:""}.la-superscript:before{content:""}.la-supple:before{content:""}.la-surprise:before{content:""}.la-suse:before{content:""}.la-swatchbook:before{content:""}.la-swift:before{content:""}.la-swimmer:before{content:""}.la-swimming-pool:before{content:""}.la-symfony:before{content:""}.la-synagogue:before{content:""}.la-sync:before{content:""}.la-sync-alt:before{content:""}.la-syringe:before{content:""}.la-table:before{content:""}.la-table-tennis:before{content:""}.la-tablet:before{content:""}.la-tablet-alt:before{content:""}.la-tablets:before{content:""}.la-tachometer-alt:before{content:""}.la-tag:before{content:""}.la-tags:before{content:""}.la-tape:before{content:""}.la-tasks:before{content:""}.la-taxi:before{content:""}.la-teamspeak:before{content:""}.la-teeth:before{content:""}.la-teeth-open:before{content:""}.la-telegram:before{content:""}.la-telegram-plane:before{content:""}.la-temperature-high:before{content:""}.la-temperature-low:before{content:""}.la-tencent-weibo:before{content:""}.la-tenge:before{content:""}.la-terminal:before{content:""}.la-text-height:before{content:""}.la-text-width:before{content:""}.la-th:before{content:""}.la-th-large:before{content:""}.la-th-list:before{content:""}.la-the-red-yeti:before{content:""}.la-theater-masks:before{content:""}.la-themeco:before{content:""}.la-themeisle:before{content:""}.la-thermometer:before{content:""}.la-thermometer-empty:before{content:""}.la-thermometer-full:before{content:""}.la-thermometer-half:before{content:""}.la-thermometer-quarter:before{content:""}.la-thermometer-three-quarters:before{content:""}.la-think-peaks:before{content:""}.la-thumbs-down:before{content:""}.la-thumbs-up:before{content:""}.la-thumbtack:before{content:""}.la-ticket-alt:before{content:""}.la-times:before{content:""}.la-times-circle:before{content:""}.la-tint:before{content:""}.la-tint-slash:before{content:""}.la-tired:before{content:""}.la-toggle-off:before{content:""}.la-toggle-on:before{content:""}.la-toilet:before{content:""}.la-toilet-paper:before{content:""}.la-toolbox:before{content:""}.la-tools:before{content:""}.la-tooth:before{content:""}.la-torah:before{content:""}.la-torii-gate:before{content:""}.la-tractor:before{content:""}.la-trade-federation:before{content:""}.la-trademark:before{content:""}.la-traffic-light:before{content:""}.la-train:before{content:""}.la-tram:before{content:""}.la-transgender:before{content:""}.la-transgender-alt:before{content:""}.la-trash:before{content:""}.la-trash-alt:before{content:""}.la-trash-restore:before{content:""}.la-trash-restore-alt:before{content:""}.la-tree:before{content:""}.la-trello:before{content:""}.la-tripadvisor:before{content:""}.la-trophy:before{content:""}.la-truck:before{content:""}.la-truck-loading:before{content:""}.la-truck-monster:before{content:""}.la-truck-moving:before{content:""}.la-truck-pickup:before{content:""}.la-tshirt:before{content:""}.la-tty:before{content:""}.la-tumblr:before{content:""}.la-tumblr-square:before{content:""}.la-tv:before{content:""}.la-twitch:before{content:""}.la-twitter:before{content:""}.la-twitter-square:before{content:""}.la-typo3:before{content:""}.la-uber:before{content:""}.la-ubuntu:before{content:""}.la-uikit:before{content:""}.la-umbraco:before{content:""}.la-umbrella:before{content:""}.la-umbrella-beach:before{content:""}.la-underline:before{content:""}.la-undo:before{content:""}.la-undo-alt:before{content:""}.la-uniregistry:before{content:""}.la-universal-access:before{content:""}.la-university:before{content:""}.la-unlink:before{content:""}.la-unlock:before{content:""}.la-unlock-alt:before{content:""}.la-untappd:before{content:""}.la-upload:before{content:""}.la-ups:before{content:""}.la-usb:before{content:""}.la-user:before{content:""}.la-user-alt:before{content:""}.la-user-alt-slash:before{content:""}.la-user-astronaut:before{content:""}.la-user-check:before{content:""}.la-user-circle:before{content:""}.la-user-clock:before{content:""}.la-user-cog:before{content:""}.la-user-edit:before{content:""}.la-user-friends:before{content:""}.la-user-graduate:before{content:""}.la-user-injured:before{content:""}.la-user-lock:before{content:""}.la-user-md:before{content:""}.la-user-minus:before{content:""}.la-user-ninja:before{content:""}.la-user-nurse:before{content:""}.la-user-plus:before{content:""}.la-user-secret:before{content:""}.la-user-shield:before{content:""}.la-user-slash:before{content:""}.la-user-tag:before{content:""}.la-user-tie:before{content:""}.la-user-times:before{content:""}.la-users:before{content:""}.la-users-cog:before{content:""}.la-usps:before{content:""}.la-ussunnah:before{content:""}.la-utensil-spoon:before{content:""}.la-utensils:before{content:""}.la-vaadin:before{content:""}.la-vector-square:before{content:""}.la-venus:before{content:""}.la-venus-double:before{content:""}.la-venus-mars:before{content:""}.la-viacoin:before{content:""}.la-viadeo:before{content:""}.la-viadeo-square:before{content:""}.la-vial:before{content:""}.la-vials:before{content:""}.la-viber:before{content:""}.la-video:before{content:""}.la-video-slash:before{content:""}.la-vihara:before{content:""}.la-vimeo:before{content:""}.la-vimeo-square:before{content:""}.la-vimeo-v:before{content:""}.la-vine:before{content:""}.la-vk:before{content:""}.la-vnv:before{content:""}.la-voicemail:before{content:""}.la-volleyball-ball:before{content:""}.la-volume-down:before{content:""}.la-volume-mute:before{content:""}.la-volume-off:before{content:""}.la-volume-up:before{content:""}.la-vote-yea:before{content:""}.la-vr-cardboard:before{content:""}.la-vuejs:before{content:""}.la-walking:before{content:""}.la-wallet:before{content:""}.la-warehouse:before{content:""}.la-water:before{content:""}.la-wave-square:before{content:""}.la-waze:before{content:""}.la-weebly:before{content:""}.la-weibo:before{content:""}.la-weight:before{content:""}.la-weight-hanging:before{content:""}.la-weixin:before{content:""}.la-whatsapp:before{content:""}.la-whatsapp-square:before{content:""}.la-wheelchair:before{content:""}.la-whmcs:before{content:""}.la-wifi:before{content:""}.la-wikipedia-w:before{content:""}.la-wind:before{content:""}.la-window-close:before{content:""}.la-window-maximize:before{content:""}.la-window-minimize:before{content:""}.la-window-restore:before{content:""}.la-windows:before{content:""}.la-wine-bottle:before{content:""}.la-wine-glass:before{content:""}.la-wine-glass-alt:before{content:""}.la-wix:before{content:""}.la-wizards-of-the-coast:before{content:""}.la-wolf-pack-battalion:before{content:""}.la-won-sign:before{content:""}.la-wordpress:before{content:""}.la-wordpress-simple:before{content:""}.la-wpbeginner:before{content:""}.la-wpexplorer:before{content:""}.la-wpforms:before{content:""}.la-wpressr:before{content:""}.la-wrench:before{content:""}.la-x-ray:before{content:""}.la-xbox:before{content:""}.la-xing:before{content:""}.la-xing-square:before{content:""}.la-y-combinator:before{content:""}.la-yahoo:before{content:""}.la-yammer:before{content:""}.la-yandex:before{content:""}.la-yandex-international:before{content:""}.la-yarn:before{content:""}.la-yelp:before{content:""}.la-yen-sign:before{content:""}.la-yin-yang:before{content:""}.la-yoast:before{content:""}.la-youtube:before{content:""}.la-youtube-square:before{content:""}.la-zhihu:before{content:""}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}@font-face{font-family:Line Awesome Brands;font-style:normal;font-weight:400;font-display:auto;src:url(${C(""+new URL("la-brands-400-c0e32387.eot",import.meta.url).href)});src:url(${C(""+new URL("la-brands-400-c0e32387.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${C(""+new URL("la-brands-400-ff70c9bc.woff2",import.meta.url).href)}) format("woff2"),url(${C(""+new URL("la-brands-400-14c63377.woff",import.meta.url).href)}) format("woff"),url(${C(""+new URL("la-brands-400-fbc98702.ttf",import.meta.url).href)}) format("truetype"),url(${C(""+new URL("la-brands-400-4da18191.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.lab{font-family:Line Awesome Brands}@font-face{font-family:Line Awesome Free;font-style:normal;font-weight:400;font-display:auto;src:url(${C(""+new URL("la-regular-400-7dc456f0.eot",import.meta.url).href)});src:url(${C(""+new URL("la-regular-400-7dc456f0.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${C(""+new URL("la-regular-400-51ca2c00.woff2",import.meta.url).href)}) format("woff2"),url(${C(""+new URL("la-regular-400-7711fabc.woff",import.meta.url).href)}) format("woff"),url(${C(""+new URL("la-regular-400-4b6ab8d0.ttf",import.meta.url).href)}) format("truetype"),url(${C(""+new URL("la-regular-400-884ce19c.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.lar{font-family:Line Awesome Free;font-weight:400}@font-face{font-family:Line Awesome Free;font-style:normal;font-weight:900;font-display:auto;src:url(${C(""+new URL("la-solid-900-8a57f8a9.eot",import.meta.url).href)});src:url(${C(""+new URL("la-solid-900-8a57f8a9.eot",import.meta.url).href+"?#iefix")}) format("embedded-opentype"),url(${C(""+new URL("la-solid-900-10a68e01.woff2",import.meta.url).href)}) format("woff2"),url(${C(""+new URL("la-solid-900-a0d21b2a.woff",import.meta.url).href)}) format("woff"),url(${C(""+new URL("la-solid-900-07ce3559.ttf",import.meta.url).href)}) format("truetype"),url(${C(""+new URL("la-solid-900-0ce0cc40.svg",import.meta.url).href+"#lineawesome")}) format("svg")}.la,.las{font-family:Line Awesome Free;font-weight:900}.la.la-glass:before{content:""}.la.la-meetup{font-family:Line Awesome Brands;font-weight:400}.la.la-star-o{font-family:Line Awesome Free;font-weight:400}.la.la-star-o:before{content:""}.la.la-remove:before{content:""}.la.la-close:before{content:""}.la.la-gear:before{content:""}.la.la-trash-o{font-family:Line Awesome Free;font-weight:400}.la.la-trash-o:before{content:""}.la.la-file-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-o:before{content:""}.la.la-clock-o{font-family:Line Awesome Free;font-weight:400}.la.la-clock-o:before{content:""}.la.la-arrow-circle-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-down:before{content:""}.la.la-arrow-circle-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-up:before{content:""}.la.la-play-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-play-circle-o:before{content:""}.la.la-repeat:before{content:""}.la.la-rotate-right:before{content:""}.la.la-refresh:before{content:""}.la.la-list-alt{font-family:Line Awesome Free;font-weight:400}.la.la-dedent:before{content:""}.la.la-video-camera:before{content:""}.la.la-picture-o{font-family:Line Awesome Free;font-weight:400}.la.la-picture-o:before{content:""}.la.la-photo{font-family:Line Awesome Free;font-weight:400}.la.la-photo:before{content:""}.la.la-image{font-family:Line Awesome Free;font-weight:400}.la.la-image:before{content:""}.la.la-pencil:before{content:""}.la.la-map-marker:before{content:""}.la.la-pencil-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-pencil-square-o:before{content:""}.la.la-share-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-share-square-o:before{content:""}.la.la-check-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-check-square-o:before{content:""}.la.la-arrows:before{content:""}.la.la-times-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-times-circle-o:before{content:""}.la.la-check-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-check-circle-o:before{content:""}.la.la-mail-forward:before{content:""}.la.la-eye,.la.la-eye-slash{font-family:Line Awesome Free;font-weight:400}.la.la-warning:before{content:""}.la.la-calendar:before{content:""}.la.la-arrows-v:before{content:""}.la.la-arrows-h:before{content:""}.la.la-bar-chart{font-family:Line Awesome Free;font-weight:400}.la.la-bar-chart:before{content:""}.la.la-bar-chart-o{font-family:Line Awesome Free;font-weight:400}.la.la-bar-chart-o:before{content:""}.la.la-twitter-square,.la.la-facebook-square{font-family:Line Awesome Brands;font-weight:400}.la.la-gears:before{content:""}.la.la-thumbs-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-thumbs-o-up:before{content:""}.la.la-thumbs-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-thumbs-o-down:before{content:""}.la.la-heart-o{font-family:Line Awesome Free;font-weight:400}.la.la-heart-o:before{content:""}.la.la-sign-out:before{content:""}.la.la-linkedin-square{font-family:Line Awesome Brands;font-weight:400}.la.la-linkedin-square:before{content:""}.la.la-thumb-tack:before{content:""}.la.la-external-link:before{content:""}.la.la-sign-in:before{content:""}.la.la-github-square{font-family:Line Awesome Brands;font-weight:400}.la.la-lemon-o{font-family:Line Awesome Free;font-weight:400}.la.la-lemon-o:before{content:""}.la.la-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-square-o:before{content:""}.la.la-bookmark-o{font-family:Line Awesome Free;font-weight:400}.la.la-bookmark-o:before{content:""}.la.la-twitter,.la.la-facebook{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook:before{content:""}.la.la-facebook-f{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook-f:before{content:""}.la.la-github{font-family:Line Awesome Brands;font-weight:400}.la.la-credit-card{font-family:Line Awesome Free;font-weight:400}.la.la-feed:before{content:""}.la.la-hdd-o{font-family:Line Awesome Free;font-weight:400}.la.la-hdd-o:before{content:""}.la.la-hand-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-right:before{content:""}.la.la-hand-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-left:before{content:""}.la.la-hand-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-up:before{content:""}.la.la-hand-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-hand-o-down:before{content:""}.la.la-arrows-alt:before{content:""}.la.la-group:before{content:""}.la.la-chain:before{content:""}.la.la-scissors:before{content:""}.la.la-files-o{font-family:Line Awesome Free;font-weight:400}.la.la-files-o:before{content:""}.la.la-floppy-o{font-family:Line Awesome Free;font-weight:400}.la.la-floppy-o:before{content:""}.la.la-navicon:before{content:""}.la.la-reorder:before{content:""}.la.la-pinterest,.la.la-pinterest-square,.la.la-google-plus-square,.la.la-google-plus{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus:before{content:""}.la.la-money{font-family:Line Awesome Free;font-weight:400}.la.la-money:before{content:""}.la.la-unsorted:before{content:""}.la.la-sort-desc:before{content:""}.la.la-sort-asc:before{content:""}.la.la-linkedin{font-family:Line Awesome Brands;font-weight:400}.la.la-linkedin:before{content:""}.la.la-rotate-left:before{content:""}.la.la-legal:before{content:""}.la.la-tachometer:before{content:""}.la.la-dashboard:before{content:""}.la.la-comment-o{font-family:Line Awesome Free;font-weight:400}.la.la-comment-o:before{content:""}.la.la-comments-o{font-family:Line Awesome Free;font-weight:400}.la.la-comments-o:before{content:""}.la.la-flash:before{content:""}.la.la-clipboard,.la.la-paste{font-family:Line Awesome Free;font-weight:400}.la.la-paste:before{content:""}.la.la-lightbulb-o{font-family:Line Awesome Free;font-weight:400}.la.la-lightbulb-o:before{content:""}.la.la-exchange:before{content:""}.la.la-cloud-download:before{content:""}.la.la-cloud-upload:before{content:""}.la.la-bell-o{font-family:Line Awesome Free;font-weight:400}.la.la-bell-o:before{content:""}.la.la-cutlery:before{content:""}.la.la-file-text-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-text-o:before{content:""}.la.la-building-o{font-family:Line Awesome Free;font-weight:400}.la.la-building-o:before{content:""}.la.la-hospital-o{font-family:Line Awesome Free;font-weight:400}.la.la-hospital-o:before{content:""}.la.la-tablet:before{content:""}.la.la-mobile:before{content:""}.la.la-mobile-phone:before{content:""}.la.la-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-circle-o:before{content:""}.la.la-mail-reply:before{content:""}.la.la-github-alt{font-family:Line Awesome Brands;font-weight:400}.la.la-folder-o{font-family:Line Awesome Free;font-weight:400}.la.la-folder-o:before{content:""}.la.la-folder-open-o{font-family:Line Awesome Free;font-weight:400}.la.la-folder-open-o:before{content:""}.la.la-smile-o{font-family:Line Awesome Free;font-weight:400}.la.la-smile-o:before{content:""}.la.la-frown-o{font-family:Line Awesome Free;font-weight:400}.la.la-frown-o:before{content:""}.la.la-meh-o{font-family:Line Awesome Free;font-weight:400}.la.la-meh-o:before{content:""}.la.la-keyboard-o{font-family:Line Awesome Free;font-weight:400}.la.la-keyboard-o:before{content:""}.la.la-flag-o{font-family:Line Awesome Free;font-weight:400}.la.la-flag-o:before{content:""}.la.la-mail-reply-all:before{content:""}.la.la-star-half-o{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-o:before{content:""}.la.la-star-half-empty{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-empty:before{content:""}.la.la-star-half-full{font-family:Line Awesome Free;font-weight:400}.la.la-star-half-full:before{content:""}.la.la-code-fork:before{content:""}.la.la-chain-broken:before{content:""}.la.la-shield:before{content:""}.la.la-calendar-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-o:before{content:""}.la.la-maxcdn,.la.la-html5,.la.la-css3{font-family:Line Awesome Brands;font-weight:400}.la.la-ticket:before{content:""}.la.la-minus-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-minus-square-o:before{content:""}.la.la-level-up:before{content:""}.la.la-level-down:before{content:""}.la.la-pencil-square:before{content:""}.la.la-external-link-square:before{content:""}.la.la-compass,.la.la-caret-square-o-down{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-down:before{content:""}.la.la-toggle-down{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-down:before{content:""}.la.la-caret-square-o-up{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-up:before{content:""}.la.la-toggle-up{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-up:before{content:""}.la.la-caret-square-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-right:before{content:""}.la.la-toggle-right{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-right:before{content:""}.la.la-eur:before{content:""}.la.la-euro:before{content:""}.la.la-gbp:before{content:""}.la.la-usd:before{content:""}.la.la-dollar:before{content:""}.la.la-inr:before{content:""}.la.la-rupee:before{content:""}.la.la-jpy:before{content:""}.la.la-cny:before{content:""}.la.la-rmb:before{content:""}.la.la-yen:before{content:""}.la.la-rub:before{content:""}.la.la-ruble:before{content:""}.la.la-rouble:before{content:""}.la.la-krw:before{content:""}.la.la-won:before{content:""}.la.la-btc,.la.la-bitcoin{font-family:Line Awesome Brands;font-weight:400}.la.la-bitcoin:before{content:""}.la.la-file-text:before{content:""}.la.la-sort-alpha-asc:before{content:""}.la.la-sort-alpha-desc:before{content:""}.la.la-sort-amount-asc:before{content:""}.la.la-sort-amount-desc:before{content:""}.la.la-sort-numeric-asc:before{content:""}.la.la-sort-numeric-desc:before{content:""}.la.la-youtube-square,.la.la-youtube,.la.la-xing,.la.la-xing-square,.la.la-youtube-play{font-family:Line Awesome Brands;font-weight:400}.la.la-youtube-play:before{content:""}.la.la-dropbox,.la.la-stack-overflow,.la.la-instagram,.la.la-flickr,.la.la-adn,.la.la-bitbucket,.la.la-bitbucket-square{font-family:Line Awesome Brands;font-weight:400}.la.la-bitbucket-square:before{content:""}.la.la-tumblr,.la.la-tumblr-square{font-family:Line Awesome Brands;font-weight:400}.la.la-long-arrow-down:before{content:""}.la.la-long-arrow-up:before{content:""}.la.la-long-arrow-left:before{content:""}.la.la-long-arrow-right:before{content:""}.la.la-apple,.la.la-windows,.la.la-android,.la.la-linux,.la.la-dribbble,.la.la-skype,.la.la-foursquare,.la.la-trello,.la.la-gratipay,.la.la-gittip{font-family:Line Awesome Brands;font-weight:400}.la.la-gittip:before{content:""}.la.la-sun-o{font-family:Line Awesome Free;font-weight:400}.la.la-sun-o:before{content:""}.la.la-moon-o{font-family:Line Awesome Free;font-weight:400}.la.la-moon-o:before{content:""}.la.la-vk,.la.la-weibo,.la.la-renren,.la.la-pagelines,.la.la-stack-exchange{font-family:Line Awesome Brands;font-weight:400}.la.la-arrow-circle-o-right{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-right:before{content:""}.la.la-arrow-circle-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-arrow-circle-o-left:before{content:""}.la.la-caret-square-o-left{font-family:Line Awesome Free;font-weight:400}.la.la-caret-square-o-left:before{content:""}.la.la-toggle-left{font-family:Line Awesome Free;font-weight:400}.la.la-toggle-left:before{content:""}.la.la-dot-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-dot-circle-o:before{content:""}.la.la-vimeo-square{font-family:Line Awesome Brands;font-weight:400}.la.la-try:before{content:""}.la.la-turkish-lira:before{content:""}.la.la-plus-square-o{font-family:Line Awesome Free;font-weight:400}.la.la-plus-square-o:before{content:""}.la.la-slack,.la.la-wordpress,.la.la-openid{font-family:Line Awesome Brands;font-weight:400}.la.la-institution:before{content:""}.la.la-bank:before{content:""}.la.la-mortar-board:before{content:""}.la.la-yahoo,.la.la-google,.la.la-reddit,.la.la-reddit-square,.la.la-stumbleupon-circle,.la.la-stumbleupon,.la.la-delicious,.la.la-digg,.la.la-pied-piper-pp,.la.la-pied-piper-alt,.la.la-drupal,.la.la-joomla{font-family:Line Awesome Brands;font-weight:400}.la.la-spoon:before{content:""}.la.la-behance,.la.la-behance-square,.la.la-steam,.la.la-steam-square{font-family:Line Awesome Brands;font-weight:400}.la.la-automobile:before{content:""}.la.la-cab:before{content:""}.la.la-envelope-o{font-family:Line Awesome Free;font-weight:400}.la.la-envelope-o:before{content:""}.la.la-deviantart,.la.la-soundcloud{font-family:Line Awesome Brands;font-weight:400}.la.la-file-pdf-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-pdf-o:before{content:""}.la.la-file-word-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-word-o:before{content:""}.la.la-file-excel-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-excel-o:before{content:""}.la.la-file-powerpoint-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-powerpoint-o:before{content:""}.la.la-file-image-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-image-o:before{content:""}.la.la-file-photo-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-photo-o:before{content:""}.la.la-file-picture-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-picture-o:before{content:""}.la.la-file-archive-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-archive-o:before{content:""}.la.la-file-zip-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-zip-o:before{content:""}.la.la-file-audio-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-audio-o:before{content:""}.la.la-file-sound-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-sound-o:before{content:""}.la.la-file-video-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-video-o:before{content:""}.la.la-file-movie-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-movie-o:before{content:""}.la.la-file-code-o{font-family:Line Awesome Free;font-weight:400}.la.la-file-code-o:before{content:""}.la.la-vine,.la.la-codepen,.la.la-jsfiddle{font-family:Line Awesome Brands;font-weight:400}.la.la-life-ring,.la.la-life-bouy{font-family:Line Awesome Free;font-weight:400}.la.la-life-bouy:before{content:""}.la.la-life-buoy{font-family:Line Awesome Free;font-weight:400}.la.la-life-buoy:before{content:""}.la.la-life-saver{font-family:Line Awesome Free;font-weight:400}.la.la-life-saver:before{content:""}.la.la-support{font-family:Line Awesome Free;font-weight:400}.la.la-support:before{content:""}.la.la-circle-o-notch:before{content:""}.la.la-rebel,.la.la-ra{font-family:Line Awesome Brands;font-weight:400}.la.la-ra:before{content:""}.la.la-resistance{font-family:Line Awesome Brands;font-weight:400}.la.la-resistance:before{content:""}.la.la-empire,.la.la-ge{font-family:Line Awesome Brands;font-weight:400}.la.la-ge:before{content:""}.la.la-git-square,.la.la-git,.la.la-hacker-news,.la.la-y-combinator-square{font-family:Line Awesome Brands;font-weight:400}.la.la-y-combinator-square:before{content:""}.la.la-yc-square{font-family:Line Awesome Brands;font-weight:400}.la.la-yc-square:before{content:""}.la.la-tencent-weibo,.la.la-qq,.la.la-weixin,.la.la-wechat{font-family:Line Awesome Brands;font-weight:400}.la.la-wechat:before{content:""}.la.la-send:before{content:""}.la.la-paper-plane-o{font-family:Line Awesome Free;font-weight:400}.la.la-paper-plane-o:before{content:""}.la.la-send-o{font-family:Line Awesome Free;font-weight:400}.la.la-send-o:before{content:""}.la.la-circle-thin{font-family:Line Awesome Free;font-weight:400}.la.la-circle-thin:before{content:""}.la.la-header:before{content:""}.la.la-sliders:before{content:""}.la.la-futbol-o{font-family:Line Awesome Free;font-weight:400}.la.la-futbol-o:before{content:""}.la.la-soccer-ball-o{font-family:Line Awesome Free;font-weight:400}.la.la-soccer-ball-o:before{content:""}.la.la-slideshare,.la.la-twitch,.la.la-yelp{font-family:Line Awesome Brands;font-weight:400}.la.la-newspaper-o{font-family:Line Awesome Free;font-weight:400}.la.la-newspaper-o:before{content:""}.la.la-paypal,.la.la-google-wallet,.la.la-cc-visa,.la.la-cc-mastercard,.la.la-cc-discover,.la.la-cc-amex,.la.la-cc-paypal,.la.la-cc-stripe{font-family:Line Awesome Brands;font-weight:400}.la.la-bell-slash-o{font-family:Line Awesome Free;font-weight:400}.la.la-bell-slash-o:before{content:""}.la.la-trash:before{content:""}.la.la-copyright{font-family:Line Awesome Free;font-weight:400}.la.la-eyedropper:before{content:""}.la.la-area-chart:before{content:""}.la.la-pie-chart:before{content:""}.la.la-line-chart:before{content:""}.la.la-lastfm,.la.la-lastfm-square,.la.la-ioxhost,.la.la-angellist{font-family:Line Awesome Brands;font-weight:400}.la.la-cc{font-family:Line Awesome Free;font-weight:400}.la.la-cc:before{content:""}.la.la-ils:before{content:""}.la.la-shekel:before{content:""}.la.la-sheqel:before{content:""}.la.la-meanpath{font-family:Line Awesome Brands;font-weight:400}.la.la-meanpath:before{content:""}.la.la-buysellads,.la.la-connectdevelop,.la.la-dashcube,.la.la-forumbee,.la.la-leanpub,.la.la-sellsy,.la.la-shirtsinbulk,.la.la-simplybuilt,.la.la-skyatlas{font-family:Line Awesome Brands;font-weight:400}.la.la-diamond{font-family:Line Awesome Free;font-weight:400}.la.la-diamond:before{content:""}.la.la-intersex:before{content:""}.la.la-facebook-official{font-family:Line Awesome Brands;font-weight:400}.la.la-facebook-official:before{content:""}.la.la-pinterest-p,.la.la-whatsapp{font-family:Line Awesome Brands;font-weight:400}.la.la-hotel:before{content:""}.la.la-viacoin,.la.la-medium,.la.la-y-combinator,.la.la-yc{font-family:Line Awesome Brands;font-weight:400}.la.la-yc:before{content:""}.la.la-optin-monster,.la.la-opencart,.la.la-expeditedssl{font-family:Line Awesome Brands;font-weight:400}.la.la-battery-4:before{content:""}.la.la-battery:before{content:""}.la.la-battery-3:before{content:""}.la.la-battery-2:before{content:""}.la.la-battery-1:before{content:""}.la.la-battery-0:before{content:""}.la.la-object-group,.la.la-object-ungroup,.la.la-sticky-note-o{font-family:Line Awesome Free;font-weight:400}.la.la-sticky-note-o:before{content:""}.la.la-cc-jcb,.la.la-cc-diners-club{font-family:Line Awesome Brands;font-weight:400}.la.la-clone,.la.la-hourglass-o{font-family:Line Awesome Free;font-weight:400}.la.la-hourglass-o:before{content:""}.la.la-hourglass-1:before{content:""}.la.la-hourglass-2:before{content:""}.la.la-hourglass-3:before{content:""}.la.la-hand-rock-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-rock-o:before{content:""}.la.la-hand-grab-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-grab-o:before{content:""}.la.la-hand-paper-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-paper-o:before{content:""}.la.la-hand-stop-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-stop-o:before{content:""}.la.la-hand-scissors-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-scissors-o:before{content:""}.la.la-hand-lizard-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-lizard-o:before{content:""}.la.la-hand-spock-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-spock-o:before{content:""}.la.la-hand-pointer-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-pointer-o:before{content:""}.la.la-hand-peace-o{font-family:Line Awesome Free;font-weight:400}.la.la-hand-peace-o:before{content:""}.la.la-registered{font-family:Line Awesome Free;font-weight:400}.la.la-creative-commons,.la.la-gg,.la.la-gg-circle,.la.la-tripadvisor,.la.la-odnoklassniki,.la.la-odnoklassniki-square,.la.la-get-pocket,.la.la-wikipedia-w,.la.la-safari,.la.la-chrome,.la.la-firefox,.la.la-opera,.la.la-internet-explorer{font-family:Line Awesome Brands;font-weight:400}.la.la-television:before{content:""}.la.la-contao,.la.la-500px,.la.la-amazon{font-family:Line Awesome Brands;font-weight:400}.la.la-calendar-plus-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-plus-o:before{content:""}.la.la-calendar-minus-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-minus-o:before{content:""}.la.la-calendar-times-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-times-o:before{content:""}.la.la-calendar-check-o{font-family:Line Awesome Free;font-weight:400}.la.la-calendar-check-o:before{content:""}.la.la-map-o{font-family:Line Awesome Free;font-weight:400}.la.la-map-o:before{content:""}.la.la-commenting:before{content:""}.la.la-commenting-o{font-family:Line Awesome Free;font-weight:400}.la.la-commenting-o:before{content:""}.la.la-houzz,.la.la-vimeo{font-family:Line Awesome Brands;font-weight:400}.la.la-vimeo:before{content:""}.la.la-black-tie,.la.la-fonticons,.la.la-reddit-alien,.la.la-edge{font-family:Line Awesome Brands;font-weight:400}.la.la-credit-card-alt:before{content:""}.la.la-codiepie,.la.la-modx,.la.la-fort-awesome,.la.la-usb,.la.la-product-hunt,.la.la-mixcloud,.la.la-scribd{font-family:Line Awesome Brands;font-weight:400}.la.la-pause-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-pause-circle-o:before{content:""}.la.la-stop-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-stop-circle-o:before{content:""}.la.la-bluetooth,.la.la-bluetooth-b,.la.la-gitlab,.la.la-wpbeginner,.la.la-wpforms,.la.la-envira,.la.la-wheelchair-alt{font-family:Line Awesome Brands;font-weight:400}.la.la-wheelchair-alt:before{content:""}.la.la-question-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-question-circle-o:before{content:""}.la.la-volume-control-phone:before{content:""}.la.la-asl-interpreting:before{content:""}.la.la-deafness:before{content:""}.la.la-hard-of-hearing:before{content:""}.la.la-glide,.la.la-glide-g{font-family:Line Awesome Brands;font-weight:400}.la.la-signing:before{content:""}.la.la-viadeo,.la.la-viadeo-square,.la.la-snapchat,.la.la-snapchat-ghost,.la.la-snapchat-square,.la.la-pied-piper,.la.la-first-order,.la.la-yoast,.la.la-themeisle,.la.la-google-plus-official{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus-official:before{content:""}.la.la-google-plus-circle{font-family:Line Awesome Brands;font-weight:400}.la.la-google-plus-circle:before{content:""}.la.la-font-awesome,.la.la-fa{font-family:Line Awesome Brands;font-weight:400}.la.la-fa:before{content:""}.la.la-handshake-o{font-family:Line Awesome Free;font-weight:400}.la.la-handshake-o:before{content:""}.la.la-envelope-open-o{font-family:Line Awesome Free;font-weight:400}.la.la-envelope-open-o:before{content:""}.la.la-linode{font-family:Line Awesome Brands;font-weight:400}.la.la-address-book-o{font-family:Line Awesome Free;font-weight:400}.la.la-address-book-o:before{content:""}.la.la-vcard:before{content:""}.la.la-address-card-o{font-family:Line Awesome Free;font-weight:400}.la.la-address-card-o:before{content:""}.la.la-vcard-o{font-family:Line Awesome Free;font-weight:400}.la.la-vcard-o:before{content:""}.la.la-user-circle-o{font-family:Line Awesome Free;font-weight:400}.la.la-user-circle-o:before{content:""}.la.la-user-o{font-family:Line Awesome Free;font-weight:400}.la.la-user-o:before{content:""}.la.la-id-badge{font-family:Line Awesome Free;font-weight:400}.la.la-drivers-license:before{content:""}.la.la-id-card-o{font-family:Line Awesome Free;font-weight:400}.la.la-id-card-o:before{content:""}.la.la-drivers-license-o{font-family:Line Awesome Free;font-weight:400}.la.la-drivers-license-o:before{content:""}.la.la-quora,.la.la-free-code-camp,.la.la-telegram{font-family:Line Awesome Brands;font-weight:400}.la.la-thermometer-4:before{content:""}.la.la-thermometer:before{content:""}.la.la-thermometer-3:before{content:""}.la.la-thermometer-2:before{content:""}.la.la-thermometer-1:before{content:""}.la.la-thermometer-0:before{content:""}.la.la-bathtub:before{content:""}.la.la-s15:before{content:""}.la.la-window-maximize,.la.la-window-restore{font-family:Line Awesome Free;font-weight:400}.la.la-times-rectangle:before{content:""}.la.la-window-close-o{font-family:Line Awesome Free;font-weight:400}.la.la-window-close-o:before{content:""}.la.la-times-rectangle-o{font-family:Line Awesome Free;font-weight:400}.la.la-times-rectangle-o:before{content:""}.la.la-bandcamp,.la.la-grav,.la.la-etsy,.la.la-imdb,.la.la-ravelry,.la.la-eercast{font-family:Line Awesome Brands;font-weight:400}.la.la-eercast:before{content:""}.la.la-snowflake-o{font-family:Line Awesome Free;font-weight:400}.la.la-snowflake-o:before{content:""}.la.la-superpowers,.la.la-wpexplorer,.la.la-spotify{font-family:Line Awesome Brands;font-weight:400}
`,ks=w`/*!
 * Materialize v1.0.0-rc.2 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */.materialize-red{background-color:#e51c23!important}.materialize-red-text{color:#e51c23!important}.materialize-red.lighten-5{background-color:#fdeaeb!important}.materialize-red-text.text-lighten-5{color:#fdeaeb!important}.materialize-red.lighten-4{background-color:#f8c1c3!important}.materialize-red-text.text-lighten-4{color:#f8c1c3!important}.materialize-red.lighten-3{background-color:#f3989b!important}.materialize-red-text.text-lighten-3{color:#f3989b!important}.materialize-red.lighten-2{background-color:#ee6e73!important}.materialize-red-text.text-lighten-2{color:#ee6e73!important}.materialize-red.lighten-1{background-color:#ea454b!important}.materialize-red-text.text-lighten-1{color:#ea454b!important}.materialize-red.darken-1{background-color:#d0181e!important}.materialize-red-text.text-darken-1{color:#d0181e!important}.materialize-red.darken-2{background-color:#b9151b!important}.materialize-red-text.text-darken-2{color:#b9151b!important}.materialize-red.darken-3{background-color:#a21318!important}.materialize-red-text.text-darken-3{color:#a21318!important}.materialize-red.darken-4{background-color:#8b1014!important}.materialize-red-text.text-darken-4{color:#8b1014!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.red.lighten-5{background-color:#ffebee!important}.red-text.text-lighten-5{color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red-text.text-lighten-4{color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red-text.text-lighten-3{color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red-text.text-lighten-2{color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red-text.text-lighten-1{color:#ef5350!important}.red.darken-1{background-color:#e53935!important}.red-text.text-darken-1{color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red-text.text-darken-2{color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red-text.text-darken-3{color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red-text.text-darken-4{color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red-text.text-accent-1{color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red-text.text-accent-2{color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red-text.text-accent-3{color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.red-text.text-accent-4{color:#d50000!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.pink.lighten-5{background-color:#fce4ec!important}.pink-text.text-lighten-5{color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink-text.text-lighten-4{color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink-text.text-lighten-3{color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink-text.text-lighten-2{color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink-text.text-lighten-1{color:#ec407a!important}.pink.darken-1{background-color:#d81b60!important}.pink-text.text-darken-1{color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink-text.text-darken-2{color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink-text.text-darken-3{color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink-text.text-darken-4{color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink-text.text-accent-1{color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink-text.text-accent-2{color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink-text.text-accent-3{color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.pink-text.text-accent-4{color:#c51162!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple-text.text-lighten-5{color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple-text.text-lighten-4{color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple-text.text-lighten-3{color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple-text.text-lighten-2{color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple-text.text-lighten-1{color:#ab47bc!important}.purple.darken-1{background-color:#8e24aa!important}.purple-text.text-darken-1{color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple-text.text-darken-2{color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple-text.text-darken-3{color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple-text.text-darken-4{color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple-text.text-accent-1{color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple-text.text-accent-2{color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple-text.text-accent-3{color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.purple-text.text-accent-4{color:#a0f!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple-text.text-lighten-5{color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple-text.text-lighten-4{color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple-text.text-lighten-3{color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple-text.text-lighten-2{color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple-text.text-lighten-1{color:#7e57c2!important}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple-text.text-darken-1{color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple-text.text-darken-2{color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple-text.text-darken-3{color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple-text.text-darken-4{color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple-text.text-accent-1{color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple-text.text-accent-2{color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple-text.text-accent-3{color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.deep-purple-text.text-accent-4{color:#6200ea!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo-text.text-lighten-5{color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo-text.text-lighten-4{color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo-text.text-lighten-3{color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo-text.text-lighten-2{color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo-text.text-lighten-1{color:#5c6bc0!important}.indigo.darken-1{background-color:#3949ab!important}.indigo-text.text-darken-1{color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo-text.text-darken-2{color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo-text.text-darken-3{color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo-text.text-darken-4{color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo-text.text-accent-1{color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo-text.text-accent-2{color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo-text.text-accent-3{color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.indigo-text.text-accent-4{color:#304ffe!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue-text.text-lighten-5{color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue-text.text-lighten-4{color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue-text.text-lighten-3{color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue-text.text-lighten-2{color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue-text.text-lighten-1{color:#42a5f5!important}.blue.darken-1{background-color:#1e88e5!important}.blue-text.text-darken-1{color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue-text.text-darken-2{color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue-text.text-darken-3{color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue-text.text-darken-4{color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue-text.text-accent-1{color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue-text.text-accent-2{color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue-text.text-accent-3{color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.blue-text.text-accent-4{color:#2962ff!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue-text.text-lighten-5{color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue-text.text-lighten-4{color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue-text.text-lighten-3{color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue-text.text-lighten-2{color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue-text.text-lighten-1{color:#29b6f6!important}.light-blue.darken-1{background-color:#039be5!important}.light-blue-text.text-darken-1{color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue-text.text-darken-2{color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue-text.text-darken-3{color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue-text.text-darken-4{color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue-text.text-accent-1{color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue-text.text-accent-2{color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue-text.text-accent-3{color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.light-blue-text.text-accent-4{color:#0091ea!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan-text.text-lighten-5{color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan-text.text-lighten-4{color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan-text.text-lighten-3{color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan-text.text-lighten-2{color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan-text.text-lighten-1{color:#26c6da!important}.cyan.darken-1{background-color:#00acc1!important}.cyan-text.text-darken-1{color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan-text.text-darken-2{color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan-text.text-darken-3{color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan-text.text-darken-4{color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan-text.text-accent-1{color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan-text.text-accent-2{color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan-text.text-accent-3{color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.cyan-text.text-accent-4{color:#00b8d4!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal-text.text-lighten-5{color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal-text.text-lighten-4{color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal-text.text-lighten-3{color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal-text.text-lighten-2{color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal-text.text-lighten-1{color:#26a69a!important}.teal.darken-1{background-color:#00897b!important}.teal-text.text-darken-1{color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal-text.text-darken-2{color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal-text.text-darken-3{color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal-text.text-darken-4{color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal-text.text-accent-1{color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal-text.text-accent-2{color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal-text.text-accent-3{color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.teal-text.text-accent-4{color:#00bfa5!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.green.lighten-5{background-color:#e8f5e9!important}.green-text.text-lighten-5{color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green-text.text-lighten-4{color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green-text.text-lighten-3{color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green-text.text-lighten-2{color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green-text.text-lighten-1{color:#66bb6a!important}.green.darken-1{background-color:#43a047!important}.green-text.text-darken-1{color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green-text.text-darken-2{color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green-text.text-darken-3{color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green-text.text-darken-4{color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green-text.text-accent-1{color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green-text.text-accent-2{color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green-text.text-accent-3{color:#00e676!important}.green.accent-4{background-color:#00c853!important}.green-text.text-accent-4{color:#00c853!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green-text.text-lighten-5{color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green-text.text-lighten-4{color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green-text.text-lighten-3{color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green-text.text-lighten-2{color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green-text.text-lighten-1{color:#9ccc65!important}.light-green.darken-1{background-color:#7cb342!important}.light-green-text.text-darken-1{color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green-text.text-darken-2{color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green-text.text-darken-3{color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green-text.text-darken-4{color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green-text.text-accent-1{color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green-text.text-accent-2{color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green-text.text-accent-3{color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.light-green-text.text-accent-4{color:#64dd17!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime-text.text-lighten-5{color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime-text.text-lighten-4{color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime-text.text-lighten-3{color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime-text.text-lighten-2{color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime-text.text-lighten-1{color:#d4e157!important}.lime.darken-1{background-color:#c0ca33!important}.lime-text.text-darken-1{color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime-text.text-darken-2{color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime-text.text-darken-3{color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime-text.text-darken-4{color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime-text.text-accent-1{color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime-text.text-accent-2{color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime-text.text-accent-3{color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.lime-text.text-accent-4{color:#aeea00!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow-text.text-lighten-5{color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow-text.text-lighten-4{color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow-text.text-lighten-3{color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow-text.text-lighten-2{color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow-text.text-lighten-1{color:#ffee58!important}.yellow.darken-1{background-color:#fdd835!important}.yellow-text.text-darken-1{color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow-text.text-darken-2{color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow-text.text-darken-3{color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow-text.text-darken-4{color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow-text.text-accent-1{color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow-text.text-accent-2{color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow-text.text-accent-3{color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.yellow-text.text-accent-4{color:#ffd600!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.amber.lighten-5{background-color:#fff8e1!important}.amber-text.text-lighten-5{color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber-text.text-lighten-4{color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber-text.text-lighten-3{color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber-text.text-lighten-2{color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber-text.text-lighten-1{color:#ffca28!important}.amber.darken-1{background-color:#ffb300!important}.amber-text.text-darken-1{color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber-text.text-darken-2{color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber-text.text-darken-3{color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber-text.text-darken-4{color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber-text.text-accent-1{color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber-text.text-accent-2{color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber-text.text-accent-3{color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.amber-text.text-accent-4{color:#ffab00!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.orange.lighten-5{background-color:#fff3e0!important}.orange-text.text-lighten-5{color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange-text.text-lighten-4{color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange-text.text-lighten-3{color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange-text.text-lighten-2{color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange-text.text-lighten-1{color:#ffa726!important}.orange.darken-1{background-color:#fb8c00!important}.orange-text.text-darken-1{color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange-text.text-darken-2{color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange-text.text-darken-3{color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange-text.text-darken-4{color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange-text.text-accent-1{color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange-text.text-accent-2{color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange-text.text-accent-3{color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.orange-text.text-accent-4{color:#ff6d00!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange-text.text-lighten-5{color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange-text.text-lighten-4{color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange-text.text-lighten-3{color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange-text.text-lighten-2{color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange-text.text-lighten-1{color:#ff7043!important}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange-text.text-darken-1{color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange-text.text-darken-2{color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange-text.text-darken-3{color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange-text.text-darken-4{color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange-text.text-accent-1{color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange-text.text-accent-2{color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange-text.text-accent-3{color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.deep-orange-text.text-accent-4{color:#dd2c00!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.brown.lighten-5{background-color:#efebe9!important}.brown-text.text-lighten-5{color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown-text.text-lighten-4{color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown-text.text-lighten-3{color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown-text.text-lighten-2{color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown-text.text-lighten-1{color:#8d6e63!important}.brown.darken-1{background-color:#6d4c41!important}.brown-text.text-darken-1{color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown-text.text-darken-2{color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown-text.text-darken-3{color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.brown-text.text-darken-4{color:#3e2723!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey-text.text-lighten-5{color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey-text.text-lighten-4{color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey-text.text-lighten-3{color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey-text.text-lighten-2{color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey-text.text-lighten-1{color:#78909c!important}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey-text.text-darken-1{color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey-text.text-darken-2{color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey-text.text-darken-3{color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.blue-grey-text.text-darken-4{color:#263238!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.grey.lighten-5{background-color:#fafafa!important}.grey-text.text-lighten-5{color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey-text.text-lighten-4{color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey-text.text-lighten-3{color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey-text.text-lighten-2{color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey-text.text-lighten-1{color:#bdbdbd!important}.grey.darken-1{background-color:#757575!important}.grey-text.text-darken-1{color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey-text.text-darken-2{color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey-text.text-darken-3{color:#424242!important}.grey.darken-4{background-color:#212121!important}.grey-text.text-darken-4{color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.white{background-color:#fff!important}.white-text{color:#fff!important}.transparent{background-color:#0000!important}.transparent-text{color:#0000!important}/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;-moz-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}button,input,optgroup,select,textarea{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}ul:not(.browser-default){padding-left:0;list-style-type:none}ul:not(.browser-default)>li{list-style-type:none}a{color:#039be5;text-decoration:none;-webkit-tap-highlight-color:transparent}.valign-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.clearfix{clear:both}.z-depth-0{-webkit-box-shadow:none!important;box-shadow:none!important}.z-depth-1,nav,.card-panel,.card,.toast,.btn,.btn-large,.btn-small,.btn-floating,.dropdown-content,.collapsible,.sidenav{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px #00000024,0 3px 1px -2px #0000001f,0 1px 5px #0003}.z-depth-1-half,.btn:hover,.btn-large:hover,.btn-small:hover,.btn-floating:hover{-webkit-box-shadow:0 3px 3px 0 rgba(0,0,0,.14),0 1px 7px 0 rgba(0,0,0,.12),0 3px 1px -1px rgba(0,0,0,.2);box-shadow:0 3px 3px #00000024,0 1px 7px #0000001f,0 3px 1px -1px #0003}.z-depth-2{-webkit-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.3);box-shadow:0 4px 5px #00000024,0 1px 10px #0000001f,0 2px 4px -1px #0000004d}.z-depth-3{-webkit-box-shadow:0 8px 17px 2px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2);box-shadow:0 8px 17px 2px #00000024,0 3px 14px 2px #0000001f,0 5px 5px -3px #0003}.z-depth-4{-webkit-box-shadow:0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -7px rgba(0,0,0,.2);box-shadow:0 16px 24px 2px #00000024,0 6px 30px 5px #0000001f,0 8px 10px -7px #0003}.z-depth-5,.modal{-webkit-box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2);box-shadow:0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f,0 11px 15px -7px #0003}.hoverable{-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s}.hoverable:hover{-webkit-box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 8px 17px #0003,0 6px 20px #00000030}.divider{height:1px;overflow:hidden;background-color:#e0e0e0}blockquote{margin:20px 0;padding-left:1.5rem;border-left:5px solid #ee6e73}i{line-height:inherit}i.left{float:left;margin-right:15px}i.right{float:right;margin-left:15px}i.tiny{font-size:1rem}i.small{font-size:2rem}i.medium{font-size:4rem}i.large{font-size:6rem}img.responsive-img,video.responsive-video{max-width:100%;height:auto}.pagination li{display:inline-block;border-radius:2px;text-align:center;vertical-align:top;height:30px}.pagination li a{color:#444;display:inline-block;font-size:1.2rem;padding:0 10px;line-height:30px}.pagination li.active a{color:#fff}.pagination li.active{background-color:#ee6e73}.pagination li.disabled a{cursor:default;color:#999}.pagination li i{font-size:2rem}.pagination li.pages ul li{display:inline-block;float:none}@media only screen and (max-width: 992px){.pagination{width:100%}.pagination li.prev,.pagination li.next{width:10%}.pagination li.pages{width:80%;overflow:hidden;white-space:nowrap}}.breadcrumb{font-size:18px;color:#ffffffb3}.breadcrumb i,.breadcrumb [class^=mdi-],.breadcrumb [class*=mdi-],.breadcrumb i.material-icons{display:inline-block;float:left;font-size:24px}.breadcrumb:before{content:"";color:#ffffffb3;vertical-align:top;display:inline-block;font-family:Material Icons;font-weight:400;font-style:normal;font-size:25px;margin:0 10px 0 8px;-webkit-font-smoothing:antialiased}.breadcrumb:first-child:before{display:none}.breadcrumb:last-child{color:#fff}.parallax-container{position:relative;overflow:hidden;height:500px}.parallax-container .parallax{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.parallax-container .parallax img{opacity:0;position:absolute;left:50%;bottom:0;min-width:100%;min-height:100%;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);-webkit-transform:translateX(-50%);transform:translate(-50%)}.pin-top,.pin-bottom{position:relative}.pinned{position:fixed!important}ul.staggered-list li{opacity:0}.fade-in{opacity:0;-webkit-transform-origin:0 50%;transform-origin:0 50%}@media only screen and (max-width: 600px){.hide-on-small-only,.hide-on-small-and-down{display:none!important}}@media only screen and (max-width: 992px){.hide-on-med-and-down{display:none!important}}@media only screen and (min-width: 601px){.hide-on-med-and-up{display:none!important}}@media only screen and (min-width: 600px) and (max-width: 992px){.hide-on-med-only{display:none!important}}@media only screen and (min-width: 993px){.hide-on-large-only{display:none!important}}@media only screen and (min-width: 1201px){.hide-on-extra-large-only{display:none!important}}@media only screen and (min-width: 1201px){.show-on-extra-large{display:block!important}}@media only screen and (min-width: 993px){.show-on-large{display:block!important}}@media only screen and (min-width: 600px) and (max-width: 992px){.show-on-medium{display:block!important}}@media only screen and (max-width: 600px){.show-on-small{display:block!important}}@media only screen and (min-width: 601px){.show-on-medium-and-up{display:block!important}}@media only screen and (max-width: 992px){.show-on-medium-and-down{display:block!important}}@media only screen and (max-width: 600px){.center-on-small-only{text-align:center}}.page-footer{padding-top:20px;color:#fff;background-color:#ee6e73}.page-footer .footer-copyright{overflow:hidden;min-height:50px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:10px 0;color:#fffc;background-color:#33333314}table,th,td{border:none}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:none}table.striped>tbody>tr:nth-child(odd){background-color:#f2f2f280}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{-webkit-transition:background-color .25s ease;transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:#f2f2f280}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width: 992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:" "}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th:before{content:" "}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:none;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,.12)}}.collection{margin:.5rem 0 1rem;border:1px solid #e0e0e0;border-radius:2px;overflow:hidden;position:relative}.collection .collection-item{background-color:#fff;line-height:1.5rem;padding:10px 20px;margin:0;border-bottom:1px solid #e0e0e0}.collection .collection-item.avatar{min-height:84px;padding-left:72px;position:relative}.collection .collection-item.avatar:not(.circle-clipper)>.circle,.collection .collection-item.avatar :not(.circle-clipper)>.circle{position:absolute;width:42px;height:42px;overflow:hidden;left:15px;display:inline-block;vertical-align:middle}.collection .collection-item.avatar i.circle{font-size:18px;line-height:42px;color:#fff;background-color:#999;text-align:center}.collection .collection-item.avatar .title{font-size:16px}.collection .collection-item.avatar p{margin:0}.collection .collection-item.avatar .secondary-content{position:absolute;top:16px;right:16px}.collection .collection-item:last-child{border-bottom:none}.collection .collection-item.active{background-color:#26a69a;color:#eafaf9}.collection .collection-item.active .secondary-content{color:#fff}.collection a.collection-item{display:block;-webkit-transition:.25s;transition:.25s;color:#26a69a}.collection a.collection-item:not(.active):hover{background-color:#ddd}.collection.with-header .collection-header{background-color:#fff;border-bottom:1px solid #e0e0e0;padding:10px 20px}.collection.with-header .collection-item{padding-left:30px}.collection.with-header .collection-item.avatar{padding-left:72px}.secondary-content{float:right;color:#26a69a}.collapsible .collection{margin:0;border:none}.video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container iframe,.video-container object,.video-container embed{position:absolute;top:0;left:0;width:100%;height:100%}.progress{position:relative;height:4px;display:block;width:100%;background-color:#acece6;border-radius:2px;margin:.5rem 0 1rem;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;-webkit-transition:width .3s linear;transition:width .3s linear}.progress .indeterminate{background-color:#26a69a}.progress .indeterminate:before{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite;animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.progress .indeterminate:after{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;-webkit-animation-delay:1.15s;animation-delay:1.15s}@-webkit-keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@-webkit-keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}.hide{display:none!important}.left-align{text-align:left}.right-align{text-align:right}.center,.center-align{text-align:center}.left{float:left!important}.right{float:right!important}.no-select,input[type=range],input[type=range]+.thumb{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.circle{border-radius:50%}.center-block{display:block;margin-left:auto;margin-right:auto}.truncate{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.no-padding{padding:0!important}span.badge{min-width:3rem;padding:0 6px;margin-left:14px;text-align:center;font-size:1rem;line-height:22px;height:22px;color:#757575;float:right;-webkit-box-sizing:border-box;box-sizing:border-box}span.badge.new{font-weight:300;font-size:.8rem;color:#fff;background-color:#26a69a;border-radius:2px}span.badge.new:after{content:" new"}span.badge[data-badge-caption]:after{content:" " attr(data-badge-caption)}nav ul a span.badge{display:inline-block;float:none;margin-left:4px;line-height:22px;height:22px;-webkit-font-smoothing:auto}.collection-item span.badge{margin-top:calc(.75rem - 11px)}.collapsible span.badge{margin-left:auto}.sidenav span.badge{margin-top:13px}table span.badge{display:inline-block;float:none;margin-left:auto}.material-icons{text-rendering:optimizeLegibility;-webkit-font-feature-settings:"liga";-moz-font-feature-settings:"liga";font-feature-settings:"liga"}.container{margin:0 auto;max-width:1280px;width:90%}@media only screen and (min-width: 601px){.container{width:85%}}@media only screen and (min-width: 993px){.container{width:70%}}.col .row{margin-left:-.75rem;margin-right:-.75rem}.section{padding-top:1rem;padding-bottom:1rem}.section.no-pad{padding:0}.section.no-pad-bot{padding-bottom:0}.section.no-pad-top{padding-top:0}.row{margin-left:auto;margin-right:auto;margin-bottom:20px}.row:after{content:"";display:table;clear:both}.row .col{float:left;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 .75rem;min-height:1px}.row .col[class*=push-],.row .col[class*=pull-]{position:relative}.row .col.s1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.s10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-s1{margin-left:8.3333333333%}.row .col.pull-s1{right:8.3333333333%}.row .col.push-s1{left:8.3333333333%}.row .col.offset-s2{margin-left:16.6666666667%}.row .col.pull-s2{right:16.6666666667%}.row .col.push-s2{left:16.6666666667%}.row .col.offset-s3{margin-left:25%}.row .col.pull-s3{right:25%}.row .col.push-s3{left:25%}.row .col.offset-s4{margin-left:33.3333333333%}.row .col.pull-s4{right:33.3333333333%}.row .col.push-s4{left:33.3333333333%}.row .col.offset-s5{margin-left:41.6666666667%}.row .col.pull-s5{right:41.6666666667%}.row .col.push-s5{left:41.6666666667%}.row .col.offset-s6{margin-left:50%}.row .col.pull-s6{right:50%}.row .col.push-s6{left:50%}.row .col.offset-s7{margin-left:58.3333333333%}.row .col.pull-s7{right:58.3333333333%}.row .col.push-s7{left:58.3333333333%}.row .col.offset-s8{margin-left:66.6666666667%}.row .col.pull-s8{right:66.6666666667%}.row .col.push-s8{left:66.6666666667%}.row .col.offset-s9{margin-left:75%}.row .col.pull-s9{right:75%}.row .col.push-s9{left:75%}.row .col.offset-s10{margin-left:83.3333333333%}.row .col.pull-s10{right:83.3333333333%}.row .col.push-s10{left:83.3333333333%}.row .col.offset-s11{margin-left:91.6666666667%}.row .col.pull-s11{right:91.6666666667%}.row .col.push-s11{left:91.6666666667%}.row .col.offset-s12{margin-left:100%}.row .col.pull-s12{right:100%}.row .col.push-s12{left:100%}@media only screen and (min-width: 601px){.row .col.m1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.m4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.m7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.m10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-m1{margin-left:8.3333333333%}.row .col.pull-m1{right:8.3333333333%}.row .col.push-m1{left:8.3333333333%}.row .col.offset-m2{margin-left:16.6666666667%}.row .col.pull-m2{right:16.6666666667%}.row .col.push-m2{left:16.6666666667%}.row .col.offset-m3{margin-left:25%}.row .col.pull-m3{right:25%}.row .col.push-m3{left:25%}.row .col.offset-m4{margin-left:33.3333333333%}.row .col.pull-m4{right:33.3333333333%}.row .col.push-m4{left:33.3333333333%}.row .col.offset-m5{margin-left:41.6666666667%}.row .col.pull-m5{right:41.6666666667%}.row .col.push-m5{left:41.6666666667%}.row .col.offset-m6{margin-left:50%}.row .col.pull-m6{right:50%}.row .col.push-m6{left:50%}.row .col.offset-m7{margin-left:58.3333333333%}.row .col.pull-m7{right:58.3333333333%}.row .col.push-m7{left:58.3333333333%}.row .col.offset-m8{margin-left:66.6666666667%}.row .col.pull-m8{right:66.6666666667%}.row .col.push-m8{left:66.6666666667%}.row .col.offset-m9{margin-left:75%}.row .col.pull-m9{right:75%}.row .col.push-m9{left:75%}.row .col.offset-m10{margin-left:83.3333333333%}.row .col.pull-m10{right:83.3333333333%}.row .col.push-m10{left:83.3333333333%}.row .col.offset-m11{margin-left:91.6666666667%}.row .col.pull-m11{right:91.6666666667%}.row .col.push-m11{left:91.6666666667%}.row .col.offset-m12{margin-left:100%}.row .col.pull-m12{right:100%}.row .col.push-m12{left:100%}}@media only screen and (min-width: 993px){.row .col.l1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.l4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.l7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.l10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-l1{margin-left:8.3333333333%}.row .col.pull-l1{right:8.3333333333%}.row .col.push-l1{left:8.3333333333%}.row .col.offset-l2{margin-left:16.6666666667%}.row .col.pull-l2{right:16.6666666667%}.row .col.push-l2{left:16.6666666667%}.row .col.offset-l3{margin-left:25%}.row .col.pull-l3{right:25%}.row .col.push-l3{left:25%}.row .col.offset-l4{margin-left:33.3333333333%}.row .col.pull-l4{right:33.3333333333%}.row .col.push-l4{left:33.3333333333%}.row .col.offset-l5{margin-left:41.6666666667%}.row .col.pull-l5{right:41.6666666667%}.row .col.push-l5{left:41.6666666667%}.row .col.offset-l6{margin-left:50%}.row .col.pull-l6{right:50%}.row .col.push-l6{left:50%}.row .col.offset-l7{margin-left:58.3333333333%}.row .col.pull-l7{right:58.3333333333%}.row .col.push-l7{left:58.3333333333%}.row .col.offset-l8{margin-left:66.6666666667%}.row .col.pull-l8{right:66.6666666667%}.row .col.push-l8{left:66.6666666667%}.row .col.offset-l9{margin-left:75%}.row .col.pull-l9{right:75%}.row .col.push-l9{left:75%}.row .col.offset-l10{margin-left:83.3333333333%}.row .col.pull-l10{right:83.3333333333%}.row .col.push-l10{left:83.3333333333%}.row .col.offset-l11{margin-left:91.6666666667%}.row .col.pull-l11{right:91.6666666667%}.row .col.push-l11{left:91.6666666667%}.row .col.offset-l12{margin-left:100%}.row .col.pull-l12{right:100%}.row .col.push-l12{left:100%}}@media only screen and (min-width: 1201px){.row .col.xl1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.xl4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.xl7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.xl10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-xl1{margin-left:8.3333333333%}.row .col.pull-xl1{right:8.3333333333%}.row .col.push-xl1{left:8.3333333333%}.row .col.offset-xl2{margin-left:16.6666666667%}.row .col.pull-xl2{right:16.6666666667%}.row .col.push-xl2{left:16.6666666667%}.row .col.offset-xl3{margin-left:25%}.row .col.pull-xl3{right:25%}.row .col.push-xl3{left:25%}.row .col.offset-xl4{margin-left:33.3333333333%}.row .col.pull-xl4{right:33.3333333333%}.row .col.push-xl4{left:33.3333333333%}.row .col.offset-xl5{margin-left:41.6666666667%}.row .col.pull-xl5{right:41.6666666667%}.row .col.push-xl5{left:41.6666666667%}.row .col.offset-xl6{margin-left:50%}.row .col.pull-xl6{right:50%}.row .col.push-xl6{left:50%}.row .col.offset-xl7{margin-left:58.3333333333%}.row .col.pull-xl7{right:58.3333333333%}.row .col.push-xl7{left:58.3333333333%}.row .col.offset-xl8{margin-left:66.6666666667%}.row .col.pull-xl8{right:66.6666666667%}.row .col.push-xl8{left:66.6666666667%}.row .col.offset-xl9{margin-left:75%}.row .col.pull-xl9{right:75%}.row .col.push-xl9{left:75%}.row .col.offset-xl10{margin-left:83.3333333333%}.row .col.pull-xl10{right:83.3333333333%}.row .col.push-xl10{left:83.3333333333%}.row .col.offset-xl11{margin-left:91.6666666667%}.row .col.pull-xl11{right:91.6666666667%}.row .col.push-xl11{left:91.6666666667%}.row .col.offset-xl12{margin-left:100%}.row .col.pull-xl12{right:100%}.row .col.push-xl12{left:100%}}nav{color:#fff;background-color:#ee6e73;width:100%;height:56px;line-height:56px}nav.nav-extended{height:auto}nav.nav-extended .nav-wrapper{min-height:56px;height:auto}nav.nav-extended .nav-content{position:relative;line-height:normal}nav a{color:#fff}nav i,nav [class^=mdi-],nav [class*=mdi-],nav i.material-icons{display:block;font-size:24px;height:56px;line-height:56px}nav .nav-wrapper{position:relative;height:100%}@media only screen and (min-width: 993px){nav a.sidenav-trigger{display:none}}nav .sidenav-trigger{float:left;position:relative;z-index:1;height:56px;margin:0 18px}nav .sidenav-trigger i{height:56px;line-height:56px}nav .brand-logo{position:absolute;color:#fff;display:inline-block;font-size:2.1rem;padding:0}nav .brand-logo.center{left:50%;-webkit-transform:translateX(-50%);transform:translate(-50%)}@media only screen and (max-width: 992px){nav .brand-logo{left:50%;-webkit-transform:translateX(-50%);transform:translate(-50%)}nav .brand-logo.left,nav .brand-logo.right{padding:0;-webkit-transform:none;transform:none}nav .brand-logo.left{left:.5rem}nav .brand-logo.right{right:.5rem;left:auto}}nav .brand-logo.right{right:.5rem;padding:0}nav .brand-logo i,nav .brand-logo [class^=mdi-],nav .brand-logo [class*=mdi-],nav .brand-logo i.material-icons{float:left;margin-right:15px}nav .nav-title{display:inline-block;font-size:32px;padding:28px 0}nav ul{margin:0}nav ul li{-webkit-transition:background-color .3s;transition:background-color .3s;float:left;padding:0}nav ul li.active{background-color:#0000001a}nav ul a{-webkit-transition:background-color .3s;transition:background-color .3s;font-size:1rem;color:#fff;display:block;padding:0 15px;cursor:pointer}nav ul a.btn,nav ul a.btn-large,nav ul a.btn-small,nav ul a.btn-flat,nav ul a.btn-floating{margin-top:-2px;margin-left:15px;margin-right:15px}nav ul a.btn>.material-icons,nav ul a.btn-large>.material-icons,nav ul a.btn-small>.material-icons,nav ul a.btn-flat>.material-icons,nav ul a.btn-floating>.material-icons{height:inherit;line-height:inherit}nav ul a:hover{background-color:#0000001a}nav ul.left{float:left}nav form{height:100%}nav .input-field{margin:0;height:100%}nav .input-field input{height:100%;font-size:1.2rem;border:none;padding-left:2rem}nav .input-field input:focus,nav .input-field input[type=text]:valid,nav .input-field input[type=password]:valid,nav .input-field input[type=email]:valid,nav .input-field input[type=url]:valid,nav .input-field input[type=date]:valid{border:none;-webkit-box-shadow:none;box-shadow:none}nav .input-field label{top:0;left:0}nav .input-field label i{color:#ffffffb3;-webkit-transition:color .3s;transition:color .3s}nav .input-field label.active i{color:#fff}.navbar-fixed{position:relative;height:56px;z-index:997}.navbar-fixed nav{position:fixed}@media only screen and (min-width: 601px){nav.nav-extended .nav-wrapper{min-height:64px}nav,nav .nav-wrapper i,nav a.sidenav-trigger,nav a.sidenav-trigger i{height:64px;line-height:64px}.navbar-fixed{height:64px}}a{text-decoration:none}html{line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-weight:400;color:#000000de}@media only screen and (min-width: 0){html{font-size:14px}}@media only screen and (min-width: 992px){html{font-size:14.5px}}@media only screen and (min-width: 1200px){html{font-size:15px}}h1,h2,h3,h4,h5,h6{font-weight:400;line-height:1.3}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}h1{font-size:4.2rem;line-height:110%;margin:2.8rem 0 1.68rem}h2{font-size:3.56rem;line-height:110%;margin:2.3733333333rem 0 1.424rem}h3{font-size:2.92rem;line-height:110%;margin:1.9466666667rem 0 1.168rem}h4{font-size:2.28rem;line-height:110%;margin:1.52rem 0 .912rem}h5{font-size:1.64rem;line-height:110%;margin:1.0933333333rem 0 .656rem}h6{font-size:1.15rem;line-height:110%;margin:.7666666667rem 0 .46rem}em{font-style:italic}strong{font-weight:500}small{font-size:75%}.light{font-weight:300}.thin{font-weight:200}@media only screen and (min-width: 360px){.flow-text{font-size:1.2rem}}@media only screen and (min-width: 390px){.flow-text{font-size:1.224rem}}@media only screen and (min-width: 420px){.flow-text{font-size:1.248rem}}@media only screen and (min-width: 450px){.flow-text{font-size:1.272rem}}@media only screen and (min-width: 480px){.flow-text{font-size:1.296rem}}@media only screen and (min-width: 510px){.flow-text{font-size:1.32rem}}@media only screen and (min-width: 540px){.flow-text{font-size:1.344rem}}@media only screen and (min-width: 570px){.flow-text{font-size:1.368rem}}@media only screen and (min-width: 600px){.flow-text{font-size:1.392rem}}@media only screen and (min-width: 630px){.flow-text{font-size:1.416rem}}@media only screen and (min-width: 660px){.flow-text{font-size:1.44rem}}@media only screen and (min-width: 690px){.flow-text{font-size:1.464rem}}@media only screen and (min-width: 720px){.flow-text{font-size:1.488rem}}@media only screen and (min-width: 750px){.flow-text{font-size:1.512rem}}@media only screen and (min-width: 780px){.flow-text{font-size:1.536rem}}@media only screen and (min-width: 810px){.flow-text{font-size:1.56rem}}@media only screen and (min-width: 840px){.flow-text{font-size:1.584rem}}@media only screen and (min-width: 870px){.flow-text{font-size:1.608rem}}@media only screen and (min-width: 900px){.flow-text{font-size:1.632rem}}@media only screen and (min-width: 930px){.flow-text{font-size:1.656rem}}@media only screen and (min-width: 960px){.flow-text{font-size:1.68rem}}@media only screen and (max-width: 360px){.flow-text{font-size:1.2rem}}.scale-transition{-webkit-transition:-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:transform .3s cubic-bezier(.53,.01,.36,1.63)!important;transition:transform .3s cubic-bezier(.53,.01,.36,1.63),-webkit-transform .3s cubic-bezier(.53,.01,.36,1.63)!important}.scale-transition.scale-out{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .2s!important;transition:-webkit-transform .2s!important;transition:transform .2s!important;transition:transform .2s,-webkit-transform .2s!important}.scale-transition.scale-in{-webkit-transform:scale(1);transform:scale(1)}.card-panel{-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s;padding:24px;margin:.5rem 0 1rem;border-radius:2px;background-color:#fff}.card{position:relative;margin:.5rem 0 1rem;background-color:#fff;-webkit-transition:-webkit-box-shadow .25s;transition:-webkit-box-shadow .25s;transition:box-shadow .25s;transition:box-shadow .25s,-webkit-box-shadow .25s;border-radius:2px}.card .card-title{font-size:24px;font-weight:300}.card .card-title.activator{cursor:pointer}.card.small,.card.medium,.card.large{position:relative}.card.small .card-image,.card.medium .card-image,.card.large .card-image{max-height:60%;overflow:hidden}.card.small .card-image+.card-content,.card.medium .card-image+.card-content,.card.large .card-image+.card-content{max-height:40%}.card.small .card-content,.card.medium .card-content,.card.large .card-content{max-height:100%;overflow:hidden}.card.small .card-action,.card.medium .card-action,.card.large .card-action{position:absolute;bottom:0;left:0;right:0}.card.small{height:300px}.card.medium{height:400px}.card.large{height:500px}.card.horizontal{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.card.horizontal.small .card-image,.card.horizontal.medium .card-image,.card.horizontal.large .card-image{height:100%;max-height:none;overflow:visible}.card.horizontal.small .card-image img,.card.horizontal.medium .card-image img,.card.horizontal.large .card-image img{height:100%}.card.horizontal .card-image{max-width:50%}.card.horizontal .card-image img{border-radius:2px 0 0 2px;max-width:100%;width:auto}.card.horizontal .card-stacked{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative}.card.horizontal .card-stacked .card-content{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.card.sticky-action .card-action{z-index:2}.card.sticky-action .card-reveal{z-index:1;padding-bottom:64px}.card .card-image{position:relative}.card .card-image img{display:block;border-radius:2px 2px 0 0;position:relative;left:0;right:0;top:0;bottom:0;width:100%}.card .card-image .card-title{color:#fff;position:absolute;bottom:0;left:0;max-width:100%;padding:24px}.card .card-content{padding:24px;border-radius:0 0 2px 2px}.card .card-content p{margin:0}.card .card-content .card-title{display:block;line-height:32px;margin-bottom:8px}.card .card-content .card-title i{line-height:32px}.card .card-action{background-color:inherit;border-top:1px solid rgba(160,160,160,.2);position:relative;padding:16px 24px}.card .card-action:last-child{border-radius:0 0 2px 2px}.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating){color:#ffab40;margin-right:24px;-webkit-transition:color .3s ease;transition:color .3s ease;text-transform:uppercase}.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating):hover{color:#ffd8a6}.card .card-reveal{padding:24px;position:absolute;background-color:#fff;width:100%;overflow-y:auto;left:0;top:100%;height:100%;z-index:3;display:none}.card .card-reveal .card-title{cursor:pointer;display:block}#toast-container{display:block;position:fixed;z-index:10000}@media only screen and (max-width: 600px){#toast-container{min-width:100%;bottom:0%}}@media only screen and (min-width: 601px) and (max-width: 992px){#toast-container{left:5%;bottom:7%;max-width:90%}}@media only screen and (min-width: 993px){#toast-container{top:10%;right:7%;max-width:86%}}.toast{border-radius:2px;top:35px;width:auto;margin-top:10px;position:relative;max-width:100%;height:auto;min-height:48px;line-height:1.5em;background-color:#323232;padding:10px 25px;font-size:1.1rem;font-weight:300;color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;cursor:default}.toast .toast-action{color:#eeff41;font-weight:500;margin-right:-25px;margin-left:3rem}.toast.rounded{border-radius:24px}@media only screen and (max-width: 600px){.toast{width:100%;border-radius:0}}.tabs{position:relative;overflow-x:auto;overflow-y:hidden;height:48px;width:100%;background-color:#fff;margin:0 auto;white-space:nowrap}.tabs.tabs-transparent{background-color:transparent}.tabs.tabs-transparent .tab a,.tabs.tabs-transparent .tab.disabled a,.tabs.tabs-transparent .tab.disabled a:hover{color:#ffffffb3}.tabs.tabs-transparent .tab a:hover,.tabs.tabs-transparent .tab a.active{color:#fff}.tabs.tabs-transparent .indicator{background-color:#fff}.tabs.tabs-fixed-width{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.tabs.tabs-fixed-width .tab{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.tabs .tab{display:inline-block;text-align:center;line-height:48px;height:48px;padding:0;margin:0;text-transform:uppercase}.tabs .tab a{color:#ee6e73b3;display:block;width:100%;height:100%;padding:0 24px;font-size:14px;text-overflow:ellipsis;overflow:hidden;-webkit-transition:color .28s ease,background-color .28s ease;transition:color .28s ease,background-color .28s ease}.tabs .tab a:focus,.tabs .tab a:focus.active{background-color:#f6b2b533;outline:none}.tabs .tab a:hover,.tabs .tab a.active{background-color:transparent;color:#ee6e73}.tabs .tab.disabled a,.tabs .tab.disabled a:hover{color:#ee6e7366;cursor:default}.tabs .indicator{position:absolute;bottom:0;height:2px;background-color:#f6b2b5;will-change:left,right}@media only screen and (max-width: 992px){.tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.tabs .tab{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.tabs .tab a{padding:0 12px}}.material-tooltip{padding:10px 8px;font-size:1rem;z-index:2000;background-color:transparent;border-radius:2px;color:#fff;min-height:36px;line-height:120%;opacity:0;position:absolute;text-align:center;max-width:calc(100% - 4px);overflow:hidden;left:0;top:0;pointer-events:none;visibility:hidden;background-color:#323232}.backdrop{position:absolute;opacity:0;height:7px;width:14px;border-radius:0 0 50% 50%;background-color:#323232;z-index:-1;-webkit-transform-origin:50% 0%;transform-origin:50% 0%;visibility:hidden}.btn,.btn-large,.btn-small,.btn-flat{border:none;border-radius:2px;display:inline-block;height:36px;line-height:36px;padding:0 16px;text-transform:uppercase;vertical-align:middle;-webkit-tap-highlight-color:transparent}.btn.disabled,.disabled.btn-large,.disabled.btn-small,.btn-floating.disabled,.btn-large.disabled,.btn-small.disabled,.btn-flat.disabled,.btn:disabled,.btn-large:disabled,.btn-small:disabled,.btn-floating:disabled,.btn-flat:disabled,.btn[disabled],.btn-large[disabled],.btn-small[disabled],.btn-floating[disabled],.btn-flat[disabled]{pointer-events:none;background-color:#dfdfdf!important;-webkit-box-shadow:none;box-shadow:none;color:#9f9f9f!important;cursor:default}.btn.disabled:hover,.disabled.btn-large:hover,.disabled.btn-small:hover,.btn-floating.disabled:hover,.btn-large.disabled:hover,.btn-small.disabled:hover,.btn-flat.disabled:hover,.btn:disabled:hover,.btn-large:disabled:hover,.btn-small:disabled:hover,.btn-floating:disabled:hover,.btn-flat:disabled:hover,.btn[disabled]:hover,.btn-large[disabled]:hover,.btn-small[disabled]:hover,.btn-floating[disabled]:hover,.btn-flat[disabled]:hover{background-color:#dfdfdf!important;color:#9f9f9f!important}.btn,.btn-large,.btn-small,.btn-floating,.btn-flat{font-size:14px;outline:0}.btn i,.btn-large i,.btn-small i,.btn-floating i,.btn-flat i{font-size:1.3rem;line-height:inherit}.btn:focus,.btn-large:focus,.btn-small:focus,.btn-floating:focus{background-color:#1d7d74}.btn,.btn-large,.btn-small{text-decoration:none;color:#fff;background-color:#26a69a;text-align:center;letter-spacing:.5px;-webkit-transition:background-color .2s ease-out;transition:background-color .2s ease-out;cursor:pointer}.btn:hover,.btn-large:hover,.btn-small:hover{background-color:#2bbbad}.btn-floating{display:inline-block;color:#fff;position:relative;overflow:hidden;z-index:1;width:40px;height:40px;line-height:40px;padding:0;background-color:#26a69a;border-radius:50%;-webkit-transition:background-color .3s;transition:background-color .3s;cursor:pointer;vertical-align:middle}.btn-floating:hover{background-color:#26a69a}.btn-floating:before{border-radius:0}.btn-floating.btn-large{width:56px;height:56px;padding:0}.btn-floating.btn-large.halfway-fab{bottom:-28px}.btn-floating.btn-large i{line-height:56px}.btn-floating.btn-small{width:32.4px;height:32.4px}.btn-floating.btn-small.halfway-fab{bottom:-16.2px}.btn-floating.btn-small i{line-height:32.4px}.btn-floating.halfway-fab{position:absolute;right:24px;bottom:-20px}.btn-floating.halfway-fab.left{right:auto;left:24px}.btn-floating i{width:inherit;display:inline-block;text-align:center;color:#fff;font-size:1.6rem;line-height:40px}button.btn-floating{border:none}.fixed-action-btn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:997}.fixed-action-btn.active ul{visibility:visible}.fixed-action-btn.direction-left,.fixed-action-btn.direction-right{padding:0 0 0 15px}.fixed-action-btn.direction-left ul,.fixed-action-btn.direction-right ul{text-align:right;right:64px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:100%;left:auto;width:500px}.fixed-action-btn.direction-left ul li,.fixed-action-btn.direction-right ul li{display:inline-block;margin:7.5px 15px 0 0}.fixed-action-btn.direction-right{padding:0 15px 0 0}.fixed-action-btn.direction-right ul{text-align:left;direction:rtl;left:64px;right:auto}.fixed-action-btn.direction-right ul li{margin:7.5px 0 0 15px}.fixed-action-btn.direction-bottom{padding:0 0 15px}.fixed-action-btn.direction-bottom ul{top:64px;bottom:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.fixed-action-btn.direction-bottom ul li{margin:15px 0 0}.fixed-action-btn.toolbar{padding:0;height:56px}.fixed-action-btn.toolbar.active>a i{opacity:0}.fixed-action-btn.toolbar ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;top:0;bottom:0;z-index:1}.fixed-action-btn.toolbar ul li{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:inline-block;margin:0;height:100%;-webkit-transition:none;transition:none}.fixed-action-btn.toolbar ul li a{display:block;overflow:hidden;position:relative;width:100%;height:100%;background-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;line-height:56px;z-index:1}.fixed-action-btn.toolbar ul li a i{line-height:inherit}.fixed-action-btn ul{left:0;right:0;text-align:center;position:absolute;bottom:64px;margin:0;visibility:hidden}.fixed-action-btn ul li{margin-bottom:15px}.fixed-action-btn ul a.btn-floating{opacity:0}.fixed-action-btn .fab-backdrop{position:absolute;top:0;left:0;z-index:-1;width:40px;height:40px;background-color:#26a69a;border-radius:50%;-webkit-transform:scale(0);transform:scale(0)}.btn-flat{-webkit-box-shadow:none;box-shadow:none;background-color:transparent;color:#343434;cursor:pointer;-webkit-transition:background-color .2s;transition:background-color .2s}.btn-flat:focus,.btn-flat:hover{-webkit-box-shadow:none;box-shadow:none}.btn-flat:focus{background-color:#0000001a}.btn-flat.disabled,.btn-flat.btn-flat[disabled]{background-color:transparent!important;color:#b3b2b2!important;cursor:default}.btn-large{height:54px;line-height:54px;font-size:15px;padding:0 28px}.btn-large i{font-size:1.6rem}.btn-small{height:32.4px;line-height:32.4px;font-size:13px}.btn-small i{font-size:1.2rem}.btn-block{display:block}.dropdown-content{background-color:#fff;margin:0;display:none;min-width:100px;overflow-y:auto;opacity:0;position:absolute;left:0;top:0;z-index:9999;-webkit-transform-origin:0 0;transform-origin:0 0}.dropdown-content:focus{outline:0}.dropdown-content li{clear:both;color:#000000de;cursor:pointer;min-height:50px;line-height:1.5rem;width:100%;text-align:left}.dropdown-content li:hover,.dropdown-content li.active{background-color:#eee}.dropdown-content li:focus{outline:none}.dropdown-content li.divider{min-height:0;height:1px}.dropdown-content li>a,.dropdown-content li>span{font-size:16px;color:#26a69a;display:block;line-height:22px;padding:14px 16px}.dropdown-content li>span>label{top:1px;left:0;height:18px}.dropdown-content li>a>i{height:inherit;line-height:inherit;float:left;margin:0 24px 0 0;width:24px}body.keyboard-focused .dropdown-content li:focus{background-color:#dadada}.input-field.col .dropdown-content [type=checkbox]+label{top:1px;left:0;height:18px;-webkit-transform:none;transform:none}.dropdown-trigger{cursor:pointer}/*!
* Waves v0.6.0
* http://fian.my.id/Waves
*
* Copyright 2014 Alfiana E. Sibuea and other contributors
* Released under the MIT license
* https://github.com/fians/Waves/blob/master/LICENSE
*/.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:middle;z-index:1;-webkit-transition:.3s ease-out;transition:.3s ease-out}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:20px;height:20px;margin-top:-10px;margin-left:-10px;opacity:0;background:rgba(0,0,0,.2);-webkit-transition:all .7s ease-out;transition:all .7s ease-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transform:scale(0);transform:scale(0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background-color:#ffffff73}.waves-effect.waves-red .waves-ripple{background-color:#f44336b3}.waves-effect.waves-yellow .waves-ripple{background-color:#ffeb3bb3}.waves-effect.waves-orange .waves-ripple{background-color:#ff9800b3}.waves-effect.waves-purple .waves-ripple{background-color:#9c27b0b3}.waves-effect.waves-green .waves-ripple{background-color:#4caf50b3}.waves-effect.waves-teal .waves-ripple{background-color:#009688b3}.waves-effect input[type=button],.waves-effect input[type=reset],.waves-effect input[type=submit]{border:0;font-style:normal;font-size:inherit;text-transform:inherit;background:none}.waves-effect img{position:relative;z-index:-1}.waves-notransition{-webkit-transition:none!important;transition:none!important}.waves-circle{-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle,white 100%,black 100%)}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%;-webkit-mask-image:none}.waves-block{display:block}.waves-effect .waves-ripple{z-index:-1}.modal{display:none;position:fixed;left:0;right:0;background-color:#fafafa;padding:0;max-height:70%;width:55%;margin:auto;overflow-y:auto;border-radius:2px;will-change:top,opacity}.modal:focus{outline:none}@media only screen and (max-width: 992px){.modal{width:80%}}.modal h1,.modal h2,.modal h3,.modal h4{margin-top:0}.modal .modal-content{padding:24px}.modal .modal-close{cursor:pointer}.modal .modal-footer{border-radius:0 0 2px 2px;background-color:#fafafa;padding:4px 6px;height:56px;width:100%;text-align:right}.modal .modal-footer .btn,.modal .modal-footer .btn-large,.modal .modal-footer .btn-small,.modal .modal-footer .btn-flat{margin:6px 0}.modal-overlay{position:fixed;z-index:999;top:-25%;left:0;bottom:0;right:0;height:125%;width:100%;background:#000;display:none;will-change:opacity}.modal.modal-fixed-footer{padding:0;height:70%}.modal.modal-fixed-footer .modal-content{position:absolute;height:calc(100% - 56px);max-height:100%;width:100%;overflow-y:auto}.modal.modal-fixed-footer .modal-footer{border-top:1px solid rgba(0,0,0,.1);position:absolute;bottom:0}.modal.bottom-sheet{top:auto;bottom:-100%;margin:0;width:100%;max-height:45%;border-radius:0;will-change:bottom,opacity}.collapsible{border-top:1px solid #ddd;border-right:1px solid #ddd;border-left:1px solid #ddd;margin:.5rem 0 1rem}.collapsible-header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;cursor:pointer;-webkit-tap-highlight-color:transparent;line-height:1.5;padding:1rem;background-color:#fff;border-bottom:1px solid #ddd}.collapsible-header:focus{outline:0}.collapsible-header i{width:2rem;font-size:1.6rem;display:inline-block;text-align:center;margin-right:1rem}.keyboard-focused .collapsible-header:focus{background-color:#eee}.collapsible-body{display:none;border-bottom:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box;padding:2rem}.sidenav .collapsible,.sidenav.fixed .collapsible{border:none;-webkit-box-shadow:none;box-shadow:none}.sidenav .collapsible li,.sidenav.fixed .collapsible li{padding:0}.sidenav .collapsible-header,.sidenav.fixed .collapsible-header{background-color:transparent;border:none;line-height:inherit;height:inherit;padding:0 16px}.sidenav .collapsible-header:hover,.sidenav.fixed .collapsible-header:hover{background-color:#0000000d}.sidenav .collapsible-header i,.sidenav.fixed .collapsible-header i{line-height:inherit}.sidenav .collapsible-body,.sidenav.fixed .collapsible-body{border:0;background-color:#fff}.sidenav .collapsible-body li a,.sidenav.fixed .collapsible-body li a{padding:0 23.5px 0 31px}.collapsible.popout{border:none;-webkit-box-shadow:none;box-shadow:none}.collapsible.popout>li{-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 5px #00000029,0 2px 10px #0000001f;margin:0 24px;-webkit-transition:margin .35s cubic-bezier(.25,.46,.45,.94);transition:margin .35s cubic-bezier(.25,.46,.45,.94)}.collapsible.popout>li.active{-webkit-box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);box-shadow:0 5px 11px #0000002e,0 4px 15px #00000026;margin:16px 0}.chip{display:inline-block;height:32px;font-size:13px;font-weight:500;color:#0009;line-height:32px;padding:0 12px;border-radius:16px;background-color:#e4e4e4;margin-bottom:5px;margin-right:5px}.chip:focus{outline:none;background-color:#26a69a;color:#fff}.chip>img{float:left;margin:0 8px 0 -12px;height:32px;width:32px;border-radius:50%}.chip .close{cursor:pointer;float:right;font-size:16px;line-height:32px;padding-left:8px}.chips{border:none;border-bottom:1px solid #9e9e9e;-webkit-box-shadow:none;box-shadow:none;margin:0 0 8px;min-height:45px;outline:none;-webkit-transition:all .3s;transition:all .3s}.chips.focus{border-bottom:1px solid #26a69a;-webkit-box-shadow:0 1px 0 0 #26a69a;box-shadow:0 1px #26a69a}.chips:hover{cursor:text}.chips .input{background:none;border:0;color:#0009;display:inline-block;font-size:16px;height:3rem;line-height:32px;outline:0;margin:0;padding:0!important;width:120px!important}.chips .input:focus{border:0!important;-webkit-box-shadow:none!important;box-shadow:none!important}.chips .autocomplete-content{margin-top:0;margin-bottom:0}.prefix~.chips{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.chips:empty~label{font-size:.8rem;-webkit-transform:translateY(-140%);transform:translateY(-140%)}.materialboxed{display:block;cursor:-webkit-zoom-in;cursor:zoom-in;position:relative;-webkit-transition:opacity .4s;transition:opacity .4s;-webkit-backface-visibility:hidden}.materialboxed:hover:not(.active){opacity:.8}.materialboxed.active{cursor:-webkit-zoom-out;cursor:zoom-out}#materialbox-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#292929;z-index:1000;will-change:opacity}.materialbox-caption{position:fixed;display:none;color:#fff;line-height:50px;bottom:0;left:0;width:100%;text-align:center;padding:0% 15%;height:50px;z-index:1000;-webkit-font-smoothing:antialiased}select:focus{outline:1px solid #c9f3ef}button:focus{outline:none;background-color:#2ab7a9}label{font-size:.8rem;color:#9e9e9e}::-webkit-input-placeholder{color:#d1d1d1}::-moz-placeholder{color:#d1d1d1}:-ms-input-placeholder{color:#d1d1d1}::-ms-input-placeholder{color:#d1d1d1}::placeholder{color:#d1d1d1}input:not([type]),input[type=text]:not(.browser-default),input[type=password]:not(.browser-default),input[type=email]:not(.browser-default),input[type=url]:not(.browser-default),input[type=time]:not(.browser-default),input[type=date]:not(.browser-default),input[type=datetime]:not(.browser-default),input[type=datetime-local]:not(.browser-default),input[type=tel]:not(.browser-default),input[type=number]:not(.browser-default),input[type=search]:not(.browser-default),textarea.materialize-textarea{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:none;height:3rem;width:100%;font-size:16px;margin:0 0 8px;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-transition:border .3s,-webkit-box-shadow .3s;transition:border .3s,-webkit-box-shadow .3s;transition:box-shadow .3s,border .3s;transition:box-shadow .3s,border .3s,-webkit-box-shadow .3s}input:not([type]):disabled,input:not([type])[readonly=readonly],input[type=text]:not(.browser-default):disabled,input[type=text]:not(.browser-default)[readonly=readonly],input[type=password]:not(.browser-default):disabled,input[type=password]:not(.browser-default)[readonly=readonly],input[type=email]:not(.browser-default):disabled,input[type=email]:not(.browser-default)[readonly=readonly],input[type=url]:not(.browser-default):disabled,input[type=url]:not(.browser-default)[readonly=readonly],input[type=time]:not(.browser-default):disabled,input[type=time]:not(.browser-default)[readonly=readonly],input[type=date]:not(.browser-default):disabled,input[type=date]:not(.browser-default)[readonly=readonly],input[type=datetime]:not(.browser-default):disabled,input[type=datetime]:not(.browser-default)[readonly=readonly],input[type=datetime-local]:not(.browser-default):disabled,input[type=datetime-local]:not(.browser-default)[readonly=readonly],input[type=tel]:not(.browser-default):disabled,input[type=tel]:not(.browser-default)[readonly=readonly],input[type=number]:not(.browser-default):disabled,input[type=number]:not(.browser-default)[readonly=readonly],input[type=search]:not(.browser-default):disabled,input[type=search]:not(.browser-default)[readonly=readonly],textarea.materialize-textarea:disabled,textarea.materialize-textarea[readonly=readonly]{color:#0000006b;border-bottom:1px dotted rgba(0,0,0,.42)}input:not([type]):disabled+label,input:not([type])[readonly=readonly]+label,input[type=text]:not(.browser-default):disabled+label,input[type=text]:not(.browser-default)[readonly=readonly]+label,input[type=password]:not(.browser-default):disabled+label,input[type=password]:not(.browser-default)[readonly=readonly]+label,input[type=email]:not(.browser-default):disabled+label,input[type=email]:not(.browser-default)[readonly=readonly]+label,input[type=url]:not(.browser-default):disabled+label,input[type=url]:not(.browser-default)[readonly=readonly]+label,input[type=time]:not(.browser-default):disabled+label,input[type=time]:not(.browser-default)[readonly=readonly]+label,input[type=date]:not(.browser-default):disabled+label,input[type=date]:not(.browser-default)[readonly=readonly]+label,input[type=datetime]:not(.browser-default):disabled+label,input[type=datetime]:not(.browser-default)[readonly=readonly]+label,input[type=datetime-local]:not(.browser-default):disabled+label,input[type=datetime-local]:not(.browser-default)[readonly=readonly]+label,input[type=tel]:not(.browser-default):disabled+label,input[type=tel]:not(.browser-default)[readonly=readonly]+label,input[type=number]:not(.browser-default):disabled+label,input[type=number]:not(.browser-default)[readonly=readonly]+label,input[type=search]:not(.browser-default):disabled+label,input[type=search]:not(.browser-default)[readonly=readonly]+label,textarea.materialize-textarea:disabled+label,textarea.materialize-textarea[readonly=readonly]+label{color:#0000006b}input:not([type]):focus:not([readonly]),input[type=text]:not(.browser-default):focus:not([readonly]),input[type=password]:not(.browser-default):focus:not([readonly]),input[type=email]:not(.browser-default):focus:not([readonly]),input[type=url]:not(.browser-default):focus:not([readonly]),input[type=time]:not(.browser-default):focus:not([readonly]),input[type=date]:not(.browser-default):focus:not([readonly]),input[type=datetime]:not(.browser-default):focus:not([readonly]),input[type=datetime-local]:not(.browser-default):focus:not([readonly]),input[type=tel]:not(.browser-default):focus:not([readonly]),input[type=number]:not(.browser-default):focus:not([readonly]),input[type=search]:not(.browser-default):focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid #26a69a;-webkit-box-shadow:0 1px 0 0 #26a69a;box-shadow:0 1px #26a69a}input:not([type]):focus:not([readonly])+label,input[type=text]:not(.browser-default):focus:not([readonly])+label,input[type=password]:not(.browser-default):focus:not([readonly])+label,input[type=email]:not(.browser-default):focus:not([readonly])+label,input[type=url]:not(.browser-default):focus:not([readonly])+label,input[type=time]:not(.browser-default):focus:not([readonly])+label,input[type=date]:not(.browser-default):focus:not([readonly])+label,input[type=datetime]:not(.browser-default):focus:not([readonly])+label,input[type=datetime-local]:not(.browser-default):focus:not([readonly])+label,input[type=tel]:not(.browser-default):focus:not([readonly])+label,input[type=number]:not(.browser-default):focus:not([readonly])+label,input[type=search]:not(.browser-default):focus:not([readonly])+label,textarea.materialize-textarea:focus:not([readonly])+label{color:#26a69a}input:not([type]):focus.valid~label,input[type=text]:not(.browser-default):focus.valid~label,input[type=password]:not(.browser-default):focus.valid~label,input[type=email]:not(.browser-default):focus.valid~label,input[type=url]:not(.browser-default):focus.valid~label,input[type=time]:not(.browser-default):focus.valid~label,input[type=date]:not(.browser-default):focus.valid~label,input[type=datetime]:not(.browser-default):focus.valid~label,input[type=datetime-local]:not(.browser-default):focus.valid~label,input[type=tel]:not(.browser-default):focus.valid~label,input[type=number]:not(.browser-default):focus.valid~label,input[type=search]:not(.browser-default):focus.valid~label,textarea.materialize-textarea:focus.valid~label{color:#4caf50}input:not([type]):focus.invalid~label,input[type=text]:not(.browser-default):focus.invalid~label,input[type=password]:not(.browser-default):focus.invalid~label,input[type=email]:not(.browser-default):focus.invalid~label,input[type=url]:not(.browser-default):focus.invalid~label,input[type=time]:not(.browser-default):focus.invalid~label,input[type=date]:not(.browser-default):focus.invalid~label,input[type=datetime]:not(.browser-default):focus.invalid~label,input[type=datetime-local]:not(.browser-default):focus.invalid~label,input[type=tel]:not(.browser-default):focus.invalid~label,input[type=number]:not(.browser-default):focus.invalid~label,input[type=search]:not(.browser-default):focus.invalid~label,textarea.materialize-textarea:focus.invalid~label{color:#f44336}input:not([type]).validate+label,input[type=text]:not(.browser-default).validate+label,input[type=password]:not(.browser-default).validate+label,input[type=email]:not(.browser-default).validate+label,input[type=url]:not(.browser-default).validate+label,input[type=time]:not(.browser-default).validate+label,input[type=date]:not(.browser-default).validate+label,input[type=datetime]:not(.browser-default).validate+label,input[type=datetime-local]:not(.browser-default).validate+label,input[type=tel]:not(.browser-default).validate+label,input[type=number]:not(.browser-default).validate+label,input[type=search]:not(.browser-default).validate+label,textarea.materialize-textarea.validate+label{width:100%}input.valid:not([type]),input.valid:not([type]):focus,input.valid[type=text]:not(.browser-default),input.valid[type=text]:not(.browser-default):focus,input.valid[type=password]:not(.browser-default),input.valid[type=password]:not(.browser-default):focus,input.valid[type=email]:not(.browser-default),input.valid[type=email]:not(.browser-default):focus,input.valid[type=url]:not(.browser-default),input.valid[type=url]:not(.browser-default):focus,input.valid[type=time]:not(.browser-default),input.valid[type=time]:not(.browser-default):focus,input.valid[type=date]:not(.browser-default),input.valid[type=date]:not(.browser-default):focus,input.valid[type=datetime]:not(.browser-default),input.valid[type=datetime]:not(.browser-default):focus,input.valid[type=datetime-local]:not(.browser-default),input.valid[type=datetime-local]:not(.browser-default):focus,input.valid[type=tel]:not(.browser-default),input.valid[type=tel]:not(.browser-default):focus,input.valid[type=number]:not(.browser-default),input.valid[type=number]:not(.browser-default):focus,input.valid[type=search]:not(.browser-default),input.valid[type=search]:not(.browser-default):focus,textarea.materialize-textarea.valid,textarea.materialize-textarea.valid:focus,.select-wrapper.valid>input.select-dropdown{border-bottom:1px solid #4CAF50;-webkit-box-shadow:0 1px 0 0 #4CAF50;box-shadow:0 1px #4caf50}input.invalid:not([type]),input.invalid:not([type]):focus,input.invalid[type=text]:not(.browser-default),input.invalid[type=text]:not(.browser-default):focus,input.invalid[type=password]:not(.browser-default),input.invalid[type=password]:not(.browser-default):focus,input.invalid[type=email]:not(.browser-default),input.invalid[type=email]:not(.browser-default):focus,input.invalid[type=url]:not(.browser-default),input.invalid[type=url]:not(.browser-default):focus,input.invalid[type=time]:not(.browser-default),input.invalid[type=time]:not(.browser-default):focus,input.invalid[type=date]:not(.browser-default),input.invalid[type=date]:not(.browser-default):focus,input.invalid[type=datetime]:not(.browser-default),input.invalid[type=datetime]:not(.browser-default):focus,input.invalid[type=datetime-local]:not(.browser-default),input.invalid[type=datetime-local]:not(.browser-default):focus,input.invalid[type=tel]:not(.browser-default),input.invalid[type=tel]:not(.browser-default):focus,input.invalid[type=number]:not(.browser-default),input.invalid[type=number]:not(.browser-default):focus,input.invalid[type=search]:not(.browser-default),input.invalid[type=search]:not(.browser-default):focus,textarea.materialize-textarea.invalid,textarea.materialize-textarea.invalid:focus,.select-wrapper.invalid>input.select-dropdown,.select-wrapper.invalid>input.select-dropdown:focus{border-bottom:1px solid #F44336;-webkit-box-shadow:0 1px 0 0 #F44336;box-shadow:0 1px #f44336}input:not([type]).valid~.helper-text[data-success],input:not([type]):focus.valid~.helper-text[data-success],input:not([type]).invalid~.helper-text[data-error],input:not([type]):focus.invalid~.helper-text[data-error],input[type=text]:not(.browser-default).valid~.helper-text[data-success],input[type=text]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=text]:not(.browser-default).invalid~.helper-text[data-error],input[type=text]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=password]:not(.browser-default).valid~.helper-text[data-success],input[type=password]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=password]:not(.browser-default).invalid~.helper-text[data-error],input[type=password]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=email]:not(.browser-default).valid~.helper-text[data-success],input[type=email]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=email]:not(.browser-default).invalid~.helper-text[data-error],input[type=email]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=url]:not(.browser-default).valid~.helper-text[data-success],input[type=url]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=url]:not(.browser-default).invalid~.helper-text[data-error],input[type=url]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=time]:not(.browser-default).valid~.helper-text[data-success],input[type=time]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=time]:not(.browser-default).invalid~.helper-text[data-error],input[type=time]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=date]:not(.browser-default).valid~.helper-text[data-success],input[type=date]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=date]:not(.browser-default).invalid~.helper-text[data-error],input[type=date]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=tel]:not(.browser-default).valid~.helper-text[data-success],input[type=tel]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=tel]:not(.browser-default).invalid~.helper-text[data-error],input[type=tel]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=number]:not(.browser-default).valid~.helper-text[data-success],input[type=number]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=number]:not(.browser-default).invalid~.helper-text[data-error],input[type=number]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=search]:not(.browser-default).valid~.helper-text[data-success],input[type=search]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=search]:not(.browser-default).invalid~.helper-text[data-error],input[type=search]:not(.browser-default):focus.invalid~.helper-text[data-error],textarea.materialize-textarea.valid~.helper-text[data-success],textarea.materialize-textarea:focus.valid~.helper-text[data-success],textarea.materialize-textarea.invalid~.helper-text[data-error],textarea.materialize-textarea:focus.invalid~.helper-text[data-error],.select-wrapper.valid .helper-text[data-success],.select-wrapper.invalid~.helper-text[data-error]{color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}input:not([type]).valid~.helper-text:after,input:not([type]):focus.valid~.helper-text:after,input[type=text]:not(.browser-default).valid~.helper-text:after,input[type=text]:not(.browser-default):focus.valid~.helper-text:after,input[type=password]:not(.browser-default).valid~.helper-text:after,input[type=password]:not(.browser-default):focus.valid~.helper-text:after,input[type=email]:not(.browser-default).valid~.helper-text:after,input[type=email]:not(.browser-default):focus.valid~.helper-text:after,input[type=url]:not(.browser-default).valid~.helper-text:after,input[type=url]:not(.browser-default):focus.valid~.helper-text:after,input[type=time]:not(.browser-default).valid~.helper-text:after,input[type=time]:not(.browser-default):focus.valid~.helper-text:after,input[type=date]:not(.browser-default).valid~.helper-text:after,input[type=date]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime]:not(.browser-default).valid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime-local]:not(.browser-default).valid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text:after,input[type=tel]:not(.browser-default).valid~.helper-text:after,input[type=tel]:not(.browser-default):focus.valid~.helper-text:after,input[type=number]:not(.browser-default).valid~.helper-text:after,input[type=number]:not(.browser-default):focus.valid~.helper-text:after,input[type=search]:not(.browser-default).valid~.helper-text:after,input[type=search]:not(.browser-default):focus.valid~.helper-text:after,textarea.materialize-textarea.valid~.helper-text:after,textarea.materialize-textarea:focus.valid~.helper-text:after,.select-wrapper.valid~.helper-text:after{content:attr(data-success);color:#4caf50}input:not([type]).invalid~.helper-text:after,input:not([type]):focus.invalid~.helper-text:after,input[type=text]:not(.browser-default).invalid~.helper-text:after,input[type=text]:not(.browser-default):focus.invalid~.helper-text:after,input[type=password]:not(.browser-default).invalid~.helper-text:after,input[type=password]:not(.browser-default):focus.invalid~.helper-text:after,input[type=email]:not(.browser-default).invalid~.helper-text:after,input[type=email]:not(.browser-default):focus.invalid~.helper-text:after,input[type=url]:not(.browser-default).invalid~.helper-text:after,input[type=url]:not(.browser-default):focus.invalid~.helper-text:after,input[type=time]:not(.browser-default).invalid~.helper-text:after,input[type=time]:not(.browser-default):focus.invalid~.helper-text:after,input[type=date]:not(.browser-default).invalid~.helper-text:after,input[type=date]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime]:not(.browser-default).invalid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default).invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text:after,input[type=tel]:not(.browser-default).invalid~.helper-text:after,input[type=tel]:not(.browser-default):focus.invalid~.helper-text:after,input[type=number]:not(.browser-default).invalid~.helper-text:after,input[type=number]:not(.browser-default):focus.invalid~.helper-text:after,input[type=search]:not(.browser-default).invalid~.helper-text:after,input[type=search]:not(.browser-default):focus.invalid~.helper-text:after,textarea.materialize-textarea.invalid~.helper-text:after,textarea.materialize-textarea:focus.invalid~.helper-text:after,.select-wrapper.invalid~.helper-text:after{content:attr(data-error);color:#f44336}input:not([type])+label:after,input[type=text]:not(.browser-default)+label:after,input[type=password]:not(.browser-default)+label:after,input[type=email]:not(.browser-default)+label:after,input[type=url]:not(.browser-default)+label:after,input[type=time]:not(.browser-default)+label:after,input[type=date]:not(.browser-default)+label:after,input[type=datetime]:not(.browser-default)+label:after,input[type=datetime-local]:not(.browser-default)+label:after,input[type=tel]:not(.browser-default)+label:after,input[type=number]:not(.browser-default)+label:after,input[type=search]:not(.browser-default)+label:after,textarea.materialize-textarea+label:after,.select-wrapper+label:after{display:block;content:"";position:absolute;top:100%;left:0;opacity:0;-webkit-transition:.2s opacity ease-out,.2s color ease-out;transition:.2s opacity ease-out,.2s color ease-out}.input-field{position:relative;margin-top:1rem;margin-bottom:1rem}.input-field.inline{display:inline-block;vertical-align:middle;margin-left:5px}.input-field.inline input,.input-field.inline .select-dropdown{margin-bottom:1rem}.input-field.col label{left:.75rem}.input-field.col .prefix~label,.input-field.col .prefix~.validate~label{width:calc(100% - 4.5rem)}.input-field>label{color:#9e9e9e;position:absolute;top:0;left:0;font-size:1rem;cursor:text;-webkit-transition:color .2s ease-out,-webkit-transform .2s ease-out;transition:color .2s ease-out,-webkit-transform .2s ease-out;transition:transform .2s ease-out,color .2s ease-out;transition:transform .2s ease-out,color .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;-webkit-transform:translateY(12px);transform:translateY(12px)}.input-field>label:not(.label-icon).active{-webkit-transform:translateY(-14px) scale(.8);transform:translateY(-14px) scale(.8);-webkit-transform-origin:0 0;transform-origin:0 0}.input-field>input[type]:-webkit-autofill:not(.browser-default)+label,.input-field>input[type=date]:not(.browser-default)+label,.input-field>input[type=time]:not(.browser-default)+label{-webkit-transform:translateY(-14px) scale(.8);transform:translateY(-14px) scale(.8);-webkit-transform-origin:0 0;transform-origin:0 0}.input-field .helper-text{position:relative;min-height:18px;display:block;font-size:12px;color:#0000008a}.input-field .helper-text:after{opacity:1;position:absolute;top:0;left:0}.input-field .prefix{position:absolute;width:3rem;font-size:2rem;-webkit-transition:color .2s;transition:color .2s;top:.5rem}.input-field .prefix.active{color:#26a69a}.input-field .prefix~input,.input-field .prefix~textarea,.input-field .prefix~label,.input-field .prefix~.validate~label,.input-field .prefix~.helper-text,.input-field .prefix~.autocomplete-content{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field .prefix~label{margin-left:3rem}@media only screen and (max-width: 992px){.input-field .prefix~input{width:86%;width:calc(100% - 3rem)}}@media only screen and (max-width: 600px){.input-field .prefix~input{width:80%;width:calc(100% - 3rem)}}.input-field input[type=search]{display:block;line-height:inherit;-webkit-transition:.3s background-color;transition:.3s background-color}.nav-wrapper .input-field input[type=search]{height:inherit;padding-left:4rem;width:calc(100% - 4rem);border:0;-webkit-box-shadow:none;box-shadow:none}.input-field input[type=search]:focus:not(.browser-default){background-color:#fff;border:0;-webkit-box-shadow:none;box-shadow:none;color:#444}.input-field input[type=search]:focus:not(.browser-default)+label i,.input-field input[type=search]:focus:not(.browser-default)~.mdi-navigation-close,.input-field input[type=search]:focus:not(.browser-default)~.material-icons{color:#444}.input-field input[type=search]+.label-icon{-webkit-transform:none;transform:none;left:1rem}.input-field input[type=search]~.mdi-navigation-close,.input-field input[type=search]~.material-icons{position:absolute;top:0;right:1rem;color:transparent;cursor:pointer;font-size:2rem;-webkit-transition:.3s color;transition:.3s color}textarea{width:100%;height:3rem;background-color:transparent}textarea.materialize-textarea{line-height:normal;overflow-y:hidden;padding:.8rem 0;resize:none;min-height:3rem;-webkit-box-sizing:border-box;box-sizing:border-box}.hiddendiv{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem;position:absolute;top:0;z-index:-1}.autocomplete-content li .highlight{color:#444}.autocomplete-content li img{height:40px;width:40px;margin:5px 15px}.character-counter{min-height:18px}[type=radio]:not(:checked),[type=radio]:checked{position:absolute;opacity:0;pointer-events:none}[type=radio]:not(:checked)+span,[type=radio]:checked+span{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;-webkit-transition:.28s ease;transition:.28s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[type=radio]+span:before,[type=radio]+span:after{content:"";position:absolute;left:0;top:0;margin:4px;width:16px;height:16px;z-index:0;-webkit-transition:.28s ease;transition:.28s ease}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after,[type=radio]:checked+span:before,[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border-radius:50%}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after{border:2px solid #5a5a5a}[type=radio]:not(:checked)+span:after{-webkit-transform:scale(0);transform:scale(0)}[type=radio]:checked+span:before{border:2px solid transparent}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border:2px solid #26a69a}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:after{background-color:#26a69a}[type=radio]:checked+span:after{-webkit-transform:scale(1.02);transform:scale(1.02)}[type=radio].with-gap:checked+span:after{-webkit-transform:scale(.5);transform:scale(.5)}[type=radio].tabbed:focus+span:before{-webkit-box-shadow:0 0 0 10px rgba(0,0,0,.1);box-shadow:0 0 0 10px #0000001a}[type=radio].with-gap:disabled:checked+span:before{border:2px solid rgba(0,0,0,.42)}[type=radio].with-gap:disabled:checked+span:after{border:none;background-color:#0000006b}[type=radio]:disabled:not(:checked)+span:before,[type=radio]:disabled:checked+span:before{background-color:transparent;border-color:#0000006b}[type=radio]:disabled+span{color:#0000006b}[type=radio]:disabled:not(:checked)+span:before{border-color:#0000006b}[type=radio]:disabled:checked+span:after{background-color:#0000006b;border-color:#949494}[type=checkbox]:not(:checked),[type=checkbox]:checked{position:absolute;opacity:0;pointer-events:none}[type=checkbox]+span:not(.lever){position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[type=checkbox]+span:not(.lever):before,[type=checkbox]:not(.filled-in)+span:not(.lever):after{content:"";position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #5a5a5a;border-radius:1px;margin-top:3px;-webkit-transition:.2s;transition:.2s}[type=checkbox]:not(.filled-in)+span:not(.lever):after{border:0;-webkit-transform:scale(0);transform:scale(0)}[type=checkbox]:not(:checked):disabled+span:not(.lever):before{border:none;background-color:#0000006b}[type=checkbox].tabbed:focus+span:not(.lever):after{-webkit-transform:scale(1);transform:scale(1);border:0;border-radius:50%;-webkit-box-shadow:0 0 0 10px rgba(0,0,0,.1);box-shadow:0 0 0 10px #0000001a;background-color:#0000001a}[type=checkbox]:checked+span:not(.lever):before{top:-4px;left:-5px;width:12px;height:22px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #26a69a;border-bottom:2px solid #26a69a;-webkit-transform:rotate(40deg);transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:checked:disabled+span:before{border-right:2px solid rgba(0,0,0,.42);border-bottom:2px solid rgba(0,0,0,.42)}[type=checkbox]:indeterminate+span:not(.lever):before{top:-11px;left:-12px;width:10px;height:22px;border-top:none;border-left:none;border-right:2px solid #26a69a;border-bottom:none;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:indeterminate:disabled+span:not(.lever):before{border-right:2px solid rgba(0,0,0,.42);background-color:transparent}[type=checkbox].filled-in+span:not(.lever):after{border-radius:2px}[type=checkbox].filled-in+span:not(.lever):before,[type=checkbox].filled-in+span:not(.lever):after{content:"";left:0;position:absolute;-webkit-transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}[type=checkbox].filled-in:not(:checked)+span:not(.lever):before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;-webkit-transform:rotateZ(37deg);transform:rotate(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox].filled-in:not(:checked)+span:not(.lever):after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0px;z-index:0}[type=checkbox].filled-in:checked+span:not(.lever):before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;-webkit-transform:rotateZ(37deg);transform:rotate(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox].filled-in:checked+span:not(.lever):after{top:0;width:20px;height:20px;border:2px solid #26a69a;background-color:#26a69a;z-index:0}[type=checkbox].filled-in.tabbed:focus+span:not(.lever):after{border-radius:2px;border-color:#5a5a5a;background-color:#0000001a}[type=checkbox].filled-in.tabbed:checked:focus+span:not(.lever):after{border-radius:2px;background-color:#26a69a;border-color:#26a69a}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):before{background-color:transparent;border:2px solid transparent}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):after{border-color:transparent;background-color:#949494}[type=checkbox].filled-in:disabled:checked+span:not(.lever):before{background-color:transparent}[type=checkbox].filled-in:disabled:checked+span:not(.lever):after{background-color:#949494;border-color:#949494}.switch,.switch *{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.switch label{cursor:pointer}.switch label input[type=checkbox]{opacity:0;width:0;height:0}.switch label input[type=checkbox]:checked+.lever{background-color:#84c7c1}.switch label input[type=checkbox]:checked+.lever:before,.switch label input[type=checkbox]:checked+.lever:after{left:18px}.switch label input[type=checkbox]:checked+.lever:after{background-color:#26a69a}.switch label .lever{content:"";display:inline-block;position:relative;width:36px;height:14px;background-color:#00000061;border-radius:15px;-webkit-transition:background .3s ease;transition:background .3s ease;vertical-align:middle;margin:0 16px}.switch label .lever:before,.switch label .lever:after{content:"";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;-webkit-transition:left .3s ease,background .3s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;transition:left .3s ease,background .3s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease}.switch label .lever:before{background-color:#26a69a26}.switch label .lever:after{background-color:#f1f1f1;-webkit-box-shadow:0px 3px 1px -2px rgba(0,0,0,.2),0px 2px 2px 0px rgba(0,0,0,.14),0px 1px 5px 0px rgba(0,0,0,.12);box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}input[type=checkbox]:checked:not(:disabled)~.lever:active:before,input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever:before{-webkit-transform:scale(2.4);transform:scale(2.4);background-color:#26a69a26}input[type=checkbox]:not(:disabled)~.lever:active:before,input[type=checkbox]:not(:disabled).tabbed:focus~.lever:before{-webkit-transform:scale(2.4);transform:scale(2.4);background-color:#00000014}.switch input[type=checkbox][disabled]+.lever{cursor:default;background-color:#0000001f}.switch label input[type=checkbox][disabled]+.lever:after,.switch label input[type=checkbox][disabled]:checked+.lever:after{background-color:#949494}select{display:none}select.browser-default{display:block}select{background-color:#ffffffe6;width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper.valid+label,.select-wrapper.invalid+label{width:100%;pointer-events:none}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;outline:none;height:3rem;line-height:3rem;width:100%;font-size:16px;margin:0 0 8px;padding:0;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}.select-wrapper input.select-dropdown:focus{border-bottom:1px solid #26a69a}.select-wrapper .caret{position:absolute;right:0;top:0;bottom:0;margin:auto 0;z-index:0;fill:#000000de}.select-wrapper+label{position:absolute;top:-26px;font-size:.8rem}select:disabled{color:#0000006b}.select-wrapper.disabled+label{color:#0000006b}.select-wrapper.disabled .caret{fill:#0000006b}.select-wrapper input.select-dropdown:disabled{color:#0000006b;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select-wrapper i{color:#0000004d}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:#0000004d;background-color:transparent}body.keyboard-focused .select-dropdown.dropdown-content li:focus{background-color:#00000014}.select-dropdown.dropdown-content li:hover{background-color:#00000014}.select-dropdown.dropdown-content li.selected{background-color:#00000008}.prefix~.select-wrapper{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.prefix~label{margin-left:3rem}.select-dropdown li img{height:40px;width:40px;margin:5px 15px;float:right}.select-dropdown li.optgroup{border-top:1px solid #eee}.select-dropdown li.optgroup.selected>span{color:#000000b3}.select-dropdown li.optgroup>span{color:#0006}.select-dropdown li.optgroup~li.optgroup-option{padding-left:1rem}.file-field{position:relative}.file-field .file-path-wrapper{overflow:hidden;padding-left:10px}.file-field input.file-path{width:100%}.file-field .btn,.file-field .btn-large,.file-field .btn-small{float:left;height:3rem;line-height:3rem}.file-field span{cursor:pointer}.file-field input[type=file]{position:absolute;top:0;right:0;left:0;bottom:0;width:100%;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.file-field input[type=file]::-webkit-file-upload-button{display:none}.range-field{position:relative}input[type=range],input[type=range]+.thumb{cursor:pointer}input[type=range]{position:relative;background-color:transparent;border:none;outline:none;width:100%;margin:15px 0;padding:0}input[type=range]:focus{outline:none}input[type=range]+.thumb{position:absolute;top:10px;left:0;border:none;height:0;width:0;border-radius:50%;background-color:#26a69a;margin-left:7px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#26a69a;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}input[type=range]{-webkit-appearance:none}input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-webkit-slider-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;-webkit-appearance:none;background-color:#26a69a;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0}.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb{-webkit-box-shadow:0 0 0 10px rgba(38,166,154,.26);box-shadow:0 0 0 10px #26a69a42}input[type=range]{border:1px solid white}input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-moz-focus-inner{border:0}input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;margin-top:-5px}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb{box-shadow:0 0 0 10px #26a69a42}input[type=range]::-ms-track{height:3px;background:transparent;border-color:transparent;border-width:6px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#777}input[type=range]::-ms-fill-upper{background:#ddd}input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s}.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb{box-shadow:0 0 0 10px #26a69a42}.table-of-contents.fixed{position:fixed}.table-of-contents li{padding:2px 0}.table-of-contents a{font-weight:300;color:#757575;padding-left:16px;height:1.5rem;line-height:1.5rem;letter-spacing:.4;display:inline-block}.table-of-contents a:hover{color:#a8a8a8;padding-left:15px;border-left:1px solid #ee6e73}.table-of-contents a.active{font-weight:500;padding-left:14px;border-left:2px solid #ee6e73}.sidenav{position:fixed;width:300px;left:0;top:0;margin:0;-webkit-transform:translateX(-100%);transform:translate(-100%);height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;background-color:#fff;z-index:999;overflow-y:auto;will-change:transform;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateX(-105%);transform:translate(-105%)}.sidenav.right-aligned{right:0;-webkit-transform:translateX(105%);transform:translate(105%);left:auto;-webkit-transform:translateX(100%);transform:translate(100%)}.sidenav .collapsible{margin:0}.sidenav li{float:none;line-height:48px}.sidenav li.active{background-color:#0000000d}.sidenav li>a{color:#000000de;display:block;font-size:14px;font-weight:500;height:48px;line-height:48px;padding:0 32px}.sidenav li>a:hover{background-color:#0000000d}.sidenav li>a.btn,.sidenav li>a.btn-large,.sidenav li>a.btn-small,.sidenav li>a.btn-flat,.sidenav li>a.btn-floating{margin:10px 15px}.sidenav li>a.btn,.sidenav li>a.btn-large,.sidenav li>a.btn-small,.sidenav li>a.btn-floating{color:#fff}.sidenav li>a.btn-flat{color:#343434}.sidenav li>a.btn:hover,.sidenav li>a.btn-large:hover,.sidenav li>a.btn-small:hover{background-color:#2bbbad}.sidenav li>a.btn-floating:hover{background-color:#26a69a}.sidenav li>a>i,.sidenav li>a>[class^=mdi-],.sidenav li>a li>a>[class*=mdi-],.sidenav li>a>i.material-icons{float:left;height:48px;line-height:48px;margin:0 32px 0 0;width:24px;color:#0000008a}.sidenav .divider{margin:8px 0 0}.sidenav .subheader{cursor:initial;pointer-events:none;color:#0000008a;font-size:14px;font-weight:500;line-height:48px}.sidenav .subheader:hover{background-color:transparent}.sidenav .user-view{position:relative;padding:32px 32px 0;margin-bottom:8px}.sidenav .user-view>a{height:auto;padding:0}.sidenav .user-view>a:hover{background-color:transparent}.sidenav .user-view .background{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.sidenav .user-view .circle,.sidenav .user-view .name,.sidenav .user-view .email{display:block}.sidenav .user-view .circle{height:64px;width:64px}.sidenav .user-view .name,.sidenav .user-view .email{font-size:14px;line-height:24px}.sidenav .user-view .name{margin-top:16px;font-weight:500}.sidenav .user-view .email{padding-bottom:16px;font-weight:400}.drag-target{height:100%;width:10px;position:fixed;top:0;z-index:998}.drag-target.right-aligned{right:0}.sidenav.sidenav-fixed{left:0;-webkit-transform:translateX(0);transform:translate(0);position:fixed}.sidenav.sidenav-fixed.right-aligned{right:0;left:auto}@media only screen and (max-width: 992px){.sidenav.sidenav-fixed{-webkit-transform:translateX(-105%);transform:translate(-105%)}.sidenav.sidenav-fixed.right-aligned{-webkit-transform:translateX(105%);transform:translate(105%)}.sidenav>a{padding:0 16px}.sidenav .user-view{padding:16px 16px 0}}.sidenav .collapsible-body>ul:not(.collapsible)>li.active,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active{background-color:#ee6e73}.sidenav .collapsible-body>ul:not(.collapsible)>li.active a,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active a{color:#fff}.sidenav .collapsible-body{padding:0}.sidenav-overlay{position:fixed;top:0;left:0;right:0;opacity:0;height:120vh;background-color:#00000080;z-index:997;display:none}.preloader-wrapper{display:inline-block;position:relative;width:50px;height:50px}.preloader-wrapper.small{width:36px;height:36px}.preloader-wrapper.big{width:64px;height:64px}.preloader-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes container-rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-layer{position:absolute;width:100%;height:100%;opacity:0;border-color:#26a69a}.spinner-blue,.spinner-blue-only{border-color:#4285f4}.spinner-red,.spinner-red-only{border-color:#db4437}.spinner-yellow,.spinner-yellow-only{border-color:#f4b400}.spinner-green,.spinner-green-only{border-color:#0f9d58}.active .spinner-layer.spinner-blue{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-red{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-yellow{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-green{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer,.active .spinner-layer.spinner-blue-only,.active .spinner-layer.spinner-red-only,.active .spinner-layer.spinner-yellow-only,.active .spinner-layer.spinner-green-only{opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg)}}@keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@-webkit-keyframes blue-fade-in-out{0%{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}to{opacity:1}}@keyframes blue-fade-in-out{0%{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}to{opacity:1}}@-webkit-keyframes red-fade-in-out{0%{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@keyframes red-fade-in-out{0%{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@-webkit-keyframes yellow-fade-in-out{0%{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@keyframes yellow-fade-in-out{0%{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@-webkit-keyframes green-fade-in-out{0%{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}to{opacity:0}}@keyframes green-fade-in-out{0%{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}to{opacity:0}}.gap-patch{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle{width:1000%;left:-450%}.circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle{left:0;border-right-color:transparent!important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle{left:-100%;border-left-color:transparent!important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle{-webkit-animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}.active .circle-clipper.right .circle{-webkit-animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes left-spin{0%{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{0%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg);transform:rotate(130deg)}}@-webkit-keyframes right-spin{0%{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{0%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}}#spinnerContainer.cooldown{-webkit-animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1);animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1)}@-webkit-keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}.slider{position:relative;height:400px;width:100%}.slider.fullscreen{height:100%;width:100%;position:absolute;top:0;left:0;right:0;bottom:0}.slider.fullscreen ul.slides{height:100%}.slider.fullscreen ul.indicators{z-index:2;bottom:30px}.slider .slides{background-color:#9e9e9e;margin:0;height:400px}.slider .slides li{opacity:0;position:absolute;top:0;left:0;z-index:1;width:100%;height:inherit;overflow:hidden}.slider .slides li img{height:100%;width:100%;background-size:cover;background-position:center}.slider .slides li .caption{color:#fff;position:absolute;top:15%;left:15%;width:70%;opacity:0}.slider .slides li .caption p{color:#e0e0e0}.slider .slides li.active{z-index:2}.slider .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.slider .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:16px;width:16px;margin:0 12px;background-color:#e0e0e0;-webkit-transition:background-color .3s;transition:background-color .3s;border-radius:50%}.slider .indicators .indicator-item.active{background-color:#4caf50}.carousel{overflow:hidden;position:relative;width:100%;height:400px;-webkit-perspective:500px;perspective:500px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform-origin:0% 50%;transform-origin:0% 50%}.carousel.carousel-slider{top:0;left:0}.carousel.carousel-slider .carousel-fixed-item{position:absolute;left:0;right:0;bottom:20px;z-index:1}.carousel.carousel-slider .carousel-fixed-item.with-indicators{bottom:68px}.carousel.carousel-slider .carousel-item{width:100%;height:100%;min-height:400px;position:absolute;top:0;left:0}.carousel.carousel-slider .carousel-item h2{font-size:24px;font-weight:500;line-height:32px}.carousel.carousel-slider .carousel-item p{font-size:15px}.carousel .carousel-item{visibility:hidden;width:200px;height:200px;position:absolute;top:0;left:0}.carousel .carousel-item>img{width:100%}.carousel .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.carousel .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:8px;width:8px;margin:24px 4px;background-color:#ffffff80;-webkit-transition:background-color .3s;transition:background-color .3s;border-radius:50%}.carousel .indicators .indicator-item.active{background-color:#fff}.carousel.scrolling .carousel-item .materialboxed,.carousel .carousel-item:not(.active) .materialboxed{pointer-events:none}.tap-target-wrapper{width:800px;height:800px;position:fixed;z-index:1000;visibility:hidden;-webkit-transition:visibility 0s .3s;transition:visibility 0s .3s}.tap-target-wrapper.open{visibility:visible;-webkit-transition:visibility 0s;transition:visibility 0s}.tap-target-wrapper.open .tap-target{-webkit-transform:scale(1);transform:scale(1);opacity:.95;-webkit-transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1)}.tap-target-wrapper.open .tap-target-wave:before{-webkit-transform:scale(1);transform:scale(1)}.tap-target-wrapper.open .tap-target-wave:after{visibility:visible;-webkit-animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;-webkit-transition:opacity .3s,visibility 0s 1s,-webkit-transform .3s;transition:opacity .3s,visibility 0s 1s,-webkit-transform .3s;transition:opacity .3s,transform .3s,visibility 0s 1s;transition:opacity .3s,transform .3s,visibility 0s 1s,-webkit-transform .3s}.tap-target{position:absolute;font-size:1rem;border-radius:50%;background-color:#ee6e73;-webkit-box-shadow:0 20px 20px 0 rgba(0,0,0,.14),0 10px 50px 0 rgba(0,0,0,.12),0 30px 10px -20px rgba(0,0,0,.2);box-shadow:0 20px 20px #00000024,0 10px 50px #0000001f,0 30px 10px -20px #0003;width:100%;height:100%;opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1);transition:transform .3s cubic-bezier(.42,0,.58,1),opacity .3s cubic-bezier(.42,0,.58,1),-webkit-transform .3s cubic-bezier(.42,0,.58,1)}.tap-target-content{position:relative;display:table-cell}.tap-target-wave{position:absolute;border-radius:50%;z-index:10001}.tap-target-wave:before,.tap-target-wave:after{content:"";display:block;position:absolute;width:100%;height:100%;border-radius:50%;background-color:#fff}.tap-target-wave:before{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.tap-target-wave:after{visibility:hidden;-webkit-transition:opacity .3s,visibility 0s,-webkit-transform .3s;transition:opacity .3s,visibility 0s,-webkit-transform .3s;transition:opacity .3s,transform .3s,visibility 0s;transition:opacity .3s,transform .3s,visibility 0s,-webkit-transform .3s;z-index:-1}.tap-target-origin{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10002;position:absolute!important}.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small),.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small):hover{background:none}@media only screen and (max-width: 600px){.tap-target,.tap-target-wrapper{width:600px;height:600px}}.pulse{overflow:visible;position:relative}.pulse:before{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;background-color:inherit;border-radius:inherit;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-webkit-animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;animation:pulse-animation 1s cubic-bezier(.24,0,.38,1) infinite;z-index:-1}@-webkit-keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}@keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}.datepicker-modal{max-width:325px;min-width:300px;max-height:none}.datepicker-container.modal-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0}.datepicker-controls{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:280px;margin:0 auto}.datepicker-controls .selects-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.datepicker-controls .select-wrapper input{border-bottom:none;text-align:center;margin:0}.datepicker-controls .select-wrapper input:focus{border-bottom:none}.datepicker-controls .select-wrapper .caret{display:none}.datepicker-controls .select-year input{width:50px}.datepicker-controls .select-month input{width:70px}.month-prev,.month-next{margin-top:4px;cursor:pointer;background-color:transparent;border:none}.datepicker-date-display{-webkit-box-flex:1;-webkit-flex:1 auto;-ms-flex:1 auto;flex:1 auto;background-color:#26a69a;color:#fff;padding:20px 22px;font-weight:500}.datepicker-date-display .year-text{display:block;font-size:1.5rem;line-height:25px;color:#ffffffb3}.datepicker-date-display .date-text{display:block;font-size:2.8rem;line-height:47px;font-weight:500}.datepicker-calendar-container{-webkit-box-flex:2.5;-webkit-flex:2.5 auto;-ms-flex:2.5 auto;flex:2.5 auto}.datepicker-table{width:280px;font-size:1rem;margin:0 auto}.datepicker-table thead{border-bottom:none}.datepicker-table th{padding:10px 5px;text-align:center}.datepicker-table tr{border:none}.datepicker-table abbr{text-decoration:none;color:#999}.datepicker-table td{border-radius:50%;padding:0}.datepicker-table td.is-today{color:#26a69a}.datepicker-table td.is-selected{background-color:#26a69a;color:#fff}.datepicker-table td.is-outside-current-month,.datepicker-table td.is-disabled{color:#0000004d;pointer-events:none}.datepicker-day-button{background-color:transparent;border:none;line-height:38px;display:block;width:100%;border-radius:50%;padding:0 5px;cursor:pointer;color:inherit}.datepicker-day-button:focus{background-color:#2ba19640}.datepicker-footer{width:280px;margin:0 auto;padding-bottom:5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.datepicker-cancel,.datepicker-clear,.datepicker-today,.datepicker-done{color:#26a69a;padding:0 1rem}.datepicker-clear{color:#f44336}@media only screen and (min-width: 601px){.datepicker-modal{max-width:625px}.datepicker-container.modal-content{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.datepicker-date-display{-webkit-box-flex:0;-webkit-flex:0 1 270px;-ms-flex:0 1 270px;flex:0 1 270px}.datepicker-controls,.datepicker-table,.datepicker-footer{width:320px}.datepicker-day-button{line-height:44px}}.timepicker-modal{max-width:325px;max-height:none}.timepicker-container.modal-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0}.text-primary{color:#fff}.timepicker-digital-display{-webkit-box-flex:1;-webkit-flex:1 auto;-ms-flex:1 auto;flex:1 auto;background-color:#26a69a;padding:10px;font-weight:300}.timepicker-text-container{font-size:4rem;font-weight:700;text-align:center;color:#fff9;font-weight:400;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.timepicker-span-hours,.timepicker-span-minutes,.timepicker-span-am-pm div{cursor:pointer}.timepicker-span-hours{margin-right:3px}.timepicker-span-minutes{margin-left:3px}.timepicker-display-am-pm{font-size:1.3rem;position:absolute;right:1rem;bottom:1rem;font-weight:400}.timepicker-analog-display{-webkit-box-flex:2.5;-webkit-flex:2.5 auto;-ms-flex:2.5 auto;flex:2.5 auto}.timepicker-plate{background-color:#eee;border-radius:50%;width:270px;height:270px;overflow:visible;position:relative;margin:25px auto 5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.timepicker-canvas,.timepicker-dial{position:absolute;left:0;right:0;top:0;bottom:0}.timepicker-minutes{visibility:hidden}.timepicker-tick{border-radius:50%;color:#000000de;line-height:40px;text-align:center;width:40px;height:40px;position:absolute;cursor:pointer;font-size:15px}.timepicker-tick.active,.timepicker-tick:hover{background-color:#26a69a40}.timepicker-dial{-webkit-transition:opacity .35s,-webkit-transform .35s;transition:opacity .35s,-webkit-transform .35s;transition:transform .35s,opacity .35s;transition:transform .35s,opacity .35s,-webkit-transform .35s}.timepicker-dial-out{opacity:0}.timepicker-dial-out.timepicker-hours{-webkit-transform:scale(1.1,1.1);transform:scale(1.1)}.timepicker-dial-out.timepicker-minutes{-webkit-transform:scale(.8,.8);transform:scale(.8)}.timepicker-canvas{-webkit-transition:opacity 175ms;transition:opacity 175ms}.timepicker-canvas line{stroke:#26a69a;stroke-width:4;stroke-linecap:round}.timepicker-canvas-out{opacity:.25}.timepicker-canvas-bearing,.timepicker-canvas-bg{stroke:none;fill:#26a69a}.timepicker-footer{margin:0 auto;padding:5px 1rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.timepicker-clear{color:#f44336}.timepicker-close{color:#26a69a}.timepicker-clear,.timepicker-close{padding:0 20px}@media only screen and (min-width: 601px){.timepicker-modal{max-width:600px}.timepicker-container.modal-content{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.timepicker-text-container{top:32%}.timepicker-display-am-pm{position:relative;right:auto;bottom:auto;text-align:center;margin-top:1.2rem}}
`,_s=t=>{const e=[];t!==document&&(e.push(we(Go.cssText,"",t,!0)),e.push(we(Yo.cssText,"",t,!0)),e.push(we(Pa.cssText,"",t,!0)),e.push(we(Ko.cssText,"",t,!0)),e.push(we(Xo.cssText,"",t,!0)),e.push(we(ys.toString(),"CSSImport end",t)),e.push(we(ks.toString(),"CSSImport end",t)))},Ss=_s;Ss(document);export{ii as D,Be as F,N as L,ai as P,$s as T,Ne as U,S as _,he as a,ke as b,w as c,ri as d,qt as e,ts as f,Yo as g,b as h,Go as i,we as j,J as k,_i as l,Si as m,z as n,Re as r,Te as s,La as t,C as u,T as y};
