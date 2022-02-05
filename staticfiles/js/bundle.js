/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./staticfiles/js/modules/calc.js":
/*!****************************************!*\
  !*** ./staticfiles/js/modules/calc.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  const result = document.querySelector('.calculating__result span'),
        classActive = 'calculating__choose-item_active',
        selectorSex = '#gender div',
        selectorPhysActive = '.calculating__choose_big [data-ratio]';
  const calcResult = document.querySelector('.calculating__result');
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      let start = Math.round(+document.querySelector('.calculating').getBoundingClientRect().y + 150),
          finish = Math.round(+document.querySelector('.calculating__total').getBoundingClientRect().y);

      if (start < 0 && finish > 10) {
        calcResult.style.cssText = 'position: fixed; right: 4px; top: 20px; color:#00000061';
      } else if (finish < 10 || start > 0) {
        calcResult.style.cssText = '';
      }
    } else {
      calcResult.style.cssText = '';
    }
  });
  let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : localStorage.setItem('sex', 'male'),
      height,
      weight,
      age,
      ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : localStorage.setItem('ratio', 1.375);

  function addActive(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
    });
  }

  addActive(selectorSex, classActive);
  addActive(selectorPhysActive, classActive);

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "0";
      return;
    }

    let rData;

    if (sex === 'female') {
      rData = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
    } else {
      rData = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
    }

    result.textContent = Math.round(rData);
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          console.log(sex);
          localStorage.setItem('sex', sex);
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation(selectorSex, classActive);
  getStaticInformation(selectorPhysActive, classActive);

  function getDynamicData(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicData('#height');
  getDynamicData('#weight');
  getDynamicData('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./staticfiles/js/modules/card-area.js":
/*!*********************************************!*\
  !*** ./staticfiles/js/modules/card-area.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function cardArea() {
  const blockPrice = document.querySelector('.price'),
        cards = blockPrice.querySelectorAll('.card'),
        flips = blockPrice.querySelectorAll('.flip-card__container'),
        btnCard = blockPrice.querySelectorAll('.inside-page__btn'),
        modals = blockPrice.querySelectorAll('.card-section__modal');
  btnCard.forEach((btn, i) => {
    const style = btn.currentStyle || window.getComputedStyle(btn);
    const domBtn = btn.getBoundingClientRect();
    modals[i].style.cssText = `
                    top: ${Math.round(domBtn.top)}px;
                    left: ${Math.round(domBtn.left)}px;
                    height: ${Math.round(domBtn.height)}px;
                    width: ${Math.round(domBtn.width)}px;
                    z-index: -1;
                    `;
    btn.addEventListener('click', e => {
      e.preventDefault();
      cards[i].classList.add('card__hover');
      flips[i].classList.add('flip-card__container__hover');
      modals[i].style.cssText = `
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                    background: ${style.borderBlockColor.replaceAll(',', ' ').replace(')', ' / 100%)')};
                    opacity: 1;
                `;
      modals[i].querySelector('.card-section__close').style.cssText = `
                    opacity: 1;
                    `;
      setTimeout(() => {
        modals[i].querySelector('.content').style.opacity = 1;
      }, 1000);
      document.querySelector('body').style.overflow = 'hidden';
      modals[i].querySelector('.card-section__close').addEventListener('click', () => {
        modals[i].querySelector('.content').style = '';
        setTimeout(() => {
          modals[i].style.cssText = `
                        top: ${Math.round(domBtn.top)}px;
                        left: ${Math.round(domBtn.left)}px;
                        height: ${Math.round(domBtn.height)}px;
                        width: ${Math.round(domBtn.width)}px;
                        z-index: -1;
                        `;
          modals[i].querySelector('.card-section__close').style = '';
          document.querySelector('body').style.overflow = 'auto';
          setTimeout(() => {
            cards[i].classList.remove('card__hover');
            flips[i].classList.remove('flip-card__container__hover');
          }, 1000);
        }, 500);
      });
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cardArea);

/***/ }),

