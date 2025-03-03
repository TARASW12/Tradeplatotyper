import {launchImageLibrary} from 'react-native-image-picker';
import {saveData} from '../asyncStorage';
import RNFS from 'react-native-fs';

export const PROFILE_IMAGE = 'profileImage';
export const PROFILE_NAME = 'profileName';

// export const pickImage = func => {
//   launchImageLibrary({mediaType: 'photo'}, response => {
//     if (response.didCancel) {
//     } else if (response.errorMessage) {
//     } else {
//       const uri = response.assets[0].uri;
//       if (uri) {
//         func(uri);
//         saveData(PROFILE_IMAGE, uri);
//       }
//     }
//   });
// };

export const pickImage = async func => {
  launchImageLibrary({mediaType: 'photo'}, async response => {
    if (response.didCancel) {
      console.log('Користувач скасував вибір зображення');
    } else if (response.errorMessage) {
      console.log('Помилка ImagePicker: ', response.errorMessage);
    } else {
      const uri = response.assets[0].uri;
      if (uri) {
        const fileName = `${Date.now()}.jpg`;
        const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
          await RNFS.copyFile(uri, newPath);
          await saveData(PROFILE_IMAGE, fileName);
          func(newPath);
        } catch (error) {
          console.error('Помилка збереження файлу:', error);
        }
      }
    }
  });
};
