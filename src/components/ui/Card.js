import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {THEME} from "../../theme";

export const Card = ({children, style}) => {
    return (
        <View style={{...styles.card, ...style}}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingVertical: 15,
        marginVertical: 15,
        paddingHorizontal: THEME.SMALL_DEVICE ? 10 : 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: '#f8edeb',
        borderRadius: 15
    }
})