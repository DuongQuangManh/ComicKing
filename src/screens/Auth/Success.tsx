import { Button, Text } from "@components"
import { Screen } from "../screen"
import { navigate, StackParamList, reset } from '@navigations';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, StyleSheet } from "react-native";
import { useAppDispatch } from '@redux/store';
import { logoutAction } from '@redux/authSlice';

const Success = () => {
    const { message } = useRoute<RouteProp<StackParamList, 'success'>>().params;
    const dispatch = useAppDispatch()

    const nextScreen = () => {
        if (message == "changePassSuccess")
            dispatch(logoutAction());
        else if (message == "registerSuccess" || message == "fotgotPassSuccess")
            reset([{ name: 'login' }])
    }

    return (
        <Screen style={{ alignItems: "center" }}>
            <Image
                style={styles.image}
                source={require('@assets/images/img_success.jpeg')}
            />
            <Text
                type="bold_24"
                style={{ marginTop: 30, marginBottom: 70 }}>
                {message == 'changePassSuccess' ? "Change Password Success" : ""}
                {message == 'registerSuccess' ? "Register Success" : ""}
                {message == 'fotgotPassSuccess' ? "Password Retrieval Success" : ""}
            </Text>
            <Button
                text={"Back To Login"}
                borderRadius={10}
                height={45}
                width={200}
                onPress={nextScreen}
            />
        </Screen>
    )
}
export default Success

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 200,
        marginTop: 190,
    }
})