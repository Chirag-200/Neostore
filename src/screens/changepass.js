
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('');

  const [newpassword, setNewPassword] = useState('');
  const [newshowPassword, setNewShowPassword] = useState(false)
  const [newpasswordError, setNewPasswordError] = useState('');


  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)







  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

    const validatePassword = (password) => {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        return regex.test(password);
      };
    
      const passwordValidation = () => {
        setPasswordError(password === "" ? "Please Enter password" : "")
        setPasswordError(!validatePassword(password) ? 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.' : '');
      };






  const toggleNewPassword = () => {
    setNewShowPassword(!newshowPassword)
  }

    const validateNewPassword = (password) => {

        const newregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        return newregex.test(newpassword);
      };
    
      const passwordNewValidation = () => {
        setNewPasswordError(newpassword === "" ? "Please Enter password" : "")
        setNewPasswordError(!validateNewPassword(password) ? 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.' : '');
      };

      
      const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
      }
      const confirmPasswordValidation = () => {
        setConfirmPasswordError(confirmPassword === "" ? "Please Enter Confirm Password" : "")
        setConfirmPasswordError(confirmPassword !== newpassword ? 'Passwords do not match' : '');
      };

    return (

        <View style = {{backgroundColor:'white', flex:1}}>

            <View style = {{marginHorizontal:25, marginVertical:25, }}>
            {/* <TextInput    label='Old Password' mode='outlined' style = {{  backgroundColor:'white',marginBottom:20}} activeOutlineColor='rgb(15,84,251)' left={<TextInput.Icon color='rgb(15,84,251)' icon='account-lock-outline' size={25} />} right={<TextInput.Icon color='#2E64FE' icon={showPassword ? 'eye' : "eye-off"} size={30} onPress={togglePassword} />}/>
            <TextInput label='New Password' mode='outlined' style = {{backgroundColor:'white',marginBottom:20}} activeOutlineColor='rgb(15,84,251)' left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />} />
            <TextInput label='ConFirm Password' mode='outlined' style = {{backgroundColor:'white'}} activeOutlineColor='rgb(15,84,251)' left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}/> */}


<TextInput
        label='Old Password'
        mode='outlined'
        activeOutlineColor='blue'
        onBlur={() => passwordValidation(password)}
        left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}

        right={<TextInput.Icon color='#2E64FE' icon={showPassword ? 'eye' : "eye-off"} size={30} onPress={togglePassword} />}
        style={{ backgroundColor: 'white' }}
        secureTextEntry={!showPassword}
        onChangeText={(text) => {
          setPassword(text);
          passwordValidation(text);
        }}
        outlineStyle={{ borderRadius: 10 }}
        value={password}
      />
      {passwordError && <Text style={{ color: 'red', }}>{passwordError}</Text> }



<TextInput
        label='New Password'
        mode='outlined'
        activeOutlineColor='blue'
        onBlur={() => passwordNewValidation(password)}
        left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}

        right={<TextInput.Icon color='#2E64FE' icon={newshowPassword ? 'eye' : "eye-off"} size={30} onPress={toggleNewPassword} />}
        style={{ backgroundColor: 'white' , marginTop:15 }}
        secureTextEntry={!newshowPassword}
        onChangeText={(text) => {
          setNewPassword(text);
          passwordNewValidation(text);
        }}
        outlineStyle={{ borderRadius: 10 }}
        value={newpassword}
      />
      {newpasswordError && <Text style={{ color: 'red', }}>{newpasswordError}</Text> }



      <TextInput
        label='Confirm Password'
        onBlur={() => confirmPasswordValidation(confirmPassword)}
        mode='outlined'
        activeOutlineColor='blue'
        left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}
        right={<TextInput.Icon color='#2E64FE' icon={showConfirmPassword ? 'eye' : 'eye-off'} size={30} onPress={toggleConfirmPassword} />}
        style={{ marginTop: 15, backgroundColor: 'white' }}
        secureTextEntry={!showConfirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          confirmPasswordValidation(text);
        }}
        outlineStyle={{ borderRadius: 10 }}
        value={confirmPassword}
      />

      {confirmPasswordError && <Text style={{ color: 'red', marginBottom: 15 }}>{confirmPasswordError}</Text> }
      

            </View>
        </View>
    )
}

export default ChangePassword;