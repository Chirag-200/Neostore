
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FlatList, Text, TouchableOpacity, View , Image, Alert} from 'react-native';



const CheckOut = (props) => {
   const User =  props?.route?.params
//    console.log(User)
   const [cart,setCart] = useState()
   const [count,setCount] = useState()
   const [cost,setCost] = useState(0)

   async function Data() {
   const accessToken =  await AsyncStorage.getItem('access_token');
        console.log("Access Token:", accessToken);
   }

   async function ListItems ()  {
    const accessToken =  await AsyncStorage.getItem('access_token');
    console.log("Access Token:", accessToken);
    try {
        const response = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/cart', {
            headers: {
                'access_token': accessToken,
            }
        });
        setCart(response.data.data);
        
        console.log("try   ",response.data.total)
        setCount(response.data.count)
        setCost(response.data.total)
        // console.log("cart",cart)
        // setTotal(response.data.total)
    } catch (error) {
        console.error('Error fetching data:', error);
    }

   }

   useEffect(()=>{
    Data()
    ListItems()
   },[])

   async function handlePlace() {
    const accessToken =  await AsyncStorage.getItem('access_token');
    const formData = new FormData()
    formData.append('address', `${User.selectedButton.toUpperCase()},
    ${User.street}, ${User.city}, ${User.LandMark}, ${User.district}, ${User.state}, ${User.pincode}`)
    console.log(formData)
    try {
        const result = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/order', formData , {
            headers: {
                'access_token': accessToken,
                'Content-Type': 'multipart/form-data'

            }
        })
        console.log('res ', result.data)
        Alert.alert(result.data.user_msg)
        props.navigation.navigate('Home')

    } catch(error) {
        console.log('error', error)
    }
   }

//    console.log("cart",cart);
    return (
        <View style = {{backgroundColor:'white',flex:1 }}>
            <Text style = {{textAlign:'center', fontFamily:'Laila-Medium', backgroundColor:'lightgray', fontWeight:'black', color:'black', marginHorizontal:10, marginTop:10, fontSize:16, borderRadius:10, padding:5}}>DELIVERY DETAILS</Text>
            <Text style = {{textAlign:'left', fontFamily:'Laila-Medium',  color:'black', marginHorizontal:10, marginTop:5, fontSize:16,}}>Selected Address</Text>
            <View style = {{marginHorizontal:10, marginTop: 10, borderWidth:1, padding:10, borderRadius:10}}>
            <Text style = {{fontFamily:'Laila-SemiBold', color:'black'}}>{User.selectedButton.toUpperCase()}</Text>
            <Text style = {{fontFamily:'Laila-Regular', color:'black'}}>{User.street}, {User.city}, {User.LandMark}, {User.district}, {User.state}, {User.pincode}</Text>
            </View>

            <View>
                <Text style = {{textAlign:'center', fontFamily:'Laila-Medium', backgroundColor:'lightgray', fontWeight:'black', color:'black', marginHorizontal:10, marginTop:20, fontSize:16, borderRadius:10, padding:5}}>CART SUMMARY</Text>
            </View>
            <Text style = {{textAlign:'right', marginRight:10, paddingTop:5, fontSize:14, color:'black', fontFamily:'Laila-Light'}}>Total Items : {count} </Text>


            <FlatList
             style={{flex:1}}
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flex:1,flexDirection: 'row', borderWidth: 1, margin: 10, padding: 10, borderRadius:10 }}>
                        <Image source={{ uri: item.product.product_images }} style={{ height: 90, width: 125 }} />
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Text style = {{fontFamily:'Laila-SemiBold'}}>{item.product.name}</Text>
                            <Text style={{ marginTop: 15, fontFamily:'Laila-Regular' }}>₹{item.product.cost}</Text>

                            <Text style = {{marginTop:8, fontFamily:'Laila-Regular'}}>sub_total:  {item.product.sub_total}</Text>
                        </View>
                       
                    </View>
                )}
            />
                <Text style = {{textAlign:'center' , fontSize: 14, backgroundColor:'lightgray', padding: 5, marginHorizontal:10, borderRadius: 10, fontFamily:'Laila-SemiBold', color:'black'}}>Total Cost : ₹{cost}</Text>
                <TouchableOpacity onPress={()=> handlePlace()}>
               <Text style = {{marginVertical:7, textAlign:'center', fontSize:16, backgroundColor:'rgb(15,84,251)', padding:5, color:'white', marginHorizontal:10, borderRadius:10,fontFamily:'Laila-SemiBold'}}>Place Order</Text>
               </TouchableOpacity>

        </View>
    )
}

export default CheckOut