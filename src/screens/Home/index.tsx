import React from 'react';
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles'
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const { navigate }: any = useNavigation();

  const carData = {
    brand: 'audi',
    name: 'RS 5 Coupoé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  }
  // thumbnail: 'https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png',

  const handleCarDetails = () => {
    navigate('CarDetails');
  }

  return (  
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1,2,3]}
        keyExtractor={(item) => String(item)}
        renderItem={({item}) => <Car onPress={handleCarDetails} data={carData}/>}
      />
    </Container>
  );
}