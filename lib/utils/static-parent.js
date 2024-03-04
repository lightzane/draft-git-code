"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticParents = exports.STATIC_HOME = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fetch_parents_1 = require("./fetch-parents");
exports.STATIC_HOME = '_';
function staticParents(app) {
    const parents = (0, fetch_parents_1.fetchParents)() || {};
    Object.entries(parents).forEach(([_, value]) => {
        if (fs_1.default.existsSync(value.path)) {
            app.use(`/${exports.STATIC_HOME}/${value.slug}`, express_1.default.static(path_1.default.join(value.path)));
        }
    });
}
exports.staticParents = staticParents;
