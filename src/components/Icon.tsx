import React from 'react';
import {ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
export const Icons = {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Octicons,
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
  color = 'black',
  size = 26,
  style = {},
}) => {
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag style={style} name={name} color={color} size={size} />
      )}
    </>
  );
};

export default Icon;
