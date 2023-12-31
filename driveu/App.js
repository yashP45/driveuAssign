import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/routes'
import { DataProvider } from './DataContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <DataProvider>
     <Routes/>
     </DataProvider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})