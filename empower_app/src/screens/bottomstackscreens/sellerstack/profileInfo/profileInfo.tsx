import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { UserContext } from '../../../../context/userContext'; // Access user context
import { BASE_URL } from '../../../../utils/constants';

const ProfileInfo = () => {
  const { user } = useContext(UserContext); // Access current user (the seller)
  const [sellerDetails, setSellerDetails] = useState<any>(null); // State to store seller details
  const [loading, setLoading] = useState<boolean>(true); // Loading state for seller details

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const API_URL = `${BASE_URL}/api/seller/${user.info.USER_ID}`; // API URL to get seller details
        console.log('Fetching seller details from:', API_URL); // Log the API URL for debugging

        const response = await fetch(API_URL, {
          method: 'GET', // Use GET method to fetch seller details
          headers: {
            'Content-Type': 'application/json', // Indicate content type
            // Add any necessary authorization headers here (e.g., Authorization: `Bearer ${token}`),
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to load seller details: ${response.statusText}`);
        }

        const result = await response.json(); // Parse the JSON response
        console.log('API Response:', result); // Log the full response to understand its structure

        // Check if the response structure contains the seller object
        if (result && result.seller) {
          const { SELLER_ID, COMPANY_NAME, DESCRIPTION } = result.seller;
          setSellerDetails({
            SELLER_ID,
            COMPANY_NAME,
            DESCRIPTION,
          });
          console.log('Seller details set:', {
            SELLER_ID,
            COMPANY_NAME,
            DESCRIPTION,
          }); // Log the seller details that were set
        } else {
          console.error('No seller details found in response:', result); // Log the response if no seller details are found
          throw new Error('No seller details found in response');
        }
      } catch (error) {
        console.error('Error fetching seller details:', error); // Log any errors
        Alert.alert('Error', error.message || 'Failed to load seller details'); // Show error alert
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSellerDetails(); // Fetch seller details when the component is mounted
  }, [user.info.USER_ID]); // Re-run the effect if the user ID changes

  if (loading) {
    return <Text style={styles.loading}>Loading your details...</Text>; // Show loading message
  }

  if (!sellerDetails) {
    return <Text style={styles.error}>No seller details found</Text>; // Show error message if no details are found
  }

  return (
    <View style={styles.container}>
      {/* Profile box */}
      <View style={styles.profileBox}>
        {/* Seller profile picture */}
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        
        {/* Seller name */}
        <Text style={styles.sellerName}>{sellerDetails.COMPANY_NAME}</Text>

        {/* Seller bio */}
        <Text style={styles.sectionTitle}>Seller Bio</Text>
        <Text style={styles.sellerBio}>{sellerDetails.DESCRIPTION || 'No description available'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff', // White background for the profile box
    padding: 20,
    borderRadius: 15, // Rounded corners
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#ff9800', // Orange border around the profile image
    marginBottom: 20,
  },
  sellerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9800', // Orange color for section titles
    marginBottom: 8,
  },
  sellerBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
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

export default ProfileInfo;
