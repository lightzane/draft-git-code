"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEndpoints = void 0;
const path_1 = __importDefault(require("path"));
function LogEndpoints(module, logger, stack) {
    stack.forEach((s) => {
        const route = s.route;
        const endpoint = route.path;
        const method = Object.keys(route.methods)[0].toUpperCase();
        const filename = path_1.default.parse(module.filename).name.replace(/\.route$/, '');
        logger.debug(`Mapped ${method} /${filename}${endpoint}`);
    });
}
exports.LogEndpoints = LogEndpoints;
