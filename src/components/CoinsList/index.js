import React from 'react';
import CoinsItem from "./CoinItem";
import * as coinSelectors from "../../selectors/coinSelectors";
import {connect} from "react-redux";
import styled from 'styled-components'
import StyledListItem from "../UIKITS/StyledListItem";
import ListItemUL from "../UIKITS/ListItemUL";

const StyledList = styled.ul`
  padding: 50px;
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
`

const CoinsList = ({coins}) => {
    return (
        <StyledList>
            <StyledListItem>
                <ListItemUL>
                    <li>
                        ID
                    </li>
                    <li>
                        Name
                    </li>
                    <li>
                        Price
                    </li>
                    <li>
                        Change in 24Hrs
                    </li>
                    <li>
                        Max supply
                    </li>
                    <li>
                        Current supply
                    </li>
                </ListItemUL>
            </StyledListItem>
            {
                coins.map(coin => {
                    return(
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
