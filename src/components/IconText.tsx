import {StyleSheet, View, StyleProp} from 'react-native';
import React, {FC} from 'react';
import {Icon, Text} from '@components';
import {KeyFontType, myColors} from '@utils';
interface componentProps {
  text?: string;
  nameIcon?: string;
  typeIcon?: any;
  sizeIcon?: number;
  colorIcon?: string;
  colorText?: string;
  textType?: KeyFontType;
  textStyle?: StyleProp<Text>;
}
const IconText: FC<componentProps> = ({
  colorText = myColors.surfaceVariant,
  textType = 'semibold_16',
  textStyle = {marginStart: 5},
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Icon
        type={props.typeIcon}
        name={props.nameIcon}
        size={props.sizeIcon}
        color={props.colorIcon}
      />
      <Text type={textType} color={colorText} style={textStyle}>
        {props.text}
      </Text>
    </View>
  );
};

export default IconText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
