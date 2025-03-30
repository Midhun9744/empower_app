import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { UserContext } from '../../../../context/userContext'; // Access user context
import { BASE_URL } from '../../../../utils/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export type HomeStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  Homestart: {} | undefined;
  Productpage: {} | undefined;
};

const Homestart = () => {
  const { user } = useContext(UserContext); // Access current user (the seller)
   const {t} = useTranslation();
    const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();
  
  const [products, setProducts] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const API_URL = `${BASE_URL}/api/product/list`; // API URL to get the products
        const response = await fetch(API_URL, {
          method: 'GET', // Use GET method to fetch products
          headers: {
            'Content-Type': 'application/json', // Indicate content type
            // Add any necessary authorization headers here (e.g., Authorization: `Bearer ${token}`)
          },
        });

        const result = await response.json(); // Parse the JSON response
        console.log(result);
        console.log(result.products);

        // Check if the response is successful
        if (response.ok) {
          // Extract the 'data' array from the response
          const productsData = result.products || []; // Default to empty array if 'data' is not present
          setProducts(productsData); 
          console.log(productsData);// Set the products in state
        } else {
          throw new Error('Failed to load products');
        }
      } catch (error) {
        console.error('Error fetching products:', error); // Log any errors
        Alert.alert('Error', 'Failed to load products'); // Show error alert
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSellerProducts(); // Fetch products when the component is mounted
  }, [user.info.USER_ID]); // Re-run the effect if the user ID changes

  if (loading) {
    return <Text style={styles.loading}>Loading your products...</Text>; // Show loading message
  }

  if (products.length === 0) {
    return <Text style={styles.error}>No products found</Text>; // Show error message if no products are found
  }

  const handleAddToCart = (productId: string) => {
    console.log(`Product ${productId} added to cart`);
    // Handle add to cart logic here
  };

  const handleBuyNow = (productId: string) => {
    console.log(`Product ${productId} purchased`);
    // Handle buy now logic here
  };
  const handleManageProduct = (productId: string) => {
    nav.navigate('Productpage', { productId }); // Navigate to ProductScreen and pass the product ID
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Loop through the products array and display each product */}
      {products.map((product: any) => (
        <View key={product.PRODUCT_ID} style={styles.productCard}>
          {/* Product image */}
          <Image source={require('../../../../assets/images/seller1.jpg')} style={styles.productImage} />
          {/* Product name */}
          <Text style={styles.productName}>{product.NAME}</Text>
          {/* Product description */}
          {/* <Text style={styles.productDescription}>{product.DESCRIPTION}</Text> */}
          {/* Product price */}
          <Text style={styles.productPrice}>${product.PRICE}</Text>
          {/* Product quantity */}
          {/* <Text style={styles.productQuantity}>Quantity: {product.QUANTITY}</Text> */}
          {/* Product like count */}
          <Text style={styles.productLikeCount}>Likes: {product.LIKE_COUNT}</Text>

          {/* Button to manage the product */}
          <Button
            title="Manage Product"
            onPress={() => handleManageProduct(product.PRODUCT_ID)}
            color="#ff9800"
          />

          {/* Add to Cart and Buy Now buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Add to Cart"
              onPress={() => handleAddToCart(product.PRODUCT_ID)}
              color="#4CAF50"
            />
            <Button
              title="Buy Now"
              onPress={() => handleBuyNow(product.PRODUCT_ID)}
              color="#f44336"
            />
          </View>
        </View>
      ))}
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
    height: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
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

export default Homestart;
