import React, { Component } from 'react'
import {
  Container,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Header,
  Title,
  ListItem
} from 'native-base'
import { FlatList } from 'react-native'
const datas = require('../../homeDatas.js')

class Home extends Component {
  // 去 info 的頁面
  goToInfo = (data, name) => {
    this.props.navigation.navigate('InfoPage', {
      data,
      name
    })
  }

  render () {
    return (
      <Container>
        {/* 頂部 */}
        <Header>
          <Left />
          <Body>
            <Title>
              學校
            </Title>
          </Body>
          <Right />
        </Header>

        <FlatList
          data={datas}
          renderItem={
            ({ item: data }) =>
              <ListItem thumbnail onPress={() => this.goToInfo(data.room, data.name)}>
                <Left>
                  <Thumbnail square source={{ uri: data.image }} />
                </Left>
                <Body>
                  <Text>
                    {data.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.info}
                  </Text>
                </Body>
                <Right />
              </ListItem>
          }
          keyExtractor={item => `homepage${item.name}`}
        />
        {/* 資料 */}
        {/* <ListItem thumbnail onPress={() => this.goToInfo(datas.first, '地下')}>
          <Left>
            <Thumbnail square source={{ uri: datas.first[0].img }} />
          </Left>
          <Body>
            <Text>
              地下
            </Text>
            <Text numberOfLines={1} note>
              是同學們經常休息的地方
            </Text>
          </Body>
          <Right />
        </ListItem>

        <ListItem thumbnail onPress={() => this.goToInfo(datas.second, '第一層')}>
          <Left>
            <Thumbnail square source={{ uri: datas.second[0].img }} />
          </Left>
          <Body>
            <Text>
              第一層
            </Text>
            <Text numberOfLines={1} note>
              是同學們上堂的地方
            </Text>
          </Body>
          <Right />
        </ListItem>

        <ListItem thumbnail onPress={() => this.goToInfo(datas.third, '第二層')}>
          <Left>
            <Thumbnail square source={{ uri: datas.third[0].img }} />
          </Left>
          <Body>
            <Text>
              第二層
            </Text>
            <Text numberOfLines={1} note>
              是同學們上堂的地方
            </Text>
          </Body>
          <Right />
        </ListItem> */}

      </Container>
    )
  }
}
export default Home
