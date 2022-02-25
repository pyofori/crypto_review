import {Args} from "../types/Args";
import {isValidDate} from "../utils/dateUtils";
import chalk from "chalk";
import {getLatestPortfolio} from "./transactionService";

/**
 * This method is used to resolve the command that a user types
 * @param args
 */
export const resolveCommand = (args: Args) => {
    if (args?.date){
        if (!isValidDate(args.date)){
            console.log(chalk.red('Please enter a valid date!'))
            return;
        }
    }

    getLatestPortfolio(args?.token, args?.date)

}