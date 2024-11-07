import React, { useEffect, useState } from 'react';
import { Image, Text, View, Dimensions, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const CartScreen = (props) => {
    // const dispatch = useDispatch();
    const { height, width } = Dimensions.get('screen');
    // const cartItems = useSelector((state) => state.cart.items);
    const [cart, setCart] = useState([]);
    const [total,setTotal] = useState(0)
 
    useEffect(() => {
        ListCartItems();
    },[]);

    // const handleQuantityChange = async (productId, quantityChange) => {
    //     console.log("Current cart items:", cartItems); // Log current cart items
    //     const item = cartItems.find(item => item.product.id === productId);

    //     if (item) {
    //         const newQuantity = item.quantity + quantityChange;

    //         if (newQuantity <= 0) {
    //             // Remove item if quantity becomes zero
    //             dispatch(addToCart({ product: item.product, quantity: -item.quantity }));
    //             await postCartItems(productId, -item.quantity); // Remove from cart
    //         } else {
    //             dispatch(addToCart({ product: { id: productId }, quantity: quantityChange }));
    //             await postCartItems(productId, quantityChange); // Update quantity
    //         }
    //     } else {
    //         console.error('Item not found in cart:', productId);
    //         Alert.alert('Error', `Item with ID ${productId} not found in cart.`);
    //     }
    // };
    async function handleDelete(id) {
        console.log("Deleting item with ID:", id);
        const formData = new FormData();
        formData.append('product_id', id);
    
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log("Access Token:", accessToken);
    
        try {
            const result = await axios.post(
                'http://staging.php-dev.in:8844/trainingapp/api/deleteCart',
                formData,
                {
                    headers: {
                        'Content-Type' : 'multipart/form-data',                
                                access_token: accessToken,
                    },
                }
            );
    
            console.log('Delete response:', result.data);
            Alert.alert('Success', 'Item removed from cart.');
    
        } catch (error) {
            console.log('Error deleting item:', error.response ? error.response.data : error.message);
            Alert.alert('Error', error.response ? error.response.data.user_msg || 'Failed to remove item from cart.' : 'An unexpected error occurred.');
        }
    }
    
    
    

    async function EditcartItems(id, quantity) {
        
        const formData = new FormData();
        formData.append('product_id', id);
        formData.append('quantity', quantity);
        console.log("formData",formData)
    
        try {
          const accessToken = await AsyncStorage.getItem('access_token');
    
          if (accessToken) {
            let result = await axios.post(
              `http://staging.php-dev.in:8844/trainingapp/api/editCart`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  access_token: accessToken,
                },
              },
            );
            console.log('The cart edited data', result?.data);
            // Alert.alert('Successfull');
            Alert.alert(result.data.user_msg)
            return result.data;
          } else {
            Alert.alert('Error');
          }
        } catch (error) {
          console.log("err>>",error.response ? error.response.data : error.message);
          Alert.alert(error.response.data.user_msg)
        }
      }
      

      function QuantityChange(id, quantity, perform) {
        let newQuantity = quantity;
    
        if (perform === 'increment') {
            if (newQuantity >= 8) {
                Alert.alert('Error', 'Quantity cannot exceed 8.');
                return; // Exit the function early, do not call the API
            }
            newQuantity += 1; // Increment if below the limit
        } else if (perform === 'decrement') {
            if (newQuantity > 0) {
                newQuantity -= 1;
            } else {
                console.log("Quantity cannot go below zero.");
                return; 
            }
        } else {
            console.log("Invalid operation. Use 'increment' or 'decrement'.");
            return; 
        }
    
       
    EditcartItems(id, newQuantity)
    .then(() => {
        // Update local state after successful edit
        setCart((prevCart) => 
            prevCart.map(item => 
                item.product.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    });
        console.log("newQuantity>>",newQuantity);
    }

    const ListCartItems = async () => {
        const accessToken = '6711fde53ce53';
        try {
            const response = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/cart', {
                headers: {
                    'access_token': accessToken,
                }
            });
            setCart(response.data.data);
            
            // console.log("try   ",response.data.total)
            // console.log("cart",cart)
            setTotal(response.data.total)
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}>
            <FlatList 
                data={cart}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', borderWidth: 1, margin: 10, padding: 10 }}>
                        <Image source={{ uri: item.product.product_images }} style={{ height: 90, width: 125 }} />
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Text>{item.product.name}</Text>
                            <Text style={{ marginTop: 15 }}>₹{item.product.cost}</Text>
                            
                            {console.log(item)}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => QuantityChange(item.product.id , item.quantity , 'decrement')}>
                                        <MaterialCommunityIcons name='minus-circle' size={30} color='blue' style={{ marginRight: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ width: '30%', borderWidth: 0.5, textAlign: 'center', backgroundColor: 'lightgrey', padding: 2 }}>
                                        {item.quantity}
                                    </Text>
                                    <TouchableOpacity onPress={() => QuantityChange(item.product.id , item?.quantity, 'increment')}>
                                        <MaterialCommunityIcons name='plus-circle' size={30} color='blue' style={{ marginLeft: 10 }} />
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            </View>
                            <Text>sub_total:  {item.product.sub_total}</Text>
                        </View>
                        <TouchableOpacity onPress={()=> handleDelete(item.product.id)}>
                        <Text> Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={{
                padding: 10,
                backgroundColor: '#ddd',
                borderTopWidth: 1,
                width: width,
                paddingVertical: 10,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
            }}>

                <Text style={{ fontSize: 18, textAlign: 'center' }}>
                    Total: ₹{total}
                </Text>
                <TouchableOpacity onPress={()=> props.navigation.navigate('Address')}
                    style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 }}

                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CartScreen;
