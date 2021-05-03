import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from "react-native";
import {NumberContainer} from "../components/ui/NumberContainer";
import {Card} from "../components/ui/Card";
import {AppButton} from "../components/ui/AppButton";
import {THEME} from "../theme";
import {MediumCustomText} from "../components/ui/MediumCustomText";
import {Ionicons} from '@expo/vector-icons';
import {GuessOutput} from "../components/ui/GuessOutput";
import {useAvailableWindowParams} from "../hooks/useAvailableWindowParams";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min) + min)
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

export const GameScreen = ({userChoice, gameOverHandler}) => {
    const initialValue = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialValue)
    const [pastGuesses, setPastGuesses] = useState([initialValue])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [availableWidth, availableHeight] = useAvailableWindowParams()

    useEffect(() => {
        if(currentGuess === userChoice) {
            gameOverHandler(pastGuesses.length - 1)
        }
    }, [currentGuess, userChoice, gameOverHandler])

    const nextGuessHandler = (direction) => {
        if((direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong', [{text: 'Sorry', style: 'cancel'}])
            return
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setPastGuesses(prevRound => [nextNumber, ...prevRound])
        setCurrentGuess(nextNumber)
    }

    if (availableHeight < 500) {
        return (
            <View style={styles.container}>
                <MediumCustomText>
                    Opponents Guess:
                </MediumCustomText>
                <View style={{
                    width: availableWidth / 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'}}>
                    <View style={{width: availableWidth / 8}}>
                        <AppButton onPress={nextGuessHandler.bind(this, 'lower')} color={THEME.MAIN_COLOR}>
                            <Ionicons name={'remove'} size={24} color={'white'}/>
                        </AppButton>
                    </View>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <View style={{width: availableWidth / 8}}>
                    <AppButton onPress={nextGuessHandler.bind(this, 'greater')} color={THEME.MAIN_COLOR}>
                        <Ionicons name={'add'} size={24} color={'white'}/>
                    </AppButton>
                </View>
                </View>
                <View style={styles.listWrapper}>
                    <FlatList data={pastGuesses} keyExtractor={(item) => String(item * Math.random() * Math.random())}
                              renderItem={(item) => {
                                  return <GuessOutput number={pastGuesses.length - item.index} text={item.item}/>
                              }
                              }/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MediumCustomText>
                Opponents Guess:
            </MediumCustomText>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={{
                ...styles.buttonContainer,
                width: availableWidth}}>
                <View style={styles.button}>
                    <AppButton onPress={nextGuessHandler.bind(this, 'lower')} color={THEME.MAIN_COLOR} >
                        <Ionicons name={'remove'} size={24} color={'white'}/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={nextGuessHandler.bind(this, 'greater')} color={THEME.MAIN_COLOR}>
                        <Ionicons name={'add'} size={24} color={'white'}/>
                    </AppButton>
                </View>
            </Card>
            <View style={styles.listWrapper}>
            <FlatList data={pastGuesses} keyExtractor={(item) => String(item * Math.random() * Math.random())} renderItem={(item) => {
                return <GuessOutput number={pastGuesses.length - item.index} text={item.item} />
            }
            } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        maxWidth: "80%"
    },
    button: {
        width: "40%"
    },
    listWrapper: {
        flex: 1,
        width: '60%',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})