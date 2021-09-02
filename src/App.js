import './App.css';
import {useEffect, useState} from "react";
import {getAllCoins} from "./API/coinAPI";
import CoinsList from './components/CoinsList'
import {connect} from "react-redux";
import {renderCoins} from "./store/actionCreators";
import * as coinSelectors from "./selectors/coinSelectors";
import CoinsHeader from "./components/CoinsHeader";
import InfiniteScroll from 'react-infinite-scroll-component';

function App({coins, renderCoins}) {
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        fetchCoins()
        // const refreshCoins = setInterval(() => {
        //     fetchCoins()
        // }, 30000)
        // return () => {
        //     clearInterval(refreshCoins)
        // }
    }, []);

    const fetchCoins = async () => {
        const response = await getAllCoins();
        const allCoins = response.data.data
        if(coins.length >= allCoins.length) setHasMore(false)
        const nextCoinBatch = allCoins.slice(coins.length, coins.length + 20)
        renderCoins(nextCoinBatch)
    }

    return (
        <div className="App">
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
}

const mapStateToProps = (state) => {
    return {
        coins: coinSelectors.getCoins(state)
    }
}

const mapDispatchToProps = {
    renderCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
