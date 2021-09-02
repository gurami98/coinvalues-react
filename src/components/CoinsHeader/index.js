import React from 'react';
import ListItemUL from "../UIKITS/ListItemUL";
import StyledListItem from "../UIKITS/StyledListItem";
import StyledList from "../UIKITS/StyledList";
const CoinsHeader = () => {
    return (
        <StyledList header={true}>
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
        </StyledList>
    );
};

export default CoinsHeader;
