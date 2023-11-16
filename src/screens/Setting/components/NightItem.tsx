import React from "react";
import { Icon, Icons, Text } from '@components';
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface NightItemProps {
    name: string;
    onPress: () => void;
    isSelect?: boolean;
}

const NighItem: React.FC<NightItemProps> = ({
    name,
    isSelect = false,
    onPress
}) => {
    return (
        <TouchableOpacity style={{ height: 60 }} onPress={onPress}>
            <View style={styles.container}>
                <Text
                    type="semibold_16"
                    style={styles.text}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default NighItem;

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