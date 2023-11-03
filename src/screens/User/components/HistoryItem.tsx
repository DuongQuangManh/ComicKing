import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native"
import { Icon, Icons, Text } from '@components';
import { WINDOW_WIDTH, myColors } from '@utils';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/store';
import { push } from '@navigations';
import FastImage from "react-native-fast-image";
import { IComic } from "@models";


type ItemProps = {
    name:string
    readingChapterIndex:number
    description:string
    image: string
};

const HistoryItem: React.FC<ItemProps> = ({ name,readingChapterIndex,description,image }) => {
    const dispatch = useAppDispatch();
    const { historyReading = [] } = useAppSelector(state => state.userSlice);

    return (
        <TouchableOpacity style={styles.container}>
            <FastImage
                style={styles.image}
                source={{uri:image}}/>
            <View style={styles.docContainer}>
                <Text type="medium_12">{name}</Text>
                <Text type="light_12" color={myColors.textHint}>{description}</Text>
                <Text type="light_12" color={myColors.text}>{readingChapterIndex}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HistoryItem

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,
        flexDirection:"row"
    },
    docContainer: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100 * 1.47,
        borderRadius: 5,
    },
})