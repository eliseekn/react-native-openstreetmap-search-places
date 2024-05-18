import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import {HomeScreen} from './src/screens'
import {NavigationStack} from './src/interfaces'

const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    ...DefaultTheme.colors,
    colors: {},
}

const Stack = createNativeStackNavigator<NavigationStack>()

const App: React.FC = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </PaperProvider>
    )
}

export default App
