"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const config = () => {
    const cfg = context_1.CONTEXT.config;
    if (cfg) {
        const paths = [];
        Object.entries(cfg.parents).forEach(([_, value]) => {
            paths.push(value.path);
        });
        printList(paths, 'parents');
    }
    process.exit();
};
function printList(arr, header) {
    if (!arr.length) {
        return;
    }
    console.log('\n');
    if (header) {
        console.log(`[${header}]`);
    }
    arr.forEach((i) => {
        console.log(i);
    });
}
exports.default = config;
