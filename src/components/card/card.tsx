import {Pressable, Text, useWindowDimensions, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {fonts} from '../../styles';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {CARDS, formatNumberWithSpaces, getCards} from '../../helpers/cards.js';
import {saveData} from '../../asyncStorage';

export const Card = ({
  item,
  hideDelete = false,
  create = false,
  refetchCards,
}) => {
  const {userName, cardName, cardNumber, balance, index, type} = item;
  const {width} = useWindowDimensions();

  const deleteCard = async index => {
    const cards = (await getCards()) || [];
    cards.splice(index, 1);
    await saveData(CARDS, JSON.stringify(cards));
    refetchCards();
  };
  const MC = type === 'MC';
  return (
    <View
      style={{
        height: 190,
        width: width - 50,
        marginHorizontal: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: MC ? 'gray' : 'white',

        borderRadius: 16,
        backgroundColor: MC
          ? create
            ? 'rgba(0, 0, 0, 1)'
            : 'rgba(0, 0, 0, 0.7)'
          : 'white',
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
        blurType="light"
        blurAmount={6}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: fonts.SNProRegular,
            color: MC ? 'white' : 'black',
            fontSize: 22,
            marginBottom: 16,
          }}>
          {userName}
        </Text>
        {!hideDelete && (
          <Pressable onPress={() => deleteCard(index)}>
            <FontAwesomeIcon
              size={20}
              color={MC ? 'white' : 'black'}
              icon={faTrash}
            />
          </Pressable>
        )}
      </View>

      <Text
        style={{
          fontFamily: fonts.SNProRegular,
          color: MC ? 'white' : 'black',
          fontSize: 18,
          marginBottom: 18,
        }}>
        {cardName}
      </Text>
      <Text
        style={{
          fontFamily: fonts.SNProRegular,
          color: MC ? 'white' : 'black',
          fontSize: 20,
          marginBottom: 14,
        }}>
        {`****  ****  ****  ${cardNumber.slice(-4)}`}{' '}
      </Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.SNProRegular,
            color: MC ? 'white' : 'black',
            fontSize: 26,
          }}>{`${formatNumberWithSpaces(balance)} RUB`}</Text>
        <Text
          style={{
            fontFamily: fonts.SNProRegular,
            color: MC ? 'white' : 'black',
            fontSize: 26,
          }}>
          {type}
        </Text>
      </View>
    </View>
  );
};
