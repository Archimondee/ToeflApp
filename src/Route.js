import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {Ionicons, SimpleLineIcons} from 'react-native-vector-icons';

import Home from './Components/Home';
import InfoScreen from './Components/InfoScreen';
import Soal from './Components/Soal';
import SoalText from './Components/SoalText';
import SoalAudio from './Components/SoalAudio';
import HistoryNilai from './Components/HistoryNilai';

import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Auth from './Components/User/Auth';


const MainStack = createStackNavigator (
  {
    Home: Home,
    Soal: Soal,
    SoalText: SoalText,
    SoalAudio: SoalAudio,
    Info:InfoScreen,
    History: HistoryNilai
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const UserStack = createStackNavigator({
  Login: Login,
  Register: Register,
  Auth: Auth
},{
  initialRouteName:'Auth',
  headerMode: 'none'
})

export default (Main = createAppContainer (
  createSwitchNavigator (
    {
      Pertama: UserStack,
      Kedua: MainStack
    },
    {
      initialRouteName: 'Pertama',
      headerMode: 'none',
    }
  )
));
