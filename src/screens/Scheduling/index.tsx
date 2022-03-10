import React from 'react';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export const Scheduling = () => {
  const { navigate }: any = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const [lastSelectedDate, setLastSelectedDate] = React.useState({} as DayProps);
  const [markedDates, setMarkedDates] = React.useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = React.useState<RentalPeriodProps>({} as RentalPeriodProps)
  
  const handleConfirmRental = () => {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo para aluguel')
      return;
    }
    navigate('SchedulingDetails', {
      car,
      date: Object.keys(markedDates),
    })
  }

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <Header>
        <BackButton/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}