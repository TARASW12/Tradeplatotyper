import {useEffect} from 'react';
import {ERRORS} from '../../configText';

export const useValidation = ({
  yourName,
  setErrors,
  cardName,
  sum,
  cardNumber,
  type,
  setSubmit,
}) => {
  console.log(sum, sum.length);
  useEffect(() => {
    if (yourName.length > 30 && !!yourName.length) {
      setErrors(prev => ({...prev, name: ERRORS.name}));
    } else {
      setErrors(prev => ({...prev, name: ''}));
    }
    if (cardName.length > 30 && !!cardName.length) {
      setErrors(prev => ({...prev, cardNa: ERRORS.name}));
    } else {
      setErrors(prev => ({...prev, cardNa: ''}));
    }
    if (+sum > 10000000) {
      setErrors(prev => ({...prev, amount: ERRORS.amount}));
    } else {
      setErrors(prev => ({...prev, amount: ''}));
    }
    if (cardNumber.length !== 19 && !!cardNumber.length) {
      setErrors(prev => ({...prev, cardNu: ERRORS.cardNu}));
    } else {
      setErrors(prev => ({...prev, cardNu: ''}));
    }
    if (
      yourName.length <= 30 &&
      !!yourName.length &&
      cardName.length <= 30 &&
      !!cardName.length &&
      sum <= 10000000 &&
      sum > 10 &&
      cardNumber.length === 19 &&
      !!type
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [yourName, cardName, cardNumber, sum, type]);
};
