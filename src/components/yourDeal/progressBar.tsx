import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProgressBar = ({label, progress, color}) => {
  const totalDots = 10; // Кількість точок у фоні
  const filledWidth = `${progress * 100}%`; // Довжина синьої лінії

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.progressContainer}>
        {/* Заповнена частина */}
        <View
          style={[
            styles.filledBar,
            {width: filledWidth, backgroundColor: color},
          ]}
        />
        {/* Темний фон з точками */}
        <View style={styles.dotsContainer}>
          {Array.from({length: totalDots}).map((_, index) => (
            <View key={index} style={styles.dot} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "center",
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  progressContainer: {
    // flex: 1,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#87848a',
    position: 'relative',
    overflow: 'hidden',
  },
  filledBar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 4,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#444',
    borderRadius: 50,
  },
});

export default ProgressBar;
