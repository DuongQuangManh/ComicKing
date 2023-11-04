import {
    ActivityIndicator,
    Animated,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { Screen } from '../screen'
import { Header, Icon, Icons, Text } from '@components'
import { WINDOW_WIDTH, helper, myColors, myTheme } from '@utils'
import FastImage from 'react-native-fast-image'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { sendRequest } from '@api'
import { Decorate } from '@models'
import { FlashList } from '@shopify/flash-list'
import LinearGradient from 'react-native-linear-gradient'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList } from '@navigations'
import { changeAvatarFrameAction } from '@redux/userSlice'

type TabType = {
    type: 'level' | 'event' | 'vip',
    index: number,
    label: string
}

type StateType = {
    listAvtFrame: Decorate[]
    loading: boolean
    selectedTab: TabType,
    selectedFrame: Decorate | null,
    haveCount: number
}

const TABS: TabType[] = [
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
        label: 'Event Frame',
        index: 3
    },
]

const ITEM_WIDTH = Math.round(WINDOW_WIDTH / 3)

const EditAvtFrame = () => {
    const dispatch = useAppDispatch()
    const {
        vipPoint, levelPoint, avatarFrame,
        document: { image, id },
    } = useAppSelector(state => state.userSlice)
    const [state, setState] = useState<StateType>({
        listAvtFrame: [],
        loading: true,
        selectedTab: TABS[0],
        selectedFrame: avatarFrame ? { ...avatarFrame } : null,
        haveCount: 0
    })
    const { loading, selectedFrame, selectedTab, listAvtFrame, haveCount } = state

    const animatedValue = useRef(new Animated.Value(1)).current
    const translateX = animatedValue.interpolate({
        inputRange: [1, TABS.length],
        outputRange: [0, ITEM_WIDTH * 2]
    })

    const getListAvtFrame = async (type: string) => {
        setState(pre => ({ ...pre, loading: true }))
        const respone = await sendRequest('api/user/findDecorate', { userId: id, type })
        setState(pre => ({ ...pre, loading: false }))
        const { err, message, data = [], haveCount = 0 } = respone
        if (err == 200) {
            setState(pre => ({ ...pre, listAvtFrame: data, haveCount }))
        } else {
            helper.showErrorMsg(message)
        }
    }

    useEffect(() => {
        getListAvtFrame(selectedTab?.type)
        Animated.timing(animatedValue, {
            toValue: selectedTab?.index,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [selectedTab])

    const handleClick = () => {
        if (selectedFrame) {
            if (selectedFrame.isLock) {
                navigateToHowToGet()
            } else {
                changeAvatarFrame(selectedFrame.id)
            }
        }
    }

    const changeAvatarFrame = (avatarFrameId: string) => {
        if (avatarFrameId != avatarFrame?.id) {
            dispatch(changeAvatarFrameAction({ userId: id, avatarFrameId }))
        }
    }

    const navigateToHowToGet = () => {

    }

    const _renderTabs = useMemo(() => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {TABS.map(item => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={item.type}
                        onPress={() => {
                            if (loading || selectedTab.type == item.type) return
                            setState(pre => ({ ...pre, selectedTab: item }))
                        }}
                        style={styles.tabBtn}>
                        <Text color={item.type == selectedTab.type ? myColors.primary : 'gray'}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                <Animated.View style={[{ transform: [{ translateX }] }, styles.dividerTab]} />
            </View>
        )
    }, [selectedTab, loading])

    const _renderItem = useCallback(({ item }: { item: Decorate }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setState(pre => ({ ...pre, selectedFrame: item }))}
                style={styles.btnItem}>
                {item.id == selectedFrame?.id && (
                    <View style={{
                        position: 'absolute',
                        width: ITEM_WIDTH - 15,
                        height: ITEM_WIDTH - 15,
                        borderRadius: 100,
                        backgroundColor: item.isLock ? 'gray' : myColors.primary,
                        opacity: 0.15
                    }} />
                )}
                <FastImage
                    tintColor={item.isLock ? 'gray' : ''}
                    style={{ width: ITEM_WIDTH - 30, height: ITEM_WIDTH - 30 }}
                    source={{ uri: item.image }}
                />
                {item.isLock && <Icon
                    color={myColors.primary}
                    type={Icons.MaterialIcons}
                    name='lock'
                    size={24}
                    style={{ position: 'absolute' }}
                />}
            </TouchableOpacity>
        )
    }, [selectedFrame])

    return (
        <Screen>
            <Header text='Khung Avatar' />
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <FastImage
                        source={image ? { uri: image } : require('@assets/images/avatar.png')}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        resizeMode='cover'
                    />
                    <FastImage
                        source={avatarFrame ? { uri: avatarFrame.image } : require('@assets/images/avatarFrame.png')}
                        style={{ position: 'absolute', width: 122, height: 122 }}
                    />
                </View>
                <View style={{ paddingStart: 40 }}>
                    <Text type='regular_15'>* Level point : {levelPoint}</Text>
                    <Text type='regular_15'>* Vip point : {vipPoint}</Text>
                    <Text type='regular_15'>* Đang có : {haveCount}</Text>
                </View>
            </View>
            <LinearGradient
                colors={[myColors.primary, myColors.primary_80]}
                style={styles.linearContainer}
            >
                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        source={selectedFrame ? { uri: selectedFrame.image } : require('@assets/images/avatarFrame.png')}
                        style={{ width: 80, height: 80 }}
                    />
                    <View style={{ flex: 1, paddingStart: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text type='regular_14' color='#fff'
                                numberOfLines={2}
                                ellipsizeMode='tail'
                            >* {selectedFrame?.description}</Text>
                            <Text color='#fff' type='regular_14'>* Require point : {selectedFrame?.needPoint}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {selectedFrame?.id != avatarFrame?.id &&
                                (<TouchableOpacity onPress={handleClick} style={styles.actionBtn}>
                                    <Text type='medium_14' >{!selectedFrame?.isLock ? ('Sử dụng') : 'Lấy ngay'}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                    </View>
                </View>
            </LinearGradient>
            {_renderTabs}
            {loading
                ? <ActivityIndicator
                    color={myColors.primary}
                    size='large'
                    style={{ height: 250, width: '100%' }} />
                :
                <FlatList
                    numColumns={3}
                    style={{ backgroundColor: '#e8e8e84f' }}
                    // estimatedItemSize={ITEM_WIDTH}
                    data={listAvtFrame}
                    renderItem={_renderItem}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <FastImage
                                tintColor='gray'
                                source={require('@assets/images/empty.png')}
                                style={{ width: 80, height: 80 }} />
                            <Text color='gray'>List is empty</Text>
                        </View>
                    )}
                />
            }
        </Screen>
    )
}

export default EditAvtFrame

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgContainer: {
        width: 90, height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    btnItem: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtn: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    linearContainer: {
        margin: 12,
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderRadius: 5
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    dividerTab: {
        position: 'absolute',
        backgroundColor: myColors.primary,
        height: 4, bottom: 0,
        width: ITEM_WIDTH,
    }
})