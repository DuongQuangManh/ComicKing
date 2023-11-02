import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IconText, Icons, Text} from '@components';
import {helper, myColors} from '@utils';

type ItemProps = {
  image: string;
  name: string;
  numOfLike: number;
  numOfView: number;
  numOfChapter: number;
  description: string;
  numOfFollow: number;
  onPress: () => void;
};

const IMAGE_WIDTH = 110;
const IMAGE_RAITO = 1.45;

const ComicSearchedItem: React.FC<ItemProps> = ({
  image,
  name,
  numOfFollow = 0,
  numOfChapter = 0,
  numOfLike = 0,
  numOfView = 0,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.container}>
      <FastImage source={{uri: image}} style={styles.image} />
      <View
        style={{
          flex: 1,
          paddingStart: 14,
          paddingVertical: 6,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text type="medium_14">{name}</Text>
          <Text
            style={{marginTop: 4}}
            type="light_13"
            color={myColors.textHint}
            numberOfLines={2}
            ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <IconText
            textType="regular_10"
            nameIcon="local-fire-department"
            typeIcon={Icons.MaterialIcons}
            sizeIcon={11}
            colorIcon="#f77c00"
            colorText={myColors.textHint}
            text={helper.convertToK(numOfView)}
            textStyle={{marginStart: 2}}
          />
          <IconText
            textType="regular_10"
            nameIcon="like1"
            typeIcon={Icons.AntDesign}
            colorIcon={myColors.primary}
            sizeIcon={11}
            colorText={myColors.textHint}
            text={helper.convertToK(numOfLike)}
            textStyle={{marginStart: 2}}
          />
          <IconText
            textType="regular_10"
            nameIcon="favorite"
            typeIcon={Icons.MaterialIcons}
            sizeIcon={11}
            colorIcon={myColors.primary}
            colorText={myColors.textHint}
            text={helper.convertToK(numOfFollow)}
            textStyle={{marginStart: 2}}
          />
          <IconText
            nameIcon="list-unordered"
            textType="regular_10"
            typeIcon={Icons.Octicons}
            colorIcon="#003c5c"
            sizeIcon={11}
            colorText={myColors.textHint}
            text={numOfChapter + ''}
            textStyle={{marginStart: 2}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ComicSearchedItem);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * IMAGE_RAITO,
    resizeMode: 'cover',
    borderRadius: 4,
  },
});
