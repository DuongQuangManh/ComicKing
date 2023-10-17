import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import ButtonInteract from './ButtonInteract';
import {Icons} from '@components';
import {WINDOW_WIDTH} from '@utils';
import {sendRequest} from '@api';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {
  addComicToListFollowing,
  deleteComicToListFollowing,
} from '@redux/userSlice';

interface componentProps {
  comic: any;
}
const Interact: FC<componentProps> = ({comic}) => {
  const [follow, setFollow] = useState(comic.isHot);
  const document = useAppSelector(state => state.userSlice.document);
  const dispatch = useAppDispatch();
  //api/user/toggleFollowComic
  const handlerFollow = async () => {
    let path = 'api/user/toggleFollowComic';
    const body = {
      userId: document.id,
      comicId: comic.id,
      isFollow: !follow,
    };
    const res = await sendRequest(path, body);
    console.log(res);
    if (res.err === 200) {
      if (follow) {
        dispatch(deleteComicToListFollowing(comic.id));
      } else {
        dispatch(
          addComicToListFollowing({
            id: comic.id,
            name: comic?.name,
            image: comic?.image,
            isHot: comic.isHot,
          }),
        );
      }
    }
    setFollow(!follow);
  };
  return (
    <View style={styles.box3}>
      <ButtonInteract
        nameIcon={follow ? 'checkmark' : 'add'}
        typeIcon={Icons.Ionicons}
        label={follow ? 'Đã theo dõi' : 'Theo dõi'}
        isIcon={true}
        onClick={handlerFollow}
        isClick={follow}
      />
      <ButtonInteract
        nameIcon="download-outline"
        typeIcon={Icons.Ionicons}
        label="Download"
        isIcon={true}
      />
      <ButtonInteract
        nameIcon="share-social-outline"
        typeIcon={Icons.Ionicons}
        label="Share"
        isIcon={true}
      />
    </View>
  );
};

export default Interact;

const styles = StyleSheet.create({
  box3: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
  },
});
