import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'android' ? 64 : 80,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 24,
          height: 24,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-easel"
              color={focused ? '#8257e5' : color}
              size={size}
            />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-heart-empty"
              color={focused ? '#8257e5' : color}
              size={size}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;
