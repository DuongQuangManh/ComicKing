import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {AvatarFrame, Icon, Icons, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {helper, myColors} from '@utils';
import {navigate} from '@navigations';
import {getProfileAction} from '@redux/userSlice';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    document: {id, fullName, image},
    avatarFrame,
    avatarTitle,
    wallet,
  } = useAppSelector(state => state.userSlice);
  const theme = useAppTheme();
  return (
    <Screen
      unsafe
      backgroundColor={theme.gray}
      preset="scroll"
      translucent
      statusBarColor="transparent"
      style={{paddingBottom: 100}}>
      <TouchableOpacity
        style={{position: 'absolute', top: 34, right: 10, zIndex: 10}}
        onPress={() => navigate('setting')}>
        <Icon
          name={'settings-sharp'}
          color={theme.text}
          type={Icons.Ionicons}
          size={20}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={[theme.primary_60, theme.gray]}
        style={{paddingTop: 28, paddingHorizontal: 18, paddingBottom: 18}}>
        <View style={{height: 40}}></View>
        <View style={{flexDirection: 'row', paddingBottom: 20}}>
          <AvatarFrame
            title={avatarTitle?.image}
            image={image}
            frame={avatarFrame?.image}
            isTitle
          />
          <View style={{paddingStart: 15, flex: 1}}>
            <Text style={{marginVertical: 8}}>{fullName}</Text>
            <TouchableOpacity
              style={styles.lvlBtn}
              onPress={() => navigate('level')}>
              <Text color="#fff" type="medium_14">
                Lv{wallet?.level}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate('infomation');
              dispatch(getProfileAction({id}));
            }}
            style={styles.editBtn}>
            <Icon type={Icons.FontAwesome} name="edit" size={22} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 5,
              right: 0,
            }}>
            <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
              <Text>Xu</Text>
              <Text type="medium_18">
                {helper.displayMoney(wallet?.coin || 0)}
              </Text>
            </View>
            <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
              <Text>Exp</Text>
              <Text type="medium_18">
                {helper.displayMoney(wallet?.exp || 0)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={[styles.containerOption,{backgroundColor: theme.background}]}>
        <TouchableOpacity
          onPress={() => {
            if (wallet.ticket?.vipTicket?.id) {
              navigate('myVipTicket', {
                vipTicketId: wallet?.ticket.vipTicket?.id,
              });
            } else {
              navigate('listVipTicket');
            }
          }}
          style={styles.rowOption}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="crown-outline"
            size={18}
          />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Thẻ tháng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowOption}
          onPress={() => navigate('listCoinPackage')}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="star-shooting-outline"
            size={18}
          />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Nạp xu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowOption}
          onPress={() => navigate('commented')}>
          <Icon type={Icons.FontAwesome} name="comment-o" size={18} />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Bình luận của tôi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowOption}
          onPress={() => navigate('level')}>
          <Icon type={Icons.Ionicons} name="layers" size={18} />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Level của tôi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('editAvtFrame', {avatarFrame})}
          style={styles.rowOption}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="image-frame"
            size={18}
          />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Khung Avatar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('editAvtTitle', {avatarTitle})}
          style={styles.rowOption}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="shield-star-outline"
            size={18}
          />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Danh hiệu
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.containerOption,{backgroundColor: theme.background}]}>
        <TouchableOpacity
          onPress={() => {
            navigate('comicFollowing');
          }}
          style={styles.rowOption}>
          <Icon type={Icons.FontAwesome6} name="book-quran" size={18} />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Truyện đang theo dõi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('authorFollowing')}
          style={styles.rowOption}>
          <Icon type={Icons.FontAwesome5} name="user-astronaut" size={18} />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Tác giả đang theo dõi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('readingHistory');
          }}
          style={styles.rowOption}>
          <Icon type={Icons.MaterialCommunityIcons} name="history" size={18} />
          <Text type="medium_14" style={{flex: 1, paddingStart: 12}}>
            Lịch sử đọc truyện
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  containerOption: {
    marginHorizontal: 18,
    backgroundColor: myColors.background,
    borderRadius: 5,
    elevation: 1,
    padding: 12,
    marginTop: 20,
  },
  imgContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
  },
  editBtn: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 6,
    right: 8,
  },
  containerFl: {
    flexDirection: 'row',
  },
  itemFl: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10,
  },
});
