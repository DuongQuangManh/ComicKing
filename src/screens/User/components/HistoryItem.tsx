import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native"
import { Icon, Icons, Text } from '@components';
import { WINDOW_WIDTH, myColors } from '@utils';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/store';
import { push } from '@navigations';
import FastImage from "react-native-fast-image";
import { IComic } from "@models";


type ItemProps = {
    name: string
    readingChapterIndex: number
    description: string
    image: string
    onPress: () => void
};

const HistoryItem: React.FC<ItemProps> = ({ name, readingChapterIndex, description, image, onPress }) => {
    const dispatch = useAppDispatch();
    const { historyReading = [] } = useAppSelector(state => state.userSlice);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FastImage
                style={styles.image}
                source={{ uri: image }} />
            <View style={styles.docContainer}>
                <View style={{flex:1}}>
                    <Text type="medium_17">{name}</Text>
                    <Text type="regular_14" numberOfLines={2} ellipsizeMode="tail">{description}</Text>
                </View>

                <View style={{width:"100%"}}>
                    <Text style={{textAlign:"right"}} type="medium_16" >Chapter: {readingChapterIndex}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default HistoryItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        margin: 6,
        paddingStart:5,
        flexDirection: "row",
    },
    docContainer: {
        paddingVertical: 12,
        flex: 1,
        paddingStart: 15,
        paddingEnd: 20,
        height: '100%',
    },
    image: {
        width: 100,
        height: 100 * 1.40,
        borderRadius: 5,
    },
})