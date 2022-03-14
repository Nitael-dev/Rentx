import React from 'react';
import { Button, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import {
  Container,
} from './styles'

export const Splash = () => {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animation.value}]
    }
  })

  const handleAnimationPosition = () => {
    animation.value += 100;
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]}/>
      <Button title='Mover' onPress={handleAnimationPosition}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})