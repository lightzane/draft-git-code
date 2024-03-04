"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help = (name, version) => console.log(`
gcode <command>

Usage:

[App Server]

gcode                 Starts the server
gcode serve <PORT>    Starts the server at specific PORT

[Configuration]

gcode clean           Clean up data in config
gcode list            List of parent directories
gcode add <PATH>      Includes directory path in "parents" list
gcode rm <PATH>       Remove directory path from "parents" list


Name: ${name}
Version: ${version}`);
exports.default = help;
