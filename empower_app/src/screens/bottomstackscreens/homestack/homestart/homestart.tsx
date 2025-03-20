import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { BASE_URL } from '../../../../utils/constants';

const  Homestart = () => {
  const products = [
    { id: 1, name: 'Homemade Cake', price: 499, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Handmade Soap', price: 199, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Natural Oil', price: 299, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Organic Lotion', price: 399, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Hand-stitched Cloth', price: 999, image: 'https://via.placeholder.com/150' },
  ];

  const recentlyViewed = [
    { id: 6, name: 'Herbal Shampoo', price: 299, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Natural Honey', price: 399, image: 'https://via.placeholder.com/150' },
  ];

  const popularItems = [
    { id: 8, name: 'Aloe Vera Gel', price: 199, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Handcrafted Mug', price: 499, image: 'https://via.placeholder.com/150' },
  ];

  const scrollX = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.waymadeText}>Waymade</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.logo}>🔍</Text>
          <TextInput 
            placeholder="Search for Products..."
            placeholderTextColor="#888"
            style={styles.searchBox}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Top Deals</Text>
        <Animated.ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll} 
          pagingEnabled 
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.card}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productText}>{product.name}</Text>
              <Text style={styles.priceText}>₹{product.price}</Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        <View style={styles.boxContainer}>
          {recentlyViewed.map((item) => (
            <TouchableOpacity key={item.id} style={styles.boxCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.priceText}>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Popular Items</Text>
        <View style={styles.boxContainer}>
          {popularItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.boxCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.priceText}>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#6200EE',
  },
  waymadeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
  },
  logo: {
    marginRight: 10,
    fontSize: 20,
    color: '#6200EE',
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    alignItems: 'center',
    width: 150,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 5,
  },
});

export default  Homestart;