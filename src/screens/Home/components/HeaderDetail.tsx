import {StyleSheet, View, ImageBackground} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import {Icons, Text} from '@components';
import {IconText} from '@components';
import {useAppSelector} from '@redux/store';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

interface componentProps {
  // image?: string;
  // name?: string;
  // view?: number;
  // like?: number;
  // star?: number;
}
const HeaderDetail: FC<componentProps> = ({
  // view = 0,
  // like = 0,
  // star = 0,
  ...props
}) => {
  const loading = useAppSelector(state => state.comicSlice.loading);
  const data = useAppSelector(state => state.comicSlice.data);
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      visible={!loading}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT / 3 - 20}>
      <ImageBackground
        source={
          data.image
            ? {
                uri: data.image,
              }
            : require('@assets/images/error_img.jpg')
        }
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        style={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT / 3 - 20,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.051)', '#030303e0']}
          style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
          <View style={styles.box1}>
            <Text type="bold_22" color={myColors.surfaceVariant}>
              {data.name}
            </Text>
            <View style={[styles.box3]}>
              <IconText
                nameIcon="local-fire-department"
                typeIcon={Icons.MaterialIcons}
                sizeIcon={18}
                colorIcon="#f77c00"
                text={helper.convertToK(data.numOfView)}
              />
              <IconText
                nameIcon="like1"
                typeIcon={Icons.AntDesign}
                colorIcon={myColors.primary}
                sizeIcon={18}
                text={helper.convertToK(data.numOfLike)}
              />
              <IconText
                nameIcon="star"
                typeIcon={Icons.AntDesign}
                colorIcon="#eff300"
                sizeIcon={18}
                text={data.star + ''}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ShimmerPlaceholder>
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
