import {useEffect} from 'react';
import {getData, saveData} from '../../asyncStorage';
import {PROFILE_IMAGE, PROFILE_NAME} from '../../helpers/profile.js';
import RNFS from 'react-native-fs';

export const useProfile = ({setImageUri, setText, setSavedName}) => {
  useEffect(() => {
    const get = async () => {
      try {
        const profileName = await getData(PROFILE_NAME);
        setText(profileName || '');
        setSavedName(profileName || '');

        const fileName = await getData(PROFILE_IMAGE);
        if (fileName) {
          const fullPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
          const fileExists = await RNFS.exists(fullPath);
          if (fileExists) {
            setImageUri(fullPath);
          } else {
            await saveData(PROFILE_IMAGE, null);
            setImageUri(null);
          }
        }
      } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
      }
    };
    get();
  }, []);
};
