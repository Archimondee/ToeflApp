import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/Components/Home';
import Soal from './src/Components/Soal';
import SoalText from './src/Components/SoalText';
import InfoScreen from './src/Components/InfoScreen';

import SoalAudio from './src/Test/SoalAudio';

import Route from './src/Route';

export default function App() {
  return (
    <Route/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
