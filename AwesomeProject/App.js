import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: 'Many Colors!'}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({route}) => ({title: route.params.paletteName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
