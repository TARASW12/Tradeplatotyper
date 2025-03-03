import {Pressable, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {buttonText, welocme1} from '../../configText';

const variants = {
  white: {
    backgroundColor: '#625E5E',
  },
  green: {
    backgroundColor: '#089981',
  },
};

type Props = {
  text: string;
};

type PropsButton = {
  onPress: () => void;
  text: string;
  variant?: keyof typeof variants;
};

export const WelcomeHeader = ({text}: Props) => {
  return <Text style={styles.header}>{text}</Text>;
};
export const WelcomeText = ({text}: Props) => {
  return <Text style={styles.text}>{text}</Text>;
};

export const Button = ({
  text,
  style,
  disabled = false,
  onPress,
  variant = 'white',
}: PropsButton) => {
  const {width} = useWindowDimensions();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.button,
        ...variants[variant],
        width: width - 44,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}>
      <Text
        style={{
          fontFamily: 'NunitoSans10pt-Regular',
          fontSize: 17,
          textAlign: 'center',
          color: 'white',
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#E4E4F0',
    marginBottom: 30,
    fontSize: 32,
    fontFamily: 'SNPro-Regular',
    fontWeight: '400',
  },
  text: {
    color: 'white',
    lineHeight: 33,
    fontSize: 16,
    fontFamily: 'NunitoSans10pt-Regular',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
  },
});
