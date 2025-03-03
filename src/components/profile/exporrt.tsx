import {Pressable, View, Text} from 'react-native';
import Export from '../../assets/svg/export.tsx';
import {fonts} from '../../styles';
import {Loader} from '../loader.tsx';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {createAndDownloadExcel} from "../../helpers/cards.js";

export const Exporrt = ({cards, investments}) => {
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
      {!!cards?.length ? (
        <>
          <Pressable
            onPress={() =>
              createAndDownloadExcel({cards, invest: investments})
            }>
            <Export />
          </Pressable>
          <Text
            style={{
              fontFamily: fonts.SNProBold,
              marginTop: 10,
              fontSize: 20,
              color: 'white',
            }}>
            Экспорт данных
          </Text>
        </>
      ) : (
        <Loader color={'#089981'} />
      )}
    </View>
  );
};
