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
      result.textContent = "    ";
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

/***/ "./staticfiles/js/modules/modal_sport.js":
/*!***********************************************!*\
  !*** ./staticfiles/js/modules/modal_sport.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function modalSport() {
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
              console.log('click');
              inpt.removeAttribute('checked');
              modalsTab.querySelectorAll('.tabs > div')[ki].classList.remove('checked');
              inpt.removeAttribute('checked');
            }
          });
          let tabs = modalsTab.querySelectorAll('.tabs > div')[k],
              inp = modalsTab.querySelectorAll('input')[k];
          inp.setAttribute('checked', 'checked');
          tabs.classList.add("checked");
        });
      });
      modalContainer[i].appendChild(holdModals);
      modalContainer[i].style.display = 'block';
      window.setTimeout(function () {
        modalContainer[i].classList.add('active');
        document.querySelector('body').style.overflow = 'hidden';
      }, 0.4);
      modalContainer[i].querySelector('.modal-content').style.cssText = `background: url(${imgTabCont[i].getAttribute('src')})
            no-repeat center center fixed; background-size: cover; z-index: 6`;
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




window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_velo_slider__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal_sport__WEBPACK_IMPORTED_MODULE_3__["default"])(); // News

  const parentNews = document.querySelector('.offer'),
        news = parentNews.querySelectorAll('.offer__advantages'),
        imgNews = parentNews.querySelectorAll('.offer__slide'),
        current = parentNews.querySelector('#current'),
        total = parentNews.querySelector('#total'),
        prev = parentNews.querySelector('#previous');

  function hideNewsContent() {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    rest.forEach(db => {
      db.forEach((item, i) => {
        item.classList.add('hide');
        item.classList.remove('show');

        if (db == imgNews) {
          item.classList.remove('fade');
        }
      });
    });
  }

  function showNewsContent(c, t, p) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    rest.forEach(db => {
      if (db == imgNews) {
        db[c - 1].classList.add('fade');
      }

      db[c - 1].classList.add('show');
      db[c - 1].classList.remove('hide');
    });
    current.innerHTML = c;
    total.innerHTML = t;
    prev.innerHTML = p;
  } // Start Slider


  let p = imgNews.length > news.length ? news.length : imgNews.length;
  hideNewsContent(news, imgNews);
  showNewsContent(1, 2, p, news, imgNews);
  let c = +current.textContent,
      t = +total.textContent;
  p = +prev.textContent; /// function Up slider add one slider for current, loop work around of all db items

  function upSlider(current, total) {
    let prev = current;
    current = total;
    total++;

    for (var _len3 = arguments.length, db = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      db[_key3 - 2] = arguments[_key3];
    }

    if (current + 1 > db[0].length || current + 1 > db[1].length) {
      total = 1;
    }

    hideNewsContent(db[0], db[1]);
    showNewsContent(current, total, prev, db[0], db[1]);
  } /// button slideer next


  let isFalse = false;

  function clearTimeSlider(id) {
    clearInterval(id);
    id = null;
  }

  parentNews.querySelector('.offer__slider-next').addEventListener('click', () => {
    clearTimeSlider(timeoutSldr);
    upSlider(+current.textContent, +total.textContent, news, imgNews);
  }); // button slider previous

  parentNews.querySelector('.offer__slider-prev').addEventListener('click', () => {
    clearTimeSlider(timeoutSldr);
    t = c;
    c = p;
    p--;

    if (c - 1 == 0) {
      p = imgNews.length > news.length ? news.length : imgNews.length;
    }

    hideNewsContent(news, imgNews);
    showNewsContent(c, t, p, news, imgNews);
  }); // Timer for slider

  function timeSlider() {
    if (!isFalse) {
      upSlider(+current.textContent, +total.textContent, news, imgNews);
    }
  }

  let timeoutSldr = setInterval(timeSlider, 5000); //news img hover stop Timer Slider

  parentNews.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      isFalse = true;
    });
    img.addEventListener('mouseleave', () => {
      isFalse = false;
    });
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