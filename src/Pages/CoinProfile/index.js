import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {
    renderCurrentCoinAsync,
    resetAllCoinsArray
} from "../../store/actionCreators";
import {connect} from "react-redux";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const CoinProfileHeader = styled.div`
  text-align: left;
  & h1{
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }
  
  & button{
    margin-left: 50px;
    border-radius: 4px;
    border: 0;
    height: 30px;
    cursor: pointer;
    background-color: #423b3b;
    color: white;
    &:hover{
      opacity: 0.7;
    }
  }
`

const CoinProfileList = styled.ul`
  padding: 20px 50px 50px;
  list-style: none;
  margin: 0 auto;
  & li{
    margin: 15px 0;
    width: fit-content;
    text-align: left;
  }
`

const CoinProfile = ({match, currentCoin, renderCurrentCoinAsync, coinArrayToBeRendered, resetAllCoinsArray}) => {
    const [loading, setLoading] = useState(true)
    const symbol = match.params.symbol
    const history = useHistory()

    useEffect(() => {
        renderCurrentCoinAsync(symbol)
        resetAllCoinsArray()
        setLoading(false)
        const refreshCoin = setInterval(() => {
            renderCurrentCoinAsync(symbol)
        }, 30000)
        return () => {
            clearInterval(refreshCoin)
        }
    }, [])

    const goHome = () => {
        history.push('/')
    }

    return (
        <div>
            <CoinProfileHeader>
                <h1>{loading ? 'Loading...' : currentCoin.name}</h1>
                <button onClick={goHome}>Main Page</button>
            </CoinProfileHeader>
            <CoinProfileList>
                {
                    coinArrayToBeRendered
                }
            </CoinProfileList>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allCoins: coinSelectors.getAllCoins(state),
        currentCoin: coinSelectors.getCurrentCoin(state),
        coinArrayToBeRendered: coinSelectors.getCoinArrayToBeRendered(state)
    }
}

const mapDispatchToProps = {
    resetAllCoinsArray,
    renderCurrentCoinAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile);
