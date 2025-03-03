import {Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {fonts} from '../../styles';
import React from 'react';

export const Info = ({allDivident, header, value}) => {
  return (
    <View style={{padding: 20, marginTop: 20}}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 16,
          bottom: 0,
        }}
        blurType="light"
        blurAmount={6}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.SNProBlack,
            width: '50%',
            color: 'white',
            fontSize: 16,
          }}>
          {header}
        </Text>
        <Text
          style={{
            width: '40%',
            fontFamily: fonts.SNProBoldItalic,
            color: 'white',
            fontSize: allDivident ? 15 : 16,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};
