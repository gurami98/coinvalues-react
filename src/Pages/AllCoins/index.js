import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {renderCoins, renderCurrentCoin} from "../../store/actionCreators";
import {connect} from "react-redux";
import CoinsHeader from "../../components/CoinsHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinsList from "../../components/CoinsList";
import {getAllCoins} from "../../API/coinAPI";

const AllCoins = ({coins, renderCoins, renderCurrentCoin}) => {
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        fetchCoins()
        renderCurrentCoin({})
        // const refreshCoins = setInterval(() => {
        //     fetchCoins()
        // }, 30000)
        // return () => {
        //     clearInterval(refreshCoins)
        // }
    }, []);

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
    renderCurrentCoin
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCoins);
