import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from './src/components/Header'
import {StartGameScreen} from "./src/screens/StartGameScreen";
import {GameScreen} from "./src/screens/GameScreen";
import {GameOverScreen} from "./src/screens/GameOverScreen";
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";

const fetchFonts = async () => {
  await Font.loadAsync({
    'JBMed': require('./assets/fonts/JetBrainsMono-Medium.ttf'),
    'JBBold': require('./assets/fonts/JetBrainsMono-Bold.ttf')
  })
}

export default function App() {
  const [isLoadingReady, setIsLoadingReady] = useState(false)
  const [userNumber, setUserNumber] = useState()
  const [guessRound, setGuessRound] = useState(0)
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }
  const gameOverHandler = (numOfRnd) => {
    setGuessRound(numOfRnd)
  }
  const startNewGameHandler = () => {
    setGuessRound(0)
    setUserNumber(null)
  }

  if(!isLoadingReady) {
    return <AppLoading startAsync={fetchFonts}
                       onError={e => console.log(e)}
                       onFinish={() => setIsLoadingReady(true)}/>
  }
  let content = <StartGameScreen startGameHandler={startGameHandler} />
  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber}
                          gameOverHandler={gameOverHandler} />
  } else if (guessRound > 0) {
    content = <GameOverScreen userNum={userNumber}
                              roundsNum={guessRound}
                              startNewGameHandler={startNewGameHandler} />
  }
  return (
    <View style={styles.container}>
      <Header title={'Guess a Number'} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
