import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@utils';
import PageChapter from './PageChapter';
import {Text} from '@components';
interface itemProps {
  data: any;
  index: number;
}
const imagesPerLoad = 2;
const ComicRead: FC<itemProps> = ({data, index}) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [remainingImages, setRemainingImages] = useState([]);

  useEffect(() => {
    const initialImages = data.images.slice(0, imagesPerLoad);
    const remaining = data.images.slice(imagesPerLoad);
    setLoadedImages(initialImages);
    setRemainingImages(remaining);
  }, [data]);

  const loadMoreImages = () => {
    const nextImages = remainingImages.slice(0, imagesPerLoad);
    const remaining = remainingImages.slice(imagesPerLoad);
    setLoadedImages([...loadedImages, ...nextImages]);
    setRemainingImages(remaining);
  };
  return (
    <View style={styles.container}>
      {index > 0 && (
        <Text
          type="semibold_16"
          style={{
            alignSelf: 'center',
            padding: 10,
          }}>{`Chapter ${data.chapterIndex}`}</Text>
      )}
      <FlashList
        nestedScrollEnabled={true}
        estimatedItemSize={WINDOW_HEIGHT}
        estimatedListSize={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
        data={loadedImages}
        renderItem={({item}) => <PageChapter item={item} />}
        onEndReached={() => loadMoreImages()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{padding: 2}}
      />
      {/* {data?.images.map(({item, index}: any) => (
        <PageChapter item={item} key={index} />
      ))} */}
      <Text style={{padding: 50}}>Comment</Text>
    </View>
  );
};

export default ComicRead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
