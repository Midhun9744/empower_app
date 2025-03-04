import React, {useContext} from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import {UserContext} from '../../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

// const restaurants = [
  // {
  //   name: 'Pizza Street Restaurant',
  //   image: '',
  //   price: '$25 min',
  // },
  // {
  //   name: 'Crispy Chicken Restaurant',
  //   image: 'https://via.placeholder.com/300',
  //   price: '$18 min',
  // },
// ];

const Homestart = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
   const {user} = useContext(UserContext);
     const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{t('hello')}{user.info.F_NAME}{'\n'}</Text>
    

        <View style={styles.searchContainer}>
          <TextInput
            placeholder={t('what_do_you_want')}
            style={styles.searchInput}
          />
          <Button mode="contained-tonal" style={styles.searchButton}>🔍</Button>
        </View>
      </View>
      
      {/* <Button
        mode="contained"
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('HomePage')}>
        {t('start')}
      </Button> */}

      <Text style={styles.sectionTitle}>{t('near by ')}</Text>
      {restaurants.map((restaurant, index) => (
        <Card key={index} style={styles.card}>
          <Image
            source={{ uri: restaurant.image || 'https://via.placeholder.com/300' }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantPrice}>Min: {restaurant.price}</Text>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>{t('order_now')}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:10,
    padding:10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,

  },
  searchInput: {
    // flex: 1,
    marginRight: 2,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,

  },
  searchButton: {
    paddingHorizontal:1,
    borderRadius: 70,
    height:40,
    
  },
  getStartedButton: {
    marginBottom: 20,
    backgroundColor: '#f5a623',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  restaurantPrice: {
    fontSize: 14,
    color: '#777',
  },
  orderButton: {
    marginTop: 16,
    backgroundColor: '#f5a623',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Homestart;
