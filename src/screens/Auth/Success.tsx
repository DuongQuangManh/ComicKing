import { Button, Icon, Icons, Text } from "@components"
import { Screen } from "../screen"
import { goBack, navigate } from '@navigations';
import { helper, myColors } from '@utils';
import { useState } from "react";


const Success = () => {
    const [screen, setscreen] = useState(0)

    const nextScreen = () => {
        if (screen == 0 || screen == 1)
            navigate('login')
        else
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
                {screen == 0 ? "Register Success" : "Change Password Success"}
                {screen == 1 ? "Password Retrieval Success" : "Change Password Success"}
                </Text>
            <Button
                text={
                    screen == 0 || screen == 1 ? "Back To Login" : "Continue"
                }
                borderRadius={10}
                height={35}
                onPress={nextScreen}
            />
        </Screen>
    )
}
export default Success