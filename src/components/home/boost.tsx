import {
  Image,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import img from '../../assets/imgs/img.png';
import React from 'react';
import {fonts} from '../../styles';

export const Boost = ({style, header, onPress, description}) => {
  const {width} = useWindowDimensions();
  const calculatedWidth = (width - 32 - 20) / 2; // Розраховуємо ширину для контейнера

  return (
    <View style={[styles.container, {width: calculatedWidth}, style]}>
      <Image style={[styles.image, {width: calculatedWidth}]} source={img} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>{header}</Text>
          <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Открыть</Text>
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  image: {
    height: 120,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  content: {
    padding: 12,
    backgroundColor: '#1E1E1EBF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 5,
    marginBottom: 4,
  },
  headerText: {
    fontFamily: fonts.SNProBlack,
    fontSize: 12,
    color: 'white',
  },
  button: {
    paddingVertical: 6,
    backgroundColor: '#089981',
    borderRadius: 12,
    paddingHorizontal: 13,
  },
  buttonText: {
    color: 'white',
  },
  description: {
    fontFamily: fonts.SNProRegular,
    fontSize: 14,
    color: 'white',
  },
});
