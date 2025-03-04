import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {home} from '../../configText';
import {Button} from './button.tsx';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../styles';
import {formatNumberWithSpaces, getCards} from '../../helpers/cards.js';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const TopContent = () => {
  const [balance, setBalance] = useState(null);
  const navigation = useNavigation();

  const get = async () => {
    const cards = (await getCards()) || [];
    const sum = cards.reduce((acc, card) => {
      acc += +card.balance;
      return acc;
    }, 0);
    setBalance(sum);
  };
  useEffect(() => {

    get();
  }, []);

  useFocusEffect(() =>{
    get()
  })
  console.log(balance);
  return (
    <View style={styles.wrapper}>
      <View style={styles.secondWrapper}>
        <BlurView style={styles.blur} blurType="light" blurAmount={6} />
        <View style={styles.blockWrapper}>
          <Text style={styles.text}>{home.balance}</Text>
          <Text style={styles.text}>
            {balance > 1000000
              ? `${(formatNumberWithSpaces((balance / 1000000).toFixed(2)))} млн.`
              : formatNumberWithSpaces(balance)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Button
          onPress={() => navigation.navigate('Invest')}
          text={home.calc}
        />
        <Button
          onPress={() => navigation.navigate('YourDeal')}
          text={home.prognoz}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
  },
  secondWrapper: {
    width: 160,
    borderRadius: 16,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
    bottom: 0,
  },
  blockWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: fonts.SNProRegular,
    fontSize: 14,
    fontWeight: 500,
  },
});
