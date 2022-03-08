import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingCompleted } from '../screens/SchedulingCompleted';
import { SchedulingDetails } from '../screens/SchedulingDetails';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name='Home'
        component={Home}
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