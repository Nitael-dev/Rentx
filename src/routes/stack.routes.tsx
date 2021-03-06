import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingCompleted } from '../screens/SchedulingCompleted';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
    <Screen
      name='Splash'
      component={Splash}
    />
    <Screen
      name='Home'
      component={Home}
    />
      <Screen
        name='MyCars'
        component={MyCars}
      />
      <Screen
        name='Scheduling'
        component={Scheduling}
      />
      <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
      />
      <Screen
        name='SchedulingCompleted'
        component={SchedulingCompleted}
      />
      <Screen
        name='CarDetails'
        component={CarDetails}
      />
    </Navigator>
  );
}