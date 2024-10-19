"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-property-descriptors";
exports.ids = ["vendor-chunks/has-property-descriptors"];
exports.modules = {

/***/ "(ssr)/./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $defineProperty = __webpack_require__(/*! es-define-property */ \"(ssr)/./node_modules/es-define-property/index.js\");\nvar hasPropertyDescriptors = function hasPropertyDescriptors() {\n    return !!$defineProperty;\n};\nhasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {\n    // node v0.6 has a bug where array lengths can be Set but not Defined\n    if (!$defineProperty) {\n        return null;\n    }\n    try {\n        return $defineProperty([], \"length\", {\n            value: 1\n        }).length !== 1;\n    } catch (e) {\n        // In Firefox 4-22, defining length on an array throws an exception.\n        return true;\n    }\n};\nmodule.exports = hasPropertyDescriptors;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsa0JBQWtCQyxtQkFBT0EsQ0FBQztBQUU5QixJQUFJQyx5QkFBeUIsU0FBU0E7SUFDckMsT0FBTyxDQUFDLENBQUNGO0FBQ1Y7QUFFQUUsdUJBQXVCQyx1QkFBdUIsR0FBRyxTQUFTQTtJQUN6RCxxRUFBcUU7SUFDckUsSUFBSSxDQUFDSCxpQkFBaUI7UUFDckIsT0FBTztJQUNSO0lBQ0EsSUFBSTtRQUNILE9BQU9BLGdCQUFnQixFQUFFLEVBQUUsVUFBVTtZQUFFSSxPQUFPO1FBQUUsR0FBR0MsTUFBTSxLQUFLO0lBQy9ELEVBQUUsT0FBT0MsR0FBRztRQUNYLG9FQUFvRTtRQUNwRSxPQUFPO0lBQ1I7QUFDRDtBQUVBQyxPQUFPQyxPQUFPLEdBQUdOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZGluZy8uL25vZGVfbW9kdWxlcy9oYXMtcHJvcGVydHktZGVzY3JpcHRvcnMvaW5kZXguanM/ZDk3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCdlcy1kZWZpbmUtcHJvcGVydHknKTtcblxudmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcnMgPSBmdW5jdGlvbiBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzKCkge1xuXHRyZXR1cm4gISEkZGVmaW5lUHJvcGVydHk7XG59O1xuXG5oYXNQcm9wZXJ0eURlc2NyaXB0b3JzLmhhc0FycmF5TGVuZ3RoRGVmaW5lQnVnID0gZnVuY3Rpb24gaGFzQXJyYXlMZW5ndGhEZWZpbmVCdWcoKSB7XG5cdC8vIG5vZGUgdjAuNiBoYXMgYSBidWcgd2hlcmUgYXJyYXkgbGVuZ3RocyBjYW4gYmUgU2V0IGJ1dCBub3QgRGVmaW5lZFxuXHRpZiAoISRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRkZWZpbmVQcm9wZXJ0eShbXSwgJ2xlbmd0aCcsIHsgdmFsdWU6IDEgfSkubGVuZ3RoICE9PSAxO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSW4gRmlyZWZveCA0LTIyLCBkZWZpbmluZyBsZW5ndGggb24gYW4gYXJyYXkgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzO1xuIl0sIm5hbWVzIjpbIiRkZWZpbmVQcm9wZXJ0eSIsInJlcXVpcmUiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3JzIiwiaGFzQXJyYXlMZW5ndGhEZWZpbmVCdWciLCJ2YWx1ZSIsImxlbmd0aCIsImUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/has-property-descriptors/index.js\n");

/***/ })

};
;