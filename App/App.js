// package
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

// page
import HomeScreen from './screen/home'
import IntroduceScreen from './screen/introduce'
import ClassroomScreen from './screen/classroom'
import InfoPageScreen from './screen/info'
import InfoDataScreen from './screen/infodata'

// 新屏幕在iOS上從右側滑動，在Android上從底部淡入
const HomeTab = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    InfoPage: {
      screen: InfoPageScreen
    },
    InfoData: {
      screen: InfoDataScreen
    }
  },
  {
    initialRouteName: 'Home',
    // https://reactnavigation.org/docs/en/stack-navigator.html
    // 每一頁的頁面頂部所呈現的野
    headerMode: 'none'
  }
)

const ClassroomTab = createStackNavigator(
  {
    Classroom: {
      screen: ClassroomScreen
    }
  },
  {
    initialRouteName: 'Classroom',
    // https://reactnavigation.org/docs/en/stack-navigator.html
    // 每一頁的頁面頂部所呈現的野
    headerMode: 'none'
  }
)

const MainNavigator = createBottomTabNavigator({
  // tab bar 第一頁名字
  Home: {
    // 第一個 tab 有2個頁面
    screen: HomeTab,
    // options
    // 下面 tabbar 的 icon
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' size={30} color='#000000' />
      )
    }
  },
  Classroom: {
    screen: ClassroomTab,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='microchip' size={30} color='#000000' />
      )
    }
  },
  Introduce: {
    screen: IntroduceScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='cog' size={30} color='#000000' />
      )
    }
  }
},
{
  tabBarOptions: {
    // 在當前頁面時 tab bar 字的 color
    activeTintColor: 'tomato',
    // tab bar 字的 color
    inactiveTintColor: 'gray',
    // 顯示 tab bar icon
    showIcon: true
  }
}
)

const App = createAppContainer(MainNavigator)

export default App
