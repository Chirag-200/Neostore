


















import React, { useState } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import GroupImages from '../../images/GroupImages';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

const TextInputComponent = () => {
    const { width, height } = Dimensions.get('window');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('email', email);

        try {
            const result = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/forgot', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log( 'result',result.data);
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error('Error:', error.response);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <>
            <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            <Image 
                source={GroupImages.Bubble2} 
                style={{ 
                    
                    // height: height * 0.48, // 90% of the screen height
                    // width: width * 0.88 // 81.5% of the screen width
                }} 
            />
            <Image 
                source={GroupImages.Bubble1} 
                style = {{ position : 'absolute'}}
                // style={{ 
                //     height: height * 0.4, // 79.5% of the screen height
                //     width: width * 0.75 // 65% of the screen width
                // }} 
            />
        </View>
        </View>

            <View>
                <Text style={{
                    fontSize: 28, color: 'black', fontFamily: 'Laila-Bold', 
                    marginLeft: width * 0.3, marginTop: height * 0.4
                }}> 
                    Hello, User 
                </Text>

                <Text style={{
                    marginTop: height * 0.05, 
                    marginLeft: width * 0.2
                }}>
                    Enter your Email for Verification 
                </Text>

                <TextInput 
                    label='Email'
                    mode='outlined'
                    activeOutlineColor='blue'
                    left={<TextInput.Icon color={'blue'} size={30} icon={'email'} />}
                    style={{ margin: 20 }}
                    onChangeText={setEmail}
                />

                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        margin: 20,
                        backgroundColor: 'rgb(15,84,251)',
                        padding: 10,
                        borderRadius: 50,
                        color: 'white',
                        fontFamily: 'Laila-Regular'
                    }}>
                        Submit 
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TextInputComponent;
