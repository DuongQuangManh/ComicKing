import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {IconText, Icons, Text} from '@components';
import {myColors} from '@utils';
import {navigate} from '@navigations';
interface itemProps {
  item?: any;
  index?: number;
  readingChapter?: boolean;
  onPress: () => void;
}
const Chapter: FC<itemProps> = ({item, readingChapter, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text
          type="medium_16"
          color={
            readingChapter == item.index
              ? myColors.primary
              : item.isRead
              ? '#616161dc'
              : myColors.text
          }>{`${item.index}. Chapter ${item.index}`}</Text>
        <View style={styles.box1}>
          <Text
            type="regular_14"
            color={item.isRead ? '#616161dc' : myColors.text}>
            {item.updatedAt}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <IconText
              nameIcon="like1"
              typeIcon={Icons.AntDesign}
              colorIcon={myColors.primary}
              sizeIcon={15}
              text={item.numOfLike}
              colorText={myColors.text}
              textType="medium_14"
            />
            <IconText
              nameIcon="commenting"
              typeIcon={Icons.Fontisto}
              colorIcon={myColors.primary}
              sizeIcon={15}
              text={item.numOfComment}
              colorText={myColors.text}
              textType="medium_14"
            />
            <IconText
              nameIcon="local-fire-department"
              typeIcon={Icons.MaterialIcons}
              sizeIcon={15}
              colorIcon="#f77c00"
              text={item.numOfView}
              colorText={myColors.text}
              textType="medium_14"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomColor: myColors.textHint,
    borderBottomWidth: 1,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
});
