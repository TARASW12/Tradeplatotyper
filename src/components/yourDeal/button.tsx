import {Pressable, Text, View} from 'react-native';
import {fonts} from '../../styles';
import React from 'react';

export const Button = ({selectedCard, setSelectedCard, select}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
      }}>
      <Pressable
        onPress={!!selectedCard ? () => setSelectedCard(null) : select}
        style={{
          backgroundColor: !!selectedCard ? '#232336B2' : '#089981',
          borderRadius: 14,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: fonts.SNProRegular,
            fontSize: 16,
          }}>
          {!!selectedCard ? 'Отменить' : 'Выбрать'}
        </Text>
      </Pressable>
    </View>
  );
};
