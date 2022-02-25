import {Transaction} from "../types/transaction";
import {getExchangeRate} from "./restService";
import chalk from "chalk";
import {getDateFromEpoch} from "../utils/dateUtils";
import {appRoot} from "../index";
const fs = require('fs');
const readline = require('readline');


/**
 * This method fetches the portfolio value for tokens. It takes 2 optional parameters, tokenFilter, and date for filtering
 * @param tokenFilter
 * @param dateFilter
 */
export const getLatestPortfolio = function (tokenFilter?:string|undefined, dateFilter?: string| undefined) {
    console.log(chalk.blueBright('Processing...\n'))
    const portfolio = {} as any

    const fileStream = fs.createReadStream(`${appRoot}/../${process.env.TRANSACTIONS_CSV_PATH}`);
    const readStream = readline.createInterface({
        input: fileStream
    });


    readStream.on('line', function (line:any) {

        const json = {} as Transaction;
        const transactionRow = line.split(',');

        json.timestamp = transactionRow[0];
        json.transaction_type = transactionRow[1];
        json.token = transactionRow[2];
        json.amount = parseFloat(transactionRow[3]);



        const {token, transaction_type, amount, timestamp} = json;

        if (transaction_type === "transaction_type"){
            // This means, this row is the header. Skip
            return;
        }

        // At this point, check to see if a token and/or date was passed and do the necessary filtering

        if ((tokenFilter === undefined || token.toUpperCase() === tokenFilter.toUpperCase())
            && (dateFilter === undefined || dateFilter === getDateFromEpoch(timestamp))){

            if (portfolio[token] === undefined){
                if (transaction_type === "DEPOSIT"){
                    portfolio[token] = amount;
                } else {
                    portfolio[token] = 0 -amount;
                }
            } else {
                if (transaction_type === "DEPOSIT"){
                    portfolio[token] = portfolio[token] + amount;
                } else {
                    portfolio[token] = portfolio[token] -amount;
                }
            }
        }
    });

    readStream.on('close', function () {
        const tokens = Object.keys(portfolio)
        const heading = chalk.magentaBright.bold.underline( dateFilter? `Portfolio for ${dateFilter}.\n`: 'Latest Portfolio\n') ;
        console.log(heading)
        tokens.forEach(t => {
            getExchangeRate(t).then(response => {
                const value = `$${(portfolio[t] * response?.data?.USD).toLocaleString()}`
                console.log(chalk.blueBright(`${t} : ${value}`))
            }).catch( () => {
                console.log("failed to fetch exchange rate")
            })
        })

        if (tokens.length === 0 && tokenFilter){
            console.log(chalk.blueBright(`${tokenFilter} : 0`))
        }
    });
}
