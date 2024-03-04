"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = __importDefault(require("./add"));
const config_1 = __importDefault(require("./config"));
const help_1 = __importDefault(require("./help"));
const init_1 = __importDefault(require("./init"));
const remove_1 = __importDefault(require("./remove"));
const serve_1 = __importDefault(require("./serve"));
exports.default = {
    add: add_1.default,
    config: config_1.default,
    help: help_1.default,
    init: init_1.default,
    remove: remove_1.default,
    serve: serve_1.default,
};
