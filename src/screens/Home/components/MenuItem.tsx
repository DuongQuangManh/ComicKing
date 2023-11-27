import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Icon, Icons, Text} from '@components';
import {myColors} from '@utils';
import { useAppSelector } from '@redux/store';
import { useAppTheme } from '@hooks';
interface MenuItemProps {
  name: string;
  iconName: string;
  iconType?: any;
  onPress: () => void;
  isSelect?: boolean;
}
const MenuItem: FC<MenuItemProps> = ({
  name,
  iconName,
  iconType = Icons.Ionicons,
  onPress,
  isSelect = false,
}) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity style={{height: 60}} onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: isSelect ? myColors.blackCustom : undefined},
        ]}>
        <Icon
          type={iconType}
          name={iconName}
          color={theme.text}
          size={22}
        />
        <Text
          type="semibold_16"
          style={[
            styles.text,
            {color: theme.text},
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MenuItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingStart: 20,
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    marginStart: 15,
  },
});
