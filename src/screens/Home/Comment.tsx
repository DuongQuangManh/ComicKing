import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {goBack} from '@navigations';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';

const Comment = () => {
  return (
    <Modal
      isVisible
      animationIn={'slideInUp'}
      backdropOpacity={0.4}
      onBackdropPress={goBack}
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        backgroundColor: myColors.transparent,
      }}>
      <View style={styles.container}>
        <Text>hihi</Text>
      </View>
    </Modal>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - 100,
    backgroundColor: myColors.surfaceVariant,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    bottom: -20,
  },
});
