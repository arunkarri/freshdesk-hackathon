"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var env_1 = require("./env");
var dom_methods_1 = require("./dom-methods");
var loader = function (color) {
    return "<div class=\"spinner-border " + color + " spinner-border-sm\" role=\"status\">\n<span class=\"visually-hidden\"></span>\n</div>";
};
function getTickets() {
    return __awaiter(this, void 0, void 0, function () {
        var ticketReq, ticketRes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(env_1["default"].arguments.domainUrl + "/api/v2/tickets", {
                            headers: new Headers({
                                Authorization: 'Basic ' + btoa(appKeyPass)
                            })
                        })];
                case 1:
                    ticketReq = _a.sent();
                    return [4 /*yield*/, ticketReq.json()];
                case 2:
                    ticketRes = _a.sent();
                    console.log(ticketRes);
                    buildCardUI(ticketRes);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getTickets();
function getContactDetail(id) {
    return __awaiter(this, void 0, void 0, function () {
        var contactReq, contactRes, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(env_1["default"].arguments.domainUrl + "/api/v2/contacts/" + id, {
                            headers: new Headers({
                                Authorization: 'Basic ' + btoa(env_1["default"].arguments.appKeyPass)
                            })
                        })];
                case 1:
                    contactReq = _a.sent();
                    return [4 /*yield*/, contactReq.json()];
                case 2:
                    contactRes = _a.sent();
                    return [2 /*return*/, contactRes.name];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateTicket(id, priority, status) {
    return __awaiter(this, void 0, void 0, function () {
        var priorityDrop, statusDrop, endpoint, input, updateReq, updateRes, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(priority, status);
                    priorityDrop = dom_methods_1["default"].arguments.getEle("priority-dropdown" + id);
                    statusDrop = dom_methods_1["default"].arguments.getEle("status-dropdown" + id);
                    if (priority !== null) {
                        priorityDrop.innerHTML = loader('text-primary');
                    }
                    else if (status !== undefined) {
                        statusDrop.innerHTML = loader('text-success');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    endpoint = domainUrl + "api/v2/tickets/" + id;
                    input = {};
                    if (priority !== null) {
                        input = { priority: priority };
                    }
                    else if (status !== undefined) {
                        input = { status: status };
                    }
                    return [4 /*yield*/, fetch(endpoint, {
                            method: 'PUT',
                            body: JSON.stringify(input),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                Authorization: 'Basic ' + btoa(appKeyPass)
                            })
                        })];
                case 2:
                    updateReq = _a.sent();
                    return [4 /*yield*/, updateReq.json()];
                case 3:
                    updateRes = _a.sent();
                    console.log(updateRes);
                    if (priority !== null) {
                        buildPriority(priorityDrop, updateRes);
                    }
                    else {
                        buildStatus(statusDrop, updateRes);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function formatDate(date) {
    var createdDate = new Date(date);
    var today = new Date();
    var diff = Math.abs(today.getTime() - createdDate.getTime());
    return Math.round(diff / (1000 * 3600));
}
function getPriority(code, type) {
    var text = 'Low';
    var priorityClass = 'low';
    if (code === 2) {
        text = 'Medium';
        priorityClass = text.toLowerCase();
    }
    else if (code === 3) {
        text = 'High';
        priorityClass = text.toLowerCase();
    }
    else if (code === 4) {
        text = 'Urgent';
        priorityClass = text.toLowerCase();
    }
    if (type === 'text') {
        return text;
    }
    else {
        return priorityClass;
    }
}
function getStatus(code) {
    var text = 'Open';
    if (code === 3) {
        text = 'Pending';
    }
    else if (code === 4) {
        text = 'Resolved';
    }
    else if (code === 5) {
        text = 'Closed';
    }
    return text;
}
var priorities = [
    { value: 'Low', id: 1 },
    { value: 'Medium', id: 2 },
    { value: 'High', id: 3 },
    { value: 'Urgent', id: 4 },
];
function buildPriority(priorityDrop, element) {
    priorityDrop.innerHTML = '';
    var priorityBtn = dom_methods_1["default"].arguments.createElement('button');
    dom_methods_1["default"].arguments.setAttribute(priorityBtn, 'type', 'button');
    dom_methods_1["default"].arguments.setAttribute(priorityBtn, 'class', 'btn btn-sm dropdown-toggle drop-menu');
    dom_methods_1["default"].arguments.setAttribute(priorityBtn, 'data-toggle', 'dropdown');
    dom_methods_1["default"].arguments.appendChild(priorityDrop, priorityBtn);
    var prioritySpan = dom_methods_1["default"].arguments.createElement('span');
    dom_methods_1["default"].arguments.setAttribute(prioritySpan, 'id', 'status');
    dom_methods_1["default"].arguments.setAttribute(prioritySpan, 'class', getPriority(element.priority, 'class'));
    dom_methods_1["default"].arguments.appendChild(priorityBtn, prioritySpan);
    var priorityText = dom_methods_1["default"].arguments.createElement('span');
    priorityText.innerText = getPriority(element.priority, 'text');
    dom_methods_1["default"].arguments.appendChild(priorityBtn, priorityText);
    var dropMenu = dom_methods_1["default"].arguments.createElement('div');
    dom_methods_1["default"].arguments.setAttribute(dropMenu, 'class', 'dropdown-menu');
    dom_methods_1["default"].arguments.appendChild(priorityDrop, dropMenu);
    priorities.forEach(function (priority) {
        var dropItem = dom_methods_1["default"].arguments.createElement('a');
        dom_methods_1["default"].arguments.setAttribute(dropItem, 'class', 'dropdown-item');
        dom_methods_1["default"].arguments.setAttribute(dropItem, 'onclick', "updateTicket(" + element.id + ", " + priority.id + ")");
        if (priority.value === getPriority(element.priority, 'text')) {
            dropItem.classList.add('active');
        }
        else {
            dropItem.classList.remove('active');
        }
        dom_methods_1["default"].arguments.appendChild(dropMenu, dropItem);
        var labelClass = dom_methods_1["default"].arguments.createElement('span');
        dom_methods_1["default"].arguments.setAttribute(labelClass, 'class', priority.value.toLowerCase());
        dom_methods_1["default"].arguments.appendChild(dropItem, labelClass);
        var label = dom_methods_1["default"].arguments.createElement('span');
        label.innerText = priority.value;
        dom_methods_1["default"].arguments.appendChild(dropItem, label);
    });
}
var statuses = [
    { value: 'Open', id: 2 },
    { value: 'Pending', id: 3 },
    { value: 'Resolved', id: 4 },
    { value: 'Closed', id: 5 },
];
function buildStatus(statusDrop, element) {
    statusDrop.innerHTML = '';
    var statusBtn = dom_methods_1["default"].arguments.createElement('button');
    dom_methods_1["default"].arguments.setAttribute(statusBtn, 'type', 'button');
    dom_methods_1["default"].arguments.setAttribute(statusBtn, 'class', 'btn btn-sm dropdown-toggle drop-menu');
    dom_methods_1["default"].arguments.setAttribute(statusBtn, 'data-toggle', 'dropdown');
    dom_methods_1["default"].arguments.appendChild(statusDrop, statusBtn);
    var statusImg = dom_methods_1["default"].arguments.createElement('img');
    statusImg.src = 'images/pulse.png';
    dom_methods_1["default"].arguments.setAttribute(statusImg, 'class', 'pulse');
    dom_methods_1["default"].arguments.appendChild(statusBtn, statusImg);
    var statusText = dom_methods_1["default"].arguments.createElement('span');
    statusText.innerText = getStatus(element.status);
    dom_methods_1["default"].arguments.appendChild(statusBtn, statusText);
    var dropMenu = dom_methods_1["default"].arguments.createElement('div');
    dom_methods_1["default"].arguments.setAttribute(dropMenu, 'class', 'dropdown-menu');
    dom_methods_1["default"].arguments.appendChild(statusDrop, dropMenu);
    statuses.forEach(function (status) {
        var dropItem = dom_methods_1["default"].arguments.createElement('a');
        dom_methods_1["default"].arguments.setAttribute(dropItem, 'class', 'dropdown-item');
        dom_methods_1["default"].arguments.setAttribute(dropItem, 'onclick', "updateTicket(" + element.id + ", null, " + status.id + ")");
        if (status.value === getStatus(element.status)) {
            dropItem.classList.add('active');
        }
        else {
            dropItem.classList.remove('active');
        }
        dom_methods_1["default"].arguments.appendChild(dropMenu, dropItem);
        var labelClass = dom_methods_1["default"].arguments.createElement('span');
        dom_methods_1["default"].arguments.setAttribute(labelClass, 'class', status.value.toLowerCase());
        dom_methods_1["default"].arguments.appendChild(dropItem, labelClass);
        var label = dom_methods_1["default"].arguments.createElement('span');
        label.innerText = status.value;
        dom_methods_1["default"].arguments.appendChild(dropItem, label);
    });
}
//Build Card UI
function buildCardUI(data) {
    var _this = this;
    data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
        var contactName, ticketView, card, cardBody, cardRow, avatarCol, avatar, infoCol, br, title, id, bottomInfo, mailIcon, name, separator1, created, statusCol, priorityDrop, statusDrop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getContactDetail(element.requester_id)];
                case 1:
                    contactName = _a.sent();
                    ticketView = dom_methods_1["default"].arguments.getEle('ticket-view');
                    card = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(card, 'class', 'card');
                    dom_methods_1["default"].arguments.appendChild(ticketView, card);
                    cardBody = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(cardBody, 'class', 'card-body');
                    dom_methods_1["default"].arguments.appendChild(card, cardBody);
                    cardRow = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(cardRow, 'class', 'row');
                    dom_methods_1["default"].arguments.appendChild(cardBody, cardRow);
                    avatarCol = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(avatarCol, 'class', 'col-3');
                    dom_methods_1["default"].arguments.appendChild(cardRow, avatarCol);
                    avatar = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(avatar, 'class', 'avatar');
                    avatar.innerText = contactName.slice(0, 1);
                    dom_methods_1["default"].arguments.appendChild(avatarCol, avatar);
                    infoCol = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(infoCol, 'class', 'col-5');
                    dom_methods_1["default"].arguments.appendChild(cardRow, infoCol);
                    br = dom_methods_1["default"].arguments.createElement('br');
                    dom_methods_1["default"].arguments.appendChild(infoCol, br);
                    title = dom_methods_1["default"].arguments.createElement('h6');
                    dom_methods_1["default"].arguments.setAttribute(title, 'class', 'card-title');
                    title.innerText = element.subject;
                    dom_methods_1["default"].arguments.appendChild(infoCol, title);
                    id = dom_methods_1["default"].arguments.createElement('span');
                    dom_methods_1["default"].arguments.setAttribute(id, 'class', 'text-secondary');
                    id.innerText = " #" + element.id;
                    dom_methods_1["default"].arguments.appendChild(title, id);
                    bottomInfo = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(bottomInfo, 'class', 'card-bottom-text');
                    dom_methods_1["default"].arguments.appendChild(infoCol, bottomInfo);
                    mailIcon = dom_methods_1["default"].arguments.createElement('i');
                    dom_methods_1["default"].arguments.setAttribute(mailIcon, 'class', 'far fa-envelope');
                    dom_methods_1["default"].arguments.appendChild(bottomInfo, mailIcon);
                    name = dom_methods_1["default"].arguments.createElement('b');
                    name.innerText = contactName;
                    dom_methods_1["default"].arguments.appendChild(bottomInfo, name);
                    separator1 = dom_methods_1["default"].arguments.createElement('span');
                    dom_methods_1["default"].arguments.setAttribute(separator1, 'class', 'separator');
                    dom_methods_1["default"].arguments.appendChild(bottomInfo, separator1);
                    created = dom_methods_1["default"].arguments.createElement('span');
                    created.innerText = "Created " + formatDate(element.created_at) + " hours ago";
                    dom_methods_1["default"].arguments.appendChild(bottomInfo, created);
                    statusCol = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(statusCol, 'class', 'col-3');
                    dom_methods_1["default"].arguments.setAttribute(statusCol, 'id', 'status-col');
                    dom_methods_1["default"].arguments.appendChild(cardRow, statusCol);
                    priorityDrop = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(priorityDrop, 'class', 'dropdown');
                    dom_methods_1["default"].arguments.setAttribute(priorityDrop, 'id', "priority-dropdown" + element.id);
                    dom_methods_1["default"].arguments.appendChild(statusCol, priorityDrop);
                    statusDrop = dom_methods_1["default"].arguments.createElement('div');
                    dom_methods_1["default"].arguments.setAttribute(statusDrop, 'class', 'dropdown');
                    dom_methods_1["default"].arguments.setAttribute(statusDrop, 'id', "status-dropdown" + element.id);
                    dom_methods_1["default"].arguments.appendChild(statusCol, statusDrop);
                    buildPriority(priorityDrop, element);
                    buildStatus(statusDrop, element);
                    return [2 /*return*/];
            }
        });
    }); });
}
