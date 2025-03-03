import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {HeaderText} from '../../components/headerText';
import {profile} from '../../configText';
import React, {useEffect, useState} from 'react';
import {getActiveCard, getCards} from '../../helpers/cards.js';
import {CardList} from '../../components/home/cardList.tsx';
import {BlurredScreen} from '../../components/card/blurredScreen.tsx';
import {FormCreate} from '../../components/card/formCreate.tsx';
import {fonts} from '../../styles';
import CloseIcon from '../../assets/svg/close.tsx';
import {menuItems, YourDealComponent} from '../../components/yourDeal';
import {Button} from '../../components/yourDeal/button.tsx';
import ProgressBar from '../../components/yourDeal/progressBar.tsx';
import {Card} from '../../components/card/card.tsx';

const calculatePercentage = (a, b) => {
  if (b === 0) return 0; // Запобігання діленню на нуль
  return (a / b) * 100;
};
export const YourDeal = () => {
  const [cardsData, setCardsData] = useState([]);
  const [ref, setRef] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const [activeCard, setActiveCard] = useState();
  const [realActiveCard, setRealActiveCard] = useState();
  const [stats, setStats] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  const closeBlur = () => setIsBlurred(false);

  const refetchCards = () => {
    setRef(prev => !prev);
  };
  useEffect(() => {
    const getCardsFetch = async () => {
      const cards = (await getCards()) || [];
      setCardsData([...cards]);

      console.log(cards, 123);
      console.log({activeCard});
      const real = await getActiveCard(activeCard.id);
      console.log({real});
      setRealActiveCard(real);
    };
    getCardsFetch();
  }, [ref, activeCard]);

  useEffect(() => {
    const test = menuItems.map(m => ({...m, value: 0}));
    const sum = Object.values(realActiveCard?.yourDeal || {}).reduce(
      (acc, item) => {
        acc += item;
        return acc;
      },
      0,
    );

    const a = realActiveCard?.yourDeal
      ? Object.entries(realActiveCard?.yourDeal).map(([name, value]) => ({
          name,
          value: calculatePercentage(+value, +sum + realActiveCard.balance),
          color: menuItems.find(item => item.name === name)?.color,
        }))
      : [];

    setStats(a);
  }, [activeCard, isBlurred, realActiveCard]);
  const select = () => {
    refetchCards();
    setSelectedCard(activeCard);
    setIsBlurred(true);
  };
  console.log({cardsData});
  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
        <SafeAreaView style={styles.box}>
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <HeaderText text={profile.account} />
            <View>
              {!!selectedCard ? (
                <Card hideDelete={true} item={realActiveCard} />
              ) : (
                <CardList
                  refetch={ref}
                  hideDelete={true}
                  hideIndicator={!!selectedCard}
                  setActiveCard={setActiveCard}
                  refetchCards={refetchCards}
                  cardsData={cardsData}
                />
              )}
            </View>

            <Button
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
              select={select}
            />
            <View style={{flex: 1}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}} // Відступ для останнього елемента
              >
                {!!realActiveCard?.yourDeal
                  ? stats.map(({name, color, value}) => (
                      <ProgressBar
                        key={name}
                        progress={value / 100}
                        label={name}
                        color={color}
                      />
                    ))
                  : menuItems.map(({name, color}) => (
                      <ProgressBar
                        key={name}
                        progress={0}
                        label={name}
                        color={color}
                      />
                    ))}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {isBlurred && <BlurredScreen />}
      {isBlurred && (
        <YourDealComponent
          refetchCards={refetchCards}
          selectedCard={realActiveCard}
          closeBlur={closeBlur}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // alignItems: 'center',
  },
});
