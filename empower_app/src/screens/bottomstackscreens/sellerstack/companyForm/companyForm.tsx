import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext'; // Import UserContext
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../../../utils/constants';

export type SellerStackParamList = {
  SellerDashboard: {} | undefined;
};

const CompanyForm = () => {
  const { user } = useContext(UserContext); // Access user from context
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>();
  
  const [form, setForm] = useState({
    companyName: '',
    description: '',
  });

  const handleSubmit = async () => {
    if (!form.companyName || !form.description) {
      Alert.alert('Error', 'Company name and description are required');
      return;
    }

    // if (!user || !user.id) {
    //   Alert.alert('Error', 'User not authenticated');
    //   return;
    // }

    try {
      const requestBody = {
        COMPANY_NAME: form.companyName,
        DESCRIPTION: form.description,
        USER_ID: user.info.USER_ID, // Get user ID from context
      };

      const API_URL = BASE_URL + '/api/seller/add'; // Adjust your API URL

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          Alert.alert('Validation Error', errorMessages);
        } else if (data.error) {
          Alert.alert('Validation Error', data.error);
        } else if (data.message) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', 'Registration failed');
        }
        return;
      }

      Alert.alert('Success', 'Company registered successfully!');
      nav.navigate('SellerDashboard');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Company Registration Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register Your Company</Text>

        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#777"
          value={form.companyName}
          onChangeText={text => setForm({ ...form, companyName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#777"
          value={form.description}
          onChangeText={text => setForm({ ...form, description: text })}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmit}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    justifyContent: 'center',
  },
  registerButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CompanyForm;
