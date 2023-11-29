import React from 'react';
import { customText, TextProps } from 'react-native-paper';
import { KeyFontType, myColors } from '@utils';
import { useAppSelector } from '@redux/store';
import { useAppTheme } from '@hooks';

interface ITextProps {
  type?: KeyFontType;
  color?: string;
}
type TTextProps = Omit<TextProps<any>, 'variant'> & ITextProps;

const CustomText = customText<KeyFontType>();

const Text: React.FC<TTextProps> = ({
  type = 'regular_16',
  color,
  ...props
}) => {
  const theme = useAppTheme()
  return (
    <CustomText {...props} variant={type} style={[{ color: color || theme.text }, props.style]} />
  );
};

export default Text;
