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
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

export const Home = () => {
  const { navigate }: any = useNavigation();
  const [cars, setCars] = React.useState<CarDTO[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleCarDetails = (car: CarDTO) => {
    navigate('CarDetails', { car });
  }

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get<CarDTO[]>('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  },[])

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
      { loading ? <Load/> : 
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Car onPress={() => handleCarDetails(item)} data={item}/>}
        />
      }
    </Container>
  );
}