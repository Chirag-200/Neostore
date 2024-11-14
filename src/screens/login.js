import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

import LinearGradient from 'react-native-linear-gradient'

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext); 
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

    const initialState = {
        email: 'mytest@gmail.com',
        password: '#Email@1234',
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const loginUser  = async () => {
        
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

                    // Toast.show({
                    //     type: 'success',
                    //     text1: 'Login Successful',
                    //     position: 'top',
                    // });

                    // setTimeout(() => {
                    //     login(); // Or replace with your navigation function
                    //     // navigation.navigate('Main'); // If you're using react-navigation
                    // }, 1000);
                    await AsyncStorage.setItem('hasLoggedIn', 'true'); // Set the flag

                login(); 
                // navigation.navigate('Main'); 
                // Toast.show({
                //     type: 'success',
                //     text1: 'Login Successful',
                //     position: 'top',
                // });

                const accessToken = response?.data?.data?.access_token;
                AsyncStorage.setItem('access_token', accessToken);
                console.log("loginnnnn:", accessToken);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login Failed. Please try again later.';
            Alert.alert('Error', message);
            // Toast.show({
            //     type: 'error',
            //     text1: 'Login Failed',
            //     text2: message,
            //     position: 'top',
            // });
        }
    };

    const handleSubmit = async () => {
        validateEmail();
        validatePassword();

        if (formData.emailError || formData.passwordError) {
            Alert.alert('Please enter correct details');
            return;
        }

        await loginUser ();
    };

    return (
        <ScrollView >
            {/* <View style={{ position: 'relative', width: 200, height: 200 }}>
                <Image source={ require('../images/bubble02.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
                <Image source={require('../images/bubble01.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            </View>
            <Image source={require('../images/bubblle03.png')} style={{ marginLeft: 324 }} /> */}

            <View style={{ flexDirection: "row", flex:1}}>
                <LinearGradient colors={['rgb(4,61,50)' , 'rgb(16,114,46)']} style = {{width:'100%', padding: 5, paddingLeft:10}}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{ fontSize: 27, color: 'white', fontFamily: 'Laila-Bold', textDecorationLine:'underline', }}>NeoStore</Text>
                </LinearGradient>

            </View>

            <Text style = {{marginHorizontal:10, top:15, fontSize: 22, fontFamily: 'Laila-SemiBold', color: 'black'}}>Welcome</Text>
            
            
            
            <View style = {{ flex:1 , top:30 , borderWidth:0.5, marginHorizontal:10, borderRadius:10, backgroundColor:'white'}}>
            <View style = {{marginHorizontal:10 , top:20}} >
                <TextInput
                    label='Email'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color='rgb(15,105,189)' icon='email' size={30} />}
                    style={{ marginBottom: 15, backgroundColor: 'white' }}
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    onBlur={validateEmail}
                />
                {formData.emailError ? <Text style={{ color: 'red' }}>{formData.emailError}</Text> : null}

                <TextInput
                    label='Password'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color='rgb(15,105,189)' icon='account-lock-outline' size={30} />}
                    right={<TextInput.Icon color='rgb(15,105,189)' icon={showPassword ? 'eye' : 'eye-off'} size={30} onPress={togglePasswordVisibility} />}
                    style={{ marginBottom: 15, backgroundColor: 'white' }}
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on state
                    value={formData.password} 
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                    onBlur={validatePassword}
                />
                {formData.passwordError ? <Text style={{ color: 'red' }}>{formData.passwordError}</Text> : null}
            </View>

            <View style={{ marginLeft: 20, marginRight: 20, top:20 }}>
                <TouchableOpacity onPress={handleSubmit} style={{ padding: 10, backgroundColor: 'rgb(254,215,54)', borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style = {{top:30}}>
                <Text style={{ fontSize: 14, textAlign: 'right', marginRight: 20, color: 'rgb(15,105,189)' }} onPress={() => navigation.navigate('ForgetPassword')}>
                    Forget Password?
                </Text>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 40 , marginBottom:30}}>
                <Text>Don't have an account?</Text>
                <Text style={{ color: 'rgb(15,105,189)' }} onPress={() => navigation.navigate('Register')}> Register</Text>
            </View>

            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
            </View>
        </ScrollView>
    );
};

export default LoginScreen;