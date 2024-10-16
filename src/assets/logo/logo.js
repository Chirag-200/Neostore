import React from 'react'
import { Text, View } from 'react-native'


const NeoStoreLogo = () => {
    return(
        <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Laila-Bold' }}>NEO</Text>
                <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Laila-Bold' }}>STORE</Text>
        </View>
    )
}

export default NeoStoreLogo