// // import React, {useContext} from 'react';
// // import {Text, Image, StyleSheet, ScrollView} from 'react-native';
// // import {Button} from 'react-native-paper';
// // import Colors from '../../../../utils/colors';
// // import {UserContext} from '../../../../context/userContext';
// // import {StackNavigationProp} from '@react-navigation/stack';
// // import {useNavigation} from '@react-navigation/native';
// // import {useTranslation} from 'react-i18next';

// // export type OrderStackParamList = {
// //   Send: {} | undefined;
// //   Verify: {} | undefined;
// // };

// // const Cart = () => {
// //   const {user} = useContext(UserContext);
// //   const {t} = useTranslation();
// //   const nav = useNavigation<StackNavigationProp<OrderStackParamList>>();
// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
      
// //       {/* Welcome Message */}
// //       <Text style={styles.welcome}>{t('welcome to order/cart ')}!</Text>

      
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   image: {
// //     width: '100%',
// //     height: '25%',
// //     resizeMode: 'center',
// //   },
// //   appName: {
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //     color: Colors.primary,
// //     textAlign: 'center',
// //     marginTop: 10,
// //   },
// //   welcome: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginTop: 20,
// //     textAlign: 'center',
// //     color: '#333',
// //   },
// //   description: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color: '#555',
// //     marginTop: 10,
// //     paddingHorizontal: 10,
// //     lineHeight: 22,
// //   },
// //   getStartedButton: {
// //     marginTop: 20,
// //     width: '80%',
// //     borderRadius: 8,
// //   },
// // });

// // export default Cart;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: 'Homemade Cake', price: 499, image: 'https://www.cakedelivery.com/images/homemade-cake.jpg', quantity: 1 },
//     { id: 2, name: 'Handmade Soap', price: 199, image: 'https://via.placeholder.com/100', quantity: 1 },
//   ]);

//   const increaseQuantity = (id) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ));
//   };

//   const decreaseQuantity = (id) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//     ));
//   };

//   const handleRemove = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//     Alert.alert('Removed', 'Item removed from cart');
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleCheckout = () => {
//     Alert.alert(
//       'Order Placed',
//       Your Order of ₹${getTotalPrice()} is Successfully Placed 🎉,
//       [{ text: 'OK', onPress: () => setCartItems([]) }]
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.cartItem}>
//       <Image source={{ uri: item.image }} style={styles.itemImage} />
//       <View style={styles.itemDetails}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemPrice}>₹{item.price}</Text>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
//             <Text style={styles.quantityText}>-</Text>
//           </TouchableOpacity>
//           <Text style={styles.quantityNumber}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
//             <Text style={styles.quantityText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
//         <Text style={styles.removeButtonText}>Remove</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Cart 🛒</Text>

//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyCart}>Your Cart is Empty 😢</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cartItems}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />

//           <View style={styles.footer}>
//             <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
//             <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
//               <Text style={styles.checkoutButtonText}>Place Order</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#000',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     padding: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     marginHorizontal: 10,
//     elevation: 4,
//   },
//   itemImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   itemDetails: {
//     flex: 1,
//     paddingLeft: 15,
//     justifyContent: 'space-between',
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#00C853',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   quantityButton: {
//     padding: 10,
//     backgroundColor: '#6200EE',
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   quantityText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   quantityNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   removeButton: {
//     backgroundColor: '#FF3D00',
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: 'center',
//   },
//   removeButtonText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   emptyCart: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 100,
//     color: '#999',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#FFFFFF',
//     elevation: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   checkoutButton: {
//     backgroundColor: '#6200EE',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   checkoutButtonText: {
//     fontSize: 16,
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
// });

// export default CartPage;