import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [newpassword, setNewPassword] = useState('');
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [newpasswordError, setNewPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const passwordValidation = () => {
    setPasswordError(password === '' ? 'Please Enter password' : '');
    setPasswordError(
      !validatePassword(password)
        ? 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.'
        : ''
    );
  };

  const toggleNewPassword = () => {
    setNewShowPassword(!newshowPassword);
  };

  const validateNewPassword = (password) => {
    const newregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return newregex.test(newpassword);
  };

  const passwordNewValidation = () => {
    setNewPasswordError(newpassword === '' ? 'Please Enter password' : '');
    setNewPasswordError(
      !validateNewPassword(newpassword)
        ? 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.'
        : ''
    );
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const confirmPasswordValidation = () => {
    setConfirmPasswordError(confirmPassword === '' ? 'Please Enter Confirm Password' : '');
    setConfirmPasswordError(confirmPassword !== newpassword ? 'Passwords do not match' : '');
  };

  const formData = new FormData();


  async function handlePress() {
    const formData = new FormData();
    try {
      const access_token = await AsyncStorage.getItem('access_token'); 
      if (!access_token) {
        console.log('Access token is missing');
        return; 
      } 
      console.log(access_token)

      formData.append('old_password', password);
      formData.append('password', newpassword);
      formData.append('confirm_password', confirmPassword);
      console.log(formData)
      let obj={
        'old_password':password,
        'password':newpassword,
        'confirm_password':confirmPassword
      }


      const result = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/change',
        obj ,
       
        {
          headers: {
           
            access_token : access_token , 
            
          },
        },
        
      );

      const res = result.data; 
      console.log(res); 

    } catch (error) {
      
      if (error.response) {
        console.log('Error Response:', error.response.data); 
        console.log('Error Status:', error.response.status); 
      } else {
        console.log('Error:', error.message); 
      }
    }
  }
  

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ marginHorizontal: 25, marginVertical: 25 }}>
        {/* Old Password */}
        <TextInput
          label="Old Password"
          mode="outlined"
          activeOutlineColor="blue"
          onBlur={() => passwordValidation(password)}
          left={<TextInput.Icon color="#2E64FE" icon="account-lock-outline" size={30} />}
          right={<TextInput.Icon color="#2E64FE" icon={showPassword ? 'eye' : 'eye-off'} size={30} onPress={togglePassword} />}
          style={{ backgroundColor: 'white' }}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setPassword(text);
            passwordValidation(text);
          }}
          outlineStyle={{ borderRadius: 10 }}
          value={password}
        />
        {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}

        {/* New Password */}
        <TextInput
          label="New Password"
          mode="outlined"
          activeOutlineColor="blue"
          onBlur={() => passwordNewValidation(password)}
          left={<TextInput.Icon color="#2E64FE" icon="account-lock-outline" size={30} />}
          right={<TextInput.Icon color="#2E64FE" icon={newshowPassword ? 'eye' : 'eye-off'} size={30} onPress={toggleNewPassword} />}
          style={{ backgroundColor: 'white', marginTop: 15 }}
          secureTextEntry={!newshowPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            passwordNewValidation(text);
          }}
          outlineStyle={{ borderRadius: 10 }}
          value={newpassword}
        />
        {newpasswordError && <Text style={{ color: 'red' }}>{newpasswordError}</Text>}

        {/* Confirm Password */}
        <TextInput
          label="Confirm Password"
          onBlur={() => confirmPasswordValidation(confirmPassword)}
          mode="outlined"
          activeOutlineColor="blue"
          left={<TextInput.Icon color="#2E64FE" icon="account-lock-outline" size={30} />}
          right={<TextInput.Icon color="#2E64FE" icon={showConfirmPassword ? 'eye' : 'eye-off'} size={30} onPress={toggleConfirmPassword} />}
          style={{ marginTop: 15, backgroundColor: 'white' }}
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            confirmPasswordValidation(text);
          }}
          outlineStyle={{ borderRadius: 10 }}
          value={confirmPassword}
        />

        {confirmPasswordError && <Text style={{ color: 'red', marginBottom: 15 }}>{confirmPasswordError}</Text>}
      </View>

      <TouchableOpacity onPress={() => handlePress()}>
        <Text
          style={{
            textAlign: 'center',
            top: 10,
            fontSize: 18,
            fontFamily: 'Laila-SemiBold',
            color: 'white',
            borderWidth: 1,
            padding: 5,
            marginHorizontal: 20,
            borderRadius: 10,
            backgroundColor: '#2E64FE',
          }}
        >
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