/***/ "./staticfiles/js/modules/el_slider.js":
/*!*********************************************!*\
  !*** ./staticfiles/js/modules/el_slider.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function el() {
  const cont = document.querySelector('.cont');
  const elsArr = document.querySelectorAll('.el');
  const closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));
  window.addEventListener('scroll', () => {
    const start = Math.round(+document.querySelector('.offer').getBoundingClientRect().y);
    let once = true;

    if (start - 300 < 0 && once) {
      once = false;
      setTimeout(function () {
        cont.classList.remove('s--inactive');
      }, 200);
      elsArr.forEach(el => {
        el.addEventListener('click', () => {
          if (!el.classList.contains('s--active')) {
            el.querySelector('.el__bg').style.right = 0;
            cont.classList.add('s--el-active');
            el.classList.add('s--active');
          }
        });
      });
      closeBtnsArr.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          cont.classList.remove('s--el-active');

          if (document.querySelector('.s--active .el__bg')) {
            document.querySelector('.s--active .el__bg').style.right = "";
          }

          if (document.querySelector('.el.s--active')) {
            document.querySelector('.el.s--active').classList.remove('s--active');
          }
        });
      });
      setTimeout(() => {
        document.querySelectorAll('.el').forEach(el => {
          el.style.background = 'none';
        });
      }, 3000);
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (el);

/***/ }),

/***/ "./staticfiles/js/modules/glide.js":
/*!*****************************************!*\
  !*** ./staticfiles/js/modules/glide.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function glideSlide() {
  const slider = document.querySelector('.glide__slides'),
        slideItems = slider.querySelectorAll('.glide__slide'),
        bullets = document.querySelectorAll('.glide .glide__bullet'),
        bgc = slider.querySelectorAll('.glide__bgc'),
        style = slideItems[0].currentStyle || window.getComputedStyle(slideItems[0]),
        widthSlide = slideItems[0].offsetWidth;
  slideItems.forEach((span, i) => {
    span.querySelectorAll('.oh').forEach(text => {
      text.remove();
      text.textContent.split(/(?!$)/u).forEach(char => {
        const span = document.createElement('span');
        span.classList.add('oh');
        span.classList.add('fw-bold');
        span.innerText = char;
        bgc[i].append(span);
      });
    });
  });
  let curSlider = 0,
      marg = parseInt(style.marginLeft) + parseInt(style.marginRight),
      totalWidth = marg + widthSlide,
      start = 0,
      correctSlide = 0;

  if (window.innerWidth <= 768) {
    correctSlide = totalWidth;
  } else {
    start = totalWidth;
  }

  slider.style.cssText = `transform: translateX(${start}px)`;
  curSlider = totalWidth;
  addSmoke(0);
  transformFrame(1);
  bullet(0);

  function bullet(id) {
    bullets.forEach(bullet => {
      bullet.style.opacity = 0.5;
    });

    if (bullets[id]) {
      bullets[id].style.opacity = 1;
    }
  }

  function cleanTransform(id) {
    if (slideItems[id]) {
      slideItems[id].querySelector('.glide__bg').style.transform = ``;
    }
  }

  function transformFrame(id) {
    for (let i = 0; i < slideItems.length; i++) {
      cleanTransform(i);
    }

    if (id - 1 >= 0) {
      cleanTransform(id - 1);
    }

    if (curSlider < totalWidth && slideItems[id]) {
      slideItems[id].querySelector('.glide__bg').style.transform = `perspective(1000px) rotateY(${40}deg)`;
    } else if (curSlider >= totalWidth && slideItems[id]) {
      slideItems[id].querySelector('.glide__bg').style.transform = `perspective(1000px) rotateY(${-40}deg)`;
    }

    if (id + 1 < slideItems.length - 1) {
      cleanTransform(id + 1);
    }

    if (id + 2 <= slideItems.length - 1) {
      slideItems[id + 2].querySelector('.glide__bg').style.transform = `perspective(1000px) rotateY(${-40}deg)`;
    } else if (id + 2 <= slideItems.length) {
      cleanTransform(slideItems.length - 1);
    }
  }

  function addSmoke(id) {
    slideItems.forEach(li => {
      li.classList.add('smoke');
      li.querySelector('.caption').classList.remove('show');
      const img = li.querySelector('.prize');
      img.classList.remove('show');
    });

    if (slideItems[id]) {
      slideItems[id].classList.remove('smoke');
      slideItems[id].querySelector('.caption').classList.add('show');
      slideItems[id].querySelector('.prize').classList.add('show');
    }
  }

  document.querySelectorAll('.glide__arrow').forEach(but => {
    but.addEventListener('click', () => {
      marg = parseInt(style.marginLeft) + parseInt(style.marginRight);
      totalWidth = marg + widthSlide;

      if (but.classList.contains('glide__arrow--right')) {
        curSlider -= totalWidth;

        if (Math.abs(curSlider) >= (slideItems.length - 1) * totalWidth) {
          curSlider = totalWidth;
          addSmoke(0);
          bullet(0);
          slideItems[1].querySelector('.glide__bg').style.transform = `perspective(1000px) rotateY(${-40}deg)`;
          slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
          cleanTransform(0);
        } else {
          const curId = Math.abs(curSlider) / totalWidth;
          addSmoke(curId + 1);
          bullet(curId + 1);
          transformFrame(curId);
          slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
        }
      } else {
        curSlider += totalWidth;

        if (curSlider > totalWidth) {
          curSlider = -1 * (slideItems.length - 2) * totalWidth;
          addSmoke(slideItems.length - 1);
          bullet(slideItems.length - 1);
          slideItems[slideItems.length - 2].querySelector('.glide__bg').style.transform = `perspective(1000px) rotateY(${40}deg)`;
          cleanTransform(slideItems.length - 1);
          slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
        } else {
          let curId = Math.abs(curSlider) / totalWidth;
          transformFrame(curId);
          slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;

          if (curSlider < totalWidth) {
            curId += 1;
          } else {
            curId = 0;
          }

          addSmoke(curId);
          bullet(curId);
        }
      }
    });
  });
  document.querySelector('.container__video').playbackRate = 2;
}

/* harmony default export */ __webpack_exports__["default"] = (glideSlide);

