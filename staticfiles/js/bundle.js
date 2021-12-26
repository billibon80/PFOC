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

function showTabContent() {
  let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let blockContent = arguments.length > 1 ? arguments[1] : undefined;
  let blockTab = arguments.length > 2 ? arguments[2] : undefined;
  let selector = arguments.length > 3 ? arguments[3] : undefined;
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
  showTabContent(0, tabsContent, tabs, selector);
  tabsParent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent(tabsContent, tabs, selector);
          showTabContent(i, tabsContent, tabs, selector);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

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


window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])(); // News

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
        block: 'center',
        behavior: 'smooth'
      });
    });
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map