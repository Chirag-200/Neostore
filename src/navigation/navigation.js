
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import First from '../screens/splash/first';
import Second from '../screens/splash/second';
import Third from '../screens/splash/third';
import RegisterScreen from '../screens/register';
import LoginScreen from '../screens/login';

import ForgetPassword from '../screens/forget';
import HomeScreen from '../screens/home';
import AccountScreen from '../screens/account';
import CartScreen from '../screens/cart';
import SearchScreen from '../screens/search';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name='Cart' component={CartScreen} />
            <Tab.Screen name='Account' component={AccountScreen} />
        </Tab.Navigator>
    )
}
const AllScreens = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator

                screenOptions={{
                    headerShown: false
                }} >
                {/* <Stack.Screen name='Register' component={RegisterScreen}></Stack.Screen> */}
                <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>



                <Stack.Screen name= 'ForgetPassword' component={ForgetPassword}></Stack.Screen>

                {/* <Stack.Screen name='Home' component={HomeScreen} /> */}

                {/* <Stack.Screen name = "Main" component = {TabNavigator} /> */}


            </Stack.Navigator>
        </NavigationContainer>
        // <NavigationContainer>
        //     <Stack.Navigator>
        //         <Stack.Screen name= "First" component={First} />
        //         <Stack.Screen name= "Second" component={Second} />
        //         <Stack.Screen name= "Third" component={Third} />
        //     </Stack.Navigator>
        // </NavigationContainer>

    )
}

export default AllScreens 