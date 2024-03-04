"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocSiteRecord = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../logger");
const logger = (0, logger_1.Logger)('DocSiteRecord');
class DocSiteRecord {
    constructor(parent) {
        this.parent = parent;
    }
    generate() {
        const parent = this.parent;
        this.docSite = {};
        logger.debug(`Generating "DocSite" from parent:`, {
            customObj: {
                parentId: parent.id,
                slug: parent.slug,
            },
        });
        const dirents = fs_1.default.readdirSync(parent.path, { withFileTypes: true });
        const folders = dirents.filter((d) => d.isDirectory());
        const docSite = folders
            .filter((d) => d.name.charAt(0) !== '_')
            .reduce((ds, d) => {
            ds[d.name] = null;
            return ds;
        }, this.docSite);
        return this;
    }
    verify() {
        const docSite = this.docSite;
        if (!docSite) {
            throw new Error(`Did you forgot to call new DocSiteRecord(parent).generate()?`);
        }
        Object.keys(docSite).forEach((repoName) => {
            let value = null;
            const repoPath = path_1.default.join(this.parent.path, repoName);
            const checklist = ['docs', 'site', 'build'];
            for (const item of checklist) {
                if (!item) {
                    continue;
                }
                if (fs_1.default.existsSync(path_1.default.join(repoPath, item, 'index.html'))) {
                    value = item;
                    break;
                }
            }
            if (value === null && fs_1.default.existsSync(path_1.default.join(repoPath, 'index.html'))) {
                value = 'index';
            }
            docSite[repoName] = value;
        });
        logger.debug('Verified "DocSite":', {
            customObj: {
                docSite,
            },
        });
        return docSite;
    }
}
exports.DocSiteRecord = DocSiteRecord;
