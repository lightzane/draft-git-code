"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsRoute = void 0;
const express_1 = require("express");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const docs_controller_1 = require("./docs.controller");
class DocsRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.logger = (0, logger_1.Logger)('DocsRoute');
        this.router.post('/', docs_controller_1.DocsController.getStaticPath);
        (0, utils_1.LogEndpoints)(module, this.logger, this.router.stack);
    }
}
exports.DocsRoute = DocsRoute;
