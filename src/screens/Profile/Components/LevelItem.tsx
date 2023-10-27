import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Text} from '@components';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Slider from '@react-native-community/slider';
import {useAppSelector} from '@redux/store';
interface itemProps {
  item?: any;
  index: number;
}
const LevelItem: FC<itemProps> = ({item, index}) => {
  const level = useAppSelector(state => state.levelSlice.data);
  const checkLevel = () => {
    let stt = 'Chưa đạt';
    if (level.currentLevelIndex === index) {
      stt = 'Level hiện tại';
    } else if (level.currentLevelIndex > index) {
      stt = 'Đã đạt';
    }
    return stt;
  };
  return (
    <LinearGradient
      colors={['#f9c1c5ea', '#fa5d6a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Text>{checkLevel()}</Text>
      <Text type="bold_22">{item.description}</Text>
      <View style={{alignItems: 'center', marginTop: 10, minHeight: 40}}>
        {level.currentLevelIndex >= index ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: WINDOW_WIDTH - 70,
              }}>
              <Text type="semibold_14">{`Lv ${index}`}</Text>
              <Text type="semibold_14">{`${level.levelPoint}/${item.nextLevelPoint}`}</Text>
              <Text type="semibold_14">{`Lv ${index + 1}`}</Text>
            </View>
            <Slider
              style={{width: WINDOW_WIDTH - 50}}
              minimumValue={item.point}
              maximumValue={item.nextLevelPoint}
              value={level.levelPoint}
              disabled={true}
              thumbTintColor={myColors.background}
              minimumTrackTintColor={myColors.gray}
              maximumTrackTintColor={myColors.text}
            />
          </>
        ) : null}
      </View>
      <Text
        style={{
          marginTop: 10,
        }}>{`Còn cần ${item.needPoint} kinh nghiệm để nâng Level`}</Text>
    </LinearGradient>
  );
};

export default LevelItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: WINDOW_WIDTH - 40,
    height: 180,
    borderRadius: 8,
    marginStart: 20,
    minHeight: 180,
  },
});
