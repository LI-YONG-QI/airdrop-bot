#!/usr/bin/env node

import { Command } from "commander";
import { textSync } from "figlet";
import { createProtocolCommand } from "./libs/commands";
import { aave as aaveFn } from "./utils/aave";
import { uniswap as uniswapFn } from "./utils/uniswap";
import packageJson from "../package.json";

console.log(textSync("BOT"));

const aaveCommand = createProtocolCommand("aave", aaveFn);
const uniswapCommand = createProtocolCommand("uniswap", uniswapFn);

export const program = new Command();

// Main
program
  .version(packageJson.version, "-v, --versions", "output the current version")
  .description("A simple airdrop bot")
  .addCommand(aaveCommand)
  .addCommand(uniswapCommand)
  .showHelpAfterError("(add --help for additional information)");

program.parse();
