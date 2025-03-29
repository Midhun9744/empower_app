import React, { useContext, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

// Defining navigation params type for navigation
export type SellerStackParamList = {
  CompanyForm: {} | undefined;
  SellerDashboard: {} | undefined;
};

const SellerRegister = () => {
  const { user } = useContext(UserContext); // Access user context to get the current user
  const { t } = useTranslation(); // Translation hook for multi-language support
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>(); // Navigation hook

  // Check the user info on component mount and navigate accordingly
  useEffect(() => {
    const sellerId = user.info.seller_id;

    if (sellerId === null || sellerId === undefined) {
      // If sellerId doesn't exist, navigate to the CompanyForm
      nav.navigate('CompanyForm');
    } else {
      // If sellerId exists, navigate to the SellerDashboard and replace current screen
      nav.replace('SellerDashboard');
    }
  }, [user, nav]); // Dependency on user to re-run the effect when user info changes

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
    color: '#000000',
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default SellerRegister;
