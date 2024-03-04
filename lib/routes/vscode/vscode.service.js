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
exports.VSCodeService = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const logger = (0, logger_1.Logger)('VSCodeService');
class VSCodeService {
    open(parentSlug, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                logger.debug(`Attempting to open repository: ${repo}...`);
                const parent = (0, utils_1.fetchParents)(parentSlug);
                if (!parent) {
                    const message = 'Parent Directory does not EXIST';
                    logger.error(message);
                    reject(message);
                }
                const fullpath = path_1.default.join(parent.path, repo);
                const isExist = fs_1.default.existsSync(fullpath);
                if (!isExist) {
                    const message = `Path does not exist: ${fullpath}`;
                    logger.error(message);
                    reject(message);
                    return;
                }
                logger.info('Opening in vscode...');
                logger.warn(`code "${fullpath}"`);
                (0, child_process_1.exec)(`code "${fullpath}"`, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    else if (stderr) {
                        reject(stderr);
                    }
                    if (error || stderr) {
                        return;
                    }
                    resolve(stdout);
                });
            });
        });
    }
}
exports.VSCodeService = VSCodeService;
