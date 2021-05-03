import React from 'react';
import {StyleSheet, Text} from "react-native";

export const BoldCustomText = ({children, style}) => {
    return (
        <Text style={{...styles.body, ...style}}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    body: {
        fontFamily: "JBBold"
    }
})