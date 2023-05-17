import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import { FOOD_INITIAL_POSITION, GAME_BOUNDS, MOVE_INTERVAL, SCORE_INCREMENT, SNAKE_INITIAL_POSITION } from '../utils/constants/constants'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import Food from './Food'
import { checkEatsFood } from '../utils/checkEatsFood'
import randomFoodPosition from '../utils/randomFoodPosition'
import Header from './Header'

const Game = ():JSX.Element => {

    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setsnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
    const [food, setfood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)

   const  onLayout = (e : any) => {
    if(Platform.OS === "android"){

        console.log(e.nativeEvent.layout)
    }
      }

    useEffect(() => {
     if(!isGameOver){
        const intervalId = setInterval(() => {
           !isPaused &&  moveSnake()
        },MOVE_INTERVAL)
        return () => clearInterval(intervalId);
     }
    }, [snake, isGameOver , isPaused])
    

    const moveSnake = () => {
        const snakeHead = snake[0];

        const newHead = {...snakeHead}; // CREATING A COPY

        // GAME OVER
        if(checkGameOver(snakeHead , GAME_BOUNDS)){
            setIsGameOver((prev) => !prev);
            Alert.alert(score.toString(), "your Score", [{
                text: 'OK', onPress: () => {
                    return;
                },
            },
            ]);
            return;
        }

        switch(direction) {
            case Direction.Up: 
                newHead.y -= 1;
                break;
            case Direction.Down: 
                newHead.y += 1;
                break;
            case Direction.Right: 
                newHead.x += 1;
                break;
            case Direction.Left: 
                newHead.x -= 1;
                break;
            default:
                break;
        }

        if(checkEatsFood(newHead, food , 2)){
            setfood(randomFoodPosition(GAME_BOUNDS.xMax , GAME_BOUNDS.yMax))
            setsnake([newHead, ...snake])
            setScore(score + SCORE_INCREMENT)
        }else{

            setsnake([newHead, ...snake.slice(0,-1)]);
        }


    }

    const handleGesture = (event: GestureEventType) => {
        const{translationX , translationY} = event.nativeEvent
        if(Math.abs(translationX) > Math.abs(translationY)){
            if(translationX > 0){
                setDirection(Direction.Right)
            }else{
                setDirection(Direction.Left)
            }
        }else{
            if(translationY > 0){
                setDirection(Direction.Down)
            }else{
                setDirection(Direction.Up)
            }
        }
    }

    const pauseGame = () => {
        setIsPaused(!isPaused)
    }

    const reloadGame = () => {
        setsnake(SNAKE_INITIAL_POSITION);
        setfood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style = {styles.container}>
            <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame}>
                <Text style={{color: Colors.primary}}>{score}</Text>
            </Header>
            <View style={styles.boundaries} onLayout={onLayout}>
                <Snake  snake={snake}/>
                <Food x={food.x} y={food.y}/>
            </View>
        </SafeAreaView>
    </PanGestureHandler>
  )
}

export default Game

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.primary
    },
    boundaries: {
        flex: 1,
        backgroundColor: Colors.background,
        borderWidth: 12,
        borderColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})