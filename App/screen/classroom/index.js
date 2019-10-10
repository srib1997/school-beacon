
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
  Footer,
  FooterTab,
  Button
} from 'native-base'
import { BleManager } from 'react-native-ble-plx'
import { Platform, Alert, DeviceEventEmitter, Image } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import Beacons from 'react-native-beacons-manager'
import _ from 'lodash'
import YouTube from 'react-native-youtube'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/FontAwesome'

const bleManager = new BleManager()

const datas = require('../../datas.js')

let subscription
let date

class Classroom extends Component {
  state = {
    nearClassroom: [],
    firstDetectBeacon: {},
    secondDetectBeacon: {},
    thirdDetectBeacon: {},
    listener: false
  }

  componentDidMount () {
    console.log('classroom page')
    // 檢查有無開藍芽，只會檢查一次， refresh 另計
    this.checkBLEState()
    // 偵測 beacons
    this.onScanBeacons()
  }

  componentWillUnmount () {
    // 取消偵測 beacons
    subscription.remove()
  }

  // shouldComponentUpdate = async (nextProps, nextState) => {
  //   if (nextProps.isFocused) {
  //     console.log('classroom page true')
  //     await this.checkBLEState()
  //     return true
  //   } else {
  //     console.log('classroom page false')
  //     return false
  //   }
  // }