/***/ }),

/***/ "./staticfiles/js/modules/modal_sport.js":
/*!***********************************************!*\
  !*** ./staticfiles/js/modules/modal_sport.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function modalSport() {
  const mapObject = {
    uralski: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.7245528185163!2d27.603444051677933!3d53.90109958000135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce4c14ec5a01%3A0x57066527f341de31!2z0L_QtdGALiDQo9GA0LDQu9GM0YHQutC40LkgOSwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556354543!5m2!1sru!2sby",
    sviazistov: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.0729779989574!2d27.67176025167828!3d53.91267908000396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce8ff01c44e1%3A0x5b8b09f26039f9aa!2z0YPQu9C40YbQsCDQodCy0Y_Qt9C40YHRgtC-0LIgNiwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556667022!5m2!1sru!2sby",
    stoletova: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.3202720606596!2d27.6163428516781!3d53.90828448000296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce5135975133%3A0x92f8db69fd2068de!2z0J_QsNGA0Log0Y3QutGB0YLRgNC10LzQsNC70YzQvdGL0YUg0LLQuNC00L7QsiDRgdC_0L7RgNGC0LA!5e0!3m2!1sru!2sby!4v1641561455175!5m2!1sru!2sby",
    vaupshasova: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.71130226406!2d27.661851551677955!3d53.90133508000146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce7d0bbdf3bb%3A0xaf2507637d8ae287!2z0YPQu9C40YbQsCDQktCw0YPQv9GI0LDRgdC-0LLQsCA0Niwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641561371614!5m2!1sru!2sby"
  };
  let num = 15;
  const modalBtn = document.querySelectorAll('.tabheader__item'),
        modalContainer = document.querySelectorAll('.modals'),
        imgTabCont = document.querySelectorAll('.tabcontent img');
  modalBtn.forEach((btn, i) => {
    const holdModals = document.createDocumentFragment();

    for (let i = 0; i < num; i++) {
      const div = document.createElement('div');
      div.classList.add('modal-drop');
      div.style.top = Math.floor(Math.random() * 100) + 'vh';
      div.style.left = Math.floor(Math.random() * 100) + 'vw';
      div.style.transitionDelay = Math.random() + 's';
      holdModals.appendChild(div);
    }

    const modalsTab = document.querySelectorAll('.tabbed')[i];
    btn.addEventListener('click', function () {
      showContent(modalsTab);
      modalsTab.querySelectorAll('label').forEach((item, k) => {
        item.addEventListener('click', () => {
          modalsTab.querySelectorAll('input').forEach((inpt, ki) => {
            if (inpt.hasAttribute('checked')) {
              inpt.removeAttribute('checked');
              modalsTab.querySelectorAll('.tabs > div')[ki].classList.remove('checked');
              inpt.removeAttribute('checked');
            }
          });
          let tabs = modalsTab.querySelectorAll('.tabs > div')[k],
              inp = modalsTab.querySelectorAll('input')[k];
          inp.setAttribute('checked', 'checked');
          tabs.classList.add("checked");

          if (inp.className == 'tab-nav-4') {
            const mapSelector = modalsTab.querySelectorAll('[data-map]');
            mapSelector.forEach((frame, mi) => {
              let textHtml = `
                            <iframe src=${mapObject[frame.getAttribute('data-map')]} width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            `;
              frame.innerHTML = textHtml;
            });
          } else {
            const iframe = modalsTab.querySelectorAll('iframe');

            if (iframe.length > 0) {
              iframe.forEach(selector => {
                selector.remove();
              });
            }
          } //

        });
      });
      modalContainer[i].appendChild(holdModals);
      modalContainer[i].style.display = 'block';
      window.setTimeout(function () {
        modalContainer[i].classList.add('active');
        document.querySelector('body').style.overflow = 'hidden';
      }, 0.4);
      modalContainer[i].querySelector('.modal-content').style.cssText = `background: url(${imgTabCont[i].getAttribute('src')})
            no-repeat center center fixed; background-size: cover;`;
      const closeBtn = modalContainer[i].querySelector('.close');
      closeBtn.addEventListener('click', function () {
        modalContainer[i].classList.remove('active');
        hiddenContent(modalsTab);
        document.querySelector('body').style.overflow = 'auto';
        window.setTimeout(function () {
          modalContainer[i].style.display = 'none';
        }, 3000);
      });
    });
  }); /// modal

  function showContent(parentSelector) {
    parentSelector.querySelectorAll('input').forEach((item, k) => {
      if (item.hasAttribute('checked')) {
        const tabs = parentSelector.querySelectorAll('.tabs > div')[k];
        tabs.classList.add("checked");
      }
    });
  }

  function hiddenContent(parentSelector) {
    parentSelector.querySelectorAll('input').forEach((item, k) => {
      if (item.hasAttribute('checked')) {
        const tabs = parentSelector.querySelectorAll('.tabs > div')[k];
        tabs.classList.remove("checked");
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (modalSport);

/***/ }),

