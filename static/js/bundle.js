!function(){"use strict";function e(e,t,l){e.forEach((e=>{e.classList.add("hide"),e.classList.remove("show")})),t.forEach((e=>{e.classList.remove(l)}))}function t(e,t,l){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;e[o]&&(e[o].classList.add("show","fade"),e[o].classList.remove("hide"),t[o].classList.add(l))}var l=function(){const e={uralski:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.7245528185163!2d27.603444051677933!3d53.90109958000135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce4c14ec5a01%3A0x57066527f341de31!2z0L_QtdGALiDQo9GA0LDQu9GM0YHQutC40LkgOSwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556354543!5m2!1sru!2sby",sviazistov:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.0729779989574!2d27.67176025167828!3d53.91267908000396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce8ff01c44e1%3A0x5b8b09f26039f9aa!2z0YPQu9C40YbQsCDQodCy0Y_Qt9C40YHRgtC-0LIgNiwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556667022!5m2!1sru!2sby",stoletova:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.3202720606596!2d27.6163428516781!3d53.90828448000296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce5135975133%3A0x92f8db69fd2068de!2z0J_QsNGA0Log0Y3QutGB0YLRgNC10LzQsNC70YzQvdGL0YUg0LLQuNC00L7QsiDRgdC_0L7RgNGC0LA!5e0!3m2!1sru!2sby!4v1641561455175!5m2!1sru!2sby",vaupshasova:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.71130226406!2d27.661851551677955!3d53.90133508000146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce7d0bbdf3bb%3A0xaf2507637d8ae287!2z0YPQu9C40YbQsCDQktCw0YPQv9GI0LDRgdC-0LLQsCA0Niwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641561371614!5m2!1sru!2sby"},t=document.querySelectorAll(".tabheader__item"),l=document.querySelectorAll(".tabcontent img");t.forEach(((t,o)=>{t.addEventListener("click",(function(){!function(t,o){fetch(`/views_of_sport/${o}`).then((e=>e.text())).then((o=>{document.querySelector("#tabs").innerHTML=o;const a=document.createDocumentFragment();for(let e=0;e<15;e++){const e=document.createElement("div");e.classList.add("modal-drop"),e.style.top=Math.floor(100*Math.random())+"vh",e.style.left=Math.floor(100*Math.random())+"vw",e.style.transitionDelay=Math.random()+"s",a.appendChild(e)}const r=document.querySelector(".card_modal"),c=r.querySelector(".modals"),n=r.querySelector(".tabbed");var s;c.appendChild(a),c.style.display="block",window.setTimeout((function(){c.classList.add("active"),document.querySelector("body").style.overflow="hidden"}),.4),r.querySelector(".modal-content").style.cssText=`background: url(${l[t].getAttribute("src")})\n            no-repeat center center fixed; background-size: cover;`,r.querySelector(".close").addEventListener("click",(function(){c.classList.remove("active"),document.querySelector("body").style.overflow="auto",window.setTimeout((function(){c.style.display="none"}),3e3)})),(s=n).querySelectorAll("input").forEach(((e,t)=>{e.hasAttribute("checked")&&s.querySelectorAll(".tabs > div")[t].classList.add("checked")})),n.querySelectorAll("label").forEach(((t,l)=>{t.addEventListener("click",(()=>{n.querySelectorAll("input").forEach(((e,t)=>{e.hasAttribute("checked")&&(e.removeAttribute("checked"),n.querySelectorAll(".tabs > div")[t].classList.remove("checked"),e.removeAttribute("checked"))}));let t=n.querySelectorAll(".tabs > div")[l],o=n.querySelectorAll("input")[l];if(o.setAttribute("checked","checked"),t.classList.add("checked"),"tab-nav-4"==o.className)n.querySelectorAll("[data-map]").forEach(((t,l)=>{let o=`\n                            <iframe src=${e[t.getAttribute("data-map")]} width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>\n                            `;t.innerHTML=o}));else{const e=n.querySelectorAll("iframe");e.length>0&&e.forEach((e=>{e.remove()}))}}))})),function(){const e=.7;$.Velocity.RegisterEffect("translateUp",{defaultDuration:1,calls:[[{translateY:"-100%"},1]]}),$.Velocity.RegisterEffect("translateDown",{defaultDuration:1,calls:[[{translateY:"100%"},1]]}),$.Velocity.RegisterEffect("translateNone",{defaultDuration:1,calls:[[{translateY:"0",opacity:"1",scale:"1"},1]]}),$.Velocity.RegisterEffect("scaleDown",{defaultDuration:1,calls:[[{opacity:"0",scale:"0.7"},1]]}),$.Velocity.RegisterEffect("scaleDown.moveUp",{defaultDuration:1,calls:[[{translateY:"0%",scale:e},.2],[{translateY:"-100%"},.6],[{translateY:"-100%",scale:"1"},.2]]}),$.Velocity.RegisterEffect("scaleDown.moveUp.scroll",{defaultDuration:1,calls:[[{translateY:"-100%",scale:e},.6],[{translateY:"-100%",scale:"1"},.4]]}),$.Velocity.RegisterEffect("scaleUp.moveUp",{defaultDuration:1,calls:[[{translateY:"90%",scale:e,boxShadowBlur:"40px"},.2],[{translateY:"0%"},.6],[{translateY:"0%",scale:"1"},.2]]}),$.Velocity.RegisterEffect("scaleUp.moveUp.scroll",{defaultDuration:1,calls:[[{translateY:"0%",scale:e},.6],[{translateY:"0%",scale:"1"},.4]]}),$.Velocity.RegisterEffect("scaleDown.moveDown",{defaultDuration:1,calls:[[{translateY:"0%",scale:e},.2],[{translateY:"100%"},.6],[{translateY:"100%",scale:"1"},.2]]}),$.Velocity.RegisterEffect("scaleDown.moveDown.scroll",{defaultDuration:1,calls:[[{},.6],[{translateY:"100%",scale:"1"},.4]]}),$.Velocity.RegisterEffect("scaleUp.moveDown",{defaultDuration:1,calls:[[{translateY:"-90%",scale:e},.2],[{translateY:"0%"},.6],[{translateY:"0%",scale:"1"},.2]]}),document.querySelectorAll("section.velo-slides").forEach(((e,t)=>{const l=e.getAttribute("id"),o=function(){var e={veloInit:$(`#${l}.velo-slides`).data("velo-slider"),$veloSlide:$(`#${l} .velo-slide`),veloSlideBg:`#${l} .velo-slide__bg`,navPrev:$(`#${l} .velo-slides-nav`).find("a.js-velo-slides-prev"),navNext:$(`#${l} .velo-slides-nav`).find("a.js-velo-slides-next"),veloBtn:$(`#${l} .velo-slide__btn`),delta:0,scrollThreshold:7,currentSlide:1,animating:!1,animationDuration:2e3};let t=0,a=!1;return{init:function(){this.bind()},bind:function(){e.$veloSlide.first().addClass("is-active"),"on"==e.veloInit&&(o.initScrollJack(),$(window).on("DOMMouseScroll mousewheel",o.scrollJacking)),e.navPrev.on("click",o.prevSlide),e.navNext.on("click",o.nextSlide),$(document).on("keydown",(function(t){var l=39==t.which||40==t.which,a=37==t.which||38==t.which;l&&!e.navNext.hasClass("inactive")?(t.preventDefault(),o.nextSlide()):a&&!e.navPrev.hasClass("inactive")&&(t.preventDefault(),o.prevSlide())})),o.checkNavigation(),o.hoverAnimation()},hoverAnimation:function(){e.veloBtn.hover((function(){$(this).closest(e.$veloSlide).toggleClass("is-hovering")}))},setAnimation:function(t,l){var o="translateNone",a="translateUp",r="translateDown";return t?(o="scaleUp.moveUp.scroll",a="scaleDown.moveUp.scroll",r="scaleDown.moveDown.scroll"):(o="next"==l?"scaleUp.moveUp":"scaleUp.moveDown",a="scaleDown.moveUp",r="scaleDown.moveDown"),[o,a,r,e.animationDuration,"ease"]},initScrollJack:function(){var t=e.$veloSlide.filter(".is-active"),l=t.prevAll(e.$veloSlide),a=t.nextAll(e.$veloSlide),r=o.setAnimation(!1),c=r[0],n=r[1],s=r[2];t.children("div").velocity(c,1,(function(){t.css("opacity",1),l.css("opacity",1),a.css("opacity",1)})),l.children("div").velocity(n,0),a.children("div").velocity(s,0)},scrollJacking:function(l){return l.originalEvent.detail<0||l.originalEvent.wheelDelta>0?(t--,Math.abs(t)>=e.scrollThreshold&&o.prevSlide()):(t++,t>=e.scrollThreshold&&o.nextSlide()),!1},prevSlide:function(t){void 0!==t&&t.preventDefault();var l=e.$veloSlide.filter(".is-active"),r=o.setAnimation(c,"prev"),c=!1;l=c?l.next(e.$veloSlide):l,a||l.is(":first-child")||(a=!0,l.removeClass("is-active").children(e.veloSlideBg).velocity(r[2],r[3],r[4]).end().prev(e.$veloSlide).addClass("is-active").children(e.veloSlideBg).velocity(r[0],r[3],r[4],(function(){a=!1})),e.currentSlide=e.currentSlide-1),o.resetScroll()},nextSlide:function(t){void 0!==t&&t.preventDefault();var l=e.$veloSlide.filter(".is-active"),r=o.setAnimation(c,"next"),c=!1;a||l.is(":last-of-type")||(a=!0,l.removeClass("is-active").children(e.veloSlideBg).velocity(r[1],r[3]).end().next(e.$veloSlide).addClass("is-active").children(e.veloSlideBg).velocity(r[0],r[3],(function(){a=!1})),e.currentSlide=e.currentSlide+1),o.resetScroll()},resetScroll:function(){t=0,o.checkNavigation()},checkNavigation:function(){e.$veloSlide.filter(".is-active").is(":first-of-type")?e.navPrev.addClass("inactive"):e.navPrev.removeClass("inactive"),e.$veloSlide.filter(".is-active").is(":last-of-type")?e.navNext.addClass("inactive"):e.navNext.removeClass("inactive")}}}();o.init(),e.addEventListener("mouseleave",(()=>{$(window).off("DOMMouseScroll mousewheel",o.scrollJacking)})),e.addEventListener("mouseenter",(()=>{$(window).on("DOMMouseScroll mousewheel",o.scrollJacking)}))}))}()}))}(o,t.dataset.sportIndex)}))}))},o=function(){const e=document.querySelector(".glide__slides"),t=e.querySelectorAll(".glide__slide"),l=document.querySelectorAll(".glide .glide__bullet"),o=e.querySelectorAll(".glide__bgc"),a=t[0].currentStyle||window.getComputedStyle(t[0]),r=t[0].offsetWidth;t.forEach(((e,t)=>{e.querySelectorAll(".oh").forEach((e=>{e.remove(),e.textContent.split(/(?!$)/u).forEach((e=>{const l=document.createElement("span");l.classList.add("oh"),l.classList.add("fw-bold"),l.innerText=e,o[t].append(l)}))}))}));let c=0,n=parseInt(a.marginLeft)+parseInt(a.marginRight),s=n+r,i=0,d=0;function u(e){return`scale(0.5) perspective(1000px) rotateY(${e}deg)`}function m(e){l.forEach((e=>{e.style.opacity=.5})),l[e]&&(l[e].style.opacity=1)}function v(e){t[e]&&(t[e].querySelector(".glide__bg").style.transform="")}function f(e){for(let e=0;e<t.length;e++)v(e);e-1>=0&&v(e-1),c<s&&t[e]?t[e].querySelector(".glide__bg").style.transform=u(40):c>=s&&t[e]&&(t[e].querySelector(".glide__bg").style.transform=u(-40)),e+1<t.length-1&&v(e+1),e+2<=t.length-1?t[e+2].querySelector(".glide__bg").style.transform=u(-40):e+2<=t.length&&v(t.length-1)}function h(e){t.forEach((e=>{e.classList.add("smoke"),e.querySelector(".caption").classList.remove("show"),e.querySelector(".prize").classList.remove("show")})),t[e]&&(t[e].classList.remove("smoke"),t[e].querySelector(".caption").classList.add("show"),t[e].querySelector(".prize").classList.add("show"))}window.innerWidth<=768?d=s:i=s,e.style.cssText=`transform: translateX(${i}px)`,c=s,h(0),f(1),m(0),document.querySelectorAll(".glide__arrow").forEach((l=>{l.addEventListener("click",(()=>{if(n=parseInt(a.marginLeft)+parseInt(a.marginRight),s=n+r,l.classList.contains("glide__arrow--right"))if(c-=s,Math.abs(c)>=(t.length-1)*s)c=s,h(0),m(0),t[1].querySelector(".glide__bg").style.transform=u(-40),e.style.cssText=`transform: translateX(${c-d}px)`,v(0);else{const t=Math.abs(c)/s;h(t+1),m(t+1),f(t),e.style.cssText=`transform: translateX(${c-d}px)`}else if(c+=s,c>s)c=-1*(t.length-2)*s,h(t.length-1),m(t.length-1),t[t.length-2].querySelector(".glide__bg").style.transform=u(40),v(t.length-1),e.style.cssText=`transform: translateX(${c-d}px)`;else{let t=Math.abs(c)/s;f(t),e.style.cssText=`transform: translateX(${c-d}px)`,c<s?t+=1:t=0,h(t),m(t)}}))}))},a=function(){const e=document.querySelector(".cont"),t=e.querySelectorAll(".el"),l=[].slice.call(document.querySelectorAll(".el__close-btn"));window.addEventListener("scroll",(()=>{let o=!0;Math.round(+document.querySelector(".offer").getBoundingClientRect().y)-300<0&&o&&(o=!1,setTimeout((function(){e.classList.remove("s--inactive")}),200),t.forEach((t=>{t.addEventListener("click",(()=>{if(!t.classList.contains("s--active")){t.querySelector(".el__bg").style.right=0,e.classList.add("s--el-active"),t.classList.add("s--active");const l=t.querySelector(".el__more-btn");l.addEventListener("click",(()=>{fetch(`/news_content/${l.dataset.newsIndex}`).then((e=>e.text())).then((e=>{document.querySelector("html").style.overflow="hidden",document.querySelector("#news").innerHTML=e,function(){const e=document.querySelector("#news");e.querySelector(".news__close-btn").addEventListener("click",(()=>{document.querySelector("html").style.overflow=null,e.classList.add("invisible"),e.innerHTML=""}))}(),document.querySelector("#news").classList.remove("invisible")}))}))}}))})),l.forEach((function(t){t.addEventListener("click",(function(t){t.stopPropagation(),e.classList.remove("s--el-active"),document.querySelector(".s--active .el__bg")&&(document.querySelector(".s--active .el__bg").style.right=""),document.querySelector(".el.s--active")&&document.querySelector(".el.s--active").classList.remove("s--active")}))})),setTimeout((()=>{document.querySelectorAll(".el").forEach((e=>{e.style.background="none"}))}),3e3))}))};window.addEventListener("DOMContentLoaded",(()=>{(function(){const l=document.querySelector(".tabheader__items"),o=document.querySelectorAll(".tabheader__item"),a=document.querySelectorAll(".tabcontent"),r="tabheader__item_active";e(a,o,r),t(a,o,r),l.addEventListener("click",(l=>{const c=l.target;c&&c.classList.contains("tabheader__item")&&o.forEach(((l,n)=>{c==l&&(e(a,o,r),t(a,o,r,n))}))}))})(),function(){const e=document.querySelector(".calculating__result span"),t="calculating__choose-item_active",l="#gender div",o=".calculating__choose_big [data-ratio]",a=document.querySelector(".calculating__result");window.addEventListener("scroll",(()=>{if(window.innerWidth<=768){let e=Math.round(+document.querySelector(".calculating").getBoundingClientRect().y+150),t=Math.round(+document.querySelector(".calculating__total").getBoundingClientRect().y);e<0&&t>10?a.style.cssText="position: fixed; right: 4px; top: 20px; color:#00000061":(t<10||e>0)&&(a.style.cssText="")}else a.style.cssText=""}));let r,c,n,s=localStorage.getItem("sex")?localStorage.getItem("sex"):localStorage.setItem("sex","male"),i=localStorage.getItem("ratio")?localStorage.getItem("ratio"):localStorage.setItem("ratio",1.375);function d(e,t){document.querySelectorAll(e).forEach((e=>{e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t)}))}function u(){if(!(s&&r&&c&&n&&i))return void(e.textContent="0");let t;t="female"===s?(447.6+9.2*c+3.1*r-4.3*n)*i:(88.36+13.4*c+4.8*r-5.7*n)*i,e.textContent=Math.round(t)}function m(e,t){const l=document.querySelectorAll(e);l.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(i=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",i)):(s=e.target.getAttribute("id"),localStorage.setItem("sex",s)),l.forEach((e=>{e.classList.remove(t)})),e.target.classList.add(t),u()}))}))}function v(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?t.style.border="1px solid red":t.style.border="none",t.getAttribute("id")){case"height":r=+t.value;break;case"weight":c=+t.value;break;case"age":n=+t.value}u()}))}d(l,t),d(o,t),u(),m(l,t),m(o,t),v("#height"),v("#weight"),v("#age")}(),l(),o(),document.querySelectorAll("[data-coach]"),document.querySelectorAll("[data-group]"),document.querySelectorAll("[data-address-group]"),document.querySelectorAll("[data-address-org]"),document.querySelectorAll("[data-organization]"),document.querySelectorAll("[data-place]"),function(){for(var e=arguments.length,t=new Array(e),l=0;l<e;l++)t[l]=arguments[l];const o=document.querySelectorAll(".tabbed");function a(e,l,a){a.querySelectorAll(".tabs input").forEach((a=>{a.addEventListener(e,(e=>{o[l].querySelectorAll(".checked input");const a=e.target.value.toUpperCase(),r=t[0][e.target.attributes[2].name.replaceAll("-","")],c=o[l].querySelectorAll(".checked .table-row");let n=[];for(let e=0;e<c.length;e++){const t=c[e].querySelector(`${r}`),l=()=>{t.textContent.toUpperCase().indexOf(a)>-1?(c[e].style.display="",n.push(1),t.classList.remove("error")):(c[e].style.display="none",t.classList.add("error"))};"none"!=c[e].style.display?t&&l():t.classList.contains("error")&&t&&l()}let s=document.querySelector(".checked .totalSearch");s.innerText=n.length>0?`отобрано: ${n.length} эл.`:"нет элементов",s.classList.add("showSearch"),s.style.display="block"}))}))}o.forEach(((e,t)=>{["input"].forEach((l=>{a(l,t,e)}))}))}({dataorganization:'[data-label="Организация: "]',dataplace:'[data-label="Площадка: "]',dataaddressorg:'[data-label="Адрес объекта: "]',datacoach:'[data-label="Тренер: "]',datagroup:'[data-label="Группа: "]',dataaddressgroup:'[data-label="Адрес: "]'}),document.querySelectorAll(".tabs .responsive-table").forEach((e=>{const t=document.createElement("div");t.setAttribute("class","totalSearch"),e.append(t)})),a(),document.querySelector(".price").querySelectorAll(".inside-page__btn").forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),function(e,t){fetch(`/priceBlock_content/${t}`).then((e=>e.text())).then((t=>{document.querySelector("#priceGroup").innerHTML=t;const l=e.currentStyle||window.getComputedStyle(e),o=document.querySelector("#priceGroup").querySelector(".card-section__modal"),a=e.getBoundingClientRect();o.style.cssText=`\n            top: ${Math.round(a.top)}px;\n            left: ${Math.round(a.left)}px;\n            height: ${Math.round(a.height)}px;\n            width: ${Math.round(a.width)}px;\n            z-index: -1;\n            `,o.style.cssText=`\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n            bottom: 0;\n            right: 0;\n            border-radius: 0;\n            background: ${l.borderBlockColor.replaceAll(","," ").replace(")"," / 100%)")};\n            opacity: 1;\n        `,o.querySelector(".card-section__close").style.cssText="\n            opacity: 1;\n            ",setTimeout((()=>{o.querySelector(".content").style.opacity=1}),1e3),document.querySelector("body").style.overflow="hidden",o.querySelector(".card-section__close").addEventListener("click",(()=>{o.querySelector(".content").style="",setTimeout((()=>{o.style.cssText=`\n                top: ${Math.round(a.top)}px;\n                left: ${Math.round(a.left)}px;\n                height: ${Math.round(a.height)}px;\n                width: ${Math.round(a.width)}px;\n                z-index: -1;\n                `,o.querySelector(".card-section__close").style="",document.querySelector("body").style.overflow="auto",setTimeout((()=>{cards.classList.remove("card__hover"),flips.classList.remove("flip-card__container__hover")}),1e3)}),500)}))}))}(e,e.dataset.priceGroup)}))})),window.addEventListener("resize",(()=>{o()}));const r=document.querySelectorAll(".header__links .header__link"),c=document.querySelectorAll(".title");r.forEach(((e,t)=>{e.addEventListener("click",(e=>{e.preventDefault(),c[t].scrollIntoView({block:"start",behavior:"smooth"})}))}))}))}();
//# sourceMappingURL=bundle.js.map