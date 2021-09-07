import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {
    renderCoinsAsync,
    renderCurrentCoin, renderMoreVisibleCoins
} from "../../store/actionCreators";
import {connect} from "react-redux";
import CoinsHeader from "../../components/CoinsHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinsList from "../../components/CoinsList"

const AllCoins = ({renderCoinsAsync, visibleCoinsCount, renderMoreVisibleCoins, renderCurrentCoin, errorMessage}) => {
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        renderCoinsAsync()
        renderCurrentCoin({})
        showMoreCoins()
        const refreshCoinsTimer = setInterval ( () => {
            renderCoinsAsync()
        }, 5000)
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
    renderCurrentCoin
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCoins);
