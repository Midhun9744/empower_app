/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ForgotComponent from '../screens/generalscreens/forgot/forgot';
import HomeComponent from '../screens/bottomstackscreens/homestack/home/home';
// import SendOtpScreen from '../screens/bottomstackscreens/homestack/verify/send';
// import VerifyOtpScreen from '../screens/bottomstackscreens/homestack/verify/verify';
import SettingsListComponent from '../screens/bottomstackscreens/settingstack/settingsList/settingsList';
import LoginComponent from '../screens/generalscreens/login/login';
import RegisterComponent from '../screens/generalscreens/register/register';
import Colors from '../utils/colors';

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitle: '',
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreens}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ExploreTab"
        component={ExploreScreens}
        options={{
          title: 'Orders',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="truck"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchTab"
        component={SearchScreens}
        options={{
          title: 'Account',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="user"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="FolderTab"
        component={FolderScreens}
        options={{
          title: 'Learn',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="book"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileScreens}
        options={{
          title: 'Setting',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="navicon"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const AuthStack = createStackNavigator();

export function AuthScreens() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <AuthStack.Screen name="Login" component={LoginComponent} />
      <AuthStack.Screen name="Register" component={RegisterComponent} />
      <AuthStack.Screen name="Forgot" component={ForgotComponent} />
    </AuthStack.Navigator>
  );
}

const RootStack = createStackNavigator();

export function RootScreens() {
  return (
    <RootStack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Root" component={BottomTabs} />
    </RootStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

export function HomeScreens() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <HomeStack.Screen name="Home" component={HomeComponent} />
      {/* <HomeStack.Screen name="Send" component={SendOtpScreen} />
      <HomeStack.Screen name="Verify" component={VerifyOtpScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

export function ExploreScreens() {
  return (
    <ExploreStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <ExploreStack.Screen name="Home" component={HomeComponent} />
    </ExploreStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

export function SearchScreens() {
  return (
    <SearchStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <SearchStack.Screen name="Home" component={HomeComponent} />
    </SearchStack.Navigator>
  );
}

const FolderStack = createStackNavigator();

export function FolderScreens() {
  return (
    <FolderStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <FolderStack.Screen name="Home" component={HomeComponent} />
    </FolderStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

export function ProfileScreens() {
  return (
    <ProfileStack.Navigator
      initialRouteName="SettingList"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <ProfileStack.Screen
        name="SettingList"
        component={SettingsListComponent}
      />
    </ProfileStack.Navigator>
  );
}
