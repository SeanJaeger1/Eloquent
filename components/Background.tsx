import { type ReactNode, useEffect, useState } from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, G, Path, Circle, Rect, ClipPath } from 'react-native-svg'

interface BackgroundProps {
  children: ReactNode
}

const Background = ({ children }: BackgroundProps): JSX.Element => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription.remove()
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.svgContainer,
          {
            transform: [
              { translateX: -dimensions.width / 2 },
              { translateY: -dimensions.height / 2 },
            ],
          },
        ]}
      >
        <Svg
          width='120%'
          height='120%'
          viewBox='0 0 375 812'
          preserveAspectRatio='xMidYMid slice'
          style={styles.svg}
        >
          <ClipPath id='clip0'>
            <Rect width='375' height='812' rx='40' fill='white' />
          </ClipPath>
          <G clipPath='url(#clip0)'>
            <Rect width='375' height='812' rx='40' fill='url(#gradient)' />
            <G opacity='0.11'>
              <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M314 831.947C336.062 831.947 353.947 814.062 353.947 792C353.947 769.938 336.062 752.053 314 752.053C291.938 752.053 274.053 769.938 274.053 792C274.053 814.062 291.938 831.947 314 831.947ZM314 869C356.526 869 391 834.526 391 792C391 749.474 356.526 715 314 715C271.474 715 237 749.474 237 792C237 834.526 271.474 869 314 869Z'
                fill='white'
              />
              <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M73.9058 780.052C84.4802 780.052 93.0524 771.48 93.0524 760.906C93.0524 750.331 84.4802 741.759 73.9058 741.759C63.3314 741.759 54.7592 750.331 54.7592 760.906C54.7592 771.48 63.3314 780.052 73.9058 780.052ZM73.9058 797.812C94.2883 797.812 110.812 781.288 110.812 760.906C110.812 740.523 94.2883 724 73.9058 724C53.5233 724 37 740.523 37 760.906C37 781.288 53.5233 797.812 73.9058 797.812Z'
                fill='white'
              />
              <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M394.842 176.112C456.552 176.112 506.578 126.086 506.578 64.3755C506.578 2.66535 456.552 -47.3606 394.842 -47.3606C333.132 -47.3606 283.106 2.66535 283.106 64.3755C283.106 126.086 333.132 176.112 394.842 176.112ZM394.842 279.751C513.79 279.751 610.217 183.324 610.217 64.3755C610.217 -54.5731 513.79 -151 394.842 -151C275.893 -151 179.466 -54.5731 179.466 64.3755C179.466 183.324 275.893 279.751 394.842 279.751Z'
                fill='white'
              />
              <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M-6.38559 626.554C34.965 626.554 68.4862 593.032 68.4862 551.682C68.4862 510.331 34.965 476.81 -6.38559 476.81C-47.7362 476.81 -81.2574 510.331 -81.2574 551.682C-81.2574 593.032 -47.7362 626.554 -6.38559 626.554ZM-6.38559 696C73.3191 696 137.933 631.387 137.933 551.682C137.933 471.977 73.3191 407.364 -6.38559 407.364C-86.0903 407.364 -150.704 471.977 -150.704 551.682C-150.704 631.387 -86.0903 696 -6.38559 696Z'
                fill='white'
              />
              <Circle cx='-20.486' cy='165.729' r='108.514' fill='white' />
              <Circle cx='139.806' cy='386.613' r='63.8966' fill='white' />
              <Circle cx='338' cy='580' r='77' fill='white' />
            </G>
          </G>
          <Defs>
            <LinearGradient
              id='gradient'
              x1='-13'
              y1='928.5'
              x2='300.5'
              y2='-35.5'
              gradientUnits='userSpaceOnUse'
            >
              <Stop stopColor='#92E9EE' />
              <Stop offset='1' stopColor='#0CA0A4' />
            </LinearGradient>
          </Defs>
        </Svg>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  svgContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
  },
  svg: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Background
