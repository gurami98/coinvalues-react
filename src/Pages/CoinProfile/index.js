import React, {useEffect, useState} from 'react';
import * as coinSelectors from "../../selectors/coinSelectors";
import {renderCoins, renderCurrentCoin} from "../../store/actionCreators";
import {connect} from "react-redux";
import {getAllCoins} from "../../API/coinAPI";
import _ from "lodash";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const CoinProfileHeader = styled.div`
  text-align: left;
  & h1{
    margin-top: 0;
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

const CoinProfile = ({match, currentCoin, renderCurrentCoin}) => {
    const [coinArr, setCoinArr] = useState([])
    const symbol = match.params.symbol
    const history = useHistory()

    useEffect(() => {
        fetchCurrentCoin()
    }, [])

    const fetchCurrentCoin = async () => {
        const response = await getAllCoins();
        const allCoins = response.data.data
        const currentCoin = allCoins.filter(coin => {
            return coin.symbol === symbol
        })[0]
        renderCurrentCoin(currentCoin)
        let keys = Object.keys(currentCoin)
        let tempArr = []
        for (let i = 0; i < keys.length; i++){
            const key = keys[i]
            if(_.isObjectLike(currentCoin[key]) && !_.isArray(currentCoin[key])) {
                _.forIn(currentCoin[key]['USD'], function (value, key) {
                    tempArr.push([key, value])
                });
            }
            else tempArr.push([key, currentCoin[key]])
        }
        setCoinArr(tempArr)
    }

    const goHome = () => {
        history.push('/')
    }

    let arrToBeRendered = coinArr.map((coin, index) => {
        return (
            <li key={index}>
                {`${coin[0]}: `}
                {
                    _.isArray(coin[1]) ? `${coin[1].join(', ')}` : coin[1]
                }
            </li>
        )
    })
    return (
        <div>
            <CoinProfileHeader>
                <h1>{currentCoin.name}</h1>
                <button onClick={goHome}>Main Page</button>
            </CoinProfileHeader>
            <CoinProfileList>
                {
                    arrToBeRendered
                }
            </CoinProfileList>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        coins: coinSelectors.getCoins(state),
        currentCoin: coinSelectors.getCurrentCoin(state)
    }
}

const mapDispatchToProps = {
    renderCoins,
    renderCurrentCoin
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile);
