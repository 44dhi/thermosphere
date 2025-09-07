import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PinOutlined = (props: SvgProps) => (
  <Svg viewBox="0 0 48 48" width={48} height={48} fill="none" {...props}>
    <Path
      fill="#EF4444"
      fillRule="evenodd"
      d="M38 20c0 3.802-1.688 7.408-4.61 9.842l-4.59 3.826a12.82 12.82 0 0 0-3.952 5.79L24 42l-.848-2.542a12.81 12.81 0 0 0-3.952-5.79l-4.592-3.826A12.813 12.813 0 0 1 10 20v.072c0-8.736 7.234-13.804 14-13.804s14 5.068 14 13.804"
      clipRule="evenodd"
    />
    <Path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M38 20v0c0 3.802-1.688 7.408-4.61 9.842l-4.59 3.826a12.82 12.82 0 0 0-3.952 5.79L24 42l-.848-2.542a12.81 12.81 0 0 0-3.952-5.79l-4.592-3.826A12.813 12.813 0 0 1 10 20v.072c0-8.736 7.234-13.804 14-13.804s14 5.068 14 13.804"
    />
    <Path
      fill="#F4F4F5"
      fillRule="evenodd"
      d="M27.025 17.52a4.278 4.278 0 1 1-6.05 6.05 4.278 4.278 0 0 1 6.05-6.05"
      clipRule="evenodd"
    />
    <Path
      stroke="#F4F4F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M27.025 17.52a4.278 4.278 0 1 1-6.05 6.05 4.278 4.278 0 0 1 6.05-6.05"
    />
  </Svg>
);
export default PinOutlined;
