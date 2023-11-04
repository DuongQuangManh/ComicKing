import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {IconText, Icons, Text} from '@components';
import {myColors} from '@utils';
import {navigate} from '@navigations';
interface itemProps {
  item?: any;
  index?: number;
  comicId?: string;
}
const Chapter: FC<itemProps> = ({item, comicId}) => {
  const handlerClick = () => {
    navigate('readcomic', {id: comicId, chapter: item.index});
  };
  return (
    <TouchableOpacity onPress={handlerClick}>
      <View style={styles.container}>
        <Text
          type="semibold_16"
          color={
            item.isRead ? '#616161dc' : myColors.text
          }>{`${item.index}. Chapter ${item.index}`}</Text>
        <View style={styles.box1}>
          <Text color={item.isRead ? '#616161dc' : myColors.text}>
            {item.updatedAt}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <IconText
              nameIcon="like1"
              typeIcon={Icons.AntDesign}
              colorIcon={myColors.primary}
              sizeIcon={18}
              text={item.numOfLike}
              colorText={myColors.text}
            />
            <IconText
              nameIcon="commenting"
              typeIcon={Icons.Fontisto}
              colorIcon={myColors.primary}
              sizeIcon={18}
              text={item.numOfComment}
              colorText={myColors.text}
            />
            <IconText
              nameIcon="local-fire-department"
              typeIcon={Icons.MaterialIcons}
              sizeIcon={18}
              colorIcon="#f77c00"
              text={item.numOfView}
              colorText={myColors.text}
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
    padding: 5,
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
