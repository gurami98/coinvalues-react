import superagent from "superagent"
const API = 'http://localhost:3003'
const proxy = 'https://cors-anywhere.herokuapp.com'

// export const getAllCoins = async () => await superagent.get(`${API}/coin/get-all`) // to use with back-end

// to use straight from front-end but with proxy server - https://cors-anywhere.herokuapp.com/corsdemo - go here to activate it
export const getAllCoins = async () => await superagent.get(`${proxy}/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`)
                                                       .set('X-CMC_PRO_API_KEY', '6c5e97f3-9cdb-438f-8b01-77b71c8bd419')
                                                       .set('Accept', 'application/json')