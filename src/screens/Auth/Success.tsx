import { Button, Icon, Icons, Text } from "@components"
import { Screen } from "../screen"
import { goBack, navigate, StackParamList,reset } from '@navigations';
import { RouteProp, useRoute } from '@react-navigation/native';
import { helper, myColors } from '@utils';
import { useState } from "react";
import { Image, StyleSheet } from "react-native";


const Success = () => {
    const { message } = useRoute<RouteProp<StackParamList, 'success'>>().params;

    const nextScreen = () => {
        if (message == "changePassSuccess")
            navigate('profile')
        else if(message == "registerSuccess" || message == "forgotPassSuccess")
            navigate('login')
    }

    return (
        <Screen style={{alignItems:"center"}}>
            {/* <Icon
                name="checkmark-circle"
                size={300}
                color="red"
                type={Icons.Ionicons}
            /> */}
            <Image
                style={styles.image}
                source={require('@assets/images/img_success.jpeg')}
            />
            <Text
                type="bold_24"
                style={{marginVertical:50}}>
                {message == 'changePassSuccess' ? "Change Password Success" : ""}
                {message == 'registerSuccess' ? "Register Success" : ""}
                {message == 'fotgotPassSuccess' ? "Password Retrieval Success" : ""}
            </Text>
            <Button
                text={
                    message == 'fotgotPassSuccess' || message == "registerSuccess" ? "Back To Login" : "Back To ProFile"
                }
                borderRadius={10}
                height={45}
                width={200}
                textColor="black"
                buttonColor="white"
                onPress={nextScreen}
            />
        </Screen>
    )
}
export default Success

const styles = StyleSheet.create({
    image:{
        width:"80%",
        height:200,
        marginTop:200,
    }
})