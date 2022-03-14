import React from 'react';
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCarsButton
} from './styles'
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

const {IP_SERVER} = process.env;

export const Home = () => {
  const theme = useTheme();

  const { navigate }: any = useNavigation();
  const [cars, setCars] = React.useState<CarDTO[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleCarDetails = (car: CarDTO) => {
    navigate('CarDetails', { car });
  }
  const handleMyCars = () => {
    navigate('MyCars');
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
            Total de {cars.length} carros
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
      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape}/>
      </MyCarsButton>
    </Container>
  );
}