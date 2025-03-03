import {Text, View} from 'react-native';
import {fonts} from '../../styles';
import React from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {BlurView} from '@react-native-community/blur';
const CircularProgressChart = ({data, bg, textInside, padding, gap}) => {
  //   const percentage =40
  // const data = [
  //   {
  //     value: percentage,
  //     color: "rgba(63, 22, 246, 1)", // Колір для заповнення (наприклад, зелений)
  //     // gradientCenterColor: 'gray', // Градієнт для заповнення
  //   },
  //   {
  //     value: 100 - percentage,
  //     color: "rgba(163, 222, 246, 1)", // Колір для незаповненої частини (наприклад, сірий)
  //     // gradientCenterColor: 'pink', // Градієнт для незаповненої частини
  //   },
  // ];

  return (
    <View
      style={{
        borderRadius: 16,
        columnGap: gap || 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: padding || 10,
        // backgroundColor: bg || 'rgba(44, 52, 94, 0.8)',
      }}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 16,
          bottom: 0,
        }}
        blurType="light"
        blurAmount={6}
      />
      <PieChart
        data={data}
        donut // Використовуємо кільцеву діаграму
        showText // Показуємо текст у центрі
        textColor="black"
        textSize={20}
        centerLabelComponent={() => (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fonts.SNProBoldItalic,
                color: 'white',
                fontSize: 16,
              }}>
              {textInside}
            </Text>
          </View>
        )}
        innerCircleColor={'gray'}
        radius={80} // Радіус кола
        innerRadius={60} // Внутрішній радіус для створення кільця
        focusOnPress // Фокусування при натисканні
      />
      <View>
        {data.map(item => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 6,
                  width: 6,
                  backgroundColor: item.color,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.SNProBlackItalic,
                  color: 'white',
                  fontSize: 14,
                }}>{`${item.shareName} ${item.value} %`}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const Invest = ({
  pieData,
  gap,
  textInside,
  bg,
  marginTop,
  padding,
  label,
  not,
}) => {
  return (
    <>
      {pieData?.length > 1 ? (
        <View style={{marginTop: marginTop}}>
          <Text
            style={{
              marginBottom: 15,
              fontFamily: fonts.SNProBold,
              color: 'white',
              fontSize: 20,
            }}>
            {label}
          </Text>
          <CircularProgressChart
            bg={bg}
            textInside={textInside}
            padding={padding}
            gap={gap}
            data={pieData}
          />
        </View>
      ) : (
        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginBottom: 15,
              fontFamily: fonts.SNProBold,
              color: 'white',
              fontSize: 20,
            }}>
            {label}
          </Text>
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(44, 52, 94, 0.8)',
              borderRadius: 16,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: fonts.SNProBoldItalic,
              }}>
              {not}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
