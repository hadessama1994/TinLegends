import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLogin from './pages/HomeLogin';
import HomePage from './pages/HomePage';

const Stack = createStackNavigator();

function Routes() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={HomeLogin} /> 
      <Stack.Screen name="TinLegends" component={HomePage} />       
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;