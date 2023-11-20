import React from "react";
import { Icon, Icons, Text } from '@components';
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { RadioButton } from "react-native-paper";

interface NightItemProps {
    name: string;
    onPress: () => void;
    isSelect?: boolean;
    value: any;
}

const NightItem: React.FC<NightItemProps> = ({
    name,
    isSelect = false,
    onPress,
    value
}) => {
    return (
        <TouchableOpacity style={{ height: 60 }} onPress={onPress}>
            <View style={styles.container}>
                <Text type="semibold_16" style={styles.text}>
                    {name}
                </Text>
                <RadioButton
                    value={value}
                    status={isSelect ? 'checked' : 'unchecked'}
                    onPress={onPress}
                />
            </View>
        </TouchableOpacity>
    )
}

export default NightItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center"
    },
    text: {
        marginStart: 15
    }
})