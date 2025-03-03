import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {StyleSheet} from 'react-native';

export const BlurredScreen = () => {
  return (
    <BlurView
      style={styles.absolute}
      blurType="light"
      blurAmount={5}
      reducedTransparencyFallbackColor="white"
    />
  );
};
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
});
