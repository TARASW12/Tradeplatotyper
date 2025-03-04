import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CardAdd(props) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={19} cy={19} r={19} fill="#fff" fillOpacity={0.5} />
      <Path
        d="M20.5 16.25H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11.5c.41 0 .75.34.75.75s-.34.75-.75.75zM15 24.25h-2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75zM21.5 24.25h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill="#292D32"
      />
      <Path
        d="M24.56 28.25H13.44c-3.98 0-5.19-1.2-5.19-5.14v-8.22c0-3.94 1.21-5.14 5.19-5.14h7.06c.41 0 .75.34.75.75s-.34.75-.75.75h-7.06c-3.14 0-3.69.54-3.69 3.64v8.21c0 3.1.55 3.64 3.69 3.64h11.11c3.14 0 3.69-.54 3.69-3.64v-4.08c0-.41.34-.75.75-.75s.75.34.75.75v4.08c.01 3.95-1.2 5.15-5.18 5.15z"
        fill="#292D32"
      />
      <Path
        d="M29 14h-5.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H29c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill="#292D32"
      />
      <Path
        d="M26.25 16.75c-.41 0-.75-.34-.75-.75v-5.5c0-.41.34-.75.75-.75s.75.34.75.75V16c0 .41-.34.75-.75.75z"
        fill="#292D32"
      />
    </Svg>
  );
}

export default CardAdd;
