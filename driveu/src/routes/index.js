import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import History from '../screens/History';
const Tab = createBottomTabNavigator();
const Routes = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
      </NavigationContainer>
  );
};

export default Routes;
