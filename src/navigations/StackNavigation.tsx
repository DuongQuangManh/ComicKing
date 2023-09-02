import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    ChangePassword,
    ForgotPassword,
    OtpVerification,
    Login,
    Splash,
    Register
} from '@screens';
import { TStackParamList } from './params.type';
import { navigationRef } from './rootNavigation';

const Stack = createNativeStackNavigator<TStackParamList>();

export const Stacknavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splash" component={Splash} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
                <Stack.Screen name='changePassword' component={ChangePassword} />
                <Stack.Screen name='otpVerification' component={OtpVerification} />
                <Stack.Screen name='forgotPassword' component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};