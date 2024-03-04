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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.server = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const context_1 = require("./context");
const logger_1 = require("./logger");
const routes_1 = require("./routes");
const static_parent_1 = require("./utils/static-parent");
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
const startServer = (port = context_1.CONTEXT.port) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = (0, logger_1.Logger)('App');
    exports.app.use((0, cors_1.default)());
    exports.app.use(express_1.default.json());
    const GIT_CODE_UI_PATH = path_1.default.join(context_1.CONTEXT.packageDir, 'public');
    exports.app.use('/', express_1.default.static(GIT_CODE_UI_PATH));
    (0, static_parent_1.staticParents)(exports.app);
    exports.app.use('/api', new routes_1.ApiRoute().router);
    exports.app.get('*', (_, res) => {
        res.sendFile(path_1.default.join(GIT_CODE_UI_PATH, 'index.html'));
    });
    exports.server.listen(port, () => {
        logger.info(`🚀 Server running at http://localhost:${port}`);
    });
    process.on('SIGINT', () => {
        logger.verbose('Use SIGTERM instead of SIGINT on deployments.');
        logger.warn('Server interrupted...');
        logger.warn('Shutting down... please wait');
        logger.warn('Server closed. Thank you for using me! 🙂');
        process.exit(1);
    });
});
exports.startServer = startServer;
