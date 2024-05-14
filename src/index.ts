#!/usr/bin/env node

import { Command } from "commander";
import { textSync } from "figlet";

import { aave } from "./commands/aave";
import { uniswap } from "./commands/uniswap";

console.log(textSync("BOT"));

export const program = new Command();

// Main
program
  .version("0.0.1", "-v, --versions", "output the current version")
  .description("A simple airdrop bot")
  .addCommand(uniswap)
  .addCommand(aave)
  .showHelpAfterError("(add --help for additional information)");

program.parse();
