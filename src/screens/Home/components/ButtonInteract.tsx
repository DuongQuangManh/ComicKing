import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Icon, Text} from '@components';
import {KeyFontType, myColors} from '@utils';

interface componentProps {
  label?: string;
  style?: any;
  isClick?: boolean;
  typeIcon?: any;
  nameIcon?: string;
  sizeIcon?: number;
  isIcon?: boolean;
  typeText?: KeyFontType;
  onClick?: () => void;
}

const ButtonInteract: FC<componentProps> = ({
  isClick = false,
  isIcon = false,
  sizeIcon = 16,
  typeText = 'semibold_12',
  ...props
}) => {
  return (
    <TouchableOpacity style={[props.style, {flex: 1}]} onPress={props.onClick}>
      <View style={styles.box1}>
        {isIcon && (
          <Icon
            type={props.typeIcon}
            name={props.nameIcon}
            size={sizeIcon}
            color={isClick ? myColors.primary : myColors.text}
          />
        )}
        <Text
          type={typeText}
          style={{color: isClick ? myColors.primary : myColors.text}}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonInteract;

const styles = StyleSheet.create({
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
});
