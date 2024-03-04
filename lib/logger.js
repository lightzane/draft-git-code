"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
require("@colors/colors");
const { combine, timestamp, colorize, printf } = winston_1.format;
const Logger = (context) => {
    return (0, winston_1.createLogger)({
        level: process.env.GIT_CODE_DEV ? 'debug' : 'info',
        format: combine(colorize({ all: true }), myTimestamp, myFormat),
        transports: [new winston_1.transports.Console()],
        defaultMeta: {
            context,
            customObj: '',
            route: '',
        },
    });
};
exports.Logger = Logger;
const myFormat = printf((_a) => {
    var { level, message, timestamp } = _a, custom = __rest(_a, ["level", "message", "timestamp"]);
    let { context, route, customObj } = custom;
    context = `[${context}]`.cyan;
    if (customObj && typeof customObj === 'object') {
        customObj = '\n' + JSON.stringify(customObj, null, 2).magenta;
    }
    if (process.env.GIT_CODE_DEV) {
        return `[${level}] ${timestamp} \t ${context} ${message} ${route} ${customObj}`.trim();
    }
    return `[${'gcode'.cyan}] ${timestamp} \t ${message}`;
});
const myTimestamp = timestamp({
    format: () => {
        return new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    },
});
