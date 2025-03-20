import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

export type AccountStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  EditProfile: {} | undefined;
};

const AccountView = () => {
  const { user, updateUserInfo } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<AccountStackParamList>>();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get('/api/user'); // Fetch user info from DB
  //       if (response.status === 200) {
  //         updateUserInfo(response.data); // Update context with latest data
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserInfo();
  // }, [updateUserInfo]);

  return (
    <LinearGradient colors={['#ffffff', '#abbaab']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image at the top */}
        <Image
          source={require('../../../../assets/images/avatar.png')} // Replace with your image URL
          style={styles.image}
        />

        <Text style={styles.welcome}>{t('welcome to Profile')}!</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>{t('User Information')}</Text>
            <Divider style={styles.divider} />
            <View style={styles.infoBox}>
              <View style={styles.inputBox}>
                <Text style={styles.userInfoTitle}>{t('Full Name')}</Text>
                <Text style={styles.userInfo}>{user.info.F_NAME} {user.info.L_NAME}</Text>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.userInfoTitle}>{t('Phone')}</Text>
                <Text style={styles.userInfo}>{user.info.PHONE}</Text>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.userInfoTitle}>{t('Address')}</Text>
                <Text style={styles.userInfo}>
                  {user.info.ADDRESS_LINE1}{'\n'}
                 {user.info.ADDRESS_LINE2}{'\n'}
                 {user.info.CITY} ,   
                 {user.info.STATE} {'\n'}
                 {user.info.COUNTRY} {'\n'}
                 {user.info.PINCODE}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          icon="account-edit"
          buttonColor="#ffffff"
          textColor="#000000"
          style={styles.button}
          onPress={() => nav.navigate('EditProfile')}
        >
          {t('editProfile')}
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abbaab',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#abbaab',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 60, // Makes the image circular
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#abbaab',
    textAlign: 'center',
  },
  divider: {
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  infoBox: {
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: 'rgba(236, 235, 215, 0.51)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  userInfo: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
  },
});

export default AccountView;
