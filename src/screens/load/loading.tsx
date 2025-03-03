import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Loader} from '../../components/loader.tsx';
import logo from '../../assets/logo.png';
export const Load = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.cover}>
      <Image resizeMode="center" style={{width: width - 90}} source={logo} />
      <View style={styles.box}>
        <Loader color={'#089981'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    position: 'absolute',
    bottom: 60,
  },
});
