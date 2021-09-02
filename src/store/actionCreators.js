import * as actions from "./actionTypes";

export const renderCoins = (coins) => {
	return {
		type: actions.RENDER_COINS,
		payload: {
			coins
		}
	}
}