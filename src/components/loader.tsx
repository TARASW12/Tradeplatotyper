import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {runOnJS} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../asyncStorage';
import {INTRODUCE} from '../helpers/introduce.js';

type Props = {
  color: string;
  width: number;
  height: number;
};

export const Loader = ({color = 'red', width = 50, height = 50}: Props) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [pass, setPass] = useState(false);

  useEffect(() => {
    const getIntroduce = async () => {
      const g = await getData(INTRODUCE);
      setTimeout(
        () => navigation.navigate(g === 'yes' ? 'Main' : 'Introduce'),
        2000,
      );
    };
    getIntroduce();
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startAnimation();
  }, [spinValue, pass]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={{paddingBottom: 0}}>
      <Animated.View
        style={[
          styles.circle,
          {borderColor: color, transform: [{rotate: spin}]},
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 7,
    borderTopColor: 'transparent',
  },
});
