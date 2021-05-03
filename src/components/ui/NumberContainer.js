import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "../../theme";
import {MediumCustomText} from "./MediumCustomText";

export const NumberContainer = ({children}) => {
    return (
        <View style={styles.container}>
            <MediumCustomText style={styles.text}>
                {children}
            </MediumCustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: THEME.PRIMARY_COLOR,
        fontSize: 18
    }
})