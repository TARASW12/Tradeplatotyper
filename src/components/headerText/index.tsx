import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {fonts} from '../../styles';

export const HeaderText = ({text}: {text: string}) => {
  return <Text style={styles.text}>{text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.SNProRegular,
    marginBottom: 25,
    marginTop: 20,
    fontSize: 32,
    fontWeight: 500,
    color: 'white',
  },
});
