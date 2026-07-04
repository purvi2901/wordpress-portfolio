(window["webpackJsonp_craft_blocks"] = window["webpackJsonp_craft_blocks"] || []).push([["style-index"],{

/***/ "./blocks/custom-header/src/style.scss":
/*!*********************************************!*\
  !*** ./blocks/custom-header/src/style.scss ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp_craft_blocks"] = window["webpackJsonp_craft_blocks"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./blocks/custom-header/src/index.js","style-index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/custom-header/src/edit.js":
/*!******************************************!*\
  !*** ./blocks/custom-header/src/edit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edit; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./blocks/custom-header/src/editor.scss");

/**
 * External dependencies
 */







const GeneralTabIcon = () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  viewBox: "0 0 16 15",
  width: "16",
  height: "15",
  "aria-hidden": "true",
  focusable: "false"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  fillRule: "nonzero",
  d: "M14.346 0H1.654C1.017 0 .5.517.5 1.154v12.692C.5 14.483 1.017 15 1.654 15h12.692c.637 0 1.154-.517 1.154-1.154V1.154C15.5.517 14.983 0 14.346 0zm-5.77 13.846v-5.77h5.77v5.77h-5.77z"
}));
const StyleTabIcon = () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  viewBox: "0 0 18 21",
  width: "18",
  height: "21",
  "aria-hidden": "true",
  focusable: "false"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  fillRule: "nonzero",
  d: "M15.12 12.091a.814.814 0 00-.68-.378.814.814 0 00-.68.378c-.531.863-2.252 3.807-2.252 5.09 0 1.598 1.317 2.901 2.932 2.901s2.933-1.303 2.933-2.902c0-1.303-1.722-4.226-2.253-5.089zm-1.041 3.828c-.043.063-.744 1.198-.213 1.976a.52.52 0 01.064.358.409.409 0 01-.191.294.608.608 0 01-.255.084.476.476 0 01-.383-.21c-.871-1.283.149-2.902.192-2.986a.517.517 0 01.297-.21.534.534 0 01.361.063c.192.126.255.42.128.63zM13.314 10.388l1.36-.147c.446-.042.807-.337.935-.736.127-.4.042-.862-.276-1.157L7.258.294c-.255-.252-.68-.252-.957 0a.68.68 0 000 .947l.34.336-5.1 5.047C.82 7.339.5 8.348.67 9.379c.128.652.489 1.24.956 1.703l3.082 3.05c.467.462 1.062.82 1.72.946a3.134 3.134 0 002.785-.863l3.612-3.575a.74.74 0 01.489-.252zM7.576 2.502l5.759 5.7H2.073c.085-.232.212-.463.403-.653l5.1-5.047z"
}));
const AdvancedTabIcon = () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  viewBox: "0 0 17 16",
  width: "17",
  height: "16",
  "aria-hidden": "true",
  focusable: "false"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  fillRule: "nonzero",
  d: "M15.666 6.325c-.277-.05-.572-.082-.85-.115a6.385 6.385 0 00-.571-1.389c.18-.229.343-.457.523-.686a.994.994 0 00-.098-1.291l-.997-.997a.994.994 0 00-1.291-.098c-.23.163-.458.343-.687.523a6.954 6.954 0 00-1.39-.589c-.032-.277-.08-.572-.113-.85A.987.987 0 009.21 0H7.805a1 1 0 00-.98.834c-.05.277-.082.572-.115.85-.474.13-.947.326-1.389.571-.229-.18-.457-.343-.686-.523a.994.994 0 00-1.291.098l-.997.997a.994.994 0 00-.098 1.291c.163.23.343.458.523.687a6.954 6.954 0 00-.589 1.39c-.277.032-.572.08-.85.113A.987.987 0 00.5 7.29v1.406a1 1 0 00.834.98c.277.05.572.082.85.115.13.474.326.947.571 1.389-.18.229-.343.457-.523.686a.994.994 0 00.098 1.291l.997.997a.994.994 0 001.291.098c.23-.163.458-.343.687-.523.441.245.899.442 1.39.589.032.294.08.572.113.85.066.473.49.833.981.833h1.406a1 1 0 00.98-.834c.05-.277.082-.572.115-.85.474-.13.947-.326 1.389-.571.229.18.457.343.686.523a.994.994 0 001.291-.098l.997-.997a.994.994 0 00.098-1.291 19.095 19.095 0 00-.523-.687c.245-.441.442-.899.589-1.39.277-.032.572-.08.85-.113a.987.987 0 00.833-.981V7.305a1 1 0 00-.834-.98zM8.492 11.57a3.571 3.571 0 01-3.563-3.563 3.571 3.571 0 013.563-3.563 3.571 3.571 0 013.563 3.563 3.571 3.571 0 01-3.563 3.563z"
}));
function HeadingTagControl({
  value,
  onChange
}) {
  const activeTag = value || 'h2';
  const options = [{
    value: 'h1',
    label: 'H1'
  }, {
    value: 'h2',
    label: 'H2'
  }, {
    value: 'h3',
    label: 'H3'
  }, {
    value: 'h4',
    label: 'H4'
  }, {
    value: 'h5',
    label: 'H5'
  }, {
    value: 'h6',
    label: 'H6'
  }, {
    value: 'p',
    label: 'P'
  }, {
    value: 'div',
    label: 'DIV'
  }];
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "custom-header-heading-tag"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "custom-header-heading-tag__label"
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Heading Tag', 'craft-blocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "custom-header-heading-tag__options"
  }, options.map(option => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    key: option.value,
    className: `custom-header-heading-tag__button ${activeTag === option.value ? 'is-active' : ''}`,
    onClick: () => onChange(option.value)
  }, option.label))));
}
function Edit({
  attributes,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["useBlockProps"])({
    className: 'wz-alert'
  });
  const {
    subheading,
    align,
    showSubHeading,
    headingContent,
    headingTag,
    sectionBackgroundColor,
    subHeadingColor,
    headingColor
  } = attributes;
  const [selectedInspectorTab, setSelectedInspectorTab] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])('general');
  const onChangeHeading = newHeading => {
    setAttributes({
      headingContent: newHeading
    });
  };
  const toggleHeading = () => {
    setAttributes({
      showSubHeading: !showSubHeading
    });
  };
  const onChangeHeadingTag = newHeadingTag => {
    setAttributes({
      headingTag: newHeadingTag
    });
  };
  const onChangeSubheading = value => {
    setAttributes({
      subheading: value
    });
  };
  const switchTab = value => {
    setSelectedInspectorTab(value);
  };
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (selectedInspectorTab !== 'advanced') {
      return undefined;
    }
    const animationFrame = window.requestAnimationFrame(() => {
      const advancedToggle = document.querySelector('.block-editor-block-inspector__advanced .components-panel__body-toggle');
      if (advancedToggle && advancedToggle.getAttribute('aria-expanded') === 'false') {
        advancedToggle.click();
      }
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, [selectedInspectorTab]);
  const selectedHeadingTag = headingTag || 'h2';
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: `tab-content-wrap custom-header-inspector-tabs ${selectedInspectorTab === 'advanced' ? 'is-advanced-active' : ''}`
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "tabs"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    onClick: () => switchTab('general'),
    className: selectedInspectorTab === 'general' ? 'active' : ''
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "tab-icon tab-icon--general"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(GeneralTabIcon, null)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('General', 'craft-blocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    onClick: () => switchTab('styles'),
    className: `tab-button--style ${selectedInspectorTab === 'styles' ? 'active' : ''}`
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "tab-icon tab-icon--style"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(StyleTabIcon, null)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Style', 'craft-blocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    onClick: () => switchTab('advanced'),
    className: selectedInspectorTab === 'advanced' ? 'active' : ''
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "tab-icon tab-icon--advanced"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(AdvancedTabIcon, null)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Advanced', 'craft-blocks')))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "tab-content"
  }, selectedInspectorTab === 'general' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "content-section"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["TextControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Heading', 'craft-blocks'),
    value: headingContent,
    onChange: value => {
      onChangeHeading(value);
    }
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(HeadingTagControl, {
    value: headingTag,
    onChange: onChangeHeadingTag
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "subheading-wrap"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "subheading-toggle"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["ToggleControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('SubHeading', 'craft-blocks'),
    checked: showSubHeading,
    onChange: toggleHeading
  })), showSubHeading && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "subheding-text"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["TextareaControl"], {
    label: "",
    value: subheading,
    onChange: onChangeSubheading
  })))), selectedInspectorTab === 'styles' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "style-section"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["PanelColorSettings"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Background Color ', 'craft-blocks'),
    colorSettings: [{
      value: sectionBackgroundColor,
      onChange: value => setAttributes({
        sectionBackgroundColor: value
      }),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('', 'craft-blocks'),
      colors: [{
        color: '#fff'
      }, {
        color: '#26335B'
      }, {
        color: '#8E9FBC'
      }, {
        color: '#8C1C13'
      }, {
        color: '#3574DF'
      }]
    }]
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["PanelColorSettings"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Heading Color', 'craft-blocks'),
    colorSettings: [{
      value: headingColor,
      onChange: value => setAttributes({
        headingColor: value
      }),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('', 'craft-blocks'),
      colors: [{
        color: '#fff'
      }, {
        color: '#26335B'
      }, {
        color: '#8E9FBC'
      }, {
        color: '#8C1C13'
      }, {
        color: '#3574DF'
      }]
    }]
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["PanelColorSettings"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('SubHeading Color', 'craft-blocks'),
    colorSettings: [{
      value: subHeadingColor,
      onChange: value => setAttributes({
        subHeadingColor: value
      }),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])(' ', 'craft-blocks'),
      colors: [{
        color: '#fff'
      }, {
        color: '#26335B'
      }, {
        color: '#8E9FBC'
      }, {
        color: '#8C1C13'
      }, {
        color: '#3574DF'
      }]
    }]
  }))))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", blockProps, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("section", {
    className: "header-block-section",
    style: {
      backgroundColor: sectionBackgroundColor
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "header-wrap"
  }, headingContent && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "header-title",
    style: {
      backgroundColor: '#fff'
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(selectedHeadingTag, {
    style: {
      color: headingColor
    }
  }, headingContent)), showSubHeading && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "subheading-title",
    style: {
      color: subHeadingColor
    }
  }, subheading)))));
}

