import { ActivityIndicator, Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Screen } from '../screen'
import { Header, Text } from '@components'
import { WINDOW_WIDTH, helper, myColors } from '@utils'
import FastImage from 'react-native-fast-image'
import { useAppSelector } from '@redux/store'
import { sendRequest } from '@api'
import { AvatarFrame } from '@models'
import { FlashList } from '@shopify/flash-list'
import LinearGradient from 'react-native-linear-gradient'

const TABS = [
    {
        type: 'level',
        label: 'Level Frame',
        index: 1
    },
    {
        type: 'vip',
        label: 'Vip Frame',
        index: 2
    },
    {
        type: 'event',
        label: 'Eeven Frame',
        index: 3
    },
]

const ITEM_WIDTH = Math.round(WINDOW_WIDTH / 3)

const EditAvtFrame = () => {

    const { image, id } = useAppSelector(state => state.userSlice.document)
    const [listAvtFrame, setListAvtFrame] = useState<AvatarFrame[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState(TABS[0])
    const [selectedFrame, setSelectedFrame] = useState<AvatarFrame | null>(null)
    const animatedValue = useRef(new Animated.Value(1)).current
    const translateX = animatedValue.interpolate({
        inputRange: [1, TABS.length],
        outputRange: [0, ITEM_WIDTH * 2]
    })

    const getListAvtFrame = async (type: string) => {
        setLoading(true)
        const respone = await sendRequest('api/user/findDecorate', { userId: id, type })
        setLoading(false)
        if (respone.err == 200) {
            console.log(respone.data)
            setListAvtFrame(respone.data)
        } else {
            helper.showErrorMsg(respone.message)
        }
    }

    useEffect(() => {
        getListAvtFrame(selectedTab.type)
        Animated.timing(animatedValue, {
            toValue: selectedTab.index,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [selectedTab])

    const _renderTabs = useCallback(() => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {TABS.map(item => (
                    <TouchableOpacity
                        key={item.type}
                        onPress={() => {
                            if (loading || selectedTab.type == item.type) return
                            setSelectedTab(item)
                        }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                        }}>
                        <Text color={item.type == selectedTab.type ? myColors.primary : 'gray'}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                <Animated.View
                    style={{
                        position: 'absolute',
                        backgroundColor: myColors.primary,
                        height: 4, bottom: 0,
                        width: ITEM_WIDTH,
                        transform: [{ translateX }]
                    }}
                />
            </View>
        )
    }, [selectedTab, loading])

    return (
        <Screen>
            <Header text='Khung Avatar' />
            <View style={{ paddingHorizontal: 18, paddingVertical: 20, alignItems: 'center' }}>
                <View style={styles.imgContainer}>
                    <FastImage
                        source={image ? { uri: image } : require('@assets/images/avatar.png')}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        resizeMode='cover'
                    />
                    <FastImage
                        source={selectedFrame ? { uri: selectedFrame.image } : require('@assets/avatar/img1.png')}
                        style={{ position: 'absolute', width: 128, height: 128 }}
                    />
                </View>
            </View>
            <LinearGradient
                colors={[myColors.primary, myColors.primary_60]}
                style={{ margin: 12, paddingHorizontal: 10, paddingVertical: 14, borderRadius: 5 }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        source={selectedFrame ? { uri: selectedFrame.image } : require('@assets/avatar/img1.png')}
                        style={{ width: 80, height: 80 }}
                    />
                    <View style={{ flex: 1, paddingStart: 16, justifyContent: 'space-between' }}>
                        <Text type='regular_14' color='#fff'
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{selectedFrame?.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#fff',
                                borderRadius: 4,
                                paddingVertical: 4,
                                paddingHorizontal: 8
                            }}>
                                <Text type='medium_14' >{!selectedFrame?.isLock ? 'Sử dụng' : 'Lấy ngay'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            {_renderTabs()}
            {loading
                ? <ActivityIndicator
                    color={myColors.primary}
                    size='large'
                    style={{ height: 500, width: '100%' }} />
                :
                <View style={{ marginTop: 15, flex: 1 }}>
                    <FlashList
                        numColumns={3}
                        estimatedItemSize={ITEM_WIDTH}
                        data={listAvtFrame}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedFrame(item)}
                                style={{
                                    width: ITEM_WIDTH,
                                    height: ITEM_WIDTH,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {item.isLock && <View
                                    style={{ flex: 1 }}
                                />}
                                <FastImage
                                    style={{ width: ITEM_WIDTH - 30, height: ITEM_WIDTH - 30 }}
                                    source={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                <FastImage
                                    tintColor='gray'
                                    source={require('@assets/images/empty.png')}
                                    style={{ width: 80, height: 80 }} />
                                <Text color='gray'>List is empty</Text>
                            </View>
                        )}
                    />
                </View>
            }
        </Screen>
    )
}

export default EditAvtFrame

const styles = StyleSheet.create({
    imgContainer: {
        width: 90, height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

})