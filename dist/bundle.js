/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./index.js\");\n\n\nlet p = new _index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]( `\n<html>\n<body>\n<prev1 class=\"prev\">\n  dd\n</prev1>\n\n<prev class=\"prev\">\n  dd\n</prev>\n\n<div class=\"test test1\">\ndd <span>aaa</span>\n</div>\n\n<next class=\"next\">\n  dd\n</next>\n\n<next1 class=\"next\">\n  dd\n</next1>\n\n<input type=\"text\" />\n<input type=\"button\" />\n\n<div class=\"test1\">ddd<div id=\"test\">aaa</div></div>\n\n\n</body>\n</html> ` );\n\nconsole.log( p.find(\"body\",0).find(\"div\") );\n\n//# sourceURL=webpack://js-dom-parser/./app.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_Parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Parser.js */ \"./src/Parser.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_Parser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://js-dom-parser/./index.js?");

/***/ }),

/***/ "./src/Attr.js":
/*!*********************!*\
  !*** ./src/Attr.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Attrs)\n/* harmony export */ });\nclass Attrs {\n    classes() {\n        return this.class?this.class.split(\" \"):[];\n    }\n    set(key, value) {\n        this[key] = value;\n    }\n    get(key) {\n        return this[key];\n    }\n    makeAttrsText() {\n        let ret = '';\n        let pre = '';\n        for (let attr in this) {\n            let value = this[attr];\n            ret += pre + attr + '=\"' + value + '\"';\n            pre = ' ';\n        }\n        return ret;\n    }\n}\n\n//# sourceURL=webpack://js-dom-parser/./src/Attr.js?");

/***/ }),

/***/ "./src/Find.js":
/*!*********************!*\
  !*** ./src/Find.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Find)\n/* harmony export */ });\n/* harmony import */ var _Query_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query.js */ \"./src/Query.js\");\n\n//import NodeList from \"./NodeList.js\";\n\nclass Find {\n\tfindAttr(attrs = [], tags) {\n\t\tlet ret = []; //new NodeList;\n\t\tfor (let tag of tags) {\n\t\t\tlet f = true;\n\t\t\tfor (let attr in attrs) {\n\t\t\t\tlet value = attrs[attr];\n\t\t\t\tif (attr === 'class') {\n\t\t\t\t\tlet classes = tag.attrs ? tag.attrs.classes() : [];\n\t\t\t\t\tif (!classes.includes(value)) {\n\t\t\t\t\t\tf = false;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tlet g = attr === 'tag' ? tag.tag : (tag.attrs?tag.attrs[attr]:'');\n\t\t\t\t\tif (g !== value) {\n\t\t\t\t\t\tf = false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (f) {\n\t\t\t\tret.push(tag);\n\t\t\t}\n\t\t\tif (tag.childrens) {\n\t\t\t\tlet found = this.findAttr(attrs, tag.childrens);\n\t\t\t\tfor (let a of found) {\n\t\t\t\t\tret.push(a);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn ret;\n\t}\n\n\tfind(query = '', tags = [], index = []) {\n\t\tif (!query) {\n\t\t\treturn tags;\n\t\t}\n\t\tlet q = new _Query_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t\tq.iq = 0;\n\t\tq.query = query;\n\t\tlet ret = tags;\n\t\twhile (query = q.getQueries()) {\n\t\t\tif (query === ',') {\n\t\t\t\tq.mQuery = q.getQueries();\n\t\t\t\tq.miq = 0;\n\t\t\t\tlet attrs = q.parseQuery();\n\t\t\t\tlet finded = this.findAttr(attrs, tags);\n\t\t\t\tfor (let f of finded) {\n\t\t\t\t\tret.push(f);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tq.mQuery = query;\n\t\t\t\tq.miq = 0;\n\t\t\t\tlet attrs = q.parseQuery();\n\t\t\t\tret = this.findAttr(attrs, ret);\n\t\t\t}\n\t\t}\n\t\tif (!Array.isArray(index)) {\n\t\t\tret = ret[index];\n\t\t}\n\t\treturn ret;\n\t}\n}\n\n//# sourceURL=webpack://js-dom-parser/./src/Find.js?");

