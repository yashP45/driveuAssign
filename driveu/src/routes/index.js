import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import History from '../screens/History';
import Track from '../screens/Track';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Routes = () => {
  function BottomTab() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    );
  }
  
  
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="BottomTab"> 
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Track" component={Track} />
      </Stack.Navigator>
     
      </NavigationContainer>
  );
};

export default Routes;
