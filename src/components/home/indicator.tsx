import {View, StyleSheet} from 'react-native';
import React from 'react';

export const Indicator = ({count, activeIndex}) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({length: count}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === activeIndex
              ? styles.activeIndicator
              : styles.inactiveIndicator,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white', // Колір активної точки
  },
  inactiveIndicator: {
    backgroundColor: '#002457', // Колір неактивної точки
  },
});