/***/ }),

/***/ "./blocks/custom-header/src/editor.scss":
/*!**********************************************!*\
  !*** ./blocks/custom-header/src/editor.scss ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./blocks/custom-header/src/images/header-icon.svg":
/*!*********************************************************!*\
  !*** ./blocks/custom-header/src/images/header-icon.svg ***!
  \*********************************************************/
/*! exports provided: default, ReactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactComponent", function() { return SvgHeaderIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SvgHeaderIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 26,
    height: 26,
    fill: "none"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("mask", {
    id: "header-icon_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 0,
    y: 0,
    width: 26,
    height: 26
  }, _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
    fill: "#D9D9D9",
    d: "M0 0h26v26H0z"
  }))), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
    mask: "url(#header-icon_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
    d: "M14.083 16.792h7.583V9.208h-7.583v7.584zm-2.167 2.166v-4.875h-9.75v-2.166h9.75V7.042h11.917v11.916H11.917z",
    fill: "#8E9FBC"
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI2IDI2IiBmaWxsPSJub25lIj4KPG1hc2sgaWQ9Im1hc2swXzUyMDRfMTc5NCIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2Ij4KPHJlY3Qgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSIjRDlEOUQ5Ii8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF81MjA0XzE3OTQpIj4KPHBhdGggZD0iTTE0LjA4MzIgMTYuNzkxN0gyMS42NjY1VjkuMjA4MzVIMTQuMDgzMlYxNi43OTE3Wk0xMS45MTY1IDE4Ljk1ODRWMTQuMDgzNEgyLjE2NjVWMTEuOTE2N0gxMS45MTY1VjcuMDQxNjlIMjMuODMzMlYxOC45NTg0SDExLjkxNjVaIiBmaWxsPSIjOEU5RkJDIi8+CjwvZz4KPC9zdmc+");


/***/ }),

