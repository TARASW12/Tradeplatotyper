import {Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {fonts} from '../../styles';
import React from 'react';
import {formatNumberWithSpaces} from "../../helpers/cards.js";

export const Data = ({income, waste}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 20,
        borderColor: 'white',
        paddingVertical: 30,
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
        blurType="dark"
        blurAmount={1}
      />
      <Text
        style={{
          color: 'white',
          fontFamily: fonts.SNProBold,
          fontSize: 20,
        }}>
        Профит
      </Text>

      <View style={{paddingVertical: 15, paddingHorizontal: 40, marginTop: 20}}>
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 16,
            bottom: 0,
          }}
          blurType="dark"
          blurAmount={7}
        />
        <View style={{}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 7,
                backgroundColor: '#2ac754',
              }}
            />
            <Text style={{color: 'white'}}>Доход</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              columnGap: 10,
            }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 7,
                backgroundColor: '#0ba0e0',
              }}
            />
            <Text style={{color: 'white'}}>Затраты</Text>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: 15, paddingHorizontal: 40, marginTop: 20}}>
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 16,
            bottom: 0,
          }}
          blurType="dark"
          blurAmount={7}
        />
        <View style={{}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 7,
                backgroundColor: '#2ac754',
              }}
            />
            <Text style={{color: 'white'}}>
              {' '}
              {income > 1000000
                ? `${formatNumberWithSpaces((income / 1000000).toFixed(2))} млн. RUB`
                : `${formatNumberWithSpaces(income)} RUB`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              columnGap: 10,
            }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 7,
                backgroundColor: '#0ba0e0',
              }}
            />
            <Text style={{color: 'white'}}>
                {waste > 1000000
                    ? `${formatNumberWithSpaces((waste / 1000000).toFixed(2))} млн. RUB`
                    : `${formatNumberWithSpaces(waste)} RUB`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
