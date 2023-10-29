import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import ButtonInteract from './ButtonInteract';
import {Icons} from '@components';
import {WINDOW_WIDTH} from '@utils';
import {sendRequest} from '@api';
import {useAppSelector} from '@redux/store';

interface componentProps {
  isFollowing: boolean;
  comicId: string;
}

const Interact: FC<componentProps> = ({isFollowing, comicId}) => {
  const [follow, setFollow] = useState(isFollowing);
  const document = useAppSelector(state => state.userSlice.document);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFollow(isFollowing);
  }, [isFollowing]);

  //api/user/toggleFollowComic
  const handlerFollow = async () => {
    setFollow(!follow);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      let path = 'api/user/toggleFollowComic';
      const body = {
        userId: document.id,
        comicId,
        isFollow: !follow,
      };
      sendRequest(path, body);
    }, 1500);
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

export default React.memo(Interact);

const styles = StyleSheet.create({
  box3: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
  },
});
