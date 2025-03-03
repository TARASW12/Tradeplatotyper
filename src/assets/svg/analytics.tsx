import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const variants = {
  black: '#000',
  gray: '#666',
};

type Props = {
  color: keyof typeof variants;
};
function AnalyticsIcon({color = 'gray'}: Props) {
  return (
    <Svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M18.19 18.125l3.03 5.25h-2.019l-3.031-5.25h-4.33l-3.03 5.25H6.79l3.031-5.25H4.375a.875.875 0 01-.875-.875V2.375H1.75a.875.875 0 010-1.75h24.5a.875.875 0 110 1.75H24.5V17.25a.875.875 0 01-.875.875h-5.436zm4.56-15.75H5.25v14h17.5v-14zm-13.125 7a.875.875 0 01.875.875V12a.875.875 0 11-1.75 0v-1.75a.875.875 0 01.875-.875zM14 7.625a.875.875 0 01.875.875V12a.875.875 0 11-1.75 0V8.5A.875.875 0 0114 7.625zm4.375-1.75a.875.875 0 01.875.875V12a.875.875 0 11-1.75 0V6.75a.875.875 0 01.875-.875z"
        fill={variants[color]}
      />
    </Svg>
  );
}

export default AnalyticsIcon;
