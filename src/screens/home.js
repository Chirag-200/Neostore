import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const images = [
  { id: 1, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/table1.png') },
  { id: 2, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/sofa1.png') },
  { id: 3, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/chair1.png') }
];

const HomeScreen = (props) => {
  // const navigation = useNavigation(); 
  const [productId, setProductId] = useState(null);
  const {height,width} = Dimensions.get('window')
  

  const handlePress = (id) => {
    setProductId(id);
    // console.log("id  " ,id)
    // console.log("product id  ",productId)
    
    props.navigation.navigate('ProductList', { productId: id});
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 28, color: 'black' }}> Shop </Text>
        <View style={{ marginLeft: 50, backgroundColor: 'rgb(248,248,248)' }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 25,
              paddingEnd: 180,
              paddingStart: 10,
              padding: 2,
              fontSize: 16,
            }}
            placeholder="Search"
          />
        </View>
      </View>

      <View style={{ width: '95%', margin: 10, height: 300 }}>
        <Swiper
          dotColor="#ffffff"
          activeDotColor="red"
          showsPagination={true}
          loop={true}
          autoplayTimeout={3}>
          {images.map(image => (
            <View key={image.id} style={{ height: '100%', width: '100%' }}>
              <Image source={image.uri} style={{ borderRadius: 30, height: '100%', width: '100%' }} />
            </View>
          ))}
        </Swiper>
      </View>

      <Text style={{ fontSize: 21, color: 'black' }}> Categories </Text>

      {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        {[
         
          { image: require('../images/table2.png'), label: 'TABLE', id: 1 },
          { image: require('../images/chair2.png'), label: 'CHAIR', id: 2 },
          { image: require('../images/sofa2.png'), label: 'SOFA', id: 3 },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.id)} 
            style={{ borderWidth: 1, borderRadius: 40, overflow: 'hidden', marginTop: 20 }}>
            <Image source={item.image} style={{ height: 180, width: 360 }} />
            <View style={{
              position: 'absolute',
              top: 70, 
              alignSelf: 'center',
              padding: 5,
              borderWidth: 1,
              borderRadius: 40
            }}>
              <Text style={{ fontSize: 25, color: 'black', fontFamily: 'Laila-SemiBold' }}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        </View> */}

        {/* <TouchableOpacity >
        <View style = {{height: 400, width: 400 , flexDirection: 'row' , flexWrap: 'wrap' , }}> 
        <View >
          <Image source = {require('../images/table2.png')} style = {{height: height*0.11 , width: width*0.41 ,marginLeft: width*0.06 , marginTop: height* 0.05 , borderRadius: 20 , shadowOffset: {height:2,width:0} , shadowOpacity: 0.3 , shadowRadius: 4, elevation: 5 , shadowColor: 'black'}} />
          <Text style = {{marginLeft: width*0.2}}> TABLES </Text>


          </View>
          <View>
          <Image source = {require('../images/chair2.png')} style = {{height: height*0.11 , width: width*0.41 ,marginLeft: width*0.06, marginTop: height* 0.05, borderRadius: 20}}/>
          <Text style = {{marginLeft: width*0.2}}> CHAIRS </Text>
          </View>
          <View>
          <Image source = {require('../images/sofa2.png')}  style = {{height: height*0.11 , width: width*0.41 , marginLeft: width*0.06, marginTop: height* 0.05, borderRadius: 20}} />
          <Text style = {{marginLeft: width*0.2}}> SOFA </Text>
          </View>
        </View>
        </TouchableOpacity> */}
        <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          [
            { image: require('../images/table2.png'), label: 'TABLE', id: 1 },
          { image: require('../images/chair2.png'), label: 'CHAIR', id: 2 },
          { image: require('../images/sofa2.png'), label: 'SOFA', id: 3 },
          ].map( (item,index) => (
            <TouchableOpacity 
            key = {index}
            onPress={()=>handlePress(item.id)}
            
            
            
            
            >
              <View style = {{flexDirection: 'row' , overflow: 'hidden'}}>
              <Image source = {item.image} style = {{height: height*0.11 , width: width*0.41 , marginLeft: width*0.06 , marginTop: height*0.05 , borderRadius: 20}}/>
              
              
              </View>
              <Text style = {{marginLeft: width*0.2, color: 'black' , fontFamily: 'Laila-Regular'}}>{item.label}</Text>

            </TouchableOpacity>
          )
        )
        }
        </View>
      
    </ScrollView>
  );
};

export default HomeScreen;
