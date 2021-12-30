import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import {createStackNavigator} from '@react-navigation/stack';
import ColorPaletteModal from './screens/ColorPaletteModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{title: 'Many Colors!'}}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({route}) => ({title: route.params.paletteName})}
      />
    </MainStack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />
        <RootStack.Screen
          name="ColorPaletteModal"
          component={ColorPaletteModal}
          options={{presentation: 'modal'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
