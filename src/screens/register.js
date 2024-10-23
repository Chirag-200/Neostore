import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput, shadow } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setphoneNumberError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedGender, setSelectedGender] = useState(false)
  const [terms, setTerms] = useState(false)
  const navigation = useNavigation();




  // const formData = new FormData()
  // formData.append('first_name', firstName)
  // formData.append('last_name', lastName)
  // formData.append('email', email)
  // formData.append('password', password)
  // formData.append('confirm_password', confirmPassword)
  // formData.append('gender', selectedGender)
  // formData.append('phone_number', phoneNumber)

  // async function sendUserData() {
  //   const result = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/register', formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }

  //     })

  //      console.log("this is result ", result)
  //     .then(function (response) {
  //       console.log(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }




  async function sendUserData() {

    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('confirm_password', confirmPassword)
    formData.append('gender', selectedGender)
    formData.append('phone_no', Number(phoneNumber))
    console.log(formData)


    try {
        let result = await axios.post(
          'http://staging.php-dev.in:8844/trainingapp/api/users/register',
              formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        console.log("result",result?.data)
    //   let result = await axios({
    //     method: 'POST',
    //     url: 'http://staging.php-dev.in:8844/trainingapp/api/users/register',
    //     data: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   let abcd = result.data.data.access_token
    //   console.log("the result === ", abcd)
      } 
    catch (error) {
      console.log("error",error)
    }
  
  




  }




  const validateFirstName = () => { 
    setFirstNameError(firstName === "" ? "Please Enter Name ": "")
    setFirstNameError(firstName.trim().length < 4 ? 'Required: min 4 chars' : '');
  };

  const validateLastName = () => {
    setLastNameError(lastName === "" ? "Please Enter last Name" : "")
    setLastNameError(lastName.trim().length < 4 ? 'Required: min 4 chars' : '');
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const emailValidation = () => {
    setEmailError(lastName === "" ? "Please Enter Email" : "")
    setEmailError(!validateEmail(email) ? 'Please enter a valid email' : '');
  };

  const validatePassword = (password) => {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const passwordValidation = () => {
    setPasswordError(password === "" ? "Please Enter password" : "")
    setPasswordError(!validatePassword(password) ? 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.' : '');
  };

  const confirmPasswordValidation = () => {
    setConfirmPasswordError(confirmPassword === "" ? "Please Enter Confirm Password" : "")
    setConfirmPasswordError(confirmPassword !== password ? 'Passwords do not match' : '');
  };


  const numberValidate = (phoneNumber) => {
    const regex = /^\d{10}$/
    return regex.test(phoneNumber)
  }

  const phoneValidation = () => {
    if (numberValidate(phoneNumber)) {
      setphoneNumberError("")
    } else {
      setphoneNumberError("Enter Correct Phone Number")
    }

  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const validateField = () => {
    validateFirstName();
    validateLastName();
    emailValidation();
    passwordValidation();
    confirmPasswordValidation();
    phoneValidation();
  

    if (!firstName && !lastName && !email && !password && !confirmPassword && !phoneNumber) {
      Alert.alert("Please Enter All the Details");
      return;
    }
  

    if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || phoneNumberError) {
      Alert.alert('Enter correct details');
      return;
    }
  

    if (!selectedGender) {
      Alert.alert('Please select your gender');
      return;
    }
  
    if (!terms) {
      Alert.alert('Please agree to the Terms & Conditions');
      return;
    }
  
    // If all validations pass, send user data
    sendUserData();
    Alert.alert( 'Thank You ', 'Registered Successfully'   , [
      {
        text: 'OK' , onPress: ()=>{ navigation.navigate('Login')}
      }
    ]);
    // navigation.navigate('Login')
  };
  
  // const phoneValidation =(phoneNumber) =>{
  //   console.log( phoneNumber.data
  //   if (phoneNumber.length == 10) {
  //     setphoneNumberError('')

  //   } else {
  //     setphoneNumberError('Please Enter Correct Phone Number ')
  //   }
  // }





  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      {/* <View style={{ backgroundColor: "red",height: '25%', width: '100%'}}>
        <Image source={require('../images/test.jpg')} style={{ width:"100%",height:"100%" }} resizeMode='cover'/>
      </View> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 25, color: 'black', fontFamily: 'Laila-Bold' }}>NEO</Text>
        <Text style={{ fontSize: 25, color: 'blue', fontFamily: 'Laila-Bold' }}> STORE</Text>
      </View>





      <View style={{ borderRadius: 24 }}>
        <TextInput
          label='First Name'
          onBlur={validateFirstName}
          mode='outlined'
          activeOutlineColor='blue'
          left={<TextInput.Icon color='#2E64FE' icon='account' size={30} />}
          style={{ marginBottom: 15, backgroundColor: 'white' }}
          onChangeText={setFirstName}
          outlineStyle={{ borderRadius: 10 }}

        />
      </View>

      {firstNameError && <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}>{firstNameError}</Text>}


      <TextInput
        label='Last Name'
        onBlur={validateLastName}
        mode='outlined'
        activeOutlineColor='blue'
        left={<TextInput.Icon color='#2E64FE' icon='account' size={30} />}
        style={{ marginBottom: 15, backgroundColor: 'white' }}
        onChangeText={setLastName}
        outlineStyle={{ borderRadius: 10 }}
      />

      {lastNameError && <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}>{lastNameError}</Text>}


      <TextInput
        label='Email'
        onBlur={emailValidation}
        mode='outlined'
        activeOutlineColor='blue'
        left={<TextInput.Icon color='#2E64FE' icon='email' size={30} />}
        style={{ marginBottom: 15, backgroundColor: 'white' }}
        onChangeText={(text) => {
          setEmail(text);
          // emailValidation();
        }}
        outlineStyle={{ borderRadius: 10 }}
      />

      {emailError && <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}>{emailError}</Text>}


      <TextInput
        label='Password'
        mode='outlined'
        activeOutlineColor='blue'
        onBlur={() => passwordValidation(password)}
        left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}

        right={<TextInput.Icon color='#2E64FE' icon={showPassword ? 'eye' : "eye-off"} size={30} onPress={togglePassword} />}
        style={{ marginBottom: 15, backgroundColor: 'white' }}
        secureTextEntry={!showPassword}
        onChangeText={(text) => {
          setPassword(text);
          passwordValidation(text);
        }}
        outlineStyle={{ borderRadius: 10 }}
      />

      {passwordError && <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}>{passwordError}</Text> }


      <TextInput
        label='Confirm Password'
        onBlur={() => confirmPasswordValidation(confirmPassword)}
        mode='outlined'
        activeOutlineColor='blue'
        left={<TextInput.Icon color='#2E64FE' icon='account-lock-outline' size={30} />}
        right={<TextInput.Icon color='#2E64FE' icon={showConfirmPassword ? 'eye' : 'eye-off'} size={30} onPress={toggleConfirmPassword} />}
        style={{ marginBottom: 15, backgroundColor: 'white' }}
        secureTextEntry={!showConfirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          confirmPasswordValidation(text);
        }}
        outlineStyle={{ borderRadius: 10 }}
      />

      {confirmPasswordError && <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}>{confirmPasswordError}</Text> }



      <TextInput
        onBlur={phoneValidation}
        label='Phone Number'
        mode='outlined'
        activeOutlineColor='blue'
        maxLength={10}
        left={<TextInput.Icon color='#2E64FE' icon='cellphone' size={30} />}
        keyboardType='number-pad'
        style={{ marginBottom: 15, backgroundColor: "white" }}
        onChangeText={(text) => setPhoneNumber(text)}
        outlineStyle={{ borderRadius: 10 }}
      />
      {
        phoneNumberError ? <Text style={{ color: 'red', marginTop: -15, marginBottom: 15 }}> {phoneNumberError} </Text> : null
      }
      <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>Select Your Gender</Text>
        <View style={{ marginLeft: 20, marginTop: -5, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 0 }}>
            <Checkbox
              status={selectedGender === 'M' ? 'checked' : 'unchecked'}
              onPress={() => {
                setSelectedGender('M');
              }}
              color={selectedGender === 'M' ? 'blue' : 'gray'}
            />
          </View>
          <Text style={{ marginRight: 20, marginLeft: -5 }}> Male </Text>
          <Checkbox
            status={selectedGender === 'F' ? 'checked' : 'unchecked'}
            onPress={() => {
              setSelectedGender('F');
            }}
            color={selectedGender === 'F' ? 'blue' : 'gray'}
          />
          <Text style={{ marginLeft: -5 }}> Female </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Image style={{ width: 70, height: 70, marginRight: 40 }} source={require('/path/to/men.png')} /> */}
        {/* <Image style={{ width: 70, height: 70 }} source={require('/path/to/women.png')} /> */}
      </View>

      <View style={{ marginTop: -10, marginLeft: 100, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ marginLeft: -25 }}>
          <Checkbox
            status={terms ? 'checked' : 'unchecked'}
            onPress={() => setTerms(!terms)}
            color={terms ? 'blue' : 'gray'}
          />
        </View>

        <Text style={{ fontSize: 14 }}>I agree to the Terms & Conditions</Text>
      </View>

      <Pressable style={{ alignItems: 'center', marginBottom: 20, padding: 2, borderRadius: 50, backgroundColor: '#0030FF' }} onPress={validateField}>

        <Text style={{ fontSize: 20, color: 'white' , padding: 10}}>Register</Text>


      </Pressable>

      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Already have an account?</Text>
        <Text style={{ color: '#0030FF' }} onPress={() => navigation.navigate("Login")}> Sign In</Text>
      </View>



    </ScrollView>
  );
};

export default RegisterScreen;
