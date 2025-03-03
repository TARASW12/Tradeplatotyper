import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const variants = {
  black: '#000',
  gray: '#666',
};

type Props = {
  color: keyof typeof variants;
};

function HomeIcon({color = 'gray'}: Props) {
  return (
    <Svg
      width={29}
      height={28}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.875 16.625c.483 0 .875.392.875.875V21A.875.875 0 0114 21v-3.5c0-.483.392-.875.875-.875z"
        fill={variants[color]}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.674 2.619l8.087 6.464c.599.483 1.048 1.19 1.323 1.91.274.72.41 1.547.286 2.308v.003l-1.552 9.287v.002c-.352 2.065-2.313 3.727-4.41 3.727H8.342c-2.108 0-4.059-1.65-4.41-3.727l-1.55-9.284-.001-.002c-.132-.763.001-1.592.277-2.314.275-.722.728-1.43 1.334-1.912l.002-.001 8.082-6.473c1.558-1.249 4.031-1.247 5.598.012zm-1.096 1.365c-.93-.748-2.492-.745-3.407-.011L5.083 10.45c-.303.241-.597.66-.79 1.167-.194.508-.253 1.014-.188 1.393l.001.006L5.658 22.3c.209 1.235 1.431 2.269 2.684 2.269h13.066c1.24 0 2.475-1.044 2.684-2.269V22.3l1.551-9.281v-.002c.062-.382 0-.89-.195-1.4-.194-.51-.485-.929-.784-1.17h-.001L16.58 3.985l-.002-.001z"
        fill={variants[color]}
      />
    </Svg>
  );
}

export default HomeIcon;
