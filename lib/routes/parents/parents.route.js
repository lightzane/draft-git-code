"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsRoute = void 0;
const express_1 = require("express");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const parents_controller_1 = require("./parents.controller");
class ParentsRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.logger = (0, logger_1.Logger)('ParentsRoute');
        this.router.get('/', parents_controller_1.ParentsController.getParentRecords);
        this.router.get('/:slug', parents_controller_1.ParentsController.getParent);
        this.router.get('/:slug/children', parents_controller_1.ParentsController.getChildren);
        this.router.patch('/:slug/github/:input', parents_controller_1.ParentsController.editGithub);
        this.router.post('/add', parents_controller_1.ParentsController.addParent);
        this.router.delete('/remove', parents_controller_1.ParentsController.removeParents);
        (0, utils_1.LogEndpoints)(module, this.logger, this.router.stack);
    }
}
exports.ParentsRoute = ParentsRoute;
