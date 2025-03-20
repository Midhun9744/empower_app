import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

// Simulating an API request to check if the user is a seller
const checkIfUserIsSeller = async (USER_ID) => {
  // Replace with your actual API request logic
  const sellerData = [
    { userId: 1 }, // Example seller record
    // { userId: 2 }, // Example seller record
  ];

  // Check if the userId exists in the seller data
  return sellerData.some((seller) => seller.USER_ID === USER_ID);
};

// Defining navigation params type for navigation
export type SellerStackParamList = {
  CompanyForm: {} | undefined;
  SellerDashboard: {} | undefined;
};

const SellerRegister = () => {
  const { user } = useContext(UserContext); // Access user context to get the current user
  const [isSeller, setIsSeller] = useState<boolean | null>(null); // Local state to store if the user is a seller
  const { t } = useTranslation(); // Translation hook for multi-language support
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>(); // Navigation hook

  // Check if the user is a seller when the component mounts
  useEffect(() => {
    const fetchSellerStatus = async () => {
      if (user && user.info.USER_ID) {
        const sellerStatus = await checkIfUserIsSeller(user.USER_ID); // Query the Seller table (via API)
        setIsSeller(sellerStatus); // Update state based on result
      }
    };

    fetchSellerStatus(); // Call function to check seller status
  }, [user]);

  // Navigate based on user seller status
  const navigateToNextScreen = () => {
    if (isSeller === null) {
      return; // If still loading seller status, don't navigate yet
    }

    if (isSeller) {
      nav.navigate('SellerDashboard'); // Navigate to seller dashboard if user is a seller
    } else {
      nav.navigate('CompanyForm'); // Navigate to company form if user is not a seller
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#abbaab']} // Gradient background
      style={styles.container}
      start={{ x: 0, y: 0 }}  // Start of the gradient
      end={{ x: 1, y: 1 }}    // End of the gradient
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Apply LinearGradient inside form box */}
        <LinearGradient
          colors={['#ffffff', '#abbaab']} // Same gradient as outside
          style={styles.formBox}
          start={{ x: 0, y: 0 }}  // Start of the gradient
          end={{ x: 1, y: 1 }}    // End of the gradient
        >
          <Text style={styles.title}>{t('join_marketplace')}</Text>
          <Text style={styles.description}>{t('start_selling_today')}</Text>

          {/* Button that triggers navigation */}
          <Button
            mode="contained"
            style={styles.getStartedButton}
            onPress={navigateToNextScreen}
            disabled={isSeller === null} // Disable the button while checking
          >
            {t('start')}
          </Button>

        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  formBox: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#00000',
    marginBottom: 20,
    lineHeight: 22,
  },
  getStartedButton: {
    marginTop: 20,
    width: '80%',
    paddingVertical: 12,
    color: '#000000',
    backgroundColor: '#000000',
    borderRadius: 8,
    elevation: 3,
  },
});

export default SellerRegister;