/***/ "./staticfiles/js/modules/tabs.js":
/*!****************************************!*\
  !*** ./staticfiles/js/modules/tabs.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function hideTabContent(blockContent, blockTab, selector) {
  blockContent.forEach(item => {
    // item.style.display = 'none'; // in-line style
    item.classList.add('hide');
    item.classList.remove('show');
  });
  blockTab.forEach(item => {
    item.classList.remove(selector);
  });
}

function showTabContent(blockContent, blockTab, selector) {
  let i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  blockContent[i].classList.add('show', 'fade');
  blockContent[i].classList.remove('hide');
  blockTab[i].classList.add(selector);
}

function tabs() {
  const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        selector = 'tabheader__item_active';
  hideTabContent(tabsContent, tabs, selector);
  showTabContent(tabsContent, tabs, selector);
  tabsParent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent(tabsContent, tabs, selector);
          showTabContent(tabsContent, tabs, selector, i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./staticfiles/js/modules/timetable.js":
/*!*********************************************!*\
  !*** ./staticfiles/js/modules/timetable.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timetable() {
  function selection() {
    for (var _len = arguments.length, attrSelection = new Array(_len), _key = 0; _key < _len; _key++) {
      attrSelection[_key] = arguments[_key];
    }

    const tabbed = document.querySelectorAll('.tabbed'); // div class timetable

    function filterValue(evt, i, item) {
      item.querySelectorAll('.tabs input').forEach(inputTab => {
        inputTab.addEventListener(evt, e => {
          const input = tabbed[i].querySelectorAll('.checked input'); // input.forEach(attr => {

          const filter = e.target.value.toUpperCase();
          const selection = attrSelection[0][e.target.attributes[2].name.replaceAll('-', '')];
          const tableRows = tabbed[i].querySelectorAll('.checked .table-row');
          let totalRowF = [];

          for (let ir = 0; ir < tableRows.length; ir++) {
            const div = tableRows[ir].querySelector(`${selection}`);

            const checkWord = () => {
              const txtValue = div.textContent;

              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tableRows[ir].style.display = '';
                totalRowF.push(1);
                div.classList.remove('error');
              } else {
                tableRows[ir].style.display = 'none';
                div.classList.add('error');
              }
            };

            if (tableRows[ir].style.display != 'none') {
              if (div) {
                checkWord();
              }
            } else if (div.classList.contains('error')) {
              if (div) {
                checkWord();
              }
            }
          }

          let t = document.querySelector('.checked .totalSearch');
          t.innerText = totalRowF.length > 0 ? `отобрано: ${totalRowF.length} эл.` : "нет элементов";
          t.classList.add('showSearch');
          t.style.display = 'block'; // });  
        });
      });
    }

    tabbed.forEach((item, i) => {
      ['input'].forEach(evt => {
        filterValue(evt, i, item);
      });
    });
  }

  const allCoachs = document.querySelectorAll('[data-coach]'),
        // input with attr for selection
  allGroups = document.querySelectorAll('[data-group]'),
        allAdressGroup = document.querySelectorAll('[data-address-group]'),
        allAdressOrg = document.querySelectorAll('[data-address-org]'),
        allOrganization = document.querySelectorAll('[data-organization]'),
        allPlace = document.querySelectorAll('[data-place]');
  selection({
    dataorganization: '[data-label="Организация: "]',
    dataplace: '[data-label="Площадка: "]',
    dataaddressorg: '[data-label="Адрес объекта: "]',
    datacoach: '[data-label="Тренер: "]',
    datagroup: '[data-label="Группа: "]',
    dataaddressgroup: '[data-label="Адрес: "]'
  }); //   selection(allCoachs, );
  //   selection(allGroups, );
  //   selection(allAdressGroup, );
  //   selection(allAdressOrg, );
  //   selection(allOrganization, );
  //   selection(allPlace, );

  document.querySelectorAll('.tabs .responsive-table').forEach(table => {
    const t = document.createElement('div');
    t.setAttribute('class', 'totalSearch');
    table.append(t);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (timetable);

/***/ }),

