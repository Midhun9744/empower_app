import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../utils/colors';
import { BASE_URL } from '../../../../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Updated for React Native CLI

export type AccountStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  EditProfile: {} | undefined;
};

const EditProfile = () => {
  const { user, dispatchUserEvent } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<AccountStackParamList>>();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.info) {
      setForm({
        firstName: user.info.F_NAME || '',
        lastName: user.info.L_NAME || '',
        phone: user.info.PHONE || '',
      });
    }
  }, [user]);

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdateProfile = async () => {
    if (!form.firstName || !form.lastName || !form.phone) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        F_NAME: form.firstName,
        L_NAME: form.lastName,
        PHONE: form.phone,
      };

      const API_URL = `${BASE_URL}/api/user/update/${user.info.USER_ID}`;

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Profile update failed.');
      } else {
        Alert.alert('Success', 'Profile updated successfully!');
        dispatchUserEvent('UPDATE_PROFILE', { info: data.data, token: data.token });
        nav.navigate('EditProfile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Update Profile Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
        />
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={form.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Profile</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
