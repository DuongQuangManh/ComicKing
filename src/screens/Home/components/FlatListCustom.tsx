import {
  StyleSheet,
  View,
  FlatList,
  FlatListProps,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {Screen} from '../../screen';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {Icon, Icons, Text} from '@components';
interface componetProps {
  label?: string;
}
type TFlatlist = componetProps & FlatListProps<any>;
const FlatListCustom: FC<TFlatlist> = ({...props}) => {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text type="bold_24">{props.label}</Text>
          <TouchableOpacity style={styles.box2}>
            <Text type="semibold_16">Thêm</Text>
            <Icon type={Icons.Entypo} name="chevron-right" size={16} />
          </TouchableOpacity>
        </View>
        <FlatList
          {...props}
          style={styles.flat}
          ListFooterComponent={() => <View style={{height: 5}} />}
        />
      </View>
    </Screen>
  );
};

export default FlatListCustom;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    padding: 5,
    marginTop: 5,
  },
  flat: {
    marginTop: 10,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
