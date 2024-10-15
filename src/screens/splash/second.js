
import React from 'react' 
import { Pressable, Text, View } from 'react-native'

const Second = ({navigation}) => {
    return (
        <View>
            <Text style = {{width: 500}}> 
                SECOND SCREEN 
            </Text> 
            {/* <Pressable 
            on Press = {() => { navigation.navigate('Third')}}>
                <Text>
                    CLICK TO GO ON THIRD 
                </Text>
            </Pressable> */}

            {/* <Text onPress={() => { navigation.navigate('Third')}}> CLICK ON GO TO THIRD </Text> */}
        </View>
    )
}

export default Second