/***/ }),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Parser)\n/* harmony export */ });\n/* harmony import */ var _Attr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attr.js */ \"./src/Attr.js\");\n/* harmony import */ var _Tag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tag.js */ \"./src/Tag.js\");\n/* harmony import */ var _Find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Find.js */ \"./src/Find.js\");\n\n\n\n\nclass Parser {\n    ParseAttr() {\n        let attrs = new _Attr_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        let attr = '';\n        let nowAttr = '';\n        let c1;\n        while (!this.empty(c1 = this.nextTok())) {\n            if (c1 == ' ') {\n                attr = '';\n                continue;\n            }\n            let t = '';\n            if (c1 == '=') {\n                nowAttr = attr;\n                attr = '';\n                if (this.html[this.i] == '\"' || this.html[this.i] == \"'\") {\n                    t = this.html[this.i];\n                    this.i++;\n                }\n                let value = '';\n                let c2;\n                while (!this.empty(c2 = this.nextTok())) {\n                    if (!t && c2 == ' ') {\n                        break;\n                    }\n                    if (!t && c2 == '>') {\n                        this.i--;\n                        break;\n                    }\n                    if (c2 == t)\n                        break;\n                    value += c2;\n                }\n                attrs[nowAttr] = value;\n                attr = '';\n            }\n            if (!t && c1 == '=')\n                continue;\n            if (c1 == '>') {\n                if (attr != '' && attr != '=' && attr != '/')\n                    attrs[attr] = '';\n                break;\n            }\n            attr += c1;\n        }\n        return attrs;\n    }\n\n    ParseTag() {\n        if (this.isEqual('![CDATA[')) {\n            this.i += 8;\n            var tag = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n            tag.tag = 'cdata';\n            return tag;\n        }\n        if (this.html[this.i + 1] == '/') this.i++;\n        var tag = '';\n        let c1;\n        while (c1 = this.html[this.i++]) {\n            if (c1 == '>') {\n                break;\n            }\n            if (c1 == ' ') {\n                var attrs = this.ParseAttr();\n                break;\n            }\n            tag += c1;\n        }\n        var ret = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        ret.tag = tag;\n        if (attrs) ret.attrs = attrs;\n        if (tag.substr(0, 1) == '/') {\n            ret.isEnd = true;\n            ret.tag = tag.substr(1);\n        }\n        if (tag.substr(-1) == '/') {\n            ret.tag = tag.substr(0, tag.length - 1);\n        }\n\n        return ret;\n    }\n    parseContents() {\n        this.i--;\n        var content = '';\n        let c1;\n        while (!this.empty(c1 = this.nextTok())) {\n            if (c1 == '<') {\n                break;\n            }\n            content += c1;\n        }\n        this.i--;\n        var tag = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        tag.tag = 'empty';\n        tag.content = content;\n        return tag;\n    }\n    nextTok() {\n        var ret = this.html[this.i++];\n        return ret;\n    }\n    empty(a) {\n        return !a && a !== '0';\n    }\n\n    parseComment() {\n        this.i += 3;\n        var content = '';\n        while (!this.empty(c1 = this.nextTok())) {\n            if (c1 == '-' && this.html[this.i] == '-' && this.html[this.i + 1] == '>') {\n                break;\n            }\n            content += c1;\n        }\n        this.i += 3;\n        var tag = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        tag.tag = 'comment';\n        tag.content = content;\n        return tag;\n    }\n\n    next1() {\n        let c = this.html[this.i++];\n        if (!c) return;\n        if (c === '<') {\n            if (this.html[this.i] === '!' && this.html[this.i + 1] === '-' && this.html[this.i + 2] === '-') {\n                return this.parseComment();\n            }\n            if (this.html[this.i] === ' ') {\n                this.i++;\n                let cn = this.parseContents();\n                cn.content = '<' + cn.content;\n                return cn;\n            }\n            return this.ParseTag();\n        } else {\n            return this.parseContents();\n        }\n    }\n\n    next() {\n        this.current = this.next1();\n        return this.current;\n    }\n\n    isEqual(text) {\n        let i = this.i;\n        let html = this.html;\n        let j = 0;\n        let c;\n        while (c = text[j++]) {\n            if (html[i++] != c)\n                return false;\n        }\n        return true;\n    }\n\n    parseScriptInner() {\n        let content = '';\n        while (!this.empty(c1 = this.nextTok())) {\n            if (c1 == '<') {\n                if (this.isEqual('/script')) {\n                    break;\n                }\n            }\n            content += c1;\n        }\n        this.i += 8;\n        return content;\n    }\n\n    parseCData() {\n        let content = '';\n        while( ! this.empty( c1 = this.nextTok() ) ) {\n            if( c1 == ']' ) {\n                if( this.isEqual(']>') ) {\n                    break;\n                }\n            }\n            content += c1;\n        }\n        this.i+= 2;\n        return content;\n    }\n\n    getTag() {\n        let tag = this.next();\n        if( ! tag )\n            return;\n        if( tag.tag == 'cdata' ) {\n            tag.content = this.parseCData();\n            return tag;\n        }\n        if( tag.tag.substr(0,4) == '?xml' ) { this.isXml = true; return tag; }\n        if( this.isXml ) {\n            this.hasNoEndTags.splice(11, 1);\n        }\n        if( this.hasNoEndTags.includes( tag.tag ) ) return tag;\n        if( tag.isEnd ) return tag;\n        if( tag.tag == 'script' ) {\n            let content = this.parseScriptInner();\n            tag.content = content;\n        } else {\n            let childrens = this.parse( tag );\n            if( childrens )\n                tag.childrens = childrens;          \n        }\n        if( tag.tag == this.current.tag ) {\n            return tag;\n        }\n        while( etag = this.next() ) {\n            if( tag.tag == etag.tag )\n                break;\n        }\n        return tag;\n    }\n\n    parse(parent = '') {\n        let tags = [];\n        let stag = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        let eq = 0;\n        let tag;\n        while (tag = this.getTag()) {\n            \n            if (tag.isEnd && parent.tag === tag.tag) break;\n            if (tag.tag === 'empty' && (tag.content.trim() === '')) continue;\n            if (!tag.isEnd) {\n                tag.eq = eq++;\n                tag.prev = stag;\n                tag.parent = parent;\n                stag.next = tag;\n                if( tag.childrens )\n                    tag.html = tag.getHtml();\n                tags.push(tag);\n            }\n            stag = tag;\n        }\n        return tags;\n    }\n\n    find(query = '', index = []) {\n        let f = new _Find_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        return f.find(query, this.document.childrens, index);\n    }\n\n    constructor(html) {\n\n        this.isXml = false;\n        this.hasNoEndTags = ['comment', 'empty','!DOCTYPE', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'meta', 'link', 'br', 'input', 'hr', 'img'];\n\n        this.tags = [];\n        this.html = html;\n        this.i = 0;\n        this.id = 0;\n\n        let document = new _Tag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        document.tag = 'document';\n        document.childrens = this.parse(document);\n        document.html = document.getHtml();\n        this.document = document;\n    }\n\n    querySelectorAll( query = '', index = [] ) {\n        return this.find();\n    }\n}\n\n//# sourceURL=webpack://js-dom-parser/./src/Parser.js?");

