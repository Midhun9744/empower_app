import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const ProductPage = ({ route }) => {
  const product = route?.params?.product || {
    name: 'Homemade Cake',
    price: 499,
    description: 'Delicious homemade cake made with organic ingredients.',
    image: 'https://www.cakedelivery.com/images/homemade-cake.jpg',
    rating: 4.5,
    reviews: 120,
  };

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleBuyNow = () => {
    Alert.alert('Purchase Successful', You have purchased ${product.name} for ₹${product.price});
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', ${product.name} has been added to your cart.);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    Alert.alert('Wishlist', ${product.name} has been ${!isWishlisted ? 'added to' : 'removed from'} your wishlist.);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search for Products..."
          placeholderTextColor="#888"
          style={styles.searchBox}
        />
        <TouchableOpacity onPress={toggleWishlist} style={styles.wishlistIcon}>
          <AntDesign name="heart" size={24} color={isWishlisted ? 'red' : '#888'} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={20} color="gold" />
        <Text style={styles.ratingText}>{product.rating} ({product.reviews} Reviews)</Text>
      </View>
      <Text style={styles.productPrice}>₹{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>

      <Text style={styles.relatedTitle}>Related Products</Text>
      <View style={styles.relatedContainer}>
        <View style={styles.relatedCard}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.relatedImage} />
          <Text style={styles.relatedText}>Handmade Soap</Text>
          <Text style={styles.relatedPrice}>₹199</Text>
        </View>
        <View style={styles.relatedCard}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.relatedImage} />
          <Text style={styles.relatedText}>Natural Oil</Text>
          <Text style={styles.relatedPrice}>₹299</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    color: '#333',
  },
  wishlistIcon: {
    marginLeft: 10,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 20,
    color: '#6200EE',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  addToCartButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 30,
  },
  buyButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  relatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  relatedCard: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    elevation: 5,
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  relatedText: {
    fontSize: 16,
    color: '#333',
  },
  relatedPrice: {
    fontSize: 14,
    color: '#6200EE',
    fontWeight: 'bold',
  },
});

export default ProductPage;