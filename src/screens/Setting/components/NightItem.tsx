import React, { useEffect, useState } from "react";
import { Text } from '@components';
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { RadioButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setColorTheme } from '@redux/userSlice';
import { myColors } from "@utils";

interface Item {
    name: string,
    value: string,
}

const NightItem = () => {
    const dispatch = useAppDispatch();
    const data = [{ name: 'Off', value: 'light' }, { name: 'On', value: 'dark' }]
    const colorTheme = useAppSelector(state => state.userSlice.colorTheme)
    const [selectedItem, setSelectedItem] = useState(colorTheme === 'light' ? 0 : 1)

    useEffect(() => {
        const status = data[selectedItem].value
        dispatch(setColorTheme(status))
    }, [selectedItem])

    return (
        <View>
            {data.map((item: Item, index: number) =>
                <TouchableOpacity style={{ height: 60 }} onPress={() => setSelectedItem(index)} key={index.toString()}>
                    <View style={styles.container}>
                        <Text type="semibold_16" style={styles.text} color={colorTheme === 'light' ? myColors.text : myColors.transparentWhite}>
                            {item.name}
                        </Text>
                        <RadioButton
                            value={item.value}
                            status={index == selectedItem ? "checked" : "unchecked"}
                            onPress={() => setSelectedItem(index)} key={index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default NightItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 5
    },
    text: {
        width: "85%",
        marginStart: 15
    }
})