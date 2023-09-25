import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {IconText, Icons, Text} from '@components';
import {myColors} from '@utils';
interface itemProps {
  item?: any;
  index?: number;
}
const Chapter: FC<itemProps> = ({item, index}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text type="semibold_18">{`${index}. Chapter ${index}`}</Text>
        <View style={styles.box1}>
          <Text>22/09/2023</Text>
          <View style={{flexDirection: 'row'}}>
            <IconText
              nameIcon="like1"
              typeIcon={Icons.AntDesign}
              colorIcon={myColors.primary}
              sizeIcon={18}
              text="15.7k"
              colorText={myColors.text}
            />
            <IconText
              nameIcon="commenting"
              typeIcon={Icons.Fontisto}
              colorIcon={myColors.primary}
              sizeIcon={18}
              text="15.7k"
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
