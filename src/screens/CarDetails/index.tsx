import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles'
import { Button } from '../../components/Button';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryicon';

interface Params {
  car: CarDTO;
}

export const CarDetails = () => {
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;
  const { navigate }: any = useNavigation();

  const handleConfirmRental = () => {
    navigate('Scheduling', { car });
  };

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={theme.colors.background_secondary}
      />
      <Header>
        <BackButton color='#000000'/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>
        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button onPress={handleConfirmRental} title='Escolher período do aluguel'/>
      </Footer>
    </Container>
  );
}