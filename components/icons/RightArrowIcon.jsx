import { Path, Svg } from 'react-native-svg'

const RightArrowIcon = ({ stroke = 'white', width = '8', height = '14' }) => (
  <Svg width={width} height={height} viewBox='0 0 8 14' fill='none'>
    <Path
      d='M0.996908 14C0.801737 14 0.606567 13.9281 0.452484 13.7742C0.154592 13.4764 0.154592 12.9837 0.452484 12.686L6.14326 6.99871L0.452484 1.31146C0.154592 1.01375 0.154592 0.520991 0.452484 0.223282C0.750377 -0.0744272 1.24344 -0.0744272 1.54133 0.223282L7.77653 6.45462C8.07443 6.75233 8.07443 7.24509 7.77653 7.5428L1.54133 13.7742C1.38725 13.9281 1.19208 14 0.996908 14Z'
      fill={stroke}
    />
  </Svg>
)

export default RightArrowIcon
