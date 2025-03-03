import {useEffect} from 'react';
import {saveData} from '../../asyncStorage';
import {CARDS} from '../../helpers/cards.js';
import {INTRODUCE} from '../../helpers/introduce.js';

export const defaultAr = [
  {
    id: 'wefhiuhwefhiewwe',
    userName: 'Дмитрий',
    cardName: 'Виртуальная карта',
    cardNumber: '1234',
    balance: 500000,
    type: 'Visa',
  },
];

export const useHandleFirstLogin = () => {
  useEffect(() => {
    const saveTestCard = async () => {
      await saveData(CARDS, JSON.stringify(defaultAr));
    };
    const passIntroduce = async () => {
      await saveData(INTRODUCE, 'yes');
    };
    saveTestCard();
    passIntroduce();
  }, []);
};
