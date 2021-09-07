import * as actions from "./actionTypes";

export const resetAllCoinsArray = () => {
	return {
		type: actions.RESET_COINS
	}
}

export const renderCoinsAsync = () => {
	return {
		type: actions.RENDER_COINS_ASYNC
	}
}

export const renderAllCoinsWithKeys = (coins) => {
	return {
		type: actions.RENDER_ALL_COINS_WITH_KEYS,
		payload: {
			coins
		}
	}
}

export const renderAllCoins = (coins) => {
	return {
		type: actions.RENDER_ALL_COINS,
		payload: {
			coins
		}
	}
}

export const renderError = (error) => {
	return {
		type: actions.COINS_REQUEST_FAILED,
		payload: {
			error
		}
	}
}

export const renderCurrentCoinAsync = () => {
	return {
		type: actions.RENDER_CURRENT_COIN_ASYNC
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

export const renderMoreVisibleCoins = (coins) => {
	return {
		type: actions.INCREASE_VISIBLE_COIN_COUNT,
		payload: {
			coins
		}
	}
}



