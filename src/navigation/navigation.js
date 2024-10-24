// AllScreens.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthContext';
import AccountScreenQ from '../screens/account';
import UpdateDetails from '../screens/updateDetails';
import HomeScreen from '../screens/home';
import SearchScreen from '../screens/search';
import CartScreen from '../screens/cart';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import HomeIcon from 'react-native-vector-icons/Entypo';
import AccountIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/Entypo';
import CartIcon from 'react-native-vector-icons/Entypo';
import ProductList from '../screens/products';
import ProductInfo from '../screens/productInfo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreenQ} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateDetails" component={UpdateDetails} options={{ title: 'Update Details', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

 function HomeComponent () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='ProductList' component={ProductList} options={{headerShown: false}}/>
          <Stack.Screen name='ProductInfo' component={ProductInfo} options={{headerShown: false}} />
        </Stack.Navigator>
    )
 }

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='HomeTab'
                component={HomeComponent}
                options={{
                    tabBarIcon: ({ color }) => <HomeIcon name='home' size={30} color={color} />,
                    tabBarLabel: 'Home',
                    headerShown: false
                }}
            />
           
            <Tab.Screen
                name='CartTab'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => <CartIcon name='shopping-cart' size={30} color={color} />,
                    tabBarLabel: 'Cart',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='AccountTab'
                component={AccountStack}
                options={{
                    tabBarIcon: ({ color }) => <AccountIcon name='user' size={30} color={color} />,
                    tabBarLabel: 'Account',
                }}
            />
        </Tab.Navigator>
    );
}

const AllScreens = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <>

                        <Stack.Screen name='Main' component={TabNavigator} />
                      
                    </>
                ) : (
                    <Stack.Screen name='Auth' component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AllScreens;
