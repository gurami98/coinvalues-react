import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {
    renderCoinsAsync,
    renderCurrentCoin, renderError, renderMoreVisibleCoins
} from "../../store/actionCreators";
import {connect} from "react-redux";
import CoinsHeader from "../../components/CoinsHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinsList from "../../components/CoinsList"

const AllCoins = ({renderCoinsAsync, renderError, visibleCoinsCount, renderMoreVisibleCoins, renderCurrentCoin, errorMessage}) => {
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        renderCoinsAsync()
        renderCurrentCoin({})
        renderError('')
        showMoreCoins()
        const refreshCoinsTimer = setInterval ( () => {
            renderCoinsAsync()
        }, 1800000) // refresh every 30min, can be reduced just for testing purposes
        return () => {
            clearInterval(refreshCoinsTimer)
        }
    }, []);

    const showMoreCoins = () => {
        if (visibleCoinsCount >= 100) setHasMore(false)
        else renderMoreVisibleCoins()
    }

    return (
        <div>
            <CoinsHeader/>
            {
                errorMessage ? <h1>{errorMessage}</h1> :
                <InfiniteScroll
                    dataLength={visibleCoinsCount}
                    next={showMoreCoins}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <CoinsList/>
                </InfiniteScroll>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allCoins: coinSelectors.getAllCoins(state),
        visibleCoinsCount: coinSelectors.getVisibleCoinsCount(state),
        errorMessage: coinSelectors.getErrorMessage(state)
    }
}

const mapDispatchToProps = {
    renderCoinsAsync,
    renderMoreVisibleCoins,
    renderCurrentCoin,
    renderError
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCoins);
