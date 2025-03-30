import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '../../../../utils/constants';
import { useRoute } from '@react-navigation/native'; // To access the passed productId from the navigation
import { UserContext } from '../../../../context/userContext'; // Assuming UserContext exists to get user info
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Productpage = () => {
  const [product, setProduct] = useState<any | null>(null); // State to store the product details
  const [loading, setLoading] = useState<boolean>(true); // Loading state for the product
  const [error, setError] = useState<string>(''); // Error state for handling API failures
  const route = useRoute(); // Get the route object from the navigation
  const { productId } = route.params; // Get the productId passed from the HomeStart screen
  const { user } = useContext(UserContext); // Access user context if needed
  const { t } = useTranslation(); // Access translations
  const nav = useNavigation(); // Navigation hook to navigate to other pages

  // Fetch product details when the component mounts or productId changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const API_URL = `${BASE_URL}/api/product/${productId}`; // API URL to get the product details by ID
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any necessary authorization headers here (e.g., Authorization: Bearer ${token})
          },
        });

        const result = await response.json();
        if (response.ok) {
          setProduct(result.product); // Set the fetched product data to state
        } else {
          throw new Error('Failed to load product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchProductDetails(); // Fetch product details when the component mounts
  }, [productId]); // Re-run the effect if the productId changes

  if (loading) {
    return <Text style={styles.loading}>{t('loading product details...')}</Text>; // Show loading message
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>; // Show error message if loading fails
  }

  if (!product) {
    return <Text style={styles.error}>{t('product not found')}</Text>; // Show error message if no product found
  }

  const handleAddToCart = () => {
    console.log(`Product ${product.PRODUCT_ID} added to cart`);
    // Handle add to cart logic here
  };

  const handleBuyNow = () => {
    console.log(`Product ${product.PRODUCT_ID} purchased`);
    // Handle buy now logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productCard}>
        {/* Product image */}
        <Image source={{ uri: product.IMAGE_URL }} style={styles.productImage} />
        {/* Product name */}
        <Text style={styles.productName}>{product.NAME}</Text>
        {/* Product description */}
        <Text style={styles.productDescription}>{product.DESCRIPTION}</Text>
        {/* Product price */}
        <Text style={styles.productPrice}>${product.PRICE}</Text>
        {/* Product quantity */}
        <Text style={styles.productQuantity}>{t('available')}: {product.QUANTITY}</Text>
        {/* Product like count */}
        <Text style={styles.productLikeCount}>{t('likes')}: {product.LIKE_COUNT}</Text>

        {/* Add to Cart and Buy Now buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title={t('add to cart')}
            onPress={handleAddToCart}
            color="#4CAF50"
          />
          <Button
            title={t('buy now')}
            onPress={handleBuyNow}
            color="#f44336"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    height: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  productLikeCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  error: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
  },
});

export default Productpage;
