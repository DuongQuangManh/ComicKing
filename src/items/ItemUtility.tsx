import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Icon, Text} from '@components';
import {myColors} from '@utils';
interface itemProps {
  item?: any;
}
const ItemUtility: FC<itemProps> = ({item}) => {
  const isSelect = item.id === 1;
  return (
    <TouchableOpacity onPress={item.onClick}>
      <View
        style={[
          styles.container,
          {backgroundColor: isSelect ? myColors.blackCustom : undefined},
        ]}>
        <Icon
          type={item.typeIcon}
          name={item.nameIcon}
          color={isSelect ? myColors.background : myColors.text}
        />
        <Text
          type="semibold_16"
          style={[
            styles.text,
            {color: isSelect ? myColors.background : myColors.text},
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemUtility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingStart: 20,
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    marginStart: 20,
  },
});
