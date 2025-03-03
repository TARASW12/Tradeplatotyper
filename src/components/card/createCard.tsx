import {Pressable, StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../styles';
import {cards} from '../../configText';
import CardAdd from '../../assets/svg/cardAdd.tsx';
import React from 'react';

export const CreatCard = ({cardNumber, blur}) => {
  return (
    <View style={styles.box}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{cards.add}</Text>
        <Pressable onPress={blur}>
          <CardAdd />
        </Pressable>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.textNum}>{`****  ****  **** ${cardNumber}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 16,
    height: 100,
    backgroundColor: '#C0F1E9',
    borderRadius: 16,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: fonts.SNProRegular,
    fontSize: 16,
    color: 'black',
  },
  numberWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textNum: {
    fontFamily: fonts.SNProRegular,
    fontSize: 16,
    color: 'black',
  },
});
