// App.js
import React from 'react';
import { AuthProvider } from './src/AuthContext';
import AllScreens from './src/navigation/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';



const App = () => {
    return (
        <Provider store = {store}>
        <AuthProvider>
            <AllScreens />
        </AuthProvider>
        </Provider>
    );
};

export default App;
