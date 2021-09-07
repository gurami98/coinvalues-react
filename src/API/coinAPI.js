import superagent from "superagent"
const API = 'http://localhost:3003'

export const getAllCoins = () => superagent.get(`${API}/coin/get-all`)