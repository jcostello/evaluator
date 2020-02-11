import React from 'react'
import { Avatar, Menu, Icon, Layout } from 'antd'
import logo from './images/logo.png'

const SubMenu = Menu.SubMenu
const Header = Layout.Header

const Home = (props) => {
  return (
    <>
      <div style={{float: 'left', margin: '6px 6px 0px'}}><img src={logo}/></div>
      <Menu mode="horizontal" style={{lineHeight: '80px'}}
      >
        <Menu.Item key="1">Forms</Menu.Item>
        <SubMenu style={{float: 'right'}} title={<Avatar>U</Avatar>}>
          <Menu.Item key="4">Profile</Menu.Item>
          <Menu.Item key="4">Logout</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default Home;
