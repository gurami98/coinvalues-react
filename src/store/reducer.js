import * as actions from "./actionTypes"

const initialState = {
    allCoins: [],
    visibleCoinsCount: 0,
    currentCoin: {},
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // FOR RENDERING ALL COINS
        case actions.RENDER_ALL_COINS:
            return {...state, allCoins: action.payload.coins.map(coin => {
                    return {
                        id: coin.cmc_rank,
                        coinName: coin.name,
                        coinSymbol: coin.symbol,
                        unitPrice: coin.quote.USD.price,
                        change24HR: coin.quote.USD.percent_change_24h,
                        maxSupply: coin.max_supply,
                        currentSupply: coin.total_supply
                    }
                })}
        // FOR RENDERING MORE VISIBLE COINS
        case actions.INCREASE_VISIBLE_COIN_COUNT:
            return {...state, visibleCoinsCount: state.visibleCoinsCount + 20}
        // FOR RESETTING COINS
        case actions.RESET_COINS:
            return {...state, visibleCoinsCount: 0, allCoins: []}
        // FOR RENDERING CURRENT COIN PROFILE
        case actions.RENDER_CURRENT_COIN:
            return {...state, currentCoin: action.payload.coin}
        // ERROR OF API REQUEST
        case actions.COINS_REQUEST_FAILED:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export default reducer