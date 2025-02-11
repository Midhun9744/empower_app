import React, {useContext} from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../../utils/colors';
import {UserContext} from '../../../../context/userContext';

const HomeScreen = () => {
  const {user} = useContext(UserContext);
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
      <Text style={styles.welcome}>Welcome to Way Made!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Way Made is a platform designed to **empower housewives** by helping
        them **enhance their skills, sell their products, and educate others**.
        Whether it's cooking, crafting, teaching, or any other talent, Way Made
        provides the tools and support for women to **grow, share, and earn** in
        a community-driven environment.
      </Text>

      {/* Get Started Button */}
      <Button
        mode="contained"
        style={styles.getStartedButton}
        onPress={() => alert('More features are under development')}>
        Get Started
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
    height: '45%',
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
