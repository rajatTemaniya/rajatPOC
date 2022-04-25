/**
 * Sample React Native App
 * Team Mobility warrior 
 * Team 5 Pandaw
 * Always try to write cleaner code As you can 
 * Don't forget to write small explaination about your code for future you :-)
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
import { ThemeContextProvider } from './styles/ThemeProviderContext';
import Splash from './screens/splash'

const Stack = createNativeStackNavigator()

function App() {

  const [showSplash, setShowSplash] = useState(true)

  // This will execute once for splash screen login
  useEffect(() => {
    // This will execute after 4 Second, before this Splash will do it's activity as you seen
    setTimeout(() => {
      setShowSplash(false)
    }, 4000);
  }, [])
  
  return (
    <ThemeContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ 
            headerStyle: {
             backgroundColor: '#3e3d4d',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          }}>
              {/* This will execute once then it will be removed from Navigation stack */}
              { showSplash ? <Stack.Screen  name="Splash" component={Splash} options={{headerShown: false}}/> : null }
              <Stack.Screen  name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContextProvider>
  );
};

export default App;
