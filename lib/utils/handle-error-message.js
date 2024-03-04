"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMessage = void 0;
const logger_1 = require("../logger");
const logger = (0, logger_1.Logger)('utils.handleErrorMessage');
function handleErrorMessage(err, options) {
    let message = (options === null || options === void 0 ? void 0 : options.message) || 'Unhandled error occurred';
    if (err instanceof Error) {
        message = err.message;
    }
    else if (typeof err === 'string') {
        message = err;
    }
    else {
        logger.error('UNHANDLED ERROR:', {
            customObj: err,
        });
    }
    logger.debug(`Handling error message:`, {
        customObj: {
            errorToThrow: message,
        },
    });
    if (options === null || options === void 0 ? void 0 : options.throw) {
        throw new Error(message);
    }
    return message;
}
exports.handleErrorMessage = handleErrorMessage;
