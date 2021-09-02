import * as actions from "./actionTypes"

const initialState = {
    coins: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // FOR USER
        case actions.RENDER_COINS:
            return {...state, coins: state.coins.concat(action.payload.coins.map(coin => {
                    return {
                        id: coin.cmc_rank,
                        coinName: coin.name,
                        unitPrice: coin.quote.USD.price,
                        change24HR: coin.quote.USD.percent_change_24h,
                        maxSupply: coin.max_supply,
                        currentSupply: coin.total_supply
                    }
                }))}
        default:
            return state
    }
}

export default reducer