import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Addresss = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    useEffect(() => {

        const loadAddresses = async () => {
            try {
                const storedAddresses = await AsyncStorage.getItem('addresses');
                if (storedAddresses) {
                    const parsedAddresses = JSON.parse(storedAddresses);
                    setAddresses(parsedAddresses);
                    console.log("Loaded addresses:", parsedAddresses); 
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
        const newSelectedAddresses = [...selectedAddresses];
        if (newSelectedAddresses.includes(index)) {
            newSelectedAddresses.splice(newSelectedAddresses.indexOf(index), 1); 
        } else {
            newSelectedAddresses.push(index); //
        }
        setSelectedAddresses(newSelectedAddresses);
        setSelectedAddressIndex(index);
    };

    const renderAddressItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderWidth: 1, margin: 15, borderRadius: 10 }}>
            <CheckBox
                // **Change 4: Check if the current index is the selected one**
                checked={selectedAddressIndex === index} // Check if the current index is the selected one
                onPress={() => toggleSelectAddress(index)} // Set the selected address
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }} // Remove default background and border
 // Custom checked icon
                uncheckedIcon={<Image source={require('../images/square.png')} style={{ width: 20, height: 20 }} />} // Custom unchecked icon
            />

           <Text style={{ fontSize: 16, margin: 20, fontFamily: 'Laila-Regular', color: 'black', borderRadius: 10, width: '60%' }}>
                {`${item.selectedButton.toUpperCase()},
${item.street}, ${item.city}, ${item.LandMark}, ${item.district}, ${item.state}, ${item.pincode}`}
            </Text>
            <TouchableOpacity onPress={() => deleteAddress(index)}>
                <Image source={require('../images/delete.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <Text style={{ fontSize: 17, textAlign: 'center', marginTop: 10, color: 'black', borderBottomColor:'green', borderWidth:1 }}>SELECT SHIPPING ADDRESS</Text>
            <View style = {{bottom:60, top:15,  }}>
            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
        </View>
    );
};

export default Addresss;