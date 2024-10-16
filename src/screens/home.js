

import {Text, TextInput, View, Image, ScrollView, FlatList} from 'react-native';
import React, {useState} from 'react';
import Swiper from 'react-native-swiper';

const images = [
    { id: 1, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/table1.png') },
    { id: 2, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/sofa1.png')},
    { id: 3, uri: require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/chair1.png')}  
];

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}} style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 28, color: 'black'}}> Shop </Text>
        <View style={{marginLeft: 50, backgroundColor: 'rgb(248,248,248)'}}>
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

      <View style={{width: '95%', margin: 10, height: 300}}>
        <Swiper
          dotColor="#ffffff"
          activeDotColor="red"
          showsPagination={true}
          loop={true}
          autoplayTimeout={3}>
          {images.map(image => (
            <View
              key={image.id}
              style={{
                height: '100%',
                width: '100%',
              }}>
              <Image
                source={image.uri}
                style={{borderRadius: 30, height: '100%', width: '100%'}}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <Text style={{fontSize: 21, color: 'black'}}> Categories </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {/* Remove fixed height for better scrolling */}
        {[...Array(12).keys()].map((_, index) => (
          <Image
            key={index}
            source={require('/Users/neosoft1/Documents/NEOSTORE/neostore/src/images/chair1.png')}
            style={{
              height: 150, // Set a fixed height
              width: '45%',
              resizeMode: 'cover',
              borderRadius: 10,
              marginLeft: 10,
              marginBottom: 20,
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;



