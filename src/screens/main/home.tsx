import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {HeaderText} from '../../components/headerText';
import {home, profile} from '../../configText';
import {fonts} from '../../styles';
import {TopContent} from '../../components/home/topContent.tsx';
import {Boost} from '../../components/home/boost.tsx';
import {getCards} from '../../helpers/cards.js';
import {Info} from '../../components/home/info.tsx';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();
  const [allDivident, setAllDivident] = useState(0);
  const [allShareRise, setAllShareRise] = useState(0);
  const [busineesWaste, setBusinesWaste] = useState(0);

  const getCardsFetch = async () => {
    const cards = (await getCards()) || [];
    console.log(cards[1].yourDeal);
    const divident = cards?.length
      ? cards.map(c => {
          if (c?.invest?.length) {
            return c?.invest.reduce((acc, card) => {
              acc += Number(card.amountShares * card.divident);
              return acc;
            }, 0);
          } else {
            return 0;
          }
        })
      : 0;
    const shares = cards?.length
      ? cards.map(c => {
          if (c?.invest?.length) {
            return c?.invest.reduce((acc, card) => {
              acc +=
                (Number(card.amountShares * card.sharePrice) / 100) *
                card.risePercentage;
              return acc;
            }, 0);
          } else {
            return 0;
          }
        })
      : 0;
    const business = cards?.length
      ? cards.map(c => {
          if (c?.yourDeal) {
            return Object.values(c?.yourDeal).reduce((acc, card) => {
              acc += Number(card);
              return acc;
            }, 0);
          } else {
            return 0;
          }
        })
      : 0;
    console.log(business);
    const allDividents = divident.reduce((acc, it) => (acc += it), 0);
    const allShares = shares.reduce((acc, it) => (acc += it), 0);
    const businessW = business.reduce((acc, it) => (acc += it), 0);
    setAllDivident(allDividents);
    setAllShareRise(allShares);
    setBusinesWaste(businessW);
  };

  useEffect(() => {
    getCardsFetch();
  }, []);

  useFocusEffect(() => {
    getCardsFetch();
  });

  const onPress = () => navigation.navigate('InvestPid');
  const onPres2 = () => navigation.navigate('BusineesPid');
  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
        <SafeAreaView style={styles.box}>
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <ScrollView
              contentContainerStyle={{paddingBottom: 80}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <HeaderText text={profile.account} />
              <TopContent />
              <Info
                allDivident={allDivident}
                header={'Прогнозированая дивидентная прибиль'}
                value={
                  allDivident
                    ? `${allDivident} RUB / в год`
                    : 'Нет активных инвестиций'
                }
              />
              <Info
                allDivident={allShareRise}
                header={'Прогнозированая прибиль портфеля'}
                value={
                  allShareRise
                    ? `${allShareRise} RUB / в год`
                    : 'Нет активных инвестиций'
                }
              />
              <Info
                allDivident={busineesWaste}
                header={'Расходы на бизнес'}
                value={
                  busineesWaste
                    ? `${busineesWaste} RUB / в год`
                    : 'Нет активного бизнеса'
                }
              />
              <Text
                style={{
                  fontFamily: fonts.SNProBlack,
                  marginTop: 20,
                  fontSize: 16,
                  color: 'white',
                  marginBottom: 20,
                }}>
                {home.personalaz}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 20,
                }}>
                <Boost
                  onPress={onPress}
                  header={'Подсказки'}
                  description={'Часть бюджета свободна. Возможно..'}
                />
                <Boost
                  onPress={onPres2}
                  header={'Анализ'}
                  description={'Если разработка занимает >50%...'}
                />
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