  // 開始掃瞄四周Beacon 裝置
  onScanBeacons = async () => {
    // 唔開藍芽直接返回
    const state = await bleManager.state()
    if (state !== 'PoweredOn') {
      return
    }

    // 輸入要搵的 beacon uuid
    const region = {
      identifier: '',
      uuid: 'b5b182c7-eab1-4988-aa99-b5c1517008d9'
    }

    // 偵測前的 init
    if (Platform.OS === 'ios') {
      Beacons.requestWhenInUseAuthorization()
      Beacons.startMonitoringForRegion(region)
      Beacons.startRangingBeaconsInRegion(region)
      Beacons.startUpdatingLocation()
    } else {
      Beacons.detectIBeacons()
      // // Range beacons inside the region
      Beacons
        .startRangingBeaconsInRegion(region)
        .then(() => console.log('Beacons ranging started succesfully'))
        .catch(error => console.log(`Beacons ranging not started, error: ${error}`))
    }

    this.setState({ listener: true })
    // 偵測 beacon 的 function
    subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        // console.log('Found beacons!', data.beacons)
        // this.beaconsData = data.beacons
        // 等侯 5 秒最多執行 func 一次
        this.nearBeacon(data.beacons)
      }
    )
  }

  nearBeacon = async (beacons) => {
    console.log('nearBeacon')
    if (date === null) {
      date = Date.now()
    } else if (Date.now() - date <= 3000) {
      return
    }

    // 唔開藍芽直接返回
    const state = await bleManager.state()
    if (state !== 'PoweredOn') {
      return
    }

    date = Date.now()

    // var beacons = this.beaconsData
    let result
    // ios 與 android 距離的名稱不同 ios為: accuracy android為:distance
    if (Platform.OS === 'ios') {
      // 搵距離大於 0 的
      result = beacons.filter(beacons => beacons.accuracy > 0)
      // 搵最小的
      result = _.orderBy(result, ['accuracy'], ['asc'])
    } else {
      // 搵距離大於 0 的
      result = beacons.filter(beacons => beacons.distance > 0)
      // 搵最小的
      result = _.orderBy(result, ['distance'], ['asc'])
    }
    console.log('result[0]: ', result[0])
    // 第一粒最近的 beacon
    if (result[0]) {
      // 在 datajs 找相對應的 beacon 資料
      const nearClassroom = datas.filter(data => data.major === result[0].major && data.minor === result[0].minor && data.uuid === (result[0].uuid).toLowerCase())
      console.log('nearClassroom: ', nearClassroom)
      if (nearClassroom[0]) {
        // 顯示埋距離
        nearClassroom[0].accuracy = Platform.OS === 'ios' ? result[0].accuracy.toFixed(1) : result[0].distance.toFixed(1)

        // 如果第一次入去依個界面會無資料，所以上面的界面顯示找到最近的 beacon
        if (this.state.nearClassroom.length <= 0) {
          this.setState({ nearClassroom: nearClassroom[0] })
        }
        // 如果找到 beacon,同在 datas.js 找到有資料就會顯示
        this.setState({ firstDetectBeacon: nearClassroom[0] })
      } else {
        // 如果係找到 beacon，但在 datas.js 搵唔到有依粒 beacon 的會提醒用户
        this.setState({ firstDetectBeacon: { name: '沒有資料的Beacon', accuracy: `mj:${result[0].major},mn:${result[0].minor}` } })
      }
    } else {
      // 第一粒都搵唔到，咁第2－3粒都唔會有
      this.setState({ firstDetectBeacon: {}, secondDetectBeacon: {}, thirdDetectBeacon: {} })
    }

    if (result[1]) {
      const nearClassroom = datas.filter(data => data.major === result[1].major && data.minor === result[1].minor && data.uuid === (result[1].uuid).toLowerCase())
      if (nearClassroom[0]) {
        nearClassroom[0].accuracy = Platform.OS === 'ios' ? result[1].accuracy.toFixed(1) : result[1].distance.toFixed(1)
        this.setState({ secondDetectBeacon: nearClassroom[0] })
      } else {
        this.setState({ secondDetectBeacon: { name: '沒有資料的Beacon', accuracy: `mj:${result[1].major},mn:${result[1].minor}` } })
      }
    } else {
      this.setState({ secondDetectBeacon: {}, thirdDetectBeacon: {} })
    }

    if (result[2]) {
      const nearClassroom = datas.filter(data => data.major === result[2].major && data.minor === result[2].minor && data.uuid === (result[2].uuid).toLowerCase())
      if (nearClassroom[0]) {
        nearClassroom[0].accuracy = Platform.OS === 'ios' ? result[2].accuracy.toFixed(1) : result[2].distance.toFixed(1)
        this.setState({ thirdDetectBeacon: nearClassroom[0] })
      } else {
        this.setState({ thirdDetectBeacon: { name: '沒有資料的Beacon', accuracy: `mj:${result[2].major},mn:${result[2].minor}` } })
      }
    } else {
      this.setState({ thirdDetectBeacon: {} })
    }
  }

  checkBLEState = async () => {
    const state = await bleManager.state()
    console.log('checkBLEState: ', state)
    if (state !== 'PoweredOn') {
      if (Platform.OS === 'android') {
        console.log('checkBLEState android: ', state)
        return bleManager.enable()
      } else if (Platform.OS === 'ios') {
        console.log('checkBLEState ios: ', state)
        return Alert.alert('請打開藍芽')
      }
    }
  }

  // 重新檢查
  refresh = async () => {
    console.log('refresh')
    this.setState({ nearClassroom: [], firstDetectBeacon: {}, secondDetectBeacon: {}, thirdDetectBeacon: {} })
    // 檢查有無藍芽
    await this.checkBLEState()
    // 有偵測過的取消偵測，然後再 set listener 為 false
    if (this.state.listener) {
      subscription.remove()
      this.setState({ listener: false })
    }
    // 有開藍芽 listener 為 true, 無就 flase
    return this.onScanBeacons()
  }

  render () {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title adjustsFontSizeToFit>
              <Text>
                {this.state.nearClassroom ? this.state.nearClassroom.name : 'Classroom'}
              </Text>
            </Title>
          </Body>
          <Right>
            <Icon name='refresh' onPress={() => this.refresh()} size={30} />
          </Right>
        </Header>
        <Content>
          <Image source={{ uri: this.state.nearClassroom ? this.state.nearClassroom.img : null }} style={{ height: 200, width: null }} resizeMode='contain' />
          {this.state.nearClassroom.video
            ? Platform.OS === 'ios'
              ? <YouTube
                videoId={this.state.nearClassroom.video} // The YouTube video ID
                play={false} // control playback of video with true/false
                fullscreen={false} // control whether the video should play in fullscreen or inline
                controls={1}
                style={{ alignSelf: 'stretch', height: 240 }}
              />
              : <WebView
                source={{ uri: `https://www.youtube.com/embed/${this.state.nearClassroom.video}?version=3&enablejsapi=1&rel=0&autoplay=1&showinfo=0&controls=1&modestbranding=0` }}
                style={{ height: 240, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
              />
            : null}
          <Text style={{ lineHeight: 20, paddingTop: 20, paddingLeft: 15, paddingRight: 15, letterSpacing: 2 }}>{this.state.nearClassroom ? this.state.nearClassroom.note : 'loading...'}</Text>
        </Content>

        {
          this.state.firstDetectBeacon && this.state.secondDetectBeacon && this.state.thirdDetectBeacon
            ? <Footer>
              <FooterTab>
                {
                  this.state.firstDetectBeacon
                    ? <Button vertical onPress={() => this.setState({ nearClassroom: this.state.firstDetectBeacon })}>
                      <Text>{this.state.firstDetectBeacon.accuracy}</Text>
                      <Text>{this.state.firstDetectBeacon.name}</Text>
                      </Button>
                    : null
                }

                {
                  this.state.secondDetectBeacon
                    ? <Button vertical onPress={() => this.setState({ nearClassroom: this.state.secondDetectBeacon })}>
                      <Text>{this.state.secondDetectBeacon.accuracy}</Text>
                      <Text>{this.state.secondDetectBeacon.name}</Text>
                    </Button>
                    : null
                }

                {
                  this.state.thirdDetectBeacon
                    ? <Button vertical onPress={() => this.setState({ nearClassroom: this.state.thirdDetectBeacon })}>
                      <Text>{this.state.thirdDetectBeacon.accuracy}</Text>
                      <Text>{this.state.thirdDetectBeacon.name}</Text>
                    </Button>
                    : null
                }

              </FooterTab>
            </Footer>
            : null
        }
      </Container>
    )
  }
}

export default withNavigationFocus(Classroom)
