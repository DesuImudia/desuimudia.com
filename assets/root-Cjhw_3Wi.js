import{e as y,r as x,j as d,w,f as b,O as j,h as N,i as _,M as E,k as M,S as $,l as H}from"./chunk-EF7DTUVF-DF5xEXbk.js";import{c as k,u as C}from"./compiler-runtime-CoLkQtXb.js";import{c as R}from"./clsx-B-dksMZM.js";const L="/assets/favicon-C1ktqRuF.png";function T(t){function e(n,c){const a=t[c];if(!a)throw new Error(`Unknown client hint: ${typeof c=="string"?c:"Unknown"}`);const l=n.split(";").map(s=>s.trim()).find(s=>s.startsWith(a.cookieName+"="))?.split("=")[1];return l?decodeURIComponent(l):null}function o(n){const c=typeof document<"u"?document.cookie:typeof n<"u"?n.headers.get("Cookie")??"":"";return Object.entries(t).reduce((a,[l,s])=>{const r=l;return"transform"in s?a[r]=s.transform(e(c,r)??s.fallback):a[r]=e(c,r)??s.fallback,a},{})}function i(){return`
// This block of code allows us to check if the client hints have changed and
// force a reload of the page with updated hints if they have so you don't get
// a flash of incorrect content.
function checkClientHints() {
	if (!navigator.cookieEnabled) return;

	// set a short-lived cookie to make sure we can set cookies
	document.cookie = "canSetCookies=1; Max-Age=60; SameSite=Lax; path=/";
	const canSetCookies = document.cookie.includes("canSetCookies=1");
	document.cookie = "canSetCookies=; Max-Age=-1; path=/";
	if (!canSetCookies) return;

	const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
		const [key, value] = cur.split('=');
		acc[key] = value;
		return acc;
	}, {});

	let cookieChanged = false;
	const hints = [
	${Object.values(t).map(n=>{const c=JSON.stringify(n.cookieName);return`{ name: ${c}, actual: String(${n.getValueCode}), value: cookies[${c}] != null ? cookies[${c}] : encodeURIComponent("${n.fallback}") }`}).join(`,
`)}
	];
	for (const hint of hints) {
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + '; Max-Age=31536000; SameSite=Lax; path=/';
		if (decodeURIComponent(hint.value) !== hint.actual) {
			cookieChanged = true;
		}
	}
	if (cookieChanged) {
		// Hide the page content immediately to prevent visual flicker
		const style = document.createElement('style');
		style.textContent = 'html { visibility: hidden !important; }';
		document.head.appendChild(style);

		// Trigger the reload
		window.location.reload();
	}
}

checkClientHints();
`}return{getHints:o,getClientHintCheckScript:i}}const v={cookieName:"CH-prefers-color-scheme",getValueCode:"window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'",fallback:"light",transform(t){return t==="dark"?"dark":"light"}};function U(t,e=v.cookieName){const o=window.matchMedia("(prefers-color-scheme: dark)");function i(){const n=o.matches?"dark":"light";document.cookie=`${e}=${n}; Max-Age=31536000; SameSite=Lax; Path=/`,t(n)}return o.addEventListener("change",i),function(){o.removeEventListener("change",i)}}const S={cookieName:"CH-reduced-motion",getValueCode:"window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'no-preference'",fallback:"no-preference",transform(t){return t==="reduce"?"reduce":"no-preference"}};function I(t,e=S.cookieName){const o=window.matchMedia("(prefers-reduced-motion: reduce)");function i(){const n=o.matches?"reduce":"no-preference";document.cookie=`${e}=${n}; Max-Age=31536000; SameSite=Lax; Path=/`,t(n)}return o.addEventListener("change",i),function(){o.removeEventListener("change",i)}}const O={cookieName:"CH-time-zone",getValueCode:"Intl.DateTimeFormat().resolvedOptions().timeZone",fallback:"UTC"},{getClientHintCheckScript:A}=T({theme:v,timeZone:O,reducedMotion:S});function V(t){const e=k.c(9),{nonce:o}=t,{revalidate:i}=y();let n,c;e[0]!==i?(n=()=>U(()=>i()),c=[i],e[0]=i,e[1]=n,e[2]=c):(n=e[1],c=e[2]),x.useEffect(n,c);let a,l;e[3]!==i?(a=()=>I(()=>i()),l=[i],e[3]=i,e[4]=a,e[5]=l):(a=e[4],l=e[5]),x.useEffect(a,l);let s;e[6]===Symbol.for("react.memo_cache_sentinel")?(s={__html:A()},e[6]=s):s=e[6];let r;return e[7]!==o?(r=d.jsx("script",{nonce:o,dangerouslySetInnerHTML:s}),e[7]=o,e[8]=r):r=e[8],r}const P="/assets/tailwind-Ci6M6saY.css",W=()=>[{rel:"stylesheet",href:P},{rel:"icon",href:L,type:"image/png"}],Z={i18n:"common"},z=w(function(){const e=k.c(2);let o;e[0]===Symbol.for("react.memo_cache_sentinel")?(o={NODE_ENV:"production"},e[0]=o):o=e[0];const i=o;let n;return e[1]===Symbol.for("react.memo_cache_sentinel")?(n=d.jsx(B,{clientEnv:i,children:d.jsx(j,{})}),e[1]=n):n=e[1],n});function B(t){const e=k.c(16),{children:o,clientEnv:i}=t,{i18n:n}=C();let c;e[0]===Symbol.for("react.memo_cache_sentinel")?(c=R("overflow-y-auto overflow-x-hidden","light"),e[0]=c):c=e[0];const a=n.language;let l;e[1]!==n?(l=n.dir(),e[1]=n,e[2]=l):l=e[2];let s,r;e[3]===Symbol.for("react.memo_cache_sentinel")?(s={colorScheme:"light"},r=d.jsxs("head",{children:[d.jsx(V,{}),d.jsx("meta",{charSet:"utf-8"}),d.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),d.jsx(E,{}),d.jsx(M,{})]}),e[3]=s,e[4]=r):(s=e[3],r=e[4]);let g;e[5]===Symbol.for("react.memo_cache_sentinel")?(g=d.jsx($,{}),e[5]=g):g=e[5];const h=`window.env = ${JSON.stringify(i??{})}`;let m;e[6]!==h?(m=d.jsx("script",{dangerouslySetInnerHTML:{__html:h}}),e[6]=h,e[7]=m):m=e[7];let f;e[8]===Symbol.for("react.memo_cache_sentinel")?(f=d.jsx(H,{}),e[8]=f):f=e[8];let u;e[9]!==o||e[10]!==m?(u=d.jsxs("body",{className:"h-full w-full",children:[o,g,m,f]}),e[9]=o,e[10]=m,e[11]=u):u=e[11];let p;return e[12]!==n.language||e[13]!==u||e[14]!==l?(p=d.jsxs("html",{suppressHydrationWarning:!0,className:c,lang:a,dir:l,style:s,children:[r,u]}),e[12]=n.language,e[13]=u,e[14]=l,e[15]=p):p=e[15],p}const Y=b(()=>{const t=k.c(19),e=N(),{t:o}=C();let i;t[0]!==e?(i=()=>{if(!_(e))return"500";switch(e.status){case 200:return"200";case 403:return"403";case 404:return"404";default:return"500"}},t[0]=e,t[1]=i):i=t[1];const c=i();let a;t[2]!==c?(a=d.jsx("p",{className:"font-mono text-sm text-gold mb-4",children:c}),t[2]=c,t[3]=a):a=t[3];const l=`error.${c}.title`;let s;t[4]!==o||t[5]!==l?(s=o(l),t[4]=o,t[5]=l,t[6]=s):s=t[6];let r;t[7]!==s?(r=d.jsx("h1",{className:"font-display text-4xl text-foreground mb-3",children:s}),t[7]=s,t[8]=r):r=t[8];const g=`error.${c}.description`;let h;t[9]!==o||t[10]!==g?(h=o(g),t[9]=o,t[10]=g,t[11]=h):h=t[11];let m;t[12]!==h?(m=d.jsx("p",{className:"text-muted-foreground",children:h}),t[12]=h,t[13]=m):m=t[13];let f;t[14]===Symbol.for("react.memo_cache_sentinel")?(f=d.jsx("a",{href:"/",className:"mt-8 inline-block text-sm text-gold hover:text-gold-light transition-colors",children:"← Back home"}),t[14]=f):f=t[14];let u;return t[15]!==a||t[16]!==r||t[17]!==m?(u=d.jsx("div",{className:"relative flex h-full min-h-screen w-screen items-center justify-center bg-background",children:d.jsxs("div",{className:"text-center",children:[a,r,m,f]})}),t[15]=a,t[16]=r,t[17]=m,t[18]=u):u=t[18],u});export{Y as ErrorBoundary,z as default,Z as handle,W as links};
