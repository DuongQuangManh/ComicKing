import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH} from '@utils';
import {Icon, Icons, Text} from '@components';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '@redux/store';
interface itemProps {
  label?: string;
  text?: string;
}
type TButton = itemProps & TouchableOpacityProps;
const InfoItem: FC<TButton> = ({...props}) => {
  const loading = useAppSelector(state => state.userSlice.loading);
  return (
    <TouchableOpacity {...props} style={{marginTop: 20}} activeOpacity={0.7}>
      <View style={styles.container}>
        <Text type="semibold_16">{props.label}</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingEnd: 10}}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            visible={!loading}
            width={props.label === 'NickName' ? 150 : 120}
            style={{borderRadius: 8}}
            height={25}>
            <Text>{props.text}</Text>
          </ShimmerPlaceholder>
          <Icon type={Icons.Entypo} name="chevron-right" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
