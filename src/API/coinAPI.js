import axios from "axios";
const API = 'http://localhost:3003'

export const getAllCoins = () => axios.get(`${API}/coin/get-all`)