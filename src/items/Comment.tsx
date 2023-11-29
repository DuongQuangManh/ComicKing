import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import FastImage from 'react-native-fast-image';
import {AvatarFrame, IconText, Icons, Text} from '@components';
import {navigate} from '@navigations';
import { useAppTheme } from '@hooks';
interface itemProps {
  item?: any;
}
const Comment: FC<itemProps> = ({item}) => {
  const handerShowCommentDetail = () => {
    navigate('commentdetail', {item: item});
  };
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <AvatarFrame
          image={item?.senderInfo.image}
          frame={item?.senderInfo.avatarFrame}
          width={60}
          height={60}
        />
      </View>
      <View style={[styles.box2,{backgroundColor: theme.gray}]}>
        <Text type="bold_18">{item?.senderInfo.fullName}</Text>
        <View style={styles.lvlBtn}>
          <Text color="#fff" type="medium_12">
            {`Lv ${item?.senderInfo?.level}`}
          </Text>
        </View>
        <Text type="medium_16">{item?.content}</Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text>{item.time}</Text>
        </View>
        <View style={styles.box2_1}>
          <Text style={{flex: 1}}>
            {item?.createdAt
              ? helper.convertTimestamp(item.time)
              : 'hh:mm dd/MM/yy'}
          </Text>
          <View
            style={[
              styles.box1,
              {justifyContent: 'space-between', padding: 5},
            ]}>
            <View
              style={{width: 1, backgroundColor: myColors.text, marginEnd: 10}}
            />
            <TouchableOpacity>
              <IconText
                nameIcon="like1"
                typeIcon={Icons.AntDesign}
                text={item?.numOfLike}
                sizeIcon={16}
                colorText={theme.text}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handerShowCommentDetail}>
              <IconText
                nameIcon="commenting-o"
                typeIcon={Icons.FontAwesome}
                text={item?.numOfComment}
                sizeIcon={16}
                colorText={theme.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 20,
    padding: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    minHeight: 180,
  },

  box1: {
    flexDirection: 'row',
  },
  box2: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    marginStart: 10,
    backgroundColor: myColors.gray,
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
    marginTop: 5,
  },
  box2_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
