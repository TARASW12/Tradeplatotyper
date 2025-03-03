import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from '../../styles';
import {home} from '../../configText';
import React from 'react';

type Props = {
  text: string;
  onPress: () => void;
};

export const Button = ({text, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232336B2',
  },
  text: {
    fontFamily: fonts.SNProRegular,
    fontSize: 14,
    color: 'white',
    fontWeight: 500,
  },
});
