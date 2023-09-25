import {StyleSheet, View, ImageBackground} from 'react-native';
import React from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import {Icons, Text} from '@components';
import {IconText} from '@components';

const HeaderDetail = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/1200x/c6/4e/61/c64e61a3b4da857e6a3890686ecd19b4.jpg',
      }}
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 3 - 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.051)', '#030303e0']}>
        <View style={styles.box1}>
          <Text type="bold_22" color={myColors.surfaceVariant}>
            Cuộc chiến giữa các vị thần
          </Text>
          <View style={[styles.box3]}>
            <IconText
              nameIcon="local-fire-department"
              typeIcon={Icons.MaterialIcons}
              sizeIcon={18}
              colorIcon="#f77c00"
              text="2.2m"
            />
            <IconText
              nameIcon="like1"
              typeIcon={Icons.AntDesign}
              colorIcon={myColors.primary}
              sizeIcon={18}
              text="15.7k"
            />
            <IconText
              nameIcon="star"
              typeIcon={Icons.AntDesign}
              colorIcon="#eff300"
              sizeIcon={18}
              text="2.2m"
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HeaderDetail;

const styles = StyleSheet.create({
  box1: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 3 / 3,
    justifyContent: 'center',
    paddingStart: 10,
  },
  box3: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
  },
});
