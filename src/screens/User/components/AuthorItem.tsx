import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {myColors} from '@utils';

type ComponentProps = {
  image: string;
  name: string;
  numOfComic: number;
  numOfFollow: number;
  description: string;
  onPress: () => void;
};

const AuthorItem: React.FC<ComponentProps> = ({
  image,
  name,
  numOfComic,
  numOfFollow,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FastImage
        source={image ? {uri: image} : require('@assets/images/avatar.png')}
        style={styles.image}
      />
      <View
        style={styles.infoContainer}>
        <View>
          <Text type="medium_16">{name}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            type="light_12"
            color={myColors.textHint}>
            {description}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{`${numOfComic}`}</Text>
            <Icon
              style={{paddingStart: 4, paddingTop: 2}}
              name="book"
              type={Icons.Ionicons}
              size={14}
            />
          </View>
          <Text>{`${numOfFollow} Fans >`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuthorItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderBottomColor: myColors.gray,
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingStart: 8,
    height: '100%',
    justifyContent: 'space-between',
  }
});
