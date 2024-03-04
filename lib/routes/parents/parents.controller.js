"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsController = void 0;
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const parents_service_1 = require("./parents.service");
const logger = (0, logger_1.Logger)('ParentsController');
const service = new parents_service_1.ParentsService();
exports.ParentsController = {
    getParentRecords: (0, utils_1.handleRequest)(logger, (_, res) => {
        res.json({
            data: service.getParentRecords(),
        });
    }),
    getParent: (0, utils_1.handleRequest)(logger, (req, res) => {
        res.json({
            data: service.getParent(req.params.slug),
        });
    }),
    getChildren: (0, utils_1.handleRequest)(logger, (req, res) => {
        res.json({
            data: service.getChildren(req.params.slug),
        });
    }),
    editGithub: (0, utils_1.handleRequest)(logger, (req, res) => {
        const { slug, input } = req.params;
        try {
            service.editGithub(slug, input);
            res.json({ success: true });
        }
        catch (err) {
            res
                .status(422)
                .json({ message: (0, utils_1.handleErrorMessage)(err, { throw: false }) });
        }
    }),
    addParent: (0, utils_1.handleRequest)(logger, (req, res) => {
        const input = req.body.path;
        logger.debug(`Body param received:`, {
            customObj: req.body,
        });
        if (!input) {
            logger.info('Attempting to add a parent directory...');
            logger.error('No data input (path) received');
            res.status(400).json({
                message: 'Input required',
            });
            return;
        }
        try {
            res.status(201).json({
                data: service.addParent(input),
            });
        }
        catch (err) {
            const message = (0, utils_1.handleErrorMessage)(err, { throw: false });
            res.status(422).json({
                message,
            });
            logger.error(message);
        }
    }),
    removeParents: (0, utils_1.handleRequest)(logger, (req, res) => {
        const pids = req.body.pids;
        logger.debug(`Body param received:`, {
            customObj: req.body,
        });
        if (!pids || !pids.length) {
            logger.info('Attempting to remove parents');
            logger.error('No data input (pids) received');
            res.status(400).json({
                message: 'Input required',
            });
            return;
        }
        try {
            const parentRecords = service.removeParents(pids);
            res.status(200).json({
                data: parentRecords || null,
            });
        }
        catch (err) {
            const message = (0, utils_1.handleErrorMessage)(err, { throw: false });
            res.status(500).json({
                message,
            });
        }
    }),
};
