
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View,Image } from 'react-native'
import { patchWebProps } from 'react-native-elements/dist/helpers'

const OrderDetails = (props) => {
   const OrderIds = props?.route?.params
   const [cart , setCart ] = useState([])


   useEffect(()=>{
    OrderList();
   },[])

    async function OrderList() {
        const formData = new FormData()
        formData.append('order_id', OrderIds)
        try{
        const accessToken = await AsyncStorage.getItem('access_token')
        const result = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/orderDetail' , {
            headers: {
                'access_token': accessToken,
                'Content-Type' : 'multipart/formData'
            }, 
            params : {
                order_id: OrderIds
            }

        })
        console.log("result.data",result.data.data)
        if (result.data.data && result.data.data.order_details) {
            setCart(result.data.data.order_details);
          } else {
            console.log('No data found in the response');
          }

    } catch (error){
        console.log(error)
    }
    }

    console.log(">>>",cart.address);

    // const renderItem = ({}) => {
    //     return (
    //         <Text style={{color:'red'}}>{cart.address}</Text>
    //     )
    // }

    const renderItem = ({ item }) => {
        return (
            <View style={{  backgroundColor: '#fff' , flexDirection:'row' , backgroundColor:'white', marginHorizontal:10, marginVertical:10, borderRadius:10}}>
                 <Image source={{ uri: item.prod_image }} style={{ width: 143, height: 100,marginTop:20, marginLeft:10, marginRight:5 }} />
                 <View style = {{}}>
                <Text style={{ fontSize: 18, marginVertical:10, marginHorizontal:10, color:'black' , fontFamily:'Laila-SemiBold', width:'80%'}}>{item.prod_name}</Text>
                <Text style = {{ marginHorizontal:10 , fontFamily:'Laila-Regular'}}>Category: {item.prod_cat_name}</Text>
                <Text style = {{ marginHorizontal:10,  fontFamily:'Laila-Regular'}}>Quantity: {item.quantity}</Text>
                <Text style = {{ marginHorizontal:10,  fontFamily:'Laila-Regular', marginBottom:20}}>Total: ₹{item.total}</Text>

                
                </View>

            </View>
        )
    }
  

    return (
        <View style={{flex:1}}>

           <Text style = {{textAlign:'center', marginVertical:10, backgroundColor: 'lightgray', fontSize: 18, marginHorizontal:10, borderRadius:10, padding:5, fontFamily: 'Laila-Regular', color: 'black'}}>Order List of OrderID : {OrderIds}</Text>
            <FlatList
               data={cart}
               renderItem={renderItem}
               keyExtractor={item => item.id.toString()}
           />

        </View>
    )
}

export default OrderDetails