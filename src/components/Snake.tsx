import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { Coordinate } from '../types/types'
import { Colors } from '../styles/colors';

interface SnakeProps{
    snake: Coordinate[];
}

const Snake = ({snake}: SnakeProps):JSX.Element => {
  return (
    <Fragment>
        {snake.map((segment:Coordinate, index: number) => {
            const segmentStyle = {
                left: segment.x * 10,
                top: segment.y * 10
            }
            return(
                <View key={index} style = {[styles.snake , segmentStyle ]}/>
            )
        })}
    </Fragment>
  )
}

export default Snake

const styles = StyleSheet.create({
    snake: {
        width: 15,
        aspectRatio: 1,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: "absolute"
    }
})