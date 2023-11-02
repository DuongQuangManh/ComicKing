import { Button, Icon, Icons, Text } from "@components"
import { Screen } from "../screen"
import { goBack, navigate, StackParamList } from '@navigations';
import { RouteProp, useRoute } from '@react-navigation/native';
import { helper, myColors } from '@utils';
import { useState } from "react";


const Success = () => {
    const { message } = useRoute<RouteProp<StackParamList, 'editprofile'>>().params;

    const nextScreen = () => {
        if (message == 'changePass')
            navigate('profile')
    }

    return (
        <Screen backgroundColor={myColors.background}>
            <Icon
                name="checkmark-circle"
                size={30}
                color="red"
                type={Icons.Ionicons}
            />
            <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
                {message == 'changePass' ? "Change Password Success" : ""}
            </Text>
            <Button
                text={
                    message == 'changePassword' ? "Back To Profile" : ""
                }
                borderRadius={10}
                height={35}
                onPress={nextScreen}
            />
        </Screen>
    )
}
export default Success