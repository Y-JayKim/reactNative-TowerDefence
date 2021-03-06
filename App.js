import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, DrawerNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import MenuScreen from './components/MenuScreen';
import MapScreen from './components/MapScreen';
import CollectionScreen from './components/CollectionScreen';
import PlaneScreen from './components/PlaneScreen';
import QuizScreen from './components/QuizScreen';
import AnswerScreen from './components/AnswerScreen';

global.userInfo = {
                    "accountInfo" : 'guest',
                    "collections" : "null"
                  };
global.guestDefault = {
                        "accountInfo" : 'guest',
                        "collections" : "null"
                      };

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    SignIn: {
      screen: SignInScreen
    },
    SignUp: {
      screen: SignUpScreen
    },
    Menu: {
      screen: MenuScreen
    },
    Map: {
      screen: MapScreen
    },
    Collection: {
      screen: CollectionScreen
    },
    Plane: {
      screen: PlaneScreen
    },
    Quiz: {
      screen: QuizScreen
    },
    Answer: {
      screen: AnswerScreen
    }
  },
  {
    initialRouteName: 'Home',
  },
  {
    appGlobalVariables: {
      thisis:"default"
    }
  }
);


export default class App extends React.Component {

  static navigationOptions = {
        headerStyle: {
            backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
  };

  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
