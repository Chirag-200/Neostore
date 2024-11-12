import React, { useEffect, useState } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = (props) => {
    const productId = props?.route?.params?.productId;
    const [productInfo, setProductInfo] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const { height, width } = Dimensions.get('screen');
    const [count, setCount] = useState(0);

    // Function to fetch product details and all products
    async function fetchProductInfo() {
        try {
            // Fetch the product details based on the productId
            const response = await fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${productId}`);
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            const data = await response.json();
            setProductInfo(data?.data);  // Set the product details

            // Fetch all products from the API
            const allProductsResponse = await fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1`);
            if (!allProductsResponse.ok) {
                throw new Error(`status: ${allProductsResponse.status}`);
            }
            const allProductsData = await allProductsResponse.json();

            // Filter out the current product from the list of all products
            const filteredProducts = allProductsData?.data?.filter(item => item.id !== productId);
            setAllProducts(filteredProducts);  // Set the filtered products
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProductInfo();
    }, []);

    // Quantity handling functions
    const handleMinus = () => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handlePlus = () => {
        setCount(prevCount => prevCount + 1);
    };

    const addQuantity = async () => {
        if (count <= 0) {
            Alert.alert('Invalid Quantity', 'Please add at least one item.');
            return;
        }

        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
            Alert.alert('Error', 'No access token found.');
            return;
        }

        const data = new FormData();
        data.append('product_id', productInfo.id);
        data.append('quantity', count);

        try {
            const result = await axios.post(
                'http://staging.php-dev.in:8844/trainingapp/api/addToCart',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access_token: token
                    }
                }
            );
            Alert.alert('Success', 'Item added to cart!');
        } catch (error) {
            console.error("Error occurred:", error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'An unknown error occurred.');
        }
    };

    // Render similar products
    const renderSimilarProduct = ({ item }) => (
        <TouchableOpacity 
            onPress={() => props.navigation.navigate('ProductInfo', { productId: item.id })}
            style={{
                margin: 10, 
                borderWidth: 0.5, 
                borderRadius: 10, 
                padding: 10, 
                backgroundColor: 'white', 
                alignItems: 'center'
            }}
        >
            <Image
                source={{ uri: item.product_images?.image }} // Display first image
                style={{ height: 80, width: 80, marginRight: 10 }}
                resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Laila-SemiBold' }}>{item.name}</Text>
                <AirbnbRating
                    count={5}
                    defaultRating={item.rating}
                    size={12}
                    showRating={false}
                    isDisabled={true}
                />
                <Text style={{ color: 'blue' }}>₹{item.cost}</Text>
            </View>
        </TouchableOpacity>
    );

    // Render Product Images using FlatList
    const renderProductImage = ({ item }) => (
        <View style={{ height: height * 0.3, width: width, alignItems: "center", justifyContent: "center" }}>
            <Image
                source={{ uri: item.image }}
                style={{ height: 200, width: 300 }}
                resizeMode='contain'
            />
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white', padding: 10, flex: 1 }}>
            <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{ marginTop: height * 0.015, alignItems: 'center', borderWidth: 1, borderRadius: 18, width: width * 0.07 }}
            >
                <EyeIcon name='arrow-back' size={20} color='black' />
            </TouchableOpacity>

            {productInfo.product_images?.length > 0 ? (
                <View>
                    <View style={{ alignItems: "center" }}>
                        <FlatList
                            data={productInfo.product_images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderProductImage}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <Text style={{ textAlign: 'center', fontFamily: 'Laila-Medium' }}>{productInfo.producer}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <AirbnbRating
                            count={5}
                            defaultRating={productInfo.rating}
                            size={15}
                            showRating={false}
                            isDisabled={true}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <EyeIcon name='eye' size={20} color='black' />
                            <Text style={{ paddingLeft: 8 }}>{productInfo.view_count}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Laila-Bold' }}>{productInfo.name}</Text>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: 'blue', fontSize: 18 }}>₹{productInfo.cost}</Text>
                        <Text style={{ color: 'green' }}> 0% OFF</Text>
                        <Text style={{ textDecorationLine: 'line-through', fontSize: 13 }}> ₹{productInfo.cost}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Laila-Regular' }}>{productInfo?.description}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Laila-Bold', fontSize: 20, color: 'black' }}>Quantity</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={handleMinus}>
                                <MaterialCommunityIcons name='minus-circle' size={30} color='blue' style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <Text style={{ width: '25%', borderWidth: 0.5, textAlign: 'center', backgroundColor: 'lightgrey', paddingTop: 5 }}>{count}</Text>
                            <TouchableOpacity onPress={handlePlus}>
                                <MaterialCommunityIcons name='plus-circle' size={30} color='blue' style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{ marginTop: height * 0.03, borderWidth: 0.5, margin: width * 0.1, padding: 5, borderRadius: 10, backgroundColor: 'rgb(15,84,251)' }}
                        onPress={addQuantity}
                    >
                        <Text style={{ fontFamily: 'Laila-SemiBold', textAlign: 'center', color: 'white' }}> Add to Cart </Text>
                    </TouchableOpacity>

                    {/* All Products Section */}
                    {allProducts.length > 0 && (
                        <View>
                            <Text style={{ fontFamily: 'Laila-SemiBold', color: 'black', fontSize: 20, marginTop: 20 }}>
                                Other Products
                            </Text>
                            <FlatList
                                data={allProducts}
                                keyExtractor={item => item.id.toString()}
                                renderItem={renderSimilarProduct}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    )}
                </View>
            ) : (
                <Text>No images available</Text>
            )}
        </View>
    );
};

export default ProductInfo;
