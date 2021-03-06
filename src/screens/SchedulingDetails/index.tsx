import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Feather } from '@expo/vector-icons';
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
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryicon';
import { addDays, format } from 'date-fns';
import { api } from '../../services/api';
import { AxiosError } from 'axios';

interface RentalPeriodProps {
  start: string;
  end: string;
}

interface Params {
  car: CarDTO;
  date: string[];
}

export const SchedulingDetails = () => {
  const theme = useTheme();
  const { navigate }: any = useNavigation();
  const route = useRoute();
  const { car, date } = route.params as Params;

  const rentalTotal = date.length * car.rent.price;
  const [loading, setLoading] = React.useState(false);
  const [rentalPeriod, setRentalPeriod] = React.useState({} as RentalPeriodProps);

  const handleConfirmRental = async () => {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...date,
    ];
    api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(addDays(new Date(date[0]), 1), 'dd/MM/yyyy'),
      endDate: format(addDays(new Date(date[date.length - 1]), 1), 'dd/MM/yyyy')
    })
    await api.put(`/schedules_bycars/${car.id}`, 
      {
        id: car.id,
        unavailable_dates,
      }).then(() => navigate('SchedulingCompleted')).catch(() => {
        setLoading(false)
        Alert.alert('N??o foi poss??vel confirmar o agendamento')
      }
    )
  }

  React.useEffect(() => {
    setRentalPeriod({
      start: format(addDays(new Date(date[0]), 1), 'dd/MM/yyyy'),
      end: format(addDays(new Date(date[date.length - 1]), 1), 'dd/MM/yyyy'),
    })
  },[])

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
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            size={10}
            name='chevron-left'
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>Ate</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x {date.length} di??rias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button loading={loading} enabled={!loading} title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}