import React from 'react'
import { View, Text } from 'react-native'
import YoutubeIframe from 'react-native-youtube-iframe'

export default function Video({idVideo}) {
  return (
    <View>
      <YoutubeIframe
      height={230}
      play={true}
      videoId={idVideo}
      />
    </View>
  )
}