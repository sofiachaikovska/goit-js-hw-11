import{S as l,i}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();c();const u={captionsData:"alt",captionsDelay:250},d=new l(".image-card",u);document.querySelector("form").addEventListener("submit",function(r){r.preventDefault();const s=document.querySelector("input").value.trim();if(s===""){i.error({title:"Error",message:"Please enter a search query."});return}y(),f(s).then(t=>{c(),t.hits.length>0?(m(t.hits),d.refresh()):(g(),p())}).catch(t=>{c(),console.error("Error fetching images:",t.message),i.error({title:"Error",message:"An error occurred while fetching images. Please try again."})})});function f(r){const t=`https://pixabay.com/api/?key=42011600-6d993b5d4f0ba2a9af1a5ffd0&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true`;return fetch(t).then(n=>{if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return n.json()})}function m(r){const s=document.querySelector(".gallery");s.innerHTML="";const t=document.createElement("ul");t.className="image-list";const n=r.map(e=>`
    <li class="image-item">
      <a href="${e.largeImageURL}" class="image-card">
        <div class="image-container">
          <img src="${e.webformatURL}" alt="${e.tags}">
        </div>
        <div class="image-info">
          <span>Likes: ${e.likes}</span>
          <span>Views: ${e.views}</span>
          <span>Comments: ${e.comments}</span>
          <span>Downloads: ${e.downloads}</span>
        </div>
      </a>
    </li>
  `).join("");t.innerHTML=n,s.appendChild(t)}function p(){const r=document.querySelector(".gallery");r.innerHTML=""}function y(){const r=document.querySelector(".loader");r.style.display="block"}function c(){const r=document.querySelector(".loader");r.style.display="none"}function g(){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
