import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {HeaderText} from '../../components/headerText';
import {home, profile} from '../../configText';
import {TopContent} from '../../components/home/topContent.tsx';
import {fonts} from '../../styles';
import {Boost} from '../../components/home/boost.tsx';
import {PieChart} from 'react-native-gifted-charts';
import {getActiveCard, getCards} from '../../helpers/cards.js';
import {CardList} from '../../components/home/cardList.tsx';
import {useFocusEffect} from '@react-navigation/native';
import {Invest} from '../../components/analytics';
import {menuItems} from '../../components/yourDeal';

export const generateRandomColor = (opacity = 1) => {
  // Generate random values for red, green, and blue (0 to 255)
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Return the color in rgba format
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

function addPercentageField(data) {
  // Знаходимо загальну суму всіх "suma"
  const totalSum = data.reduce((acc, item) => acc + item.suma, 0);

  // Мапимо масив і додаємо поле "percentage"
  return data.map(item => ({
    ...item,
    percentage: ((item.suma / totalSum) * 100).toFixed(2),
  }));
}

export const Analytics = () => {
  const [cardsData, setCardsData] = useState([]);
  const [ref, setRef] = useState(true);
  const [activeCard, setActiveCard] = useState();
  const [pieData, setPieData] = useState(null);
  const [businessPieData, setBusinessPieData] = useState(null);
  const refetchCards = () => setRef(prev => !prev);

  const getCardsFetch = useCallback(async () => {
    const cards = (await getCards()) || [];
    setCardsData([...cards]);
    const real = await getActiveCard(activeCard.id);
    const currentInvest = real?.invest?.length ? real?.invest : [];
    const a = addPercentageField([
      ...currentInvest,
      {suma: real.balance, color: '#FFFFFF', shareName: 'Баланс'},
    ]);
    console.log({a});

    const data = a.map(item => ({
      value: +item.percentage,
      color: item.color,
      shareName: item.shareName,
    }));
    console.log({data}, 'DATA');
    setPieData(data);
  }, [activeCard]); // Залежність від activeCard

  const getBusiness = useCallback(async () => {
    const cards = (await getCards()) || [];
    setCardsData([...cards]);
    const real = await getActiveCard(activeCard.id);
    console.log({real}, 22);
    const currentInvest = real?.yourDeal ? real?.yourDeal : [];
    const totalSum =
      Object.values(currentInvest).reduce((acc, sum) => {
        acc += sum;
        return acc;
      }, 0) + real.balance;
    console.log(Object.values(currentInvest), real.balance);
    const data = Object.entries(real?.yourDeal).map(([key, value]) => {
      const bas = menuItems.find(i => i.name === key);
      return {
        ...bas,
        shareName: bas.name,
        value: value == 0 ? 0 : +((value / totalSum) * 100).toFixed(2),
      };
    });
    data.push({
      shareName: 'Баланс',
      color: '#FFFFFF',
      value: +((real.balance / totalSum) * 100).toFixed(2),
    });
    setBusinessPieData(data);
  }, [activeCard]); // Залежність від activeCard

  useFocusEffect(
    useCallback(() => {
      getCardsFetch();
      getBusiness();
    }, [activeCard]),
  );

  useEffect(() => {
    getCardsFetch();
    getBusiness();
  }, [activeCard]);
  console.log({pieData, businessPieData});
  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
        <SafeAreaView style={styles.box}>
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <HeaderText text={'Статистика'} />
            <View style={{marginBottom: 20}}>
              <CardList
                setActiveCard={setActiveCard}
                // hideIndicator={true}
                hideDelete={true}
                refetchCards={refetchCards}
                cardsData={cardsData}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 120}}>
              <Invest
                textInside={'Инвестиции'}
                marginTop={10}
                label={'Ваши инвестиции'}
                not={' У вас нет активных инвестиций'}
                pieData={pieData}
              />

              <Invest
                textInside={'Бизнес'}
                gap={5}
                marginTop={20}
                padding={5}
                bg={'rgba(189, 156, 80, 0.8)'}
                label={'Ваши бизнес'}
                not={' У вас нет вложений в бизнес'}
                pieData={businessPieData}
              />
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
