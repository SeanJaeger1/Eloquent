import React from 'react'

import { Path, Svg } from 'react-native-svg'

export interface SquaresIconProps {
  stroke: string
  width?: string | number
  height?: string | number
}

const SquaresIcon = ({ stroke, width = '20', height = '20' }: SquaresIconProps) => (
  <Svg width={width} height={height} viewBox='0 0 20 20' fill='none'>
    <Path
      d='M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H7.5C7.96024 8.33333 8.33333 7.96024 8.33333 7.5V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z'
      stroke={stroke}
      strokeWidth={1.66667}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M7.5 11.6667H3.33333C2.8731 11.6667 2.5 12.0398 2.5 12.5001V16.6667C2.5 17.127 2.8731 17.5001 3.33333 17.5001H7.5C7.96024 17.5001 8.33333 17.127 8.33333 16.6667V12.5001C8.33333 12.0398 7.96024 11.6667 7.5 11.6667Z'
      stroke={stroke}
      strokeWidth={1.66667}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V7.5C11.6667 7.96024 12.0398 8.33333 12.5 8.33333H16.6667C17.1269 8.33333 17.5 7.96024 17.5 7.5V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z'
      stroke={stroke}
      strokeWidth={1.66667}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M16.6667 11.6667H12.5C12.0398 11.6667 11.6667 12.0398 11.6667 12.5001V16.6667C11.6667 17.127 12.0398 17.5001 12.5 17.5001H16.6667C17.1269 17.5001 17.5 17.127 17.5 16.6667V12.5001C17.5 12.0398 17.1269 11.6667 16.6667 11.6667Z'
      stroke={stroke}
      strokeWidth={1.66667}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
)

export default SquaresIcon
