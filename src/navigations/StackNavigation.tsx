import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  ChangePassword,
  ForgotPassword,
  OtpVerification,
  Login,
  Splash,
  Register,
  Message,
  Loading,
  ConfirmMessage,
  // Menu,
  Notifications,
  Setting,
  Profile,
  Language,
  NighMode,
  EditProfile,
  Favorite,
  Search,
  ComicDetail,
  Comments,
  ReadComic,
  Infomation,
  EditAvtFrame,
  EditAvtTitle,
  Author,
  // Follow,
  Level,
  BuyCoins,
  ComicWorld,
  ListCategory,
  CategoryDetail,
  AuthorFollowing,
  ComicFollowing,
  ReadingHistory,
  Success,
  CommentDetail,
  Rank,
  Commented,
  ListVipTicket,
  ListCoinPackage,
  VipTicketDetail,
  TransactionDetail,
  TransactionHistory,
  TransactionStatus,
  ComicMore,
  MyVipTicket,
  NotificationDetail,
} from '@screens';
import {StackParamList, navigationRef} from '@navigations';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<StackParamList>();

export const Stacknavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={Splash} />

        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="otpVerification" component={OtpVerification} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />

        <Stack.Screen name="bottomNavigation" component={BottomNavigation} />

        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen
          name="notificationDetail"
          component={NotificationDetail}
        />

        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="infomation" component={Infomation} />
        <Stack.Screen name="language" component={Language} />
        <Stack.Screen name="nighmode" component={NighMode} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="editAvtFrame" component={EditAvtFrame} />
        <Stack.Screen name="editAvtTitle" component={EditAvtTitle} />
        <Stack.Screen name="favorite" component={Favorite} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="comicdetail" component={ComicDetail} />
        <Stack.Screen name="readcomic" component={ReadComic} />
        <Stack.Screen name="author" component={Author} />
        {/* <Stack.Screen name="follow" component={Follow} /> */}
        <Stack.Screen name="level" component={Level} />
        <Stack.Screen name="buycoins" component={BuyCoins} />
        <Stack.Screen name="comicWorld" component={ComicWorld} />
        <Stack.Screen name="listCategory" component={ListCategory} />
        <Stack.Screen name="categoryDetail" component={CategoryDetail} />
        <Stack.Screen name="authorFollowing" component={AuthorFollowing} />
        <Stack.Screen name="comicFollowing" component={ComicFollowing} />
        <Stack.Screen name="readingHistory" component={ReadingHistory} />
        <Stack.Screen name="success" component={Success} />
        <Stack.Screen name="rank" component={Rank} />
        <Stack.Screen name="commented" component={Commented} />
        <Stack.Screen name="listVipTicket" component={ListVipTicket} />
        <Stack.Screen name="listCoinPackage" component={ListCoinPackage} />
        <Stack.Screen name="vipTicketDetail" component={VipTicketDetail} />
        <Stack.Screen name="transactionDetail" component={TransactionDetail} />
        <Stack.Screen
          name="transactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="transactionStatus" component={TransactionStatus} />
        <Stack.Screen name="comicMore" component={ComicMore} />
        <Stack.Screen name="myVipTicket" component={MyVipTicket} />
        {/* common screens */}
        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}>
          <Stack.Screen name="message" component={Message} />
          <Stack.Screen name="loading" component={Loading} />
          <Stack.Screen name="confirmMessage" component={ConfirmMessage} />
          {/* <Stack.Screen name="menu" component={Menu} /> */}
          <Stack.Screen name="comments" component={Comments} />
          <Stack.Screen name="commentdetail" component={CommentDetail} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