/***/ }),

/***/ "./src/Query.js":
/*!**********************!*\
  !*** ./src/Query.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Query)\n/* harmony export */ });\nclass Query {\n    getQueries() {\n        let c = this.query[this.iq];\n        if (c == ' ' || c == ',' || c == '>') {\n            this.iq++;\n            return c;\n        }\n        let a = '';\n    \n        while (c = this.query[this.iq++]) {\n            this.sep = ' ';\n            if (c == ' ' || c == ',' || c == '>') {\n                this.iq--;\n                break;\n            }\n            a += c;\n        }\n        return a;\n    }\n    getStr() {\n        let a = '';\n        let c;\n        while (c = this.mQuery[this.miq++]) {\n            if (['#', '.', '[', '=', ']'].includes(c))\n                break;\n            a += c;\n        }\n        this.miq--;\n        return a;\n    }\n    parseQuery() {\n        let ret = {};\n        let c;\n        while (c = this.mQuery[this.miq++]) {\n            if (c == '.') {\n                ret['class'] = this.getStr();\n            } else if (c == '#') {\n                ret['id'] = this.getStr();\n            } else if (c == ']') {\n                this.miq++;\n            } else if (c == '[') {\n                let key = this.getStr();\n                this.miq++;\n                ret[key] = this.getStr();\n            } else {\n                this.miq--;\n                ret['tag'] = this.getStr();\n            }\n        }\n        return ret;\n    }\n}\n\n//# sourceURL=webpack://js-dom-parser/./src/Query.js?");

/***/ }),

