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

      </Container>
    )
  }
}
export default Home
