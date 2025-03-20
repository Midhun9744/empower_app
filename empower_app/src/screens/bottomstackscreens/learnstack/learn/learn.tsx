import React, {useContext} from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../../utils/colors';
import {UserContext} from '../../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export type LearnStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const Learn = () => {
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const nav = useNavigation<StackNavigationProp<LearnStackParamList>>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Welcome Message */}
      <Text style={styles.welcome}>{t('welcome to learning path ')}!</Text>

      
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

export default Learn;
