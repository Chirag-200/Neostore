import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext); 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

    // Initial state with default values for email and password
    const initialState = {
        email: 'mytest@gmail.com', // Initial email value
        password: '#Email@1234', // Initial password value
        emailError: '',
        passwordError: ''
    };

    const [formData, setFormData] = useState(initialState);

    const validateEmail = () => {
        if (!formData.email) {
            setFormData(prev => ({ ...prev, emailError: 'Email is required.' }));
        } else if (!emailRegex.test(formData.email)) {
            setFormData(prev => ({ ...prev, emailError: 'Please enter a valid email address.' }));
        } else {
            setFormData(prev => ({ ...prev, emailError: '' }));
        }
    };

    const validatePassword = () => {
        if (!formData.password) {
            setFormData(prev => ({ ...prev, passwordError: 'Password is required.' }));
        } else if (formData.password.length < 8 || !passwordRegex.test(formData.password)) {
            setFormData(prev => ({ ...prev, passwordError: 'Password must be at least 8 characters and include a mix of letters, numbers, and special characters.' }));
        } else {
            setFormData(prev => ({ ...prev, passwordError: '' }));
        }
    };

    const loginUser = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);

        try {
            const response = await axios.post(
                'http://staging.php-dev.in:8844/trainingapp/api/users/login',
                formDataToSend,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                
                Alert.alert('Login Successful');
                login(); 
             

                navigation.navigate('Main'); 
                // console.log(response.data.data.acc)
                const accessToken = response?.data?.data?.access_token;
                await AsyncStorage.setItem('access_token', accessToken);
                console.log(accessToken)
            }
            
        } catch (error) {
            const message = error.response || 'Login Failed. Please try again later.';
            Alert.alert('Error', message);
        }
    };

    const handleSubmit = async () => {
        validateEmail();
        validatePassword();

        if (formData.emailError || formData.passwordError) {
            Alert.alert('Please enter correct details');
            return;
        }

        await loginUser();
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ position: 'relative', width: 200, height: 200 }}>
                <Image source={require('../images/bubble02.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
                <Image source={require('../images/bubble01.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            </View>
            <Image source={require('../images/bubblle03.png')} style={{ marginLeft: 324 }} />

            <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Laila-Bold' }}>NEO</Text>
                <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Laila-Bold' }}>STORE</Text>
            </View>

            <View style={{ margin: 15 }}>
                <TextInput
                    label='Email'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color='#0030FF' icon='email' size={30} />}
                    style={{ marginBottom: 15, backgroundColor: 'white' }}
                    value={formData.email} // Bind value here
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    onBlur={validateEmail}
                />
                {formData.emailError ? <Text style={{ color: 'red' }}>{formData.emailError}</Text> : null}

                <TextInput
                    label='Password'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color='#0030FF' icon='account-lock-outline' size={30} />}
                    right={<TextInput.Icon color='blue' icon='eye-off' size={30} />}
                    style={{ marginBottom: 15, backgroundColor: 'white' }}
                    secureTextEntry
                    value={formData.password} // Bind value here
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                    onBlur={validatePassword}
                />
                {formData.passwordError ? <Text style={{ color: 'red' }}>{formData.passwordError}</Text> : null}
            </View>

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <TouchableOpacity onPress={handleSubmit} style={{ padding: 10, backgroundColor: '#0030FF', borderRadius: 50 }}>
                    <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 14, textAlign: 'right', marginRight: 20, color: '#0030FF' }} onPress={() => navigation.navigate('ForgetPassword')}>
                    Forget Password?
                </Text>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text>Don't have an account?</Text>
                <Text style={{ color: '#0030FF' }} onPress={() => navigation.navigate('Register')}> Register</Text>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
