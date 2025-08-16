import{a as u,S as d,i as l}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const g="51718020-504e1b86ae47f9489a580fda2",h="https://pixabay.com/api/";u.defaults.baseURL=h;function y(i,o=1,s=40){return u.get("",{params:{key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s}}).then(t=>t.data).catch(t=>{throw t})}const p=document.getElementById("gallery"),n=document.getElementById("loader"),L=new d(".gallery a",{captionsData:"alt",captionDelay:200});function b(i){const o=i.map(({webformatURL:s,largeImageURL:t,tags:e,likes:r,views:a,comments:f,downloads:m})=>`
      <li class="card">
        <a href="${t}">
          <img src="${s}" alt="${D(e)}" loading="lazy" />
        </a>
        <div class="meta">
          <span>Likes: ${r}</span>
          <span>Views: ${a}</span>
          <span>Comments: ${f}</span>
          <span>Downloads: ${m}</span>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",o),L.refresh()}function A(){p.innerHTML=""}function v(){n.classList.add("is-visible"),n.setAttribute("aria-hidden","false")}function w(){n.classList.remove("is-visible"),n.setAttribute("aria-hidden","true")}function D(i=""){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const c=document.getElementById("search-form");c.addEventListener("submit",i=>{i.preventDefault();const s=(new FormData(c).get("search-text")||"").trim();if(!s){l.warning({title:"Упс…",message:"Введіть пошукове слово.",timeout:2500,position:"topRight"});return}A(),v(),y(s).then(t=>{const e=Array.isArray(t==null?void 0:t.hits)?t.hits:[];if(e.length===0){l.info({title:"Немає збігів",message:"Sorry, there are no images matching your search query. Please try again!",timeout:3e3,position:"topRight"});return}b(e)}).catch(()=>{l.error({title:"Помилка",message:"Сталася помилка під час запиту. Спробуйте пізніше.",timeout:3e3,position:"topRight"})}).finally(()=>{w()})});
//# sourceMappingURL=index.js.map
