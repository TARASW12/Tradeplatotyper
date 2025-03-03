import {useEffect} from 'react';

export const useValidate = ({
  shareName,
  setValid,
  years,
  risePercentage,
  setErrors,
  selectedCard,
  sharePrice,
  divident,
  amountShares,
}) => {
  useEffect(() => {
    if (shareName.length > 6) {
      setErrors(errors => ({...errors, shareName: 'Максимум 6 символов'}));
    } else {
      setErrors(errors => ({...errors, shareName: ''}));
    }

    if (+selectedCard?.balance / sharePrice < amountShares) {
      setErrors(errors => ({
        ...errors,
        amountShares: `${
          Math.round(+selectedCard.balance / sharePrice) - 1
        } Максимальное доступное количество`,
      }));
    } else {
      setErrors(errors => ({...errors, amountShares: ''}));
    }

    if (sharePrice > 10000) {
      setErrors(errors => ({
        ...errors,
        sharePrice: 'Максимальная цена акции 10000',
      }));
    } else {
      setErrors(errors => ({...errors, sharePrice: ''}));
    }

    if (divident > 5000) {
      setErrors(errors => ({
        ...errors,
        divident: 'Максимальный дивидент 5000',
      }));
    } else {
      setErrors(errors => ({...errors, divident: ''}));
    }

    if (years > 50) {
      setErrors(errors => ({
        ...errors,
        years: 'Максимальное количество лет 50',
      }));
    } else {
      setErrors(errors => ({...errors, years: ''}));
    }

    if (risePercentage > 100) {
      setErrors(errors => ({
        ...errors,
        risePercentage: 'Максимальный рост 100%',
      }));
    } else {
      setErrors(errors => ({...errors, risePercentage: ''}));
    }
    // console.log(shareName.length > 2 && shareName.length <= 6, 1);
    // console.log(+sharePrice > 0 && +sharePrice <= 10000, 2);
    // console.log(divident > 0 && divident < 5000, 3);
    // console.log(years > 1 && years < 50, 4);
    // console.log(risePercentage < 100, 5);

    if (
      shareName.length > 1 &&
      shareName.length <= 6 &&
      +sharePrice > 0 &&
      +sharePrice <= 10000 &&
      divident > 0 &&
      divident < 5000 &&
      years >= 1 &&
      years < 50 &&
      risePercentage < 100
    ) {
      setValid(true);
    }
  }, [
    shareName,
    selectedCard,
    sharePrice,
    amountShares,
    divident,
    years,
    risePercentage,
  ]);
};
