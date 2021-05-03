import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {AppButton} from "../components/ui/AppButton";
import {BoldCustomText} from "../components/ui/BoldCustomText";
import {MediumCustomText} from "../components/ui/MediumCustomText";
import {Ionicons} from '@expo/vector-icons';
import {THEME} from "../theme";
import {useAvailableWindowParams} from "../hooks/useAvailableWindowParams";


export const GameOverScreen = ({roundsNum, userNum, startNewGameHandler}) => {
    const [availableWidth, availableHeight] = useAvailableWindowParams()
    return (
        <View style={styles.container}>
            <BoldCustomText>
                The Game is Over!
            </BoldCustomText>
            <View style={{
                width: availableWidth < availableHeight ? availableWidth / 2 : availableWidth /6,
                height: availableWidth < availableHeight ? availableWidth / 2 : availableWidth /6,
                marginVertical: THEME.MARGIN_PADDING_10,
                overflow: 'hidden'}}>
                <Image style={{
                    width: "100%",
                    height: "100%",
                    borderWidth: 1,
                    borderRadius: (availableWidth)/2}}
                       fadeDuration={300}
                       source={{uri: 'https://source.unsplash.com/collection/96420428/300x300'}}/>
            </View>
            <MediumCustomText>
                Rounds was: {roundsNum}
            </MediumCustomText>
            <MediumCustomText style={styles.userNumberGuess}>
                User number: {userNum}
            </MediumCustomText>
            <AppButton onPress={startNewGameHandler} color={THEME.MAIN_COLOR}>
                <Ionicons name="md-refresh-sharp" size={24} color="white" />
                    New Game
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userNumberGuess: {
        marginBottom: THEME.MARGIN_PADDING_10
    }
})