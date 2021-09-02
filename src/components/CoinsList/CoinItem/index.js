import React from 'react';
import StyledListItem from "../../UIKITS/StyledListItem";
import ListItemUL from "../../UIKITS/ListItemUL";

const CoinsItem = ({coin, index}) => {
    return (
        <StyledListItem key={index}>
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
