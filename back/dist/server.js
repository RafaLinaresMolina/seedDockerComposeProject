"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var app = (0, express_1.default)();
var PORT = 5000;
app.get('/', function (req, res) {
    console.log("HI!");
    res.send('Hello World!');
});
app.listen(PORT);
//# sourceMappingURL=server.js.map