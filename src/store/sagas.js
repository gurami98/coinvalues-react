import { put, takeEvery, call, all } from 'redux-saga/effects'
import * as actions from "./actionTypes";
import {getAllCoins, getCurrentCoin} from "../API/coinAPI";
import {renderAllCoins, renderCurrentCoin, renderError} from "./actionCreators";

function* fetchCoinsAsync() {
    try {
        const response = yield call(getAllCoins)
        const allCoins = response.body.data
        yield put(renderAllCoins(allCoins))
    }
    catch(error) {
        yield put(renderError(error.response.data))
    }
}

function* fetchCurrentCoinAsync(action) {
    const symbol = action.payload.symbol
    try {
        const response = yield call(getCurrentCoin, symbol)
        const current = response.body.data
        const key = Object.keys(current)[0]
        yield put(renderCurrentCoin(current[key]))
    } catch (error) {
        yield put(renderError(error.response.data))
    }
}

function* watchRefreshAsync() {
    yield takeEvery(actions.RENDER_COINS_ASYNC, fetchCoinsAsync)
}

function* watchProfileRefreshAsync() {
    yield takeEvery(actions.RENDER_CURRENT_COIN_ASYNC, fetchCurrentCoinAsync)
}

export default function* rootSaga() {
    yield all([
        watchRefreshAsync(),
        watchProfileRefreshAsync()
    ])
}
