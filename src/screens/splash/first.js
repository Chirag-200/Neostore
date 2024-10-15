

import React from 'react'
import { Pressable, ScrollView, Text ,  View } from 'react-native'

const First = ({navigation}) => {
    return (
        <ScrollView style={{backgroundColor:'red'}}>
            <Text style = {{width: 500}}> FIRST SCREEN </Text>
            {/* <Pressable 
            onPress={() => { navigation.navigate('Second') } }>
                <Text>
                    CLICK TO GO ON SECOND 
                </Text>
            </Pressable> */}
        </ScrollView>
        
    )
}

export default First