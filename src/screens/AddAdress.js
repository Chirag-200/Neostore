import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import CustomDropdown from '../components/dropdrown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const States = [
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Gujrat', value: 'Gujrat' },
    { label: 'Rajastan', value: 'Rajastan' },
];

const Districts = [
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Nashik', value: 'Nashik' },
    { label: 'Surat', value: 'Surat' },
    { label: 'Bhuj', value: 'Bhuj' },
];

const AddAddress = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        street: 'dadar',
        city: 'mumbai',
        LandMark: 'vasai',
        district: 'thane',
        state: 'maha',
        pincode: '401101',
        selectedButton: ''
    });
    const navigation = useNavigation();

    useEffect(() => {
        // Load addresses from AsyncStorage when the component mounts
        const loadAddresses = async () => {
            try {
                const storedAddresses = await AsyncStorage.getItem('addresses');
                if (storedAddresses) {
                    setAddresses(JSON.parse(storedAddresses));
                }
            } catch (error) {
                console.error("Failed to load addresses:", error);
            }
        };

        loadAddresses();
    }, []);

    const handleInputChange = (field, value) => {
        setNewAddress({ ...newAddress, [field]: value });
    };

    const addAddress = async () => {
        if (!newAddress.state || !newAddress.city || !newAddress.LandMark || !newAddress.district || !newAddress.pincode || !newAddress.street || !selectedButton) {
            Alert.alert("Please Enter all fields");
            return
        } else {
            const updatedAddress = { ...newAddress, selectedButton };
            const updatedAddresses = [...addresses, updatedAddress];
            setAddresses(updatedAddresses);
            setNewAddress({ street: '', city: '', LandMark: '', district: '', state: '', pincode: '',  });
            setSelectedButton(null)

            try {
                await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));
                console.log("Addresses saved:", updatedAddresses); // Debugging log
                Alert.alert("Address added successfully!");
                navigation.navigate('Address', { addresses: updatedAddresses });
            } catch (error) {
                console.error("Failed to save addresses:", error);
            }
        }
    };


    const [selectedButton, setSelectedButton] = useState(null);

    // Function to handle button press
    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName); // Update the selected button
    };

    console.log("1111====>>",selectedButton)

    return (
        <View style={styles.container}>


            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', textAlign: 'center', marginBottom: 10 }}>SHIPPING ADDRESS</Text>





            <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={() => handleButtonPress('Home')}>
                <Text style = {{borderWidth:1, padding: 5, textAlign:'center', borderRadius: 10, color:'black' , borderColor: selectedButton === 'Home' ? 'rgb(15,84,251)' : 'black' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('Office')}> 
                <Text style = {{borderWidth:1, padding: 5, textAlign:'center', borderRadius: 10, color:'black', borderColor: selectedButton === 'Office' ? 'rgb(15,84,251)' : 'black'}}>Office</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('Other')}>
                <Text style = {{borderWidth:1, padding: 5, textAlign:'center', borderRadius: 10, color:'black', borderColor: selectedButton === 'Other' ? 'rgb(15,84,251)' : 'black'}}>other</Text>
                </TouchableOpacity>
            </View>


            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2 }}>State</Text>
            <CustomDropdown
                items={States}
                placeholder="Select a State"
                onSelect={(text) => handleInputChange('state', text.value)}
            />

            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2 }}>District</Text>
            <CustomDropdown
                items={Districts}
                placeholder="Select a District"
                onSelect={(text) => handleInputChange('district', text.value)}
            />

            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2 }}>PinCode</Text>
            <TextInput
                placeholder='Enter Pincode'
                style={styles.input}
                keyboardType='numeric'
                value={newAddress.pincode}
                onChangeText={(text) => handleInputChange('pincode', text)}
                maxLength={6}
            />
            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2, marginTop: 10 }}>Town/City</Text>
            <TextInput
                placeholder='Enter Town/City'
                style={styles.input}
                value={newAddress.city}
                onChangeText={(text) => handleInputChange('city', text)}
            />
            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2, marginTop: 10 }}>LandMark</Text>
            <TextInput
                placeholder='Enter LandMark'
                style={styles.input}
                value={newAddress.LandMark}
                onChangeText={(text) => handleInputChange('LandMark', text)}
            />
            <Text style={{ fontSize: 16, fontFamily: 'Laila-Medium', color: 'black', marginLeft: 2, marginTop: 10 }}>Street</Text>
            <TextInput
                placeholder='Enter Street'
                style={styles.input}
                value={newAddress.street}
                onChangeText={(text) => handleInputChange('street', text)}
            />

            <TouchableOpacity onPress={addAddress}>
                <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 18, backgroundColor: 'rgb(15,84,251)', color: 'white', padding: 7, borderRadius: 10, fontFamily: 'Laila-SemiBold' }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        marginTop: 0,
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'Laila-Light',
        backgroundColor: 'white'
    },
});

export default AddAddress;