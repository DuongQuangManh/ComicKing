import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, myColors} from '@utils';
import {AvatarFrame, IconText, Icons, Text} from '@components';
interface itemProps {
  item?: any;
}
const CommentTop: FC<itemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <AvatarFrame
          image={item?.senderInfo?.image}
          frame={item?.senderInfo?.avatarFrame}
          width={70}
          height={70}
        />
        <View
          style={{
            marginStart: 10,
            justifyContent: 'center',
          }}>
          <Text type="bold_18">{item?.senderInfo?.fullName}</Text>
          <TouchableOpacity style={styles.lvlBtn}>
            <Text color="#fff" type="medium_14">
              {`Lv ${item?.senderInfo?.level}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box2}>
        <Text type="semibold_16" style={{flex: 1}}>
          {item.content}
        </Text>

        <View style={styles.box2_1}>
          <Text style={{flex: 1}}>
            {item?.time ? item.time : '15:36 27/10/2023'}
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
                colorText={myColors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconText
                nameIcon="commenting-o"
                typeIcon={Icons.FontAwesome}
                text={item?.numOfComment}
                sizeIcon={16}
                colorText={myColors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentTop;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 30,
    height: 250,
    backgroundColor: myColors.gray,
    borderRadius: 18,
    marginStart: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 180,
  },
  box1: {
    flexDirection: 'row',
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
    marginTop: 10,
  },
  box2: {
    flex: 1,
    padding: 10,
  },
  box2_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
