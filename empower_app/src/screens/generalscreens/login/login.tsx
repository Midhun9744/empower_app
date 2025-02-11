import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {UserContext} from '../../../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../../../utils/colors';

export type AuthStackParamList = {
  Register: {} | undefined;
  Forgot: {} | undefined;
};

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {dispatchUserEvent} = useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
      />
      <Text style={styles.appName}>Way Made</Text>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        {/* Username Field */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => nav.navigate('Forgot', {})}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          onPress={() =>
            dispatchUserEvent('SIGNIN', {
              info: 'test',
              token: 'test',
            })
          }
          style={styles.loginButton}>
          Login
        </Button>

        {/* Register Option */}
        <TouchableOpacity onPress={() => nav.navigate('Register', {})}>
          <Text style={styles.registerText}>Click here to register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#007BFF',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 15,
  },
  registerText: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default LoginComponent;
