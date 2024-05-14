#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const commander_1 = require("commander");
const figlet_1 = require("figlet");
const aave_1 = require("./commands/aave");
const uniswap_1 = require("./commands/uniswap");
console.log((0, figlet_1.textSync)("BOT"));
exports.program = new commander_1.Command();
// Main
exports.program
    .version("0.0.1", "-v, --versions", "output the current version")
    .description("A simple airdrop bot")
    .addCommand(uniswap_1.uniswap)
    .addCommand(aave_1.aave)
    .showHelpAfterError("(add --help for additional information)");
exports.program.parse();
