import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../styles/colors';

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean
}

const Header = ({
    children,
    reloadGame,
    pauseGame,
    isPaused
}:HeaderProps):JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Text style={{color : Colors.primary}}>Reload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseGame}>
        <Text style={{color : Colors.primary}}>{isPaused ? "Resume" : "Pause"}</Text>
      </TouchableOpacity>
      {children}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colors.background
    }
})