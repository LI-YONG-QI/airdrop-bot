import { Command } from "commander";

const program = new Command();

program.command("hello", "Say hello to the world").action(() => {
  console.log("Hello world!");
});
