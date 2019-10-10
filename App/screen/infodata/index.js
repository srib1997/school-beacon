import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  Body,
  Header,
  Title,
  Left,
  Right,
  Button
} from 'native-base'
import { Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import YouTube from 'react-native-youtube'
import { WebView } from 'react-native-webview'

class InfoData extends Component {
  goBackHome = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const data = navigation.getParam('data')
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBackHome()}>
              <Icon name='arrow-left' size={30} />
            </Button>
          </Left>
          <Body>
            <Title adjustsFontSizeToFit>
              <Text>
                {data.name}
              </Text>
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Image source={{ uri: data.img }} style={{ height: 200, width: null }} resizeMode='contain' />
          {data.video
            ? Platform.OS === 'ios'
              ? <YouTube
                videoId={`${data.video}`} // The YouTube video ID
                play={false} // control playback of video with true/false
                fullscreen={false} // control whether the video should play in fullscreen or inline
                controls={1}
                style={{ alignSelf: 'stretch', height: 240 }}
              />
              : <WebView
                source={{ uri: `https://www.youtube.com/embed/${data.video}?version=3&enablejsapi=1&rel=0&autoplay=1&showinfo=0&controls=1&modestbranding=0` }}
                style={{ height: 240, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
              />
            : null}
          <Text style={{ lineHeight: 20, paddingTop: 20, paddingLeft: 15, paddingRight: 15, letterSpacing: 2 }}>{data.note}</Text>
        </Content>
      </Container>
    )
  }
}
export default InfoData
