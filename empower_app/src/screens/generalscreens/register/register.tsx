import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Menu, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserContext} from '../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../utils/colors';

export type AuthStackParamList = {
  Login: {} | undefined;
};

const RegisterComponent = () => {
  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  //   const {dispatchUserEvent} = useContext(UserContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: new Date(),
    gender: 'Select Gender',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value});
    setMenuVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Image Section */}
      {/* <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
      /> */}

      {/* Registration Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="First Name"
            placeholderTextColor="#777"
            value={form.firstName}
            onChangeText={text => handleInputChange('firstName', text)}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Last Name"
            placeholderTextColor="#777"
            value={form.lastName}
            onChangeText={text => handleInputChange('lastName', text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={form.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#777"
          value={form.phone}
          onChangeText={text => handleInputChange('phone', text)}
          keyboardType="phone-pad"
        />

        {/* Date of Birth Picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={{color: form.dateOfBirth ? '#000' : '#777'}}>
            {form.dateOfBirth.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={form.dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Gender Dropdown Menu */}
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                {form.gender}
              </Button>
            }>
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Male')}
              title="Male"
            />
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Female')}
              title="Female"
            />
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Other')}
              title="Other"
            />
          </Menu>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor="#777"
          value={form.address1}
          onChangeText={text => handleInputChange('address1', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address Line 2"
          placeholderTextColor="#777"
          value={form.address2}
          onChangeText={text => handleInputChange('address2', text)}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="City"
            placeholderTextColor="#777"
            value={form.city}
            onChangeText={text => handleInputChange('city', text)}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="State"
            placeholderTextColor="#777"
            value={form.state}
            onChangeText={text => handleInputChange('state', text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#777"
          value={form.country}
          onChangeText={text => handleInputChange('country', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="#777"
          value={form.pincode}
          onChangeText={text => handleInputChange('pincode', text)}
          keyboardType="number-pad"
        />

        {/* Password Fields */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={form.password}
          onChangeText={text => handleInputChange('password', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => nav.navigate('Login', {})}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => nav.navigate('Login', {})}>
          <Text style={styles.backToLogin}>Back to Login</Text>
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
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'center',
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
  menuContainer: {
    width: '100%',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidth: {
    width: '48%',
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
  backToLogin: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default RegisterComponent;
