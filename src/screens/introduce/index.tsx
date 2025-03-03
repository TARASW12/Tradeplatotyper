import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import welcome1 from '../../assets/introduce/Cards.png';
import welcome2 from '../../assets/introduce/welcome2.jpeg';
import welcome3 from '../../assets/introduce/welcome3.jpeg';
import {buttonText, welocme1, welocme2, welocme3} from '../../configText';
import {Button, WelcomeHeader, WelcomeText} from '../../components/welcome';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {saveData} from '../../asyncStorage';
import {CARDS} from '../../helpers/cards.js';
import {INTRODUCE} from '../../helpers/introduce.js';
import {useHandleFirstLogin} from '../../hooks/introduce';

export const Introduce = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.box}>
      <Image
        resizeMode="cover"
        style={{width: width, maxHeight: 384, aspectRatio: 375 / 384}}
        source={welcome1}
      />

      <View style={{paddingHorizontal: 22, marginTop: 10}}>
        <WelcomeHeader text={welocme1.header} />
        <WelcomeText text={welocme1.text} />
        <Button
          onPress={() => navigation.navigate('IntroduceStep2')}
          text={buttonText.interest}
        />
      </View>
    </SafeAreaView>
  );
};

export const Introduce2 = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('IntroduceStep3');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        style={{width: width, flex: 1}}
        source={welcome2}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}>
          <View style={styles.wrapper}>
            <WelcomeHeader text={welocme2.header} />
            <WelcomeText text={welocme2.text} />
            <View style={{width: '100%'}}>
              <Button onPress={onPress} text={buttonText.interest} />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export const Introduce3 = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  useHandleFirstLogin();

  const onPress = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        style={{width: width, flex: 1}}
        source={welcome3}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}>
          <View style={styles.wrapper}>
            <WelcomeHeader text={welocme3.header} />
            <WelcomeText text={welocme3.text} />
            <View style={{width: '100%'}}>
              <Button
                variant={'green'}
                onPress={onPress}
                text={buttonText.start}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {flex: 1, backgroundColor: 'black'},
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  wrapper: {
    paddingHorizontal: 22,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
});
