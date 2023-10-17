import React from 'react';
import {customText, TextProps} from 'react-native-paper';
import {KeyFontType, myColors} from '@utils';

interface ITextProps {
  type?: KeyFontType;
  color?: string;
}
type TTextProps = Omit<TextProps<any>, 'variant'> & ITextProps;

const CustomText = customText<KeyFontType>();

const Text: React.FC<TTextProps> = ({
  type = 'regular_16',
  color = myColors.text,
  ...props
}) => {
  return (
    <CustomText {...props} variant={type} style={[{color}, props.style]} />
  );
};

export default Text;
