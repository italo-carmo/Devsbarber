import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending']);

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </UserContextProvider>
  )
}
