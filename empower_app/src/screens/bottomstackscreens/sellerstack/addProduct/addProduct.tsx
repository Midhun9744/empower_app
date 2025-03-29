import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/userContext'; // Import UserContext
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../../utils/colors'; // Assuming a Colors file is used
import { BASE_URL } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';

export type SellerStackParamList = {
  SellerDashboard: {} | undefined;
};

const AddProduct = () => {
  const { user } = useContext(UserContext); // Access user from context
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>();

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.description || !form.quantity) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Validate if price and quantity are numbers
    if (isNaN(Number(form.price)) || isNaN(Number(form.quantity))) {
      Alert.alert('Error', 'Price and Quantity must be valid numbers');
      return;
    }

    try {
      const requestBody = {
        NAME: form.name,
        PRICE: form.price,
        DESCRIPTION: form.description,
        QUANTITY: form.quantity,
        SELLER_ID: user.info.seller_id, // Get seller ID from context
      };

      const API_URL = BASE_URL + '/api/product/add';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map((err: any) => err.msg).join('\n');
          Alert.alert('Validation Error', errorMessages);
        } else if (data.error) {
          Alert.alert('Error 1', data.error);
        } else if (data.message) {
          Alert.alert('Error 2', data.message);
        } else {
          Alert.alert('Error', 'Product addition failed');
        }
        return;
      }

      Alert.alert('Success', 'Product added successfully!');
      nav.navigate('SellerDashboard'); // Navigate to Seller Dashboard after success
    } catch (error) {
      console.error('Product Addition Error:', error); 
      Alert.alert('Error', 'Something went wrong. Please try again later  .');
      // console.error('Product Addition Error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#abbaab']} // Gradient background for the entire screen
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          {/* Image at the top */}
          <Image
            source={require('../../../../assets/images/avatar.png')} // Replace with your image URL
            style={styles.image}
          />

          <Text style={styles.title}>Add Product</Text>

          {/* Product Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            placeholderTextColor="#777"
            value={form.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />

          {/* Product Price Input */}
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#777"
            value={form.price}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="numeric"
          />

          {/* Product Description Input */}
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#777"
            value={form.description}
            onChangeText={(text) => handleInputChange('description', text)}
            multiline
          />

          {/* Product Quantity Input */}
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#777"
            value={form.quantity}
            onChangeText={(text) => handleInputChange('quantity', text)}
            keyboardType="numeric"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white, // White background for the form
    borderRadius: 10,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50, // Circular image
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary, // Use your primary color for the title
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9', // Light background for input fields
  },
  addButton: {
    width: '100%',
    backgroundColor: Colors.primary, // Primary color for button
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProduct;
