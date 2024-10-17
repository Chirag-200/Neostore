import React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/account';
import UpdateDetails from '../screens/updateDetails';
import HomeIcon from 'react-native-vector-icons/Entypo';
import AccountIcon from 'react-native-vector-icons/Entypo';
import AccountScreenQ from '../screens/account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreenQ} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateDetails" component={UpdateDetails} options={{ title: 'Update Details' }} />
        </Stack.Navigator>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='AccountStack'
                component={AccountStack}
                options={{
                    tabBarIcon: ({ color }) => <AccountIcon name='user' size={30} color={color} />,
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    );
}

const AllScreens = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Main' component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// const AccountScreen = ({ navigation }) => {
//     return (
//         <View>
//             <Button title="Update Details" onPress={() => navigation.navigate('UpdateDetails')} />
//         </View>
//     );
// };

export default AllScreens;
