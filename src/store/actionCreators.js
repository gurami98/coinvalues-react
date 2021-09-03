import * as actions from "./actionTypes";

export const renderCoins = (coins) => {
	return {
		type: actions.RENDER_COINS,
		payload: {
			coins
		}
	}
}

export const renderCurrentCoin = (coin) => {
	return {
		type: actions.RENDER_CURRENT_COIN,
		payload:{
			coin
		}
	}
}