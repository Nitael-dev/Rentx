import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Container,
} from './styles'
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export const BackButton = ({color, ...rest}: Props) => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  
  return (
    <Container onPress={() => goBack()} {...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}