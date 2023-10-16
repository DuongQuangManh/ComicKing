import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Icons, Text } from '@components'
import { Home, Profile } from '@screens'
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { myColors } from '@utils'
import { StatusBar } from 'react-native'

const BottomTab = createBottomTabNavigator()
const TABBAR_HEIEGHT = 50

interface ButtonTab {
    route: string,
    label: string,
    type: any,
    activeIcon: string,
    inActiveIcon: string,
    component: React.FC<any>,
    badge: number
}

const tabArr: ButtonTab[] = [
    {
        route: 'home',
        label: 'Home',
        type: Icons.Ionicons,
        activeIcon: 'home',
        inActiveIcon: 'home-outline',
        component: Home,
        badge: 0
    },
    {
        route: 'profile',
        label: 'Profile',
        type: Icons.Ionicons,
        activeIcon: 'happy',
        inActiveIcon: 'happy-outline',
        component: Profile,
        badge: 0
    },
]

interface TabBarButtonProps {
    buttonProps: BottomTabBarButtonProps,
    item: ButtonTab
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
    const { item } = props
    const { onPress, accessibilityState } = props.buttonProps
    const focused = accessibilityState?.selected

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
                <Icon type={item.type}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={focused ? myColors.primary : myColors.textHint}
                    size={23}
                />
                <Text
                    type={focused ? 'semibold_14' : 'medium_14'}
                    color={focused ? myColors.primary : myColors.textHint}
                >{item.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const BottomNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: TABBAR_HEIEGHT,
                position: 'absolute',
                backgroundColor: 'white'
            }
        }}
        >
            {tabArr.map((item) => (
                <BottomTab.Screen
                    key={item.route}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarButton: (props) => (
                            <TabBarButton buttonProps={props} item={item} />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
            ))}
        </BottomTab.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})
