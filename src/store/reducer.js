import * as actions from "./actionTypes"

const initialState = {
    coins: [],
    // filterData: {
    //     category: {
    //         activeCategory: 'All Categories'
    //     },
    //     itemsToShowCount: 8,
    // },
    // paginationInfo: {pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1, activePage: 1},
    // alertInfo: {},
    // loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // FOR USER
        case actions.RENDER_COINS:
            return {...state, coins: action.payload.coins.map(coin => {
                    return {
                        id: coin.cmc_rank,
                        coinName: coin.name,
                        unitPrice: coin.quote.USD.price,
                        change24HR: coin.quote.USD.percent_change_24h,
                        maxSupply: coin.max_supply,
                        currentSupply: coin.total_supply
                    }
                })}
        default:
            return state
    }
}

export default reducer