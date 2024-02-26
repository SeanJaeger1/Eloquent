import { Path, Svg } from "react-native-svg"

const BookIcon = ({ stroke, width = "20", height = "16" }) => (
  <Svg width={width} height={height} viewBox="0 0 20 16" fill="none">
    <Path
      d="M10 2.99992C10 2.99992 8.75002 1.33325 5.83335 1.33325C2.91669 1.33325 1.66669 2.99992 1.66669 2.99992V14.6666C1.66669 14.6666 2.91669 13.8333 5.83335 13.8333C8.75002 13.8333 10 14.6666 10 14.6666M10 2.99992V14.6666M10 2.99992C10 2.99992 11.25 1.33325 14.1667 1.33325C17.0834 1.33325 18.3334 2.99992 18.3334 2.99992V14.6666C18.3334 14.6666 17.0834 13.8333 14.1667 13.8333C11.25 13.8333 10 14.6666 10 14.6666"
      stroke={stroke}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default BookIcon
