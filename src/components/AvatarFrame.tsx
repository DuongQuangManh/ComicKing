import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {myColors} from '@utils';
interface componentProps {
  title?: any;
  image?: string;
  frame?: any;
  isTitle?: boolean;
  width?: number;
  height?: number;
}
const AvatarFrame: FC<componentProps> = ({
  title,
  image,
  frame,
  isTitle = false,
  width = 88,
  height = 88,
}) => {
  return (
    <View style={[styles.imgContainer, {width: width + 2, height: height + 2}]}>
      {isTitle && (
        <FastImage
          source={
            title ? {uri: title} : require('@assets/images/avatarTitle.png')
          }
          style={{
            width: 110,
            height: 30,
            zIndex: 10,
            position: 'absolute',
            top: -25,
          }}
          resizeMode="contain"
        />
      )}
      <FastImage
        source={image ? {uri: image} : require('@assets/images/avatar.png')}
        style={{width: width - 16, height: height - 16, borderRadius: 35}}
        resizeMode="contain"
      />
      <FastImage
        source={
          frame ? {uri: frame} : require('@assets/images/avatarFrame.png')
        }
        style={{
          position: 'absolute',
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

export default AvatarFrame;

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
