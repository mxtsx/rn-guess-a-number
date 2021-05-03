import React, {useRef} from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import * as Animatable from "react-native-animatable"
import {THEME} from "../../theme";
import {BoldCustomText} from "./BoldCustomText";

export const AppButton = ({children, onPress, color}) => {
    const pulseAnimRef = useRef()
    const onPressHandler = () => {
        pulseAnimRef.current.pulse(300)
        onPress && onPress()
    }
    let ButtonTouchableEffect = TouchableOpacity
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonTouchableEffect = TouchableNativeFeedback
    }
    return (
        <Animatable.View ref={pulseAnimRef}>
            <ButtonTouchableEffect activeOpacity={0.8}
                     onPress={onPressHandler}>
                <View style={{...styles.animButton, backgroundColor: color ? color : THEME.PRIMARY_COLOR}}>
                    <BoldCustomText style={styles.animButtonText}>
                        {children}
                    </BoldCustomText>
                </View>
            </ButtonTouchableEffect>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    animButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    animButtonText: {
        color: "#fff",
        fontSize: 16
    }
})