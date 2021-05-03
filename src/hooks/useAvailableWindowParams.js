import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions} from "react-native";

export const useAvailableWindowParams = () => {
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width)
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height)

    const updateLayout = useCallback(() => {
        setAvailableWidth(Dimensions.get('window').width)
        setAvailableHeight(Dimensions.get('window').height)
    }, [])

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    return [availableWidth, availableHeight]
};