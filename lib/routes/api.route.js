"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoute = void 0;
const express_1 = require("express");
const docs_route_1 = require("./docs/docs.route");
const parents_route_1 = require("./parents/parents.route");
const vscode_route_1 = require("./vscode/vscode.route");
class ApiRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.use('/parents', new parents_route_1.ParentsRoute().router);
        this.router.use('/vscode', new vscode_route_1.VSCodeRoute().router);
        this.router.use('/docs', new docs_route_1.DocsRoute().router);
    }
}
exports.ApiRoute = ApiRoute;
