import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';

const BuyNowPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const product = {
    id: 101,
    name: 'Homemade Cake 🎂',
    price: 499,
    image: 'https://www.cakedelivery.com/images/homemade-cake.jpg',
    description: 'Delicious homemade cake made with love.',
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Order Confirmation ✅',
      Your order of ${product.name} worth ₹${product.price} is successfully placed! 🎉,
      [
        { text: 'OK', onPress: () => setShowPaymentModal(true) }
      ]
    );
  };

  const handlePayment = (paymentMode) => {
    Alert.alert(
      'Payment Success 🎯',
      Your Payment via ${paymentMode} is Successful! Thank You ❤
    );
    setShowPaymentModal(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>₹{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buyNowButtonText}>Buy Now</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal transparent={true} visible={showPaymentModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Payment Option</Text>

            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('Cash on Delivery')}>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('Credit Card')}>
              <Text style={styles.paymentText}>Credit Card / Debit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('UPI')}>
              <Text style={styles.paymentText}>UPI Payments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('Net Banking')}>
              <Text style={styles.paymentText}>Net Banking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  productImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C853',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  buyNowButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
  },
  buyNowButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBox: {
    backgroundColor: '#FFF',
    margin: 40,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  paymentOption: {
    backgroundColor: '#6200EE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BuyNowPage;