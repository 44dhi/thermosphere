import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const ThermoStatControlBackground = (props: SvgProps) => {
  return (
    <Svg
    width={320}
    height={251}
    fill="none"
    {...props}
  >
    <Path
      fill="#F4F4F5"
      fillOpacity={0.12}
      d="M275.296 247.29c7.004 5.255 17.017 3.873 21.554-3.616a160 160 0 1 0-273.913-.353c4.517 7.501 14.527 8.909 21.544 3.672l12.8-9.553c7.017-5.237 8.347-15.131 4.149-22.815a112.316 112.316 0 0 1-1.801-104.263A112.32 112.32 0 1 1 258.43 214.879c-4.217 7.673-2.913 17.57 4.091 22.825l12.774 9.586Z"
    />
  </Svg>
  )
}

export default ThermoStatControlBackground