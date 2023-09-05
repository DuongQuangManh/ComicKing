import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    ChangePassword,
    ForgotPassword,
    OtpVerification,
    Login,
    Splash,
    Register,
    Message,
    Loading,
    ConfirmMessage
} from '@screens';
import { StackParamList, navigationRef } from '@navigations';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<StackParamList>();

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

                <Stack.Screen name='bottomHome' component={BottomTabNavigation} />

                {/* common screens */}
                <Stack.Group
                    screenOptions={{
                        presentation: 'transparentModal',
                        animation: 'fade'
                    }}>
                    <Stack.Screen name='message' component={Message} />
                    <Stack.Screen name='loading' component={Loading} />
                    <Stack.Screen name='confirmMessage' component={ConfirmMessage} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};