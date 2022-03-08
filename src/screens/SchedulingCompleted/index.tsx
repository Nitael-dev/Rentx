import React from 'react';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles'
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

export const SchedulingCompleted = () => {
  const { width } = useWindowDimensions();
  const { navigate }: any = useNavigation();

  const handleGoHome = () => {
    navigate('Home')
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width}/>
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleGoHome}/>
      </Footer>
    </Container>
  );
}