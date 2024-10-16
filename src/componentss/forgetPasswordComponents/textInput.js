
import React, { useState } from 'react'
import { Image, Text, View, Dimensions } from 'react-native'
import NeoStoreLogo from '../../assets/logo/logo'
import GroupImages from '../../images/GroupImages'

const TextInputComponent = () => {
    const imageLoc = require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/bubble01.png')

    // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // const handleImageLoad = (event) => {
    //   const { width, height } = event.nativeEvent.source;
    //   setDimensions({ width, height });
    //   console.log('Width:', width);
    //   console.log('Height:', height);
    // };
    const { width, height } = Dimensions.get('window')
    // console.log("width===>", width)
    // console.log('height==>', height)
    return (
       <>
        <View>
            {/* <View style={{ }}>
                <Image source={GroupImages.Bubble2} style={{position: "absolute",  height:'100%',width:'81.5%'}}  />
                <Image source={GroupImages.Bubble1} style = {{height:'79.5%',width:'65%'}}  />
            </View> */}

<View style={{ flex: 1 }}>
            <Image 
                source={GroupImages.Bubble2} 
                style={{ 
                    position: 'absolute', 
                    // height: height * 0.48, // 90% of the screen height
                    // width: width * 0.88 // 81.5% of the screen width
                }} 
            />
            <Image 
                source={GroupImages.Bubble1} 
                // style={{ 
                //     height: height * 0.4, // 79.5% of the screen height
                //     width: width * 0.75 // 65% of the screen width
                // }} 
            />
        </View>

            {/* <NeoStoreLogo /> */}

          

        </View>
        <View style={{position:'absolute',top:300,backgroundColor:'red'}}>
        <Text style={{
                fontSize: 28, color: 'black', fontFamily: 'Laila-Bold' }}> Hello, User </Text>
            <Text style={{ fontFamily: 'FiraCode-Regular' }}> hello hello user user</Text>
        </View>
       </>
    )
}

export default TextInputComponent