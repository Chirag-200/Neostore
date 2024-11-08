
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

const OrderList = (props) => {
    const [cart,setCart] = useState()

    async function Data() {
            const accessToken = await AsyncStorage.getItem('access_token');
            // console.log("Access Token:", accessToken); 
    }
    async function OrderList() {
        const accessToken = await AsyncStorage.getItem('access_token');
        try {
        const result = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/orderList',{
            headers: {
                'access_token': accessToken,
                'Content-Type' : 'multipart/formData'
            }
            
        })
        console.log(result.data.data[0].id)
        setCart(result?.data?.data)
    }
    catch(error) {
        console.log(error)
    }
}
    useEffect (()=> { Data()
        OrderList() },[])

        const renderItem =({item}) => (
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', item.id )}>
                <View style = {{borderWidth:1, marginHorizontal:40, marginVertical:6, padding:5,top:50,borderRadius: 10}}>
                <Text style = {{fontFamily:'Laila-Bold', color: 'black', textAlign:'center',}}> Order Id: {item.id}</Text>
                <Text style ={{fontFamily:'Laila-SemiBold', color: 'black', textAlign:'center'}}>Order Date: {item.created}</Text>
                <Text style = {{fontFamily:'Laila-Medium', color: 'black', textAlign:'center'}}>Order Ammount ₹ {item.cost}</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    return (
        <View style = {{flex:1 , backgroundColor: 'white'}}>
            <Text style = {{textAlign: 'center', top: 20, fontSize: 18, color: 'black', fontFamily: 'Laila-Medium'}}>ALL ORDERS </Text>

            <FlatList
                data = {cart}
                renderItem={renderItem}
                keyExtractor={ item => item.id}
                
            
            />
        </View>
    )
}

export default OrderList