import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {fonts} from '../../styles';
import CloseIcon from '../../assets/svg/close.tsx';
import React, {useEffect, useState} from 'react';
import {CARDS, formatNumberWithSpaces, getCards} from '../../helpers/cards.js';
import {saveData} from '../../asyncStorage';

export const menuItems = [
  {name: 'Маркетинг', color: '#13557EB2'},
  {name: 'Разработка', color: '#F77547'},
  {name: 'Оп.расходы', color: '#9784F8'},
  {name: 'Резевр', color: '#FE595B'},
  {name: 'Аналитика', color: '#089981'},
  {name: 'Запуск', color: '#FEC54C'},
];

export const menuItemsValues = {
  ['Маркетинг']: 0,
  ['Разработка']: 0,
  ['Оп.расходы']: 0,
  ['Резевр']: 0,
  ['Аналитика']: 0,
  ['Запуск']: 0,
};

export const YourDealComponent = ({closeBlur, refetchCards, selectedCard}) => {
  const {width} = useWindowDimensions();
  const [activeType, setActiveType] = useState(menuItems[0]);
  // console.log(selectedCard, 88);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  console.log({selectedCard});
  useEffect(() => {
    if (+text > +selectedCard.balance) {
      setError(`Максимум ${selectedCard.balance}`);
    } else {
      setError('');
    }
  }, [text]);

  const onSave = async () => {
    const cards = await getCards();
    const newCards = cards.map(c => {
      if (
        c.id === selectedCard.id &&
        c.cardName === selectedCard.cardName &&
        c.userName === selectedCard.userName
      ) {
        return {
          ...c,
          balance: c.balance - text,
          yourDeal: {
            ...menuItemsValues,
            ...c?.yourDeal,
            [activeType.name]: +text,
          },
        };
      } else {
        return c;
      }
    });
    await saveData(CARDS, JSON.stringify(newCards));
    refetchCards();
    closeBlur();
  };

  return (
    <View style={styles.absolute}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{paddingHorizontal: 18}}>
          <View
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: fonts.SNProBold,
                fontSize: 22,
                color: 'white',
              }}>
              Разделить вложения
            </Text>
            <Pressable onPress={closeBlur}>
              <CloseIcon />
            </Pressable>
          </View>

          <View
            style={{
              justifyContent: 'center',
              marginTop: 50,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 290,
                borderRadius: 16,
                height: 130,
                backgroundColor: activeType.color,
              }}>
              <TextInput
                keyboardType={'numeric'}
                value={formatNumberWithSpaces(text)}
                onChangeText={(str) => setText(str.split(' ').join(''))}
                style={{
                  height: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  color: 'white',
                  fontFamily: fonts.SNProBold,
                  fontSize: 30,
                  textAlign: 'center',
                }}
              />
            </View>
            {!!error && (
              <View
                style={{
                  backgroundColor: 'white',
                  marginTop: 4,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 16,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SNProRegular,
                    fontSize: 12,
                    color: 'red',
                  }}>
                  {error}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
              columnGap: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => setActiveType(item)}
                key={index}
                style={{
                  width: (width - 32 - 15) / 2,
                  marginBottom: 20,
                  backgroundColor: item.color,
                  paddingHorizontal: 16,
                  paddingVertical: 25,
                  borderRadius: 16,
                  borderWidth: activeType.name === item.name ? 2 : 1,
                  borderColor:
                    activeType.name === item.name ? 'black' : 'white',
                }}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={onSave}
              style={{
                backgroundColor: '#232336B2',
                flex: 1,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'white',
                paddingVertical: 16,
                paddingHorizontal: 12,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.SNProBoldItalic,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Сохранить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lastItem: {
    borderBottomWidth: 0,
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.SNProBlackItalic,
    color: 'white',
  },
});
