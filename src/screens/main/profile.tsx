import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import bgGreen from '../../assets/backgrounds/bgGreen.png';
import {cards, profile} from '../../configText';
import {fonts} from '../../styles';
import {CustomInput} from '../../components/input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {pickImage, PROFILE_IMAGE, PROFILE_NAME} from '../../helpers/profile.js';
import {getData, saveData} from '../../asyncStorage';
import {HeaderText} from '../../components/headerText';
import {useProfile} from '../../hooks/profile';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';
import {CARDS, getCards} from '../../helpers/cards.js';
import {Exporrt} from '../../components/profile/exporrt.tsx';
import {Data} from '../../components/profile/data.tsx';
import {WebVieewComp} from '../../components/webView';
import {Private} from '../../components/profile/private.tsx';
import {Delete} from '../../components/profile/delete.tsx';
import {defaultAr} from "../../hooks/introduce";
import {useFocusEffect} from "@react-navigation/native";



const BASA = {
  balance: 'Баланс',
  cardName: 'Имя карты',
  cardNumber: 'Номер карты',
  id: 'Айди',
  type: 'Тип карты',
  userName: 'Имя',
};

const BASASHARE = {
  amountShares: 'Количество акций',
  divident: 'Дивиденты',
  risePercentage: 'Процент роста в год',
  shareName: 'Тикер акции',
  sharePrice: 'Цена акции',
  years: 'Лет инвестирования',
};
export const Profile = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState<string | null>('');
  const [savedName, setSavedName] = useState<string | null>('');
  const [cards, setCards] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [income, setIncome] = useState(0);
  const [waste, setWaste] = useState(0);
  const [ref, setRef] = useState(false)
  useProfile({setText, setImageUri, setSavedName});

  const refetch = () => setRef(prev => !prev)

  const saveName = async () => {
    await saveData(PROFILE_NAME, text);
  };

  const deleteHandler = async () => {
    console.log(123)
    await  saveData(CARDS, JSON.stringify(defaultAr))
    refetch()
  }
  const get = async () => {
    const cards = (await getCards()) || [];
    console.log(cards,123)
    setCards(
        cards.map(item => {
          return {
            [BASA.balance]: item.balance,
            [BASA.cardName]: item.cardName,
            [BASA.cardNumber]: item.cardNumber,
            [BASA.id]: item.id,
            [BASA.type]: item.type,
            [BASA.userName]: item.userName,
          };
        }),
    );

    const data = [];
    if (cards?.length) {
      cards.map(c => {
        if (c?.invest?.length) {
          return c?.invest.map(i => {
            data.push(i);
          });
        } else {
          return 0;
        }
      });
    }

    setInvestments(
        data?.length
            ? data.map(item => {
              return {
                [BASASHARE.amountShares]: item.amountShares,
                [BASASHARE.shareName]: item.shareName,
                [BASASHARE.sharePrice]: item.sharePrice,
                [BASASHARE.risePercentage]: item.risePercentage,
                [BASASHARE.years]: item.years,
                [BASASHARE.divident]: item.divident,
              };
            })
            : null,
    );
  };
  useEffect(() => {

    get();
  }, [ref]);
  const getD = async () => {
    const cards = (await getCards()) || [];
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

    const allDividents = divident.reduce((acc, it) => (acc += it), 0);
    const allShares = shares.reduce((acc, it) => (acc += it), 0);
    setIncome(allDividents + allShares);
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
    const businessW = business.reduce((acc, it) => (acc += it), 0);
    setWaste(businessW);
  };
  useEffect(() => {

    getD();
  }, [ref]);

  useFocusEffect(() =>{
    getD()
  })

  console.log({cards, investments});
  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" style={{flex: 1}} source={bgGreen}>
        <SafeAreaView style={styles.box}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}>
            <View style={{flex: 1, paddingHorizontal: 18}}>
              <HeaderText text={profile.account} />

              <View style={styles.container}>
                {imageUri ? (
                  <Pressable onPress={() => pickImage(setImageUri)}>
                    <Image source={{uri: imageUri}} style={styles.image} />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => pickImage(setImageUri)}
                    style={styles.skeleton}>
                    <FontAwesomeIcon
                      size={50}
                      color={'white'}
                      icon={faPlusCircle}
                    />
                  </Pressable>
                )}
                <View style={{flex: 1, rowGap: 20}}>
                  <CustomInput
                    placeholder={profile.placeholder}
                    text={text}
                    setText={setText}
                  />
                  <TouchableOpacity
                    onPress={saveName}
                    style={{
                      ...styles.button,
                      backgroundColor:
                        savedName === text
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'white',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: fonts.SNProRegular,
                        fontSize: 12,
                        color: savedName === text ? '#A1A1A1' : 'black',
                        textAlign: 'center',
                      }}>
                      {profile.reduct}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Private />
                <Data income={income} waste={waste} />
                <Exporrt cards={cards} investments={investments} />
                <Delete deleteHandler={deleteHandler}/>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.SNProRegular,
    marginBottom: 25,
    marginTop: 20,
    fontSize: 32,
    fontWeight: 500,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    height: 31,
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  box: {
    flex: 1,
  },
  skeleton: {
    width: 160,
    height: 120,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 16,
  },
  container: {
    columnGap: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
