import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Addresss = (props) => {
    const navigation = useNavigation
    const [addresses, setAddresses] = useState([]);

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);


    useEffect(() => {

        const loadAddresses = async () => {
            try {
                const storedAddresses = await AsyncStorage.getItem('addresses');
                if (storedAddresses) {
                    const parsedAddresses = JSON.parse(storedAddresses);
                    setAddresses(parsedAddresses);
                    // console.log("Loaded addresses:", parsedAddresses); 
                }
            } catch (error) {
                console.error("Failed to load addresses:", error);
            }
        };

        loadAddresses();
    }, [addresses]);

    const deleteAddress = async (index) => {
        
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses); 
        if (selectedAddressIndex === index) {
            setSelectedAddressIndex(null); // Reset the selected address index
        }

        try {
            
            await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));
            console.log("Updated addresses after deletion:", updatedAddresses); 
        } catch (error) {
            console.error("Failed to save updated addresses:", error);
        }
    };

    const toggleSelectAddress = (index) => {
        // Only allow one address to be selected
        if (selectedAddressIndex === index) {
            setSelectedAddressIndex(null); // Deselect if already selected
        } else {
            setSelectedAddressIndex(index); // Select the new address
        }
    };

    const renderAddressItem = ({ item, index }) => {
        const User = `${item.selectedButton.toUpperCase()},
${item.street}, ${item.city}, ${item.LandMark}, ${item.district}, ${item.state}, ${item.pincode}`
        return (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderWidth: 1, marginVertical:5, marginHorizontal:10,borderRadius: 10 }}>
            <CheckBox
                // **Change 4: Check if the current index is the selected one**
                checked={selectedAddressIndex === index} // Check if the current index is the selected one
                onPress={() => toggleSelectAddress(index)} // Set the selected address
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }} // Remove default background and border
 // Custom checked icon
                uncheckedIcon={<Image source={require('../images/square.png')} style={{ width: 20, height: 20 }} />} // Custom unchecked icon
            />

           <Text style={{ fontSize: 16, margin: 20, fontFamily: 'Laila-Regular', color: 'black', borderRadius: 10, width: '60%' }}>
                {User}
            </Text>
            <TouchableOpacity onPress={() => deleteAddress(index)}>
                <Image source={require('../images/delete.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
        </View>
        )
    };

    return (
        <View style = {{  flex:1 , backgroundColor:'white'}}>
            {/* <View style = {{ borderBottomColor:'black', marginLeft:'4%', top:'2%', marginRight:'4%',borderRadius:10, height:40, alignContent:'center', justifyContent:"center", borderBottomWidth:1, borderBottomLeftRadius:10, borderBottomRightRadius:10 }}> */}
            <Text style={{ fontSize: 17, textAlign: 'center', color: 'black', fontFamily:'Laila-SemiBold' , backgroundColor:'lightgray', borderRadius:8, marginHorizontal:10}}>SELECT SHIPPING ADDRESS</Text>
            {/* </View> */}
            {/* <View style = {{bottom:60 , top: '2%' }}> */}
            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* </View> */}
            <View style= {{ marginHorizontal:10, marginVertical:5}}>
                <TouchableOpacity disabled={selectedAddressIndex === null} style={{borderRadius:10, backgroundColor: selectedAddressIndex !== null ? 'rgba(15,84, 251,1)' : 'rgba(200,200,200,1)',   }} 
                onPress={() => {
            if (selectedAddressIndex !== null) {
                const selectedAddress = addresses[selectedAddressIndex];
                console.log("Selected Address:", selectedAddress);
                props.navigation.navigate('CheckOut',selectedAddress)
                // You can also handle any additional logic for checkout here
            }
        }} >
            <Text style = {{textAlign:'center', fontSize:18, padding:5,color:'rgba(255,255,255,1)', fontFamily:'Laila-SemiBold',}}>CHECKOUT</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default Addresss;