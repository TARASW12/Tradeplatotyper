import {Animated, StyleSheet, Text, View} from 'react-native';
import {cards} from '../../configText';
import React from 'react';
import {fonts} from '../../styles';

export const UnderInfo = ({progressPercent}) => {
  return (
    <>
      <Text style={styles.text}>{cards.spended}</Text>
      <View style={styles.containerBar}>
        <View style={styles.container}>
          <View style={styles.backgroundLine} />

          <Animated.View
            style={[styles.progressLine, {width: `${progressPercent}%`}]}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4, // Висота лінії
    position: 'relative',
  },
  text: {
    fontFamily: fonts.SNProRegular,
    fontSize: 16,
    marginBottom: 24,
    color: 'white',
  },
  containerBar: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 32,
    borderRadius: 16,
  },
  backgroundLine: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc', // Сірий колір для фону
    borderRadius: 2, // Закруглені краї
  },
  progressLine: {
    height: '100%',
    backgroundColor: 'green', // Зелений колір для прогресу
    borderRadius: 2, // Закруглені краї
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
