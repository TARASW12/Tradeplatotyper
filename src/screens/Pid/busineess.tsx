import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {HeaderText} from '../../components/headerText';
import {BlurView} from '@react-native-community/blur';
import {BI, IN} from '../../configText/text.js';
import {fonts} from '../../styles';
import React from 'react';

export const BusineesPid = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
        <SafeAreaView style={styles.box}>
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <ScrollView
              contentContainerStyle={{paddingBottom: 80}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <HeaderText text={'Как эффективно распределять расходы?'} />
              <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
                <BlurView
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 16,
                    bottom: 0,
                  }}
                  blurType="dark"
                  blurAmount={1}
                />
                {BI.map((t, i) => {
                  return (
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: 'white',
                          marginBottom: 8,
                          fontFamily: fonts.SNProBlack,
                          fontSize: 20,
                        }}>{`${i + 1}. ${t.header}`}</Text>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: fonts.SNProBoldItalic,
                          fontSize: 16,
                        }}>
                        {t.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
});
