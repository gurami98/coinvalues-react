import * as actions from "./actionTypes"

const initialState = {
    coins: [],
    currentCoin: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // FOR RENDERING COINS
        case actions.RENDER_COINS:
            return {...state, coins: state.coins.concat(action.payload.coins.map(coin => {
                    return {
                        id: coin.cmc_rank,
                        coinName: coin.name,
                        coinSymbol: coin.symbol,
                        unitPrice: coin.quote.USD.price,
                        change24HR: coin.quote.USD.percent_change_24h,
                        maxSupply: coin.max_supply,
                        currentSupply: coin.total_supply
                    }
                }))}
        // FOR REFRESHING COINS
        case actions.RENDER_REFRESHED_COINS:
            return {...state, coins: action.payload.coins.map(coin => {
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
        // FOR RESETTING COINS
        case actions.RESET_COINS:
            return {...state, coins: []}
        // FOR RENDERING CURRENT COIN PROFILE
        case actions.RENDER_CURRENT_COIN:
            return {...state, currentCoin: action.payload.coin}
        default:
            return state
    }
}

export default reducer