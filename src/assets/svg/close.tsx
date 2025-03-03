import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CloseIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.637 7.137l-1.775-1.774L15 13.238 7.137 5.363 5.362 7.136 13.237 15l-7.875 7.863 1.775 1.774L15 16.762l7.862 7.875 1.775-1.774L16.762 15l7.875-7.863z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CloseIcon;
