import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {fonts} from '../../styles';
type Props = {
  text: string;
  setText: (str: string) => void;
  placeholder: string;
  keyboardType?: string;
  error?: string;
  additionalText: string;
};

export const CustomInput = ({
  text,
  keyboardType = 'default',
  style,
  formatFunc,
  error,
  additionalText,
  placeholder,
  setText,
}: Props) => {
  return (
    <>
      <View
        style={{
          ...styles.inputContainer,
          ...style,
          borderColor: error ? 'red' : 'white',
        }}>
        <TextInput
          disabled={true}
          value={formatFunc ? `${formatFunc(text)}` : `${text}`}
          keyboardType={keyboardType}
          onChangeText={setText}
          placeholder={placeholder}
          returnKeyType={'done'}
          placeholderTextColor="#bbb"
          style={styles.input}
        />
      </View>
      {!!error && (
        <View
          style={{
            backgroundColor: 'white',
            margin: 3,
            padding: 2,
            borderRadius: 12,
          }}>
          <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    maxHeight: 50,
    height: 50,
    borderColor: 'white',
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.SNProRegular,
  },
});
