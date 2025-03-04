import {Pressable, View, Text} from 'react-native';
import Export from '../../assets/svg/export.tsx';
import {fonts} from '../../styles';
import {Loader} from '../loader.tsx';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {CARDS, getCards} from '../../helpers/cards.js';
import {saveData} from '../../asyncStorage';
import {defaultAr} from '../../hooks/introduce';

export const Delete = ({deleteHandler}) => {
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

      <View style={{alignItems: 'center'}}>
        <Pressable onPress={deleteHandler}>
          <FontAwesomeIcon size={20} color={'white'} icon={faTrash} />
        </Pressable>
      </View>
      <Text
        style={{
          fontFamily: fonts.SNProBold,
          marginTop: 10,
          fontSize: 20,
          color: 'white',
        }}>
     Удалить все данные
      </Text>
    </View>
  );
};
