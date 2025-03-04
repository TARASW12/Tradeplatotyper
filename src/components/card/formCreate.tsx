import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import CloseIcon from '../../assets/svg/close.tsx';
import {Card} from './card.tsx';
import {buttonText, cards, ERRORS} from '../../configText';
import {CustomInput} from '../input';
import DropDownPicker from 'react-native-dropdown-picker';
import {fonts} from '../../styles';
import React, {useEffect, useState} from 'react';
import {Button} from '../welcome';
import {
  CARDS,
  formatCardNumber,
  formatN, formatNumberWithSpaces,
  formatStr,
  getCards,
  getLast4CharsWithoutDash,
} from '../../helpers/cards.js';
import {useValidation} from '../../hooks/cards';
import {saveData} from '../../asyncStorage';

const inputs = [
  {text: cards.yourName, type: 'default'},
  {text: cards.cardName, type: 'default'},
  {text: cards.sum, type: 'default'},
  {text: cards.card, type: 'default'},
  {text: cards.type, type: 'default'},
];

const generateComplexId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const FormCreate = ({closeBlur, refetchCards}) => {
  const [yourName, setYourName] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [sum, setSym] = useState('');
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    cardNu: '',
    cardNa: '',
    amount: '',
  });

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [items, setItems] = useState([
    {label: 'Visa', value: 'Visa'},
    {label: 'Master Card', value: 'MC'},
  ]);

  const saveCard = async () => {
    const cards = (await getCards()) || [];
    await saveData(
      CARDS,
      JSON.stringify([
        ...cards,
        {
          userName: yourName,
          cardName,
          cardNumber,
          balance: sum,
          id: generateComplexId(),
          type,
        },
      ]),
    );
    refetchCards();
    closeBlur();
  };

  console.log(sum, typeof sum)
  useValidation({
    sum,
    setErrors,
    setSubmit,
    type,
    yourName,
    cardName,
    cardNumber,
  });

  return (
    <View style={styles.absolute}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 20,
                display: 'flex',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Pressable onPress={closeBlur}>
                <CloseIcon />
              </Pressable>
            </View>
            <View style={{marginTop: 10, paddingHorizontal: 20}}>
              <Card
                hideDelete={true}
                create={true}
                item={{
                  userName: yourName || cards.yourName,
                  cardName: cardName || cards.cardName,
                  cardNumber: getLast4CharsWithoutDash(cardNumber) || '0000',
                  balance: sum || cards.sum,
                  type: type || cards.type,
                }}
              />
              <CustomInput
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.7)',
                  marginTop: 30,
                }}
                formatFunc={formatStr}
                error={errors.name}
                placeholder={cards.yourName}
                text={yourName}
                setText={setYourName}
              />
              <CustomInput
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.7)',
                  marginTop: 15,
                }}
                formatFunc={formatStr}
                placeholder={cards.cardName}
                text={cardName}
                error={errors.cardNa}
                setText={setCardName}
              />
              <CustomInput
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.7)',
                  marginTop: 15,
                }}
                keyboardType={'numeric'}
                placeholder={cards.card}
                error={errors.cardNu}
                // formatFunc={formatCardNumber}
                text={cardNumber}
                setText={text => setCardNumber(formatCardNumber(text))}
              />

              <CustomInput
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.7)',
                  marginTop: 10,
                }}
                keyboardType={'numeric'}
                placeholder={cards.sum}
                formatFunc={formatN}
                text={sum}
                error={errors.amount}
                setText={str => setSym(str.split(' ').join('').slice(0,11))}
              />
              <DropDownPicker
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{
                  position: 'relative',
                  top: 0,
                }}
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.7)',
                  color: 'white',
                  width: '100%',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 16,
                }}
                placeholderStyle={{
                  textAlign: 'center',
                  width: '100%',
                  color: '#bbb',
                  fontSize: 18,
                }}
                textStyle={{
                  color: 'white',
                  width: '100%',
                  fontSize: 18,
                  fontFamily: fonts.SNProRegular,
                  textAlign: 'center',
                }}
                placeholder={cards.type}
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
                setItems={setItems}
                dropDownContainerStyle={{
                  backgroundColor: 'transparent',
                  marginTop: 10,
                  borderWidth: 0,
                }}
                listItemContainerStyle={styles.listItem}
                listItemLabelStyle={styles.listItemLabel}
              />

              <Button
                style={{marginTop: 40}}
                variant={'green'}
                disabled={!submit}
                onPress={saveCard}
                text={buttonText.start}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  listItem: {
    marginTop: 2,
    borderRadius: 16,
    backgroundColor: 'rgba(126, 126,126, 0.9)',
  },
  listItemLabel: {
    color: 'white',
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
