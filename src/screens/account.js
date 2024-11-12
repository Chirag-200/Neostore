import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../AuthContext';
import Toast from 'react-native-toast-message';  // Import Toast for success feedback

const AccountScreenQ = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    const handlePress = (option) => {
        console.log(`${option} pressed`);
    };

    const handleLogout = async () => {
        // Show confirmation alert
        Alert.alert(
            'Are You Sure?',
            'You want to logout.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            // Clear the access token from AsyncStorage
                            await AsyncStorage.removeItem('access_token');
                            // Optionally clear any other user data stored in AsyncStorage
                            await AsyncStorage.removeItem('user_data'); // if needed

                            // Log the user out in AuthContext
                            logout();

                            // Navigate the user to the login screen (assuming you're using react-navigation)
                            // navigation.navigate('Login'); // 'Login' should be your login screen name

                            // Show a Toast to confirm successful logout
                            Toast.show({
                                type: 'success',
                                text1: 'You have logged out successfully!',
                                position: 'top',
                            });

                            console.log('User has been logged out');
                        } catch (error) {
                            console.error('Error during logout', error);
                            Alert.alert('Error', 'Something went wrong while logging out.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.table}>
                <TouchableOpacity 
                    style={styles.row} 
                    onPress={() => {
                        handlePress('Update Details');
                        navigation.navigate('UpdateDetails');
                    }}
                    activeOpacity={0.99}
                    accessibilityLabel="Update Details"
                >
                    <Icon name="person-outline" size={24} color="blue" />
                    <Text style={styles.cell}>Update Details</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity 
                    style={styles.row} 
                    onPress={() => {
                        handlePress('Change Password');
                        navigation.navigate('ChangePassword');
                    }}
                    activeOpacity={0.7}
                    accessibilityLabel="Change Password"
                >
                    <Icon name="lock-outline" size={24} color="blue" />
                    <Text style={styles.cell}>Change Password</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("OrderList")} >
                    <Icon name="shopping-bag" size={24} color="blue" />
                    <Text style={styles.cell}>Order List</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity 
                    style={styles.row} 
                    onPress={handleLogout}
                    activeOpacity={0.99}
                    accessibilityLabel="Logout"
                >
                    <Icon name="logout" size={24} color="blue" />
                    <Text style={styles.cell}>Log Out</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Laila-SemiBold',
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
    },
    table: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 15,
        marginRight: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    cell: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
        color: 'black',
        fontFamily: 'Laila-Regular',
    },
    arrow: {
        fontSize: 25,
        color: 'black',
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
    },
});

export default AccountScreenQ;
