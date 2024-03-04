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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const app_1 = require("../app");
const context_1 = require("../context");
const logger_1 = require("../logger");
const logger = (0, logger_1.Logger)('Serve');
const serve = (port) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.NO_BROWSER) {
        openBrowser(port);
    }
    (0, app_1.startServer)(port);
});
function openBrowser(port = context_1.CONTEXT.port) {
    const url = new URL(`http://localhost:${port}`).href;
    const platform = process.platform;
    logger.info('Opening browser');
    switch (platform) {
        case 'win32':
            (0, child_process_1.exec)(`start ${url}`);
            break;
        case 'darwin':
            (0, child_process_1.exec)(`open ${url}`);
            break;
        case 'linux':
            (0, child_process_1.exec)(`xdg-open ${url}`);
            break;
        default:
            break;
    }
}
exports.default = serve;
