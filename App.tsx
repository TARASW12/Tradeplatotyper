import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Load} from './src/screens/load/loading.tsx';
import {Introduce, Introduce2, Introduce3} from './src/screens/introduce';
const Stack = createNativeStackNavigator();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './src/components/tabBar';
import {Home} from './src/screens/main/home.tsx';
import {Profile} from './src/screens/main/profile.tsx';
import {Cards} from './src/screens/main/cards.tsx';
import {Analytics} from './src/screens/main/analytics.tsx';
import {useEffect, useState} from 'react';
import {clearAllData, getData} from './src/asyncStorage';
import {INTRODUCE} from './src/helpers/introduce.js';
import {Invest} from './src/screens/main/invest.tsx';
import {YourDeal} from './src/screens/main/YourDeal.tsx';
import {InvestPid} from './src/screens/Pid/invest.tsx';
import {BusineesPid} from './src/screens/Pid/busineess.tsx';

const IntroduceStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const IntroduceScreen = () => {
  return (
    <IntroduceStack.Navigator screenOptions={{headerShown: false}}>
      <IntroduceStack.Screen name="IntroduceStep1" component={Introduce} />
      <IntroduceStack.Screen name="IntroduceStep2" component={Introduce2} />
      <IntroduceStack.Screen name="IntroduceStep3" component={Introduce3} />
    </IntroduceStack.Navigator>
  );
};

export const Main = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Invest" component={Invest} />
      <Tab.Screen name="InvestPid" component={InvestPid} />
      <Tab.Screen name="BusineesPid" component={BusineesPid} />
      <Tab.Screen name="YourDeal" component={YourDeal} />
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

function App(): React.JSX.Element {
  // useEffect(() => {
  //     const clear =async () =>{
  //         await  clearAllData()
  //     }
  //     clear()
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Load} />
        <Stack.Screen name="Introduce" component={IntroduceScreen} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
