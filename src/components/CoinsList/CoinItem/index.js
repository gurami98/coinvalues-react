import React from 'react';
import StyledListItem from "../../UIKITS/StyledListItem";
import ListItemUL from "../../UIKITS/ListItemUL";
import {useHistory} from "react-router-dom";

const CoinsItem = ({coin, index}) => {
    const history = useHistory()
    const handleClick = () => {
        history.push(`/currency/${coin.coinSymbol}`)
    }
    return (
        <StyledListItem onClick={handleClick} coin={true} key={index}>
            <ListItemUL>
                <li>
                    {coin.id}
                </li>
                <li>
                    {coin.coinName}
                </li>
                <li>
                    {coin.unitPrice.toFixed(2)}$
                </li>
                <li style={{ color: coin.change24HR > 0 ? 'green' : 'red' }}>
                    {coin.change24HR > 0 ? `+${coin.change24HR}` : coin.change24HR}
                </li>
                <li>
                    {coin.maxSupply}
                </li>
                <li>
                    {coin.currentSupply.toFixed(1)}
                </li>
            </ListItemUL>
        </StyledListItem>
    );
};

export default CoinsItem;
