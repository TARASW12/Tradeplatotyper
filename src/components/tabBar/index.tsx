import {View, Platform, Pressable} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import HomeIcon from '../../assets/svg/home.tsx';
import ProfileIcon from '../../assets/svg/profile.tsx';
import CardsIcon from '../../assets/svg/cards.tsx';
import AnalyticsIcon from '../../assets/svg/analytics.tsx';

const icons = {
  Home: HomeIcon,
  Profile: ProfileIcon,
  Cards: CardsIcon,
  Analytics: AnalyticsIcon,
};

const a = ['Invest', 'BusineesPid', 'YourDeal', 'InvestPid'];

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();
  console.log(state);
  return (
    <View
      style={{
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20, // Щоб трохи підняти над фоном
        left: 20,
        right: 20,
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 53,
          width: '100%',
          borderRadius: 16,
          shadowRadius: 15,

          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        {state.routes.map((route, index) => {
          if (a.includes(route.name)) {
            return null;
          }
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const IconComponent = icons[route.name];
          return (
            <Pressable
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {isFocused ? <IconComponent color="black" /> : <IconComponent />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default MyTabBar;
