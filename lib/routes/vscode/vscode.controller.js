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
exports.VSCodeController = void 0;
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const vscode_service_1 = require("./vscode.service");
const logger = (0, logger_1.Logger)('VSCodeController`');
const service = new vscode_service_1.VSCodeService();
exports.VSCodeController = {
    open: (0, utils_1.handleRequest)(logger, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { parentSlug, repo } = req.params;
        try {
            yield service.open(parentSlug, repo);
            res.status(200).json({
                success: true,
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(422).json({ message: err.message });
            }
            else if (typeof err === 'string' && err.includes('Path does not exist')) {
                res.status(422).json({ message: err });
            }
            else {
                res.status(500).json({
                    message: 'Something went wrong',
                });
                logger.error(err);
            }
        }
    })),
};
