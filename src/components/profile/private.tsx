import {View} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {WebVieewComp} from '../webView';

export const Private = ({}) => {
  return (
    <View
      style={{
        marginTop: 20,
        paddingVertical: 15,
        alignItems: 'center',
      }}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 16,
          bottom: 0,
        }}
        blurType="dark"
        blurAmount={1}
      />

      <WebVieewComp />
    </View>
  );
};
