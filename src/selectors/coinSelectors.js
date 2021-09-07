import { createSelector } from 'reselect'
import _ from "lodash";
import React from "react";

export const getAllCoins = (state) => state.allCoins
export const getVisibleCoinsCount = (state) => state.visibleCoinsCount
export const getCurrentCoin = (state) => state.currentCoin
export const getErrorMessage = (state) => state.error

export const getCurrentCoinKeyValueArray = createSelector(
    getCurrentCoin,
    currentCoin => {
        let keys = Object.keys(currentCoin)
        let tempArr = []
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (_.isObjectLike(currentCoin[key]) && !_.isArray(currentCoin[key])) {
                _.forIn(currentCoin[key]['USD'], function (value, key) {
                    tempArr.push([key, value])
                });
            } else tempArr.push([key, currentCoin[key]])
        }
        return tempArr
    }
)

export const getCoinArrayToBeRendered = createSelector(
    getCurrentCoinKeyValueArray,
    currentKeyValueArray => {
        return currentKeyValueArray.map((coin, index) => {
            return (
                <li key={index}>
                    {`${coin[0]}: `}
                    {
                        _.isArray(coin[1]) ? `${coin[1].join(', ')}` : coin[1]
                    }
                </li>
            )
        })
    }
)