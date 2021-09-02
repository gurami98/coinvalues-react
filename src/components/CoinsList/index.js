import React from 'react';
import CoinsItem from "./CoinItem";
import * as coinSelectors from "../../selectors/coinSelectors";
import {connect} from "react-redux";
import StyledList from "../UIKITS/StyledList";

const CoinsList = ({coins}) => {
    return (
        <StyledList>
            {
                coins.map(coin => {
                    return (
                        <CoinsItem coin={coin} index={coin.id} key={coin.id}/>
                    )
                })
            }
        </StyledList>
    );
};

const mapStateToProps = (state) => {
    return {
        coins: coinSelectors.getCoins(state)
    }
}

export default connect(mapStateToProps)(CoinsList);
