import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-paper';

const LoginScreen = (props) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required.');
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required.');
        } else if (password.length < 8 || !passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters and include a mix of letters, numbers, and special characters.');
        } else {
            setPasswordError('');
        }
    };

    const LoginpostData = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            console.log('Sending login request with:', { email, password });

            const result = await axios.post(
                'http://staging.php-dev.in:8844/trainingapp/api/users/login',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            console.log('Response Data:', result.data);
            if (result.status === 200) {
                Alert.alert('Login Successful');
                props.navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.log('Error response:', error.response.data);
                Alert.alert('Error', error.response.data.message || 'Login Failed. Please try again later.');
            } else {
                Alert.alert('Error', 'An error occurred. Please try again later.');
            }
        }
    };

    const handleSubmit = async () => {
        validateEmail();
        validatePassword();

        if (emailError || passwordError) {
            Alert.alert('Please enter correct details');
            return;
        }

        await LoginpostData();
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
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                />
                {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

                <TextInput
                    label='Password'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color='#0030FF' icon='account-lock-outline' size={30} />}
                    right={<TextInput.Icon color='blue' icon='eye-off' size={30} />}
                    style={{ marginBottom: 15, backgroundColor: 'white' }}
                    secureTextEntry
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                />
                {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
            </View>

            <View style={{ alignItems: 'center', margin: 20, padding: 2, borderRadius: 50, backgroundColor: '#0030FF', marginBottom: 0 }}>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 14, textAlign: 'right', marginRight: 20, color: '#0030FF' }} onPress={() => props.navigation.navigate('ForgetPassword')}>
                    Forget Password?
                </Text>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text>Don't have an account?</Text>
                <Text style={{ color: '#0030FF' }} onPress={() => props.navigation.navigate('Register')}> Register</Text>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
