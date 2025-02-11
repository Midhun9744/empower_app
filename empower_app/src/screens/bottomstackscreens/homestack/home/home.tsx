import React, {useContext} from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../../utils/colors';
import {UserContext} from '../../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export type HomeStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const HomeScreen = () => {
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Image Section */}
      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.image}
      />

      {/* App Name Label */}
      <Text style={styles.appName}> Hi {user.info.F_NAME}</Text>

      {/* Welcome Message */}
      <Text style={styles.welcome}>{t('welcome')}!</Text>

      {/* Description */}
      <Text style={styles.description}>{t('desc')}</Text>

      {/* Get Started Button */}
      <Button
        mode="contained"
        style={styles.getStartedButton}
        onPress={() => alert(t('more'))}>
        {t('start')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '25%',
    resizeMode: 'center',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  getStartedButton: {
    marginTop: 20,
    width: '80%',
    borderRadius: 8,
  },
});

export default HomeScreen;
