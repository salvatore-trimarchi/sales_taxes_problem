/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/***/ (() => {

// ################################ 
// #    Vue.js - MAIN INSTANCE    # 
// ################################ 
var app = new Vue({
  el: '#app',
  data: {
    basketSelected: '',
    basketProducts: [],
    basketFileNames: [],
    salesTaxes: [],
    noBasicSalesTaxGoodTypes: []
  },
  methods: {
    getData: function getData(_mode) {
      var _this = this;

      var wl = window.location,
          params = {};

      if (_mode == 'products') {
        params = {
          shopping_basket_selected: this.basketSelected
        };
      }

      axios.get(wl.protocol + '//' + wl.host + wl.pathname + 'partials/endpoint.php', {
        params: params
      }).then(function (resp) {
        // MODE 1: retrieving shopping basket product list
        if (_mode == 'products') {
          if (resp.data[0] == 'success') {
            _this.basketProducts = resp.data[1];
          } else {
            console.log('product list unavailable');
          } // MODE 2: retrieving shopping basket name list & tax config

        } else {
          _this.basketFileNames = resp.data.shopping_baskets_files;
          _this.salesTaxes = resp.data.sales_taxes;
          _this.noBasicSalesTaxGoodTypes = resp.data.no_basic_sales_tax_good_types;
        }
      });
    },
    getItemPrice: function getItemPrice(_item) {
      var unitPrice = _item.price,
          taxableAmount = _item.item_num * unitPrice,
          basicSalesTax = 0,
          importDutyTax = 0,
          itemAmount = 0,
          itemTaxes = 0; // is basic sales tax applicable 

      if (!this.noBasicSalesTaxGoodTypes.includes(_item.type)) basicSalesTax = taxableAmount * this.salesTaxes.basic_sales_tax.rate; // is import_duty applicable

      if (_item.imported) importDutyTax = taxableAmount * this.salesTaxes.import_duty.rate; // rounded taxes & item cost

      itemTaxes = this.getTaxRoundingByRule(basicSalesTax + importDutyTax);
      itemAmount = taxableAmount + itemTaxes;
      return {
        unitPrice: unitPrice,
        itemAmount: itemAmount,
        itemTaxes: itemTaxes
      };
    },
    getTaxRoundingByRule: function getTaxRoundingByRule(_value) {
      // The rounding rules for sales tax are that 
      // for a tax rate of n%, a shelf price of p contains
      // (np/100 rounded up to the nearest 0.05) amount of sales tax.
      // 0.05 => +/- 0.025 => round()
      ret = Math.round(_value * 20) / 20;
      return ret;
    },
    getTotals: function getTotals(_items) {
      var _this2 = this;

      var totalAmount = 0,
          totalTaxes = 0;

      _items.forEach(function (item) {
        totalAmount += _this2.getItemPrice(item).itemAmount;
        totalTaxes += _this2.getItemPrice(item).itemTaxes;
      });

      return {
        totalAmount: totalAmount,
        totalTaxes: totalTaxes
      };
    },
    cap: function cap(_string) {
      var str = _string.replace('.php', ''); // removing extension


      str = str.replace(/_/g, ' '); // underscore to space

      return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
        return s.toUpperCase();
      });
    }
  },
  created: function created() {
    // MODE 2: retrieving shopping basket name list & tax config
    this.getData('config');
  }
});

/***/ }),

/***/ "./resources/sass/main.scss":
/*!**********************************!*\
  !*** ./resources/sass/main.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/main": 0,
/******/ 			"css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksales_taxes_problem"] = self["webpackChunksales_taxes_problem"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./resources/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./resources/sass/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;