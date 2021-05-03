import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "../../theme";

export const GuessOutput = ({number, text}) => {
    return (
        <View style={styles.container}>
            <Text>
                #{number}
            </Text>
            <Text>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 2.5,
        borderWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})