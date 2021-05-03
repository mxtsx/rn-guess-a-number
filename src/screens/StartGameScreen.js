import React, {useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Card} from "../components/ui/Card";
import {AppButton} from "../components/ui/AppButton";
import {THEME} from "../theme";
import {Input} from "../components/Input";
import {NumberContainer} from "../components/ui/NumberContainer";
import {MediumCustomText} from "../components/ui/MediumCustomText";
import {useAvailableWindowParams} from "../hooks/useAvailableWindowParams";

export const StartGameScreen = ({startGameHandler}) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(null)
    const [availableWidth, availableHeight] = useAvailableWindowParams()
    const isAlbum = availableHeight < availableWidth

    const numberInputValue = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(chosenNumber <= 0 || chosenNumber > 99 || isNaN(chosenNumber)) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99',
                [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}]
            )
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryCard}>
            <MediumCustomText style={styles.summaryText}>
                Chosen number:
            </MediumCustomText>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>
            <AppButton onPress={() => startGameHandler(selectedNumber)}>
                START GAME
            </AppButton>
        </Card>
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardVerticalOffset={30}
                behavior={'position'}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <MediumCustomText style={styles.title}>
                            Start a New Game!
                        </MediumCustomText>
                        <Card style={{
                            ...styles.contentWrapper,
                            width: isAlbum ? '90%' : '100%'}}>
                            <MediumCustomText style={styles.contentTitle}>
                                Select a Number
                            </MediumCustomText>
                            <Input style={styles.input}
                                   maxLength={2}
                                   value={enteredValue}
                                   onChangeText={numberInputValue}
                                   keyboardType={'number-pad'}/>
                            <View style={styles.buttons}>
                                <View style={{...styles.button, width: isAlbum ? availableWidth / 3.8 : availableWidth / 3.5}}>
                                    <AppButton color={THEME.DANGER_COLOR} onPress={resetInputHandler}>
                                        Reset
                                    </AppButton>
                                </View>
                                <View style={{...styles.button, width: isAlbum ? availableWidth / 3.8 : availableWidth / 3.5}}>
                                    <AppButton onPress={confirmInputHandler}>
                                        Confirm
                                    </AppButton>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        alignItems: 'center'
    },
    contentWrapper: {
        alignItems: 'center'
    },
    title: {
        marginTop: 5,
        fontSize: 20
    },
    contentTitle: {
        fontSize: 18
    },
    input: {
        width: "50%",
        borderBottomColor: THEME.MAIN_COLOR,
        fontSize: 18
    },
    buttons: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        fontSize: 14
    },
    summaryCard: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    summaryText: {
        textAlign: 'center'
    }
})