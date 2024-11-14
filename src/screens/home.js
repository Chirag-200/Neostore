import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const images = [
  { id: 1, uri: require('../images/first.png') },
  { id: 2, uri: require('../images/second.png') },
  { id: 3, uri: require('../images/third.png') }
];

const HomeScreen = (props) => {
  const [productId, setProductId] = useState(null);
  const { height, width } = Dimensions.get('window');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');
      if (hasLoggedIn === 'true') {
        await AsyncStorage.removeItem('hasLoggedIn');
      }
    };
    checkLoginStatus();
  }, []);

  const handlePress = (id) => {
    setProductId(id);
    props.navigation.navigate('ProductList', { productId: id });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
     
        <View>
           <LinearGradient colors={['rgb(4,61,50)', 'rgb(16,113,76)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 19, fontFamily: 'Laila-Bold', color: 'white', textDecorationLine: 'underline' }}>
            NEOSTORE
          </Text>

          <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 0.6, borderRadius: 10, overflow: 'hidden' }}>
            <TextInput 
              placeholder='Search Neostore.com' 
              style={{ paddingLeft: 10, width: '86%', fontSize: 17, fontFamily: 'Laila-Regular', backgroundColor: 'white' }} 
              placeholderTextColor={'grey'}
            />
            
            <View style={{ backgroundColor: 'rgb(253,188,112)', height: '100%', width: '14%' }}>
              <TouchableOpacity>
                <Image source={require('../images/search.png')} style={{ width: 30, height: 30, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'center', top: 10, left: 10 }} />
              </TouchableOpacity>
            </View>
           
          </View>
          </LinearGradient>
         
          
          <View style = {{flexDirection:'row', backgroundColor:'rgb(15,87,73)' , justifyContent:'space-around', paddingTop:5, paddingBottom:5}}>


          <Text style={{ fontFamily:'Laila-SemiBold', color:'white'}}>Deals</Text>
          <Text style={{ fontFamily:'Laila-SemiBold', color:'white'}}>LiveStream</Text>
          <Text style={{ fontFamily:'Laila-SemiBold', color:'white'}}>Best Sellers</Text>

          </View>
          <View style = {{flexDirection:'row' , backgroundColor:'rgb(26,121,85)' , paddingLeft:20 , paddingTop:5, paddingBottom:5, alignItems:'center'}}>
          <Image source={require('../images/map.png')} style = {{ height:18, width:18, tintColor:'white'}}/>
          <Text style = {{ color:'white', fontFamily:'Laila-Medium', paddingLeft:7 , fontSize:16  }}>Delivery to India</Text>
          </View>
          
        </View>
      

      {/* <View style={{  }}>
        <Swiper dotColor="#ffffff" activeDotColor="red" showsPagination={true} loop={true} autoplayTimeout={3}>
          {images.map(image => (
            <View key={image.id} style={{ height: '70%', width: '100%' }}>
              <Image source={image.uri} style={{ height: '100%', width: '100%' }} />
            </View>
          ))}
        </Swiper>
      </View> */}

<View style={{ backgroundColor:'red', maxHeight:'38%'}}>
      <Swiper 
        dotColor="#ffffff" 
        activeDotColor="red" 
        showsPagination={true} 
        loop={true} 
        autoplayTimeout={3}
        autoplay={true} // Add autoplay if you want the slider to move automatically
        paginationStyle={{ 

          top:-260 // Adjust pagination position if needed  
        }}
      >
        {images.map((image, index) => (
        
            <Image 
              source={image.uri} 
              style={{ height: '35%', width: '100%' }} 
            />
         
        ))}
      </Swiper>
    </View>



      <Text style={{ fontSize: 19, color: 'black' , marginTop: 14, marginLeft:20, fontFamily:'Laila-Bold',}}>Score the top Furnitures</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {[
          { image: require('../images/table0.png'), label: 'TABLE', id: 1 },
          { image: require('../images/chair0.png'), label: 'CHAIR', id: 2 },
          { image: require('../images/bed0.png'), label: 'BED', id: 3 },
          { image: require('../images/sofa0.png'), label: 'SOFA', id: 3 },
          
        ].map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item.id)}>
            <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
              <Image source={item.image} style={{ height: height * 0.13, width: width * 0.45, marginLeft: width * 0.04, marginTop: height * 0.01, borderRadius: 20 }} />
            </View>
            <Text style={{ marginLeft: width * 0.2, color: 'black', fontFamily: 'Laila-Regular' }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;