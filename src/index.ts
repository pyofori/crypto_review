#!/usr/bin/env node

import * as yargs from "yargs";
import {resolveCommand} from "./services/commandResolverService";
import {Args} from "./types/Args";

require('dotenv').config({ path: __dirname + '/../.env' });

//This will be used to determine the absolute path of files so that files are found when the command is run outside the project directory
export const appRoot = __dirname

const args = yargs
    .usage("Usage: -n <name>")
    .option("t", {alias: "token", describe: "The token symbol", type: "string"})
    .option("d", { alias: "date", describe: "The date to filter by. The format should be yyyy-mm-dd", type: "string" })
    .option("h", { alias: "help", describe: "This command provides help on how to use the app", type: "string" })
    .argv as Args

resolveCommand(args)

