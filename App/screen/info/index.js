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
  ListItem,
  Button
} from 'native-base'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Info extends Component {
  goBackHome = () => {
    this.props.navigation.goBack()
  }

  goToInfoData = (data) => {
    this.props.navigation.navigate('InfoData', {
      data
    })
  }

  render () {
    const { navigation } = this.props
    const { data: datas, name } = navigation.state.params
    return (
      <Container>
        {/* 頂部 */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBackHome()}>
              <Icon name='arrow-left' size={30} />
            </Button>
          </Left>
          <Body>
            <Title adjustsFontSizeToFit>
              <Text>
                {name}
              </Text>
            </Title>
          </Body>
          <Right />
        </Header>

        {/* 資料 */}
        <FlatList
          data={datas}
          renderItem={
            ({ item: data }) =>
              <ListItem thumbnail onPress={() => this.goToInfoData(data)}>
                <Left>
                  <Thumbnail square source={{ uri: data.img }} />
                </Left>
                <Body>
                  <Text>
                    {data.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
                <Right />
              </ListItem>
          }
          keyExtractor={item => `home${item.name}`}
        />
      </Container>
    )
  }
}
export default Info
