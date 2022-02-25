import axios from "axios";

/**
 * This method fetches the exchange rate for a token in USD
 * @param token
 */
export const getExchangeRate = (token:string) => {
    return axios.get(`${process.env.CRYPTO_COMPARE_BASE_URL}data/price?fsym=${token}&tsyms=USD`)
}