import {StyleSheet, View} from 'react-native';
import React, {FC, useMemo} from 'react';
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
  const {currentLevelIndex, exp, reachedMax} = level || {};
  const checkLevel = () => {
    let stt = 'Chưa đạt';
    if (currentLevelIndex === index) {
      stt = 'Level hiện tại';
    } else if (currentLevelIndex > index) {
      stt = 'Đã đạt';
    }
    return stt;
  };

  const renderColor = useMemo(() => {
    if (reachedMax || currentLevelIndex > index) {
      return ['#c1f9dbea', '#0fd472'];
    } else {
      if (currentLevelIndex == index) {
        return ['#f9c1c5ea', '#dc4854'];
      } else {
        return ['#e6dddeea', '#9f9a9a'];
      }
    }
  }, [currentLevelIndex]);

  const getPercent = () => {
    if (reachedMax || currentLevelIndex > index) return 100;
    if (currentLevelIndex == index) {
      return -1;
    } else {
      return 0;
    }
  };
  const percent = getPercent();

  return (
    <LinearGradient
      colors={renderColor}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Text>{checkLevel()}</Text>
      <Text type="bold_22">{item.description}</Text>
      <View style={{alignItems: 'center', marginTop: 10, minHeight: 40}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WINDOW_WIDTH - 70,
          }}>
          <Text type="semibold_14">{`Lv ${index}`}</Text>
          <Text type="semibold_14">{`${exp}/${
            item.nextLevelPoint == -1 ? '♾️' : item.nextLevelPoint
          }`}</Text>
          <Text type="semibold_14">{`Lv ${index + 1}`}</Text>
        </View>
        {/* <Slider
              style={{width: WINDOW_WIDTH - 50}}
              minimumValue={item.point}
              maximumValue={item.nextLevelPoint}
              value={exp}
              disabled={true}
              thumbTintColor={myColors.background}
              minimumTrackTintColor={myColors.gray}
              maximumTrackTintColor={myColors.text}
            /> */}
        <View style={{width: '100%', height: 3, marginTop: 15}}>
          <View
            style={{flex: 1, borderRadius: 2, backgroundColor: '#ffffff'}}
          />
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: `${
                percent == -1
                  ? Math.floor((item.point / item.nextLevelPoint) * 100)
                  : percent
              }%`,
              backgroundColor: 'black',
              borderRadius: 2,
            }}
          />
        </View>
      </View>
      {currentLevelIndex == index && !reachedMax && (
        <Text
          style={{
            marginTop: 10,
          }}>{`Còn cần ${
          item.nextLevelPoint - exp
        } kinh nghiệm để nâng Level`}</Text>
      )}
      {reachedMax && (
        <Text style={{alignSelf: 'center', marginTop: 20}}>
          Đã đạt đến level max
        </Text>
      )}
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
