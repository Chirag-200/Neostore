import React, { useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';

const UpdateDetails = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        email: '',
        phoneNumber: '',
        birthDate: 'DD/MM/YYYY',
        profilePic: ''
    });
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Error', 'User is not authenticated. Please log in.');
                return;
            }

            const response = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/users/getUserData', {
                headers: {
                    'access_token': token,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setUserData({
                firstName: response.data.data.user_data.first_name || '',
                email: response.data.data.user_data.email || '',
                phoneNumber: response.data.data.user_data.phone_no || '',
                birthDate: response.data.data.user_data.birthDate || 'DD/MM/YYYY',
                profilePic: response.data.data.user_data.profilePic || ''
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Error', 'Failed to fetch user data. Please try again.');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        setUserData((prevState) => ({ ...prevState, birthDate: formattedDate }));
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                const base64Image = response.assets[0].base64;
                setImageUri(`data:${response.assets[0].type};base64,${base64Image}`);
                setUserData((prevState) => ({ ...prevState, profilePic: base64Image }));
            }
        });
    };

    const handleSubmit = async () => {
        if (!userData.firstName || !userData.email || !userData.phoneNumber) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Error', 'User is not authenticated. Please log in.');
                return;
            }

            const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/update', userData, {
                headers: {
                    'access_token': token,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                Alert.alert('Success', 'User details updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update user details.');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            Alert.alert('Error', 'Failed to update user data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label='First Name'
                mode='outlined'
                value={userData.firstName}
                onChangeText={(text) => setUserData((prevState) => ({ ...prevState, firstName: text }))}
                style={styles.input}
            />
            <TextInput
                label='Email'
                mode='outlined'
                value={userData.email}
                onChangeText={(text) => setUserData((prevState) => ({ ...prevState, email: text }))}
                style={styles.input}
            />
            <TextInput
                label='Phone Number'
                mode='outlined'
                value={userData.phoneNumber}
                onChangeText={(text) => setUserData((prevState) => ({ ...prevState, phoneNumber: text }))}
                style={styles.input}
            />
            <TextInput
                label='Birth Date'
                mode='outlined'
                value={userData.birthDate}
                editable={false}
                onFocus={showDatePicker}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleImagePick} style={styles.button}>
                <Text style={styles.buttonText}>
                    Pick Profile Picture
                </Text>
            </TouchableOpacity>

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.profileImage}
                />
            )}

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={handleDateChange}
                />
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                <Text style={styles.submitButtonText}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 15,
    },
    input: {
        margin: 15,
    },
    button: {
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#2E64FE',
        color: 'white',
        borderRadius: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        borderRadius: 20,
    },
    submitButtonText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        color: 'white',
    },
});

export default UpdateDetails;
