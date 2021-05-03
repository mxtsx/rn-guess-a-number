import React from 'react';
import {Platform, StyleSheet, View} from "react-native";
import {THEME} from "../theme";
import {BoldCustomText} from "./ui/BoldCustomText";

export const Header = ({title}) => {
    return (
        <View style={{...styles.container, ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 0.5
                    },
                    shadowRadius: 6,
                    shadowOpacity: 0.2
                }
            })}}>
            <BoldCustomText style={styles.text}>
                {title}
            </BoldCustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 5,
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
    },
    text: {
        fontSize: 18,
        color: Platform.OS === 'android' ? '#fff' : THEME.PRIMARY_COLOR
    }
})