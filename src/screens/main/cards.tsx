import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {HeaderText} from '../../components/headerText';
import {cards, profile} from '../../configText';
import {CardList} from '../../components/home/cardList.tsx';
import {UnderInfo} from '../../components/card/underInfo.tsx';
import {CreatCard} from '../../components/card/createCard.tsx';
import {BlurredScreen} from '../../components/card/blurredScreen.tsx';
import {FormCreate} from '../../components/card/formCreate.tsx';
import {CARDS, getCards} from '../../helpers/cards.js';
import {useFocusEffect} from '@react-navigation/native';

export const Cards = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [ref, setRef] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [percent, setPercent] = useState();
  const refetchCards = () => {
    setRef(prev => !prev);
  };
  const blur = () => setIsBlurred(true);
  const closeBlur = () => setIsBlurred(false);

  useEffect(() => {
    console.log(123);
    const getCardsFetch = async () => {
      const cards = (await getCards()) || [];
      console.log({cards});
      setCardsData(cards);
    };

    getCardsFetch();

    return () => {};
  }, [ref]);

  useFocusEffect(
    useCallback(() => {
      const getCardsFetch = async () => {
        const cards = (await getCards()) || [];
        console.log({cards});
        setCardsData(cards);
      };

      getCardsFetch();
    }, [activeCard]),
  );

  useEffect(() => {
    const getFull = async () => {
      const cards = (await getCards()) || [];
      const card = cards?.find(i => i.id === activeCard.id);
      const sumInvest = !!card?.invest?.length
        ? card?.invest.reduce((acc, item) => {
            acc += +item.amountShares * Number(item.sharePrice);
            return acc;
          }, 0)
        : 0;
      const busineesInvest = card?.yourDeal
        ? Object.values(card?.yourDeal).reduce((acc, item) => {
            acc += Number(item);
            return acc;
          }, 0)
        : 0;
      setPercent(
        ((busineesInvest + sumInvest) /
          (card.balance + busineesInvest + sumInvest)) *
          100,
      );
    };
    getFull();
  }, [activeCard]);

  const progressPercent = Math.min(Math.max(30, 0), 100);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
          <SafeAreaView style={styles.box}>
            <View>
              <View style={{paddingHorizontal: 16}}>
                <HeaderText text={cards.cards} />
              </View>
              <CardList
                refetchCards={refetchCards}
                setActiveCard={setActiveCard}
                hideIndicator={cardsData.length <= 1}
                cardsData={cardsData}
              />
              <View style={{paddingHorizontal: 16, marginTop: 50}}>
                <UnderInfo progressPercent={percent} />
                <CreatCard blur={blur} cardNumber={'3456'} />
              </View>
            </View>
          </SafeAreaView>
          {isBlurred && <BlurredScreen />}
          {isBlurred && (
            <FormCreate refetchCards={refetchCards} closeBlur={closeBlur} />
          )}
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
});