/***/ "./staticfiles/js/modules/velo-slider.js":
/*!***********************************************!*\
  !*** ./staticfiles/js/modules/velo-slider.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function veloSlider() {
  const scaleDownAmnt = 0.7;
  const boxShadowAmnt = '40px';
  $.Velocity.RegisterEffect("translateUp", {
    defaultDuration: 1,
    calls: [[{
      translateY: '-100%'
    }, 1]]
  });
  $.Velocity.RegisterEffect("translateDown", {
    defaultDuration: 1,
    calls: [[{
      translateY: '100%'
    }, 1]]
  });
  $.Velocity.RegisterEffect("translateNone", {
    defaultDuration: 1,
    calls: [[{
      translateY: '0',
      opacity: '1',
      scale: '1'
    }, 1]]
  }); //scale down

  $.Velocity.RegisterEffect("scaleDown", {
    defaultDuration: 1,
    calls: [[{
      opacity: '0',
      scale: '0.7'
    }, 1]]
  }); //gallery

  $.Velocity.RegisterEffect("scaleDown.moveUp", {
    defaultDuration: 1,
    calls: [[{
      translateY: '0%',
      scale: scaleDownAmnt
    }, 0.20], [{
      translateY: '-100%'
    }, 0.60], [{
      translateY: '-100%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.20]]
  });
  $.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
    defaultDuration: 1,
    calls: [[{
      translateY: '-100%',
      scale: scaleDownAmnt
    }, 0.60], [{
      translateY: '-100%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.40]]
  });
  $.Velocity.RegisterEffect("scaleUp.moveUp", {
    defaultDuration: 1,
    calls: [[{
      translateY: '90%',
      scale: scaleDownAmnt,
      boxShadowBlur: boxShadowAmnt
    }, 0.20], [{
      translateY: '0%'
    }, 0.60], [{
      translateY: '0%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.20]]
  });
  $.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
    defaultDuration: 1,
    calls: [[{
      translateY: '0%',
      scale: scaleDownAmnt // boxShadowBlur: boxShadowAmnt

    }, 0.60], [{
      translateY: '0%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.40]]
  });
  $.Velocity.RegisterEffect("scaleDown.moveDown", {
    defaultDuration: 1,
    calls: [[{
      translateY: '0%',
      scale: scaleDownAmnt // boxShadowBlur: boxShadowAmnt

    }, 0.20], [{
      translateY: '100%'
    }, 0.60], [{
      translateY: '100%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.20]]
  });
  $.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
    defaultDuration: 1,
    calls: [[{}, 0.60], [{
      translateY: '100%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.40]]
  });
  $.Velocity.RegisterEffect("scaleUp.moveDown", {
    defaultDuration: 1,
    calls: [[{
      translateY: '-90%',
      scale: scaleDownAmnt // boxShadowBlur: boxShadowAmnt

    }, 0.20], [{
      translateY: '0%'
    }, 0.60], [{
      translateY: '0%',
      scale: '1' // boxShadowBlur: '0'

    }, 0.20]]
  });
  const sectionSlide = document.querySelectorAll('section.velo-slides');
  sectionSlide.forEach((section, i) => {
    const sectionId = section.getAttribute('id');

    const VeloSlider = function () {
      /**
       * Global Settings 
       */
      var settings = {
        veloInit: $(`#${sectionId}.velo-slides`).data('velo-slider'),
        $veloSlide: $(`#${sectionId} .velo-slide`),
        veloSlideBg: `#${sectionId} .velo-slide__bg`,
        navPrev: $(`#${sectionId} .velo-slides-nav`).find('a.js-velo-slides-prev'),
        navNext: $(`#${sectionId} .velo-slides-nav`).find('a.js-velo-slides-next'),
        veloBtn: $(`#${sectionId} .velo-slide__btn`),
        delta: 0,
        scrollThreshold: 7,
        currentSlide: 1,
        animating: false,
        animationDuration: 2000
      }; // Flags

      let delta = 0,
          animating = false;
      return {
        /**
         * Init 
         */
        init: function () {
          this.bind();
        },

        /**
         * Bind our click, scroll, key events
         */
        bind: function () {
          //  Add active to first slide to set it off
          settings.$veloSlide.first().addClass('is-active'); //  Init with a data attribute, 
          //  Binding the animation to scroll, arrows, keys

          if (settings.veloInit == 'on') {
            VeloSlider.initScrollJack();
            $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
          } // Arrow / Click Nav


          settings.navPrev.on('click', VeloSlider.prevSlide);
          settings.navNext.on('click', VeloSlider.nextSlide); // Key Nav

          $(document).on('keydown', function (e) {
            var keyNext = e.which == 39 || e.which == 40,
                keyPrev = e.which == 37 || e.which == 38;

            if (keyNext && !settings.navNext.hasClass('inactive')) {
              e.preventDefault();
              VeloSlider.nextSlide();
            } else if (keyPrev && !settings.navPrev.hasClass('inactive')) {
              e.preventDefault();
              VeloSlider.prevSlide();
            }
          }); // // Swipes
          // $(window).swipe(function( direction, offset ) {
          //   //if (offset < 100) { return; }
          //   if (direction == "up") { 
          //     VeloSlider.prevSlide(); 
          //     console.log('swipe up');
          //   }
          //   if (direction == "down") { VeloSlider.nextSlide(); } 
          // });
          //set navigation arrows visibility

          VeloSlider.checkNavigation(); // Call Button Hover animation

          VeloSlider.hoverAnimation();
        },

        /**
         * Hover Animation
         * Adds 'is-hovering' class to the current slide
         * when hovering over the button.
         */
        hoverAnimation: function () {
          settings.veloBtn.hover(function () {
            $(this).closest(settings.$veloSlide).toggleClass('is-hovering');
          });
        },

        /** 
         * Set Animation
         * Defines the animation sequence, calling our registered velocity effects
         * @see js/components/_velocity-effects.js
         */
        setAnimation: function (midStep, direction) {
          // Vars for our velocity effects
          var animationVisible = 'translateNone',
              animationTop = 'translateUp',
              animationBottom = 'translateDown',
              easing = 'ease',
              animDuration = settings.animationDuration; // Middle Step

          if (midStep) {
            animationVisible = 'scaleUp.moveUp.scroll';
            animationTop = 'scaleDown.moveUp.scroll';
            animationBottom = 'scaleDown.moveDown.scroll';
          } else {
            animationVisible = direction == 'next' ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
            animationTop = 'scaleDown.moveUp';
            animationBottom = 'scaleDown.moveDown';
          }

          return [animationVisible, animationTop, animationBottom, animDuration, easing];
        },

        /** 
         * Init Scroll Jaclk
         */
        initScrollJack: function () {
          var visibleSlide = settings.$veloSlide.filter('.is-active'),
              topSection = visibleSlide.prevAll(settings.$veloSlide),
              bottomSection = visibleSlide.nextAll(settings.$veloSlide),
              animationParams = VeloSlider.setAnimation(false),
              animationVisible = animationParams[0],
              animationTop = animationParams[1],
              animationBottom = animationParams[2];
          visibleSlide.children('div').velocity(animationVisible, 1, function () {
            visibleSlide.css('opacity', 1);
            topSection.css('opacity', 1);
            bottomSection.css('opacity', 1);
          });
          topSection.children('div').velocity(animationTop, 0);
          bottomSection.children('div').velocity(animationBottom, 0);
        },

        /**
         * Scroll Jack
         * On Mouse Scroll
         */
        scrollJacking: function (e) {
          if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
            delta--;
            Math.abs(delta) >= settings.scrollThreshold && VeloSlider.prevSlide();
          } else {
            delta++;
            delta >= settings.scrollThreshold && VeloSlider.nextSlide();
          }

          return false;
        },

        /**
         * Previous Slide
         */
        prevSlide: function (e) {
          //go to previous section
          typeof e !== 'undefined' && e.preventDefault();
          var visibleSlide = settings.$veloSlide.filter('.is-active'),
              animationParams = VeloSlider.setAnimation(midStep, 'prev'),
              midStep = false;
          visibleSlide = midStep ? visibleSlide.next(settings.$veloSlide) : visibleSlide;

          if (!animating && !visibleSlide.is(":first-child")) {
            animating = true;
            visibleSlide.removeClass('is-active').children(settings.veloSlideBg).velocity(animationParams[2], animationParams[3], animationParams[4]).end().prev(settings.$veloSlide).addClass('is-active').children(settings.veloSlideBg).velocity(animationParams[0], animationParams[3], animationParams[4], function () {
              animating = false;
            });
            settings.currentSlide = settings.currentSlide - 1;
          }

          VeloSlider.resetScroll();
        },

        /** 
         * Next Slide
         */
        nextSlide: function (e) {
          //go to next section
          typeof e !== 'undefined' && e.preventDefault();
          var visibleSlide = settings.$veloSlide.filter('.is-active'),
              animationParams = VeloSlider.setAnimation(midStep, 'next'),
              midStep = false;

          if (!animating && !visibleSlide.is(":last-of-type")) {
            animating = true;
            visibleSlide.removeClass('is-active').children(settings.veloSlideBg).velocity(animationParams[1], animationParams[3]).end().next(settings.$veloSlide).addClass('is-active').children(settings.veloSlideBg).velocity(animationParams[0], animationParams[3], function () {
              animating = false;
            });
            settings.currentSlide = settings.currentSlide + 1;
          }

          VeloSlider.resetScroll();
        },

        /**
         * Reset SCroll
         */
        resetScroll: function () {
          delta = 0;
          VeloSlider.checkNavigation();
        },

        /**
         * Check Nav
         * Adds / hides nav based on first/last slide
         * @todo - loop slides, without cloning if possible
         */
        checkNavigation: function () {
          //update navigation arrows visibility
          settings.$veloSlide.filter('.is-active').is(':first-of-type') ? settings.navPrev.addClass('inactive') : settings.navPrev.removeClass('inactive');
          settings.$veloSlide.filter('.is-active').is(':last-of-type') ? settings.navNext.addClass('inactive') : settings.navNext.removeClass('inactive');
        }
      };
    }();
    /**
     * Velo Slider
     * A Custom Slider using Velocity and Velocity UI effects
     */
    // INIT


    VeloSlider.init();
    section.addEventListener('mouseleave', () => {
      $(window).off('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
    });
    section.addEventListener('mouseenter', () => {
      $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (veloSlider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./staticfiles/js/script.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./staticfiles/js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./staticfiles/js/modules/calc.js");
/* harmony import */ var _modules_velo_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/velo-slider */ "./staticfiles/js/modules/velo-slider.js");
/* harmony import */ var _modules_modal_sport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal_sport */ "./staticfiles/js/modules/modal_sport.js");
/* harmony import */ var _modules_glide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/glide */ "./staticfiles/js/modules/glide.js");
/* harmony import */ var _modules_timetable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timetable */ "./staticfiles/js/modules/timetable.js");
/* harmony import */ var _modules_el_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/el_slider */ "./staticfiles/js/modules/el_slider.js");
/* harmony import */ var _modules_card_area__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/card-area */ "./staticfiles/js/modules/card-area.js");








window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_velo_slider__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal_sport__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_glide__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_timetable__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_el_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_card_area__WEBPACK_IMPORTED_MODULE_7__["default"])();
  window.addEventListener('resize', () => {
    (0,_modules_glide__WEBPACK_IMPORTED_MODULE_4__["default"])();
  }); // NavBar Link (hashTag) create scroll (link navbar) to hash (title of block)

  const allLinks = document.querySelectorAll('.header__links .header__link'),
        allHash = document.querySelectorAll('.title');
  allLinks.forEach((item, i) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      allHash[i].scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map