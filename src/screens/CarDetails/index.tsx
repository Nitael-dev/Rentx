import React from 'react';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
} from './styles'

export const CarDetails = () => {
  return (
    <Container>
      <Header>
        <BackButton color='#000000' onPress={() => {}}/>
      </Header>
    </Container>
  );
}