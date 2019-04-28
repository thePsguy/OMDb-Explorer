import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LaunchScreen from './LaunchScreen';
import TitleDetail from '../screens/TitleDetail';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Launch: LaunchScreen,
  Main: HomeScreen,
  TitleDetail: TitleDetail,
}));
