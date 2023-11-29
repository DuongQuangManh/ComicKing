import React from 'react';
import {ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useAppSelector } from '@redux/store';
import { myColors } from '@utils';
import { useAppTheme } from '@hooks';

export const Icons = {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Octicons,
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome6,
};
interface IconProps {
  type?: any;
  name: string | undefined;
  color?: string;
  size?: number;
  style?: ViewStyle;
}
const Icon: React.FC<IconProps> = ({
  type = Icons.MaterialIcons,
  name,
  color,
  size = 26,
  style = {},
}) => {
  const theme = useAppTheme()
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag style={style} name={name} color={color || theme.text} size={size} />
      )}
    </>
  );
};

export default Icon;
