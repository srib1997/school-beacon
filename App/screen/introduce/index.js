
import React from 'react'
import {
  Container,
  Content,
  Text,
  Body,
  Header,
  Title,
  Left,
  Right
} from 'native-base'

const App = () => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title adjustsFontSizeToFit>
            <Text>
              Introduce
            </Text>
          </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text style={{ lineHeight: 20, paddingTop: 20, paddingLeft: 15, paddingRight: 15, letterSpacing: 2 }}>kuok sir so handsome</Text>
      </Content>
    </Container>
  )
}

export default App
