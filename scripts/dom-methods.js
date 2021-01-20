"use strict";
//reusable functions created for DOM manipulations
exports.__esModule = true;
var dom = /** @class */ (function () {
    function dom() {
    }
    dom.prototype.createElement = function (element) {
        return document.createElement(element);
    };
    dom.prototype.getEle = function (id) {
        return document.getElementById(id);
    };
    dom.prototype.append = function (element) {
        return document.body.append(element);
    };
    dom.prototype.appendChild = function (element, child) {
        return element.appendChild(child);
    };
    dom.prototype.setAttribute = function (element, attribute, value) {
        element.setAttribute(attribute, value);
    };
    return dom;
}());
exports["default"] = dom;
