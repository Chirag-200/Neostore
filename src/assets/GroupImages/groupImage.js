import React from 'react'
import { Image, View } from 'react-native'


const GroupImage = () => {
    return (
        <View style={{ position: 'relative', width: 200, height: 200 }}>
                <Image source={require('.../images/bubble02.png')} style={{ position: 'absolute' }} />
                <Image source={require('.../images/bubble01.png')} style={{ position: 'absolute' }} />
        </View>

    )
}
export default GroupImage