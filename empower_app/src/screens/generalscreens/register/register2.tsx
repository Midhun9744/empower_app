/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, type PropsWithChildren} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserContext} from '../../../context/userContext';
import Colors from '../../../utils/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: {} | undefined;
};

const RegisterComponent = () => {
  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {dispatchUserEvent} = useContext(UserContext);

  return (
    <View style={{backgroundColor: Colors.primary, flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            alignContent: 'center',
            minHeight: 250,
          }}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'stretch',
            }}
            source={require('../../../assets/images/logo.png')}
          />
          <Text
            style={{
              color: Colors.black,
              fontSize: 50,
              fontFamily: 'sans-serif',
            }}>
            Way Made
          </Text>
        </View>
      </View>
      <View style={{flex: 2, paddingTop: 20}}>
        <View style={{padding: 10}}>
          <TextInput
            style={{
              color: Colors.black,
              fontFamily: 'sans-serif',
              borderColor: Colors.black,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 25,
              fontSize: 20,
            }}
            placeholder="Enter Email Address"
          />
        </View>
        <View style={{padding: 10}}>
          <TextInput
            style={{
              color: Colors.black,
              fontFamily: 'sans-serif',
              borderColor: Colors.black,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 25,
              fontSize: 20,
            }}
            placeholder="Enter Year of Birth"
          />
        </View>
        <View style={{padding: 10}}>
          <TextInput
            style={{
              color: Colors.black,
              fontFamily: 'sans-serif',
              borderColor: Colors.black,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 25,
              fontSize: 20,
            }}
            placeholder="Create a Username"
          />
        </View>
        {/* <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            minHeight: 30,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 15,
                fontFamily: 'sans-serif',
              }}>
              Username entered already in use.
            </Text>
          </View>
        </View> */}
        <View style={{padding: 10}}>
          <TextInput
            style={{
              color: Colors.black,
              fontFamily: 'sans-serif',
              borderColor: Colors.black,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 25,
              fontSize: 20,
            }}
            placeholder="Create a Password"
            secureTextEntry
          />
        </View>

        <View
          style={{
            padding: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatchUserEvent('SIGNIN', {
                info: 'test',
                token: 'test',
              });
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.accent,
              borderWidth: 1,
              borderColor: Colors.black,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 20,
                fontFamily: 'sans-serif',
                alignContent: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 10, flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderColor: Colors.black,
              borderRadius: 10,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 15,
                fontFamily: 'sans-serif',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              Already Registered ?
              <Text
                onPress={() => {
                  nav.navigate('Login', {});
                }}
                style={{
                  color: Colors.accent,
                  fontSize: 15,
                  fontFamily: 'sans-serif',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                {` Click here to Login`}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterComponent;
