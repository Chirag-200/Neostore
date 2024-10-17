import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AccountScreenQ = ({ navigation }) => {
    const handlePress = (option) => {
        console.log(`${option} pressed`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.table}>
                <TouchableOpacity 
                    style={styles.row} 
                    onPress={() => {
                        handlePress('Update Details');
                        navigation.navigate('UpdateDetails');
                    }}
                    activeOpacity={0.7}
                    accessibilityLabel="Update Details"
                >
                    <Icon name="person-outline" size={24} color="gray" />
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
                    <Icon name="lock-outline" size={24} color="gray" />
                    <Text style={styles.cell}>Change Password</Text>
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
        borderColor: 'gray',
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
    },
    cell: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    arrow: {
        fontSize: 25,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
});

export default AccountScreenQ;
