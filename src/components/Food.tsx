import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Coordinate } from '../types/types'

const Food = ({x, y} : Coordinate):JSX.Element => {
  return (
    <Text style={[{top: y*10, left: x* 10},styles.food]}>🍎</Text>
  )
}

export default Food

const styles = StyleSheet.create({
    food:{
        width: 20,
        aspectRatio: 1,
        borderRadius: 7,
        position: "absolute"
    }
})