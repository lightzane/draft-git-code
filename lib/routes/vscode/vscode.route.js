"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSCodeRoute = void 0;
const express_1 = require("express");
const logger_1 = require("../../logger");
const vscode_controller_1 = require("./vscode.controller");
const utils_1 = require("../../utils");
class VSCodeRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.logger = (0, logger_1.Logger)('VSCodeRoute');
        this.router.get('/:parentSlug/:repo', vscode_controller_1.VSCodeController.open);
        (0, utils_1.LogEndpoints)(module, this.logger, this.router.stack);
    }
}
exports.VSCodeRoute = VSCodeRoute;
