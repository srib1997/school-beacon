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

  goToInfoData = (data, name) => {
    this.props.navigation.navigate('InfoData', {
      data,
      name
    })
  }

  render () {
    const { navigation } = this.props
    const { data: datas, name } = navigation.state.params
    console.log(datas, name)
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
              <ListItem thumbnail onPress={() => this.goToInfoData(data.content, data.name)}>
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
          keyExtractor={item => `home${item.name}`}
        />
      </Container>
    )
  }
}
export default Info
