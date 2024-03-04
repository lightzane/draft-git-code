"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
function handleRequest(logger, handler) {
    return (req, res, next) => {
        logger.debug(`${req.method}`.yellow, {
            route: req.originalUrl.yellow,
        });
        handler(req, res, next);
    };
}
exports.handleRequest = handleRequest;
