"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextUtil = void 0;
class TextUtil {
    static slug(text) {
        return text
            .replace(/[^a-z 0-9-]/gi, '')
            .replace(/\s/g, '-')
            .toLowerCase();
    }
    static pascal(text) {
        return this.slug(text)
            .split('-')
            .map((w) => `${w[0].toUpperCase()}${w.substring(1)}`)
            .join(' ');
    }
}
exports.TextUtil = TextUtil;
