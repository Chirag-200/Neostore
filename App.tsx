// App.js
import React from 'react';
import { AuthProvider } from './src/AuthContext';
import AllScreens from './src/navigation/navigation';



const App = () => {
    return (
        <AuthProvider>
            <AllScreens />
        </AuthProvider>
    );
};

export default App;
