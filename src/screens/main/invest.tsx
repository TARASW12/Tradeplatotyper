import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bg.jpeg';
import {HeaderText} from '../../components/headerText';
import {buttonText, home, profile} from '../../configText';
import {CARDS, formatNumberWithSpaces, getCards} from '../../helpers/cards.js';
import {CardList} from '../../components/home/cardList.tsx';
import {fonts} from '../../styles';
import {Card} from '../../components/card/card.tsx';
import {CustomInput} from '../../components/input';
import {Button} from '../../components/welcome';
import {useValidate} from '../../hooks/invest';
import {saveData} from '../../asyncStorage';
import {generateRandomColor} from './analytics.tsx';

export const Invest = () => {
  const [cardsData, setCardsData] = useState([]);
  const [ref, setRef] = useState(true);
  const [activeCard, setActiveCard] = useState();
  const [selectedCard, setSelectedCard] = useState();

  const [shareName, setShareName] = useState('');
  const [amountShares, setAmountShares] = useState('');
  const [sharePrice, setSharePrice] = useState('');
  const [divident, setDivident] = useState('');
  const [years, setYears] = useState('');
  const [risePercentage, setRisePersentage] = useState('');

  const [valid, setValid] = useState(false);

  const [errors, setErrors] = useState({
    shareName: '',
    amountShares: '',
    sharePrice: '',
    divident: '',
    years: '',
    risePercentage: '',
  });

  useValidate({
    selectedCard,
    amountShares,
    shareName,
    sharePrice,
    years,
    setValid,
    divident,
    risePercentage,
    setErrors,
  });

  const select = () => setSelectedCard(activeCard);

  useEffect(() => {
    const getCardsFetch = async () => {
      const cards = (await getCards()) || [];
      setCardsData(cards);
      console.log({cards: cards[0]?.invest}, 'HERE');
    };
    getCardsFetch();
  }, [ref]);

  // console.log({selectedCard}, valid);
  const refetchCards = () => setRef(prev => !prev);

  const onInvest = async () => {
    const cards = (await getCards()) || [];
    console.log(cards);
    const updated = cards.map(item => {
      if (
        +item.balance === +selectedCard.balance &&
        item.userName === selectedCard.userName &&
        item.cardName === selectedCard.cardName
      ) {
        console.log('SS', item?.invest);
        const invest = [...(item?.invest || [])];

        const newInvest = invest.reduce((acc, item) => {
          if (item.shareName === shareName) {
            acc.push({
              ...item,
              suma:
                item.amountShares * item.sharePrice +
                +sharePrice * amountShares,
              amountShares: +item.amountShares + Number(amountShares),
            });
          } else {
            acc.push({
              ...item,
              color: generateRandomColor(),
              suma: +item.amountShares * item.sharePrice,
            });
          }
          return acc;
        }, []);
        const shouldPush = newInvest?.find(
          item => item.shareName === shareName,
        );
        if (!shouldPush) {
          newInvest.push({
            shareName,
            color: generateRandomColor(),
            amountShares,
            sharePrice,
            divident,
            suma: +amountShares * sharePrice,
            years,
            risePercentage,
          });
        }

        console.log({newInvest});

        return {
          ...item,
          balance: item.balance - +amountShares * sharePrice,
          invest: newInvest,
        };
      } else {
        return item;
      }
    });
    console.log({updated});
    await saveData(CARDS, JSON.stringify(updated));
    refetchCards();
    setTimeout(() => setSelectedCard(null), 100);
    setDivident(''), setShareName(''), setYears(''), setAmountShares('');
    setSharePrice(''), setRisePersentage('');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
          <SafeAreaView style={styles.box}>
            <View style={{paddingHorizontal: 18}}>
              <HeaderText text={'Инвестиции'} />
              {!!selectedCard ? (
                <Card hideDelete={true} item={selectedCard} />
              ) : (
                <CardList
                  setActiveCard={setActiveCard}
                  // hideIndicator={true}
                  hideDelete={true}
                  refetchCards={refetchCards}
                  cardsData={cardsData}
                />
              )}

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 5,
                  marginTop: 15,
                }}>
                <Pressable
                  onPress={
                    !!selectedCard ? () => setSelectedCard(null) : select
                  }
                  style={{
                    backgroundColor: !!selectedCard ? '#232336B2' : '#089981',
                    borderRadius: 14,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: fonts.SNProRegular,
                      fontSize: 16,
                    }}>
                    {!!selectedCard ? 'Отменить' : 'Выбрать'}
                  </Text>
                </Pressable>
              </View>
            </View>
            {selectedCard && (
              <View style={{flex: 1, paddingHorizontal: 18}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: 100}}
                  style={{flex: 1}}>
                  <CustomInput
                    error={errors.shareName}
                    formatFunc={str => str.toUpperCase()}
                    style={{backgroundColor: '#232336B2', marginTop: 20}}
                    text={shareName}
                    setText={setShareName}
                    placeholder={'Тикер акции'}
                  />
                  <CustomInput
                    error={errors.amountShares}
                    keyboardType={'numeric'}
                    style={{marginTop: 20, backgroundColor: '#232336B2'}}
                    text={amountShares}
                    formatFunc={formatNumberWithSpaces}
                    additionalText={'акций'}
                    setText={(str) => setAmountShares(str.split(' ').join(''))}
                    placeholder={'Количество акций'}
                  />
                  <CustomInput
                    error={errors.sharePrice}
                    keyboardType={'numeric'}
                    style={{marginTop: 20, backgroundColor: '#232336B2'}}
                    keyboardType={'numeric'}
                    text={sharePrice}
                    formatFunc={formatNumberWithSpaces}
                    additionalText={'RUB'}
                    setText={(str) => setSharePrice(str.split(' ').join(''))}
                    placeholder={'Цена 1 акции'}
                  />
                  <CustomInput
                    error={errors.divident}
                    keyboardType={'numeric'}
                    style={{marginTop: 20, backgroundColor: '#232336B2'}}
                    keyboardType={'numeric'}
                    text={divident}
                    additionalText={'RUB'}
                    formatFunc={formatNumberWithSpaces}
                    setText={(str) => setDivident(str.split(' ').join(''))}
                    placeholder={'Сумма дивидендов от 1 акции'}
                  />
                  <CustomInput
                    error={errors.years}
                    keyboardType={'numeric'}
                    style={{marginTop: 20, backgroundColor: '#232336B2'}}
                    keyboardType={'numeric'}
                    text={years}
                    formatFunc={formatNumberWithSpaces}
                    additionalText={'ЛЕТ'}
                    setText={(str) => setYears(str.split(' ').join(''))}
                    placeholder={'Количество лет удержания акций'}
                  />
                  <CustomInput
                    error={errors.risePercentage}
                    keyboardType={'numeric'}
                    style={{marginTop: 20, backgroundColor: '#232336B2'}}
                    keyboardType={'numeric'}
                    text={risePercentage}
                    formatFunc={formatNumberWithSpaces}
                    additionalText={'%'}
                    setText={(str) => setRisePersentage(str.split(' ').join(''))}
                    placeholder={'% Роста в год'}
                  />

                  <Button
                    style={{marginTop: 40}}
                    variant={'green'}
                    disabled={!valid}
                    onPress={onInvest}
                    text={buttonText.start}
                  />
                </ScrollView>
              </View>
            )}
          </SafeAreaView>
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
