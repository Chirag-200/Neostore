

import React, { useState } from 'react'
import {Text, TextInput, View , Image } from 'react-native'
import Swiper from 'react-native-swiper'



// const images = [
//     { id: 1, uri: '' },
//     { id: 2, uri: ''},
//     { id: 3, uri: ''}
// ]

const images = [
    { id: 1, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/table1.png') },
    { id: 2, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/sofa1.png')},
    { id: 3, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/chair1.png')}  
];

const HomeScreen = () =>{




    return (
        <View style = {{backgroundColor: 'white', flex:1}}>


            <View style = {{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style = {{fontSize: 28, fontFamily: "Laila-Bold", color:'black'}}> Shop </Text>
            <View style = {{marginLeft: 50 , backgroundColor: 'rgb(248,248,248)'}}>
            <TextInput style = {{borderWidth:1, borderRadius: 25, paddingEnd:180, paddingStart:10, padding: 2, fontSize: 16}}
            placeholder='Search'/>
            </View>
            </View>



            <View style = {{ marginTop: 15, height: '30%', width: '95%', margin: 10 }}>

                <Swiper 
                dotColor='#ffffff'
                // style={{ width: 380, height: 200 }}
                activeDotColor= 'red'
                showsPagination={true}
                // autoplay= {true}
                loop= {true}
                autoplayTimeout={3}

                 >

                    { images.map((image)=>(
                        <View key = {image.id} style = {{
                            alignItems: 'center',
                        }}>

                            <Image source = {image.uri} style = {{ borderRadius: 30,  height: '100%', width: '100%'}} />
                        </View>
                    ))
                    
                    }

                </Swiper>
                
                
            </View>
            <Text style = {{ fontSize: 21, fontFamily: 'Laila-Medium', color: 'black'}}> Categories </Text>

            <View style = {{height: '15%', width: '30%', marginLeft: 20, borderRadius: 2}}>
            <Image  source={require('../images/sofa2.png')}  style = {{height:'100%', width: '100%', resizeMode:'contain'}}/>
            </View>
            
            

        </View>
    )
}

export default HomeScreen