import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/Components/Home';
import Soal from './src/Components/Soal';
import SoalWriting from './src/Components/SoalWriting';

export default function App() {
  return (
    <SoalWriting/>
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
