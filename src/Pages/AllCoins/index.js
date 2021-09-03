import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {renderCoins, renderCurrentCoin, renderRefreshedCoins} from "../../store/actionCreators";
import {connect} from "react-redux";
import CoinsHeader from "../../components/CoinsHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinsList from "../../components/CoinsList";
import {getAllCoins} from "../../API/coinAPI";

const AllCoins = ({coins, renderCoins, renderCurrentCoin, renderRefreshedCoins}) => {
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        fetchCoins()
        renderCurrentCoin({})
        // const refreshCoinsTimer = setInterval(() => {
        //     refreshCoins()
        // }, 5000)
        // return () => {
        //     clearInterval(refreshCoinsTimer)
        // }
    }, []);

    const refreshCoins = async () => {
        try{
            const response = await getAllCoins();
            const allCoins = response.data.data
            const refreshedCoinBatch = allCoins.slice(0, 20)
            renderRefreshedCoins(refreshedCoinBatch)
            setHasMore(true)
        }catch(e){
            console.log(e)
        }
    }

    const fetchCoins = async () => {
        try {
            const response = await getAllCoins();
            const allCoins = response.data.data
            if (coins.length >= allCoins.length) setHasMore(false)
            const nextCoinBatch = allCoins.slice(coins.length, coins.length + 20)
            renderCoins(nextCoinBatch)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <CoinsHeader/>
            <InfiniteScroll
                dataLength={coins.length}
                next={fetchCoins}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <CoinsList/>
            </InfiniteScroll>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        coins: coinSelectors.getCoins(state)
    }
}

const mapDispatchToProps = {
    renderCoins,
    renderRefreshedCoins,
    renderCurrentCoin
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCoins);