/***/ "./src/Tag.js":
/*!********************!*\
  !*** ./src/Tag.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tag)\n/* harmony export */ });\n/* harmony import */ var _Find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Find.js */ \"./src/Find.js\");\n\n\nclass Tag {\n\tconstructor() {\n\t}\n\t__get(key) {\n\t\tif (this.attrs[key])\n\t\t\treturn this.attrs[key];\n\t\treturn this[key];\n\t}\n\t__set(key, value) {\n\t\tif (this.attrs[key])\n\t\t\tthis.attr(key, value);\n\t\tthis[key] = value;\n\t}\n\tfind(query, index = []) {\n\t\tconst f = new _Find_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t\treturn f.find(query, [this], index);\n\t}\n\tremove() {\n\t\tdelete this.parent.childrens[this.eq];\n\t\tthis.updateParentsHtml(this.parent);\n\t}\n\tnotEmpty() {\n\t\tconst ret = [];\n\t\tfor (const child of this.childrens) {\n\t\t\tif (child.tag !== 'empty')\n\t\t\t\tret.push(child);\n\t\t}\n\t\treturn ret;\n\t}\n\tgetElementById(id) {\n\t\treturn this.find(\"#\" + id)[0];\n\t}\n\tgetElementByTagName(name) {\n\t\treturn this.find(name)[0];\n\t}\n\tgetElementsByTagName(name) {\n\t\treturn this.find(name);\n\t}\n\tchildren(index = []) {\n\t\tlet ret = this.notEmpty();\n\t\tif (!Array.isArray(index)) {\n\t\t\tret = ret[index];\n\t\t}\n\t\treturn ret;\n\t}\n\tattr(name, value = '') {\n\t\tif (value)\n\t\t\treturn this.setAttribute(name, value);\n\t\treturn this.getAttribute(name);\n\t}\n\tsetAttribute(name, value) {\n\t\tthis.attrs.set(name, value);\n\t\treturn this;\n\t}\n\tgetAttribute(name) {\n\t\tthis.attrs.get(name);\n\t\treturn this;\n\t}\n\tparent() {\n\t\treturn this.parent;\n\t}\n\tnext() {\n\t\treturn this.next;\n\t}\n\n\tmakeHtml(tag, content) {\n\t    return '<' + tag.tag + (tag.attrs ? ' ' + tag.attrs.makeAttrsText() : '') + '>' + content + '</' + tag.tag + '>';\n\t}\n\n\tconcatHtmls(childrens) {\n\t\tlet html = '';\n\t\tfor (let child of childrens) {\n\t\t\tif (child.tag == 'empty')\n\t\t\t\thtml += child.content;\n\t\t\telse {\n\t\t\t\tlet ct = '';\n\t\t\t\tif (child.childrens)\n\t\t\t\t\tct = this.concatHtmls(child.childrens);\n\t\t\t\thtml += this.makeHtml(child, ct);\n\t\t\t}\n\t\t}\n\t\treturn html;\n\t}\n\n\tupdateParentsHtml(parent) {\n\t    parent.html = parent.getHtml();\n\t    if (parent.parent) {\n\t        updateParentsHtml(parent.parent);\n\t    }\n\t}\n\n\thtml(html) {\n\t    if (html) {\n\t        var p = new Parser(html);\n\t        var childs = p.find();\n\t        this.childrens = childs;\n\t        childs.forEach(function(child) {\n\t            child.parent = this;\n\t        });\n\t        this.html = this.getHtml();\n\t        updateParentsHtml(this.parent);\n\t        return this;\n\t    }\n\t    return this.html;\n\t}\n\n\tgetHtml() {\n\t    return this.concatHtmls(this.childrens);\n\t}\n\n\touterHtml() {\n\t    return makeHtml(this, this.concatHtmls(this.childrens));\n\t}\n\n\ttext() {\n\t    return this.concatTexts(this.childrens);\n\t}\n\t\n\tconcatTexts(childrens) {\n\t    let html = '';\n\t    childrens.forEach(child => {\n\t        if (child.content)\n\t            html += child.content;\n\t        if (child.childrens) {\n\t            let t = this.concatTexts(child.childrens);\n\t            if (t)\n\t                html += t;\n\t        }\n\t    });\n\t    return html;\n\t}\n}\n\n//# sourceURL=webpack://js-dom-parser/./src/Tag.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;