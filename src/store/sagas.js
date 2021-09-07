import { put, takeEvery, call, all } from 'redux-saga/effects'
import * as actions from "./actionTypes";
import {getAllCoins} from "../API/coinAPI";
import {renderAllCoins, renderAllCoinsWithKeys, renderError} from "./actionCreators";

function* fetchCoinsAsync() {
    try {
        const response = yield call(getAllCoins)
        const allCoins = response.data.data
        yield put(renderAllCoins(allCoins))
    }
    catch(error) {
        yield put(renderError(error.response.data))
    }
}

function* fetchCurrentCoinAsync() {
    try {
        const response = yield call(getAllCoins)
        const allCoins = response.data.data
        yield put(renderAllCoinsWithKeys(allCoins))
    }
    catch(error) {
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
