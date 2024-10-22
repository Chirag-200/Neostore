
import React, { useEffect, useState } from 'react' 
import {Image, Text , View } from 'react-native'
import Swiper from 'react-native-swiper'

const ProductInfo = (props) => {
    const productId = props?.route?.params?.productId
    const [productInfo,setProductInfo] = useState({})

    const [ currentIndex , setCurrentIndex] = useState(0)
    // const uri1 = productInfo.data.product_images[0].image
    // const uri2 = productInfo.data.product_images[1].image
    // console.log("uri",uri1)
    // console.log("urii", uri2)
    // const images = []
    // images.push(uri1)
    // images.push(uri2)


    async function fetchProductInfo () {
        try {
            const response = await fetch (`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${productId}`)
            if(!response.ok){
                throw new Error (  `status : ${response.status}`)
            }
            const data = await response.json()
            // console.log(data)
            // setProductInfo(data)
            // console.log(data)
            // console.log(productInfo)
            // console.log(uri1)
            // console.log(uri2)

            // return data
        } catch (error) {
            console.log(error)

        } 
    }

    useEffect(()=>{
        fetchProductInfo()
    },[])

    const images = productInfo.data?.product_images || []
    return (
        <View style = {{flex:1}}>


        {/* <Image  source={{uri: uri1}} style = {{height: 100, width: 100}}/>
        <Image  source={{uri: uri2}} style = {{height: 100, width: 100}}/> */}
        {
            images.length > 0 && (
                <Swiper
                style= {{width: "100%", height: '100%'}}
                showsButtons= {true}
                autoplay = {true}
                
                > 
                {
                    images.map((img,index) => (
                        <View key = {index} >
                            <Image 
                            source = {{ uri : img.images}}
                            style = {{ height: 100 , width: 100}}
                            />

                        </View>
                    ))
                }
                    
                </Swiper>

            )
        }
       
        </View>


    )
}

export default ProductInfo 