/***/ "./blocks/custom-header/src/index.js":
/*!*******************************************!*\
  !*** ./blocks/custom-header/src/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./blocks/custom-header/src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./blocks/custom-header/src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./blocks/custom-header/src/save.js");
/* harmony import */ var _images_header_icon_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/header-icon.svg */ "./blocks/custom-header/src/images/header-icon.svg");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



const headerIcon = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_images_header_icon_svg__WEBPACK_IMPORTED_MODULE_5__["ReactComponent"], {
  "aria-hidden": "true",
  focusable: "false",
  style: {
    display: 'block',
    width: '36px',
    height: '27px',
    fill: '#8E9FBC'
  }
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__["registerBlockType"])('craft-blocks/custom-header', {
  icon: {
    src: headerIcon
  },
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./blocks/custom-header/src/save.js":
/*!******************************************!*\
  !*** ./blocks/custom-header/src/save.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return save; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);




function save({
  attributes
}) {
  console.log('save', attributes);
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["useBlockProps"].save({
    className: 'wz-alert'
  });
  const {
    subheading,
    activeTab,
    showSubHeading,
    headingContent,
    headingTag,
    sectionBackgroundColor,
    subHeadingColor,
    headingColor
  } = attributes;
  const className = blockProps.className;
  const selectedHeadingTag = headingTag || 'div';
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", blockProps, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("section", {
    className: "header-block-section",
    style: {
      backgroundColor: sectionBackgroundColor
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "header-wrap"
  }, headingContent && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "header-title",
    style: {
      backgroundColor: '#fff'
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(selectedHeadingTag, {
    style: {
      color: headingColor
    }
  }, headingContent)), showSubHeading && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "subheading-title",
    style: {
      color: subHeadingColor
    }
  }, subheading))));
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["compose"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map