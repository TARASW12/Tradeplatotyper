import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLandmark} from '@fortawesome/free-solid-svg-icons/faLandmark';
import {fonts} from '../../styles';

export const WebVieewComp = () => {
  const [showWebView, setShowWebView] = useState(false);

  return (
    <SafeAreaView style={{}}>
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={() => setShowWebView(true)}>
          <FontAwesomeIcon size={20} color={'white'} icon={faLandmark} />
        </Pressable>
      </View>
      <Text
        style={{
          fontFamily: fonts.SNProBold,
          marginTop: 10,
          fontSize: 20,
          color: 'white',
        }}>
        Политика конфиденциальности
      </Text>
      <Modal visible={showWebView} animationType="slide">
        <View style={{flex: 1}}>
          <WebView
            source={{uri: 'https://bank.com.ua/ru/privacy-policy'}}
            style={{flex: 1}}
          />
          <TouchableOpacity
            onPress={() => setShowWebView(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
