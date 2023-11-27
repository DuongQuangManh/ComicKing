import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {Home, ListCategory, Operation, Profile, Rank} from '@screens';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {myColors} from '@utils';
import {StatusBar} from 'react-native';
import { useAppTheme } from '@hooks';

const BottomTab = createBottomTabNavigator();
const TABBAR_HEIEGHT = 60;

interface ButtonTab {
  route: string;
  label: string;
  type: any;
  activeIcon: string;
  inActiveIcon: string;
  component: React.FC<any>;
  badge: number;
}

const tabArr: ButtonTab[] = [
  {
    route: 'home',
    label: 'Trang chủ',
    type: Icons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: Home,
    badge: 0,
  },
  // {
  //   route: 'category',
  //   label: 'Thể loại',
  //   type: Icons.AntDesign,
  //   activeIcon: 'appstore1',
  //   inActiveIcon: 'appstore-o',
  //   component: ListCategory,
  //   badge: 0,
  // },
  {
    route: 'operation',
    label: 'Hoạt động',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'star-four-points',
    inActiveIcon: 'star-four-points-outline',
    component: Operation,
    badge: 0,
  },
  // {
  //   route: 'rank',
  //   label: 'Xếp hạng',
  //   type: Icons.Ionicons,
  //   activeIcon: 'stats-chart',
  //   inActiveIcon: 'stats-chart-outline',
  //   component: Rank,
  //   badge: 0,
  // },
  {
    route: 'profile',
    label: 'Cá nhân',
    type: Icons.Ionicons,
    activeIcon: 'happy',
    inActiveIcon: 'happy-outline',
    component: Profile,
    badge: 0,
  },
];

interface TabBarButtonProps {
  buttonProps: BottomTabBarButtonProps;
  item: ButtonTab;
}

const TabBarButton: React.FC<TabBarButtonProps> = props => {
  const {item} = props;
  const {onPress, accessibilityState} = props.buttonProps;
  const focused = accessibilityState?.selected;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={onPress}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? myColors.primary : myColors.textHint}
          size={18}
        />
        <Text
          style={{marginTop: 3}}
          type={focused ? 'medium_12' : 'regular_12'}
          color={focused ? myColors.primary : myColors.textHint}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomNavigation = () => {
  const theme = useAppTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: TABBAR_HEIEGHT,
          position: 'absolute',
          backgroundColor: theme.background,
        },
      }}>
      {tabArr.map(item => (
        <BottomTab.Screen
          key={item.route}
          name={item.route}
          component={item.component}
          options={{
            tabBarButton: props => (
              <TabBarButton buttonProps={props} item={item} />
            ),
            tabBarShowLabel: false,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
