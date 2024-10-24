import React from 'react';
import { Image, Text, View, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCart } from '../redux/reducer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route }) => {
    const dispatch = useDispatch();
    const { height, width } = Dimensions.get('screen');
    const cartItems = useSelector((state) => state.cart.items);

    const handleAdd = (item) => {
        console.log("Adding item:", item);
        dispatch(addToCart({ product: item.product, quantity: 1 }));
        postCartItems(item.product.id, 1); 
    };

    const handleSubtract = (item) => {
        console.log("Subtracting item:", item);
        if (item.quantity > 1) {
            dispatch(addToCart({ product: item.product, quantity: -1 }));
            postCartItems(item.product.id, -1); 
        } else {
            // Optionally handle removal from cart if quantity is 1
            dispatch(addToCart({ product: item.product, quantity: -item.quantity }));
            postCartItems(item.product.id, -item.quantity); // Remove from cart
        }
    };

    
    const handleQuantityChange = (productId, quantityChange) => {
        console.log("Updating item:", productId, "Change:", quantityChange);
        
        if (quantityChange < 0) {
            const item = cartItems.find(item => item.product.id === productId);
            if (item.quantity + quantityChange <= 0) {
                // Optionally remove the item if quantity becomes zero
                dispatch(addToCart({ product: item.product, quantity: -item.quantity }));
                postCartItems(productId, -item.quantity); // Remove from cart
                return;
            }
        }
    
        dispatch(addToCart({ product: { id: productId }, quantity: quantityChange }));
        postCartItems(productId, quantityChange);
    };
    

    // const postCartItems = async (productId, quantity) => {
    //     const data = new FormData();
    //     data.append('product_id', productId);
    //     data.append('quantity', quantity);

    //     try {
    //         const token = await AsyncStorage.getItem("access_token");
    //         console.log("Token:", token);

    //         const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/addToCart', data, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${token}`, 
    //             },
    //         });

    //         console.log('Response:', response.data);
    //         Alert.alert('Success', 'Cart updated successfully!');
    //     } catch (error) {
    //         console.error('Error posting cart items:', error);
    //         Alert.alert('Error', 'Failed to update cart item.');
    //     }
    // };
    const postCartItems = async (productId, quantity) => {
        const data = new FormData();
        data.append('product_id', productId.toString()); // Convert to string
        data.append('quantity', quantity.toString()); // Convert to string
    
        try {
            const token = await AsyncStorage.getItem("access_token");
            console.log("Token:", token);
    
            const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/addToCart', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'access_token': token, // Use the access_token as a header
                },
            });
    
            console.log('Response:', response.data);
            Alert.alert('Success', 'Cart updated successfully!');
        } catch (error) {
            console.error('Error posting cart items:', error.response ? error.response.data : error);
            Alert.alert('Error', 'Failed to update cart item.');
        }
    };
    const handleCheckout = async () => {

        for (const item of cartItems) {
            await postCartItems(item.product.id, item.quantity); 
        }
        Alert.alert('Checkout', 'All items have been sent to the API.');
    };

    return (
        <ScrollView contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}>
            <View style={{ padding: 10 }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', borderWidth: 0.5, padding: 5, backgroundColor: 'white', marginBottom: 10, borderRadius: 15 }}>
                            <Image source={{ uri: item.product.product_images[0]?.image }} style={{ height: height * 0.1, width: width * 0.3, marginLeft: 5 }} />
                            <View style={{ flexDirection: 'column', paddingLeft: 20, flex: 1 }}>
                                <Text style={{ fontFamily: 'Laila-Medium' }}>{item.product.name}</Text>
                                <Text style={{ fontFamily: 'Laila-Regular', fontSize: 16 }}>₹{item.product.cost}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => handleQuantityChange(item.product.id, -1)}>
                                    <MaterialCommunityIcons name='minus-circle' size={30} color='blue' />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 17, marginHorizontal: 10, width: width * 0.06, textAlign: 'center', justifyContent: 'center', height: height * 0.04, lineHeight: height * 0.04, fontFamily: 'Laila-Bold' }}>
                                    {item.quantity}
                                </Text>
                                <TouchableOpacity  onPress={() => handleQuantityChange(item.product.id, -1)}>
                                    <MaterialCommunityIcons name='plus-circle' size={30} color='blue' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No items in cart.</Text>
                )}
            </View>

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
                    Total: ₹{cartItems.reduce((total, item) => total + item.product.cost * item.quantity, 0)}
                </Text>
                <TouchableOpacity
                    style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 }}
                    onPress={handleCheckout} // Call the API for checkout
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, borderRadius: 10, fontFamily: 'Laila-SemiBold' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CartScreen;
