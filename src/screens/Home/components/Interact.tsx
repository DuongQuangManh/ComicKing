import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonInteract from './ButtonInteract';
import {Icons} from '@components';
import {WINDOW_WIDTH} from '@utils';

const Interact = () => {
  return (
    <View style={styles.box3}>
      <ButtonInteract
        nameIcon="heart"
        typeIcon={Icons.Ionicons}
        label="Like"
        isClick={true}
        isIcon={true}
      />
      <ButtonInteract
        nameIcon="add"
        typeIcon={Icons.Ionicons}
        label="Follow"
        isIcon={true}
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
