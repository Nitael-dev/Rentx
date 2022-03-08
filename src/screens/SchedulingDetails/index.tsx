import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Feather } from '@expo/vector-icons';
import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'
import { Button } from '../../components/Button';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

export const SchedulingDetails = () => {
  const theme = useTheme();
  const { navigate }: any = useNavigation();
  
  const handleConfirmRental = () => {
    navigate('SchedulingCompleted')
  }

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
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}/>
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name='380Km/h' icon={speedSvg}/>
          <Accessory name='3.2s' icon={accelerationSvg}/>
          <Accessory name='800 HP' icon={forceSvg}/>
          <Accessory name='Gasolina' icon={gasolineSvg}/>
          <Accessory name='Auto' icon={exchangeSvg}/>
          <Accessory name='2 pessoas' icon={peopleSvg}/>
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>08/03/2022</DateValue>
          </DateInfo>
          <Feather
            size={10}
            name='chevron-left'
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>Ate</DateTitle>
            <DateValue>08/03/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x 3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}