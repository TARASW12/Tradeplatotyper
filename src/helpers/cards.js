import {getData} from '../asyncStorage';
import XLSX from "xlsx";
import RNFS from "react-native-fs";
import Share from "react-native-share";

export const CARDS = 'cards';
export const formatStr = str => str.slice(0, 30);
export const formatN = str =>{
  const b = formatNumberWithSpaces(str || '')
  return b.slice(0,11)
};

export function formatCardNumber(cardNumber) {
  cardNumber = cardNumber.replace(/\D/g, '');

  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-').slice(0, 19);
}
export function getLast4CharsWithoutDash(input) {
  const cleanedInput = input.replace(/-/g, '');

  return cleanedInput.slice(-4);
}

export const getCards = async () => {
  const data = await getData(CARDS);
  return JSON.parse(data);
};

export const getActiveCard = async id => {
  const data = await getData(CARDS);
  const parsed = JSON.parse(data);
  const activeCard = parsed.find(c => c.id === id);
  return activeCard;
};



export const createAndDownloadExcel = async ({cards, invest}) => {
  try {
    const ws = XLSX.utils.json_to_sheet(cards);

    const columns = Object.keys(ws).filter(key => key[0] !== '!');
    ws['!cols'] = columns.map(() => ({wch: 30}));
    let wt = [];

    if (invest?.length) {
      wt = XLSX.utils.json_to_sheet(invest);
    }
    const columns2 = Object.keys(wt).filter(key => key[0] !== '!');
    wt['!cols'] = columns2.map(() => ({wch: 30}));

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Лист1');
    if (invest?.length) {
      XLSX.utils.book_append_sheet(wb, wt, 'Лист2');
    }

    const excelFile = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

    const path = `${RNFS.DocumentDirectoryPath}/myData.xlsx`;

    await RNFS.writeFile(path, excelFile, 'base64');

    await Share.open({
      url: `file://${path}`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      title: 'Скачати файл',
      failOnCancel: false,
    });
  } catch (error) {
    console.error('Помилка створення файлу:', error);
  }
}


export function formatNumberWithSpaces(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
