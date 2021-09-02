import './App.css';
import {useEffect} from "react";
import {getAllCoins} from "./API/coinAPI";
import CoinsList from './components/CoinsList'
import {connect} from "react-redux";
import {renderCoins} from "./store/actionCreators";
import * as coinSelectors from "./selectors/coinSelectors";

function App({coins, renderCoins}) {
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
        const coins = response.data.data
        renderCoins(coins)
    }

  return (
    <div className="App">
        <CoinsList/>
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
