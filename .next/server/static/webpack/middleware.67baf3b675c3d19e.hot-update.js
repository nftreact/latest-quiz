"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(middleware)/./node_modules/next/dist/esm/server/web/exports/next-response.js\");\n\nconst middleware = async (request, res)=>{\n    const ip = (request.headers.get(\"x-forwarded-for\") ?? \"127.0.0.1\").split(\",\")[0];\n    let response = next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].next();\n    response.cookies.set(\"user-ip-address\", ip);\n};\nconst config = {\n    unstable_allowDynamic: [\n        \"/node_modules/lodash/**\"\n    ],\n    matcher: [\n        \"/\",\n        \"/question/:path*\",\n        \"/checkout\",\n        \"/question\",\n        \"/checkout:path*\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFFMEM7QUFFbkMsTUFBTUMsYUFBYSxPQUFPQyxTQUFzQkM7SUFDckQsTUFBTUMsS0FBSyxDQUFDRixRQUFRRyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxzQkFBc0IsV0FBVSxFQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDaEYsSUFBSUMsV0FBV1Isa0ZBQVlBLENBQUNTLElBQUk7SUFDaENELFNBQVNFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQlA7QUFDMUMsRUFBQztBQUVNLE1BQU1RLFNBQVM7SUFDcEJDLHVCQUF1QjtRQUFDO0tBQTBCO0lBQ2xEQyxTQUFTO1FBQUM7UUFBSztRQUFvQjtRQUFhO1FBQWE7S0FBa0I7QUFDakYsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9taWRkbGV3YXJlLnRzPzQyMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcblxuZXhwb3J0IGNvbnN0IG1pZGRsZXdhcmUgPSBhc3luYyAocmVxdWVzdDogTmV4dFJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IGlwID0gKHJlcXVlc3QuaGVhZGVycy5nZXQoJ3gtZm9yd2FyZGVkLWZvcicpID8/ICcxMjcuMC4wLjEnKS5zcGxpdCgnLCcpWzBdXG4gIGxldCByZXNwb25zZSA9IE5leHRSZXNwb25zZS5uZXh0KClcbiAgcmVzcG9uc2UuY29va2llcy5zZXQoJ3VzZXItaXAtYWRkcmVzcycsIGlwKVxufVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICB1bnN0YWJsZV9hbGxvd0R5bmFtaWM6IFsnL25vZGVfbW9kdWxlcy9sb2Rhc2gvKionXSxcbiAgbWF0Y2hlcjogWycvJywgJy9xdWVzdGlvbi86cGF0aConLCAnL2NoZWNrb3V0JywgJy9xdWVzdGlvbicsICcvY2hlY2tvdXQ6cGF0aConXSxcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsInJlcyIsImlwIiwiaGVhZGVycyIsImdldCIsInNwbGl0IiwicmVzcG9uc2UiLCJuZXh0IiwiY29va2llcyIsInNldCIsImNvbmZpZyIsInVuc3RhYmxlX2FsbG93RHluYW1pYyIsIm1hdGNoZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});