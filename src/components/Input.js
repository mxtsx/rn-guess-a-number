import React from 'react';
import {StyleSheet, TextInput} from "react-native";

export const Input = ({style, ...props}) => {
    return (
        <TextInput placeholder={'Text Here!'}
                   style={{...styles.input, ...style}}
                   autoCapitalize="none"
                   autoCorrect={false}
                   blurOnSubmit
                   {...props}/>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 15,
        borderBottomWidth: 1,
        textAlign: "center",
    }
})