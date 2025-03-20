import React, {useContext} from 'react';
import {Text, Image, StyleSheet, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../../utils/colors';
import {UserContext} from '../../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

export type SellerStackParamList = {
  SellerDashboard: {} | undefined;
  ProfileInfo: undefined;
  AddProduct: undefined;
  ViewProduct: undefined;
};

const SellerDashboard = () => {
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>();

  return (
    // LinearGradient applied to the entire screen
    <LinearGradient
      colors={['#ffffff', '#abbaab']} // Gradient colors
      style={styles.container}
      start={{ x: 0, y: 0 }}  // Start of the gradient
      end={{ x: 1, y: 1 }}    // End of the gradient
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image Section */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../../assets/images/seller.webp')}
            style={styles.profileImage}
          />
        </View>

        {/* Welcome Message */}
        <Text style={styles.welcome}>
          {t('welcome to SellerDashboard ')} {user?.info.F_NAME}
        </Text>

        {/* Tab Navigation - Stack them vertically */}
        <View style={styles.tabsContainer}>
          <Button
            mode="outlined"
            style={styles.tabButton}
            onPress={() => nav.navigate('ProfileInfo')}>
            {t('Profile Info')}
          </Button>
          <Button
            mode="outlined"
            style={styles.tabButton}
            onPress={() => nav.navigate('AddProduct')}>
            {t('Add Product')}
          </Button>
          <Button
            mode="outlined"
            style={styles.tabButton}
            onPress={() => nav.navigate('ViewProduct')}>
            {t('View Added Products')}
          </Button>
        </View>

        {/* Optional Get Started Button */}
        {/* <Button
          mode="contained"
          style={styles.getStartedButton}
          onPress={() => nav.navigate('SellerDashboard')}>
          {t('start')}
        </Button> */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    // borderColor: Colors.primary,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  tabsContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'column', // Change to column layout for stacking buttons vertically
    alignItems: 'center',  // Center align the buttons
  },
  tabButton: {
    width: '80%', // Width of the button (80% of the container width)
    marginVertical: 10, // Add space between buttons
  },
  getStartedButton: {
    marginTop: 20,
    width: '80%',
    borderRadius: 8,
  },
});

export default SellerDashboard;
