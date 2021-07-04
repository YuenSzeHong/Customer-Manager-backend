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
var express = require('express');
var app = express();
var MySQLConnect_js_1 = require("./MySQLConnect.js");
app.listen(3000);
console.log("Backend Listening on port 3000");
app.get('/', function (req, res) {
    res.redirect('/api/customers');
});
app.get('/api/customers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MySQLConnect_js_1.db.execute("SELECT * FROM customers;")];
            case 1:
                rows = (_a.sent())[0];
                res.json(rows);
                res.json(rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).send("error fetching customers");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/customer/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, MySQLConnect_js_1.db.execute("SELECT * FROM customers WHERE id = ?;", [id])];
            case 1:
                rows = (_a.sent())[0];
                if (rows.length === 0)
                    res.status(404).send("No Such Customer with id " + id);
                res.json(rows);
                console.table(rows);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).send("error fetching customers, error:" + err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/customer/add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, key, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                value = [];
                console.log(req.query);
                for (key in req.query) {
                    // console.log(req.params[key])
                    value.push(req.query[key]);
                }
                console.table(value);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, MySQLConnect_js_1.db.execute("INSERT INTO customers (first_name,last_name,phone,email,address,city,state) VALUES (?,?,?,?,?,?,?)", value)];
            case 2:
                _a.sent();
                res.send("Customer added");
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(500).send("error inserting customers, error: " + err_3.message);
                console.error(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/customer/update/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, key, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                value = [];
                console.log(req.query);
                for (key in req.query) {
                    // console.log(req.params[key])
                    value.push(req.query[key]);
                }
                value.push(req.params.id);
                console.table(value);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, MySQLConnect_js_1.db.execute("UPDATE customers SET first_name=?,last_name=?,phone=?,email=?,address=?,city=?,state=? WHERE id=?", value)];
            case 2:
                _a.sent();
                res.send("Customer with id:" + req.params.id + " updated");
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(500).send("error updating customers, error: " + err_4.message);
                console.error(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app["delete"]('/api/customer/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, MySQLConnect_js_1.db.execute("DELETE FROM customers WHERE id = ?;", [id])];
            case 1:
                rows = (_a.sent())[0];
                res.send("Customer with id: " + req.params.id + " deleted");
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).send("error delete customer, error:" + err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map