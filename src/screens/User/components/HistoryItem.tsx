import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native"
import { IComic } from '@models';
import { Icon, Icons, Text } from '@components';
import { WINDOW_WIDTH, myColors } from '@utils';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/store';
import { push } from '@navigations';
import FastImage from "react-native-fast-image";


type ComponentProps = {
    listComic: IComic[]
};

const HistoryItem: React.FC<ComponentProps> = ({ listComic = [] }) => {
    const dispatch = useAppDispatch();
    const { historyReading = [] } = useAppSelector(state => state.userSlice);

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                {listComic.slice()?.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            push('comicdetail', { id: item.id });
                        }}
                        key={index}
                        style={styles.itemContainer}>
                        <FastImage source={{ uri: item.image }} style={styles.image} />
                        <View style={{ flex: 1, paddingHorizontal: 5, paddingVertical: 5 }}>
                            <View style={{ flex: 1 }}>
                                <Text type="medium_12">{item.name}</Text>
                                <Text
                                    type="light_12"
                                    color={myColors.textHint}
                                    numberOfLines={4}
                                    ellipsizeMode="tail">
                                    {item.description}
                                </Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            />
        </View>
    )
}

export default HistoryItem

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",

    },
    image: {
        width: 100,
        height: 100 * 1.47,
        borderRadius: 5,
    },
})