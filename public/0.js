(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Upload.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Upload.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      table_data: null
    };
  },
  methods: {
    handleFileSelect: function handleFileSelect(evt) {
      var file = evt.target.files[0];
      var vm = this;
      papaparse__WEBPACK_IMPORTED_MODULE_0___default.a.parse(file, {
        header: false,
        dynamicTyping: true,
        complete: function complete(data) {
          var x = data.data;
          vm.$root.csv_headers = x.shift();
          vm.$root.csv_data = x;
        }
      });
    },
    populateTable: function populateTable() {
      var i, j;
      var op = "";
      var data = this.$root.csv_data;

      for (i = 0; i < data.length; i++) {
        op += "<tr><td class='border border-black'>" + data[i].join("</td><td class='border border-black'>") + "</td></tr>";
      }

      this.table_data = "<thead class='bg-black text-white'><tr><th class='border border-white'>" + this.$root.csv_headers.join("</th><th class='border border-white'>") + "</th></tr></thead><tbody>" + op + "</tbody>";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", { staticClass: "text-4xl" }, [_vm._v("Upload")]),
    _vm._v(" "),
    _c("section", { attrs: { id: "content" } }, [
      _c("input", {
        staticClass: "btn btn-green",
        attrs: { type: "file", id: "files", multiple: "" },
        on: { change: _vm.handleFileSelect }
      }),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c("h2", [_vm._v("FileInfo")]),
      _vm._v(" "),
      _c("div", { attrs: { id: "file-info" } }),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "btn btn-blue", on: { click: _vm.populateTable } },
        [_vm._v("View Data")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "h-64 w-auto overflow-scroll" }, [
        _c("table", {
          staticClass: "text-xs border-collapsea",
          domProps: { innerHTML: _vm._s(_vm.table_data) }
        })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Upload.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Upload.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Upload.vue?vue&type=template&id=6c02d3ac& */ "./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac&");
/* harmony import */ var _Upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Upload.vue?vue&type=script&lang=js& */ "./resources/js/components/Upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Upload.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Upload.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Upload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Upload.vue?vue&type=template&id=6c02d3ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Upload.vue?vue&type=template&id=6c02d3ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Upload_vue_vue_type_template_id_6c02d3ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);