
import React, { useEffect, useState } from 'react'
import { Image, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import { AirbnbRating } from 'react-native-ratings'
import Swiper from 'react-native-swiper'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { colors } from 'react-native-swiper-flatlist/src/themes'
import EyeIcon from 'react-native-vector-icons/Ionicons'
import Minus from 'react-native-vector-icons/EvilIcons'
import Plus from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProductInfo = (props) => {
    const productId = props?.route?.params?.productId
    const [productInfo, setProductInfo] = useState([])
    const { height, width } = Dimensions.get('screen')
    const [count , setCount] = useState(0)



    // const [ currentIndex , setCurrentIndex] = useState(0)
    // const uri1 = productInfo?.data.product_images[0].image
    // const uri2 = productInfo?.data.product_images[1].image
    // console.log("uri",uri1)
    // console.log("urii", uri2)
    // const fetchedImages = [uri1,uri2]
    // images.push(uri1)




    async function fetchProductInfo() {
        try {
            const response = await fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${productId}`)
            if (!response.ok) {
                throw new Error(`status : ${response.status}`)
            }
            const data = await response.json()
            console.log("--->", data)
            setProductInfo([data?.data])
            // console.log(data)
            console.log("productINFO", productInfo.data.product_images[0].image)
            // fetchedImages.push(productInfo.data.product_images[0].image)
            // fetchedImages.push(productInfo.data.product_images[1].image)
            console.log(" frttch ", fetchedImages)
            // console.log(uri1)
            // console.log(uri2)

            return fetchedImages
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        fetchProductInfo()
    }, [])

    // const images = productInfo?.data?.product_images[0].image || []
    // images.append(images)
    // console.log("Images",images)
    console.log("---***--->", productInfo[0]?.product_images)
    return (
        <View >
            <View>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ margin: 10, alignItems: 'center', borderWidth: 1, borderRadius: 18, width: '7%', height: '5%' }}
                >
                    <EyeIcon name='arrow-back' size={20} color='black' />

                </TouchableOpacity>




                {productInfo[0]?.product_images.length > 0 ? (
                    <View >


                            


                        <View>
                        <View style={{ position: 'relative', marginTop: 20 }}>

<SwiperFlatList
    data={productInfo[0]?.product_images}
    keyExtractor={(item, index) => index.toString()}
    showPagination
    paginationStyle={{ justifyContent: 'center', alignItems: 'center' }}
    paginationActiveColor="blue"
    paginationDefaultColor="grey"
    paginationStyleItem={{

        height: 10,
        width: 10,
        padding: 5,
        marginTop: 3,
    }}

    renderItem={({ item }) => (
        <View style={{ height: height * 0.3, width, alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ height: 200, width: 280, alignItems: 'center' }} resizeMode='contain' />

        </View>
    )}

/>

</View>
<View style={{ marginLeft: 10, marginRight: 10 }}>
<Text style={{ textAlign: 'center', fontFamily: 'Laila-Medium' }}> {productInfo[0].producer} </Text>


<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ alignItems: 'flex-start' }}>
        <AirbnbRating
            count={5}
            defaultRating={productInfo[0].rating}
            size={15}
            showRating={false}
            isDisabled={true}

        />
    </View>
    <View style={{ flexDirection: 'row', }}>
        <EyeIcon name='eye' size={20} color='black' />
        <Text> {productInfo[0].view_count}</Text>
    </View>
</View>

<Text style={{ fontSize: 18, fontFamily: 'Laila-Bold' }}> {productInfo[0].name} </Text>

<View style={{ flexDirection: 'row', alignContent: 'center' }}>
    <Text style={{ color: 'blue', fontSize: 18 }}> ₹{productInfo[0].cost} </Text>
    <Text style={{ color: 'green' }}> 0% OFF </Text>
    <Text style={{ textDecorationLine: 'line-through', fontSize: 13 }}> ₹{productInfo[0].cost} </Text>

    <Text> </Text>
</View>

<Text style={{ fontFamily: 'Laila-Regular' }} > {productInfo[0].description} </Text>
<Text>    </Text>
</View>
                           



    <View style = {{flexDirection: 'row'}}> 
     <Text style = {{fontFamily: 'Laila-Bold', fontSize: 18}}> Quantity</Text>
     <View style = {{flexDirection: 'row' , justifyContent: 'center'}}>
     <TouchableOpacity >
                    <MaterialCommunityIcons name='minus-circle' size={30} color='blue' />
                </TouchableOpacity>
                <Text style = {{width: 10, borderWidth:1,marginLeft: 10}}>
                    {count}
                </Text>
     <TouchableOpacity >
                    <MaterialCommunityIcons name='plus-circle' size={30} color='blue' />
                </TouchableOpacity>
       
        </View>
     </View>
    </View>
                    </View>
                    
                ) : (
                    <Text>No images available</Text>
                )}






            </View>


        </View>


    )
}

export default ProductInfo 