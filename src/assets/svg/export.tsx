import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ExportIcon(props) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M33.542 17.5l-5.834-5.833v4.375H14.583v2.916h13.125v4.375M1.458 26.25V8.75a2.917 2.917 0 012.917-2.917h17.5a2.917 2.917 0 012.917 2.917v4.375h-2.917V8.75h-17.5v17.5h17.5v-4.375h2.917v4.375a2.916 2.916 0 01-2.917 2.917h-17.5a2.917 2.917 0 01-2.917-2.917z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ExportIcon;
